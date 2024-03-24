<!--
    author: @LukoGi
-->

<script setup>
import Fork from '@/assets/images/Yummy/fork.svg';
import Knife from '@/assets/images/Yummy/knife.svg';
import Plate from '@/assets/images/Yummy/detailpage/plate.png';
import Sign from '@/assets/images/Yummy/detailpage/sign.png';
import Pan from '@/assets/images/Yummy/detailpage/pan.png';
</script>

<template>
    <main class="centered-container">
        <section class="top-section">
            <img class="fork" :src="Fork" alt="Fork image">
            <img class="plate" :src="Plate" alt="Plate image">
            <img class="knife" :src="Knife" alt="Knife image">
        </section>

        <section class="reservation-section">
            <img class="sign" :src="Sign" alt="Sign image">
            <img class="pan" :src="Pan" alt="Pan image">
        </section>
    </main>
</template>

<style scoped>
@import url(./yummydetail.scss);
</style>