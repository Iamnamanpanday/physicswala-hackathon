import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

from vcf_parser import parse_vcf
from rules import PGX_RULES


def apply_rules(df):

    rows = []

    for _, row in df.iterrows():
        gene = row["gene"]
        star = row["star"]

        for drug in PGX_RULES.keys():

            rule = PGX_RULES.get(drug, {}).get(gene, {}).get(star)

            if rule:
                rows.append({
                    "drug": drug,
                    "gene": gene,
                    "star": star,
                    "phenotype": rule["phenotype"],
                    "risk_label": rule["risk_label"],
                    "severity": rule["severity"]
                })
            else:
                rows.append({
                    "drug": drug,
                    "gene": gene,
                    "star": star,
                    "phenotype": "Unknown",
                    "risk_label": "Unknown",
                    "severity": "unknown"
                })

    return pd.DataFrame(rows)


def train_model(vcf_path):

    print("Parsing VCF...")
    df = parse_vcf(vcf_path)

    print("Applying rule engine...")
    df = apply_rules(df)

    encoders = {}

    for col in ["drug", "gene", "star"]:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le

    X = df[["drug", "gene", "star"]]
    y = df["risk_label"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier(
        n_estimators=500,
        max_depth=10,
        random_state=42
    )

    print("Training model...")
    model.fit(X_train, y_train)

    print("Evaluating model...")
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))

    joblib.dump(model, "model.pkl")
    joblib.dump(encoders, "encoders.pkl")

    print("Model saved successfully!")


if __name__ == "__main__":
    train_model("dummy_3000_pgx.vcf")
