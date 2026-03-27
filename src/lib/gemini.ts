/**
 * Service Google Gemini - Génération d'analyses de marché (100% IA)
 * 
 * Ce service estime avec précision les volumes de recherche locaux,
 * les KPIs du marché et génère un argumentaire commercial pour l'agence Litus.
 */

export interface MarketAnalysis {
    potentielAnnuel: number
    potentielMensuel: number
    recherchesMensuelles: number
    concurrence: 'Faible' | 'Moyenne' | 'Forte'
    tendance: 'Hausse' | 'Stable' | 'Baisse'
    analyse: string
    panierMoyen: number
    tauxCapture: number
    cpc: number
    keyword: string
    isEstimation?: boolean
}

interface GeminiResponse {
    candidates: Array<{
        content: {
            parts: Array<{
                text: string
            }>
        }
    }>
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

/**
 * Génère une analyse de marché complète via Gemini (Volume estimé + Pitch)
 */
export async function generateMarketAnalysis(
    metier: string,
    ville: string
): Promise<MarketAnalysis> {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY non configurée')
    }

    const keyword = `${metier} ${ville}`

    const prompt = `Tu es un expert reconnu en SEO local et en marketing digital pour les entreprises en France, travaillant pour l'agence experte "Litus".
Ton objectif est de générer une estimation de marché précise et un argumentaire commercial très percutant pour un prospect.

Le prospect a saisi les informations suivantes :
- Activité / Métier : "${metier}"
- Localité / Ville : "${ville}"

Instructions :
1. Estime de manière réaliste et très précise le volume de recherche mensuel sur Google (les requêtes commerciales exactes ou très proches) pour cette activité dans cette ville géographique.
2. Estime un Coût Par Clic (CPC) moyen réaliste sur Google Ads pour ces mots-clés locaux.
3. Évalue la concurrence locale (Faible, Moyenne, Forte).
4. Estime le panier moyen réaliste d'un client pour cette activité (en euros).
5. Calcule un taux de conversion / capture réaliste (le % de recherches mensuelles qui deviennent de vrais clients si l'entreprise est en 1ère page Google grâce à Litus). Souvent entre 3% (Forte concurrence) et 8% (Faible concurrence).
6. Calcule le CA mensuel (Volume * Taux * Panier) et annuel (Mensuel * 12).
7. Rédige un court paragraphe d'analyse (3 phrases max) très orienté VENTE (Copywriting). 
   - Le message doit faire un électrochoc à l'artisan/entreprise : un marché énorme l'attend, il laisse tout cet argent sur la table à ses concurrents chaque mois.
   - Mentionne très subtilement que l'agence Litus est là pour l'aider à capter toute cette demande avec un site web performant, du SEO et du Google Ads.

Génère UNIQUEMENT une réponse en format JSON valide avec cette structure exacte (SANS balises markdown autour) :
{
    "recherchesMensuelles": 1500,
    "cpc": 2.50,
    "concurrence": "Forte",
    "panierMoyen": 400,
    "tauxCapture": 0.05,
    "potentielMensuel": 30000,
    "potentielAnnuel": 360000,
    "tendance": "Hausse",
    "analyse": "Chaque mois, plus de 1500 personnes recherchent vos services à Paris. Actuellement, ce sont vos concurrents qui raflent ces 30 000€ de chiffre d'affaires mensuel car vous n'êtes pas visible. Litus peut vous aider à dominer ce marché avec une stratégie SEO et un site web haut de gamme."
}`

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 600, responseMimeType: 'application/json' },
            }),
        })

        if (!response.ok) {
            const errorText = await response.text();
            console.warn(`Gemini API error: ${response.status} - ${errorText}`)
            throw new Error(`API: ${response.status} ${errorText.substring(0, 100)}`)
        }

        const data: GeminiResponse = await response.json()
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (textContent) {
            // Nettoyage au cas où Gemini ajoute des balises Markdown ```json ... ```
            const cleanJson = textContent.replace(/```json\n?|\n?```/g, '').trim()
            const result = JSON.parse(cleanJson)

            // Sécurité pour éviter les erreurs de format strict
            return {
                keyword,
                recherchesMensuelles: result.recherchesMensuelles || 500,
                cpc: result.cpc || 1.5,
                concurrence: result.concurrence || 'Moyenne',
                panierMoyen: result.panierMoyen || 200,
                tauxCapture: result.tauxCapture || 0.05,
                potentielMensuel: result.potentielMensuel || 5000,
                potentielAnnuel: result.potentielAnnuel || 60000,
                tendance: result.tendance || 'Stable',
                analyse: result.analyse || `Il y a un fort potentiel pour le terme "${keyword}". Ces recherches représentent un chiffre d'affaires mensuel important. Litus by Aksel est l'agence idéale pour vous aider à capter cette clientèle avec un site optimisé et du référencement sur-mesure.`,
            }
        }

        throw new Error('Pas de contenu généré')
    } catch (error) {
        console.error('Gemini analysis error:', error)
        
        // Fallback générique en cas d'erreur IA totale
        return {
            keyword,
            recherchesMensuelles: 350,
            cpc: 2.0,
            concurrence: 'Moyenne',
            panierMoyen: 300,
            tauxCapture: 0.05,
            potentielMensuel: 5250,
            potentielAnnuel: 63000,
            tendance: 'Stable',
            analyse: `[MODE DÉGRADÉ] L'IA a rencontré une erreur (${error instanceof Error ? error.message : 'Inconnue'}). Néanmoins, le marché pour "${keyword}" présente de belles opportunités. Sans visibilité optimale sur Google, vos concurrents captent une majorité de cette demande. Litus met en place des stratégies digitales performantes (Site Web, SEO, Ads) pour vous aider à devenir le leader local dans votre domaine.`
        }
    }
}
