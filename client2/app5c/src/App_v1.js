   import * as React                        from 'react';
   import { Admin, Resource              }  from 'react-admin';
   import {               createMuiTheme }  from '@material-ui/core/styles';
// import {                  ListGuesser }  from 'react-admin';
   import   jsonServerProvider              from 'ra-data-json-server';




// import { PostsList                    }  from './components/views/PostsList.js';
   import { PostShow                     }  from './components/views/PostsShow.js';


// import { UserList, UserEdit           }  from './components/views/users.js';
   import { UserList                     }  from './components/views/users2.js';

// import   Dashboard                       from './Dashboard';
// import   authProvider                    from './authProvider';
/*
  function  App   ( ) {
      return (
        <div className="App">
          Hello
        </div>
        );
      }
*/
     const  myTheme      = createMuiTheme( { // -----  .(10101.02.1 RAM Sets Layout title bgcolor to Red, not table header fontWeight to bold ??)

       overrides: { // ----------------------------
         RaDatagrid: { // -----------------------          
           headerCell: { // -------------------

             fontWeight: 'bold'

             } // eop headerCell
//           ----------------------------------          
           } // eop RaDatagrid
//         --------------------------------------
         } // eop overrides
//       ------------------------------------------
       } ) // eoo myTheme
//     ----------------------------------------------

     const  dataProvider =  jsonServerProvider( 'https://jsonplaceholder.typicode.com'       );
//   const  dataProvider =  jsonServerProvider( 'https://jsonplaceholder.typicode.com/posts' );
//   const  dataProvider =  jsonServerProvider( 'https://jsonplaceholder.typicode.com/users/1/posts' );

  function  App   ( ) {

          return (

            <Admin     
//              theme        = { myTheme }
                dataProvider = { dataProvider }
//              dataProvider = { jsonServerProvider( 'https://jsonplaceholder.typicode.com' ) }
                >
              <Resource
//              name         =  "posts"     list = { PostsList   } 
                name         =  "posts"     list = { PostShow   } 
                />
{/*           <Resource name =  "posts"     list = { ListGuesser } /> */}

{/*           <Resource name =  "users"     list = { ListGuesser } /> */}
              <Resource
                name         =  "users"     list = { UserList    }         //  edit   = { UserEdit   } 
                />



            </Admin>
            )

      };

   export   default App;
