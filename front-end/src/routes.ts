// pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'courses-route',
        title: 'Courses',
        path: '/Courses',
        enabled: true,
        component: Courses
    }
]