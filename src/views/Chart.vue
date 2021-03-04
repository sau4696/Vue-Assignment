<template>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart:VueApexCharts
  },
  data() {
    return {
      series: [
        {
          name: "Salary",
          type: "column",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
        },
        {
          name: "Hours",
          type: "column",
          data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
        },
        // {
        //   name: "Revenue",
        //   type: "line",
        //   data: [20, 29, 37, 36, 44, 45, 50, 58],
        // },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [1, 1, 4],
        },
        title: {
          text: "Employee Details",
          align: "left",
          offsetX: 110,
        },
        xaxis: {
          Quarters: ["Quarter1", "Quarter2", "Quarter3", "Quarter4"],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#008FFB",
            },
            labels: {
              style: {
                colors: "#008FFB",
              },
            },
            title: {
              text: "Salary (thousands )",
              style: {
                color: "#008FFB",
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          {
            seriesName: "Hours",
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#00E396",
            },
            labels: {
              style: {
                colors: "#00E396",
              },
            },
            title: {
              text: "Working Hours",
              style: {
                color: "#00E396",
              },
            },
          },
        //   {
        //     seriesName: "Revenue",
        //     opposite: true,
        //     axisTicks: {
        //       show: true,
        //     },
        //     axisBorder: {
        //       show: true,
        //       color: "#FEB019",
        //     },
        //     labels: {
        //       style: {
        //         colors: "#FEB019",
        //       },
        //     },
        //     title: {
        //       text: "Revenue (thousand crores)",
        //       style: {
        //         color: "#FEB019",
        //       },
        //     },
        //   },
        ],
        tooltip: {
          fixed: {
            enabled: false,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
          },
        },
        // legend: {
        //   horizontalAlign: "left",
        //   offsetX: 40,
        // },
      },
    };
  },
};
</script>

<style>
</style>