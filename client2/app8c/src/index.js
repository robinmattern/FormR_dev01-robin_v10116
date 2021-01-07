   import      React              from 'react';
   import   ReactDOM              from 'react-dom';
   import { BrowserRouter }       from 'react-router-dom';

   import   App                   from './App.js';   // .(10102.01.2 RAM File name is case sensitive)
// import * as      serviceWorker from './serviceWorker';

          ReactDOM.render(

            <BrowserRouter>
              <App />
            </BrowserRouter>

          , document.getElementById("root")
            );

//                  serviceWorker.unregister( );
