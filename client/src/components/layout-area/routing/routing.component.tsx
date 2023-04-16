import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../auth-area/login/login.component";
import { Logout } from "../../auth-area/logout/logout.component";
import { Register } from "../../auth-area/register/register.component";
import { Chart } from "../../chart-area/chart/chart.component";
import { AddVacation } from "../../home-area/add-vacation/add-vacation.component";
import { EditVacation } from "../../home-area/edit-vacation/edit-vacation.component";
import { Home } from "../../home-area/home/home.component";
import { PageNotFound } from "../page-not-found/page-not-found.component";
import "./routing.style.css";

export const Routing: React.FC = () => {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vacations/add" element={<AddVacation />} />
        <Route path="/vacations/edit/:vId" element={<EditVacation />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
