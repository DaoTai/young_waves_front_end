import { CssBaseline, styled } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalStyle from "./components/GolbalStyle";
import { AuthLayout } from "./pages/auth";
import Home from "./pages/home";
import { Spinner } from "./components";
import { spinnerState$ } from "./redux-saga/redux/selectors";
import { authRoutes, commonRoutes, errorRoutes, userRoutes } from "./routes";
import { useEffect } from "react";

function App() {
   const showSpinner = useSelector(spinnerState$);

   return (
      <>
         {/* Spinner */}
         {/* <Spinner /> */}
         {showSpinner.isShow && <Spinner />}
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

            <Route path="/user" element={<Home />}>
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
            <Route path="/" element={<Home />}>
               {commonRoutes.map((route, i) => {
                  const Page = route.component;

                  return <Route key={i} path={route.path} element={<Page />} />;
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
