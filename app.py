import json
import os
import random
import time
import pandas as pd
import streamlit as st
import streamlit.components.v1 as components
import urllib.error
import urllib.request
import uuid


st.set_page_config(page_title="מעלה מעלה", layout="wide")

GA_MEASUREMENT_ID = os.getenv("GA4_MEASUREMENT_ID", "G-2F4JGD7RLN")
COMPLETED_RESULTS_PATH = "completed_results.json"


TEAMS = [
    {"team": 'מכבי פ"ת', "goals_for": 67, "goals_against": 32, "points": 60},
    {"team": "מכבי הרצליה", "goals_for": 45, "goals_against": 35, "points": 50},
    {"team": 'הפועל ר"ג', "goals_for": 48, "goals_against": 36, "points": 49},
    {"team": 'הפועל ראשל"צ', "goals_for": 43, "goals_against": 33, "points": 48},
    {"team": "הפועל כפר שלם", "goals_for": 51, "goals_against": 47, "points": 47},
    {"team": "בני יהודה", "goals_for": 34, "goals_against": 37, "points": 44},
    {"team": "קרית ים", "goals_for": 43, "goals_against": 37, "points": 42},
    {"team": 'הפועל כפ"ס', "goals_for": 38, "goals_against": 39, "points": 41},
]


FIXTURES = {
    1: [
        ('מכבי פ"ת', "הפועל כפר שלם"),
        ('הפועל ר"ג', "בני יהודה"),
        ("מכבי הרצליה", "קרית ים"),
        ('הפועל ראשל"צ', 'הפועל כפ"ס'),
    ],
    2: [
        ("הפועל כפר שלם", 'הפועל כפ"ס'),
        ('מכבי פ"ת', "מכבי הרצליה"),
        ("בני יהודה", 'הפועל ראשל"צ'),
        ("קרית ים", 'הפועל ר"ג'),
    ],
    3: [
        ("מכבי הרצליה", "הפועל כפר שלם"),
        ('הפועל ר"ג', 'מכבי פ"ת'),
        ('הפועל ראשל"צ', "קרית ים"),
        ('הפועל כפ"ס', "בני יהודה"),
    ],
    4: [
        ("הפועל כפר שלם", "בני יהודה"),
        ("מכבי הרצליה", 'הפועל ר"ג'),
        ("קרית ים", 'הפועל כפ"ס'),
        ('מכבי פ"ת', 'הפועל ראשל"צ'),
    ],
    5: [
        ('הפועל כפ"ס', 'מכבי פ"ת'),
        ('הפועל ר"ג', "הפועל כפר שלם"),
        ('הפועל ראשל"צ', "מכבי הרצליה"),
        ("בני יהודה", "קרית ים"),
    ],
    6: [
        ("מכבי הרצליה", 'הפועל כפ"ס'),
        ('הפועל ר"ג', 'הפועל ראשל"צ'),
        ("הפועל כפר שלם", "קרית ים"),
        ('מכבי פ"ת', "בני יהודה"),
    ],
    7: [
        ('הפועל כפ"ס', 'הפועל ר"ג'),
        ("קרית ים", 'מכבי פ"ת'),
        ('הפועל ראשל"צ', "הפועל כפר שלם"),
        ("בני יהודה", "מכבי הרצליה"),
    ],
}


SCENARIOS = {
    "A. תרחיש ריק / ידני": {},
    "B. תרחיש ריאלי יותר לעלייה של בני יהודה": {
        "r1_m1": (2, 1),
        "r1_m2": (1, 1),
        "r1_m3": (1, 0),
        "r1_m4": (2, 1),
        "r2_m1": (1, 1),
        "r2_m2": (2, 1),
        "r2_m3": (2, 1),
        "r2_m4": (1, 1),
        "r3_m1": (1, 1),
        "r3_m2": (1, 0),
        "r3_m3": (1, 1),
        "r3_m4": (0, 1),
        "r4_m1": (1, 2),
        "r4_m2": (0, 0),
        "r4_m3": (1, 1),
        "r4_m4": (2, 1),
        "r5_m1": (0, 2),
        "r5_m2": (1, 1),
        "r5_m3": (1, 0),
        "r5_m4": (2, 0),
        "r6_m1": (1, 1),
        "r6_m2": (1, 1),
        "r6_m3": (1, 1),
        "r6_m4": (1, 1),
        "r7_m1": (1, 1),
        "r7_m2": (1, 2),
        "r7_m3": (1, 1),
        "r7_m4": (2, 1),
    },
}


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
        "round_updated",
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


