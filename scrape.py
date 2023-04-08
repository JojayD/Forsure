import requests
from flask import request
from bs4 import BeautifulSoup


def scrape_linkedin(job_name: str, location_name: str ):
    job_name = job_name.replace(" ", '%20')
    location_name = location_name.replace(" ", '%20')
    url = f"https://www.linkedin.com/jobs/search?keywords={job_name}&location={location_name}"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    }

    res = requests.get(url, headers=headers)
    if res.status_code == 200:
        print('It\'s an ok ')
        soup = BeautifulSoup(res.content, "html.parser")

    else:
        print('Restricted access')

    job_elements = soup.find_all("div", class_='base-card')

    jobs = []

    for job_element in job_elements:
        title_el = job_element.find(
            "h3", class_='base-search-card__title').text.strip()

        link_el = job_element.find("a", class_='base-card__full-link')
        if link_el is not None and link_el.has_attr('href'):
            link = link_el.get('href')
        else:
            link = None

        time_el = job_element.find(
            "time", class_='job-search-card__listdate')
        if time_el is not None:
            time_el = time_el.text.strip()
        location = job_element.find(
            "span", class_='job-search-card__location').text.strip()

        jobs.append({'title': title_el, 'time': time_el,
                     'link': link, 'location': location})

    # for job in jobs:
        # print(job, end='\n'*2)
    
    return jobs                                                 



if __name__ == '__main__':
    scrape_linkedin('finance', 'sacramento')

