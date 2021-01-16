  module.exports = ( sequelize, Sequelize ) => {

      const user = sequelize.define( "user", 

             {  id         : { type          :  Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
//  ID                     : { type          :  Sequelize.INTEGER         // .(01106.04.RAM Use ID)
                             , primaryKey    :  true
                             , autoIncrement :  true                      // Automatically gets converted to SERIAL for postgres},
                               }

//           ,  <<COLNAME>>FormrNo : { type: Sequelize.STRING }, Delete , on last row
             ,  username   : { type: Sequelize.STRING }
             ,  email      : { type: Sequelize.STRING }
             ,  password   : { type: Sequelize.STRING }
             ,  active     : { type: Sequelize.STRING }
                } );

  return user;
};
