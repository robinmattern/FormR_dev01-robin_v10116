// -------------------------------------------------------------------------------------------------
/*
            Method name         API call
            ----------------    --------------------------------
            getList             GET    http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
            getOne              GET    http://my.api.url/posts/123
            getMany             GET    http://my.api.url/posts?filter={"id":[123,456,789]}
            getManyReference    GET    http://my.api.url/posts?filter={"author_id":345}
            create              POST   http://my.api.url/posts
            update              PUT    http://my.api.url/posts/123
            updateMany Multiple PUT    http://my.api.url/posts/123
            deleteMany Multiple DELETE http://my.api.url/posts/123
            delete              DELETE http://my.api.url/posts/123
*/
// ---------------------------------------------------------------------

    const   stringify   =  require( 'query-string' ).stringify;
//  const   fetchUtils  =  require( 'react-admin'  ).fetchUtils;
//  const   httpClient  =  fetchUtils.fetchJson;
    const   axios       =  require( 'axios' )

function DataServiceProvider( apiURL, nDebug ) {  // 1) URL, Request.data, 2) Headers, 3) Response.data

    const   httpClient =  axios.create(
                  { headers: { 'Content-type': 'application/json' }
                  , baseURL:   'http://' + apiURL + '/api'
                    } );

 function   onComplete( response ) {
        if (response.isAxiosError) { return { error: `Error ${response.errno}: ${response.syscall} ${response.code} ${response.address}:${response.port}` }
//      if (response.isAxiosError) { return { error: response.error } }
        } else {              return { data:  response.data  } }
            }

    const   API_Actions =

  { getList:  ( resource, params ) => {
        const { page, perPage } =  params.pagination;
        const { field, order  } =  params.sort;
        const   query = { sort:    JSON.stringify( [ field, order ] ), range: JSON.stringify( [ (page - 1) * perPage, page * perPage - 1 ] ), filter: JSON.stringify( params.filter ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  ).then( ( { headers, json } )  => ( { data:  json, total: parseInt( headers.get('content-range' ).split( '/' ).pop(), 10 ) } ) );
        }

  , getOne:   ( resource, params ) => {
        const   parms = ( params && params.id ) ? params : { id: params }
        const   url   = `/${resource}/${parms.id}`;           xDebug( url )
//      return  httpClient( url  )                                                          .then( onComplete )
//      return  httpClient( url  )                                                          .then( ( { json     } ) =>        ( { data:  json.data     } )   ) // no workie with axios
//      return  httpClient( url  )                                                          .then(     json         => { return { data:  json.data     }   } ) //    workie with axios
//      return  httpClient( url  )                                                          .then( ( { response } ) =>        ( { data:  response.data } )   ) // no workie with axios

//      return  httpClient( url  )                                                          .then( (   response   ) =>        ( { data:  response.data } )   )
//      return  httpClient( url  )                                                          .then(     response     =>        ( { data:  response.data } )   )
//      return  httpClient( url  )                                                          .then( (   response   ) => { return { data:  response.data }   } )
//      return  httpClient( url  )                                                          .then(     response     => { return { data:  response.data }   } )
        return  httpClient( url  )                                                          .then(     response     => { return  yDebug( response )        } )

        }

  , getMany:  ( resource, params ) => {
        const   query =  { filter: JSON.stringify({ id: params.ids }) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  )                                                          .then( ( { json } ) => ( { data: json } ) );
        }

  , getRefs:  ( resource,  params ) => {                // was getManyReference
        const { page, perPage } =  params.pagination;
        const { field, order  } =  params.sort;
        const   query =   { sort:  JSON.stringify( [ field, order ] ), range: JSON.stringify( [ (page - 1) * perPage, page * perPage - 1 ] ), filter: JSON.stringify( { ...params.filter, [ params.target ]: params.id, } ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  ).then( ( { headers, json } )  => ( { data:  json, total: parseInt( headers.get('content-range' ).split( '/' ).pop(), 10) } ) );
        }

  , update:   ( resource, params ) => {
        const   url   = `/${resource}/${params.id}`;          xDebug( url, params.data, '   PUT' )
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) )
        }

  , updateMany: ( resource, params ) => {
        const   query =  { filter: JSON.stringify( { id: params.ids} ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url, params.data, '   PUT' )
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) )
        }

  , create:   ( resource, params ) => {
        const   url   = `/${resource}`;                       xDebug( url, params.data, '  POST' )
//      return  httpClient( url, { method: 'POST',   body: JSON.stringify( params.data ) } ).then( ( { json     } ) =>        ( { data: { ...params.data, id:     json.id      } } )   )
//      return  httpClient( url, { method: 'POST',   data: JSON.stringify( params.data ) } ).then( (   response   ) => { return { data: { ...params.data, id: response.data.id } }   } )
//      return  httpClient( url, { method: 'POST',   data: JSON.stringify( params.data ) } ).then(     response     => { yDebug( response ); return { data:   response.data      }   } )
        return  httpClient( url, { method: 'POST',   data: JSON.stringify( params.data ) } ).then(     response     => { return  yDebug( response )                                  } )
        }

  , delete:   ( resource, params ) => {                       xDebug( url, params.data, 'DELETE' )
        const   url   = `/${resource}/${params.id}`
        return  httpClient( url, { method: 'DELETE'                                      } ).then( ( { json } ) => ( { data: json } ) )
        }

  , deleteMany: ( resource, params ) => {
        const   query =  { filter: JSON.stringify( { id: params.ids } ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url, params.data, 'DELETE' )
        return  httpClient( url, { method: 'DELETE', body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) );
        }
    }; // eoo API_Actions
//  ------------------------------------------------------------------------------------------------------------------------------------

                nDebug     =  nDebug ? nDebug : false
      function  xDebug( aURL, pData, aMethod ) {
//                        console.log( httpClient )
                aMethod    =  aMethod ? aMethod : '   GET'
            if (nDebug >= 1) { console.log( "     dataService URL: " + httpClient.defaults.baseURL + decodeURI( aURL ) );
            if (pData      ) { console.log( "              "         + aMethod + ": " + JSON.stringify( pData )      ) }
//                             console.log( "  Config Req Headers: " + JSON.stringify( httpClient.getHeaders()     ) )
            if (nDebug >= 2) { console.log( " Default Req Headers: " + JSON.stringify( httpClient.defaults.headers ) ) }
//                             console.log( "     Request Headers: " + JSON.stringify( httpClient.request  ) )
                } // eif nDebug
                } // eof xDebug
//              ----------------------------------------------

      function  yDebug( pResponse ) {
            if (nDebug >= 2) { console.log( "    Response.Headers: " + JSON.stringify( pResponse.headers ) )
            if (nDebug >= 3) { console.log( " data: ", pResponse.data ) }
                } // eif bDebug
        return  pResponse
                } // eof xDebug
//              ------------------------------------------------------------------------------------------------------------------------

        return  API_Actions
    } // eof DataServiceProvider
