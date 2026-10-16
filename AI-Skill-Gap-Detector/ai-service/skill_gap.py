
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "database" / "processed"


def load_jobs():
    path = DATA_DIR / "jobs.json"

    if not path.exists():
        raise FileNotFoundError(f"Jobs dataset not found: {path}")

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def analyze_skill_gap(job_id: str, assessed_skills: dict):
    jobs = load_jobs()

    job = next(
        (item for item in jobs if item["jobId"] == job_id),
        None
    )

    if job is None:
        raise ValueError(f"Unknown job ID: {job_id}")

    required_skills = job["skills"]
    normalized_scores = {
        str(name).strip().lower(): int(score)
        for name, score in assessed_skills.items()
    }

    for name, score in normalized_scores.items():
        if not 0 <= score <= 5:
            raise ValueError(
                f"Skill score for '{name}' must be between 0 and 5"
            )

    matched = []
    gaps = []
    total_score = 0

    for skill in required_skills:
        score = normalized_scores.get(skill.lower(), 0)
        total_score += score

        item = {
            "skill": skill,
            "score": score,
            "maximumScore": 5
        }

        if score >= 3:
            matched.append(item)
        else:
            gaps.append({
                **item,
                "priority": "High" if score <= 1 else "Medium"
            })

    readiness = round(
        total_score / (len(required_skills) * 5) * 100
    ) if required_skills else 0

    roadmap = [
        {
            "skill": item["skill"],
            "priority": item["priority"],
            "suggestion": f"Learn {item['skill']} fundamentals and build a small project."
        }
        for item in gaps
    ]

    return {
        "jobId": job["jobId"],
        "jobTitle": job["title"],
        "readinessScore": readiness,
        "matchedSkills": matched,
        "skillGaps": gaps,
        "roadmap": roadmap
    }
