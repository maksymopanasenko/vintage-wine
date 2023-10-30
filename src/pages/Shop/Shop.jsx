import styles from "./Shop.module.scss";
import Breadcrumbs from "./../../components/Breadcrumbs/Breadcrumbs";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import { useState } from "react";
import caberne from "/imageProject/shoping/caberne.png";
import ft6 from "/imageProject/shoping/6ft6.png";
import brandy from "/imageProject/shoping/brandy.png";
import esprit from "/imageProject/shoping/esprit.png";
import gautherot from "/imageProject/shoping/gautherot.png";
import heinken from "/imageProject/shoping/heinken.png";
import jac from "/imageProject/shoping/jac.png";
import legis from "/imageProject/shoping/legis.png";
import rasteau from "/imageProject/shoping/rasteau.png";
import sacura from "/imageProject/shoping/sacura.png";
import white_label from "/imageProject/shoping/white-label.png";
import yellow_wine from "/imageProject/shoping/yellow-wine.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React, { Suspense } from "react";
const Filtration = React.lazy(() =>
    import("../../components/Filtaration/Filtaration")
);

const Shop = () => {
    const links = ["Wine", "Sparkling", "Whiskey", "Strong", "Beer", "Ciders"];
    const smallImages_one = [ft6, esprit, gautherot, heinken];
    const smallImages_two = [brandy, legis, rasteau, sacura];
    const smallImages_three = [yellow_wine, esprit, gautherot, heinken];
    const pathParts = useBreadcrumbs();
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       const response = await fetch('http://127.0.0.1:4000/api/catalog');
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       const catalogData = await response.json();
    //       setData(catalogData);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }

    //   fetchData();
    // }, []);

    return (
        <div className={styles.ShopContainer}>
            <h1 className={styles.ShopParagraph}>Our Shop</h1>
            <div className={styles.ShopBreadCrumbs}>{<Breadcrumbs pathParts={pathParts} />}</div>
            <div className={styles.ShopFilterBar}>
                <ul className={styles.ShopFilterBarItems}>
                    {/* {data.map((item) => (
              <li key={item.id}>
                <a href={"#"}>{item.name}</a>
              </li>
            ))} */}
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={'#'}>{link}</a>
                        </li>
                    ))}
                </ul>
                <Suspense fallback={<div>Loading...</div>}>
                    <Filtration />
                </Suspense>
            </div>
            <div className={styles.ShopImagesContainer}>
                <div className={styles.ShopImagesPortionOne}>
                    <LazyLoadImage img="true" src={caberne} alt="Big Image" effect="blur" />
                    <div className={styles.ShopImagesSmall_One}>
                        {smallImages_one.map((path, index) => (
                            <LazyLoadImage key={index} src={path} alt={`Image ${index + 1}`} effect="blur" />
                        ))}
                    </div>
                </div>
                <div className={styles.ShopImagesPortionTwo}>
                    <LazyLoadImage img="true" src={jac} alt="Big Image" effect="blur" />
                    <div className={styles.ShopImagesSmall_Two}>
                        {smallImages_two.map((path, index) => (
                            <LazyLoadImage key={index} src={path} alt={`Image ${index + 1}`} effect="blur" />
                        ))}
                    </div>
                </div>
                <div className={styles.ShopImagesPortionThree}>
                    <LazyLoadImage src={white_label} alt="Big Image" effect="blur" />
                    <div className={styles.ShopImagesSmall_Three}>
                        {smallImages_three.map((path, index) => (
                            <LazyLoadImage key={index} src={path} alt={`Image ${index + 1}`} effect="blur" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
