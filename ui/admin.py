import os

import streamlit as st

from data.league_data import FIXTURES
from core.results import (
    load_completed_results,
    match_id,
    merge_completed_results,
    save_completed_results,
)
from services.analytics import send_ga4_event


ADMIN_TOKEN = os.getenv("ADMIN_TOKEN")
def is_admin_mode() -> bool:
    if not ADMIN_TOKEN:
        return False

    try:
        provided_token = str(st.query_params.get("admin_token", "")).strip()
    except Exception:
        provided_token = ""

    if provided_token == ADMIN_TOKEN:
        st.session_state["is_admin"] = True

    return bool(st.session_state.get("is_admin", False))

def apply_completed_result_to_session(current_match_id: str, home_goals: int, away_goals: int) -> None:
    st.session_state.results[current_match_id] = {
        "home_goals": home_goals,
        "away_goals": away_goals,
    }
    st.session_state[f"{current_match_id}_home"] = home_goals
    st.session_state[f"{current_match_id}_away"] = away_goals
    st.session_state[f"{current_match_id}_home_touched"] = True
    st.session_state[f"{current_match_id}_away_touched"] = True

def clear_completed_result_from_session(current_match_id: str) -> None:
    st.session_state.results = merge_completed_results({})
    st.session_state[f"{current_match_id}_home"] = 0
    st.session_state[f"{current_match_id}_away"] = 0
    st.session_state[f"{current_match_id}_home_touched"] = False
    st.session_state[f"{current_match_id}_away_touched"] = False

def render_admin_panel() -> None:
    if not is_admin_mode():
        return

    st.divider()

    with st.expander("ניהול תוצאות סופיות", expanded=False):
        st.warning("מצב מנהל פעיל — עדכון כאן ישמור תוצאה סופית וינעל את המשחק לכל המשתמשים.")

        completed_results = load_completed_results()

        round_number = st.selectbox(
            "בחר מחזור",
            options=list(FIXTURES.keys()),
            key="admin_round_number",
        )

        match_options = []
        for match_number, (home_team, away_team) in enumerate(FIXTURES[round_number], start=1):
            current_match_id = match_id(round_number, match_number)
            match_options.append(
                {
                    "match_id": current_match_id,
                    "home_team": home_team,
                    "away_team": away_team,
                    "label": f"{home_team} - {away_team}",
                }
            )

        selected_match = st.selectbox(
            "בחר משחק",
            options=match_options,
            format_func=lambda match: match["label"],
            key="admin_selected_match",
        )

        current_match_id = selected_match["match_id"]
        existing_score = completed_results.get(current_match_id) or st.session_state.results.get(
            current_match_id,
            {"home_goals": 0, "away_goals": 0},
        )

        home_default = existing_score.get("home_goals")
        away_default = existing_score.get("away_goals")

        col1, col2 = st.columns(2)

        with col1:
            home_goals = st.number_input(
                f"שערים — {selected_match['home_team']}",
                min_value=0,
                max_value=20,
                value=0 if home_default is None else int(home_default),
                step=1,
                key=f"admin_{current_match_id}_home_goals",
            )

        with col2:
            away_goals = st.number_input(
                f"שערים — {selected_match['away_team']}",
                min_value=0,
                max_value=20,
                value=0 if away_default is None else int(away_default),
                step=1,
                key=f"admin_{current_match_id}_away_goals",
            )

        save_col, delete_col = st.columns(2)

        with save_col:
            if st.button("שמור כתוצאה סופית", type="primary", key=f"admin_save_{current_match_id}"):
                completed_results[current_match_id] = {
                    "home_goals": int(home_goals),
                    "away_goals": int(away_goals),
                }
                save_completed_results(completed_results)
                apply_completed_result_to_session(
                    current_match_id=current_match_id,
                    home_goals=int(home_goals),
                    away_goals=int(away_goals),
                )
                send_ga4_event(
                    "admin_completed_result_saved",
                    {
                        "match_id": current_match_id,
                        "round_number": round_number,
                    },
                )
                st.success("התוצאה נשמרה כתוצאה סופית.")
                st.rerun()

        with delete_col:
            if current_match_id in completed_results:
                if st.button("בטל נעילת תוצאה", key=f"admin_delete_{current_match_id}"):
                    completed_results.pop(current_match_id, None)
                    save_completed_results(completed_results)
                    clear_completed_result_from_session(current_match_id)
                    send_ga4_event(
                        "admin_completed_result_deleted",
                        {
                            "match_id": current_match_id,
                            "round_number": round_number,
                        },
                    )
                    st.success("התוצאה הסופית הוסרה. המשחק חזר לעריכה רגילה.")
                    st.rerun()
