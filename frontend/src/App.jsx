import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Layout from './Layout'
import SpareParts from './pages/SpareParts'
import StockIn from './pages/StockIn'
import StockOut from './pages/StockOut'
import NotFound from './pages/NotFound'
import Welcome from './pages/Welcome'
import Report from './pages/Report'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/dashboard' element={<Layout />}>
        <Route index={true} path='report' element={<Report />}/>
        <Route path='spares' element={<SpareParts />}/>
        <Route path='stockin' element={<StockIn />}/>
        <Route path='stockout' element={<StockOut />}/>
      </Route>
      <Route path='/register' element={<SignUp />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
