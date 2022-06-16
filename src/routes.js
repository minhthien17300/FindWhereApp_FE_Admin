
//import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons";
//import Map from "views/Map.js";
//import Notifications from "views/Notifications.js";
//import Rtl from "views/Rtl.js";
import ManageProduct from "views/ManageProduct";
//import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile";
import EnterpriseAdd from "views/EnterpriseAdd";

import Login from "auth/Login";
import Register from "auth/Register";
import ForgotPass from "auth/ForgotPass";
import ResetPassword from "auth/ResetPassword";
import Detail from "views/ProductDetail/Detail";
import Dashboard from "views/Dashboard";
import DetailAdd from "views/DetailAdd";
import ManageUser from "views/ManageUser";
import ManageEnterprise from "views/ManageEnterprise";
import DetailModify from "views/DetailModify";
import ChangePassword from "auth/ChangePassword";
import MapScreen from "views/Map";
import Bill from "views/Bill";

const authRoutes = [

]


var routes = [
  // { path: "/reset-password", component: ResetPassword },
  // { path: "/login", component: Login },
  // { path: "/forgot-password", component: ForgotPass },
  // { path: "/register", component: Register },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    adminlayout: "/admin",
    userlayout: "/user",
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "Login",
    icon: "tim-icons icon-chart-pie-36",
    component: Login,
    guestlayout: "/guest",
  },
  {
    path: "/bill",
    name: "Bill",
    rtlName: "Bill",
    icon: "tim-icons icon-chart-pie-36",
    component: Bill,
    guestlayout: "/guest",
  },

  {
    path: "/register",
    name: "Register",
    rtlName: "Register",
    icon: "tim-icons icon-bell-55",
    component: Register,
    guestlayout: "/guest",
  },

  {
    path: "/resetpassword",
    name: "Reset Password",
    rtlName: "Reset Password",
    icon: "tim-icons icon-atom",
    component: ResetPassword,
    guestlayout: "/guest",
  },

  {
    path: "/forgotpass",
    name: "Forgot Password",
    rtlName: "Forgot Password",
    icon: "tim-icons icon-single-02",
    component: ForgotPass,
    guestlayout: "/guest",
  },

  {
    path: "/products",
    name: "Products",
    rtlName: "Products",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin",
    rtllayout: "/rtl",
    adminlayout: "/admin",
    userlayout: "/user",
  },

  {
    path: "/manage-products",
    name: "Manage Products",
    rtlName: "Manage-products",
    icon: "tim-icons icon-atom",
    component: ManageProduct,
    userlayout: "/user",
  },
  {
    path: "/manage-users",
    name: "Manage Users",
    rtlName: "Manage-users",
    icon: "tim-icons icon-atom",
    component: ManageUser,
    adminlayout: "/admin",
  },
  {
    path: "/manage-enterprises",
    name: "Manage Enterprises",
    rtlName: "Manage-enterprises",
    icon: "tim-icons icon-atom",
    component: ManageEnterprise,
    adminlayout: "/admin",
  },
  {
    path: "/change-password",
    name: "Change Password",
    rtlName: "Change-password",
    icon: "tim-icons icon-atom",
    component: ChangePassword,
    adminlayout: "/admin",
    userlayout: "/user",
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: MapScreen,
    adminlayout: "/admin",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    adminlayout: "/admin",
    userlayout: "/user",
  },
  {
    path: "/detail",
    name: "Detail",
    rtlName: "Detail",
    icon: "tim-icons icon-puzzle-10",
    component: Detail,
    adminlayout: "/admin",
    userlayout: "/user",
  },
  /* {
    path: "/tables",
    name: "Table List",
    rtlName: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    adminlayout: "/admin",
    guestlayout: "/guest",
    userlayout: "/user",
  }, */
  
  {
    path: "/add-products",
    name: "Add Products",
    rtlName: "Add Products",
    icon: "tim-icons icon-puzzle-10",
    component: DetailAdd,
    userlayout: "/user",
  },
  {
    path: "/add-enterprises",
    name: "Add Enterprises",
    rtlName: "Add-enterprises",
    icon: "tim-icons icon-puzzle-10",
    component: EnterpriseAdd,
    adminlayout: "/admin",
  },
  {
    path: "/detail-modify",
    name: "Detail Modify",
    rtlName: "Detail-Modify",
    icon: "tim-icons icon-puzzle-10",
    component: DetailModify,
    userlayout: "/user",
  },
 
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl",
  // },
];
export default  routes ;
