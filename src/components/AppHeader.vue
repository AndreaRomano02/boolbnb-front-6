<script>

export default {
    name: 'AppHeader',
}
</script>
 
<template>
    <header class="px-5 py-2">
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <div>
                <img src="/logotype_a.png" alt="logo" height="50" width="150">
            </div>
            <div>
                <nav>
                    <ul class="d-flex list-unstyled mt-2 pt-1">
                        <li class="nav-item d-flex align-items-center">
                            <i class="material-icons text-white fs-2">home</i>
                            <router-link :to="{ name: 'home' }" class="router-link">
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item d-flex align-items-center">
                            <i class="material-icons text-white fs-2">apartment</i>
                            <router-link :to="{ name: 'apartments' }" class="router-link">
                                Appartamenti
                            </router-link>
                        </li>
                        <li class="nav-item d-flex align-items-center pt-1">
                            <i class="material-icons text-white fs-2">person</i>
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

header {
    background-color: $orange;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    li {
        margin-left: 2.5rem;
    }

    .router-link {
        text-decoration: none;
        color: $white;
    }
}
</style>