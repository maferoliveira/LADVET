require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: true,
    credentials: true
}));

const usuarioroutes = require("./src/routes/usuario.routes");
const animalroutes = require("./src/routes/animal.routes");
const adocaoroutes = require("./src/routes/adocao.routes");
const vacinaroutes = require("./src/routes/vacina.routes");

app.use("/usuario", usuarioroutes);
app.use("/animal", animalroutes);
app.use("/adocao", adocaoroutes);
app.use("/vacina", vacinaroutes);

app.get("/", (req, res) => {
    res.json({ msg: "API LADVET online" });
});

app.listen(process.env.PORT_APP || 3000, () => {
    console.log("Online na porta " + (process.env.PORT_APP || 3000));
});
