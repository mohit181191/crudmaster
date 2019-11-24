/**
 * Filters the list on the basis of enabled flag in the list
 * @param {*} list
 */
export const getEnabledItems = function(list) {
    if (!list) {
        return list;
    }
    return list.filter(item => item.enabled);
};
