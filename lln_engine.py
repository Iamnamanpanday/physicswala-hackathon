from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_llm_explanation(drug, gene, diplotype, risk_label, severity):

    prompt = f"""
    You are a pharmacogenomics clinical assistant.

    Drug: {drug}
    Gene: {gene}
    Diplotype: {diplotype}
    Risk: {risk_label}
    Severity: {severity}

    Provide:
    1. Clinical interpretation
    2. Dosing recommendation
    3. Monitoring advice
    4. Patient-friendly explanation (short)
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a clinical pharmacogenomics expert."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content
