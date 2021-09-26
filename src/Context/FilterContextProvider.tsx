import { createContext, useContext, useState } from "react";
export interface FilterContextProps {
  filterArray: (IFilter | IFilterGroup)[];
  setFilterArray: ((filterArr: (IFilter | IFilterGroup)[]) => void) | null;
}

export const SELECTOR = [
  { key: "Project", value: "PROJECT" },
  { key: "Tag", value: "TAG" },
  { key: "Id", value: "ID" },
  { key: "Approved", value: "APPROVED" },
  { key: "Type", value: "TYPE" },
];

export const MATCHER = [
  { key: "Contains", value: "CONTAINS" },
  { key: "Does Not Contain", value: "DOES_NOT_CONTAINS" },
  { key: "Is", value: "IS" },
  { key: "Is Not", value: "IS_NOT" },
  { key: "Is Empty", value: "IS_EMPTY" },
  { key: "Is Not Empty", value: "IS_NOT_EMPTY" },
];

export const FILTER_OPTIONS = [
  { key: "And", value: "AND" },
  { key: "Or", value: "OR" },
];

export interface IFilter {
  selector: string;
  matcher: string;
  value: string;
  id: string;
  filterOption: string;
  isFilterGroup: boolean;
  filters: null,
}

export interface IFilterGroup {
  id: string;
  filterOption: string;
  filters: IFilter[];
  isFilterGroup: boolean;
}

export const defaultFilterEntry: IFilter = {
  id: '',
  selector: "Project",
  matcher: "Contains",
  value: "",
  filterOption: "",
  filters: null,
  isFilterGroup: false,
};

export const defaultFilterGroupEntry: IFilterGroup = {
  filters: [
    {
      selector: "Project",
      matcher: "Contains",
      value: "",
      id: '',
      filterOption: '',
      filters: null,
      isFilterGroup: true,
    },
  ],
  id: '',
  filterOption: '',
  isFilterGroup: true,
};

export const FilterContext = createContext<FilterContextProps>({
  filterArray: [],
  setFilterArray: null,
});

export const FilterProvider: React.FC = (props) => {
  const [filterArray, setFilterArray] = useState<(IFilter | IFilterGroup)[]>([]);
  return (
    <FilterContext.Provider
      value={{
        filterArray,
        setFilterArray,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => useContext<FilterContextProps>(FilterContext);
export const useFilterCommonData = () => ({
  filterArray: useFilterContext().filterArray,
  setFilterArray: useFilterContext().setFilterArray,
});
