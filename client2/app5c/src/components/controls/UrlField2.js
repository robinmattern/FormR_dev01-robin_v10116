// in src/MyUrlField.js

   import   * as React   from "react";
   import { makeStyles } from '@material-ui/core/styles';
   import   LaunchIcon   from '@material-ui/icons/Launch';   

/*  const UrlField2 = ( { record = {}, source } ) =>

       <a href={ record[ source ] } >
           { record[ source ] }
       </a>;
*/
// -----------------------------------------------------

const useStyles = makeStyles( {

    link: {
      textDecoration: 'none',
      },
    icon: {
      width         : '0.5em',
      paddingLeft   :  2,
      },

    } );
// -----------------------------------------------------

 function UrlField( { record = { }, source } ) {
 
     const classes  =  useStyles( );

    return ( 
       <a href={ record[ source ] } className={ classes.link } >
           { record[ source ] }
           <LaunchIcon className={ classes.icon } />
       </a>
       )
    }
// -----------------------------------------------------

export default UrlField;
