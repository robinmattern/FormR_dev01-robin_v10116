     var axios    =    require( 'axios'   );

// ----- -------- = -- -------------- : -----------------------------------------------------

class Members {

// ----- -------- = -- -------------- : -----------------------------------------

       constructor( aURL ) {

         this.URL=  aURL ? aURL : 'http://localhost:50315'
         this.Token = ''

         } // eom constructor( ) { ... }
// ----- -------- = -- -------------- : -----------------------------------------

       hello( ) {
         console.log( "hello" )

         } // eom hello( ) { ... }
// ----- -------- = -- -------------- : -----------------------------------------

// async function showAll( ) { ... }
 async showAll( ) {

  return axios
        .get(   this.URL + '/api/members' )
        .then(  pResponse => { return  pResponse.data; } )
        .catch( pError    => { this.shoError( pError ) } )

         } // eom showAll( aRoute ) { ... }
// ----- -------- = -- -------------- : -----------------------------------------

         getToken( ) {
 return  this.Token
         }
// ----- -------- = -- -------------- : -----------------------------------------

 async testUser( aRoute, aUserID, aPassword ) {

  if ( ! this.Token ) {

     var pBody          = { 'username'      :  aUserID,
                            'password'      :  aPassword
                             }

             console.log( "\n-----------------------------------\n" +
                            `signIn '${aUserID}' response       \n` +
                            "-----------------------------------"
                             )
//   var pJSON          =    await this.signIn( pBody )
                             await this.signIn( pBody )

  if ( ! this.Token ) {
//       console.log( "\nError: Server not running")
         console.log( "\nError: Access Token not available")
         process.exit()
         }
//           console.log(  pJSON )

//       this.Token     =    pJSON.accessToken;
         }

     var aToken         =    this.Token; console.log( "  aToken: " + aToken )  // var is required

             console.log( "\n-----------------------------------\n" +
                            `getAPI '${aRoute}' response        \n` +
                            "-----------------------------------"
                             )
//   var pJSON          =    await this.getAPI( aRoute, aToken, pBody )
     var pJSON          =    await this.getAPI( aRoute, aToken )

         console.log(        pJSON, "\n" );

         return pJSON

         } // eom testUser( aRoute, aUserID, aPassword ) { ... }
// ----- --------- = -- -------------- : -----------------------------------------

 async signIn( pBody ) {

  return axios
        .post(  this.URL + '/api/auth/signin', pBody )
        .then(  pResponse => { this.Token =    pResponse.data.accessToken; } )
//                                     return  pResponse.data; } )
        .catch( pError    => { this.shoError( pError ) } )

         } // eom signIn( aRoute, pBody ) { ... }
// ----- -------- = -- -------------- : -----------------------------------------

async doAPI( aMethod, aRoute, pBody ) {

             console.log( "\n-----------------------------------\n" +
                            `doAPI '${aRoute}' ${aMethod.toUpperCase()} request \n` +
                            "-----------------------------------\n"
                           , pBody || ""
                             )

             console.log( "\n-----------------------------------\n" +
                            `doAPI '${aRoute}' response         \n` +
                            "-----------------------------------"
                             )
      if ( pBody && pBody.Token ) { this.Token    = pBody.Token; delete pBody.Token }   // .(01027.01.1)
      if ( pBody && pBody.id    ) { this.MemberID = pBody.id;    delete pBody.id    }   // .(01027.01.1)

      if ( ! this.Token ) {
      if ( ! aRoute.match( /Members|all/i   ) ) {
             console.log( `ERROR: No token present for route: ${aRoute}` )
             process.exit()
             } }

     var pHeaders = { 'x-access-token': this.Token }
     var pHeaders =    aRoute.match( /\/all/) ? { } : pHeaders

     var pConfig  = {  method : aMethod
                    ,  url    : this.URL + '/api' + aRoute
                    ,  headers: pHeaders
                    ,  data   : pBody || { }               // .(01106.02.1 RAM Was: body)
                       }

  return axios( pConfig )
//return axios( pConfig, pBody || { } )
        .then(  pResponse => {
                               return  pResponse.data; } )
        .catch( pError    => {
                               this.shoError( pError ) } )

         } // eom getAPI( aRoute, aToken, pBody ) { ... }
// ----- --------- = -- -------------- : -----------------------------------------

async getAPI( aRoute, aToken, pBody ) {

     var pHeader  =  {'x-access-token': aToken }
     var pHeader  =  aRoute.match( /\/all/) ? { } : pHeader

  return axios
        .get(   this.URL  + aRoute, { headers: pHeader } )
        .then(  pResponse => { return  pResponse.data; } )
        .catch( pError    => { this.shoError( pError ) } )

         } // eom getAPI( aRoute, aToken, pBody ) { ... }
// ----- --------- = -- -------------- : -----------------------------------------

