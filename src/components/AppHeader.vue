<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
    name: 'AppHeader',
    props: {
        isHomePage: Boolean,
    },
    data() {
        return {
            isScrolled: false,
        };
    },
    mounted() {
        gsap.registerPlugin(ScrollTrigger);
        if (this.isHomePage) {
            this.setupScrollTrigger();
        }
    },
    methods: {
        setupScrollTrigger() {
            if (!this.isHomePage) {
                return;
            }

            ScrollTrigger.create({
                trigger: '#app-header',
                start: '+=650vh',
                onEnter: () => {
                    this.isScrolled = true;
                },
                onLeaveBack: () => {
                    this.isScrolled = false;
                },
            });
        },
    },
};
</script>


<template>
    <header class="navbar navbar-expand-lg px-2"
        :class="{ 'homepage-header': isHomePage && !isScrolled, 'header-scrolled otherpage-header': isHomePage && isScrolled, 'otherpage-header': !isHomePage }"
        id="app-header">
        <div class="container-fluid d-flex align-items-center py-2">
            <router-link :to="{ name: 'home' }" class="navbar-brand ms-3">
                <img src="/logotype_a.png" alt="logo" class="logo" />
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="material-icons">reorder</i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav d-flex">
                    <li class="nav-item w-100">
                        <router-link :to="{ name: 'home' }" class="router-link d-flex align-items-center">
                            <i class="material-icons fs-2 me-2">home</i>
                            <span>Home</span>
                        </router-link>
                    </li>
                    <li class="nav-item w-100">
                        <router-link :to="{ name: 'apartments' }" class="router-link d-flex align-items-center">
                            <i class="material-icons fs-2 me-2">apartment</i>
                            <span>Appartamenti</span>
                        </router-link>
                    </li>
                    <li class="nav-item w-100">
                        <router-link :to="{ name: 'AdvancedSearch' }" class="router-link d-flex align-items-center">
                            <i class="material-icons fs-2 me-2">search</i>
                            <span>Cerca </span>
                        </router-link>
                    </li>
                    <li class="nav-item w-100">
                        <a href="http://127.0.0.1:8000/register" class="router-link d-flex align-items-center"
                            target="_blank">
                            <i class="material-icons fs-2 me-2">person</i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>



<style lang="scss" scoped>
@use '../scss/vars' as *;

.logo {
    height: 50px;
    width: 150px;
}

.navbar-nav {
    margin-left: -30px;
}

.homepage-header {
    background-color: transparent;
}

.otherpage-header {
    background-color: $white;
    box-shadow: 2px 2px 4px rgba($black, 0.3);

    .router-link {
        color: $black;
        transition: color 0.150s;

        &:hover {
            color: $orange;
        }
    }

    img {
        filter: brightness(0);
    }

    .navbar-toggler {
        color: $black;
    }

}

.header-scrolled {
    transition: background-color 0.150s;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    li {
        margin-left: 2.5rem;
        color: $white;
    }

    .navbar-toggler {
        color: $white;
    }

    .router-link {
        text-decoration: none;
        color: $white;
    }
}

@media screen and (max-width: 343px) {
    .logo {
        height: 40px;
        width: 120px;
    }
}

@media screen and (max-width: 576px) {
    .logo {
        margin-left: -10px;
    }

    .navbar-nav {
        margin-left: -35px;
    }

    .container-fluid {
        padding: 0;
    }

}


@media screen and (min-width: 992px) {
    .navbar-nav {
        position: absolute;
        left: 51%;
        transform: translateX(-50%);
        max-width: 80%;
    }

    .logo {
        display: none;
    }

    header {
        height: 90px;
    }

}

@media screen and (min-width: 1024px) {

    .logo {
        display: none;
    }
}

@media screen and (min-width: 1440px) {

    .logo {
        display: block;
    }
}
</style>

