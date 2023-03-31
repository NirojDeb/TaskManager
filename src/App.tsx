import React from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Header from './components/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './utils/protectedRoute';
import {isUserLoggedIn} from './services/LoginService';
import { ThemeProvider } from '@mui/material';
import {createTheme} from "@mui/material";

export const UserContext = React.createContext<any>(undefined);

function App() {

  const [user,setUser] = React.useState(null);

  const themeOptions = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary:{
        main:'#808080'
      }
    }
  });

  const getUser = () =>{
    let user=isUserLoggedIn();
    setUser(user);
  }
  React.useEffect(()=>{
    getUser();
  },[])


  return (
    <div className="App">
      
      <ThemeProvider theme={themeOptions}>
        <UserContext.Provider value={{user,setUser}}>
          <BrowserRouter basename={'/'}>
            <Header />
            <Routes>
              <Route path="/" element={<ProtectedRoute >{<Dashboard />}</ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </ThemeProvider>

    </div>
  );
}

export default App;
