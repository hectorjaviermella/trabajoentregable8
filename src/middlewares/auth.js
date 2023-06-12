
  function checkLogin(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
  }
  
  function checkLogged(req, res, next) {
    if (req.session.user) return res.redirect("/login");
    next();
  }
  
  function checkSession(req, res, next) {
    if (req.session.user) return res.redirect("/");
    next();
  }
///////////////////////////////////////////////////////////////////////
  function checkPermisosAdministrador(req, res, next) {
    console.log("Check permiso administrador");
    console.log(req.session.user.role);
    if (req.session.user.role==="user")
    { 
      console.log("Acceso no autorizado, es solo para administradores");
      return res.status(401).send({status: "'Acceso no autorizado'"})
      res.status(401).json({ error: 'Acceso no autorizado' });
    }
else
    {   
      next();
     }
       
  }
///////////////////////////////////////////////////////////////

  function checkPermisosUsuario(req, res, next) {
    console.log("Check permiso Usuario");
    console.log(req.session.user.role);
    
    if (req.session.user.role==="admin")
         
         { 
          console.log("Acceso no autorizado, es solo para usuarios");
          return res.status(401).send({status: "'Acceso no autorizado'"})
          res.status(401).json({ error: 'Acceso no autorizado' });
        }
    else
        {   
          next();
         }
       
  }
  
  
  export { checkLogged, checkLogin, checkSession, checkPermisosAdministrador,checkPermisosUsuario };