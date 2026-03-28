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

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

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

    const prompt = `Tu es un consultant senior Google Ads et SEO local en France avec 10 ans d'expérience. Tu travailles pour l'agence digitale "Litus".
Un prospect vient de tester notre outil d'estimation. Tu dois produire une analyse de marché RÉALISTE, comme si tu préparais une vraie campagne Google Ads pour ce client.

PROSPECT :
- Activité : "${metier}"
- Ville principale : "${ville}"

MÉTHODOLOGIE (applique-la rigoureusement) :

1. ZONE DE CHALANDISE RÉALISTE
   - Prends en compte la ville indiquée + son agglomération/bassin de vie naturel (les communes limitrophes où un habitant irait logiquement chercher ce type de professionnel).
   - Pour une grande ville (Paris, Lyon, Marseille...) : reste sur la métropole.
   - Pour une ville moyenne (Lorient, Vannes, Annecy...) : inclus les 3-5 communes principales autour (rayon ~15-20km max).
   - Pour une petite ville : inclus le bassin d'emploi logique.
   - Le volume de recherche que tu donnes doit refléter TOUTE cette zone, pas juste la ville exacte.

2. VOLUME DE RECHERCHE MENSUEL (recherchesMensuelles)
   - Agrège les variantes de mots-clés à INTENTION COMMERCIALE que tu ciblerais dans une vraie campagne Ads :
     • Requête principale : "${metier} ${ville}"
     • Variantes géographiques : "${metier}" + communes principales de la zone
     • Variantes de service les plus courantes (2-3 max, pas plus) : ex pour un couvreur → "réparation toiture", "couvreur urgence", "devis toiture"
   - NE PAS gonfler artificiellement : ne prends que les requêtes qu'un vrai gestionnaire Ads ciblerait, avec une intention d'achat claire.
   - Estime un volume réaliste basé sur la taille de la population de la zone et de la demande typique pour ce secteur.

3. CPC MOYEN (cpc)
   - Estime le Coût Par Clic moyen réaliste sur Google Ads pour ces mots-clés dans cette zone géographique.

4. CONCURRENCE (concurrence) : "Faible", "Moyenne" ou "Forte"

5. PANIER MOYEN (panierMoyen)
   - Base-toi sur la PRESTATION LA PLUS COURANTE pour ce métier (pas la plus chère, pas la moins chère).
   - Ex: pour un couvreur → réparation/entretien (~800-1500€), PAS une toiture neuve à 15000€.
   - Ex: pour un avocat → consultation + dossier standard, PAS un procès à 50000€.

6. TAUX DE CAPTURE (tauxCapture)
   - Pourcentage réaliste des recherches mensuelles qui se convertissent en clients payants quand l'entreprise est bien positionnée (SEO + Ads combinés).
   - Fourchette réaliste : 3% (secteur très concurrentiel, grande ville) à 8% (niche, petite ville).
   - Ajuste selon le secteur et la concurrence.

7. CALCULS
   - potentielMensuel = recherchesMensuelles × tauxCapture × panierMoyen
   - potentielAnnuel = potentielMensuel × 12
   - Vérifie que les calculs sont MATHÉMATIQUEMENT CORRECTS avant de répondre.

8. ANALYSE / COPYWRITING (analyse)
   - 3 phrases max, ton commercial percutant.
   - Mentionne le chiffre du POTENTIEL ANNUEL (pas mensuel), car c'est celui affiché en gros sur l'écran.
   - Fais comprendre au prospect que cette demande existe MAINTENANT et que ses concurrents la captent à sa place.
   - Mentionne subtilement que Litus peut l'aider (site web, SEO, Google Ads).

9. TENDANCE (tendance) : "Hausse", "Stable" ou "Baisse" - selon l'évolution du secteur dans cette zone.

RÈGLES STRICTES :
- Tous les nombres : AUCUN ESPACE ni séparateur de milliers (écris 15000, PAS 15 000).
- Les calculs doivent être mathématiquement vérifiés.
- Sois RÉALISTE : ni trop optimiste (le prospect doit trouver ça crédible), ni trop pessimiste (c'est un outil de prospection commerciale).

Réponds UNIQUEMENT avec ce JSON :
{
    "recherchesMensuelles": 720,
    "cpc": 3.20,
    "concurrence": "Forte",
    "panierMoyen": 1200,
    "tauxCapture": 0.05,
    "potentielMensuel": 43200,
    "potentielAnnuel": 518400,
    "tendance": "Stable",
    "analyse": "Dans l'agglomération de Lyon, plus de 720 recherches mensuelles ciblent vos services. C'est un potentiel de 518400€ de chiffre d'affaires annuel que vos concurrents captent grâce à leur visibilité en ligne. Litus peut vous positionner en tête de Google avec un site performant, du SEO local et des campagnes Ads ciblées."
}`

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 8192, responseMimeType: 'application/json' },
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
            // Extraction robuste du JSON (ignore le texte avant ou après et gère les coupures)
            const match = textContent.match(/\{[\s\S]*\}/)
            const cleanJson = match ? match[0] : textContent.replace(/```json\n?|\n?```/g, '').trim()
            
            let result
            try {
                result = JSON.parse(cleanJson)
            } catch (e) {
                // Si l'IA a vraiment renvoyé n'importe quoi, on debug ici
                throw new Error(`JSON invalide ou coupé. Reçu: ${cleanJson.substring(0, 50)}...`)
            }
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
