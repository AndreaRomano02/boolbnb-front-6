<script>
import ApartmentList from '../../components/apartments/ApartmentList.vue';
import AppHeader from '../../components/AppHeader.vue';

export default {
    name: "ApartmentsPage",
    components: { AppHeader, ApartmentList },
    data() {
        return {
            isHomePage: false,
        };
    },
    created() {
        console.log("isHomePage in ApartmentsPage:", this.isHomePage);
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
