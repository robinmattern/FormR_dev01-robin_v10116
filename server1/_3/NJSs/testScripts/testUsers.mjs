import   DataServiceAPI   from    './DataServiceAPIs_class.js';       // Only works with NodeJS v15+
import   Sequelize        from    'sequelize';

//       console.log( DataServiceAPI );   process.exit()

//     ( async ( ) => {

     var pAPI           =  new  DataServiceAPI( 'http://localhost:55301', 'users' );    console.log( pAPI ) // DataServiceAPIs {  URL: 'http://localhost:55301',  Table: 'users',  Token: '' }
//   var pAPI           =       DataServiceAPI( 'http://localhost:55301', 'users' );    console.log( pAPI ) // Error: Class constructor DataServiceAPIs cannot be invoked without 'new'
//   var aResource      = '/' + pAPI.doAPI.Table

//       console.log( pAPI );   process.exit()

//       testAPI( 'signIn'          , 1, { UID: 'mod',   PWD: '12345678' } );
//   var aMOD_Token     = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAzODQyNDAyLCJleHAiOjE2MDM5Mjg4MDJ9.R0jCIyX3TOgIiOoSMUhcYDIKkuLdwZgsrh9XtoIIGdg'
     var aMOD_Token     = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA0MjU3ODgyLCJleHAiOjE2MDQzNDQyODJ9.0YEhIzDDO2F9UBbTzBJqRGDPMdFpaX7e4x9ncy0tNMg'  // .(01101.01.1)

//       testAPI( 'signIn'          , 1, { UID: 'robin', PWD: '1234'     } );
//   var aRobin_Token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAzODQ5MjE5LCJleHAiOjE2MDM5MzU2MTl9.Uc88e1hMXrg6XQasNJ32vR-50fQqE6mfL_QrT5a6HhI'
     var aRobin_Token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA0MjU4MDAxLCJleHAiOjE2MDQzNDQ0MDF9.tT7aiKrOrce6rj_E8KCe6VAlfxI-dld8PGGNB0-Irgw'  // .(01101.01.1)

//       testAPI( 'signIn'          , 1, { UID: 'suzee', PWD: '12345678' } );      //
     var aSuzee_Token   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjA0MjYxMjI1LCJleHAiOjE2MDQzNDc2MjV9.mMMnXuuRgjke8MhnZ7EpIaPKseEqubrEfBv-YltxzhQ'

//       testAPI( 'signIn'          , 1, { UID: 'user',  PWD: '1234'     } );      // What is the User's password?
// **    ERROR: {msg: 'Error Request failed with status code 404:
//                     User Not found.', url: 'http://localhost:50315/api/auth/signin', method: 'post', data: '{"username":"user","password":"12345678"}', headers: {…}}

//       testAPI( 'signIn'          , 1, { UID: 'bruce', PWD: '1234678'  } );      // What is the Bruce's password?
// **    ERROR: {msg: 'Error Request failed with status code 401:
//                     Invalid Password!', url: 'http://localhost:50315/api/auth/signin', method: 'post', data: '{"username":"bruce","password":"1234678"}', headers: {…}}

//       testAPI( 'testAll'                               );
//       testAPI( 'testMod'                               );  // ERROR: No token present for route: /test/mod
//       testAPI( 'testMod',   0, { Token: aMOD_Token   } );  // Response: Moderator Content.
//       testAPI( 'testMod',   0, { Token: aRobin_Token } );  // Response: Moderator Content.
//       testAPI( 'testAdmin', 0, { Token: aRobin_Token } );
// **    ERROR: {msg: 'Error Request failed with status code 403:
//                     Require Admin Role!', url: 'http://localhost:50315/api/test/admin', method: 'get', data: undefined, headers: {…}}

//       testAPI( 'testAll',   0, { Token: aSuzee_Token } );  // Response: Public Content.
//       testAPI( 'testUser',  0, { Token: aSuzee_Token } );  // Response: User Content.
//       testAPI( 'testMod',   0, { Token: aSuzee_Token } );
// **    ERROR: {msg: 'Error Request failed with status code 403:
//                     Require Moderator Role!', url: 'http://localhost:50315/api/test/mod', method: 'get', data: undefined, headers: {…}}

//       testAPI( 'showAll'   );

//       testAPI( 'create'          , 1, { } );                    // Error: No token present
//       testAPI( 'create'          , 0, setRec( ) );              //        POST Rec object
//       testAPI( 'create'          , 0, setRec( aRobin_Token ) ); //        POST Rec object  Moderators can create a Member
//       testAPI( 'create'          , 0, setRec( aSuzee_Token ) ); //        POST Rec object  Users can't create a Member

         testAPI( 'findOne'         , 0, { id: 1 } );              //        GET: WHERE ID = 1               // Can't signin at :55301
//       testAPI( 'findOne'         , 1, { id: 1 } );              //        SignIn, then GET: WHERE ID = 1  // Can   signin at :50301

//       testAPI( 'findAll'         , 0, { } );                    //        No token needed
//       testAPI( 'findAll'         , 0, { LastName: 'Mat' } );    //        GET: WHERE LastName like %mat%

//       testAPI( 'update'          , 0, setRec( aRobin_Token, 9 ) );

//       testAPI( 'delete'          , 0, { } );
//       testAPI( 'delete'          , 1, { } );  // defaults to 'mod', '12345678' )

//       testAPI( 'deleteAll'       , 0, { } );
//       testAPI( 'deleteAll'       , 1, { } );
//       testAPI( 'deleteAll'       , 1, { UID: 'mod', PWD: '12345678' } );

