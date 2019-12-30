//configuracion de mi servidor  a donde van a enlaar las vistas es el archivo de configuariocn mas inportante

//importar express
const express = require('express')
const routes = require('./routes')
const path=require('path')
const bodyParser=require('body-parser')
const configs=require('./config')
const db=require('./config/database')

require('dotenv').config({ path: 'variables.env'})

db.authenticate()
    .then(()=> console.log('db conectada'))
    .catch(error => console.log(error))

//Configurar expres
const app = express()

//habilitar pug
app.set('view engine', 'pug')

//añadir las vistas
app.set('views', path.join(__dirname, './views'))

//cargar carpeta statica llamada public
app.use(express.static('public'))

//validar si estamos en desarrollo o producion
const config=configs[app.get('env')]

//creamos la variable para el sitio web
app.locals.titulo=config.nombresitio

//muestra el año actual
app.use((req, res, next)=>{
    const fecha=new Date()
    res.locals.fechaActual=fecha.getFullYear()
    res.locals.ruta=req.path  
       
    
    return next()
})
//ejecutamos el bodyparse
app.use(bodyParser.urlencoded({extended:true}))

//cargar rutas
app.use('/', routes())

/*puerto y hot para la app */
const host=process.env.HOST || '0.0.0.0'
const port=process.env.PORT || 3000

app.listen(port, host, ()=>{
    console.log('el servidor esta funcionando');
    
})

