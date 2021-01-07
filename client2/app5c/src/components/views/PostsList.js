   import * as React                        from "react";
   import { List, Datagrid
          , TextField, ReferenceField }     from 'react-admin';

    const   TextField2    = ( { record, source }) => (
              <span style = {{ color: 'purple' }}>
                { record[ source ] }
              </span>
              );          

   export   const PostsList = props => (

      <List { ...props }>

        <Datagrid       rowClick = "edit">

            <TextField    source = "id"     />

          <ReferenceField source = "userId" reference = "users">
            <TextField    source = "id"     label     = "UID" />
          </ReferenceField>

          <ReferenceField source = "userId" reference = "users">
{/*         <TextField    source = "id"     />                       */}{/* .(10101.01.1 RAM Something goes wrong if id is used twice and/or two reference fields) */}
            <TextField    source = "name"   label     = { "USER" } />
          </ReferenceField>

            <TextField2    
                          source = "titlex"  
                          Label  = { "TITLEx" } 
            />
            <TextField   { ...props }  
                          source = "title"  
                          Label  = { "TITLEx" } 
            />
            <TextField    source = "body"   />

        </Datagrid>

      </List>
      );
