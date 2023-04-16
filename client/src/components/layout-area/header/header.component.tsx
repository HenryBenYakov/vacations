import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../redux/auth-state";
import { AuthMenu } from "../../auth-area/auth-menu/auth-menu.component";
import { MUser } from "../../../models/user";
import { Button, ButtonGroup, styled } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import "./header.style.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

export const Header: React.FC = () => {
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
    <div className="Header">
      {user?.roleID === 1 && (
        <div className="MenuHeader">
          <ButtonGroup size="small">
            <StyledButton variant="contained">
              <NavLink to="/home">Vacations</NavLink>
            </StyledButton>
            <StyledButton
              variant="contained"
              endIcon={<SignalCellularAltIcon />}
            >
              <NavLink to="/chart">See Report</NavLink>
            </StyledButton>
          </ButtonGroup>
        </div>
      )}
      <AuthMenu />
    </div>
  );
};
