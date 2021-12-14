
import React from "react";
// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://www.facebook.com/minhthien17300">
              FaceBook
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/minhthien17300/FindWhereApp_FE_Admin">
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a
            href="https://www.facebook.com/minhthien17300"
            target="_blank"
          >
            HCMUTE-ers
          </a>{" "}
          Administrator Web Console
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
