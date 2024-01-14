//pegar o Bulbasaur como base para os próximos pokemnos
const pokemonlist = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('moreButton')

let offset = 0;
const limit = 10;
const maxRecord = 151;

function convertPokemonToLi(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                   ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemons(offset, limit){
    // Manipulação de promessas
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //.map transforma um elemento em outro elemento (transforma a lista de obj em outro tipo)
        pokemonlist.innerHTML += pokemons.map(convertPokemonToLi).join('')
        //join junta todos os elementos em uma string com o separador que colocar     
    })
}

loadPokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset = offset + limit

    const numRecord = offset + limit

    if(numRecord >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemons(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemons(offset, limit)
    }
})
