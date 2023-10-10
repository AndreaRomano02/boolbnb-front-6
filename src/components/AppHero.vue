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
    height: 750px;
    background-image: url('/hero.jpg');
    background-position: top;
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
