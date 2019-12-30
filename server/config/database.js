const Sequelize=require('sequelize')
require('dotenv').config({ path: 'variables.env'})


module.exports=new Sequelize(process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASS, {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:'mysql',
    define:{
        timestamps:false
    },
    poo:{
        max:5,
        min:0,
        acquire: 3000,
        idle:10000
    },
    operatorsAliases:false
})