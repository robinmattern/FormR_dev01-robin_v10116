   import * as React                   from 'react';
   import { createStyles, makeStyles } from '@material-ui/core';

// --------------------------------------------------------------------------------

  function  TestFunction( ) {

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

            console.log( "StylesA_Names", useStylesA() )
/*
            useStylesA
              bool                  : "makeStyles-bool-52"
              reason                : "makeStyles-reason-53"
              root                  : "makeStyles-root-51"
 */
//          ----------------------------------------------------------------

        var pStyles2                =
             { container            : { flexGrow     :   1,  position : 'relative'        }
             , clearIcon            : { height       :  16,  width    :  0                }
             , visibleClearIcon     : { width        :  16,                               }
             , clearButton          : { height       :  24,  width    :  24, padding :  0 }
             , selectAdornment      : { right        :  24,  position : 'absolute'        }
             , inputAdornedEnd      : { paddingRight :   0                                }
             , suggestionsContainer : {                                                   }
               }
        var pStyles2Name            =
             { name                 : 'RaAutocompleteInput' }

//      var useStylesB              =  makeStyles(   pStyles2, pStylesName )
        var   pStylesB              =  makeStyles(   pStyles2, pStylesName )()
        var   mStylesB              =  Object.keys(  pStylesB ).map( aKey => pStylesB[ aKey ] )

            console.log( "StylesB",    createStyles( pStyles2 ) )
/*
              clearButton           : { height       :  24,  width    :  24, padding :  0 }
              clearIcon             : { height       :  16,  width    :  0                }
              container             : { flexGrow     :   1,  position : "relative"        }
              inputAdornedEnd       : { paddingRight :   0                                }
              selectAdornment       : { position     : "absolute",       right       : 24 }
              suggestionsContainer  : {                                                   }
              visibleClearIcon      : { width        :  16                                }
*/
//          console.log( "StylesB_Names", makeStyles( pStyles2, 'RaAutocompleteInput' )() )
            console.log( "StylesB_Names", makeStyles( pStyles2,  pStyles2Name         )() )
/*
            useStylesB_Names
              clearButton           : "RaAutocompleteInput-clearButton-57"
              clearIcon             : "RaAutocompleteInput-clearIcon-55"
              container             : "RaAutocompleteInput-container-54"
              inputAdornedEnd       : "RaAutocompleteInput-inputAdornedEnd-59"
              selectAdornment       : "RaAutocompleteInput-selectAdornment-58"
              suggestionsContainer  : "RaAutocompleteInput-suggestionsContainer-60"
              visibleClearIcon      : "RaAutocompleteInput-visibleClearIcon-56"
 */
//          ----------------------------------------------------------------

          return (

             <pre>
               <div>{ "useStylesA(): " + JSON.stringify( useStylesA( ) ) }</div>
               <hr/>
               <div>{ "useStylesA(): " + mStylesB }</div>
             </pre>

            ) // eoo return
//          ----------------------------------------------------------------

            }
// --------------------------------------------------------------------------------

   export   default TestFunction;


























