<template>
  <header>
    <!-- Topnav -->
    <div class="topnav">
      <b-container>
        <b-row align-v="center" no-gutters>
          <b-col cols="auto"><icon-menu class="toggler" @click="sidebarVisiblity = true"></icon-menu></b-col>
          <b-col><h1>Автозаметки</h1></b-col>
        </b-row>
      </b-container>
    </div>

    <!-- Sidebar -->
    <b-sidebar v-model="sidebarVisiblity" id="sidebar" left no-header width="85%">
      
      <b-container>
        <b-row align-v="center" no-gutters style="margin:10px 0 3rem 0">
          <b-col cols="auto"><icon-close @click="sidebarVisiblity = false"></icon-close></b-col>
          <b-col><h1>Автозаметки</h1></b-col>
        </b-row>
      </b-container>

      <b-container v-if="user">

        <b-row align-v="center" class="menu-item" no-gutters>
          <b-col cols="auto"><icon-profile></icon-profile></b-col>
          <b-col>{{ user.email }}</b-col>
        </b-row>

        <hr>

        <div v-if="vehicles.length">
          <b-row v-for="(o, k) in vehicles" :key="`vehicle-${k}`" align-v="center" no-gutters class="menu-item">
            <b-col cols="auto">
              <icon-vehicle-0 v-if="k === 0"></icon-vehicle-0>
              <icon-vehicle-1 v-else-if="k === 1"></icon-vehicle-1>
              <icon-vehicle-2 v-else-if="k === 2"></icon-vehicle-2>
              <icon-vehicle-3 v-else-if="k === 3"></icon-vehicle-3>
              <icon-vehicle-4 v-else-if="k === 4"></icon-vehicle-4>
              <icon-vehicle-5 v-else></icon-vehicle-5>
            </b-col>
            <b-col><b-link :to="vehicleRetrieveHref(o)">{{ vehicleTitle(o) }}</b-link></b-col>
          </b-row>
        </div>

        <hr v-if="vehicles.length">

        <b-row align-v="center" no-gutters class="menu-item">
          <b-col cols="auto"><icon-plus></icon-plus></b-col>
          <b-col><b-link :to="vehicleCreateHref()">добавить автомобиль</b-link></b-col>
        </b-row>

         <b-row align-v="center" no-gutters class="menu-item">
          <b-col cols="auto"><icon-password></icon-password></b-col>
          <b-col><b-link to="/update-password/">Изменить пароль</b-link></b-col>
        </b-row>

        <b-row align-v="center" no-gutters class="menu-item">
          <b-col cols="auto"><icon-logout></icon-logout></b-col>
          <b-col><b-link to="/logout/">Выход</b-link></b-col>
        </b-row>

        <hr>

        <!--
        <b-row align-v="center" no-gutters class="menu-item">
          <b-col cols="auto"><icon-logout></icon-logout></b-col>
          <b-col><b-link to="/feedback/">Обратная связь</b-link></b-col>
        </b-row>
        -->

        <b-row align-v="center" no-gutters class="menu-item">
          <b-col cols="auto"><icon-logout></icon-logout></b-col>
          <b-col><b-link to="/logout/">О проекте</b-link></b-col>
        </b-row>
        
      </b-container>

      <b-container v-else>
        <b-row align-v="center" no-gutters class="menu-item">
          <b-col cols="auto"><icon-login></icon-login></b-col>
          <b-col><b-link to="/login/">Вход</b-link></b-col>
        </b-row>
        
        <b-row align-v="center" no-gutters class="menu-item">
          <b-col cols="auto"><icon-register></icon-register></b-col>
          <b-col>
            <b-link to="/register/">Регистрация</b-link>
          </b-col>
        </b-row>
      </b-container>

    </b-sidebar>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  import { vehicleTitle, vehicleRetrieveHref, vehicleCreateHref } from '@/helpers/vehicle'

  import IconMenu from 'vue-material-design-icons/Menu.vue'
  import IconClose from 'vue-material-design-icons/Close.vue'
  
  import IconLogin from 'vue-material-design-icons/LoginVariant.vue'
  import IconRegister from 'vue-material-design-icons/AccountPlus.vue'
  import IconLogout from 'vue-material-design-icons/LogoutVariant.vue'

  import IconPlus from 'vue-material-design-icons/Plus.vue'
  import IconPassword from 'vue-material-design-icons/LockOutline.vue'
  import IconProfile from 'vue-material-design-icons/AccountCircleOutline.vue'

  import IconVehicle0 from 'vue-material-design-icons/CarSide.vue'
  import IconVehicle1 from 'vue-material-design-icons/CarPickup.vue'
  import IconVehicle2 from 'vue-material-design-icons/CarSports.vue'
  import IconVehicle3 from 'vue-material-design-icons/CarConvertible.vue'
  import IconVehicle4 from 'vue-material-design-icons/CarHatchback.vue'
  import IconVehicle5 from 'vue-material-design-icons/BabyCarriage.vue'
  
  export default {
    name: 'an-header',
    
    components: {
      IconMenu, IconClose, IconProfile,
      IconVehicle0, IconVehicle1, IconVehicle2, IconVehicle3, IconVehicle4, IconVehicle5, 
      IconPlus, IconLogout, 
      IconLogin, IconRegister, IconPassword,
    },

    data () {
      return {
        sidebarVisiblity: false
      }
    },

    methods: {
      vehicleCreateHref,
      vehicleRetrieveHref,
      vehicleTitle,
    },

    computed: mapState({
      user: state => state.auth.user,
      vehicles: state => state.vehicles.vehicles
    }),
  }
</script>

<style lang="scss">
  @import '@/assets/colors.scss';

  header {

    h1 {
      margin: -0.2rem 0 0 15px;
      text-transform: lowercase;
      font-size: 1.4rem;
    }
    
    .topnav {
      background-color: $primary-color;
      color: $body-color-invert;
      padding: 10px 0;
    }

    .b-sidebar {
      hr {
        margin: 1.5rem 0;
      }

      .menu-item { 
        margin-bottom: 1rem;

        a {
          text-transform: lowercase;
          text-decoration: none !important;

          &.router-link-exact-active {
            color: $body-color;
          }
        }

        .material-design-icon {
          margin-right: 15px;
        }

      }
      
    }
  }
</style>
