import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import UserRegister from './components/User/UserRegister'
import UserLogin from './components/User/UserLogin'
import DashboardLayout from './components/DashboardLayout'
import UserProfile from './components/User/UserProfile'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/register' element={<UserRegister />} />
          <Route path='/login' element={<UserLogin />} />
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='contacts' element={<div className='text-white'>Contact</div>} />
          <Route path='users/profile' element={<UserProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
