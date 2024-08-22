from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

import json
import http.client
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import gensim.downloader as gensim_api
from gensim.models import KeyedVectors


print("loading model...")
#wv = KeyedVectors.load('./models/word2vec-google-news-300.model')
print("model loaded")

# Algorithm code
def funcion_orden(data):

    users = [[user["id"]] + user["ownTags"] for user in data]
    print(users)
    # Extract tags from each user into list of single space-separated strings
    user_tags = [' '.join(row[1:]) for row in users]

    # Calculate TF-IDF scores
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(user_tags)

    # Compute cosine similarity between main user and all other users
    main_user_index = 4  # Assuming the main user is x user in the list (starting at 0) 
    main_user_tfidf = tfidf_matrix[main_user_index]
    cosine_sim_with_main_user = cosine_similarity(main_user_tfidf, tfidf_matrix).flatten()

    # Sort users by cosine similarity with the main user
    sorted_users = sorted(zip(cosine_sim_with_main_user, users), reverse=True)

    # Narrow the result to just the ids
    sorted_user_ids = [((user)[1])[0] for user in sorted_users]

    # Result is all users sorted by most similar to main user
    print(sorted_user_ids[0:10])
    print(sorted_users[0:10])


@app.route('/flaskapi/miembroviril', methods=['GET'])
def el_pepe():

    # Set connection to client
    conn = http.client.HTTPConnection('localhost', 3000)

    # Fetch user data from external API
    conn.request('GET', '/api/users/getAllUsers')
    response_users = conn.getresponse()

    if response_users.status == 200:

        users_data = json.loads(response_users.read().decode())
        print("Fetched users:", users_data)

        # Pass data to algorithm
        funcion_orden(users_data)

        '''
        # Send the data to another address
        conn.request('POST', '/UserContext.tsx', body=json.dumps(users_data), headers={'Content-Type': 'application/json'})
        processed_response = conn.getresponse()
        
        if processed_response.status == 200:
            return jsonify({"status": "success", "message": "Data sent successfully"})
        else:
            return jsonify({"status": "error", "message": "Failed to send data"}), 500
        '''
    else:
        return jsonify({"status": "error", "message": "Failed to fetch users"}), 500