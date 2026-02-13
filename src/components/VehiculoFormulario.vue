<template>
  <div class="vehiculo-container">
    <div class="vehiculo-card">
      <h1 class="titulo">VEHICULO</h1>
      
      <div class="form-group">
        <label for="token" class="label">Token</label>
        <textarea 
          id="token"
          v-model="formulario.token" 
          placeholder="Pegue el token aquí"
          class="textarea-field"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="marca" class="label">Marca</label>
        <input 
          id="marca"
          v-model="formulario.marca" 
          type="text" 
          placeholder="Ej: Toyota"
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="modelo" class="label">Modelo</label>
        <input 
          id="modelo"
          v-model="formulario.modelo" 
          type="text" 
          placeholder="Ej: Corolla"
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="chasis" class="label">Chasis</label>
        <input 
          id="chasis"
          v-model="formulario.chasis" 
          type="text" 
          placeholder="Número de chasis"
          class="input-field"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="fechaMatricula" class="label">Fecha de matrícula</label>
          <input 
            id="fechaMatricula"
            v-model="formulario.fechaMatricula" 
            type="date" 
            class="input-field date-input"
          />
        </div>

        <div class="form-group">
          <label for="fechaFabricacion" class="label">Fecha de fabricación</label>
          <input 
            id="fechaFabricacion"
            v-model="formulario.fechaFabricacion" 
            type="date" 
            class="input-field date-input"
          />
        </div>
      </div>

      <button 
        @click="guardarVehiculo"
        class="btn-guardar"
      >
        Guardar
      </button>
    </div>
  </div>
</template>

<script>
import { fachadaGuardar } from '@/clients/VehiculoClient';

export default {
  name: 'VehiculoFormulario',
  data() {
    return {
      formulario: {
        token: '',
        marca: '',
        modelo: '',
        chasis: '',
        fechaMatricula: '',
        fechaFabricacion: ''
      }
    };
  },
  methods: {
    async guardarVehiculo() {
      if (!this.validarFormulario()) {
        return;
      }

      const datosVehiculo = {
        marca: this.formulario.marca,
        modelo: this.formulario.modelo,
        chasis: this.formulario.chasis,
        fechaMatricula: this.formulario.fechaMatricula,
        fechaFabricacion: this.formulario.fechaFabricacion
      };

      localStorage.setItem('token', this.formulario.token);
      
      const respuesta = await fachadaGuardar(datosVehiculo);
      console.log('Vehículo guardado:', respuesta);
      
      this.$emit('vehiculo-guardado', {
        ...datosVehiculo,
        id: respuesta.id || Date.now()
      });
      
      this.limpiarFormulario();
    },
    validarFormulario() {
      if (!this.formulario.token.trim()) return false;
      if (!this.formulario.marca.trim()) return false;
      if (!this.formulario.modelo.trim()) return false;
      if (!this.formulario.chasis.trim()) return false;
      if (!this.formulario.fechaMatricula) return false;
      if (!this.formulario.fechaFabricacion) return false;
      return true;
    },
    limpiarFormulario() {
      this.formulario.marca = '';
      this.formulario.modelo = '';
      this.formulario.chasis = '';
      this.formulario.fechaMatricula = '';
      this.formulario.fechaFabricacion = '';
    }
  }
}
</script>

<style scoped>
.vehiculo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.vehiculo-card {
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
}

.titulo {
  text-align: center;
  color: #1e3a8a;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.form-group {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-row .form-group {
  margin-bottom: 0;
}

.label {
  color: #1e3a8a;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
}

.input-field,
.textarea-field {
  border: 2px solid #c0c0c0;
  border-radius: 6px;
  padding: 12px 15px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  transition: border-color 0.3s ease;
}

.input-field:focus,
.textarea-field:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 5px rgba(30, 58, 138, 0.3);
}

.textarea-field {
  resize: vertical;
  min-height: 80px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  word-break: break-all;
}

.date-input {
  cursor: pointer;
}

.btn-guardar {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #0085d9 0%, #0066b3 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-guardar:hover {
  background: linear-gradient(135deg, #0066b3 0%, #005299 100%);
  box-shadow: 0 5px 20px rgba(0, 133, 217, 0.4);
  transform: translateY(-2px);
}

.btn-guardar:active {
  transform: translateY(0);
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>