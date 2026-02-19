"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pill, X, Search } from "lucide-react"

const availableDrugs = [
  "Warfarin", "Clopidogrel", "Codeine", "Tamoxifen", "Simvastatin",
  "Abacavir", "Carbamazepine", "Allopurinol", "Fluorouracil", "Irinotecan",
  "Mercaptopurine", "Thiopurine", "Azathioprine", "Voriconazole", "Tacrolimus",
]

interface DrugSelectorProps {
  selectedDrugs: string[]
  onDrugsChange: (drugs: string[]) => void
}

export function DrugSelector({ selectedDrugs, onDrugsChange }: DrugSelectorProps) {
  const [search, setSearch] = useState("")

  const filteredDrugs = availableDrugs.filter(
    (drug) =>
      drug.toLowerCase().includes(search.toLowerCase()) &&
      !selectedDrugs.includes(drug)
  )

  const addDrug = (drug: string) => {
    onDrugsChange([...selectedDrugs, drug])
    setSearch("")
  }

  const removeDrug = (drug: string) => {
    onDrugsChange(selectedDrugs.filter((d) => d !== drug))
  }

  return (
    <Card id="drugs">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Pill className="h-5 w-5 text-primary" />
          Drug Selection
        </CardTitle>
        <CardDescription>
          Select drugs to analyze for pharmacogenomic interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Selected drugs */}
        {selectedDrugs.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedDrugs.map((drug) => (
              <Badge
                key={drug}
                variant="secondary"
                className="gap-1.5 py-1.5 pl-3 pr-2 text-sm"
              >
                {drug}
                <button
                  onClick={() => removeDrug(drug)}
                  className="ml-1 rounded-full p-0.5 hover:bg-foreground/10"
                  aria-label={`Remove ${drug}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search drugs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Drug suggestions */}
        {search && filteredDrugs.length > 0 && (
          <div className="mt-3 rounded-lg border border-border bg-card">
            {filteredDrugs.slice(0, 6).map((drug) => (
              <Button
                key={drug}
                variant="ghost"
                className="w-full justify-start rounded-none border-b border-border/50 px-4 py-3 text-sm font-normal last:border-0"
                onClick={() => addDrug(drug)}
              >
                <Pill className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                {drug}
              </Button>
            ))}
          </div>
        )}

        {/* Quick select */}
        {!search && selectedDrugs.length === 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Common drugs:
            </p>
            <div className="flex flex-wrap gap-2">
              {availableDrugs.slice(0, 6).map((drug) => (
                <Button
                  key={drug}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => addDrug(drug)}
                >
                  {drug}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
