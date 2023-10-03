<script>
export default {
    name: 'AppHero',
}
</script>

<template>
    <div id="app-hero" ref="hero">
        <div class="hero-overlay"></div>
    </div>
</template>

<style lang="scss" scoped>
#app-hero {
    height: 710px;
    background-image: url('/hero.jpg');
    background-position: center;
    background-size: cover;
    position: relative;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
