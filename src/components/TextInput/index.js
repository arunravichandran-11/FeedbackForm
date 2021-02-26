function createInput(inputValue, cb) {
    var wrapper = document.createElement('div');
  
    var labelElement = document.createElement('h2');
    var textArea = document.createElement('textarea');
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