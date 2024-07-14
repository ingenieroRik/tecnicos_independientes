
const path = require("path");
const { json } = require("express");

//const fs = require("fs");

//const fotosFilePath = path.join(__dirname, "../data/db_fotos.json");
//const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));

/* Requerimos propiedad validationResult para poder validar campos de form */
const {validationResult, body} = require('express-validator');


/* BASE DE DATOS */
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Fallas = db.Fallas



const adminControllers = {
   
    admin: (req,res) => res.render( 'create.ejs'),

/* ****************************************************************************************************************************** */
    verlistaJSON: (req,res) => res.render("pages/lista-fotos.ejs", { fotos : db_fotos }),

/* ****************************************************************************************************************************** */
    verlista: async (req, res) => {
      try { 
      var fallasTodas =  await db.Fallas.findAll();
      return res.render("pages/lista-fotos.ejs", {
        fotos: fallasTodas,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    },


/* ********************************************************************************************************************************** */
    edicionFalla: (req, res) => {
     
      const id = req.params.id;
      //console.log(req.params);
      console.log(id);
      const foto = db_fotos.find((prod) => {
        return prod.id == id;
      });
  
      res.render("./pages/edicionFoto.ejs", { foto: foto });
  
    },
/* ********************************************************************************************************************************* */
      procesoEdicion: (req, res) => {
      //const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
      const id = req.params.id;
      const fotoIndex = db_fotos.findIndex((foto) => foto.id == id);

      if (fotoIndex !== -1) {
          const foto = db_fotos[fotoIndex];
          foto.marca = req.body.marca || foto.marca;
          foto.modelo = req.body.modelo || foto.modelo;
          foto.falla = req.body.falla || foto.falla;
          foto.solucion = req.body.solucion || foto.solucion;
          foto.fecha = req.body.fecha || foto.fecha;

         

          fs.writeFileSync(fotosFilePath, JSON.stringify(db_fotos, null, 2));
          res.redirect("/verlista");
      } else {
          res.status(404).send("Foto no encontrada");
      }
    },

/* *************************************************************************************************************************************** */

    delete: (req, res) => {
      let id = req.params.id;
      const fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
  
      let fotosFiltradas = fotos.filter((foto) => {
        return foto.id != id;
      });
  
      fs.writeFileSync(
        fotosFilePath,
        JSON.stringify(fotosFiltradas, null, " ")
      );
      res.render("pages/lista-fotos.ejs", { fotos : fotosFiltradas });
    },
  

/* ********************************************************************************************************************************************* */
    creacionFalla: (req, res) => {
      return res.render("pages/creacionFoto.ejs");
    },


/* *********************************************************************************************************************************************** */
    procesoCreacionJSON: (req, res) => {
      const fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));

      let errors = validationResult(req);
      
      if(errors.isEmpty()) {
          let newId = fotos.length > 0 ? fotos[fotos.length - 1].id + 1 : 1; // Obtener el último ID y sumarle 1
          let fotoNueva = {
              id: newId,
              marca: req.body.marca,   
              modelo: req.body.modelo,
              falla: req.body.falla,
              solucion: req.body.solucion,
              fecha: req.body.fecha,
          };
          // Agregar la nueva foto al array de fotos
          db_fotos.push(fotoNueva);
          // Sobreescribir el archivo JSON con la nueva foto
          fs.writeFileSync(fotosFilePath, JSON.stringify(db_fotos, null, " "));
          res.render("pages/lista-fotos.ejs", { fotos: db_fotos });
          
      } else {
          return res.render("pages/creacionFoto.ejs", {
              errors: errors.array(),
              old: req.body
          });
      }
  },

  /* ****************************************************************************************************************************************************** */
      procesoCreacion: async (req, res) => {
        try {
    
        let errors = validationResult(req);

        var fallasTodas =  await db.Fallas.findAll();

        const email = req.session.usuarioLogueado.email;
        console.log(email);


        if(errors.isEmpty()){
                await db.Fallas.create({
                      marca: req.body.marca,
                      modelo: req.body.modelo,
                      falla: req.body.falla,
                      solucion: req.body.solucion,
                      fecha: req.body.fecha,
                      email: email,
        })
        
        res.redirect('/verlista');
        
        } else {      
        return res.render("./productos/creacionProduct", 
          {errors: errors.array(),
          old: req.body })
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
      },


}

module.exports = adminControllers;