// -------------------------------------------------------------------------------------------------
/*
            Method name         API call
            ----------------    --------------------------------
            getList             GET    http://my.api.url/users?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
            getOne              GET    http://my.api.url/users/1
            getMany             GET    http://my.api.url/users?filter={"id":[ 1,2,3 ]}
            getManyReference    GET    http://my.api.url/users?filter={"author_id":1}
            create              POST   http://my.api.url/users
            update              PUT    http://my.api.url/users/1
            updateMany Multiple PUT    http://my.api.url/users/1
            deleteMany Multiple DELETE http://my.api.url/users/1
            delete              DELETE http://my.api.url/users/1

            getList(           'users'   , { filter: {  author_id: 1 }, sort: { field: 'title', order:  'ASC'  },   pagination: { page: 1, perPage: 5 } } );
            getOne(            'users'   , { id:    1                                                                                                   } );
            getMany(           'users'   , { ids: [ 1,2,3 ]                                                                                             } );
            getManyReference(  'roles'   , { id:    1,                  sort: { field: 'title', order:  'DESC' },       target: 'post_id'               } );
            update(            'users'   , { id:    1,                  data: { title: "hello, world" }, previousData: { title: "previous title" }      } );
            updateMany(        'users'   , { ids: [ 1,2 ],              data: { views:  0 }                                                             } );
            create(            'users'   , {                            data: { title: "hello, world" }                                                 } );
            delete(            'users'   , { id:    1,                                                   previousData: { title: "hello, world"   }      } );
            deleteMany(        'users'   , { ids: [ 1,2 ]                                                                                               } );

            getAll(                  ) { return http.get(   `/users`                      );  }
            get(    id               ) { return http.get(   `/users/${id}`                );  }
            create(     data         ) { return http.post(  `/users`,       data          );  }
            update( id, data         ) { return http.put(   `/users/${id}`, data          );  }
            delete( id               ) { return http.delete(`/users/${id}`                );  }
            deleteAll(               ) { return http.delete(`/users`                      );  }
            findByusername( username ) { return http.get(   `/users?username=${username}` );  }

            getList(              )  http.get(   `/users`              )
            getOne(     id        )  http.get(   `/users/${id}`        )
            getMany(    ids       )  http.get(   `/users/${ids}`       )
            getManyRefs(ids, refs )  http.get(   `/users/${ids},  refs )
            createOne(       data )  http.post(  `/users`,        data )
            updateOne(  id,  data )  http.put(   `/users/${id}`,  data )
            updateMany( ids, data )  http.put(   `/users/${ids}`, data )
            deleteOne(  id        )  http.delete(`/users/${id}`        )
            deleteMany( ids       )  http.delete(`/users`              )
            deleteAll(            )  http.delete(`/users`              )

            findByusername( username ) { return http.get(   `/users?username=${username}` );  }

*/
// ----------------------------------------------------------------------------------------------------

    const   stringify   =  require( 'query-string' ).stringify;
//  const   fetchUtils  =  require( 'react-admin'  ).fetchUtils; const httpClient = fetchUtils.fetchJson;
    const   axios       =  require( 'axios' )

