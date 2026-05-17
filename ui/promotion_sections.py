import streamlit as st
import streamlit.components.v1 as components

from core.promotion import (
    enumerate_target_only_scenarios,
    estimate_bnei_yehuda_promotion_probability_from_results,
)
from core.results import (
    current_pending_matches,
    current_results_signature,
    merge_completed_results,
    official_pending_matches,
    official_results_signature,
    unresolved_match_ids_for_team,
)
from core.standings import (
    all_playoff_results_complete,
    calculate_table_until_round,
    playoff_points_so_far,
)
from services.analytics import send_ga4_event


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


def render_promotion_probability_section() -> None:
    st.markdown("### הסתברות עלייה משוערת")
    st.markdown(
        """
        <div class="promotion-text">
            לכל אחד מהמשחקים שנותרו יש הסתברות שווה:
            ניצחון בית, תיקו או ניצחון חוץ. לצורך החישוב הזה שוויון נקודות נחשב לרעת בני יהודה, כלומר בני יהודה לא עולה.
        </div>
        """,
        unsafe_allow_html=True,
    )

    official_signature = official_results_signature()
    current_signature = current_results_signature()
    current_matches_official = official_signature == current_signature
    official_result = st.session_state.get("promotion_probability_official_result")
    current_result = st.session_state.get("promotion_probability_current_result")

    if official_result and official_result.get("results_signature") != official_signature:
        st.session_state.pop("promotion_probability_official_result", None)
        official_result = None
    if current_result and current_result.get("results_signature") != current_signature:
        st.session_state.pop("promotion_probability_current_result", None)
        current_result = None

    official_pending_count = len(official_pending_matches())
    st.markdown(
        f'<div class="promotion-text"><strong>לפי התוצאות הרשמיות, נותרו כרגע {official_pending_count} משחקים פתוחים.</strong></div>',
        unsafe_allow_html=True,
    )
    if st.button("חשב הסתברות לפי התוצאות הרשמיות", use_container_width=True, key="estimate_promotion_probability_official_button"):
        with st.spinner("מחשב הסתברות לפי התוצאות הרשמיות..."):
            result = estimate_bnei_yehuda_promotion_probability_from_results(
                base_results=merge_completed_results({}),
                pending_matches=official_pending_matches(),
                signature=official_signature,
            )
        st.session_state["promotion_probability_official_result"] = result
        send_ga4_event(
            "official_results_probability_checked",
            {
                "simulation_count": int(result["simulation_count"]),
                "pending_match_count": int(result["pending_match_count"]),
                "promotion_probability_percent": round(float(result["promotion_probability"]) * 100, 2),
            },
        )
        official_result = result

    if official_result:
        probability_percent = float(official_result["promotion_probability"]) * 100
        promotion_count = int(official_result["promotion_count"])
        simulation_count = int(official_result["simulation_count"])
        st.markdown(
            f"""
            <div class="status-box">
                <strong>לפי התוצאות הרשמיות, הסתברות העלייה המשוערת של בני יהודה היא {probability_percent:.1f}%.</strong><br>
                בני יהודה עלתה ב־{promotion_count:,} מתוך {simulation_count:,} סימולציות.
            </div>
            """,
            unsafe_allow_html=True,
        )

    if current_matches_official:
        st.markdown(
            f"""
            <div class="status-box">
                <strong>כרגע ההזנה שעל המסך זהה לתוצאות הרשמיות.</strong><br>
                לכן לא מוצג חישוב נפרד, כדי להימנע מהבדלים אקראיים בין שתי סימולציות של אותו מצב בדיוק.
            </div>
            """,
            unsafe_allow_html=True,
        )
        return

    st.markdown(
        f'<div class="promotion-text"><strong>לפי ההזנה/הסימולציה הנוכחית במסך, נותרו כרגע {len(current_pending_matches())} משחקים פתוחים.</strong></div>',
        unsafe_allow_html=True,
    )
    if st.button("חשב הסתברות לפי ההזנה הנוכחית", use_container_width=True, key="estimate_promotion_probability_current_button"):
        with st.spinner("מחשב הסתברות לפי ההזנה הנוכחית..."):
            result = estimate_bnei_yehuda_promotion_probability_from_results(
                base_results=st.session_state.results,
                pending_matches=current_pending_matches(),
                signature=current_signature,
            )
        st.session_state["promotion_probability_current_result"] = result
        send_ga4_event(
            "current_input_probability_checked",
            {
                "simulation_count": int(result["simulation_count"]),
                "pending_match_count": int(result["pending_match_count"]),
                "promotion_probability_percent": round(float(result["promotion_probability"]) * 100, 2),
            },
        )
        current_result = result

    if current_result:
        probability_percent = float(current_result["promotion_probability"]) * 100
        promotion_count = int(current_result["promotion_count"])
        simulation_count = int(current_result["simulation_count"])
        st.markdown(
            f"""
            <div class="status-box">
                <strong>לפי ההזנה/הסימולציה הנוכחית, הסתברות העלייה המשוערת של בני יהודה היא {probability_percent:.1f}%.</strong><br>
                בני יהודה עלתה ב־{promotion_count:,} מתוך {simulation_count:,} סימולציות.
            </div>
            """,
            unsafe_allow_html=True,
        )