def match_side_class(side: str, home_goals: int | None, away_goals: int | None) -> str:
    if home_goals is None or away_goals is None:
        return ""
    if home_goals == away_goals:
        return "match-team-draw"
    if side == "home":
        return "match-team-win" if home_goals > away_goals else "match-team-loss"
    return "match-team-win" if away_goals > home_goals else "match-team-loss"


def render_match_label(
    home_team: str,
    away_team: str,
    home_goals: int | None,
    away_goals: int | None,
    is_completed: bool,
) -> str:
    home_class = match_side_class("home", home_goals, away_goals)
    away_class = match_side_class("away", home_goals, away_goals)
    completed_class = " is-completed" if is_completed else ""
    completed_tag = '<div class="match-final-subline">תוצאה סופית</div>' if is_completed else ""
    score_text = "-"
    if home_goals is not None and away_goals is not None:
        score_text = f"{away_goals}:{home_goals}"
    return (
        f'<div class="compact-match{completed_class}">'
        f'<div class="compact-match-label">'
        f'<span class="match-side-tag">בית</span> '
        f'<span class="match-team {home_class}"><strong>{home_team}</strong></span> '
        f'<span class="match-score-chip">{score_text}</span> '
        f'<span class="match-team {away_class}"><strong>{away_team}</strong></span> '
        f'<span class="match-side-tag">חוץ</span>'
        f"</div>{completed_tag}</div>"
    )


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


def is_mobile_client() -> bool:
    """Best-effort layout detection with optional query-param override."""
    try:
        query_params = st.query_params
        layout_override = str(query_params.get("layout", "")).strip().lower()
        if layout_override in {"mobile", "m", "1"}:
            return True
        if layout_override in {"desktop", "d", "0"}:
            return False
    except Exception:
        pass

    try:
        headers = getattr(st.context, "headers", None)
        user_agent = ""
        ua_mobile_hint = ""
        if headers is not None:
            user_agent = headers.get("user-agent", "") or headers.get("User-Agent", "")
            ua_mobile_hint = headers.get("sec-ch-ua-mobile", "") or headers.get("Sec-CH-UA-Mobile", "")
    except Exception:
        user_agent = ""
        ua_mobile_hint = ""

    if str(ua_mobile_hint).strip() in {"?1", "1", "true", "True"}:
        return True

    ua = str(user_agent).lower()
    mobile_tokens = ("mobile", "android", "iphone", "ipad", "ipod")
    return any(token in ua for token in mobile_tokens)


def completed_match_count() -> int:
    return sum(
        1
        for score in st.session_state.results.values()
        if score["home_goals"] is not None and score["away_goals"] is not None
    )


def open_match_count() -> int:
    return len(st.session_state.results) - completed_match_count()


def current_page_location() -> str:
    try:
        headers = getattr(st.context, "headers", None)
        if headers is None:
            return "https://malamala-by26.fly.dev"

        host = headers.get("host", "") or headers.get("Host", "")
        forwarded_proto = headers.get("x-forwarded-proto", "") or headers.get("X-Forwarded-Proto", "")
        if host:
            scheme = forwarded_proto or ("http" if "localhost" in host or "127.0.0.1" in host else "https")
            return f"{scheme}://{host}"
    except Exception:
        pass
    return "https://malamala-by26.fly.dev"


def ensure_ga4_identity() -> None:
    if "ga4_client_id" not in st.session_state:
        st.session_state.ga4_client_id = str(uuid.uuid4())
    if "ga4_session_id" not in st.session_state:
        st.session_state.ga4_session_id = int(time.time())


def send_ga4_event(name: str, params: dict[str, object] | None = None, once_key: str | None = None) -> None:
    api_secret = os.getenv("GA4_API_SECRET")
    if not api_secret:
        return

    if once_key is not None and st.session_state.get(once_key, False):
        return

    ensure_ga4_identity()
    event_params: dict[str, object] = {
        "session_id": st.session_state.ga4_session_id,
        "engagement_time_msec": 1,
        "layout_mode": st.session_state.get("layout_mode", "unknown"),
        "completed_match_count": completed_match_count(),
        "open_match_count": open_match_count(),
    }
    if params:
        event_params.update(params)
    if os.getenv("GA4_DEBUG_MODE") == "1":
        event_params["debug_mode"] = 1

    payload = {
        "client_id": st.session_state.ga4_client_id,
        "user_properties": {
            "layout_mode": {"value": str(st.session_state.get("layout_mode", "unknown"))},
        },
        "events": [
            {
                "name": name,
                "params": event_params,
            }
        ],
    }

    endpoint = (
        "https://www.google-analytics.com/mp/collect"
        f"?measurement_id={GA_MEASUREMENT_ID}&api_secret={api_secret}"
    )
    request = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=5):
            if once_key is not None:
                st.session_state[once_key] = True
    except (urllib.error.URLError, TimeoutError):
        pass


