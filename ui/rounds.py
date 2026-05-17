import pandas as pd
import streamlit as st

from data.league_data import FIXTURES
from core.results import (
    adjust_score,
    clear_round_results,
    current_match_score,
    mark_score_touched,
    match_id,
    update_round_results,
)
from core.standings import calculate_table_until_round, is_round_completed_officially
from ui.matches import render_match_label
from ui.tables import render_table


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
    round_completed_officially = is_round_completed_officially(round_number, completed_results)

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
            if st.session_state.get("layout_mode") == "mobile":
                st.markdown(
                    render_match_label(home_team, away_team, home_value, away_value, is_completed),
                    unsafe_allow_html=True,
                )

                st.markdown(
                    f'<div class="mobile-score-row-label">בית · {home_team}</div>',
                    unsafe_allow_html=True,
                )
                home_plus_col, home_input_col, home_minus_col = st.columns([0.7, 0.9, 0.7])
                with home_plus_col:
                    st.button(
                        "+",
                        key=f"{current_match_id}_home_plus",
                        use_container_width=True,
                        on_click=adjust_score,
                        args=(current_match_id, "home", 1),
                    )
                with home_input_col:
                    st.markdown(
                        f'<div class="mobile-score-value">{int(st.session_state.get(home_key, 0))}</div>',
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

                st.markdown(
                    f'<div class="mobile-score-row-label">חוץ · {away_team}</div>',
                    unsafe_allow_html=True,
                )
                away_plus_col, away_input_col, away_minus_col = st.columns([0.7, 0.9, 0.7])
                with away_plus_col:
                    st.button(
                        "+",
                        key=f"{current_match_id}_away_plus",
                        use_container_width=True,
                        on_click=adjust_score,
                        args=(current_match_id, "away", 1),
                    )
                with away_input_col:
                    st.markdown(
                        f'<div class="mobile-score-value">{int(st.session_state.get(away_key, 0))}</div>',
                        unsafe_allow_html=True,
                    )
                with away_minus_col:
                    st.button(
                        "-",
                        key=f"{current_match_id}_away_minus",
                        use_container_width=True,
                        on_click=adjust_score,
                        args=(current_match_id, "away", -1),
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

    if not round_completed_officially:
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
