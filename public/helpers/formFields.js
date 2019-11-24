import { INPUT_TYPE } from "../constants/inputType.js";
export const getFormFieldMarkup = function(inputType, params) {
    switch (inputType) {
        case INPUT_TYPE.TEXT:
            return `<input type="text" 
                        class="${params.class}" 
                        name="${params.name}" 
                        placeholder="${params.placeholder}" 
                        data-field="${params.fieldName}" 
                        ${!params.isEditable ? "disabled" : ""} 
                        value=${params.value}></input>`;
    }
};
