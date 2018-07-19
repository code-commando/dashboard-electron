'use strict';

require('babel-register');
import superagent from 'superagent';
const shell = require('electron').shell;
let day;
let classCode;

document.getElementById('nav-home').addEventListener('click', () => {
  clearDiv();
  $('#home').show();
});

document.getElementById('401n5').addEventListener('click', () => {
  clearDiv();
  $('#home').hide();
 $('#days').show();
  classCode = '401n5';
});

document.getElementById('days').addEventListener('click', (event) => {
  if(event.target.className === 'class-day') {
    clearDiv();
    $('#home').hide();
    day = event.target.id;
    return superagent.get('https://api.github.com/repos/code-commando/sample-class/contents/')
      .then(data => {
        return superagent.get(data.body[day-1].url)
          .then(contents => {
            contents.body.forEach(file => {
              if(file.name.split('.')[0] === 'README') {
                return superagent.get(file.download_url)
                  .then(README => {
                    document.getElementById('readMe').innerText = README.text;
                  });
              }
            });
          });
      });
  }
});

// document.getElementById('nav-quiz').addEventListener('click', () => {
//   console.log('clicked');
//   if (day) {
//     clearDiv();
//     $('#home').hide();
//     return superagent.get(`http://api.commando.ccs.net/api/v1/quiz/${day}`)
//       .then(questions => {
//         let qObj = questions.body.results;
//         qObj.forEach((question,index) => {
//           let div = document.createElement('div');
//           div.setAttribute('id', `question${index+1}`);
//           document.getElementById('quiz').appendChild(div);
//           let questionEl = document.createElement('h4').textContent = question.question;
//           div.appendChild(questionEl);
//         });
//       });
//   }
// });

document.getElementById('nav-roster').addEventListener('click', () => {
  $('#home').hide();
  clearDiv();
  return superagent.get('http://api.commando.ccs.net/api/v1/roster')
.then(data => {
  let str = '<ul>';
  let roster = data.body.results;
  console.log(data.body.results);
  for(let student of roster) {
    str += `<br /><li>${student}</li>`;
  }
  str +='</ul>';
  let div = document.getElementById('roster');
  console.log('div', div);
  div.innerHTML=str;
});
});

document.getElementById('nav-pairs').addEventListener('click', () => superagent.get('http://api.commando.ccs.net/api/v1/roster/pairs')
.then(data => {
  $('#home').hide();
  clearDiv();
  let str = '<ul>';
  let pairs = data.body.results;
  for(let student of pairs) {
    str += `<br /><li>${student}</li>`;
  }
  str +='</ul>';
  let div = document.getElementById('pairs');
  div.innerHTML=str;
}));


document.getElementById('nav-random').addEventListener('click', () => superagent.get('http://api.commando.ccs.net/api/v1/roster/random')
.then(data => {
  $('#home').hide();
  clearDiv();
  let str = '<br /><h1>';
  str += data.body.results;

  str +='</h1>';
  let div = document.getElementById('random');
  div.innerHTML=str;
}));

document.getElementById('signup').addEventListener('click', () => {
  let githubURL = 'https://github.com/login/oauth/authorize';
  let options = {
    // local
    // client_id: 'd6c0defbd80f3979493a',
    //live
    client_id: 'f749977a8455b627dc56',
    // redirect_uri: 'http://localhost:3000/oauth',
    redirect_uri: 'https://code-commando.herokuapp.com/oauth',
    scope: 'read:user repo',
    state: 'autumn',
    allow_signup: 'true',
  };  
  let QueryString = Object.keys(options).map((key, i) => {
    return `${key}=` + encodeURIComponent(options[key]);
  }).join('&');
  let authURL = `${githubURL}?${QueryString}`;
  shell.openExternal(authURL);
});

document.getElementById('login').addEventListener('click', () => {
  let githubURL = 'https://github.com/login/oauth/authorize';
  let options = {
    // local
    // client_id: 'd6c0defbd80f3979493a',
    //live
    client_id: 'f749977a8455b627dc56',
    // redirect_uri: 'http://localhost:3000/oauth',
    redirect_uri: 'https://code-commcando.herokuapp.com/oauth',
    scope: 'read:user repo',
    state: 'autumn',
    allow_signup: 'true',
  };  
  let QueryString = Object.keys(options).map((key, i) => {
    return `${key}=` + encodeURIComponent(options[key]);
  }).join('&');
  let authURL = `${githubURL}?${QueryString}`;
  shell.openExternal(authURL);
});

function clearDiv() {
  $('#run').hide();
  $('#days').hide();
  let obj = document.getElementsByClassName('clearDiv');
  Object.values(obj).forEach(div => {
    div.innerHTML = '';
  });
}
