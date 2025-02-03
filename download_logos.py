import requests
import os

def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f"Successfully downloaded {filename}")
        else:
            print(f"Failed to download {url}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

# Create directory if it doesn't exist
os.makedirs('C:/Users/Admin/TRIBAL PORTFOLIO/assets/images/learning-platforms', exist_ok=True)

# Learning platform logos
logos = {
    'coursera': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Coursera_logo.svg/300px-Coursera_logo.svg.png',
    'udacity': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Udacity_logo.svg/300px-Udacity_logo.svg.png',
    'edx': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/EdX_logo.svg/300px-EdX_logo.svg.png',
    'pluralsight': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pluralsight_logo.svg/300px-Pluralsight_logo.svg.png'
}

for name, url in logos.items():
    download_image(url, f'C:/Users/Admin/TRIBAL PORTFOLIO/assets/images/learning-platforms/{name}-logo.png')
