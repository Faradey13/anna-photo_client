import {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {RouteConfig} from "../../config/routeConfig.tsx";


const AppRoutes = () => (

    <Suspense fallback={<div></div>}>
        <Routes>

            {Object.values(RouteConfig).map(({element, path}) =>
                <Route
                    element={
                        <div className='page_wrapper'>
                            {element}
                        </div>

                    }
                    path={path}
                    key={path}
                />
            )}
        </Routes>
    </Suspense>
);

export default AppRoutes;