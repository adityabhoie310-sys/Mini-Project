
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
    normalized_scores = {}
    for name, score in assessed_skills.items():
        if score is None:
            continue
        try:
            val = round(float(score))
        except (ValueError, TypeError):
            continue
        if 0 <= val <= 5:
            normalized_scores[str(name).strip().lower()] = val
        else:
            raise ValueError(
                f"Skill score for '{name}' must be between 0 and 5"
            )

    matched = []
    gaps = []
    total_score = 0
    assessed_count = 0
    unassessed = []

    for skill in required_skills:
        score = normalized_scores.get(skill.lower())

        if score is None:
            unassessed.append({
                "skill": skill,
                "score": None,
                "maximumScore": 5,
                "status": "Not assessed"
            })
            continue

        total_score += score
        assessed_count += 1

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
        total_score / (assessed_count * 5) * 100
    ) if assessed_count else 0

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
        "unassessedSkills": unassessed,
        "assessedSkillCount": assessed_count,
        "roadmap": roadmap
    }
