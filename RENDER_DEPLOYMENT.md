# Render Deployment Guide

## Quick Overview

This project consists of two services that need to be deployed on Render:
- **Backend**: Python FastAPI (uvicorn)
- **Frontend**: Next.js (Node.js)

## Prerequisites

- GitHub account with this repository pushed
- Render.com account (https://render.com)
- All environment variables configured locally

## Deployment Steps

### Option 1: Using Blueprint (Recommended - Easiest)

1. **Commit all files to GitHub**
   ```bash
   git add -A
   git commit -m "deployment: Add Render configuration files"
   git push
   ```

2. **Go to Render Dashboard**
   - Visit https://render.com/dashboard
   - Click "New +" → "Blueprint"
   - authorize with GitHub if needed
   - Select this repository

3. **Render Auto-Deploys**
   - Render reads `render.yaml` and automatically creates both services
   - Waits for you to set secret environment variables

4. **Configure Secret Environment Variables**
   In the Render dashboard, set these as "Secret" (not exposed in output):

   **For Backend Service:**
   - `OPENAI_API_KEY` = your OpenAI key (for LLM explanations)
   - `CORS_ORIGINS` = your frontend URL when deployed

   **For Frontend Service:**
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key (SECRET)
   - `GEMINI_API_KEY` = your Gemini API key
   - `PYTHON_BACKEND_URL` = backend service URL (auto-populated)

5. **Deploy**
   - Click "Deploy" on the blueprint
   - Monitor build logs
   - Services will be live in ~5-10 minutes

### Option 2: Manual Setup (If Blueprint Fails)

#### Deploy Backend First

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Name**: `rift-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
4. Set environment variables:
   - `CORS_ORIGINS` = `https://rift-frontend.onrender.com`
   - `OPENAI_API_KEY` = your key (mark as Secret)
5. Deploy and copy the service URL (e.g., `https://rift-backend.onrender.com`)

#### Deploy Frontend

1. Create another **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Name**: `rift-frontend`
   - **Environment**: `Node`
   - **Build Command**: `cd pharma-guard-frontend-build && npm install && npm run build`
   - **Start Command**: `cd pharma-guard-frontend-build && npm start`
   - **Plan**: Free
4. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your URL (mark as Secret)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your key (mark as Secret)
   - `SUPABASE_SERVICE_ROLE_KEY` = your key (mark as Secret)
   - `GEMINI_API_KEY` = your key (mark as Secret)
   - `PYTHON_BACKEND_URL` = `https://rift-backend.onrender.com`
   - `NODE_ENV` = `production`
5. Deploy

## Environment Variables Reference

### Backend Variables (`main.py`)

| Variable | Scope | Description |
|----------|-------|-------------|
| `CORS_ORIGINS` | Production | Comma-separated allowed frontend URLs |
| `OPENAI_API_KEY` | Secret | OpenAI API key for LLM explanations |
| `PORT` | Environment | Service port (set by Render automatically) |

### Frontend Variables (`pharma-guard-frontend-build`)

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Secret | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Secret | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Supabase service role key |
| `GEMINI_API_KEY` | Secret | Google Gemini API key (for chat) |
| `PYTHON_BACKEND_URL` | Production | Backend service URL |
| `NODE_ENV` | Production | Set to `production` |

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify `requirements.txt` has all dependencies
- Verify Node version is 18+
- Check that npm dependencies are installed

### Services Can't Communicate
- Backend URL in `PYTHON_BACKEND_URL` must be correct
- `CORS_ORIGINS` in backend must include frontend URL
- Check service URLs in Render dashboard

### Slow or Timeout Issues
- Free tier services spin down after 15 mins of inactivity
- Upgrade to paid plan for persistent uptime
- Consider pre-warming services

### Database Connection Issues
- Verify Supabase credentials are correct
- Check CORS settings in Supabase dashboard
- Ensure email confirmations are enabled if required

## Important Notes

⚠️ **Security**:
- Never commit `.env.local` with real keys
- Use `.env.example` as template
- Mark all API keys as "Secret" in Render
- Rotate keys periodically

⚠️ **Free Tier Limitations**:
- Services sleep after 15 minutes of inactivity
- Limited to 750 free hours/month per service
- Upgrade to Pro ($7/month per service) for persistent uptime and better performance

## After Deployment

1. **Test the application**
   - Visit your frontend URL
   - Try uploading a VCF file and running analysis
   - Check browser console for errors

2. **Monitor logs**
   - View logs in Render dashboard
   - Check for CORS errors or API failures

3. **Update CORS**
   - If you add more domains, update `CORS_ORIGINS` in backend
   - Redeploy backend after changes

## Useful Links

- Render Dashboard: https://render.com/dashboard
- Render Docs: https://render.com/docs
- Repository: Check your GitHub repo settings
