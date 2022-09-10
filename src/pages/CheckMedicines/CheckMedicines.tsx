/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Slide,
} from "@mui/material";
import { getMedicines } from "../../infra/services/medicines";
import { getAllergiess } from "../../infra/services/allergys";
import { calculate } from "../../infra/services/calculate";
import { TransitionProps } from "@mui/material/transitions";

const theme = createTheme({
  shape: {
    borderRadius: 30,
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
  age: Yup.number()
    .min(0, "Idade mínima de 0 anos")
    .max(150, "Idade máxima de 150 anos")
    .required("Idade é obrigatória"),
  medicine: Yup.number().required("Medicamento é obrigatório"),
  allergy: Yup.number(),
});

const calculatedResponse = [
  "Medicamento pode ser utilizado!",
  "Não foi atingida a idade mínima.",
  "Acima do peso restringido para uso.",
  "Abaixo do peso restringido para uso.",
  "Abaixo da altura restringida para uso.",
  "Paciente alérgico ao medicamento!",
];

export function CheckMedicines() {
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines]: any[] = useState([]);
  const [allergies, setAllergies]: any[] = useState([]);
  const [open, setOpen] = useState(false);
  const [responseId, setResponseId] = useState(-2);

  const formik: any = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setSubmitting(true);
      setTimeout(async () => {
        calculate(values)
          .then(({ data }) => {
            setResponseId(data.error);
            setLoading(false);
            setOpen(true);
            setSubmitting(false);
            console.log(data);
          })
          .catch(({ response }) => {
            setResponseId(response.data.error);
            setLoading(false);
            setOpen(true);
            setSubmitting(false);
            console.log(response.data);
          });
      }, 10);
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

  useEffect(() => {
    const fetchMedicines = async () => {
      await getMedicines()
        .then((response) => {
          setMedicines(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const fetchAllergies = async () => {
      await getAllergiess()
        .then((response) => {
          setAllergies(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    setTimeout(async () => {
      await fetchMedicines();
      await fetchAllergies();
    }, 10);
  }, []);

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
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

              <TextField
                type="number"
                margin="normal"
                fullWidth
                {...formik.getFieldProps("age")}
                label="Idade"
                name="age"
                variant="outlined"
                size="small"
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  {
                    "is-invalid": formik.touched.age && formik.errors.age,
                  },
                  {
                    "is-valid": formik.touched.age && !formik.errors.age,
                  }
                )}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.age}</div>
                </div>
              )}

              <Select
                {...formik.getFieldProps("medicine")}
                value={formik.values.medicine}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Medicine"
                style={{ minWidth: 320 }}
                onChange={(e) => {
                  formik.values.medicine = e.target.value;
                }}
              >
                {medicines.map((medicine: any) => (
                  <MenuItem key={medicine.id} value={medicine.id}>
                    {medicine.name}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.medicine && formik.errors.medicine && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.medicine}</div>
                </div>
              )}

              <Select
                {...formik.getFieldProps("allergy")}
                value={formik.values.allergy}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Allergy"
                style={{ minWidth: 320 }}
                onChange={(e) => {
                  formik.values.allergy = e.target.value;
                }}
              >
                {allergies.map((allergy: any) => (
                  <MenuItem key={allergy.id} value={allergy.id}>
                    {allergy.name}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.allergy && formik.errors.allergy && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.allergy}</div>
                </div>
              )}
              <Button
                className="btn-calc"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Calcular
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <ThemeProvider
        theme={createTheme({
          shape: {
            borderRadius: 20,
          },
        })}
      >
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              setOpen(false);
            }}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Resultado calculado!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {calculatedResponse[responseId]}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Entendi
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </>
  );
}
