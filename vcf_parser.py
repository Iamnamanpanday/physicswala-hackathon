import vcfpy
import pandas as pd

def parse_vcf(file_path):
    reader = vcfpy.Reader.from_path(file_path)

    rows = []

    for record in reader:
        gene = record.INFO.get("GENE")
        star = record.INFO.get("STAR")
        rsid = record.ID

        if gene and star:
            rows.append({
                "gene": gene,
                "star": star,
                "rsid": rsid
            })

    return pd.DataFrame(rows)
