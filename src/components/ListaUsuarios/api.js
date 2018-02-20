// Constants
import { API } from '../../constants/api';

// Utils
import { apiFetch } from '../../lib/utils/api';

class UsuariosApi {

  static getAllUsuarios(query) {
    return apiFetch(API.USUARIOS.usuarios, {}, query);
  }

  static getUsuario(query) {
    return apiFetch(API.USUARIOS.usuario, {}, query);
  }

}

export default UsuariosApi;
