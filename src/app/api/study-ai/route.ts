import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Clé API GROQ_API_KEY introuvable sur le serveur" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });
    let systemPrompt = "";

    switch (type) {
      case "explain":
        systemPrompt = "Tu es un expert pédagogique spécialisé dans l'explication de cours médicaux et scientifiques. Ta mission est d'analyser le contenu que je t'envoie et d'expliquer CHAQUE information point par point de manière claire, complète et pédagogique. RÈGLES OBLIGATOIRES : 1. Tu dois reprendre CHAQUE idée ou phrase importante du texte. 2. Tu expliques point par point, sans regrouper les informations. 3. Chaque point doit être expliqué en profondeur. 4. Tu dois rendre les concepts faciles à comprendre mais sans simplifier excessivement. 5. Tu dois toujours expliquer le POURQUOI et le COMMENT des phénomènes. 6. Si un terme technique apparaît, tu dois le définir. STRUCTURE OBLIGATOIRE POUR CHAQUE POINT : 1️⃣ Information du cours → Reformule brièvement. 2️⃣ Contexte / Mise en situation → Explique le contexte biologique ou médical. 3️⃣ Physiopathologie / mécanisme → Explique les mécanismes étape par étape. 4️⃣ Pourquoi / Comment → Explique la logique scientifique. 5️⃣ À retenir simplement → Résume en 1-2 phrases. Traite chaque point séparément sans sauter d'étapes. Voici le contenu à analyser :";
        break;
      case "table":
        systemPrompt = "Tu es un expert pédagogique. À partir du texte sélectionné, génère un tableau comparatif clair et structuré en markdown. Identifie les éléments à comparer, crée les colonnes pertinentes, et remplis le tableau avec les informations du cours. Le tableau doit être immédiatement copiable dans Notion. Voici le contenu :";
        break;
      case "define":
        systemPrompt = "Tu es un expert en médecine et sciences. Pour le mot ou concept sélectionné, donne : 1) La définition claire et précise en 2-3 phrases maximum. 2) L'étymologie du mot (origine latine ou grecque si applicable). 3) Un exemple concret d'utilisation clinique en 1 phrase. Sois concis et direct. Voici le mot :";
        break;
      case "anki":
        systemPrompt = `Je vais te donner un cours et tu vas le transformer en questions types ANKI. Voici les règles que tu dois suivre à la lettre :

FORMAT DE SORTIE :
- Questions en liste à puces, une par ligne
- Organisées en sous-parties thématiques avec leurs titres en gras
- Pas de tirets ou lignes de séparation entre les parties
- Format compatible copier-coller Notion (listes à puces préservées)
- Ne mets rien en gras sauf les titres de sous-parties

RÈGLES DE FORMULATION :
- Sois le plus bref possible (tant que c'est compréhensible)
- Majuscule uniquement en début de phrase
- Pas de point final sauf "?" pour les vraies questions
- "?" systématique pour toute question commençant par Quel, Quelle, Quels, Où, Pourquoi, Quand, etc.
- Ne donne JAMAIS la réponse dans la question
- Reste général : demande des listes, définitions, mécanismes — pas de détails dans la question

FORMULATIONS À UTILISER :
- "Complications de X (liste)" et NON "Liste des complications de X"
- "Facteurs de risque de X (liste)" et NON "Liste des facteurs de risque de X"
- Pour les affirmations simples → reformule en question fermée : "Maladie X = mono ou polygénique ?"
- Si le texte contient déjà une question entre astérisques → copie-la exactement

REGROUPEMENT OBLIGATOIRE :
- Si plusieurs questions identiques avec variantes → regroupe en sous-bullets :
  Volume d'un verre-standard de bière à :
    - 4°
    - 8°
- Si plusieurs définitions similaires → regroupe :
  Définition :
    - Akinésie
    - Hypomimie
- Symptômes d'une intoxication alcoolique :
    - Non compliquée
    - Compliquée

NE PAS FAIRE :
- Quel est le principal signe... → faire : Principal signe de...
- Liste des complications → faire : Complications de X (liste)
- Questions trop détaillées qui donnent la réponse

Voici le cours surligné :`;
        break;
      default:
        return NextResponse.json({ error: "Type invalide" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: `${systemPrompt}\n\n${text}` }
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ content });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: error.message || "Erreur lors de la génération AI" }, { status: 500 });
  }
}
