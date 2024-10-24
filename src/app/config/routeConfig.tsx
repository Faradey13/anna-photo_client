import {RouteProps} from "react-router-dom";
import MainPage from "../../pages/main/MainPage.tsx";
import Admin from "../../pages/admin/Admin.tsx";
import About from "../../pages/about/About.tsx";
import Contact from "../../pages/contact/Contact.tsx";
import Service from "../../pages/Service/Service.tsx";
import Family from "../../pages/gallery/family/Family.tsx";
import Thing from "../../pages/gallery/thing/Thing.tsx";
import Love from "../../pages/gallery/love/Love.tsx";
import Individual from "../../pages/gallery/individual/Individual.tsx";
import Thematic from "../../pages/gallery/thematic/Thematic.tsx";


// export const AboutLazy = lazy(() => import('../../pages/about/About'));
// export const MainPageLazy = lazy(() => import('../../pages/main/MainPage'));
// export const ContactLazy = lazy(() => import('../../pages/contact/Contact'));
// export const ServiceLazy = lazy(() => import('../../pages/Service/Service'));
// export const AdminLazy = lazy(() => import('../../pages/admin/Admin'));
// export const FamilyLazy = lazy(() => import('../../pages/gallery/family/Family'));
// export const ThingLazy = lazy(() => import('../../pages/gallery/thing/Thing'));
// export const LoveLazy = lazy(() => import('../../pages/gallery/love/Love'));
// export const IndividualLazy = lazy(() => import('../../pages/gallery/individual/Individual'));
// export const ThematicLazy = lazy(() => import('../../pages/gallery/thematic/Thematic'));



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
        element: <MainPage/>,
    },
    [AppRoute.ABOUT]:{
        path: RoutePath.about,
        element: <About/>,
    },
    [AppRoute.CONTACT]: {
        path: RoutePath.contact,
        element: <Contact/>,
    },
    [AppRoute.SERVICE]:{
        path: RoutePath.service,
        element: <Service/>
    },
    [AppRoute.FAMILY]: {
        path: RoutePath.family,
        element: <Family/>,
    },

    [AppRoute.THING] : {
        path: RoutePath.thing,
        element: <Thing/>
    },
    [AppRoute.LOVE] : {
        path: RoutePath.love,
        element: <Love/>,
    },
    [AppRoute.PERSONAL] : {
        path: RoutePath.individual,
        element: <Individual/>,
    },
    [AppRoute.THEMATIC]: {
        path: RoutePath.thematic,
        element: <Thematic/>,
    },
    [AppRoute.ADMIN] : {
        path: RoutePath.admin,
        element: <Admin/>,
    }

}