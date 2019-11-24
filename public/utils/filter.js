import { COLUMN_IDS } from "../constants/columns.js";

/**
 * This method filters data by id
 * @param {*} data :Data of a table
 * @param {String} searchStr :search String of filter
 * @param {Object} param2  : Config properties of a particular column
 */
export const filterDataById = function(data, searchStr, { fieldName, formatFn, id }) {
    if (!data) {
        return data;
    }
    switch (id) {
        case COLUMN_IDS.ID:
        case COLUMN_IDS.EMAIL_ID:
        case COLUMN_IDS.DOB:
        case COLUMN_IDS.EMP_CODE:
        case COLUMN_IDS.FULL_NAME:
        case COLUMN_IDS.JOB_TITLE:
        case COLUMN_IDS.REGION:
        case COLUMN_IDS.PH_NO:
            const filteredData = data.filter(row => {
                let cellData = row[fieldName];
                if (formatFn && typeof formatFn == "function") {
                    cellData = formatFn(cellData);
                }
                if (typeof cellData != "string") {
                    cellData = cellData.toString();
                }
                cellData = cellData.toLowerCase();
                return cellData.indexOf(searchStr) > -1;
            });
            return filteredData;

        default: {
            return data;
        }
    }
};
