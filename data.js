// =============================================
// DONNÉES SIMULÉES POUR LE PROTOTYPE
// =============================================

// Liste des sujets d'examen
const sujets = [
  // NSI 2023
  {
    id: 1,
    titre: "Sujet NSI - Métropole 2023",
    specialite: "NSI",
    type_epreuve: "écrit",
    session: "2023",
    centre_examen: "Métropole",
    duree: 180,
    lien_pdf: "https://eduscol.education.fr/document/40764/download",
    domaines: ["Algorithmique", "Programmation", "Bases de données"],
    competences: ["Analyser", "Programmer", "Valider"],
    mots_cles: ["Récursivité", "Python", "SQL"],
    niveau_difficulte: "Moyen"
  },
  {
    id: 2,
    titre: "Sujet NSI - Polynésie 2023",
    specialite: "NSI",
    type_epreuve: "écrit",
    session: "2023",
    centre_examen: "Polynésie",
    duree: 180,
    lien_pdf: "https://eduscol.education.fr/document/40765/download",
    domaines: ["Algorithmique", "Réseaux"],
    competences: ["Analyser", "Concevoir"],
    mots_cles: ["Graphes", "Protocoles", "TCP/IP"],
    niveau_difficulte: "Difficile"
  },
  {
    id: 3,
    titre: "Sujet NSI - Épreuve Pratique 2023",
    specialite: "NSI",
    type_epreuve: "pratique",
    session: "2023",
    centre_examen: "Métropole",
    duree: 120,
    lien_pdf: "https://eduscol.education.fr/document/40766/download",
    domaines: ["Programmation", "Algorithmique"],
    competences: ["Programmer", "Tester"],
    mots_cles: ["Python", "Listes", "Algorithmes gloutons"],
    niveau_difficulte: "Moyen"
  },

  // NSI 2022
  {
    id: 4,
    titre: "Sujet NSI - Métropole 2022",
    specialite: "NSI",
    type_epreuve: "écrit",
    session: "2022",
    centre_examen: "Métropole",
    duree: 180,
    lien_pdf: "https://eduscol.education.fr/document/38456/download",
    domaines: ["Algorithmique", "Architecture des machines"],
    competences: ["Analyser", "Programmer"],
    mots_cles: ["Binaire", "Assembleur", "Python"],
    niveau_difficulte: "Facile"
  },
  {
    id: 5,
    titre: "Sujet NSI - Centres Étrangers 2022",
    specialite: "NSI",
    type_epreuve: "écrit",
    session: "2022",
    centre_examen: "Étranger",
    duree: 180,
    lien_pdf: "https://eduscol.education.fr/document/38457/download",
    domaines: ["Bases de données", "Réseaux"],
    competences: ["Concevoir", "Valider"],
    mots_cles: ["SQL", "HTTP", "API"],
    niveau_difficulte: "Difficile"
  },

  // SI 2023
  {
    id: 6,
    titre: "Sujet SI - Métropole 2023",
    specialite: "SI",
    type_epreuve: "écrit",
    session: "2023",
    centre_examen: "Métropole",
    duree: 240,
    lien_pdf: "https://eduscol.education.fr/document/40767/download",
    domaines: ["Systèmes techniques", "Automatique"],
    competences: ["Analyser", "Concevoir", "Tester"],
    mots_cles: ["Robotique", "Capteurs", "Arduino"],
    niveau_difficulte: "Moyen"
  },
  {
    id: 7,
    titre: "Sujet SI - Épreuve Pratique 2023",
    specialite: "SI",
    type_epreuve: "pratique",
    session: "2023",
    centre_examen: "Métropole",
    duree: 180,
    lien_pdf: "https://eduscol.education.fr/document/40768/download",
    domaines: ["Systèmes techniques", "Électronique"],
    competences: ["Concevoir", "Programmer"],
    mots_cles: ["Microcontrôleurs", "C++", "Sensors"],
    niveau_difficulte: "Difficile"
  },

  // SI 2022
  {
    id: 8,
    titre: "Sujet SI - Métropole 2022",
    specialite: "SI",
    type_epreuve: "écrit",
    session: "2022",
    centre_examen: "Métropole",
    duree: 240,
    lien_pdf: "https://eduscol.education.fr/document/38458/download",
    domaines: ["Systèmes techniques", "Énergie"],
    competences: ["Analyser", "Concevoir"],
    mots_cles: ["Énergies renouvelables", "Modélisation"],
    niveau_difficulte: "Facile"
  },

  // NSI 2021
  {
    id: 9,
    titre: "Sujet NSI - Métropole 2021",
    specialite: "NSI",
    type_epreuve: "écrit",
    session: "2021",
    centre_examen: "Métropole",
    duree: 180,
    lien_pdf: "https://eduscol.education.fr/document/29456/download",
    domaines: ["Algorithmique", "Programmation"],
    competences: ["Analyser", "Programmer"],
    mots_cles: ["Python", "Récursivité", "Tris"],
    niveau_difficulte: "Moyen"
  },

  // NSI 2020
  {
    id: 10,
    titre: "Sujet NSI - Métropole 2020",
    specialite: "NSI",
    type_epreuve: "écrit",
    session: "2020",
    centre_examen: "Métropole",
    duree: 180,
    lien_pdf: "https://eduscol.education.fr/document/25678/download",
    domaines: ["Algorithmique", "Bases de données"],
    competences: ["Analyser", "Concevoir"],
    mots_cles: ["SQL", "Python", "Modélisation"],
    niveau_difficulte: "Moyen"
  },

  // SI 2021
  {
    id: 11,
    titre: "Sujet SI - Métropole 2021",
    specialite: "SI",
    type_epreuve: "écrit",
    session: "2021",
    centre_examen: "Métropole",
    duree: 240,
    lien_pdf: "https://eduscol.education.fr/document/29457/download",
    domaines: ["Systèmes techniques", "Mécanique"],
    competences: ["Analyser", "Concevoir"],
    mots_cles: ["Mécanismes", "Simulation", "3D"],
    niveau_difficulte: "Difficile"
  },

  // Ajout de sujets avec le mot-clé "IA" pour les tendances
  {
    id: 12,
    titre: "Sujet NSI - IA et Machine Learning 2024",
    specialite: "NSI",
    type_epreuve: "écrit",
    session: "2024",
    centre_examen: "Métropole",
    duree: 180,
    lien_pdf: "https://eduscol.education.fr/document/45678/download",
    domaines: ["IA", "Algorithmique"],
    competences: ["Analyser", "Programmer"],
    mots_cles: ["IA", "Machine Learning", "Python"],
    niveau_difficulte: "Difficile"
  },
  {
    id: 13,
    titre: "Sujet NSI - Deep Learning 2024",
    specialite: "NSI",
    type_epreuve: "pratique",
    session: "2024",
    centre_examen: "Métropole",
    duree: 120,
    lien_pdf: "https://eduscol.education.fr/document/45679/download",
    domaines: ["IA", "Programmation"],
    competences: ["Programmer", "Tester"],
    mots_cles: ["IA", "Réseaux de neurones", "TensorFlow"],
    niveau_difficulte: "Difficile"
  }
];

// Liste des domaines possibles
const domaines = [
  "Algorithmique",
  "Programmation",
  "Systèmes techniques",
  "Réseaux",
  "Bases de données",
  "IA",
  "Architecture des machines",
  "Automatique",
  "Électronique",
  "Énergie",
  "Mécanique"
];

// Liste des compétences possibles
const competences = [
  "Analyser",
  "Concevoir",
  "Programmer",
  "Tester",
  "Valider"
];

// Liste des centres d'examen
const centresExamens = [
  "Métropole",
  "Polynésie",
  "DOM-TOM",
  "Étranger"
];

// Liste des sessions
const sessions = ["2020", "2021", "2022", "2023", "2024"];
