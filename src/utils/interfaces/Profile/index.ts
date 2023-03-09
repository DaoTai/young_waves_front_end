export interface Profile {
   _id?: string;
   username: string;
   password: string;
   isAdmin: boolean;
   fullName: string;
   region: string;
   dob: string;
   city: string;
   gender: string;
   email: string;
   avatar: string;
   createdAt?: string;
   deletedAt?: string;
   updatedAt?: string;
}

export interface ChangePassword {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}
