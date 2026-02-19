# Render deployment documentation

## Prerequisites
- GitHub account with repository pushed
- Render.com account

## Deployment Steps

### Option 1: Using render.yaml (Recommended)
1. Commit and push all changes to GitHub
2. Go to [render.com](https://render.com)
3. Sign in with GitHub
4. Click "New +" > "Blueprint"
5. Select your repository
6. Render will automatically detect and deploy based on `render.yaml`
7. Set environment variables as needed in the dashboard

### Option 2: Manual Configuration
1. Deploy backend first:
   - Create new Web Service on Render
   - Select Python runtime 3.11
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Copy the resulting URL

2. Deploy frontend:
   - Create another Web Service on Render
   - Select Node 20 runtime
   - Build command: `cd pharma-guard-frontend-build && npm install && npm run build`
   - Start command: `cd pharma-guard-frontend-build && npm run start`
   - Set `NEXT_PUBLIC_API_URL` env var to backend URL

## Environment Variables

### Backend (.env or Render dashboard)
```
CORS_ORIGINS=https://your-frontend-url.onrender.com,http://localhost:3000
```

### Frontend (.env.local or Render dashboard)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

## Notes
- Free tier services may spin down after 15 minutes of inactivity
- Upgrade to paid tier for persistent uptime
- Keep backend and frontend URLs in sync
