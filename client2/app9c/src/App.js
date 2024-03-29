   import   React         from 'react'
   import { Admin,
            Resource  }   from 'react-admin'
   import { ListGuesser } from 'react-admin'
   import   restProvider  from 'ra-data-simple-rest'

// import   PostList      from './components/PostList'
// import   PostCreate    from './components/PostCreate'
// import   PostEdit      from './components/PostEdit'
// import   UserList      from './components/UserList'
// import   UserCreate    from './components/UserCreate'
// import   UserEdit      from './components/UserEdit'

   function App() {

     return (

       <Admin dataProvider = { 
           restProvider( 'http://localhost:55301/api' )   // .(10102.03.1 RAM The client port avoids CORS due to proxy catching all unknown URLs ) 
           }>  

         <Resource
           name  =  'users'
           list  = { ListGuesser }
//         create= { PostCreate  }
//         edit  = { PostEdit    }
           />

       </Admin>
       )
     }

   export default App

