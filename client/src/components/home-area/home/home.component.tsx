import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VacationList } from "../vacation-list/vacation-list.component";
import { Login } from "../../auth-area/login/login.component";
import { authStore } from "../../../redux/auth-state";
import { MUser } from "../../../models/user";
import { authService } from "../../../services/auth-service";
import { vacationsService } from "../../../services/vacations-service";
import "./home.style.css";

export const Home: React.FC = () => {
  const [user, setUser] = useState<MUser>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.expLoggedIn()) {
      navigate("/login");
      authService.logout();
      vacationsService.flushAll();
    }

    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Home">
      {!user && (
        <>
          <Login />
        </>
      )}

      {user && (
        <>
          <VacationList />
        </>
      )}
    </div>
  );
};
