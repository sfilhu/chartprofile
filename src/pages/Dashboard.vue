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
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                      v-if="bigLineChart != null"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories"
                         :key="index"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initBigChart(option.index, index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index">
                    {{option.name}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart 
              v-if="bigLineChart != null"
              style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>

    <!-- 2 graficos -->
    <div class="row">
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.dailySales')}}</h5> 
            <!-- aki -->
            <!-- <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> 3,500€</h3> -->
          </template>
          <div class="chart-area">
            <bar-chart 
              v-if="blueBarChart != null"
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
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';
  import moment from 'moment';

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable
    },
     mounted() {
      api.get('/users').then( resp => {
        this.users = resp.data;
        // alert(this.users.length)
        this.registered = this.users.filter(item => item.registered == 1).length
        this.noRegistered = this.users.filter(item => item.registered == 0).length
        
        this.filterByGenary(resp.data)
        this.filterByKnow(resp.data)
        this.filterRegistered(resp.data)
        this.initBigChart(0,0);
      }).catch( err => {
        console.log(err)
      })

      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      
    },
    data() {
      return {
        users: '',
        valuesChartLine: [],
        know: {
          indicacao: 0,
          instagram: 0,
          di: 0,
          parceria: 0
        },
        registered: 0,
        noRegistered: 0,
        bigLineChart: null,
        diChart: null,
        parceriaChart: null,
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "My First dataset",
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
              data: [90, 27, 60, 12, 80],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        },
        blueBarChart: null,
        items: [
            { 
                // label: 'Esta semana',
                data_inicio : moment().clone().startOf('week').add(1, 'days').toISOString(),
                data_final  : moment().clone().endOf('week').add(1, 'days').toISOString(),
            },
            { 
                // label: 'Semana passada',
                data_inicio : moment().subtract(1, 'weeks').clone().startOf('week').add(1, 'days').toISOString(),
                data_final  : moment().subtract(1, 'weeks').clone().endOf('week').add(1, 'days').toISOString(), 
            },
            { 
                // label: 'Últimos 30 dias',
                data_inicio : moment().clone().startOf('month').toISOString(),
                data_final  : moment().clone().endOf('month').toISOString(),
            },
            { 
                // label: 'Mês passado',
                data_inicio : moment().subtract(1, 'months').clone().startOf('month').toISOString(),
                data_final  : moment().subtract(1, 'months').clone().endOf('month').toISOString(),
            },
        ]
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
      // aki
      initBigChart(labelIndex, index) {
        const label = {
          0: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'],
          1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 
              '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
              '30', '31'],
          2: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        }
        
        console.log(labelIndex, index);

        api.post('/filterRegistred', this.items[index]).then( async resp => {
          const data_inicio = moment(this.items[index].data_inicio).format('DD')
          const data_final  = moment(this.items[index].data_final).format('DD')
          let cont = 0

          for(let i = data_inicio; i <= data_final; i++) {
            let lengthDateFiltred = await resp.data.filter( item => moment(item.checkIn).format('DD') == i).length;
            console.log(cont, lengthDateFiltred);
            this.valuesChartLine[cont] = lengthDateFiltred;
            cont++;
          }

          console.log(this.valuesChartLine);
          this.bigLineChart.chartData = {
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
              data: this.valuesChartLine
            }],
            labels: label[labelIndex],
          }

        })
        
        // this.$refs.bigChart.updateGradients(chartData); 
        this.bigLineChart.activeIndex = index;
      },

      filterRegistered(data) {
        this.bigLineChart = {
          allData: [
            // [10, 20, 30, 40, 50, 60, 75, 60, 90, 80, 10, 100],
            // [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 100],
            // [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 100]
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
