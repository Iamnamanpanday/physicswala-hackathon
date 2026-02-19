import joblib
import pandas as pd
from vcf_parser import parse_vcf

def predict_from_vcf(vcf_file):

    # Load model and encoders
    model = joblib.load("model.pkl")
    encoders = joblib.load("encoders.pkl")

    # Parse VCF
    df = parse_vcf(vcf_file)

    if df.empty:
        print("❌ No variants found.")
        return

    df["drug"] = "CODEINE"

    # Encode using saved encoders
    for col in ["drug", "gene", "star"]:
        le = encoders[col]
        df[col] = le.transform(df[col])

    X = df[["drug", "gene", "star"]]

    predictions = model.predict(X)

    df["prediction"] = predictions

    print("\n🎯 Prediction Results:")
    print(df[["gene", "star", "prediction"]])


if __name__ == "__main__":
    predict_from_vcf("dummy_3000_pgx.vcf")
