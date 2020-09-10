//function saveConfig()
//{
//    debugger;
//     
//        var db = window.openDatabase("Database", "1.0", "SHIVAMDB", 200000);
////        db.transaction(patpopulateDB, errorCB, successCB);
//   db.transaction(function(tx){
//                        tx.executeSql('CREATE TABLE IF NOT EXISTS  defaultConfig(pid INTEGER PRIMARY KEY AUTOINCREMENT,dhospname TEXT,dipadd TEXT,dport TEXT,dhostnm TEXT)');
//                        excuteqry(tx);
//                    }, errorCB, successCB);
//}
$(document).ready(function () {
popdefault() 
   statusbar();
});

function  popdefault(){ 
     debugger;
        var db = window.openDatabase("Database", "1.0", "SHIVAMDB", 200000);
        db.transaction(populatedefault, errorCB1, successCB1);
statusbar();
     
}
function populatedefault(tx){
     debugger;
  tx.executeSql('CREATE TABLE IF NOT EXISTS  defaultConfig(pid INTEGER PRIMARY KEY AUTOINCREMENT,dhospname TEXT,dipadd TEXT,dport TEXT,dhostnm TEXT)');
  tx.executeSql('SELECT * FROM    defaultConfig  ', [], dquerrySuccess, derrorCB);
    statusbar();
}
function dquerrySuccess(tx, results){
    debugger;
    var dhosp,dipadd,dport,dhost="";
    var len = results.rows.length;
    if(len>0){
                            dhosp = results.rows.item(0).dhospname;
                            dipadd = results.rows.item(0).dipadd;
                            dport= results.rows.item(0).dport;
                            dhost = results.rows.item(0).dhostnm;
			}
    $("#txthospnm").val(dhosp);
    $("#txtipadd").val(dipadd);
    $("#txtportno").val(dport);
    $("#txthostname").val(dhost);
    statusbar();
}
function derrorCB(){
     
}
function  errorCB1(){}
function successCB1(){}
function excuteqry(tx){
    debugger
       
      var hospnm = $("#txthospnm").val();
    var dipadd = $("#txtipadd").val();
    var dport = $("#txtportno").val();
    var dhostnm = $("#txthostname").val();
       tx.executeSql('INSERT INTO defaultConfig(dhospname,dipadd,dport,dhostnm) VALUES (?,?,?,?)', [
                                            hospnm, dipadd,dport, dhostnm,
                         ]); 
		       }
function errorCB(err)
{
    debugger;
    //  alert("Error processing SQL"+err.code);
}

function successCB()
{
    debugger;
        alert("Record Saved Successfully");
}
  
  function settings() {
    location.href = 'settings.html';
}
function logout() {
    debugger;
    location.href = 'Entrence.html';
}


//--
function createdbdefault()
{
    debugger;
   
        var db = window.openDatabase("Database", "1.0", "SHIVAMDB", 200000);
        db.transaction(patpopulateDB, errorCB, successCB);

     
}



function patpopulateDB(tx)
{
    debugger;
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS  defaultConfig(pid INTEGER PRIMARY KEY AUTOINCREMENT,dhospname TEXT,dipadd TEXT,dport TEXT,dhostnm TEXT)');
    tx.executeSql('SELECT * FROM    defaultConfig  ', [], patquerrySuccess, errorCB);

    debugger;

}


function patquerrySuccess(tx, results)
{
    debugger;

    var hospnm = $("#txthospnm").val();
    var dipadd = $("#txtipadd").val();
    var dport = $("#txtportno").val();
    var dhostnm = $("#txthostname").val();
    debugger;
   var len = results.rows.length;
   if (len === 0) {
	tx.executeSql('INSERT INTO defaultConfig(dhospname,dipadd,dport,dhostnm) VALUES (?,?,?,?)', [
                                            hospnm, dipadd,dport, dhostnm,
                         ]); 
     
    }else{
	
	   var query = "DELETE FROM defaultConfig";
               tx.executeSql(query, [] );      
                  excuteqry(tx);
	
    }
       
} 