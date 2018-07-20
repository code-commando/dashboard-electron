'use strict';

require('babel-register');
import superagent from 'superagent';

let day;
let classCode;
let apiUrl;
let dayName;

document.getElementById('nav-home').addEventListener('click', () => {
  if (!window.sessionStorage.jwt) return alert('please sign up / log in first');
  clearDiv();
  $('#home').show();
  $('#new-class').show();
  superagent.get('http://localhost:3000/api/v1/user')
    // superagent.get('http://api.commando.ccs.net/api/v1/user')
    .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.sessionStorage.jwt}` })
    .then(data => {
      console.log(data.body.courses);
      data.body.courses.forEach(course => {
        $('#courses').append(`<br /><a href=# id="${course.apiLink}" class="course-class">${course.classCode}</a><br />`);
      });
    });
});

document.getElementById('courses').addEventListener('click', event => {
  if (event.target.className === 'course-class') {
    apiUrl = event.target.id;
    classCode = event.target.textContent;
    $('#home').hide();
    superagent.get(apiUrl)
      .then(data => {
        let str = '<ul>';
        for (let i = 0; i < data.body.length; i++) {
          str += `<br /><li><a href=# id='${i + 1}' class="class-day">${data.body[i].name}</a></li>`;
        }
        str += '</ul>';
        $('#days').html(str);
      });
    $('#days').show();
  }
});


document.getElementById('days').addEventListener('click', (event) => {
  if (event.target.className === 'class-day') {
    clearDiv();
    $('#home').hide();
    day = event.target.id;
    dayName = event.target.textContent;
    return superagent.get(`http://localhost:3000/api/v1/readme/${day}?classCode=${classCode}`)
      // return superagent.get(`http://api.commando.ccs.net/api/v1/readme/${day}`)
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
  if (!day) return alert('Please choose a class and day');
  if (day == 1) return alert('Don\t be cruel by giving students a quiz on day one!');
  if (day) {
    clearDiv();
    $('#home').hide();
    return superagent.get(`http://api.commando.ccs.net/api/v1/quiz/${day}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.sessionStorage.jwt}` })
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
  if (!classCode) return alert('Please choose a class.');

  $('#home').hide();
  clearDiv();
  return superagent.get(`http://api.commando.ccs.net/api/v1/roster?classCode=${classCode}`)
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

document.getElementById('nav-pairs').addEventListener('click', () => {
  if (!classCode) return alert('Please choose a class.');

  superagent.get('http://api.commando.ccs.net/api/v1/roster/pairs?classCode=' + classCode)
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
    });
});


document.getElementById('nav-random').addEventListener('click', () => {
  if (!classCode) return alert('Please choose a class.');

  superagent.get('http://api.commando.ccs.net/api/v1/roster/random?classCode=' + classCode)
    .then(data => {
      $('#home').hide();
      clearDiv();
      let str = '<br /><h1>';
      str += data.body.results[0];

      str += '</h1>';
      let div = document.getElementById('random');
      div.innerHTML = str;
    });
});

document.getElementById('signup').addEventListener('click', () => {
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
  let QueryString = Object.keys(options).map((key) => {
    return `${key}=` + encodeURIComponent(options[key]);
  }).join('&');
  let authURL = `${githubURL}?${QueryString}`;
  window.open(authURL, authURL, 'width=300px, height=400px');
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
  let QueryString = Object.keys(options).map((key) => {
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
      $('#courses').append(`<br /><a href=# id="${data.body.apiLink}">${data.body.classCode}<a><br />`);
      $('#suc-message').text('Success');
    });
});

$('#nav-repl').on('click', () => {
  if (!classCode) return alert('Please Choose a class');
  if (!day) return alert('Please pick a day');
  clearDiv();
  $('#home').hide();
  superagent.get(`http://localhost:3000/api/v1/code/${day}?classCode=` + classCode)
    .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.sessionStorage.jwt}` })
    .then(data => {
      $('#files').append(`<ul id="files"></ul>`);
      console.log(data.body);
      let files = data.body;
      for (let i = 0; i < files.length; i++) {
        $('#files ul').append(`<br /><li id="${files[i].link}">${files[i].file}</li>`);
      }
      $('#files ul').append(`<br /><li id="new-file">Create A New File</li>`);
    });
});

function clearDiv() {
  $('#run').hide();
  $('#resultWindow').hide();
  $('#days').hide();
  let obj = document.getElementsByClassName('clearDiv');
  Object.values(obj).forEach(div => {
    div.innerHTML = '';
  });
}


const port = process.env.PORT || 3005;
require('./server.js').start(port);