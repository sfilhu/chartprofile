<template>
  <card type="chart">
   <template slot="header">
      <div class="row">
        <div class="col-sm-9" :class="isRTL ? 'text-right' : 'text-left'">
          <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
          <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
        </div>
        <div class="col-sm-3">
          <base-input label="">
            <select class="form-control" style="color: #999; border: none; margin-top: 16px">
              <option value="" selected disabled>Este mês</option>
              <option value="musculacao">Musculação</option>
              <option value="pilates">Pilates</option>
              <option value="natacao">Natação</option>
              <option value="futebol">Futebol</option>
              <option value="luta">Luta</option>
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
    <line-chart-teste />
  </card>
</template>

<script>
// import api from '@/service/api'
// import LineChart from '@/components/Charts/LineChart';
// import * as chartConfigs from '@/components/Charts/config';
// import config from '@/config';
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
  
}
</script>
