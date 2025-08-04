import React from "react";

import ReactDom from "react-dom/client";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import App from "./App.jsx";
import DataPage from "./DataPage.jsx";

ReactDom.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>}/>
  <Route path="/data" element={<DataPage />}/>
  </Routes>
  </BrowserRouter>
)