/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function confirmmbl(type) {
    debugger;
    var loginuser = $("input[name=loginuser]").val();
    var mrno = "";
    if (loginuser === undefined) {
        loginuser = localStorage.appurl;
    }
    if (type === "mrno") {
        mrno = $("input[name=mrno]").val();
    } else if (type === "email") {
        mrno = $("input[name=email]").val();
    } else if (type === "mobile") {
        mrno = $("input[name=mobile]").val();
    }else{
        mrno = $("input[name=mrno]").val();
    }

    
    var path = loginuser + "/formviewlogin?mrno=" + mrno + "&mobile=sendsms&logintype=" + type;
    $.ajax({
        url: getHttp(path),
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            if (responseJson.length > 0) {
                alert(responseJson[0]["MSG"]);
            }
        },
        error: function (error) {

            alert(error.responseText);

        }
    });
}

function sendotp(type) {
    debugger;
    
    $('.alert-warning').hide('slow');
    if ($('.spwd').hasClass('disabled')) {
        return;
    }
    var loginuser = $("input[name=loginuser]").val();
    if (loginuser === undefined) {
        loginuser = localStorage.appurl;
    }
    var mrno = $("input[name=mrno]").val();
    if (type === "mrno") {
        mrno = $("input[name=mrno]").val();
        if (mrno === "") {
            $('.alert-warning').show('slow');
            $('#alert').html("Please enter MR No.");
            $("input[name=mrno]").css('border', '1px solid red');
            return;
        }
    } else if (type === "email") {
        mrno = $("input[name=email]").val();
        if (mrno === "") {
            $('.alert-warning').show('slow');
            $('#alert').html("Please enter Email Id");
            $("input[name=email]").css('border', '1px solid red');
            return;
        }
    } else if (type === "mobile") {
        mrno = $("input[name=mobile]").val();
        if (mrno === "") {
            $('.alert-warning').show('slow');
            $('#alert').html("Please enter Mobile No.");
            $("input[name=mobile]").css('border', '1px solid red');
            return;
        }

    } else {
        mrno = $("input[name=mrno]").val();
        if (mrno === "") {

            alert("Please enter MR No.");
            $("input[name=mrno]").css('border', '1px solid red');
            return;
        }
    }
    $('.spwd').removeClass('enabled');
    $('.spwd').addClass('disabled');
    $('#hdnotp').val("");
    $('#otp').val("");
    var path = loginuser + "/formviewlogin?mrno=" + mrno + "&mobile=otpsms&logintype=" + type;
    $.ajax({
        url: getHttp(path),
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            if (responseJson.length == 1) {
                debugger;
                $('.spwd').removeClass('disabled');
                $('.spwd').addClass('enabled');
                var mobile = responseJson[0]['MOB'];
                var type = responseJson[0]['TYPE']
                if (type !== 'email') {
                    mobile = maskMobile(mobile)
                    if (mobile === "") {
                        $('#alert').html("No mobile number registred with this MR Number, please contact Hospital Administrator.");
                        $('.alert-warning').show('slow');
                        //alert("No mobile number registred with this MR Number, please contact Hospital Administrator.");
                        return;
                    }

                    if (!confirm("Do you want to send password for this mobile no." + mobile))
                        return;
                    else
                        confirmmbl(type);
                } else {
                    if (mobile === "") {
                        $('#alert').html("No Mrno registred with this Email id, please contact Hospital Administrator.");
                        $('.alert-warning').show('slow');
                        // alert("No Mrno registred with this Email id, please contact Hospital Administrator.");
                        return;
                    }

                    if (!confirm("Do you want to send password for this Email" + mobile))
                        return;
                    else
                        confirmmbl(type);
                }
            }
            else if (responseJson.length > 1) {
                $('.spwd').removeClass('disabled');
                $('.spwd').addClass('enabled');
                var str = "";
                $('#hdnotp').val(responseJson[0]['OTP']);
                validOTP(responseJson[0]['OTP']);
                $('#myModal-remarks').modal('show');
                for (var i = 0; i < responseJson.length; i++) {
                    str = str + " <div class='row mainrow'  onclick=sendpwd('" + responseJson[i]['PWD'] + "','" + responseJson[i]['MOB'] + "','" + responseJson[i]['TYPE'] + "')> ";
                    str = str + "<div class='col-xs-2 col-sm-1 pad icon-container'>";
                    str = str + "  <span class='input-group-addon imglog usericon'>";
                    str = str + " <i class='glyphicon glyphicon-user  glphicon'></i></span>";
                    str = str + "</div>";
                    str = str + "<div class='col-xs-10 col-sm-11 pad main-container'>";
                    str = str + "<div class='col-xs-6 col-sm-6 pad'>";
                    str = str + "  <label class='lblpatientName'>" + responseJson[i]['FNAME'] + "</label>";
                    str = str + " </div>";
                    str = str + " <div class='col-xs-6 col-sm-6 pad'>";
                    str = str + "<label class='lblmrno'>" + responseJson[i]['USID'] + "</label>";
                    str = str + "<label class='lblpwd' style='display:none'>" + responseJson[i]['PWD'] + "</label>";
                    str = str + " </div>";
                    str = str + "</div>";
                    str = str + "</div>";

                }
                $('#modal-body-users').html(str);
                if (type !== 'email') {
                    $('#lblMsg').html('Multiple MR Numbers/UHIDS are Exist with this Mobie Number, Please select one user to login')
                } else {
                    $('#lblMsg').html('Multiple MR Numbers/UHIDS are Exist with this Email Id, Please select one user to login')
                }
            } else {
                $('.spwd').removeClass('disabled');
                $('.spwd').addClass('enabled');
                $('.alert-warning').show('slow');
                $('#alert').html('Invalid ' + $('.top1').html());
            }
        },
        error: function (error) {
            $('.spwd').removeClass('disabled');
            $('.spwd').addClass('enabled');
            alert(error.responseText);

        }
    });

}
function loginmethod() {
    var loginuser = $("input[name=loginuser]").val();
    var mrno = $("input[name=mrno]").val();
    var password = $("input[name=password]").val();
    var name = $('#name').val();
    document.getElementById("progressing").style.display = "inline-block";
    var path = loginuser;
    $.ajax({
        url: getHttp(path),
        type: "GET",
        success: function (data, textstatus, xhrreq) {
            data = data.trim();
            if (data.indexOf("frame src") > 0) {
                debugger;
                data = data.substring(data.indexOf("frame src")).replace('frame src="', "");
                var dqts = data.indexOf('"');
                var url = data.substring(0, dqts).trim();
                loginmethod1(url, mrno, password, name);

            } else {
                loginmethod1(loginuser, mrno, password, name);
            }
        },
        error: function (error) {
            if (error.statusText == "OK") {
                alert(error.responseText);
            }
            else {

                localStorage.entrance = '';
                location.href = '404.html';

            }
        }

    });
}
function loginmethod1(loginuser, mrno, password, name, multipleusers)
{
    debugger;
    var emrnames = [];
    var emrurls = [];
    var emruhids = [];
    var emrpasswords = [];
    if (loginuser == '') {
        document.getElementById("errormsg").innerHTML = "Please Enter URL";
        document.getElementById("url").focus();
        $('#url').css('border', '1px solid red');
        //  document.getElementById("url").style.borderColor="red";
        return;
    } else {
        $('#url').css('border', 'none');
    }

    if (mrno == '') {
        document.getElementById("errormsg").innerHTML = "Please enter mrno";
        document.getElementById("no").focus();
        $('#no').css('border', '1px solid red');
        return;
    } else {
        $('#no').css('border', 'none');
    }
    if (password == '') {
        document.getElementById("errormsg").innerHTML = "Please enter password";
        document.getElementById("pswrd").focus();
        $('#pswrd').css('border', '1px solid red');
        return;
    } else {
        $('#pswrd').css('border', 'none');
    }
    var isExist = false;
    debugger;
    var path = loginuser + "/formviewlogin?mrno=" + mrno + "&password=" + password + "&loginuser=" + loginuser + "&mobile=login";
    debugger;
    $.ajax({
        url: getHttp(path),
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            if (responseJson.length > 0) {
                debugger;
                //document.getElementById("progressing").style.display = "block";
                $("#pwd").val(responseJson[0]['PWD']);
                $("#mobile").val(responseJson[0]['MOB']);
                $("#hdnname").val(responseJson[0]['FNAME']);
                 if (name === "") {
                    name = localStorage.appname;
                }
                localStorage.appurl = getHttp(loginuser);
                localStorage.patmrno = mrno;
                localStorage.patpassword = password;
                 emrnames[0] = name;
                emrurls[0] = loginuser;
                emruhids[0] = mrno;
                emrpasswords[0] = password;
                if (localStorage.getItem("emrnames") === null) {
                    localStorage.setItem("emrnames", JSON.stringify(emrnames));
                    localStorage.setItem("emrurls", JSON.stringify(emrurls));
                    localStorage.setItem("emruhids", JSON.stringify(emruhids));
                    localStorage.setItem("emrpasswords", JSON.stringify(emrpasswords));
                } else {
                    var storedNames = JSON.parse(localStorage.getItem("emrnames"));
                    var storedUrls = JSON.parse(localStorage.getItem("emrurls"));
                    var storedUhids = JSON.parse(localStorage.getItem("emruhids"));
                    var storedPwds = JSON.parse(localStorage.getItem("emrpasswords"));
                    var i = 0;
                    var existedVal = -1;
                    for (i = 0; i < storedNames.length; i++) {
                        if (mrno !== storedUhids[i]) {
                            emrnames[i] = storedNames[i];
                            emrurls[i] = storedUrls[i];
                            emruhids[i] = storedUhids[i];
                            emrpasswords[i] = storedPwds[i];
                            isExist = false;
                        } else {
                            isExist = true;
                            existedVal = i;
                        }
                    }
                    if (multipleusers === "1") {
                        isExist = false;
                    }
                    if (!isExist) {
                        var emrsize = existedVal;
                        if (emrsize === -1) {
                            emrsize = emruhids.length;
                        }
                        emrnames[emrsize] = name;
                        emrurls[emrsize] = loginuser;
                        emruhids[emrsize] = mrno;
                        emrpasswords[emrsize] = password;
                    }
                    localStorage.setItem("emrnames", JSON.stringify(emrnames));
                    localStorage.setItem("emrurls", JSON.stringify(emrurls));
                    localStorage.setItem("emruhids", JSON.stringify(emruhids));
                    localStorage.setItem("emrpasswords", JSON.stringify(emrpasswords));

                }
                createdb("");
             } else {
                document.getElementById("errormsg").innerHTML = "The mrno or password you entered don't match";
                document.getElementById("progressing").style.display = "none";
            }
        },
        error: function (error) {
            if (error.statusText == "OK") {
                alert(error.responseText);
            }
            else {
                localStorage.entrance = '';
                location.href = '404.html';

            }
        }

    });

}
function patpopulateDB(tx)
{            debugger;   
               var patmrno=$("#hdnpatmrno").val();
     
      tx.executeSql('CREATE TABLE IF NOT EXISTS  PatSignUp(pid INTEGER PRIMARY KEY AUTOINCREMENT,patname TEXT,patmobile TEXT,patemail TEXT,patuid TEXT,patpwd TEXT,patlogintype TEXT ,patloginurl TEXT )');
      tx.executeSql('SELECT * FROM    PatSignUp WHERE patuid=?    ',[patmrno],patquerrySuccess,errorCB);
       
        debugger;
 
   }  
