//点击切换图片
let myImage = document.querySelector('img');
myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/CSUlogo.jpg') {
      myImage.setAttribute('src', 'images/CSU-SGIP.jpg');
    } else {
      myImage.setAttribute('src', 'images/CSUlogo.jpg');
    }
}
//
let myButton = document.querySelector('button');
let myHeading = document.querySelector('#welcome');
function setUserName() {
    let myName = prompt('请输入你的名字。');
    if(!myName || myName === null) {
        myHeading.innerHTML = '欢迎您!'
    } 
    else {
      localStorage.setItem('name', myName);
      myHeading.innerHTML = '欢迎您，' + myName;
    }
}
if(!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = '欢迎您，' + storedName;
}
myButton.onclick = function() {
    setUserName();
}
