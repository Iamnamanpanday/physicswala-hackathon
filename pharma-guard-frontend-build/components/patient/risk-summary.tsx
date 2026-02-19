"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { FileText, ChevronDown, Dna, Stethoscope, Brain, AlertTriangle, Download, Code } from "lucide-react"
import { useState } from "react"

type RiskLevel = "safe" | "adjust" | "toxic"

interface DrugResult {
  drug: string
  risk: RiskLevel
  gene: string
  phenotype: string
  recommendation: string
  explanation: string
  jsonData?: any // Raw JSON response from backend
}

interface RiskSummaryProps {
  isAnalyzing: boolean
  results: DrugResult[] | null
}

const riskConfig: Record<RiskLevel, { label: string; className: string; badgeClass: string }> = {
  safe: {
    label: "Safe",
    className: "border-success/30 bg-success/5",
    badgeClass: "bg-success/15 text-success border-success/30",
  },
  adjust: {
    label: "Adjust Dosage",
    className: "border-warning/30 bg-warning/5",
    badgeClass: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  toxic: {
    label: "Toxic / Ineffective",
    className: "border-destructive/30 bg-destructive/5",
    badgeClass: "bg-destructive/15 text-destructive border-destructive/30",
  },
}

function AnalysisSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-20 w-full rounded-lg" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-4 w-28" />
          <Skeleton className="h-3 w-44" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-20 w-full rounded-lg" />
    </div>
  )
}

function DrugResultCard({ result }: { result: DrugResult }) {
  const [isOpen, setIsOpen] = useState(false)
  const config = riskConfig[result.risk]

  const handleDownloadJSON = () => {
    const json = result.jsonData || {
      drug: result.drug,
      gene: result.gene,
      phenotype: result.phenotype,
      risk: result.risk,
      recommendation: result.recommendation,
      explanation: result.explanation,
    }
    const jsonString = JSON.stringify(json, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${result.drug.toLowerCase()}-analysis-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 ${config.className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
            <Dna className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{result.drug}</p>
            <p className="text-xs text-muted-foreground">
              {result.gene} &middot; {result.phenotype}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownloadJSON}
            className="h-6 w-6 p-0"
            title="Download JSON"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Badge variant="outline" className={config.badgeClass}>
            {result.risk === "toxic" && (
              <AlertTriangle className="mr-1 h-3 w-3" />
            )}
            {config.label}
          </Badge>
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-3">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-full justify-between px-2 text-xs text-muted-foreground"
          >
            View detailed analysis
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 flex flex-col gap-3">
          {/* Pharmacogenomic Profile */}
          <div className="rounded-lg bg-card p-3">
            <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
              <Dna className="h-3.5 w-3.5 text-primary" />
              Pharmacogenomic Profile
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Gene: {result.gene} | Phenotype: {result.phenotype}
            </p>
          </div>

          {/* Clinical Recommendation */}
          <div className="rounded-lg bg-card p-3">
            <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
              <Stethoscope className="h-3.5 w-3.5 text-primary" />
              Clinical Recommendation
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {result.recommendation}
            </p>
          </div>

          {/* LLM Explanation */}
          <div className="rounded-lg bg-card p-3">
            <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
              <Brain className="h-3.5 w-3.5 text-primary" />
              AI Explanation
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {result.explanation}
            </p>
          </div>

          {/* JSON Data */}
          {result.jsonData && (
            <div className="rounded-lg bg-card p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-foreground">
                <Code className="h-3.5 w-3.5 text-primary" />
                Raw JSON Data
              </div>
              <div className="max-h-48 overflow-y-auto rounded bg-black/20 p-2 font-mono text-xs text-muted-foreground">
                <pre>{JSON.stringify(result.jsonData, null, 2)}</pre>
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  )
}

export function RiskSummary({ isAnalyzing, results }: RiskSummaryProps) {
  return (
    <Card id="report">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Risk Summary
        </CardTitle>
        <CardDescription>
          Pharmacogenomic risk assessment results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnalysisSkeleton />
            </motion.div>
          ) : results ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4"
            >
              {/* Summary badges */}
              <div className="mb-2 flex flex-wrap gap-3">
                {(["safe", "adjust", "toxic"] as const).map((level) => {
                  const count = results.filter((r) => r.risk === level).length
                  if (count === 0) return null
                  const config = riskConfig[level]
                  return (
                    <Badge key={level} variant="outline" className={`${config.badgeClass} py-1`}>
                      {count} {config.label}
                    </Badge>
                  )
                })}
              </div>

              {results.map((result) => (
                <DrugResultCard key={result.drug} result={result} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                No analysis results yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Upload a VCF file and select drugs to begin
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export type { DrugResult, RiskLevel }
