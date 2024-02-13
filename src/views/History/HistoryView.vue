<template>
        <banner title="Stroll through history"
                description="Embark on a captivating journey through Haarlem's history with 'Haarlem Heritage Stroll: Unveiling the Past.' This 2.5-hour guided tour, available in English, Dutch, and Chinese, takes you from the iconic Church of St. Bavo to the lively Grote Markt. Join us from July 28th to July 31st for a truly immersive exploration of Haarlem's rich tapestry, where old-world charm meets modern delights."
                :image="bannerPicture"
        />
        <div class="background-picture">
            <section class="body-text">
                <h3>Flexible Departures</h3>
                <p>Available on Tuesdays, Fridays, and Saturdays, our tours provide multiple departure times each day for
                    your convenience. Discover the magic of history ranging from the city's earliest Church to its most
                    iconic landmarks that echo tales of the past.</p>
            </section>

            <section class="body-text">
                <h3>Multilingual Experience</h3>
                <p>Immerse yourself in the enriching tales of the city brought to life in English, Dutch, and Chinese to
                    cater to diverse audiences.</p>
            </section>

            <section class="body-text">
                <h3>Adventure for All Ages</h3>
                <p>Join us and we'll weave you into an experience where past adventures resonate with shared vitality. It's
                    a journey made to be relished by any age with our engaging narrative, rich in detail, channeled within
                    the ebb and flow of a captivating town.</p>
            </section>
        </div>
</template>
<script setup>
import banner from '@/components/banner/banner.vue';
import bannerPicture from '@/assets/images/history/history-banner.png';
</script>
<style scoped>
@import './history.scss';
</style>
