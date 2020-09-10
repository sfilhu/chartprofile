<template>
  <div>
    <!-- Lista de cards -->
    <div class="row">
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-single-02 text-primary "></i>{{ users.length }}</h3>
          </template>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Matriculados</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> {{ registered }}</h3>
          </template>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Não matriculados</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> {{ noRegistered }}</h3>
          </template>
        </card>
      </div>
    </div>

    <!-- Grafico de cadastrados -->
    <div class="row">
      <div class="col-12">
        <BigLineChart />
      </div>
    </div>

    <!-- 2 graficos -->
    <div class="row">
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.dailySales')}}</h5> 
          </template>
          <div class="chart-area">
            <bar-chart 
              v-if="blueBarChart != null"
              refs="bigChart"
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>

       <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Idade</h5>
            <!-- <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i> 763,215</h3> -->
          </template>
          <div class="chart-area">
            <bar-chart 
              v-if="ageChart != null"
              style="height: 100%"
              chart-id="purple-line-chart"
              :chart-data="ageChart.chartData"
              :gradient-colors="ageChart.gradientColors"
              :gradient-stops="ageChart.gradientStops"
              :extra-options="ageChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
    </div>

    <!-- Linsta de cards -->
    <div class="row">
      <div class="col-lg-3" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Indicação</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-compass-05 text-primary "></i>
              {{ know.indicacao }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-lg-3" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Instagram</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-compass-05 text-info "></i> 
              {{ know.instagram }}
            </h3>
          </template>
        </card>
      </div>
      <div class="col-lg-3" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Digital Influencer</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-compass-05 text-success "></i> 
              {{ know.di }}
            </h3>
          </template>
        </card>
      </div>

      <div class="col-lg-3" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Parceria</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-compass-05 text-success "></i> 
              {{ know.parceria }}  
            </h3>
          </template>
        </card>
      </div>
    </div>

    <!-- 2 graficos -->
    <div class="row">
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Digital Influencer</h5>
            <!-- <h3 class="card-title">10</h3> -->
          </template>
          <div class="chart-area">
            <bar-chart 
                        v-if="diChart != null"
                        style="height: 100%"
                        chart-id="purple-line-chart"
                        :chart-data="diChart.chartData"
                        :gradient-colors="diChart.gradientColors"
                        :gradient-stops="diChart.gradientStops"
                        :extra-options="diChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>

      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">Parceria</h5>
            <!-- <h3 class="card-title">12</h3> -->
          </template>
          <div class="chart-area">
            <bar-chart 
                        v-if="parceriaChart != null"
                        style="height: 100%"
                        chart-id="green-line-chart"
                        :chart-data="parceriaChart.chartData"
                        :gradient-stops="parceriaChart.gradientStops"
                        :extra-options="parceriaChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
    </div>

    <!-- Tabela de registros -->
    <div class="row">
      <!-- <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown menu-on-right=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div> -->
      <!-- <div class="col-lg-12 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">Lista de usuários</h4>
          <div class="table-responsive">
            <user-table :users="users"></user-table>
          </div>
        </card>
      </div> -->
    </div>
  </div>
</template>
<script>
  import api from '@/service/api'
  import BigLineChart from './components/BigChartLine'
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable,
      BigLineChart
    },
    data() {
      return {
        // Estado inicial da tela
        diChart: null,
        ageChart: null,
        parceriaChart: null,
        blueBarChart: null,
        users: '',
        valuesChartLine: [],
        know: { indicacao: 0, instagram: 0, di: 0, parceria: 0 },
        registered: 0,
        noRegistered: 0,

        // 
        bigLineChart: {
          allData: [
            [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
      }
    },
    mounted() {
      api.get('/users').then(async resp => {
        this.users = resp.data;
        this.registered   = this.users.filter(item => item.registered == 'true').length
        this.noRegistered = this.users.filter(item => item.registered == 'false').length
        
        this.filterByGenary(resp.data)
        this.filterByKnow(resp.data)
        await this.filterByAge(resp.data)
      }).catch( err => {
        console.log(err)
      })

      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      
    },
    
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    methods: {
      filterRegistered(data) {
        this.bigLineChart = {
          allData: [
            [10, 20, 30, 40, 50, 60, 75, 60, 90, 80, 10, 100],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 100],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 100]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEV', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        }
      },

      filterByAge(data) {
        const arrAge = data.map(item => item.age);
        const range1 = arrAge.filter(item => item >= 15 && item <= 25).length;
        const range2 = arrAge.filter(item => item >= 26 && item <= 35).length;
        const range3 = arrAge.filter(item => item >= 36 && item <= 45).length;
        const range4 = arrAge.filter(item => item >= 46 && item <= 55).length;
        const range5 = arrAge.filter(item => item >= 55).length;

        this.ageChart = {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['15 - 25','26 - 35', '36 - 45', '46 - 55', 'Acima de 55'],
            datasets: [{
              label: "Data",
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
              data: [range1, range2, range3, range4, range5],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        }
        
      },
      
      filterByGenary(data) {
        const fem = data.filter(item => item.genero == 'feminino').length
        const mas = data.filter(item => item.genero == 'masculino').length
        const other = data.filter(item => item.genero == 'outro').length

        this.blueBarChart = {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['Masc', 'Fem', 'Outro'],
            datasets: [{
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [mas, fem, other],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
      },

      filterByKnow(data) {
        this.know = {
          indicacao: data.filter(item => item.toknow == 'Indicação').length,
          instagram: data.filter(item => item.toknow == 'Instagram').length,
          di: data.filter(item => item.toknow == 'di').length,
          parceria: data.filter(item => item.toknow == 'parceria').length,
        }

        const bellafitancia = data.filter(item => item.which == '@bellafitancia').length 
        const habitosbymila = data.filter(item => item.which == '@habitosbymila').length 

        this.diChart = {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['@bellafitancia','@habitosbymila'],
            datasets: [{
              label: "Data",
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
              data: [bellafitancia, habitosbymila],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        }

        const clinica_vita = data.filter(item => item.which == 'clinica_vita').length;
        const dalube = data.filter(item => item.which == 'dalube').length;
        const mp_suplementos = data.filter(item => item.which == 'mp_suplementos').length;
        const marmita = data.filter(item => item.which == 'marmita').length;
        const roberto_filho = data.filter(item => item.which == 'roberto_filho').length;

        this.parceriaChart = {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['C. Vita','Dalube', 'MP Sup.', 'N. Marmita', 'Roberto F.'],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [clinica_vita, dalube, mp_suplementos, marmita, roberto_filho],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        }
      },
    },

    
   
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
