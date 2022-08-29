import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = "http://localhost:3000/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado)
        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClientesApi();
  }, []);

  const handleEliminar = async id  =>{
    const confirmar = confirm('Deseas eliminar este cliente')
    if(confirmar){
      try{
        const url = `http://localhost:3000/clientes/${id}`
        const respuesta = await fetch(url,
          {
            method: 'DELETE'
          }
          )
          await respuesta.json()
          const arrayClientes = clientes.filter(c => c.id !== id)
          setClientes(arrayClientes)
      }catch(error){
        console.log()
      }
    }
  }

  return (
    <>
      <h1 className="font-black text-4xl">Listado de clientes</h1>
      <p className="mt-3 text-lg mb-5">
        Administra tus  {' '}
        <span className="text-warning uppercase text-2xl">
        clientes
        </span>
      </p>
        <span className="text-info text-2xl">Da click sobre el nombre para ver mas a detalle cada cliente</span>
      
      <table className="w-full my-5 table-auto shadow-lg shadow-base-300 bg-base-100 rounded-lg overflow-hidden">
        <thead className="bg-base-300" >
          <th className="p-2">Nombre</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Empresa</th>
          <th className="p-2">Acciones</th>
        </thead>
        <tbody className="overflow-x-auto">
        {
          clientes.map(cliente =>(
            <Cliente key={cliente.id} cliente={cliente} handleEliminar={handleEliminar} />
          ))
          
        }
        </tbody>
      </table>

      
    </>
  );
};

export default Inicio;
