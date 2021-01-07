Data queries require a method (e.g. getOne), a resource (e.g. ‘posts’) and a set of parameters.
Tip: In comparison, HTTP requests require a verb (e.g. ‘GET’), an url, a list of headers (like Content-Type) and a body.
Standard methods are:

Method            Usage                                            Parameters format
----------------- ------------------------------------------------ -------------------------------------------------------------------
create            Create a single resource                         { data:   {Object} }
getList           Search for resources                             { target: {string}, filter    : { Object} }
                                                                                     , sort      : { field: {string}, order: {string} }
                                                                                     , pagination: { page: {int} ,  perPage: {int}  } }
getManyReference  Read   multiple resources related to another one { id:     {mixed} , filter    : { Object} }
                                                                                     , sort      : { field: {string}, order: {string} }
                                                                                     , pagination: { page: {int} ,  perPage: {int}  } }
getOne            Read   a single resource, by id                  { id:     {mixed}   }
getMany           Read   multiple resource, by ids                 { ids:    {mixed[ ] } }
update            Update a single resource                         { id:     {mixed},     data   : { Object }, previousData: {Object} }
updateMany        Update multiple resources                        { ids:    {mixed[ ] }, data   : { Object } }
delete            Delete a single resource                         { id:     {mixed},                          previousData: {Object} }
deleteMany        Delete multiple resources                        { ids:    {mixed[ ] }

-----------------------------------------------------------------------------------

React-Admin Provider methods                                                        BezCoder Sequelize API Methods
----------------------------------------------------------------------------------- -----------------------------
dataProvider.create(     'posts'      ,                                             create
                       {  data        : { title: "hello, world" }
                          } );

dataProvider.getList(    'posts'      ,                                             findAll
                       {  pagination  : { page: 1, perPage: 5 }
                       ,  sort        : { field: 'title', order: 'ASC' }
                       ,  filter      : { author_id: 12 }
                          } );

dataProvider.getOne(     'posts'      , { id:   123            } );                 findOne

dataProvider.getMany(    'posts'      , { ids: [123, 124, 125] } );

dataProvider.getManyReference( 'comments',
                       {  target      :  'post_id'
                       ,  id          :   123
                       ,  sort        : { field: 'created_at', order: 'DESC' }
                          } );

dataProvider.update(     'posts'      ,                                             update
                       {  id          :   123
                       ,  data        : { title: "hello, world!"  }
                       ,  previousData: { title: "previous title" }
                          } );

dataProvider.updateMany( 'posts',
                       {  ids         : [ 123, 234 ]
                       ,  data        : { views: 0 }
                          } );

dataProvider.delete(     'posts',                                                   destroy
                       {  id          :   123,
                       ,  previousData: { title: "hello, world" }
                          } );

dataProvider.deleteMany( 'posts',                                                   deleteAll
                       {  ids         : [ 123, 234 ]
                          } );

-------------------------------------------------------------------------------