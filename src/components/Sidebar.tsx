import { NavLink } from "react-router-dom";


function Sidebar() {

    return (
        <aside>
            <nav>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-colors 
                        ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'}`
                    }>Inicio</NavLink>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-colors 
                        ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'}`
                    }>Rutinas</NavLink>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-colors 
                        ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'}`
                    }>Historial</NavLink>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-colors 
                        ${isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'}`
                    }>Perfil</NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar