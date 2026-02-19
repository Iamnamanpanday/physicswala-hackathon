"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "lucide-react"

export interface PatientInfo {
  name: string
  age: string
  sex: string
  allergies: string
  geneticDeficiencies: string
  notes: string
}

interface PatientInfoFormProps {
  patientInfo: PatientInfo
  onPatientInfoChange: (info: PatientInfo) => void
}

export function PatientInfoForm({ patientInfo, onPatientInfoChange }: PatientInfoFormProps) {
  const updateField = (field: keyof PatientInfo, value: string) => {
    onPatientInfoChange({ ...patientInfo, [field]: value })
  }

  return (
    <Card id="info">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          Patient Information
        </CardTitle>
        <CardDescription>
          Enter patient details to contextualize the risk analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="patient-name">Full Name</Label>
            <Input
              id="patient-name"
              placeholder="Enter patient name"
              value={patientInfo.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="patient-age">Age</Label>
            <Input
              id="patient-age"
              type="number"
              placeholder="e.g. 45"
              value={patientInfo.age}
              onChange={(e) => updateField("age", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="patient-sex">Biological Sex</Label>
            <Select
              value={patientInfo.sex}
              onValueChange={(value) => updateField("sex", value)}
            >
              <SelectTrigger id="patient-sex">
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="genetic-deficiencies">Known Genetic Deficiencies</Label>
            <Input
              id="genetic-deficiencies"
              placeholder="e.g. G6PD deficiency"
              value={patientInfo.geneticDeficiencies}
              onChange={(e) => updateField("geneticDeficiencies", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="allergies">Known Allergies</Label>
            <Input
              id="allergies"
              placeholder="e.g. Penicillin, Sulfa drugs"
              value={patientInfo.allergies}
              onChange={(e) => updateField("allergies", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional clinical context..."
              rows={3}
              value={patientInfo.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
