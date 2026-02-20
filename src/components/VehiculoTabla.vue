<template>
  <div class="tabla-container">
    <div class="tabla-card">
      <h2 class="titulo">Vehículos Guardados</h2>
      
      <div v-if="vehiculos.length === 0" class="sin-datos">
        No hay vehículos registrados
      </div>

      <div v-else class="tabla-wrapper">
        <table class="tabla-vehiculos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Chasis</th>
              <th>Fecha matrícula</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vehiculo, index) in vehiculos" :key="vehiculo.id || index">
              <td>{{ vehiculo.id || index + 1 }}</td>
              <td>{{ vehiculo.marca }}</td>
              <td>{{ vehiculo.modelo }}</td>
              <td>{{ vehiculo.chasis }}</td>
              <td>{{ formatoFecha(vehiculo.fechaMatricula) }}</td>
              <td>
                <button 
                  @click="borrarVehiculo(index)"
                  class="btn-borrar"
                  :disabled="cargandoBorrar[index]"
                >
                  {{ cargandoBorrar[index] ? 'Borrando...' : 'Borrar' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="errorBorrar" class="error-message">
        {{ errorBorrar }}
      </div>
    </div>
  </div>
</template>

<script>
import { fachadaEliminar } from '@/clients/VehiculoClient';

export default {
  name: 'VehiculoTabla',
  props: {
    vehiculos: {
      type: Array,
      required: true,
      default: () => []
    },
    token: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      cargandoBorrar: {},
      errorBorrar: ''
    };
  },
  methods: {
    async borrarVehiculo(index) {
      const vehiculo = this.vehiculos[index];
      
      this.cargandoBorrar[index] = true;
      this.errorBorrar = '';

      try {
        const token = this.token || localStorage.getItem('token');
        
        if (vehiculo.id && token) {
          // Si tenemos el vehículo con ID, hacemos la eliminación en la API
          await fachadaEliminar(vehiculo.id);
        }

        // Emitimos el evento para que el padre actualice la lista
        this.$emit('vehiculo-eliminado', index);
        
        console.log('Vehiculo eliminado exitosamente');
      } catch (error) {
        this.errorBorrar = 'Error al borrar el vehiculo: ' + (error.response?.data?.message || error.message);
        console.error('Error al borrar:', this.errorBorrar);
      } finally {
        this.cargandoBorrar[index] = false;
      }
    },
    formatoFecha(fecha) {
      if (!fecha) return '---';
      try {
        // Si la fecha viene en formato LocalDateTime (2024-01-15T00:00:00)
        // la convertimos a un formato legible
        const date = new Date(fecha);
        if (isNaN(date.getTime())) {
          return fecha;
        }
        return date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch (e) {
        return fecha;
      }
    }
  }
}
</script>

<style scoped>
.tabla-container {
  padding: 20px;
}

.tabla-card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.titulo {
  color: #1e3a8a;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 15px;
}

.sin-datos {
  text-align: center;
  color: #999;
  padding: 40px 20px;
  font-size: 16px;
}

.tabla-wrapper {
  overflow-x: auto;
}

.tabla-vehiculos {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.tabla-vehiculos thead {
  background-color: #f5f5f5;
}

.tabla-vehiculos th {
  padding: 15px 12px;
  text-align: left;
  color: #1e3a8a;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
  background-color: #e8eef7;
}

.tabla-vehiculos td {
  padding: 15px 12px;
  border-bottom: 1px solid #e0e0e0;
}

.tabla-vehiculos tbody tr:hover {
  background-color: #f9f9f9;
}

.tabla-vehiculos tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.btn-borrar {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-borrar:hover:not(:disabled) {
  background-color: #c82333;
  box-shadow: 0 3px 10px rgba(220, 53, 69, 0.3);
  transform: translateY(-1px);
}

.btn-borrar:active:not(:disabled) {
  transform: translateY(0);
}

.btn-borrar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 6px;
  margin-top: 15px;
  font-size: 13px;
  border-left: 4px solid #c62828;
}

@media (max-width: 768px) {
  .tabla-vehiculos {
    font-size: 12px;
  }

  .tabla-vehiculos th,
  .tabla-vehiculos td {
    padding: 10px 8px;
  }

  .btn-borrar {
    padding: 6px 10px;
    font-size: 10px;
  }
}
</style>