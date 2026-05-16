import json
import os

import streamlit as st

from data.league_data import FIXTURES
from services.analytics import send_ga4_event


COMPLETED_RESULTS_PATH = os.getenv("COMPLETED_RESULTS_PATH", "completed_results.json")
def match_id(round_number: int, match_number: int) -> str:
    return f"r{round_number}_m{match_number}"

def empty_results() -> dict[str, dict[str, int | None]]:
    results: dict[str, dict[str, int | None]] = {}
    for round_number, matches in FIXTURES.items():
        for match_number, _ in enumerate(matches, start=1):
            results[match_id(round_number, match_number)] = {
                "home_goals": None,
                "away_goals": None,
            }
    return results

def load_completed_results() -> dict[str, dict[str, int | None]]:
    if not os.path.exists(COMPLETED_RESULTS_PATH):
        return {}

    with open(COMPLETED_RESULTS_PATH, "r", encoding="utf-8") as file:
        raw_data = json.load(file)

    completed_results: dict[str, dict[str, int | None]] = {}
    for current_match_id, score in raw_data.items():
        completed_results[current_match_id] = {
            "home_goals": score.get("home_goals"),
            "away_goals": score.get("away_goals"),
        }
    return completed_results

def save_completed_results(completed_results: dict[str, dict[str, int | None]]) -> None:
    with open(COMPLETED_RESULTS_PATH, "w", encoding="utf-8") as file:
        json.dump(completed_results, file, ensure_ascii=False, indent=2)
        file.write("\n")

def merge_completed_results(results: dict[str, dict[str, int | None]]) -> dict[str, dict[str, int | None]]:
    merged_results = empty_results()
    for current_match_id, score in results.items():
        merged_results[current_match_id] = {
            "home_goals": score.get("home_goals"),
            "away_goals": score.get("away_goals"),
        }

    for current_match_id, score in load_completed_results().items():
        merged_results[current_match_id] = score

    return merged_results

def ensure_session_state() -> None:
    if "results" not in st.session_state:
        st.session_state.results = merge_completed_results({})

    for round_number, matches in FIXTURES.items():
        for match_number, _ in enumerate(matches, start=1):
            current_match_id = match_id(round_number, match_number)
            home_key = f"{current_match_id}_home"
            away_key = f"{current_match_id}_away"
            home_touched_key = f"{current_match_id}_home_touched"
            away_touched_key = f"{current_match_id}_away_touched"
            if home_key not in st.session_state:
                home_goals = st.session_state.results[current_match_id]["home_goals"]
                st.session_state[home_key] = 0 if home_goals is None else home_goals
            if away_key not in st.session_state:
                away_goals = st.session_state.results[current_match_id]["away_goals"]
                st.session_state[away_key] = 0 if away_goals is None else away_goals
            if home_touched_key not in st.session_state:
                st.session_state[home_touched_key] = st.session_state.results[current_match_id]["home_goals"] is not None
            if away_touched_key not in st.session_state:
                st.session_state[away_touched_key] = st.session_state.results[current_match_id]["away_goals"] is not None

def mark_score_touched(current_match_id: str, side: str) -> None:
    st.session_state[f"{current_match_id}_{side}_touched"] = True

def adjust_score(current_match_id: str, side: str, delta: int) -> None:
    score_key = f"{current_match_id}_{side}"
    touched_key = f"{current_match_id}_{side}_touched"
    current_value = int(st.session_state.get(score_key, 0))
    st.session_state[score_key] = max(0, current_value + delta)
    st.session_state[touched_key] = True

def set_results_from_mapping(mapping: dict[str, tuple[int, int]]) -> None:
    st.session_state.results = merge_completed_results({})

    for round_number, matches in FIXTURES.items():
        for match_number, _ in enumerate(matches, start=1):
            current_match_id = match_id(round_number, match_number)
            home_key = f"{current_match_id}_home"
            away_key = f"{current_match_id}_away"
            home_touched_key = f"{current_match_id}_home_touched"
            away_touched_key = f"{current_match_id}_away_touched"
            score = mapping.get(current_match_id)
            completed_score = load_completed_results().get(current_match_id)

            if completed_score is not None:
                st.session_state[home_key] = completed_score["home_goals"]
                st.session_state[away_key] = completed_score["away_goals"]
                st.session_state[home_touched_key] = True
                st.session_state[away_touched_key] = True
                st.session_state.results[current_match_id] = completed_score
            elif score is None:
                st.session_state[home_key] = 0
                st.session_state[away_key] = 0
                st.session_state[home_touched_key] = False
                st.session_state[away_touched_key] = False
            else:
                st.session_state[home_key] = score[0]
                st.session_state[away_key] = score[1]
                st.session_state[home_touched_key] = True
                st.session_state[away_touched_key] = True
                st.session_state.results[current_match_id] = {
                    "home_goals": score[0],
                    "away_goals": score[1],
                }

