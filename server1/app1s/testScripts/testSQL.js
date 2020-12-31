const { Sequelize } = require('sequelize');

    testConnection()

 // ---------------------------------------------------------------

async function testConnection( ) {

    const sequelize =  new Sequelize( 'IO', 'sco', 'Azn.ani000', {
      host          : 'sc203d-azn3.database.windows.net',
      dialect       : 'mssql' ,
      dialectOptions: {
        options: {
          encrypt   : true ,
          validateBulkLoadParameters: false
          }
        }
      } );
   // ---------------------------------------------------------------

    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

    } catch (error) {
      console.error('Unable to connect to the database:', error);
      }
   // ---------------------------------------------------------------

    }
 // ---------------------------------------------------------------
