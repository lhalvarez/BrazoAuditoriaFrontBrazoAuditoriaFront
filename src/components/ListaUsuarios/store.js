import {createStore} from 'redux'


const initialState = {
  usuarios: []
};

const reducer = (state, action ) =>{

  switch (action.type) {
    case 'CONSULTA_TODOS_USUARIOS': {

      console.log("Estoy apunto de lanzar la peticion",'http://localhost:3000/api/usuarios/usuarios');

      fetch('http://localhost:3000/api/usuarios/usuarios') // Call the fetch function passing the url of the API as a parameter
        .then(results => {

          console.log("YA llegaron con la data", data);
          // Your code for handling the data you get from the API
          return{
            ...state,
            usuarios: results.json
          };
        })
        .catch(function(error) {
            return{
              ...state,
              usuarios: []
            };
        });

    }

    case 'CONSULTA_USUARIO': {
     // const { payload: { response = [] } } = action;

      return{
        usuario: ''
      };
    }

    default:
      return state;
  }

}

export default createStore(reducer, initialState)