function DataServiceProvider( apiURL,  resource, nDebug ) { // Output 1) URL, Request.data, 2) Headers, 3) Response.data
        var aResource    = (resource ? resource : '') + ''; nDebug = (nDebug + '').match( /[0-3]/ ) ? nDebug + 0 : 0
        if (arguments.length === 2 && (resource + '').match( /[0-9]/)) { aResource = ''; nDebug = resource; };
//          console.log( `apiURL: ${apiURL}, aResource: '${aResource}', nDebug: ${nDebug}, nArgs: ${arguments.length}` ); // process.exit()

    const   httpClient =  axios.create(
                  { headers: { 'Content-type': 'application/json' }
                  , baseURL:   'http://' + apiURL + '/api'
                    } );

 function   onComplete( response ) {
        if (response.isAxiosError) { return { error: `Error ${response.errno}: ${response.syscall} ${response.code} ${response.address}:${response.port}` }
        } else {                     return { data:  response.data  } }
            }
// ----------------------------------------------------------------------------------------------------

    const   API_Actions =

  { getList:  ( resource, params ) => {
        const { page, perPage } =  params.pagination;
        const { field, order  } =  params.sort;
        const   query = { sort:    JSON.stringify( [ field, order ] ), range: JSON.stringify( [ (page - 1) * perPage, page * perPage - 1 ] ), filter: JSON.stringify( params.filter ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  ).then( ( { headers, json } )  => ( { data:  json, total: parseInt( headers.get('content-range' ).split( '/' ).pop(), 10 ) } ) );
        }

  , getOne:     function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'one' );
        const   url   = `/${resource}/${params.id}`;           xDebug( url )
        return  httpClient( url  )                                                          .then(     response      => { return  yDebug( response )        } )
        }

  , getMany:    function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'many' );
        const   query = { filter: JSON.stringify( { id: params.ids } ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  )                                                          .then( ( { json } ) => ( { data: json } ) );
        }

  , getRefs:  ( resource, params ) => {                // was getManyReference
        const { page, perPage } =  params.pagination;
        const { field, order  } =  params.sort;
        const   query = { sort:  JSON.stringify( [ field, order ] ), range: JSON.stringify( [ (page - 1) * perPage, page * perPage - 1 ] ), filter: JSON.stringify( { ...params.filter, [ params.target ]: params.id, } ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  ).then( ( { headers, json } )  => ( { data:  json, total: parseInt( headers.get('content-range' ).split( '/' ).pop(), 10) } ) );
        }

  , updateOne:  function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'one' );
        const   url   = `/${resource}/${params.id}`;          xDebug( url, params.data, '   PUT' )
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) )
        }

  , updateMany: function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'many' );
        const   query = { filter: JSON.stringify( { id: params.ids} ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url, params.data, '   PUT' )
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) )
        }

  , createOne:  function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'new' );
        const   url   = `/${resource}`;                       xDebug( url, params.data, '  POST' )
        return  httpClient( url, { method: 'POST',   data: JSON.stringify( params.data ) } ).then(     response      => { return  yDebug( response )                                  } )
        }

  , deleteOne:  function( resource, params ) {
              [ resource, params ] = fixParams( arguments, 'one' );
        const   url   = `/${resource}/${params.id}`;          xDebug( url, params.data, 'DELETE' )
        return  httpClient( url, { method: 'DELETE'                                      } ).then( ( { json } ) => ( { data: json } ) )
        }

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

      function  fixParams( mArgs, aMethod ) {
            if (mArgs.length == 0) { mArgs[0] = aResource };
            if (mArgs.length == 2 && mArgs[1].data) { mArgs = [ aResource, ...mArgs ] };
            if (mArgs.length == 1) { mArgs[1] = (mArgs[0] + '').match( /^[a-z]+/ ) ? 1 : mArgs[0]; mArgs[0] = aResource; }

            var aTable  =  mArgs[0] ? mArgs[0] : ''

            if (aMethod == 'new'  ) { var pParams =  mArgs[1]                }
            if (aMethod == 'all'  ) { var pParams = { }                }
            if (aMethod == 'one'  ) { var pParams = (mArgs[1] && mArgs[1].id)  ? mArgs[1] : { id:  mArgs[1] }
//                                        pParams =  pData ? { ...pParams, ...pData } : pParams
                                          }
            if (aMethod == 'many' ) { var pParams = (mArgs[1] && mArgs[1].ids) ? mArgs[1] : { ids: mArgs[1] }
//                                        pParams =  pData ? { ...pParams, ...pData } : pParams
                                          }
                                          pParams =  (mArgs.length == 3) ? { ...pParams, ...mArgs[2] } : pParams

//              console.log( `     Args: ${mArgs.length}, resource: '${aTable}', params:`, pParams ); process.exit()
       return [ aTable, pParams ]
                } // eof xDebug
//     ------   -----------------------------------------------------------

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
//     ------   -----------------------------------------------------------

      function  yDebug( pResponse ) {
            if (nDebug >= 2) { console.log( "    Response.Headers: " + JSON.stringify( pResponse.headers ) )
            if (nDebug >= 3) { console.log( " data: ", pResponse.data ) }
                } // eif bDebug
        return  pResponse
                } // eof xDebug
//     ------   -----------------------------------------------------------

        return  API_Actions

    } // eof DataServiceProvider
//  ------------------------------------------------------------------------------------------------------------------------------------------------

   module.exports = DataServiceProvider