function createdb(pat)
{      debugger;
    //alert("createdb");
    if (pat=="1")
    {
        var db = window.openDatabase("Database","1.0", "SHIVAMDB", 200000);
         db.transaction(patpopulateDB,errorCB,successCB);
   
    }else{
        
          var db = window.openDatabase("Database","1.0", "SHIVAMDB", 200000);
    db.transaction(populateDB,errorCB,successCB);
     //db.transaction(populateDB,errorCB,successCB);
    }
} 


function errorCB(err)
{  debugger;
   //  alert("Error processing SQL"+err.code);
}

function successCB()
{  debugger;
   //  alert("Success!");
}
function populateDB(tx)
{            debugger;   
//  alert("populateDB");
      var hname =$('#name').val();
      var url = $("input[name=loginuser]").val();
      var uname = $("input[name=mrno]").val();
      var pwd =  $("input[name=password]").val();
//      debugger;
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS SignUp(id INTEGER PRIMARY KEY AUTOINCREMENT,hname TEXT,url TEXT,uname TEXT,pwd TEXT)');
        tx.executeSql('SELECT * FROM SignUp WHERE  hname =? and url=?   ',[hname,url],querrySuccess,errorCB);
       
        debugger;
 
   }  
   
 function patquerrySuccess(tx,results)
{  
    debugger;
                
                 var patpwd=$("#pwd").val()
                 var patname= $("#hdnname").val();
                 var patmob=$("#mobile").val();
                 var patmrno=$("#hdnpatmrno").val();
                 var patemail=$("#hdnpatemail").val();
                 var paturl= $("#hdnpaturl").val();
                 var patlogintype= $("#hdnpatlogintype").val();
       debugger;
       //patname TEXT,patmobile TEXT,patemail TEXT,patuid TEXT,patpwd TEXT,patlogintype
        var len=results.rows.length;
      
       if(len===0) {
          // alert("count of records"+len);
         tx.executeSql(
       'INSERT INTO patSignUp (patname,patmobile,patemail,patuid,patpwd,patlogintype,patloginurl) VALUES (?,?,?,?,?,?,?)', [
         patname,patmob,patemail,patmrno,patpwd,patlogintype,paturl
                ]); }
            location.href = 'PatientLoginThirdScreen.html';
}  
 function querrySuccess(tx,results)
{  
    debugger;
    //   var cnt= results.rows.item(0).mycount;
    //datainsert(tx,cnt);
    //alert("querrySuccess");
     var hname =$('#name').val();
       var url = $("input[name=loginuser]").val();
       var uname = $("input[name=mrno]").val();
       var pwd =  $("input[name=password]").val();
       debugger;
        var len=results.rows.length;
      
       if(len===0) {
          // alert("count of records"+len);
         tx.executeSql(
       'INSERT INTO SignUp (hname,url,uname,pwd) VALUES (?,?,?,?)', [
         hname,url,uname,pwd
                ]); }
            location.href = 'PatientLoginThirdScreen.html';
}  
function loginmahfh(loginuser, mrno, password, name, multipleusers, logintype)
{
    debugger;
    var emrnames = [];
    var emrurls = [];
    var emruhids = [];
    var emrpasswords = [];
    var emrlogintypes = [];
    var multinames = [];
    var multiurls = [];
    var multiuhids = [];
    var multipasswords = [];
    var multilogintypes = [];
    var msgvalid = "";
    var msgtextbox = "";
    var msgbutoon = "";
    if (logintype === "Mobile No") {
        msgvalid = "Moblie Number";
        msgtextbox = "mobile";
        msgbutoon = "btnMob";
    } else if (logintype === "Email") {
        msgvalid = "Email"
        msgtextbox = "email"
        msgbutoon = "btnEmail";
       $("#hdnpatemail").val(mrno);
    } else {
        msgvalid = "UHID/MR NO";
        msgtextbox = "mrno";
        msgbutoon = "btnMrno";
    }

    if (mrno == '') {
        $('.alert-warning').show('slow');
        $('#alert').html("Please enter " + msgvalid);
        $("input[name=" + msgtextbox + "]").css('border', '1px solid red');
        return;
    } else {
        $("input[name=" + msgtextbox + "]").css('border', 'none');
    }
    if (password == '') {
        $('.alert-warning').show('slow');
        $('#alert').html("Please enter Password");
        $("input[name=" + msgtextbox + "pwd]").css('border', '1px solid red');
        return
    }
    else {
        $("input[name=" + msgtextbox + "pwd]").css('border', 'none');
    }
    $("#hdnpatlogintype").val(logintype);
    $("#hdnpaturl").val(loginuser);
    var isExist = false;
    debugger;
    $("#" + msgbutoon).button('loading');
    $('.alert-warning').hide();
    var path = loginuser + "/formviewlogin?mrno=" + mrno + "&password=" + password + "&loginuser=" + loginuser + "&mobile=login&logintype=" + logintype;
    debugger;
    $.ajax({
        url: getHttp(path),
        type: "GET",
        dataType: "json",
        success: function (responseJson) {
            $("#" + msgbutoon).button('reset');
            for (var m = 0; m < responseJson.length; m++) {
                debugger;

                //document.getElementById("progressing").style.display = "block";
                $("#pwd").val(responseJson[m]['PWD']);
                $("#mobile").val(responseJson[m]['MOB']);
                $("#hdnname").val(responseJson[m]['FNAME']);
                $("#hdnpatmrno").val(responseJson[m]['USID']);
                
                   $("#hdnpaturl").val(loginuser);
                 $("#hdnpatlogintype").val(logintype);
                if (name === "") {
                    name = responseJson[m]['FNAME'];
                }
 
            }
            if (responseJson.length === 1) {
                 localStorage.patmrno=$("#hdnpatmrno").val();
                if( localStorage.getItem("appname") === 'myemr')
                {
                 createdb(2);
                }else{
                createdb(1);
            }
              
            } else if (responseJson.length > 1) {
                
                for (var m = 0; m < responseJson.length; m++) {
 
                 $("#pwd").val(responseJson[m]['PWD']);
                $("#mobile").val(responseJson[m]['MOB']);
                $("#hdnname").val(responseJson[m]['FNAME']);
                $("#hdnpatmrno").val(responseJson[m]['USID']);
                 $("#hdnpaturl").val(loginuser);
                 $("#hdnpatlogintype").val(logintype);
                  localStorage.patmrno=$("#hdnpatmrno").val();
                    createdb(1);
                }
       location.href = 'addusers1.html?users=' + responseJson.length + '&logintype=' + logintype;
            }
            else {
                $('.alert-warning').show('slow');
                $('#alert').html("The  " + msgvalid + " or password you entered don't match");
                $("#" + msgbutoon).button('reset');
            }
        },
        error: function (error) {
            $("#" + msgbutoon).button('reset');
            if (error.statusText == "OK") {
                alert(error.responseText);
            }
            else {
                localStorage.entrance = '';
                location.href = '404.html';

            }
        }

    });

}
function getHttp(path) {
                if(localStorage.isHttp == 1){
                  if (path.indexOf("http://") < 0) {
                    path = "http://" + path;
                }  
                }else{
                if (path.indexOf("https://") < 0) {
                    path = "https://" + path;
                }
            }
                return path;
            }
