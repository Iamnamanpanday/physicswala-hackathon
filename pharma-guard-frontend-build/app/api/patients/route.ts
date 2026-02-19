import { NextResponse } from "next/server"

/**
 * GET /api/patients
 *
 * Returns a list of patients with their pharmacogenomic analysis results.
 *
 * This is a placeholder endpoint ready for backend integration.
 */
export async function GET() {
  // TODO: Replace with actual database query
  const mockPatients = [
    { id: "P-001", name: "James Wilson", age: 62, drug: "Warfarin", gene: "CYP2C9", risk: "adjust", lastAnalysis: "2026-02-18" },
    { id: "P-002", name: "Sarah Chen", age: 45, drug: "Clopidogrel", gene: "CYP2C19", risk: "toxic", lastAnalysis: "2026-02-18" },
    { id: "P-003", name: "Robert Miller", age: 57, drug: "Simvastatin", gene: "SLCO1B1", risk: "safe", lastAnalysis: "2026-02-17" },
    { id: "P-004", name: "Emily Davis", age: 38, drug: "Codeine", gene: "CYP2D6", risk: "toxic", lastAnalysis: "2026-02-17" },
    { id: "P-005", name: "Michael Brown", age: 71, drug: "Tamoxifen", gene: "CYP2D6", risk: "adjust", lastAnalysis: "2026-02-16" },
    { id: "P-006", name: "Lisa Anderson", age: 53, drug: "Abacavir", gene: "HLA-B", risk: "toxic", lastAnalysis: "2026-02-16" },
    { id: "P-007", name: "David Thompson", age: 49, drug: "Carbamazepine", gene: "HLA-A", risk: "safe", lastAnalysis: "2026-02-15" },
    { id: "P-008", name: "Jennifer Garcia", age: 66, drug: "Fluorouracil", gene: "DPYD", risk: "adjust", lastAnalysis: "2026-02-15" },
  ]

  return NextResponse.json({
    success: true,
    patients: mockPatients,
    total: mockPatients.length,
  })
}
