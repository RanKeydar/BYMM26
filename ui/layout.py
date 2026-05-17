import streamlit as st


def is_mobile_client() -> bool:
    """Best-effort layout detection with optional query-param override."""
    try:
        query_params = st.query_params
        layout_override = str(query_params.get("layout", "")).strip().lower()
        if layout_override in {"mobile", "m", "1"}:
            return True
        if layout_override in {"desktop", "d", "0"}:
            return False
    except Exception:
        pass

    try:
        headers = getattr(st.context, "headers", None)
        user_agent = ""
        ua_mobile_hint = ""
        if headers is not None:
            user_agent = headers.get("user-agent", "") or headers.get("User-Agent", "")
            ua_mobile_hint = headers.get("sec-ch-ua-mobile", "") or headers.get("Sec-CH-UA-Mobile", "")
    except Exception:
        user_agent = ""
        ua_mobile_hint = ""

    if str(ua_mobile_hint).strip() in {"?1", "1", "true", "True"}:
        return True

    ua = str(user_agent).lower()
    mobile_tokens = ("mobile", "android", "iphone", "ipad", "ipod")
    return any(token in ua for token in mobile_tokens)
