<template>
  <div class="flex flex-center">
    <div class="text-h6 row">Clone Percentage</div>
    <vue-apex-charts width="380" type="donut" :options="chartOptions" :series="series2"></vue-apex-charts>
    <div class="text-h6">Trial History</div>
    <vue-apex-charts width="500" type="bar" :options="options" :series="series"></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: "CollectionStatistics",
  components: {
    VueApexCharts
  },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],
      chartOptions: {
        labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4',]
      },
      series2: [44, 55, 41, 17]
    }

  }
}
</script>

<style scoped>

</style>
