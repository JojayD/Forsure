import requests
from flask import request
from bs4 import BeautifulSoup


def scrape_linkedin(job_name: str ,location_name: str):
    job_name = job_name.replace(" " ,'%20')
    location_name = location_name.replace(" " ,'%20')
    url = f"https://www.linkedin.com/jobs/search?keywords" \
          f"={job_name}&location={location_name}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    }

    res = requests.get(url ,headers = headers)
    if res.status_code == 200:
        print('It\'s an ok ')
        soup = BeautifulSoup(res.content ,"html.parser")

    else:
        print('Restricted access')

    job_elements = soup.find_all("div" ,class_ = 'base-card')

    jobs = []

    for job_element in job_elements:
        title_el = job_element.find(
            "h3" ,class_ = 'base-search-card__title').text.strip()

        link_el = job_element.find("a" ,class_ = 'base-card__full-link')
        if link_el is not None and link_el.has_attr('href'):
            link = link_el.get('href')
        else:
            link = None

        time_el = job_element.find(
            "time" ,class_ = 'job-search-card__listdate')
        if time_el is not None:
            time_el = time_el.text.strip()
        location = job_element.find(
            "span" ,class_ = 'job-search-card__location').text.strip()

        jobs.append({'title': title_el ,'time': time_el ,
                     'link': link ,'location': location})

    # for job in jobs:
    # print(job, end='\n'*2)

    return jobs


def scrape_glass_door(job_name ,location_name):
    job_title = job_name.replace(' ' ,'-')
    location = location_name.replace(' ' ,'-')
    url = f"https://www.glassdoor.com/Job/{location_name}" \
          f"-{job_name}-SRCH_IL.0,8_IC1147436_KO9,26.htm?context=Jobs&clickSource=searchBox"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    }

    res = requests.get(url, headers = headers)
    if res.status_code == 200:
        print('It\'s an ok ')
        soup = BeautifulSoup(res.text ,"html.parser")
        # print(soup.prettify())
    else:
        print('Restricted access')

    job_results = soup.find_all('li' ,
                                class_ = 'react-job-listing')

    # print(job_results[0].prettify())
    jobs = []

    for job in job_results:
        a_tags = job.find_all('a' ,class_ = 'jobLink')

        if a_tags:
            third_a_tag = a_tags[2]
            span_tag = third_a_tag.find('span')

            if span_tag:
                job_title_card = span_tag.text.strip()
                print(f"job_title_card: {job_title_card}")
            else:
                print("span_tag not found")
        else:
            print("second_a_tag not found")


if __name__ == '__main__':
    scrape_glass_door('Software Engineering' ,'San Jose')
