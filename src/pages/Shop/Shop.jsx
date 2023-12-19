import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import useResize from "../../hooks/useResize";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";

import { sendGetRequest } from "../../helpers/api/sendGetRequest";
import { FilterContext } from "../../contexts/FilterContext";
import { updateFilteredProductsAC } from "../../redux/reducers/filters-reducer";

import Breadcrumbs from "./../../components/Breadcrumbs/Breadcrumbs";
import UniProduct from "../../components/ProductCard/UniProduct";
import PageTitle from "../../components/Title/PageTitle";
import EmptyCartText from "../../components/CartItem/EmptyCartText/EmptyCartText";

import styles from "./Shop.module.scss";
import { resetAllFiltersAC } from "../../redux/reducers/tabs-reducer";
import Loader from "../../components/Loader/Loader";
import {
  hideLoadingAC,
  showLoadingAC,
} from "../../redux/reducers/loading-reducer";
import Filtration from "../../components/Filtaration/Filtaration";

const MIN_VALUE = 768;
const MAX_VALUE = 1160;

const Shop = () => {
  const [productCards, setProductCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [filter, setFilter] = useState({});
  const [resetFilters, setResetFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const pathParts = useBreadcrumbs();
  const viewportWidth = useResize();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAllFiltersAC());
    };
  }, []);

  useEffect(() => {
    if (resetFilters) {
      while (searchParams.keys().next().value) {
        searchParams.delete(searchParams.keys().next().value);
      }
    }
  }, [resetFilters]);

  useEffect(() => {
    const createUrlQuery = (filterConfigs) => {
      searchParams.set("perPage", "10");
      searchParams.set("startPage", currentPage);

      Object.entries(filterConfigs).forEach(([name, value]) => {
        searchParams.set(name, value);
      });

      setSearchParams(Object.fromEntries(searchParams.entries()));

      return searchParams.toString();
    };

    const url =
      "https://vintage-wine-nyw6.onrender.com/api/products/filter?" + createUrlQuery(filter);

    (async () => {
      dispatch(showLoadingAC());
      const data = await sendGetRequest(url);
      setProductCards(createCards(data.products));
      setNumberOfPages(Math.ceil(data.productsQuantity / 10));
      dispatch(updateFilteredProductsAC(data.allProducts));
      setResetFilters(false);

      dispatch(hideLoadingAC());
    })();
  }, [filter, viewportWidth, currentPage]);


  useEffect(() => {
    setCurrentPage(1)
  }, [filter]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage + 1);
  };

  function createCards(array) {
    const shopElements = [];
    const chunkSize =
      viewportWidth > MIN_VALUE && viewportWidth < MAX_VALUE ? 3 : 5;

    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      const [firstImage, ...restImages] = chunk;

      const bigImageDiv = (
        <div key={`bigImage_${i}`}>
          <UniProduct key={firstImage._id} data={firstImage} />
        </div>
      );

      const smallImagesDiv = (
        <div className={styles.ShopImagesSmall} key={`smallImages_${i}`}>
          {restImages.map((product) => (
            <div key={product._id} className={styles.SmallProductContainer}>
              <UniProduct key={product._id} data={product} isSmall />
            </div>
          ))}
        </div>
      );

      shopElements.push(
        <div
          dir={i % 2 === 0 ? "ltr" : "rtl"}
          className={styles.ShopImagesSection}
          key={`section_${i}`}
        >
          {[bigImageDiv, smallImagesDiv]}
        </div>,
      );
    }

    return shopElements;
  }

  const loaderOrEmpty =
    isLoading && !productCards.length ? (
      <Loader />
    ) : (
      <EmptyCartText text="Products not found" />
    );

  return (
      <div className={styles.ShopInfo}>
    <div className={styles.ShopContainer}>

      <PageTitle text="Our Shop" />
      <Breadcrumbs pathParts={pathParts} />
      <FilterContext.Provider
        value={{ filter, setFilter, resetFilters, setResetFilters }}
      >
        <Filtration />
      </FilterContext.Provider>
      <div className={styles.ShopImagesContainer}>
        {productCards.length ? productCards : loaderOrEmpty}
      </div>
      {numberOfPages > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaGreaterThan />}
          previousLabel={<FaLessThan />}
          onPageChange={handlePageClick}
          pageCount={numberOfPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          renderOnZeroPageCount={null}
          containerClassName={styles.Pagination}
          activeLinkClassName={styles.ActiveBtn}
          nextClassName={styles.ControleBtn}
          nextLinkClassName={styles.ControleBtn}
          previousClassName={styles.ControleBtn}
          previousLinkClassName={styles.ControleBtn}
          pageLinkClassName={styles.PageBtn}
        />
      )}
      </div>
    </div>
  );
};

export default Shop;
