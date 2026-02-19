# main.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from vcf_parser import parse_vcf
from fusion import fuse_decision
from json_builder import build_response

app = FastAPI()

# ✅ CORS (for Vite frontend running on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze/")
async def analyze_patient(
    file: UploadFile = File(...),
    drug: str = Form(...)
):
    try:
        # Save uploaded file temporarily
        file_location = f"temp_{file.filename}"

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Parse VCF
        df = parse_vcf(file_location)

        if df.empty:
            os.remove(file_location)
            return {"error": "No valid pharmacogenomic variants found."}

        # Drug → Gene mapping
        drug_gene_map = {
            "CODEINE": "CYP2D6",
            "WARFARIN": "CYP2C9",
            "CLOPIDOGREL": "CYP2C19",
            "SIMVASTATIN": "SLCO1B1",
            "AZATHIOPRINE": "TPMT",
            "FLUOROURACIL": "DPYD"
        }

        drug = drug.upper()
        required_gene = drug_gene_map.get(drug)

        if not required_gene:
            os.remove(file_location)
            return {"error": "Unsupported drug"}

        # Filter dataframe for correct gene
        filtered_df = df[df["gene"] == required_gene]

        if filtered_df.empty:
            os.remove(file_location)
            return {"error": "No relevant gene variant found for this drug"}

        primary_gene = filtered_df.iloc[0]["gene"]
        diplotype = filtered_df.iloc[0]["star"]
        rsids = filtered_df["rsid"].tolist()

        # Decision Fusion
        fusion_result = fuse_decision(drug, primary_gene, diplotype)

        response = build_response(
            drug=drug,
            gene=primary_gene,
            star=diplotype,
            rsids=rsids,
            fusion_result=fusion_result
        )

        os.remove(file_location)
        return response

    except Exception as e:
        return {"error": str(e)}