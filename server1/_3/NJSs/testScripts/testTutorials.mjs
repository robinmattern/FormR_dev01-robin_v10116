import   Tutorials    from     './testTutorials_class.js'      // Only works with NodeJS v15+

//       console.log( Tutorials ); process.exit()

//     ( async ( ) => {

//       pTuts     =  new Tutorials( )                          // pTuts is not defined
     var pTuts     =  new Tutorials( 'http://localhost:50315' ) // console.log( pTuts )


//       testAPI( 'signIn'          , 1, { UID: 'mod',   PWD: '12345678' } );
     var aMOD_Token     = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAzODQyNDAyLCJleHAiOjE2MDM5Mjg4MDJ9.R0jCIyX3TOgIiOoSMUhcYDIKkuLdwZgsrh9XtoIIGdg'

//       testAPI( 'signIn'          , 1, { UID: 'robin', PWD: '1234'     } );
     var aRobin_Token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAzODQ5MjE5LCJleHAiOjE2MDM5MzU2MTl9.Uc88e1hMXrg6XQasNJ32vR-50fQqE6mfL_QrT5a6HhI'

//       testAPI( 'signIn'          , 1, { UID: 'user',  PWD: '1234'     } );      // What is the User's password?
     var aUser_Token    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAzODQ5MjE5LCJleHAiOjE2MDM5MzU2MTl9.'

//       testAPI( 'signIn'          , 1, { UID: 'bruce', PWD: '1234678'  } );      // What is the Bruce's password?
     var aBruce_Token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAzODQ5MjE5LCJleHAiOjE2MDM5MzU2MTl9.'

//       testAPI( 'signIn'          , 1, { UID: 'admin', PWD: '12345678' } );      // What is the Admin's password?
//   var aAdmin_Token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAzODQyNDAyLCJleHAiOjE2MDM5Mjg4MDJ9.'

//       testAPI( 'showAll'   );
//       testAPI( 'testUser'  );
//       testAPI( 'testUser2' );

//       testAPI( 'create'          , 1, { } );                 // Error: No token present
//       testAPI( 'create'          , 0, setRec( aMOD_Token ) );//        POST Rec object

//       testAPI( 'findAll'         , 1, { } );
//       testAPI( 'findAll'         , 1, { title: 'three' } );
//       testAPI( 'findAll'         , 0, { } );                 // Error: No token present

//       testAPI( 'findPublished'   , 0, { } );
//       testAPI( 'findPublished'   , 1, { UID: 'mod',   PWD: '12345678' } );
//       testAPI( 'findPublished'   , 1, { UID: 'mod',   PWD: '12345678' } );
//       testAPI( 'findPublished'   , 0, { Token: aMOD_Token   } );  // moderator role works for isModerator
//       testAPI( 'findPublished'   , 0, { Token: aRobin_Token } );  // moderator role works for isModerator
//       testAPI( 'findPublished'   , 0, { Token: aUser_Token  } );
//       testAPI( 'findPublished'   , 0, { Token: aBruce_Token } );
//       testAPI( 'findPublished'   , 0, { Token: aAdmin_Token } );

//       testAPI( 'findOne'         , 1, { id: 4 } );

//       testAPI( 'update'          , 1, { } );
         testAPI( 'update'          , 0, setRec( aRobin_Token, 2 ) );   // .(01106.01.1 RAM)

//       testAPI( 'delete'          , 0, { } );
//       testAPI( 'delete'          , 1, { } );  // defaults to 'mod', '12345678' )

//       testAPI( 'deleteAll'       , 0, { } );
//       testAPI( 'deleteAll'       , 1, { } );
//       testAPI( 'deleteAll'       , 1, { UID: 'mod', PWD: '12345678' } );

//       } )()

// ---------------------------------------------------------------------------------------------

