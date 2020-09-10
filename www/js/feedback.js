/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    var ipads = localStorage.ipadrs;
    var formid = localStorage.currentformid;
    var fromnotification = getParameterByName("fromnotification");
    var value_id = getParameterByName("value_id");
    $.get(ipads + '/admin/FeedbackTemplateMobile.jsp?formid=' + formid, function (responseText) {
        $('#data').html(responseText);    
        if(fromnotification==="1"){
            $('#txtId').val(value_id);
            $('.btnstrfedbak').click();
        }
    });
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}