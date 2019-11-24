/**
 * Form config to render a particular form field
 */
import { COLUMN_IDS } from "../constants/columns.js";
import { INPUT_TYPE } from "../constants/inputType.js";
export const FORM = [
    {
        id: COLUMN_IDS.ID,
        name: "empIdInput",
        enabled: true,
        fieldName: "id",
        label: "Employee Id:",
        placeholder: "Employee Id:",
        inputType: INPUT_TYPE.TEXT,
        isEditable: false,
        styles: {
            isSingleLine: true,
            width: 100,
            parentClass: "empIdCont",
            fieldClass: "empIdInput"
        }
    },
    {
        id: COLUMN_IDS.F_NAME,
        name: "fNameInput",
        enabled: true,
        fieldName: "firstName",
        label: "First Name:",
        placeholder: "First Name",
        inputType: INPUT_TYPE.TEXT,
        isEditable: true,
        styles: {
            isSingleLine: false,
            width: 50,
            parentClass: "fName",
            fieldClass: "fNameInput"
        }
    },
    {
        id: COLUMN_IDS.L_NAME,
        name: "lNameInput",
        enabled: true,
        fieldName: "lastName",
        label: "Last Name:",
        placeholder: "Last Name",
        inputType: INPUT_TYPE.TEXT,
        isEditable: true,
        styles: {
            isSingleLine: false,
            width: 50,
            parentClass: "lName",
            fieldClass: "lNameInput"
        }
    },
    {
        id: COLUMN_IDS.JOB_TITLE,
        name: "jobTitleInput",
        enabled: true,
        fieldName: "jobTitleName",
        label: "Job Title:",
        placeholder: "Job Title",
        inputType: INPUT_TYPE.TEXT,
        isEditable: true,
        styles: {
            isSingleLine: true,
            width: 100,
            parentClass: "jobTitle",
            fieldClass: "jobTitleInput"
        }
    },
    {
        id: COLUMN_IDS.EMAIL_ID,
        name: "emailInput",
        enabled: true,
        fieldName: "emailAddress",
        label: "Email:",
        placeholder: "Email",
        inputType: INPUT_TYPE.TEXT,
        isEditable: true,
        styles: {
            isSingleLine: true,
            width: 100,
            parentClass: "email",
            fieldClass: "emailInput"
        }
    },
    {
        id: COLUMN_IDS.PH_NO,
        name: "phNoInput",
        enabled: true,
        fieldName: "phoneNumber",
        label: "Phone No:",
        placeholder: "Phone No",
        inputType: INPUT_TYPE.TEXT,
        isEditable: true,
        styles: {
            isSingleLine: true,
            width: 100,
            parentClass: "phNo",
            fieldClass: "phNoInput"
        }
    },
    {
        id: COLUMN_IDS.REGION,
        name: "regionInput",
        enabled: true,
        fieldName: "region",
        label: "Region:",
        placeholder: "Region",
        inputType: INPUT_TYPE.TEXT,
        isEditable: true,
        styles: {
            isSingleLine: false,
            width: 50,
            parentClass: "region",
            fieldClass: "regionInput"
        }
    },
    {
        id: COLUMN_IDS.DOB,
        name: "dobInput",
        enabled: true,
        fieldName: "dob",
        label: "DOB:",
        placeholder: "DOB",
        inputType: INPUT_TYPE.TEXT,
        isEditable: true,
        styles: {
            isSingleLine: false,
            width: 50,
            parentClass: "dob",
            fieldClass: "dobInput"
        }
    }
];
