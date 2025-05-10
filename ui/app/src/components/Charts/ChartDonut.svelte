<script>
	import ApexCharts from "apexcharts";
	import { onMount } from "svelte";
	export let idInPage;
	export let titulo = "";
	export let series = [];
	export let labels = [];
	export let colors = [];
  
	onMount(async () => {
	  var options = {
		series: series,
		labels: labels,
		chart: {
		  type: 'donut',
		  height: "100%",
		  stacked: false,
		},
		colors: colors,
    	plotOptions: {
      		pie: {
				donut: {
              		labels: {
                		show: true,
                		total: {
							show: true,
							fontSize: "14px",
							fontWeight: "bold",
                  			formatter: function (w) {
                    			return w.globals.seriesTotals.reduce((a, b) => {
                      				return a + b
                    			}, 0)
                  			}
                		}
      				}
				}
			}
		},
		title: {
		  text: titulo,
		  style: {
			fontSize: "20px",
		  },
		},
		legend: {
		  fontSize: "18px",
		  position: 'top',
      	horizontalAlign: 'center',
		  onItemClick: {
			toggleDataSeries: true,
		  },
		  onItemHover: {
			highlightDataSeries: true,
		  },
		},
	  };
  
	  var chart = new ApexCharts(document.querySelector(`#chartDonut-${idInPage}`), options);
	  chart.render();
	});
  </script>
  
  <div class="chart-area">
	<div id="chartDonut-{idInPage}"/>
  </div>
  
  <style>
	.chart-area {
	  width: 100%;
	  max-width: 100%;
	  padding: 10px 5px;
	  border: 2px solid rgb(197, 197, 197);
	  background-color: var(--default-white);
	  border-radius: 10px;
	  height: 100%;
	  align-items: center;
	}
  </style>
  