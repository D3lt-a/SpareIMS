import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Layout from './Layout'
import SpareParts from './pages/SpareParts'
import StockIn from './pages/StockIn'
import StockOut from './pages/StockOut'
import NotFound from './pages/NotFound'
import Report from './pages/Report'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />

      {/* <Route element={<ProtectedRoute />}> */}
        <Route path='/dashboard' element={<Layout />}>
          <Route index={true} path='report' element={<Report />} />
          <Route path='spares' element={<SpareParts />} />
          <Route path='stockin' element={<StockIn />} />
          <Route path='stockout' element={<StockOut />} />
        </Route>
      {/* </Route> */}

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
