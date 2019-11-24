import Table from "./views/table/index.js";
import EmployeeDetail from "./views/employeeDetail/index.js";
import { ACTION_IDS } from "./constants/actions.js";

document.addEventListener("DOMContentLoaded", event => {
    const table = new Table();
    table.buildFilter();
    table.displayTableHead();
    table.fetchTableData();

    const initEventListeners = function() {
        const createEmpBtn = document.querySelector("#search .createEmpBtn");
        createEmpBtn.addEventListener("click", event => {
            const employeeDetailView = new EmployeeDetail({ actionType: ACTION_IDS.CREATE, totalRows: table.tableData.length, tableContext: table });
            employeeDetailView.showEmployeeDetail();
        });
    };

    initEventListeners();
});
