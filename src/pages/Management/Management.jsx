import Container from '../../components/Container/Container';
import ManagementControllers from '../../components/admin-components/ManagementControllers/ManagementControllers';
import styles from './Management.module.scss'

const Management = () => {
    return (
        <section className={styles.Management}>
            <div className={styles.ManagementProducts}>
                <ManagementControllers />
            </div>
        </section>
    );
}

export default Management;