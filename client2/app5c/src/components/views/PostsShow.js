
   import { useGetOne
          , TextField     } from 'react-admin';

    const   TextField2    = ( { record, source }) => (
              <span style = {{ color: 'purple' }}>
                { record[ source ] }
              </span>
              );   

export const PostShow = ({ id }) => {
    const { data, loaded } = useGetOne('books', id);
    if (!loaded) return <span>Loading</span>; 
    return (
        <dl>
            <dt>Title</dt>
            <dd><TextField record={data} source="title" /></dd>
            <dt>Author</dt>
            <dd><TextField2 record={data} source="author" /></dd>
        </dl>   
    );
}


