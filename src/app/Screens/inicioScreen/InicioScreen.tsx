import {
  BtcComponente,
  CtaMasterPrivacy,
  Footer,
  WelcomeImg,
} from "@/app/Components";
import React from "react";

export const InicioScreen = () => {
  return (
    <div>
      <WelcomeImg />
      <BtcComponente />
      <CtaMasterPrivacy />
      <Footer />
    </div>
  );
};
