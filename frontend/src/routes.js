import PaginaPadrao from 'components/PaginaPadrao';
import Carrinho from 'pages/Carrinho';
import Categoria from 'pages/Categoria';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoutes';
import { AuthProvider } from 'AuthContext';
//<Route index element={<Home />} />

export default function Router() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
              <Route element={<ProtectedRoute />}>
                <Route path='/home' element={<PaginaPadrao />}>
                  <Route index element={<Home />} />     
                  <Route path='categoria/:nomeCategoria' element={<Categoria />} />
                  <Route path='carrinho' element={<Carrinho /> } />
                </Route>
              </Route>     
          </Routes>
       </BrowserRouter>
    </AuthProvider>
  )
}