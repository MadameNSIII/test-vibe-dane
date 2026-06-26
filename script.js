// =============================================
// FONCTIONS POUR L'INTERFACE
// =============================================

// Variables globales pour les graphiques
let domainesChart, typeEpreuveChart, specialiteChart;
let tendancesThemesChart, tendancesCompetencesChart;

// Fonction pour basculer entre les onglets
function openTab(tabName) {
  // Masquer tous les onglets
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.style.display = 'none';
  });

  // Retirer la classe 'active' de tous les boutons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });

  // Afficher l'onglet sélectionné
  document.getElementById(tabName).style.display = 'block';

  // Ajouter la classe 'active' au bouton cliqué
  event.currentTarget.classList.add('active');

  // Mettre à jour les graphiques et tableaux
  if (tabName === 'statistiques') {
    updateStatistiques();
  } else if (tabName === 'recherche') {
    updateRecherche();
  } else if (tabName === 'tendances') {
    updateTendances();
  }
}

// =============================================
// FONCTIONS POUR L'ONGLET STATISTIQUES
// =============================================

// Mettre à jour les statistiques
function updateStatistiques() {
  const specialite = document.getElementById('specialite-stats').value;
  const typeEpreuve = document.getElementById('type-epreuve-stats').value;
  const session = document.getElementById('session-stats').value;

  const filteredSujets = filterSujets(specialite, typeEpreuve, session, 'tous', 'toutes');

  createDomainesChart(filteredSujets);
  createTypeEpreuveChart(filteredSujets);
  createSpecialiteChart(filteredSujets);
}

// Créer le graphique des domaines
function createDomainesChart(sujets) {
  const ctx = document.getElementById('domainesChart').getContext('2d');

  // Compter la fréquence des domaines
  const domaineCounts = {};
  sujets.forEach(sujet => {
    sujet.domaines.forEach(domaine => {
      domaineCounts[domaine] = (domaineCounts[domaine] || 0) + 1;
    });
  });

  // Trier par ordre décroissant
  const sortedDomaines = Object.entries(domaineCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5

  const labels = sortedDomaines.map(item => item[0]);
  const data = sortedDomaines.map(item => item[1]);

  // Couleurs pour le graphique
  const backgroundColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)'
  ];

  if (domainesChart) {
    domainesChart.destroy();
  }

  domainesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Fréquence des Domaines',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Top 5 des Domaines les Plus Fréquents'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Créer le graphique de répartition par type d'épreuve
function createTypeEpreuveChart(sujets) {
  const ctx = document.getElementById('typeEpreuveChart').getContext('2d');

  // Compter par type d'épreuve
  const typeCounts = {};
  sujets.forEach(sujet => {
    typeCounts[sujet.type_epreuve] = (typeCounts[sujet.type_epreuve] || 0) + 1;
  });

  const labels = Object.keys(typeCounts);
  const data = Object.values(typeCounts);

  if (typeEpreuveChart) {
    typeEpreuveChart.destroy();
  }

  typeEpreuveChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Répartition par Type d\'Épreuve',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Répartition Écrit vs Pratique'
        }
      }
    }
  });
}

// Créer le graphique de répartition par spécialité
function createSpecialiteChart(sujets) {
  const ctx = document.getElementById('specialiteChart').getContext('2d');

  // Compter par spécialité
  const specialiteCounts = {};
  sujets.forEach(sujet => {
    specialiteCounts[sujet.specialite] = (specialiteCounts[sujet.specialite] || 0) + 1;
  });

  const labels = Object.keys(specialiteCounts);
  const data = Object.values(specialiteCounts);

  if (specialiteChart) {
    specialiteChart.destroy();
  }

  specialiteChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Répartition par Spécialité',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Répartition SI vs NSI'
        }
      }
    }
  });
}

// =============================================
// FONCTIONS POUR L'ONGLET RECHERCHE
// =============================================

// Mettre à jour la recherche
function updateRecherche() {
  const specialite = document.getElementById('specialite-recherche').value;
  const typeEpreuve = document.getElementById('type-epreuve-recherche').value;
  const session = document.getElementById('session-recherche').value;
  const domaine = document.getElementById('domaine-recherche').value;
  const competence = document.getElementById('competence-recherche').value;

  const filteredSujets = filterSujets(specialite, typeEpreuve, session, domaine, competence);
  updateTable(filteredSujets);
}

