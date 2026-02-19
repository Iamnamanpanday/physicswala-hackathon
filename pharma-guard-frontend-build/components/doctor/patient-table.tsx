"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Search, AlertTriangle, Users } from "lucide-react"

type RiskLevel = "safe" | "adjust" | "toxic"

interface Patient {
  id: string
  name: string
  age: number
  drug: string
  gene: string
  risk: RiskLevel
  lastAnalysis: string
}

const mockPatients: Patient[] = [
  { id: "P-001", name: "James Wilson", age: 62, drug: "Warfarin", gene: "CYP2C9", risk: "adjust", lastAnalysis: "2026-02-18" },
  { id: "P-002", name: "Sarah Chen", age: 45, drug: "Clopidogrel", gene: "CYP2C19", risk: "toxic", lastAnalysis: "2026-02-18" },
  { id: "P-003", name: "Robert Miller", age: 57, drug: "Simvastatin", gene: "SLCO1B1", risk: "safe", lastAnalysis: "2026-02-17" },
  { id: "P-004", name: "Emily Davis", age: 38, drug: "Codeine", gene: "CYP2D6", risk: "toxic", lastAnalysis: "2026-02-17" },
  { id: "P-005", name: "Michael Brown", age: 71, drug: "Tamoxifen", gene: "CYP2D6", risk: "adjust", lastAnalysis: "2026-02-16" },
  { id: "P-006", name: "Lisa Anderson", age: 53, drug: "Abacavir", gene: "HLA-B", risk: "toxic", lastAnalysis: "2026-02-16" },
  { id: "P-007", name: "David Thompson", age: 49, drug: "Carbamazepine", gene: "HLA-A", risk: "safe", lastAnalysis: "2026-02-15" },
  { id: "P-008", name: "Jennifer Garcia", age: 66, drug: "Fluorouracil", gene: "DPYD", risk: "adjust", lastAnalysis: "2026-02-15" },
]

const riskConfig: Record<RiskLevel, { label: string; className: string }> = {
  safe: {
    label: "Safe",
    className: "bg-success/15 text-success border-success/30",
  },
  adjust: {
    label: "Adjust Dosage",
    className: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  toxic: {
    label: "Toxic / Ineffective",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
}

interface PatientTableProps {
  onSendAlert: (patientId: string) => void
}

export function PatientTable({ onSendAlert }: PatientTableProps) {
  const [search, setSearch] = useState("")
  const [sendingAlert, setSendingAlert] = useState<string | null>(null)

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.drug.toLowerCase().includes(search.toLowerCase())
  )

  const handleSendAlert = async (patientId: string) => {
    setSendingAlert(patientId)
    // Simulate POST /api/send-alert
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onSendAlert(patientId)
    setSendingAlert(null)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Patient List
            </CardTitle>
            <CardDescription>
              {mockPatients.length} patients with pharmacogenomic analyses
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead className="hidden sm:table-cell">Age</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead className="hidden md:table-cell">Gene</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="w-24 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient, index) => {
                const config = riskConfig[patient.risk]
                const isCritical = patient.risk === "toxic"

                return (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={`border-b border-border transition-colors hover:bg-muted/50 ${
                      isCritical ? "bg-destructive/[0.03]" : ""
                    }`}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {patient.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {isCritical && (
                          <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                        )}
                        <span className="font-medium text-foreground">
                          {patient.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {patient.age}
                    </TableCell>
                    <TableCell className="text-foreground">{patient.drug}</TableCell>
                    <TableCell className="hidden font-mono text-xs text-muted-foreground md:table-cell">
                      {patient.gene}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={config.className}>
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                      {patient.lastAnalysis}
                    </TableCell>
                    <TableCell className="text-right">
                      {isCritical && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleSendAlert(patient.id)}
                          disabled={sendingAlert === patient.id}
                          aria-label={`Send alert for ${patient.name}`}
                        >
                          <Mail className={`h-4 w-4 ${sendingAlert === patient.id ? "animate-pulse" : ""}`} />
                        </Button>
                      )}
                    </TableCell>
                  </motion.tr>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export { mockPatients }
export type { Patient, RiskLevel }
