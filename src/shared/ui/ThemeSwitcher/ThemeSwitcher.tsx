import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";
import { SystemIcon } from "./icons/SystemIcon";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("system");
        break;
      default:
        setTheme("light");
    }
  };

  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      onClick={toggleTheme}
      aria-label={t("common.toggleTheme")}
      className="min-w-[40px]"
      radius="full"
    >
      {theme === "light" ? (
        <SunIcon />
      ) : theme === "dark" ? (
        <MoonIcon />
      ) : (
        <SystemIcon />
      )}
    </Button>
  );
};
