<template>
  <div class="flex flex-center">
    <vue-apex-charts class="q-mb-lg" width="380" type="donut" :options="chartOptions" :series="series2"></vue-apex-charts>
    <!--    <vue-apex-charts width="500" type="bar" :options="options" :series="series"></vue-apex-charts>-->
    <vue-apex-charts width="500" type="heatmap" :options="chartOptions3" :series="series3"></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: "CollectionStatistics",
  components: {
    VueApexCharts
  },
  props: {
    collection: {
      type: Object,
      required: true
    }
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
        title: {
          text: 'Clone type percentage',
          align: 'center',
        },
        legend: {
          position: 'bottom'
        },
        labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4',]
      },
      series2: [44, 55, 41, 17],

      series3: [{
        name: 'Type 1',
        data: Array(this.collection.users.length + 1).fill(Math.floor(Math.random() * (91)))
      },
        {
          name: 'Type 2',
          data: Array(this.collection.users.length + 1).fill(Math.floor(Math.random() * (91)))
        },
        {
          name: 'Type 3',
          data: Array(this.collection.users.length + 1).fill(Math.floor(Math.random() * (91)))
        },
        {
          name: 'Type 4',
          data: Array(this.collection.users.length + 1).fill(Math.floor(Math.random() * (91)))
        },
      ],
      chartOptions3: {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'category',
          categories: [this.collection.owner.displayName.split(' ')[0], ...this.collection.users.map((u) => u.displayName.split(' ')[0])]
        },
        grid: {
          padding: {
            right: 20
          }
        },
        colors: ["#008FFB"],
        title: {
          text: 'HeatMap Chart (Single color)',
          align: 'center',
        },
      },

    }

  }
}
</script>

<style scoped>

</style>
