
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getpokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        //converter a resposta para json
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    //requisição HTTP - buscando a lista de pokemons:
    return fetch(url)
        //após fetch obter a resposta em HTTP é transformado para json com sucesso:
        .then((response) => response.json())
        //lista de pokemons está em results do jsonBody para focar só na lista de pokemons
        .then((jsonBody) => jsonBody.results)
        //pegamos as listas de pokemons e transformamos em lista de promessas da url de cada pokemon para pegar os detalhes
        .then((pokemons) => pokemons.map(pokeApi.getpokemonsDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        //quando todas as requisições terminarem
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}

//recebe uma array de promessas
//Promise.all([
    //fetch(`https://pokeapi.co/api/v2/pokemon/1/`),
    //fetch(`https://pokeapi.co/api/v2/pokemon/2/`),
    //fetch(`https://pokeapi.co/api/v2/pokemon/3/`),
    //fetch(`https://pokeapi.co/api/v2/pokemon/4/`)
//]).then((results) => {
    //console.log(results)
//})