import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
import datetime
import numpy as np

# Configuration
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) "
    "Gecko/20100101 Firefox/92.0"
)
HEADERS = {"User-Agent": USER_AGENT}
BASE_URL = "https://companiesmarketcap.com/page/{}/"

# Helper: fetch a page and return raw HTML (raises on network errors)
def fetch_page(url, timeout=15):
    """Request a URL and return bytes of the response content.

    Raises for non-2xx responses so callers don't need to check status.
    """
    resp = requests.get(url, headers=HEADERS, timeout=timeout)
    resp.raise_for_status()
    return resp.content


# Helper: parse a page's HTML and return a DataFrame for that page
def parse_companies_from_html(html):
    """Parse company rows from a page and return a pandas.DataFrame.

    The function is resilient to missing pieces in individual rows.
    """
    soup = BeautifulSoup(html, "lxml")
    tbody = soup.find("tbody")
    if not tbody:
        return pd.DataFrame(columns=["Company", "Ticker", "Market Cap", "Price", "Daily Change", "Country"])

    rows = tbody.find_all("tr")

    companies, tickers, market_caps, prices, changes, countries = [], [], [], [], [], []

    for tr in rows:
        try:
            companies.append(tr.find("div", {"class": "company-name"}).text.strip())
        except Exception:
            companies.append(None)
        try:
            tickers.append(tr.find("div", {"class": "company-code"}).text.strip())
        except Exception:
            tickers.append(None)
        try:
            market_caps.append(tr.find_all("td", {"class": "td-right"})[1].text.strip())
        except Exception:
            market_caps.append(None)
        try:
            prices.append(tr.find_all("td", {"class": "td-right"})[2].text.strip())
        except Exception:
            prices.append(None)
        try:
            changes.append(tr.find_all("span")[1].text.strip())
        except Exception:
            changes.append(None)
        try:
            countries.append(tr.find_all("span", {"class": "responsive-hidden"})[0].text.strip())
        except Exception:
            countries.append(None)

    df = pd.DataFrame({
        "Company": companies,
        "Ticker": tickers,
        "Market Cap": market_caps,
        "Price": prices,
        "Daily Change": changes,
        "Country": countries,
    })

    return df


# Clean and normalize the scraped DataFrame
def clean_companies_df(df):
    """Perform basic cleaning and convert columns to numeric types where possible."""
    df = df.copy()

    # Standardize country names
    df["Country"].replace({"S. Arabia": "Saudi Arabia"}, inplace=True)

    # Replace placeholder N/A with NaN
    df.replace({"N/A": None}, inplace=True)

    # Strip extraneous whitespace/newlines from company names
    df["Company"] = df["Company"].astype(str).str.strip("\r\n ")

    # Market Cap: remove dollar sign and convert suffix T/B/M to numeric
    def _mc_to_float(x):
        if pd.isna(x):
            return None
        s = str(x).strip().lstrip("$")
        parts = s.split()
        try:
            val = float(parts[0])
            if len(parts) > 1:
                scale = parts[1].upper()
                if scale == "T":
                    mul = 1e12
                elif scale == "B":
                    mul = 1e9
                elif scale == "M":
                    mul = 1e6
                else:
                    mul = 1.0
            else:
                mul = 1.0
            return float(val) * mul
        except Exception:
            return None

    df["Market Cap"] = df["Market Cap"].apply(_mc_to_float).astype("Float64")

    # Price: remove $ and commas
    def _price_to_float(x):
        if pd.isna(x):
            return None
        try:
            return float(str(x).strip().lstrip("$").replace(",", ""))
        except Exception:
            return None

    df["Price"] = df["Price"].apply(_price_to_float).astype("Float64")

    # Daily Change: strip % and convert to float
    def _change_to_float(x):
        if pd.isna(x):
            return None
        try:
            return float(str(x).strip().rstrip("%"))
        except Exception:
            return None

    df["Daily Change (%)"] = df["Daily Change"].apply(_change_to_float).astype("Float64")
    df.drop(columns=["Daily Change"], inplace=True)

    df.reset_index(drop=True, inplace=True)
    return df


# Scrape multiple pages and return a cleaned DataFrame
def scrape_pages(start_page=1, end_page=1, sleep_min=5.0, sleep_max=20.0):
    """Scrape a range of pages (inclusive) and return the combined, cleaned DataFrame.

    Defaults to a single page. Increase `end_page` to scrape more.
    """
    all_dfs = []
    for p in range(start_page, end_page + 1):
        url = BASE_URL.format(p)
        html = fetch_page(url)
        page_df = parse_companies_from_html(html)
        all_dfs.append(page_df)
        # Respectful delay between requests
        time.sleep(random.uniform(sleep_min, sleep_max))

    combined = pd.concat(all_dfs, ignore_index=True) if all_dfs else pd.DataFrame()
    cleaned = clean_companies_df(combined) if not combined.empty else combined
    return cleaned


if __name__ == "__main__":
    # Example usage: scrape the first page only. Change end_page to scrape more pages.
    start = 1
    end = 1  # set to 62 to match the original notebook (takes much longer)

    print(f"Scraping pages {start} to {end}...")
    start_time = datetime.datetime.now()

    df = scrape_pages(start_page=start, end_page=end)

    elapsed = datetime.datetime.now() - start_time
    print(f"Done. Rows scraped: {len(df)}. Elapsed: {elapsed}.")

    # Save to CSV for later use
    df.to_csv("Companies.csv", index=False)
    print("Saved Companies.csv")
