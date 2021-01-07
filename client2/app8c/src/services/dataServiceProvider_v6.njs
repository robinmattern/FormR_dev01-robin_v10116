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

function DataServiceProvider( apiURL, resource, nDebug ) {  // 1) URL, Request.data, 2) Headers, 3) Response.data
        var aResource    = (resource ? resource : '') + ''; nDebug = (nDebug + '').match( /[0-3]/ ) ? nDebug + 0 : 0
        if (arguments.length === 2 && (resource + '').match( /[0-9]/)) { aResource = ''; nDebug = resource; };
//          console.log( `apiURL: ${apiURL}, aResource: '${aResource}', nDebug: ${nDebug}, nArgs: ${arguments.length}` ); // process.exit()

    const   httpClient =  axios.create(
                  { headers: { 'Content-type': 'application/json' }
                  , baseURL:   'http://' + apiURL + '/api'
                    } );

 function   onComplete( response ) {
        if (response.isAxiosError) { return { error: `Error ${response.errno}: ${response.syscall} ${response.code} ${response.address}:${response.port}` }
//      if (response.isAxiosError) { return { error: response.error } }
        } else {                     return { data:  response.data  } }
            }

    const   API_Actions =

  { getList:  ( resource, params ) => {
        const { page, perPage } =  params.pagination;
        const { field, order  } =  params.sort;
        const   query = { sort:    JSON.stringify( [ field, order ] ), range: JSON.stringify( [ (page - 1) * perPage, page * perPage - 1 ] ), filter: JSON.stringify( params.filter ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  ).then( ( { headers, json } )  => ( { data:  json, total: parseInt( headers.get('content-range' ).split( '/' ).pop(), 10 ) } ) );
        }

//  '0': 'localhost:55301', '1': 'users', '2': 3 }
//          testIt( ( )   =>  dataService.getOne(     'users', { id:    1                                } ) ) // ok

//, getOne:   ( resource, params ) => {
  , getOne:     function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'one' );
        const   url   = `/${resource}/${params.id}`;           xDebug( url )
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

//, getMany:  ( resource, params ) => {
  , getMany:    function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'many' );
        const   query =  { filter: JSON.stringify( { id: params.ids } ) };
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

//, update:   ( resource, params ) => {
  , updateOne:  function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'one' );
        const   url   = `/${resource}/${params.id}`;          xDebug( url, params.data, '   PUT' )
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) )
        }

//, updateMany: ( resource, params ) => {
, updateMany:   function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'many' );
        const   query =  { filter: JSON.stringify( { id: params.ids} ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url, params.data, '   PUT' )
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) )
        }

//, create:   ( resource, params ) => {
  , createOne:  function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'new' );
        const   url   = `/${resource}`;                       xDebug( url, params.data, '  POST' )
//      return  httpClient( url, { method: 'POST',   body: JSON.stringify( params.data ) } ).then( ( { json     } ) =>        ( { data: { ...params.data, id:     json.id      } } )   )
//      return  httpClient( url, { method: 'POST',   data: JSON.stringify( params.data ) } ).then( (   response   ) => { return { data: { ...params.data, id: response.data.id } }   } )
//      return  httpClient( url, { method: 'POST',   data: JSON.stringify( params.data ) } ).then(     response     => { yDebug( response ); return { data:   response.data      }   } )
        return  httpClient( url, { method: 'POST',   data: JSON.stringify( params.data ) } ).then(     response     => { return  yDebug( response )                                  } )
        }

//, deleteOne:( resource, params ) => {
  , deleteOne:  function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'one' );
        const   url   = `/${resource}/${params.id}`;          xDebug( url, params.data, 'DELETE' )
        return  httpClient( url, { method: 'DELETE'                                      } ).then( ( { json } ) => ( { data: json } ) )
        }

//, deleteMany: ( resource, params ) => {
  , deleteMany: function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'many' );
        const   query =  { filter: JSON.stringify( { id: params.ids } ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url, params.data, 'DELETE' )
        return  httpClient( url, { method: 'DELETE', body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) );
        }

  , deleteAll:  function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'all' );
        const   url   = `/${resource}`;                       xDebug( url, params.data, 'DELETE' )
        return  httpClient( url, { method: 'DELETE'                                      } ).then( ( { json } ) => ( { data: json } ) )
        }

    }; // eoo API_Actions
