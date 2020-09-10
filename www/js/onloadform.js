/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    debugger;

    if ("iphospname" in localStorage) {
        var data = localStorage.iphospname;
        if (data.indexOf("@@@") > 0) {
            var sel = data.split("@@@");
            for (var i = 0; i < sel.length; i++) {
                if (sel[i] !== 'undefined') {

//                var opt=document.getElementById("selectip");
                    var option = document.createElement("option");
//                alert(sel[i]);
                    option.text = sel[i];
                    option.value = i;
                    var select = document.getElementById("selectip");
                    select.appendChild(option);
                }
            }
        }
    }
    loaddata();
});
function loaddata() {
    debugger;
    var id = localStorage.edituserval;

    if (id != "" && localStorage.edituserval != null) {
        id = parseInt(id);
        changeIP(id);

    }
}

function changeIP(id) {
    debugger;
    var ind = id.value;
    if (typeof (ind) === "undefined") {
        ind = id;

    }
    var selip = localStorage.ipsel;
    var selport = localStorage.ipport;
    var selhostname = localStorage.iphostname;
    var selusername = localStorage.ipusername;
    var hospname = localStorage.iphospname;
    var password = localStorage.ippassword;
      var selipn = selip.split("@@@");
    if(selipn[ind]===""){
        $('.lblnm').removeClass('active');
//        $('.lblnm').css('position','absolute');
//        $('.lblnm').css('padding-top','10px');
	$("input[name=ipaddress]").val("");
	$("input[name=portnumber]").val("");
	$("input[name=hostname]").val("");
	$("input[name=username]").val("");
	$("input[name=hospname]").val("");
	$("input[name=password]").val("");
	$('.icheck').show();
	return;
                        }
                        $('.lblnm').addClass('active');
//        $('.lblnm').css('position','relative');
//        $('.lblnm').css('padding-top','0px');
    if (selip.indexOf("@@@") > 0) {
        var selip1 = selip.split("@@@");
        $("input[name=ipaddress]").val(selip1[ind]);
    }
    if (selport.indexOf("@@@") >= 0) {
        var selport1 = selport.split("@@@");
//        document.getElementById("portnumber").value=selport1[ind];
        $("input[name=portnumber]").val(selport1[ind]);
    }
    if (selhostname.indexOf("@@@")) {
        var selhostname1 = selhostname.split("@@@");
        $("input[name=hostname]").val(selhostname1[ind]);
    }
    if (selusername.split("@@@")) {
        var selusername1 = selusername.split("@@@");
        $("input[name=username]").val(selusername1[ind]);
    }
    if (hospname.indexOf("@@@")) {
        var hospname1 = hospname.split("@@@");
        $("input[name=hospname]").val(hospname1[ind]);

    }
    if (password.indexOf("@@@")) {
        var password1 = password.split("@@@");
        $("input[name=password]").val(password1[ind].replace(/~/g, '@'));
    }
        var ipaddress = $("input[name=ipaddress]").val().trim();
        var port = $("input[name=portnumber]").val().trim();
        var hostname = $("input[name=hostname]").val().trim();
        var username = $("input[name=username]").val().trim();
        var password = $("input[name=password]").val().trim();
        var hospname = $("input[name=hospname]").val().trim();
        var path = "https://" + ipaddress + ":" + port + "/" + hostname + "/" + "login?username=" + username + "&password=" + password + "&type=login";
        var path1 = "https://" + ipaddress + ":" + port + "/" + hostname + "/";
        var server = "https://" + ipaddress + ":" + port;
        localStorage.server = server;
	var naskpwd="0";
        $.ajax({
            url: path,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {
                if (responseJson.length > 0) {
		    
		      naskpwd= responseJson[0]["ASKPWD"];
		      if (naskpwd==="1") {
                            $('.icheck').hide();
                            $("#pwd").val("");
                            }else{
                        $('.icheck').show();
                               }
		}
	    },
	error: function (error) {
	      $('.icheck').show();
	}
	  });
	}
