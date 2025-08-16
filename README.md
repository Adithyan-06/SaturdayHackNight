


<img width="1920" height="1080" alt="nasahub" src="https://github.com/user-attachments/assets/e8544200-f902-41ee-a2f2-7375cad5043d" />




# IdeaGen 💡⚡

> An AI-powered platform that generates tailored hackathon project ideas based on your constraints (tech stack, time limit, difficulty level, etc.)

## Team members
1. [Srinanth M V](https://github.com/Srinanth)
2. [Adhithyan M](https://github.com/Adithyan-06)
## Link to product walkthrough
[link to video](Link Here)
## How it Works ?
1. **User Inputs Parameters**:
   - Project context/theme
   - Time limit (24h, 48h, etc.)
   - Hackathon level (local to international)
   - Tech stack preference
   - AI/ML requirement toggle

2. **AI Processing**:
   - Gemini AI processes inputs
   - Generates 10-15 tailored ideas
   - Returns structured JSON response

3. **Beautiful Display**:
   - Interactive cards for each idea
   - Expandable details view
   - Visual indicators for key metrics
2.


## Libraries used
### Frontend
- React + TypeScript - 19.1
- Tailwind CSS - 4.1
- Axios - 1.11
- Lucide React (Icons) - 0.53

### Backend
- FastAPI - 0.116
- Google Gemini AI - 1.30
- Uvicorn - 0.27
- Python - 3.11
## How to configure
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hackathon-idea-generator.git
   cd frontend # Set up frontend
   cd backend  # Set up backend
   ```

## How to Run
```bash
   cd frontend #setup frontend
   npm install
   # OR
   yarn install
   # OR
   pnpm install
   #to run the frontend
   npm run dev
   # OR
   yarn dev
   # OR
   pnpm dev
```
```bash
   cd backend  # Set up backend
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate    # Windows
   pip install -r requirements.txt
   echo "GOOGLE_API_KEY=your_api_key_here" > .env #Configure environment variables
   uvicorn main:app --reload # to run