   import   React                      from 'React';
// import   FunctionComponent          from 'React';

// import { createStyles, makeStyles } from '@material-ui/core';
   import   pModule                    from '@material-ui/core';
    const { createStyles, makeStyles } = pModule;

         TestFunction( )

function TestFunction( ) {

 var pStyles1 =
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
/* istanbul ignore next */
const useStylesA      =  makeStyles( ( ) => createStyles( pStyles1 ) );

   console.log( "useStylesA: ", useStylesA() )

// --------------------------------------------------------------------------------

 var pStyles2 =
      { container            : { flexGrow     :  1,   position: 'relative',    }
      , clearIcon            : { height       :  16,  width: 0,                }
      , visibleClearIcon     : { width        :  16,                           }
      , clearButton          : { height       :  24,  width: 24, padding :  0, }
      , selectAdornment      : { position     : 'absolute',      right   : 24, }
      , inputAdornedEnd      : { paddingRight :  0,                            }
      , suggestionsContainer : {                                               }
        }
 var pStyles3 =
      { name                 : 'RaAutocompleteInput' }

const useStylesB      =  makeStyles( pStyles2, pStyles2 )

   console.log( "useStylesB: ", useStylesB() )

   }

