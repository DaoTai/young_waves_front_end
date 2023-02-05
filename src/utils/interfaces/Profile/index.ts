export interface Profile {
   _id?: string;
   username: string;
   password: string;
   isAdmin: boolean;
   fullName: string;
   region: string;
   address: string;
   dob: string;
   gender: string;
   email: string;
   avatar: string;
}

export interface ChangePassword {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}
