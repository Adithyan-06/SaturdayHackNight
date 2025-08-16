from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
import json

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize Gemini client
genai.configure(api_key=GOOGLE_API_KEY)

# FastAPI app
app = FastAPI()

# Enable CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model
class HackathonRequest(BaseModel):
    context: str
    time_limit: str
    hackathon_level: str
    difficulty_level: str
    tech_stack: str
    ai_ml_needed: bool

def convert_time_limit_to_hours(time_limit: str) -> int:
    mapping = {
        "24h": 24,
        "48h": 48,
        "72h": 72,
        "1week": 168
    }
    return mapping.get(time_limit, 24)

@app.post("/generate-ideas")
async def generate_ideas(request: HackathonRequest):
    time_hours = convert_time_limit_to_hours(request.time_limit)
    
    prompt = f"""
    You are an expert hackathon mentor with 15+ years of experience judging top international hackathons.
    Generate 12-15 comprehensive hackathon project ideas for the following specifications:

    CONTEXT/THEME: {request.context}
    HACKATHON LEVEL: {request.hackathon_level}
    DIFFICULTY LEVEL: {request.difficulty_level}
    PREFERRED TECH STACK: {request.tech_stack}
    AI/ML REQUIRED: {'Yes' if request.ai_ml_needed else 'No'}
    TIME LIMIT: {time_hours} hours

    For each idea, provide the following structured information:
    1. name: Creative and catchy project name
    2. description: 2-3 sentence description of the project
    3. time_estimate: Realistic time estimate for completion
    4. tech_stack: Specific technologies to be used
    5. innovation_level: Low/Medium/High (based on novelty)
    6. potential_impact: Who benefits and how
    7. key_features: Array of 4-5 key features/functionalities

    Structure each idea as a JSON object with these exact field names.
    Return ONLY a JSON array of these idea objects, with no additional text or explanation.

    Example of one idea object:
    {{
      "name": "EcoRoute Optimizer",
      "description": "A carbon-footprint aware navigation system that suggests the most eco-friendly routes for vehicles while considering time constraints.",
      "time_estimate": "40-50 hours",
      "tech_stack": "React Native, Python Flask, Mapbox API",
      "innovation_level": "High",
      "potential_impact": "Reduces carbon emissions for daily commuters and logistics companies",
      "key_features": [
        "Real-time traffic and emissions data integration",
        "Personalized eco-routing preferences",
        "Carbon savings dashboard",
        "Multi-modal transportation options"
      ]
    }}

    Now generate 12-15 such comprehensive ideas:
    """

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        # Clean and parse the response
        response_text = response.text.strip()
        
        # Remove markdown code block syntax if present
        if response_text.startswith('```json') and response_text.endswith('```'):
            response_text = response_text[7:-3].strip()
        elif response_text.startswith('```') and response_text.endswith('```'):
            response_text = response_text[3:-3].strip()
            
        # Parse the JSON
        ideas = json.loads(response_text)
        
        # Ensure we have at least 10 ideas
        if len(ideas) < 10:
            raise ValueError("Not enough ideas generated")
            
        return {"ideas": ideas}

    except Exception as e:
        print(f"Error generating ideas: {str(e)}")
        print(f"Response text was: {response.text if 'response' in locals() else 'No response'}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate ideas: {str(e)}. Please try again with more specific parameters."
        )
