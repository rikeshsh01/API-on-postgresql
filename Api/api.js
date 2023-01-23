const { Pool } = require('pg')
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: process.env.password,
    port: 5432
});


// Create Test

const createTest = (req,res)=>{
    const {name, email } = req.body;
    pool.query('INSERT INTO tests (name,email) VALUES ($1,$2) RETURNING *', [name,email], (err,result)=>{
        if(err){
            console.log(err)
            throw err;
        }
        res.status(200).json({
            data:result.rows[0]
        })
    })

}

//Get All
const getAllTest = (req,res)=>{
    pool.query('SELECT * FROM tests', (err,result)=>{
        if(err){
            console.log(err)
            throw err;
        }
        res.status(200).json({
            data:result.rows
        })
    })

}

//Get By ID
const getTestById = (req,res)=>{
    let id = req.params.id;
    pool.query('SELECT * FROM tests WHERE id=$1',[id], (err,result)=>{
        if(err){
            console.log(err)
            throw err;
        }
        res.status(200).json({
            data:result.rows
        })
    })

}

//Update Test
const updateTest = (req,res)=>{
    let id = req.params.id;
    const {name,email} = req.body;
    pool.query('UPDATE tests SET name=$1, email=$2 WHERE id=$3',[name,email,id], (err,result)=>{
        if(err){
            console.log(err)
            throw err;
        }
        res.json({
            data:`Updated the test of id ${id}`
        })
    })

}

//Delete Test
const deleteTest = (req,res)=>{
    let id = req.params.id;
    pool.query('DELETE FROM tests WHERE id=$1',[id], (err,result)=>{
        if(err){
            console.log(err)
            throw err;
        }
        res.json({
            data:`Deleted the test id ${id}`
        })
    })

}

module.exports = {
    createTest,getAllTest,getTestById,updateTest,deleteTest

}
