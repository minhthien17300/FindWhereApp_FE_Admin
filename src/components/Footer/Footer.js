
import React from "react";
// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://www.facebook.com/phamduy.lap.16/">
              FaceBook
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/ductuan2809/RVG">
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
          Web Review Game
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