def send_ga4_page_view() -> None:
    send_ga4_event(
        "page_view",
        {
            "page_title": "מעלה מעלה",
            "page_location": current_page_location(),
        },
        once_key="ga4_page_view_sent",
    )


def sample_score_for_outcome(outcome: str) -> tuple[int, int]:
    if outcome == "H":
        return random.choice([(1, 0), (2, 0), (2, 1), (3, 1), (3, 2)])
    if outcome == "D":
        return random.choice([(0, 0), (1, 1), (2, 2)])
    return random.choice([(0, 1), (0, 2), (1, 2), (1, 3), (2, 3)])


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


def has_additional_manual_updates(after_round: int) -> bool:
    completed_results = load_completed_results()
    for round_number in range(after_round + 1, 8):
        for match_number, _ in enumerate(FIXTURES[round_number], start=1):
            current_match_id = match_id(round_number, match_number)
            result = st.session_state.results[current_match_id]
            if result["home_goals"] is None or result["away_goals"] is None:
                continue
            if current_match_id not in completed_results:
                return True
    return False


def current_table_metadata() -> tuple[str, str | None]:
    if all_playoff_results_complete():
        return "טבלת סיום עונה", None

    latest_round = latest_completed_round_number()
    if latest_round == 0:
        return "טבלה עדכנית", "לפני פתיחת מחזורי הפלייאוף"

    if has_additional_manual_updates(latest_round):
        return "טבלה עדכנית", f"נכון לסיום מחזור {latest_round}, כולל תוצאות ידניות נוספות"

    return "טבלה עדכנית", f"נכון לסיום מחזור {latest_round}"


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


def display_columns(table: pd.DataFrame) -> pd.DataFrame:
    display_table = table[
        ["rank", "team", "points", "goal_difference", "goals_for", "goals_against", "wins", "draws", "losses"]
    ].rename(
        columns={
            "rank": "מיקום",
            "team": "קבוצה",
            "points": "נקודות",
            "goal_difference": "הפרש שערים",
            "goals_for": "זכות",
            "goals_against": "חובה",
            "wins": "ניצחונות",
            "draws": "תיקו",
            "losses": "הפסדים",
        }
    )
    return display_table


def highlight_bnei_yehuda(row: pd.Series) -> list[str]:
    if row["קבוצה"] == "בני יהודה":
        return ["background-color: #fff3bf; font-weight: 700;"] * len(row)
    return [""] * len(row)


def render_table(table: pd.DataFrame, title: str, compact: bool = False, caption: str | None = None) -> None:
    st.markdown(f"#### {title}")
    if caption:
        st.markdown(f'<div class="table-caption">{caption}</div>', unsafe_allow_html=True)

    display_table = display_columns(table)
    if compact:
        display_table = display_table[["מיקום", "קבוצה", "הפרש שערים", "נקודות"]]
    styled = display_table.style.apply(highlight_bnei_yehuda, axis=1)
    styled = styled.hide(axis="index")
    styled = styled.format(
        {
            "מיקום": "{:.0f}",
            "נקודות": "{:.0f}",
            "הפרש שערים": "{:.0f}",
            "זכות": "{:.0f}",
            "חובה": "{:.0f}",
            "ניצחונות": "{:.0f}",
            "תיקו": "{:.0f}",
            "הפסדים": "{:.0f}",
        }
    )
    st.markdown(f'<div class="rtl-table">{styled.to_html()}</div>', unsafe_allow_html=True)


def highlight_promotion_status(row: pd.Series) -> list[str]:
    status = row.get("סטטוס", row.get("סיכום", ""))
    if status == "מבטיח עלייה" or status == "יש גם תרחישים שבהם בני יהודה מעל כולן":
        return ["background-color: #e8f7ea;"] * len(row)
    if status == "לא מספיק" or status == "לא מספיק כבר בתרחישי בני יהודה":
        return ["background-color: #fdecec;"] * len(row)
    return ["background-color: #fff8dd;"] * len(row)


