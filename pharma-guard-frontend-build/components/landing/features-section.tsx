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
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-background to-card/20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center md:mb-24"
        >
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built for Clinical Precision
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground leading-relaxed">
            Every feature is engineered to support evidence-based pharmacogenomic
            decision-making at the point of care with clinical rigor.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="group h-full border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
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
