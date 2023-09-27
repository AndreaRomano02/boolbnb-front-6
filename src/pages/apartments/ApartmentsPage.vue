<script>
import ApartmentList from '../../components/apartments/Apartmentlist.vue';
export default {
    components: { ApartmentList }
};
</script>

<template>
    <div class="m-5 text-end">
        <router-link class="btn btn-sm btn-success" :to="{ name: 'FormPage' }">Aggiungi un
            appartamento</router-link>
    </div>
    <ApartmentList />
</template>

<style scoped></style>