import { Fragment } from "../components";
import { SignIn, SignUp } from "../pages/auth";
import Error from "../pages/error";
import { AdminContainer } from "../pages/admin";
import {
   Editing,
   NewsFeed,
   Profile,
   EditingPassword,
   NewsDetail,
   Explore,
   Member,
   TrashPosts,
   TrashDetail,
} from "../pages/user";
import Route from "./interface";
const commonRoutes: Array<Route> = [
   {
      path: "",
      component: NewsFeed,
   },
   {
      path: "news",
      component: NewsFeed,
      children: [
         { path: ":id", component: NewsDetail },
         { path: ":id/:indexImage", component: NewsDetail },
      ],
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
         { path: "password", component: EditingPassword },
      ],
   },
   {
      path: "explore",
      component: Fragment as React.FC,
      children: [
         { path: "", component: Explore },
         { path: ":id", component: Member },
      ],
   },
   {
      path: "trash",
      component: Fragment as React.FC,
      children: [
         { path: "posts", component: TrashPosts },
         { path: "posts/:id", component: TrashDetail },
      ],
   },
   {
      path: "news",
      component: Profile,
      children: [
         { path: ":id", component: NewsDetail },
         { path: ":id/:indexImage", component: NewsDetail },
      ],
   },
];

export const adminRoutes: Array<Route> = [
   {
      path: "",
      component: Fragment,
   },
   ...userRoutes,
];

export { authRoutes, commonRoutes, userRoutes, errorRoutes };
