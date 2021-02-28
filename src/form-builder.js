import ButtonComponent from './components/Button/index';
import RadioButtonComponent from './components/RadioButton/index';
import TextInputComponent from './components/TextInput/index';
import ChipComponent from './components/Chip/index';

let selectedAnswers = {};


/**
  * @Params type: {object} formItem : Each Question Object and it's options.
  * @params type: {Node} node : HTML element to which the dynamically created UI components has to be rendered(appended);
*/
function renderRadioButton(formItem, node) {
  if(formItem.options) {
    formItem.options.forEach((option) => {

      if(JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`))) {
        if(option.text === JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`)).text) {
          option.checked = true;
        } else {
          option.checked = false;
        }
      }

      var radioButton = RadioButtonComponent.createRadioButton(option.text, formItem['qus-id'], option.points, option.checked, function() {
        formItem.selectedOption = option;

        selectedAnswers[`${formItem['qus-id']}`] = option;
        
        sessionStorage.setItem(`${formItem['qus-id']}`, JSON.stringify(option));
      });

      node.appendChild(radioButton);

    });
  }
}

/**
  * @Params type: {object} formItem : Each Question Object and it's options.
  * @params type: {Node} node : HTML element to which the dynamically created UI components has to be rendered(appended);
*/
function renderSelectionChip(formItem, node) {
  formItem.options.forEach((option) => {
    if(JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`))) {
      if(option.text === JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`)).text) {
        option.checked = true;
      } else {
        option.checked = false;
      }
    }
    var chip = ChipComponent.createChip(option.text, formItem['qus-id'], option.points, option.checked, function() {
      formItem.selectedOption = option;

      selectedAnswers[`${formItem['qus-id']}`] = option;

      sessionStorage.setItem(`${formItem['qus-id']}`, JSON.stringify(option));
    });
    node.appendChild(chip);
  });

}

/**
  * @Params type: {object} formItem : Each Question Object and it's options.
  * @params type: {Node} node : HTML element to which the dynamically created UI components has to be rendered(appended);
*/
function renderTextInput(formItem, node) {
  let savedValue = sessionStorage.getItem(`${formItem['qus-id']}`);
  let inputValue = savedValue || 'default';
  var textInputElement = TextInputComponent.createInput(inputValue, (e) => {

    selectedAnswers[`${formItem['qus-id']}`] = e.target.value;

    sessionStorage.setItem(`${formItem['qus-id']}`, e.target.value);
  });

  node.appendChild(textInputElement);
}

/**
  * @Params type: {object} formItem : Based on the formItem(question) type - the rendering functions of UI components will be invoked.
*/

function getInputElement(formItem) {
    var node = document.createElement('div');
  
    switch (formItem.type) {
      case 'boolean':
          renderRadioButton(formItem, node);
        break;
      case 'rating':
          node.setAttribute('class', 'chip-container');
          renderSelectionChip(formItem, node);
        break;
      case 'text':
          renderTextInput(formItem, node); 
        break;
      default:
        // console.log('default');
    }
    return node;
}

/**
  * Accepts the prev active form and the next active form ids and switch the form in UI.
  * @Params type: {Number} activeFormId
  * @Params type: {Number} prevId
*/

function setFormActive(activeFormId, prevId) {
  var selector = `[data-form-index="${activeFormId}"]`;
  var prevSel = `[data-form-index="${prevId}"]`;
  var ele = document.querySelectorAll(selector)[0];
  var prev = document.querySelectorAll(prevSel)[0];

  prev.classList.add('form-inactive');
  ele.classList.add('form-active');
  ele.classList.add('form-active-animate');
  setTimeout(()=> {
    prev.classList.remove('form-active');
    prev.classList.remove('form-inactive');
    ele.classList.remove('form-active-animate');

    sessionStorage.setItem('activeFormId', activeFormId);
  }, 800);
}

/**
* @Description: This function checks if the answer object has atleast 1 value and submits it to the endpoint
* endpoint - "/answers"
*/

function submitFeedback() {
  sessionStorage.clear();
  sessionStorage.setItem('activeFormId', "0");


  if(Object.keys(selectedAnswers).length > 0) {
    let submitFeedbackPromise = fetch("/.netlify/functions/server/answers", {  
      method: "POST",
      headers: { 
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        answers: selectedAnswers
      })
    });
    submitFeedbackPromise.then(response => response.json()).then(json => console.log(json));  
  }
  
}

/**
* @Params type: {Array} formItem - Each form item is an object to with questions and its type.
* @return null
*/
function createForms(formItem, array) {
  
    var form = document.createElement("form");
    form.setAttribute("class", "form");
    form.setAttribute('data-form-id', formItem['qus-id']);   
    form.setAttribute('data-form-index', formItem['qus-index']);   
  
    if(formItem['qus-index'] === activeFormId) {
      form.classList.add('form-active');
    }
  
    var optionsElement = getInputElement(formItem);
  
    var questionElement = document.createElement('p');
    questionElement.setAttribute('class', 'question-description');
    questionElement.textContent = `${formItem['qus-index']}. ${formItem.question}`;
  
    var btnAttrs = {
      "class": 'form__btn',
      "data-form-id": formItem['qus-id'],
      "data-form-index": formItem['qus-index'],
    };
  
    function prevClick(e) {
      e.preventDefault();
      activeFormId = parseInt(e.target.getAttribute('data-form-index')) - 1;
  
      if(activeFormId < 0 ) {
      } else {
        setFormActive(activeFormId, e.target.getAttribute('data-form-index'));
      }
    }
  
    function nextClick(e) {
      e.preventDefault();
      activeFormId = parseInt(e.target.getAttribute('data-form-index')) + 1;
  
      if(activeFormId > array.length) {
        submitFeedback();        
        document.getElementById('base-form').classList.add('form-active');
      } else {
        setFormActive(activeFormId, e.target.getAttribute('data-form-index'));
      }
    }
    
    var b1 = ButtonComponent.createActionButton('Previous', btnAttrs, "left", prevClick);
    b1.classList.add('outline');
    b1.classList.add('prev-btn');
  
    let lastPage = (formItem['qus-index'] === array.length);
  
    var b2 = ButtonComponent.createActionButton(lastPage ? 'Submit' : 'Next', btnAttrs, "right", nextClick);
    b2.classList.add('solid');
    b2.classList.add('next-btn');
  
    var formHeader = document.createElement('div');
    var formFooter = document.createElement('div');
  

    formHeader.setAttribute('class', 'form--header-container');
    formFooter.setAttribute('class', 'form--footer-container');
  
    var heading = document.createElement('h1');
    heading.setAttribute('class', 'form--header-title');
    heading.textContent = 'Fresh Fruits';
    formHeader.appendChild(heading);
  
  
    formFooter.appendChild(b1);
    formFooter.appendChild(b2);
  
    form.appendChild(formHeader);
    form.appendChild(questionElement);
    form.appendChild(optionsElement);
    form.appendChild(formFooter);
  
    var main = document.getElementsByTagName('main')[0];
    var endPage = document.getElementById('base-form');
    main.insertBefore(form, endPage);
}
  
const FormBuilderComponent = {
    createForms: createForms,
    setPage: setFormActive
};

export default FormBuilderComponent;