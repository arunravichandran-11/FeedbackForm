
import createIcon from '../../helpers/generate-icon';

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
  