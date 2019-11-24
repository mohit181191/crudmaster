/**
 * This view can be used to add/edit/view an employee
 */
import Modal from "../modal/index.js";
import { FORM } from "../../config/form.js";
import { ACTION_IDS } from "../../constants/actions.js";
import { getFormFieldMarkup } from "../../helpers/formFields.js";
import { URLS } from "../../constants/urls.js";

const getErrorText = text => `Please enter ${text}`;

export default class EmployeeDetail extends Modal {
    constructor({ rowId, rowData, totalRows, actionType, tableContext }) {
        super();
        this.rowId = rowId;
        this.rowData = rowData || { id: totalRows + 1 };
        this.totalRows = totalRows;
        this.actionType = actionType;
        this.tableContext = tableContext;
    }

    showEmployeeDetail() {
        this.show(this.getMarkup());
        this.initEventListners();
    }
    initEventListners() {
        const employeeForm = document.getElementById("employeeForm");
        let submitBtn;
        let cancelBtn;
        if (employeeForm) {
            submitBtn = (employeeForm.getElementsByClassName("submitBtn") || [])[0];
            cancelBtn = (employeeForm.getElementsByClassName("cancelBtn") || [])[0];
        }
        if (cancelBtn) {
            cancelBtn.addEventListener("click", event => {
                this.hide();
            });
        }
        if (submitBtn) {
            submitBtn.addEventListener("click", event => {
                const data = this.validateAndGetFormData();
                if (data) {
                    this.hide();
                    switch (this.actionType) {
                        case ACTION_IDS.CREATE: {
                            fetch(URLS.employees, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(data)
                            });
                            this.tableContext.addEmployee(data);
                            break;
                        }
                        case ACTION_IDS.EDIT: {
                            fetch(`${URLS.employees}/${this.rowData.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(data)
                            });
                            this.tableContext.editEmployee(this.rowId, data);
                            break;
                        }
                    }
                }
            });
        }
    }
    getMarkup() {
        let formMarkup = "";
        let submitBtnText = "";
        if (this.actionType == ACTION_IDS.CREATE) {
            submitBtnText = "Create";
            formMarkup = "<div class='employeeForm' id='employeeForm'><div class='modalHeading'>Create Employee</div>";
        } else if (this.actionType == ACTION_IDS.EDIT) {
            submitBtnText = "Edit";
            formMarkup = "<div class='employeeForm' id='employeeForm'><div class='modalHeading'>Edit Employee</div>";
        }
        if (this.actionType == ACTION_IDS.CREATE || this.actionType == ACTION_IDS.EDIT) {
            formMarkup = FORM.reduce((markup, field) => {
                markup += `<div class="${field.styles.parentClass} wd-${field.styles.width} ${field.styles.isSingleLine ? "u-b" : "u-ib"} fieldCont">
                                <label for="${field.name}">${field.label}</label>
                                ${getFormFieldMarkup(field.inputType, {
                                    class: field.styles.fieldClass,
                                    placeholder: field.placeholder,
                                    name: field.name,
                                    fieldName: field.fieldName,
                                    value: this.rowData[field.fieldName] || "",
                                    isEditable: field.isEditable
                                })}            
                                <div class="inputError"></div>
                            </div>`;

                return markup;
            }, formMarkup);
            formMarkup += `<div class='modalFooter'>
                                <button class='submitBtn btn btn-primary'>${submitBtnText}</button>
                                <button class='cancelBtn btn btn-secondary'>Cancel</button>
                            </div>`;
            formMarkup += "</div>";
            return formMarkup;
        }
        if (this.actionType == ACTION_IDS.VIEW) {
            const { rowData } = this;
            formMarkup = `<div class="detailView">
                            <div class="detailViewHead">
                                <div class="empCode">${rowData.employeeCode}</div>
                                <div class="empName">${rowData.preferredFullName}</div>
                            </div>
                            <div class="detailViewContent">
                                <div class="row">
                                    <div class="title u-ib wd-40">Employee Name</div><div class="value u-ib wd-60">${rowData.preferredFullName}</div>
                                </div>
                                <div class="row">
                                    <div class="title u-ib wd-40">Employee Code</div><div class="value u-ib wd-60">${rowData.employeeCode}</div>
                                </div>
                                <div class="row">
                                    <div class="title u-ib wd-40">Job Title</div><div class="value u-ib wd-60">${rowData.jobTitleName}</div>
                                </div>
                                <div class="row">
                                    <div class="title u-ib wd-40">Phone No</div><div class="value u-ib wd-60">${rowData.phoneNumber}</div>
                                </div>
                                <div class="row">
                                    <div class="title u-ib wd-40">Email Id</div><div class="value u-ib wd-60">${rowData.emailAddress}</div>
                                </div>
                                <div class="row">
                                    <div class="title u-ib wd-40">Region</div><div class="value u-ib wd-60">${rowData.region}</div>
                                </div>
                                <div class="row">
                                    <div class="title u-ib wd-40">DOB</div><div class="value u-ib wd-60">${rowData.dob}</div>
                                </div>
                            </div>
                        </div>`;
            return formMarkup;
        }

        return formMarkup;
    }
    validateAndGetFormData() {
        const employeeForm = document.getElementById("employeeForm");
        const empIdInput = employeeForm.getElementsByClassName("empIdInput")[0];
        const empIdValue = empIdInput.value;
        const empIdInputError = empIdInput.nextElementSibling;
        if (empIdValue) {
            empIdInputError.innerHTML = "";
        } else {
            empIdInputError.innerHTML = getErrorText("employee id");
            return;
        }

        const fNameInput = employeeForm.getElementsByClassName("fNameInput")[0];
        const fNameValue = fNameInput.value;
        const fNameInputError = fNameInput.nextElementSibling;

        if (fNameValue) {
            fNameInputError.innerHTML = "";
        } else {
            fNameInputError.innerHTML = getErrorText("first Name");
            return;
        }

        const lNameInput = employeeForm.getElementsByClassName("lNameInput")[0];
        const lNameValue = lNameInput.value;
        const lNameInputError = lNameInput.nextElementSibling;
        if (lNameValue) {
            lNameInputError.innerHTML = "";
        } else {
            lNameInputError.innerHTML = getErrorText("last Name");
            return;
        }

        const jobTitleInput = employeeForm.getElementsByClassName("jobTitleInput")[0];
        const jobTitleValue = jobTitleInput.value;
        const jobTitleInputError = jobTitleInput.nextElementSibling;
        if (jobTitleValue) {
            jobTitleInputError.innerHTML = "";
        } else {
            jobTitleInputError.innerHTML = getErrorText("job title");
            return;
        }

        const emailInput = employeeForm.getElementsByClassName("emailInput")[0];
        const emailValue = emailInput.value;
        const emailInputError = emailInput.nextElementSibling;
        if (emailValue) {
            emailInputError.innerHTML = "";
        } else {
            emailInputError.innerHTML = getErrorText("email");
            return;
        }

        const phNoInput = employeeForm.getElementsByClassName("phNoInput")[0];
        const phNoValue = phNoInput.value;
        const phNoInputError = phNoInput.nextElementSibling;
        if (phNoValue) {
            phNoInputError.innerHTML = "";
        } else {
            phNoInputError.innerHTML = getErrorText("phone number");
            return;
        }

        const regionInput = employeeForm.getElementsByClassName("regionInput")[0];
        const regionValue = regionInput.value;
        const regionInputError = regionInput.nextElementSibling;
        if (regionValue) {
            regionInputError.innerHTML = "";
        } else {
            regionInputError.innerHTML = getErrorText("region");
            return;
        }

        const dobInput = employeeForm.getElementsByClassName("dobInput")[0];
        const dobValue = dobInput.value;
        const dobInputError = dobInput.nextElementSibling;
        if (dobValue) {
            dobInputError.innerHTML = "";
        } else {
            dobInputError.innerHTML = getErrorText("dob");
            return;
        }
        let employeeData = {
            id: parseInt(empIdValue),
            jobTitleName: jobTitleValue,
            firstName: fNameValue,
            lastName: lNameValue,
            preferredFullName: `${fNameValue} ${lNameValue}`,
            employeeCode: `EM${empIdValue}`,
            region: regionValue,
            dob: dobValue,
            phoneNumber: phNoValue,
            emailAddress: emailValue
        };
        return employeeData;
    }
}
