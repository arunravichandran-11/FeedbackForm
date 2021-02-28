
/**
* @Params type: {string} text - label next to radio button.
* @Params type: {string} name - name of the input radio button.
* @Params type: {string} value - Value of the input radio button.
* @Params type: {boolean} checked - checked state of the radio button.
* @params type { function } cb - A call back method for on change event handler.
* @returns type { Node } labelElement - Returns the created radio button component.
* More events will be handled later.
*/

function createRadioButton(text, name, value, checked, cb) {
    var labelElement = document.createElement('label');
    labelElement.setAttribute('class', 'radio-button');
    var spanElem = document.createElement('span');
    spanElem.innerText = text;
  
    var inputElement = document.createElement("input");
    inputElement.setAttribute('type', "radio");
    inputElement.setAttribute('name', 'test');
    inputElement.setAttribute('value', value);
    inputElement.addEventListener('change', cb);
  
    if(checked) {
      inputElement.setAttribute('checked', false);
    }
  
    labelElement.appendChild(inputElement);
    labelElement.appendChild(spanElem);
  
    return labelElement;
}

const RadioButtonComponent = {
    createRadioButton: createRadioButton
};


export default RadioButtonComponent;