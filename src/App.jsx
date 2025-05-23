import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
import SuccessPage from "./SuccessPage";

export default function App() {
  return (
    <Router basename="/01-react-form">
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}
