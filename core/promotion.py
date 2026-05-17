import random

import pandas as pd

from data.league_data import FIXTURES, TEAMS
from core.results import (
    load_completed_results,
    match_id,
    merge_completed_results,
    pending_matches,
    unresolved_match_ids_for_team,
)
from core.standings import (
    calculate_table_from_results,
    calculate_table_until_round,
    playoff_points_so_far,
)


def sample_score_for_outcome(outcome: str) -> tuple[int, int]:
    if outcome == "H":
        return random.choice([(1, 0), (2, 0), (2, 1), (3, 1), (3, 2)])
    if outcome == "D":
        return random.choice([(0, 0), (1, 1), (2, 2)])
    return random.choice([(0, 1), (0, 2), (1, 2), (1, 3), (2, 3)])


def build_random_promotion_mapping(max_attempts: int = 5000) -> dict[str, tuple[int, int]] | None:
    completed_results = load_completed_results()
    pending = [
        (match_id(round_number, match_number), home_team, away_team)
        for round_number, fixtures in FIXTURES.items()
        for match_number, (home_team, away_team) in enumerate(fixtures, start=1)
        if match_id(round_number, match_number) not in completed_results
    ]

    if not pending:
        final_table = calculate_table_until_round(7)
        bnei_row = final_table[final_table["team"] == "בני יהודה"].iloc[0]
        return {} if int(bnei_row["rank"]) <= 2 else None

    for _ in range(max_attempts):
        mapping: dict[str, tuple[int, int]] = {}
        random_results = merge_completed_results({})

        for current_match_id, _, _ in pending:
            outcome = random.choice(["H", "D", "A"])
            home_goals, away_goals = sample_score_for_outcome(outcome)
            mapping[current_match_id] = (home_goals, away_goals)
            random_results[current_match_id] = {
                "home_goals": home_goals,
                "away_goals": away_goals,
            }

        for current_match_id, score in completed_results.items():
            random_results[current_match_id] = score

        final_table = calculate_table_from_results(random_results, 7)
        bnei_row = final_table[final_table["team"] == "בני יהודה"].iloc[0]
        if int(bnei_row["rank"]) <= 2:
            return mapping

    return None


def bnei_yehuda_promoted_on_points_only(points_map: dict[str, int]) -> bool:
    bnei_points = points_map["בני יהודה"]
    teams_above = 0
    teams_tied = 0

    for team_name, team_points in points_map.items():
        if team_name == "בני יהודה":
            continue
        if team_points > bnei_points:
            teams_above += 1
        elif team_points == bnei_points:
            teams_tied += 1

    return (teams_above + teams_tied) <= 1


def estimate_bnei_yehuda_promotion_probability_from_results(
    base_results: dict[str, dict[str, int | None]],
    pending_matches: list[tuple[str, str, str]],
    signature: str,
    simulation_count: int = 20000,
) -> dict[str, object]:
    base_table = calculate_table_from_results(base_results, 7)
    base_points = {row["team"]: int(row["points"]) for _, row in base_table.iterrows()}
    promotion_count = 0

    for _ in range(simulation_count):
        simulated_points = base_points.copy()
        for _, home_team, away_team in pending_matches:
            outcome = random.randint(0, 2)
            if outcome == 0:
                simulated_points[home_team] += 3
            elif outcome == 1:
                simulated_points[home_team] += 1
                simulated_points[away_team] += 1
            else:
                simulated_points[away_team] += 3

        if bnei_yehuda_promoted_on_points_only(simulated_points):
            promotion_count += 1

    return {
        "simulation_count": simulation_count,
        "pending_match_count": len(pending_matches),
        "promotion_count": promotion_count,
        "promotion_probability": (promotion_count / simulation_count) if simulation_count else 0.0,
        "results_signature": signature,
    }


def points_delta_for_result(result_code: str) -> tuple[int, int]:
    if result_code == "H":
        return 3, 0
    if result_code == "D":
        return 1, 1
    return 0, 3


