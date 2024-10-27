document.getElementById('getDefinition').addEventListener('click', async () => {
    const term = document.getElementById('termInput').value;

    if (term) {
        try {
            const response = await fetch("http://127.0.0.1:5000/define_term", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ term: term })
            });

            const data = await response.json();
            if (data.definition) {
                document.getElementById('definitionDisplay').innerText = data.definition;
            } else {
                document.getElementById('definitionDisplay').innerText = data.error || "Definition not found.";
            }
        } catch (error) {
            console.error("Error fetching definition:", error);
            document.getElementById('definitionDisplay').innerText = "Error loading definition.";
        }
    } else {
        document.getElementById('definitionDisplay').innerText = "Please enter a term.";
    }
});

