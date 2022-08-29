import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/5 2xl:w-1/6 bg-base-200 px-5 py-10">
        <h2 className="text-2xl font-black text-center">CMR - Clientes</h2>
        <nav className="mt-10">
          <NavLink
            to="/clientes"
            className={({isActive}) => (isActive ? 'text-xl block mt-4 font-bold text-center p-2 rounded-md bg-primary text-secondary-content shadow-md shadow-primary' : 'text-xl block mt-4 font-bold text-center p-2 rounded-md hover:bg-primary/25 duration-200')}
          
          >
            Clientes
          </NavLink>
          <NavLink
            to="/clientes/nuevo-cliente"
            className={({isActive}) => (isActive ? 'text-xl block mt-4 font-bold text-center p-2 rounded-md bg-primary text-secondary-content shadow-md shadow-primary' : 'text-xl block mt-4 font-bold text-center p-2 rounded-md hover:bg-primary/25 duration-200')}
          
          >
            Nuevo Cliente
          </NavLink>
        </nav>
      </div>
      <div className="md:w-5/6 px-10 py-5 bg-base-100 md:h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
