import Container from './../../components/Container/Container';
import styles from './NoPage.module.scss'

const NoPage = () => {
    return (
        <Container>
            <div className={styles.errorPage}>
                <div className={styles.wrapperContent}>
                    <div className={styles.errorTitle}>404</div>
                    <div className={styles.errorDesc}>Page not found</div>
                </div>
                <img src="https://res.cloudinary.com/dhpukux5x/image/upload/v1698006085/fkkpp5a1l20nl7e05im7.png" alt="page not found" />
            </div>
        </Container>
    );
}
 
export default NoPage;