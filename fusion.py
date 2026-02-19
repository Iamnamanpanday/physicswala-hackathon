# fusion.py

from rules import PGX_RULES
from predict_engine import ml_predict


def fuse_decision(drug: str, gene: str, star: str):

    rule = (
        PGX_RULES
        .get(drug, {})
        .get(gene, {})
        .get(star)
    )

    ml_result = ml_predict(drug, gene, star)

    ml_prediction = ml_result.get("prediction", "Unknown")
    ml_confidence = ml_result.get("confidence", 0.0)
    ml_used = ml_result.get("ml_used", False)

    # ================= RULE EXISTS =================
    if rule:

        rule_label = rule["risk_label"]

        # Check agreement
        if ml_prediction == rule_label:
            confidence = ml_confidence
            agreement = True
        else:
            confidence = round(ml_confidence * 0.7, 3)
            agreement = False

        return {
            "risk_label": rule_label,
            "phenotype": rule["phenotype"],
            "severity": rule["severity"],
            "recommendation": rule.get("recommendation", "Follow clinical guideline."),
            "confidence_score": confidence,
            "rule_engine_used": True,
            "ml_used": ml_used,
            "ml_agreement_with_rule": agreement
        }

    # ================= NO RULE =================
    else:
        return {
            "risk_label": ml_prediction,
            "phenotype": "Unknown",
            "severity": "unknown",
            "recommendation": "No clinical guideline found. ML-based estimation.",
            "confidence_score": ml_confidence,
            "rule_engine_used": False,
            "ml_used": ml_used,
            "ml_agreement_with_rule": None
        }
