import { AxiosError } from "axios";

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
