import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { login } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Login = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user]);

    const onSubmit = async (
        { email, password },
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            const credentialUser = await login({ email, password });
            console.log(credentialUser);
            resetForm();
        } catch (error) {
            console.log(error);
            if (error.code === "auth/user-not-found") {
                setErrors({ email: "Email no registrado" });
            }
            if (error.code === "auth/wrong-password") {
                setErrors({ password: "Contraseña incorrecta" });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email no válido")
            .required("Email requerido"),
        password: Yup.string()
            .trim()
            .min(6, "Mínimo 6 caracteres")
            .required("Contraseña requerida"),
    });

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    isSubmitting,
                    errors,
                    touched,
                    handleBlur,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Ingrese email"
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && errors.email}
                        <input
                            type="password"
                            placeholder="Ingrese contraseña"
                            value={values.password}
                            onChange={handleChange}
                            name="password"
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password && errors.password}
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Login;
