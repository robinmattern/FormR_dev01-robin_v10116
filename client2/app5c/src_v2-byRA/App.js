   import * as React                        from 'react';
   import { Admin, Resource, ListGuesser }  from 'react-admin';

   import   jsonServerProvider              from 'ra-data-json-server';

   import   PostIcon                        from '@material-ui/icons/Book';
   import   UserIcon                        from '@material-ui/icons/Group';

   import { PostList, PostEdit, PostShow
          , PostCreate                    } from './posts';

   import { UserList }                      from './users';

   import   Dashboard                       from './Dashboard';
   import   authProvider                    from './authProvider';













      const App = ( ) => (



            <Admin

                dataProvider = { jsonServerProvider( 'https://jsonplaceholder.typicode.com' ) }
                authProvider = { authProvider }
                dashboard    = { Dashboard    }
                >
              <Resource
                name         =  "posts"     list = { PostList    }  icon   = { PostIcon   }
                show         = { PostShow}  edit = { PostEdit    }  create = { PostCreate }
                />

              <Resource
                name         =  "users"     list = { UserList    }  icon   = { UserIcon   } />

              <Resource
                name         =  "comments"  list = { ListGuesser } />

            </Admin>
            );



   export   default App;







