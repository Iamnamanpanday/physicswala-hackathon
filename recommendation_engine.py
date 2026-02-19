# recommendation_engine.py

from clinical_rules import CLINICAL_RULES


def get_recommendation(gene: str, phenotype: str, drug: str) -> dict:
    """
    Returns structured clinical recommendation based on
    gene + phenotype (currently diplotype) + drug.
    """

    # Normalize inputs
    gene = gene.upper().strip()
    drug = drug.upper().strip()
    phenotype = phenotype.strip()

    # Search rule table
    for rule in CLINICAL_RULES:
        if (
            rule["gene"].upper() == gene and
            rule["phenotype"].strip() == phenotype and
            rule["drug"].upper() == drug
        ):
            return rule

    # Default fallback if no match
    return {
        "risk_label": "Unknown",
        "confidence_score": 0.0,
        "severity": "Unknown",
        "recommendation": {},
        "summary": "No guideline available for this genotype-drug combination."
    }
