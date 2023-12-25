import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Overlay from '../../components/Overlay/Overlay';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { switchModalAC, toggleModalAC } from '../../redux/reducers/modalWindow-reducer';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const Layout = () => {
    const isModalOpen = useSelector(state => state.modal.isModalOpen);
    const isMergedCart = useSelector(state => state.mergeCart.isMergeCart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isMergedCart) return;

        dispatch(switchModalAC('cart'));
        dispatch(toggleModalAC());
    }, [isMergedCart])

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            {isModalOpen && createPortal(
                <Overlay />,
                document.body
            )}
            
            <ScrollToTop />
        </>
    );
};

export default Layout;
