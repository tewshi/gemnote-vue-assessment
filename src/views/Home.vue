<template>
  <div class="grid grid-cols-2 gap-4 xl:gap-10 container mx-auto">
    <div class="col-span-2 my-4">
      <h1 class="text-3xl lg:text-4xl font-bold">
        Welcome to Gemnote, {{ user.firstName }}!
      </h1>
    </div>
    <div
      class="bg-white rounded shadow-md overflow-hidden border col-span-2 lg:col-span-1"
    >
      <div
        class="flex flex-col sm:flex-row p-4 lg:p-8 divide-solid divide-y-2 sm:divide-x-2 sm:divide-y-0"
      >
        <div class="flex-shrink-0 pb-6 sm:pr-6 sm:pb-0">
          <h3 class="text-lg font-bold">
            Total number of<br />orders this month
          </h3>

          <h3 class="text-3xl lg:text-4xl font-bold mt-4 lg:mt-6">
            {{ inventory.ordersThisMonth.toLocaleString() }}
          </h3>
        </div>
        <div class="flex-grow pt-6 sm:pl-6 sm:pt-0">
          <h3 class="text-lg font-bold">
            Average number of<br />shipments/month
          </h3>

          <div class="grid grid-cols-10 gap-4 mt-4 lg:mt-6">
            <h3
              class="text-3xl lg:text-4xl font-bold col-span-3 :sm-col-span-5"
            >
              {{ inventory.averageMonthlyShipments.toLocaleString() }}
            </h3>
            <button
              type="button"
              class="py-2 px-4 font-semibold rounded bg-gray-100 shadow hover:bg-gray-200 focus:outline-none justify-self-end col-span-7 :sm-col-span-5"
            >
              View orders
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded shadow-md overflow-hidden border col-span-2 lg:col-span-1"
    >
      <div class="flex flex-col sm:flex-row p-4 lg:p-8">
        <div class="flex-shrink-0 pr-3">
          <pie-chart
            class="flex justify-center"
            :chartdata="pieChartData"
            :options="pieChartOptions"
            :width="120"
            :height="120"
          />
        </div>
        <div class="flex-grow pl-3 mt-4">
          <h3 class="text-lg font-bold">Current Inventory</h3>

          <div class="grid grid-cols-2 gap-4 mt-8">
            <h3 class="text-3xl lg:text-4xl font-bold">
              {{ inventory.inventoryTotal.toLocaleString() }}
            </h3>
            <button
              type="button"
              class="py-2 px-4 font-semibold rounded bg-gray-100 shadow hover:bg-gray-200 focus:outline-none justify-self-end"
            >
              Manage inventory
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded shadow-md border col-span-2">
      <div class="flex flex-col p-4 lg:p-8">
        <h3 class="text-lg font-bold mb-4 lg:mb-8">
          Trending gifts in your store
        </h3>
        <div class="lg:h-48 flex flex-col lg:flex-row">
          <img
            v-for="gift in gifts"
            :key="gift.id"
            :src="gift.img"
            :alt="gift.name"
            :title="gift.name"
            class="min-h-full"
          />
          <button
            type="button"
            class="py-2 px-4 font-semibold rounded bg-gray-100 shadow hover:bg-gray-200 focus:outline-none self-center ml-auto"
          >
            Send a gift
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white rounded shadow-md overflow-hidden border col-span-2">
      <div class="flex flex-col p-4 lg:p-8">
        <div class="flex-grow mb-6">
          <div class="flex justify-between items-center mt-4">
            <h3 class="text-lg font-bold">Total gifts sent this year</h3>

            <button
              type="button"
              class="py-2 px-4 font-semibold rounded bg-gray-100 shadow hover:bg-gray-200 focus:outline-none justify-self-end"
            >
              Download report
            </button>
          </div>
        </div>

        <div class="flex-shrink-0">
          <bar-chart :chartdata="barChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PieChart from "@/components/chart/Pie.vue";
import BarChart from "@/components/chart/Bar.vue";

export default {
  name: "Home",
  components: { PieChart, BarChart },
  computed: {
    ...mapState({
      user: ({ user }) => user,
      inventory: ({ inventory }) => inventory,
    }),
  },
  data() {
    return {
      pieChartData: {
        labels: ["Gifts Sent", "Available"],
        datasets: [
          {
            backgroundColor: ["#F7F7F7", "#DFDFDF"],
            data: [40, 20],
          },
        ],
      },
      barChartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            backgroundColor: [
              "#DFDFDF",
              "#DFDFDF",
              "#DFDFDF",
              "#DFDFDF",
              "#DFDFDF",
              "#DFDFDF",
              "#DFDFDF",
              "#F7F7F7",
              "#F7F7F7",
              "#F7F7F7",
              "#F7F7F7",
              "#F7F7F7",
            ],
            maxBarThickness: 48,
            minBarLength: 2,
            data: [800, 400, 600, 800, 400, 400, 400, 600, 800, 600, 400, 400],
          },
        ],
      },
      pieChartOptions: {
        responsive: false,
        maintainAspectRatio: true,
        labels: false,
        legend: false,
      },

      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        labels: false,
        legend: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: false,
              },
            },
          ],
        },
      },

      gifts: [
        { id: 1, name: "Jacket", img: require("../assets/jacket.png") },
        { id: 2, name: "Knapsack", img: require("../assets/knapsack.png") },
        { id: 3, name: "All ", img: require("../assets/collection.png") },
        { id: 4, name: "Water Bottle", img: require("../assets/bottle.png") },
      ],
    };
  },
};
</script>
