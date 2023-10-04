<script>
import ApartmentList from '../../components/apartments/ApartmentList.vue';
import AppHeader from '../../components/AppHeader.vue';
import { store } from '../../data/store';

export default {
    name: "ApartmentsPage",
    components: { AppHeader, ApartmentList },
    data() {
        return {
            store,
            isHomePage: false,
        };
    },
};
</script>

<template>
    <AppHeader :is-home-page="isHomePage" />
    <div class="pt-5 mt-5">
        <ApartmentList :apartments="store.apartments" />
    </div>
</template>

<style scoped></style>
