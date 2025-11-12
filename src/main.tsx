import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Error from './routes/Error/index.tsx'
import Home from './routes/Home/index.tsx'
import Cadastro from './routes/Cadastro/index.tsx'

const router = createBrowserRouter([
  {path:"/", element: <App/>, errorElement:<Error/>, children:[
    {path:"/", element:<Home/>},
    {path:"/cadastro", element:<Cadastro/>}
  ]}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
