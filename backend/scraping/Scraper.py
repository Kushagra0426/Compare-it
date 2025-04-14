from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.keys import Keys
from webdriver_manager.firefox import GeckoDriverManager
import time
import sys
import os
import shutil

def scrapeFlipkartReviews(url, driver):
    try:

        driver.get(url)

        time.sleep(30)

        review_rating = []
        review_title = []
        review_text = []

        reviews = []

        review_rating_elements = driver.find_elements(By.CLASS_NAME, 'Ga3i8K')

        for ele in review_rating_elements:
            review_rating.append(ele.text.strip())

        review_title_elements = driver.find_elements(By.CLASS_NAME, 'z9E0IG')

        for ele in review_title_elements:
            review_title.append(ele.text.strip())

        review_text_elements = driver.find_elements(By.CLASS_NAME, 'ZmyHeo')

        for ele in review_text_elements:
            read_more_button = ele.find_element(By.TAG_NAME, 'div').find_elements(By.CLASS_NAME, 'b4x-fr')

            if read_more_button:
                read_more_button[0].click()
                time.sleep(5)

            review_text.append(ele.find_element(By.TAG_NAME, 'div').find_element(By.TAG_NAME, 'div').text.strip())

        if len(review_rating) == len(review_title) and len(review_rating) == len(review_text):

            for i in range(len(review_rating)):
                reviews.append({
                    "review_rating": review_rating[i],
                    "review_title": review_title[i],
                    "review_text": review_text[i]
                })

        return reviews

    except Exception as e:
        print(e)
        return []

def scrapeFlipkart(url):
    # print("Firefox path:", shutil.which("firefox"))
    # print("Geckodriver path:", shutil.which("geckodriver"))
    # print("Current PATH:", os.environ.get('PATH'))
    # print("Firefox exists:", os.path.exists('/usr/bin/firefox'))
    # print("Geckodriver exists:", os.path.exists('/tmp/bin/geckodriver'))
    
    firefox_options = Options()
    firefox_options.add_argument("--headless")
    
    # Explicit paths for Render
    # firefox_options.binary_location = '/usr/bin/firefox'  # Standard Firefox location
    service = Service(executable_path=GeckoDriverManager().install())
    
    driver = webdriver.Firefox(service=service, options=firefox_options)

    try:

        driver.get(url)

        time.sleep(30)
        # Take screenshot of the product page
        screenshot_name = "product_screenshot.png"
        driver.save_screenshot(screenshot_name)
        title = driver.find_element(By.CLASS_NAME, 'C7fEHH')

        highlights = driver.find_element(By.CLASS_NAME, 'U\+9u4y')

        specifications = driver.find_element(By.CLASS_NAME, '_3Fm-hO')

        title_dict = {}

        highlights_list = []

        specifications_dict = {}

        product_name = title.find_element(By.CLASS_NAME, 'VU-ZEz').text.strip()
        title_dict['product_name'] = product_name

        product_rating = title.find_element(By.CLASS_NAME, 'XQDdHH').text.strip()
        title_dict['product_rating'] = product_rating

        product_price = title.find_element(By.CLASS_NAME, 'CxhGGd').text.strip()
        title_dict['product_price'] = product_price

        highlight_elements = highlights.find_elements(By.CLASS_NAME, '_7eSDEz')

        for highlight in highlight_elements:
            highlights_list.append(highlight.text.strip())

        read_more_button = driver.find_elements(By.CLASS_NAME, 'QqFHMw._4FgsLt')

        if read_more_button:
            read_more_button[0].click()
            time.sleep(5)

        spec_elements = specifications.find_elements(By.CLASS_NAME, 'GNDEQ-')

        for spec_category in spec_elements:
            category_name = spec_category.find_element(By.CLASS_NAME, '_4BJ2V\+').text
            specifications_dict[category_name] = {}
            
            table = spec_category.find_elements(By.CLASS_NAME, '_0ZhAN9')

            if table:

                table_elements = table[0].find_elements(By.CLASS_NAME, 'WJdYP6')

                for row in table_elements:
                    key = row.find_element(By.CLASS_NAME, '\+fFi1w').text.strip()
                    value = row.find_element(By.CLASS_NAME, 'Izz52n').text.strip()
                    specifications_dict[category_name][key] = value

        # Print the extracted specifications
        # print("Product Details: ", title_dict)
        # print("Highlights: ", highlights_list)
        # print("Specifications: ", specifications_dict)

        # print("\nProcessing Reviews\n")

        review_link = driver.find_element(By.CLASS_NAME, 'col.pPAw9M').find_element(By.TAG_NAME, 'a').get_attribute('href')

        review_link = review_link.split('&aid=')[0] + "&sortOrder=MOST_HELPFUL&certifiedBuyer=false&aid=overall"

        # print(review_link)

        reviews = scrapeFlipkartReviews(review_link, driver)
        
        driver.quit()

        # print(reviews)

        # sys.exit(0)

        product_details = {"title": title_dict, "highlights": highlights_list, "specifications": specifications_dict, "reviews": reviews}

        return product_details

    except Exception as e:
        print(e)
        driver.quit()
        return {"title": {}, "highlights": [], "specifications": {}, "reviews": {}}

# scrapeFlipkart("https://www.flipkart.com/motorola-g45-5g-brilliant-blue-128-gb/p/itm1decbdd265f94?pid=MOBH3YKQT2HEAPAM&lid=LSTMOBH3YKQT2HEAPAMTX4TTX&marketplace=FLIPKART&store=tyy%2F4io&spotlightTagId=BestsellerId_tyy%2F4io&srno=b_1_1&otracker=CLP_BannerX3&fm=organic&iid=7da4c3d9-c5a1-4b0e-9e61-65369d487278.MOBH3YKQT2HEAPAM.SEARCH&ppt=browse&ppn=browse&ssid=op6ymv23sw0000001738252865021")
# scrapeFlipkartReviews("https://www.flipkart.com/motorola-g45-5g-brilliant-blue-128-gb/product-reviews/itm1decbdd265f94?pid=MOBH3YKQT2HEAPAM&lid=LSTMOBH3YKQT2HEAPAMTX4TTX&sortOrder=MOST_HELPFUL&certifiedBuyer=false&aid=overall")