   import * as React                               from 'react';
   import { List, Datagrid, Edit, SimpleForm     } from 'react-admin';
// import { TextField, EmailField, UrlField      } from 'react-admin';
   import { TextField, EmailField                } from 'react-admin';
// import { TextInput, EmailInput, DisabledInput } from 'react-admin';
   import { TextInput                            } from 'react-admin';
   import                          UrlField        from '../controls/UrlField2.js';
// import                          UrlField        from './components/controls/UrlField2.js';

   export const UserList = props => (

      <List { ...props }>

        <Datagrid rowClick="edit">
          <TextField  source="id"             />
          <TextField  source="name"           />
{/*       <TextField  source="username"       />  */}
          <EmailField source="email"          />
{/*       <TextField  source="address.street" />  */}
          <TextField  source="phone"          />
          <UrlField   source="website"        />
          <TextField  source="company.name"   />
        </Datagrid>

      </List>
      );

   export const UserEdit = props => (

      <Edit { ...props }>

        <SimpleForm>
          <TextInput     source="id" disabled />
{/*       <DisabledInput source="id"          />  */}
          <TextInput     source="name"        />
          <TextInput     source="username"    />
          <TextInput     source="email"       />           {/* .(01231.01.1 RAM <EmailInput does not exist */}
          <TextInput     source="address.street" label="Address" />
          <TextInput     source="phone"       />
          <TextInput     source="website"     />
          <TextInput     source="company.name"   label="Company" />
        </SimpleForm>

      </Edit>
      );
