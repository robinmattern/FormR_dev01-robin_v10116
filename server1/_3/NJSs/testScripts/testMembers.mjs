import   Members      from     './testMembers_class.js';       // Only works with NodeJS v15+
import   Sequelize    from     'sequelize';

//       console.log( Members );   process.exit()

//     ( async ( ) => {

     var pMems     =  new Members( 'http://localhost:50315' ) // console.log( pTuts )

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
//                     User Not found.', url: 'http://localhost:50315/api/auth/signin', method: 'post', data: '{"username":"user","password":"!PassWord0"}', headers: {…}}

//       testAPI( 'signIn'          , 1, { UID: 'bruce', PWD: '1234678'  } );      // What is the Bruce's password?
// **    ERROR: {msg: 'Error Request failed with status code 401:
//                     Invalid Password!', url: 'http://localhost:50315/api/auth/signin', method: 'post', data: '{"username":"bruce","password":"!PassWord0"}', headers: {…}}

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
//       Response: (42) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

//       testAPI( 'create'          , 1, { } );                    // Error: No token present
//       testAPI( 'create'          , 0, setRec( ) );              //        POST Rec object
//       testAPI( 'create'          , 0, setRec( aRobin_Token ) ); //        POST Rec object  Moderators can create a Member
//       testAPI( 'create'          , 0, setRec( aSuzee_Token ) ); //        POST Rec object  Users can't create a Member

//       testAPI( 'findOne'         , 0, { id: 9 } );              //        GET: WHERE MemberID = 9

//       testAPI( 'findAll'         , 0, { } );                    //        No token needed
//       testAPI( 'findAll'         , 0, { LastName: 'Mat' } );    //        GET: WHERE LastName like %mat%

//       testAPI( 'findOne'         , 1, { id: 4 } );
         testAPI( 'update'          , 0, setRec( aRobin_Token, 9 ) );

//       testAPI( 'delete'          , 0, { } );
//       testAPI( 'delete'          , 1, { } );  // defaults to 'mod', '12345678' )

//       testAPI( 'deleteAll'       , 0, { } );
//       testAPI( 'deleteAll'       , 1, { } );
//       testAPI( 'deleteAll'       , 1, { UID: 'mod', PWD: '12345678' } );

// ---------------------------------------------------------------------------------------------

