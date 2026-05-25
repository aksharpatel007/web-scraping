import csv
import requests
import time
from pathlib import Path
import math
# Categories to scrape
categories = [
    "watch",
    "shoes",
    "tshirt",
    "hoodie",
    "jeans",
    "kurta",
    "saree",
    "bag",
    "wallet",
    "perfume"
]

# Pagination settings
# `default_rows` is the requested page size; `max_rows` limits the maximum allowed.
default_rows = 50
max_rows = math.inf

# CSV file name
csv_file = Path(__file__).resolve().with_name("data.csv")

# Browser headers
headers = {
    "accept": "application/json, text/plain, */*",
    "referer": "https://www.myntra.com/",
    "user-agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/137.0.0.0 Safari/537.36"
    )
}

# Create session
session = requests.Session()

# Open Myntra homepage first
session.get("https://www.myntra.com/", headers=headers)

# Open CSV file
with csv_file.open("w", newline="", encoding="utf-8-sig") as file:

    # Proper CSV formatting
    writer = csv.writer(
        file,
        delimiter=",",
        quotechar='"',
        quoting=csv.QUOTE_MINIMAL
    )

    # CSV Header
    writer.writerow([
        "Category",
        "Product ID",
        "Product Name",
        "Brand",
        "Price",
        "Rating",
        "Rating Count",
        "Product URL",
        "Image URL"
    ])

    total_products = 0
    # Track seen product IDs to detect repeated pages and allow unlimited pagination
    seen_ids = set()
    consecutive_no_new = 0
    max_consecutive_no_new = 3

    # Loop through categories
    for category in categories:

        print(f"\n========== {category.upper()} ==========")

        offset = 0
        # enforce the maximum allowed rows per request
        rows = min(default_rows, max_rows)
        print(f"Using rows per page: {rows} (requested {default_rows}, max {max_rows})")

        while True:

            # API URL
            url = f"https://www.myntra.com/gateway/v2/search/{category}"

            # Query params
            params = {
                "rawQuery": category,
                "rows": rows,
                "o": offset,
                "plaEnabled": "false",
                "xdEnabled": "false",
                "pincode": ""
            }

            try:

                response = session.get(
                    url,
                    headers=headers,
                    params=params,
                    timeout=30
                )

                print(f"Status Code: {response.status_code}")

                if response.status_code != 200:
                    print(f"Blocked category -> {category}")
                    break

                # JSON response
                data = response.json()

                # Get products
                products = data.get("products", [])

                if not products:
                    products = data.get("data", {}).get("results", [])

                # Stop when no products
                if not products:
                    print("No more products found.")
                    break

                print(f"Fetched {len(products)} products")

                # Check for new products (prevents infinite loops if API repeats results)
                new_ids = [p.get("productId") for p in products if p.get("productId")]
                new_ids = [pid for pid in new_ids if pid not in seen_ids]

                if not new_ids:
                    consecutive_no_new += 1
                    print(f"No new products found on this page (consecutive {consecutive_no_new}).")
                    if consecutive_no_new >= max_consecutive_no_new:
                        print("No new products after several pages — stopping pagination.")
                        break
                else:
                    consecutive_no_new = 0
                    seen_ids.update(new_ids)

                # Insert into CSV
                for product in products:

                    product_id = product.get("productId", "")
                    product_name = product.get("productName", "")
                    brand = product.get("brand", "")
                    price = product.get("price", "")
                    rating = product.get("rating", "")
                    rating_count = product.get("ratingCount", "")
                    image_url = product.get("searchImage", "")
                    landing_page = product.get("landingPageUrl", "")

                    # Full product URL
                    full_product_url = (
                        f"https://www.myntra.com/{landing_page}"
                        if landing_page else ""
                    )

                    # Write row
                    writer.writerow([
                        category,
                        product_id,
                        product_name,
                        brand,
                        price,
                        rating,
                        rating_count,
                        full_product_url,
                        image_url
                    ])

                    total_products += 1

                    print(
                        f"{total_products} -> "
                        f"{category} -> {product_name}"
                    )

                # Next page
                offset += rows

                # Delay to avoid blocking
                time.sleep(2)

            except Exception as e:
                print(f"Error in {category}: {e}")
                break

print("\n====================================")
print(f"Total Products Saved: {total_products}")
print(f"CSV File Created: {csv_file}")
print("====================================")