//  ------------------------------------------------------------------------------------------------------------------------------------------------

   module.exports = DataServiceProvider
/*
            console.log(     "DataServiceProvider:\n",        DataServiceProvider   )      // "[Function: DataServiceProvider]
            console.log(     "DataServiceProvider():\n",      DataServiceProvider() )      // "{ getAll: [Function: getAll],  get: [Function: get], ... }"
            console.log( "new DataServiceProvider:\n",    new DataServiceProvider   )      // "{ getAll: [Function: getAll],  get: [Function: get], ... }"
            console.log( "new DataServiceProvider():\n",  new DataServiceProvider() )      // "{ getAll: [Function: getAll],  get: [Function: get], ... }"
*/
       var  dataService     = DataServiceProvider(    'localhost:55301'    )
//     var  dataService     = DataServiceProvider(    'localhost:55301', 1 )
//     var  dataService     = DataServiceProvider(    'localhost:55301', 2 )
//     var  dataService     = DataServiceProvider(    'localhost:55301', 3 )
//          console.log(     "dataService.getOne(     'users', { id: 1 } ):\n", dataService.getOne( 'users', { id: 1 } ) ) // Promise { <pending> }

       var  pUserData     =
             { "username" : "rebecca"
             , "email"    : "rebeccakelly.mattern@gmail.com"
             , "password" : "$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6"
             , "active"   : "Yes"
                }

            console.log(     "dataService.getOne( { id: 1 } ):\n", dataService.getOne( 1 ) )     // "[Function: DataServiceProvider]

