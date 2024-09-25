import {RouteProps} from "react-router-dom";
import { lazy } from "react";


export const AboutLazy = lazy(() => import('../../pages/about/About'));
export const MainPageLazy = lazy(() => import('../../pages/main/MainPage'));
export const ContactLazy = lazy(() => import('../../pages/contact/Contact'));
export const ServiceLazy = lazy(() => import('../../pages/Service/Service'));
export const AdminLazy = lazy(() => import('../../pages/admin/Admin'));
export const FamilyLazy = lazy(() => import('../../pages/gallery/family/Family'));
export const ThingLazy = lazy(() => import('../../pages/gallery/thing/Thing'));
export const LoveLazy = lazy(() => import('../../pages/gallery/love/Love'));
export const IndividualLazy = lazy(() => import('../../pages/gallery/individual/Individual'));
export const ThematicLazy = lazy(() => import('../../pages/gallery/thematic/Thematic'));



export enum AppRoute {
    MAIN = 'main',
    ABOUT = 'about',
    CONTACT = 'contact',
    SERVICE = 'service',
    FAMILY = 'family',
    THING = 'thing',
    LOVE = 'love',
    PERSONAL = 'individual',
    THEMATIC = 'thematic',
    ADMIN = 'admin',
}


export const RoutePath: Record<AppRoute, string> = {
    [AppRoute.MAIN] : '/',
    [AppRoute.ABOUT]: '/about',
    [AppRoute.CONTACT]: '/contact',
    [AppRoute.SERVICE]: '/service',
    [AppRoute.FAMILY]: '/family',
    [AppRoute.THING]: '/thing',
    [AppRoute.LOVE]: '/love',
    [AppRoute.PERSONAL]: '/individual',
    [AppRoute.THEMATIC]: '/thematic',
    [AppRoute.ADMIN]: '/alohomora',
}

export const RouteConfig: Record<AppRoute, RouteProps> = {
    [AppRoute.MAIN]:{
        path: RoutePath.main,
        element: <MainPageLazy/>,
    },
    [AppRoute.ABOUT]:{
        path: RoutePath.about,
        element: <AboutLazy/>,
    },
    [AppRoute.CONTACT]: {
        path: RoutePath.contact,
        element: <ContactLazy/>,
    },
    [AppRoute.SERVICE]:{
        path: RoutePath.service,
        element: <ServiceLazy/>
    },
    [AppRoute.FAMILY]: {
        path: RoutePath.family,
        element: <FamilyLazy/>,
    },

    [AppRoute.THING] : {
        path: RoutePath.thing,
        element: <ThingLazy/>
    },
    [AppRoute.LOVE] : {
        path: RoutePath.love,
        element: <LoveLazy/>,
    },
    [AppRoute.PERSONAL] : {
        path: RoutePath.individual,
        element: <IndividualLazy/>,
    },
    [AppRoute.THEMATIC]: {
        path: RoutePath.thematic,
        element: <ThematicLazy/>,
    },
    [AppRoute.ADMIN] : {
        path: RoutePath.admin,
        element: <AdminLazy/>,
    }

}