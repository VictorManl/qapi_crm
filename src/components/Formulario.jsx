import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "./Spinner";
import Error from "../img/error.svg";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const ClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("Este campo es obligatorio"),

    empresa: Yup.string().required("Este campo es obligatorio"),
    email: Yup.string()
      .email("El email no es valido")
      .required("Este campo es obligatorio"),

    telefono: Yup.number()
      .typeError("El numero no es valido")
      .integer("Numero no valido")
      .positive("Numero no valido"),
  });

  const handleSubmit = async (values) => {
    try {
      let respuesta 
      if (cliente.id) {
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        respuesta = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      } else {
        const url = import.meta.env.VITE_API_URL
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      
      await respuesta.json();
      navigate("/clientes");

    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="mt-10 px-5 py-10 rounded-lg bg-base-300 shadow-lg md:w-5/5 2xl:w-3/4 mx-auto shadow-base-300">
      <h1 className="font-bold text-4xl uppercase text-center">
        {cliente?.nombre ? "Editar cliente" : "Crear Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={ClienteSchema}
      >
        {(errors) => {
          return (
            <Form className="mt-10 px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
                <div className="mb-4">
                  <label htmlFor="nombre" className="font-semibold text-lg">
                    Nombre
                  </label>
                  <Field
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="block w-full mt-2 py-3 rounded-lg bg-base-300 px-5 border-2 border-base-200"
                    placeholder="Nombre del cliente"
                  />
                  {errors.errors.nombre && errors.touched.nombre ? (
                    <div className="px-5 mt-2 py-2 rounded-lg flex bg-error text-base-200">
                      <img src={Error} alt="" className="w-[24px] h-[24px]" />
                      <p className="ml-3 font-bold"> {errors.errors.nombre} </p>
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label htmlFor="empresa" className="font-semibold text-lg">
                    Empresa
                  </label>
                  <Field
                    id="empresa"
                    name="empresa"
                    type="text"
                    className="block w-full mt-2 py-3 rounded-lg bg-base-300 px-5 border-2 border-base-200"
                    placeholder="Empresa del cliente"
                  />
                  {errors.errors.empresa && errors.touched.empresa ? (
                    <div className="px-5 mt-2 py-2 rounded-lg flex bg-error text-base-200">
                      <img src={Error} alt="" className="w-[24px] h-[24px]" />
                      <p className="ml-3 font-bold">
                        {" "}
                        {errors.errors.empresa}{" "}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="font-semibold text-lg">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full mt-2 py-3 rounded-lg bg-base-300 px-5 border-2 border-base-200"
                    placeholder="Email del cliente"
                  />
                  {errors.errors.email && errors.touched.email ? (
                    <div className="px-5 mt-2 py-2 rounded-lg flex bg-error text-base-200">
                      <img src={Error} alt="" className="w-[24px] h-[24px]" />
                      <p className="ml-3 font-bold"> {errors.errors.email} </p>
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label htmlFor="telefono" className="font-semibold text-lg">
                    Telefono
                  </label>
                  <Field
                    id="telefono"
                    name="telefono"
                    type="tel"
                    className="block w-full mt-2 py-3 rounded-lg bg-base-300 px-5 border-2 border-base-200"
                    placeholder="Telefono del cliente"
                  />
                  {errors.errors.telefono && errors.touched.telefono ? (
                    <div className="px-5 mt-2 py-2 rounded-lg flex bg-error text-base-200">
                      <img src={Error} alt="" className="w-[24px] h-[24px]" />
                      <p className="ml-3 font-bold">
                        {" "}
                        {errors.errors.telefono}{" "}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="notas" className="font-semibold text-lg">
                  Notas
                </label>
                <Field
                  id="notas"
                  name="notas"
                  as="textarea"
                  type="text"
                  className="block w-full mt-2 py-3 rounded-lg bg-base-300 px-5 border-2 border-base-200"
                  placeholder="Notas del cliente"
                />
                {errors.errors.notas && errors.touched.notas ? (
                  <div className="px-5 mt-2 py-2 rounded-lg flex bg-error text-base-200">
                    <img src={Error} alt="" className="w-[24px] h-[24px]" />
                    <p className="ml-3 font-bold"> {errors.errors.notas} </p>
                  </div>
                ) : null}
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar cliente" : "Crear Cliente"}
                className="mt-5 w-full p-3 uppercase font-bold text-lg bg-secondary shadow-lg 
            shadow-secondary rounded-lg hover:bg-secondary-focus hover:shadow-secondary-focus duration-200 cursor-pointer"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
