import json
import os
import time
import urllib.error
import urllib.request
import uuid

import streamlit as st


GA_MEASUREMENT_ID = os.getenv("GA4_MEASUREMENT_ID", "G-2F4JGD7RLN")
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