def render_rival_caps_chart(target_team: str, scenario: dict[str, object], gained_points: int) -> None:
    color_map = {
        "מכבי הרצליה": "#f2c94c",
        'הפועל ר"ג': "#d64545",
        'הפועל ראשל\"צ': "#222222",
        "הפועל כפר שלם": "#7fd6f6",
    }
    chart_teams = [
        "מכבי הרצליה",
        'הפועל ר"ג',
        'הפועל ראשל"צ',
        "הפועל כפר שלם",
    ]

    rival_caps = {
        row["קבוצה"]: row
        for row in scenario["rival_caps"]
        if row["קבוצה"] in chart_teams
    }

    chart_rows: list[str] = []
    chart_values: list[int] = []
    chart_data: list[dict[str, object]] = []

    for team_name in chart_teams:
        if team_name not in rival_caps:
            continue
        row = rival_caps[team_name]
        value = int(row["מקסימום נוספות שמותר לקחת (מספר)"])
        chart_values.append(value)
        chart_data.append(
            {
                "team": team_name,
                "value": value,
                "label": str(row["מקסימום נוספות שמותר לקחת"]),
                "note": "כבר מעל בני יהודה" if row["מעל בני יהודה כבר עכשיו"] == "כן" else "",
            }
        )

    max_value = max(chart_values) if chart_values else 1
    max_value = max(max_value, 1)

    for item in chart_data:
        width = 0 if item["value"] <= 0 else (item["value"] / max_value) * 100
        color = color_map.get(item["team"], "#999999")
        chart_rows.append(
            f"""
            <div class="rival-chart-row">
                <div class="rival-chart-head">
                    <span class="rival-chart-team">{item['team']}</span>
                    <span class="rival-chart-value">{item['label']}</span>
                </div>
                <div class="rival-chart-track">
                    <div class="rival-chart-fill" style="width: {width:.1f}%; background: {color};"></div>
                </div>
                <div class="rival-chart-note">{item['note']}</div>
            </div>
            """
        )

    chart_html = """
    <html>
        <head>
            <style>
                body {
                    margin: 0;
                    direction: rtl;
                    font-family: sans-serif;
                    background: transparent;
                }

                .rival-chart-box {
                    background: #fbfaf6;
                    border: 1px solid #e7dfcf;
                    border-radius: 16px;
                    padding: 0.75rem 0.85rem;
                }

                .rival-chart-row + .rival-chart-row {
                    margin-top: 0.7rem;
                }

                .rival-chart-head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 0.7rem;
                    font-size: 0.92rem;
                    font-weight: 700;
                    margin-bottom: 0.2rem;
                }

                .rival-chart-team,
                .rival-chart-value {
                    color: #1e1e1e;
                }

                .rival-chart-track {
                    width: 100%;
                    height: 12px;
                    background: #ece7da;
                    border-radius: 999px;
                    overflow: hidden;
                }

                .rival-chart-fill {
                    height: 100%;
                    border-radius: 999px;
                }

                .rival-chart-note {
                    font-size: 0.73rem;
                    color: #66604f;
                    margin-top: 0.18rem;
                }
            </style>
        </head>
        <body>
            <div class="rival-chart-box">"""
    chart_html += "".join(chart_rows)
    chart_html += """
            </div>
        </body>
    </html>
    """
    chart_height = 92 + (len(chart_rows) * 78)
    components.html(chart_html, height=chart_height, scrolling=False)


