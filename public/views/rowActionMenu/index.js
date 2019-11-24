import Menu from "../menu/index.js";
import { ACTION_IDS } from "../../constants/actions.js";
import EmployeeDetail from "../employeeDetail/index.js";
import { URLS } from "../../constants/urls.js";

export default class RowActionMenu extends Menu {
    constructor({ rowId, rowData, list, totalRows, iconTarget, tableContext }) {
        super(list);
        this.rowId = rowId;
        this.rowData = rowData;
        this.totalRows = totalRows;
        this.targetNode = iconTarget;
        this.tableContext = tableContext;
    }
    actionItemClick(id) {
        switch (id) {
            case ACTION_IDS.VIEW: {
                this.onViewAndEditClick(ACTION_IDS.VIEW);
                break;
            }
            case ACTION_IDS.EDIT: {
                this.onViewAndEditClick(ACTION_IDS.EDIT);
                break;
            }
            case ACTION_IDS.DELETE: {
                fetch(`${URLS.employees}/${this.rowData.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({})
                });
                this.hide();
                this.tableContext.deleteEmployee(this.rowId);
                break;
            }
        }
    }

    onViewAndEditClick(actionType) {
        this.hide();
        const employeeDetailView = new EmployeeDetail({
            rowData: this.rowData,
            totalRows: this.totalRows,
            rowId: this.rowId,
            actionType: actionType,
            tableContext: this.tableContext
        });
        employeeDetailView.showEmployeeDetail();
    }
}
