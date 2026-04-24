import json
import os
import pandas as pd
import streamlit as st
import urllib.error
import urllib.request
import uuid


st.set_page_config(page_title="malamala", layout="wide")

GA_MEASUREMENT_ID = "G-2F4JGD7RLN"


TEAMS = [
    {"team": 'מכבי פ"ת', "goals_for": 67, "goals_against": 32, "points": 60},
    {"team": "מכבי הרצליה", "goals_for": 45, "goals_against": 35, "points": 50},
    {"team": 'הפועל ר"ג', "goals_for": 48, "goals_against": 36, "points": 49},
    {"team": 'הפועל ראשל"צ', "goals_for": 43, "goals_against": 33, "points": 48},
    {"team": "הפועל כפר שלם", "goals_for": 51, "goals_against": 47, "points": 47},
    {"team": "בני יהודה", "goals_for": 34, "goals_against": 37, "points": 44},
    {"team": "מועדון ספורט קריית ים", "goals_for": 43, "goals_against": 37, "points": 42},
    {"team": 'הפועל כפ"ס', "goals_for": 38, "goals_against": 39, "points": 41},
]


FIXTURES = {
    1: [
        ('מכבי פ"ת', "הפועל כפר שלם"),
        ('הפועל ר"ג', "בני יהודה"),
        ("מכבי הרצליה", "מועדון ספורט קריית ים"),
        ('הפועל ראשל"צ', 'הפועל כפ"ס'),
    ],
    2: [
        ("הפועל כפר שלם", 'הפועל כפ"ס'),
        ('מכבי פ"ת', "מכבי הרצליה"),
        ("בני יהודה", 'הפועל ראשל"צ'),
        ("מועדון ספורט קריית ים", 'הפועל ר"ג'),
    ],
    3: [
        ("מכבי הרצליה", "הפועל כפר שלם"),
        ('הפועל ר"ג', 'מכבי פ"ת'),
        ('הפועל ראשל"צ', "מועדון ספורט קריית ים"),
        ('הפועל כפ"ס', "בני יהודה"),
    ],
    4: [
        ("הפועל כפר שלם", "בני יהודה"),
        ("מכבי הרצליה", 'הפועל ר"ג'),
        ("מועדון ספורט קריית ים", 'הפועל כפ"ס'),
        ('מכבי פ"ת', 'הפועל ראשל"צ'),
    ],
    5: [
        ('הפועל כפ"ס', 'מכבי פ"ת'),
        ('הפועל ר"ג', "הפועל כפר שלם"),
        ('הפועל ראשל"צ', "מכבי הרצליה"),
        ("בני יהודה", "מועדון ספורט קריית ים"),
    ],
    6: [
        ("מכבי הרצליה", 'הפועל כפ"ס'),
        ('הפועל ר"ג', 'הפועל ראשל"צ'),
        ("הפועל כפר שלם", "מועדון ספורט קריית ים"),
        ('מכבי פ"ת', "בני יהודה"),
    ],
    7: [
        ('הפועל כפ"ס', 'הפועל ר"ג'),
        ("מועדון ספורט קריית ים", 'מכבי פ"ת'),
        ('הפועל ראשל"צ', "הפועל כפר שלם"),
        ("בני יהודה", "מכבי הרצליה"),
    ],
}


