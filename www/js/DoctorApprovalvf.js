/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    debugger;
   var webformid=    localStorage.menubuttonformid ;
        var locid=localStorage.locid; 
        var userid=localStorage.userid; 
     document.getElementById('hdnformid').value=webformid;
        
         getlogindocid(webformid,locid,userid);
    
    
   
    
    
});

function getlogindocid(webformid,locid,userid){
     debugger;
//      localStorage.reg="5";
localStorage.consdocflg="0";
    $.get(localStorage.ipadrs + "/Approvemobresultsvf.jsp?type=dtls&userid=" + userid, function (responsejson) {
       if(responsejson.length>0){
         var res=responsejson.trim();
            var resp=res.split("|"); 
         localStorage.consdocid = resp[0];
         localStorage.consdocnm = resp[1];
        
          document.getElementById('consdocid').value=resp[0];
         document.getElementById('consdocnm').value=resp[1];
          if( resp[0]==""||resp[0]=="null"){
              localStorage.consdocflg="0";
             
         }else{
              localStorage.consdocflg="1";
         }
         loaddepts(webformid,locid,userid);
     }
    });        
} 
function Getcolumnnames(webformid,locid,userid){
     debugger;
      var res=" ";
//      alert("webf"+webformid);
     $.get(localStorage.ipadrs + "/Approvemobresultsvf.jsp?type=Getcolumnnames&userid="+userid+"&webformid="+webformid, function (responsejson) {
       debugger;
         if(responsejson.length>0){
          res=responsejson.trim();
          document.getElementById('gridcolnames').value=res.trim();
//                 var left = document.getElementById("bdiv_grid");
////                alert(left)
//                var height = window.innerHeight;
//                try {
//                    left.style.height = height - 180 + "px";
//                } catch (error) {
//                   // alert(error)
//                }
             filtercol(webformid,locid,userid);
     }
     
    });  
    
}
function loaddepts(webformid,locid,userid) {
       debugger;
     
    $.get(localStorage.ipadrs + "/Approvemobresultsvf.jsp?type=depts&locid="+locid+"&webformid="+webformid+"&userid="+userid, function (responsejson) {
        var dropdown = $('#ddlDepts');
        debugger;
        for (var i = 0; i < responsejson.length; i++) {
            var option = $('<option value=' + responsejson[i]['KEY_ID'] + '>' + responsejson[i]['VALUE_ID'] + '</option>');
            option.appendTo(dropdown);
        }
        loadFarwarddoctors(webformid,locid,userid);
    });
}
function loadappdoctors(webformid,locid,userid) {
            debugger;
         var    consdocid=localStorage.consdocid;
         var consdocnm=localStorage.consdocnm;
    var reg=localStorage.reg;
    var consdocflg=localStorage.consdocflg;
    $.get(localStorage.ipadrs + "/Approvemobresultsvf.jsp?type=doctorsign&locid="+locid+"&reg="+reg+"&consdocnm="+consdocnm+"&consdocid="+consdocid+"&webformid="+webformid+"&userid=" +userid, function (responsejson) {
        var dropdown = $('#ddlDoctorsign');
        debugger;
        for (var i = 0; i < responsejson.length; i++) {
            var option = $('<option value=' + responsejson[i]['KEY_ID'] + '>' + responsejson[i]['VALUE_ID'] + '</option>');
            option.appendTo(dropdown);
        }
        filldoctor(webformid,locid,userid);
    });
}
function loadFarwarddoctors(webformid,locid,userid) {
     debugger;
    $.get(localStorage.ipadrs + "/Approvemobresultsvf.jsp?type=farwarddoctors&locid="+locid+"&webformid="+webformid+"&userid=" +userid, function (responsejson) {
        var dropdown = $('#ddldoctors');
        debugger;
        for (var i = 0; i < responsejson.length; i++) {
            var option = $('<option value=' + responsejson[i]['DOCID'] + '>' + responsejson[i]['DOCTORNM'] + '</option>');
            option.appendTo(dropdown);
        }
         loadappdoctors(webformid,locid,userid);
    });
}
function loadothers(webformid,locid,userid) {
    
    $.get(localStorage.ipadrs + "/Approvemobresultsvf.jsp?type=others&locid="+locid+"&webformid="+webformid+"&userid=" +userid, function (responsejson) {
        var dropdown = $('#ddlothers');
        debugger;
        for (var i = 0; i < responsejson.length; i++) {
            var option = $('<option value=' + responsejson[i]['KEY_ID'] + '>' + responsejson[i]['VALUE_ID'] + '</option>');
            option.appendTo(dropdown);
        }
//        alert("web"+webformid);
        Getcolumnnames(webformid,locid,userid);
    });
    
}
 function  filldoctor(webformid,locid,userid){
             debugger;
          var docid =   localStorage.consdocid;
         var regular= localStorage.reg;
          var consdocflg=localStorage.consdocflg;
          if(regular=="5" || consdocflg=="0" ){
         
      }else if(regular=="5" || consdocflg=="1" ||(docid!=""||docid!="null")){
           document.getElementById('ddlDoctorsign').value=docid;
      }else if(regular=="2"){          
           document.getElementById('ddlDoctorsign').value=docid;
      }else{
          
      }
                  loadothers(webformid,locid,userid);
        }
 
  function columnsData(Data){
            debugger;
            var str = "";var hiden = 'false';var width="";
           
            for (var i = 0; i < Data.length; i++) {
                 hiden='false';
                  width='40'
             if ((Data[i].indexOf("_HIDDEN")>0) ||Data[i]=="SAMPLECOL"||Data[i]=="WORDTEST"||Data[i]=="PDF"||Data[i]=="MACHINE"||Data[i]=="ATTACHMENT"||Data[i]=="TYPE"||Data[i]=="FORMID"){
                 hiden='true';
                 width='5'
                 }
//                 if((Data[i].indexOf("_SIZE")>0)||Data[i]=="PATIENTNM" || Data[i]=="TESTNM")
//                   {
//                     str =  str+","+"{name:'" + Data[i].replace("_SIZE","") + "' , index:'" + Data[i].replace("_SIZE","") + "', sortable: false,width:'100', hidden:"+hiden+"}" ;  
//                   }
               if((Data[i].indexOf("STATUS")!=-1)){
                  
                 str = str+","+"{name:'" + Data[i].replace("_SIZE40","").replace("_SIZE50","").replace("_SIZE60","").replace("_SIZE70","").replace("_SIZE80","").replace("_SIZE90","").replace("_SIZE100","").replace("_SIZE10","").replace("_SIZE110","").replace("_SIZE120","").replace("_SIZE130","").replace("_SIZE140","").replace("_SIZE150","").replace("_SIZE160","").replace("_SIZE170","").replace("_SIZE180","").replace("_SIZE190","").replace("_SIZE200","").replace("_SIZE210","").replace("_SIZE220","").replace("_SIZE230","").replace("_SIZE240","").replace("_SIZE250","").replace("_SIZE260","").replace("_SIZE270","").replace("_SIZE280","").replace("_SIZE290","").replace("_SIZE300","").replace("_SIZE310","").replace("_SIZE320","").replace("_SIZE330","").replace("_SIZE340","").replace("_SIZE350","").replace("_SIZE20","").replace("_SIZE30","").replace("_SIZE","").replace("_HIDDEN","") + "', sortable: false,width:'70', hidden:"+hiden+"}" ;   
              }
              else if((Data[i].indexOf("_SIZE100")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE100","") + "' , index:'" + Data[i].replace("_SIZE100","") + "', sortable: false,width:'100', hidden:"+hiden+"}" ;  
                   }
                   else if((Data[i].indexOf("_SIZE40")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE40","") + "' , index:'" + Data[i].replace("_SIZE40","") + "', sortable: false,width:'40', hidden:"+hiden+"}" ;  
                   }
                 else if((Data[i].indexOf("_SIZE50")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE50","") + "' , index:'" + Data[i].replace("_SIZE50","") + "', sortable: false,width:'50', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE60")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE60","") + "' , index:'" + Data[i].replace("_SIZE60","") + "', sortable: false,width:'60', hidden:"+hiden+"}" ;  
                   }
                   else if((Data[i].indexOf("_SIZE70")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE70","") + "' , index:'" + Data[i].replace("_SIZE70","") + "', sortable: false,width:'70', hidden:"+hiden+"}" ;  
                   }
                  else if((Data[i].indexOf("_SIZE80")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE80","") + "' , index:'" + Data[i].replace("_SIZE80","") + "', sortable: false,width:'80', hidden:"+hiden+"}" ;  
                   }
                   else if((Data[i].indexOf("_SIZE90")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE90","") + "' , index:'" + Data[i].replace("_SIZE90","") + "', sortable: false,width:'90', hidden:"+hiden+"}" ;  
                   }
                 else if((Data[i].indexOf("_SIZE110")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE110","") + "' , index:'" + Data[i].replace("_SIZE110","") + "', sortable: false,width:'110', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE120")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE120","") + "' , index:'" + Data[i].replace("_SIZE120","") + "', sortable: false,width:'120', hidden:"+hiden+"}" ;  
                   }
                   else if((Data[i].indexOf("_SIZE10")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE10","") + "' , index:'" + Data[i].replace("_SIZE10","") + "', sortable: false,width:'10', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE130")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE130","") + "' , index:'" + Data[i].replace("_SIZE130","") + "', sortable: false,width:'130', hidden:"+hiden+"}" ;  
                   }
                      else if((Data[i].indexOf("_SIZE140")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE140","") + "' , index:'" + Data[i].replace("_SIZE140","") + "', sortable: false,width:'140', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE150")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE150","") + "' , index:'" + Data[i].replace("_SIZE150","") + "', sortable: false,width:'150', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE160")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE160","") + "' , index:'" + Data[i].replace("_SIZE160","") + "', sortable: false,width:'160', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE170")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE170","") + "' , index:'" + Data[i].replace("_SIZE170","") + "', sortable: false,width:'170', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE180")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE180","") + "' , index:'" + Data[i].replace("_SIZE180","") + "', sortable: false,width:'180', hidden:"+hiden+"}" ;  
                   }
                      else if((Data[i].indexOf("_SIZE190")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE190","") + "' , index:'" + Data[i].replace("_SIZE190","") + "', sortable: false,width:'190', hidden:"+hiden+"}" ;  
                   }
                      else if((Data[i].indexOf("_SIZE200")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE200","") + "' , index:'" + Data[i].replace("_SIZE200","") + "', sortable: false,width:'200', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE210")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE210","") + "' , index:'" + Data[i].replace("_SIZE210","") + "', sortable: false,width:'210', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE220")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE220","") + "' , index:'" + Data[i].replace("_SIZE220","") + "', sortable: false,width:'220', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE230")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE230","") + "' , index:'" + Data[i].replace("_SIZE230","") + "', sortable: false,width:'230', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE240")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE240","") + "' , index:'" + Data[i].replace("_SIZE240","") + "', sortable: false,width:'240', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE250")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE250","") + "' , index:'" + Data[i].replace("_SIZE250","") + "', sortable: false,width:'250', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE260")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE260","") + "' , index:'" + Data[i].replace("_SIZE260","") + "', sortable: false,width:'260', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE270")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE270","") + "' , index:'" + Data[i].replace("_SIZE270","") + "', sortable: false,width:'270', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE280")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE280","") + "' , index:'" + Data[i].replace("_SIZE280","") + "', sortable: false,width:'280', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE290")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE290","") + "' , index:'" + Data[i].replace("_SIZE290","") + "', sortable: false,width:'290', hidden:"+hiden+"}" ;  
                   }
                   else if((Data[i].indexOf("_SIZE300")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE300","") + "' , index:'" + Data[i].replace("_SIZE300","") + "', sortable: false,width:'300', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE310")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE310","") + "' , index:'" + Data[i].replace("_SIZE310","") + "', sortable: false,width:'310', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE320")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE320","") + "' , index:'" + Data[i].replace("_SIZE320","") + "', sortable: false,width:'320', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE330")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE330","") + "' , index:'" + Data[i].replace("_SIZE330","") + "', sortable: false,width:'330', hidden:"+hiden+"}" ;  
                   }
                     else if((Data[i].indexOf("_SIZE340")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE340","") + "' , index:'" + Data[i].replace("_SIZE340","") + "', sortable: false,width:'340', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE350")>0) )
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE350","") + "' , index:'" + Data[i].replace("_SIZE350","") + "', sortable: false,width:'350', hidden:"+hiden+"}" ;  
                   }
                   
                   else if((Data[i].indexOf("_SIZE30")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE30","") + "' , index:'" + Data[i].replace("_SIZE30","") + "', sortable: false,width:'30', hidden:"+hiden+"}" ;  
                   }
                   else if((Data[i].indexOf("_SIZE20")>0))
                   {
                     str =  str+","+"{name:'" + Data[i].replace("_SIZE20","") + "' , index:'" + Data[i].replace("_SIZE20","") + "', sortable: false,width:'20', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i].indexOf("_SIZE")>0))
                   {
                     str =  str+","+"{name:'" +  Data[i].replace("_SIZE","") + "' , index:'" + Data[i].replace("_SIZE","") + "', sortable: false,width:'100', hidden:"+hiden+"}" ;  
                   }
                    else if((Data[i]=="PATIENTNM" || Data[i]=="TESTNM"))
                   {
                     str =  str+","+"{name:'" + Data[i] + "' , index:'" + Data[i] + "', sortable: false,width:'100', hidden:"+hiden+"}" ;  
                   }
 
                   else{
                     str =  str+","+"{name:'" + Data[i].replace("_HIDDEN","") + "',  index:'" + Data[i].replace("_HIDDEN","") + "', sortable: false,width:"+width+", hidden:"+hiden+"}" ;
            }
 
            }
          str = str.substr(1,str.length-1);      
                      
            return  str;
        }
//        function columnsData(Data){
//            debugger;
//            var str = "";var hiden = 'false';var width="";
//           
//            for (var i = 0; i < Data.length; i++) {
//                 hiden='false';
//                  width='40'
//             if ((Data[i].indexOf("_HIDDEN")>0) ||Data[i]=="SAMPLECOL"||Data[i]=="WORDTEST"||Data[i]=="PDF"||Data[i]=="MACHINE"||Data[i]=="ATTACHMENT"||Data[i]=="TYPE"||Data[i]=="FORMID"){
//                 hiden='true';
//                 width='5'
//                 }
////                 if((Data[i].indexOf("_SIZE")>0)||Data[i]=="PATIENTNM" || Data[i]=="TESTNM")
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE","") + "' , index:'" + Data[i].replace("_SIZE","") + "', sortable: false,width:'100', hidden:"+hiden+"}" ;  
////                   }
////              if((Data[i].indexOf("STATUS")!=-1)){
////                  
////                 str = str+","+"{name:'" + Data[i].replace("_SIZE20","").replace("_SIZE30","").replace("_SIZE40","").replace("_SIZE50","").replace("_SIZE60","").replace("_SIZE70","").replace("_SIZE80","").replace("_SIZE90","").replace("_SIZE100","").replace("_SIZE10","").replace("_HIDDEN","") + "',  index:'" + Data[i].replace("_SIZE20","").replace("_SIZE30","").replace("_SIZE40","").replace("_SIZE50","").replace("_SIZE60","").replace("_SIZE70","").replace("_SIZE80","").replace("_SIZE90","").replace("_SIZE100","").replace("_SIZE10","").replace("_HIDDEN","") + "', sortable: false,width:"+width+", hidden:"+hiden+"}" ;   
////              }
////                 else 
////                     if((Data[i].indexOf("_SIZE100")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE100","") + "' , index:'" + Data[i].replace("_SIZE100","") + "', sortable: false,width:'100', hidden:"+hiden+"}" ;  
////                   }
////                   else if((Data[i].indexOf("_SIZE40")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE40","") + "' , index:'" + Data[i].replace("_SIZE40","") + "', sortable: false,width:'40', hidden:"+hiden+"}" ;  
////                   }
////                 else if((Data[i].indexOf("_SIZE50")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE50","") + "' , index:'" + Data[i].replace("_SIZE50","") + "', sortable: false,width:'50', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE60")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE60","") + "' , index:'" + Data[i].replace("_SIZE60","") + "', sortable: false,width:'60', hidden:"+hiden+"}" ;  
////                   }
////                   else if((Data[i].indexOf("_SIZE70")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE70","") + "' , index:'" + Data[i].replace("_SIZE70","") + "', sortable: false,width:'70', hidden:"+hiden+"}" ;  
////                   }
////                  else if((Data[i].indexOf("_SIZE80")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE80","") + "' , index:'" + Data[i].replace("_SIZE80","") + "', sortable: false,width:'80', hidden:"+hiden+"}" ;  
////                   }
////                   else if((Data[i].indexOf("_SIZE90")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE90","") + "' , index:'" + Data[i].replace("_SIZE90","") + "', sortable: false,width:'90', hidden:"+hiden+"}" ;  
////                   }
////                 else if((Data[i].indexOf("_SIZE110")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE110","") + "' , index:'" + Data[i].replace("_SIZE110","") + "', sortable: false,width:'110', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE120")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE120","") + "' , index:'" + Data[i].replace("_SIZE120","") + "', sortable: false,width:'120', hidden:"+hiden+"}" ;  
////                   }
////                   else if((Data[i].indexOf("_SIZE10")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE10","") + "' , index:'" + Data[i].replace("_SIZE10","") + "', sortable: false,width:'10', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE130")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE130","") + "' , index:'" + Data[i].replace("_SIZE130","") + "', sortable: false,width:'130', hidden:"+hiden+"}" ;  
////                   }
////                      else if((Data[i].indexOf("_SIZE140")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE140","") + "' , index:'" + Data[i].replace("_SIZE140","") + "', sortable: false,width:'140', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE150")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE150","") + "' , index:'" + Data[i].replace("_SIZE150","") + "', sortable: false,width:'150', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE160")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE160","") + "' , index:'" + Data[i].replace("_SIZE160","") + "', sortable: false,width:'160', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE170")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE170","") + "' , index:'" + Data[i].replace("_SIZE170","") + "', sortable: false,width:'170', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE180")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE180","") + "' , index:'" + Data[i].replace("_SIZE180","") + "', sortable: false,width:'180', hidden:"+hiden+"}" ;  
////                   }
////                      else if((Data[i].indexOf("_SIZE190")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE190","") + "' , index:'" + Data[i].replace("_SIZE190","") + "', sortable: false,width:'190', hidden:"+hiden+"}" ;  
////                   }
////                      else if((Data[i].indexOf("_SIZE200")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE200","") + "' , index:'" + Data[i].replace("_SIZE200","") + "', sortable: false,width:'200', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE210")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE210","") + "' , index:'" + Data[i].replace("_SIZE210","") + "', sortable: false,width:'210', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE220")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE220","") + "' , index:'" + Data[i].replace("_SIZE220","") + "', sortable: false,width:'220', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE230")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE230","") + "' , index:'" + Data[i].replace("_SIZE230","") + "', sortable: false,width:'230', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE240")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE240","") + "' , index:'" + Data[i].replace("_SIZE240","") + "', sortable: false,width:'240', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE250")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE250","") + "' , index:'" + Data[i].replace("_SIZE250","") + "', sortable: false,width:'250', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE260")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE260","") + "' , index:'" + Data[i].replace("_SIZE260","") + "', sortable: false,width:'260', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE270")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE270","") + "' , index:'" + Data[i].replace("_SIZE270","") + "', sortable: false,width:'270', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE280")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE280","") + "' , index:'" + Data[i].replace("_SIZE280","") + "', sortable: false,width:'280', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE290")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE290","") + "' , index:'" + Data[i].replace("_SIZE290","") + "', sortable: false,width:'290', hidden:"+hiden+"}" ;  
////                   }
////                   else if((Data[i].indexOf("_SIZE300")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE300","") + "' , index:'" + Data[i].replace("_SIZE300","") + "', sortable: false,width:'300', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE310")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE310","") + "' , index:'" + Data[i].replace("_SIZE310","") + "', sortable: false,width:'310', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE320")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE320","") + "' , index:'" + Data[i].replace("_SIZE320","") + "', sortable: false,width:'320', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE330")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE330","") + "' , index:'" + Data[i].replace("_SIZE330","") + "', sortable: false,width:'330', hidden:"+hiden+"}" ;  
////                   }
////                     else if((Data[i].indexOf("_SIZE340")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE340","") + "' , index:'" + Data[i].replace("_SIZE340","") + "', sortable: false,width:'340', hidden:"+hiden+"}" ;  
////                   }
////                    else if((Data[i].indexOf("_SIZE350")>0) )
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE350","") + "' , index:'" + Data[i].replace("_SIZE350","") + "', sortable: false,width:'350', hidden:"+hiden+"}" ;  
////                   }
////                   
////                   else if((Data[i].indexOf("_SIZE30")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE30","") + "' , index:'" + Data[i].replace("_SIZE30","") + "', sortable: false,width:'30', hidden:"+hiden+"}" ;  
////                   }
////                   else if((Data[i].indexOf("_SIZE20")>0))
////                   {
////                     str =  str+","+"{name:'" + Data[i].replace("_SIZE20","") + "' , index:'" + Data[i].replace("_SIZE20","") + "', sortable: false,width:'20', hidden:"+hiden+"}" ;  
////                   }
//                   
//                    if((Data[i]=="PATIENTNM" || Data[i]=="TESTNM"))
//                   {
//                     str =  str+","+"{name:'" + Data[i] + "' , index:'" + Data[i] + "', sortable: false,width:'100', hidden:"+hiden+"}" ;  
//                   }
//                    else
//                   {
//                     str =  str+","+"{name:'" +  Data[i].replace("_SIZE40","").replace("_SIZE50","").replace("_SIZE60","").replace("_SIZE70","").replace("_SIZE80","").replace("_SIZE90","").replace("_SIZE100","").replace("_SIZE10","").replace("_SIZE110","").replace("_SIZE120","").replace("_SIZE130","").replace("_SIZE140","").replace("_SIZE150","").replace("_SIZE160","").replace("_SIZE170","").replace("_SIZE180","").replace("_SIZE190","").replace("_SIZE200","").replace("_SIZE210","").replace("_SIZE220","").replace("_SIZE230","").replace("_SIZE240","").replace("_SIZE250","").replace("_SIZE260","").replace("_SIZE270","").replace("_SIZE280","").replace("_SIZE290","").replace("_SIZE300","").replace("_SIZE310","").replace("_SIZE320","").replace("_SIZE330","").replace("_SIZE340","").replace("_SIZE350","").replace("_SIZE20","").replace("_SIZE30","").replace("_SIZE","")  + "' , index:'" + Data[i].replace("_SIZE40","").replace("_SIZE50","").replace("_SIZE60","").replace("_SIZE70","").replace("_SIZE80","").replace("_SIZE90","").replace("_SIZE100","").replace("_SIZE10","").replace("_SIZE110","").replace("_SIZE120","").replace("_SIZE130","").replace("_SIZE140","").replace("_SIZE150","").replace("_SIZE160","").replace("_SIZE170","").replace("_SIZE180","").replace("_SIZE190","").replace("_SIZE200","").replace("_SIZE210","").replace("_SIZE220","").replace("_SIZE230","").replace("_SIZE240","").replace("_SIZE250","").replace("_SIZE260","").replace("_SIZE270","").replace("_SIZE280","").replace("_SIZE290","").replace("_SIZE300","").replace("_SIZE310","").replace("_SIZE320","").replace("_SIZE330","").replace("_SIZE340","").replace("_SIZE350","").replace("_SIZE20","").replace("_SIZE30","").replace("_SIZE","") + "', sortable: false,width:"+width+", hidden:"+hiden+"}" ;  
//                   }
////                
////                   else{
////                     str =  str+","+"{name:'" + Data[i].replace("_HIDDEN","") + "',  index:'" + Data[i].replace("_HIDDEN","") + "', sortable: false,width:"+width+", hidden:"+hiden+"}" ;
////            }
// 
//            }
////            str = str.substr(1,str.length-1);
//          str = str.substr(1,str.length-1);      
//            return  str;
//        }
function loadgrid() {
//    alert("loadgrid for all,app,un approve");
    localStorage.filter="0";
    location.filterback="0";
    document.getElementById('ddlfileterdata').value = '-Select-';
    $('#grid').trigger("reloadGrid");
}
function go()
{   
    $('#grid').trigger("reloadGrid");
}
function  _exit() {
    localStorage.filterback="0";
    location.href = 'dashboardmenu.html';
}
function settings() {
    location.href = 'settings.html';
}
function Forwarddoctor(thi) {
    debugger;
    var id1 = thi.id.split(",!");
    $("#reqid2").val(id1[1]);
    $("#testid2").val(id1[2]);
    $('#ddldoctors').val("0");
    $("#mydiv2").show();
}
function forwardresult(id)
{
    debugger;
    $('#divProcess').show();
    var testid1 = $("#testid2").val();
    var reqid1 = $("#reqid2").val();
    var docid1 = $('#ddlDoctorsign').val();
    var fordocid =$('#ddldoctors').val();
     if(docid1=="0"){
      $('#lbmsg').show();
      $('#divProcess').hide();
      return;
    }
      
        var locid=localStorage.locid; 
        var userid=localStorage.userid; 
      var webformid = localStorage.menubuttonformid ;
//    
//            var testid1=$("#testid2").val();
//            var reqid1=$("#reqid2").val();
//            var reqid1=$("#reqid2").val();
//            //var docid1=document.getElementById('docid').value;
//             var docid1 = document.getElementById('ddldoctorsign').value.trim();
//            var fordocid=document.getElementById("txt_Drname").name;
//            var path="../ApproveResutlsviewvf?reqid1="+reqid1+"&webformid="+webformid+"&testid1="+testid1+"&fordocid="+fordocid+"&docid1="+docid1+"&saveFwd=1";
    var path = localStorage.ipadrs +"/ApproveResutlsviewvf?reqid1=" + reqid1 + "&mobile=1&locid=" + locid + "&testid1=" + testid1 + "&webformid="+webformid+"&fordocid=" + fordocid + "&docid1=" + docid1 + "&saveFwd=1&usernm="+localStorage.usernm+"&userid="+localStorage.userid;
    $.get(path, function (response) {
        debugger;
        $('#divProcess').hide();
        var res = response;
        var r = res.split("$$");
        if (r[0] == "1")
        {   
            $("#mydiv2").hide();
            alert("This Test is Already Approved by " + r[1] + "");
            return;
        }
        else if (r[0] == "2")
        {
            $("#mydiv2").hide();
            alert("Record Saved Successfully");
            $("#mydoctor").hide();
            return;
        }
        else {
            $("#mydiv2").hide();
            alert(res);
        }
    });
}
function docselect(docid){
    if(docid=="0"){
        $('#lbmsg').show();
    }else{
        $('#lbmsg').hide();
    }
}
