import React from 'react';
import './css/App.css';

import Login from "./components/Login"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faBan, faTimes, faExclamation } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheck, faBan, faTimes, faExclamation)

function App() {

  return (
    <div>
      <Login></Login>
    </div>
  );
}

export default App;
