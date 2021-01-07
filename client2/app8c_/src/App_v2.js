   import * as React                   from 'react';
// import      React                   from 'react';

   import { createStyles, makeStyles } from '@material-ui/core';
// import   pModule                    from '@material-ui/core';  // .(10102.01.1 RAM Usage for NodeJS v15. No workie in browser)
//  const { createStyles, makeStyles } = pModule;

//          TestFunction( )                                       // .(10102.02.1 RAM

// --------------------------------------------------------------------------------

  function  TestFunction( ) {                                     // .(10102.02.1 RAM Can be any name, usually App)

        var pStyles1         =
             { root:
                {  width     : '500px'
                   }
             , bool:
                {  width     : '100%'
                ,  textAlign : 'center'
                   }
             , reason:
                {  textAlign : 'center'
                   }
               }

        var useStylesA       =  makeStyles( ( ) => createStyles( pStyles1 ) );

            console.log( "useStylesA: ", useStylesA() )          // .(10102.02.2 ERR Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:

//          ----------------------------------------------------------------

        var pStyles2 =
             { container            : { flexGrow     :  1,   position: 'relative',    }
             , clearIcon            : { height       :  16,  width: 0,                }
             , visibleClearIcon     : { width        :  16,                           }
             , clearButton          : { height       :  24,  width: 24, padding :  0, }
             , selectAdornment      : { position     : 'absolute',      right   : 24, }
             , inputAdornedEnd      : { paddingRight :  0,                            }
             , suggestionsContainer : {                                               }
               }
        var pStyles3         =
             { name                 : 'RaAutocompleteInput' }

        var useStylesB       =  makeStyles( pStyles2, pStyles3 )

            console.log( "useStylesB: ", useStylesB() )

//          ----------------------------------------------------------------

          return (                                               // .(10102.02.3 RAM Makes function a React Function Component)

             <>                                                 {/* .(10102.02.4 RAM Or <div> -- must be lowercase */}
               { 'Hello' }                                      {/* .(10102.02.5 RAM <> forces Hello to render as JSX, not a Javascript undefined variable) */}
             </>

            ) // eoo return
//          ----------------------------------------------------------------

            }
// --------------------------------------------------------------------------------

   export   default TestFunction;                                // .(10102.02.4 RAM Must be same name as above)
