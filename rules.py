# rules.py

PGX_RULES = {

    # ===================== CODEINE =====================
    "CODEINE": {
        "CYP2D6": {
            "*4/*4": {"phenotype": "PM", "risk_label": "Ineffective", "severity": "moderate"},
            "*1/*1": {"phenotype": "NM", "risk_label": "Safe", "severity": "low"},
            "*1/*2": {"phenotype": "IM", "risk_label": "Adjust Dosage", "severity": "moderate"},
            "*1xN/*1xN": {"phenotype": "UM", "risk_label": "Toxic", "severity": "high"}
        }
    },

    # ===================== CLOPIDOGREL =====================
    "CLOPIDOGREL": {
        "CYP2C19": {
            "*2/*2": {"phenotype": "PM", "risk_label": "Ineffective", "severity": "high"},
            "*1/*1": {"phenotype": "NM", "risk_label": "Safe", "severity": "low"},
            "*1/*2": {"phenotype": "IM", "risk_label": "Adjust Dosage", "severity": "moderate"}
        }
    },

    # ===================== WARFARIN =====================
    "WARFARIN": {
        "CYP2C9": {
            "*3/*3": {"phenotype": "PM", "risk_label": "Toxic", "severity": "high"},
            "*1/*1": {"phenotype": "NM", "risk_label": "Safe", "severity": "low"},
            "*1/*3": {"phenotype": "IM", "risk_label": "Adjust Dosage", "severity": "moderate"}
        }
    },

    # ===================== SIMVASTATIN =====================
    "SIMVASTATIN": {
        "SLCO1B1": {
            "*5/*5": {"phenotype": "Low Function", "risk_label": "Toxic", "severity": "high"},
            "*1/*1": {"phenotype": "Normal Function", "risk_label": "Safe", "severity": "low"}
        }
    },

    # ===================== AZATHIOPRINE =====================
    "AZATHIOPRINE": {
        "TPMT": {
            "*3A/*3A": {"phenotype": "Low Activity", "risk_label": "Toxic", "severity": "critical"},
            "*1/*1": {"phenotype": "Normal Activity", "risk_label": "Safe", "severity": "low"}
        }
    },

    # ===================== FLUOROURACIL =====================
    "FLUOROURACIL": {
        "DPYD": {
            "*2A/*2A": {"phenotype": "Deficient", "risk_label": "Toxic", "severity": "critical"},
            "*1/*1": {"phenotype": "Normal", "risk_label": "Safe", "severity": "low"}
        }
    }
}
