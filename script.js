document.addEventListener("DOMContentLoaded", () => {
    // Initial data for Pokémon (these will be updated dynamically)
    let pokemon1 = {};
    let pokemon2 = {};

    // Fetch initial Pokémon data from the server
    function fetchInitialData() {
        fetch("/")
            .then((response) => response.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                // Extract initial Pokémon data from the server-rendered HTML
                pokemon1 = {
                    name: doc.querySelector("#pokemon1-container h2").innerText,
                    hp: doc.querySelector("#pokemon1-hp").innerText,
                    image: doc.querySelector("#pokemon1-image").src,
                };
                pokemon2 = {
                    name: doc.querySelector("#pokemon2-container h2").innerText,
                    hp: doc.querySelector("#pokemon2-hp").innerText,
                    image: doc.querySelector("#pokemon2-image").src,
                };

                // Update the client-side DOM
                updateDOM();
            });
    }

    // Update DOM with current Pokémon data
    function updateDOM() {
        document.getElementById("pokemon1-name").innerText = pokemon1.name;
        document.getElementById("pokemon1-hp").innerText = pokemon1.hp;
        document.getElementById("pokemon1-image").src = pokemon1.image;

        document.getElementById("pokemon2-name").innerText = pokemon2.name;
        document.getElementById("pokemon2-hp").innerText = pokemon2.hp;
        document.getElementById("pokemon2-image").src = pokemon2.image;
    }

    // Perform an action (attack, heal, nerf, boost)
    function performAction(actionType, target) {
        fetch("https://ton-api-flask.onrender.com/action", { ... });
,
        })
            .then((response) => response.json())
            .then((data) => {
                // Update Pokémon HP values
                pokemon1.hp = data.pokemon1_hp;
                pokemon2.hp = data.pokemon2_hp;

                // Refresh the DOM
                updateDOM();
            })
            .catch((error) => console.error("Error:", error));
    }

    // Attach event listeners to buttons
    document.getElementById("pokemon1-attack").addEventListener("click", () => performAction("attack", "pokemon1"));
    document.getElementById("pokemon1-heal").addEventListener("click", () => performAction("heal", "pokemon1"));
    document.getElementById("pokemon1-nerf").addEventListener("click", () => performAction("nerf", "pokemon1"));
    document.getElementById("pokemon1-boost").addEventListener("click", () => performAction("boost", "pokemon1"));

    document.getElementById("pokemon2-attack").addEventListener("click", () => performAction("attack", "pokemon2"));
    document.getElementById("pokemon2-heal").addEventListener("click", () => performAction("heal", "pokemon2"));
    document.getElementById("pokemon2-nerf").addEventListener("click", () => performAction("nerf", "pokemon2"));
    document.getElementById("pokemon2-boost").addEventListener("click", () => performAction("boost", "pokemon2"));

    // Fetch initial data from the server
    fetchInitialData();
});