def render_promotion_status_table(target_team: str = "בני יהודה") -> None:
    if all_playoff_results_complete():
        final_table = calculate_table_until_round(7)
        bnei_yehuda_row = final_table[final_table["team"] == target_team].iloc[0]
        if int(bnei_yehuda_row["rank"]) <= 2:
            st.success("בני יהודה עלתה ליגה")
        else:
            st.error("בני יהודה נשארה בלאומית")
        return

    scenarios = enumerate_target_only_scenarios(target_team)
    current_playoff_total = playoff_points_so_far(target_team)
    remaining_points_available = len(unresolved_match_ids_for_team(target_team)) * 3
    unique_totals = sorted({int(item["playoff_points_total"]) for item in scenarios})
    default_total = unique_totals[-1] if unique_totals else current_playoff_total
    raw_total = st.session_state.get("promotion_gain_selector", default_total)
    snapped_total = raw_total
    if unique_totals and raw_total not in unique_totals:
        snapped_total = min(unique_totals, key=lambda value: (abs(value - int(raw_total)), -value))
        st.session_state["promotion_gain_selector"] = snapped_total

    st.markdown(
        '<div class="promotion-heading">האם בני יהודה תלויה רק בעצמה?</div>',
        unsafe_allow_html=True,
    )
    st.markdown(
        f"""
        <div class="promotion-text">
            כרגע נותרו לבני יהודה {len(unresolved_match_ids_for_team(target_team))} משחקים פתוחים, והיא לקחה {current_playoff_total} נקודות עד כה בפלייאוף.
            נותרו עוד {remaining_points_available} נקודות בקופה. ההנחה היא שבמצב של שוויון נקודות ליריבה יהיה הפרש שערים טוב יותר ובני יהודה לא תעלה.
            זהו סליידר שמחשב את מספר הנקודות המירבי שהיריבות יכולות לקחת במשחקים שנותרו כדי שבני יהודה תעלה עם מספר הנקודות שנבחר.
        </div>
        """,
        unsafe_allow_html=True,
    )

    slider_label = (
        f"בדוק מה מספר הנקודות המקסימלי שיכולה כל יריבה לקחת במשחקי הפלייאוף שנותרו, בתרחיש שבו בני יהודה לוקחת {snapped_total} נקודות"
    )
    if len(unique_totals) <= 1:
        effective_total = unique_totals[0] if unique_totals else current_playoff_total
        st.markdown(
            f'<div class="promotion-text"><strong>בדוק מה מספר הנקודות המקסימלי שיכולה כל יריבה לקחת במשחקי הפלייאוף שנותרו, בתרחיש שבו בני יהודה לוקחת {effective_total} נקודות</strong></div>',
            unsafe_allow_html=True,
        )
    else:
        st.markdown(
            f'<div class="promotion-slider-label"><strong>{slider_label}</strong></div>',
            unsafe_allow_html=True,
        )
        selected_total = st.select_slider(
            "בחירת נקודות לבני יהודה",
            options=unique_totals,
            value=snapped_total,
            key="promotion_gain_selector",
            label_visibility="collapsed",
        )
        effective_total = selected_total

    gain_scenarios = [item for item in scenarios if int(item["playoff_points_total"]) == int(effective_total)]
    last_sent_gain = st.session_state.get("ga4_last_promotion_gain_sent")
    if last_sent_gain != int(effective_total):
        send_ga4_event(
            "promotion_gain_selected",
            {
                "selected_gain": int(effective_total),
                "scenario_count": len(gain_scenarios),
            },
        )
        st.session_state["ga4_last_promotion_gain_sent"] = int(effective_total)

    scenario = max(
        gain_scenarios,
        key=lambda item: (
            int(item["total_allowed_extra"]),
            -int(item["rivals_above"]),
            item["scenario_key"],
        ),
    )
    st.markdown(
        f"##### מספר הנקודות המירבי שיכולות לקחת היריבות במשחקים שנותרו, כדי שבני יהודה עדיין תעלה ליגה אם תיקח {effective_total} נקודות במהלך הפלייאוף העליון",
    )
    render_rival_caps_chart(target_team, scenario, int(effective_total))


def fixtures_overview() -> pd.DataFrame:
    rows = []
    for round_number, matches in FIXTURES.items():
        for home_team, away_team in matches:
            rows.append(
                {
                    "מחזור": round_number,
                    "משחק": f"{home_team} vs {away_team}",
                }
            )
    return pd.DataFrame(rows)


def render_round_section(round_number: int, completed_results: dict[str, dict[str, int | None]]) -> None:
    matches = FIXTURES[round_number]
    table_slot = st.empty()
    st.markdown("#### משחקים")

    for match_number, (home_team, away_team) in enumerate(matches, start=1):
        current_match_id = match_id(round_number, match_number)
        home_key = f"{current_match_id}_home"
        away_key = f"{current_match_id}_away"
        is_completed = current_match_id in completed_results
        home_value, away_value = current_match_score(current_match_id)

        if is_completed:
            st.markdown(
                render_match_label(home_team, away_team, home_value, away_value, is_completed),
                unsafe_allow_html=True,
            )
        else:
            (
                away_minus_col,
                away_input_col,
                away_plus_col,
                label_col,
                home_minus_col,
                home_input_col,
                home_plus_col,
            ) = st.columns([0.34, 0.5, 0.34, 5.3, 0.34, 0.5, 0.34])
            with away_minus_col:
                st.button(
                    "-",
                    key=f"{current_match_id}_away_minus",
                    use_container_width=True,
                    on_click=adjust_score,
                    args=(current_match_id, "away", -1),
                )
            with away_input_col:
                st.number_input(
                    f"{away_team} שערים",
                    min_value=0,
                    step=1,
                    value=int(st.session_state.get(away_key, 0)),
                    key=away_key,
                    label_visibility="collapsed",
                    placeholder="ח",
                    on_change=mark_score_touched,
                    args=(current_match_id, "away"),
                )
            with away_plus_col:
                st.button(
                    "+",
                    key=f"{current_match_id}_away_plus",
                    use_container_width=True,
                    on_click=adjust_score,
                    args=(current_match_id, "away", 1),
                )
            with label_col:
                st.markdown(
                    render_match_label(home_team, away_team, home_value, away_value, is_completed),
                    unsafe_allow_html=True,
                )
            with home_minus_col:
                st.button(
                    "-",
                    key=f"{current_match_id}_home_minus",
                    use_container_width=True,
                    on_click=adjust_score,
                    args=(current_match_id, "home", -1),
                )
            with home_input_col:
                st.number_input(
                    f"{home_team} שערים",
                    min_value=0,
                    step=1,
                    value=int(st.session_state.get(home_key, 0)),
                    key=home_key,
                    label_visibility="collapsed",
                    placeholder="ב",
                    on_change=mark_score_touched,
                    args=(current_match_id, "home"),
                )
            with home_plus_col:
                st.button(
                    "+",
                    key=f"{current_match_id}_home_plus",
                    use_container_width=True,
                    on_click=adjust_score,
                    args=(current_match_id, "home", 1),
                )

    action_col1, action_col2 = st.columns(2)
    action_col1.button(
        f"עדכן מחזור {round_number}",
        key=f"update_round_{round_number}",
        use_container_width=True,
        on_click=update_round_results,
        args=(round_number,),
    )
    action_col2.button(
        f"איפוס מחזור {round_number}",
        key=f"clear_round_{round_number}",
        use_container_width=True,
        on_click=clear_round_results,
        args=(round_number,),
    )
    with table_slot.container():
        updated_table = calculate_table_until_round(round_number)
        render_table(updated_table, f"מחזור {round_number}", compact=True)


