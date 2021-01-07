   import   React        from 'react'
   import { Admin,
            Resource  }  from 'react-admin'
   import   listGuesser  from 'react-admin'
   import   restProvider from 'ra-data-simple-rest'

// import   UserList     from './components/UserList'

   function App() {
     return (
       <Admin dataProvider = { restProvider( 'http://localhost:55301' ) }>
         <Resource
           name  =  'users'
//         list  = { UserList }
           list  = { listGuesser }
           />
       </Admin>
     )
   }

   export default App