def update_round_results(round_number: int) -> None:
    for match_number, _ in enumerate(FIXTURES[round_number], start=1):
        current_match_id = match_id(round_number, match_number)
        if current_match_id in load_completed_results():
            continue
        home_touched = st.session_state.get(f"{current_match_id}_home_touched", False)
        away_touched = st.session_state.get(f"{current_match_id}_away_touched", False)
        if not home_touched and not away_touched:
            st.session_state.results[current_match_id] = {"home_goals": None, "away_goals": None}
            continue

        home_goals = int(st.session_state.get(f"{current_match_id}_home", 0))
        away_goals = int(st.session_state.get(f"{current_match_id}_away", 0))
        st.session_state.results[current_match_id] = {
            "home_goals": home_goals,
            "away_goals": away_goals,
        }
        st.session_state[f"{current_match_id}_home_touched"] = True
        st.session_state[f"{current_match_id}_away_touched"] = True
    send_ga4_event(
        "round_results_updated",
        {
            "round_number": round_number,
            "round_completed_matches": sum(
                1
                for match_number, _ in enumerate(FIXTURES[round_number], start=1)
                if (
                    st.session_state.results[match_id(round_number, match_number)]["home_goals"] is not None
                    and st.session_state.results[match_id(round_number, match_number)]["away_goals"] is not None
                )
            ),
        },
    )

def clear_inputs_and_results() -> None:
    st.session_state.results = merge_completed_results({})
    for round_number, matches in FIXTURES.items():
        for match_number, _ in enumerate(matches, start=1):
            current_match_id = match_id(round_number, match_number)
            completed_score = load_completed_results().get(current_match_id)
            if completed_score is not None:
                st.session_state[f"{current_match_id}_home"] = completed_score["home_goals"]
                st.session_state[f"{current_match_id}_away"] = completed_score["away_goals"]
                st.session_state[f"{current_match_id}_home_touched"] = True
                st.session_state[f"{current_match_id}_away_touched"] = True
            else:
                st.session_state[f"{current_match_id}_home"] = 0
                st.session_state[f"{current_match_id}_away"] = 0
                st.session_state[f"{current_match_id}_home_touched"] = False
                st.session_state[f"{current_match_id}_away_touched"] = False
    send_ga4_event("all_results_reset")

def clear_round_results(round_number: int) -> None:
    for match_number, _ in enumerate(FIXTURES[round_number], start=1):
        current_match_id = match_id(round_number, match_number)
        completed_score = load_completed_results().get(current_match_id)
        if completed_score is not None:
            st.session_state.results[current_match_id] = completed_score
            st.session_state[f"{current_match_id}_home"] = completed_score["home_goals"]
            st.session_state[f"{current_match_id}_away"] = completed_score["away_goals"]
            st.session_state[f"{current_match_id}_home_touched"] = True
            st.session_state[f"{current_match_id}_away_touched"] = True
            continue
        st.session_state.results[current_match_id] = {"home_goals": None, "away_goals": None}
        st.session_state[f"{current_match_id}_home"] = 0
        st.session_state[f"{current_match_id}_away"] = 0
        st.session_state[f"{current_match_id}_home_touched"] = False
        st.session_state[f"{current_match_id}_away_touched"] = False
    send_ga4_event(
        "round_reset",
        {
            "round_number": round_number,
        },
    )

def current_match_score(current_match_id: str) -> tuple[int | None, int | None]:
    home_touched = st.session_state.get(f"{current_match_id}_home_touched", False)
    away_touched = st.session_state.get(f"{current_match_id}_away_touched", False)
    if not home_touched and not away_touched:
        return 0, 0

    home_value = st.session_state.get(f"{current_match_id}_home", 0)
    away_value = st.session_state.get(f"{current_match_id}_away", 0)
    return home_value, away_value

def official_results_signature() -> str:
    return json.dumps(load_completed_results(), sort_keys=True, ensure_ascii=False)

def current_results_signature() -> str:
    return json.dumps(st.session_state.results, sort_keys=True, ensure_ascii=False)

def official_pending_matches() -> list[tuple[str, str, str]]:
    completed_results = load_completed_results()
    pending: list[tuple[str, str, str]] = []
    for round_number, fixtures in FIXTURES.items():
        for match_number, (home_team, away_team) in enumerate(fixtures, start=1):
            current_match_id = match_id(round_number, match_number)
            if current_match_id not in completed_results:
                pending.append((current_match_id, home_team, away_team))
    return pending

def current_pending_matches() -> list[tuple[str, str, str]]:
    pending: list[tuple[str, str, str]] = []
    for round_number, fixtures in FIXTURES.items():
        for match_number, (home_team, away_team) in enumerate(fixtures, start=1):
            current_match_id = match_id(round_number, match_number)
            result = st.session_state.results[current_match_id]
            if result["home_goals"] is None or result["away_goals"] is None:
                pending.append((current_match_id, home_team, away_team))
    return pending

def unresolved_match_ids_for_team(team: str) -> list[str]:
    pending_matches: list[str] = []
    for round_number, matches in FIXTURES.items():
        for match_number, (home_team, away_team) in enumerate(matches, start=1):
            current_match_id = match_id(round_number, match_number)
            result = st.session_state.results[current_match_id]
            if result["home_goals"] is not None and result["away_goals"] is not None:
                continue
            if team in (home_team, away_team):
                pending_matches.append(current_match_id)
    return pending_matches

def pending_matches() -> list[tuple[str, str, str]]:
    matches: list[tuple[str, str, str]] = []
    for round_number, fixtures in FIXTURES.items():
        for match_number, (home_team, away_team) in enumerate(fixtures, start=1):
            current_match_id = match_id(round_number, match_number)
            result = st.session_state.results[current_match_id]
            if result["home_goals"] is None or result["away_goals"] is None:
                matches.append((current_match_id, home_team, away_team))
    return matches
