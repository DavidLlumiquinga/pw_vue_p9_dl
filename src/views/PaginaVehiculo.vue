<template>
  <div class="pagina-vehiculo">
    <div class="contenedor">
      <div class="secciones">
        <!-- Sección Formulario -->
        <div class="seccion-formulario">
          <VehiculoFormulario 
            @vehiculo-guardado="agregarVehiculo"
          />
        </div>

        <!-- Sección Tabla -->
        <div class="seccion-tabla">
          <VehiculoTabla 
            :vehiculos="vehiculos"
            :token="tokenActual"
            @vehiculo-eliminado="eliminarVehiculo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VehiculoFormulario from '@/components/VehiculoFormulario.vue';
import VehiculoTabla from '@/components/VehiculoTabla.vue';
import { fachadaSeleccionarTodos } from '@/clients/VehiculoClient';

export default {
  name: 'PaginaVehiculo',
  components: {
    VehiculoFormulario,
    VehiculoTabla
  },
  data() {
    return {
      vehiculos: [],
      tokenActual: '',
      cargandoInicial: false,
      error: ''
    };
  },
  mounted() {
    this.cargarVehiculos();
  },
  methods: {
    async cargarVehiculos() {
      this.cargandoInicial = true;
      this.error = '';

      try {
        const respuesta = await fachadaSeleccionarTodos();
        this.vehiculos = respuesta || [];
        console.log('✅ Vehículos cargados:', this.vehiculos);
      } catch (error) {
        console.error('❌ Error al cargar vehículos:', error);
        this.error = 'No se pudo conectar con el servidor. Asegúrate de que el API esté corriendo.';
        this.vehiculos = [];
      } finally {
        this.cargandoInicial = false;
      }
    },
    async agregarVehiculo(nuevoVehiculo) {
      console.log('📝 Vehículo guardado recibido:', nuevoVehiculo);
      
      // Recargar la lista completa desde el servidor para asegurar sincronización
      await this.cargarVehiculos();
      
      console.log('📊 Total de vehículos después de guardar:', this.vehiculos.length);
    },
    async eliminarVehiculo(indice) {
      console.log('🗑️ Eliminando vehículo en índice:', indice);
      
      // Recargar la lista completa después de eliminar
      await this.cargarVehiculos();
      
      console.log('📊 Total de vehículos después de eliminar:', this.vehiculos.length);
    }
  }
}
</script>

<style scoped>
.pagina-vehiculo {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 30px 20px;
}

.contenedor {
  max-width: 1200px;
  margin: 0 auto;
}

.secciones {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: flex-start;
}

.seccion-formulario {
  display: flex;
  justify-content: center;
}

.seccion-tabla {
  display: flex;
  flex-direction: column;
}

@media (max-width: 1024px) {
  .secciones {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .pagina-vehiculo {
    padding: 20px 15px;
  }

  .secciones {
    gap: 30px;
  }
}
</style>