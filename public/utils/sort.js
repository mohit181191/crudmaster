import { SORT_TYPE } from "../constants/sort.js";
import { getDateObjectByFormat } from "./date.js";
/**
 *
 * @param {Array} data: Complete table data
 * @param {String} sortType: Type of sort(Increment or decrement)
 * @param {Object} param2 : Config properties of a particular column
 */
export const sortByInteger = function(data, sortType, { fieldName, id }) {
    let _data = [...data];
    if (sortType == SORT_TYPE.INC) {
        _data = _data.sort((a, b) => a[fieldName] - b[fieldName]);
    } else {
        _data = _data.sort((a, b) => b[fieldName] - a[fieldName]);
    }
    return _data;
};
/**
 *
 * @param {Array} data: Complete table data
 * @param {String} sortType: Type of sort(Increment or decrement)
 * @param {Object} param2 : Config properties of a particular column
 */
export const sortByString = function(data, sortType, { fieldName, id }) {
    let _data = [...data];

    _data = _data.sort((a, b) => (a[fieldName] > b[fieldName] ? 1 : a[fieldName] < b[fieldName] ? -1 : 0));
    if (sortType == SORT_TYPE.INC) {
        return _data;
    } else {
        _data = _data.reverse();
        return _data;
    }
};
/**
 *
 * @param {Array} data: Complete table data
 * @param {String} sortType: Type of sort(Increment or decrement)
 * @param {Object} param2 : Config properties of a particular column
 */
export const sortByDate = function(data, sortType, { fieldName, id }) {
    let _data = [...data];
    if (sortType == SORT_TYPE.INC) {
        _data = _data.sort((a, b) => getDateObjectByFormat(a[fieldName], "DD/MM/YYYY") - getDateObjectByFormat(b[fieldName], "DD/MM/YYYY"));
    } else {
        _data = _data.sort((a, b) => getDateObjectByFormat(b[fieldName], "DD/MM/YYYY") - getDateObjectByFormat(a[fieldName], "DD/MM/YYYY"));
    }
    return _data;
};
