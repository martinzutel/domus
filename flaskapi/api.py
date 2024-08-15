from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import gensim.downloader as gensim_api
from gensim.models import KeyedVectors

print("loading model...")
wv = KeyedVectors.load('./models/word2vec-google-news-300.model')
print("model loaded")

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
    return(sorted_users[0:10])