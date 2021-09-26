import React from "react";
import trash from "../../Images/trash.png";
import { v4 as uuid } from "uuid";
import {
  defaultFilterEntry,
  defaultFilterGroupEntry,
  useFilterCommonData,
} from "../../Context/FilterContextProvider";
import { Filter } from "../Filter/Filter";
// import styles from "./FilterContainer.module.css";

export const FilterContainer: React.FC = () => {
  const { filterArray, setFilterArray } = useFilterCommonData();

  const handleAddFilter = () => {
    let filterArr = [...filterArray];
    const newFilter = { ...defaultFilterEntry };
    newFilter.id = uuid();
    if (filterArray.length === 1) {
      newFilter.filterOption = "And";
    } else if (filterArray.length >= 2){
      newFilter.filterOption = filterArray[filterArr.length-1].filterOption;
    } else {
      newFilter.filterOption='';
    }
    filterArr.push(newFilter);
    setFilterArray && setFilterArray(filterArr);
  };

  const handleAddFilterGroup = () => {
    let filterArr = [...filterArray];
    const newFilterGroup = { ...defaultFilterGroupEntry };
    newFilterGroup.id = uuid();
    newFilterGroup.filters = [];
    const newFilterForGroup = { ...defaultFilterEntry };
    newFilterForGroup.id = uuid();
    newFilterGroup.filters.push(newFilterForGroup);
    if (filterArray.length >= 1) {
      newFilterGroup.filterOption = "And";
    } else {
      newFilterGroup.filterOption = "";
    }
    filterArr.push(newFilterGroup);
    setFilterArray && setFilterArray(filterArr);
  };

  return (
    <div className="wrapper">
      <div className="filter-container">
        {filterArray.length > 0 ? (
          filterArray.map((filter) => (
            <Filter filterData={filter} key={filter.id} />
          ))
        ) : (
          <div>No filters found</div>
        )}
      </div>
      <div className="button-container">
        <div className="bottom-left">
          <button onClick={handleAddFilter}> + Add filter</button>
          <button onClick={handleAddFilterGroup}> + Add filter Group</button>
        </div>
        <div className="buttom-right">
          {filterArray.length > 0 && (
            <img
              src={trash}
              alt="delete"
              onClick={() => setFilterArray && setFilterArray([])}
            />
          )}
        </div>
      </div>
    </div>
  );
};
