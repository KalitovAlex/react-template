import { ReactNode, useEffect } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };
  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (!savedLanguage) {
      const browserLang = navigator.language.split("-")[0];
      const supportedLang = ["en", "ru"].includes(browserLang)
        ? browserLang
        : "en";
      changeLanguage(supportedLang);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>

      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 p-2 flex justify-center gap-2 bg-background/80 backdrop-blur-md rounded-full shadow-lg border border-default-200">
        <ButtonGroup variant="flat" size="sm" className="rounded-full">
          <Button
            className={`px-3 min-w-[40px] ${
              i18n.language === "en" ? "font-bold" : ""
            }`}
            onClick={() => changeLanguage("en")}
            radius="full"
          >
            EN
          </Button>
          <Button
            className={`px-3 min-w-[40px] ${
              i18n.language === "ru" ? "font-bold" : ""
            }`}
            onClick={() => changeLanguage("ru")}
            radius="full"
          >
            RU
          </Button>
        </ButtonGroup>
        <div className="w-px bg-default-200 mx-1" />
        <ThemeSwitcher />
      </footer>
    </div>
  );
};
