from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.settings import COHERE_API_KEY
import cohere
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time, sys
from pprint import pprint
from scraping.Scraper import scrapeFlipkart

# Create your views here.

client = cohere.Client(COHERE_API_KEY)

@csrf_exempt
def generate_response(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        product1 = data.get('product1')
        product2 = data.get('product2')
        
        # product1_details = get_product_details(product1)
        # product2_details = get_product_details(product2)

        product1_details = scrapeFlipkart(product1)
        time.sleep(10)
        # print("waits...")
        product2_details = scrapeFlipkart(product2)

        product_details = []
        highlights = []
        specifications = []
        reviews = []

        product_details.append(product1_details['title'])
        product_details.append(product2_details['title'])

        highlights.append(product1_details['highlights'])
        highlights.append(product2_details['highlights'])

        reviews.append(product1_details['reviews'])
        reviews.append(product2_details['reviews'])

        # Collect unique headings from both products
        product1_specifications = product1_details['specifications']
        product2_specifications = product2_details['specifications']

        unique_headings = set(product1_specifications.keys()).union(set(product2_specifications.keys()))

        # Initialize a dictionary to hold updated specifications
        updated_product1_specifications = {}
        updated_product2_specifications = {}

        for heading in unique_headings:
            # Get sub-headings for both products, or default to an empty dict
            product1_subheadings = product1_specifications.get(heading, {})
            product2_subheadings = product2_specifications.get(heading, {})

            # Collect unique sub-headings from both
            unique_subheadings = set(product1_subheadings.keys()).union(set(product2_subheadings.keys()))

            # Create updated sub-heading entries with "N/A" for missing values
            updated_product1_specifications[heading] = {
                sub_heading: product1_subheadings.get(sub_heading, "N/A")
                for sub_heading in unique_subheadings
            }
            updated_product2_specifications[heading] = {
                sub_heading: product2_subheadings.get(sub_heading, "N/A")
                for sub_heading in unique_subheadings
            }

        specifications.append(updated_product1_specifications)
        specifications.append(updated_product2_specifications)

        prompt = f"""You are given the product details of some products. Compare the product details of {product1_details['title']['product_name']} and 
                {product2_details['title']['product_name']} and tell which one is better by giving a brief conclusion summary of not more than 100 words 
                irrespective of individual preferences and budget constraints and telling the user which one to purchase. Don't show much comparison details
                here, just give your opinion. Return plain text without any formatting.
                The details of the products are given below:\n {product1_details} and {product2_details}"""

        response = client.chat(
            model="command-r-plus-08-2024",
            message=prompt,
        )

        conclusion = response.text

        response = {
            'product_details': product_details,
            'highlights': highlights,
            'specifications': specifications,
            'conclusion': conclusion,
            'reviews': reviews
        }

        return JsonResponse(response, status=200)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


