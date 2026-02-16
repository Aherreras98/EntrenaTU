export const validateField = (name: string, value: string) => {
    switch (name) {
        case "username":
            if (!value.trim()) return "El nombre es obligatorio";
            if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value))
                return "Solo se permiten letras y espacios";
            return "";
        case "age":
            if (!value) return "La edad es obligatoria";
            if (Number(value) <= 0) return "Debe ser mayor que 0";
            return "";
        case "password":
            if (!value) return "La contraseña es obligatoria";
            if (value.length < 6) return "Mínimo 6 caracteres";
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) return "Mínimo 6 caracteres, letras y números";
            return "";
        case "email":
            if (!value) return "El email es obligatorio";
            if (!/\S+@\S+\.\S+/.test(value)) return "Email inválido";
            return "";
        default:
            return "";
    }
};

export const passwordsMatch = (pass1: string, pass2: string) => {
    return pass1 === pass2 ? "" : "Las contraseñas no coinciden";
};