import Container from "../../components/Container/Container";
import PageTitle from './../../components/Title/PageTitle';
import Breadcrumbs from './../../components/Breadcrumbs/Breadcrumbs';
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import styles from './About.module.scss';
import SectionTitle from './../../components/Title/SectionTitle';
import CustomSlider from './../../components/CustomSlider/CustomSlider';
import Arrow from "./icons/arrow.svg?react";
import { selectTourAC, switchModalAC, toggleModalAC } from "../../redux/reducers/modalWindow-reducer";
import { useDispatch } from "react-redux";
const About = () => {
    const pathParts = useBreadcrumbs();
  const dispatch = useDispatch();
     
    const sliderArray = [
        {
            id: 1,
            imageUrl: 'https://res.cloudinary.com/dhpukux5x/image/upload/v1698006472/czjkoe7i7ghgzvwda6fq.png'
        },
        {
            id: 2,
            imageUrl:  'https://res.cloudinary.com/dhpukux5x/image/upload/v1701809728/basket-grapes_bummxg.png'
        },
        {
            id: 4,
            imageUrl: 'https://res.cloudinary.com/dhpukux5x/image/upload/v1698006472/f6r1lklgqunfof2slfbz.png'
        },
        {
            id: 5,
            imageUrl: 'https://res.cloudinary.com/dhpukux5x/image/upload/v1701809832/delivey_lapvmk.jpg'
        },
        {
            id: 6,
            imageUrl: 'https://res.cloudinary.com/dhpukux5x/image/upload/v1701809891/wine_in_shop_g6ih4g.jpg'
        },
        {
            id: 7,
            imageUrl:  'https://res.cloudinary.com/dhpukux5x/image/upload/v1701015599/w2_2_is0xk5.jpg'
        },
    ]
    const awardsData = [
        {
            id: 1,
            imageUrl: 'https://res.cloudinary.com/dhpukux5x/image/upload/v1701810546/spike-award_y90cho.png'
        },
        {
            id: 2,
            imageUrl:  'https://res.cloudinary.com/dhpukux5x/image/upload/v1701810474/award-cup_kp9yf9.png'
        },
        {
            id: 3,
            imageUrl:  'https://res.cloudinary.com/dhpukux5x/image/upload/v1701810547/spike-medal_tmyzba.png'
        },
        {
            id: 4,
            imageUrl: 'https://res.cloudinary.com/dhpukux5x/image/upload/v1698006473/nmog0rftntdsyue6bnaq.png'
        },
         {
            id: 5,
            imageUrl:  'https://res.cloudinary.com/dhpukux5x/image/upload/v1701810474/award-cup_kp9yf9.png'
        },
          {
            id: 6,
            imageUrl:  'https://res.cloudinary.com/dhpukux5x/image/upload/v1701810547/spike-medal_tmyzba.png'
        }
    ]

    const handleOpenModal = (title) => {
        dispatch(selectTourAC(title));
        dispatch(switchModalAC("reservation"));
        dispatch(toggleModalAC());
    }
    
    return (
        <>
            <Container>
                <PageTitle text={'About us'} />
                <Breadcrumbs pathParts={pathParts} />
                <section className={styles.OurMission}>
                    <div className={ styles.wrapperDescription}>
                        <div className={styles.missionDescription}>
                            <SectionTitle subText='Our' secText='Mission' />
                            <p className={styles.mission_text}>Is to produce wines of the highest class, which are distinguished by the uniqueness of taste and aroma. We prefer traditional winemaking methods, combining them with modern technologies to create the best result.</p>
                        </div>
                        <img src="https://res.cloudinary.com/dhpukux5x/image/upload/v1698006473/vjn3b2obij1lvelcorcz.png" alt="glass" />
                    </div>
                    <img src="https://res.cloudinary.com/dhpukux5x/image/upload/v1698006472/kbr1z8jlbdcdmoccpngj.png" alt="glass" className={ styles.corcsImage} />
                </section>
                <section className={styles.vintageVineDesc}>
                    <div className={styles.sectionContent}>
                        <SectionTitle subText='Welcome' secText='To Vintage Wine!' />
                        <div className={styles.sectionText}>
                            <p>We are a team of enthusiasts and winemakers who create top-class wines with care and dedication. With a passion for winemaking and a belief that wine can convey a true story to names and places, we are constantly striving to improve ."
                            "Our story began more than twenty years ago, when we planted our first vines with the dream of creating wines that reflect the richness and character of our region. During this time, we have gone from a small winery to a recognized workshop where every bottle is a masterpiece of winemaking .</p>
                        <p>We are proud that every drop in our wines is the result of our work and the ability to combine tradition and innovation. We follow every stage of production, starting with the selection of the best grape varieties and ending with the exquisite aging of the wines in our cellars."
                            "Our goal is to give you a unique taste and experience through each glass of our wines. We invite you to discover the world of Vino Elegante, where each bottle is a testimony of our passion and dedication.</p>
                        <p>Together we share the joy of winemaking and the unforgettable moments that mark your special events and joyful moments in life. Your support and your smiles of gratitude are our best rewards.</p>
                        </div>
                        <img src="https://res.cloudinary.com/dhpukux5x/image/upload/v1698006474/nsl8c7ovdp68scblya79.png" alt="grapes" />
                    </div>
                    <div className={styles.sectionImage}>
                        <img src="https://res.cloudinary.com/dhpukux5x/image/upload/v1701809580/vintage_jr0fva.png" alt="bottle" />
                    </div>
                </section>
                <section className={styles.OurProduction}>
                    <SectionTitle subText='Our' secText='Production' />
                    <CustomSlider type='PRODUCTION_ABOUT' sliderArray={sliderArray} toShow={3} toScroll={ 1} />
                </section>
            </Container>
            <section className={styles.AwardsVineyards}>
                <img src="https://res.cloudinary.com/dhpukux5x/image/upload/v1701810896/glass-red_rpjw6a.png" alt="glass" className={styles.sectionBgImage}/>
                <Container>
                    <SectionTitle subText='Our' secText='Awards' />
                    <CustomSlider type='AWARDS_ABOUT' sliderArray={awardsData} toShow={4} toScroll={1} />
                    <div className={ styles.Vinyards}>
                        <SectionTitle subText='Our' secText='Vineyards' />
                        <div className={styles.VinyardsContent}>
                            <div className={styles.contentColumn}>
                                <h4>Sun-kissed Vineyard Haven</h4>
                                <img src="https://res.cloudinary.com/dhpukux5x/image/upload/v1701810808/shelf-bottles_xmxvhb.png" alt="bottles" />
                            </div>
                            <div className={styles.contentColumn}>
                                <img src="https://res.cloudinary.com/dhpukux5x/image/upload/v1698006476/wszarjmgmty0spneuhbh.png" alt="bottles" />
                                <div className={ styles.desc}>
                                    <p>Welcome to our vineyard - an oasis of inspiration and taste refinement. On these sun-drenched slopes, our vineyard grows and ripens, turning into a select grape variety of the highest quality.</p>
                                    <p>Each vine is a living creation of nature, carefully cultivated by the hands of our experts. Our vineyards are surrounded by mountain air and enriched with unique soil, creating an ideal environment for the birth of the best wine juices.</p>
                                </div>
                                <button
                                      onClick={() => handleOpenModal('Vineyard tour')}
                                    className={styles.btnBookTour}>
                                    Book a tour
                                    <Arrow className={styles.Arrow} />
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
 
export default About;