async function testAPI( aAPI, bSignIn, pData ) {

     if (bSignIn) {
         if (pData.UID) {                      await pTuts.testUser( '/api/test/user', pData.UID, pData.PWD ) }
           else {                              await pTuts.testUser( '/api/test/user', 'mod',    '!PassWord0' ) }
         }

     if (aAPI == 'signIn'   ) {                await pTuts.signIn( { username: pData.UID, password: pData.PWD } )
                                          var  aToken = pTuts.getToken()
                                console.log(  "aToken: " + aToken )
                                               }

     if (aAPI == 'testAdmin') {        pData = await pMems.doAPI( 'get', '/test/admin', pData ) }
     if (aAPI == 'testAll'  ) {        pData = await pMems.doAPI( 'get', '/test/all'          ) }
     if (aAPI == 'testUser' ) {        pData = await pTuts.testUser( '/api/test/user', 'mod',    '!PassWord0' ) }
     if (aAPI == 'testUser2') {                await pTuts.testUser( '/api/test/user', 'mod',    '!PassWord0' )
                                       pData = await pTuts.testUser( '/api/test/user' )
                                       }
     if (aAPI == 'showAll'  ) {        pData = await pTuts.showAll(  ) }

     if (aAPI == 'create'   ) {        pData = await pTuts.doAPI( 'post',   '/tutorials'            , pData          ) } // Create a new Tutorial

//   if (aAPI == 'findAll'  ) {        pData = await pTuts.doAPI( 'get',    '/tutorials'                             ) } // Retrieve all Tutorials
     if (aAPI == 'findAll'  ) {               if ( ! pData.title    ) {       pData.title    = ''   }
                                       pData = await pTuts.doAPI( 'get',    '/tutorials?title='     + pData.title    ) } // Retrieve all Tutorials where title like %${pData.title}%

     if (aAPI == 'findPublished' ) {   pData = await pTuts.doAPI( 'get',    '/tutorials/published'  , pData          ) } // Retrieve all published Tutorials
     if (aAPI == 'findOne'  ) {        pData = await pTuts.doAPI( 'get',    '/tutorials/'           + pData.id       ) } // Retrieve a single Tutorial with id

//   if (aAPI == 'update'   ) {        pData = await pTuts.doAPI( 'put',    '/tutorials/:id'                         ) } // Update a Tutorial with id
     if (aAPI == 'update'   ) {        pData = await pTuts.doAPI( 'put',    `/tutorials/${pData.id}`, pData          ) } // Update a Member with id

     if (aAPI == 'delete'   ) {        pData = await pTuts.doAPI( 'delete', '/tutorials/:id'                         ) } // Delete a Tutorial with id
     if (aAPI == 'deleteAll') {        pData = await pTuts.doAPI( 'delete', '/tutorials'                             ) } // Delete all Tutorials

         console.log( "---------------------------------------------\n" )
         console.log( "Response:",     pData )
         }

/*             Admin   Mod     User
               -----   -----   ----
     findAll   AllIDs  PubIDs  UserID       aRole == 'mod' ? Published == 1 :
     findOne   AnyID   AnyID   UserID
     update    AnyID   UserID  UserID
     create    UserID  UserID  UserID
     delete    AnyID   UserID  UserID
     delete    AllIDs    N/A     N/A
*/


function setRec( aToken, nID ) {
   const pTutorial       =
      {  title           : 'Tutorial ' + (new Date)
      ,  description     : 'A Description'
      ,  LastUpdated     :  new Date( Date.now() ).toISOString()             // .(01106.01.2 RAM YYYY-MM-DDTHH:mm:ss.SSST)
      ,  published       :  true
      ,  Token           :  aToken
         }
     if (aToken) {
         pTutorial.Token = aToken
         }
     if (nID) {
         pTutorial.id    = nID
         }
  return pTutorial
         }

/*
   Note: After adding the column, LastUpdated,
    -- update worked
       - before restarting the server
       - before adding the column to setRec()
       - before adding the column to tutorials.model.js

    -- update worked
       - after  restarting the server
       - before adding the column to setRec()
       - before adding the column to tutorials.model.js

    -- update worked, but no data was retreived
       - after  restarting the server
       - after  adding the column to setRec()
       - before adding the column to tutorials.model.js

    -- findOne didn't retreive the new column
       - before restarting the server
       - after  adding the column to tutorials.model.js

    -- findOne retreived the new column
       - after  restarting the server
       - after  adding the column to tutorials.model.js

    -- update worked, but no data was retreived
       - after  restarting the server
       - after  adding the column to setRec()
       - after  adding the column to tutorials.model.js



*/

