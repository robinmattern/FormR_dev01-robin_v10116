
   import { fetchUtils      }  from 'react-admin';
   import { stringify       }  from 'query-string';

    const   apiUrl          = 'localhost:50301' ;
    const   httpClient      =  fetchUtils.fetchJson;

//-------------------------------------------------------------------

export default

//  ---------------------------------------------------------------

  { getList: ( resource, params ) => {

    const { page, perPage } =  params.pagination;
    const { field, order  } =  params.sort;
    const   query =
             {  sort        :  JSON.stringify( [  field, order ] )
             ,  range       :  JSON.stringify( [ (page - 1) * perPage, page * perPage - 1] )
             ,  filter      :  JSON.stringify(    params.filter )
                };
    const   url             = `${ apiUrl }/${ resource } ? ${ stringify( query ) }`;

   return   httpClient( url )
              .then( ( { headers, json } ) => ( { data  : json
                                                , total : parseInt( headers.get('content-range').split( '/' ).pop(), 10 )
                     } ) );

            } // eom getList
//  ---------------------------------------------------------------
    } // eoo Resource provider methods
//-------------------------------------------------------------------

