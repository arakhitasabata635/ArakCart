import CategoryList from "../components/CategoryList";
import HomePageBanner from "../components/HomePageBanner";

import img1 from "../assest/banner/img1.webp";
import img2 from "../assest/banner/img2.webp";
import img3 from "../assest/banner/img3.jpg";
import img4 from "../assest/banner/img4.jpg";
import img5 from "../assest/banner/img5.webp";

import mobileImg1 from "../assest/banner/img1_mobile.jpg";
import mobileImg2 from "../assest/banner/img2_mobile.webp";
import mobileImg3 from "../assest/banner/img3_mobile.jpg";
import mobileImg4 from "../assest/banner/img4_mobile.jpg";
import mobileImg5 from "../assest/banner/img5_mobile.png";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

const Home = () => {
  const mobileImages = [
    mobileImg1,
    mobileImg2,
    mobileImg3,
    mobileImg4,
    mobileImg5,
  ];
  const desktopImages = [img1, img2, img3, img4, img5];
  return (
    <>
      <CategoryList />
      <HomePageBanner
        mobileImages={mobileImages}
        desktopImages={desktopImages}
      />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
    </>
  );
};

export default Home;
