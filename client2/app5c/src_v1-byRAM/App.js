   import   * as React            from 'react';
   import { Admin, Resource    }  from 'react-admin';
   import   jsonServerProvider    from 'ra-data-json-server';
// import { ListGuesser        }  from 'react-admin';

// import { PostList           }  from './components/views/posts.js';
   import { UserList, UserEdit }  from './components/views/users.js';
/*
  function  App( ) {
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

  function  App( ) {

      return (
        <Admin dataProvider={ dataProvider } >
{/*       <Resource name="posts" list={ ListGuesser } /> */}
{/*       <Resource name="users" list={ ListGuesser } /> */}
{/*       <Resource name="posts" list={ PostList    } /> */}
          <Resource name="users" list={ UserList    } edit={ UserEdit } /> 
        </Admin>
        )

      }

   export   default App;
