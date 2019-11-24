import { PAGE_SIZE } from "../constants/base.js";
import { COLUMNS } from "../config/columns.js";
import { getEnabledItems } from "../utils/base.js";

/**
 * Converting array to map where key is page index and data is array of rows
 * @param {Array} data
 */
export const getPaginatedRowData = function(data) {
    let pageIndex = 1;
    const map = {};
    for (let i = 0; i < data.length; i++) {
        if (!map[pageIndex]) {
            map[pageIndex] = [];
        }
        map[pageIndex].push(data[i]);
        if ((i + 1) % PAGE_SIZE == 0) {
            pageIndex++;
        }
    }
    return map;
};
//Filtering columns based in enable: true or false flag.
export const ENABLED_COLUMNS = getEnabledItems(COLUMNS);
