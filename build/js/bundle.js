function createIcon(iconName) {

    if(iconName == 'left-arrow') {
      return createLeftArrowIcon();
    }
  
    if(iconName == 'right-arrow') {
      return createRightArrowIcon();
    }
  }
  
  function createLeftArrowIcon(iconName) {
    var arrowNode = document.createElement('div');
    arrowNode.setAttribute('class', "arrow");
    var lineNode = document.createElement('div');
    lineNode.setAttribute('class', "line");
    var pointNode = document.createElement('div');
    pointNode.setAttribute('class', "point-left");
    arrowNode.appendChild(lineNode);
    arrowNode.appendChild(pointNode);
    return arrowNode;
  }
  
  function createRightArrowIcon(iconName) {
    var arrowNode = document.createElement('div');
    arrowNode.setAttribute('class', "arrow");
    var lineNode = document.createElement('div');
    lineNode.setAttribute('class', "line");
    var pointNode = document.createElement('div');
    pointNode.setAttribute('class', "point-right");
    arrowNode.appendChild(lineNode);
    arrowNode.appendChild(pointNode);
    return arrowNode;
  }

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
};

function getInputElement(formItem, type, source) {
    var node = document.createElement('div');
  
    switch (type) {
      case 'boolean':
        if(formItem.options) {
          formItem.options.forEach((option) => {
  
            if(JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`))) {
              if(option.text === JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`)).text) {
                console.log('matched');
                option.checked = true;
              } else {
                option.checked = false;
              }
            }
  
            var radioButton = RadioButtonComponent.createRadioButton(option.text, formItem['qus-id'], option.points, option.checked, function() {
              formItem.selectedOption = option;
              localStorage.setItem('answer', JSON.stringify(source));
              sessionStorage.setItem(`${formItem['qus-id']}`, JSON.stringify(option));
            });
            node.appendChild(radioButton);
          });
        }
        break;
      case 'rating':
          node.setAttribute('class', 'hungry');
          formItem.options.forEach((option) => {
            if(JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`))) {
              if(option.text === JSON.parse(sessionStorage.getItem(`${formItem['qus-id']}`)).text) {
                console.log('matched');
                option.checked = true;
              } else {
                option.checked = false;
              }
            }
            var chip = ChipComponent.createChip(option.text, formItem['qus-id'], option.points, option.checked, function() {
              formItem.selectedOption = option;
              localStorage.setItem('answer', JSON.stringify(source));
              sessionStorage.setItem(`${formItem['qus-id']}`, JSON.stringify(option));
            });
            node.appendChild(chip);
          });
  
        break;
      case 'text':
          let savedValue = sessionStorage.getItem(`${formItem['qus-id']}`);
          let inputValue = savedValue || 'default';
          var textInputElement = TextInputComponent.createInput(inputValue, (e) => {
            sessionStorage.setItem(`${formItem['qus-id']}`, e.target.value);
          });
          node.appendChild(textInputElement); 
        break;
        // console.log('default');
    }
  
    return node;
  }


  function setFormActive(prevtarget, activeFormId, prevId) {
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

function createForms(formItem, array) {

    JSON.parse(localStorage.getItem('answer'));
  
    var form = document.createElement("form");
    form.setAttribute("class", "form");
    form.setAttribute('data-form-id', formItem['qus-id']);   
    form.setAttribute('data-form-index', formItem['qus-index']);   
  
    if(formItem['qus-index'] === activeFormId) {
      form.classList.add('form-active');
    }
  
    var optionsElement = getInputElement(formItem, formItem.type, array);
  
    var questionElement = document.createElement('p');
    questionElement.textContent = formItem.question;
  
    var btnAttrs = {
      "class": 'form__btn',
      "data-form-id": formItem['qus-id'],
      "data-form-index": formItem['qus-index'],
    };
  
    function prevClick(e) {
      e.preventDefault();
      activeFormId = parseInt(e.target.getAttribute('data-form-index')) - 1;
  
      if(activeFormId < 0 ) ; else {
        setFormActive(e.target, activeFormId, e.target.getAttribute('data-form-index'));
      }
    }
  
    function nextClick(e) {
      e.preventDefault();
      activeFormId = parseInt(e.target.getAttribute('data-form-index')) + 1;
  
  
      if(activeFormId > array.length) {
        // go to last page page
  
        document.getElementById('base-form').classList.add('form-active');
      } else {
        setFormActive(e.target, activeFormId, e.target.getAttribute('data-form-index'));
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
  
    // formFooter.textContent = formItem['qus-index'];
  
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
    createForms: createForms
};

let promise = window.fetch('/questions');
promise.then(response => response.json())
      .then(data => {
        prepareQuestionnaire(data);
      });

window.activeFormId = JSON.parse(sessionStorage.getItem('activeFormId')) || 0;

if(!activeFormId) {
  document.getElementById('index-form').classList.add('form-active');
}

window.goToFeedBackQuestions = function(e) {
  e.preventDefault();
  activeFormId = parseInt(e.target.getAttribute('data-form-index')) + 1;
  setFormActive$1(e.target, 1, 0);
};


function setFormActive$1(prevtarget, activeFormId, prevId) {
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

function prepareQuestionnaire(questions) {
  questions.forEach((item, index, array) => {
    item['qus-id'] = index;
    item['qus-index'] = index + 1;
    FormBuilderComponent.createForms(item, array);
  });
}
