import { lazy } from "react";
import ViewEmail from "../components/ViewEmail";


const Main=lazy(()=>import('../pages/Main'))
const Emails=lazy(()=>import('../components/Emails'))
const Login=lazy(()=>import('../components/Login'))


const routes={
    main:{
        path:'/',
        element:Main
    },
    invalid:{
        path:'/*',
        element:Emails
    },
    login:{
        path:'/login',
        element:Login
    },
    emails:{
        path:'/emails',
        element:Emails,
    },
    view:{
        path:'/view',
        element:ViewEmail,
    },
    inbox:{
        path:'/inbox',
        element:Emails
    }
}

export {routes}