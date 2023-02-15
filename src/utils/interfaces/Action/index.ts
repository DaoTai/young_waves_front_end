import { AxiosError } from "axios";
import { Profile } from "../Profile";
export interface Payload {
   isLoading: boolean;
   payload: Object;
}

export interface SignInPayload {
   status: number;
   data: {
      payload: any;
      accessToken: string;
   };
}

export interface Action {
   type: string;
   payload: Partial<Payload> & AxiosError;
}

export interface UsersAction {
   type: string;
   payload: Array<Profile> | [] | any;
}
