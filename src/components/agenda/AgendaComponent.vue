<script setup>
import AgendaItem from '@/components/agendaItem/AgendaItem.vue';
</script>

<template>
    <section id="agenda">
        <div class="days">
            <button @click="changeDay('2024-07-26')"> Thursday</button>
            <button @click="changeDay('2024-07-27')"> Friday</button>
            <button @click="changeDay('2024-07-28')"> Saturday</button>
            <button @click="changeDay('2024-07-29')"> Sunday</button>
        </div>
        <AgendaItem
            v-for="item in filteredAgendaItems"
            :agendaItem="item"
            :key="item.id"
        />
    </section>
</template>



<script>
import { Event} from '@/models/event';

export default {
    props: {
        agendaItems: {
            type: Array,
            required: true,
            validator: (value) => {
                return value.every((item) => item instanceof Event);
            }
        }
    }, 
    data() {
        return {
            selectedDay: '2024-07-26' // not a fan of this hardcoded date but its fine for now
        }
    },
    methods: {
        changeDay(day) {
            this.selectedDay = day;
        }
    },
    computed: {
        filteredAgendaItems() {
            return this.agendaItems.filter((item) => {
                console.log(item, this.selectedDay);
                return item.startDate === this.selectedDay;
            });
        }
    }
}
</script>

<style scoped>
@import './agenda.scss';
</style>