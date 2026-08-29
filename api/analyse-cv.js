```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RH Copilot - Analyse intelligente des CV</title>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f4f7fb;
      color: #172033;
    }

    header {
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      padding: 18px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
    }

    .logo span {
      color: #2563eb;
    }

    .badge {
      background: #e8f0ff;
      color: #2563eb;
      padding: 8px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: bold;
    }

    .container {
      max-width: 1100px;
      margin: auto;
      padding: 45px 20px;
    }

    .hero {
      text-align: center;
      margin-bottom: 35px;
    }

    .hero h1 {
      font-size: 40px;
      margin-bottom: 12px;
    }

    .hero p {
      color: #667085;
      font-size: 17px;
    }

    .upload-card {
      background: white;
      border-radius: 18px;
      padding: 35px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.07);
      max-width: 800px;
      margin: auto;
    }

    .upload-area {
      border: 2px dashed #cbd5e1;
      border-radius: 14px;
      padding: 40px 20px;
      text-align: center;
      background: #f8fafc;
    }

    .upload-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }

    input[type="file"] {
      margin-top: 18px;
    }

    .button {
      width: 100%;
      margin-top: 22px;
      padding: 16px;
      border: none;
      border-radius: 10px;
      background: #2563eb;
      color: white;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .button:hover {
      background: #1d4ed8;
    }

    #message {
      margin-top: 18px;
      text-align: center;
      font-weight: bold;
    }

    #result {
      display: none;
      margin-top: 40px;
    }

    .analysis-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .analysis-header h2 {
      margin: 0;
    }

    .analysis-status {
      background: #dcfce7;
      color: #166534;
      padding: 8px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: bold;
    }

    .analysis-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .section {
      background: white;
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    }

    .section.full {
      grid-column: 1 / -1;
    }

    .section h3 {
      margin-top: 0;
      margin-bottom: 18px;
      font-size: 18px;
    }

    .profile-item {
      padding: 12px 0;
      border-bottom: 1px solid #eef0f4;
    }

    .profile-item:last-child {
      border-bottom: none;
    }

    .label {
      font-size: 13px;
      color: #667085;
      margin-bottom: 4px;
    }

    .value {
      font-size: 16px;
      font-weight: bold;
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill {
      background: #e8f0ff;
      color: #1d4ed8;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 14px;
    }

    .summary {
      line-height: 1.7;
      color: #475467;
    }

    .list {
      margin: 0;
      padding-left: 20px;
      line-height: 1.9;
      color: #475467;
    }

    .score-box {
      text-align: center;
      padding: 15px;
    }

    .score-number {
      font-size: 48px;
      font-weight: bold;
      color: #2563eb;
    }

    .score-label {
      color: #667085;
      margin-top: 5px;
    }

    .footer-note {
      text-align: center;
      margin-top: 35px;
      color: #98a2b3;
      font-size: 13px;
    }

    @media (max-width: 700px) {

      header {
        padding: 18px 20px;
      }

      .hero h1 {
        font-size: 30px;
      }

      .analysis-grid {
        grid-template-columns: 1fr;
      }

      .section.full {
        grid-column: auto;
      }

      .analysis-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

    }
  </style>
</head>

<body>

<header>
  <div class="logo">
    RH <span>Copilot</span>
  </div>

  <div class="badge">
    Analyse intelligente des CV
  </div>
</header>

<div class="container">

  <div class="hero">
    <h1>Analyse professionnelle des candidats</h1>
    <p>
      Importez un CV et obtenez une analyse structurée du profil du candidat.
    </p>
  </div>

  <div class="upload-card">

    <div class="upload-area">

      <div class="upload-icon">📄</div>

      <h2>Importer un CV</h2>

      <p>
        Sélectionnez un CV au format PDF.
      </p>

      <input type="file" id="cvFile" accept=".pdf">

    </div>

    <button class="button" onclick="analyserCV()">
      ANALYSER LE CANDIDAT
    </button>

    <div id="message"></div>

  </div>


  <div id="result">

    <div class="analysis-header">

      <h2>Analyse du candidat</h2>

      <div class="analysis-status">
        ✓ Analyse terminée
      </div>

    </div>


    <div class="analysis-grid">


      <!-- PROFIL -->

      <div class="section">

        <h3>👤 Profil professionnel</h3>

        <div class="profile-item">

          <div class="label">Nom du candidat</div>

          <div class="value" id="candidateName">
            Non analysé
          </div>

        </div>


        <div class="profile-item">

          <div class="label">Poste principal</div>

          <div class="value" id="mainPosition">
            Non analysé
          </div>

        </div>


        <div class="profile-item">

          <div class="label">Secteur d'activité</div>

          <div class="value" id="industry">
            Non analysé
          </div>

        </div>


        <div class="profile-item">

          <div class="label">Expérience professionnelle</div>

          <div class="value" id="experience">
            Non analysée
          </div>

        </div>

      </div>


      <!-- SCORE -->

      <div class="section score-box">

        <h3>📊 Évaluation du profil</h3>

        <div class="score-number" id="score">
          --
        </div>

        <div class="score-label">
          Score global du profil
        </div>

      </div>


      <!-- COMPETENCES -->

      <div class="section">

        <h3>🧠 Compétences principales</h3>

        <div class="skills-list" id="skillsList">

          <span class="skill">
            Analyse en attente
          </span>

        </div>

      </div>


      <!-- LANGUES -->

      <div class="section">

        <h3>🌐 Langues</h3>

        <ul class="list" id="languages">

          <li>Analyse en attente</li>

        </ul>

      </div>


      <!-- RESUME -->

      <div class="section full">

        <h3>📝 Résumé professionnel</h3>

        <p class="summary" id="summary">

          L'analyse du parcours professionnel sera affichée ici.

        </p>

      </div>


      <!-- POINTS FORTS -->

      <div class="section">

        <h3>⭐ Points forts</h3>

        <ul class="list" id="strengths">

          <li>Analyse en attente</li>

        </ul>

      </div>


      <!-- POINTS A VERIFIER -->

      <div class="section">

        <h3>⚠️ Points à vérifier</h3>

        <ul class="list" id="checks">

          <li>Analyse en attente</li>

        </ul>

      </div>


    </div>


    <div class="footer-note">

      RH Copilot • Analyse assistée par intelligence artificielle

    </div>

  </div>

</div>


<script>

async function analyserCV() {

  const file = document.getElementById("cvFile").files[0];

  const message = document.getElementById("message");

  const result = document.getElementById("result");


  if (!file) {

    message.innerText =
      "Veuillez sélectionner un CV PDF.";

    return;

  }


  message.innerText =
    "Lecture et préparation du CV...";


  try {

    const arrayBuffer =
      await file.arrayBuffer();


    const pdf =
      await pdfjsLib.getDocument({
        data: arrayBuffer
      }).promise;


    let fullText = "";


    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {

      const page =
        await pdf.getPage(pageNumber);


      const content =
        await page.getTextContent();


      const pageText =
        content.items
          .map(item => item.str)
          .join(" ");


      fullText +=
        pageText + "\n\n";

    }


    analyserInformations(fullText);


    result.style.display =
      "block";


    message.innerText =
      "Analyse terminée.";


  } catch (error) {

    console.error(error);


    message.innerText =
      "Impossible de lire ce PDF.";

  }

}



function analyserInformations(text) {

  const lowerText =
    text.toLowerCase();


  /* NOM - temporaire */

  document.getElementById(
    "candidateName"
  ).innerText =
    "À identifier par IA";


  /* POSTE - temporaire */

  let mainPosition =
    "À identifier par IA";


  const positions = [

    "superviseur hse",

    "responsable hse",

    "responsable qhse",

    "ingénieur hse",

    "technicien hse",

    "responsable rh",

    "chargé rh",

    "responsable maintenance",

    "technicien maintenance",

    "chef de projet",

    "responsable logistique",

    "comptable"

  ];


  for (let position of positions) {

    if (
      lowerText.includes(position)
    ) {

      mainPosition =
        position
          .replace(
            /\b\w/g,
            l => l.toUpperCase()
          );

      break;

    }

  }


  document.getElementById(
    "mainPosition"
  ).innerText =
    mainPosition;


  /* SECTEUR */

  let industry =
    "À identifier par IA";


  if (
    lowerText.includes("hse") ||
    lowerText.includes("sécurité") ||
    lowerText.includes("securite")
  ) {

    industry =
      "Santé, Sécurité et Environnement";

  }


  document.getElementById(
    "industry"
  ).innerText =
    industry;


  /* EXPERIENCE */

  document.getElementById(
    "experience"
  ).innerText =
    "À analyser par IA";


  /* COMPETENCES */

  const skillsDatabase = [

    "gestion des risques",

    "analyse des risques",

    "audit",

    "sécurité",

    "securite",

    "hse",

    "qhse",

    "iso 45001",

    "iso 14001",

    "formation",

    "management",

    "gestion d'équipe",

    "excel",

    "maintenance",

    "gmao"

  ];


  let detectedSkills = [];


  skillsDatabase.forEach(skill => {

    if (
      lowerText.includes(skill)
    ) {

      detectedSkills.push(skill);

    }

  });


  const skillsList =
    document.getElementById(
      "skillsList"
    );


  skillsList.innerHTML = "";


  if (
    detectedSkills.length === 0
  ) {

    skillsList.innerHTML =
      "<span class='skill'>À analyser par IA</span>";

  } else {

    detectedSkills.forEach(skill => {

      const span =
        document.createElement(
          "span"
        );


      span.className =
        "skill";


      span.innerText =
        skill
          .replace(
            /\b\w/g,
            l => l.toUpperCase()
          );


      skillsList.appendChild(
        span
      );

    });

  }


  /* LANGUES */

  let languages = [];


  if (
    lowerText.includes("français") ||
    lowerText.includes("francais")
  ) {

    languages.push(
      "Français"
    );

  }


  if (
    lowerText.includes("anglais")
  ) {

    languages.push(
      "Anglais"
    );

  }


  if (
    lowerText.includes("arabe")
  ) {

    languages.push(
      "Arabe"
    );

  }


  const languagesList =
    document.getElementById(
      "languages"
    );


  languagesList.innerHTML = "";


  if (
    languages.length === 0
  ) {

    languagesList.innerHTML =
      "<li>À identifier par IA</li>";

  } else {

    languages.forEach(language => {

      const li =
        document.createElement(
          "li"
        );


      li.innerText =
        language;


      languagesList.appendChild(
        li
      );

    });

  }


  /* RESUME */

  document.getElementById(
    "summary"
  ).innerText =
    "Le résumé professionnel détaillé sera généré automatiquement par l'intelligence artificielle après analyse complète du parcours du candidat.";


  /* POINTS FORTS */

  document.getElementById(
    "strengths"
  ).innerHTML =
    "<li>Compétences à analyser par IA</li>" +
    "<li>Expérience professionnelle à analyser</li>" +
    "<li>Responsabilités à identifier</li>";


  /* POINTS A VERIFIER */

  document.getElementById(
    "checks"
  ).innerHTML =
    "<li>Disponibilité du candidat</li>" +
    "<li>Mobilité géographique</li>" +
    "<li>Prétentions salariales</li>";


  /* SCORE */

  let score = 50;


  if (
    detectedSkills.length > 0
  ) {

    score +=
      detectedSkills.length * 3;

  }


  if (
    languages.length > 0
  ) {

    score += 10;

  }


  if (
    score > 100
  ) {

    score = 100;

  }


  document.getElementById(
    "score"
  ).innerText =
    score + "/100";

}

</script>

</body>
</html>
```
