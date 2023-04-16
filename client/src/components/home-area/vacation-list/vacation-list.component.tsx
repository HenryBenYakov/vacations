import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { VacationCard } from "../vacation-card/vacation-card.component";
import { Loading } from "../../shared-area/loading/loading.component";
import { MVacation } from "../../../models/vacation";
import { authStore } from "../../../redux/auth-state";
import { notifyService } from "../../../services/notify-service";
import { vacationsService } from "../../../services/vacations-service";
import {
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./vacation-list.style.css";

export const VacationList: React.FC = () => {
  const [vacations, setVacations] = useState<MVacation[]>([]);
  const itemsPerPage = 8;
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPage] = useState<number>();
  const [checked, setChecked] = useState<boolean>(false);
  const [followingVacations, setFollowingVacations] = useState<MVacation[]>([]);

  const user = authStore.getState().user;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    vacationsService
      .getAllVacations()
      .then((vacations) => setVacations(vacations))
      .catch((err) => notifyService.error(err));

    setFollowingVacations(
      vacations.filter((v) => {
        return v.isFollowing === 1;
      })
    );

    setNumOfPage(Math.ceil(vacations.length / itemsPerPage));

    if (checked) {
      setNumOfPage(Math.ceil(followingVacations.length / itemsPerPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vacations, user, checked]);

  return (
    <div className="VacationList">
      {vacations.length === 0 && <Loading />}

      {user.roleID === 1 && (
        <>
          <NavLink to="/vacations/add">
            <Fab color="primary" aria-label="add" className="AddVacationButton">
              <AddIcon />
            </Fab>
          </NavLink>
        </>
      )}

      {user.roleID === 2 && (
        <>
          <FormGroup className="isFollowingButton">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckBoxChange}
                  icon={<BookmarkBorderIcon />}
                  checkedIcon={<BookmarkIcon />}
                />
              }
              label="Following"
            />
          </FormGroup>
        </>
      )}

      {checked &&
        followingVacations
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((vac) => {
            return <VacationCard key={vac.vacationID} vacation={vac} />;
          })}
      {!checked &&
        vacations
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((v) => {
            return <VacationCard key={v.vacationID} vacation={v} />;
          })}

      <Pagination
        count={numOfPages}
        page={page}
        onChange={handleChange}
        defaultPage={1}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </div>
  );
};
