<template>
  <div id="app">
    <header class="row-s header primary">
      <div class="col xs-24">
        <h1 class="header__title">Generador de horarios</h1>
      </div>
    </header>
    <!-- <div id="nav" class="print-hide">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/editor">Editor</router-link> |
      <router-link to="/editor/5">Editor x</router-link> |
      <router-link to="/editor/slK1s6f48oSx">Editor ok</router-link>
    </div> -->
    <router-view/>
    <custom-footer/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import Footer from '@/components/Footer'

export default {
  components: {
    'custom-footer': Footer
  },
  watch: {
    '$route' (to) {
      let hash = to.hash.trim().substr(1)
      if(hash != ''){
        this.$router.push(`/editor/${ hash }`)
      }
    }
  }
}
</script>