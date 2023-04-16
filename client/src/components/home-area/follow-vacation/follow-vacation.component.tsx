import React, { useEffect, useState } from "react";
import { Button, Box, styled } from "@mui/material";
import { authStore } from "../../../redux/auth-state";
import { MVacation } from "../../../models/vacation";
import { notifyService } from "../../../services/notify-service";
import { vacationsService } from "../../../services/vacations-service";
import "./follow-vacation.style.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

interface FollowVacationProps {
  vacation: MVacation;
}

export const FollowVacation: React.FC<FollowVacationProps> = ({ vacation }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  async function follow() {
    try {
      const request = {
        userID: authStore.getState().user.userID,
        vacationID: vacation.vacationID,
      };
      vacationsService.follow(request);
      setIsFollowing(true);
      notifyService.success("You followed " + vacation.destination);
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  async function unFollow() {
    try {
      const request = {
        userID: authStore.getState().user.userID,
        vacationID: vacation.vacationID,
      };
      vacationsService.unFollow(request);
      setIsFollowing(false);
      notifyService.success("You unfollowed " + vacation.destination);
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  useEffect(() => {
    if (vacation.isFollowing === 1) {
      setIsFollowing(true);
    }
  }, [vacation]);

  return (
    <div className="FollowVacatoin">
      {isFollowing ? (
        <div>
          <Box className="FollowersCounterBox">{vacation.followersCount}</Box>
          <StyledButton
            variant="outlined"
            size="small"
            className="FollowersButton"
            disableRipple
            onClick={unFollow}
            sx={{ "&:hover": { color: "white" } }}
          >
            Unfollow
          </StyledButton>
        </div>
      ) : (
        <div>
          <Box className="FollowersCounterBox">{vacation.followersCount}</Box>
          <StyledButton
            variant="contained"
            size="small"
            className="FollowersButton"
            disableRipple
            onClick={follow}
          >
            Follow
          </StyledButton>
        </div>
      )}
    </div>
  );
};
