import React from "react";
import classNames from "classnames";

import { ReactComponent as DotsThreeIcon } from "@shared/assets/icons/dots-three-circle-icon.svg";
import { ReactComponent as PlusIcon } from "@shared/assets/icons/plus-icon.svg";
import { IProduct, TSortField } from "@shared/types";
import { useAppDispatch } from "@shared/redux";
import { CheckBox } from "@shared/ui/check-box";
import { Button } from "@shared/ui";

import { toggleAllProducts, toggleProduct } from "@entities/product";

import { formatPrice } from "../lib";

import "./ProductTable.scss";

interface IProductTableProps {
  products: IProduct[];
  loading: boolean;
  onSort: (field: TSortField) => void;
}

export const ProductTable: React.FC<IProductTableProps> = ({
  products,
  loading,
  onSort,
}: IProductTableProps) => {
  const base = "product-table";
  const dispatch = useAppDispatch();
  const allChosen = products.length > 0 && products.every((p) => p.chosen);

  const handleToggleAll = () => {
    dispatch(toggleAllProducts());
  };

  const handleToggleProduct = (id: number) => {
    dispatch(toggleProduct(id));
  };

  const handleSort = (field: TSortField) => {
    onSort(field);
  };

  if (products.length === 0) {
    return <div className={`${base}__empty`}>Товары не найдены</div>;
  }

  return (
    <div className={base}>
      <table className={`${base}__table`}>
        <thead className={`${base}__thead`}>
          <tr className={`${base}__thead-row`}>
            <th className={`${base}__checkbox`}>
              <CheckBox
                disabled={loading}
                checked={allChosen}
                onChange={handleToggleAll}
              />
            </th>
            <th className={`${base}__thead-title`}>
              <span onClick={() => !loading && handleSort("title")}>
                Наименование
              </span>
            </th>
            <th>
              <span
                className={`${base}__thead-brand`}
                onClick={() => !loading && handleSort("brand")}
              >
                Вендор
              </span>
            </th>
            <th>Артикул</th>
            <th>
              <span
                className={`${base}__thead-rating`}
                onClick={() => !loading && handleSort("rating")}
              >
                Оценка
              </span>
            </th>
            <th>
              <span
                className={`${base}__thead-price`}
                onClick={() => !loading && handleSort("price")}
              >
                Цена, ₽
              </span>
            </th>
            <th className={`${base}__thead-actions`}></th>
          </tr>
        </thead>
        <tbody className={`${base}__tbody`}>
          {products.map((product) => {
            const price = formatPrice(product.price);

            return (
              <tr key={product.id} className={`${base}__tbody-row`}>
                <td
                  className={classNames(`${base}__checkbox`, {
                    active: product.chosen,
                  })}
                >
                  <CheckBox
                    disabled={loading}
                    checked={product.chosen}
                    onChange={() => handleToggleProduct(product.id)}
                  />
                </td>
                <td className={`${base}__tbody-product`}>
                  <div className={`${base}__product`}>
                    {product.thumbnail && (
                      <img
                        className={`${base}__product-image`}
                        src={product.thumbnail}
                        alt={product.title}
                      />
                    )}
                    <div className={`${base}__product-info`}>
                      <div className={`${base}__product-title`}>
                        {product.title}
                      </div>
                      <div className={`${base}__product-category`}>
                        {product.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`${base}__tbody-brand`}>
                  {product.brand ?? "-"}
                </td>
                <td className={`${base}__tbody-article`}>{product.sku}</td>
                <td className={`${base}__tbody-rating`}>
                  <span
                    className={classNames(`${base}__tbody-rating-text`, {
                      "bad-rating": product.rating < 3,
                    })}
                  >
                    {product.rating.toFixed(1)}
                  </span>
                  /5
                </td>
                <td>
                  <span className={`${base}__tbody-price`}>
                    {price.integer}
                    <span
                      className={`${base}__tbody-price-decimal`}
                    >{`, ${price.decimal}`}</span>
                  </span>
                </td>
                <td className={`${base}__tbody-actions`}>
                  <div className={`${base}__tbody-buttons`}>
                    <Button className={`${base}__tbody-button`}>
                      <PlusIcon />
                    </Button>
                    <DotsThreeIcon />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
