<template>
  <div class="token-container">
    <div class="token-card">
      <h1 class="titulo">TOKEN</h1>
      
      <div class="form-group">
        <label for="usuario" class="label">Usuario</label>
        <input 
          id="usuario"
          v-model="formulario.usuario" 
          type="text" 
          placeholder="Ingrese usuario"
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="password" class="label">Password</label>
        <input 
          id="password"
          v-model="formulario.password" 
          type="password" 
          placeholder="Ingrese password"
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="rol" class="label">Rol</label>
        <input 
          id="rol"
          v-model="formulario.rol" 
          type="text" 
          placeholder="Ingrese rol"
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="token" class="label">Token</label>
        <textarea 
          id="token"
          v-model="formulario.token" 
          placeholder="Token será mostrado aquí"
          class="textarea-field"
          readonly
        ></textarea>
      </div>

      <button 
        @click="generarToken"
        class="btn-generar"
      >
        Generar
      </button>
    </div>
  </div>
</template>

<script>
import { getTokenFachada } from '@/clients/AuthorizationClient';

export default {
  name: 'TokenComponent',
  data() {
    return {
      formulario: {
        usuario: '',
        password: '',
        rol: '',
        token: ''
      }
    };
  },
  methods: {
    async generarToken() {
      if (!this.validarFormulario()) {
        console.warn('Por favor complete todos los campos');
        return;
      }

      try {
        const response = await getTokenFachada(
          this.formulario.usuario,
          this.formulario.password,
          this.formulario.rol
        );
        
        // El backend devuelve un objeto TokenResponse con accessToken
        this.formulario.token = response.accessToken || response;
        
        // Guardar el token en localStorage para usarlo en otras páginas
        localStorage.setItem('token', this.formulario.token);
        
        console.log('Token generado exitosamente');
      } catch (error) {
        console.error('Error al generar token:', error.response?.data?.error || 'Credenciales inválidas');
      }
    },
    validarFormulario() {
      if (!this.formulario.usuario.trim()) return false;
      if (!this.formulario.password.trim()) return false;
      if (!this.formulario.rol.trim()) return false;
      return true;
    }
  }
}
</script>

<style scoped>
.token-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.token-card {
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
}

.titulo {
  text-align: center;
  color: #0085d9;
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

.label {
  color: #0085d9;
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
  border-color: #0085d9;
  box-shadow: 0 0 5px rgba(0, 133, 217, 0.3);
}

.textarea-field {
  resize: vertical;
  min-height: 100px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  word-break: break-all;
}

.textarea-field:readonly {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.btn-generar {
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

.btn-generar:hover {
  background: linear-gradient(135deg, #0066b3 0%, #005299 100%);
  box-shadow: 0 5px 20px rgba(0, 133, 217, 0.4);
  transform: translateY(-2px);
}

.btn-generar:active {
  transform: translateY(0);
}
</style>