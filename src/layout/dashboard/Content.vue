<template>
  <div class="content">
    <div class="add-register">
      <button v-on:click="show()">+ Criar novo cadastro</button>
    </div>
    <modal 
      name="my-first-modal"
      :min-width="200"
      :min-height="150"
      :scrollable="true"
      :reset="true"
      width="40%"
      height="auto"
      styles="background: transparent"
    >
      <Register />
    </modal>
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
  import {FadeTransition} from 'vue2-transitions';
  import Register from '@/components/Register'
  export default {
    name: 'MyComponent',
    components: {
      FadeTransition,
      Register
    },
    methods: {
        show () {
            this.$modal.show('my-first-modal');
        },
        hide () {
            this.$modal.hide('my-first-modal');
        }
    },
    mount () {
        this.show()
    }
  };
</script>

<style lang="css">
.add-register {
  display: flex;
  flex-direction: row-reverse;
}

.add-register button {
  padding: 10px 15px;
  margin-bottom: 15px;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 5px;
  background: #40B57F;
  cursor: pointer;
}
</style>
