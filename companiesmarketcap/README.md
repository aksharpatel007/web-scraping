# Web Scraping With Python

## Overview

Lightweight Python scraper that extracts company market-cap data, cleans and normalizes values, and exports a reproducible CSV for analysis and downstream ETL.

Target users: data analysts, data engineers, and portfolio reviewers.

## Key Features

- HTML parsing with BeautifulSoup and resilient selectors
- Configurable HTTP client (Requests) with headers, timeouts, and retries
- Data normalization with pandas (market cap → numeric, price, percentages)
- CSV export (primary) with optional JSON output
- Rate-limiting and polite-scraping controls
- Testable parsing functions and simple logging
- Modular codebase suitable for integration into ETL pipelines
- Optional Docker containerization

## Tech Stack

- Core: Python 3.11+, Requests, BeautifulSoup4, pandas, numpy
- Storage: CSV (default); extendable to PostgreSQL, SQLite, or S3
- Dev tools: pytest, black, isort, logging

## Quick Install & Run

Clone and run locally:

```bash
git clone https://github.com/<your-username>/Web_Scraping_With_Python.git
cd Web_Scraping_With_Python
python -m venv .venv
.venv\Scripts\activate    # Windows
source .venv/bin/activate  # macOS / Linux
pip install -r requirements.txt
python web_scraping.py
```

Docker (optional):

```bash
docker build -t web-scraper:latest .
docker run --rm -v "$PWD:/data" web-scraper:latest
```

## Usage & Configuration

- Edit `start`/`end`, `USER_AGENT`, and delay parameters in `web_scraping.py` to control scraping range and rate.
- Output will be saved as `Companies.csv` in the project root.

## Security

- Respect `robots.txt` and site terms of service; use rate-limiting and avoid excessive requests.

## License

MIT-style — adjust as needed.

## Contact

Maintainer: https://twitter.com/korfanakis
