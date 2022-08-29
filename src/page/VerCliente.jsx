import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner'

const VerCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { nombre, email, empresa, telefono, notas } = cliente;

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteApi = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };

    obtenerClienteApi();
  }, []);

  return (
     cargando ? <Spinner/>: Object.keys(cliente).length === 0 ? (
    <p className="text-4xl font-bold mt-10">
      El cliente no se encuetra en la base de datos
    </p>
  ) : (
    <div>
      <h1 className="font-black text-4xl">Ver cliente</h1>
      <p className="mt-2 text-xl font-semibold">
        Detalles del <span className="text-info">Cliente</span>
      </p>
      <div className="mt-5 bg-base-300 w-3/6 p-3 rounded-md shadow-md shadow-base-300">
        <div className="mt-2">
          {nombre ? (
            <p className="text-xl text-info font-bold">
              Cliente: <span className="text-2xl text-white">{nombre}</span>
            </p>
          ) : (
            <p>No se ha asignado este campo</p>
          )}
        </div>
        <div className="mt-2">
          {empresa ? (
            <p className="text-xl text-info font-bold">
              Empresa: <span className="text-2xl text-white">{empresa}</span>
            </p>
          ) : (
            <p>No se ha asignado este campo</p>
          )}
        </div>
        <div className="mt-2">
          {email ? (
            <p className="text-xl text-info font-bold">
              Email: <span className="text-2xl text-white">{email}</span>
            </p>
          ) : (
            <p>No se ha asignado un nombre</p>
          )}
        </div>
        <div className="mt-2">
          {telefono ? (
            <p className="text-xl text-info font-bold">
              Telefono: <span className="text-2xl text-white">{telefono}</span>
            </p>
          ) : (
            <p>No se ha asignado este cmapo</p>
          )}
        </div>
        <div className="mt-2">
          {notas ? (
            <p className="text-xl text-info font-bold">
              Notas: <span className="text-2xl text-white">{notas}</span>
            </p>
          ) : (
            <p>No se ha asignado un nombre</p>
          )}
        </div>
      </div>
    </div>
  ))
};

export default VerCliente;
