<script>
import AppHeader from '../../components/AppHeader.vue';
import ApartmentList from '../../components/apartments/ApartmentList.vue';

export default {
    name: "AdvancedSearch",
    components: { AppHeader, ApartmentList },
    data() {
        return {
            isHomePage: false,
        };
    },
};
</script>

<template>
    <AppHeader :is-home-page="isHomePage" />
    <div class="pt-5 mt-5">
        <ApartmentList />
    </div>
</template>

<style scoped></style>