let myLoction=document.querySelector('#location');//显示位置
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
};
//点击按钮获取位置
let myButton2 = document.querySelector('#getloc');
myButton2.onclick = function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}