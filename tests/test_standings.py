import pandas as pd

from core.standings import apply_match_result, calculate_table_from_results, build_table
from core.results import empty_results, match_id


def test_win_adds_three_points_and_goals():
    table = build_table()
    home = 'בני יהודה'
    away = 'קרית ים'

    before_home_points = int(table.loc[home, 'points'])
    before_away_points = int(table.loc[away, 'points'])

    apply_match_result(table, home, away, 2, 0)

    assert int(table.loc[home, 'points']) == before_home_points + 3
    assert int(table.loc[away, 'points']) == before_away_points
    assert int(table.loc[home, 'goals_for']) >= 36


def test_draw_adds_one_point_to_each_team():
    table = build_table()
    home = 'בני יהודה'
    away = 'קרית ים'

    before_home_points = int(table.loc[home, 'points'])
    before_away_points = int(table.loc[away, 'points'])

    apply_match_result(table, home, away, 1, 1)

    assert int(table.loc[home, 'points']) == before_home_points + 1
    assert int(table.loc[away, 'points']) == before_away_points + 1


def test_unplayed_matches_are_ignored():
    results = empty_results()
    table = calculate_table_from_results(results, 7)
    bnei_row = table[table['team'] == 'בני יהודה'].iloc[0]

    assert int(bnei_row['points']) == 44
    assert int(bnei_row['goals_for']) == 34


def test_completed_result_changes_table():
    results = empty_results()
    results[match_id(1, 2)] = {'home_goals': 0, 'away_goals': 2}

    table = calculate_table_from_results(results, 1)
    bnei_row = table[table['team'] == 'בני יהודה'].iloc[0]

    assert int(bnei_row['points']) == 47
    assert int(bnei_row['goals_for']) == 36
