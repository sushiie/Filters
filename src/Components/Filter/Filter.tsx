import React, { useEffect } from "react";
import "./Filter.css";
import trash from "../../Images/trash.png";
import deleteIcon from "../../Images/deleteIcon.png";
import { v4 as uuid } from "uuid";
import {
  defaultFilterEntry,
  FILTER_OPTIONS,
  IFilter,
  IFilterGroup,
  MATCHER,
  SELECTOR,
  useFilterCommonData,
} from "../../Context/FilterContextProvider";

interface FilterProps {
  filterData: IFilter | IFilterGroup;
}

export const Filter: React.FC<FilterProps> = (props) => {
  const { filterData } = props;
  const { filterArray, setFilterArray } = useFilterCommonData();
  const handleRemoveFilter = (
    filterDataId: string,
    parentFilterId?: string
  ) => {
    const filterPosition = filterArray.findIndex(
      (filter) => filter.id === (parentFilterId || filterDataId)
    );
    const childFilterPosition = filterArray[filterPosition].filters?.findIndex(
      (cFilter) => cFilter.id === filterDataId
    );
    let updatedFilteredArray = [...filterArray];
    if (parentFilterId) {
      updatedFilteredArray[filterPosition].filters?.splice(
        childFilterPosition!,
        1
      );
      if (updatedFilteredArray[filterPosition].filters!.length > 1) 
      updatedFilteredArray[filterPosition].filters![0].filterOption = "";
      if (updatedFilteredArray[filterPosition].filters?.length === 0) {
        updatedFilteredArray.splice(filterPosition, 1);
      }
    } else {
      updatedFilteredArray.splice(filterPosition, 1);
      if (updatedFilteredArray.length) {
        updatedFilteredArray[0].filterOption = "";
      }
    }
    setFilterArray && setFilterArray(updatedFilteredArray);
  };

  const renderFilter = (
    fData: IFilter | IFilterGroup,
    index?: number,
    isFromFG?: boolean
  ) => {
    const currentFilterIndex = filterArray.findIndex(
      (ftr) => ftr.id === filterData.id
    );
    return (
      <div className="filter-wrapper">
        {fData.filterOption !== "" && (
          <select
            className="filter-selector"
            disabled={isFromFG ? index! > 1 : currentFilterIndex > 1 }
          >
            {FILTER_OPTIONS.map(({ key, value }) => (
              <option value={value} key={value}>
                {key}
              </option>
            ))}
          </select>
        )}
        <select
          className="filter-selector"
        >
          {SELECTOR.map(({ key, value }) => (
            <option value={value} key={value}>
              {key}
            </option>
          ))}
        </select>
        <select
          className="filter-selector"
        >
          {MATCHER.map(({ key, value }) => (
            <option value={value} key={value}>
              {key}
            </option>
          ))}
        </select>
        <input
          className="filter-selector"
        />
        <img
          src={deleteIcon}
          alt="delete filter"
          onClick={() =>
            handleRemoveFilter(fData.id, isFromFG ? filterData.id : "")
          }
        />
      </div>
    );
  };

  const renderFilterGroup = (fGData: IFilterGroup | IFilter) => {
    const currentFilterIndex = filterArray.findIndex(
      (ftr) => ftr.id === filterData.id
    );
    return (
      <div className="filter-wrapper">
        {filterData.filterOption !== "" && (
          <select
            className="filter-selector"
            disabled={currentFilterIndex > 1}
          >
            {FILTER_OPTIONS.map(({ key, value }) => (
              <option value={value} key={value}>
                {key}
              </option>
            ))}
          </select>
        )}
        <div className="filter-group-wrapper">
          {fGData.filters?.map((ftr, idx) => renderFilter(ftr, idx, true))}
          <div className="button-container">
            <div className="bottom-left" onClick={handleAddFilterToGroup}>
              <button> + Add filter</button>
            </div>
            <div className="buttom-right">
              <button onClick={() => handleRemoveFilterGroup(fGData.id)}>
                <img src={trash} alt="delete" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleAddFilterToGroup = () => {
    let filtersArr = [...filterArray];
    let currentFilterIdx = filterArray.findIndex(
      (filter) => filter.id === filterData.id
    );
    const newValues = { ...defaultFilterEntry };
    newValues.id = uuid();
    if (filtersArr[currentFilterIdx].filters!.length >= 1)
      newValues.filterOption = "And";
    filtersArr[currentFilterIdx].filters?.push(newValues);
    setFilterArray && setFilterArray(filtersArr);
  };

  const handleRemoveFilterGroup = (fGId: string) => {
    let filtersArr = [...filterArray];
    let currentFilterIdx = filterArray.findIndex(
      (filter) => filter.id === fGId
    );
    filtersArr.splice(currentFilterIdx, 1);
    setFilterArray && setFilterArray(filtersArr);
  };

  return (
    <>
      <div className="filterContainer">
        {!filterData.isFilterGroup
          ? renderFilter(filterData)
          : renderFilterGroup(filterData)}
      </div>
    </>
  );
};
