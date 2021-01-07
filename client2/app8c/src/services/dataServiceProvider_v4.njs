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

function DataServiceProvider( apiURL, bDebug ) {

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
        const   url   = `/${resource}/${params.id}`;          xDebug( url )
//      return  httpClient( url  )                                                          .then( onComplete )
//      return  httpClient( url  )                                                          .then( ( { json     } ) =>        ( { data: json.data     } )   ) // no workie with axios
        return  httpClient( url  )                                                          .then(     json         => { return { data: json.data     }   } ) //    workie with axios
//      return  httpClient( url  )                                                          .then( ( { response } ) =>        ( { data: response.data } )   ) // no workie with axios

//      return  httpClient( url  )                                                          .then( (   response   ) =>        ( { data: response.data } )   )
//      return  httpClient( url  )                                                          .then(     response     =>        ( { data: response.data } )   )
//      return  httpClient( url  )                                                          .then( (   response   ) => { return { data: response.data }   } )
//      return  httpClient( url  )                                                          .then(     response     => { return { data: response.data }   } )
        }

  , getMany:  ( resource, params ) => {
        const   query =  { filter: JSON.stringify({ id: params.ids }) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  )                                                          .then( ( { json } ) => ( { data: json.data } ) );
        }

  , getManyRefs:(resource,  params ) => {                // was getManyReference
        const { page, perPage } =  params.pagination;
        const { field, order  } =  params.sort;
        const   query =   { sort:  JSON.stringify( [ field, order ] ), range: JSON.stringify( [ (page - 1) * perPage, page * perPage - 1 ] ), filter: JSON.stringify( { ...params.filter, [ params.target ]: params.id, } ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url )
        return  httpClient( url  ).then( ( { headers, json } )  => ( { data:  json, total: parseInt( headers.get('content-range' ).split( '/' ).pop(), 10) } ) );
        }

  , updateOne:( resource, params ) => {                // was update
        const   url   = `/${resource}/${params.id}`;          xDebug( url, params.data, '   PUT' )
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json.data } ) )
        }

  , updateMany:(resource, params ) => {
        const   query =  { filter: JSON.stringify( { id: params.ids} ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url, params.data, '   PUT' )
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json.data } ) );
        }

  , createOne:( resource, params ) => {                // was create
        const   url   = `/${resource}`;                       xDebug( url, params.data, '  POST' )
        return  httpClient( url, { method: 'POST',   body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: { ...params.data, id: json.id } } ) )
        }

  , deleteOne:( resource, params ) => {                // was delete
        const   url   = `/${resource}/${params.id}`;          xDebug( url, params.data, 'DELETE' )
        return  httpClient( url, { method: 'DELETE'                                      } ).then( ( { json } ) => ( { data: json.data } ) )
        }

  , deleteMany:(resource, params ) => {
        const   query =  { filter: JSON.stringify( { id: params.ids } ) };
        const   url   = `/${resource}?${stringify(query)}`;   xDebug( url, params.data, 'DELETE' )
        return  httpClient( url, { method: 'DELETE', body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json.data } ) );
        }
  , deleteAll:( resource, params ) => {
        const   query =  { filter: JSON.stringify( { id: params.ids } ) };
        const   url   = `/${resource}?deleteAll`;   xDebug( url )
        return  httpClient( url, { method: 'DELETE' } )                                     .then( ( { json } ) => ( { data: json.data } ) );
        }
    }; // eoo API_Actions
//  ------------------------------------------------------------------------------------------------------------------------------------

                bDebug     =  bDebug ? bDebug : false
      function  xDebug( aURL, pData, aMethod ) {
                aMethod    =  aMethod ? aMethod : '   GET'
            if (bDebug) { console.log( "     dataService URL: " + httpClient.defaults.baseURL + decodeURI( aURL ) ); }
            if (pData)  { console.log( "              "         + aMethod + ": " + JSON.stringify( pData ) ) }
//                        console.log( httpClient )
                }
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
       var  dataService  = DataServiceProvider(    'localhost:55301', true )
//          console.log(  "dataService.getOne(     'users', { id: 1 } ):\n", dataService.getOne( 'users', { id: 1 } ) ) // Promise { <pending> }

//          testIt( ( ) => dataService.getList(    'users', { id:    1                                } ) ) // fix here and there
//          testIt( ( ) => dataService.getOne(     'users', { id:    1                                } ) ) // ok
//          testIt( ( ) => dataService.getMany(    'users', { ids: [ 1,2,3 ]                          } ) ) // fix there
//          testIt( ( ) => dataService.getManyRefs('users', { ids: [ 1,2,3 ]                          } ) ) // fix here and there
//          testIt( ( ) => dataService.updateMany( 'users', { ids: [ 1,2,3 ], data: { name: 'Robin' } } ) ) // fix here and there
//          testIt( ( ) => dataService.updateOne ( 'users', { id:    1,       data: { name: 'Robin' } } ) ) // fix here
//          testIt( ( ) => dataService.createOne(  'users', {                 data: { name: 'Robin' } } ) ) // fix there
//          testIt( ( ) => dataService.deleteOne(  'users', { id:    1                                } ) ) // fix here
//          testIt( ( ) => dataService.deleteMany( 'users', { ids: [ 1,2,3 ]                          } ) ) // fix here
//          testIt( ( ) => dataService.deleteAll(  'users', {                 data: { name: 'Robin' } } ) ) // add here

      async function testIt( xAction ) {
//                   console.log( String( xAction ).replace( /\( \) =>/, " " ).replace( /\( +'/, "( '" ).replace( /\{ +/, "{ " ) + ":" )
                     console.log( "    " + String( xAction ).replace( /\( \) =>/, " " ).replace( / +/g, " " ) + ":" )
               try { console.log( ( await xAction( ) ).data )
                 } catch( pError ) {
                     console.log( "\n  ** dataService Axios HTTP Error:\n\n", pError )
                   } }

/*
            console.log(     "dataServiceProvider:\n",        dataServiceProvider   )      // "[Function: DataServiceProvider]
            dataServiceProvider:
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
