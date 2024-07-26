const path = require("path");
const { json } = require("express");
const { validationResult, body } = require('express-validator');
//const nodemailer = require('nodemailer');

const brevo = require('@getbrevo/brevo'); // para mandar emails transaccionales 

const bcryptjs = require('bcryptjs'); //<--- para encriptar/desencriptar la clave

const fs = require("fs");
const { name } = require("ejs");
//const fotosFilePath = path.join(__dirname, "../data/db_fotos.json");
//const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));

//const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
//const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));


/* BASE DE DATOS */
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
//const Fallas = db.Fallas


const mainControllers = {

        home: (req,res) => {

            return res.render("index.ejs"); 
        },
        
/* ************************************************************************************************************************** */
        fallasJSON: (req,res) => {
   
            return res.send(db_fotos);
        },

/* ***************************************************************************************************************************** */
        verFormulario : (req, res) => {
          return res.render ("pages/regUsuario.ejs");
      },
/* ************************************************************************************************* */
      crearUsuarioJSON: (req, res) => {
        //const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
          
        const resultadosValidacion = validationResult(req);
      
        if (resultadosValidacion.errors.length > 0) {
      
          return res.render("pages/regUsuario.ejs", { 
           
            errors: resultadosValidacion.mapped(),
            oldData: req.body
          });
        }
        
        //segundo  chequeamos que el usuario no exista, lo que no se debe repetir es el email
        for (let i = 0; i < usuariosJS.length; i++) {
          if (
            usuariosJS[i].email == req.body.email && usuariosJS[i].nombre == req.body.nombre) {

            return res.render("pages/regUsuario.ejs", { 
              errors:{ email: { msg: 'el usuario con este nombre y email ya existe'}},
              oldData: req.body } ) ; 
          }
        }
        // si esta todo bien creamos el nuevo usuario
        for (let i = 0; i < usuariosJS.length; i++) {
         
        if (req.body.clave == req.body.confirmarClave) {
          // si clave y confirmar clave coinciden creamos el nuevo usuario
          //let id=usuariosJS.length + 1;// el id sera +1 de la longuitud actual
          let id = usuariosJS[usuariosJS.length - 1].id + 1; // para que no se reipta  id al eliminar y agregar
      
          let user = {              
           id: id,
            nombre: req.body.nombre,           
            email: req.body.email,
            //clave: bcryptjs.hashSync (req.body.clave, 10),  // <------------ se encripta la clave
            clave: req.body.clave,
          };
      
          usuariosJS.push(user); // agrego el usuario creado en el archivo js
      
          let usuariosJSON = JSON.stringify(usuariosJS, null, " "); 
          //convierto el js en JSON
          fs.writeFileSync("src/data/usuarios.json", usuariosJSON, "utf-8");
           // vuelvo a crear el archivo JSON
          return res.render("pages/login.ejs", {error: "El usuario se creo correctamente, logueate" }
          );
           
      
        } else {
          return res.render("pages/regUsuario.ejs", 
            { error : "las claves no coinciden"  }) ; 
        }
      }

    },   
/* ************************************************************************************************************************ */
        crearUsuario: async (req, res) => {
         
          var usuarios = await db.Usuarios.findAll();
            
            const resultadosValidacion = validationResult(req);
          
            if (resultadosValidacion.errors.length > 0) {
          
              return res.render("pages/regUsuario.ejs", {              
                errors: resultadosValidacion.mapped(),
                oldData: req.body
              });
            }
            
              //primero chequeamos que el usuario no exista, no se debe repetir el email con el mismo nombre
              for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].email == req.body.email ) {
                  return res.render("pages/regUsuario.ejs", { 
                    errors:{ email: { msg: 'el usuario con este email ya existe'}},
                    oldData: req.body } ) ; 
                  
                }
              }
              if (req.body.clave == req.body.confirmarClave) {
                //<----- se crea el usuario

                db.Usuarios.create({
                  nombre : req.body.nombre,
                  email: req.body.email,
                  //clave: bcryptjs.hashSync(req.body.clave, 10), // <------------ se encripta la clave
                  clave: req.body.clave,
                })
                  .then(() => {
                   
                    return res.render("pages/login.ejs", {error: "El usuario se creo correctamente, logueate" }
                    );
                     
                  })
                  .catch((err) => {
                    res.send("el email ya existe");
                  });
              } else {
                return res.render("pages/regUsuario.ejs", 
                  { errors :{confirmarClave: {msg: "Las claves no coinciden"  }},}) ; 
              }
              

        },
        
  /* ********************************************************************************************************************** */
       
        verlogin: (req,res) => {  return res.render("pages/login.ejs", { error: null });  },
      
  /* *********************************************************************************************************************** */     
        logout:  (req,res) => {

            //console.log("se borra sesion " );
           res.clearCookie('usuarioEmail');
           //  otra forma de borrar la cookie
           //res.cookie('usuarioEmail', null, { maxAge: -1 });
           req.session.destroy();
            return res.redirect('/');
      },

