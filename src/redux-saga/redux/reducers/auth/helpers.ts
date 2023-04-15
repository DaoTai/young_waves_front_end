import { Profile } from "../../../../utils/interfaces/Profile";

export interface AuthState {
   isLoading: boolean;
   payload: {
      user: Partial<Profile> | null;
      accessToken: string | null;
   } | null;
}

export interface AuthPayload {
   accessToken: string;
   user: Partial<Profile>;
}

export const init: AuthState = {
   isLoading: false,
   payload: null,
};
