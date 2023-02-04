import { AxiosError } from "axios";

export interface Payload {
   isLoading: boolean;
   payload: {
      status: string;
      message?: string;
      data?: string;
   };
}

export interface Action {
   type: string;
   payload: Partial<Payload> & AxiosError;
}
