
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CreateMedicineRequest from './pages/CreateMedicineRequest';
import ReadMedicine from './pages/readMedicine';
import SupplyMedicine from './pages/SupplyMedicine';
import VerifyVoucher from './pages/VerifyVoucher';
import Homepage from './pages/Homepage';
import MoDashboard from './pages/MoDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import DmoDashboard from './pages/DmoDashboard';


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/createMedicine' element={<CreateMedicineRequest/>}/>
    <Route path='/readmed' element={<ReadMedicine/>}/>
    <Route path='/supplyMedicine' element={<SupplyMedicine/>}/>
    <Route path='/verifyVoucher' element={<VerifyVoucher/>}/>
    <Route path='/moDashboard' element={<MoDashboard/>}/>
    <Route path='/cusDashboard' element={<CustomerDashboard/>}/>
    <Route path='/dmoDashboard' element={<DmoDashboard/>}/>
    </>
  ))

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  )
}

export default App