import React, { useState, useEffect } from "react";
import LoadingIndicator from "./assets/components/LoadingIndicator";
import AppPresenter from "./App-presenter";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (user) => {
    setUser(user);
    setPage("home");
  };

  const handleRegisterSuccess = (user) => {
    setUser(user);
    setPage("home");
  };

  const handleNavigate = (page) => {
    setLoading(true);
    setPage(page);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    setLoading(true);
    // Simulate async user session check
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <AppPresenter
      user={user}
      page={page}
      loading={loading}
      handleLoginSuccess={handleLoginSuccess}
      handleRegisterSuccess={handleRegisterSuccess}
      handleNavigate={handleNavigate}
    />
  );
}
