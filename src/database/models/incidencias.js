'use strict';

module.exports = (sequelize, DataTypes) => {

let alias = "Fallas";
 let cols = {
    id: {type: DataTypes.INTEGER,
         autoIncrement : true,
         primaryKey : true,
         notNull : true,
         unique : true
    },

  
    marca: {type: DataTypes.STRING(25), notNull : true},
    modelo: {type: DataTypes.STRING(25), notNull : true },
    falla: {type: DataTypes.STRING(1024), notNull : true },
    solucion:{type: DataTypes.STRING(1024), notNull: true},
   
    fecha: {type: DataTypes.STRING(12), notNull : true},
    email: {type: DataTypes.STRING(255), notNull: true},
        };
 let config =  {
    tableName : 'fallas',
    timestamps : false
              }; 

    const fallas = sequelize.define(alias, cols, config);

   

 	return fallas;
};
