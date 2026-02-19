# Pharmacogenomics Rules Engine (RIFT)

A collection of Python tools and a Next.js frontend for analyzing pharmacogenomic (PGx) VCF data, running clinical rules, and producing drug safety/recommendations.

## Contents

- Python backend and analysis scripts (root): `vcf_parser.py`, `predict.py`, `predict_engine.py`, `recommendation_engine.py`, `lln_engine.py`, `clinical_rules.py`, `rules.py`, `train_model.py`, `main.py`, etc.
- Sample VCFs and test files: `temp_pgx_single_patient.vcf`, `dummy_3000_pgx.vcf`, ...
- Frontend (Next.js app): `pharma-guard-frontend-build/` — production-ready build of the UI.

## Quickstart

Prerequisites:
- Python 3.9+ (recommended)
- Node.js 18+ / pnpm (if you want to run or develop the frontend)

Run backend scripts (example):

1. Create a virtual environment and install dependencies (project may not have a single requirements file — inspect scripts for needs):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt  # if present
```

2. Run the main analysis script (example):

```powershell
python main.py
```

3. Some helper scripts:
- `vcf_parser.py` — parse VCF files into internal variant structures.
- `predict.py` / `predict_engine.py` — run prediction models on variants.
- `recommendation_engine.py` — generate drug safety recommendations.

## Frontend (view/build)

The `pharma-guard-frontend-build/` directory contains a Next.js app build. To develop locally, open the `app/` and `components/` directories in a Next.js project and install dependencies:

```bash
cd pharma-guard-frontend-build
pnpm install
pnpm dev
```

Note: The shipped `pharma-guard-frontend-build` appears to be a built app; to modify or rebuild, consult the original frontend source repo if available.

## Testing

- There are a few test or example files such as `test.py` and sample VCFs under the repo root. Use them as a starting point.

## Contributing

If you'd like improvements (README expansions, requirements file, CI, license), open an issue or send a PR. For quick help, describe your goal and which script you want to run.

## License

No license file was found in this workspace. Before redistributing, add a `LICENSE` file or verify the intended license.

## Contact

Project pushed to: https://github.com/Iamnamanpanday/physicswala-hackathon.git
