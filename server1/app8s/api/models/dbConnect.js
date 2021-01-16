const dbConfig  =  require( '../config/db.config.js' );

const Sequelize =  require( 'sequelize' );
  
  var pSConfig  = 
    { host               :   dbConfig.HOST
    , dialect            :   dbConfig.dialect

  /*  , dialectOptions   : 
      {  options: 
          {  encrypt     :   true
          ,  validateBulkLoadParameters: false }
        }  
  //   {  options        : { validateBulkLoadParameters : 'false' 
  //                     ,   encrypt                    :  true }
  //     }
  */ 
  //, operatorsAliases   :   false

  //, logging            :   console.log
  //, logging            :   function( str ) { console.log(str) }, // do your own logging
    , logging            :   function( str ) { a = str } 

    , pool: 
      {  max             :   dbConfig.pool.max
      ,  min             :   dbConfig.pool.min
      ,  acquire         :   dbConfig.pool.acquire
      ,  idle            :   dbConfig.pool.idle
         }
      }

 if ( dbConfig.dialectOptions) {
      pSConfig.dialectOptions  =  dbConfig.dialectOptions
      } 

  var sequelize = new Sequelize(
          dbConfig.DB
      ,   dbConfig.USER
      ,   dbConfig.PASSWORD
      ,   pSConfig
          )

// ------------------------------------------------------------------------------------------

  const db = {};

        db.Sequelize        =  Sequelize;
        db.sequelize        =  sequelize;

//      db.user             =  require( "../models/user.model.js"            )( sequelize, Sequelize ); // .(10103.02.3)
/*      db.role             =  require( "../models/role.model.js"            )( sequelize, Sequelize );
        db.configurations   =  require( "../models/switch.model.js"          )( sequelize, Sequelize );
        db.lookups          =  require( "../models/lookup.model.js"          )( sequelize, Sequelize );
        db.tables           =  require( "../models/table.model.js"           )( sequelize, Sequelize );
        db.tutorials        =  require( "../models/tutorial.model.js"        )( sequelize, Sequelize );
        db.members          =  require( "../models/member.model.js"          )( sequelize, Sequelize ); // .(01028.03.1 RAM Added)
        db.projects         =  require( "../models/project.model.js"         )( sequelize, Sequelize );
        db.roles_tables     =  require( "../models/roles_tables.model.js"    )( sequelize, Sequelize ); // .(01115.01.2)
        db.user_roles       =  require( "../models/user_roles.model.js"      )( sequelize, Sequelize ); // .(01115.01.2)
        db.members_projects =  require( "../models/members_project.model.js" )( sequelize, Sequelize ); // .(01028.03.1 RAM Added)

        db.role.belongsToMany( db.user, {
          through    : "user_roles",
          foreignKey : "roleId",
          otherKey   : "userId",
          } );
        db.user.belongsToMany( db.role, {
          through    : "user_roles",
          foreignKey : "userId",
          otherKey   : "roleId",
          } );

        db.ROLES = ["user", "admin", "moderator"];
*/
module.exports = db;
