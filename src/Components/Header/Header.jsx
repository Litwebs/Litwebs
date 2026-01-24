import React, { useState, useEffect } from "react";
import Link from "../util/Link/Link";
import Menu from "./Menu";
import Nav from "../nav/Nav";
import "../util/core.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
// import { CiShoppingBasket } from "react-icons/ci";

const Header = () => {
  const [isShow, setShow] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShow(false);
      }
    };
    window.addEventListener("resize", handleResize);
    // Call handleResize initially to set the correct state
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const nav = useNavigate();

  return (
    <div className="header-con">
      <div className="header max-wid ">
        <div className="left"></div>
        <h3
          className="child local-header-title"
          style={{ cursor: "pointer" }}
          onClick={() => nav("/")}
        >
          LW
        </h3>
        <div className="right">
          <ul>
            <li>
              <Link name="Home" link="" />
            </li>
            {/* <li>
              <Link name='Packages' link='packages' />
            </li> */}
            <li>
              <Link name="Process" link="process" />
            </li>
            <li>
              <Link name="Our Work" link="example" />
            </li>
            <li>
              <Link name="Contact us" link="contact" />
            </li>
          </ul>
          <Menu setShow={setShow} isShow={isShow} />
          <Nav isShow={isShow} />
        </div>
      </div>
    </div>
  );
};

export default Header;
