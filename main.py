from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai_agent import get_code_review

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewRequest(BaseModel):
    repo_url: str

@app.post("/review-code")
async def review_code(request: ReviewRequest):
    review = await get_code_review(request.repo_url)
    return {"review": review} 