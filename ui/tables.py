import pandas as pd
import streamlit as st


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
