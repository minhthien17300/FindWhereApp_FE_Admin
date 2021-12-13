
import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import GuestNavbar from "components/Navbars/GuestNavbar";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";

var ps;

function User(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.userlayout === "/user") {
        return (
          <Route
            path={prop.userlayout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].userlayout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Home";
  };
  return ( 
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              islogin={true}
              isadmin={false}
              routes={routes}
              logo={{
                outterLink: "https://www.facebook.com/phamduy.lap.16/",
                text: "FindWhere Manager",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Switch>
                {getRoutes(routes)}
              </Switch>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/user/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
        </React.Fragment>
  );
}

export default User;
