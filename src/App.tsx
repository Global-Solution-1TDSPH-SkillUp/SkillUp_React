import { Outlet } from "react-router-dom";
import Cabecalho from "./components/Cabecalho/cabecalho";
import Rodape from "./components/Rodape/Rodape";

export default function App(){
  return(
    <div className="flex flex-col min-h-screen">
      <Cabecalho/>
      <Outlet/>
      <Rodape/>
    </div>
  );
}