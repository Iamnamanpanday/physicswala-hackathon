# predict_engine.py

import joblib
import pandas as pd

# Load model once
model = joblib.load("model.pkl")
encoders = joblib.load("encoders.pkl")


def ml_predict(drug: str, gene: str, star: str):

    # Create DataFrame
    df = pd.DataFrame([{
        "drug": drug,
        "gene": gene,
        "star": star
    }])

    try:
        # Encode
        for col in ["drug", "gene", "star"]:
            df[col] = encoders[col].transform(df[col])

        X = df[["drug", "gene", "star"]]

        prediction = model.predict(X)[0]
        probabilities = model.predict_proba(X)[0]
        confidence = float(max(probabilities))

        return {
            "prediction": prediction,
            "confidence": round(confidence, 3),
            "ml_used": True
        }

    except Exception:
        # If unseen gene/star
        return {
            "prediction": "Unknown",
            "confidence": 0.0,
            "ml_used": False
        }
