import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Register = () => {
    const { user } = useUserContext();

    // alternativa con hook
    useRedirectActiveUser(user, "/dashboard");

    const onSubmit = async (
        { email, password },
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            await register({ email, password });
            console.log("user registered");
            resetForm();
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            if (error.code === "auth/email-already-in-use") {
                setErrors({ email: "Email already in use" });
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
            <h1>Register</h1>
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
                            Register
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Register;
