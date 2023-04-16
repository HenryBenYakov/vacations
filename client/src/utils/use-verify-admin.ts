import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../redux/auth-state";
import { notifyService } from "../services/notify-service";

export function useVerifyAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = authStore.getState().user?.roleID;

    if (!userRole) {
      navigate("/login");
    }

    if (userRole !== 1) {
      navigate("/");
      notifyService.error("Access denied!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
