from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests
from textblob import TextBlob
import openai
import os
import logging

app = Flask(__name__)

# Set up OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Route to handle AI chat responses
@app.route('/chat', methods=['POST'])
def chat():
    logging.info('Received chat request')
    data = request.json
    logging.debug(f'Received data: {data}')
    prompt = data.get('prompt')
    if not prompt:
        logging.error('No prompt provided in the request')
        return jsonify({'error': 'No prompt provided'}), 400
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=300
    )
    return jsonify(response.choices[0].text.strip())

# Route to scrape content from teamparadise1165.com
@app.route('/scrape', methods=['GET'])
def scrape():
    logging.info('Received scrape request')
    url = 'https://teamparadise1165.com'
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        content = soup.prettify()
        return content
    else:
        logging.error(f'Failed to retrieve content: {response.status_code}')
        return 'Failed to retrieve content', 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
