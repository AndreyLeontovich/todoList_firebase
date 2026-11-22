import { BrowserRouter } from 'react-router'
import { UserContext, useUserState } from './context/userContext'


import './App.css'

import { AppRoutes } from './components/appRoutes/AppRoutes' 

function App() {
  const user = useUserState()

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
