from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from data_py.bay_area_cities import bay_area_cities
from data_py.la_cities import la_cities
from data_py.oc_cities import orange_county_cities
import zipfile
import time
import io
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options





def logoApi():
    url = "https://api.brandfetch.io/v2/brands/brandfetch.com"
    api_key = 'o266Z/Fes8JRkYQZhz6bj8/GVvGpiLdpiBrLeD/xOgc='
    headers = {
        "accept": "application/json" ,
        "Authorization": f"Bearer {api_key} "
    }

    response = requests.get(url ,headers = headers)


def scrape_linkedin(job_name: str ,location_name: str):
    job_name = job_name.replace(" " ,"%20")
    location_name = location_name.replace(" " ,"%20")
    url = f"https://www.linkedin.com/jobs/search?keywords={job_name}&location={location_name}"
    print(url)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
    }

    res = requests.get(url ,headers = headers)
    if res.status_code == 200:
        print("It's an ok")
    else:
        print("Restricted access")

    soup = BeautifulSoup(res.content ,"html.parser")
    job_elements = soup.find_all("div" ,class_ = "base-card")

    jobs = []
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options = chrome_options)

    json_endpoint = "https://path/to/json/endpoint"


    driver.get(url)
    time.sleep(1)
    scroll_pause_time = .5
    screen_height = driver.execute_script("return window.screen.height;")
    i = 1

    while i < 3:
        driver.execute_script(f"window.scrollTo(0, '{screen_height}*{i}');")
        i += 1
        time.sleep(scroll_pause_time)
        scroll_height = driver.execute_script(
            "return document.body.scrollHeight;")
        print(scroll_height)
        if screen_height * i > scroll_height:
            break

        for job_element in job_elements:
            try:
                title_el = job_element.find("h3" ,
                                            class_ = "base-search-card__title").text.strip()

                link_el = job_element.find("a" ,class_ = "base-card__full-link")
                link = link_el.get("href") if link_el else None
                company_name = job_element.find("h4" ,
                                                class_ = 'base-search-card__subtitle').text.strip()

                location_el = job_element.find("span" ,
                                               class_ = "job-search-card__location")
                location = location_el.text.strip() if location_el else None
                time_el = job_element.find("time" ,
                                           class_ = "job-search-card__listdate")

                result_time_el = time_el.text.strip() if time_el is not None else None
                salary_el = job_element.find("span" ,
                                             class_ = 'job-search-card__salary-info')
                salary_res_el = salary_el.text.strip().replace('\n' ,
                                                               '') if salary_el \
                                                                      is not \
                                                                      None else None

                jobs.append({
                    "title": title_el ,
                    "company": company_name ,
                    "location": location ,
                    "link": link ,
                    "time": result_time_el ,
                    "salary": salary_res_el ,
                    "website_name": 'linked-in'
                })
            except NoSuchElementException:
                print("Missing element")

            print(jobs)
    print(len(jobs))
    return jobs


def scrape_glass_door(job_name ,location_name):
    job_title = job_name.replace(' ' ,'-')
    location = location_name.replace(' ' ,'-')

    url = f"https://www.glassdoor.com/Job/{location_name}" \
          f"-{job_name}-SRCH_IL.0,8_IC1147436_KO9,26.htm?context=Jobs&clickSource=searchBox"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    }

    res = requests.get(url ,headers = headers)
    soup = BeautifulSoup(res.text ,"html.parser")
    if res.status_code == 200:
        print('It\'s an ok ')
        # print(soup.prettify())
    else:
        print('Restricted access')

    job_results = soup.find_all('li' ,class_ = 'react-job-listing')

    jobs = []

    for job in job_results:
        a_tags = job.find_all('a' ,class_ = 'jobLink')
        if a_tags:
            second_a_tag = a_tags [1].find('span')
            third_a_tag = a_tags [2].find('span')
            loc_tag = job.find('span' ,class_ = 'e1rrn5ka0')
            link_tag = job.find('a' ,class_ = 'jobLink')

            if link_tag is not None and link_tag.has_attr('href'):
                link_text = link_tag.get('href')

            if second_a_tag and third_a_tag:
                job_title_card = third_a_tag.text.strip()
                company_name = second_a_tag.text.strip()
                location_name = loc_tag.text.strip()

                jobs.append({
                    "title": job_title_card ,
                    "company": company_name ,
                    "location": location_name ,
                    "link": f"https://www.glassdoor.com{link_text}" ,
                    # "saved": False
                })

    return jobs


def scrape_craigslist(job_name: str ,location_name: str):
    #current chromium update 116.0.5845.110
    city_dic = {
        'sfbay': bay_area_cities ,
        'losangeles': la_cities ,
        'orangecounty': orange_county_cities
    }

    job_name = job_name.lower().replace(' ' ,'%20')
    location_name = location_name.lower().replace(' ' ,'')
    print(location_name)
    url = f"https://{location_name}.craigslist.org/search/jjj?query={job_name}#search=1~thumb~0~0"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    }
    print(url)
    chrome_options = Options()
    chrome_options.add_argument("--headless")

    # service = Service('/Users/jojo/chromedriver-mac-arm64')


    driver = webdriver.Chrome()

    try:
        res = requests.get(url ,headers = headers)
        soup = BeautifulSoup(res.text ,"html.parser")
        print(soup.prettify())
    except:
        print('Cannot get url')
        return None

    job_results = soup.find_all('li' ,class_ = 'cl-static-search-result')
    jobs = []
    for job in job_results:
        title_el = job.find('div' ,class_ = "title").text.strip()
        price_el = job.find('div' ,class_ = "price").text.strip()
        location_el = job.find('div' ,class_ = "location").text.strip()
        link_el = job.find('a')
        link = link_el.get("href") if link_el else None
        salary_el = job.find('div' ,class_ = "price")
        # print('Here is the salary',salary_el)
        driver.get(link)
        # print(driver.page_source)
        company_el_name = ''
        time_el = ''
        try:
            company_el_name = driver.find_element(By.CSS_SELECTOR ,
                                                  "h2.company-name").text.strip()
        except NoSuchElementException:
            company_el_name = None
            print('Could not find company name.')

        try:
            time_el = driver.find_element(By.CSS_SELECTOR ,
                                          'time.date').text.strip()
        except NoSuchElementException:
            time_el = None
            print('Could not find time element.')

        try:
            salary_el = driver.find_element(By.CSS_SELECTOR ,
                                            'p.attrgroup').text.strip()  # Adjust
            # the
            # selector for salary
        except NoSuchElementException:
            salary_el = None
            print('Could not find salary element.')

        print(
            f'Company: {company_el_name} | Time: {time_el} | Salary: {salary_el}')

        jobs.append({
            'title': title_el if title_el else None ,
            'company': company_el_name if company_el_name else None ,
            'location': location_el if location_el else None ,
            'link': link if link else None ,
            'time': time_el if time_el else None ,
            'salary': salary_el if salary_el else None ,
            'website_name': 'craigslist'
        })
        # sel_click()
    for job in jobs:
        print(job)


def combine_scraped_jobs(job_name: str ,location_name: str):
    list1 ,list2 = (scrape_linkedin(job_name ,location_name) ,
                     scrape_glass_door(job_name ,location_name))

    new_list = [list1 ,list2]
    for e in new_list:
        print(f'Length of object: {len(e)}')
    return new_list


if __name__ == '__main__':
    # scrape_glass_door('Software Engineering' ,'San Jose')
    # scrape_linkedin('Software Engineering' ,'San Jose')
    scrape_craigslist('Software Engineer' ,'chico')