//  ------------------------------------------------------------------------------------------------------------------------------------

//          getAll(                  ) { return http.get(   `/users`                      );  }
//          get(    id               ) { return http.get(   `/users/${id}`                );  }
//          create(     data         ) { return http.post(  `/users`,       data          );  }
//          update( id, data         ) { return http.put(   `/users/${id}`, data          );  }
//          delete( id               ) { return http.delete(`/users/${id}`                );  }
//          deleteAll(               ) { return http.delete(`/users`                      );  }
//          findByusername( username ) { return http.get(   `/users?username=${username}` );  }


      function  fixParams( mArgs, aMethod ) {
            if (mArgs.length == 0) { mArgs[0] = aResource };
            if (mArgs.length == 2 && mArgs[1].data) { mArgs = [ aResource, ...mArgs ] };
            if (mArgs.length == 1) { mArgs[1] = (mArgs[0] + '').match( /^[a-z]+/ ) ? 1 : mArgs[0], mArgs[0] = aResource; }

            var aTable  =  mArgs[0] ? mArgs[0] : ''

            if (aMethod == 'new' ) {
            var pParams =   mArgs[1]
                }
            if (aMethod == 'all' ) {
            var pParams =   { }
                }
            if (aMethod == 'one' ) {
            var pParams =  (mArgs[1] && mArgs[1].id)  ? mArgs[1] : { id:  mArgs[1] }
//              pParams =   pData ? { ...pParams, ...pData } : pParams
                }
            if (aMethod == 'many' ) {
            var pParams =  (mArgs[1] && mArgs[1].ids) ? mArgs[1] : { ids: mArgs[1] }
//              pParams =   pData ? { ...pParams, ...pData } : pParams
                }
                pParams =  (mArgs.length == 3) ? { ...pParams, ...mArgs[2] } : pParams

//              console.log( `     Args: ${mArgs.length}, resource: '${aTable}', params:`, pParams ); process.exit()
       return [ aTable, pParams ]
                } // eof xDebug
//              ----------------------------------------------

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
            console.log(     "DataServiceProvider:\n",        DataServiceProvider   ) // "[Function: DataServiceProvider]
            console.log(     "DataServiceProvider():\n",      DataServiceProvider() ) // "{ getAll: [Function: getAll],  get: [Function: get], ... }"
            console.log( "new DataServiceProvider:\n",    new DataServiceProvider   ) // "{ getAll: [Function: getAll],  get: [Function: get], ... }"
            console.log( "new DataServiceProvider():\n",  new DataServiceProvider() ) // "{ getAll: [Function: getAll],  get: [Function: get], ... }"
*/
//     var  dataService    =  DataServiceProvider( 'localhost:55301'    )             //  apiURL: localhost:55301, aResource: '', nDebug: 0, nArgs: 1
//     var  dataService    =  DataServiceProvider( 'localhost:55301', 1 )             //  apiURL: localhost:55301, aResource: '', nDebug: 1, nArgs: 2
//     var  dataService    =  DataServiceProvider( 'localhost:55301', 2 )             //  apiURL: localhost:55301, aResource: '', nDebug: 2, nArgs: 2
//     var  dataService    =  DataServiceProvider( 'localhost:55301', 3 )
//     var  dataService    =  DataServiceProvider( 'localhost:55301', 'users'  )      //  apiURL: localhost:55301, aResource: 'users', nDebug: 0, nArgs: 2
       var  dataService    =  DataServiceProvider( 'localhost:55301', 'users', 3 )    //  apiURL: localhost:55301, aResource: 'users', nDebug: 3, nArgs: 3

       var  pUserData      =
             { "username"  : "rebecca"
             , "email"     : "rebeccakelly.mattern@gmail.com"
             , "password"  : "$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6"
             , "active"    : "Yes"
                }
//          console.log(     "dataService.getOne( { id: 1 } ):\n", dataService.getOne( 1 ) )                   // "[Function: DataServiceProvider]

//          testIt( ( )   =>  dataService.getList(    'users', { id:    1      }                           ) ) // fix here and there

