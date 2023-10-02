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
                start: '+=627px top',
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
    <header
        :class="{ 'homepage-header': isHomePage && !isScrolled, 'header-scrolled otherpage-header': isHomePage && isScrolled, 'otherpage-header': !isHomePage }"
        id="app-header">
        <div class="container-fluid d-flex align-items-center justify-content-between px-5 py-2">
            <div>
                <router-link :to="{ name: 'home' }">
                    <img src="/logotype_a.png" alt="logo" height="50" width="150" />
                </router-link>
            </div>
            <div>
                <nav>
                    <ul class="d-flex list-unstyled mt-2 pt-1">
                        <li class="nav-item d-flex align-items-center">
                            <i class="material-icons text-white fs-2 me-2">home</i>
                            <router-link :to="{ name: 'home' }" class="router-link">
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item d-flex align-items-center">
                            <i class="material-icons text-white fs-2 me-2">apartment</i>
                            <router-link :to="{ name: 'apartments' }" class="router-link">
                                Appartamenti
                            </router-link>
                        </li>
                        <li class="nav-item d-flex align-items-center pt-1">
                            <i class="material-icons text-white fs-2 me-2">person</i>
                            <a href="http://127.0.0.1:8000/register" class="router-link" target="_blank">
                                Registrati
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>



<style lang="scss" scoped>
@use '../scss/vars' as *;

.homepage-header {
    background-color: transparent;
}

.otherpage-header {
    background-color: $orange;
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

    .router-link {
        text-decoration: none;
        color: $white;
    }
}
</style>

