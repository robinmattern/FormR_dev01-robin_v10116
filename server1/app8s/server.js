   const    express     =  require("express");
// const    crud, { sequelizeCrud } = require( 'express-sequelize-crud' ) // .(10103.03.2)
// const  { User }      = require( './models' )                           // .(10103.03.2)

   const    bodyParser  =  require("body-parser");
   const    cors        =  require("cors");

// -- -----------------------------------------------------------------------------------------------

// const    app         =  express();
   const    app         =  new express();

            setEnv(); // .(01012.01.1 RAM My way)

// -----------------------------------------------------------

        var corsOptions = {
  //            origin    :  [ "http://localhost:50322", "http://localhost:50323" ]  // .(01108.05.1 Array)
  //            origin    : 'http://localhost:8081'                    //#.(01016.01.1)
  //            origin    : 'http://localhost'                         //#.(01108.05.2 No workie)
  //            origin    :  /localhost/                               // .(01108.05.3 RegExp)
  //            origin    :  chkOrigin                                 // .(01108.05.4 function, see https://stackabuse.com/handling-cors-with-node-js/)
                origin    :  chkURL(process.env.CORS_CLIENT_URL), // .(01016.01.1 RAM Client URL)
  //            optionsSuccessStatus: 200 // For legacy browser support
  //            methods   : "GET, PUT"
                };
//          app.use( cors( ) );                                      // Allow any source for any route
            app.use( cors( corsOptions ) );
//          app.get( '/', cors(), ( req, res ) => { ... } )          // Allow any source for route /

// -----------------------------------------------------------

            app.use( bodyParser.json( ) );                           // parse requests of content-type - application/json
            app.use( bodyParser.urlencoded( { extended: true } ) );  // parse requests of content-type - application/x-www-form-urlencoded

      const db = require("./api/models/index.js");                   // database

            db.sequelize.sync();
//          db.sequelize.sync( { force: true } ).then( () => {       // force: true will drop the table if it already exists
//              console.log( "Drop and Resync Database with { force: true }" );
//              initial();
//              } );
 
// -----------------------------------------------------------

            app.get( "/", ( req, res ) => {
              
        var aApp = __dirname  // simple route
               .split(   /[\/\\\\]/)
               .splice(  -2, 2)
               .join(    "/" );  // .(01012.02.1 RAM)
                res.json( { message: `Welcome to FormR Server1 ${aApp} application.` });     // .(01012.02.2)
  
                } ); // eof app.get( '/', function )
// -----------------------------------------------------------

//          app.use( crud( '/admin/users', sequelizeCrud( User ) ) )                         // .(10103.03.1 RAM) 
       var  setAPIroute  =  require( './api/routes/api.routes.js' )                           // .(10106.02.1 RAM Use to set all routes)
            setAPIroute( app, 'users', 'user.controller.js' ); // .(10106.02.1 RAM i.e. the name of the controller file: user.controller.js)
//          setAPIroute( app, 'roles', 'role.controller.js' ); // .(10106.02.2)

//    require( "./api/routes/auth.routes"           )( app );  // app routes
//    require( "./api/routes/user.routes.js"        )( app );
//    require( "./api/routes/role.routes"           )( app );
//    require( "./api/routes/configuration.routes"  )( app );
//    require( "./api/routes/lookup.routes"         )( app );
//    require( "./api/routes/roles_tables.routes"   )( app );
//    require( "./api/routes/user_roles.routes"     )( app );
//    require( "./api/routes/tutorial.routes"       )( app );  // .(01012.03.1 RAM Add Tutorial routes)
//    require( "./api/routes/table.routes"          )( app );  // .(01115.03.1 RAM Add Table routes)
//    require( "./api/routes/project.routes"        )( app );  // .(01115.03.1 RAM Add Project routes)
//    require( "./api/routes/member.routes"         )( app );  // .(01028.03.1 BT  Add Members_project routes)
//    require( "./api/routes/members_project.routes")( app );  // .(01028.03.1 BT  Add Members_project routes)
//    require( "./api/routes/board.routes"          )( app );  // .(01119.01.8 RAM Add Board routes)

      const PORT = process.env.PORT || 8080; // set port, listen for requests

            app.listen( PORT, () => {
                console.log( `Server1 is running on port ${PORT}.` );
                });
// -- -----------------------------------------------------------------------------------------------
/*
      const Role = db.role;

   function initial() {
            Role.create({ id: 1, name: "user" });
            Role.create({ id: 2, name: "moderator" });
            Role.create({ id: 3, name: "admin" });
            }
  */             
// -- -----------------------------------------------------------------------------------------------

   function setEnv() {    // .(01012.01.2 Beg RAM)

       if (!process.env.PORT) {
        var mEnv = require( 'fs' )
             .readFileSync(__dirname + '/.env', 'ASCII' )
             .split( '\n' );
            mEnv.map( ( aEnv ) => {
        if (aEnv) {
        var v = (aEnv + '=' ).split( '=' );
            process.env[v[0]] = v[1].replace( /\r/, '' );
            }
          });
        }
      } // EOF setEnv    // .(01012.01.2 End)
// -- -----------------------------------------------------------------------------------------------

   function chkURL(aURL) {
        if (aURL.match(/^\//)) {
            return new RegExp(aURL.substr(1).replace(/\/$/, ""));
        } else {
            return aURL;
            }
          }
// -- -----------------------------------------------------------------------------------------------
