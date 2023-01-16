import { Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import * as Yup from "yup";

const Login = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user]);

    const onSubmit = async (
        values,
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            await login({ email: values.email, password: values.password });
            console.log("user logged in");
            resetForm();
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            if (error.code === "auth/user-not-found") {
                setErrors({ email: "Email already in use" });
            }
            if (error.code === "auth/wrong-password") {
                setErrors({ password: "Wrong password" });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email no válido").required("Email obligatorio"),
        password: Yup.string().trim().min(6, "Mínimo 6 carácteres").required("Password obligatorio"),
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
                    handleSubmit,
                    handleChange,
                    values,
                    isSubmitting,
                    errors,
                    touched,
                    handleBlur,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="email"
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && errors.email}
                        <input
                            type="password"
                            placeholder="password"
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