/* ************************************************************************************************************************** */
        loginJSON: async (req,res) => {

            // en adminLogueado tengo los datos de la persona que se logueo con email y
            // contraseña, puede ser el administrador o un usuario, si es el administrador
            // va poder acceder a las paginas de edicion y creacion. En este caso si es un
            // usuario se queda en login y si no es ninguno, va al home

            //console.log (req.body);
                       
            const { email, clave } = req.body;

            if (!email || !clave) {
                return res.render("pages/login.ejs", { error: "Por favor, complete todos los campos." });
            }

            for (let i = 0; i < usuariosJS.length; i++) {            

              if ( usuariosJS[i].clave == clave  && usuariosJS[i].email == email) {

                const usuarioLogueado = req.body;
                req.session.usuarioLogueado=usuarioLogueado;
                
                return res.render('pages/lista-fotos.ejs', { fotos : db_fotos });             
              }
        
            else  {
                         
               return res.render("pages/login.ejs", { error: "Credenciales incorrectas. Por favor, intente de nuevo." });
          };
        
        }
    
      } ,
/* *************************************************************************************************************************** */
      login: async (req,res) => {

        // en adminLogueado tengo los datos de la persona que se logueo con email y
        // contraseña, puede ser el administrador o un usuario, si es el administrador
        // va poder acceder a las paginas de edicion y creacion. En este caso si es un
        // usuario se queda en login y si no es ninguno, va al home

        
        var fallasTodas =  await db.Fallas.findAll();
        //console.log (req.body);
                   
        const { email, clave } = req.body;

        if (!email || !clave) {
            return res.render("pages/login.ejs", { error: "Por favor, complete todos los campos." });
        }

        db.Usuarios.findOne({
          where : { email : req.body.email},  //<---- busco en la tabla usuarios si existe el mail que viene del body
          raw : true,      // <-------  se agrega para que no traiga todos los metadatos que no usamos
        }).then(usuario => {
            
          //console.log(usuario);
    
          if (usuario == null) {    // <--------- verificamos si encontro el usuario en la BD
            return res.render("pages/login.ejs", { error: "Credenciales incorrectas. Por favor, intente de nuevo." });
              
          }
          else if ( usuario.clave == clave  && usuario.email == email) {

            const usuarioLogueado = req.body;
            req.session.usuarioLogueado=usuarioLogueado;
            
            return res.render('pages/lista-fotos.ejs', { fotos : fallasTodas });             
          }
    
        else  {
                     
           return res.render("pages/login.ejs", { error: "Credenciales incorrectas. Por favor, intente de nuevo." });
      }
    
        })
   
  } ,
/* ******************************************************************************************************************* */
      olvidoClave : (req, res) => {

        return res.render("pages/formOlvidoClave.ejs");
          },


