<script>
import axios from 'axios';
const visit_endpoint = 'http://127.0.0.1:8000/api/apartments/visit';

export default {
    name: "ApartmentCard",
    props: {
        apartment: Object,
    },
    data() {
        return {
            ipAddress: null,
            date: null,
            isSponsorActive: false,
            lastSponsor: this.apartment.sponsors.length - 1,
            currentTimeStamp: '',
            endSponsorTimeStamp: '',
        }
    },
    created() {
        this.fetchIpAddress();
        this.fetchDate();
        this.currentTimeStamp = Date.parse(new Date(this.date));

        if (this.apartment.sponsors && this.apartment.sponsors.length > 0) {
            this.endSponsorTimeStamp = Date.parse(new Date(this.apartment.sponsors[this.lastSponsor].pivot.end_date));

            if (this.currentTimeStamp < this.endSponsorTimeStamp) {
                this.isSponsorActive = true;
            } else {
                this.isSponsorActive = false;
            }
        }
    },

    methods: {
        fetchIpAddress() {
            axios.get('https://api.ipify.org?format=json')
                .then(response => {
                    this.ipAddress = response.data.ip;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        fetchDate() {
            const currentDate = new Date().toJSON().slice(0, 10);
            const currentTime = new Date().toJSON().slice(11, 19);

            const fullDateTime = currentDate + ' ' + currentTime;
            this.date = fullDateTime;

        },
        truncateDescription(description, maxLength) {
            if (description && description.length > maxLength) {
                return description.slice(0, maxLength) + '...';
            }
            return description;
        },
        visit_call() {
            const params = {
                apartment_id: this.apartment.id,
                IP_address: this.ipAddress,
                date: this.date,
            };

            axios.post(visit_endpoint, params).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.error(err)
            })
        }
    }
};
</script>

<template>
    <div class="apartment-card">
        <router-link class="text-decoration-none text-dark" :to="{ name: 'SingleApartment', params: { id: apartment.id } }"
            @click="this.visit_call">
            <div class="card-image">
                <img v-if="apartment.images.length" :src="`http://127.0.0.1:8000/storage/${this.apartment.images[0].path}`"
                    alt="Apartment Image" />
                <i v-if="this.isSponsorActive" id="sponsor-icon" class="material-symbols-outlined">
                    social_leaderboard
                </i>
            </div>
            <div class="card-content">
                <h2 class="card-title">{{ apartment.title }}</h2>
                <p id="address">{{ apartment.address }}</p>
                <div v-if="apartment.distance_center">
                    <p>{{ apartment.distance_center }} km dal centro</p>
                </div>
                <div class="d-flex align-items-center">
                    <p id="price">€{{ apartment.price }} / Notte</p>
                    <p class="mx-1">|</p>
                    <p id="square-meters">{{ apartment.square_meters }} mq²</p>
                </div>
                <div class="d-flex">
                    <div v-for="(service, index) in apartment.services.slice(0, 5)" :key="index" class="d-flex">
                        <i class="material-symbols-outlined me-1">{{ service.icon }}</i>
                    </div>
                </div>
                <br>
                <p class="card-description">{{ truncateDescription(apartment.description, 70) }}</p>

            </div>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
@use "../../scss/vars" as *;

.apartment-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    overflow: hidden;
    height: 575px;
    background-color: rgba($bone, 0.1);
}

.card-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    position: relative;

    #sponsor-icon {
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 24px;
        color: $black;
        padding: 8px;
        border-radius: 50%;
        background-color: goldenrod;
    }
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
    padding: 10px 10px;

    #price,
    #square-meters {
        font-size: 14px;
        color: rgba($black, 0.7);
        font-weight: 500;
    }
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
</style>
