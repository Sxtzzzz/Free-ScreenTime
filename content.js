// Fonction pour envoyer l'URL à ntfy
function sendToNtfy(url) {
    const ntfyUrl = "https://ntfy.sh/raph_dbcrea";  // Remplace "ton-canal" par le nom de ton canal ntfy
  
    fetch(ntfyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: `URL visitée : ${url}` }), // Message à envoyer
    })
      .then(response => response.json())
      .then(data => console.log("URL envoyée à ntfy :", data))
      .catch(error => console.error("Erreur lors de l'envoi à ntfy:", error));
  }
  
  // Écouter l'événement de changement d'URL sur la page
  window.addEventListener("load", () => {
    const currentUrl = window.location.href;  // Récupère l'URL de la page visitée
    sendToNtfy(currentUrl);  // Envoie l'URL à ntfy
  });
  