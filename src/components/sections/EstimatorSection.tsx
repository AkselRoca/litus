'use client'

import { Button, Input } from '@/components/ui'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Search, TrendingUp, Users, Activity, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import * as React from 'react'
import { availableMetiers, availableVilles } from '@/lib/estimator-data'
import { Card } from '@/components/ui/Card'

export function EstimatorSection() {
    const [metier, setMetier] = React.useState('')
    const [ville, setVille] = React.useState('')
    const [result, setResult] = React.useState<number | null>(null)
    const [isCalculating, setIsCalculating] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [step, setStep] = React.useState('idle') // idle, analyzing, result

    const steps = [
        "Analyse du volume de recherche...",
        "Calcul de la concurrence locale...",
        "Estimation du taux de conversion...",
        "Finalisation du rapport..."
    ]
    const [currentStepIndex, setCurrentStepIndex] = React.useState(0)

    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!metier || !ville) return

        setStep('analyzing')
        setIsCalculating(true)
        setProgress(0)
        setCurrentStepIndex(0)

        // Simulation d'une analyse complexe (pour l'effet "Wow")
        const duration = 2500 // 2.5s d'animation
        const intervalTime = 50
        const stepsCount = duration / intervalTime
        let currentStep = 0

        const timer = setInterval(() => {
            currentStep++
            const newProgress = Math.min((currentStep / stepsCount) * 100, 100)
            setProgress(newProgress)

            // Change text steps
            if (newProgress > 25 && currentStepIndex < 1) setCurrentStepIndex(1)
            else if (newProgress > 50 && currentStepIndex < 2) setCurrentStepIndex(2)
            else if (newProgress > 75 && currentStepIndex < 3) setCurrentStepIndex(3)

            if (currentStep >= stepsCount) {
                clearInterval(timer)
                finishCalculation()
            }
        }, intervalTime)
    }

    const finishCalculation = async () => {
        try {
            const response = await fetch('/api/estimator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metier, ville }),
            })
            const data = await response.json()
            if (response.ok) {
                setResult(data.potentiel)
                setStep('result')
            } else {
                setStep('idle') // Reset on error for now
            }
        } catch (err) {
            setStep('idle')
        } finally {
            setIsCalculating(false)
        }
    }

    return (
        <section id="estimateur" className="py-24 bg-white dark:bg-dark relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-fluid relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Copy & Urgency */}
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                <span className="text-sm font-bold text-red-500 tracking-wider uppercase">Analyse de marché en direct</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading leading-tight">
                                Votre marché <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">vous attend.</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Chaque jour sans présence digitale optimisée, ce sont des douzaines de clients qui signent chez vos concurrents.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold">+150% de croissance moyenne</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-500">pour nos clients la première année</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold">Données Google Officielles</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-500">basées sur les volumes de recherche réels</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: The "Widget" */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-600 rounded-2xl blur-2xl opacity-20 dark:opacity-40 -z-10 transform rotate-2 scale-105" />

                        <Card variant="default" className="bg-white/80 dark:bg-[#121212]/90 backdrop-blur-xl border-white/20 dark:border-white/10 p-0 overflow-hidden shadow-2xl relative">
                            {/* Widget Header */}
                            <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-primary" />
                                    <span className="font-bold font-heading text-lg">Litus Intelligence™</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                                </div>
                            </div>

                            <div className="p-8 relative min-h-[400px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {/* STATE: IDLE (Form) */}
                                    {step === 'idle' && (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                            onSubmit={handleCalculate}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Votre activité</label>
                                                    <div className="relative group">
                                                        <Input
                                                            type="text"
                                                            list="metiers-list"
                                                            placeholder="Ex: Plombier, Avocat..."
                                                            value={metier}
                                                            onChange={e => setMetier(e.target.value)}
                                                            className="pl-5 h-14 bg-gray-50 dark:bg-[#0A0A0A] border-gray-200 dark:border-white/10 focus:ring-primary/20 text-lg transition-all group-hover:border-primary/50"
                                                            required
                                                        />
                                                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Votre ville</label>
                                                    <div className="relative group">
                                                        <Input
                                                            type="text"
                                                            list="villes-list"
                                                            placeholder="Ex: Paris, Lyon..."
                                                            value={ville}
                                                            onChange={e => setVille(e.target.value)}
                                                            className="pl-5 h-14 bg-gray-50 dark:bg-[#0A0A0A] border-gray-200 dark:border-white/10 focus:ring-primary/20 text-lg transition-all group-hover:border-primary/50"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                size="xl"
                                                className="w-full text-lg h-16 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all font-bold"
                                            >
                                                Lancer l'analyse
                                            </Button>
                                            <div className="text-center text-xs text-gray-400">Gratuit, instantané et sans engagement.</div>
                                        </motion.form>
                                    )}

                                    {/* STATE: ANALYZING (Progress) */}
                                    {step === 'analyzing' && (
                                        <motion.div
                                            key="analyzing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-sm"
                                        >
                                            <div className="w-24 h-24 mb-6 relative">
                                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                                    <circle className="text-gray-200 dark:text-gray-800 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                                                    <circle className="text-primary progress-ring__circle stroke-current transition-all duration-100 ease-linear" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * progress) / 100}></circle>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-primary">
                                                    {Math.round(progress)}%
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 animate-pulse">{steps[currentStepIndex]}</h3>
                                            <p className="text-sm text-gray-500">Interrogation de la base de données Google...</p>
                                        </motion.div>
                                    )}

                                    {/* STATE: RESULT */}
                                    {step === 'result' && result !== null && (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center"
                                        >
                                            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Potentiel Annuel Identifié</p>
                                            <div className="text-5xl md:text-6xl font-bold font-heading text-primary mb-2 tracking-tight">
                                                <AnimatedCounter target={result} suffix=" €" />
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs mx-auto">
                                                C'est le chiffre d'affaires que vous laissez à vos concurrents à {ville}.
                                            </p>

                                            <div className="grid grid-cols-2 gap-4 mb-8">
                                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">~500</div>
                                                    <div className="text-xs text-gray-500">Recherches / mois</div>
                                                </div>
                                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">Faible</div>
                                                    <div className="text-xs text-gray-500">Concurrence</div>
                                                </div>
                                            </div>

                                            <Button size="lg" href="/contact" className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/30">
                                                Récupérer ce CA maintenant
                                            </Button>
                                            <button
                                                onClick={() => setStep('idle')}
                                                className="mt-4 text-sm text-gray-500 hover:text-primary transition-colors underline decoration-dotted"
                                            >
                                                Faire une autre estimation
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Datalists for Autocomplete */}
                <datalist id="metiers-list">
                    {availableMetiers.map(m => <option key={m} value={m} />)}
                </datalist>
                <datalist id="villes-list">
                    {availableVilles.map(v => <option key={v} value={v} />)}
                </datalist>
            </div>
        </section>
    )
}
