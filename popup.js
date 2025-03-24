document.getElementById('reset-time').addEventListener('click', () => {
    chrome.storage.local.set({ timeSpent: {} }, () => {
      alert('Le temps a été réinitialisé.');
    });
  });
  
  // Charger et afficher la limite de temps (30 minutes par défaut)
  chrome.storage.local.get('timeLimit', (data) => {
    document.getElementById('time-limit').textContent = data.timeLimit || 30;
  });
  