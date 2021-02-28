
import createIcon from '../../helpers/generate-icon';


/**
* @Params type: {string} text - label of the html button.
* @Params type: {object} attrs - other attributes like class and data-* attributes are passed as object and set to button for iterating through the attrs.
* @Params type: {string - 'Left' || 'Right'} iconPosition - placing the icon to the left or right of the button text.
* @Params type: {string} iconName - name of the icon to be rendered with button component (Need to be implemented).
* @params type { function } cb - A call back method for on change event handler.
* @returns type { Node } buttonElement - Returns the created button component.
* More events will be handled later.
*/

function createActionButton(text, attrs, iconPosition, cb, iconName) {
    var buttonElement = document.createElement('button');
    for(var key in attrs) {
      buttonElement.setAttribute(key, attrs[key]);
    }
  
    var buttonText = document.createElement('span');
    buttonText.textContent = text || 'Click Me';
    buttonElement.appendChild(buttonText);
    
    if(iconPosition == 'left') {
      buttonElement.classList.add('with-left-icon');
      buttonElement.appendChild(createIcon('left-arrow'));
    }
  
    if(iconPosition == 'right') {
      buttonElement.classList.add('with-right-icon');
      buttonElement.appendChild(createIcon('right-arrow'));
    }
  
  
    buttonElement.addEventListener('click', cb);
  
    return buttonElement;
}

const ButtonComponent = {
    createActionButton: createActionButton
};


export default ButtonComponent;
  