SCENARIOS = {
    "A. תרחיש ריק / ידני": {},
    "B. תרחיש מינימלי לעלייה של בני יהודה": {
        "r1_m1": (1, 2),
        "r1_m2": (0, 1),
        "r1_m3": (1, 1),
        "r1_m4": (1, 1),
        "r2_m1": (1, 1),
        "r2_m2": (1, 1),
        "r2_m3": (2, 1),
        "r2_m4": (1, 1),
        "r3_m1": (0, 0),
        "r3_m2": (1, 1),
        "r3_m3": (1, 0),
        "r3_m4": (0, 1),
        "r4_m1": (1, 2),
        "r4_m2": (0, 0),
        "r4_m3": (1, 0),
        "r4_m4": (2, 1),
        "r5_m1": (0, 2),
        "r5_m2": (1, 1),
        "r5_m3": (1, 0),
        "r5_m4": (2, 0),
        "r6_m1": (2, 1),
        "r6_m2": (1, 1),
        "r6_m3": (1, 1),
        "r6_m4": (1, 2),
        "r7_m1": (1, 1),
        "r7_m2": (1, 1),
        "r7_m3": (1, 1),
        "r7_m4": (2, 1),
    },
    "C. תרחיש ריאלי יותר לעלייה של בני יהודה": {
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


def ensure_session_state() -> None:
    if "results" not in st.session_state:
        st.session_state.results = empty_results()

    for round_number, matches in FIXTURES.items():
        for match_number, _ in enumerate(matches, start=1):
            current_match_id = match_id(round_number, match_number)
            home_key = f"{current_match_id}_home"
            away_key = f"{current_match_id}_away"
            if home_key not in st.session_state:
                st.session_state[home_key] = st.session_state.results[current_match_id]["home_goals"]
            if away_key not in st.session_state:
                st.session_state[away_key] = st.session_state.results[current_match_id]["away_goals"]


def set_results_from_mapping(mapping: dict[str, tuple[int, int]]) -> None:
    st.session_state.results = empty_results()

    for round_number, matches in FIXTURES.items():
        for match_number, _ in enumerate(matches, start=1):
            current_match_id = match_id(round_number, match_number)
            home_key = f"{current_match_id}_home"
            away_key = f"{current_match_id}_away"
            score = mapping.get(current_match_id)

            if score is None:
                st.session_state[home_key] = None
                st.session_state[away_key] = None
            else:
                st.session_state[home_key] = score[0]
                st.session_state[away_key] = score[1]
                st.session_state.results[current_match_id] = {
                    "home_goals": score[0],
                    "away_goals": score[1],
                }


def update_round_results(round_number: int) -> None:
    for match_number, _ in enumerate(FIXTURES[round_number], start=1):
        current_match_id = match_id(round_number, match_number)
        st.session_state.results[current_match_id] = {
            "home_goals": st.session_state.get(f"{current_match_id}_home"),
            "away_goals": st.session_state.get(f"{current_match_id}_away"),
        }


def clear_inputs_and_results() -> None:
    st.session_state.results = empty_results()
    for round_number, matches in FIXTURES.items():
        for match_number, _ in enumerate(matches, start=1):
            current_match_id = match_id(round_number, match_number)
            st.session_state[f"{current_match_id}_home"] = None
            st.session_state[f"{current_match_id}_away"] = None


def clear_round_results(round_number: int) -> None:
    for match_number, _ in enumerate(FIXTURES[round_number], start=1):
        current_match_id = match_id(round_number, match_number)
        st.session_state.results[current_match_id] = {"home_goals": None, "away_goals": None}
        st.session_state[f"{current_match_id}_home"] = None
        st.session_state[f"{current_match_id}_away"] = None


def send_ga4_page_view() -> None:
    api_secret = os.getenv("GA4_API_SECRET")
    if not api_secret:
        return

    if "ga4_client_id" not in st.session_state:
        st.session_state.ga4_client_id = str(uuid.uuid4())

    if st.session_state.get("ga4_page_view_sent", False):
        return

    payload = {
        "client_id": st.session_state.ga4_client_id,
        "events": [
            {
                "name": "page_view",
                "params": {
                    "page_title": "malamala",
                    "page_location": "https://malamala-by26.fly.dev",
                    "session_id": st.session_state.ga4_client_id,
                    "engagement_time_msec": 1,
                },
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
            st.session_state.ga4_page_view_sent = True
    except (urllib.error.URLError, TimeoutError):
        pass


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


def calculate_table_until_round(last_round: int) -> pd.DataFrame:
    table = build_table()

    for round_number in range(1, last_round + 1):
        for match_number, (home_team, away_team) in enumerate(FIXTURES[round_number], start=1):
            current_match_id = match_id(round_number, match_number)
            result = st.session_state.results[current_match_id]

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
        st.caption(caption)

    display_table = display_columns(table)
    if compact:
        display_table = display_table[["מיקום", "קבוצה", "נקודות", "הפרש שערים"]]
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
    st.markdown(styled.to_html(), unsafe_allow_html=True)


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


ensure_session_state()
send_ga4_page_view()


st.markdown(
    """
    <style>
    html, body, .stApp {
        direction: rtl;
        text-align: right;
        background: linear-gradient(180deg, #f7f4ea 0%, #fefdf9 100%);
    }

    .stApp {
        max-width: 1450px;
        margin: 0 auto;
    }

    * {
        direction: rtl;
        text-align: right;
    }

    .block-container {
        padding-top: 1.2rem;
        padding-bottom: 2rem;
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

    div[data-baseweb="select"] > div,
    div[data-baseweb="input"] > div,
    input {
        direction: rtl !important;
        text-align: right !important;
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

    .compact-round-box h3 {
        margin: 0 0 0.35rem 0;
        font-size: 0.98rem;
        color: #183153;
    }

    .compact-match {
        padding: 0.18rem 0;
        border-top: 1px solid #eef3f7;
    }

    .compact-match-label {
        font-size: 0.78rem;
        line-height: 1.15;
        color: #243b53;
    }

    .compact-round-box .stNumberInput {
        margin-bottom: 0 !important;
    }

    .compact-round-box [data-testid="stMarkdownContainer"] p {
        margin-bottom: 0;
    }

    .compact-round-box .stColumn {
        padding: 0 !important;
    }

    .compact-round-box h4 {
        margin: 0.1rem 0 0.35rem 0;
        color: #183153;
        font-size: 0.86rem;
    }

    .compact-round-box [data-testid="stNumberInput"] input {
        min-height: 32px !important;
        padding-top: 0.15rem !important;
        padding-bottom: 0.15rem !important;
        font-size: 0.8rem !important;
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

    .site-footer {
        margin-top: 1.1rem;
        padding-top: 0.8rem;
        border-top: 1px solid #dbe5ec;
        color: #516271;
        font-size: 0.88rem;
    }

    .site-footer a {
        color: #183153;
        text-decoration: none;
        font-weight: 600;
    }

    .site-footer a:hover {
        text-decoration: underline;
    }
    </style>
    """,
    unsafe_allow_html=True,
)


st.markdown(
    """
    <div class="hero-box">
        <h1>סימולטור פלייאוף עליון ליגה לאומית 2025/26</h1>
        <p>ניתן לטעון תרחיש או להזין תוצאות, ולבדוק האם בני יהודה תישאר בליגה הלאומית או שתעלה לליגת העל.</p>
    </div>
    """,
    unsafe_allow_html=True,
)


button_col1, button_col2, button_col3 = st.columns(3)
load_minimum = button_col1.button("טען תרחיש מינימום", use_container_width=True)
load_realistic = button_col2.button("טען תרחיש ריאלי", use_container_width=True)
reset_all = button_col3.button("איפוס מלא", use_container_width=True)

if load_minimum:
    set_results_from_mapping(SCENARIOS["B. תרחיש מינימלי לעלייה של בני יהודה"])

if load_realistic:
    set_results_from_mapping(SCENARIOS["C. תרחיש ריאלי יותר לעלייה של בני יהודה"])

if reset_all:
    clear_inputs_and_results()


for row_start in (1, 4):
    row_columns = st.columns(3)
    for offset in range(3):
        round_number = row_start + offset
        matches = FIXTURES[round_number]
        with row_columns[offset]:
            st.markdown('<div class="compact-round-box">', unsafe_allow_html=True)
            table_slot = st.empty()
            st.markdown("#### משחקים")

            for match_number, (home_team, away_team) in enumerate(matches, start=1):
                current_match_id = match_id(round_number, match_number)
                home_key = f"{current_match_id}_home"
                away_key = f"{current_match_id}_away"

                row_a, row_b, row_c = st.columns([4.9, 1, 1])
                with row_a:
                    st.markdown(
                        f'<div class="compact-match"><div class="compact-match-label"><strong>{home_team}</strong> מול <strong>{away_team}</strong></div></div>',
                        unsafe_allow_html=True,
                    )
                with row_b:
                    st.number_input(
                        f"{home_team} שערים",
                        min_value=0,
                        step=1,
                        value=st.session_state.get(home_key),
                        key=home_key,
                        label_visibility="collapsed",
                        placeholder="ב",
                    )
                with row_c:
                    st.number_input(
                        f"{away_team} שערים",
                        min_value=0,
                        step=1,
                        value=st.session_state.get(away_key),
                        key=away_key,
                        label_visibility="collapsed",
                        placeholder="ח",
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
            st.markdown("</div>", unsafe_allow_html=True)


last_row_col1, last_row_col2 = st.columns([1, 2])

with last_row_col1:
    st.markdown('<div class="compact-round-box">', unsafe_allow_html=True)
    table_slot = st.empty()
    st.markdown("#### משחקים")

    for match_number, (home_team, away_team) in enumerate(FIXTURES[7], start=1):
        current_match_id = match_id(7, match_number)
        home_key = f"{current_match_id}_home"
        away_key = f"{current_match_id}_away"

        row_a, row_b, row_c = st.columns([4.9, 1, 1])
        with row_a:
            st.markdown(
                f'<div class="compact-match"><div class="compact-match-label"><strong>{home_team}</strong> מול <strong>{away_team}</strong></div></div>',
                unsafe_allow_html=True,
            )
        with row_b:
            st.number_input(
                f"{home_team} שערים",
                min_value=0,
                step=1,
                value=st.session_state.get(home_key),
                key=home_key,
                label_visibility="collapsed",
                placeholder="ב",
            )
        with row_c:
            st.number_input(
                f"{away_team} שערים",
                min_value=0,
                step=1,
                value=st.session_state.get(away_key),
                key=away_key,
                label_visibility="collapsed",
                placeholder="ח",
            )
    action_col1, action_col2 = st.columns(2)
    action_col1.button(
        "עדכן מחזור 7",
        key="update_round_7",
        use_container_width=True,
        on_click=update_round_results,
        args=(7,),
    )
    action_col2.button(
        "איפוס מחזור 7",
        key="clear_round_7",
        use_container_width=True,
        on_click=clear_round_results,
        args=(7,),
    )
    with table_slot.container():
        updated_table = calculate_table_until_round(7)
        render_table(updated_table, "מחזור 7", compact=True)
    st.markdown("</div>", unsafe_allow_html=True)

with last_row_col2:
    st.markdown('<div class="season-box">', unsafe_allow_html=True)
    final_table = calculate_table_until_round(7)
    bnei_yehuda_row = final_table[final_table["team"] == "בני יהודה"].iloc[0]
    bnei_yehuda_rank = int(bnei_yehuda_row["rank"])
    render_table(final_table, "טבלת סיום עונה", compact=True)
    if bnei_yehuda_rank <= 2:
        st.success("בני יהודה עולה לליגת העל")
    else:
        st.error("בני יהודה נשארת בלאומית")
    st.markdown("</div>", unsafe_allow_html=True)

st.markdown(
    """
    <div class="site-footer">
        נבנה על ידי <a href="https://www.linkedin.com/in/rankeydar/" target="_blank">רן קידר</a>
    </div>
    """,
    unsafe_allow_html=True,
)
