import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const consultalClienteApi = async () => {
      try {
        const url = `http://localhost:3000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    consultalClienteApi();
  }, []);

  return cliente?.nombre ? (
    <>
      <h1 className="font-black text-4xl">Editar cliente</h1>
      <p className="mt-3">
        Llena los siguientes campos para editar al cliente{" "}
        <span className="text-2xl text-warning">{cliente.nombre}</span>
      </p>
      <Formulario cliente={cliente} cargando={cargando} />
    </>
  ) : (
    <p className="mt-10 text-3xl font-extrabold">
      Este cliente no exite en la base de datos
      <span className=""></span>
    </p>
  );
};

export default EditarCliente;
