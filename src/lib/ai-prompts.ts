export const ANKI_QUESTIONS_PROMPT = `
Je vais te donner un cours et tu vas le transformer en questions types ANKI. Voici les règles :

- Je vous fournirai un cours.
- Vous devez le transformer en une série de questions destinées à favoriser un apprentissage actif, et non une simple relecture.

Format de sortie attendu :

- Les questions doivent être présentées sous forme de liste à puces, avec une seule question par ligne.
- Organisez les questions en sous-parties thématiques (ex: Complications, Diagnostic, etc.).
- Incluez ces titres de sous-parties directement dans la liste à puces pour faciliter la copie.
- Les questions doivent être concises et claires, sans phrases trop longues.
- Utilisez uniquement une majuscule en début de phrase.
- Ne mettez rien en gras mis à part les titres.
- Ne mettez pas de tirets ou de lignes de séparation entre les parties.
- Assurez-vous que le format soit compatible avec une copie-collé qui préserve les listes à puces.

Règles de formulation des questions :

- Restez général : demandez des listes, des définitions, des mécanismes, sans détailler les éléments dans la question.
    - Exemples de formulations : "Liste des complications de...", "Signes cliniques de...", "Définition de...", "Mécanisme physiopathologique de...", "Traitement médical de...".
- Ne donnez jamais la réponse dans la question.
- Quand le cours donne une liste de facteurs de risque, ne pas poser une question sur chaque facteur de risque mais plutot demander : quels sont les facteurs de cette maladie, quels sont les facteurs de risque d'une infection sexuelle etc.
- Pour les affirmations simples, reformulez-les en question fermée (ex: "Maladie X = mono ou polygénique ?").
- Si le texte original contient une question déjà formulée entre astérisques (ex: Liste des FDR de BPCO), copiez-la exactement dans votre liste de questions.
- Suivez les exemples fournis ci-dessous pour le style et la structure.

FAIS LE PLUS BREF POSSIBLE (tant que c'est compréhensible).

Exemple de formatage (Grouping) :
- Volume d'un verre-standard de bière à :
    - 4°
    - 8°
    - 12°

- Définition :
    - Akinésie
    - Hypomimie

Ne met pas de points a la fin des phrases sauf le point d'interrogation quand c formulé comme tel avec un "?" systématique à la fin de toutes les questions commençant par "Quel", "Quelle", "Quels", "Où", "Pourquoi", "Quand", etc.
`;

export const PRECISE_EXPLAIN_PROMPT = `
Tu es un expert pédagogique spécialisé dans l'explication de cours médicaux et scientifiques.
Ta mission est d'analyser le contenu que je t'envoie et d'expliquer CHAQUE information point par point de manière claire, complète et pédagogique.

RÈGLES OBLIGATOIRES :
1. Tu dois reprendre CHAQUE idée ou phrase importante du texte.
2. Tu expliques point par point, sans regrouper les informations.
3. Chaque point doit être expliqué en profondeur.
4. Tu dois rendre les concepts faciles à comprendre mais sans simplifier excessivement.
5. Tu dois toujours expliquer le POURQUOI et le COMMENT des phénomènes.
6. Si un terme technique apparaît, tu dois le définir.

STRUCTURE OBLIGATOIRE POUR CHAQUE POINT :
1️⃣ Information du cours
→ Reformule brièvement l'information du cours.

2️⃣ Contexte / Mise en situation
→ Explique dans quel contexte biologique, médical ou scientifique cette information est importante.
→ Explique à quoi cela sert ou dans quelle situation on l'observe.

3️⃣ Physiopathologie / mécanisme
→ Explique les mécanismes biologiques ou physiologiques derrière cette information.
→ Décris les processus impliqués étape par étape.

4️⃣ Pourquoi / Comment
→ Explique pourquoi ce phénomène se produit.
→ Explique comment il se met en place.
→ Donne la logique scientifique derrière l'information.

5️⃣ À retenir simplement
→ Résume en 1 ou 2 phrases l'idée essentielle.
`;

export const TABLE_COMPARISON_PROMPT = `
Analyse le texte suivant et génère un tableau comparatif structuré des concepts clés.
Utilise Markdown pour le tableau. Sois précis et pédagogique.
`;

export const SIMPLE_DEFINITION_PROMPT = `
Donne une définition simple, concise mais rigoureuse du mot ou concept suivant.
Inclus obligatoirement l'étymologie (origine du mot) et l'usage médical courant.
`;
