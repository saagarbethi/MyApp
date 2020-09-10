/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function fillDisTemplates() {
    debugger;
    $('#mydiv').show();
    var formid = localStorage.webformid;
    var mrno = localStorage.mrno;
    var docid = localStorage.docid;
    $.get(localStorage.ipadrs + 'admin/disTemplateViewMobile.jsp?webformid=' + formid + '&mrno=' + mrno + '&docid=' + docid, function (responseText) {
        $('#divFrame').html(responseText);
        loadHeader();
        loadGenid();
    })
}
function loadHeader() {
    var webid = localStorage.webformid;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=fill&webid=' + webid, function (responcejson) {
        if (responcejson != null && responcejson != "") {
            try {
                if (responcejson.indexOf("-->") >= 0) {
                    var finalstr = responcejson.split("-->");
                    for (var i = 0; i < finalstr.length; i++) {
                        var fin = finalstr[i].split("@");
                        if (fin != "") {
                            document.getElementById(fin[1]).value = document.getElementById(fin[2]).value;
                        }
                    }
                }
            } catch (err) {
                $('#mydiv').hide();
            }
        } else {
            $('#mydiv').hide();
        }
    });
}
function showDetails(id){
                debugger;
                var finaldata="";
                var hdntbl=document.getElementById("hdntbl").value;
                var tbl=hdntbl.split("@");
                for(var k=1;k<tbl.length;k++){
                    var oTable = document.getElementById(tbl[k]);
                    var checkboxs=oTable.getElementsByTagName('input');
                    var idstring="";
                    //                
                    //               
                    for (var i = 0; i < checkboxs.length; i++) {
                        if(checkboxs[i].checked==true)
                        {
                     
                            var Templetedate = checkboxs[i].id; 
                            idstring="'"+Templetedate+"'" +','+idstring;
              
                        }
                    }
                    if(idstring.indexOf(",")>0){
                        idstring=idstring.substring(0,idstring.length-1);
                    }
                    idstring=tbl[k]+"--> "+idstring;
                    finaldata=finaldata+""+idstring+"@";
                }
                //                var tabid=id.parentNode.parentNode.parentNode.parentNode.id;
                
                
                var nextgid=id.parentNode.parentNode.parentNode.parentNode.title;
                
              
            
                var webid=localStorage.webformid;
            
            
                $.get(localStorage.ipadrs +'/DisTemplateView?type=fillgrid&webid='+webid+'&idstring='+idstring+'&finaldata='+finaldata+'&nextgid='+nextgid,function(responcejson){
                    if(responcejson!=null && responcejson!=""){
                        debugger;
                        if(nextgid=="finaltable"){
                            
                            var nxttab=document.getElementById(nextgid);
                            
                            var data="";
                            var celllength=nxttab.rows[0].cells.length;
                            var cols="";
                            for(var j=3;j<celllength;j++){
                                var lbl=nxttab.rows[0].cells[j].textContent;
                                lbl="id_"+lbl;
                                //                      lbl=lbl.replace(" ","_");
                                lbl=lbl.split(" ").join("_");
                                cols=cols+"@"+lbl+"-->"+nxttab.rows[0].cells[j].title;
                            }
//                  alert(cols);
                            $('#finaltable').find("tr:gt(0)").remove();
                            if(responcejson.length>0){
                            nxttab.rows[0].cells[0].childNodes[0].style.display="none";
                            for(var k=0;k<responcejson.length;k++){
                                var cmblbl="";
                                if(k==responcejson.length-1){
                                     data="<tr><td height='20'><input type='button' value='Add' onclick='addToGrid(this)' class='btn btn-success'></td><td>"+(k+1)+"</td>";
                                }
                                else{
                                     data="<tr><td height='20'><input type='button' value='Add' onclick='addToGrid()' class='btn btn-success' style='display:none'></td><td>"+(k+1)+"</td>";
                                }
                               
                                 data=data+"<td style='padding:0px;' align='center'><input type='checkbox' checked='true' style='cursor:pointer;width:auto;' class='btn2'></td>";
                                var cl=cols.split("@");
                                for(var l=1;l<cl.length;l++){
                                    var cl2=cl[l].split("-->");
                                    if(cl2[1].indexOf("combo")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td><select id='"+cl2[0]+"_"+k+"'>"+document.getElementById(cl2[0]).innerHTML+"</select></td>";
                                        cmblbl=cmblbl+"-->"+cl2[0]+"_"+k+"@"+responcejson[k][cl1];
                                    }
                                    else if(cl2[1].indexOf("text")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                    data=data+"<td><input type='text' style='width:98%' value='"+responcejson[k][cl1]+"'></td>";  
                                    }
                                    else if(cl2[1].indexOf("searchmain")>=0){
                                    var cl1=cl2[0].toUpperCase();
                                    data=data+"<td>"+responcejson[k][cl1]+"</td>";    
                                    }
                                    else if(cl2[1].indexOf("searchhdn")>=0){
                                    var cl1=cl2[0].toUpperCase();
                                    data=data+"<td style='display:none'>"+responcejson[k][cl1]+"</td>";    
                                    }
                                }
//                                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td>";
//                                    data=data+"<td style='padding:0px;' align='center'><input type='checkbox' checked='true' style='cursor:pointer;width:auto;' class='btn2'></td>";
                                data=data+"</tr>";
                                data=$(data);
                                data.appendTo(nxttab);
                                var cmblbl1=cmblbl.split("-->");
                                for(var n=1;n<cmblbl1.length;n++){
                                    var cmb=cmblbl1[n].split("@");
                                    document.getElementById(cmb[0]).value=cmb[1];
                                }
                                
                            }
                        }
                        debugger;
                        if(nxttab.rows.length>1){
                                document.getElementById("save").style.display="block";
                                document.getElementById("btnprec").style.display="block";
                            }
                            else{
                                document.getElementById("save").style.display="none";
                                document.getElementById("btnprec").style.display="none"; 
                            }
                        }
                        else if(nextgid=="textbox"){
                       var defualt="";
                       for(var k=0;k<responcejson.length;k++){
                        
                        defualt=defualt+'<br/>'+responcejson[k]['KEY_VALUE'];
                        }
                        var editor =  textboxio.replace('#textbox');
                        
                        if(defualt!="")
                        {
                            tinymce.activeEditor.setContent(defualt); 
                            editor.content.set(defualt);
                        }
                    }
                    
                        //If Table is not final table.
                        else{
                      
                            //                                                    var tableid=document.getElementById(nxttab);
                            $('#'+nextgid).find("tr:gt(0)").remove();
                            var tb=document.getElementById(nextgid);
                            for(var k=0;k<responcejson.length;k++){
                     
                                data="<tr><td align='center'><input type='checkbox' id='"+responcejson[k]['KEY_ID']+"' onclick='showDetails(this)'></td><td>"+responcejson[k]['KEY_VALUE']+"</td><td style='display:none'>"+responcejson[k]['KEY_ID']+"</td></tr>"
                     
                                data=$(data);
                                data.appendTo(tb);
                            }
                        }
                    }
                    else{
                        $('#'+nextgid).find("tr:gt(0)").remove();
                        var tb=document.getElementById(nextgid).title;
                        $('#'+tb).find("tr:gt(0)").remove();
                        var nxt=document.getElementById(nextgid);
                        debugger;
                        if(nxt.rows.length>1){
                                document.getElementById("save").style.display="block";
                                document.getElementById("btnprec").style.display="block";
                            }
                            else{
                                document.getElementById("save").style.display="none";
                                document.getElementById("btnprec").style.display="none"; 
                            }
                    }
                });

            }

