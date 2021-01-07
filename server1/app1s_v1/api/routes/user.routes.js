// module.exports =                  app   => { ... }   // Arrow function
// module.exports = function       ( app )    { ... }   // Anonymous function
//                  function routes( app )    { ... }   // Named function
// module.exports = routes

//  var setRange = require( '../middleware/range.js' ) // .(10103.01.1 RAM Sets range to dummy counts)

   function routes( app ) {
//    class routes {             // .(01022.01.1 RAM Where is app)

      const users        =  require( '../controllers/user.controller.js' );
 //   const controller   =  require( '../controllers/board.controller'   );

        var router       =  require( 'express' ).Router( );

            router.post(   '/',            users.create);            // Create a new Formr
            router.get(    '/',            users.findAll);           // Retrieve all Formrs
            router.get(    '/published',   users.findAllPublished);  // Retrieve all published Formrs
            router.get(    '/:id',         users.findOne);           // Retrieve a single Formr with id
            router.put(    '/:id',         users.update);            // Update a Formr with id
            router.delete( '/:id',         users.delete);            // Delete a Formr with id
            router.delete( '/',            users.deleteAll);         // Delete all Formrs

            app.use(   '/api/users',                                router );
//          app.use(   '/api/users',    [authJwt.verifyToken],      router );
//          app.use(   '/api/users',    [setRange],                 router ); // .(10103.01.2 RAM Set range to dummy counts)


//          app.get(   '/api/test/all',                                               controller.allAccess      );
//          app.get(   '/api/test/user',  [authJwt.verifyToken],                      controller.userBoard      );
//          app.get(   '/api/test/mod',   [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard );
//          app.get(   '/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin],     controller.adminBoard     );
            }

       module.exports = routes
