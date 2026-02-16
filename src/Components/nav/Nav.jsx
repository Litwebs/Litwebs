import React, { useEffect } from "react";
import { BiSolidChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Nav.css";
import "../util/core.css";
import "../util/colors.css";

const Nav = ({ isShow }) => {
  // Lock scroll when nav is active
  useEffect(() => {
    const body = document.body;

    if (isShow) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }

    // Clean up when component unmounts
    return () => {
      body.classList.remove("no-scroll");
    };
  }, [isShow]);

  return (
    <div className={`nav ${isShow ? "active" : "hidden"}`}>
      <div className="item ">
        <Link className="link2" to="/" onClick={() => window.location.reload()}>
          Home
        </Link>
        <BiSolidChevronRight className="icon" />
      </div>
      {/* <div className='item'>
        <Link
          className='link2'
          to='/packages'
          onClick={() => window.scrollTo(0, 0)}>
          Packages
        </Link>
        <BiSolidChevronRight className='icon' />
      </div> */}
      <div className="item">
        <Link
          className="link2"
          to="/services"
          onClick={() => window.scrollTo(0, 0)}
        >
          Services
        </Link>
        <BiSolidChevronRight className="icon" />
      </div>
      <div className="item">
        <Link
          className="link2"
          to="/example"
          onClick={() => window.scrollTo(0, 0)}
        >
          Our Work
        </Link>
        <BiSolidChevronRight className="icon" />
      </div>
      <div className="item">
        <Link
          className="link2"
          to="/about"
          onClick={() => window.scrollTo(0, 0)}
        >
          About
        </Link>
        <BiSolidChevronRight className="icon" />
      </div>
      <div className="item">
        <Link
          className="link2"
          to="/contact"
          onClick={() => window.scrollTo(0, 0)}
        >
          Contact us
        </Link>
        <BiSolidChevronRight className="icon" />
      </div>
      {/* <div className='item'>
        <Link
          className='link2 align'
          to='/checkout'
          onClick={() => window.scrollTo(0, 0)}>
          <CiShoppingBasket size={25} className='ic' />
          Basket
        </Link>
        {Basket?.length > 0 && (
          <div className='counter-tag-nav'>
            <p>{Basket.length}</p>
          </div>
        )}
        <BiSolidChevronRight className='icon' />
      </div> */}
    </div>
  );
};

export default Nav;