function deleterow(tr) {
    $(tr).remove();
}

function popsearch(id){
                debugger;
                var data=id.name;
                var data1=data.split("@@");
                var qry=data1[2];
                qry=qry.replace("@","'");
                var tab=data1[3];
                tab=tab.split("@").join("'");
                var txtf=data1[0]+"@@"+data1[1];
                var path=localStorage.ipadrs;
                qry=qry.replace("`","'");
                window.open(''+path+'/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf='+txtf+'&ordby=', '', 'width=640,height=600');
                
            }

function ReloadOP(rt) {
                debugger;
                var et=rt.split("&");
                if(et[0].indexOf("@@")>0){
                    var dat=et[0].split("@@");
                    if(dat[0]=="pop"){
                        var tab=document.getElementById("finaltable");
                    tab.rows[dat[1]].cells[dat[2]].childNodes[0].value=et[1];
                    tab.rows[dat[1]].cells[parseInt(dat[2])+1].childNodes[0].value=et[2];
                    }
                    else{
                    document.getElementById(dat[0]).value=et[1];
                    document.getElementById(dat[1]).value=et[2];
                    //                    chkvalidation(dat[0],dat[1]);
                    //                    fillcondition(dat[1],'5',dat[0]);
                }
                
                
            }
            }

 function addToGrid(bid){
                debugger;
                bid.style.display="none";
                var nxttab=document.getElementById("finaltable");
                  
                var celllength=nxttab.rows[0].cells.length;
//                for(var j=1;j<celllength;j++){
//                    if(nxttab.rows[0].cells[j].id=='duplicate'){
//                        var cellid=nxttab.rows[0].cells[j].textContent.split(" ").join("_");
//                        cellid="id_"+cellid;
//                        var txtval=document.getElementById(cellid).value;
//                        for(var k=0;k<nxttab.rows.length;k++){
//                            if(nxttab.rows[k].cells[j].textContent==txtval){
//                                alert("This Item is Already Added");
//                                return;
//                            }
//                        }
//                    }
//                }
                var data="<tr><td height='20'><input type='button' onclick='addToGrid(this)' value='Add' class='btn btn-success'></td><td>"+nxttab.rows.length+"</td>";
                 data=data+"<td style='padding:0px;'><input type='checkbox' checked='true'  style='cursor:pointer;width:auto;' class='btn2'></td>";
                for(var j=3;j<celllength;j++){
                    var lbl=nxttab.rows[0].cells[j].textContent;
                    var lb=lbl;
                    lbl="id_"+lbl;
                    //                      lbl=lbl.replace(" ","_");
                    lbl=lbl.split(" ").join("_");
                    var val=document.getElementById(lbl).value;
                    if(nxttab.rows[0].cells[j].title.indexOf("combo")>=0){
                        var terminal = document.getElementById(lbl);
                        var selectedText = terminal.options[terminal.selectedIndex].text;
//                        alert(document.getElementById(lbl).innerHTML);
                        data=data+"<td><select><option value="+val+">"+selectedText+"</option>"+document.getElementById(lbl).innerHTML+"</select></td>";
//                        document.getElementById(lbl+"_"+j).value=val;
                    }
                    else if(nxttab.rows[0].cells[j].title.indexOf("searchmain")>=0){
                        data=data+"<td><input type='text' id='"+lbl+""+j+"' value='"+val+"' title='"+document.getElementById(lbl).title+"'><img class='srchimg' src='"+localStorage.ipadrs+"/images/search9.png' style='float:right;' title='"+document.getElementById(lbl).title+"@@ ' onclick='pop(this,1)'>";
                    }
                    else if(nxttab.rows[0].cells[j].title.indexOf("searchhdn")>=0){
                        data=data+"<td style='display:none'><input type='text' id='"+lbl+""+j+"' value='"+val+"' title='"+document.getElementById(lbl).title+"'></td>";
                    }
                    else{
                    data=data+"<td><input type='text' value='"+val+"' onchange=onchangefun(this)></td>";
                    }
                }
//                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td></tr>";
//                    data=data+"<td style='padding:0px;' align='center'><input type='checkbox' checked='true'  style='cursor:pointer;width:auto;' class='btn2'></td></tr>";
                data=$(data);
                data.appendTo(nxttab);
                for(var j=1;j<celllength;j++){
                    var lbl=nxttab.rows[0].cells[j].textContent;
                    lbl="id_"+lbl;
                    lbl=lbl.split(" ").join("_");
                    if(nxttab.rows[0].cells[j].title.indexOf("combo")>=0){
                        document.getElementById(lbl).selectedIndex=0;  
                    }
                    else{
                    document.getElementById(lbl).value="";
                    }
                      
                }
            }



