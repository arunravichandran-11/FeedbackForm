import ButtonComponent from './components/Button/index';
import RadioButtonComponent from './components/RadioButton/index';
import TextInputComponent from './components/TextInput/index';
import ChipComponent from './components/Chip/index';

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
      default:
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

    let savedAns = JSON.parse(localStorage.getItem('answer'));
  
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
  
      if(activeFormId < 0 ) {
        // go to first page
        // setFormActive(e.target, activeFormId, e.target.getAttribute('data-form-id'));
  
      } else {
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

export default FormBuilderComponent;