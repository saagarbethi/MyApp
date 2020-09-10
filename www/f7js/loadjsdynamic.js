/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function loadjsfile(filename) {
    filename = localStorage.ipadrs + "/mobilejs/" + filename;
    $('<script  type="text/javascript" src="' + filename + '" >').appendTo("head");
}
function loadf7jsfile(filename) {
    filename = localStorage.ipadrs + "/f7js/" + filename;
    $('<script  type="text/javascript" src="' + filename + '" >').appendTo("head");
}
function loadcssfile(filename) {
    filename = localStorage.ipadrs + "/mobilejs/" + filename;
    $('<link rel="stylesheet" href="' + filename + '">').appendTo("head");
}
function loadcssfile1(filename) {
    var appName = localStorage.appname;
    if(appName === "fernandez"){
    filename = localStorage.ipadrs + "/css/" + filename;
    $('<link rel="stylesheet" href="' + filename + '">').appendTo("head");
    }
}
function loadappjsfile(filename) {
    filename = localStorage.appurl + "/mobilejs/" + filename;
    $('<script  type="text/javascript" src="' + filename + '"  >').appendTo("head");
}

 function loadappcssfile(filename) {
    filename = localStorage.appurl + "/mobilejs/" + filename;
    $('<link rel="stylesheet" href="' + filename + '">').appendTo("head");
}