def split_pending_matches(target_team: str) -> tuple[list[tuple[str, str, str]], list[tuple[str, str, str]]]:
    target_matches: list[tuple[str, str, str]] = []
    other_matches: list[tuple[str, str, str]] = []
    for current_match_id, home_team, away_team in pending_matches():
        if target_team in (home_team, away_team):
            target_matches.append((current_match_id, home_team, away_team))
        else:
            other_matches.append((current_match_id, home_team, away_team))
    return target_matches, other_matches


def reachable_point_totals_for_target(target_team: str) -> list[int]:
    gains = {0}
    target_matches, _ = split_pending_matches(target_team)
    for _, home_team, away_team in target_matches:
        next_gains = set()
        for current_gain in gains:
            next_gains.add(current_gain)
            next_gains.add(current_gain + 1)
            next_gains.add(current_gain + 3)
        gains = next_gains
    return sorted(gains)


def table_points_map() -> dict[str, int]:
    current_table = calculate_table_until_round(7)
    return {row["team"]: int(row["points"]) for _, row in current_table.iterrows()}


def target_match_assignments(
    target_team: str,
    gained_points: int,
    base_points: dict[str, int],
) -> list[dict[str, int]]:
    target_matches, _ = split_pending_matches(target_team)
    assignments: list[dict[str, int]] = []

    def search(index: int, current_gain: int, current_points: dict[str, int]) -> None:
        if current_gain > gained_points:
            return

        if index == len(target_matches):
            if current_gain == gained_points:
                assignments.append(current_points.copy())
            return

        _, home_team, away_team = target_matches[index]
        for result_code in ("H", "D", "A"):
            home_delta, away_delta = points_delta_for_result(result_code)
            next_gain = current_gain
            if result_code == "D":
                if target_team in (home_team, away_team):
                    next_gain += 1
            elif result_code == "H" and home_team == target_team:
                next_gain += 3
            elif result_code == "A" and away_team == target_team:
                next_gain += 3

            next_points = current_points.copy()
            next_points[home_team] += home_delta
            next_points[away_team] += away_delta
            search(index + 1, next_gain, next_points)

    search(0, 0, base_points.copy())
    return assignments


