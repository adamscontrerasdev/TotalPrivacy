// iconsMap.ts
import { SiApple, SiWindows10, SiAndroid } from "react-icons/si";
import { MdOutlineDesktopMac } from "./../icons/Mac";
import { IconType } from "react-icons";

export const iconsMap: Record<string, IconType> = {
  apple: SiApple,
  android: SiAndroid,
  mac: MdOutlineDesktopMac as unknown as IconType,
  win: SiWindows10,
  // Agrega más según lo necesites
};
