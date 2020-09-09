<template>
  <card type="chart">
   <template slot="header">
      <div class="row">
        <div class="col-sm-10" :class="isRTL ? 'text-right' : 'text-left'">
          <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
          <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
        </div>
        <div class="col-sm-2">
          <base-input label="">
            <select v-model="rangeFilter" class="form-control" style="color: #999; border: none; margin-top: 16px">
              <option value="0" selected>Este mês</option>
              <option value="1">Esta semana</option>
              <option value="2">Mês passado</option>
              <option value="3">Semana passada</option>
            </select>
          </base-input>
        </div>
      </div>
    </template>
    <div class="chart-area">
      <line-chart 
        style="height: 100%"
        ref="bigChart"
        chart-id="big-line-chart"
        :chart-data="bigLineChart.chartData"
        :gradient-colors="bigLineChart.gradientColors"
        :gradient-stops="bigLineChart.gradientStops"
        :extra-options="bigLineChart.extraOptions"
      ></line-chart>
    </div>
  </card>
</template>

<script>
import api from '@/service/api'
import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import moment from 'moment';

export default {
  name: "BigChartLine",
  components: {
    LineChart
  },
  data: () => {
    return {
      rangeFilter: 0,
      arrRangeFilter: [
        { 
          // label: 'Este mes',
          data_inicio : moment().clone().startOf('month').toISOString(),
          data_final  : moment().clone().endOf('month').toISOString(),
        },
        { 
          // label: 'Esta semana',
          data_inicio : moment().startOf('isoweek').toISOString(),
          // data_inicio : moment().subtract(1, 'weeks').clone().startOf('week').add(1, 'days').toISOString(),
          data_final  : moment().endOf('week').toISOString(),
        },
        { 
            // label: 'Mês passado',
            data_inicio : moment().subtract(1, 'months').clone().startOf('month').toISOString(),
            data_final  : moment().subtract(1, 'months').clone().endOf('month').toISOString(),
        },
       
        { 
            // label: 'Semana passada',
            data_inicio : moment().subtract(1, 'weeks').clone().startOf('week').add(1, 'days').toISOString(),
            data_final  : moment().subtract(1, 'weeks').clone().endOf('week').add(1, 'days').toISOString(), 
        },
      ],
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{ }],
          labels: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 
            '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
            '30', '31'
          ],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        // gradientColors: config.colors.primaryGradient,
        gradientStops: [0, 0.4, 0],
        categories: []
      },
      labels : {
        0: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'],
        1: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 
            '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
            '30', '31'
          ],
        2: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      },
      labelBigChart: [],
      dataBigChart: [],
    }
  },

  mounted() {
    this.getDataBigChart(0)
  },

  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    },
  },

  watch: {
    rangeFilter: function(val){
      this.getDataBigChart(val)
    },
  },

  methods: {
    setBigChart(dataLabel, dataValue) {
      let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: dataValue,
            
          }],
        }
      
      this.$refs.bigChart.updateGradients(chartData); 
      this.bigLineChart.chartData = {};
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.chartData.labels = dataLabel;
    },

    getDataBigChart: function(indexFilter) {
      const getLabel = { 0: 1, 1: 0, 2: 1, 3: 0}
      let range = this.arrRangeFilter[indexFilter];
      let label = this.labels[getLabel[indexFilter]]

      api.post('/filterRegister', range).then( async resp => {
        const data_inicio = moment(range.data_inicio).format('DD')
        const data_final  = moment(range.data_final).format('DD')
        let cont = 0;

        for(let i = data_inicio; i <= data_final; i++) {
          let lengthDateFiltred = await resp.data.filter( item => Number(moment(item.create_at).format('DD')) == i).length;
          this.dataBigChart[cont] = lengthDateFiltred;
          cont++;
        }
        
        // Set Big Chart
        this.setBigChart(label, this.dataBigChart)
      }); 
    }
  }
};
</script>
