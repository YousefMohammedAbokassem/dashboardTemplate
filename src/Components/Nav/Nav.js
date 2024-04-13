import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { goUp } from "../Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {
  faBars,
  faBoxesPacking,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const language = useSelector((state) => state.language.language);
  const [t] = useTranslation();
  const ChangeTitle = (vl, e) => {
    const scrollLine = document.querySelector(".scroll");
    scrollLine.style.cssText = "width:10px";
    goUp();
    document.title = t(vl);
    // moving span active into the target
    const span = document.querySelector("nav span.active");
    const fromTop = e.currentTarget.offsetTop;
    const widthSpan = e.currentTarget.offsetWidth;
    span.style.setProperty("--y", `${fromTop}px`);
    // span.style.setProperty("--widthSpan", `${widthSpan}px`);
    span.style.width = `${widthSpan}px`;
  };
  useEffect(() => {
    const span = document.querySelector("nav span.active");
    const anchor = document.querySelector("nav a.active");
    if (anchor === undefined) {
      const fromTop = anchor.offsetTop;
      span.style.setProperty("--y", `${fromTop}px`);
      window.onresize = () => {
        // moving span active into the target
        const span = document.querySelector("nav span.active");
        const anchor = document.querySelector("nav a.active");
        // const fromTop = anchor.offsetTop;
        const widthSpan = anchor.offsetWidth;
        // span.style.setProperty("--y", `${fromTop}px`);
        // span.style.setProperty("--widthSpan", `${widthSpan}px`);
        span.style.width = `${widthSpan}px`;
      };
    }
  }, []);
  return (
    <nav className="d-flex flex-column bg-boxes">
      <span
        className={`active ${
          localStorage.getItem("i18nextLng") === "ar" ? "ar" : ""
        }`}
      ></span>

      <NavLink
        className={`${
          language === "ar" ? "ar" : ""
        } py-2 px-1 px-sm-2   d-flex align-items-center text-decoration-none `}
        to="/"
        onClick={(e) => ChangeTitle("social", e)}
      >
        <span className="px-2 px-sm-0 ">
          <FontAwesomeIcon icon={faBars} />
        </span>
        <span className="mx-2 d-none d-md-inline-block">{t("social")}</span>{" "}
      </NavLink>
      <NavLink
        to="/videos"
        className={`${
          language === "ar" ? "ar" : ""
        } py-2 px-1 px-sm-2  d-flex align-items-center text-decoration-none `}
        onClick={(e) => ChangeTitle("videos", e)}
      >
        <span className="px-2 px-sm-0">
          <FontAwesomeIcon icon={faChartBar} />
        </span>
        <span className="mx-2 d-none d-md-inline-block">{t("videos")}</span>
      </NavLink>
      <NavLink
        to="/apps"
        className={`${
          language === "ar" ? "ar" : ""
        } py-2 px-1 px-sm-2  d-flex align-items-center text-decoration-none `}
        onClick={(e) => ChangeTitle("apps", e)}
      >
        <span className="px-2 px-sm-0">
          <FontAwesomeIcon icon={faBoxesPacking} />
        </span>
        <span className="mx-2 d-none d-md-inline-block">{t("apps")}</span>
      </NavLink>
    </nav>
  );
}
