// array of pokemons
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add (pokemon) {
        pokemonList.push (pokemon);
    }

    function getAll () {
        return pokemonList;
    } 

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
    
        // creating li element inside the ul
        let listpokemon = document.createElement("li");
    
        // creating button element inside the li
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn", "btn-primary", "button-class");
    
        // Add data-toggle and data-target attributes for Bootstrap modal
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemonModal");
    
        // Append button to the li listpokemon as its child
        listpokemon.appendChild(button);
    
        // Append the li listpokemon to the ul pokemonList as its child
        pokemonList.appendChild(listpokemon);
    
        // adding an event listener to a click
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch (function (e) {
            console.error (e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
          showModal(item);
        });
    }

    // creating a  modal container
    function showModal(item) {
        let modalBody = document.querySelector('.modal-body');

        // Clear all existing modal content
        modalBody.innerHTML = '';

        let titleElement = document.createElement('h5');
        titleElement.classList.add('modal-title');
        titleElement.innerText = item.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'height: ' + item.height;

        // how many types does the pokemon have
        function typeCount(item) {
            if (item.types.length === 2) {
                return item.types[0].type.name + ', ' + item.types[1].type.name;
            } else {
                return item.types[0].type.name;
            }
        }

        let typeElement = document.createElement('p');
        typeElement.innerText = 'type: ' + typeCount(item);

        let imgElement = document.createElement('img');
        imgElement.src = item.imageUrl;

        modalBody.appendChild(titleElement);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(typeElement);
        modalBody.appendChild(imgElement);

        modalContainer.querySelector('.modal-dialog').appendChild(modal);

        modalContainer.classList.add('show');
        modalContainer.style.display = 'block';

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }
    
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
        }
    });
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    }
})();

    pokemonRepository.loadList().then(function() {
        // Now the data is loaded!
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
    });
});