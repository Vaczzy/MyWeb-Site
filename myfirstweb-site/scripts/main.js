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
//网页开始时 或点击按钮时
let myButton1 = document.querySelector('#username');
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
//初始化
if(!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = '欢迎您，' + storedName;
}
myButton1.onclick = function() {
    setUserName();
}
//测试
let myButton2 = document.querySelector('#getloc');
let myLoction=document.querySelector('#location');
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
function success(pos) {
    var crd = pos.coords;
    var loctext
    //console.log('Your current position is:');
    if(crd.latitude>0){
        loctext=crd.latitude+'N,';
    }
    else{
        loctext=(crd.latitude+'S,').substring(1);
    }
    if(crd.longitude>0){
        loctext+=crd.longitude+'E,';
    }
    else{
        loctext+=(crd.longitude+'W,').substring(1);
    }
    //console.log('Latitude : ' + crd.latitude);
    //console.log('Longitude: ' + crd.longitude);
    loctext+="miss:"+crd.accuracy+".";
    //console.log('More or less ' + crd.accuracy + ' meters.');
    //return loctext;
    myLoction.textContent = loctext;
};
function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
    alert("can't get your position")
};
myButton2.onclick = function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}