function showpwd() {
    if (document.getElementById('chkShowPwd').checked) {
        document.getElementById('pswrd').type = 'text';
    } else {
        document.getElementById('pswrd').type = 'password';
    }
}
$(document).ready(function () {
    formah();

});
function formah() {
    if (localStorage.mah === "1") {
        $('#appname').hide();
        $('#appurl').hide();
        $("input[name=loginuser]").val(localStorage.mahappurl);
    } else {
        $('#appname').show();
        $('#appurl').show();
    }
}
function maskMobile(mobile) {
    if (mobile != "") {
        mobile = "xxxxxx" + mobile.substring(mobile.length - 4, mobile.length);
    }
    return mobile;
}
function checkotp() {
    debugger;
    $(".otp").hide();
    var userotp = $('#otp').val();
   var genotp = $('#hdnotp').val();
       var mrno = $("input[name=mobile]").val();
       if(mrno===""){
           mrno = $("input[name=email]").val();
       }
       if(mrno===""){
            mrno = $("input[name=mrno]").val();
       }
       var loginuser = localStorage.appurl;
        var path = loginuser + "/formviewlogin?mrno=" + mrno + "&mobile=otpsmscheck&otp="+userotp;
        $.ajax({
            url: getHttp(path),
            type: "GET",
            success: function (responsetext) {
                if(responsetext==="1"){
                     $('#myModal-remarks').modal('hide');
                    $('#myModal-users').modal('show');
                }else{
                     $(".otp").show("slow")
                }
            },
            error: function (responsetext) {
                $(".otp").show("slow")
            }
        });
//    else {
//        $(".otp").show("slow")
//    }
}
function sendpwd(pwd, mobile, logintype) {
    debugger;
    var id = logintype + 'pwd';
    $("input[name=" + id + "]").val(pwd)
    $('#myModal-users').modal('hide');
    //var path = localStorage.appurl + "/formviewlogin?pwd=" + pwd + "&mobile=sendpwd&phone=" + mobile + "&logintype=" + logintype;
    loginmahfh(localStorage.appurl, mobile, pwd, "", "0", logintype);
}
//function sendpwd(pwd, mobile, logintype) {
//
//    var path = localStorage.appurl + "/formviewlogin?pwd=" + pwd + "&mobile=sendpwd&phone=" + mobile + "&logintype=" + logintype;
//    $.ajax({
//        url: getHttp(path),
//        type: "GET",
//        success: function (responseJson) {
//            $('#myModal-users').modal('hide');
//            alert(responseJson)
//        },
//        error: function (error) {
//
//            alert(error.responseText);
//
//        }
//    });
//}
function validOTP(otp) {
    try {
        var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');
        smsInboxPlugin.isSupported((function (supported) {
            if (supported)
                smsInboxPlugin.startReception(function (msg) {
//                    alert(msg.indexOf("Your Password is"));
                    if (msg.indexOf(otp) > 0) {                      
                        $("#otp").val(otp);
                        smsInboxPlugin.stopReception(function () {
                            checkotp();
                        }, function () {
                            alert("Error while stopping the SMS receiver");
                        });
                    }
                }, function () {
                    alert("Error while receiving messages");
                });
            else
                alert("SMS not supported");
        }), function () {
            alert("Error while checking the SMS support");
        });
    } catch (err) {
        alert(err);
    }
}

