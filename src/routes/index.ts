import { Fragment } from "../components";
import { SignIn, SignUp } from "../pages/auth";
import Error from "../pages/error";
import { Editing, NewsFeed, Profile, EditingPassword } from "../pages/user";
import Route from "./interface";
const commonRoutes: Array<Route> = [
   {
      path: "",
      component: NewsFeed,
   },
];

const errorRoutes: Array<Route> = [
   {
      path: "*",
      component: Error,
   },
];

const authRoutes: Array<Route> = [
   {
      path: "",
      component: Error,
   },
   {
      path: "sign-in",
      component: SignIn,
   },
   {
      path: "sign-up",
      component: SignUp,
   },
];

const userRoutes: Array<Route> = [
   {
      path: "",
      component: Error,
   },
   {
      path: "profile",
      component: Fragment as React.FC,
      children: [
         { path: ":id", component: Profile },
         { path: "edit", component: Editing },
         { path: "password", component: EditingPassword as any },
      ],
   },
];

export { authRoutes, commonRoutes, userRoutes, errorRoutes };
