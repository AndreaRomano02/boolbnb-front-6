<script>
export default {
    name: 'AppHero',
    emits: ["startSearch"],
    data() {
        return {
            searchText: "",
        }
    }
}
</script>

<template>
    <div id="app-hero" ref="hero">
        <div class="hero-overlay d-flex flex-column justify-content-center justify-content-start">
            <div>
                <h1 class="ps-5 display-1">il tuo<br>viaggio,<br>la tua<br>storia.</h1>
            </div>
            <div class="searchbar input-group mb-3 pb-5 ps-5">
                <input type="text" v-model="searchText" class="form-control" placeholder="Cerca una destinazione"
                    aria-describedby="button-addon2">
                <button @click="$emit('startSearch', searchText)" class="d-flex align-items-center" type="button"
                    id="button-addon2"><i class="material-icons fs-5 px-4">search</i></button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../scss/vars' as *;
@use '../scss/fonts' as *;

#app-hero {
    height: 750px;
    background-image: url('/hero.jpg');
    background-position: bottom;
    background-size: cover;
    position: relative;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);

    h1 {
        font-size: 120px;
        color: $white;
        text-transform: uppercase;
        font-family: 'Catamaran', sans-serif;
        font-weight: 900;
        line-height: 0.8;
        user-select: none;
        filter: brightness(75%);
    }
}

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



input:focus {
    outline-style: none;
    box-shadow: none;
    border-right-color: rgba($black, 0.3);
    box-shadow: -5px 25px 25px rgba(0, 0, 0, 0.7);
}
</style>
