<!--
    author: @KoenMW
-->

<template>
    <section id="orders">
        <h1>Orders 🤯</h1>
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Username</th>
                    <th>Event name</th>
                    <th>Quantity</th>
                    <th>Comment</th>
                    <th>Payment Date</th>
                    <th>Checked In</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.username }}</td>
                    <td>{{ order.eventName }}</td>
                    <td>
                        <input type="number" v-model="order.quantity" placeholder="0">
                    </td>
                    <td><input type="text" v-model="order.comment" placeholder="no comment"></td>
                    <td>
                        <button @click="setPaymentDate(order.id)" class="edit button" v-if="!order.paymentDate">Set payment date</button>
                        <span v-else>{{ order.paymentDate }}</span>
                    </td>
                    <td><input type="checkbox" v-model="order.checkedIn"></td>
                    <td>
                        <button @click="save(order)" class="edit button">save</button>
                        <button @click="deleteOrder(order.id)" class="delete button">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import axios from '../../../axios-auth';
import { requestHeader } from '@/helpers/requestHeader.js'

export default {
    data() {
        return {
            orders: []
        };
    },
    mounted() {
        axios.get('/orders',
            {
                headers: requestHeader()
            })
            .then(response => {
                this.orders = response.data;
                console.log(this.orders);
            })
            .catch(error => {
                console.error('There was an error fetching the orders:', error);
            });
    },
    methods: {
        setPaymentDate(orderId) {
            this.orders.find(order => order.id === orderId).paymentDate = new Date().toLocaleDateString();
        },
        save(order) {
            console.log(order);
            axios.put(`/orders`, order,
                {
                    headers: requestHeader()
                })
                .then((response) => {
                    console.log(response.data);
                    console.log('Order saved');
                })
                .catch(error => {
                    console.error('There was an error saving the order:', error);
                });
        },
        deleteOrder(orderId) {
            if (confirm('Are you sure you want to delete this order?, this action cannot be undone.')) {
                axios.delete(`/orders/${orderId}`,
                    {
                        headers: requestHeader()
                    })
                    .then((response) => {
                        console.log(response.data);
                        this.orders = this.orders.filter(order => order.id !== orderId);
                    })
                    .catch(error => {
                        console.error('There was an error deleting the order:', error);
                    });
            }
        }
    }
}
</script>

<style>
@import 'orders.scss';
</style>