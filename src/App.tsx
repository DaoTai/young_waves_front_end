import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import { AuthProtect, GlobalStyle } from "./components";
import { AuthLayout } from "./pages/auth";
import Home from "./pages/home";
import { authRoutes, commonRoutes, errorRoutes, userRoutes } from "./routes";

function App() {
   return (
      <>
         <CssBaseline />
         <GlobalStyle />
         {/* Routing */}
         <Routes>
            {/* Auth pages */}
            <Route path="/auth" element={<AuthLayout />}>
               {authRoutes.map((route, i) => {
                  const Page = route.component;
                  return <Route key={i} path={route.path} element={<Page />} />;
               })}
            </Route>

            {/* Users pages */}
            <Route
               path="/user"
               element={
                  <AuthProtect>
                     <Home />
                  </AuthProtect>
               }>
               {userRoutes?.map((route, i) => {
                  const Page = route.component;
                  const children = route.children;
                  return (
                     <Route key={i} path={route.path} element={<Page />}>
                        {children?.map((child, i) => {
                           const ChildrenPage = child.component;
                           return <Route key={i} path={child.path} element={<ChildrenPage />} />;
                        })}
                     </Route>
                  );
               })}
            </Route>

            {/* Common pages */}
            <Route
               path="/"
               element={
                  <AuthProtect>
                     <Home />
                  </AuthProtect>
               }>
               {commonRoutes.map((route, i) => {
                  const Page = route.component;
                  const children = route.children;
                  return (
                     <Route key={i} path={route.path} element={<Page />}>
                        {children?.map((child, i) => {
                           const ChildrenPage = child.component;
                           return <Route key={i} path={child.path} element={<ChildrenPage />} />;
                        })}
                     </Route>
                  );
               })}
            </Route>

            {/* Error pages */}
            <Route path="/">
               {errorRoutes.map((route, i) => {
                  const Page = route.component;
                  return <Route key={i} path={route.path} element={<Page />} />;
               })}
            </Route>
         </Routes>
      </>
   );
}

export default App;
