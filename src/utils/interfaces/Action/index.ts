import { AxiosError } from "axios";

export interface SuccessAction {
   config: any;
   data: any;
   headers: any;
   status: number;
}

export interface Action {
   type: string;
   payload: Partial<SuccessAction> & AxiosError;
}
