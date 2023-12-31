import { getGoogleIsLogged } from 'entities/GoogleProfile';
import { Suspense, memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Preloader from 'shared/UI/Preloader/Preloader';
import {
  AppRoutes,
  AppRoutesProps,
  routeConfig,
} from 'shared/config/routesConfig/routesConfig';
// import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
  const isAuthG = useSelector(getGoogleIsLogged);

  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<Preloader />}>{route.element}</Suspense>
    );
    //route.authOnly ? <RequireAuth>{element}</RequireAuth> :
    return <Route key={route.path} element={element} path={route.path} />;
  }, []);

  // const routes = useMemo(() => {
  //   return Object.values(routeConfig).filter((route) => {
  //     if (route.requiresGoogleAuth && !isAuthG) {
  //       return false;
  //     } else if (route.authOnly && !isAuth) {
  //       return false;
  //     }
  //     return true;
  //   });
  // }, [isAuthG, isAuth]);

  // const routes = useMemo(() => {
  //   return Object.values(routeConfig).filter((route) => {
  //     if (route.authOnly && !isAuth) {
  //       return false;
  //     }
  //     return true;
  //   });
  // }, [isAuth]);

  return (
    <Suspense fallback={<Preloader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
};

export default memo(AppRouter);

// {routes.map(({ element, path }) => {
//   return (
//     <Route
//       key={path}
//       element={<div className="page-wrapper">{element}</div>}
//       path={path}
//     />
//   );
// })}
