import { getPaginatedRowData, ENABLED_COLUMNS } from "../../utils/table.js";
import { ACTIONS } from "../../config/actions.js";
import { URLS } from "../../constants/urls.js";
import { COLUMN_IDS } from "../../constants/columns.js";
import { SORT_TYPE } from "../../constants/sort.js";
import { filterDataById } from "../../utils/filter.js";
import RowActionMenu from "../rowActionMenu/index.js";
import { FAKE_DATA } from "../../assets/data.js";
import { VISIBLE_PAGE_NOS } from "../../constants/base.js";
export default class Table {
    constructor() {
        this.search = document.getElementById("search");
        this.table = document.getElementById("table");
        this.tableHead = table.getElementsByClassName("tableHead")[0];
        this.tableBody = table.getElementsByClassName("tableBody")[0];
        this.tablePagination = table.getElementsByClassName("pageBar")[0];
        this.currentPageIndex = 1; // page index starting from 0
        this.filteredTableData = [];
        this.tableData = [];
        this.currentSortedColumnId = COLUMN_IDS.ID;
        this.currentSortedColumnType = SORT_TYPE.INC;
    }
    addEmployee(data) {
        this.filteredTableData.push(data);
        this.tableData.push(data);
        this.displayTableData();
        this.buildPagination();
    }
    editEmployee(rowId, data) {
        const foundFilteredTableDataIndex = this.filteredTableData.findIndex(row => row.id == rowId);
        const foundTableDataIndex = this.tableData.findIndex(row => row.id == rowId);
        this.filteredTableData[foundFilteredTableDataIndex] = data;
        this.tableData[foundTableDataIndex] = data;
        this.displayTableData();
        this.buildPagination();
    }
    deleteEmployee(rowId) {
        const foundFilteredTableDataIndex = this.filteredTableData.findIndex(row => row.id == rowId);
        const foundTableDataIndex = this.tableData.findIndex(row => row.id == rowId);
        this.filteredTableData.splice(foundFilteredTableDataIndex, 1);
        this.tableData.splice(foundTableDataIndex, 1);
        this.displayTableData();
        this.buildPagination();
    }
    buildFilter() {
        const searchSelectBox = this.search.getElementsByClassName("selectId")[0];
        const columnMarkup = ENABLED_COLUMNS.reduce((markup, column) => {
            markup += `<option value="${column.id}">${column.name}</option>`;
            return markup;
        }, "");
        searchSelectBox.innerHTML = columnMarkup;
    }

