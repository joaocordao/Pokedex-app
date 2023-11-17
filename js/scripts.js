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

    function showDetails(pokemonList) {
        console.log(pokemonList);
    }

    function addListItem(pokemonList){
        let newElement = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemonList.name;
        button.classList.add("button-class");    
        listItem.appendChild(button);
        newElement.appendChild(listItem);
        //adding an event listener to a click
        button.addEventListener('click', function () {
            showDetails(pokemonList);
          });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
    
})();

    pokemonRepository.add({name: 'Slowbro', height: 1.6, types: ['psychic', 'water'] });

    pokemonRepository.getAll().forEach(function (pokemonList) {
        pokemonRepository.addListItem(pokemonList);
    });


  