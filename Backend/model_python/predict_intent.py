import sys
import joblib
import os

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(script_dir, "chatbot_model.pkl"))
vectorizer = joblib.load(os.path.join(script_dir, "vectorizer.pkl"))

# Get user message
user_message = sys.argv[1]
msg = user_message.lower()

# Predict with model
X = vectorizer.transform([user_message])
intent = model.predict(X)[0]

# ✅ Simple keyword override to improve accuracy
if any(word in msg for word in ["package", "placement", "salary", "recruiter", "company"]):
    intent = "placement"
elif any(word in msg for word in ["fee", "tuition", "cost"]):
    intent = "fees"
elif any(word in msg for word in ["hostel", "ac", "room", "mess"]):
    intent = "hostel"

print(intent)
