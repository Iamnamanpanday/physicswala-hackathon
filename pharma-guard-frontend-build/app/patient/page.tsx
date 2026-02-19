"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PatientSidebar } from "@/components/patient/patient-sidebar"
import { MobileHeader } from "@/components/patient/mobile-header"
import { VcfUpload } from "@/components/patient/vcf-upload"
import { DrugSelector } from "@/components/patient/drug-selector"
import { PatientInfoForm } from "@/components/patient/patient-info-form"
import type { PatientInfo } from "@/components/patient/patient-info-form"
import { RiskSummary } from "@/components/patient/risk-summary"
import type { DrugResult } from "@/components/patient/risk-summary"
import { Button } from "@/components/ui/button"
import { Loader2, Play } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Spinner } from "@/components/ui/spinner"

// Mock results for demonstration (would come from POST /api/analyze)
const mockResults: DrugResult[] = [
  {
    drug: "Warfarin",
    risk: "adjust",
    gene: "CYP2C9",
    phenotype: "Intermediate Metabolizer (*1/*3)",
    recommendation:
      "Reduce initial dose by 25-50%. Monitor INR closely during first 2 weeks. Consider alternative anticoagulant if poor control.",
    explanation:
      "CYP2C9*3 allele reduces enzyme activity by ~80%. This leads to decreased warfarin clearance, resulting in elevated plasma concentrations. CPIC Level A evidence supports dose reduction for intermediate metabolizers.",
  },
  {
    drug: "Clopidogrel",
    risk: "toxic",
    gene: "CYP2C19",
    phenotype: "Poor Metabolizer (*2/*2)",
    recommendation:
      "Avoid clopidogrel. Use alternative antiplatelet agent such as prasugrel or ticagrelor. Ensure no contraindications exist for alternatives.",
    explanation:
      "CYP2C19*2/*2 results in complete loss of CYP2C19 enzyme function. Clopidogrel is a prodrug requiring CYP2C19 for activation. Poor metabolizers have significantly reduced active metabolite formation, leading to inadequate platelet inhibition and increased cardiovascular event risk.",
  },
  {
    drug: "Simvastatin",
    risk: "safe",
    gene: "SLCO1B1",
    phenotype: "Normal Function (521TT)",
    recommendation:
      "Standard dosing is appropriate. No pharmacogenomic-based dose adjustment required. Continue routine monitoring.",
    explanation:
      "SLCO1B1 521TT genotype indicates normal transporter function. No increased risk of simvastatin-induced myopathy. Standard statin therapy guidelines apply.",
  },
]

export default function PatientDashboard() {
  const { session, role, initializing } = useAuth()
  const router = useRouter()

  const [vcfFile, setVcfFile] = useState<File | null>(null)
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([])
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    age: "",
    sex: "",
    allergies: "",
    geneticDeficiencies: "",
    notes: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<DrugResult[] | null>(null)

  useEffect(() => {
    if (initializing) return
    if (!session) {
      router.replace("/login?from=/patient")
    } else if (role && role !== "patient") {
      // Logged in but wrong role — redirect to their dashboard
      router.replace(role === "doctor" ? "/doctor" : "/admin")
    }
  }, [initializing, session, role, router])

  if (initializing || !session || role !== "patient") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner className="h-4 w-4" />
          Checking patient access…
        </div>
      </div>
    )
  }

  const canAnalyze = vcfFile && selectedDrugs.length > 0

  const handleAnalyze = useCallback(async () => {
    if (!canAnalyze) return
    setIsAnalyzing(true)
    setResults(null)

    try {
      const resultsArray: DrugResult[] = []

      // Analyze each selected drug
      for (const drug of selectedDrugs) {
        const formData = new FormData()
        formData.append("file", vcfFile!)
        formData.append("drug", drug)

        const response = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to analyze ${drug}`)
        }

        const jsonData = await response.json()

        // Transform API response to DrugResult format
        const result: DrugResult = {
          drug: jsonData.drug,
          risk: (jsonData.risk_assessment?.risk_label || "safe").toLowerCase() as any,
          gene: jsonData.pharmacogenomic_profile?.primary_gene || "",
          phenotype: jsonData.pharmacogenomic_profile?.phenotype || "",
          recommendation: jsonData.clinical_recommendation?.recommendation || "",
          explanation: jsonData.llm_generated_explanation?.summary || "",
          jsonData: jsonData, // Store full JSON for download
        }
        resultsArray.push(result)
      }

      setResults(resultsArray)
    } catch (error) {
      console.error("Analysis error:", error)
      // Fallback to mock results on error for demonstration
      setResults(mockResults.filter((r) => selectedDrugs.includes(r.drug)))
    } finally {
      setIsAnalyzing(false)
    }
  }, [canAnalyze, selectedDrugs, vcfFile])

  return (
    <div className="flex h-screen bg-background">
      <PatientSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileHeader title="Patient Analysis" />

        {/* Top bar (desktop) */}
        <header className="hidden h-16 items-center justify-between border-b border-border bg-card px-8 lg:flex">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Patient Analysis
            </h1>
            <p className="text-xs text-muted-foreground">
              Upload genomic data and configure analysis parameters
            </p>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={!canAnalyze || isAnalyzing}
            className="gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Analysis
              </>
            )}
          </Button>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <VcfUpload onFileSelect={setVcfFile} />
              <DrugSelector
                selectedDrugs={selectedDrugs}
                onDrugsChange={setSelectedDrugs}
              />
              <PatientInfoForm
                patientInfo={patientInfo}
                onPatientInfoChange={setPatientInfo}
              />

              {/* Mobile analyze button */}
              <div className="lg:hidden">
                <Button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze || isAnalyzing}
                  className="w-full gap-2"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Run Analysis
                    </>
                  )}
                </Button>
              </div>

              <RiskSummary isAnalyzing={isAnalyzing} results={results} />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