    initTableEventListeners() {
        const { tablePagination, search, tableHead, tableBody } = this;

        const searchIcon = search.getElementsByClassName("searchIcon")[0];
        tablePagination.addEventListener("click", event => {
            const prevBtn = event.target.closest(".prev");
            const nextBtn = event.target.closest(".next");
            const pageNoCont = event.target.closest(".pageNoCont");
            if (prevBtn) {
                if (prevBtn.classList.contains("pageDisabled")) {
                    return false;
                }
                this.currentPageIndex -= 1;
                this.buildPagination();
                this.displayTableData();
            } else if (nextBtn) {
                if (nextBtn.classList.contains("pageDisabled")) {
                    return false;
                }
                this.currentPageIndex += 1;
                this.buildPagination();
                this.displayTableData();
            } else if (pageNoCont) {
                const { page } = event.target.dataset;
                this.currentPageIndex = +page;
                this.buildPagination();
                this.displayTableData();
            }
        });

        tableHead.addEventListener("click", event => {
            const target = event.target;
            const decIcon = target.closest(".dec");

            this.currentSortedColumnType = decIcon ? SORT_TYPE.DEC : SORT_TYPE.INC;
            const cellHead = target.closest(".cellHead");
            const id = cellHead.dataset.id;
            if (id) {
                const currentColumn = ENABLED_COLUMNS.find(column => column.id == id);
                this.currentSortedColumnId = currentColumn.id;
                const sortedTableData = currentColumn.sortFn(this.filteredTableData, this.currentSortedColumnType, { ...currentColumn });
                this.currentPageIndex = 1;
                this.displayTableHead();
                this.filteredTableData = sortedTableData;
                this.displayTableData(sortedTableData);
                this.buildPagination();
            }
        });
        searchIcon.addEventListener("click", event => {
            const searchSelectBox = this.search.getElementsByClassName("selectId")[0];
            const searchInput = this.search.getElementsByClassName("selectInput")[0];
            const selectedColumnId = searchSelectBox.value;
            let filterValue = searchInput.value;
            filterValue = filterValue.toLowerCase();
            const currentColumn = ENABLED_COLUMNS.find(column => column.id == selectedColumnId);
            const filteredTableData = filterDataById(this.tableData, filterValue, currentColumn);
            this.filteredTableData = filteredTableData;
            this.displayTableData();
            this.currentPageIndex = 1;
            this.buildPagination();
        });

        tableBody.addEventListener("click", event => {
            const { target } = event;
            const iconTarget = target.closest(".actionIconCell");
            if (iconTarget) {
                const nearestRow = target.closest(".cellRow");
                const { index: rowId } = nearestRow.dataset;
                const listOfActions = [...ACTIONS];

                const actionMenu = new RowActionMenu({
                    rowId,
                    rowData: this.filteredTableData.find(row => row.id == rowId),
                    totalRows: this.tableData.length,
                    list: listOfActions,
                    iconTarget,
                    tableContext: this
                });
                actionMenu.showMenu();
            }
        });
    }
    //Render table header
    displayTableHead() {
        let columnHeadMarkup = ENABLED_COLUMNS.reduce((markup, column) => {
            markup += `<div data-id='${column.id}' class="cellHead" style='flex-basis:${column.styles.width}px;flex-shrink:${column.styles.shrink};'>
                <div class="cell-text">${column.name}</div>
                <div class="icon ${column.id == this.currentSortedColumnId ? "visible" : "hide"}">
                <i class="${this.currentSortedColumnType == SORT_TYPE.INC ? "enabled" : "disabled"} inc fas fa-sort-up"></i>
                <i class="${this.currentSortedColumnType == SORT_TYPE.DEC ? "enabled" : "disabled"} dec fas fa-sort-down"></i> 
                </div>
            </div>`;
            return markup;
        }, "");
        this.tableHead.innerHTML = columnHeadMarkup;
    }
    displayTableData() {
        const { currentPageIndex, tableBody } = this;
        const _data = getPaginatedRowData(this.filteredTableData);
        this.minPageIndex = 1;
        this.maxPageIndex = Object.keys(_data).length;
        let rowMarkup = "";
        if (_data[currentPageIndex]) {
            _data[currentPageIndex].forEach((row, index) => {
                rowMarkup += `<div class='cellRow' data-index="${row.id}">`;
                rowMarkup = ENABLED_COLUMNS.reduce((markup, column) => {
                    let cellData = row[column.fieldName];
                    let columnFormatter = column.formatFn;
                    if (columnFormatter && typeof columnFormatter == "function") {
                        cellData = columnFormatter(cellData);
                    }
                    markup += `<div class="cell ${column.styles.cellClass ? column.styles.cellClass : ""}" 
                                style='flex-basis:${column.styles.width}px;flex-shrink:${column.styles.shrink};'>
                                    <span class="cell-text">${cellData}</span>
                                </div>`;
                    return markup;
                }, rowMarkup);
                rowMarkup += "<div class='cell actionIconCell'><i class='fa fa-ellipsis-h actionIcon'></i></div>";
                rowMarkup += "</div>";
            });
        }

        tableBody.innerHTML = rowMarkup;
    }
    buildPagination() {
        const { minPageIndex, maxPageIndex, currentPageIndex, tablePagination } = this;
        const nextBtn = tablePagination.getElementsByClassName("next")[0];
        const prevBtn = tablePagination.getElementsByClassName("prev")[0];
        const pageNoCont = tablePagination.getElementsByClassName("pageNoCont")[0];
        pageNoCont.setAttribute("style", `width:${24 * (VISIBLE_PAGE_NOS + 1)}px`);
        tablePagination.classList.remove("hide");
        if (minPageIndex == this.currentPageIndex) {
            prevBtn.classList.add("pageDisabled");
        } else {
            prevBtn.classList.remove("pageDisabled");
        }
        if (maxPageIndex == this.currentPageIndex) {
            nextBtn.classList.add("pageDisabled");
        } else {
            nextBtn.classList.remove("pageDisabled");
        }

        this.currentMax = currentPageIndex + VISIBLE_PAGE_NOS >= maxPageIndex ? maxPageIndex : currentPageIndex + VISIBLE_PAGE_NOS;

        let markup = "";
        for (let i = currentPageIndex; i <= this.currentMax; i++) {
            markup += `<div class="pageNo ${i == currentPageIndex ? "selected" : ""}" data-page=${i}>${i}</div>`;
        }
        pageNoCont.innerHTML = markup;
    }
    //fetch data rows for table to be populated
    fetchTableData() {
        this.tableBody.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        fetch(URLS.employees)
            .then(resp => resp.json())
            .then(data => {
                if (data && data.length) {
                    this.tableData = [...FAKE_DATA[0]];
                    this.filteredTableData = [...FAKE_DATA[0]];
                    this.displayTableData();
                    this.buildPagination();
                    this.initTableEventListeners();
                } else {
                    //TO DO: Add handling when response is a error json.
                }
            })
            .catch(error => {
                //TO DO: Add handling for error when the api breaks.
            });
    }
}
