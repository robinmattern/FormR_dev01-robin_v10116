   import   React         from 'react'
   import { Admin,
            Resource    } from 'react-admin'
   import { ListGuesser } from 'react-admin'
   import   restProvider  from 'ra-data-simple-rest'
   import   DataService   from './services/dataServiceProvider.js'

// import   UserList     from './components/UserList'
//  const   dataService  =  restProvider( 'http://localhost:55307'     )
    const   dataService  =  restProvider( 'http://localhost:55301/api' )
//  const   dataService  =  DataService(  'http://localhost:55301/api', users, 3 )

   function App() {
     return (
       <Admin dataProvider = { dataService }>
         <Resource
           name  =  'users'
//         list  = { UserList }
           list  = { ListGuesser }
           />
       </Admin>
     )
   }

   export default App