function showForm(path) {
    debugger;
    var inf = document.getElementById("finfo");
    var path = "" + path.id;
    inf.innerHTML = "<object data='" + path + "'  width='100%' height='99%' >";
    displaymsg3();
}

function displaymsg3() {
    $(function () {
        debugger;

        $("#finfo").dialog({
            resizable: false,
            height: '650',
            width: '90%',
            modal: true,
            top: '0px',
            buttons: {
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });
        //document.getElementById("txtmrnum").focus();
    });
}

function displaypopup() {
    $(function () {
        debugger;

        $("#popdiv").dialog({
            resizable: false,
            height: '250',
            width: '80%',
            modal: true,
            top: '0px',
            buttons: {
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });
        //document.getElementById("txtmrnum").focus();
    });
}
function showpop(id) {
    displaypopup();
    document.getElementById("testbtn").id = id.id;

}

 function savetemp(id){
                var finaldata="";
             
               
                
                var webid=localStorage.webformid;
                $.get(localStorage.ipadrs+'/DisTemplateView?type=getdata&webid='+webid+'&idflg='+id.id,function(responceJson){
                    if(responceJson!=null){
                        debugger;
                        var data=responceJson;
                        var data1=data.split("-->");
                        for(var i=0;i<data1.length;i++){
                            var data2=data1[i].split("@");
                            if(data2[0]=="text" || data2[0]=="combo" || data2[0]=="time" || data2[0]=="hidden"){
                                finaldata=finaldata+"-->"+document.getElementById(data2[1]).value.replace("@","at_rate")+"@"+data2[2]+"@"+data2[3]+"@"+data2[0];
                            }
                            else if(data2[0]=="date"){
                                finaldata=finaldata+"-->to_date('"+document.getElementById(data2[1]).value+"','dd/mm/yyyy')"+"@"+data2[2]+"@"+data2[3]+"@"+data2[0];
                            }
                            else if(data2[0]=="search text"){
                                var data3=data2[1].split("<--");
                                finaldata=finaldata+"-->"+document.getElementById(data3[1]).value.replace("@","at_rate")+"@"+data2[2]+"@"+data2[3]+"@"+data2[0];
                            }
                            else if(data2[0]=="radio"){
                                if(document.getElementById(data2[1]).checked==true){
                                    finaldata=finaldata+"-->"+document.getElementById(data2[1]).value+"@"+data2[2]+"@"+data2[3]+"@"+data2[0]; 
                                }
                            }
                        }
                    }
                    debugger;
                    finaldata=encodeURIComponent(finaldata);
                    var table = $('#finaltable').tableToJSON();
                    var grddtls = (JSON.stringify(table));
                    grddtls = grddtls.replace(/\+/g,'_pp');
                    var typevalue="new";
                    if(document.getElementById("save").value=="Update"){
                        typevalue="edit";
                    }
                    else{
                        typevalue="new";
                    }
                    var genune=document.getElementById("txtgenid").value;
                    debugger;
                    
                   
                    //                    var unicid=document.getElementById("txtunicid").value;
                    //                    var clmid=document.getElementById("id_clmid").value;
                    var unicid="";
                    var defalt="";
                    if(document.getElementById("txtworddole").value=="1"){
                    
                     var editor =  textboxio.replace('#textbox');
                    defalt = editor.content.get();
                    defalt = encodeURIComponent(defalt);
                    }
                    $.get(localStorage.ipadrs+'/DisTemplateView?type=save&webid='+webid+'&finaldata='+finaldata+'&typevalue='+typevalue+'&genune='+genune+'&grddtls='+grddtls+'&unicid='+unicid+'&idflg='+id.id+'&worddata='+defalt,function(responceJson){
                        debugger;
                        if(responceJson!=null && responceJson!=""){
                            if(responceJson=="1"){
                                debugger;
                                alert("Record Inserted Successfully");
                                document.getElementById("txtgenid").value="";
                                //                                savegrid();
                                
                            }
                            else if(responceJson=="2"){
                                alert("Record Updated Successfully");
                                document.getElementById("txtgenid").value="";
                                //                                savegrid();
                            }
                            else {
                                alert(responceJson);
                            }
                        }
                    });
                     
                });
            }



function loadGenid() {
//    var webid = localStorage.webformid;
//    var docid = document.getElementById("txtdocid").value;
//    var mrno = document.getElementById("txtmrno").value;
//    $.get(localStorage.ipadrs + '/DisTemplateView?type=loadgenid&webid=' + webid + '&mrno=' + mrno + '&docid=' + docid, function (responcejson) {
//        if (responcejson != "") {
//            debugger;
//            document.getElementById("txtgenid").value = responcejson;
            loadFinaltable();
//        }
//    });
}

  function loadFinaltable(genid){
                
                
                var webid=localStorage.webformid;
                //                var genid=document.getElementById("txtgenid").value;
                
                var docid=document.getElementById("txtdocid").value;
                var mrno=document.getElementById("txtmrno").value;
                $.get(localStorage.ipadrs+'/DisTemplateView?type=loadfinaltable&webid='+webid+'&genid='+genid+'&docid='+docid+'&mrno='+mrno,function(responcejson){
                    if(responcejson!=null && responcejson!=""){
                        debugger;
                        if(document.getElementById("txtworddole").value=="0"){
                            var nxttab="";
                            if(document.getElementById("txtgenid").value!=""){
                                nxttab=document.getElementById("finaltable");
                                
                            }
                            else{
                                nxttab=document.getElementById("previous");
                            }
                            var data="";
                            var celllength=nxttab.rows[0].cells.length;
                            var cols="";
                            var p=0;
                            var q=0;
                            if(document.getElementById("txtgenid").value!=""){
                                p=3;
                                q=0;
                            }
                            else{
                                p=2;
                                q=1;
                                
                            }
                            for(var j=p;j<celllength-parseInt(q);j++){
                                var lbl=nxttab.rows[0].cells[j].textContent;
                                lbl="id_"+lbl;
                                //                      lbl=lbl.replace(" ","_");
                                lbl=lbl.split(" ").join("_");
                                cols=cols+"@"+lbl+"-->"+nxttab.rows[0].cells[j].title;
                            }
                            if(document.getElementById("txtgenid").value!=""){
                                $('#finaltable').find("tr:gt(0)").remove();
                            }
                            else{
                                $('#previous').find("tr:gt(0)").remove();
                            }
                            
                            for(var k=0;k<responcejson.length;k++){
                                var cmblbl="";
                                if(document.getElementById("txtgenid").value!=""){
                                    if(k==responcejson.length-1){
                                        data="<tr><td height='20'><input type='button' value='add' class='btn btn-success' onclick='addToGrid(this)'></td><td>"+(k+1)+"</td><td><input type='checkbox' checked='true'></td>";
                                    }
                                    else{
                                        data="<tr><td height='20'><input type='button' value='add' class='btn btn-success' onclick='addToGrid(this)' style='display:none'></td><td>"+(k+1)+"</td><td><input type='checkbox' checked='true'></td>";
                                        nxttab.rows[0].cells[0].childNodes[0].style.display="none";
                                    }
                                    
                                }
                                else{
                                    data="<tr><td height='20'><input type='checkbox'  onclick='edit(this)' id='"+responcejson[k]['EDIT']+"'></td><td>"+(k+1)+"</td>";
                                }
                                var cl=cols.split("@");
                                for(var l=1;l<cl.length;l++){
                                    var cl2=cl[l].split("-->");
                                    if(cl2[1].indexOf("combo")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td><select id='"+cl2[0]+"_"+k+"'>"+document.getElementById(cl2[0]).innerHTML+"</select></td>";
                                        cmblbl=cmblbl+"-->"+cl2[0]+"_"+k+"@"+responcejson[k][cl1];
                                    }
                                    else if(cl2[1].indexOf("text")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td><input type='text' style='width:98%' value='"+responcejson[k][cl1]+"' onchange='onchangefun(this)'></td>";  
                                    }
                                    else if(cl2[1].indexOf("searchmain")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        if(cl2[1].indexOf(":")>=0){
                                            var ser=cl2[1].split(":");
                                        }
                                        data=data+"<td><input type='text' value='"+responcejson[k][cl1]+"'><img src='"+localStorage.ipadrs+"/images/search9.png' style='float:right;' class='btn1 srchimg' title='"+ser[1]+"@@ ' onclick='pop(this,1)'></td>";     
                                    }
                                    else if(cl2[1].indexOf("searchhdn")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td style='display:none'><input type='text' value='"+responcejson[k][cl1]+"'></td>";   
                                        
                                    }
                                    else{
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td><input type='text' value='"+responcejson[k][cl1]+"'></td>";  
                                    }
                                    
                                }
                                //                                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td>";
                                if(document.getElementById("txtgenid").value!=""){
                                    
                                }
                                else{
                                    data=data+"<td style='padding:0px;' align='center'><input type='button' onclick='edit(this)' id='"+responcejson[k]['EDIT']+"'  value='Edit' style='cursor:pointer;width:auto;' class='btn btn-success'></td>";
                                }
                                data=data+"</tr>";
                                data=$(data);
                                data.appendTo(nxttab);
                                var cmblbl1=cmblbl.split("-->");
                                for(var n=1;n<cmblbl1.length;n++){
                                    var cmb=cmblbl1[n].split("@");
                                    document.getElementById(cmb[0]).value=cmb[1];
                                }
                                
                            }
                            var fitb=document.getElementById("finaltable");
                            if(fitb.rows.length>1){
                                document.getElementById("save").style.display="block";
                            }
                            else{
                                document.getElementById("save").style.display="none";
                                document.getElementById("btnprec").style.display="none";
                            }
                        }
                        
                        //For Worddole is checking..
                        else{
                            if(document.getElementById("txtgenid").value==""){
                                nxttab=document.getElementById("previous");
                                
                                var data="";
                                var celllength=nxttab.rows[0].cells.length;
                                var cols="";
                                var p=2;
                                var q=1;
                                
                                
                                for(var j=p;j<celllength-parseInt(q);j++){
                                    var lbl=nxttab.rows[0].cells[j].textContent;
                                    lbl="id_"+lbl;
                                    //                      lbl=lbl.replace(" ","_");
                                    lbl=lbl.split(" ").join("_");
                                    cols=cols+"@"+lbl+"-->"+nxttab.rows[0].cells[j].title;
                                }
                                
                                
                                $('#previous').find("tr:gt(0)").remove();
                                
                                
                                for(var k=0;k<responcejson.length;k++){
                                    var cmblbl="";
                                    
                                    
                                    data="<tr><td height='20'><input type='checkbox'  onclick='edit(this)' id='"+responcejson[k]['EDIT']+"'></td><td>"+(k+1)+"</td>";
                                
                                var cl=cols.split("@");
                                for(var l=1;l<cl.length;l++){
                                    var cl2=cl[l].split("-->");
                                    if(cl2[1].indexOf("combo")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td><select id='"+cl2[0]+"_"+k+"'>"+document.getElementById(cl2[0]).innerHTML+"</select></td>";
                                        cmblbl=cmblbl+"-->"+cl2[0]+"_"+k+"@"+responcejson[k][cl1];
                                    }
                                    else if(cl2[1].indexOf("text")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td><input type='text' style='width:98%' value='"+responcejson[k][cl1]+"' onchange='onchangefun(this)'></td>";  
                                    }
                                    else if(cl2[1].indexOf("searchmain")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        if(cl2[1].indexOf(":")>=0){
                                            var ser=cl2[1].split(":");
                                        }
                                        data=data+"<td><input type='text' value='"+responcejson[k][cl1]+"'><img src='"+localStorage.ipadrs+"'/images/search9.png' style='float:right;' class='btn1 srchimg' title='"+ser[1]+"@@ ' onclick='pop(this,1)'></td>";     
                                    }
                                    else if(cl2[1].indexOf("searchhdn")>=0){
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td style='display:none'><input type='text' value='"+responcejson[k][cl1]+"'></td>";   
                                        
                                    }
                                    else{
                                        var cl1=cl2[0].toUpperCase();
                                        data=data+"<td><input type='text' value='"+responcejson[k][cl1]+"'></td>";  
                                    }
                                    
                                }
                                //                                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td>";
                                
                                data=data+"<td style='padding:0px;' align='center'><input type='button' onclick='edit(this)' id='"+responcejson[k]['EDIT']+"'  value='Edit' style='cursor:pointer;width:auto;' class='btn btn-success'></td>";
                                
                                data=data+"</tr>";
                                data=$(data);
                                data.appendTo(nxttab);
                                var cmblbl1=cmblbl.split("-->");
                                for(var n=1;n<cmblbl1.length;n++){
                                    var cmb=cmblbl1[n].split("@");
                                    document.getElementById(cmb[0]).value=cmb[1];
                                }
                                }
                                
                            }
                            
                            
                            
                            else{
                                var defualt="";
                                for(var k=0;k<responcejson.length;k++){
                                    
                                    defualt=defualt+'<br/>'+responcejson[k]['KEY_VALUE'];
                                }
                                var editor =  textboxio.replace('#textbox');
                                
                                if(defualt!="")
                                {
                                    tinymce.activeEditor.setContent(defualt); 
                                    editor.content.set(defualt);
                                }
                            }
                            
                            
                            
                        }
                        
                        
                    }
                    
                    
                });
            }
            
            function addToFinal(id){
            debugger;
            var ftb=document.getElementById("finaltable");
            var ptb=document.getElementById("previous");
            var rno=id.parentNode.parentNode.rowIndex;
            var data='<tr><td><input type="button" value="add"></td><td><input type="text" value='+ftb.rows.length+'></td><td><input type="checkbox"></td>';
            for(var i=2;i<ptb.rows[rno].cells.length-2;i++){
//                alert(ptb.rows[rno].cells[i].style.display);
                if(ptb.rows[rno].cells[i].style.display=="none"){
                data=data+'<td style="display:none">'+ptb.rows[rno].cells[i].innerHTML+'</td>';
                }
                else{
                    data=data+'<td>'+ptb.rows[rno].cells[i].innerHTML+'</td>';
                }
            }
            data=data+'</tr>';
            
            var data1=$(data);
            data1.appendTo(ftb);
            
            
            }
            
              function onchangefun(id){
                debugger;
                var cindex=id.parentNode.cellIndex;
                var rownum=id.parentNode.parentNode.rowIndex;
                var tab=document.getElementById("finaltable");
                var cond=tab.rows[0].cells[cindex].getAttribute("controltype");
                if(cond.indexOf("SH:ROW")>=0){
                    var con=cond.split("^");
                    for(var i=0;i<con.length;i++){
                        replacefun(rownum,con[i]);
                    }
                }
                
            }
            
             function replacefun(rno,con){
                debugger;
                con=con.split("$").join("");
                con=con.replace("SH:ROW","");
                con=con.split(" ").join("");
                var con1=con.split("=");
                var tab=document.getElementById("finaltable");
                 var cellno=tab.rows[0].cells.length;
                 for(var i=2;i<cellno;i++){
//                     alert("id_"+tab.rows[0].cells[i].textContent.split(" ").join("_"));
//                     alert(tab.rows[rno].cells[i].childNodes[0].value);
                    con1[1]=con1[1].replace("id_"+tab.rows[0].cells[i].textContent.split(" ").join("_"),tab.rows[rno].cells[i].childNodes[0].value);
                 }
                 for(var i=2;i<cellno;i++){
//                     alert("id"+tab.rows[0].cells[i].textContent.split(" ").join("_"));
                     if(con1[0].trim()=="id_"+tab.rows[0].cells[i].textContent.split(" ").join("_")){
                         tab.rows[rno].cells[i].childNodes[0].value=eval(con1[1]);
                     }
                 }
            }
            
             function pop(id,flg){
                debugger;
                if(flg=='1'){
                    var qry=id.title.split("@@");
                    var id1=qry[1];
                    var mainqry=qry[0].split("from");
                    
                    qry=mainqry[0].split("`").join("'");
                    var tab=mainqry[1];
                    var txtf="pop@@"+id.parentNode.parentNode.rowIndex+"@@"+id.parentNode.cellIndex+"@@"+id1;
                    var path=localStorage.ipadrs;
                    window.open(''+path+'/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf='+txtf+'&ordby=', '', 'width=640,height=600');
                    
                }
            }
            
              function edit(id){
                debugger;
                document.getElementById("txtgenid").value=id.id;
                if(id.type=="button"){
                   document.getElementById("save").display="block";
                            document.getElementById("save").value="Update";
                            document.getElementById("btnprec").style.display="none";
                }
                else{
                    document.getElementById("save").style.display="block";
                            document.getElementById("save").value="Save";
                            document.getElementById("btnprec").style.display="block";
                }
                loadFinaltable(id.id);
                
            }