/* *************************************************************************************************************** */
          // con brevo
    enviarMail : async (req, res) => {

      const apiInstance = new brevo.TransactionalEmailsApi();
      const email = req.body.email;
      const nombre = req.body.nombre;
      const website = process.env.WEBSITE;

      //hay que chequear si existe este mail
      const usuarioOlvido = await db.Usuarios.findOne({
        where: { email: email },
        raw: true,
      });
      if (usuarioOlvido == null) {
      
        //console.log("el usuario no existe")
  
        return res.render("pages/formOlvidoClave.ejs"
        , {
          errors:{ pieError: { msg: 'El usuario: '+ email + "  , no esta registrado."}} 
          }
        );
      }

      apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.APIKEY 
      );

        try {
          const sendSmtpEmail = new brevo.SendSmtpEmail();

          sendSmtpEmail.subject = "Restablecimiento de contraseña de Técnicos Independientes";
          sendSmtpEmail.to = [
            { email: email, name: nombre },
          
          ];
          sendSmtpEmail.htmlContent = `<html><body><h1>Hola ${email}</h1><p>Esta es una notificación de su pedido de restablecimiento de clave, 
                                     sus credenciales fueron eliminadas, vuelva a registrarse con su correo y clave, por favor.
                                     </p><button>Click</button><a href=${website}>Go to my website</a></body></html>`;
          sendSmtpEmail.sender = {
            name: "Técnicos Independientes",
            email: "ingeniero_rik@hotmail.com",
          };

          const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

          //console.log(result);

          // aqui debemos hacer algo con este usuario
          // lo vamos a borrar para que se vuelva a registrar

          try {
           
            await db.Usuarios.destroy({ where: { email: email }, force: true });
            
          } catch (error) {
            return res.render("pages/formOlvidoClave.ejs", {
            
              errors: { pieError: { msg: "No se pudo restablecer contraseña" } },
            })
          }


          return res.render("pages/formMailEnviado.ejs", {
          
            errors: { pieForm: { msg: "El mail se envió correctamente" } },
          })
  
          } catch {
  
            return res.render("pages/formOlvidoClave.ejs", {
            
              errors: { pieError: { msg: "El mail no se pudo enviar" } },
            })
        }
   },
 /* *************************************************************************************************************** */
 // con nodemailer
  enviarMail2 : async (req, res) => {
    const email = req.body.email;
    const clave = 1111;
    //const mensaje1 = "Hola";

    console.log("entro a enviar mail a :" + email)
    // verificamos si el usuario existe

    /*
    const usuarioDevuelve = await db.Usuarios.findOne({
      where: { email: email },
      raw: true,
    });

    if (usuarioDevuelve == null) {
      // <--------- si existe el email creamos la devolucion
      console.log("el usuario no existe")

      return res.render("./usuarios/formOlvidoClave.ejs"
      , {
        errors:{ pieError: { msg: 'El usuario: '+ email + "  , no esta registrado."}} 
        }
      );
    }
      */

    //const clave = usuarioDevuelve.clave;

    let transporter = nodemailer.createTransport({
        host: process.env.MAILSERVER,
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER ,//<-------------  mail desde donde se envia
          pass: process.env.PASS  // <-----------  clave proporcionada por gmail
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mensaje = {
      from: '"stoneblack" <info@stoneblack.com>', // <----------- quien lo manda
      to: email ,//<-------------- aca viene el email del usuario desde el ejs
      subject: "Formulario de contacto de StoneBlack",
       text: "Saludos de stoneblack.onrender.com su clave es : " + clave + " , cambiela por seguridad",
      //html: "<b>Hola </b>",
    }
    console.log(mensaje);

    try {
      let info = await transporter.sendMail(mensaje);

      console.log("mensaje enviado");

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      //res.send("el mail se envió correctamente");
      const clave1111 ="1111";

        return res.render("pages/formOlvidoClave.ejs", {
          
          errors: { pieForm: { msg: "El mail se envió correctamente" } },
        })

        } catch {

          return res.render("pages/formOlvidoClave.ejs", {
          
            errors: { pieError: { msg: "El mail no se pudo enviar" } },
          })
    }
},

}

module.exports = mainControllers;