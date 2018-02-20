// Dependencies
import express from 'express';

// Data
import usuarios from '../../data/usuario.json';

// Express Router
const Router = express.Router();

Router.get('/usuarios', (req, res, next) => {
  res.json(usuarios);
});

Router.get('/usuario', (req, res, next) => {
  const {
    query: {
      id = 0
    }
  } = req;

  const selectedBook = usuarios.response.filter(book => book.id === Number(id));

  res.json({
    response: selectedBook
  });

});

export default Router;
