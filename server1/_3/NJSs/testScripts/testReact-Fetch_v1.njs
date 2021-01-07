

// import React      from  'react';
   const  React = require( 'react' )

// ----------------------------------------------------------

class UserComponent extends React.Component {

//  ---------------------------------------------------

  constructor( props ) {

    super( props );

    this.state      =
      { email       : ""
      , password    : ""
        };
    }
//  ---------------------------------------------------

  componentDidMount() {

  const fetchUserEmail = async () => {
        const response   = await fetch("/emails");
        const { email }  = await response.json();
        this.setState(   { email } );
        };

        fetchUserEmail();
    }
//  ---------------------------------------------------

  render() {
    return (
      <div>
        <h1>A user</h1>
        <p>{this.state.email}</p>
      </div>
      );
    }
//  ---------------------------------------------------
  }


