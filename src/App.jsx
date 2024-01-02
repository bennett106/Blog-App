// import config from './config/config';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import './App.css';
import {login, logout} from './store/authSlice'
import {Header, Footer} from './components'
import { Outlet } from 'react-router';

function App() {
  // console.log(config.appwrite_url);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
  }, [dispatch])
  
  return !loading ? (
    <div className=' min-h-full flex flex-wrap content-between bg-gray-500'>
      <div className=' w-full font-bold block'>
        <Header />
        <main>
          TODO:  <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App