def render_round_group(
    round_numbers: list[int],
    completed_results: dict[str, dict[str, int | None]],
    mobile_layout: bool,
) -> None:
    if mobile_layout:
        for round_number in round_numbers:
            with st.expander(f"מחזור {round_number}", expanded=False):
                render_round_section(round_number, completed_results)
        return

    display_rounds = list(reversed(round_numbers))
    row_columns = st.columns(len(display_rounds))
    for target_col, round_number in zip(row_columns, display_rounds):
        with target_col:
            render_round_section(round_number, completed_results)


ensure_session_state()
mobile_layout = is_mobile_client()
st.session_state.layout_mode = "mobile" if mobile_layout else "desktop"
send_ga4_page_view()
send_ga4_event(
    "app_opened",
    {
        "app_version": "playoff_streamlit",
    },
    once_key="ga4_app_opened_sent",
)


st.markdown(
    """
    <style>
    html, body, .stApp {
        background: linear-gradient(180deg, #f7f4ea 0%, #fefdf9 100%);
    }

    .stApp {
        max-width: 1450px;
        margin: 0 auto;
    }

    .block-container {
        padding-top: 1.2rem;
        padding-bottom: 2rem;
    }

    .hero-box,
    .compact-round-box,
    .season-box,
    .status-box,
    .site-footer,
    .slider-value {
        direction: rtl;
        text-align: right;
    }

    .hero-box {
        background: linear-gradient(135deg, #183153 0%, #2b5876 100%);
        color: white;
        padding: 0.9rem 1.1rem;
        border-radius: 20px;
        margin-bottom: 0.55rem;
        box-shadow: 0 14px 30px rgba(24, 49, 83, 0.16);
    }

    .hero-box h1, .hero-box p {
        color: white;
        margin: 0;
    }

    .hero-box p {
        margin-top: 0.22rem;
        font-size: 0.9rem;
        opacity: 0.92;
    }

    h3, h4, h5 {
        text-align: right;
        width: 100%;
    }

    .table-caption {
        direction: rtl;
        text-align: right;
        color: #66604f;
        font-size: 0.82rem;
        margin-bottom: 0.18rem;
    }

    [data-testid="stExpander"] summary {
        direction: rtl;
        text-align: right;
    }

    [data-testid="stExpanderDetails"] {
        direction: rtl;
        text-align: right;
    }

    .rtl-table {
        direction: rtl;
        text-align: right;
    }

    .rtl-table table {
        direction: rtl;
        margin-right: 0;
        margin-left: auto;
    }

    .rtl-table th,
    .rtl-table td {
        text-align: right !important;
    }

    .promotion-text {
        direction: rtl;
        text-align: right;
        width: 100%;
        color: #243b53;
    }

    .promotion-heading {
        direction: rtl;
        text-align: right;
        width: 100%;
        font-size: 1.6rem;
        font-weight: 700;
        color: #183153;
        margin: 0 0 0.5rem 0;
    }

    .promotion-slider-label {
        direction: rtl;
        text-align: right;
        width: 100%;
        color: #243b53;
        margin: 0.15rem 0 0.25rem 0;
    }

    .promotion-text p {
        margin: 0.2rem 0 0.45rem 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 16px;
        overflow: hidden;
    }

    th {
        background: #e9f1f7;
    }

    th, td {
        text-align: right !important;
        padding: 0.28rem 0.38rem !important;
        border-bottom: 1px solid #edf1f5;
        font-size: 0.8rem !important;
    }

    .compact-round-box {
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #dfe8ef;
        border-radius: 18px;
        padding: 0.6rem 0.65rem 0.45rem 0.65rem;
        margin-bottom: 0.65rem;
        box-shadow: 0 8px 22px rgba(24, 49, 83, 0.08);
        height: 100%;
    }

    .compact-match {
        padding: 0.18rem 0;
        border-top: 1px solid #eef3f7;
    }

    .compact-match.is-completed {
        border-radius: 10px;
        padding: 0.28rem 0.35rem;
    }

    .compact-match-label {
        font-size: 0.78rem;
        line-height: 1.15;
        color: #243b53;
        display: flex;
        align-items: center;
        gap: 0.28rem;
        flex-wrap: wrap;
        direction: rtl;
        justify-content: flex-start;
        width: 100%;
        text-align: right;
    }

    .compact-match.is-completed .compact-match-label {
        font-weight: 800;
    }

    .match-side-tag {
        font-size: 0.68rem;
        color: #6c7a89;
        direction: rtl;
    }

    .match-final-subline {
        font-size: 0.64rem;
        color: #6c7a89;
        text-align: right;
        margin-top: 0.14rem;
        padding-right: 0.1rem;
    }

    .match-team {
        display: inline-block;
        border-radius: 999px;
        padding: 0.08rem 0.38rem;
    }

    .match-score-chip {
        display: inline-block;
        min-width: 2.4rem;
        text-align: center;
        font-weight: 800;
        color: #183153;
        direction: ltr;
    }

    .match-team-win {
        background: #dff4e4;
    }

    .match-team-loss {
        background: #f9dddd;
    }

    .match-team-draw {
        background: #ececec;
    }

    .compact-round-box .stNumberInput {
        margin-bottom: 0 !important;
    }

    .compact-round-box .stButton button {
        min-height: 22px;
        padding: 0;
        font-size: 0.68rem;
        border-radius: 8px;
    }

    .compact-round-box [data-testid="stMarkdownContainer"] p {
        margin-bottom: 0;
    }

    .compact-round-box [data-testid="stNumberInput"] input {
        min-height: 22px !important;
        padding-top: 0.02rem !important;
        padding-bottom: 0.02rem !important;
        padding-left: 0.12rem !important;
        padding-right: 0.12rem !important;
        font-size: 0.68rem !important;
    }

    .compact-round-box [data-testid="column"] {
        gap: 0.12rem;
    }

    .season-box {
        background: rgba(255, 255, 255, 0.94);
        border: 1px solid #d8e4ec;
        border-radius: 20px;
        padding: 0.7rem 0.8rem 0.55rem 0.8rem;
        box-shadow: 0 12px 24px rgba(24, 49, 83, 0.09);
        height: 100%;
    }

    .status-box {
        background: linear-gradient(135deg, #f4efe0 0%, #fbfaf5 100%);
        border: 1px solid #eadfb5;
        border-radius: 16px;
        padding: 0.75rem 0.9rem;
        margin: 0.6rem 0 0.5rem 0;
    }

    .slider-value {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 800;
        color: #183153;
        margin: 0.2rem 0 0.6rem 0;
    }

    .rival-chart-box {
        background: #fbfaf6;
        border: 1px solid #e7dfcf;
        border-radius: 16px;
        padding: 0.75rem 0.85rem;
        margin-top: 0.25rem;
    }

    .rival-chart-row + .rival-chart-row {
        margin-top: 0.7rem;
    }

    .rival-chart-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.7rem;
        font-size: 0.92rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
    }

    .rival-chart-team,
    .rival-chart-value {
        color: #1e1e1e;
    }

    .rival-chart-track {
        width: 100%;
        height: 12px;
        background: #ece7da;
        border-radius: 999px;
        overflow: hidden;
    }

    .rival-chart-fill {
        height: 100%;
        border-radius: 999px;
    }

    .rival-chart-note {
        font-size: 0.73rem;
        color: #66604f;
        margin-top: 0.18rem;
    }

    .site-footer {
        margin-top: 1.1rem;
        padding-top: 0.8rem;
        border-top: 1px solid #dbe5ec;
        color: #516271;
        font-size: 0.88rem;
    }

    div[data-testid="stAlert"] {
        direction: rtl;
        text-align: right;
    }

    div[data-testid="stAlert"] * {
        text-align: right !important;
    }

    .site-footer a {
        color: #183153;
        text-decoration: none;
        font-weight: 600;
    }

    .site-footer a:hover {
        text-decoration: underline;
    }

    @media (max-width: 900px) {
        .stApp {
            max-width: 100%;
        }

        .block-container {
            padding-top: 0.8rem;
            padding-left: 0.7rem;
            padding-right: 0.7rem;
            padding-bottom: 1.3rem;
        }

        .hero-box {
            padding: 0.85rem 0.9rem;
            border-radius: 16px;
        }

        .hero-box h1 {
            font-size: 1.45rem;
            line-height: 1.15;
        }

        .hero-box p {
            font-size: 0.84rem;
        }

        .compact-match-label {
            font-size: 0.74rem;
            gap: 0.22rem;
        }

        .match-score-chip {
            min-width: 2rem;
        }

        th, td {
            font-size: 0.72rem !important;
            padding: 0.24rem 0.28rem !important;
        }

        .promotion-heading {
            font-size: 1.3rem;
        }

        .promotion-text,
        .promotion-slider-label,
        .site-footer {
            font-size: 0.84rem;
        }

        .rival-chart-head {
            font-size: 0.84rem;
        }

        .rival-chart-note {
            font-size: 0.7rem;
        }
    }
    </style>
    """,
    unsafe_allow_html=True,
)


