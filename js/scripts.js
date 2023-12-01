// array of pokemons
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

 
    // creating a  modal container
    function showModal(item) {
        let modalContainer = document.querySelector('#modal-container');

        //Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        modal.appendChild(closeButtonElement);

        let titleElement = document.createElement('h1');
        titleElement.innerText = item.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'height: ' + item.height;

        let typeElement = document.createElement('p');
        typeElement.innerText = 'type: ' + item.types[0].type['name'];

        let container = document.querySelector('#image-container');
        let imgElement = document.createElement('img');
        imgElement.src = 'https://pokeapi.co/api/v2/pokemon/';

        modalContainer.appendChild(modal);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(typeElement);
        modal.appendChild(imgElement);

        
        modalContainer.classList.add('is-visible');
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
    
    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
        hideModal();
        }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
    });


    function add (pokemon) {
        pokemonList.push (pokemon);
    }

    function getAll () {
        return pokemonList;
    } 

    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        // creating li element inside the ul
        let listpokemon = document.createElement("li");
        // creating button element inside the li
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");    
        // Append button to the li listpokemon as its child
        listpokemon.appendChild(button);
        // Append the li listpokemon to the ul pokemonList as its child
        pokemonList.appendChild(listpokemon);
        //adding an event listener to a click
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
            showModal();
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

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})();

    pokemonRepository.loadList().then(function() {
        // Now the data is loaded!
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
    });
});