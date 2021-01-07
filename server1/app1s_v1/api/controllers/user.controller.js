   const    db       =  require( '../models' );
   const    user     =  db.user;                // .(01028.02.1 RAM Should it be  db.user)
   const    Op       =  db.Sequelize.Op;

// Create and Save a new user
// -----------------------------------------------------------------------------------------
   exports.create = ( req, res ) => {

       if (!req.body.username) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
            return;
            }

      const user =            // Create a user
             {  
           
             //   <<COLNAME>>   : req.body.<<COLNAME>>,  Delete , on last line + createdAt,updatedAt
                id         : req.body.id,
                username   : req.body.username,
                email      : req.body.email,
                password   : req.body.password,
                active     : req.body.active

                }; 

            user.create( user )    // Save user in the database
                .then( data => {
                                     res.send( data ); })
                .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the user." });
     });
   };

// Retrieve all users from the database.
// -----------------------------------------------------------------------------------------
  exports.findAll = (req, res) => {

   const username = req.query.username;
     var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;                            //#.(01028.05.1)

//user.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  user.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
              var nBeg = 1, nEnd = data.length, nCnt = data.length                                              // .(10103.01.3 RAM Get range counts)
                                     res.setHeader('Accept-Ranges', 'users'      );                             //#.(10103.01.4 RAM Send Header)
                                     res.setHeader('Content-Range', `users ${nBeg}-${nEnd}/${nCnt}` );          // .(10103.01.5 RAM Send Header)
//                                   res.header(   'Content-Range', `users ${nBeg}-${nEnd}/${nCnt}` );          //#.(10103.01.4 RAM Send Header)
//                                   res.set(    { 'content-range': `users ${nBeg}-${nEnd}/${nCnt}` } );        //#.(10103.01.4 RAM Send Header)
//                                   res.set(    { 'cache-control': 'no-cache' } )                              //#.(10103.01.4 RAM Send Header)
//                                   res.headers[ 'X-Total-Count' ] = nCnt                                      //#.(10103.01.4 RAM Send Header)

                                     res.send( data );  
//                                   res.header(   'Content-Range', `users ${nBeg}-${nEnd}/${nCnt}` );         // [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                                     } )
      .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving users." } ); } );
         };

// Find a single user with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

  user.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a user by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//user.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  user.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "user was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe user was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a user with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//user.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  user.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "user was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe user was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all users from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  user.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} users were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all users." } ); } );
  };

// find all published user
// -----------------------------------------------------------------------------------------
exports.findAllPublished = (req, res) => {

  user.findAll({ where: { published: true } })
        .then(  data => {
                                     res.send( data ); })
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving users." } ); } );
  };
