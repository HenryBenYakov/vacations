import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../redux/auth-state";
import { MUser } from "../../../models/user";
import { Button, ButtonGroup, styled } from "@mui/material";
import "./auth-menu.style.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

export const AuthMenu: React.FC = () => {
  const [user, setUser] = useState<MUser>();

  useEffect(() => {
    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="AuthMenu">
      {!user && (
        <>
          <span>Hello Guest | </span>
          <ButtonGroup size="small">
            <StyledButton variant="contained">
              <NavLink to="/login">Login</NavLink>
            </StyledButton>
            <StyledButton variant="contained">
              <NavLink to="/register">Register</NavLink>
            </StyledButton>
          </ButtonGroup>
        </>
      )}

      {user && (
        <>
          <span>
            {user.firstName} {user.lastName} |{" "}
          </span>
          <StyledButton variant="contained">
            <NavLink to="/logout">Logout</NavLink>
          </StyledButton>
        </>
      )}
    </div>
  );
};