st.markdown(
    """
    <div class="hero-box">
        <h1>סימולטור פלייאוף עליון ליגה לאומית 2025/26</h1>
        <p>ניתן להזין תוצאות ידנית, או לטעון תרחיש אקראי שמראה אפשרות עלייה לליגת העל.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

button_col_left, button_col_right = st.columns(2)
if mobile_layout:
    load_random_promotion = button_col_left.button("תרחיש עלייה אקראי", use_container_width=True)
    reset_all = button_col_right.button("אפס הכל", use_container_width=True)
else:
    reset_all = button_col_left.button("אפס הכל", use_container_width=True)
    load_random_promotion = button_col_right.button("תרחיש עלייה אקראי", use_container_width=True)

if load_random_promotion:
    random_mapping = build_random_promotion_mapping()
    if random_mapping is None:
        send_ga4_event("random_promotion_failed")
        st.warning("לא נמצא תרחיש אקראי שבו בני יהודה עולה ליגה.")
    else:
        set_results_from_mapping(random_mapping)
        send_ga4_event(
            "random_promotion_loaded",
            {
                "randomized_match_count": len(random_mapping),
            },
        )

if reset_all:
    clear_inputs_and_results()


completed_results = load_completed_results()

for round_group in ([1, 2, 3], [4, 5, 6]):
    render_round_group(round_group, completed_results, mobile_layout)


if mobile_layout:
    with st.expander("מחזור 7", expanded=False):
        render_round_section(7, completed_results)
    final_table = calculate_table_until_round(7)
    final_table_title, final_table_caption = current_table_metadata()
    bnei_yehuda_row = final_table[final_table["team"] == "בני יהודה"].iloc[0]
    bnei_yehuda_rank = int(bnei_yehuda_row["rank"])
    render_table(final_table, final_table_title, compact=True, caption=final_table_caption)
    if bnei_yehuda_rank <= 2:
        st.success("בני יהודה עולה לליגת העל")
    else:
        st.error("בני יהודה נשארת בלאומית")
else:
    last_row_col_final, last_row_col_round7 = st.columns([2, 1])

    with last_row_col_round7:
        render_round_section(7, completed_results)

    with last_row_col_final:
        final_table = calculate_table_until_round(7)
        final_table_title, final_table_caption = current_table_metadata()
        bnei_yehuda_row = final_table[final_table["team"] == "בני יהודה"].iloc[0]
        bnei_yehuda_rank = int(bnei_yehuda_row["rank"])
        render_table(final_table, final_table_title, compact=True, caption=final_table_caption)
        if bnei_yehuda_rank <= 2:
            st.success("בני יהודה עולה לליגת העל")
        else:
            st.error("בני יהודה נשארת בלאומית")

if all_playoff_results_complete():
    send_ga4_event(
        "all_results_completed",
        {
            "bnei_yehuda_rank": bnei_yehuda_rank,
        },
        once_key="ga4_all_results_completed_sent",
    )

st.markdown("---")
render_promotion_status_table("בני יהודה")

st.markdown(
    """
    <div class="site-footer">
        © 2026 כל הזכויות שמורות. נבנה על ידי <a href="https://www.linkedin.com/in/rankeydar/" target="_blank">רן קידר</a>
    </div>
    """,
    unsafe_allow_html=True,
)