//          testIt( ( ) => dataService.getList(    'users', { id:    1                                } ) ) // fix here and there
//          testIt( ( ) => dataService.getOne(     'users', { id:    1                                } ) ) // ok
//          testIt( ( ) => dataService.getMany(    'users', { ids: [ 1,2,3 ]                          } ) ) // fix there
//          testIt( ( ) => dataService.getRefs(    'users', { ids: [ 1,2,3 ]                          } ) ) // fix here and there
//          testIt( ( ) => dataService.updateMany( 'users', { ids: [ 1,2,3 ], data: { name: 'Robin' } } ) ) // fix here and there
//          testIt( ( ) => dataService.update    ( 'users', { id:    1,       data: { name: 'Robin' } } ) ) // fix here
//          testIt( ( ) => dataService.create(     'users', {                 data:   pUserData       } ) ) // fix here and there, ok now
//          testIt( ( ) => dataService.delete(     'users', { id:    1                                } ) ) // fix here
//          testIt( ( ) => dataService.deleteMany( 'users', { ids: [ 1,2,3 ]                          } ) ) // fix here
//          testIt( ( ) => dataService.deleteAll(  'users', {                 data: { name: 'Robin' } } ) ) // add here

      async function testIt( xAction ) {
//                   console.log( String( xAction ).replace( /\( \) =>/, " " ).replace( /\( +'/, "( '" ).replace( /\{ +/, "{ " ) + ":" )
                     console.log( "    " +  String( xAction ).replace( /\( \) =>/, " " ).replace( / +/g, " " ) + ":" )
               try { console.log( " data",  ( await xAction( ) ).data )
                 } catch( pError ) {
                     console.log( "\n  ** dataService Axios HTTP Error:\n\n", pError )
                   } }

/*
            console.log(     "dataService:\n",      dataService )      // "[Function: DataService]
            dataService:
             {
              getList:          [Function: getList],
              getOne:           [Function: getOne],
              getMany:          [Function: getMany],
              getManyReference: [Function: getManyReference],
              update:           [Function: update],
              updateMany:       [Function: updateMany],
              create:           [Function: create],
              delete:           [Function: delete],
              deleteMany:       [Function: deleteMany]
            }

              getList           GET    http://path.to.my.api/posts?sort   =["title","ASC"]&range=[0, 4]&filter={"author_id":12}
              getOne            GET    http://path.to.my.api/posts/123
              getMany           GET    http://path.to.my.api/posts?filter ={"id":[123,124,125]}
              getManyReference  GET    http://path.to.my.api/comments?sort=["created_at","DESC"]&range=[0, 24]&filter={"post_id":123}
              create            POST   http://path.to.my.api/posts                               { "title": "hello, world", "author_id": 12 }
              update            PUT    http://path.to.my.api/posts/123                           { "title": "hello, world!" }
              updateMany        PUT    http://path.to.my.api/posts?filter ={"id":[123,124,125]}  { "title": "hello, world!" }
              delete            DELETE http://path.to.my.api/posts/123
              deleteMany        DELETE http://path.to.my.api/posts?filter ={"id":[123,124,125]}
*/

