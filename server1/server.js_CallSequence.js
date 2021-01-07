
     server.js[ 1]                         const express    =   require(  'express' );
     server.js[11]                         const app        =   new express()
     server.js[13]                               setEnv()
-1   server.js[36]                         const db         =   require(  './api/models/index.js' );
     server.js[38]                               db.sequelize.sync()

-2   models/index.js[ 1]                     var dbConfig   =   require(  '../config/db.config.js' );

-3   config/db.config[20]                        console.log(  `Using DB: ${aDBSN}\n` )
     config/db.config[26]                   if ( Env.DBSN  ==  'DBType_Server_DBName' ) {
     config/db.config[30]                 module.exports    = { HOST: '',  USER: '', PASWWORD: '', DB: '', dialect: '' }
     config/db.config[43]                        } // eif

     models/index.js[ 3]                     var Sequelize  =   require(  'sequelize' );
     models/index.js[36]                     var sequelize  =   new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, pSConfig )
     models/index.js[52]                     var db         = { sequelize: sequelize, Sequelize: Sequelize }
-4   models/index.js[56]                         db.user    =  require(   './user.model.js'  )
     models/index.js[58]                         db.post    =  require(   './post.model.js' )

     models/userModel.js[ 2]             const { sequelize, Sequelize } =  require( './dbConnect.js' )                            // .(10103.02.1 RAM Try this)
     models/userModel.js[ 6]                     UserModel  =   function(  sequelize, Sequelize ) {
-5   models/userModel.js[ 8]               const user       =   sequelize.define( "user", UserFields )
     models/userModel.js[24]                     } // eof UserModel
     models/userModel.js[26]              module.exports    =   UserModel( sequelize, Sequelize )

-6   models/index.js[82]                  module.exports    =   db

     server.js[38]                               db.sequelize.sync();
     server.js[46]                               app.get( "/", ( req, res ) => { res.json( message: '' ) } )
-7   server.js[60]                                              require(  './api/routes/user.routes.js' )( app );

     routes/user.routes[ 8]             function routes( app ) {
-8   routes/user.routes[11]                const users      =  require(   '../controllers/user.controller.js' );

-9   controllers/user.controller.js[ 4]    const User       =  require(   '../models' ).User                                      // .(10103.03.2)
     controllers/user.controller.js[38] function create(  req, res ) {                                                            // .(10103.02.5
     controllers/user.controller.js[43] function findAll( req, res ) {                                                            // .(10103.02.5
-13  controllers/user.controller.js[49]          user.findAll( { where: condition } ).then( data => {
     controllers/user.controller.js[52]                        res.setHeader( 'Accept-Range2', 'users' );                         // .(10103.01.5 RAM Send Header)
     controllers/user.controller.js[53]                        res.setHeader( 'Content-Range', `users ${nBeg}-${nEnd}/${nCnt}` ); // .(10103.01.5)
-14  controllers/user.controller.js[59]                        res.send( data )
     controllers/user.controller.js[61]                        } )
     controllers/user.controller.js[64]          } // eof findAll
-10  controllers/user.controller.js[66]  exports.findAll    =  findAll                                                            // .(10103.02.6)
     controllers/user.controller.js[70]  exports.findOne    = (req, res) => { ... }
     controllers/user.controller.js[82]  exports.update     = (req, res) => { ... }
     controllers/user.controller.js[101] exports.destroy    = (req, res) => { ... }
     controllers/user.controller.js[112] exports.deleteAll  = (req, res) => { ... }
     controllers/user.controller.js[123] exports.findAllPublished = (req, res) => { ... }

     routes/user.routes[14]                const router     =  require(   'express' ).Router;
     routes/user.routes[17]                      router.get(  '/',   users.findAll );    // Retrieve all Formrs
-11  routes/user.routes[24]                      app.use(     '/api/users', router );    // Use '/api/users/' + router.methods
     routes/user.routes[33]                      } // eof routes( app ) {
     routes/user.routes[35]               module.exports    =  routes

-12  server.js[75]                               app.listen( PORT, () => { ... }         // Start Server


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