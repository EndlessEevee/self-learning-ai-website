from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests
from textblob import TextBlob
import openai
import os

app = Flask(__name__)

# Set up OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Route to handle AI chat responses
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt')
    response = openai.Completion.create(
        engine="gpt-4o-2024-05-13",
        prompt=prompt,
        max_tokens=300
    )
    return jsonify(response.choices[0].text.strip())

# Route to scrape content from teamparadise1165.com
@app.route('/scrape', methods=['GET'])
def scrape():
    url = 'https://teamparadise1165.com'
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        content = soup.prettify()
        return content
    else:
        return 'Failed to retrieve content', 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