/*
[ {"id":1,"username":"mod",     "email":"mod@iodd.com",             "password":"$2a$08$3JGNAzndO90;P9LxXvGkOoWuAKNCdi3VTNZzJxfx1fzU41gUGwSC",   "active":"Yes","createdAt":"2020-11-19T07:27:52.000Z","updatedAt":"2020-11-19T07:27:52.000Z"}
, {"id":2,"username":"robin",   "email":"robin.mattern@gmail.com",  "password":"$2a$08$DNPWgsLyg5DC8ipxwrv0hu7qSXwHKO.3wGgiDXTjn4YntV/p69lAy",  "active":"Yes","createdAt":"2020-10-10T04:29:51.000Z","updatedAt":"2020-11-19T23:05:16.000Z"}
, {"id":3,"username":"Suzee",   "email":"robin.mattern@sicomm.net", "password":"$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6",  "active":"Yes","createdAt":"2020-10-13T04:58:50.000Z","updatedAt":"2020-11-19T20:52:17.000Z"}
, {"id":5,"username":"Brucee",  "email":"bruce.troutman@gmail.com", "password":"$2a$08$kJftuPqVXptiJKLINzgFJutw6Xw6VXBRJTFCDmNyOz8Bg/wSG4CmW",  "active":"Yes","createdAt":"2020-10-29T18:44:49.000Z","updatedAt":"2020-12-28T20:26:06.000Z"}
, {"id":6,"username":"user",    "email":"suzee.parker@gmail.com",   "password":"$2a$08$kmsGd8m8pIrpDjHTNZyX;L2gmZlXrl/swLo5ho.dfZWPygvEL0DO",   "active":"Yes","createdAt":"2020-11-01T20:06:13.000Z","updatedAt":"2020-11-01T20:06:13.000Z"}
, {"id":7,"username":"admin",   "email":"admin@iodd.com",           "password":"$2a$08$rI34yzdH.5HL1nMpcxdqIOtSA4gSn7dDPj94Dz0YbZsAHp/U1RJtC",  "active":"Yes","createdAt":"2020-11-06T18:49:34.000Z","updatedAt":"2020-11-06T18:49:34.000Z"}
  ]
*/
/*
  pNewUser = { "username"   : "rebecca"
             , "email"      : "rebeccakelly.mattern@gmail.com"
             , "password"   : "$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6"
             , "active"     : "Yes"
                }
             , "createdAt"  : "2021-10-13T04:58:50.000Z"
             , "updatedAt"  : "2021-11-19T20:52:17.000Z"
                }
*/

/*

DataServiceAPIs {
  URL: 'http://localhost:55301',
  Table: 'users',
  Token: ''
}

-----------------------------------
doAPI '/users' POST request
-----------------------------------
 {
  username: 'rebecca',
  email: 'rebeccakelly.mattern@gmail.com',
  password: '$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6',
  active: 'Yes'
}

-----------------------------------
doAPI '/users' response
-----------------------------------
---------------------------------------------

Response: {
  id: 9,
  username: 'rebecca',
  email: 'rebeccakelly.mattern@gmail.com',
  password: '$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6',
  active: 'Yes',
  updatedAt: '2021-01-05T20:31:59.483Z',
  createdAt: '2021-01-05T20:31:59.483Z'
}

*/

/*

     dataService.create( 'users', { data: pUserData } ):
     dataService URL: http://localhost:55301/api/users
                POST: {"username":"rebecca","email":"rebeccakelly.mattern@gmail.com","password":"$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6","active":"Yes"}

  ** dataService Axios HTTP Error:

//    _header: 'POST /api/users HTTP/1.1\r\n' +
//      'Accept: application/json, text/plain, * /*\r\n' +   // s.b.  no space between * and / -> /plain, * /
//      'Content-Type: application/json\r\n' +
//      'User-Agent: axios/0.21.1\r\n' +
//      'Host: localhost:55301\r\n' +
//      'Connection: close\r\n' +
//      'Content-Length: 0\r\n' +
//      '\r\n',

  config: {
    headers: {
  request: <ref *1> ClientRequest {
    _header: 'POST /api/users HTTP/1.1\r\n' +

  response: {
    request: <ref *1> ClientRequest {
      _header: 'POST /api/users HTTP/1.1\r\n' +

//   Request Headers: {"common":{"Accept":"application/json, text/plain, * /*"},"delete":{},"get":{},"head":{},"post":{"Content-Type":"application/x-www-form-urlencoded"},"put":{"Content-Type":"application/x-www-form-urlencoded"},"patch":{"Content-Type":"application/x-www-form-urlencoded"},"Content-type":"application/json"}

     Request Headers: { "common" : {"Accept":"application/json, text/plain, * /*"}
                      , "delete" : { }
                      , "get"    : { }
                      , "head"   : { }
                      , "post"   : { "Content-Type":"application/x-www-form-urlencoded" }
                      , "put"    : { "Content-Type":"application/x-www-form-urlencoded" }
                      , "patch"  : { "Content-Type":"application/x-www-form-urlencoded" }
                      , "Content-type":"application/json"
                         }


*/