//          testIt( ( )   =>  dataService.getOne(     'users', { id:    1      }                           ) ) // ok                    Args: 2, resource: 'users', params: { id: 1 }
//          testIt( ( )   =>  dataService.getOne(     'users', { ids: [ 1, 2 ] }                           ) ) // ok                    Args: 2, resource: 'users', params: { id: 1 }
//          testIt( ( )   =>  dataService.getOne(              { ids: [ 1, 2 ] }                           ) ) // ok                    Args: 1, resource: 'users', params: { id: { ids: [ 1, 2 ] } }
//          testIt( ( )   =>  dataService.getOne(              { id:    1      }                           ) ) // ok                    Args: 1, resource: 'users', params: { id: 1 }
//          testIt( ( )   =>  dataService.getOne(                       1                                  ) ) // ok                    Args: 1, resource: 'users', params: { id: 1 }
//          testIt( ( )   =>  dataService.getOne(                     [ 1, 2 ]                             ) ) // ok                    Args: 1, resource: 'users', params: { id: [ 1, 2 ] }
//          testIt( ( )   =>  dataService.getOne(     'users'                                              ) ) // ok                    Args: 1, resource: 'users', params: { id: 1 }

//          testIt( ( )   =>  dataService.getMany(    'users', { ids: [ 1,2,3 ] }                          ) ) // fix there             Args: 2, resource: 'users', params: { ids: [ 1, 2, 3 ] }
//          testIt( ( )   =>  dataService.getMany(                    [ 1,2,3 ]                            ) ) // fix there             Args: 1, resource: 'users', params: { ids: [ 1, 2, 3 ] }
//          testIt( ( )   =>  dataService.getMany(    'users', { ids: [ 1 ]     }                          ) ) // fix there             Args: 2, resource: 'users', params: { ids: [ 1 ] }
//          testIt( ( )   =>  dataService.getMany(    'users',          1                                  ) ) // fix there             Args: 2, resource: 'users', params: { ids: 1 }
//          testIt( ( )   =>  dataService.getMany(                      1                                  ) ) // fix there             Args: 1, resource: 'users', params: { ids: 1 }
//          testIt( ( )   =>  dataService.getMany(                      1,2,3                              ) ) // fix there             Args: 3, resource: '1',     params: { ids: 2 }

//          testIt( ( )   =>  dataService.getRefs(    'users', { ids: [ 1,2,3 ]                          } ) ) // fix here and there

//          testIt( ( )   =>  dataService.updateOne(  'users', { id:    1,       data: { name: 'Robin' } } ) ) // fix here              Args: 2, resource: 'users', params: { id: 1, data: { name: 'Robin' } }
//          testIt( ( )   =>  dataService.updateOne(  'users',          1,     { data: { name: 'Robin' } } ) ) // fix here              Args: 3, resource: 'users', params: { id: 1, data: { name: 'Robin' } }
//          testIt( ( )   =>  dataService.updateOne(                    1,     { data: { name: 'Robin' } } ) ) // fix here              Args: 3, resource: 'users', params: { id: 1, data: { name: 'Robin' } }

//          testIt( ( )   =>  dataService.updateMany( 'users', { ids: [ 1,2,3 ], data: { name: 'Robin' } } ) ) // fix here and there    Args: 2, resource: 'users', params: { ids: [ 1, 2, 3 ], data: { name: 'Robin' } }
//          testIt( ( )   =>  dataService.updateMany(          { ids: [ 1,2,3 ], data: { name: 'Robin' } } ) ) // fix here and there    Args: 1, resource: 'users', params: { ids: [ 1, 2, 3 ], data: { name: 'Robin' } }
//          testIt( ( )   =>  dataService.updateMany(                 [ 1,2 ], { data: { name: 'Robin' } } ) ) // fix here and there    Args: 3, resource: 'users', params: { ids: [ 1, 2 ]   , data: { name: 'Robin' } }

//          testIt( ( )   =>  dataService.createOne(  'users', {                 data:   pUserData       } ) ) // fix here and there, ok now
//          testIt( ( )   =>  dataService.createOne(           {                 data: { name: 'Robin' } } ) ) // fix here and there,   Args: 1, resource: 'users', params: { data: { name: 'Robin' } }

