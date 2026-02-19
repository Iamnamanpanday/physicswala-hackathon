"use client"

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChartIcon, BarChart3 } from "lucide-react"

// Computed colors (not CSS vars) for Recharts
const RISK_COLORS = {
  safe: "#22c55e",
  adjust: "#eab308",
  toxic: "#ef4444",
}

const riskDistribution = [
  {
    name: "Safe",
    value: 2,
    fill: RISK_COLORS.safe,
    // Example drug names — replace with actual data when available
    drugs: ["Simvastatin", "Metformin"],
  },
  {
    name: "Adjust Dosage",
    value: 3,
    fill: RISK_COLORS.adjust,
    drugs: ["Warfarin"],
  },
  {
    name: "Toxic / Ineffective",
    value: 3,
    fill: RISK_COLORS.toxic,
    drugs: ["Clopidogrel", "Codeine", "Fluorouracil"],
  },
]

const geneInvolvement = [
  { gene: "CYP2C9", count: 1 },
  { gene: "CYP2C19", count: 1 },
  { gene: "SLCO1B1", count: 1 },
  { gene: "CYP2D6", count: 2 },
  { gene: "HLA-B", count: 1 },
  { gene: "HLA-A", count: 1 },
  { gene: "DPYD", count: 1 },
]

const GENE_BAR_COLOR = "#0d9488"

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Risk Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PieChartIcon className="h-5 w-5 text-primary" />
            Risk Distribution
          </CardTitle>
          <CardDescription>
            Breakdown of patient risk categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              safe: { label: "Safe", color: RISK_COLORS.safe },
              adjust: { label: "Adjust Dosage", color: RISK_COLORS.adjust },
              toxic: { label: "Toxic / Ineffective", color: RISK_COLORS.toxic },
            }}
            className="mx-auto aspect-square h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  strokeWidth={2}
                  stroke="var(--color-card, #fff)"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gene Involvement Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5 text-primary" />
            Gene Involvement
          </CardTitle>
          <CardDescription>
            Frequency of genes in pharmacogenomic interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: { label: "Patients", color: GENE_BAR_COLOR },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={geneInvolvement}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="gene"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill={GENE_BAR_COLOR}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
