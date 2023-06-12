/*
  function checkLogin(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
  }
*/
function checkLogin(req, res, next) {
  console.log("entro al checklogin");
  if (!req.session.user.email || !req.session.user.password) {
    const error = CustomError.createError({
      name: "Authentication error",
      cause: authenticationErrorInfo(),
      message: "Error authenticating user",
      code: ErrorCode.AUTHENTICATION_ERROR,
      status: 401,
    });
    console.log(error);
    return next(error);
  }
  if (!req.session.user) {
    return res.redirect("/login");

  }
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
      return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
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
          return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
        }
    else
        {   
          next();
         }
       
  }
  
  
  export { checkLogged, checkLogin, checkSession, checkPermisosAdministrador,checkPermisosUsuario };