//          testIt( ( )   =>  dataService.deleteOne(  'users', { id:    1 }                                ) ) // fix here              Args: 2, resource: 'users', params: { id: 1 }
//          testIt( ( )   =>  dataService.deleteOne(           { id:    1 }                                ) ) // fix here              Args: 1, resource: 'users', params: { id: 1 }
//          testIt( ( )   =>  dataService.deleteOne(                    1                                  ) ) // fix here              Args: 1, resource: 'users', params: { id: 1 }

//          testIt( ( )   =>  dataService.deleteMany( 'users', { ids: [ 1,2,3 ] }                          ) ) // fix here              Args: 2, resource: 'users', params: { ids: [ 1, 2, 3 ] }
//          testIt( ( )   =>  dataService.deleteMany(          { ids: [ 1,2,3 ] }                          ) ) // fix here              Args: 1, resource: 'users', params: { ids: [ 1, 2, 3 ] }
//          testIt( ( )   =>  dataService.deleteMany(                 [ 1,2,3 ]                            ) ) // fix here              Args: 1, resource: 'users', params: { ids: [ 1, 2, 3 ] }

//          testIt( ( )   =>  dataService.deleteAll(  'users'                                              ) ) // add here              Args: 1, resource: 'users', params: {}
//          testIt( ( )   =>  dataService.deleteAll(                                                       ) ) // add here              Args: 0, resource: 'users', params: {}

      async function testIt( xAction ) {
//                   console.log( String( xAction ).replace( / +\( +\) +=>/, " " ).replace( /\( +'/, "( '" ).replace( /\{ +/, "{ " ) + ":" )
                     console.log( "    " +  String( xAction ).replace( /\( +\) +=>/, " " ).replace( / +/g, " " ) + ":" )
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
*//*
[ {"id":1,"username":"mod",    "email":"mod@iodd.com",             "password":"$2a$08$3JGNAzndO90;P9LxXvGkOoWuAKNCdi3VTNZzJxfx1fzU41gUGwSC",   "active":"Yes","createdAt":"2020-11-19T07:27:52.000Z","updatedAt":"2020-11-19T07:27:52.000Z"}
, {"id":2,"username":"robin",  "email":"robin.mattern@gmail.com",  "password":"$2a$08$DNPWgsLyg5DC8ipxwrv0hu7qSXwHKO.3wGgiDXTjn4YntV/p69lAy",  "active":"Yes","createdAt":"2020-10-10T04:29:51.000Z","updatedAt":"2020-11-19T23:05:16.000Z"}
, {"id":3,"username":"Suzee",  "email":"robin.mattern@sicomm.net", "password":"$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6",  "active":"Yes","createdAt":"2020-10-13T04:58:50.000Z","updatedAt":"2020-11-19T20:52:17.000Z"}
, {"id":5,"username":"Brucee", "email":"bruce.troutman@gmail.com", "password":"$2a$08$kJftuPqVXptiJKLINzgFJutw6Xw6VXBRJTFCDmNyOz8Bg/wSG4CmW",  "active":"Yes","createdAt":"2020-10-29T18:44:49.000Z","updatedAt":"2020-12-28T20:26:06.000Z"}
, {"id":6,"username":"user",   "email":"suzee.parker@gmail.com",   "password":"$2a$08$kmsGd8m8pIrpDjHTNZyX;L2gmZlXrl/swLo5ho.dfZWPygvEL0DO",   "active":"Yes","createdAt":"2020-11-01T20:06:13.000Z","updatedAt":"2020-11-01T20:06:13.000Z"}
, {"id":7,"username":"admin",  "email":"admin@iodd.com",           "password":"$2a$08$rI34yzdH.5HL1nMpcxdqIOtSA4gSn7dDPj94Dz0YbZsAHp/U1RJtC",  "active":"Yes","createdAt":"2020-11-06T18:49:34.000Z","updatedAt":"2020-11-06T18:49:34.000Z"}
  ]
*//*
  pNewUser = { "username"    : "rebecca"
             , "email"       : "rebeccakelly.mattern@gmail.com"
             , "password"    : "$2a$08$nfKAbhYiuYq1V3oOXVyohut9aYXjV6oeEJQ5O2JpbdaSV83KzE/L6"
             , "active"      : "Yes"
                }
             , "createdAt"   : "2021-10-13T04:58:50.000Z"
             , "updatedAt"   : "2021-11-19T20:52:17.000Z"
                }
*//*

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
*//*
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