// Filtrer les sujets selon les critères
function filterSujets(specialite, typeEpreuve, session, domaine, competence) {
  return sujets.filter(sujet => {
    return (
      (specialite === "toutes" || sujet.specialite === specialite) &&
      (typeEpreuve === "tous" || sujet.type_epreuve === typeEpreuve) &&
      (session === "toutes" || sujet.session === session) &&
      (domaine === "tous" || sujet.domaines.includes(domaine)) &&
      (competence === "toutes" || sujet.competences.includes(competence))
    );
  });
}

// Mettre à jour le tableau des sujets
function updateTable(sujets) {
  const tableBody = document.getElementById('sujetsTableBody');
  tableBody.innerHTML = '';

  if (sujets.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="9" style="text-align: center;">Aucun sujet trouvé.</td>';
    tableBody.appendChild(row);
    return;
  }

  sujets.forEach(sujet => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sujet.titre}</td>
      <td>${sujet.specialite}</td>
      <td>${sujet.type_epreuve}</td>
      <td>${sujet.session}</td>
      <td>${sujet.centre_examen}</td>
      <td>${sujet.domaines.join(', ')}</td>
      <td>${sujet.competences.join(', ')}</td>
      <td>${sujet.mots_cles.join(', ')}</td>
      <td><a href="${sujet.lien_pdf}" target="_blank" class="pdf-link">📄 PDF</a></td>
    `;
    tableBody.appendChild(row);
  });
}

// =============================================
// FONCTIONS POUR L'ONGLET TENDANCES
// =============================================

// Mettre à jour les tendances
function updateTendances() {
  const specialite = document.getElementById('specialite-tendances').value;
  const motCle = document.getElementById('mot-cle-tendances').value;

  createTendancesThemesChart(specialite, motCle);
  createTendancesCompetencesChart(specialite);
}

// Créer le graphique des tendances des thèmes
function createTendancesThemesChart(specialite, motCle) {
  const ctx = document.getElementById('tendancesThemesChart').getContext('2d');

  // Filtrer les sujets par spécialité
  const filteredSujets = sujets.filter(sujet => {
    return specialite === "toutes" || sujet.specialite === specialite;
  });

  // Compter les occurrences du mot-clé par année
  const annees = [...new Set(filteredSujets.map(sujet => sujet.session))].sort();
  const counts = annees.map(annee => {
    const sujetsAnnee = filteredSujets.filter(sujet => sujet.session === annee);
    return sujetsAnnee.filter(sujet => {
      return motCle === "tous" || sujet.mots_cles.includes(motCle);
    }).length;
  });

  if (tendancesThemesChart) {
    tendancesThemesChart.destroy();
  }

  tendancesThemesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: annees,
      datasets: [{
        label: motCle === "tous" ? 'Nombre de sujets' : `Sujets avec "${motCle}"`,
        data: counts,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Évolution des Thèmes (${motCle === "tous" ? "Tous" : motCle})`
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Créer le graphique des tendances des compétences
function createTendancesCompetencesChart(specialite) {
  const ctx = document.getElementById('tendancesCompetencesChart').getContext('2d');

  // Filtrer les sujets par spécialité
  const filteredSujets = sujets.filter(sujet => {
    return specialite === "toutes" || sujet.specialite === specialite;
  });

  // Compter les compétences par année
  const annees = [...new Set(filteredSujets.map(sujet => sujet.session))].sort();
  const competencesList = [...new Set(sujets.flatMap(sujet => sujet.competences))];

  const datasets = competencesList.map(competence => {
    return {
      label: competence,
      data: annees.map(annee => {
        const sujetsAnnee = filteredSujets.filter(sujet => sujet.session === annee);
        return sujetsAnnee.filter(sujet => sujet.competences.includes(competence)).length;
      }),
      borderColor: getRandomColor(),
      backgroundColor: getRandomColor(0.2),
      tension: 0.4
    };
  });

  if (tendancesCompetencesChart) {
    tendancesCompetencesChart.destroy();
  }

  tendancesCompetencesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: annees,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Évolution des Compétences Évaluées'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Générer une couleur aléatoire
function getRandomColor(alpha = 1) {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// =============================================
// FONCTIONS D'EXPORT
// =============================================

// Exporter en CSV
function exportToCSV() {
  const specialite = document.getElementById('specialite-stats').value;
  const typeEpreuve = document.getElementById('type-epreuve-stats').value;
  const session = document.getElementById('session-stats').value;

  const filteredSujets = filterSujets(specialite, typeEpreuve, session, 'tous', 'toutes');

  if (filteredSujets.length === 0) {
    alert("Aucune donnée à exporter.");
    return;
  }

  // Créer le contenu CSV
  let csv = "Titre,Spécialité,Type d'épreuve,Année,Centre,Domaines,Compétences,Mots-clés,Lien PDF\n";
  filteredSujets.forEach(sujet => {
    csv += `"${sujet.titre}","${sujet.specialite}","${sujet.type_epreuve}","${sujet.session}","${sujet.centre_examen}","${sujet.domaines.join(';')}","${sujet.competences.join(';')}","${sujet.mots_cles.join(';')}","${sujet.lien_pdf}"\n`;
  });

  // Créer un lien de téléchargement
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'statistiques_si_nsi.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Exporter en PDF (simplifié)
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Titre
  doc.setFontSize(20);
  doc.text("Statistiques SI/NSI", 105, 20, { align: 'center' });

  // Sous-titre
  doc.setFontSize(14);
  doc.text("Fréquence des Domaines", 105, 30, { align: 'center' });

  // Récupérer les données du graphique des domaines
  const specialite = document.getElementById('specialite-stats').value;
  const typeEpreuve = document.getElementById('type-epreuve-stats').value;
  const session = document.getElementById('session-stats').value;
  const filteredSujets = filterSujets(specialite, typeEpreuve, session, 'tous', 'toutes');

  const domaineCounts = {};
  filteredSujets.forEach(sujet => {
    sujet.domaines.forEach(domaine => {
      domaineCounts[domaine] = (domaineCounts[domaine] || 0) + 1;
    });
  });

  const sortedDomaines = Object.entries(domaineCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Ajouter les données au PDF
  let y = 40;
  sortedDomaines.forEach(([domaine, count]) => {
    doc.text(`${domaine}: ${count} sujets`, 20, y);
    y += 10;
  });

  // Sauvegarder le PDF
  doc.save('statistiques_si_nsi.pdf');
}

// =============================================
// INITIALISATION
// =============================================

// Initialiser l'interface au chargement
document.addEventListener('DOMContentLoaded', () => {
  // Remplir les filtres avec les données disponibles
  fillFilters();

  // Mettre à jour les onglets par défaut
  updateStatistiques();
  updateRecherche();
  updateTendances();

  // Ajouter des écouteurs d'événements aux filtres
  document.getElementById('specialite-stats').addEventListener('change', updateStatistiques);
  document.getElementById('type-epreuve-stats').addEventListener('change', updateStatistiques);
  document.getElementById('session-stats').addEventListener('change', updateStatistiques);

  document.getElementById('specialite-recherche').addEventListener('change', updateRecherche);
  document.getElementById('type-epreuve-recherche').addEventListener('change', updateRecherche);
  document.getElementById('session-recherche').addEventListener('change', updateRecherche);
  document.getElementById('domaine-recherche').addEventListener('change', updateRecherche);
  document.getElementById('competence-recherche').addEventListener('change', updateRecherche);

  document.getElementById('specialite-tendances').addEventListener('change', updateTendances);
  document.getElementById('mot-cle-tendances').addEventListener('change', updateTendances);
});

// Remplir les filtres avec les données disponibles
function fillFilters() {
  // Remplir les filtres de domaine
  const domaineRecherche = document.getElementById('domaine-recherche');
  domaines.forEach(domaine => {
    const option = document.createElement('option');
    option.value = domaine;
    option.textContent = domaine;
    domaineRecherche.appendChild(option);
  });

  // Remplir les filtres de compétence
  const competenceRecherche = document.getElementById('competence-recherche');
  competences.forEach(competence => {
    const option = document.createElement('option');
    option.value = competence;
    option.textContent = competence;
    competenceRecherche.appendChild(option);
  });
}
