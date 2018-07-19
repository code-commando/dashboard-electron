'use strict';

require('babel-register');
import superagent from 'superagent';
const shell = require('electron').shell;
let day;
let classCode;




document.getElementById('nav-home').addEventListener('click', () => {
  clearDiv();
  $('#home').show();
  superagent.get('http://localhost:3000/api/v1/user')
    .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.sessionStorage.jwt}` })
    .then(data => {
      console.log(data.body.courses);
      data.body.courses.forEach(course => {
        $('#courses').append(`<br /><a href=# id="${course.classCode}" class="course-class">${course.classCode}</a>`);
      });
    });
});

document.getElementById('courses').addEventListener('click', event => {
  if (event.target.className === 'course-class') {
    classCode = event.target.id;
    $('#home').hide();
    $('#days').show();
  }
})


document.getElementById('days').addEventListener('click', (event) => {
  if (event.target.className === 'class-day') {
    clearDiv();
    $('#home').hide();
    day = event.target.id;
    // return superagent.get(`http://api.commando.ccs.net/api/v1/readme/${day}`)
    //bring oauth to electron
    //store as cookie
    //grab cookie from electron sessions
    return superagent.get(`http://localhost:3000/api/v1/readme/${day}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.sessionStorage.jwt}` })
      .then(readme => {
        let preEl = document.createElement('pre');
        preEl.textContent = readme.text;
        document.getElementById('readMe').appendChild(preEl);
      });
  }
});

document.getElementById('nav-quiz').addEventListener('click', () => {
  console.log(day);
  if (!day) alert('Please choose a class and day');
  if (day === 1) alert('Don\t be cruel by giving students a quiz on day one!');
  if (day) {
    clearDiv();
    $('#home').hide();
    return superagent.get(`http://api.commando.ccs.net/api/v1/quiz/${day}`)
      .then(questions => {
        let qObj = questions.body.results;
        qObj.forEach((question, index) => {
          document.getElementById('quiz').appendChild(document.createElement('br'));
          let div = document.createElement('div');

          div.setAttribute('id', `question${index + 1}`);
          document.getElementById('quiz').appendChild(div);
          let questionEl = document.createElement('h4');
          questionEl.appendChild(document.createTextNode(question.question));
          div.appendChild(questionEl);

          let answerList = document.createElement('ol');
          if (Array.isArray(question.answers)) {
            let answersArray = question.answers;
            answersArray.forEach(choice => {
              let listItem = document.createElement('li');
              listItem.appendChild(document.createTextNode(choice));
              answerList.appendChild(listItem);
              div.appendChild(answerList);
            });
          }
        });
      });
  }
});

document.getElementById('nav-roster').addEventListener('click', () => {
  $('#home').hide();
  clearDiv();
  return superagent.get('http://api.commando.ccs.net/api/v1/roster')
    .then(data => {
      let str = '<ul>';
      let roster = data.body.results;
      console.log(data.body.results);
      for (let student of roster) {
        str += `<br /><li>${student}</li>`;
      }
      str += '</ul>';
      let div = document.getElementById('roster');
      console.log('div', div);
      div.innerHTML = str;
    });
});

document.getElementById('nav-pairs').addEventListener('click', () => superagent.get('http://api.commando.ccs.net/api/v1/roster/pairs')
  .then(data => {
    $('#home').hide();
    clearDiv();
    let str = '<ul>';
    let pairs = data.body.results;
    for (let student of pairs) {
      str += `<br /><li>${student}</li>`;
    }
    str += '</ul>';
    let div = document.getElementById('pairs');
    div.innerHTML = str;
  }));


document.getElementById('nav-random').addEventListener('click', () => superagent.get('http://api.commando.ccs.net/api/v1/roster/random')
  .then(data => {
    $('#home').hide();
    clearDiv();
    let str = '<br /><h1>';
    str += data.body.results[0];

    str += '</h1>';
    let div = document.getElementById('random');
    div.innerHTML = str;
  }));

document.getElementById('signup').addEventListener('click', () => {
  let githubURL = 'https://github.com/login/oauth/authorize';
  let options = {
    // local
    client_id: 'd6c0defbd80f3979493a',
    //live
    // client_id: 'f749977a8455b627dc56',
    redirect_uri: 'http://localhost:3000/oauth',
    // redirect_uri: 'http://api.commando.ccs.net/oauth',
    scope: 'read:user repo',
    state: 'autumn',
    allow_signup: 'true',
  };
  let QueryString = Object.keys(options).map((key, i) => {
    return `${key}=` + encodeURIComponent(options[key]);
  }).join('&');
  let authURL = `${githubURL}?${QueryString}`;
  shell.openURL(authURL);
});

document.getElementById('login').addEventListener('click', () => {
  let githubURL = 'https://github.com/login/oauth/authorize';
  let options = {
    // local
    client_id: 'd6c0defbd80f3979493a',
    //live
    // client_id: 'f749977a8455b627dc56',
    redirect_uri: 'http://localhost:3000/oauth',
    // redirect_uri: 'https://code-commcando.herokuapp.com/oauth',
    scope: 'read:user repo',
    state: 'autumn',
    allow_signup: 'true',
  };
  let QueryString = Object.keys(options).map((key, i) => {
    return `${key}=` + encodeURIComponent(options[key]);
  }).join('&');
  let authURL = `${githubURL}?${QueryString}`;
  window.open(authURL, authURL, 'width=300px, height=400px');
});

$('#new-class').on('submit', function (e) {
  let classCode = $(this).find('[name=classCode]').val();
  let githubRepo = $(this).find('[name=githubRepo]').val();
  e.preventDefault();
  return superagent.post('localhost:3000/api/v1/classes')
    .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.sessionStorage.jwt}` })
    .send({ classCode, githubRepo })
    .then((data) => {
      $('#courses').append(`<a href=# id=${data.body.apiLink}>${data.body.classCode}<a>`);
      $('#suc-message').text('Success');
    });
});


function clearDiv() {
  $('#run').hide();
  $('#days').hide();
  let obj = document.getElementsByClassName('clearDiv');
  Object.values(obj).forEach(div => {
    div.innerHTML = '';
  });
}


const port = process.env.PORT || 3005;
require('./server.js').start(port);