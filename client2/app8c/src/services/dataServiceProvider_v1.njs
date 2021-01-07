    const   axios = require ('axios') ;

    const   REACT_APP_API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'localhost:55301'

       var  http = axios.create(
              { baseURL:   'http://' + REACT_APP_API_URL + '/api'
              , headers: { 'Content-type': 'application/json' }
                } );
// -------------------------------------------------------------------------------------------------

   async function testIt( xAction ) { console.log( String( xAction ).replace( /\( \) =>/, ' ' ) + ":\n", (await xAction()).data ) }

// -------------------------------------------------------------------------------------------------

    class   DataServiceProvider {

            getAll(                  ) { return http.get(   `/users`                      );  }
            get(    id               ) { return http.get(   `/users/${id}`                );  }
//    async get(    id               ) { await  http.get(   `/users/${id}`                );  }
            create(     data         ) { return http.post(  `/users`,       data          );  }
            update( id, data         ) { return http.put(   `/users/${id}`, data          );  }
            delete( id               ) { return http.delete(`/users/${id}`                );  }
            deleteAll(               ) { return http.delete(`/users`                      );  }
            findByusername( username ) { return http.get(   `/users?username=${username}` );  }
            }
*//*
            console.log(     "DataServiceProvider:\n",       DataServiceProvider   )  //  String( DataServiceProvider )
//          console.log(     "DataServiceProvider():\n",     DataServiceProvider() )  //  Error: Class constructor DataServiceProvider cannot be invoked without 'new'
            console.log( "new DataServiceProvider:\n",   new DataServiceProvider   )  // "DataServiceProvider {}"
            console.log( "new DataServiceProvider():\n", new DataServiceProvider() )  // "DataServiceProvider {}"
*//*
            dataServiceProvider = new DataServiceProvider;
//   module.exports     =     dataServiceProvider

            testIt( ( ) =>    dataServiceProvider.get( 1 ) )
//          console.log(      dataServiceProvider.get( 1 ) )
*/
// -------------------------------------------------------------------------------------------------