def remaining_match_counts(matches: list[tuple[str, str, str]]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for _, home_team, away_team in matches:
        counts[home_team] = counts.get(home_team, 0) + 1
        counts[away_team] = counts.get(away_team, 0) + 1
    return counts


def alive_teams_for_target(
    current_points: dict[str, int],
    target_team: str,
    target_final_points: int,
    matches_left: list[tuple[str, str, str]],
) -> set[str]:
    counts_left = remaining_match_counts(matches_left)
    alive_teams: set[str] = set()

    for team_name, points in current_points.items():
        if team_name == target_team:
            continue

        max_points = points + (counts_left.get(team_name, 0) * 3)
        # In this model, a tie on points is treated as a failure for Bnei Yehuda.
        if max_points >= target_final_points:
            alive_teams.add(team_name)

    return alive_teams


def relevant_matches_for_alive_teams(
    matches_left: list[tuple[str, str, str]],
    alive_teams: set[str],
) -> list[tuple[str, str, str]]:
    return [
        match
        for match in matches_left
        if match[1] in alive_teams or match[2] in alive_teams
    ]


def current_promotion_search_summary(target_team: str) -> dict[str, int]:
    base_points = table_points_map()
    _, other_matches = split_pending_matches(target_team)
    target_max_points = base_points[target_team] + (len(unresolved_match_ids_for_team(target_team)) * 3)
    alive_teams = alive_teams_for_target(base_points, target_team, target_max_points, other_matches)
    relevant_matches = relevant_matches_for_alive_teams(other_matches, alive_teams)

    return {
        "pending_matches": len(other_matches),
        "relevant_matches": len(relevant_matches),
        "irrelevant_matches": len(other_matches) - len(relevant_matches),
        "alive_teams": len(alive_teams),
    }


def can_target_finish_top_two_with_points(
    target_team: str,
    gained_points: int,
    require_failure: bool = False,
) -> bool:
    base_points = table_points_map()
    target_final_points = base_points[target_team] + gained_points
    _, other_matches = split_pending_matches(target_team)
    assignments = target_match_assignments(target_team, gained_points, base_points)

    if not assignments:
        return False

    memo: dict[tuple[tuple[tuple[str, int], ...], tuple[tuple[str, str], ...], bool], bool] = {}

    def search(current_points: dict[str, int], matches_left: list[tuple[str, str, str]]) -> bool:
        key = (
            tuple(sorted(current_points.items())),
            tuple((home_team, away_team) for _, home_team, away_team in matches_left),
            require_failure,
        )
        if key in memo:
            return memo[key]

        rivals_above = sum(
            1
            for team_name, points in current_points.items()
            if team_name != target_team and points >= target_final_points
        )
        if rivals_above >= 2:
            memo[key] = require_failure
            return memo[key]

        alive_teams = alive_teams_for_target(current_points, target_team, target_final_points, matches_left)

        if len(alive_teams) <= 1:
            memo[key] = not require_failure
            return memo[key]

        relevant_matches = relevant_matches_for_alive_teams(matches_left, alive_teams)

        if not relevant_matches:
            memo[key] = not require_failure
            return memo[key]

        # Branch first on the games that still involve two live promotion contenders.
        relevant_matches.sort(
            key=lambda match: (
                (match[1] in alive_teams) + (match[2] in alive_teams),
                match[0],
            ),
            reverse=True,
        )

        current_match_id, home_team, away_team = relevant_matches[0]
        remaining_matches = [match for match in matches_left if match[0] != current_match_id]

        for result_code in ("H", "D", "A"):
            home_delta, away_delta = points_delta_for_result(result_code)
            next_points = current_points.copy()
            next_points[home_team] += home_delta
            next_points[away_team] += away_delta
            if search(next_points, remaining_matches):
                memo[key] = True
                return True

        memo[key] = False
        return False

    for assignment_points in assignments:
        if search(assignment_points, other_matches.copy()):
            return True

    return False


def promotion_status_for_target(target_team: str = "בני יהודה") -> pd.DataFrame:
    current_points = table_points_map()
    target_current_points = current_points[target_team]
    target_remaining_matches = len(unresolved_match_ids_for_team(target_team))
    possible_gains = reachable_point_totals_for_target(target_team)

    rows = []
    for gained_points in possible_gains:
        target_final_points = target_current_points + gained_points
        can_finish_top_two = can_target_finish_top_two_with_points(target_team, gained_points, require_failure=False)
        can_miss_top_two = can_target_finish_top_two_with_points(target_team, gained_points, require_failure=True)

        if not can_finish_top_two:
            status = "לא מספיק"
        elif can_miss_top_two:
            status = "אפשרי"
        else:
            status = "מבטיח עלייה"

        rows.append(
            {
                "נקודות שבני יהודה תיקח": gained_points,
                "נקודות סופיות": target_final_points,
                "משחקים שנותרו": target_remaining_matches,
                "סטטוס": status,
            }
        )

    return pd.DataFrame(rows)


def target_result_label(target_team: str, home_team: str, away_team: str, result_code: str) -> str:
    if result_code == "D":
        return "ת"
    if result_code == "H":
        return "נ" if home_team == target_team else "ה"
    return "נ" if away_team == target_team else "ה"


def enumerate_target_only_scenarios(target_team: str = "בני יהודה") -> list[dict[str, object]]:
    base_points = table_points_map()
    target_matches, other_matches = split_pending_matches(target_team)
    other_match_counts = remaining_match_counts(other_matches)
    rival_teams = [team_data["team"] for team_data in TEAMS if team_data["team"] != target_team]
    current_playoff_points = playoff_points_so_far(target_team)
    scenarios: list[dict[str, object]] = []

    def search(
        index: int,
        current_points: dict[str, int],
        gained_points: int,
        result_labels: list[str],
        detail_labels: list[str],
    ) -> None:
        if index == len(target_matches):
            target_final_points = current_points[target_team]
            rival_caps: list[dict[str, object]] = []
            rivals_above = 0
            total_allowed_extra = 0

            for rival_team in rival_teams:
                points_after_scenario = current_points[rival_team]
                remaining_matches_without_target = other_match_counts.get(rival_team, 0)
                available_points_without_target = remaining_matches_without_target * 3

                if points_after_scenario >= target_final_points:
                    rivals_above += 1
                    allowed_extra_points = 0
                    limit_text = "כבר מעל או בשוויון עם בני יהודה"
                else:
                    allowed_extra_points = min(
                        max(target_final_points - points_after_scenario - 1, 0),
                        available_points_without_target,
                    )
                    total_allowed_extra += allowed_extra_points
                    limit_text = str(allowed_extra_points)

                rival_caps.append(
                    {
                        "קבוצה": rival_team,
                        "נקודות אחרי התרחיש": points_after_scenario,
                        "משחקים שנותרו בלי בני יהודה": remaining_matches_without_target,
                        "נקודות זמינות בלי בני יהודה": available_points_without_target,
                        "מקסימום נוספות שמותר לקחת (מספר)": allowed_extra_points,
                        "מקסימום נוספות שמותר לקחת": limit_text,
                        "מעל בני יהודה כבר עכשיו": "כן" if points_after_scenario >= target_final_points else "לא",
                    }
                )

            if rivals_above >= 2:
                scenario_status = "לפחות שתי יריבות כבר מעל או בשוויון עם בני יהודה"
            elif rivals_above == 1:
                scenario_status = "נשארת יריבה אחת מעל או בשוויון עם בני יהודה"
            else:
                scenario_status = "אף יריבה לא מעל בני יהודה"

            scenarios.append(
                {
                    "points_gained": gained_points,
                    "playoff_points_total": current_playoff_points + gained_points,
                    "final_points": target_final_points,
                    "scenario_key": "-".join(result_labels) if result_labels else "ללא משחקים פתוחים",
                    "scenario_details": " | ".join(detail_labels) if detail_labels else "אין משחקים פתוחים לבני יהודה",
                    "rivals_above": rivals_above,
                    "total_allowed_extra": total_allowed_extra,
                    "status": scenario_status,
                    "rival_caps": rival_caps,
                }
            )
            return

        _, home_team, away_team = target_matches[index]
        opponent = away_team if home_team == target_team else home_team

        for result_code in ("H", "D", "A"):
            home_delta, away_delta = points_delta_for_result(result_code)
            next_points = current_points.copy()
            next_points[home_team] += home_delta
            next_points[away_team] += away_delta

            target_label = target_result_label(target_team, home_team, away_team, result_code)
            gained_delta = 1 if target_label == "ת" else 3 if target_label == "נ" else 0

            search(
                index + 1,
                next_points,
                gained_points + gained_delta,
                result_labels + [target_label],
                detail_labels + [f"{opponent}: {target_label}"],
            )

    search(0, base_points.copy(), 0, [], [])
    scenarios.sort(key=lambda item: (item["points_gained"], item["scenario_key"]))
    return scenarios


def target_only_summary_table(target_team: str = "בני יהודה") -> pd.DataFrame:
    scenarios = enumerate_target_only_scenarios(target_team)
    summary_rows: list[dict[str, object]] = []

    for gained_points in sorted({int(item["points_gained"]) for item in scenarios}):
        matching_scenarios = [item for item in scenarios if int(item["points_gained"]) == gained_points]
        final_points = int(matching_scenarios[0]["final_points"])
        min_rivals_above = min(int(item["rivals_above"]) for item in matching_scenarios)
        max_rivals_above = max(int(item["rivals_above"]) for item in matching_scenarios)
        best_total_allowed_extra = max(int(item["total_allowed_extra"]) for item in matching_scenarios)

        if min_rivals_above >= 2:
            summary_status = "לא מספיק כבר בתרחישי בני יהודה"
        elif min_rivals_above == 1:
            summary_status = "נשארת לפחות יריבה אחת מעל"
        else:
            summary_status = "יש גם תרחישים שבהם בני יהודה מעל כולן"

        summary_rows.append(
            {
                "נקודות שבני יהודה תיקח": gained_points,
                "נקודות סופיות": final_points,
                "תרחישים של בני יהודה": len(matching_scenarios),
                "מינימום יריבות שכבר מעל": min_rivals_above,
                "מקסימום יריבות שכבר מעל": max_rivals_above,
                "מקסימום סך תקציב נקודות ליריבות": best_total_allowed_extra,
                "סיכום": summary_status,
            }
        )

    return pd.DataFrame(summary_rows)
