'use client'

import { motion } from 'framer-motion'
import { Webhook, Combine, ShieldCheck, Rocket } from 'lucide-react'

export function GrandsComptesSolutions() {
    const solutions = [
        {
            title: "Architecture Headless Inviolable",
            description: "On sépare le back-end et le front-end. Vos interfaces (React/Next.js) sont véloces et vos bases de données inaccessibles aux attaques. 0 faille, 100% approuvé par la DSI.",
            icon: ShieldCheck,
        },
        {
            title: "Intégration API & ERP",
            description: "Salesforce, SAP, Hubspot, Odoo... Nous développons les middlewares et connecteurs API sur-mesure pour synchroniser vos données Legacy en temps réel vers votre portail web.",
            icon: Webhook,
        },
        {
            title: "Scalabilité (Cloud & Edge)",
            description: "Votre trafic est mondial ? Vos serveurs se dupliquent à la demande de l'Europe à l'Asie, avec des temps de réponse sous les 50ms peu importe la charge.",
            icon: Combine,
        },
        {
            title: "Méthodologie Fast-Track",
            description: "Nous court-circuitons les processus administratifs lourds des ESN : déploiement continu, itérations hebdomadaires. Vous testez la V1 en 3 mois, pas 2 ans.",
            icon: Rocket,
        }
    ]

    return (
        <section className="py-24 bg-slate-50 dark:bg-[#030712]">
            <div className="container-fluid">
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                    {/* Content Left */}
                    <div className="flex-1 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Notre solution : <span className="text-indigo-500 shrink-0">Stack Moderne.</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Nous combinons l'agilité d'une startup à l'exigence technique des grandes banques ("Bank Grade"). Votre DSI obtient des garanties béton, le Marketing un site qui convertit.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {solutions.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4 group"
                                >
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-colors">
                                        <item.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 font-light">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Code Visual Right */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full order-1 lg:order-2"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-amber-500/5 rounded-[2.5rem] blur-2xl z-0" />
                        <div className="relative z-10 w-full aspect-[4/5] rounded-[2rem] bg-[#0b0f19] overflow-hidden border border-slate-800 shadow-2xl p-6 flex flex-col font-mono">
                            {/* Editor Header */}
                            <div className="flex gap-4 items-center mb-6 pb-6 border-b border-slate-800">
                                <div className="flex gap-1.5 font-mono text-xs text-slate-500">
                                    <span className="text-emerald-400">api-gateway.ts</span>
                                    <span>—</span>
                                    <span>secure-bridge</span>
                                </div>
                            </div>

                            {/* Code lines */}
                            <div className="flex-1 flex flex-col gap-2 text-xs text-slate-400">
                                <div className="text-indigo-400">import <span className="text-slate-200">{"{ NextApiRequest, NextApiResponse }"}</span> from <span className="text-amber-300">'next'</span>;</div>
                                <div className="text-indigo-400">import <span className="text-slate-200">{"{ connectSAP }"}</span> from <span className="text-amber-300">'@enterprise/erp'</span>;</div>
                                <div className="mt-4 text-emerald-400">{'// Check WAF & Auth Tokens before continuing'}</div>
                                <div><span className="text-indigo-400">export default</span> <span className="text-indigo-400">async function</span> <span className="text-amber-200">handler</span>(</div>
                                <div className="pl-4">req: NextApiRequest,</div>
                                <div className="pl-4">res: NextApiResponse</div>
                                <div>) <span className="text-indigo-400">{"{"}</span></div>
                                <div className="pl-4"><span className="text-indigo-400">const</span> secureToken = req.headers.<span className="text-blue-300">authorization</span>;</div>
                                <div className="pl-4 mt-2"><span className="text-indigo-400">if</span> (!secureToken) <span className="text-indigo-400">{"{"}</span></div>
                                <div className="pl-8"><span className="text-indigo-400">return</span> res.<span className="text-amber-200">status</span>(<span className="text-amber-400">401</span>).<span className="text-amber-200">json</span>({"{"} <span className="text-blue-300">error</span>: <span className="text-amber-300">'Access Denied'</span> {"}"});</div>
                                <div className="pl-4"><span className="text-indigo-400">{"}"}</span></div>
                                <div className="pl-4 mt-2 text-emerald-400">{'// Bridge SAP via Edge Network'}</div>
                                <div className="pl-4"><span className="text-indigo-400">const</span> data = <span className="text-indigo-400">await</span> <span className="text-amber-200">connectSAP</span>(secureToken);</div>
                                <div className="pl-4"><span className="text-indigo-400">return</span> res.<span className="text-amber-200">status</span>(<span className="text-amber-400">200</span>).<span className="text-amber-200">json</span>(data);</div>
                                <div><span className="text-indigo-400">{"}"}</span></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
