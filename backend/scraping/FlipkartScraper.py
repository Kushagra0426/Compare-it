from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time, sys
from pprint import pprint

sys.stdout.reconfigure(encoding='utf-8')

# Set up Chrome WebDriver
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # run in headless mode if needed
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Open the Flipkart page
driver.get("https://www.flipkart.com/motorola-g45-5g-brilliant-blue-128-gb/p/itm1decbdd265f94?pid=MOBH3YKQT2HEAPAM&lid=LSTMOBH3YKQT2HEAPAMTX4TTX&marketplace=FLIPKART&store=tyy%2F4io&spotlightTagId=BestsellerId_tyy%2F4io&srno=b_1_1&otracker=CLP_BannerX3&fm=organic&iid=7da4c3d9-c5a1-4b0e-9e61-65369d487278.MOBH3YKQT2HEAPAM.SEARCH&ppt=browse&ppn=browse&ssid=op6ymv23sw0000001738252865021")

# Pause to allow for manual CAPTCHA entry
time.sleep(30)  # Adjust this based on how long it takes to complete the CAPTCHA

# Get the page content after the CAPTCHA is solved
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Close the driver
driver.quit()

# Now you can parse the data
# pprint(soup)

title = soup.find('div', class_='C7fEHH')

highlights = soup.find('div', class_='U+9u4y')

specifications = soup.find('div', class_='_3Fm-hO')
# print(content)

# Write the content to test1.html
# with open('test1.html', 'w', encoding='utf-8') as file:
#     file.write(str(content))

title_dict = {}

highlights_list = []

specifications_dict = {}

product_name = title.find('span', class_='VU-ZEz').text.strip()
title_dict['product_name'] = product_name

product_rating = title.find('div', class_='XQDdHH').text.strip()
title_dict['product_rating'] = product_rating

product_price = title.find('div', class_='Nx9bqj CxhGGd').text.strip()
title_dict['product_price'] = product_price

for highlight in highlights.find_all('li', class_='_7eSDEz'):
    highlights_list.append(highlight.text.strip())

for spec_category in specifications.find_all('div', class_='_4BJ2V+'):
    category_name = spec_category.text
    specifications_dict[category_name] = {}
    
    table = spec_category.find_next_sibling('table', class_='_0ZhAN9')
    if table:
        for row in table.find_all('tr', class_='WJdYP6'):
            key = row.find('td', class_='+fFi1w').text.strip()
            value = row.find('td', class_='Izz52n').text.strip()
            specifications_dict[category_name][key] = value

# Print the extracted specifications
print("Product Details: ", title_dict)
print("Highlights: ", highlights_list)
print("Specifications: ", specifications_dict)

print("\nProcessing Reviews\n")

review_link = soup.find('div', class_='col pPAw9M').find('a')['href']

if review_link:
    if review_link.startswith("/"):
        review_link = "https://www.flipkart.com" + review_link
    else:
        review_link = "https://www.flipkart.com/" + review_link

print(review_link)