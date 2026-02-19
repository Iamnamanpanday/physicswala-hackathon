# json_builder.py

from datetime import datetime
import uuid


def build_response(
    drug: str,
    gene: str,
    star: str,
    rsids: list,
    fusion_result: dict
):
    """
    Builds structured pharmacogenomic response JSON.
    """

    patient_id = f"PATIENT_{uuid.uuid4().hex[:6]}"

    response = {
        "patient_id": patient_id,
        "drug": drug,
        "timestamp": datetime.utcnow().isoformat(),

        "risk_assessment": {
            "risk_label": fusion_result.get("risk_label", "Unknown"),
            "confidence_score": fusion_result.get("confidence_score", 0),
            "severity": fusion_result.get("severity", "unknown")
        },

        "pharmacogenomic_profile": {
            "primary_gene": gene,
            "diplotype": star,
            "phenotype": fusion_result.get("phenotype", "Unknown")
        },

        "detected_variants": rsids,

        "clinical_recommendation": {
            "recommendation": fusion_result.get("recommendation", "No recommendation available"),
            "action_required": fusion_result.get("risk_label", "Unknown"),
            "monitoring_required": fusion_result.get("severity", "unknown") in ["High", "Severe"]
        },

        "quality_metrics": {
            "vcf_parsing_success": True,
            "rule_engine_used": fusion_result.get("rule_engine_used", True),
            "ml_model_used": fusion_result.get("ml_used", False),
            "fusion_strategy": "Rule + ML"
        }
    }

    return response
