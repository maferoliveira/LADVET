require("dotenv").config();

const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const usuarioroutes = require('./src/routes/usuario.routes');
app.use('/usuario', usuarioroutes);

const animalroutes = require('./src/routes/animal.routes');
app.use('/animal', animalroutes);

const adocaoroutes = require('./src/routes/adocao.routes');
app.use('/adocao', adocaoroutes);


app.listen(process.env.PORT_APP, ()=>{
    console.log("Online na porta "+ process.env.PORT_APP)
})