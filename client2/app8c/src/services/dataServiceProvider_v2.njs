

// -------------------------------------------------------------------------------------------------

      async function testIt( xAction ) { console.log( String( xAction ).replace( /\( \) =>/, ' ' ) + ":\n", (await xAction()).data ) }

// -------------------------------------------------------------------------------------------------

    class   DataServiceProvider {

            constructor( aTable ) {
                this.URL  = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'localhost:55301'
                this.http = require ('axios').create(
                  { baseURL:   'http://' + this.URL + '/api/' + aTable
                  , headers: { 'Content-type': 'application/json' }
                    } );
                }
            getAll(                  ) { return this.http.get(   ``                      );  }

//          getOne( id               ) { return this.http.get(   `/${id}`                );  }
            getOne( id               ) { return this.http.get(   `/${id}`                ).then( function( response ) { return response.data } ) }
            getOne( id               ) { return  this.http(      `/${id}`                ).then( function( response ) { return { data: response.data } ) }


            create(     data         ) { return this.http.post(  ``,       data          );  }
            update( id, data         ) { return this.http.put(   `/${id}`, data          );  }
            delete( id               ) { return this.http.delete(`/${id}`                );  }
            deleteAll(               ) { return this.http.delete(``                      );  }
            findByusername( username ) { return this.http.get(   `?username=${username}` );  }
            }

            dataServiceProvider = new DataServiceProvider( 'users' );
//   module.exports     =     dataServiceProvider

//          testIt( ( ) =>    dataServiceProvider.getOne( 1 ) )
            console.log(      dataServiceProvider.getOne( 1 ) )

// -------------------------------------------------------------------------------------------------
/*
            Method name         API call
            ----------------    --------------------------------
            getList             GET    http://my.api.url/users?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
            getOne              GET    http://my.api.url/users/1
            getMany             GET    http://my.api.url/users?filter={"id":[1,2,3]}
            getManyReference    GET    http://my.api.url/users?filter={"author_id":1}
            create              POST   http://my.api.url/users
            update              PUT    http://my.api.url/users/1
            updateMany Multiple PUT    http://my.api.url/users/1
            deleteMany Multiple DELETE http://my.api.url/users/1
            delete              DELETE http://my.api.url/users/1
*/
---------------------------------------------------------------------

    const   fetchUtils  =  require( 'react-admin'  ).fetchUtils;
    const   stringify   =  require( 'query-string' ).stringify;

    const   apiUrl      = 'https://my.api.com/';
    const   httpClient  =  fetchUtils.fetchJson;

    const   API_Actions =

  { getList:  ( resource, params ) => {
        const { page, perPage } =  params.pagination;
        const { field, order  } =  params.sort;
        const   query = { sort:    JSON.stringify( [ field, order ] ), range: JSON.stringify( [ (page - 1) * perPage, page * perPage - 1 ] ), filter: JSON.stringify( params.filter ) };
        const   url   = `${apiUrl}/${resource}?${stringify(query)}`;
        return  httpClient( url  ).then( ( { headers, json } )  => ( { data: json, total: parseInt( headers.get('content-range' ).split( '/' ).pop(), 10 ) } ) );
        }

  , getOne:   ( resource, params ) => {
        const   url = `${apiUrl}/${resource}/${params.id}`
        return  httpClient( url  ).then( ( { json } ) => ( { data: json } ) )
        }

  , getMany:  ( resource, params ) => {
        const   query =  { filter: JSON.stringify({ id: params.ids }),};
        const   url   = `${apiUrl}/${resource}?${stringify(query)}`;
        return  httpClient( url  )                                                          .then( ( { json } ) => ( { data: json } ) );
        }

  , getManyReference: ( resource,  params ) => {
        const { page, perPage } =  params.pagination;
        const { field, order  } =  params.sort;
        const   query =   { sort:  JSON.stringify( [ field, order ] ), range: JSON.stringify( [ (page - 1) * perPage, page * perPage - 1 ] ), filter: JSON.stringify( { ...params.filter, [ params.target ]: params.id, } ) };
        const   url   = `${apiUrl}/${resource}?${stringify(query)}`;
        return  httpClient( url  ).then( ( { headers, json } )  => ( { data: json, total: parseInt( headers.get('content-range' ).split( '/' ).pop(), 10) } ) );
        }

  , update:   ( resource, params ) => {
        const   url   = `${apiUrl}/${resource}/${params.id}`
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) )
        }

  , updateMany: ( resource, params ) => {
        const   query =  { filter: JSON.stringify( { id: params.ids} ) };
        const   url   = `${apiUrl}/${resource}?${stringify(query)}`
        return  httpClient( url, { method: 'PUT',    body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) );
        }

  , create:   ( resource, params ) => {
        const   url   = `${apiUrl}/${resource}`
        return  httpClient( url, { method: 'POST',   body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: { ...params.data, id: json.id } } ) )
        }

  , delete:   ( resource, params ) => {
        const   url   = `${apiUrl}/${resource}/${params.id}`
        return  httpClient( url, { method: 'DELETE'                                      } ).then( ( { json } ) => ( { data: json } ) )
        }

  , deleteMany: ( resource, params ) => {
        const   query =  { filter: JSON.stringify( { id: params.ids } ) };
        const   url   = `${apiUrl}/${resource}?${stringify(query)}`
        return  httpClient( url, { method: 'DELETE', body: JSON.stringify( params.data ) } ).then( ( { json } ) => ( { data: json } ) );
        }
    };

function dataServiceProvider( aURL ) {

         return API_Actions
         }


export default API_Actions

