import styles from './SearchForm.module.scss';
import Button from "../Button/Button";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterProducts} from "../../redux/reducers/products-reducer";
import {logIn} from "passport/lib/http/request";

const SearchForm = ({onSubmit}) => {
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState("");
    const [isInputActive, setIsInputActive] = useState(false)
    // const [foundProduct, setFoundProduct] = useState(null)

    const products = useSelector(state => state.products.filteredProducts)

    const isDropDownOpen = searchTerm !== "" && isInputActive

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
        dispatch(filterProducts(e.target.value))
    }

    const handleSearch = (e) => {
        e.preventDefault()
        onSubmit()

        // const found = products.find(product => product.name.toLowerCase() === searchTerm.toLowerCase())
        // setFoundProduct(found)
    }

    console.log(products)

    const limitedProducts = products.slice(0, 6);

    return (
        <form onSubmit={handleSearch} className={styles.Search} data-testid="SearchForm">
            <input className={styles.Input} placeholder="Find your favorite drink" type="text" value={searchTerm} onChange={handleInputChange} onFocus={() => setIsInputActive(true)} onBlur={() => setIsInputActive(false)} />

            <Button type="submit" text="Search"/>
            {isInputActive > 0  &&
                <ul className={styles.List}>
                    {limitedProducts.length > 0 ?  limitedProducts.map(product => <li key={product._id}><a className={styles.Link} href="#">{product.name}</a></li>): <li className={styles.Link}>Nothing Found</li> }
                </ul>
            }

            {/*{foundProduct && (*/}
            {/*    <div className={styles.FoundProduct}>*/}
            {/*        <h2>{foundProduct.name}</h2>*/}
            {/*        <p>{foundProduct.productDescription}</p>*/}
            {/*        <img src={foundProduct.productImg} alt={foundProduct.name} />*/}
            {/*    </div>*/}
            {/*)}*/}
        </form>
    )
};

export default SearchForm;
