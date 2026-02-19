from recommendation_engine import get_recommendation

result = get_recommendation(
    gene="CYP2D6",
    phenotype="Poor Metabolizer",
    drug="CODEINE"
)

print(result)