// ---------------------------------------------------------------------------------------------

async function testAPI( aAPI, bSignIn, pData ) {

//   var aResource = '/' + pAPI.doAPI.Table
     var aResource = '/' + pAPI.Table; // console.log( `aResource: ${aResource}` )

     if (bSignIn) {
         if (pData.UID) {                      await pAPI.testUser( '/api/test/user', pData.UID, pData.PWD ) }
           else {                              await pAPI.testUser( '/api/test/user', 'mod',    '12345678' ) }
         }

     if (aAPI == 'signIn'   ) {                await pAPI.signIn( { username: pData.UID, password: pData.PWD } )
                                          var  aToken = pAPI.getToken()
                                console.log(  "aToken: " + aToken )
                                               }

     if (aAPI == 'testAdmin') {        pData = await pAPI.doAPI( 'get', '/test/admin', pData ) }
     if (aAPI == 'testAll'  ) {        pData = await pAPI.doAPI( 'get', '/test/all'          ) }
     if (aAPI == 'testUser' ) {        pData = await pAPI.doAPI( 'get', '/test/user',  pData ) }
     if (aAPI == 'testMod'  ) {        pData = await pAPI.doAPI( 'get', '/test/mod',   pData ) }


     if (aAPI == 'showAll'  ) {        pData = await pAPI.showAll(  ) }

     if (aAPI == 'create'   ) {        pData = await pAPI.doAPI( 'post',   aResource               , pData          ) } // Create a new Record

//   if (aAPI == 'findAll'  ) {        pData = await pAPI.doAPI( 'get',    aResource                                ) } // Retrieve all Records
     if (aAPI == 'findAll'  ) {               if ( ! pData.LastName ) {       pData.LastName = ''   }
                                       pData = await pAPI.doAPI( 'get',    aResource +'?LastName=' + pData.LastName ) } // Retrieve all Records where LastName like %${pData.LastName}%

     if (aAPI == 'findPublished' ) {   pData = await pAPI.doAPI( 'get',    aResource + '/published', pData          ) } // Retrieve all published Records
     if (aAPI == 'findOne'  ) {        pData = await pAPI.doAPI( 'get', `${aResource}/${pData.id}`                  ) } // Retrieve a single Record with id

//   if (aAPI == 'update'   ) {        pData = await pAPI.doAPI( 'put',    aResource + '/:id'                       ) } // Update a Record with id
     if (aAPI == 'update'   ) {        pData = await pAPI.doAPI( 'put', `${aResource}/${pData.id}` , pData          ) } // Update a Record with id

     if (aAPI == 'delete'   ) {        pData = await pAPI.doAPI( 'delete', aResource + '/:id'                       ) } // Delete a Record with id
     if (aAPI == 'deleteAll') {        pData = await pAPI.doAPI( 'delete', aResource                                ) } // Delete all Records

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

//  const Sequelize =  require( 'sequelize' );
    const pUser   =
//    {  ID         :  nID ? nID : 9    //#.(01106.06.2 RAM Use ID)  ... }
      { "username" : "rebecca"
      , "email"    : "rebeccakelly.mattern@gmail.com"
      , "password" : "$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6"
      , "active"   : "Yes"
/*
//    ,  LastUpdated: (new Date).format( 'YYYY-MM-DD HH:mm:ss.SSS' );   //#.(01101.07.1 RAM)
//    ,  LastUpdated:  Sequelize.fn('GETDATE')                          //#.(01101.07.1 RAM)
//    ,  LastUpdated: (new Date).toISOString().replace( /[TZ]/g, ' ' )  // .(01101.07.1 RAM YYYY-MM-DD HH:mm:ss.SSS)
//    ,  LastUpdated: '2014-04-11 14:38:44.000'                         // .(01101.07.1 RAM YYYY-MM-DD HH:mm:ss.SSS)
//    ,  LastUpdated: '2020-11-01'                                      // .(01101.07.1 RAM YYYY-MM-DD)
//    ,  LastUpdated: (Sequelize.fn( 'GETDATE' ))( )                    // .(01101.07.1 RAM YYYY-MM-DD)
      ,  LastUpdated:  new Date( Date.now() ).toISOString()             // .(01106.07.5 BT  YYYY-MM-DDTHH:mm:ss.SSST)

//    ,  createdAt  : '2020-11-01 14:38:44.0000000'                     // .(01101.07.1 RAM YYYY-MM-DD HH:mm:ss.SSSSSSS)
//    ,  createdAt  : '2020-11-01'                                      // .(01106.07.1 BT  YYYY-MM-DD)
      ,  createdAt  :  new Date( Date.now() ).toISOString()             // .(01106.07.3 BT  YYYY-MM-DDTHH:mm:ss.SSST)
//    ,  updatedAt  : '2020-11-01 14:38:44.0000000'                     // .(01101.07.1 RAM YYYY-MM-DD HH:mm:ss.SSSSSSS)
//    ,  updatedAt  : '2020-11-01'                                      // .(01106.07.2 BT  YYYY-MM-DD)
      ,  updatedAt  :  new Date( Date.now() ).toISOString()             // .(01106.07.4 BT  2020-11-06T20:13:32.039Z)
*/
         };
     if (aToken) {
         pUser.Token = aToken
         }
     if (nID) {
//       pUser.MemberID = nID
         pUser.id       = nID
         }
         return pUser
      }




