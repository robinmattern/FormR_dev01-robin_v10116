
     server.js[ 1]                         const express    =   require(  'express' );
     server.js[11]                         const app        =   new express()
     server.js[13]                               setEnv()
-1   server.js[36]                         const db         =   require(  './api/models/index.js' );
 
-2   models/index.js[ 1]                     var dbConfig   =   require(  '../config/db.config.js' );

-3   config/db.config[20]                        console.log(  `Using DB: ${aDBSN}\n` )
     config/db.config[26]                   if ( Env.DBSN  ==  'DBType_Server_DBName' ) {
     config/db.config[30]                 module.exports    = { HOST: '',  USER: '', PASWWORD: '', DB: '', dialect: '' }
     config/db.config[43]                        } // eif

     models/index.js[ 3]                     var Sequelize  =   require(  'sequelize' );
     models/index.js[36]                     var sequelize  =   new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, pSConfig )
     models/index.js[52]                     var db         = { sequelize: sequelize, Sequelize: Sequelize }
-4   models/index.js[56]                         db.user    =  require(   './user.model.js'  )
     models/index.js[57]                         db.role    =  require(   './role.model.js'  )                                    // .(10109.01.1 BTR Add Table)

     models/user.model.js[ 2]            const { sequelize, Sequelize } =  require( './dbConnect.js' )                            // .(10103.02.1 RAM Try this)
     models/user.model.js[ 6]                    UserModel  =   function(  sequelize, Sequelize ) {
-5   models/user.model.js[ 8]              const user       =   sequelize.define( "user", UserFields )
     models/user.model.js[24]                    } // eof UserModel
     models/user.model.js[27]             module.exports    =   UserModel( sequelize, Sequelize )

     models/role.model.js[24]             module.exports    =   RoleModel( sequelize, Sequelize )                                // .(10109.01.2 BTR Add Model)

-6   models/index.js[82]                  module.exports    =   db

     server.js[38]                               db.sequelize.sync();
     server.js[46]                               app.get( "/", ( req, res ) => { res.json( message: '' ) } )
     server.js[58]                           var setAPIroute=   require(  './api/routes/api.routes.js' )                          // .(10106.02.1 RAM Use to set all routes)
-7   server.js[59]                               setAPIroute(   app, 'users', 'user.controller.js'         );                     // .(10106.02.1 RAM i.e. the name of the controller file: user.controller.js)
     server.js[60]                               setAPIroute(   app, 'roles', 'role.controller.js'         );                     // .(10109.01.3 BTR Define Route)

     routes/api.routes[ 8]             function routes( app, aTable, aController ) {                                              // .(10106.02.2 RAM Use for any table)
-8   routes/api.routes[12]                const controller  =  require(   `../controllers/${aController}` );                      // .(10106.02.2 RAM Was: users )
     routes/api.routes[36]                module.exports    =  routes

-9   controllers/user.controller.js[ 4]    const User       =  require(   '../models' ).User                                      // .(10103.03.2)
     controllers/user.controller.js[38] function create(  req, res ) {                                                            // .(10103.02.5
     controllers/user.controller.js[43] function findAll( req, res ) {                                                            // .(10103.02.5
-13  controllers/user.controller.js[51]          user.findAll( { where: condition } ).then( data => {
     controllers/user.controller.js[54]                        res.setHeader( 'Accept-Range2', 'users' );                         // .(10103.01.5 RAM Send Header)
     controllers/user.controller.js[55]                        res.setHeader( 'Content-Range', `users ${nBeg}-${nEnd}/${nCnt}` ); // .(10103.01.5)
     controllers/user.controller.js[64]                        res.send( data )
-15  controllers/user.controller.js[65]                        } )
     controllers/user.controller.js[68]          } // eof findAll
-10  controllers/user.controller.js[70]  exports.findAll    =  findAll                                                            // .(10103.02.6)
     controllers/user.controller.js[74]  exports.findOne    = (req, res) => { ... }
     controllers/user.controller.js[86]  exports.update     = (req, res) => { ... }
     controllers/user.controller.js[101] exports.delete     = (req, res) => { ... }
     controllers/user.controller.js[116] exports.deleteAll  = (req, res) => { ... }
     controllers/user.controller.js[127] exports.findAllPublished = (req, res) => { ... }

-11  controllers/role.controller.js[ 4]    const role       =  require( '../models/index.js' ).role                               // .(10109.01.4 BTR Add Controller)
-12  controllers/role.controller.js[35]  exports.create     = (req, res) => { ... }
-15  controllers/user.controller.js[65]                        res.send( data )

     routes/api.routes[15]                const router     =  require( 'express' ).Router;
     routes/api.routes[17]                      router.get(  '/',   controller.findAll )    // Retrieve all records
-13  routes/api.routes[25]                      app.use(     `/api/${aTable}`, router );    // Use '/api/users/' + router.methods
     routes/api.routes[34]                      } // eof routes( app ) {
     routes/api.routes[36]               module.exports    =  routes

-14  server.js[78]                               app.listen( PORT, () => { ... }         // Start Server


-----------------------------------------------------------------------------------------------------------------------------------------







    create              create
    getList             findAll
    getOne              findOne
    getMany
    getManyReference
    update              update
    updateMany
    delete              destroy
    deleteMany
                        deleteAll

    create
    findAll
    findOne
    update
    destroy
    deleteAll
    findAllPublished