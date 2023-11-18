import useResize from "../../hooks/useResize";
import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import { FilterContext } from "../../contexts/FilterContext";
import { sendGetRequest } from "../../helpers/api/sendGetRequest";
import FilterGroup from "../FilterGroup/FilterGroup";

import FilterIconPlus from "./icons/ShopPlus.svg?react";
import FilterIconMinus from "./icons/ShopMinus.svg?react";

import styles from './Filtration.module.scss';


const Filtration = () => {
    const { setFilter, setResetFilters } = useContext(FilterContext);
    const viewportWidth = useResize();
    const [links, setLinks] = useState([]);
    const [currentLink, setCurrentLinks] = useState(null);
    const [allFilters, setAallFilters] = useState(false);


    useEffect(() => {
        (async () => {
            const catalogLinks = await sendGetRequest('http://127.0.0.1:4000/api/catalog');
            setLinks(catalogLinks);
        })();
    }, []);

    const handleAllFilters = () => setAallFilters(prev => !prev);

    const handleSetCurrentLink = (link) => {
        if (currentLink === link) return;
        setCurrentLinks(link);
        setFilter({categories: link});
        setResetFilters(prev => !prev);
    };

    return (
        <>
            <div className={styles.FilterBar}>
                {viewportWidth >= 768 && (
                    <ul className={styles.FilterBarItems}>
                        {links.map(tab => (
                            <li key={tab.id} className={cn({ [styles.Active]: currentLink === tab.name.toLowerCase() })}>
                                <span data-tab={tab.id} onClick={() => handleSetCurrentLink(tab.name.toLowerCase())}>{tab.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className={styles.FilterBarAllFilters} onClick={handleAllFilters}>
                    <p>All filters</p>
                    {allFilters ?
                        <FilterIconMinus /> :
                        <FilterIconPlus />
                    }
                </div>
            </div>
            {allFilters && <FilterGroup />}
        </>
    )
}

export default Filtration;