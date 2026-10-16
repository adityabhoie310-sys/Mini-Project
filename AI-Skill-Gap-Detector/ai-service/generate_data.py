
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "database" / "raw"
PROCESSED = ROOT / "database" / "processed"

RAW.mkdir(parents=True, exist_ok=True)
PROCESSED.mkdir(parents=True, exist_ok=True)

jobs = [
    {
        "jobId": "JOB001",
        "title": "Frontend Developer",
        "skills": ["HTML", "CSS", "JavaScript", "React", "Git"]
    },
    {
        "jobId": "JOB002",
        "title": "Backend Developer",
        "skills": ["Python", "Node.js", "Express.js", "MongoDB", "REST API", "Git"]
    },
    {
        "jobId": "JOB003",
        "title": "MERN Stack Developer",
        "skills": ["HTML", "CSS", "JavaScript", "React", "Node.js",
                   "Express.js", "MongoDB", "REST API", "Git"]
    },
    {
        "jobId": "JOB004",
        "title": "Data Analyst",
        "skills": ["Python", "SQL", "Excel", "Pandas", "NumPy", "Data Visualization"]
    },
    {
        "jobId": "JOB005",
        "title": "Machine Learning Engineer",
        "skills": ["Python", "NumPy", "Pandas", "Scikit-learn", "Machine Learning"]
    }
]

skills = sorted({
    skill
    for job in jobs
    for skill in job["skills"]
})

aptitude_questions = [
    {"id": i, "question": q, "options": options, "answer": answer}
    for i, (q, options, answer) in enumerate([
        ("What is 15% of 200?", ["20", "30", "40", "50"], "30"),
        ("If 5x = 45, what is x?", ["5", "7", "9", "10"], "9"),
        ("Find the average of 10, 20 and 30.", ["15", "20", "25", "30"], "20"),
        ("A product costs 500 and has a 10% discount. What is its price?",
         ["400", "450", "475", "490"], "450"),
        ("What is 12 squared?", ["124", "144", "122", "132"], "144")
    ], start=1)
]

reasoning_questions = [
    {"id": i, "question": q, "options": options, "answer": answer}
    for i, (q, options, answer) in enumerate([
        ("Find the next number: 2, 4, 6, 8, ?",
         ["9", "10", "12", "14"], "10"),
        ("Find the next number: 3, 6, 12, 24, ?",
         ["30", "36", "48", "60"], "48"),
        ("Which one is different?", ["Apple", "Mango", "Carrot", "Banana"],
         "Carrot"),
        ("All roses are flowers. Which statement is correct?",
         ["All flowers are roses", "Roses are flowers",
          "No roses are flowers", "All roses are trees"], "Roses are flowers"),
        ("If A=1, B=2, C=3, what is the value of D?",
         ["2", "3", "4", "5"], "4")
    ], start=1)
]

def write_json(filename, data):
    with (PROCESSED / filename).open("w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

write_json("jobs.json", jobs)
write_json("skills.json", skills)
write_json("aptitudeQuestions.json", aptitude_questions)
write_json("reasoningQuestions.json", reasoning_questions)

with (RAW / "job_skills.csv").open("w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["jobId", "jobTitle", "skill"])
    for job in jobs:
        for skill in job["skills"]:
            writer.writerow([job["jobId"], job["title"], skill])

for filename, questions in [
    ("aptitude_questions.csv", aptitude_questions),
    ("reasoning_questions.csv", reasoning_questions)
]:
    with (RAW / filename).open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=questions[0].keys())
        writer.writeheader()
        writer.writerows(questions)

(ROOT / "database" / "README.txt").write_text(
    "Sample datasets for the AI Skill Gap Detector project.\n"
    "The jobs and questions are demonstration data; expand and validate "
    "them before production use.\n",
    encoding="utf-8"
)

print("Data generation completed successfully!")
print(f"Jobs: {len(jobs)}")
print(f"Skills: {len(skills)}")
print(f"Aptitude questions: {len(aptitude_questions)}")
print(f"Reasoning questions: {len(reasoning_questions)}")
print(f"Processed data saved to: {PROCESSED}")
