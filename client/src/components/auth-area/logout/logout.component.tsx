import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/auth-service";
import { notifyService } from "../../../services/notify-service";
import { vacationsService } from "../../../services/vacations-service";

export const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      authService.logout();
      notifyService.success("Bye bye...");
      vacationsService.flushAll();
      navigate("/");
    } catch (err: any) {
      notifyService.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
