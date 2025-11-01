import csv
import random

# --- Base topic keywords ---
topics = {
    "mechanical_courses": [
        "Mechanical Engineering", "Mechanical branch", "Mechanical department", "Mechanical course"
    ],
    "electrical_courses": [
        "Electrical Engineering", "Electrical branch", "Electrical course", "Electrical department"
    ],
    "cse_courses": [
        "Computer Science Engineering", "CSE", "Computer Science", "CS branch"
    ],
    "ai_courses": [
        "Artificial Intelligence", "AI and ML", "Machine Learning", "Data Science", "AI program"
    ],
    "civil_courses": [
        "Civil Engineering", "Civil branch", "Civil department", "Civil course"
    ],
    "hostel": [
        "hostel", "boys hostel", "girls hostel", "hostel fees", "hostel facilities", "ac room", "mess", "wifi"
    ],
    "fees": [
        "college fees", "B.Tech fees", "MBA fees", "MCA fees", "M.Tech fees", "tuition fee", "installment payment"
    ],
    "admissions": [
        "admission", "admission process", "JEE admission", "direct admission", "admission form", "admission date"
    ],
    "placement": [
        "placement", "average package", "highest package", "placement training", "internship", "companies"
    ],
    "infrastructure": [
        "campus", "library", "wifi", "sports facilities", "medical facilities", "gym", "canteen"
    ]
}

# --- Question Templates ---
question_templates = [
    "Tell me about {topic}",
    "Can you explain about {topic}?",
    "Give details about {topic}",
    "Provide some information on {topic}",
    "What is {topic}?",
    "What courses are offered in {topic}?",
    "Does NIET offer {topic}?",
    "Is {topic} available at NIET?",
    "What are the subjects in {topic}?",
    "Give me details of {topic}",
    "How is {topic} at NIET?",
    "Career opportunities in {topic}",
    "What labs are available for {topic} students?",
    "Placement details for {topic}",
    "What is the syllabus for {topic}?",
    "Duration of {topic} course?",
    "Fees for {topic} program?",
    "Eligibility for {topic}?",
    "Can I apply for {topic}?",
    "Hostel fees for {topic} students?"
]

# --- Extra templates for facilities ---
facility_templates = [
    "Does NIET have {topic}?",
    "Give me information about {topic} at NIET",
    "What are the features of {topic}?",
    "Is {topic} available on campus?",
    "Does hostel provide {topic}?",
    "Is {topic} free for students?",
    "Tell me about {topic} facility",
    "How is the {topic} at NIET?",
    "What services are included in {topic}?"
]

# --- Function to auto-generate questions ---
def generate_questions():
    data = []
    for intent, keywords in topics.items():
        for keyword in keywords:
            # Choose template type
            if intent in ["hostel", "infrastructure", "fees"]:
                templates = question_templates + facility_templates
            else:
                templates = question_templates
            # Generate variations
            for temp in templates:
                # Create slight variations
                for prefix in ["", "Please", "Kindly", "Can you please", "I want to know"]:
                    question = f"{prefix} {temp.format(topic=keyword)}".strip().replace("  ", " ")
                    data.append((question, intent))
    return data

# --- Generate Data ---
training_data = generate_questions()
random.shuffle(training_data)

# --- Write to CSV ---
with open("training_data.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Question", "Intent"])
    writer.writerows(training_data)

print(f"✅ training_data.csv generated successfully with {len(training_data)} rows.")
