
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
