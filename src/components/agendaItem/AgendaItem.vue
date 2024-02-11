<template>
    <div :class="['agenda-item', event]">
        <div class="info">
            <h3>{{ eventName }}</h3>
            <div class="details">
                <p>{{ location }}</p>
                <p>{{ startDate }} - {{ endDate }}</p>
                <p>Price: €{{ price }}</p>
            </div>
        </div>
        <div class="tickets"  v-if="ticketsAvailable >= 0">
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
import { validate } from '../../helpers/eventValidator';

export default{
    props: {
        eventName: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        ticketsAvailable: {
            type: Number,
            required: true
        },
        event: {
            type: String,
            validator: (value) => {
                return validate(value);
            },            
        },
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
</style>../../helpers/eventValidator