# malamala | מעלהמעלה

Hebrew RTL Streamlit app for simulating Bnei Yehuda promotion scenarios during the Israeli National League top playoff.

**Live demo:** https://malamala-by26.fly.dev/

## Overview

`malamala` is a personal side project that combines football, data, product thinking and Python development.

The app lets users enter, simulate and analyze playoff match results, while dynamically recalculating the league table and checking whether Bnei Yehuda can finish in the top 2 and earn promotion.

What started as a small fan-oriented simulator evolved into a more complete product exercise: structured data, standings logic, scenario analysis, Hebrew RTL UI, deployment, persistent storage and a hidden admin interface for updating real-life completed results.

## Main Features

- Hebrew RTL interface
- Initial league table before the playoff rounds
- Full fixture list for playoff rounds 1–7
- Manual score input for every open match
- Random promotion scenario generator
- Automatic standings calculation after each round
- Final table ranking by:
  - Points
  - Goal difference
  - Goals scored
- Highlighting for Bnei Yehuda
- Clear promotion status message
- Estimated promotion probability based on remaining matches
- Scenario analysis for how many points rivals can still take
- Locked real-life completed results
- Hidden admin panel for updating final scores
- Persistent storage for completed results using Fly.io Volumes
- Docker/Fly.io deployment support

## Tech Stack

- Python
- Streamlit
- Pandas
- Docker
- Fly.io
- Fly Volumes
- Google Analytics 4 Measurement Protocol

## How the Standings Logic Works

The app starts from the current league table and applies every completed or simulated playoff match result.

For each match, it updates:

- Goals for
- Goals against
- Goal difference
- Wins
- Draws
- Losses
- Points

The table is then sorted by:

1. Points
2. Goal difference
3. Goals scored

For the promotion analysis, the app evaluates Bnei Yehuda's remaining possible point totals and estimates whether specific point scenarios are enough to finish in the top 2.

## Completed Results and Admin Mode

Completed real-life match results are stored as JSON and loaded automatically by the app.

When a match is marked as completed:

- It is loaded automatically when the app starts
- It is locked in the UI
- It cannot be edited by regular users
- It is not cleared by the reset buttons

The app includes a hidden admin mode that is only shown when a valid admin token is provided through the URL.

Example:

```text
https://malamala-by26.fly.dev/?admin_token=YOUR_ADMIN_TOKEN
```

The token is not stored in the code. It is provided through an environment variable:

```bash
ADMIN_TOKEN
```

On Fly.io it is configured as a secret:

```bash
fly secrets set ADMIN_TOKEN="your-secret-token" -a malamala-by26
```

The admin panel allows the admin to:

- Select a round
- Select a match
- Save a final score
- Lock that match for all regular users
- Remove a final score and return the match to regular editable mode

## Persistent Storage

The app stores completed results in a JSON file.

In production, the file is saved on a Fly.io Volume:

```text
/data/completed_results.json
```

This path is configured with:

```bash
COMPLETED_RESULTS_PATH=/data/completed_results.json
```

Using a Fly Volume prevents completed results from being overwritten on normal redeploys.

The app still keeps a local `completed_results.json` file in the repository as a fallback/default data file.

## Project Structure

```text
BYMM26/
├── app.py
├── completed_results.json
├── data/
│   ├── __init__.py
│   └── league_data.py
├── core/
│   ├── __init__.py
│   ├── promotion.py
│   ├── results.py
│   └── standings.py
├── services/
│   ├── __init__.py
│   └── analytics.py
├── ui/
│   ├── __init__.py
│   ├── admin.py
│   ├── layout.py
│   ├── matches.py
│   ├── promotion_sections.py
│   ├── rounds.py
│   ├── styles.py
│   └── tables.py
├── tests/
│   └── test_standings.py
├── Dockerfile
├── fly.toml
├── pyproject.toml
├── requirements.txt
└── README.md
```

## Local Setup

Create and activate a virtual environment:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

Run the app locally:

```powershell
python -m streamlit run app.py --server.port 8502
```

Open:

```text
http://localhost:8502
```

To test admin mode locally:

```powershell
$env:ADMIN_TOKEN="test123"
python -m streamlit run app.py --server.port 8502
```

Then open:

```text
http://localhost:8502/?admin_token=test123
```

## Running Tests

Install pytest if needed:

```powershell
python -m pip install pytest
```

Run tests:

```powershell
python -m pytest
```

Compile-check the main modules:

```powershell
python -m py_compile app.py .\data\league_data.py .\core\results.py .\core\standings.py .\core\promotion.py .\services\analytics.py .\ui\admin.py .\ui\layout.py .\ui\matches.py .\ui\promotion_sections.py .\ui\rounds.py .\ui\styles.py .\ui\tables.py
```

## Docker

Build the Docker image:

```bash
docker build -t bymm26 .
```

Run locally:

```bash
docker run -p 8501:8501 bymm26
```

Open:

```text
http://localhost:8501
```

## Deployment on Fly.io

The app is deployed on Fly.io.

Deploy:

```bash
fly deploy -a malamala-by26
```

The production app uses:

```toml
[env]
  PORT = "8501"
  COMPLETED_RESULTS_PATH = "/data/completed_results.json"

[mounts]
  source = "by26_data"
  destination = "/data"
```

Check machines:

```bash
fly machines list -a malamala-by26
```

Check logs:

```bash
fly logs -a malamala-by26
```

Open a shell:

```bash
fly ssh console -a malamala-by26
```

Inspect completed results on the volume:

```bash
cat /data/completed_results.json
```

## Notes

This is a personal side project and is not affiliated with Bnei Yehuda, the Israeli Football Association or the Israeli National League.

The promotion probability calculation is a simplified simulation model. It assumes equal probability for home win, draw and away win in remaining matches, and treats points ties conservatively against Bnei Yehuda for the purpose of some scenario calculations.

## Possible Next Steps

- Add screenshots/GIF to this README
- Add richer tests for promotion probability and scenario logic
- Add a small audit log for admin score updates
- Add a more advanced probability model based on team strength
- Add historical playoff data
- Replace `st.components.v1.html` with a future-compatible component approach when needed
- Add CI workflow for tests and linting

## Author

Built by [Ran Keydar](https://www.linkedin.com/in/rankeydar/).
