/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var locid = localStorage.locid
    var path = localStorage.ipadrs+"totalcollectionsummary?locid="+locid;
    $.get(path,function(responseText){
        if(responseText.indexOf("$")>0){
            var amounts = responseText.split("$");
            var op_amount = amounts[0];
            var ip_amount = amounts[1];
            var pharm_amount = amounts[2];
            var dg_amount = amounts[3];
            $('#divoutpatient').html(op_amount);
            $('#divinpatient').html(ip_amount);
            $('#divdiagnosis').html(pharm_amount);
            $('#divpharmacy').html(dg_amount);
        }else{
            alert('Error in qry');
        }
        
    });
});
