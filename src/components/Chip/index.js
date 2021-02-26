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