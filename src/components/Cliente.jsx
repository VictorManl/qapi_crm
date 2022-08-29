import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar }) => {
  
  const  navigate  = useNavigate()

  const { nombre, email, empresa, telefono, id } = cliente  
  return (
   

  <tr className="font-semibold  duration-200 cursor-pointer hover:bg-base-300" >
    <td className="px-4 py-3 text-center capitalize" onClick={() => navigate(`/clientes/${id}`)} >{nombre}</td>
    <td className="px-4 py-3"> 
      <p className="font-semibold"> <span className="font-bold text-primary-content">Email: </span> {email} </p>
      <p className="font-semibold"> <span className="font-bold text-primary-content">Tel: </span> {telefono} </p>
    </td>
    <td className="px-4 py-3">{ empresa }</td>
    <td className="flex flex-col flex-wrap px-4 py-2">
      <button 
        onClick={() =>  navigate(`/clientes/editar-cliente/${id}`)}
        className="btn btn-ghost my-1 z-50" >
        Editar
      </button>

      <button 
        onClick={() => handleEliminar(id)}
        className="btn btn-outline my-1 ">
        Eliminar
      </button>
    </td>
  </tr>
  );
};

export default Cliente;
