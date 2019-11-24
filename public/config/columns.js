/**
 * Config to display columns in a table. 
 * There is a flag enabled, when enabled is false that column is not displayed in the table.
 */
import { COLUMN_IDS } from "../constants/columns.js";
import { sortByInteger, sortByString, sortByDate } from "../utils/sort.js";
import { formatDataById } from "../helpers/format.js";
/**
 * sortFn: Sorting function to used when this column is sorted
 * formatFn: Applies a formatter to the data before rendering the column data.
 * styles: The styles to be applied on a particular columns
 */
export const COLUMNS = [
    {
        name: "ID",
        id: COLUMN_IDS.ID,
        enabled: true,
        fieldName: "id",
        isSortable: true,
        sortFn: sortByInteger,
        formatFn: formatDataById,
        styles: {
            width: 60,
            shrink: 0,
            cellClass: "empId"
        }
    },
    {
        name: "Full Name",
        id: COLUMN_IDS.FULL_NAME,
        enabled: true,
        fieldName: "preferredFullName",
        sortFn: sortByString,
        isSortable: true,
        styles: {
            width: 140,
            shrink: 0
        }
    },
    {
        name: "Employee Code",
        id: COLUMN_IDS.EMP_CODE,
        enabled: true,
        fieldName: "employeeCode",
        sortFn: sortByString,
        isSortable: true,
        styles: {
            width: 150,
            shrink: 0
        }
    },
    {
        name: "Job Title",
        id: COLUMN_IDS.JOB_TITLE,
        enabled: true,
        fieldName: "jobTitleName",
        sortFn: sortByString,
        isSortable: true,
        styles: {
            width: 140,
            shrink: 0
        }
    },
    {
        name: "Phone Number",
        id: COLUMN_IDS.PH_NO,
        enabled: true,
        fieldName: "phoneNumber",
        isSortable: true,
        sortFn: sortByString,
        styles: {
            width: 140,
            shrink: 0
        }
    },
    {
        name: "Email Id",
        id: COLUMN_IDS.EMAIL_ID,
        enabled: true,
        fieldName: "emailAddress",
        isSortable: true,
        sortFn: sortByString,
        styles: {
            width: 180,
            shrink: 0
        }
    },
    {
        name: "Region",
        id: COLUMN_IDS.REGION,
        enabled: true,
        fieldName: "region",
        isSortable: true,
        sortFn: sortByString,
        styles: {
            width: 60,
            shrink: 0
        }
    },
    {
        name: "DOB",
        id: COLUMN_IDS.DOB,
        enabled: true,
        fieldName: "dob",
        sortFn: sortByDate,
        isSortable: true,
        styles: {
            width: 100,
            shrink: 0
        }
    }
];