async function testAPI( aAPI, bSignIn, pData ) {

     if (bSignIn) {
         if (pData.UID) {                      await pMems.testUser( '/api/test/user', pData.UID, pData.PWD ) }
           else {                              await pMems.testUser( '/api/test/user', 'mod',    '12345678' ) }
         }

     if (aAPI == 'signIn'   ) {                await pMems.signIn( { username: pData.UID, password: pData.PWD } )
                                          var  aToken = pMems.getToken()
                                console.log(  "aToken: " + aToken )
                                               }

     if (aAPI == 'testAdmin') {        pData = await pMems.doAPI( 'get', '/test/admin', pData ) }
     if (aAPI == 'testAll'  ) {        pData = await pMems.doAPI( 'get', '/test/all'          ) }
     if (aAPI == 'testUser' ) {        pData = await pMems.doAPI( 'get', '/test/user',  pData ) }
     if (aAPI == 'testMod'  ) {        pData = await pMems.doAPI( 'get', '/test/mod',   pData ) }


     if (aAPI == 'showAll'  ) {        pData = await pMems.showAll(  ) }

     if (aAPI == 'create'   ) {        pData = await pMems.doAPI( 'post',   '/Members'              , pData          ) } // Create a new Member

//   if (aAPI == 'findAll'  ) {        pData = await pMems.doAPI( 'get',    '/Members'                               ) } // Retrieve all Members
     if (aAPI == 'findAll'  ) {               if ( ! pData.LastName ) {       pData.LastName = ''   }
                                       pData = await pMems.doAPI( 'get',    '/Members?LastName='    + pData.LastName ) } // Retrieve all Tutorials where LastName like %${pData.LastName}%

     if (aAPI == 'findPublished' ) {   pData = await pMems.doAPI( 'get',    '/Members/published'    , pData          ) } // Retrieve all published Members
     if (aAPI == 'findOne'  ) {        pData = await pMems.doAPI( 'get',    '/Members/'             + pData.id       ) } // Retrieve a single Member with id

//   if (aAPI == 'update'   ) {        pData = await pMems.doAPI( 'put',    '/Members/:id'                           ) } // Update a Member with id
     if (aAPI == 'update'   ) {        pData = await pMems.doAPI( 'put',    `/Members/${pData.id}`  , pData          ) } // Update a Member with id

     if (aAPI == 'delete'   ) {        pData = await pMems.doAPI( 'delete', '/Members/:id'                           ) } // Delete a Member with id
     if (aAPI == 'deleteAll') {        pData = await pMems.doAPI( 'delete', '/Members'                               ) } // Delete all Members

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
    const pMember   =
//    {  ID         :  nID ? nID : 9    //#.(01106.06.2 RAM Use ID)
      {  MemberID   :  nID ? nID : 9    // .(01106.06.1 RAM Don't Use ID)
      ,  MemberNo   :  205
      ,  TitleName  : 'CEO'
      ,  FirstName  : 'Robin'
      ,  Middlename : 'D'
      ,  LastName   : 'Mattern'
      ,  PostName   : ''
      ,  Company    : 'Sicomm.Net'
      ,  Address1   : '1610 Apricot Court'
      ,  Address2   : ''
      ,  City       : 'Reston'
      ,  State      : 'VA'
      ,  Zip        : '20190'
      ,  Country    : 'USA'
      ,  Phone1     : '(703) 471-5327'
      ,  Phone2     : '(703) 655-3213'
      ,  Fax        : ''
      ,  WebSite    : 'sicomm.net'
      ,  Email      : 'robin.mattern@sicomm.net'
//    ,  LastUpdated: (new Date).format( 'YYYY-MM-DD HH:mm:ss.SSS' );   //#.(01101.07.1 RAM)
//    ,  LastUpdated:  Sequelize.fn('GETDATE')                          //#.(01101.07.1 RAM)
//    ,  LastUpdated: (new Date).toISOString().replace( /[TZ]/g, ' ' )  // .(01101.07.1 RAM YYYY-MM-DD HH:mm:ss.SSS)
//    ,  LastUpdated: '2014-04-11 14:38:44.000'                         // .(01101.07.1 RAM YYYY-MM-DD HH:mm:ss.SSS)
//    ,  LastUpdated: '2020-11-01'                                      // .(01101.07.1 RAM YYYY-MM-DD)
      ,  LastUpdated:  new Date( Date.now() ).toISOString()             // .(01106.07.5 BT  YYYY-MM-DDTHH:mm:ss.SSST)
//    ,  LastUpdated: (Sequelize.fn( 'GETDATE' ))( )                    // .(01101.07.1 RAM YYYY-MM-DD)
//    ,  createdAt  : '2020-11-01 14:38:44.0000000'                     // .(01101.07.1 RAM YYYY-MM-DD HH:mm:ss.SSSSSSS)
//    ,  updatedAt  : '2020-11-01 14:38:44.0000000'                     // .(01101.07.1 RAM YYYY-MM-DD HH:mm:ss.SSSSSSS)
//    ,  createdAt  : '2020-11-01'                                      // .(01106.07.1 BT  YYYY-MM-DD)
//    ,  updatedAt  : '2020-11-01'                                      // .(01106.07.2 BT  YYYY-MM-DD)
      ,  createdAt  :  new Date( Date.now() ).toISOString()             // .(01106.07.3 BT  YYYY-MM-DDTHH:mm:ss.SSST)
      ,  updatedAt  :  new Date( Date.now() ).toISOString()             // .(01106.07.4 BT  2020-11-06T20:13:32.039Z)
      ,  Skills     : 'None'
      ,  Active     : 'Yes'
      ,  Bio        : ''
         };
     if (aToken) {
         pMember.Token = aToken
         }
     if (nID) {
//       pMember.MemberID = nID
         pMember.id       = nID
         }
         return pMember
      }




