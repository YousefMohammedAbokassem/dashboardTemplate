import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Page404() {
  const [t] = useTranslation();
  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "100%",
        color: "var(--clr-product)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "40px",
      }}
    >
      404 😢
      <p className="text-center text-capitalize">{t("404")}</p>
    </div>
  );
}
