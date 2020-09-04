<template>
  <base-table :data="table.data"
              :columns="table.columns"
              thead-classes="text-primary">
  </base-table>
</template>
<script>
  import { BaseTable } from "@/components";
  export default {
    props: ['users'],
    components: {
      BaseTable
    },
    data: () => {
      return {
        data: []
      }
    },
    watch: {
      users: {
        handler: function(val) {
          this.data = val;
        },
        deep: true
      }
    },
    computed: {
      table(){
        const table = {
          columns: [
            {
              title: 'Name',
              name: 'name'
            },
            {
              title: 'Email',
              name: 'email'
            },
            {
              title: 'Bairro',
              name: 'neighborhood'
            },
            {
              title: 'Gênero',
              name: 'genero'
            },
            {
              title: 'Como nos conheceu?',
              name: 'toknow'
            }
          ],
          data: this.data,
          title: 'Lista de usários'
        }
        // console.log(this.$t('dashboard.usersTable'));
        return table
      }
    },
  }
</script>
<style>
</style>
