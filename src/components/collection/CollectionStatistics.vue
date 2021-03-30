<template>
  <div class="flex flex-center">
    <vue-apex-charts class="q-mb-lg" width="380" type="donut" :options="donutOptions"
                     :series="donutData"></vue-apex-charts>
    <!--    <vue-apex-charts width="500" type="bar" :options="options" :series="series"></vue-apex-charts>-->
    <vue-apex-charts width="500" type="heatmap" :options="heatmapOptions" :series="heatmapData"></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

const getTotalCloneCountByUser = (users) => {
  const countArr = [0, 0, 0, 0]
  for (const [key] of Object.entries(users)) {
    countArr[0] += users[key][0]
    countArr[1] += users[key][1]
    countArr[2] += users[key][2]
    countArr[3] += users[key][3]
  }
  return countArr
}

const getUserCloneCountByType = (users) => {
  const cloneByUserData = [
    {
      name: 'Type 1',
      data: []
    },
    {
      name: 'Type 2',
      data: []
    },
    {
      name: 'Type 3',
      data: []
    },
    {
      name: 'Type 4',
      data: []
    }
  ]
  for (const [key] of Object.entries(users)) {
    cloneByUserData[0].data.push(users[key][0])
    cloneByUserData[1].data.push(users[key][1])
    cloneByUserData[2].data.push(users[key][2])
    cloneByUserData[3].data.push(users[key][3])
  }

  return cloneByUserData
}

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
      donutOptions: {
        title: {
          text: 'Clone type percentage',
          align: 'center',
        },
        legend: {
          position: 'bottom'
        },
        labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4',]
      },
      donutData: getTotalCloneCountByUser(this.collection.stats),

      heatmapData: getUserCloneCountByType(this.collection.stats),
      heatmapOptions: {
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
