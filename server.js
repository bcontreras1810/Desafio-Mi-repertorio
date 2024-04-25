const express = require("express");
const app = express();
//Paso 1: Importar la función ingresar en el script del servidor
const { insertar, consultar, editar, eliminar } = require("./consultas")

//Paso 2: Declarar el middleware que permita recibir payloads en las rutas del servidor.
app.use(express.json())

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//Paso 3: Crear una ruta POST /cancion
app.post("/cancion", async (req, res) => {
    try {
        //Paso 4: Utiliza el Object.values() para almacenar en un arreglo el objeto recibido en el cuerpo de la consulta
        const datos = Object.values(req.body)
        //Paso 5: Utiliza la función ingresar y devuelve la respuesta a la aplicación cliente.
        const respuesta = await insertar(datos)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Error al agregar cancion :/")
    }  
})

app.get("/canciones", async (req, res) => {
    try {
        const registros = await consultar();
        res.json(registros)
    } catch (error) {
        res.status(500).send("Error al consultar canciones")
    }
})

app.put("/cancion/:id", async(req, res) =>{
    try {
        const id = req.params.id
        const { titulo, artista, tono } = req.body;
        const resultado = await editar(id, titulo, artista, tono)
        res.json(resultado)
    } catch (error) {
        res.status(500).json("Error al editar la cancion ");
    }
});

app.delete("/cancion", async (req, res) => {
    try {
        const { id } = req.query
        const respuesta = await eliminar(id)
        res.json(respuesta)
    } catch (error) {
        res.status(500).json("Error al borrar la cancion");
    }
})

//Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor.
app.get("*", (req, res) => {
    //
    res.send("Esta página no existe");
});

app.listen(3000, console.log("Server ON"))