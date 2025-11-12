import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Error from './routes/Error/index.tsx'
import Home from './routes/Home/index.tsx'
import Cadastro from './routes/Cadastro/index.tsx'
import Login from './routes/Login/index.tsx'
import QuemSomos from './routes/QuemSomos/index.tsx'

const router = createBrowserRouter([
  {path:"/", element: <App/>, errorElement:<Error/>, children:[
    {path:"/", element:<Home/>},
    {path:"/cadastro", element:<Cadastro/>},
    {path:"/login", element:<Login/>},
    {path:"/quemsomos", element:<QuemSomos/>}
  ]}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