       shoError( pError ) {

  if ( ! pError.response ) {
         pError.response =  { status : pError.errno }
         }
     var bOK = pError.response.status
         bOK = bOK || ( (!bOK) && pError.errno )

  if ( ! bOK ) {

         console.log( "ERROR:", pError )

  } else {

          var aMsg
 switch (pError.response.status) {
    case 400: aMsg      = `Error Request failed with status code 400: \n         ${pError.response.data.message}`; break;
    case 401: aMsg      = `Error Request failed with status code 401: \n         ${pError.response.data.message}`; break;
    case 402: aMsg      = `Error Request failed with status code 402: \n         ${pError.response.data.message}`; break;
    case 403: aMsg      = `Error Request failed with status code 403: \n         ${pError.response.data.message}`; break;

//  case 404: aMsg      = `Error Request failed with status code 404: \n    res: ${pError.response.data}`        ; break;
    case 404: aMsg      = `Error Request failed with status code 404: \n         ${pError.response.data.message}`; break;

//  case 500: aMsg      = "Error Request failed with status code 500: \n         " + pError.response.data.message; break;
    case 500: aMsg      = `Error Request failed with status code 500: \n         ${pError.response.data.message}`; break;

    default:  aMsg      = `Error No. ${pError.errno}: ${pError.syscall} ${pError.code} ${pError.address}:${pError.port}`
         }

     var pErr = { }
         pErr.msg       =  aMsg
         pErr.url       =  pError.config.url       // :    'http://localhost:50315/api/auth/signin',
         pErr.method    =  pError.config.method    // :    'post',
         pErr.data      =  pError.config.data      // : '{ "username":"mod","password":"!PassWord0"}',
         pErr.headers   =  pError.config.headers   // :  { ... }

         console.log( "ERROR:", pErr )
//       console.log( "ERROR:", pError )
         }

         } // eom shoError( pError ) { ... }
// ----- --------- = -- -------------- : -----------------------------------------

    } // eoc Members { ... }
// ----- -- ------ = -- -------------- : -----------------------------------------------------

// async function doit( ) {      //    workie
// async doit( ) => {            // no workie
// async doit = function( ) {    // no workie

//       doit = async function( ) { // workie
/*       doit = async ( ) => {      // workie

         pTuts     =  new Members( 'http://localhost:50315' )
         pData     =  await pTuts.showAll( ); console.log( "pMembers:", pData )
         }

         doit()
*/
/*
       ( async ( ) => {              // workie
         pTuts     =  new Members( 'http://localhost:50315' )
//       pData     =  await pTuts.showAll(  ); console.log( "pMembers:", pData )
         console.log( "pMembers:", await pTuts.testUser( '/api/test/user', 'mod', '12345678') )
         } )()
*/
// ----- -- ------ = -- -------------- : -----------------------------------------------------

 //      exports = Members  The requested module './Members.js' is a CommonJS module, which may not support all module.exports as named exports.
  module.exports = Members

