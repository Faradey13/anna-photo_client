import {RouteProps} from "react-router-dom";
import MainPage from "../../pages/main/MainPage.tsx";
import About from "../../pages/about/about.tsx";
import Contact from "../../pages/contact/contact.tsx";
import Price from "../../pages/price&service/price.tsx";
import Family from "../../pages/gallery/family/family.tsx";
import Thing from "../../pages/gallery/goods/thing.tsx";
import Love from "../../pages/gallery/love/love.tsx";
import Individual from "../../pages/gallery/individual/individual.tsx";
import Thematic from "../../pages/gallery/thematic/thematic.tsx";
import Admin from "../../pages/admin/admin.tsx";



export enum AppRoute {
    MAIN = 'main',
    ABOUT = 'about',
    CONTACT = 'contact',
    PRICE = 'price',
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
    [AppRoute.PRICE]: '/price',
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
    [AppRoute.PRICE]:{
        path: RoutePath.price,
        element: <Price/>
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