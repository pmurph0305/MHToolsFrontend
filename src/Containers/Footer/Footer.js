import React from "react";

import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer__container">
      <hr className="footer__hr" />
      <p className="footer__text">
        If you are experiencing a mental health crisis, click&#160;
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.google.com/search?q=mental+health+crisis+lines+in+my+area"
        >
          here
        </a>
        &#160;to find a help line in your area.
      </p>
      <p className="footer__text">
        If you are having difficulty finding help, a doctor or hospital in your
        area can direct you to resources in your community.
      </p>
    </div>
  );
};

export default Footer;
