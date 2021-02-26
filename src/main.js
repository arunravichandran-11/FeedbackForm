import './styles/main.scss';
import FormBuilderComponent from './form-builder';

let questions;

let promise = window.fetch('/questions')
promise.then(response => response.json())
      .then(data => {
        questions = data;
        prepareQuestionnaire(data);
      });

window.activeFormId = JSON.parse(sessionStorage.getItem('activeFormId')) || 0;

if(!activeFormId) {
  document.getElementById('index-form').classList.add('form-active');
}

window.goToFeedBackQuestions = function(e) {
  e.preventDefault();
  activeFormId = parseInt(e.target.getAttribute('data-form-index')) + 1;
  setFormActive(e.target, 1, 0);
};


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

function prepareQuestionnaire(questions) {
  questions.forEach((item, index, array) => {
    item['qus-id'] = index;
    item['qus-index'] = index + 1;
    FormBuilderComponent.createForms(item, array);
  })
}
