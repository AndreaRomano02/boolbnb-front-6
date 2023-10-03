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
        <div class="hero-overlay"></div>
    </div>
    <div class="searchbar input-group mb-3">
        <input type="text" v-model="searchText" class="form-control" placeholder="Cerca un appartamento"
            aria-describedby="button-addon2">
        <button @click="$emit('startSearch', searchText)" class="btn btn-primary" type="button"
            id="button-addon2">Cerca</button>
    </div>
</template>

<style lang="scss" scoped>
#app-hero {
    height: 710px;
    background-image: url('/hero.jpg');
    background-position: center;
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
}

.searchbar {
    position: absolute;
    top: 33%;
    left: 33%;
    width: 600px;

}
</style>
