export interface Profile {
   _id: string;
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
   totalPosts: number;
   friends: Array<string>;
   createdAt?: string;
   deletedAt?: string;
   updatedAt?: string;
   coverPicture?: string;
}

export interface ChangePassword {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}
