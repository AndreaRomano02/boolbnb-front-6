<script>
import axios from 'axios';

export default {
    name: "ApartmentCard",
    props: {
        apartment: Object,
    },
};
</script>

<template>
    <div class="apartment-card">
        <router-link :to="{ name: 'SingleApartment', params: { id: apartment.id } }">
            <div class="card-image">
                <img v-if="apartment.images.length" :src="`http://127.0.0.1:8000/storage/${this.apartment.images[0].path}`"
                    alt="Apartment Image" />
            </div>
        </router-link>
        <div class="card-content">
            <h2 class="card-title">{{ apartment.title }}</h2>
            <p class="card-description">{{ apartment.description }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.apartment-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    overflow: hidden;
    max-width: 330px;
    background-color: #fff;
    margin-bottom: -30px;
}

.card-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;

    &:hover {
        filter: saturate(250%);
    }
}

.card-content {
    padding: 10px 0;
}

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
}

.card-description {
    font-size: 1rem;
    margin-bottom: 8px;
}

.card-button {
    display: inline-block;
    background-color: #ff5a5f;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.2s;
}

.card-button:hover {
    background-color: #ff454a;
}
</style>
