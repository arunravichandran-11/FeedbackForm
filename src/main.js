import './styles/main.scss';
import FormBuilderComponent from './form-builder';

let questions;
let promise = window.fetch('/.netlify/functions/server/questions');
promise.then(response => response.json())
      .then(data => {
        questions = data;
        prepareQuestionnaire(data.questions);
      });

window.activeFormId = JSON.parse(sessionStorage.getItem('activeFormId')) || 0;

if(!activeFormId) {
  document.getElementById('index-form').classList.add('form-active');
}

window.goToFeedBackQuestions = function(e) {
  e.preventDefault();
  activeFormId = parseInt(e.target.getAttribute('data-form-index')) + 1;
  FormBuilderComponent.setPage(1, 0);
};


/**
  * @Params type: {array} questions : Questions received from API.
  * @Description : Iterated the questions and create sepearate form for each questions;
*/

function prepareQuestionnaire(questions) {
  questions.forEach((item, index, array) => {
    item['qus-id'] = index;
    item['qus-index'] = index + 1;
    FormBuilderComponent.createForms(item, array);
  })
}
