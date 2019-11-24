/**
 * Returns a date object
 * @param {*} dateStr : date in string format 
 * @param {*} format : format of the date string
 */
export const getDateObjectByFormat = function(dateStr, format) {
    if (format == "DD/MM/YYYY") {
        const dateParts = dateStr.split("/");
        return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    }
    return null;
};
