import json
import requests
from bs4 import BeautifulSoup
import time
import os

def get_profile_pic(channel_url):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    try:
        response = requests.get(channel_url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        og_image = soup.find("meta", property="og:image")
        if og_image and og_image.get("content"):
            return og_image["content"]
        scripts = soup.find_all("script", type="application/ld+json")
        for script in scripts:
            if 'image' in script.text:
                try:
                    data = json.loads(script.text)
                    return data.get("image")
                except:
                    continue
    except Exception as e:
        print(f"Error fetching {channel_url}: {e}")
    return None

# Path to the JSON file
json_path = os.path.join(os.path.dirname(__file__), '../public/json/formatted_placeholder.json')
output_path = os.path.join(os.path.dirname(__file__), '../public/json/formatted_placeholder_with_avatars.json')

# Load your JSON file
with open(json_path, 'r') as f:
    data = json.load(f)

# Extract unique channel URLs
channel_urls = set()
for video in data:
    url = video.get('channelUrl') or video.get('channel_url')
    if url:
        channel_urls.add(url)

# Fetch profile pictures
channel_avatars = {}
for url in channel_urls:
    print(f"Fetching avatar for {url}...")
    avatar = get_profile_pic(url)
    if avatar:
        channel_avatars[url] = avatar
    else:
        channel_avatars[url] = None
    time.sleep(1)  # Be polite to YouTube

# Update data with avatar URLs
for video in data:
    url = video.get('channelUrl') or video.get('channel_url')
    if url and url in channel_avatars:
        video['channelAvatarUrl'] = channel_avatars[url]

# Save to a new JSON file
with open(output_path, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done! Avatars added to {output_path}")
