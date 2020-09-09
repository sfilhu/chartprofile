<template>
    <card style="margin-bottom: 0">
      <h5 slot="header" class="title">Novo Cadastro</h5>
      <div class="row">
        <div class="col-md-8">
          <base-input
            label="Nome completo"
            v-model="form.name"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input 
            type="date"
            label="Nascimento"
            v-model="form.birthday"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <base-input 
            label="Email (opcional)"  
            type="email" 
            v-model="form.email"
          ></base-input>
        </div>
        <div class="col-md-4">
          <base-input 
            label="Whastapp (opcional)" 
            mask="(##) #####-####"
            v-model="form.cel"
          ></base-input>
        </div>
        <div class="col-md-4">
          <base-input
            label="Bairro"
          >
             <select class="form-control" style="color: #999" v-model="form.neighborhood">
                <option value="" selected disabled>Selecione</option>
                <option v-for="(bairro, index) in bairros" :value="bairro" :key="index">{{ bairro }}</option>
              </select>
          </base-input>
          
        </div>
      </div>

      <!-- Sexo -->
       <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <label class="control-label">Gênero</label><br />
            <base-radio name="masculino" value="masculino" inline v-model="form.genero">Masculino</base-radio>
            <base-radio name="feminino" value="feminino" inline v-model="form.genero">Feminino</base-radio>
            <base-radio name="outro" value="outro" inline v-model="form.genero">Outro</base-radio>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <base-checkbox style="margin-top: 36px" inline v-model="form.registered">Matriculado?</base-checkbox>
          </div>
        </div>
      </div>

      <!-- Como nos conheceu? -->
       <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label class="control-label">Como nos conheceu?</label><br />
            <base-radio name="Indicação" value="indicacao" inline v-model="form.toknow">Indicação</base-radio>
            <base-radio name="Instagram" value="instagram" inline v-model="form.toknow">Instagram</base-radio>
            <base-radio name="di" value="di" inline v-model="form.toknow">Digital Influencer</base-radio>
            <base-radio name="parceria" value="parceria" inline v-model="form.toknow">Parceria</base-radio>
            <base-radio name="nenhum" value="nehum" inline v-model="form.toknow">Nenhum</base-radio>
          </div>
        </div>
        <transition name="fade">
          <div class="col-md-12">
            <base-input v-if="form.toknow == 'parceria'" label="Qual?">
              <select class="form-control" style="color: #999" v-model="form.which">
                <option value="clinica_vita">Clínica Vita</option>
                <option value="dalube">Dalube</option>
                <option value="mp_suplementos">MP Suplementos</option>
                <option value="marmita">Não mexe na minha marmita</option>
                <option value="roberto_filho">Roberto Filho</option>
              </select>
            </base-input>
            
            <base-input v-if="form.toknow == 'di'" label="Qual?">
                <select class="form-control" style="color: #999" v-model="form.which">
                  <option value="@habitosbymila">@habitosbymila</option >
                  <option value="@bellafitancia">@bellafitancia</option>
                </select>
          </base-input>
          </div>
        </transition>
      </div>

      <!-- Sexo -->
       <div class="row">
        <div class="col-md-9">
          <div class="form-group">
            <label class="control-label">Pratica atividade física?</label><br />
            <base-radio name="sim" ref="sim" value="sim" inline v-model="form.activity">Sim</base-radio>
            <base-radio name="nao" ref="nao" value="nao" inline v-model="form.activity">Não</base-radio>
          </div>
        </div>
        
        <transition name="fade">
          <div class="col-md-12" v-if="form.activity == 'sim'">
            <base-input label="Qual?">
              <select class="form-control" style="color: #999" v-model="form.whichActivity">
                <option value="" selected disabled>Selecione</option>
                <option value="crossfit">Crossfit</option>
                <option value="musculacao">Musculação</option>
                <option value="luta">Luta</option>
                <option value="outro">Outro</option>
              </select>
            </base-input>
          </div>
        </transition>
      </div>

      <div class="group-button">
        <base-button slot="footer" type="primary" simple  v-on:click="sendForm">Salvar</base-button>
        <base-button slot="footer" type="primary" simple v-on:click="hide">Cancelar</base-button>
      </div>
      
    </card>
</template>
<script>
  import api from "@/service/api";
  import BaseRadio from '@/components/BaseRadio';
  import bairros from '@/util/bairros'

  export default {
    components: {
      'base-radio' : BaseRadio
    },
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    computed: {
      bairros() {
        return bairros
      }
    },
    data: () => {
      return {
        form: {
          name: '',
          birthday: '',
          cel: '',
          email: '',
          neighborhood: '',
          genero: '',
          toknow: '',
          which: '',
          activity: '',
          whichActivity: '',
          registered: false
        },
        required: [
          'name',
          'birthday',
          'neighborhood',
          'genero',
          'toknow',
          'activity',
        ]
      }
    },
    methods: {
      sendForm() {
        const keys = Object.keys(this.form);
        const numValid = 6;
        let count = 0;

        for(const key of keys) {
          if(this.required.some(item => item == key)){
            if(this.form[key] == '') {
             const translateForm = {
                name: 'Nome',
                birthday: 'Nascimento',
                email: 'E-mail',
                neighborhood: 'Bairro',
                genero: 'Gênero',
                toknow: 'Como nos conheceu?',
                activity: 'Pratica atividade física?',
              }

              this.$notify({
                type: 'primary', 
                verticalAlign: 'top', 
                horizontalAlign: 'center', 
                message: `O campo "${translateForm[key]}" é obrigatório!`
              });

              return
            }
          }
        }

        if(this.form.activity == 'nao') {
          this.form.whichActivity = ''
        }
        
        console.log(this.form);
        api.post('/create', this.form).then( resp => {
          const { msg } = resp.data;
          this.$notify({
            type: 'success',  
            verticalAlign: 'top', 
            horizontalAlign: 'center', 
            message: msg
          });
          this.hide()
        }).catch(error => {   
          this.$notify({
            type: 'danger',  
            verticalAlign: 'top', 
            horizontalAlign: 'center', 
            message: error.response.data.msg
          });
        }) 
      },

      hide() {
          this.form = {
            name: '',
            email: '',
            cel: '',
            neighborhood: '',
            sexo: '',
            toknow: '',
            which: '',
            activity: '',
            whichActivity: ''
          }

          this.$modal.hide('my-first-modal');
      }
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
    opacity: 0;
  }
  .group-button {
    display: flex;
    flex-direction: row-reverse;
  }

  .group-button button:first-child {
    margin-left: 15px
  }
</style>
