<script>
import { store } from '../data/store';

export default {
    name: 'AppSearchTerm',
    data() {
        return {
            searchAddress: '',
            store,
            rangeValue: 20,
        }
    },
    emits: ['address-change', 'form-submit']
};
</script>

<template>
    <form @submit.prevent="$emit('form-submit')">
        <div class="searchbar input-group pb-4 ps-5">
            <input type="text" v-model.trim="searchAddress" class="form-control" placeholder="Cerca una destinazione"
                aria-describedby="button-addon2" @keyup="$emit('address-change', searchAddress)">
            <button class="d-flex align-items-center" type="submit" id="button-addon2"><i
                    class="material-icons fs-5 px-4">search</i></button>
        </div>
        <div class="d-flex align-items-center">
            <label for="distance-range" class="ms-5 px-3">Distanza</label>
            <input id="distance-range" type="range" class="mt-1 ms-5 d-block" min="0" max="100" v-model="rangeValue">
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
</style>