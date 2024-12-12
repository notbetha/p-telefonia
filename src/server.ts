import express from 'express';
import bodyParser from 'body-parser';
import loginRouter from './modules/auth/auth.routes';

const app = express();
app.use(bodyParser.json());

// Usa el router para el login
app.use('/login', loginRouter);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
