/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Guest from "layouts/RTL/Guest";
import User from "layouts/RTL/User";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import Detail from "views/ProductDetail/Detail";
import DetailModify from "views/DetailModify";


// const userstate={
//   role : false,
// }


ReactDOM.render(
  
  <ThemeContextWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/guest" render={(props) => <Guest {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/user" render={(props) => <User {...props} />} />
          {/* <Route path= "/detail-item" exact component={Detail}/> */}
          <Route path="/detail-item" render={(props) => <Detail {...props} />} />
          <Route path="/detail-modify" render={(props) => <DetailModify {...props} />} />
          <Redirect from="/" to="/guest/login" />
          {/* {userstate.role ? <Redirect from="/" to="/admin/dashboard" /> : <Redirect from="/" to="/rtl/dashboard" />} */}
        </Switch>
      </BrowserRouter>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
