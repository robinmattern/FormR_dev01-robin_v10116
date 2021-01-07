   import * as React                    from 'react';
   import { createStyles, makeStyles  } from '@material-ui/core';

   import { ArrayField,   Datagrid    } from 'react-admin';  // Must be same case as file, if not Error: Cann find file: 'index.js' ...)
   import { BooleanField, TextField   } from 'react-admin';
// import ( BooleanField, TextField   } from 'react-admin';

/* import { ArrayField,   Datagrid
          , BooleanField, TextField   } from 'react-admin';
*/
// --------------------------------------------------------------------------------

  function  TestFunction( props ) {

        var pStyles          =
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

        var useStyles        =  makeStyles( pStyles );
        var pClasses         =  useStyles( );    // initialize the styles

   return (

            <ArrayField source="bans" reference="bans" >   {/* Cannot find module: 'React-Admin' */} {/* React.Children.only expected to receive a single React element child. */}

              <Datagrid                                              className = { pClasses.root   } >
                <BooleanField label = "Banned ?" source = "isBanned" className = { pClasses.bool   } />
                <TextField    label = "Reason"   source = "reason"   className = { pClasses.reason } />
              </Datagrid>

            </ArrayField>

            ) // eoo return
//          ----------------------------------------------------------------
            }
// --------------------------------------------------------------------------------

   export   default TestFunction;


























