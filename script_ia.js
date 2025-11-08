const btn = document.getElementById('summarizeBtn');
const input = document.getElementById('inputText');
const resultDiv = document.getElementById('result');

btn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) {
        alert('Veuillez entrer un texte à résumer.');
        return;
    }

    resultDiv.innerHTML = "Résumé en cours... ⏳";

    try {
        const response = await fetch('/api/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        if(data.error) {
            resultDiv.innerHTML = "Erreur : " + data.error;
        } else {
            resultDiv.innerHTML = data.summary;
        }
    } catch (err) {
        resultDiv.innerHTML = "Erreur réseau ou serveur.";
        console.error(err);
    }
});
