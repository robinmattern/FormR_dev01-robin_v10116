   import * as React                        from 'react';
   import { Admin, Resource              }  from 'react-admin';
   import {                  ListGuesser }  from 'react-admin';
// import   jsonServerProvider              from 'ra-data-json-server';
   import   simpleRestProvider              from 'ra-data-simple-rest'

// import { UserList                     }  from './components/views/users2.js';

//   const  dataProvider =  jsonServerProvider( 'https://jsonplaceholder.typicode.com' );
     const  dataProvider =  simpleRestProvider( 'http://localhost:55301/api'           );

  function  App   ( ) {

          return (

            <Admin     
                dataProvider = { dataProvider }
                >
              <Resource
                name         =  "users"     list = { ListGuesser    }         //  edit   = { UserEdit   } 
                />

            </Admin>
            )

      };

   export   default App;
