

   const    stringify                  =  require( 'query-string' ).stringify;



// const  { fetchUtils               } =  require( 'ra-core' );
// const    fetch                      =  require( 'node-fetch' );
   const    fetch                      =  require( 'axios' );

/*          fetch.get( 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' )
              .then(         response => {
                console.log( response.data.url );
                console.log( response.data.explanation );
                process.exit( )
                } )
             .catch( error => { console.log( error );
                process.exit( )
                } );
*/

// const Headers = {}

/**
 * Maps react-admin queries to a simple REST API
 *
 * This REST dialect is similar to the one of FakeRest
 *
 * @see https://github.com/marmelab/FakeRest
 *
 * @example
 *
 *     getList  => GET    http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 *     getOne   => GET    http://my.api.url/posts/123
 *     getMany  => GET    http://my.api.url/posts?filter={id:[123,456,789]}
 *     update   => PUT    http://my.api.url/posts/123
 *     create   => POST   http://my.api.url/posts
 *     delete   => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 *     import * as React           from "react";
 *     import { Admin, Resource }  from 'react-admin';
 *     import   simpleRestProvider from 'ra-data-simple-rest';
 *
 *     import { PostList } from './posts';
 *
 *      const   App = () => (
 *
 *              <Admin dataProvider = { simpleRestProvider( 'http://path.to.my.api/' ) }>
 *                <Resource name="posts" list = { PostList } />
 *              </Admin>
 *              );
 *
 *     export   default App;
 */

  function  simpleRestProvider( apiUrl, httpClient, countHeader ) {

//      if (httpClient  === void 0) { httpClient  =  fetchUtils.fetchJson; }
        if (httpClient  === void 0) { httpClient  =  fetch; }
        if (countHeader === void 0) { countHeader = 'Content-Range'; }


    return (

//      ------------------------------------------------------------------------------------------------------------

    { getList:  function( resource, params ) {
                    params       =  params || {}
          var  _a = params.pagination      || {},  page   = (_a && _a.page  ) || 1,    perPage = (_a && _a.perPage) || 10;
          var  _b = params.sort,                   field  = (_b && _b.field ) || null, order   = (_b && _b.order)   || null;
          var  _c = params.filter,                 filter = (_c && _c.filter) || null

          var   rangeStart      = (page - 1) * perPage;
          var   rangeEnd        =  page * perPage - 1;

          var   query           =
                 {  sort        :  JSON.stringify( [ field, order ] )
                 ,  range       :  JSON.stringify( [ rangeStart, rangeEnd ] )
                 ,  filter      :  JSON.stringify(   filter)
                    };

          var   url             =    apiUrl + "/" + resource + "?" + stringify(query);

          var   options         =  countHeader === 'Content-Range'
//                 ? { headers  :  new Headers( { Range:     resource + "=" + rangeStart + "-" + rangeEnd } ) }
                   ? { headers  :  { 'Range' : resource + "=" + rangeStart + "-" + rangeEnd } }
                   : { };       // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.

       return   httpClient( url, options )
                 .then( function( _a ) {
//                 var  headers = _a.headers
                   var  json    = _a.data;      // .(was _a.json)
//                 if (!headers.has( countHeader ) ) {
//                      throw new Error( "The " + countHeader + " header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare " + countHeader + " in the Access-Control-Expose-Headers header?");
//                      }
                        console.log( json )
            return   {  data    :  json
                     ,  total   :  json.length
//                   ,  total   :  countHeader === 'Content-Range'
//                                  ?  parseInt( headers.get( 'content-range' ).split( '/' ).pop(), 10 )
//                                  :  parseInt( headers.get(  countHeader.toLowerCase() ) )
                       }; // eor return
                } );
        }
//      ------------------------------------------------------------------------------------------------------------

      , getOne: function( resource, params ) {

        return  httpClient(          apiUrl + "/" + resource + "/" + params.id)
                 .then( function( _a ) {
                   var  json = _a.data;      // .(was _a.json)
                        console.log( json )
             return ( { data: json } );
                } );
        }
//      ------------------------------------------------------------------------------------------------------------

      , getMany:function( resource, params ) {

          var   query           =
                 { filter       :  JSON.stringify( { id: params.ids } )
                   };
          var   url             =    apiUrl + "/" + resource + "?" + stringify( query )   ;

       return   httpClient( url )
                 .then( function( _a ) {
                   var  json    = _a.data;  // .(was _a.json)
                        console.log( json )
             return ( { data: json } );
                } );
        }
//      ------------------------------------------------------------------------------------------------------------

      , getManyReference: function (resource, params) {

            var _a;
            var _b = params.pagination, page = _b.page, perPage = _b.perPage;
            var _c = params.sort, field = _c.field, order = _c.order;
            var rangeStart = (page - 1) * perPage;
            var rangeEnd = page * perPage - 1;
            var query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify(__assign(__assign({}, params.filter), (_a = {}, _a[params.target] = params.id, _a))),
            };
            var url = apiUrl + "/" + resource + "?" + stringify(query);
            var options = countHeader === 'Content-Range'
                ? {
                    // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                    headers: new Headers({
                        Range: resource + "=" + rangeStart + "-" + rangeEnd,
                    }),
                }
                : {};
            return httpClient(url, options).then(function (_a) {
                var headers = _a.headers, json = _a.json;
                if (!headers.has(countHeader)) {
                    throw new Error("The " + countHeader + " header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare " + countHeader + " in the Access-Control-Expose-Headers header?");
                }
                return {
                    data: json,
                    total: countHeader === 'Content-Range'
                        ? parseInt(headers.get('content-range').split('/').pop(), 10)
                        : parseInt(headers.get(countHeader.toLowerCase())),
                };
            });
        },
        update: function (resource, params) {
            return httpClient(apiUrl + "/" + resource + "/" + params.id, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            }).then(function (_a) {
                var json = _a.json;
                return ({ data: json });
            });
        },
        // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
        updateMany: function (resource, params) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient(apiUrl + "/" + resource + "/" + id, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                });
            })).then(function (responses) { return ({ data: responses.map(function (_a) {
                    var json = _a.json;
                    return json.id;
                }) }); });
        },
        create: function (resource, params) {
            return httpClient(apiUrl + "/" + resource, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(function (_a) {
                var json = _a.json;
                return ({
                    data: __assign(__assign({}, params.data), { id: json.id }),
                });
            });
        },
        delete: function (resource, params) {
            return httpClient( apiUrl + "/" + resource + "/" + params.id, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'text/plain',
                }),
            }).then(function (_a) {
                var json = _a.json;
                return ({ data: json });
            });
        },
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        deleteMany: function (resource, params) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient(apiUrl + "/" + resource + "/" + id, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'text/plain',
                    }),
                });
            })).then(function (responses) { return ({
                data: responses.map(function (_a) {
                    var json = _a.json;
                    return json.id;
                }),
            }); });
        },
    });
};


module.exports = simpleRestProvider

   simpleRestProvider( 'http://localhost:55301/api' ).getOne(  'users', { id: 1       } )
// simpleRestProvider( 'http://localhost:55301/api' ).getList( 'users'                  )
// simpleRestProvider( 'http://localhost:55301/api' ).getMany( 'users', { ids : [1,2] } )




