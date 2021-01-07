   import * as React                        from 'react';
   import { Admin, Resource              }  from 'react-admin';
// import {                  ListGuesser }  from 'react-admin';
   import   jsonServerProvider              from 'ra-data-json-server';




   import { PostList                     }  from './components/views/posts.js';


   import { UserList, UserEdit           }  from './components/views/users.js';

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
     const  dataProvider = jsonServerProvider( 'https://jsonplaceholder.typicode.com'       );
//   const  dataProvider = jsonServerProvider( 'https://jsonplaceholder.typicode.com/posts' );
//   const  dataProvider = jsonServerProvider( 'https://jsonplaceholder.typicode.com/users/1/posts' );

  function  App   ( ) {

          return (

            <Admin
                dataProvider = { dataProvider }
//              dataProvider = { jsonServerProvider( 'https://jsonplaceholder.typicode.com' ) }


                >
              <Resource
                name         =  "posts"     list = { PostList    } />
{/*           <Resource name =  "posts"     list = { ListGuesser } /> */}

{/*           <Resource name =  "users"     list = { ListGuesser } /> */}
              <Resource
                name         =  "users"     list = { UserList    }  edit   = { UserEdit   } />




            </Admin>
            )

      };

   export   default App;
