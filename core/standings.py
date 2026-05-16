import pandas as pd
import streamlit as st

from data.league_data import FIXTURES, TEAMS
from core.results import match_id
def all_playoff_results_complete() -> bool:
    for score in st.session_state.results.values():
        if score["home_goals"] is None or score["away_goals"] is None:
            return False
    return True

def playoff_points_so_far(team: str) -> int:
    points = 0
    for round_number, matches in FIXTURES.items():
        for match_number, (home_team, away_team) in enumerate(matches, start=1):
            if team not in (home_team, away_team):
                continue

            current_match_id = match_id(round_number, match_number)
            result = st.session_state.results[current_match_id]
            home_goals = result["home_goals"]
            away_goals = result["away_goals"]

            if home_goals is None or away_goals is None:
                continue

            if home_goals == away_goals:
                points += 1
            elif (team == home_team and home_goals > away_goals) or (team == away_team and away_goals > home_goals):
                points += 3

    return points

def build_table() -> pd.DataFrame:
    base_table = pd.DataFrame(TEAMS).copy()
    base_table["wins"] = 0
    base_table["draws"] = 0
    base_table["losses"] = 0
    base_table["goal_difference"] = base_table["goals_for"] - base_table["goals_against"]
    return base_table.set_index("team")

def apply_match_result(table: pd.DataFrame, home_team: str, away_team: str, home_goals: int, away_goals: int) -> None:
    table.loc[home_team, "goals_for"] += home_goals
    table.loc[home_team, "goals_against"] += away_goals
    table.loc[away_team, "goals_for"] += away_goals
    table.loc[away_team, "goals_against"] += home_goals

    if home_goals > away_goals:
        table.loc[home_team, "points"] += 3
        table.loc[home_team, "wins"] += 1
        table.loc[away_team, "losses"] += 1
    elif home_goals < away_goals:
        table.loc[away_team, "points"] += 3
        table.loc[away_team, "wins"] += 1
        table.loc[home_team, "losses"] += 1
    else:
        table.loc[home_team, "points"] += 1
        table.loc[away_team, "points"] += 1
        table.loc[home_team, "draws"] += 1
        table.loc[away_team, "draws"] += 1

    table["goal_difference"] = table["goals_for"] - table["goals_against"]

def calculate_table_from_results(
    results: dict[str, dict[str, int | None]],
    last_round: int = 7,
) -> pd.DataFrame:
    table = build_table()

    for round_number in range(1, last_round + 1):
        for match_number, (home_team, away_team) in enumerate(FIXTURES[round_number], start=1):
            current_match_id = match_id(round_number, match_number)
            result = results[current_match_id]

            if result["home_goals"] is None or result["away_goals"] is None:
                continue

            apply_match_result(
                table=table,
                home_team=home_team,
                away_team=away_team,
                home_goals=int(result["home_goals"]),
                away_goals=int(result["away_goals"]),
            )

    # דירוג סופי:
    # 1. יותר נקודות
    # 2. הפרש שערים גבוה יותר
    # 3. יותר שערי זכות
    table = (
        table.reset_index()
        .sort_values(
            by=["points", "goal_difference", "goals_for"],
            ascending=[False, False, False],
            kind="mergesort",
        )
        .reset_index(drop=True)
    )
    table.insert(0, "rank", table.index + 1)
    return table

def calculate_table_until_round(last_round: int) -> pd.DataFrame:
    return calculate_table_from_results(st.session_state.results, last_round)

def latest_completed_round_number() -> int:
    latest_round = 0
    for round_number in range(1, 8):
        round_is_complete = True
        for match_number, _ in enumerate(FIXTURES[round_number], start=1):
            current_match_id = match_id(round_number, match_number)
            result = st.session_state.results[current_match_id]
            if result["home_goals"] is None or result["away_goals"] is None:
                round_is_complete = False
                break
        if round_is_complete:
            latest_round = round_number
        else:
            break
    return latest_round

def latest_round_with_any_results() -> int:
    latest_round = 0
    for round_number in range(1, 8):
        for match_number, _ in enumerate(FIXTURES[round_number], start=1):
            current_match_id = match_id(round_number, match_number)
            result = st.session_state.results[current_match_id]
            if result["home_goals"] is None or result["away_goals"] is None:
                continue
            latest_round = round_number
            break
    return latest_round

def current_table_metadata() -> tuple[str, str | None]:
    if all_playoff_results_complete():
        return "טבלת סיום עונה", None

    latest_round = latest_completed_round_number()
    latest_active_round = latest_round_with_any_results()

    if latest_active_round == 0:
        return "טבלה עדכנית", "לפני פתיחת מחזורי הפלייאוף"

    if latest_active_round > latest_round:
        return "טבלה עדכנית", f"נכון למחזור {latest_active_round}"

    return "טבלה עדכנית", f"נכון לסיום מחזור {latest_round}"

def is_round_completed_officially(round_number: int, completed_results: dict[str, dict[str, int | None]]) -> bool:
    return all(match_id(round_number, match_number) in completed_results for match_number, _ in enumerate(FIXTURES[round_number], start=1))
