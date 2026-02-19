import { NextRequest, NextResponse } from "next/server"

/**
 * POST /api/analyze
 *
 * Accepts a VCF file and drug name.
 * Forwards to Python backend for pharmacogenomic analysis.
 *
 * Expected body (FormData):
 * - file: File (VCF file)
 * - drug: string (drug name)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const drug = formData.get("drug") as string | null

    if (!file) {
      return NextResponse.json(
        { error: "VCF file is required" },
        { status: 400 }
      )
    }

    if (!drug) {
      return NextResponse.json(
        { error: "Drug is required" },
        { status: 400 }
      )
    }

    // Forward to Python backend
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || "http://localhost:8000"

    const backendFormData = new FormData()
    backendFormData.append("file", file)
    backendFormData.append("drug", drug)

    const response = await fetch(`${pythonBackendUrl}/analyze/`, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      throw new Error(`Python backend returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { error: "Failed to process analysis request", details: String(error) },
      { status: 500 }
    )
  }
}
