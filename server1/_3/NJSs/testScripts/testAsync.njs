

//       const processDataAsycn1 = async (num) => {
async function processDataAsycn1( num ) {
           if (typeof num === 'number') { return 2*num;
           } else                       { throw new Error('Something went wrong');
               }
             };





const getDataPromise = (num) => new Promise( ( resolve, reject ) => {
   setTimeout( () => {
              (typeof num === 'number') ? resolve( num * 2 )
                                        : reject( 'Input must be an number' );
            }, 2000 );
   });

//       const processDataAsycn2 = async () => {
async function processDataAsycn2( num ) {
//     let data = await getDataPromise( num );
       let data = await getDataPromise( 'a' );
    return data;
           };



/*               processDataAsycn1(21)
                .then(          ( data  ) => { console.log(  'Data from processDataAsycn() with async( When promise gets resolved ): ' + data ); } )
                .catch(         ( error ) => { console.log( 'Error from processDataAsycn() with async( When promise gets rejected ): ' + error); } )
*/

               processDataAsycn2(21)
                .then(  function( data  )    { console.log(  'Data from processDataAsycn() with async( When promise gets resolved ): ' + data ); } )
                .catch( function( error )    { console.log( 'Error from processDataAsycn() with async( When promise gets rejected ): ' + error); } );

