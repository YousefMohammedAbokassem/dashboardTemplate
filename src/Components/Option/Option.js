import React, { useContext, useEffect } from "react";
import { Language } from "../Container/Container";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
export default function Option() {
  const language = useSelector((state) => state.language.language);
  const [t] = useTranslation();

  const hide = () => {
    const Option = document.querySelector(".option");
    const iconOption = document.querySelector(".iconOption");
    Option.classList.toggle("showOption");
    iconOption.classList.toggle("fa-spin");
  };
  const changeColor = (e) => {
    const colorBody = e.target.dataset.colorbody;
    const colorBoxes = e.target.dataset.colorboxes;
    const textColor = e.target.dataset.textcolor;
    const spansTheme = document.querySelectorAll(".themes span");

    // set colors in local storage
    localStorage.setItem("colorbody", colorBody);
    localStorage.setItem("colorboxes", colorBoxes);
    // remove active class  from all span
    spansTheme.forEach((span) => {
      span.classList.remove("active");
    });
    // add active class to the target span
    e.target.classList.add("active");
    // set the colors to the project
    document.documentElement.style.setProperty(
      "--clr-secondary",
      `${colorBody}`
    );
    document.documentElement.style.setProperty(
      "--clr-primary",
      `${colorBoxes}`
    );
    document.documentElement.style.setProperty("--text-color", `${textColor}`);
  };
  const changeColorProduct = (e) => {
    const colorProduct = e.target.dataset.colorproduct;
    const spansTheme = document.querySelectorAll(".colorProduct div span");
    // set colors in local storage
    localStorage.setItem("colorproduct", colorProduct);
    // remove active class  from all span
    spansTheme.forEach((span) => {
      span.classList.remove("active");
    });
    // add active class to the target span
    e.target.classList.add("active");
    // set the colors to the project
    document.documentElement.style.setProperty(
      "--clr-product",
      `${colorProduct}`
    );
  };
  const resetOptions = (e) => {
    const spansTheme = document.querySelectorAll(".option span");

    // remove active class  from all span
    spansTheme.forEach((span) => {
      span.classList.remove("active");
    });
    // add active class to the target span

    localStorage.removeItem("colorproduct");
    localStorage.removeItem("colorbody");
    localStorage.removeItem("colorboxes");
    document.documentElement.style.setProperty("--clr-product", "");
    document.documentElement.style.setProperty("--clr-secondary", "");
    document.documentElement.style.setProperty("--clr-primary", "");
    document.documentElement.style.setProperty("--text-color", "");
  };
  useEffect(() => {
    const colorBody = localStorage.getItem("colorbody");
    const colorProduct = localStorage.getItem("colorproduct");
    const spansTheme = document.querySelectorAll(".themes span");
    const colorProductSpans = document.querySelectorAll(".colorProduct span");
    if (colorBody !== null) {
      spansTheme.forEach((span) => {
        if (colorBody === span.dataset.colorbody) {
          span.click();
        }
      });
    }
    if (colorProduct !== null) {
      colorProductSpans.forEach((span) => {
        if (colorProduct === span.dataset.colorproduct) {
          span.click();
        }
      });
    }
  }, []);
  return (
    <div className={`${language === "ar" ? "ar" : ""} option`}>
      <span
        className={`${language === "ar" ? "ar" : ""} position-absolute`}
        onClick={hide}
      >
        {/* fa-spin */}
        <i className="fa fa-gear p-2 iconOption"></i>
      </span>
      <h6>{t("themeColor")}</h6>
      <div className="themes">
        {/* #83e */}
        <span
          className="resetSpan"
          data-colorbody="#f4f4f4"
          data-colorboxes="#fff"
          data-textcolor="#111"
          onClick={changeColor}
        ></span>
        <span
          data-colorbody="#1e1611"
          data-colorboxes="#29221d"
          data-textcolor="#fff"
          onClick={changeColor}
        ></span>
      </div>
      <div className="colorProduct d-flex flex-column align-items-center justify-content-center">
        <h6 className="position-absolute">{t("SubColor")}</h6>
        <div className="d-flex justify-content-center align-items-center gap-2 ">
          <span
            className="resetSpan"
            data-colorproduct="#863eff"
            onClick={changeColorProduct}
          ></span>
          <span data-colorproduct="#fe6c00" onClick={changeColorProduct}></span>
          <span data-colorproduct="#e91e63" onClick={changeColorProduct}></span>
          <span data-colorproduct="#005ff5" onClick={changeColorProduct}></span>
        </div>
      </div>
      <button
        className="mt-3  border-0 text-white mainColorBg py-2 px-1 resetBtn"
        onClick={resetOptions}
      >
        {t("resetOption")}
      </button>
    </div>
  );
}
