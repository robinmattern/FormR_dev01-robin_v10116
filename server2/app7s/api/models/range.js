module.exports = (req, res, next) => {

   var nBeg   =  0
   var nEnd   =  20
   var nCnt   =  20
// var aTable = 'users'
   var aTable =  req.originalUrl.replace( /\?.+$/, '').substr(1) 

   res.setHeader('Access-Control-Expose-Headers', 'Content-Range'     );      // .(10103.05.1 RAM Allow use of 'Content-Range' Header)
   res.setHeader('Accept-Ranges', `${aTable}`                         );      // .(10103.01.4 RAM Both are require for browser, ie. Chrome)

// res.header(   'Content-Range', 'posts 0-20/20')
   res.header(   'Content-Range', `${aTable} ${nBeg}-${nEnd}/${nCnt}` );    //#.(10103.01.4 RAM Send Header)
// res.set(    { 'content-range': `${aTable} ${nBeg}-${nEnd}/${nCnt}` } );    //#.(10103.01.4 RAM Send Header)
// res.setHeader('Content-Range', `${aTable} ${nBeg}-${nEnd}/${nCnt}` );      // .(10103.01.5 RAM Send Header)

// res.set(    { 'cache-control': 'no-cache' } )                              //#.(10103.01.4 RAM Send Header)

// res.headers [ 'X-Total-Count' ] = nCnt                                     //#.(10103.01.4 RAM undefined)
// res._headers[ 'X-Total-Count' ] = nCnt                                     //#.(10103.01.4 RAM deprecated)
// res.set(    { 'X-Total-Count':    nCnt } )                                 //#.(10103.01.4 RAM undefined)

   next()
   }

// res.setHeader('Access-Control-Expose-Headers', 'Content-Range'     );      // .(10103.05.1 RAM Allow use of 'Content-Range' Header)
// ---------------------------------------------------------------------
// on client using ra-core.fetchUtils.fetchJson
// response.headers.get('cache-control')  
//  "no-cache"
// response.headers.get('Content-Range')  
//   null 
