<script>
import VueAutosuggest from 'vue-autosuggest';
import { store } from '../data/store';

export default {
    name: 'AppSearchTerm',
    data() {
        return {
            searchAddress: '',
            store,
            rangeValue: 20,
            suggestions: [], // Array per immagazzinare i suggerimenti
        };
    },
    emits: ['address-change', 'form-submit', 'distance-change'],
    computed: {
        // Proprietà di input per Vue-Autosuggest
        inputProps() {
            return {
                value: this.searchAddress,
                placeholder: 'Cerca una destinazione',
            };
        },
    },
    methods: {
        // Gestisci la selezione di un suggerimento
        handleSuggestionSelected(suggestion) {
            this.searchAddress = suggestion;
            this.suggestions = []; // Pulisci i suggerimenti dopo la selezione
            this.$emit('address-change', suggestion);
        },

        // Gestisci l'input dell'utente
        handleInput() {
            // Effettua una chiamata API a TomTom solo se la lunghezza della query è maggiore di 2 (per evitare chiamate inutili)
            if (this.searchAddress.length > 2) {
                this.fetchSuggestionsFromApi(this.searchAddress); // Effettua una chiamata API per i suggerimenti
            } else {
                this.suggestions = []; // Se la query è troppo breve, svuota i suggerimenti
            }
        },

        // Effettua una chiamata API a TomTom per ottenere i suggerimenti
        async fetchSuggestionsFromApi(query) {
            // Esegui una chiamata API a TomTom utilizzando la tua API Key
            const apiKey = 'PWX9HGsOx1sGv84PlpxzgXIbaElOjVMF';
            const apiUrl = `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Estrai i suggerimenti dalla risposta API e assegna a `suggestions`
                this.suggestions = data.results.map(result => result.address.freeformAddress);
            } catch (error) {
                console.error('Errore nella chiamata API di TomTom:', error);
            }
        },
        // Chiudi la dropdown quando si fa clic fuori dall'input
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.showSuggestions = false;
            }
        },
        handleFormSubmit() {
            if (this.searchAddress.trim() === '') {
                alert("L'indirizzo di ricerca non può essere vuoto.");
            } else {
                this.$emit('form-submit');
            }
        },
    },
};
</script>


<template>
    <form @submit.prevent="handleFormSubmit">
        <div class="searchbar input-group px-2">
            <!-- Aggiungi l'input text -->
            <input type="text" v-model="searchAddress" class="form-control" placeholder="Cerca una destinazione"
                aria-describedby="button-addon2" @input="handleInput" />
            <router-link v-if="searchAddress.trim() !== ''"
                :to="{ name: 'AdvancedSearch', query: { address: searchAddress, range: rangeValue } }">
                <button class="d-flex align-items-center" type="submit" id="button-addon2">
                    <i class="material-icons fs-5 px-4">search</i>
                </button>
            </router-link>
            <button v-else type="submit" class="d-flex align-items-center" id="button-addon2">
                <i class="material-icons fs-5 px-4">search</i>
            </button>
        </div>
        <!-- Dropdown per i suggerimenti (con un massimo di 4 risultati) -->
        <div v-if="suggestions.length > 0" class="position-relative me-5">
            <ul class="dropdown-menu" aria-labelledby="searchAddress" style="display: block;">
                <li v-for="(suggestion, index) in suggestions.slice(0, 4)" :key="suggestion"
                    @click="handleSuggestionSelected(suggestion)" class="dropdown-item">{{ suggestion }}</li>
            </ul>
        </div>
        <div v-if="searchAddress.length" id="range-container" class="d-flex align-items-center shadow-lg mt-3">
            <label for="distance-range">Distanza</label>
            <input id="distance-range" type="range" class="mt-1 ms-5 d-block" min="0" max="20" v-model="rangeValue"
                @input="$emit('distance-change', rangeValue)" />
            <span class="ms-2 fs-6">{{ rangeValue }} Km</span>
        </div>
        <div style="height: 30px;"></div>
    </form>
</template>
  
  


<style lang="scss" scoped>
@use '../scss/vars' as *;
@use '../scss/fonts' as *;

.searchbar {
    width: 100%;

    input {
        border-radius: 30px;
        position: relative;
    }

    button {
        height: 40px;
        background-color: $white;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border: none;
        transition: background-color 0.2s;

        i {
            color: $black;
        }

        &:hover {
            background-color: #000;

            i {
                color: $white;
            }
        }
    }

}

#range-container {
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 510px;
    border-radius: 20px;
    // background: linear-gradient(to bottom, rgb(0, 0, 19), rgb(0, 0, 25));
    background-color: rgba($white, 1.0);
    padding: 5px 10px;
    color: $black;
    text-align: center;
    z-index: 1;

    label {
        font-size: 15px;
        padding: 5px 0;
        padding-left: 10px;
        margin-right: -30px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
    }

    #distance-range {
        width: 100%;
        border: none;
        background: transparent;
        -webkit-appearance: none;
        appearance: none;
        height: 6px;
        background: $bone;
        border-radius: 3px;
    }

    #distance-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background: $blue;
        border: 1px solid #fff;
        position: relative;
        z-index: 3;
        cursor: pointer;
    }

    span {
        font-size: 15px;
        width: 100px;
        // font-family: 'Open Sans', sans-serif;
        font-weight: 500;
    }
}



input[type="text"]:focus {
    outline-style: none;
    box-shadow: none;
    border-right-color: rgba($black, 0.8);
    box-shadow: -5px 10px 10px rgba(0, 0, 0, 0.7);
}


ul {
    width: 37%;
    left: 60px;

}

li {
    list-style-type: none;

    &:hover {
        background-color: rgba($black, 0.25);
    }
}

.dropdown-menu {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: absolute;
    left: 20px;
    width: 92%;
}

a {
    text-decoration: none;
}

.dropdown-item:hover {
    cursor: pointer;
}
</style>