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

def funcion_orden(data):
    users = []
    for user in data:
        users.append([user.name, user.ownTags])
    print(users)
    # Extract tags from each user into list of single space-separated strings
    user_tags = [' '.join(row[1:]) for row in users]

    # Calculate TF-IDF scores
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(user_tags)

    # Compute cosine similarity between main user and all other users
    main_user_index = 4  # Assuming the main user is x user in the list (x = user - 1)
    main_user_tfidf = tfidf_matrix[main_user_index]
    cosine_sim_with_main_user = cosine_similarity(main_user_tfidf, tfidf_matrix).flatten()

    # Sort users by cosine similarity with the main user
    sorted_users = sorted(zip(cosine_sim_with_main_user, users), reverse=True)

    # Narrow the result to just the ids
    sorted_user_ids = [((user)[1])[0] for user in sorted_users]

    # Result is all users sorted by most similar to main user
    print(sorted_user_ids[0:10])
    print(sorted_users[0:10])

@app.route('/flaskapi/main')
def hello_world():
    
    print("hello")
    # Read the data
    df_og = pd.read_csv("https://raw.githubusercontent.com/erik9691/mock-dataset/main/TAG_DATA.csv")

    #Make copy of dataframe
    df = df_og.copy()

    # Convert strings separated by spaces into list for each row
    df['tags'] = df['tags'].apply(lambda x: x.split(' '))

    # Convert dataframe of lists into list of lists
    list_of_lists = df.apply(lambda row: [row['id']] + row['tags'], axis=1).tolist()

    # Extract tags from each user into a list of single space-separated strings
    user_tags = [' '.join(row[1:]) for row in list_of_lists]

    # Compute TF-IDF vectors for all users
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(user_tags).toarray()

    # Function to average Word2Vec vectors for a list of tags
    def get_word2vec_vector(tags):
        vectors = []
        for tag in tags:
            if tag in wv:
                vectors.append(wv[tag])
        if vectors:
            return np.mean(vectors, axis=0)
        else:
            return np.zeros(wv.vector_size)

    # Calculate Word2Vec vectors for all users
    word2vec_vectors = [get_word2vec_vector(row[1:]) for row in list_of_lists]

    # Combine TF-IDF vectors with Word2Vec vectors
    combined_vectors = [np.concatenate((tfidf_vector, word2vec_vector))
                        for tfidf_vector, word2vec_vector in zip(tfidf_matrix, word2vec_vectors)]

    # Define preferences for the main user
    preferred_tags = {'knitting': 1.2, 'cooking': 1.2}  # Boost score for users with these tags
    disliked_tags = {'fishing': 0.8, 'gaming': 0.8}  # Penalize score for users with these tags

    # Compute cosine similarity between the main user and all other users
    main_user_index = 4  # Assuming the main user is x user in the list (x = user - 1)
    main_user_vector = combined_vectors[main_user_index]
    cosine_sim_with_main_user = cosine_similarity([main_user_vector], combined_vectors).flatten()

    # Adjust similarity scores based on preferences
    adjusted_similarity_scores = []
    for score, user_info in zip(cosine_sim_with_main_user, list_of_lists):
        user_id = user_info[0]
        user_tags = user_info[1:]

        # Adjust score for preferred tags
        for tag in preferred_tags:
            if tag in user_tags:
                score *= preferred_tags[tag]

        # Adjust score for disliked tags
        for tag in disliked_tags:
            if tag in user_tags:
                score *= disliked_tags[tag]

        adjusted_similarity_scores.append((score, user_info))

    # Sort users by adjusted similarity with the main user
    sorted_users = sorted(adjusted_similarity_scores, reverse=True)

    # Narrow the result to just the ids
    sorted_user_ids = [user_info[1][0] for user_info in sorted_users]

    # Result is all users sorted by most similar to the main user
    #print(sorted_user_ids[0:10])
    return jsonify(sorted_users[0:10])



@app.route('/flaskapi/miembroviril', methods=['GET'])
def el_pepe():
    
    # Fetch user data from external API
    conn = http.client.HTTPConnection('localhost', 3000)
    conn.request('GET', '/api/users/getAllUsers')
    
    response = conn.getresponse()
    if response.status == 200:
        users_data = json.loads(response.read().decode())
        print("Fetched users:", users_data)

        # Convertir los datos a un formato valido para el modelo y luego recibirlo procesado

        funcion_orden(users_data)

        # Send the data to another address
        conn.request('POST', '/UserContext.tsx', body=json.dumps(users_data), headers={'Content-Type': 'application/json'})
        processed_response = conn.getresponse()
        
        if processed_response.status == 200:
            return jsonify({"status": "success", "message": "Data sent successfully"})
        else:
            return jsonify({"status": "error", "message": "Failed to send data"}), 500
    else:
        return jsonify({"status": "error", "message": "Failed to fetch users"}), 500