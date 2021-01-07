   import * as React                   from 'react';
// import      React                   from 'react';

   import { createStyles, makeStyles } from '@material-ui/core';
// import   pModule                    from '@material-ui/core';  // .(10102.01.1 RAM Usage for NodeJS v15. No workie in browser)
//  const { createStyles, makeStyles } = pModule;

//          TestFunction( )                                       // .(10102.02.1 RAM

// --------------------------------------------------------------------------------

  function  TestFunction( ) {                                     // .(10102.02.1 RAM Can be any name, usually App)

            console.log( "TestFunction[1]: ", "Hello" )           // .(10102.02.2 ERR Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:

//          ----------------------------------------------------------------

          return (                                                // .(10102.02.3 RAM Makes function a React Function Component)

             <>                                                  {/* .(10102.02.4 RAM Or <div> -- must be lowercase) */}
               { 'Hello' }                                       {/* .(10102.02.5 RAM <> forces Hello to render as JSX, not a Javascript undefined variable) */}
               <hr/>                                             {/* .(10102.02.6 RAM Must be terminated HTML tag  ) */}
             </>

            ) // eoo return
//          ----------------------------------------------------------------
            }
// --------------------------------------------------------------------------------

   export   default TestFunction;                                // .(10102.02.7 RAM Must be same name as above)
