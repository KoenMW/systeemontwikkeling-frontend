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
            <button @click="removeTicket" class="subtrackt">-</button>
            <div>{{ tickets }}</div>
            <button @click="addTicket" class="add">+</button>
        </div>
        <div class="tickets" v-else>
            Sold out
        </div>
    </div>
</template>


<script>
import { Event } from '../../models/event'
import { useTicketsStore } from '../../stores/tickets'

export default{
    setup(){
        const ticketStore = useTicketsStore();
        return { 
            addTicketStore: ticketStore.addTicket,
            getTickets: ticketStore.getTicketsById,
            removeTicketStore: ticketStore.removeTicket
        };
    },
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
            if (this.tickets < this.agendaItem.ticketsAvailable) {
                this.addTicketStore(this.agendaItem);
                this.tickets = this.getTickets(this.agendaItem.id);
            }
        },
        removeTicket() {
            if (this.tickets > 0) {
                this.removeTicketStore(this.agendaItem);
                this.tickets = this.getTickets(this.agendaItem.id);
            }
        }
    },mounted() {
        this.tickets = this.getTickets(this.agendaItem.id);
    }
}

</script>

<style scoped>
@import './agendaItem.scss';
</style>