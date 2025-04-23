const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados"
});

db.connect((err) => {
    if (err) {
        console.error("Error de conexión: ", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

app.post('/create',(req,res)=>{
    const nombre=req.body.nombre;
    const edad=req.body.edad;
    const pais=req.body.pais;
    const cargo=req.body.cargo;
    const anos=req.body.anos;
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anos) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anos],(err,result)=>{
        if (err) {
            console.error("Error al insertar:", err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.get('/empleados',(req,res)=>{
    db.query('SELECT * FROM empleados',(err,result)=>{
        if (err) {
            console.error("Error al insertar:", err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.put('/update',(req,res)=>{
    const id=req.body.id;
    const nombre=req.body.nombre;
    const edad=req.body.edad;
    const pais=req.body.pais;
    const cargo=req.body.cargo;
    const anos=req.body.anos;
    db.query('UPDATE  empleados  SET nombre=?,edad=?,pais=?,cargo=?,anos=? WHERE id=?',[nombre,edad,pais,cargo,anos,id],
        (err,result)=>{
            if (err){
                console.log(err);

            }else{
                res.send(result);
            }
        }
    );
});


app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;

    db.query('DELETE FROM empleados WHERE id=?', [id], (err, result) => {
            if (err){
                console.log(err);

            }else{
                res.json({ mensaje: "Empleado eliminado correctamente" });

            }
        }
    );
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});     

