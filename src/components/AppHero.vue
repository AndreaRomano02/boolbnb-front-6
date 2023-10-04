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
        <div class="hero-overlay d-flex flex-column justify-content-center justify-content-start">
            <div>
                <h1 class="ps-5 display-1">il tuo<br>viaggio,<br>la tua<br>storia.</h1>
            </div>
            <AppSearchTerm @address-change="onAddressChange" @form-submit="$emit('form-submit')"
                @distance-change="onDistanceChange" />
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
</style>
