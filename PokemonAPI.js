document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    // Funció per obtindre les dades de la API
    async function getPokemonData(pokemonId) {
        const response = await fetch(apiUrl + pokemonId);
        const data = await response.json();
        return data;
    }

    // Funció per mostrar l'informació de un Pokémon en la interfície
    function displayPokemon(pokemon) {
        const container = document.getElementById('pokemon-container');
        const card = document.createElement('div');
        card.className = 'pokemon-card';

        const name = document.createElement('h2');
        name.textContent = pokemon.name;

        const image = document.createElement('img');
        image.src = pokemon.sprites.front_default;
        image.alt = pokemon.name;
        image.className = 'pokemon-image';

        card.appendChild(name);
        card.appendChild(image);
        container.appendChild(card);
    }

    // Funció per cargar i mostrar el Pokémon segons la cerca
    async function loadAndDisplayPokemon(searchTerm) {
        const container = document.getElementById('pokemon-container');
        container.innerHTML = ''; // Netejar el contingut anterior

        for (let i = 1; i <= 151; i++) {
            const pokemon = await getPokemonData(i);
            if (pokemon.name.includes(searchTerm.toLowerCase())) {
                displayPokemon(pokemon);
            }
        }
    }

    // Manejar events de cerca
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim();
        loadAndDisplayPokemon(searchTerm);
    });

    // Cargar Pokémon al cargar la pàgina
    loadAndDisplayPokemon('');
});