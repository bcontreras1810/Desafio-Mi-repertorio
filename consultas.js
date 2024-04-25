const pool = require("./dbconfig")

//Crear una función asíncrona llamada “insertar” que reciba un parámetro “datos”. El cual será un arreglo enviado desde el servidor.
const insertar = async (datos) => {
    //Paso 3: Realizar una consulta parametrizada con un JSON como argumento definiendo como “values” el parámetro “datos” de la función y retornando el objeto “result”.
    const consulta = {
        text: "INSERT INTO canciones (titulo , artista, tono) VALUES ($1, $2, $3)",
        values: datos,
    };
    const result = await pool.query(consulta);
    return result;
}

//Crear una función asíncrona llamada “consultar”.
const consultar = async () => {
    // Paso 2: Generar una consulta SQL que solicite todos los registros de la tabla canciones.
    const result = await pool.query("SELECT * FROM canciones")
    return result.rows;
};

//Crear una función asíncrona llamada editar que reciba como parámetros los datos.
const editar = async (id, titulo, artista, tono) => {
    //Paso 2: Preparar un objeto para hacer una consulta parametrizada, que actualice un registro utilizando el nombre como identificador en el comando “WHERE”. La propiedad “values” de este objeto debe ser igual al parámetro “datos”.
    const consulta = {
        text: "UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *",
        values: [id, titulo, artista, tono,],
    };
    const result = await pool.query(consulta);
    return result;
};

// Crear una función asíncrona llamada “eliminar” que reciba un parámetro llamado “nombre”.
const eliminar = async (id) => {
    // Paso 2: Realizar una consulta SQL que tenga por interpolación el parámetro titulo para eliminar el registro de un ejercicio.
    const result = await pool.query(`DELETE FROM canciones WHERE id = $1`, [id]);
    return result.rows;
};

//Exportar las funciones creadas
module.exports = { insertar, consultar, editar, eliminar };