// module.exports =                  app   => { ... }   // Arrow function
// module.exports = function       ( app )    { ... }   // Anonymous function
//                  function routes( app )    { ... }   // Named function
// module.exports = routes

//  var setRange = require( '../middleware/range.js' )  // .(10103.01.1 RAM Sets range to dummy counts)

   function routes( app, aTable, aController ) {                    // .(10106.02.2 RAM Use for any table) 
//    class routes {                                   // .(01022.01.1 RAM Where is app)

//    const controller   =  require( `../controllers/${aTable}.controller.js` );  //#.(10106.02.2 RAM Was: users = ) 
      const controller   =  require( `../controllers/${aController}`          );  // .(10106.02.2 RAM Was: users = ) 
 //   const controller   =  require( '../controllers/board.controller'        );

        var router       =  require( 'express' ).Router( );

            router.post(   '/',          controller.create);            // Create a new table record
            router.get(    '/',          controller.findAll);           // Retrieve all table records
            router.get(    '/published', controller.findAllPublished);  // Retrieve a table record with id
            router.get(    '/:id',       controller.findOne);           // Update a table record with id
            router.put(    '/:id',       controller.update);            // Delete a table record with id
            router.delete( '/:id',       controller.delete);            // Delete all table records
            router.delete( '/',          controller.deleteAll);         // Retrieve all published table records

            app.use(   `/api/${aTable}`,                            router );
//          app.use(   '/api/users',    [authJwt.verifyToken],      router );
//          app.use(   '/api/users',    [setRange],                 router ); // .(10103.01.2 RAM Set range to dummy counts)


//          app.get(   '/api/test/all',                                               controller.allAccess      );
//          app.get(   '/api/test/user',  [authJwt.verifyToken],                      controller.userBoard      );
//          app.get(   '/api/test/mod',   [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard );
//          app.get(   '/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin],     controller.adminBoard     );
            }

       module.exports = routes
