import { NavLink } from "react-router-dom";


function Sidebar() {

    return (
        <aside className="w-64 bg-[#4B4B4B] flex flex-col pt-4">
            <nav>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-colors 
                        ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'}`
                    }>Inicio</NavLink>
                <NavLink 
                    to="/Routines" 
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-colors 
                        ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'}`
                    }>Rutinas</NavLink>
                <NavLink 
                    to="/History" 
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-colors 
                        ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'}`
                    }>Historial</NavLink>
                <NavLink 
                    to="/Profile"
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-colors 
                        ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'}`
                    }>Perfil</NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar