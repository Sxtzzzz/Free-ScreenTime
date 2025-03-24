let timeSpent = {};  // Pour suivre le temps passé sur chaque site
const timeLimit = 60 * 30; // Limite de temps (en secondes) pour chaque site (ex : 30 minutes)

chrome.tabs.onActivated.addListener(() => {
  // Vérifier le temps passé lorsque l'utilisateur passe d'un onglet à l'autre
  updateTimeSpent();
});

chrome.tabs.onUpdated.addListener(() => {
  // Vérifier quand un site change ou se charge
  updateTimeSpent();
});

// Mettre à jour le temps passé sur un site
function updateTimeSpent() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    const hostname = url.hostname;

    if (!timeSpent[hostname]) {
      timeSpent[hostname] = 0;
    }

    timeSpent[hostname]++;

    // Si le temps limite est atteint, afficher une notification
    if (timeSpent[hostname] >= timeLimit) {
      chrome.notifications.create('', {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Alerte de temps d\'écran',
        message: `Tu as atteint la limite de temps sur ${hostname}!`
      });
      
      // Optionnel: Bloquer l'accès ou rediriger
      chrome.tabs.update(tabs[0].id, { url: 'about:blank' });
    }
  });
}
