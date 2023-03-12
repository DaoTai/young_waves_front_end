export interface TextField {
   name: string;
   label: string;
   type: string;
   variant?: string;
   margin?: string;
   size?: string;
   placeholder?: string;
   autoComplete?: string;
   fullWidth?: boolean;
   autoFocus?: boolean;
   required?: boolean;
}

interface RadioItem {
   label: string;
   value: string;
}

export interface RadioField {
   label: string;
   name: string;
   radioes: Array<RadioItem>;
}

export interface SignUp {
   validateOnMount?: boolean;
   fullName: string;
   region: string;
   city: string;
   email: string;
   username: string;
   password: string;
   confirmedPassword: string;
   gender: string;
   dob: string;
   isAdmin?: boolean;
}
export interface SignIn {
   username: string;
   password: string;
   isRemember: boolean;
}
