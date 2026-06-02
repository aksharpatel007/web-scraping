# Web Scraping

This workspace contains two web scraping projects with clear, practical use cases. The goal is to collect online data, clean it, store it in a usable format, and present it in a simple structure for analysis or product display.

## Project Summary

### 1. Companies Market Cap Scraper
- Extracts company market cap data from a public website
- Cleans and normalizes the scraped values
- Exports the final dataset to CSV for analysis and reporting
- Uses Python, BeautifulSoup, Requests, and pandas

### 2. Myntra Ecommerce Scraping App
- Scrapes and displays product data for an ecommerce-style frontend
- Supports category-based browsing such as shoes, watches, and T-shirts
- Includes a React frontend and Node.js backend
- Stores and renders product data in a structured format

## Web Scraping Details

Web scraping is the process of collecting information from websites and converting it into structured data. In this workspace, the scraping workflow follows these steps:

1. Send an HTTP request to the target page.
2. Read the HTML response.
3. Parse the page content.
4. Extract the required fields.
5. Clean and normalize the data.
6. Save the final output in CSV or application storage.

## Tools and Technologies

- Python
- BeautifulSoup
- Requests
- pandas
- CSV export
- React
- Node.js
- Express.js
- MongoDB

## Skills Learned

- Web page inspection and data extraction
- HTML parsing and selector-based scraping
- Data cleaning and transformation
- CSV generation and structured output handling
- Frontend and backend integration
- Category-based filtering and product presentation
- Performance awareness and reduced loading time

## Best Practices

- Respect website terms of service and robots.txt
- Use polite scraping with delays and retries
- Avoid unnecessary requests
- Clean data before storage or analysis
- Keep code modular and reusable

## Learning Outcome

After completing these projects, a learner can understand how to collect website data, process it into a useful format, and build a basic product-driven application around it. These projects also build practical knowledge in Python automation, full-stack development, and structured data handling.

## Folder Structure

- `companiesmarketcap/` - Python scraping project for company market cap data
- `myntra/` - Ecommerce scraping and product display project

## Conclusion

This workspace is suitable for learning web scraping, building data pipelines, and creating product-based web applications. It demonstrates both data extraction and frontend presentation in a practical, beginner-friendly format.
