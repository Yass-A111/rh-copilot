module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Méthode non autorisée"
    });
  }

  try {

    const { text } = req.body || {};

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        error: "Le texte du CV est vide"
      });
    }

    return res.status(200).json({

      success: true,

      message: "Le serveur RH Copilot a bien reçu le CV.",

      receivedCharacters: text.length,

      analysis: {
        candidateName: "Analyse IA bientôt disponible",
        mainPosition: "À analyser",
        industry: "À analyser",
        experience: "À analyser",
        skills: [],
        languages: [],
        summary: "La connexion entre RH Copilot et le serveur fonctionne correctement.",
        strengths: [],
        checks: []
      }

    });

  } catch (error) {

    console.error("Erreur API :", error);

    return res.status(500).json({
      error: "Erreur interne lors de l'analyse du CV"
    });

  }

};
