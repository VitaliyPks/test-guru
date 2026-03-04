import classNames from "classnames";

import { ReactComponent as RightChevronIcon } from "@shared/assets/icons/chevrov-right.svg";
import { ReactComponent as LeftChevronIcon } from "@shared/assets/icons/chevron-left.svg";

import { Button } from "@shared/ui/button";

import "./Pagination.scss";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  disabled?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  maxVisiblePages = 5,
  disabled,
}: IPaginationProps) => {
  const base = "pagination";
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={base}>
      <span className={`${base}__info`}>
        {"Показано "}
        <span className={`${base}__info-highlight`}>
          {startIndex}-{endIndex}
        </span>
        {" из "}
        <span className={`${base}__info-highlight`}>{totalItems}</span>
      </span>
      <div className={`${base}__actions`}>
        <Button
          mode="transparent"
          className={`${base}__button ${base}__icons`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
        >
          <LeftChevronIcon />
        </Button>
        <div className={`${base}__actions-inner`}>
          {getPageNumbers().map((page, index) => (
            <Button
              key={index}
              mode="transparent"
              className={classNames(`${base}__button`, {
                active: page === currentPage,
              })}
              disabled={disabled}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          mode="transparent"
          className={`${base}__button ${base}__icons`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
        >
          <RightChevronIcon />
        </Button>
      </div>
    </div>
  );
};
