<script>
import ApartmentList from '../../components/apartments/ApartmentList.vue';

export default {
    name: "ApartmentsPage",
    components: { ApartmentList },
    props: {
        isHomePage: false,
    },
    created() {
        console.log("isHomePage in ApartmentsPage:", this.isHomePage);
    },
};
</script>

<template>
    <ApartmentList />
</template>

<style scoped></style>
