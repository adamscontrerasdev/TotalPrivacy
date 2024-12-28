import React from "react";
import styles from "./page.module.css";
import VideoComponent from "./../componentsOfMaster/videoComponent";
import PriceInTheMidle from "./../componentsOfMaster/priceInTheMidle";
import AboutUs from "./../componentsOfMaster/aboustUs/aboutUs";
import PC from "./../componentsOfMaster/PCurriC/PC";
import Products from "./../componentsOfMaster/Products/products";
import Price from "./../componentsOfMaster/price/Price";
import COfArrow from "./../componentsOfMaster/COfArrow/cOfArrow";
import Faq from "./../componentsOfMaster/FAQ/faq";
import Footer from "./../componentsOfMaster/footer/footer";
import { ScrollProvider } from "./../componentsOfMaster/context/scrollContext";
import { ActiveContextProvider } from "../componentsOfMaster/context/avtiveContext";

const Home: React.FC = () => {
  return (
    <ActiveContextProvider>
      <ScrollProvider>
        <div className={styles.body}>
          <VideoComponent></VideoComponent>

          <div className={styles.space}></div>
          <PriceInTheMidle></PriceInTheMidle>
          <div className={styles.space}></div>
          <AboutUs></AboutUs>
          <PC></PC>
          <COfArrow></COfArrow>
          <Products></Products>
          <Price></Price>

          <br />
          <div className={styles.space}></div>
          <Faq></Faq>
          <Footer></Footer>
        </div>
      </ScrollProvider>
    </ActiveContextProvider>
  );
};

export default Home;