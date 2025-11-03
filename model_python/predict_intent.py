import sys
import joblib
import os

# Absolute safe paths
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "chatbot_model.pkl")
vectorizer_path = os.path.join(script_dir, "vectorizer.pkl")

if not os.path.exists(model_path) or not os.path.exists(vectorizer_path):
    print("default")
    sys.exit(0)

# Load model and vectorizer
model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

# Read input
if len(sys.argv) < 2:
    print("default")
    sys.exit(0)

user_message = sys.argv[1]

# Predict
X = vectorizer.transform([user_message])
intent = model.predict(X)[0]
print(intent)
