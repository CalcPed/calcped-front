/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./style.css";

const theme = createTheme({
  shape: {
    borderRadius: 100,
  },
});

const initialValues = {
  weight: "",
  height: "",
};

const registrationSchema = Yup.object().shape({
  weight: Yup.number()
    .min(1, "Peso mínimo de 1kg")
    .max(350, "Peso máximo de 350kg")
    .required("Peso é obrigatório"),
  height: Yup.number()
    .min(0.1, "Altura mínima de 0.1m")
    .max(2.5, "Altura máxima de 2.5m"),
    
});

export function CheckMedicines() {
  const [loading, setLoading] = useState(false);
  const formik: any = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      // setTimeout(() => {
      //   register(
      //     values.email,
      //     values.firstname,
      //     values.lastname,
      //     values.password
      //   )
      //     .then(({ data:  }) => {
      //       setLoading(false);
      //       dispatch(auth.actions.login(accessToken));
      //     })
      //     .catch(() => {
      //       setLoading(false);
      //       setSubmitting(false);
      //       setStatus("Registration process has broken");
      //     });
      // }, 1000);
      setLoading(false);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="CheckMedicines" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            CalcPed
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              {...formik.getFieldProps("weight")}
              label="Peso"
              name="weight"
              autoFocus
              variant="outlined"
              size="small"
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid": formik.touched.weight && formik.errors.weight,
                },
                {
                  "is-valid": formik.touched.weight && !formik.errors.weight,
                }
              )}
            />
            {formik.touched.weight && formik.errors.weight && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.weight}</div>
              </div>
            )}
            <TextField
              margin="normal"
              fullWidth
              {...formik.getFieldProps("height")}
              label="Altura"
              name="height"
              variant="outlined"
              size="small"
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid": formik.touched.height && formik.errors.height,
                },
                {
                  "is-valid": formik.touched.height && !formik.errors.height,
                }
              )}
            />
            {formik.touched.height && formik.errors.height && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.height}</div>
              </div>
            )}
            <Button
              className="btn-calc"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Calcular
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
