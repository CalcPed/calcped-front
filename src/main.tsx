import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CheckMedicines } from "./pages/CheckMedicines/CheckMedicines";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Switch>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Route>
          <CheckMedicines />
        </Route>
      </div>
    </Switch>
  </BrowserRouter>
);
