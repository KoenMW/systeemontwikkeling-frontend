<template>
    <div :class="['agenda-item', agendaItem.event]">
        <div class="info">
            <h3>{{ agendaItem.eventName }}</h3>
            <div class="details">
                <p>{{ agendaItem.location }}</p>
                <p>{{ agendaItem.startDate }} - {{ agendaItem.endDate }}</p>
                <p>Price: €{{ agendaItem.price }}</p>
            </div>
        </div>
        <div class="tickets"  v-if="agendaItem.ticketsAvailable > 0">
            <button @click="removeTicket()" class="subtrackt">-</button>
            <span>{{ tickets }}</span>
            <button @click="addTicket()" class="add">+</button>
        </div>
        <div class="tickets" v-else>
            Sold out
        </div>
    </div>
</template>


<script>
import { Event } from '../../models/event'

export default{
    props: {
        agendaItem: {
            type: Event,
            required: true
        }
    },
    data() {
        return {
            tickets: 0
        }
    },
    methods: {
        addTicket() {
            if (this.tickets < this.ticketsAvailable) {
                this.tickets++
            }
        },
        removeTicket() {
            if (this.tickets > 0) {
                this.tickets--
            }
        }
    }
}

</script>

<style scoped>
@import url(./agendaItem.scss);
</style>../../helpers/eventValidator../../models/eventValidator../../models/event