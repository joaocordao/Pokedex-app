// array of pokemons
let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Fearow', height: 1.2 , types: ['flying', 'normal']},
        { name: 'Bulbasaur', height: 0.7 , types: ['grass', 'poison']},
        { name: 'Nidoking', height: 1.4 , types: ['ground', 'poison']}
    ];
        
    function add (pokemon) {
     pokemonList.push (pokemon);
    }

    function getAll () {
        return pokemonList;
    } 

    return {
        add: add,
        getAll: getAll
    };
    
})();

    pokemonRepository.add({name: 'Slowbro', height: 1.6, types: ['psychic', 'water'] });

    pokemonRepository.getAll().forEach(function(pokemonList) {
        if (pokemonList.height < 1.3){
        console.log(pokemonList.name + " (height: " + pokemonList.height + " )");
        }
        else if (pokemonList.height >= 1.3){
        console.log(pokemonList.name + " (height: " + pokemonList.height + " )" + " - Wow, that's big!");
        }
        document.write("<p>" + pokemonList.name + "</p>");
    });

   
  