'use strict';


module.exports = (sequelize, DataTypes) => {
    let alias = 'Usuarios';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombre: {
            type: DataTypes.STRING(64),
            notNul : true
        },
       
        email: {
            type: DataTypes.STRING(128),
            notNull: true,
            //unique :true     <----------- ver como manejar este error
        },
        clave: {
		    type: DataTypes.STRING(255),
	   	    notNull: true
	    },
        rol: {
            type: DataTypes.STRING(25),
        },
       
        };
    let config = {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName : "usuarios"
    }
    const usuario = sequelize.define(alias, cols, config); 

    

    return usuario
};
