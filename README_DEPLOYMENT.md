# PharmaGuard - Pharmacogenomic Risk Assessment Platform

A full-stack application for personalized drug-gene interaction analysis combining VCF genomic data parsing with AI-powered clinical recommendations.

## Architecture

### Backend (Python/FastAPI)
- **Location:** Root directory (`/`)
- **Dependencies:** FastAPI, Uvicorn, VCFpy, Pandas
- **Port:** 8000 (local), Render deployed as separate service
- **Features:**
  - VCF file parsing for genomic variants
  - Drug-gene interaction analysis
  - Rule-based decision engine
  - JSON response generation

### Frontend (Next.js/React)
- **Location:** `/pharma-guard-frontend-build`
- **Runtime:** Node.js
- **Port:** 3000 (production), 5173 (Vite dev)
- **Features:**
  - Patient authentication with Supabase
  - Drug analysis workflow
  - Risk assessment dashboard
  - JSON download capability
  - Doctor and Admin views

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 20+
- git

### Setup Backend
```bash
cd d:\RIFT
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs on `http://localhost:8000`

### Setup Frontend
```bash
cd pharma-guard-frontend-build
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

### Environment Variables
Create `.env.local` in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment on Render

### Quick Deploy with Blueprint
1. Commit and push all changes to GitHub
2. Go to [render.com](https://render.com)
3. Click "New" → "Blueprint"
4. Select your repository
5. Render auto-deploys using `render.yaml`

### Manual Deployment
See **RENDER_DEPLOYMENT.md** for detailed steps.

### Environment Variables on Render
**Backend:**
```
CORS_ORIGINS=https://your-frontend.onrender.com,http://localhost:3000
```

**Frontend:**
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

## File Structure
```
RIFT/
├── main.py                          # FastAPI backend entry point
├── vcf_parser.py                    # VCF file parsing
├── fusion.py                        # Decision logic
├── json_builder.py                  # Response formatting
├── requirements.txt                 # Python dependencies
├── render.yaml                      # Render deployment config
├── RENDER_DEPLOYMENT.md             # Deployment guide
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
│
└── pharma-guard-frontend-build/     # Next.js frontend
    ├── package.json
    ├── .env.local                   # Local env (not committed)
    ├── app/
    │   ├── patient/page.tsx         # Patient dashboard
    │   ├── doctor/page.tsx          # Doctor analytics
    │   ├── admin/page.tsx           # Admin management
    │   ├── api/analyze/route.ts     # API proxy endpoint
    │   └── ...
    └── components/
        └── patient/
            └── risk-summary.tsx     # Results with JSON download
```

## Key Features

### Patient Dashboard
- Upload genomic VCF files
- Select drugs for analysis
- View personalized risk assessments
- Download results as JSON

### Clinical Data
- Risk levels: Safe, Adjust Dosage, Toxic/Ineffective
- Gene-phenotype associations
- CPIC-based recommendations
- Confidence scoring

### JSON Output Format
```json
{
  "patient_id": "PATIENT_ABC123",
  "drug": "WARFARIN",
  "timestamp": "2026-02-20T...",
  "risk_assessment": {
    "risk_label": "adjust",
    "confidence_score": 0.95,
    "severity": "moderate"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "CYP2C9",
    "diplotype": "*1/*3",
    "phenotype": "Intermediate Metabolizer"
  },
  "clinical_recommendation": {
    "recommendation": "Reduce initial dose by 25-50%...",
    "action_required": "adjust",
    "monitoring_required": true
  },
  "llm_generated_explanation": {
    "summary": "...",
    "clinical_significance": "...",
    "interaction_warnings": [],
    "additional_notes": "..."
  },
  "quality_metrics": {
    "vcf_parsing_success": true,
    "rule_engine_used": true,
    "ml_model_used": false,
    "fusion_strategy": "Rule + ML"
  }
}
```

## API Endpoints

### POST `/analyze/`
Analyzes a patient's VCF file for drug-gene interactions.

**Request:**
```
FormData:
- file: VCF file
- drug: Drug name (WARFARIN, CLOPIDOGREL, etc.)
```

**Response:**
```json
{
  "patient_id": "...",
  "drug": "...",
  "risk_assessment": {...},
  "pharmacogenomic_profile": {...},
  ...
}
```

## Troubleshooting

### Backend Connection Issues
- Verify `NEXT_PUBLIC_API_URL` env var points to correct backend
- Check CORS origins in `main.py`
- Ensure backend is running on the specified port

### VCF Parsing Errors
- Verify VCF file format is valid
- Check for required INFO fields (GENE, STAR)
- Ensure RSID is properly formatted

### Build Failures on Render
- Check Python version compatibility (3.11+)
- Verify all dependencies in requirements.txt exist
- Review build logs in Render dashboard
- Check git history for syntax errors

## Technology Stack
- **Backend:** FastAPI, Uvicorn, Python 3.11
- **Frontend:** Next.js 16, React 18, TypeScript
- **Database:** Supabase (Authentication)
- **Styling:** Tailwind CSS, shadcn/ui components
- **Deployment:** Render.com
- **VCS:** Git/GitHub

## License
Proprietary

## Support
For issues and documentation, see RENDER_DEPLOYMENT.md
