import { useEffect, useState } from "react";

import { ReactComponent as SearchIcon } from "@shared/assets/icons/search.svg";

import { Input } from "@shared/ui";

import "./SearchBar.scss";

interface ISearchBarProps {
  value: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export const SearchBar = ({
  value,
  onSearch,
  debounceMs = 500,
}: ISearchBarProps) => {
  const base = "search-bar";
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        onSearch(inputValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, debounceMs, onSearch, value]);

  return (
    <div className={base}>
      <h1 className={`${base}__title`}>Товары</h1>
      <Input
        leftIcon={<SearchIcon />}
        placeholder="Поиск"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        clearValue={() => setInputValue("")}
      />
    </div>
  );
};
