import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // clé stockée dans Vercel
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Aucun texte fourni' });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Vous êtes un assistant qui résume des textes clairement et de façon concise." },
                { role: "user", content: `Résume ce texte : ${text}` }
            ],
            max_tokens: 300
        });

        const summary = completion.choices[0].message.content;
        res.status(200).json({ summary });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la communication avec OpenAI' });
    }
}
