import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";

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
    password: Yup.string()
      .trim()
      .min(6, "Mínimo 6 carácteres")
      .required("Password obligatorio"),
  });

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          maxWidth: 400,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>

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
            <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
              <TextField
                sx={{ mb: 3 }}
                fullWidth
                label="Email Address"
                id="email"
                type="text"
                placeholder="Ingrese email"
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                id="password"
                type="password"
                placeholder="Ingrese contraseña"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
              <LoadingButton
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Register
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Button component={Link} to="/" color="secondary">
                    ¿Ya tienes cuenta? Accede aquí
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Register;
