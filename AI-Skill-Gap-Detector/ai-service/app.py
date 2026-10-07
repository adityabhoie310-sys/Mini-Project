from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="AI Skill Gap Detector Microservice")

class EvalRequest(BaseModel):
    role: str
    skills: dict

@app.get("/")
def read_root():
    return {"status": "AI Service running"}

@app.post("/evaluate")
def evaluate(req: EvalRequest):
    return {"message": "Skill gap evaluated successfully", "role": req.role, "readiness": 75}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
