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
    },
};
</script>
<template>
    <form @submit.prevent="$emit('form-submit')">
        <div class="searchbar input-group ps-5">
            <!-- Aggiungi l'input text -->
            <input type="text" v-model="searchAddress" class="form-control" placeholder="Cerca una destinazione"
                aria-describedby="button-addon2" @input="handleInput">
            <router-link :to="{ name: 'AdvancedSearch', query: { address: searchAddress, range: rangeValue } }">
                <button class="d-flex align-items-center" type="submit" id="button-addon2"><i
                        class="material-icons fs-5 px-4">search</i></button>
            </router-link>
        </div>
        <!-- Dropdown per i suggerimenti (con un massimo di 4 risultati) -->
        <div v-if="suggestions.length > 0" class="position-relative">
            <ul class="dropdown-menu" aria-labelledby="searchAddress" style="display: block;">
                <li v-for="(suggestion, index) in suggestions.slice(0, 4)" :key="suggestion"
                    @click="handleSuggestionSelected(suggestion)" class="dropdown-item">
                    {{ suggestion }}
                </li>
            </ul>
        </div>
        <div v-if="searchAddress.length" class="d-flex align-items-center mt-3">
            <label for="distance-range" class="ms-5 px-3">Distanza</label>
            <input id="distance-range" type="range" class="mt-1 ms-5 d-block" min="0" max="100" v-model="rangeValue"
                @input="$emit('distance-change', rangeValue)">
            <span class="ms-2 fs-5">{{ rangeValue }} Km</span>
        </div>

    </form>
</template>





  


<style lang="scss" scoped>
@use '../scss/vars' as *;
@use '../scss/fonts' as *;

.searchbar {
    width: 45%;

    input {
        border-radius: 30px;
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

label {
    font-size: 15px;
    padding: 10px 20px;
    margin-right: -30px;
    background: linear-gradient(to bottom, rgba(#4c4c4c, 0.95), rgba(#000, 0.95));
    border-radius: 20px;
    color: $white;
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
}

#distance-range {
    width: 32%;
    border: 1px solid rgba($black, 0.3);
}

span {
    font-family: 'Open sans', sans-serif;
    font-weight: 500;
    color: $white;
}

input:focus {
    outline-style: none;
    box-shadow: none;
    border-right-color: rgba($black, 0.8);
    box-shadow: -5px 25px 25px rgba(0, 0, 0, 0.7);
}


ul {
    width: 37%;
    left: 60px;

}

li {
    list-style-type: none;
}

.dropdown-menu {
    border-radius: 10px;
}

a {
    text-decoration: none;
}
</style>