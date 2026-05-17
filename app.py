import streamlit as st

from core.promotion import build_random_promotion_mapping
from core.results import (
    clear_inputs_and_results,
    ensure_session_state,
    load_completed_results,
    set_results_from_mapping,
)
from core.standings import (
    all_playoff_results_complete,
    calculate_table_until_round,
    current_table_metadata,
)
from services.analytics import send_ga4_event, send_ga4_page_view
from ui.admin import render_admin_panel
from ui.layout import is_mobile_client
from ui.promotion_sections import (
    render_promotion_probability_section,
    render_promotion_status_table,
)
from ui.rounds import render_round_group, render_round_section
from ui.styles import render_global_styles
from ui.tables import render_table


st.set_page_config(page_title="מעלה מעלה", layout="wide")


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


render_global_styles()

st.markdown(
    """
    <div class="hero-box">
        <h1>סימולטור פלייאוף עליון ליגה לאומית 2025/26</h1>
        <p>ניתן להזין תוצאות ידנית, או לטעון תרחיש אקראי שמראה אפשרות עלייה לליגת העל.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

render_admin_panel()
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
            "random_promotion_scenario_loaded",
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
render_promotion_probability_section()
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
