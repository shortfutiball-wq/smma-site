import Groq from "groq-sdk"
import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `Tu es un expert en pédagogie médicale. Tu reçois un cours médical en texte brut et tu dois générer un résumé structuré au format JSON. Le JSON suit cette structure : { titre, sections[] } où chaque section a un type 'simple' (titre + contenu[{texte, gras}]) ou 'colonnes' (titre + colonnes[{titre, contenu[]}]). Utilise 'colonnes' quand il y a des distinctions nettes. Mets gras:true pour les sous-titres comme 'Clinique :', 'Radio :'. Réponds UNIQUEMENT avec le JSON brut sans markdown.`

export async function POST(req: Request) {
  try {
    const { cours } = await req.json()
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) return NextResponse.json({ error: "GROQ_API_KEY manquante" }, { status: 500 })

    const groq = new Groq({ apiKey })
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: cours },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    })

    const raw = completion.choices[0]?.message?.content?.trim() ?? ""
    const json = JSON.parse(raw.replace(/^```json\n?/, "").replace(/\n?```$/, ""))
    return NextResponse.json(json)
  } catch (error: any) {
    console.error("generate-resume error:", error)
    return NextResponse.json({ error: error.message || "Erreur génération" }, { status: 500 })
  }
}
