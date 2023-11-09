// array of pokemons
let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Fearow', height: 1.2 , types: ['flying', 'normal']},
        { name: 'Bulbasaur', height: 0.7 , types: ['grass', 'poison']},
        { name: 'Nidoking', height: 1.4 , types: ['ground', 'poison']}
    ];

    function getAll () {
        return pokemonList;
    } 

    function add (pokemon) {
        pokemonList.push(pokemon);
    }
    return {
        getAll: getAll,
        add: add
    }
})()

    console.log(pokemonRepository.getAll());
    console.log(pokemonRepository.add());
    
    pokemonList.forEach(function(pokemonList) {
        if (pokemonList.height < 1.3){
        console.log(pokemonList.name + " (height: " + pokemonList.height + " )");
        }
        else if (pokemonList.height >= 1.3){
        console.log(pokemonList.name + " (height: " + pokemonList.height + " )" + " - Wow, that's big!");
        }
    });
