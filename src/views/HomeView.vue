<template>
  <div class="home">
    <div class="welcome-container">
      <h1>Bienvenido al Sistema de Gestión de Vehículos</h1>
      <p>Selecciona una opción del menú para comenzar</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.welcome-container {
  text-align: center;
  padding: 40px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

p {
  color: #666;
  font-size: 18px;
}
</style>
