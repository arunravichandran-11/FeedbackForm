
/**
* Description : This chip component is a customized radio button element.
* @Params type: {string} text - label of the chip component.
* @Params type: {string} name - name of the chip component.
* @Params type: {string} value - Value of the chip component.
* @Params type: {boolean} checked - checked state of the chip component.
* @params type { function } cb - A call back method for on change event handler.
* @returns type { Node } labelElement - Returns the created chip component.
* More events will be handled later.
*/

function createChip(text, name, value, checked, cb) {
    var labelElement = document.createElement('label');
    labelElement.setAttribute('class', 'selection');
    var spanElem = document.createElement('span');
    spanElem.innerText = text;
  
    var inputElement = document.createElement("input");
    inputElement.setAttribute('type', "radio");
    inputElement.setAttribute('name', 'test');
    inputElement.setAttribute('value', value);
  
    if(checked) {
      inputElement.setAttribute('checked', false);
    }
  
    inputElement.addEventListener('change', cb);
  
    labelElement.appendChild(inputElement);
    labelElement.appendChild(spanElem);
  
    return labelElement;
  }

const ChipComponent = {
    createChip: createChip
}

export default ChipComponent;