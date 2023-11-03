// array of pokemons
let pokemonList = [
    { name: 'Fearow', height: 1.2 , types: ['flying', 'normal']},
    { name: 'Bulbasaur', height: 0.7 , types: ['grass', 'poison']},
    { name: 'Nidoking', height: 1.4 , types: ['ground', 'poison']}
];

for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height < 1.3){
        console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + " )");
    }
    else if (pokemonList[i].height >= 1.3){
        console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + " )" + " - Wow, that's big!");
    }
}
