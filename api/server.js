//require e' una funzione di Node.js per importare moduli
//module.exports permette di esportare moduli

//per usare il file di config basta questa dichiarazione all'inizio del file principale
require("dotenv").config({ path: "./config.env" });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

//collega mongoose a mongo
connectDB();

const app = express();

//middleware per usare i dati nel body delle richieste
app.use(bodyParser.json());
app.use(cors());

//redirect verso routers
app.use("/api/auth", require("./routers/auth")); //tutte le richieste ad /api/auth vengono mandate a /routers/auth
app.use("/api/users", require("./routers/users"));

//L'errorHandler deve essere l'ultimo middleware
app.use(errorHandler);

//se e' definita nel config file prendiamo quella porta altrimenti la 8000
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    var ifs = require("os").networkInterfaces();
    var result = Object.keys(ifs)
        .map((x) => [x, ifs[x].filter((x) => x.family === "IPv4")[0]])
        .filter((x) => x[1])
        .map((x) => x[1].address);
    console.log(result);
    console.log(`Server running ${PORT}`);
    console.log(`Try one of these addresses: ${result.join(", ")}`);
});

//funzione per uccidere "gentilmente" il server senza crash
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged: ${err}`);
    //chiude tutte le connessioni e poi uccide il processo
    server.close(() => process.exit(1));
});
