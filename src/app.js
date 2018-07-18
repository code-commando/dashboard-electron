'use strict';

require('babel-register');
import superagent from 'superagent';
const shell = require('electron').shell;

document.getElementById('nav-roster').addEventListener('click', () => {
  clearDiv();
  return superagent.get('https://code-comrade.now.sh/api/v1/roster')
.then(data => {
  let str = '<ul>';
  let roster = data.body.results;
  console.log(data.body.results);
  for(let student of roster) {
    str += `<li>${student}</li>`;
  }
  str +='</ul>';
  let div = document.getElementById('roster');
  console.log('div', div);
  div.innerHTML=str;
});
});

document.getElementById('nav-pairs').addEventListener('click', () => superagent.get('https://code-comrade.now.sh/api/v1/roster/pairs')
.then(data => {
  clearDiv();
  let str = '<ul>';
  let pairs = data.body.results;
  for(let student of pairs) {
    str += `<li>${student}</li>`;
  }
  str +='</ul>';
  let div = document.getElementById('pairs');
  div.innerHTML=str;
}));


document.getElementById('nav-random').addEventListener('click', () => superagent.get('https://code-comrade.now.sh/api/v1/roster/random')
.then(data => {
  clearDiv();
  let str = '<ul>';
  let random = data.body.results;
  for(let student of random) {
    str += `<li>${student}</li>`;
  }
  str +='</ul>';
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
  let obj = document.getElementsByClassName('clearDiv');
  Object.values(obj).forEach(div => {
    div.innerHTML = '';
  });
}
