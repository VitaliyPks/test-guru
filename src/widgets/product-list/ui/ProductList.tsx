import { useEffect, useMemo, useState } from "react";

import {
  fetchProducts,
  setPage,
  setSearchQuery,
  setSort,
} from "@entities/product";

import { Button, Pagination, ProgressBar } from "@shared/ui";
import { useAppDispatch, useAppSelector } from "@shared/redux";
import { ReactComponent as ArrowsIcon } from "@shared/assets/icons/ArrowsClockwise.svg";
import { ReactComponent as PlusIcon } from "@shared/assets/icons/PlusCircle.svg";

import { ProductTable } from "@widgets/product-table/ui/ProductTable";

import { SearchBar } from "@features/search-bar";

import "./ProductList.scss";
import { AddProductModal } from "@features/add-product";

const ITEMS_PER_PAGE = 20;

export const ProductList = () => {
  const base = "product-list";
  const dispatch = useAppDispatch();
  const {
    items: products,
    total,
    limit,
    skip,
    loading,
    error,
    searchQuery,
    sortBy,
    sortOrder,
  } = useAppSelector((state) => state.product);

  const currentPage = useMemo(() => {
    const page = Math.floor(skip / limit) + 1;

    return isNaN(page) ? 1 : page;
  }, [skip, limit]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    let timer = setTimeout(
      () =>
        dispatch(
          fetchProducts({
            limit: ITEMS_PER_PAGE,
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            search: searchQuery || undefined,
            sortBy,
            order: sortOrder,
          }),
        ),
      250,
    );

    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, sortBy, sortOrder]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleSort = (field: Parameters<typeof setSort>[0]["field"]) => {
    dispatch(setSort({ field }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className={`${base}__error`}>
        <span className={`${base}__error-message`}>Ошибка загрузки данных</span>
        <span className={`${base}__error-details`}>{error}</span>
        <Button
          onClick={() =>
            dispatch(
              fetchProducts({
                limit: ITEMS_PER_PAGE,
                skip: 0,
                search: searchQuery || undefined,
                sortBy,
                order: sortOrder,
              }),
            )
          }
        >
          Повторить
        </Button>
      </div>
    );
  }

  return (
    <div className={base}>
      <SearchBar value={searchQuery} onSearch={handleSearch} />
      <div className={`${base}__content`}>
        <div className={`${base}__header`}>
          <h2 className={`${base}__header-title`}>Все позиции</h2>
          <div className={`${base}__actions`}>
            <Button className={`${base}__button-refresh`} mode="transparent">
              <ArrowsIcon />
            </Button>
            <Button
              className={`${base}__button-add`}
              onClick={() => setIsAddModalOpen(true)}
            >
              <PlusIcon />
              Добавить
            </Button>
          </div>
        </div>
        <ProductTable
          products={products}
          loading={loading}
          onSort={handleSort}
        />

        {total > 0 && (
          <Pagination
            disabled={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={total}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <ProgressBar isLoading={loading} />
    </div>
  );
};
