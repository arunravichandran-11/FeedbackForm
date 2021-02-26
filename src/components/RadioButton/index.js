
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