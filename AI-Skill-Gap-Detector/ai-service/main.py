
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from skill_gap import load_jobs, analyze_skill_gap

app = FastAPI(
    title="AI Skill Gap Detector API",
    description="Analyzes skills and generates a personalized learning roadmap.",
    version="1.0.0"
)

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Request model
class AnalyzeRequest(BaseModel):
    targetJobId: str
    assessedSkills: dict[str, int] = Field(default_factory=dict)


# Default test data
TEST_DATA = {
    "targetJobId": "JOB003",
    "assessedSkills": {
        "HTML": 4,
        "CSS": 3,
        "JavaScript": 4,
        "React": 2,
        "Node.js": 1,
        "Express.js": 0,
        "MongoDB": 2,
        "REST API": 1,
        "Git": 3
    }
}


# 1. Health check
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "AI Skill Gap Detector"
    }


# 2. Get available job roles
@app.get("/jobs")
def get_jobs():
    try:
        return load_jobs()
    except (OSError, ValueError) as error:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to load jobs: {error}"
        )


# 3. Analyze skill gaps using submitted data
@app.post("/analyze-gap")
def analyze_gap(request: AnalyzeRequest):
    try:
        return analyze_skill_gap(
            request.targetJobId,
            request.assessedSkills
        )
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )
    except (OSError, KeyError, TypeError) as error:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to analyze skill gap: {error}"
        )


# 4. Run the default test data directly
@app.get("/test-skill-gap")
def test_skill_gap():
    try:
        return analyze_skill_gap(
            TEST_DATA["targetJobId"],
            TEST_DATA["assessedSkills"]
        )
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )
    except (OSError, KeyError, TypeError) as error:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to analyze skill gap: {error}"
        )


# 5. Live Skill Gap endpoint compatible with backend AI service
class LiveSkillGapRequest(BaseModel):
    role: str = "Full Stack Engineer"
    assessmentScores: dict[str, float] = Field(default_factory=dict)
    targetSkills: list[str] = Field(default_factory=list)


@app.post("/analyze-skill-gap")
def analyze_live_gap(req: LiveSkillGapRequest):
    scores = req.assessmentScores or {}
    avg = sum(scores.values()) / max(len(scores), 1) if scores else 70
    target_skills = req.targetSkills or list(scores.keys()) or ["JavaScript", "React.js", "Node.js", "MongoDB", "Git"]

    gaps = []
    for skill in target_skills:
        current = scores.get(skill, 50)
        required = 85
        gap = max(0, required - current)
        priority = "High" if gap >= 30 else ("Medium" if gap >= 15 else "Low")
        gaps.append({
            "skill": skill,
            "current": current,
            "required": required,
            "gap": gap,
            "priority": priority
        })

    return {
        "role": req.role,
        "readinessScore": round(avg),
        "skillGaps": gaps,
        "aiSummary": f"AI Assessment complete for {req.role}. Identified {len([g for g in gaps if g['gap'] > 0])} focus areas."
    }


# 6. Evaluate answer endpoint
class EvaluateRequest(BaseModel):
    role: str = "Full Stack Engineer"
    question: str = ""
    answer: str = ""


@app.post("/evaluate")
def evaluate_submission(req: EvaluateRequest):
    return {
        "status": "evaluated",
        "role": req.role,
        "readiness": 78,
        "feedback": "Good response. Consider explaining system trade-offs and edge cases.",
        "recommendations": [
            "Practice advanced asynchronous patterns",
            "Strengthen distributed system design concepts"
        ]
    }



