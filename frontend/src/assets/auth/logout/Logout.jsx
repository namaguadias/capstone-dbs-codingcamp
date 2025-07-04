import React from "react";
import AuthPresenter from "../../../data/api";
import LogoutPresenter from "./Logout-presenter";

export default function Logout() {
  const handleLogout = () => {
    AuthPresenter.logout();
    window.location.href = "/home"; // Manual redirect to login page
  };

  return <LogoutPresenter onLogout={handleLogout} />;
}
