import requests
from bs4 import BeautifulSoup


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

    for job_element in job_elements:
        title_el = job_element.find("h3" ,
                                    class_ = "base-search-card__title").text.strip()

        link_el = job_element.find("a" ,class_ = "base-card__full-link")
        link = link_el.get("href") if link_el else None
        company_name = job_element.find("h4" ,
                                        class_ = 'base-search-card__subtitle').text.strip()

        location_el = job_element.find("span" ,class_ =
        "job-search-card__location")
        location = location_el.text.strip() if location_el else None

        jobs.append({
            "title": title_el ,
            "company": company_name ,
            "location": location ,
            "link": link
        })

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
    if res.status_code == 200:
        print('It\'s an ok ')
        soup = BeautifulSoup(res.text ,"html.parser")
        # print(soup.prettify())
    else:
        print('Restricted access')

    job_results = soup.find_all('li' ,
                                class_ = 'react-job-listing')

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
                    "link": f"https://www.glassdoor.com{link_text}"
                })

    return jobs


def combine_scraped_jobs(job_name: str ,location_name: str):
    list1 ,list2 = scrape_linkedin(job_name ,location_name) ,scrape_glass_door(
        job_name ,location_name)

    new_list = [list1 ,list2]
    for e in new_list:
        print(f'Length of object: {len(e)}')
    return new_list


if __name__ == '__main__':
    scrape_glass_door('Software Engineering' ,'San Jose')
    # scrape_linkedin('Software Engineering', 'San Jose')
