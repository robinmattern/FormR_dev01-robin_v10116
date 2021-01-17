<style>
    body { font-size:  15pt; }  /* 10pt is the default size */
    p  { line-height: 1.2em; }  /* 1.4em is the default line-height */
    p  { margin:        0em; }  /* .5em is the default top and bottom margin */
</style>

## FormR 

FormR is a simple easy to use application that uses
- A NodeJS ExpressJS server to receive API calls that retreive and store data to a any database using Sequelize.  
- A React-Admin client that provides authenticated users create, retrieve, update and delete (CRUD) records for any database table. 

The magic occurs by just providing a connection to a remote or local database, and having the
application know how to perform the CRUD operations on the columns for any and all table. 
FormR also can be customized when the default API actions or column schema needs to be customized.

This example connects to an IODD database server that contains a database containing informaton 
related to developers, members of the Institute of Database Developers, who can provide expert 
advise on building business database application.

The documentation herein also provides step by step instruction on how to setup a Virtual Private 
Server that can connect to a database server and publish the FormR application.  
