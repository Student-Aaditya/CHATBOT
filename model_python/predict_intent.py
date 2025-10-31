import sys
import joblib
import os

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(script_dir, "chatbot_model.pkl"))
vectorizer = joblib.load(os.path.join(script_dir, "vectorizer.pkl"))

# Get message from Node.js
user_message = sys.argv[1]

# Predict
X = vectorizer.transform([user_message])
intent = model.predict(X)[0]

print(intent)
