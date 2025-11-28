require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const powerRoutes = require('./routes/powerRoutes');
const heroRoutes = require('./routes/heroRoutes');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// rotas
app.use('/api/powers', powerRoutes);
app.use('/api/heroes', heroRoutes);

// rota raiz simples
app.get('/', (req, res) => res.json({ message: 'Heroes API OK' }));

// conectar MongoDB e iniciar server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heroesdb';

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
});
