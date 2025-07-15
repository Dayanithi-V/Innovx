import os
from dotenv import load_dotenv
import openai
from fastapi import FastAPI

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

async def get_code_review(repo_url):
    prompt = f"Give a technical code review and improvement suggestions for this GitHub repo: {repo_url}"
    response = await openai.ChatCompletion.acreate(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a senior software engineer and code reviewer."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=800
    )
    return response.choices[0].message["content"] 