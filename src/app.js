'use strict';

require('babel-register');
import superagent from 'superagent';

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

function clearDiv() {
  let obj = document.getElementsByClassName('clearDiv');
  Object.values(obj).forEach(div => {
    div.innerHTML = '';
  });
}