/**
* Descriptions : As of now text area is the only output of this. Later it will be configured for HTML <input /> tag as well.
* @Params type: {string} inputValue - Value of the text box.
* @params type { function } cb - A call back method for on focusout event handler.
* @returns type { Node } wrapper - Returns the created text area component with its wrapper element.
* More events will be handled later.
*/

function createInput(inputValue, cb) {
    var wrapper = document.createElement('div');
  
    var labelElement = document.createElement('h2');
    var textArea = document.createElement('textarea');
    textArea.setAttribute('class', 'text-area');
    textArea.setAttribute('placeholder', 'Add your comments here');
    textArea.value = inputValue;
    
    textArea.addEventListener("focusout", cb);
  
    wrapper.appendChild(labelElement);
    wrapper.appendChild(textArea);
  
    return wrapper;
}

const TextInputComponent = {
    createInput: createInput
};

export default TextInputComponent;