<script>
import AppSearchTerm from './AppSearchTerm.vue';

export default {
    name: 'AppHero',
    components: { AppSearchTerm },
    data() {
        return {
            searchAddress: '',
            rangeValue: 20,
        }
    },
    emits: ['address-change', 'form-submit', 'distance-change'],
    methods: {
        onAddressChange(input) {
            this.searchAddress = input;
            this.$emit('address-change', this.searchAddress);
        },
        onDistanceChange(input) {
            this.rangeValue = input;
            this.$emit('distance-change', this.rangeValue);
        }
    }


}
</script>

<template>
    <div id="app-hero" ref="hero">
        <div class="hero-overlay d-flex align-items-center justify-content-center">
            <h1 class="text-white">Experience new stories.</h1>
            <div class="search-input">
                <AppSearchTerm @address-change="onAddressChange" @form-submit="$emit('form-submit')"
                    @distance-change="onDistanceChange" />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../scss/vars' as *;
@use '../scss/fonts' as *;

#app-hero {
    height: 100vh;
    background-image: url('/boreal.jpg');
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
    background-color: rgba(0, 0, 0, 0.5);
}

h1 {
    text-align: center;
    color: #ffffff22;
    font-size: 1.5rem;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.search-input {
    width: 50vw;


}

@media (max-width: 992px) {
    .search-input {
        width: 75vw;
    }
}

@media (max-width: 576px) {
    .search-input {
        width: 100vw;
    }
}
</style>
