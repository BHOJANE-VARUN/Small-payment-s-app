import './App.css';
import Dashboard from './components/Dashboard';
import Moneytransfer from './components/Moneytransfer';
import Signin from './components/Signin';
import Signup from './components/Signup';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path:"/Signin",
      element:<Signin/>
    },
    {
      path:"/",
      element:<Signup/>,
    },
    {
      path:"/Moneytransfer",
      element:<Moneytransfer/>
    },
    {
      path:"Dashboard",
      element:<Dashboard/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
