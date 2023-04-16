import axios from "axios";
import {
  VacationsAction,
  VacationsActionType,
  vacationsStore,
} from "../redux/vacations-state";
import { MFollower } from "../models/follower";
import { MVacation } from "../models/vacation";
import { appConfig } from "../utils/app-config";

class VacationsService {
  public async checkEmpty(): Promise<void> {
    if (vacationsStore.getState().vacations === null)
      await this.getAllVacations();
  }

  public flushAll(): void {
    const action: VacationsAction = {
      type: VacationsActionType.FetchVacations,
      payload: null,
    };
    vacationsStore.dispatch(action);
  }

  public async getAllVacations(): Promise<MVacation[]> {
    if (vacationsStore.getState().vacations?.length > 0) {
      return vacationsStore.getState().vacations;
    }

    const response = await axios.get<MVacation[]>(appConfig.vacationsUrl);

    const vacations = response.data;

    vacations.sort((v1, v2) => {
      return new Date(v1.fromDate).valueOf() - new Date(v2.fromDate).valueOf();
    });

    vacations.map((v) => {
      v.fromDateString = new Date(v.fromDate).toLocaleDateString("he-IL");

      v.untilDateString = new Date(v.untilDate).toLocaleDateString("he-IL");

      return vacations;
    });

    const action: VacationsAction = {
      type: VacationsActionType.FetchVacations,
      payload: vacations,
    };
    vacationsStore.dispatch(action);

    return vacations;
  }

  public async getOneVacation(id: number): Promise<MVacation> {
    let vacation;

    let vacations = vacationsStore.getState().vacations;

    if (vacations.length === 0) {
      const response = await axios.get<MVacation>(appConfig.vacationsUrl + id);

      vacation = response.data;
    } else {
      vacation = vacations.find((v) => v.vacationID === id);
    }

    vacation.fromDateString = this.DateFormat(vacation.fromDate);
    vacation.untilDateString = this.DateFormat(vacation.untilDate);

    return vacation;
  }

  public async addVacation(vacation: MVacation): Promise<void> {
    await this.checkEmpty();

    const fromDateValue = vacation.fromDate
      .toISOString()
      .split("T")[0]
      .toString();
    const untilDateValue = vacation.untilDate
      .toISOString()
      .split("T")[0]
      .toString();

    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("image", vacation.image[0]);
    formData.append("fromDate", fromDateValue);
    formData.append("untilDate", untilDateValue);
    formData.append("price", vacation.price.toString());

    const response = await axios.post<MVacation>(
      appConfig.vacationsUrl,
      formData
    );
    const addedVacation = response.data;

    addedVacation.fromDateString = new Date(
      addedVacation.fromDate
    ).toLocaleDateString("he-IL");
    addedVacation.untilDateString = new Date(
      addedVacation.untilDate
    ).toLocaleDateString("he-IL");

    const action: VacationsAction = {
      type: VacationsActionType.AddVacation,
      payload: addedVacation,
    };
    vacationsStore.dispatch(action);
  }

  public async updateVacation(vacation: MVacation): Promise<void> {
    await this.checkEmpty();

    const fromDateBeforeSplit1 = new Date(vacation.fromDate).toISOString();
    vacation.fromDateString = fromDateBeforeSplit1.split("T", 1).toString();

    const untilDateBeforeSplit1 = new Date(vacation.untilDate).toISOString();
    vacation.untilDateString = untilDateBeforeSplit1.split("T", 1).toString();

    const fromDateValue = new Date(vacation.fromDateString)
      .toISOString()
      .split("T")[0]
      .toString();
    const untilDateValue = new Date(vacation.untilDateString)
      .toISOString()
      .split("T")[0]
      .toString();

    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("image", vacation.image[0]);
    formData.append("fromDate", fromDateValue);
    formData.append("untilDate", untilDateValue);
    formData.append("price", vacation.price.toString());

    const response = await axios.put<MVacation>(
      appConfig.vacationsUrl + vacation.vacationID,
      formData
    );
    const updatedVacation = response.data;

    updatedVacation.fromDateString = new Date(
      updatedVacation.fromDate
    ).toLocaleDateString("he-IL");
    updatedVacation.untilDateString = new Date(
      updatedVacation.untilDate
    ).toLocaleDateString("he-IL");

    if (!updatedVacation.imageName) {
      updatedVacation.imageName = vacation.imageName;
    }

    const action: VacationsAction = {
      type: VacationsActionType.UpdateVacation,
      payload: updatedVacation,
    };
    vacationsStore.dispatch(action);
  }

  public async deleteVacation(id: number): Promise<void> {
    await axios.delete(appConfig.vacationsUrl + id);

    const action: VacationsAction = {
      type: VacationsActionType.DeleteVacation,
      payload: id,
    };
    vacationsStore.dispatch(action);
  }

  public async follow(follower: MFollower): Promise<void> {
    await axios.post<MFollower>(appConfig.followUrl, follower);

    const action: VacationsAction = {
      type: VacationsActionType.Follow,
      payload: follower.vacationID,
    };
    vacationsStore.dispatch(action);
  }

  public async unFollow(follower: MFollower): Promise<void> {
    await axios.post<MFollower>(appConfig.unFollowUrl, follower);

    const action: VacationsAction = {
      type: VacationsActionType.Unfollow,
      payload: follower.vacationID,
    };
    vacationsStore.dispatch(action);
  }

  private DateFormat(date: Date) {
    const dateToLocalDate = new Date(date).toLocaleDateString("he-IL", {
      timeZone: "Asia/Jerusalem",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const dateSplit = dateToLocalDate.split(".");
    const dateFormat = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
    return dateFormat;
  }
}

export const vacationsService = new VacationsService();
