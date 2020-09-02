var mysql = require("mysql");
var express = require("express");
require("dotenv").config();
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_NAME
})
var app = new express();
app.set('view engine', 'ejs');

app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

con.connect(err => {
    if(err) throw err;

    app.get('/', (req,res) => {
        con.query("SELECT * FROM list", (err,result,field) => {
            res.render('index',{data: {data:result}});
        })
    });

    app.post('/', (req,res) => {
        if(req.body.todo.length == 0) {
            res.send(false);
            res.end();
        } else {
            con.query(`INSERT INTO list VALUES(null,'${req.body.todo}')`,(err,result) => {
                if(err) throw err;
                res.send(result);
                res.end();
            });
        }
    })

    app.delete('/:act', (req,res) => {
        let act = req.params.act;
        con.query(`DELETE FROM list WHERE id = ${act} `, (err,result) => {
            res.send(true);
        })
    })

    app.listen(process.env.PORT);
})



