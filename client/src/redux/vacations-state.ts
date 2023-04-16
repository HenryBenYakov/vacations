import { createStore } from "redux";
import { MVacation } from "../models/vacation";

export class VacationsState {
  public vacations: MVacation[] = [];
}

export enum VacationsActionType {
  FetchVacations = "FetchVacations",
  AddVacation = "AddVacation",
  UpdateVacation = "UpdateVacation",
  DeleteVacation = "DeleteVacation",
  Follow = "Follow",
  Unfollow = "Unfollow",
}

export interface VacationsAction {
  type: VacationsActionType;
  payload: any;
}

export function vacationsReducer(
  currentState = new VacationsState(),
  action: VacationsAction
): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsActionType.FetchVacations:
      newState.vacations = action.payload;
      break;

    case VacationsActionType.AddVacation:
      newState.vacations.push(action.payload);
      break;

    case VacationsActionType.UpdateVacation:
      const indexToUpdate = newState.vacations.findIndex(
        (v) => v.vacationID === action.payload.vacationID
      );

      if (indexToUpdate >= 0) {
        newState.vacations[indexToUpdate] = action.payload;
      }

      break;

    case VacationsActionType.DeleteVacation:
      const indexToDelete = newState.vacations.findIndex(
        (v) => v.vacationID === action.payload
      );
      if (indexToDelete >= 0) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;

    case VacationsActionType.Follow:
      const fIndexToUpdate = newState.vacations.findIndex(
        (v) => v.vacationID === action.payload
      );
      if (fIndexToUpdate >= 0) {
        newState.vacations[fIndexToUpdate].followersCount++;
        newState.vacations[fIndexToUpdate].isFollowing = 1;
      }
      break;

    case VacationsActionType.Unfollow:
      const fIndexToDelete = newState.vacations.findIndex(
        (v) => v.vacationID === action.payload
      );
      if (fIndexToDelete >= 0) {
        newState.vacations[fIndexToDelete].followersCount--;
        newState.vacations[fIndexToDelete].isFollowing = 0;
        break;
      }
  }

  return newState;
}

export const vacationsStore = createStore(vacationsReducer);
