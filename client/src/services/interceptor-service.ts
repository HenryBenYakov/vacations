import axios from "axios";
import { authStore } from "../redux/auth-state";

class InterceptorService {
  public createInterceptor() {
    axios.interceptors.request.use((request) => {
      if (authStore.getState().token) {
        request.headers = {
          authorization: "Bearer " + authStore.getState().token,
        };
      }

      return request;
    });
  }
}

export const interceptorService = new InterceptorService();
