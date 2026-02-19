"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Brain, Dna, BarChart3, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "VCF Parsing",
    description:
      "Upload and parse Variant Call Format files to extract genetic variants. Our engine identifies pharmacogenomic markers with clinical significance.",
  },
  {
    icon: BookOpen,
    title: "CPIC Guidelines",
    description:
      "Integrated CPIC-level evidence mapping for drug-gene pairs. Automatically matched guidelines inform every recommendation.",
  },
  {
    icon: Brain,
    title: "Explainable AI",
    description:
      "Transparent, interpretable predictions powered by LLM reasoning. Every risk assessment includes a detailed clinical explanation.",
  },
  {
    icon: Dna,
    title: "Genomic Profiling",
    description:
      "Comprehensive pharmacogenomic profiling across CYP enzymes, transporters, and HLA alleles for holistic risk assessment.",
  },
  {
    icon: BarChart3,
    title: "Risk Analytics",
    description:
      "Visual dashboards with color-coded risk categories. Track patient outcomes and identify critical drug interactions at a glance.",
  },
  {
    icon: ShieldCheck,
    title: "Clinical Safety",
    description:
      "Real-time alerts for high-risk drug-gene interactions. Automated notifications ensure no critical finding goes unnoticed.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function FeaturesSection() {
  return (
    <section className="relative bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for Clinical Precision
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Every feature is designed to support evidence-based pharmacogenomic
            decision-making at the point of care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="group h-full border-border/60 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
