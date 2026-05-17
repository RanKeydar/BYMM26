import streamlit as st


def render_global_styles() -> None:
    st.markdown(
        """
        <style>
        html, body, .stApp {
            background: linear-gradient(180deg, #f7f4ea 0%, #fefdf9 100%);
        }

        .stApp {
            max-width: 1450px;
            margin: 0 auto;
        }

        .block-container {
            padding-top: 1.2rem;
            padding-bottom: 2rem;
        }

        .hero-box,
        .compact-round-box,
        .season-box,
        .status-box,
        .site-footer,
        .slider-value {
            direction: rtl;
            text-align: right;
        }

        .hero-box {
            background: linear-gradient(135deg, #183153 0%, #2b5876 100%);
            color: white;
            padding: 0.9rem 1.1rem;
            border-radius: 20px;
            margin-bottom: 0.55rem;
            box-shadow: 0 14px 30px rgba(24, 49, 83, 0.16);
        }

        .hero-box h1, .hero-box p {
            color: white;
            margin: 0;
        }

        .hero-box p {
            margin-top: 0.22rem;
            font-size: 0.9rem;
            opacity: 0.92;
        }

        h3, h4, h5 {
            text-align: right;
            width: 100%;
        }

        .table-caption {
            direction: rtl;
            text-align: right;
            color: #66604f;
            font-size: 0.82rem;
            margin-bottom: 0.18rem;
        }

        [data-testid="stExpander"] summary {
            direction: rtl;
            text-align: right;
        }

        [data-testid="stExpanderDetails"] {
            direction: rtl;
            text-align: right;
        }

        .rtl-table {
            direction: rtl;
            text-align: right;
        }

        .rtl-table table {
            direction: rtl;
            margin-right: 0;
            margin-left: auto;
        }

        .rtl-table th,
        .rtl-table td {
            text-align: right !important;
        }

        .promotion-text {
            direction: rtl;
            text-align: right;
            width: 100%;
            color: #243b53;
        }

        .promotion-heading {
            direction: rtl;
            text-align: right;
            width: 100%;
            font-size: 1.6rem;
            font-weight: 700;
            color: #183153;
            margin: 0 0 0.5rem 0;
        }

        .promotion-slider-label {
            direction: rtl;
            text-align: right;
            width: 100%;
            color: #243b53;
            margin: 0.15rem 0 0.25rem 0;
        }

        .promotion-text p {
            margin: 0.2rem 0 0.45rem 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 16px;
            overflow: hidden;
        }

        th {
            background: #e9f1f7;
        }

        th, td {
            text-align: right !important;
            padding: 0.28rem 0.38rem !important;
            border-bottom: 1px solid #edf1f5;
            font-size: 0.8rem !important;
        }

        .compact-round-box {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #dfe8ef;
            border-radius: 18px;
            padding: 0.6rem 0.65rem 0.45rem 0.65rem;
            margin-bottom: 0.65rem;
            box-shadow: 0 8px 22px rgba(24, 49, 83, 0.08);
            height: 100%;
        }

        .compact-match {
            padding: 0.18rem 0;
            border-top: 1px solid #eef3f7;
        }

        .compact-match.is-completed {
            border-radius: 10px;
            padding: 0.28rem 0.35rem;
        }

        .compact-match-label {
            font-size: 0.78rem;
            line-height: 1.15;
            color: #243b53;
            display: flex;
            align-items: center;
            gap: 0.28rem;
            flex-wrap: wrap;
            direction: rtl;
            justify-content: flex-start;
            width: 100%;
            text-align: right;
        }

        .compact-match.is-completed .compact-match-label {
            font-weight: 800;
        }

        .match-side-tag {
            font-size: 0.68rem;
            color: #6c7a89;
            direction: rtl;
        }

        .match-final-subline {
            font-size: 0.64rem;
            color: #6c7a89;
            text-align: right;
            margin-top: 0.14rem;
            padding-right: 0.1rem;
        }

        .match-team {
            display: inline-block;
            border-radius: 999px;
            padding: 0.08rem 0.38rem;
        }

        .match-score-chip {
            display: inline-block;
            min-width: 2.4rem;
            text-align: center;
            font-weight: 800;
            color: #183153;
            direction: ltr;
        }

        .match-team-win {
            background: #dff4e4;
        }

        .match-team-loss {
            background: #f9dddd;
        }

        .match-team-draw {
            background: #ececec;
        }

        .compact-round-box .stNumberInput {
            margin-bottom: 0 !important;
        }

        .compact-round-box .stButton button {
            min-height: 22px;
            padding: 0;
            font-size: 0.68rem;
            border-radius: 8px;
        }

        .compact-round-box [data-testid="stMarkdownContainer"] p {
            margin-bottom: 0;
        }

        .compact-round-box [data-testid="stNumberInput"] input {
            min-height: 22px !important;
            padding-top: 0.02rem !important;
            padding-bottom: 0.02rem !important;
            padding-left: 0.12rem !important;
            padding-right: 0.12rem !important;
            font-size: 0.68rem !important;
            -moz-appearance: textfield;
            appearance: textfield;
        }

        .compact-round-box [data-testid="stNumberInput"] input::-webkit-outer-spin-button,
        .compact-round-box [data-testid="stNumberInput"] input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .compact-round-box [data-testid="column"] {
            gap: 0.12rem;
        }

        .season-box {
            background: rgba(255, 255, 255, 0.94);
            border: 1px solid #d8e4ec;
            border-radius: 20px;
            padding: 0.7rem 0.8rem 0.55rem 0.8rem;
            box-shadow: 0 12px 24px rgba(24, 49, 83, 0.09);
            height: 100%;
        }

        .status-box {
            background: linear-gradient(135deg, #f4efe0 0%, #fbfaf5 100%);
            border: 1px solid #eadfb5;
            border-radius: 16px;
            padding: 0.75rem 0.9rem;
            margin: 0.6rem 0 0.5rem 0;
        }

        .slider-value {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 800;
            color: #183153;
            margin: 0.2rem 0 0.6rem 0;
        }

        .rival-chart-box {
            background: #fbfaf6;
            border: 1px solid #e7dfcf;
            border-radius: 16px;
            padding: 0.75rem 0.85rem;
            margin-top: 0.25rem;
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

        .site-footer {
            margin-top: 1.1rem;
            padding-top: 0.8rem;
            border-top: 1px solid #dbe5ec;
            color: #516271;
            font-size: 0.88rem;
        }

        div[data-testid="stAlert"] {
            direction: rtl;
            text-align: right;
        }

        div[data-testid="stAlert"] * {
            text-align: right !important;
        }

        .site-footer a {
            color: #183153;
            text-decoration: none;
            font-weight: 600;
        }

        .site-footer a:hover {
            text-decoration: underline;
        }

        .mobile-score-row-label {
            direction: rtl;
            text-align: right;
            font-size: 0.76rem;
            font-weight: 700;
            color: #4d4a42;
            margin-top: 0.28rem;
            margin-bottom: 0.08rem;
        }

        .mobile-score-value {
            direction: ltr;
            text-align: center;
            font-size: 0.92rem;
            font-weight: 800;
            color: #183153;
            background: #f4f7fb;
            border: 1px solid #dde6ee;
            border-radius: 10px;
            min-height: 22px;
            line-height: 22px;
        }

        @media (max-width: 900px) {
            .stApp {
                max-width: 100%;
            }

            .block-container {
                padding-top: 0.8rem;
                padding-left: 0.7rem;
                padding-right: 0.7rem;
                padding-bottom: 1.3rem;
            }

            .hero-box {
                padding: 0.85rem 0.9rem;
                border-radius: 16px;
            }

            .hero-box h1 {
                font-size: 1.45rem;
                line-height: 1.15;
            }

            .hero-box p {
                font-size: 0.84rem;
            }

            .compact-match-label {
                font-size: 0.74rem;
                gap: 0.22rem;
            }

            .match-score-chip {
                min-width: 2rem;
            }

            th, td {
                font-size: 0.72rem !important;
                padding: 0.24rem 0.28rem !important;
            }

            .promotion-heading {
                font-size: 1.3rem;
            }

            .promotion-text,
            .promotion-slider-label,
            .site-footer {
                font-size: 0.84rem;
            }

            .mobile-score-row-label {
                font-size: 0.73rem;
                margin-top: 0.18rem;
                margin-bottom: 0.04rem;
            }

            .mobile-score-value {
                font-size: 0.88rem;
                min-height: 22px;
                line-height: 22px;
            }

            .rival-chart-head {
                font-size: 0.84rem;
            }

            .rival-chart-note {
                font-size: 0.7rem;
            }
        }
        </style>
        """,
        unsafe_allow_html=True,
    )
