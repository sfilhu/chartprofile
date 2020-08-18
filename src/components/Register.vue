<template>
    <card style="margin-bottom: 0">
      <h5 slot="header" class="title">Novo Cadastro</h5>
      <div class="row">
        <div class="col-md-12">
          <base-input 
            label="Nome completo"
            v-model="form.name"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-input 
            label="Email"  
            type="email" 
            v-model="form.email"
          ></base-input>
        </div>
        <div class="col-md-6">
          <base-input 
            label="bairro"
            v-model="form.neighborhood"
          ></base-input>
        </div>
      </div>

      <!-- Sexo -->
       <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label class="control-label">Sexo</label><br />
            <base-radio name="Masculino" value="masculino" inline v-model="form.sexo">Masculino</base-radio>
            <base-radio name="Feminino" value="feminino" inline v-model="form.sexo">Feminino</base-radio>
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
          </div>
        </div>
        <transition name="fade">
          <div class="col-md-12">
            <base-input v-if="form.toknow == 'parceria'" label="Qual?" v-model="form.which">
              <select class="form-control" style="color: #999">
                <option value="0">Clínica Vita</option>
                <option value="1">Dalube</option>
                <option value="2">MP Suplementos</option>
                <option value="3">Não mexe na minha marmita</option>
                <option value="4">Roberto Filho</option>
              </select>
            </base-input>
            
            <base-input v-if="form.toknow == 'di'" label="Qual?" v-model="form.which">
                <select class="form-control" style="color: #999">
                  <option value="5">@habitosbymila</option>
                  <option value="6">@bellafitancia</option>
                </select>
          </base-input>
          </div>
        </transition>
      </div>

      <!-- Sexo -->
       <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label class="control-label">Pratica atividade física?</label><br />
            <base-radio name="sim" value="sim" inline v-model="form.activity">Sim</base-radio>
            <base-radio name="nao" value="nao" inline v-model="form.activity">Não</base-radio>
          </div>
        </div>
        <transition name="fade">
          <div class="col-md-12" v-if="form.activity == 'sim'">
            <base-input label="Qual?" v-model="form.which">
              <select class="form-control" style="color: #999">
                <option value="0">Musculação</option>
                <option value="1">Pilates</option>
                <option value="2">Natação</option>
                <option value="3">Futebol</option>
                <option value="4">Luta</option>
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
  import BaseRadio from '@/components/BaseRadio';

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
    data: () => {
      return {
        form: {
          name: '',
          email: '',
          neighborhood: '',
          sexo: '',
          toknow: '',
          which: '',
          activity: '',
          whichActivity: ''
        }
      }
    },
    methods: {
      sendForm() {
        console.log(this.form)
      },

      hide() {
          this.form = {
            name: '',
            email: '',
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
