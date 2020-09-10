/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var db;
$(document).ready(function () {
    localStorage.myehr = "1";
    db = window.openDatabase("Database", "1.0", "SHIVAMDB", 200000);
   if(localStorage.addconnection  === "1"){
       localStorage.removeItem("addconnection");
   }else{
       retrive();
   }
    
});
function retrive()
{
    debugger;
    
    db.transaction(queryDB, errorCB);
}
function loginmethod() {
    debugger;
    var loginname = $("input[name=loginname]").val();
    var loginuser = $("input[name=loginuser]").val();
    if (loginname.trim() === "") {
        $("input[name=loginname]").focus();
        alert("Enter Name");
        return;
    }

    if (loginuser.trim() === "") {
        $("input[name=loginuser]").focus();
        alert("Enter App Url");
        return;
    }
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
                insertData(loginname, getHttp(url));
            } else {
                insertData(loginname, getHttp(path));
            }
        },
        error: function (jqXHR, exception) {
            debugger;
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect to server.\n Verify Network or check url';
            } else if (jqXHR.status == 404) {
                msg = 'Server not found';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
            
        }


    });
}
function getHttp(path) {
    if(localStorage.isHttp == 1){
                  if (path.indexOf("http://") < 0) {
                    path = "http://" + path;
                }  
                }else{
                if (path.indexOf("http://") == -1) {
                    path = "http://" + path;
                }
            }
                return path;
            }
function queryDB(tx)
{
    debugger;
    tx.executeSql('CREATE TABLE IF NOT EXISTS SignUpServers(id INTEGER PRIMARY KEY AUTOINCREMENT,servername TEXT,url TEXT)');
    tx.executeSql('SELECT * FROM SignUpServers', [], querrySuccess, errorCB);

}
function errorCB(err)
{
    debugger;
    alert("Error processing SQL" + err.code +" message "+ err.message);
}
function  querrySuccess(tx, results) {
    var count = results.rows.length;
   
    if (count === 0) {
        return;
    } else if (count === 1) {
        var url = results.rows.item(0).url;
        var servername = results.rows.item(0).servername;
        localStorage.mahappurl = url;
        localStorage.mah = '1';
        localStorage.appname = "myemr";
        localStorage.appurl = url;
        localStorage.ipadrs = url;
        localStorage.newappath = url;
        localStorage.newapppage = "myehr.html";
        localStorage.apporginalname = servername;
        location.href = "connection.html";
    } else if (count > 1) {
        location.href = "addconnections.html";
    }
}
function insertData(servename, url) {
    db.transaction(function (transaction) {
        var executeQuery = "SELECT * FROM SignUpServers where servername = ?";
        transaction.executeSql(executeQuery, [servename], function (transaction, result) {
            if (result.rows.length === 0) {
                var executeQuery = "INSERT INTO SignUpServers (servername, url) VALUES (?,?)";
                transaction.executeSql(executeQuery, [servename, url]
                        , function (tx, result) {
                            localStorage.mahappurl = url;
                            localStorage.mah = '1';
                            localStorage.appname = "myemr";
                            localStorage.appurl = url;
                            localStorage.ipadrs = url;
                            localStorage.newappath = url;
                            localStorage.newapppage = "myehr.html";
                            localStorage.apporginalname = servename;
                            location.href = "connection.html";
                        },
                        function (error) {
                            alert('Error occurred');
                        });
//                        alert("inserted "+url );
            } else {
                localStorage.mahappurl = url;
                localStorage.mah = '1';
                localStorage.appname = "myemr";
                localStorage.appurl = url;
                localStorage.ipadrs = url;
                localStorage.newappath = url;
                localStorage.newapppage = "myehr.html";
                localStorage.apporginalname = servename;
                location.href = "connection.html";
            }
        }, function (error) {
            alert('Error occurred' + error);
        });

    });
}
