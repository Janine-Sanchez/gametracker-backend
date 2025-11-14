// Importando las dependencias necesarias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');


// Cargar variables de entorno desde .env
dotenv.config();

// Crear la aplicación de Express
const app = express();
app.use(express.json());  // Middleware para parsear el cuerpo de las peticiones como JSON
app.use(cors());

// Registrar las rutas de usuarios y juegos
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes); 


// Conectar a MongoDB
const connectDB = async () => {
    try {
        // Conectando a la base de datos usando la URL que está en el archivo .env
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error en la conexión a MongoDB:', error.message);
        process.exit(1);  // Salir si hay un error en la conexión
    }
};

// Llamar a la función de conexión
connectDB();

// Rutas básicas (por ahora podemos dejarlo vacío o agregar un endpoint de prueba)
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



