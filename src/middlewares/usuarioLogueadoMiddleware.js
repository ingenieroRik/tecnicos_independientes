


function usuarioLogueadoMiddleware (req, res,next){

    //console.log("entro a usuarioLogueadoMiddleware como " + req.session.usuarioLogueado);

    if (req.session  && req.session.usuarioLogueado){ 
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        
    }else {
        res.locals.isLogged = false;
        return res.send ("No tienes los privilegios para ingresar");
       
    }
    next();
}


module.exports = usuarioLogueadoMiddleware;


















/*
const adminMiddleware = (req, res, next) => {
    if (req.session && req.session.admin === process.env.ADMIN) {
        //console.log(req.session.isAdmin);
        return next();
    } else {
        return res.send ("No tienes los privilegios para ingresar");
       
    }
};

module.exports = adminMiddleware;
*/