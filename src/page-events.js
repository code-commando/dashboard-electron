'use strict';
const {ipcRenderer} = require('electron');
// const remote = require('remote');


//make dry by passing a argument to match the html page and iterate through an arry to find that html
document.getElementById('main').addEventListener('click', event => {
  event.preventDefault();
  ipcRenderer.send('load-home');
});

document.getElementById('quiz').addEventListener('click', event => {
  event.preventDefault();
  ipcRenderer.send('load-quiz');
});

document.getElementById('roster').addEventListener('click', event => {
  event.preventDefault();
  ipcRenderer.send('load-roster');
});

document.getElementById('random').addEventListener('click', event => {
  event.preventDefault();
  ipcRenderer.send('load-random');
});

document.getElementById('pairs').addEventListener('click', event => {
  event.preventDefault();
  ipcRenderer.send('load-pairs');
});

document.getElementById('code').addEventListener('click', event => {
  event.preventDefault();
  ipcRenderer.send('load-code');
});

// document.getElementById('run').addEventListener('click', event, editor => {
//   event.preventDefault();
//   let data = editor.getValue();
//   let obj = {};
//   obj.code = data;
//   obj.fileName = 'reverseString-4';
//   obj.day = '01-introduction';
//   console.log('data -->', obj);
//   $.ajax({
//     type: 'POST',
//     url: 'http://localhost:3000/api/v1/code',
//     data: obj,
//     success: function (data) {
//       console.log(data);
//       $('#result').text(JSON.stringify(data));
//     },
//   });
//   // ipcRenderer.send('load-code');
// });

/*

/api/v1/roster
/api/v1/roster/random
/api/v1/roster/pairs


*/