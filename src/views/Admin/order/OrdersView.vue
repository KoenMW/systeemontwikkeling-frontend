<!--
    author: @KoenMW
-->

<template>
  <h1>Orders 🤯</h1>
  <div>
    <button @click="exportCsv">Export to CSV</button>
    <button @click="exportExcel">Export to Excel</button>
  </div>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showModal = false">&times;</span>
      <h2>Select Columns to Export</h2>
      <div v-for="column in columns" :key="column.key">
        <input
          type="checkbox"
          v-model="selectedColumns"
          :value="column.key"
          :disabled="column.key === 'paymentDate'"
        />
        <label>{{ column.label }}</label>
      </div>
      <button @click="processExport" class="export-button">Export</button>
    </div>
  </div>
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
          <input type="number" v-model="order.quantity" placeholder="0" />
        </td>
        <td><input type="text" v-model="order.comment" placeholder="no comment" /></td>
        <td>
          <button @click="setPaymentDate(order.id)" class="edit button" v-if="!order.paymentDate">
            Set payment date
          </button>
          <span v-else>{{ order.paymentDate }}</span>
        </td>
        <td><input type="checkbox" v-model="order.checkedIn" /></td>
        <td>
          <button @click="save(order)" class="edit button">save</button>
          <button @click="deleteOrder(order.id)" class="delete button">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from '../../../axios-auth'
import { requestHeader } from '@/helpers/requestHeader.js'
import { exportToCsv, exportToExcel } from '@/helpers/exportData.js'

export default {
  data() {
    return {
      orders: [],
      columns: [
        { key: 'id', label: 'Order ID' },
        { key: 'username', label: 'Username' },
        { key: 'eventName', label: 'Event name' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'comment', label: 'Comment' },
        { key: 'paymentDate', label: 'Payment Date' },
        { key: 'checkedIn', label: 'Checked In' }
      ],
      selectedColumns: ['paymentDate'],
      showModal: false,
      exportFormat: ''
    }
  },
  mounted() {
    axios
      .get('/orders', {
        headers: requestHeader()
      })
      .then((response) => {
        this.orders = response.data
        console.log(this.orders)
      })
      .catch((error) => {
        console.error('There was an error fetching the orders:', error)
      })
  },
  methods: {
    setPaymentDate(orderId) {
      this.orders.find((order) => order.id === orderId).paymentDate =
        new Date().toLocaleDateString()
    },
    save(order) {
      console.log(order)
      axios
        .put(`/orders`, order, {
          headers: requestHeader()
        })
        .then((response) => {
          console.log(response.data)
          console.log('Order saved')
        })
        .catch((error) => {
          console.error('There was an error saving the order:', error)
        })
    },
    deleteOrder(orderId) {
      if (confirm('Are you sure you want to delete this order?, this action cannot be undone.')) {
        axios
          .delete(`/orders/${orderId}`, {
            headers: requestHeader()
          })
          .then((response) => {
            console.log(response.data)
            this.orders = this.orders.filter((order) => order.id !== orderId)
          })
          .catch((error) => {
            console.error('There was an error deleting the order:', error)
          })
      }
    },
    exportCsv() {
      this.exportFormat = 'csv'
      this.showExportModal()
    },
    exportExcel() {
      this.exportFormat = 'excel'
      this.showExportModal()
    },
    showExportModal() {
      this.showModal = true
    },
    processExport() {
      const dataToExport = this.orders.map((order) => {
        let exportRow = {}
        this.selectedColumns.forEach((key) => {
          exportRow[key] = order[key]
        })
        return exportRow
      })

      if (this.exportFormat === 'csv') {
        exportToCsv(dataToExport, this.selectedColumns)
      } else if (this.exportFormat === 'excel') {
        exportToExcel(dataToExport, this.selectedColumns)
      }

      this.showModal = false
    }
  }
}
</script>
<style scoped>
.modal {
  border: 0.125rem solid #ccc; /* Adjust the color and width as needed */
  border-radius: 0.3125rem; /* Optional: if you want rounded corners */
}

.modal-content {
  background-color: #fefefe;
  color: #000; /* Set text color to black */
  margin: 15% auto; /* 15% from the top and centered */
  padding: 1.25rem;
  border: 0.0625rem solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  float: right;
  font-size: 1.5em;
  cursor: pointer;
}

/* Add a green color to the export button */
button.export-button {
  background-color: #4caf50; /* Green background */
  color: white; /* White text */
  padding: 0.625rem 1.25rem;
  margin: 0.625rem 0;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
}

button.export-button:hover {
  background-color: #45a049; /* Darker green on hover */
}

/* Additional styles to make the checkboxes and labels aligned properly */
.modal-content div {
  margin-bottom: 0.625rem;
}

.modal-content label {
  margin-left: 0.3125em;
}

/* Style the modal to be centered */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 1.25rem;
  border: 0.0625rem solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 1.75em; /* Increased from 28px to 1.75em */
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
