<script>
  import ApexCharts from "apexcharts";
  import { onMount } from "svelte";
  export let titulo = "";
  export let typeXaxis = "datetime";
  export let tituloYaxis = "";
  export let tituloYaxisOpposite = "";
  export let series = [{ name: "", type: "", data: [] }];
  export let labels = [];

  onMount(async () => {
    var options = {
      series: series,
      chart: {
        width: "99%",
        height: 400,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: titulo,
        style: {
          fontSize: "20px",
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: labels,
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        type: typeXaxis,
        labels: {
          style: {
            fontSize: "16px",
          },
        },
      },
      yaxis: [
        {
          title: {
            text: tituloYaxis,
            style: {
              fontSize: "18px",
            },
          },
          labels: {
            style: {
              fontSize: "16px",
            },
          },
        },
        {
          show:  tituloYaxisOpposite === "" ? false : true,
          opposite: true,
          title: {
            text: tituloYaxisOpposite,
            style: {
              fontSize: "18px",
            },
          },
          labels: {
            style: {
              fontSize: "16px",
            },
          },
        },
      ],
      legend: {
        fontSize: "18px",
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  });
</script>

<div class="chart-area">
  <div id="chart" />
</div>

<style>
  .chart-area {
    width: 100%;
    max-width: 100%;
    padding: 10px 5px;
    border: 2px solid rgb(197, 197, 197);
    background-color: var(--default-white);
    border-radius: 10px;
    margin-top: 10px;
  }
</style>
