   import * as React                               from 'react';
   import { SimpleList, List, Datagrid
          , EmailField, TextField      } from 'react-admin';

   import { useMediaQuery }              from '@material-ui/core';

   export const UserList = props => {

      const isSmall         =  useMediaQuery(theme => theme.breakpoints.down('sm'));

      return (

        <List title="All users" { ...props }>

          {isSmall ? (

            <SimpleList
              primaryText   = { record => record.name     }
              secondaryText = { record => record.username }
              tertiaryText  = { record => record.email    }
              />

          ) : (

            <Datagrid>
              <TextField  source = "id"       />
              <TextField  source = "name"     />
              <TextField  source = "username" />
              <EmailField source = "email"    />
            </Datagrid>

          ) }

        </List>
        );
      };
