/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var mobile = "&mobile=yes&guserid=" + localStorage.userid + "&gusernm=" + localStorage.usernm + "&gloc=" + localStorage.locid + "&gdept= &gsubdept= &ShiftId=SH000001&version="+localStorage.appname +"&clientip=" + localStorage.terminal;
//try{       
//	   var appname = localStorage.appname;
//        if (appname === "dashboard") {
//            appname = "Shivam Dashboard";
//        }
////	alert("appname"+appname);
//
//       window.alert = function (message) {
//	   
//	   try{
//          navigator.notification.alert(
//               message,    // message
//             null,       // callback
//          appname, // title
//            'OK'        // buttonName
//          );
// }catch(error){    
//     
//      $('#btnsave').removeAttr('disabled');      
// window.old_alert = window.alert; 
//window.alert = function (message, fallback) {
//    if (fallback)
//    {
//        old_alert(message);
//        return;
//    }
//      
//    $(document.createElement('div'))
//            .attr({title: 'Alert', 'class': 'alert'})
//            .html(message)
//            .dialog({
//                buttons: {OK: function () {
//                        $(this).dialog('close');
//		       $('#btnsave').removeAttr('disabled');      
//                    }},
//                close: function () {
//                    $(this).remove();
//                    var idfocus = $('#curfocusid').val();
//                    $('#' + idfocus).focus();
//                   $('#btnsave').removeAttr('disabled');             
//                },
//                draggable: true,
//                modal: true,
//                resizable: false,
//                width: 'auto',
//                height: 'auto'
//            });
//
//};
//	
//	}
//     }; 
// 
//     }catch(error){
//// 	  alert(error);
//               
//      }

if (localStorage.appname !== "dashboard") {
    localStorage.usernm = "SHIVAM";
}
var mobile = "&mobile=yes&terminalid=" + localStorage.terminal + "&shiftid=SH000001&subdeptid=" + localStorage.sdeptid + "&deptid=" + localStorage.deptid + "&loc=" + localStorage.locid + "&usernm=" + localStorage.usernm + "&userid=" + localStorage.userid + "&guserid=" + localStorage.userid + "&gusernm=" + localStorage.usernm + "&gloc=" + localStorage.locid + "&gdept=" + localStorage.deptid + "&gsubdept=" + localStorage.sdeptid + "&ShiftId=SH000001&version=" + localStorage.appname + "&clientip=" + localStorage.terminal + "&rights=" + encodeURIComponent(localStorage.rights);
// var mobile = "&mobile=yes&subdeptid="+localStorage.sdeptid+"&deptid=" + localStorage.deptid+ "&locid=" + localStorage.locid +"&usernm="+localStorage.usernm+"&userid="+localStorage.userid+"&terminalid="+localStorage.terminal+"&guserid=" + localStorage.userid + "&gusernm=" + localStorage.usernm + "&gloc=" + localStorage.locid + "&gdept= &gsubdept= &ShiftId=SH000001&version="+localStorage.appname +"&clientip=" + localStorage.terminal;
$(document).ready(function () {
    try
    {
//  document.addEventListener("deviceready", onDeviceReady1, false);
    } catch (err)
    {
    }
    try
    {
        $('.Time').timepicker(
                {
                    'step': '1', //startTime: "02.00"
                    'minTime': '12:00:00',
                    'maxTime': '12:00:00',
                    'show24Hours': 'false',
                    'separator': '.',
                    'timeFormat': 'h:i:s a'
                }
        );

        $('.Time').on('changeTime', function () {
            $('#mySpan').text($(this).val());
            $(this).val();
        });

    }
    catch (err)
    {
    }
});
$(document).ready(function () {
    //orientationChange();
    window.addEventListener("orientationchange", orientationChange, true);
    //orientationChange();
});
function orientationChange(e) {

    var currentOrientation = "";

    if (window.orientation == 0) {
        currentOrientation = "portrait";
    } else if (window.orientation == 90) {
        currentOrientation = "landscape";
    } else if (window.orientation == -90) {
        currentOrientation = "landscape";
    } else if (window.orientation == 180) {
        currentOrientation = "portrait";
    }
    try {
        if (currentOrientation === "landscape") {
            try {
                $('#mddtp-picker__date').removeClass('mddtp-picker--portrait');
            } catch (err) {

            }
        }
        else {
            try {
                $('#mddtp-picker__date').addClass('mddtp-picker--portrait');
            } catch (err) {

            }
        }
    } catch (err) {

    }
}
$(function () {
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();
    try {
        $(".Date1").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1870:2040',
            dateFormat: "dd/mm/yy"
        });
        $(".Date2").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1870:2040',
            maxDate: new Date(currentYear, currentMonth, currentDate),
            dateFormat: "dd/mm/yy"
        });
        //$(".dateclass").pickadate();
    } catch (e)
    {

    }
    $('.Hide').hide();
    //
});
$(document).ready(function () {

    try
    {

        $('.Time').pickatime({
            interval: 1,
            formatSubmit: 'hh.i a',
            editable: true,
            formatLabel: 'hh:i A'
        });
    }
    catch (err)
    {
    }

});
function opengallary() {
    try {
        clear();
        $('#myModalAttacments').modal('hide');
        navigator.camera.getPicture(onPhotoURISuccess1,
                function (message) {
                    alert('get picture failed');
                },
                {
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                    mediaType: navigator.camera.MediaType.ALLMEDIA
                }
        );
    } catch (err) {
        alert(err);
        $('#myModal-remarks').modal('show', {
            backdrop: true,
            keyboard: false
        });
    }
}
function onPhotoURISuccess1(imageURI) {
    $('#myModal-remarks').modal('show', {
        backdrop: true,
        keyboard: false
    });
    $('#hdnimguri').val(imageURI);
    var filetype = "";
    var imgpath = "file://" + imageURI;
    var smallImage = document.getElementById('imgSmall');
    smallImage.style.display = 'block';
    var ind = imageURI.lastIndexOf(".");
    filetype = imageURI.substr(ind + 1);
    if (filetype === "pdf") {
        var data = "" + localStorage.server + "/images/pdf.png";
        smallImage.src = data;
        $('#hdnfiletype').val("pdf");
    } else if (filetype.indexOf("video") > -1) {
        smallImage.src = data;
    }
    else {
        smallImage.src = imgpath;
        $('#hdnfiletype').val("image");
    }
    window.resolveLocalFileSystemURI(imageURI, function (entry) {
        $('#hdncamera').val("0");
        entry.file(function (filee) {
            filetype = filee.type;
            if (filetype == null) {
                var ind = imageURI.lastIndexOf(".");
                filetype = imageURI.substr(ind + 1);
            }
            var smallImage = document.getElementById('imgSmall');
            smallImage.style.display = 'block';
            if (filetype == "pdf") {
//			    var path = localStorage.server + "/MRPhotos/" + n;
                var data = "" + localStorage.server + "/images/pdf.png";//giveserver path
                smallImage.src = data;
                $('#hdnfiletype').val("pdf");
            } else if (filetype.indexOf("video") > -1) {
                smallImage.src = data;
                $('#hdnfiletype').val("mp4");
            }
            else {
//                alert("1");
                smallImage.src = imgpath;
                $('#hdnfiletype').val("image");
            }
        }, function () {
            var ind = imageURI.lastIndexOf(".");
            filetype = imageURI.substr(ind + 1);
            var smallImage = document.getElementById('imgSmall');
            smallImage.style.display = 'block';
            if (filetype == "pdf") {
                var data = "" + localStorage.server + "/images/pdf.png";
                smallImage.src = data;
                $('#hdnfiletype').val("pdf");
            } else if (filetype.indexOf("video") > -1) {
                smallImage.src = data;
            }
            else {
                smallImage.src = imgpath;
                $('#hdnfiletype').val("image");
            }
        });

    }, function (e) {



    })
    // Show the selected image



}
function clear() {
    $("#fileName").val("");
//                $('#txtFiledate').val('<%=dao.serverdate%>');
    $('#txtFileDesc').val("");
}
function capturePhoto1() {
    clear();
    $('#myModalAttacments').modal('hide');
    //                getDeviceInfo();
    //                showAlert1();
    // Take picture using device camera and retrieve image as base64-encoded string
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    try {
        navigator.camera.getPicture(onPhotoDataSuccess1, onFail, {quality: 50, cameraDirection: 1,
            destinationType: destinationType.DATA_URL, correctOrientation: true});
    } catch (err) {
        alert(err);
    }
}


function onPhotoDataSuccess1(imageData) {
    //  alert(imageData);
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    $('#hdncamera').val("1");
    $('#myModal-remarks').modal('show');
    var smallImage = document.getElementById('imgSmall');
    // Unhide image elements

    smallImage.style.display = 'inline-block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;

    $('#hdnfiletype').val("image");
    $('#hdnimguri').val("data:image/jpeg;base64," + imageData);
    //getDeviceInfo();
}

function onFail(message) {
    if(message.toUpperCase().indexOf("READ_EXTERNAL_STORAGE")!=-1){
    alert("Please Change The Settings in Phone , Setting--> Go To Apps--Configure Apps--App Permissions--Storage Permissions,  Change App Permission ");
    }else{  alert('Failed because: ' + message);}
}
function fileUpload(form, webformid, div_id, foldername, attach) {

//		alert("filename"+ $('#fileName').val());
    $('#hdnattchdivid').val(div_id);
//		hdnattchdivid=div_id
    var filename = $('#fileName').val().trim();
    if (filename == "") {
        $('#fileName').val("");
        $('#fileName').focus();
        $('#fileName').css("border-color", "red");
        return;
    }
    try {
        var imageURI = $('#hdnimguri').val();
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "text/plain";
        options.chunkedMode = false;

        var params = new Object();

        options.params = params;

        var ft = new FileTransfer();
//                    var count = $('#hdnCount').val();
//                    var params =  "id="+ $('#hdnrefid').val() +"&no="+$("#hdnrefno").val()+"&count="+count+"&type="+$('#hdnfiletype').val();
        var params = "wfid=" + webformid + "&type=" + $('#hdnfiletype').val();
        var platform = device.platform;
//                    if(platform.toString().toLowerCase()=="ios" && $('#hdncamera').val()=="1"){
////                        SavePhoto(encodeURIComponent(imageURI),webformid);
//                    }else{
        ft.upload(imageURI, encodeURI(localStorage.appurl + '/UploadFilesVF?' + params), winattach, failattach, options, true);
        var statusDom = document.getElementById('statusDom');
        ft.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                statusDom.innerHTML = perc + "% loaded...";
            } else {
                if (statusDom.innerHTML == "") {
                    statusDom.innerHTML = "Loading";
                } else {
                    statusDom.innerHTML += ".";
                }
            }
        }
//                    }

    } catch (err) {
        alert(err);
    }
}
function winattach(r) {

    document.getElementById('statusDom').innerHTML = "100% Loaded";

    var msg = r.response.split("$");
//		alert("r.response"+r.response);
//                if(filenameupload[1]=="1"){
//                    document.getElementById('statusDom').innerHTML = filenameupload[0];
//                }else{
//                    document.getElementById('statusDom').innerHTML = "Saving....";
//                    var table = $('#tbldocument');
//                    var srno = "DOC"+$('#hdnCount').val();
//                    var filename_uploaded = filenameupload[1];
//                    var filetype = $('#hdnfiletype').val();
//                    var filename = $('#txtFileName').val();
//                    var filedesc = $('#txtFileDesc').val();
//                    var filedate = $('#txtFiledate').val();
//                    var row = $("<tr><td>"+srno+"</td><td>"+filename_uploaded+"</td><td>"+filetype+"</td><td>"+filename+"</td><td><%= serverdate%></td><td>"+filedesc+"</td><td>1</td><td>"+filedate+"</td></tr>");
//                    row.appendTo(table);
// var msg = filenameupload;
    var div_id = $('#hdnattchdivid').val();
//	 alert("div_id"+div_id);

    document.getElementById(div_id).innerHTML = msg[0];
    var table = document.getElementById("tabAttach");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell0 = row.insertCell(0);
    var cell = "<a onclick='delrowgrid(this,\"\")'>delete</a>";
    cell0.innerHTML = cell;
    var cell0 = row.insertCell(1);
    cell0.innerHTML = rowCount;
    var cell0 = row.insertCell(2);
    cell0.innerHTML = document.getElementById('fileName').value;
    var cell0 = row.insertCell(3);
    cell0.innerHTML = "<a onclick='openattachment(\"" + msg[2] + "\")'>" + msg[1] + "</a>"
    var cell0 = row.insertCell(4);
    cell0.innerHTML = msg[2];
    cell0.setAttribute('style', 'display:none');
    //document.getElementById('hdnfilename').value = msg[1];
    var filename = msg[1];
    var files = msg[1].split(".");
    var type = "";
    var filetype = "";
    try {
        type = files[1];
        type = type.toLowerCase();
    }
    catch (e) {
        type = "";
    }
//
    $('#myModal-remarks').modal('hide');
    document.getElementById(div_id).innerHTML = "";
}



function failattach(error) {
    alert("An error has occurred: Code = " + error.code);
    //alert("upload error source " + error.source);
    alert("upload error target " + error.target);
}


function formviewpop(id, name, label) {

//        $('#popup-search').css('visibility','hidden');
//         $('#popup-search').css('opacity','0');
    $('#lblpopheading').html(label);
    var val = $('#txt' + name).val();
    var iselseif = 0;
    var wfid = id;
    var lbl = name.replace("searchid", "");
    lbl = name;
    var qry = $('#medreplaceqry').val();
    var medrepfields = qry.split(":");
    qry = medrepfields[0];
    try {
        qry = replaceLabelvaluesgrid("getvalue==" + qry, $('#currow').val(), $('#curtable').val()).replace("getvalue==", "").replace("^", "").trim();
    } catch (err) {
    }
    $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=searchquery&wfid=" + wfid + "&id=" + name + mobile, function (responseText) {

        $('.divforsearch').show();
        $('#divProcess').show();
        if (responseText.indexOf("Exception") != -1) {
            alert(responseText);
        }

        var paramdata = getHeadDataSearch();
        var ispost = "0";
        if (paramdata.length > 1800) {
            paramdata = "";
            ispost = "1";
        }
        var fromdt = $('#txtFromDt').val();
        var todt = $('#txtToDt').val();
//             var theme="<%=request.getParameter("theme")%>";
//             theme=encodeURIComponent(theme);

        if (responseText != null) {
            if (responseText.indexOf("ENDIF") != -1) {
                var dtl = responseText.trim().split("ENDIF");
                for (var j = 0; j < dtl.length; j++) {
                    var qrytemp = dtl[j];
                    if (qrytemp.trim() == "")
                        continue;
                    else if (qrytemp.indexOf("ELSE ") != -1) {
                        iselseif = j;
                        break;
                    }
                    var qrytempdtl = qrytemp.split("THEN ");
                    var condition = qrytempdtl[0];
                    condition = condition.replace("IF ", "").replace("ELSEIF", "").replace("ELSE", "");
                    var chk = getFormulaValue(condition);
                    if (chk == true) {
                        iselseif = j;
                        break;
                    }
                }
            }
//                NewWindow("<%=request.getContextPath()%>/admin/formViewPop.jsp?id=" + id + "&&txtf=" + name + "&name=" + name +"&theme="+theme+"&iselseif="+iselseif+"&fromdt="+fromdt+"&todt="+todt+"&qry="+replacefun(qry)+"&paramdata="+paramdata+"&ispost="+ispost+getsessionvalues(), '', '840', '577', 'no', 'no');
//            $.get(localStorage.ipadrs + "/formViewPop?id=" + id + "&&txtf=" + name + "&name=" + name + "&iselseif=" + iselseif + "&fromdt=" + fromdt + "&todt=" + todt + "&qry=" + replacefun(qry) + "&paramdata=" + paramdata + "&ispost="+ispost+"&locid=" + localStorage.locid + "&userid=" + localStorage.userid + "&depitd=" + localStorage.deptid + "&sdeptid=" + localStorage.sdeptid + mobile, function (responseJson) {
//or                 $.get(localStorage.ipadrs + "/formViewPop?id=" + id + "&&txtf=" + name + "&name=" + name + "&iselseif=" + iselseif + "&fromdt=" + fromdt + "&todt=" + todt + "&qry=" + replacefun(qry) + "&paramdata=" + paramdata + "&ispost="+ispost+ mobile, function (responseJson) {
            $.get(localStorage.ipadrs + "/formViewPop?id=" + id + "&&txtf=" + name + "&name=" + name + "&iselseif=" + iselseif + "&fromdt=" + fromdt + "&todt=" + todt + "&qry=" + replacefun(qry) + "&paramdata=" + paramdata + "&ispost=" + ispost + " &locid=" + localStorage.locid + "&userid=" + localStorage.userid + "&depitd=" + localStorage.deptid + "&sdeptid=" + localStorage.sdeptid + mobile, function (responseJson) {

                if (responseJson.length > 0) {

                    var colnames = responseJson[0]["colnames"];
                    var finqry = responseJson[0]["finqry"];
                    var hdnqry = responseJson[0]["hdnqry"];
                    var hdntab = responseJson[0]["hdntab"];
                    var hdnord = responseJson[0]["hdnord"];
                    var hdnsertext = responseJson[0]["hdnsertext"];
                    var ismultiselect = responseJson[0]["ismultiselect"];
                    var keyid = responseJson[0]["keyid"];
                    var fintab = responseJson[0]["fintab"];
                    var qryflag = responseJson[0]["qryflag"];
                    $('#hdnqry').val(hdnqry);
                    $('#hdntab').val(hdntab);
                    $('#hdnord').val(hdnord);
                    $('#hdnsertext').val(hdnsertext);
                    $('#ismultiselect').val(ismultiselect);
                    $('#keyid').val(keyid);
                    $('#finqry').val(finqry);
                    $('#fintab').val(fintab);
                    $('#qryflag').val(qryflag);
                    colnames = colnames.substr(0, colnames.length - 1);
                    $('#colnames').val(colnames);
                    var data = colnames.split(",!");
                    var options = "";
                    for (var i = 0; i < data.length; i++) {
                        options = options + "<option value=" + data[i] + ">" + data[i] + "</option>";
                    }
                    var tablheader = "<tr class='srchtblhdr'>", style = "";
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === "KEY_ID" || data[i] === "VALUE_ID") {
                            style = "style='display:none'";
                        } else {
                            style = "";
                        }
                        tablheader = tablheader + "<td " + style + ">" + data[i] + "</td>";
                    }
                    $('#tblColumns tbody').empty();
                    tablheader = tablheader + "</tr>";
                    $('#tblColumns').html(tablheader);

                    $('#ddlSearch').html(options);
                    $('#txtSearch').focus();
                    $('#txtSearch').val("");
                    searchKeyup();
                    loadgrid(1);



                }


            });



        } else {
//                NewWindow("<%=request.getContextPath()%>/admin/formViewPop.jsp?id=" + id + "&&txtf=" + name + "&name=" + name +"&theme="+theme+"&iselseif="+iselseif+"&fromdt="+fromdt+"&todt="+todt+"&qry="+replacefun(qry)+"&paramdata="+paramdata+"&ispost="+ispost+getsessionvalues(), '', '840', '577', 'no', 'no');
            $.get(localStorage.ipadrs + "/formViewPop?id=" + id + "&&txtf=" + name + "&name=" + name + "&iselseif=" + iselseif + "&fromdt=" + fromdt + "&todt=" + todt + "&qry=" + replacefun(qry) + "&paramdata=" + paramdata + "&ispost=" + ispost + "&locid=" + localStorage.locid + "&userid=" + localStorage.userid + "&depitd=" + localStorage.deptid + "&sdeptid=" + localStorage.sdeptid + mobile, function (responseJson) {
                if (responseJson.length > 0) {

                    var colnames = responseJson[0]["colnames"];
                    var finqry = responseJson[0]["finqry"];
                    var hdnqry = responseJson[0]["hdnqry"];
                    var hdntab = responseJson[0]["hdntab"];
                    var hdnord = responseJson[0]["hdnord"];
                    var hdnsertext = responseJson[0]["hdnsertext"];
                    var ismultiselect = responseJson[0]["ismultiselect"];
                    var keyid = responseJson[0]["keyid"];
                    var fintab = responseJson[0]["fintab"];
                    var qryflag = responseJson[0]["qryflag"];
                    $('#hdnqry').val(hdnqry);
                    $('#hdntab').val(hdntab);
                    $('#hdnord').val(hdnord);
                    $('#hdnsertext').val(hdnsertext);
                    $('#ismultiselect').val(ismultiselect);
                    $('#keyid').val(keyid);
                    $('#finqry').val(finqry);
                    $('#fintab').val(fintab);
                    $('#qryflag').val(qryflag);
                    colnames = colnames.substr(0, colnames.length - 1);
                    $('#colnames').val(colnames);
                    var data = colnames.split(",!");
                    var options = "";
                    for (var i = 0; i < data.length; i++) {
                        options = options + "<option value=" + data[i] + ">" + data[i] + "</option>";
                    }
                    var tablheader = "<tr class='srchtblhdr'>", style = "";
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === "KEY_ID" || data[i] === "VALUE_ID") {
                            style = "style='display:none'";
                        } else {
                            style = "";
                        }
                        tablheader = tablheader + "<td " + style + ">" + data[i] + "</td>";
                    }
                    $('#tblColumns tbody').empty();
                    tablheader = tablheader + "</tr>";
                    $('#tblColumns').html(tablheader);

                    $('#ddlSearch').html(options);
                    $('#txtSearch').focus();
                    $('#txtSearch').val("");
                    searchKeyup();
                    loadgrid(1);



                }


            });

        }
    });
}

function searchKeyup() {
    $('#txtSearch').keyup(function (e) {
        var keycode = e.which;
        if (keycode === 13) {
            var _rowcount = document.getElementById('tblColumns').rows.length;
            if (_rowcount > 0) {
                selFirstRow();
            }

        } else {
            $('#tblColumns tr:gt(0)').empty();

            loadgrid(1, 'search');
        }

    })
}
function selFirstRow() {
    document.getElementById('tblColumns').rows[0].onclick();
}
function loadgrid(pageno, keyup) {

    $('#divProcess').show();
    var data = $('#colnames').val();
    var whe = $('#hdntab').val();
    var txtf = $('#hdnsertext').val();
    var whe = whe.replace(/'/g, '`');
    if (txtf != "txtGridSearch") {
        var w = whe.split(" ");
        for (var i = 0; i < w.length; i++) {
            var whdata = w
            if (w[i].trim().indexOf("$") != -1) {
                //alert('#'+w[i].replace("$","").replace(/`/g,""));
                //alert($('#'+w[i].replac("$","")).val());
                var id2 = w[i].replace("$", "").replace(/`/g, "");
                var id3 = id2.split(".");

                whe = whe.replace(id2, data).replace("$", "").replace(/`/g, "'");
            }
        }
    } else {
        var w = whe.split(" ");
        for (var i = 0; i < w.length; i++) {
            if (w[i].trim().indexOf("$") != -1) {
                //alert('#'+w[i].replace("$","").replace(/`/g,""));
                //alert($('#'+w[i].replac("$","")).val());
                var id2 = w[i].replace("$", "").replace(/`/g, "");
                var id3 = id2.split(".");

                whe = whe.replace(id2, data).replace("$", "").replace(/`/g, "'");
                //alert(whe);
            }
        }
    }
    var qry = $('#hdnqry').val().replace(/`/g, "'");
    if ($('#qryflag').val() != 1) {
        $('#finqry').val(qry);
    }
    var tab = whe.replace(/`/g, "'");
    var tab = whe.replace(/`/g, "'");
    var mul = $('#ismultiselect').val();
    if (mul == 1) {
        var keyids = getMultiSelectKeyids();
        var keyid = $('#keyid').val();
        var keyid = keyid.toUpperCase().replace("KEY_ID", "");
        if (keyids.trim() != "") {
            if (tab.toUpperCase().indexOf("WHERE ") != -1) {
                tab = tab + " and " + keyid + " not in (" + keyids + ")";
            }
            else {
                tab = tab + " where " + keyid + " not in (" + keyids + ")";
            }
        }
    }
    if ($('#qryflag').val() != 1)
        $('#fintab').val(tab);
    $('#qryflag').val("1");
    var ordy = $('#hdnord').val().replace(/`/g, "'");
    var search = $('#txtSearch').val().replace(/`/g, "'");
    var serfield = $('#ddlSearch').val().replace(/`/g, "'");
    ;
    tab = encodeURIComponent(tab);
    var path = localStorage.ipadrs + "/searchRecordsMobile?search=" + search + "&ordby=" + ordy + "&serfield=" + serfield;
    path = path + "&tab=" + tab + "&qry=" + qry + "&sidx=&sord=asc&page=" + pageno;
    $.get(path, function (respneText) {
        var rowCount = document.getElementById('tblColumns').rows.length;

        if (rowCount > 1) {
            document.getElementById('tblColumns').deleteRow(rowCount - 1);
        }
        respneText = $(respneText);
        if (keyup == 'search') {
            $('#tblColumns tr:gt(0)').empty();
        }
        $(respneText).appendTo($('#tblColumns'));


        $('#divProcess').hide();
    });


}
function formviewpopgrd(id, name, tabid, colno) {
    var j = tabid.parentNode.columnNumber;
    var j = $(tabid).parent().children().index($(tabid))
    var iselseif = 0;
    var i = tabid.parentNode.parentNode.rowIndex;
    var tablename = $(tabid).parents('table').attr("id");
    $('#curtable').val(tablename);
    $('#currow').val(i);
    $('#curcol').val(colno);
    var paramdata = getHeadDataSearch();
    var wfid = localStorage.currentformid;
    var lbl = name.replace("searchid", "");
    lbl = lbl.replace(/_/g, ' ');
    $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=searchquery&wfid=" + wfid + "&id=" + name.trim() + mobile, function (responseText) {
        $('.divforsearch').show();
        $('#divProcess').show();
        if (responseText.indexOf("Exception") != -1) {
            alert(responseText);
        }
        var fromdt = $('#txtFromDt').val();
        var todt = $('#txtToDt').val();
        if (responseText != null) {
            if (responseText.indexOf("ENDIF") != -1) {
                var dtl = responseText.trim().split("ENDIF");
                for (var j = 0; j < dtl.length; j++) {
                    var qrytemp = dtl[j];
                    if (qrytemp.trim() == "")
                        continue;
                    else if (qrytemp.indexOf("ELSE ") != -1) {
                        iselseif = j;
                        break;
                    }
                    var qrytempdtl = qrytemp.split("THEN ");
                    var condition = qrytempdtl[0];
                    condition = condition.replace("IF ", "").replace("ELSEIF", "").replace("ELSE", "");
                    var formularesult = getFormulaValue(condition, "grid");
                    if (formularesult) {
                        iselseif = j;
                        break;
                    }
                }
            }
            $.get(localStorage.ipadrs + "/formViewPop?id=" + id + "&&txtf=txtGridSearch&name=" + name + "&iselseif=" + iselseif + "&fromdt=" + fromdt + "&todt=" + todt + "&paramdata=" + paramdata + "&locid=" + localStorage.locid + "&userid=" + localStorage.userid + "&deptid=" + localStorage.deptid + "&sdeptid=" + localStorage.sdeptid, function (responseJson) {
                if (responseJson.length > 0) {

                    var colnames = responseJson[0]["colnames"];
                    var finqry = responseJson[0]["finqry"];
                    var hdnqry = responseJson[0]["hdnqry"];
                    var hdntab = responseJson[0]["hdntab"];
                    var hdnord = responseJson[0]["hdnord"];
                    var hdnsertext = responseJson[0]["hdnsertext"];
                    var ismultiselect = responseJson[0]["ismultiselect"];
                    var keyid = responseJson[0]["keyid"];
                    var fintab = responseJson[0]["fintab"];
                    var qryflag = responseJson[0]["qryflag"];
                    $('#hdnqry').val(hdnqry);
                    $('#hdntab').val(hdntab);
                    $('#hdnord').val(hdnord);
                    $('#hdnsertext').val(hdnsertext);
                    $('#ismultiselect').val(ismultiselect);
                    $('#keyid').val(keyid);
                    $('#finqry').val(finqry);
                    $('#fintab').val(fintab);
                    $('#qryflag').val(qryflag);
                    colnames = colnames.substr(0, colnames.length - 1);
                    $('#colnames').val(colnames);
                    var data = colnames.split(",!");
                    var options = "";
                    for (var i = 0; i < data.length; i++) {
                        options = options + "<option value=" + data[i] + ">" + data[i] + "</option>";
                    }
                    var tablheader = "<tr class='srchtblhdr'>", style = "";
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === "KEY_ID" || data[i] === "VALUE_ID") {
                            style = "style='display:none'";
                        } else {
                            style = "";
                        }
                        tablheader = tablheader + "<td " + style + ">" + data[i] + "</td>";
                    }
                    $('#tblColumns tbody').empty();
                    tablheader = tablheader + "</tr>";
                    $('#tblColumns').html(tablheader);

                    $('#ddlSearch').html(options);
                    $('#txtSearch').focus();
                    $('#txtSearch').val("");
                    searchKeyup();
                    loadgrid(1);



                }

            });
        } else {
            $.get(localStorage.ipadrs + "/formViewPop?id=" + id + "&&txtf=txtGridSearch&name=" + name + "&iselseif=" + iselseif + "&fromdt=" + fromdt + "&todt=" + todt + "&paramdata=" + paramdata + "&locid=" + localStorage.locid + "&userid=" + localStorage.userid + "&depitd=" + localStorage.deptid + "&sdeptid=" + localStorage.sdeptid, function (responseJson) {
            });
        }
    });
}

function addrowgrid1(tabid, colid) {

    var tablename = tabid;
    var rowdata = $('#' + tablename + " tr:eq('1')").clone();
    $('#' + tablename).append(rowdata);
    var $row = $('#' + tablename);
    $row.find('.Date1 hasDatepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2040',
        dateFormat: "dd/mm/yy"
    });
    try {
        $('#' + tablename + ' tr:last').find('input[type=text]').val("");
        $('#' + tablename + ' tr:last').find('input[type=text]').attr("title", "");
    } catch (err) {

    }
    var i = 0;
    $('[id^="txtdtgrd"]').each(function () {
        i++;
        if (i != 1)
            this.id = this.id + "" + i;
        this.className = this.className.replace(" hasDatepicker", "");
    });
    $('[id^="txttmgrd"]').each(function () {
        i++;
        if (i != 1)
            this.id = this.id + "" + i;
        this.className = this.className.replace(" ui-timepicker-input", "");
    });
    $(".Date1").datepicker("destroy");
    $(".Date1").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2040',
        dateFormat: "dd/mm/yy"
    });
    changesr(tabid);
    try
    {
        $('.Time').timepicker(
                {
                    'step': '1', //startTime: "02.00"
                    'minTime': '12:00:00',
                    'maxTime': '12:00:00',
                    'show24Hours': 'false',
                    'separator': '.',
                    'timeFormat': 'h:i:s a'
                }
        );

        $('.Time').on('changeTime', function () {
            $('#mySpan').text($(this).val());
            $(this).val();
        });
    }
    catch (err)
    {
    }
    var oTable = document.getElementById(tabid);
    var rowLength = oTable.rows.length;

    try {
        var rownum = rowLength - 1;
        var oCells = oTable.rows.item(rownum).cells;
        var celLength = oCells.length;
        var val = "";
        var isexists = 0;
        for (var km = 2; km < celLength; km++) {
            var chkid = oTable.rows[rownum].cells[km].childNodes[0].id;
            if (chkid.indexOf("_searchid") != -1) {
                if (chkid.trim() == colid.trim()) {
                    oTable.rows[rownum].cells[km].childNodes[0].focus();
                    break;
                } else {
                    var chkid = oTable.rows[rownum].cells[km].childNodes[1].id;
                    if (chkid.trim() == colid.trim()) {
                        oTable.rows[rownum].cells[km].childNodes[1].focus();
                        break;
                    }
                }
            } else {
                if (chkid == colid.trim()) {
                    oTable.rows[rownum].cells[km].childNodes[0].focus();
                    break;
                }
            }
        }
    } catch (err) {
        alert(err);
    }
}
function addrowgrid(tabid) {
    
    var tablename = $(tabid).parents('table').attr("id");
    var tit = $(tabid).parents('table').attr("title");
    var titl = tit.split("@@@");
    var rowdata = $('#' + tablename + " tr:eq('1')").clone();
    $('#' + tablename).append(rowdata);
    var $row = $('#' + tablename);
    $row.find('.Date1 hasDatepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2040',
        dateFormat: "dd/mm/yy"
    });
    $('#' + tablename + ' tr:last').find('input[type=text]').val("");
    $('#' + tablename + ' tr:last').css("background-color", "");
    if (titl[1] == "UserRowsQueryCols") {
        var rw = titl[2];
        $('#' + tablename + ' tr:last').find('input[type=text]:lt(' + rw + ')').attr("title", "");
    } else {
        $('#' + tablename + ' tr:last').find('input[type=text]').attr("title", "");
    }
    var i = 0;
    $('[id^="txtdtgrd"]').each(function () {

        var myListItems = $('[id^="txtdtgrd"]').length;
        var nlen = myListItems;
        i++;
        if (i != 1) {
            var rid = this.id.replace(/[0-9]/g, '');
            this.id = rid + "" + i;
        }
        this.className = this.className.replace(" hasDatepicker", "");
        if (i === nlen) {
            addrowgriddate(this);
        } else {
            var platform = "";
            try {
                var platform = device.platform;
                if (platform === null) {
                    platform = localStorage.platform
                }
            } catch (err) {
                if (platform === null) {
                    platform = localStorage.platform
                }
//                      alert(platform1+"platform")  ;     
            }
            if (platform.toUpperCase() === "IOS") {
                $(this).removeClass("newiosdatapicker");

            } else {
                $(this).removeClass("newdatapicker");

            }

        }
    });
    $('[id^="txttmgrd"]').each(function () {
        i++;
        if (i != 1) {
            var rid = this.id.replace(/[0-9]/g, '') + "" + i;
            this.id = rid + "" + i;
        }
        this.className = this.className.replace(" ui-timepicker-input", "");
        try {
            var rw = this.parentNode.parentNode.rowIndex;
            var oTable = document.getElementById(tablename);
            var rowLength = oTable.rows.length;
            if (rw == rowLength - 1) {
                var today = new Date();
                var h = today.getHours();
                var m = today.getMinutes();
                var s = today.getSeconds();
                var tm = "am";
                if (h >= 12) {
                    tm = "pm";
                    if (h != 12) {
                        h = h - 12;
                    }
                }
                if (h < 10) {
                    h = "0" + h;
                }
                var curtm = h + ":" + m + ":00 " + tm;
                this.value = curtm;
            }
        } catch (err) {
        }
    });
    try {
        $(".Date1").datepicker("destroy");
        $(".Date1").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1870:2040',
            dateFormat: "dd/mm/yy"
        });
    } catch (error) {
//    alert(error)

    }
    changesr(tablename);
    try
    {
        $('.Time').timepicker(
                {
                    'step': '1', //startTime: "02.00"
                    'minTime': '12:00:00',
                    'maxTime': '12:00:00',
                    'show24Hours': 'false',
                    'separator': '.',
                    'timeFormat': 'h:i:s a'
                }
        );

        $('.Time').on('changeTime', function () {
            $('#mySpan').text($(this).val());
            $(this).val();
        });
    }
    catch (err)
    {
    }
    var oTable = document.getElementById(tablename);
    var rowLength = oTable.rows.length;
    oTable = null;
    var w = $('#' + tablename.replace('tab_', 'div_'));
    var lastrow = $('#' + tablename).find('tr').eq(rowLength - 1);
    var hei = $('#' + tablename).height();
    if (lastrow.length) {
        w.scrollTop(hei - (w.height() / 2));
    }
//$('#'+tablename).animate({scrollTop: $('#'+tablename).prop('scrollHeight')});
    try {
// getlogdata($('#currentdate').val()+" "+gettime(new Date)+" user "+$('#formusernm').val()+" added  "+rowLength+" row for table id is "+tablename);
// getlogdata("####"+tablename+",!Add,!"+tablename+",!,!Add,!"+i);
    } catch (e) {
    }
    $('input').on('paste', function () {
        var element = this;
        setTimeout(function () {
            var text = $(element).val();
            $(element).keyup();
        }, 100);
    });

}
try {
    $('#' + tablename + ' tr:last').find('input[type=text]').val("");
    $('#' + tablename + ' tr:last').find('input[type=text]').attr("title", "");
} catch (err) {

}
var i = 0;
$('[id^="txtdtgrd"]').each(function () {
    i++;
    if (i != 1) {
        var rid = this.id.replace(/[0-9]/g, '') + "" + i;
        this.id = rid + "" + i;
    }
    this.className = this.className.replace(" hasDatepicker", "");
});
function addrowgriddate(thisval) {
    
//      alert("in grid")
    ;
    var platform = "";
    try {
        var platform = device.platform;
        if (platform === null) {
            platform = localStorage.platform
        }
    } catch (err) {

    }
//	   alert(platform+"platform in ass")  ;     

    if (platform.toUpperCase() === "IOS") {

        $("#" + thisval.id + "").addClass("newiosdatapicker");
        (function () {
            $('.newiosdatapicker').click(function () {

                opencanlendar(this);
            });
        }).call(this);
    } else {

        $("#" + thisval.id + "").addClass("newdatapicker");
        var serverdate = $('#mblserverdatediff').val();

        (function () {
            $('.newdatapicker').click(function () {
                
                var date = $(this).val();
                if (date === "") {
                    date = serverdate;
                }
                cntrl = $(this);
                var years = 23;
                if ($(this).hasClass("Date2")) {
                    years = 0;
                }
                date = date.split("/");
                date = date[2] + "-" + date[1] + "-" + date[0];
                new mdDateTimePicker.default({
                    type: 'date',
                    init: moment(date, 'YYYY-MM-DD'),
                    orientation: 'PORTRAIT',
                    future: moment().add(years, 'years')

                }).toggle();
                ;
            })
        }).call(this);
    }
}
function addrowgridGrd(tablename) {

    var rowdata = $('#' + tablename + " tr:eq('1')").clone();
    $('#' + tablename).append(rowdata);
    $('#' + tablename + ' tr:last').find('input[type=text]').val("");
    var i = 0;
    $('[id^="txtdtgrd"]').each(function () {
        i++;
        if (i != 1)
            this.id = this.id + "" + i;
        this.className = this.className.replace(" hasDatepicker", "");
    });
    var $row = $('#' + tablename);
    $row.find('.Date1 hasDatepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2040',
        dateFormat: "dd/mm/yy"
    });
    changesr(tablename);
    return true;
}
function delrowgrid(tabid, deldata) {

    var i = tabid.parentNode.parentNode.rowIndex;
    var tablename = $(tabid).parents('table').attr("id");
//    getlogdata($('#currentdate').val()+" "+gettime(new Date)+" user "+$('#formusernm').val()+" deleting the rownum "+i+" for table id is "+tablename);
//     getlogdata("####"+tablename+",!delete,!"+tablename+",!,!delete,!"+i);
    if (tablename == "tabAttach") {
        $('#' + tablename + " tr:eq('" + i + "')").remove();
        changesr(tablename);
        grdsumcal(tablename);
    }
    var oTable = document.getElementById(tablename);
    var rowLength = oTable.rows.length;
    $('#curtable').val(tablename);
    $('#currow').val(i);
    if (deldata.trim() == "") {
        if (i != 1) {
            $('#' + tablename + " tr:eq('" + i + "')").remove();
        }

        if (i == 1) {

            var oCells = oTable.rows.item(1).cells;
            var celLength = oCells.length;
            for (var j = 1; j < celLength; j++)
            {
                try {
                    var type = oTable.rows[1].cells[j].childNodes[0].tagName;
                    var value = "";
                    if (type == "INPUT") {
                        oTable.rows[1].cells[j].childNodes[0].value = "";
                        //oTable.rows[1].cells[j].childNodes[0].onkeyup();
                        oTable.rows[1].cells[j].childNodes[0].title = "";
                    }
                } catch (err) {
                    alert("delrowid" + err);
                }
            }
            for (var j = 1; j < celLength; j++)
            {
                try {
                    var type = oTable.rows[1].cells[j].childNodes[0].tagName;
                    var value = "";
                    if (type == "INPUT") {
                        //oTable.rows[1].cells[j].childNodes[0].value = "";
                        oTable.rows[1].cells[j].childNodes[0].onkeyup();
                        //oTable.rows[1].cells[j].childNodes[0].title = "";
                    }
                } catch (err) {
                    alert("delrowid" + err);
                }
            }
        }
        if (i == 1 && rowLength > 2) {
            $('#' + tablename + " tr:eq('" + i + "')").remove();
        }
    } else {
        if (deldata.indexOf("ENDIF")) {
            var data = deldata;
            var dtl = data.trim().split("ENDIF");
            for (var j = 0; j < dtl.length; j++) {
                var qrytemp = dtl[j];
                qrytemp = qrytemp;
                if (qrytemp.trim().replace("ENDSH:QRY", "").replace("ENDSH:ROW", "") == "")
                    continue;
                if (qrytemp.indexOf("ELSE ") != -1) {
                    var chk = true;
                    var wholedata = qrytemp.replace("ELSE ", "");
                } else {
                    var qrytempdtl = qrytemp.split("THEN ");
                    var condition = qrytempdtl[0];
                    condition = condition.replace("IF ", "").replace("ELSEIF", "").replace("ELSE", "");
                    condition = condition.trim().replace("ENDSH:ROW", "").replace("SH:ROW", "");
                    var chk = getFormulaValue(condition, "grid");
                    var wholedata = qrytempdtl[1];
                }
                if (chk) {
                    data = wholedata;

                    var dt = data.split("^");
                    for (var d = 0; d < dt.length; d++) {
                        var d1 = dt[d].split("=");
                        if (d1[0].trim() == "MSG") {
                            var chk = confirm(d1[1]);
                            if (chk == false) {
                                break;
                            }
                        }
                        if (d1[0].trim() == "CONFIRMMSG") {
                            var chk = window.confirm(d1[1]);
                            if (chk == false) {
                                break;
                            }
                        }
                        else if (d1[0].trim() == "COLNAME") {
                            var oCells = oTable.rows.item(i).cells;
                            var celLength = oCells.length;
                            var celLength = oCells.length;
                            var actcol = "";
                            var actcolval = "";
                            var delrows = "";
                            for (var chkj = 2; chkj < celLength; chkj++)
                            {
                                var type = oTable.rows[i].cells[chkj].childNodes[0].id;
                                if (type.trim() == d1[1].trim()) {
                                    actcol = chkj;
                                    actcolval = oTable.rows[i].cells[chkj].childNodes[0].value;
                                    break;
                                }
                            }

                            for (var chki = 0; chki < rowLength; chki++) {
                                var oCells = oTable.rows.item(chki).cells;
                                var celLength = oCells.length;
                                try {
                                    var type = oTable.rows[chki].cells[actcol].childNodes[0].tagName;
                                    var value = "";
                                    if (type == "INPUT") {
                                        var curval = oTable.rows[chki].cells[actcol].childNodes[0].value;
                                        if (curval.trim() == actcolval.trim()) {
                                            if (delrows == "") {
                                                delrows = chki;
                                            }
                                            else {
                                                delrows = delrows + "," + chki;
                                            }
                                        }
                                    } else if (type == "SELECT") {

                                    }
                                } catch (err) {
                                    alert("delrow" + err);
                                }

                            }

                            var rw = delrows.toString().split(",");
                            if (delrows.toString().indexOf(",") != -1) {
                                for (var chl = rw.length - 1; chl >= 0; chl--) {
                                    var chki = rw[chl];
                                    if (chki != 1 || (chki == 1 && oTable.rows.length > 2)) {
                                        $('#' + tablename + " tr:eq('" + chki + "')").remove();
                                        continue;
                                    }
                                    if (chki == 1) {
                                        var oCells = oTable.rows.item(1).cells;
                                        var celLength = oCells.length;
                                        for (var j = 1; j < celLength; j++)
                                        {
                                            try {
                                                var type = oTable.rows[1].cells[j].childNodes[0].tagName;
                                                var value = "";
                                                if (type == "INPUT") {
                                                    oTable.rows[1].cells[j].childNodes[0].value = "";
                                                    oTable.rows[1].cells[j].childNodes[0].onkeyup();
                                                    oTable.rows[1].cells[j].childNodes[0].title = "";
                                                }
                                            } catch (err) {
                                                alert("delrow--" + err);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (delrows == 1 && rowLength == 2) {

                                    var oCells = oTable.rows.item(1).cells;
                                    var celLength = oCells.length;
                                    for (var j = 1; j < celLength; j++)
                                    {
                                        try {
                                            var type = oTable.rows[1].cells[j].childNodes[0].tagName;
                                            var value = "";
                                            if (type == "INPUT") {
                                                oTable.rows[1].cells[j].childNodes[0].value = "";
                                                oTable.rows[1].cells[j].childNodes[0].onkeyup();
                                                oTable.rows[1].cells[j].childNodes[0].title = "";
                                            }
                                        } catch (err) {
                                            alert("delrow--" + err);
                                        }
                                    }
                                } else {
                                    $('#' + tablename + " tr:eq('" + delrows + "')").remove();
                                }
                            }
                        }
                    }
                } else if ((j == dtl.length - 1 && chk == false) || (dtl[j + 1].trim() == "" && j == dtl.length - 2)) {
                    if (i != 1) {
                        $('#' + tablename + " tr:eq('" + i + "')").remove();
                    }

                    if (i == 1) {

                        var oCells = oTable.rows.item(1).cells;
                        var celLength = oCells.length;
                        for (var j = 1; j < celLength; j++)
                        {
                            try {
                                var type = oTable.rows[1].cells[j].childNodes[0].tagName;
                                var value = "";
                                if (type == "INPUT") {
                                    oTable.rows[1].cells[j].childNodes[0].value = "";
                                    oTable.rows[1].cells[j].childNodes[0].onkeyup();
                                    oTable.rows[1].cells[j].childNodes[0].title = "";
                                }
                            } catch (err) {
                                alert("delrow" + err);
                            }
                        }
                    }
                    if (i == 1 && rowLength > 2) {
                        $('#' + tablename + " tr:eq('" + i + "')").remove();
                    }
                }
            }
        } else {

        }
    }
    changesr(tablename);
    grdsumcal(tablename);
}
function changesr(tableid) {
    var oTable = document.getElementById(tableid);
    var rowLength = oTable.rows.length;
    for (i = 1; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        oCells.item(1).innerHTML = i;
    }
}
function grdsumcal(tabid) {

    var oTable = document.getElementById(tabid);
    var oCells = oTable.rows.item(1).cells;
    var celLength = oCells.length;
    for (var j = 1; j < celLength; j++)
    {
        try {
            var type = oTable.rows[1].cells[j].childNodes[0].tagName;
            var value = "";
            if (type == "INPUT") {
                oTable.rows[1].cells[j].childNodes[0].onkeyup();
            }
        } catch (err) {
            alert(err);
        }
    }
}
function NewWindow(mypage, myname, w, h, scroll, statusbar) {
    var winl = (screen.width - w) / 2;
    var wint = (screen.height - h) / 2;
    winprops = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=' + scroll + ', status=' + statusbar + ',resizable=no';
    win = window.open(mypage, myname, winprops);
    if (parseInt(navigator.appVersion) >= 4) {
        win.window.focus();
    }

}
function checknoduplicate(id, key, value, fromloop) {
//     alert("checknoduplicate");
//        getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" No Duplicate is called for id is "+id+" ,key is "+key+" and value is "+value);
//        $('#userwiselog').val($('#currentdate').val() +"\n"+$('#currentdate').val()+ " "+gettime(new Date)+" No Duplicate is called for id is "+id+" ,key is "+key+" and value is "+value);
    var tablename = $('#curtable').val();
    var row = $('#currow').val();
    var col = $('#curcol').val();
    if (fromloop == undefined)
        fromloop = 0;
    var wfid = localStorage.currentformid;
    var isexistsrow = 0;
//    $.ajax({url:"<%=request.getContextPath()%>/WebFormSave1?reqtype=dupdata&wfid=" + wfid + "&id=" + id+getsessionvalues(),
    $.ajax({url: " " + localStorage.ipadrs + "/WebFormSave1?reqtype=dupdata&wfid=" + wfid + "&id=" + id + mobile,
        success: function (responseText) {
            if (responseText.indexOf("Exception") != -1) {
                alert(responseText);
            } else {

                if (responseText == "") {
                    if (fromloop != 1)
                        changefunctiongrid(id, 0, row, tablename);
                    return false;
                }
                var res = responseText.split(",!");
                if (res[0] == "0") {
                    changefunctiongrid(id, 0, row, tablename);
                } else {
                    var chkgrid = res[1];
                    if (chkgrid.trim() == "") {
                        var oTable = document.getElementById(tablename);
                        var rowLength = oTable.rows.length;
                        var isexists = 0;
                        for (var i = 1; i < rowLength; i++) {
                            var oCells = oTable.rows.item(i).cells;
                            var celLength = oCells.length;
                            var val = "";
                            for (var km = 2; km < celLength; km++) {
                                if (oTable.rows[i].cells[km].childNodes[0].id == id && i != row) {
                                    if (oTable.rows[i].cells[km].childNodes[0].title == key) {
                                        isexists = 1;
                                    }
                                }
                            }
                        }
                        if (isexists == 1) {
                            alert(replaceString(id) + " is already exists");
                            var oCells1 = oTable.rows.item(row).cells;
                            var celLength = oCells1.length;
                            $('#' + tablename + " tr:eq('" + row + "')").remove();
                            grdsumcal(tablename);
                        } else {
                            if (fromloop != 1)
                                changefunctiongrid(id, 0, row, tablename);
                        }
                    } else {
                        chkgrid = chkgrid.replace("IF ", "").replace("THEN", "");

                        var chkfields = chkgrid.trim().split("&&");
                        var oTable = document.getElementById(tablename);
                        var rowLength = oTable.rows.length;
                        var isexists = 0;
                        for (var i = 1; i < rowLength; i++) {
                            var oCells = oTable.rows.item(i).cells;
                            var celLength = oCells.length;
                            var val = "";
                            if (isexists == 1) {
                                break;
                            }
                            for (var ch = 0; ch < chkfields.length; ch++) {
                                if (chkfields[ch].trim() == "") {
                                    continue;
                                }
                                if (ch > 0) {
                                    if (isexists == 0) {
                                        break;
                                    } else {
                                        isexists = 0;
                                    }
                                }
                                var chkid = "", ext = "";
                                if (chkfields[ch].indexOf(".") != -1) {
                                    var chd = chkfields[ch].trim().split(".");
                                    chkid = chd[0];
                                    ext = chd[1];
                                } else {
                                    chkid = chkfields[ch].trim();
                                    ext = "";
                                }
                                chkid = chkid.replace("$", "");
                                var orgval = "";
                                for (var klm = 2; klm < celLength; klm++) {
                                    if (oTable.rows[row].cells[klm].childNodes[0].id == chkid) {
                                        if (ext == "id") {
                                            orgval = oTable.rows[row].cells[klm].childNodes[0].title;
                                        } else {
                                            orgval = oTable.rows[row].cells[klm].childNodes[0].value;
                                        }
                                    }
                                }

                                for (var km = 2; km < celLength; km++) {
                                    if (oTable.rows[i].cells[km].childNodes[0].id == chkid.trim() && i != row) {
                                        if (ext == "" || ext == "value") {
                                            if (oTable.rows[i].cells[km].childNodes[0].value == orgval) {
                                                isexists = 1;
                                                isexistsrow = i;
                                            }
                                        } else {
                                            if (oTable.rows[i].cells[km].childNodes[0].title == orgval) {
                                                isexists = 1;
                                                isexistsrow = i;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (isexists == 1) {
                            alert(replaceString(id) + " is already exists in rownum : " + isexistsrow);
                            var oCells1 = "";
                            if (fromloop != 1) {
                                oCells1 = oTable.rows.item(row).cells;
                                $('#' + tablename + " tr:eq('" + row + "')").remove();
                            }
                            else {
                                oCells1 = oTable.rows.item(row).cells;
                                $('#' + tablename + " tr:eq('" + row + "')").remove();
                            }
                            var celLength = oCells1.length;
                            grdsumcal(tablename);
                            changesr(tablename);
                        } else {
                            if (fromloop != 1) {
                                var tableid = $('#curtable').val();
                                var rw = $('#currow').val();
                                var isFirefox = typeof InstallTrigger !== 'undefined';
                                if (isFirefox) {
                                    try {
                                        if (fromloop == "2") {
                                            var oTable = document.getElementById(tableid);
                                            var oCells = oTable.rows.item(rw).cells;
                                            var celLength = oCells.length;
                                            for (var km = 2; km < celLength; km++) {
                                                if (oTable.rows[rw].cells[km].childNodes[0].id == id) {
                                                    try {
                                                        if (oTable.rows[rw].cells[km + 1].childNodes[0].style.display == "none") {
                                                            oTable.rows[rw].cells[km + 2].childNodes[0].focus();
                                                        } else {
                                                            oTable.rows[rw].cells[km + 1].childNodes[0].focus();
                                                        }
                                                        break;
                                                    } catch (err) {
                                                    }
                                                }
                                            }
                                        } else {
                                            changefunctiongrid(id, 0, row, tablename);
                                        }
                                    } catch (err) {
                                        alert(err);
                                    }
                                } else {
                                    changefunctiongrid(id, 0, row, tablename);
                                }
                            }
                        }
                    }
                }
            }
        }, async: false});
//        getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" No Duplicate is Complted for id is "+id+" ,key is "+key+" and value is "+value);
//         $('#userwiselog').val($('#currentdate').val() +"\n"+$('#currentdate').val()+ " "+gettime(new Date)+" No Duplicate is Complted for id is "+id+" ,key is "+key+" and value is "+value);
}

function replaceString(label) {
    label = label.trim();
    var dtl = ["txttm", "txtdt", "txtarea", "txtdob", "selmul", "sel", "dat", "chkbox_", "txtmdgrd", "txtmenubtn", "dashqry", "txt"];
    for (var i = 0; i < dtl.length; i++) {
        if (label.indexOf(dtl[i]) == 0) {
            label = label.replace(dtl[i], "");
            break;
        }
    }
    if (label.indexOf("_searchid") != -1) {
        label = label.replace("_searchid", "");
    }
    if (label.indexOf("hd_") != -1) {
        label = label.replace("hd_", "");
    }
    return label;
}
function replacefunnew(field) {
    field = field.replace(/andsymbol/g, "&");
    field = field.replace(/persymbol/g, "%");
    field = field.replace(/colonsymbol/g, ":");
    field = field.replace(/plussymbol/, "+");
    return field;
}
function ReloadView(rt) {

    if (rt.indexOf("~lprow") != -1) {

        rt = rt.replace(/andsymbol/g, '&');
        var et = rt.split("~lprow");
        var searid = et[0];
        if (searid == 'txtGridSearch') {
            var tablename = $('#curtable').val();
            var row = $('#currow').val();
            var col = $('#curcol').val();
            for (var jl = 1; jl < et.length; jl++) {
                if (jl > 1) {
                    var b = addrowgridGrd(tablename);
                }
                var currow = parseInt(row) + (jl - 1);
                var val = et[jl].split(",!");
                $('#' + tablename + " tr:eq('" + currow + "')").find('input[type=text]:eq(' + (col - 1) + ')').val(val[1]);
                $('#' + tablename + " tr:eq('" + currow + "')").find('input[type=text]:eq(' + (col - 1) + ')').attr('title', val[0]);
                var id = $('#' + tablename + " tr:eq('" + row + "')").find('input[type=text]:eq(' + (col - 1) + ')').attr("id");
                changefunctiongrid(id, 0, currow, tablename);
            }
            return false;
        } else {
            var val = et[1].split(",!");
            document.getElementById(searid.trim()).value = val[1].trim();
            document.getElementById(searid.trim()).title = val[0].trim();
            for (var jl = 2; jl < et.length; jl++) {
                var val = et[jl].split(",!");
                var newrow = $("<tr id='tr" + replaceString(searid.trim()) + "_searchidmulsel" + (jl - 1) + "'><td></td><td><input id='" + searid.trim() + "mulsel" + (jl - 1) + "' onkeyup='delmulsel(this)' type='text' title='" + val[0].trim() + "' value ='" + val[1].trim() + "'></td></tr>");
                var rowid = "tr" + replaceString(searid.trim()) + "_searchid";
                $('#' + rowid).after(newrow);
            }
            $('#changetype').val(1);
            document.getElementById(searid.trim()).onchange();
        }
    } else {
        rt = rt.replace(/andsymbol/g, '&');
        var et = rt.split("@!!@");
        var value = et[et.length - 1];
        var key = et[et.length - 2];
        if (et[0] == 'txtGridSearch') {
            var tablename = $('#curtable').val();
            var row = $('#currow').val();
            var col = $('#curcol').val();
            $('#' + tablename + " tr:eq('" + row + "')").find('input[type=text]:eq(' + (col - 1) + ')').val(value);
            $('#' + tablename + " tr:eq('" + row + "')").find('input[type=text]:eq(' + (col - 1) + ')').attr('title', key);
            var id = $('#' + tablename + " tr:eq('" + row + "')").find('input[type=text]:eq(' + (col - 1) + ')').attr("id");
//           getlogdata("User "+$('#formusernm').val()+" select the value "+value+" From Search In Grid at Rownum"+row);
//           getlogdata("####"+tablename+",!Change,!"+key.trim()+",!"+value+",!Search,!"+row);
            checknoduplicate(id, key, value);
            return false;
        }
        if (et[0] == 'medreplace') {
            var value = et[et.length - 1];
            var key = et[et.length - 2];
            document.getElementById("medreplaceid").title = key;
            document.getElementById("medreplaceid").value = value;
            return false;
        }
        if (et[0] == 'txtsearchsoc_qry') {
            $('#txtsocnm').val(value);
            $('#txtsocid').val(key);
            var tables = ["dynamictable", "tabhidden", "tabAfter"];
            for (var ta = 0; ta < tables.length; ta++) {
                var table = document.getElementById(tables[ta]);
                var textbox = table.getElementsByTagName("input");
                var dropdown = table.getElementsByTagName("select");
                var paramdata = '';
                for (var i = 0; i < textbox.length; i++) {
                    if (textbox[i].type == "text") {
                        textbox[i].value = "";
                    }
                }
            }
            return false;
        }
        $('#' + et[0]).val(value);
        $('#changetype').val(1);
        if (et[0] == "search_qry") {
            clearGrid();
            document.getElementById(et[0]).value = key;
            document.getElementById(et[0]).onchange();
            return;
        }
        document.getElementById(et[0]).title = key;
//          getlogdata("User "+$('#formusernm').val()+" select the value "+value+" From Search");
//          getlogdata("####Form,!Change,!"+key.trim()+",!"+value+",!Search,!");
        document.getElementById(et[0]).onchange();
    }
}

function saveData(service) {

    
    var savtype = $('#txtSaveType').val();
    if (savtype == "edit") {
        var noedit = $('#hdnnoedit').val();
        ;
        if (noedit == "1") {
            alert("No Edit for this Form");
            return false;
        }
    }
    var askpwd = $('#hdnaskpwd').val();

    $('#btnsave').attr('disabled', 'disabled');
    var tablist = document.getElementsByTagName("table");
    var griddetails = "";
    for (var k = 0; k < tablist.length; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tab_dyna") != -1) {
            var t = tablist[k].title.split("@@@");
            var gridid = t[0];
            var gridtype = t[1];
            var qrycolnum;
            if (gridtype == "QueryRowsQueryCols" || gridtype == "UserRowsQueryCols") {
                qrycolnum = t[2];
            }
            griddetails = griddetails + "@@##@@@" + tabid + ",!" + gridid + ",!" + gridtype + ",!" + qrycolnum;
            var oTable = document.getElementById(tabid);
            var rowLength = oTable.rows.length;
            if (gridtype == "QueryRowsFixedCols") {
                for (i = 0; i < rowLength; i++) {
                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i == 0) {
//                            for (j = 1; j < celLength; j++)
//                            {
//                                value = oTable.rows[i].cells[j].innerHTML;
//                                griddetails = griddetails + "" + value + ",!";
//                            }
                        var matit = "";
                        for (j = 1; j < celLength; j++)
                        {
                            if (j == 1) {
                                griddetails = griddetails + "txtall_rows" + tabid.replace("tab_dyna_", "") + ",!";
                                matit = oTable.rows[i + 1].cells[j].childNodes[0].title;
                            } else {
                                value = oTable.rows[i + 1].cells[j].childNodes[0].id.replace(matit, "").replace(/\d/g, '');
                                griddetails = griddetails + "" + value + ",!";
                            }
                        }
                    }
                    if (i != 0) {
                        for (j = 1; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            if (type == "INPUT") {
                                if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        value = "to_date('','dd/mm/yyyy')";
                                    }
                                    else {
                                        value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        value = "to_date('','hh:mi:ss AM')";
                                    }
                                    else {
                                        value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                    }
                                }
                                else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                        value = "1";
                                    } else {
                                        value = "0";
                                    }
                                } else {
                                    var controltype = "";
                                    try {
                                        if (controltype == "SearchText") {
                                            if (oTable.rows[i].cells[j].childNodes[0].title == "" && oTable.rows[i].cells[j].childNodes[0].value != "") {
                                                alert("Please select the search Properly for rownum  " + i + ", for " + oTable.rows[i].cells[j].childNodes[0].value);
                                                $('#btnsave').removeAttr('disabled');
//						     $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                                                oTable.rows[i].cells[j].childNodes[0].focus();
                                                return false;
                                            }
                                        }
                                    } catch (err) {
                                    }
                                    if (oTable.rows[i].cells[j].childNodes[0].title == "")
                                        value = oTable.rows[i].cells[j].childNodes[0].value;
                                    else
                                        value = oTable.rows[i].cells[j].childNodes[0].title;
                                }
                            } else if (type == "TEXTAREA") {
                                value = oTable.rows[i].cells[j].childNodes[0].value;
                            } else if (type == "SELECT") {
                                $('#curtable').val(tabid);
                                $('#currow').val(i);
                                var name = oTable.rows[i].cells[j].childNodes[0].name;
                                if (name.trim() != "") {
                                    try {
                                        var name1 = name.split(",!");
                                        if (name1[1].trim() == "") {
                                            if (name1[0] == "1") {
                                                if (oTable.rows[i].cells[j].childNodes[0].value == "") {
                                                    alert(replaceString(oTable.rows[i].cells[j].childNodes[0].id) + " is Mandatory in rownum: " + i);
                                                    oTable.rows[i].cells[j].childNodes[0].focus();
                                                    $('#btnsave').removeAttr('disabled');
                                                    $('#btnpgsave').removeAttr('disabled');
                                                    document.getElementById("divsave").style.display = 'block';
                                                    document.getElementById("btprint").style.display = 'block';
                                                    return false;
                                                }
                                            }
                                        } else {
                                            if (name1[0] == "1") {

                                                var res = getFormulaValue(name1[1].replace("IF ", "").replace("THEN", ""), 'grid');
                                                if (res) {
                                                    if (oTable.rows[i].cells[j].childNodes[0].value == "") {
                                                        alert(replaceString(oTable.rows[i].cells[j].childNodes[0].id) + " is Mandatory in rownum: " + i);
                                                        $('#btnsave').removeAttr('disabled');
                                                        $('#btnpgsave').removeAttr('disabled');
                                                        document.getElementById("divsave").style.display = 'block';
                                                        document.getElementById("btprint").style.display = 'block';
                                                        oTable.rows[i].cells[j].childNodes[0].focus();
                                                        return false;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (err) {
                                    }
                                }
                                value = oTable.rows[i].cells[j].childNodes[0].value;
                            }
                            if (value == "")
                                value = " ";
                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                }
            }
            else if (gridtype == "QueryRowsQueryCols") {
                for (i = 0; i < rowLength; i++) {
                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i == 0) {
                        for (j = 1; j < celLength; j++)
                        {
                            value = oTable.rows[i].cells[j].innerHTML;
                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                    if (i != 0) {
                        for (j = 1; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            if (type == "INPUT") {
                                var val = "";
                                if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        val = "to_date('','dd/mm/yyyy')";
                                    }
                                    else {
                                        val = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        val = "to_date('','hh:mi:ss AM')";
                                    }
                                    else {
                                        val = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                        val = "1";
                                    } else {
                                        val = "0";
                                    }
                                } else {
                                    val = oTable.rows[i].cells[j].childNodes[0].value;
                                }
                                if (val == "")
                                    val = " ";
                                value = oTable.rows[i].cells[j].childNodes[0].title + ",~" + val;
                            }
                            if (value == "")
                                value = " ";
                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                }
            }
            else if (gridtype == "UserRowsFixedCols") {
                for (i = 0; i < rowLength; i++) {
                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i == 0) {
                        for (j = 2; j < celLength; j++)
                        {
                            value = oTable.rows[i + 1].cells[j].childNodes[0].id;
                            var ctype = $(oTable.rows[i + 1].cells[j].childNodes[0]).attr("controltype");
                            if (ctype == "Date") {
                                value = value.replace(/[0-9]/g, '');
                            }
                            if (ctype == "Time") {
                                value = value.replace(/[0-9]/g, '');
                            }
                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                    if (i != 0) {
                        for (j = 2; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            if (type == "INPUT") {
                                $('#curtable').val(tabid);
                                $('#currow').val(i);
                                var name = oTable.rows[i].cells[j].childNodes[0].name;
                                if (name.trim() != "") {
                                    try {
                                        var name1 = name.split(",!");
                                        if (name1[1].trim() == "") {
                                            if (name1[0] == "1") {
                                                if (oTable.rows[i].cells[j].childNodes[0].value == "") {
                                                    alert(replaceString(oTable.rows[i].cells[j].childNodes[0].id) + " is Mandatory in rownum: " + i);
                                                    oTable.rows[i].cells[j].childNodes[0].focus();
                                                    $('#btnsave').removeAttr('disabled');
//							$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                                                    return false;
                                                }
                                            }
                                        } else {
                                            if (name1[0] == "1") {

                                                var res = getFormulaValue(name1[1].replace("IF ", "").replace("THEN", ""), 'grid');
                                                if (res) {
                                                    if (oTable.rows[i].cells[j].childNodes[0].value == "" || oTable.rows[i].cells[j].childNodes[0].value == "0") {
                                                        alert(replaceString(oTable.rows[i].cells[j].childNodes[0].id) + " is Mandatory in rownum: " + i);
                                                        $('#btnsave').removeAttr('disabled');
//							    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                                                        oTable.rows[i].cells[j].childNodes[0].focus();
                                                        return false;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (err) {
                                    }
                                }
                                if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        value = "to_date('','dd/mm/yyyy')";
                                    }
                                    else {
                                        value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        value = "to_date('','hh:mi:ss AM')";
                                    }
                                    else {
                                        value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                        value = "1";
                                    }
                                    else {
                                        value = "0";
                                    }
                                } else {
                                    var controltype = $(oTable.rows[i].cells[j].childNodes[0]).attr("controltype");
                                    try {
                                        if (controltype == "SearchText") {
                                            if (oTable.rows[i].cells[j].childNodes[0].title == "" && oTable.rows[i].cells[j].childNodes[0].value != "") {
                                                alert("Please select the search Properly for rownum  " + i + ", for " + oTable.rows[i].cells[j].childNodes[0].value);
                                                $('#btnsave').removeAttr('disabled');
                                                $('#btnpgsave').removeAttr('disabled');
                                                document.getElementById("divsave").style.display = 'block';
                                                oTable.rows[i].cells[j].childNodes[0].focus();
                                                return false;
                                            }
                                        }
                                    } catch (err) {
                                    }
                                    if (oTable.rows[i].cells[j].childNodes[0].title == "")
                                        value = oTable.rows[i].cells[j].childNodes[0].value;
                                    else
                                        value = oTable.rows[i].cells[j].childNodes[0].title;
                                }
                            } else if (type == "SELECT") {
                                value = oTable.rows[i].cells[j].childNodes[0].value;
                            }
                            else if (type == "TEXTAREA") {
                                value = oTable.rows[i].cells[j].childNodes[0].value;
                            }
                            if (value == "")
                                value = " ";
                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                }
            }//UserRowsQueryCols
            else if (gridtype == "UserRowsQueryCols") {
                for (i = 0; i < rowLength; i++) {
                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i == 0) {
                        for (j = 2; j < celLength; j++)
                        {
                            value = oTable.rows[i].cells[j].innerHTML;
                            value = oTable.rows[i + 1].cells[j].childNodes[0].id;
                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                    if (i != 0) {
                        for (j = 2; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            if (type == "INPUT") {
                                var val;
                                if (j < (parseInt(qrycolnum) + 2)) {
                                    if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                            value = "to_date('','dd/mm/yyyy')";
                                        }
                                        else {
                                            value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                        }
                                    } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                            value = "to_date('','hh:mi:ss AM')";
                                        }
                                        else {
                                            value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                        }
                                    } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                            value = "1";
                                        } else {
                                            value = "0";
                                        }
                                    } else {
                                        try {
                                            if (controltype == "SearchText") {
                                                if (oTable.rows[i].cells[j].childNodes[0].title == "" && oTable.rows[i].cells[j].childNodes[0].value != "") {
                                                    alert("Please select the search Properly for rownum  " + i + ", for " + oTable.rows[i].cells[j].childNodes[0].value);
                                                    $('#btnsave').removeAttr('disabled');

                                                    oTable.rows[i].cells[j].childNodes[0].focus();
                                                    return false;
                                                }
                                            }
                                        } catch (err) {
                                        }
                                        if (oTable.rows[i].cells[j].childNodes[0].title == "")
                                            value = oTable.rows[i].cells[j].childNodes[0].value;
                                        else
                                            value = oTable.rows[i].cells[j].childNodes[0].title;
                                    }
                                }
                                else {
                                    if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                            value = "to_date('','dd/mm/yyyy')";
                                        }
                                        else {
                                            value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                        }
                                    }
                                    else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                            value = "to_date('','hh:mi:ss AM')";
                                        }
                                        else {
                                            value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                        }
                                    } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                            value = "1";
                                        } else {
                                            value = "0";
                                        }
                                    } else {
                                        val = oTable.rows[i].cells[j].childNodes[0].value;
                                        if (val == "")
                                            val = " ";
                                        value = oTable.rows[i].cells[j].childNodes[0].title + ",~" + val;
                                    }
                                }
                            }
                            else if (type == "SELECT") {
                                value = oTable.rows[i].cells[j].childNodes[0].value;
                            }
                            if (value == "")
                                value = " ";
                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                }
            }
        }
    }
    var active = 1;
    if (document.getElementById("rdbactive").checked == true)
    {
        active = 1;
    }
    else
    {
        active = 0;
    }
    var formid = localStorage.currentformid;
    var formnm = $('#hdnformname').val();
    var showcompnm = $('#subcompany').val();
    ;
    var socmaster = $('#hdnsocmaster').val();
    var primkeyfield = $('#txtprimKeyField').val();
    var savetype = $('#txtSaveType').val();
//    var filename=$('#fileName').val();

    var paramdata = '';
//     var isAttachment = false;  not requiried
    var tables = ["dynamictable", "tabhidden", "tabAfter"];
    var tablist = document.getElementsByTagName("table");
    for (var k = 0; k < tablist.length; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tab_dyna") != -1) {
            var tid = "tabgrd" + tabid.replace("tab_dyna_", "");
            try {
                tables.push("tabgrd" + tabid.replace("tab_dyna_", ""));
                document.getElementById(tid);
            } catch (err) {
                continue;
            }
        }
    }

    for (var ta = 0; ta < tables.length; ta++) {
        var table = document.getElementById(tables[ta]);
        var textbox = table.getElementsByTagName("input");
        var dropdown = table.getElementsByTagName("select");
        var checkbox = table.getElementsByTagName("checkbox");
        var textarea = table.getElementsByTagName("textarea");
        var divids = table.getElementsByTagName("div");
        for (var i = 0; i < textbox.length; i++) {
            if (textbox[i].type == "text" || textbox[i].type == "password") {
                if (textbox[i].id.indexOf("txtYears") == 0 || textbox[i].id.indexOf("txtMonths") == 0 || textbox[i].id.indexOf("txtDays") == 0) {
                    continue;
                }
                var name = textbox[i].name;
                if (name == "" && textbox[i].id.indexOf("searchidmulsel") != -1) {
                    paramdata = paramdata + "~lprow" + textbox[i].id + ",!" + textbox[i].title;
                    continue;
                } else if (name == "")
                {
                    continue;
                }
//                   if(textbox[i].id == "fileName"){//file name is not there
//                        isAttachment = true;
//                        continue;
//                    }
                paramdata = paramdata + "@!!@";
                var name1 = name.split(",!");
                if (name1[1].trim() == "") {
                    if (name1[0] == "1") {
                        if (textbox[i].value == "") {
                            $('#curfocusid').val(textbox[i].id);
//                                alert(textbox[i].id.replace('txt','').replace(/_/g,' ')+" is Mandatory");
                            changeWizard(textbox[i], textbox[i].id.replace('txt', '').replace(/_/g, ' ') + " is Mandatory");
                            $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');//not there in mobile this web save div
//				document.getElementById("divsave").style.display = 'block';
//				document.getElementById("btprint").style.display = 'block';
                            textbox[i].focus();
                            return false;
                        }
                    }
                } else {
                    if (name1[0] == "1") {

                        var res = getFormulaValue(name1[1].replace("IF ", "").replace("THEN", ""), '');
                        if (res) {
                            if (textbox[i].value == "") {
                                $('#curfocusid').val(textbox[i].id);
//                                    alert(textbox[i].id.replace('txt','').replace(/_/g,' ')+" is Mandatory");
                                changeWizard(textbox[i], textbox[i].id.replace('txt', '').replace(/_/g, ' ') + " is Mandatory");
                                $('#btnsave').removeAttr('disabled');
//				    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                                textbox[i].focus();
                                return false;
                            }
                        }
                    }
                }
                if (name1[2] == "1") {
                    paramdata = paramdata + "~mulsel";
                }
                var val = textbox[i].value;
                if (val == "") {
                    val = " ";
                }
                try {
                    var cls = $(textbox[i]).attr('class');
                    if (cls.indexOf("upper") != -1) {
                        val = val.toUpperCase();
                    }
                } catch (err) {
                }

                if (textbox[i].id.indexOf("_searchid") != -1) {
                    var titin = textbox[i].title;
                    if (titin == "") {
                        titin = " ";
                    }
                    paramdata = paramdata + "" + textbox[i].id + ",!" + titin;
                }
                else if (textbox[i].id.indexOf("txtdt") == 0) {
                    if (val.trim() != "")
                        paramdata = paramdata + "" + textbox[i].id + ",!to_date('" + val + "','dd/mm/yyyy')";
                    else
                        paramdata = paramdata + "" + textbox[i].id + ",!to_date('','dd/mm/yyyy')";
                }
                else if (textbox[i].id.indexOf("txttm") == 0) {
                    if (val.trim() != "") {
                        if (val.substr(0, 2) == 0) {
                            val = "12" + val.substr(2, val.length);
                        }
                        paramdata = paramdata + "" + textbox[i].id + ",!to_date('" + val + "','hh:mi:ss am')";
                    }
                    else
                        paramdata = paramdata + "" + textbox[i].id + ",!to_date('','hh:mi:ss am')";
                }
                else if (textbox[i].id.indexOf("txtdob") == 0) {
                    var labl = textbox[i].id.replace("txtdob", "");
                    if (val.trim() == "") {
                        val = "''";
                    } else {
                        val = "to_date('" + val + "','dd/mm/yyyy')";
                    }
                    paramdata = paramdata + "" + textbox[i].id + ",!" + val;
                    var years = $('#txtYears' + labl).val();
                    if (years.trim() == "")
                        years = 0;
                    var months = $('#txtMonths' + labl).val();
                    if (months.trim() == "")
                        months = 0;
                    var days = $('#txtDays' + labl).val();
                    if (days.trim() == "")
                        days = 0;
                    if (val != "''" && years == 0 && months == 0 && days == 0) {
                        alert("years or months or days is mandatory for age");
                        return;
                    }
                    paramdata = paramdata + ",~" + years + ",~" + months + ",~" + days;
                }
                else {
                    if (val == "")
                        val = " ";
                    paramdata = paramdata + "" + textbox[i].id + ",!" + val;
                }
            }
            if (textbox[i].type == "checkbox") {
                if (textbox[i].id.indexOf("selmul") == 0)
                    continue;
                var val = document.getElementById(textbox[i].id).checked;
                var value1 = 0;
                if (val == true) {
                    value1 = 1;
                }
                paramdata = paramdata + "@!!@" + textbox[i].id + ",!" + value1;
            }
            if (textbox[i].type == "radio") {
                var curid = textbox[i].name;
                if (curid != preid) {
                    var value1 = $('input[name=' + textbox[i].name + ']:checked').val();
                    paramdata = paramdata + "@!!@" + textbox[i].name + ",!" + value1;
                }
                var preid = textbox[i].name;
            }
        }

        for (var i = 0; i < dropdown.length; i++) {
            if (dropdown[i].id.indexOf("selmul") == 0) {
                var countries = [];
                $.each($("#" + dropdown[i].id + " option:selected"), function () {
                    countries.push($(this).val());
                });
                var val = countries.join("$");
                if (val.trim() == "") {
                    var nm = dropdown[i].name.split(",!");
                    if (nm[0] == 1) {
                        if (nm[1] == "") {
                            alert("Please select atleast one option for " + dropdown[i].id.replace("selmul", ""));
                            $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                            return false;
                        } else {
                            var res = getFormulaValue(nm[1].replace("IF ", "").replace("THEN ", ""), '');
                            if (res) {
                                alert("Please select atleast one option for " + dropdown[i].id.replace("selmul", ""));
                                $('#btnsave').removeAttr('disabled');
//				    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                                return false;
                            }
                        }
                    }
                }
                if (val.trim() == "")
                    val = " ";
                paramdata = paramdata + "@!!@" + dropdown[i].id + ",!" + val;
            } else {
                try {
//                        if(dropdown[i].name.trim() == '1' && $("#" + dropdown[i].id + " :selected").val()==""){
//                        alert("Please select one option for "+dropdown[i].id.replace("sel",""));
//                                    $('#btnsave').removeAttr('disabled');$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
//                                    return false;
//                    }
                    if ($("#" + dropdown[i].id + " :selected").val() == "") {
                        var nm = dropdown[i].name.split(",!");
                        if (nm[0] == 1) {
                            if (nm[1] == "") {
                                alert("Please select atleast one option for " + dropdown[i].id.replace("selmul", ""));
                                $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                                return false;
                            } else {
                                var res = getFormulaValue(nm[1].replace("IF ", "").replace("THEN", ""), '');
                                //alert(nm[1]+"---"+res);
                                if (res) {
                                    alert("Please select atleast one option for " + dropdown[i].id.replace("selmul", ""));
                                    $('#btnsave').removeAttr('disabled');
//				    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                                    return false;
                                }
                            }
                        }
                    }
                } catch (err) {
                }
                if (dropdown[i].id != "" && $("#" + dropdown[i].id + " :selected").val() != "") {
                    paramdata = paramdata + "@!!@" + dropdown[i].id + ",!" + $("#" + dropdown[i].id + " :selected").val();
                }
            }
        }
//        for (var i = 0; i < textarea.length; i++) {
//            var val = document.getElementById(textarea[i].id).value;
//            if (val == "")
//                val = " ";
//            if (textarea[i].id == "textbox") {
//                var editor = textboxio.replace('#textbox');
//
//                var worddata = editor.content.get();
//                paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + worddata;
//                //alert(worddata);
//                continue;
//            }
//            var name = textarea[i].name;
//            var name1 = name.split(",!");
//            if (name1[1].trim() == "") {
//                if (name1[0] == "1") {
//                    if (textarea[i].value == "") {
//                        changeWizard(textbox[i]);
//                        //alert(textarea[i].id.replace('txtarea', '').replace(/_/g, ' ') + " is Mandatory");
//                        textarea[i].focus();
//                        $('#btnsave').removeAttr('disabled');
//                        return false;
//                    }
//                }
//            } else {
//                if (name1[0] == "1") {
//                    var res = getFormulaValue(name1[1].replace("IF ", "").replace("THEN ", ""), '');
//                    if (res) {
//                        if (textarea[i].value == "") {
//                            changeWizard(textbox[i]);
//                            //alert(textarea[i].id.replace('txtarea', '').replace(/_/g, ' ') + " is Mandatory");
//                            $('#btnsave').removeAttr('disabled');
//                            textarea[i].focus();
//                            return false;
//                        }
//                    }
//                }
//            }
//            paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + val;
//        }
        for (var i = 0; i < textarea.length; i++) {
            var val = document.getElementById(textarea[i].id).value;
            if (val == "")
                val = " ";
            val = val.replace(/'/g, "`");
            if (textarea[i].id.toString().indexOf("textbox") == 0) {
                var worddata = tinymce.get(textarea[i].id).getContent();
                var idd = textarea[i].id;
                var appcode = $('#' + idd).attr("appletcode");
                var titlecode = document.getElementById(idd).title;
                paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + worddata.replace(/'/g, "''") + ",!" + appcode + ",!" + titlecode;
                continue;
            }
            var name = textarea[i].name;
            var name1 = name.split(",!");
            if (name1[1].trim() == "") {
                if (name1[0] == "1") {
                    if (textarea[i].value == "") {
                        $('#curfocusid').val(textarea[i].id);
//                            alert(textarea[i].id.replace('txtarea','').replace(/_/g,' ')+" is Mandatory");
                        changeWizard(textarea[i], textarea[i].id.replace('txtarea', '').replace(/_/g, ' ') + " IS Mandatory");
                        textarea[i].focus();
                        $('#btnsave').removeAttr('disabled');
//			    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                        return false;
                    }
                }
            } else {
                if (name1[0] == "1") {
                    var res = getFormulaValue(name1[1].replace("IF ", "").replace("THEN ", ""), '');
                    if (res) {
                        if (textarea[i].value == "") {
                            $('#curfocusid').val(textarea[i].id);
//                                alert(textarea[i].id.replace('txtarea','').replace(/_/g,' ')+" is Mandatory");
                            changeWizard(textarea[i], textarea[i].id.replace('txtarea', '').replace(/_/g, ' ') + " IS Mandatory");
                            $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                            textarea[i].focus();
                            return false;
                        }
                    }
                }
            }
            paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + val;
        }

//        for (var i = 0; i < divids.length; i++) {
//            try {
//                if (divids[i].id.indexOf("selmul") == 0) {
//                    var selected = [];
//                    $('div#' + divids[i].id + ' input[type=checkbox]').each(function () {
//                        if ($(this).is(":checked")) {
//                            selected.push($(this).attr('value'));
//    }
//                    });
//                    var val = selected.join("$");
//                    if (val == "")
//                        val = " ";
//                    paramdata = paramdata + "@!!@" + divids[i].id + ",!" + val;
//                }
//            } catch (err) {
//            }
//        }
        for (var i = 0; i < divids.length; i++) {
            try {
                if (divids[i].id.indexOf("selmul") == 0) {
                    var selected = [];
                    $('div#' + divids[i].id + ' input[type=checkbox]').each(function () {
                        if ($(this).is(":checked")) {
                            selected.push($(this).attr('value'));
                        }
                    });
                    var val = selected.join("$");
                    try {
                        if (val.trim() == "") {
                            var nm = $('#' + divids[i].id).attr("name").split(",!");
                            if (nm[0] == 1) {
                                if (nm[1] == "") {
                                    var lablnm = $('#lbl' + divids[i].id.replace("sel", "")).html();
                                    if (lablnm == "" || lablnm == undefined) {
                                        lablnm = divids[i].id.replace("sel", "");
                                    }
                                    changeWizard(lablnm, lablnm.replace('mul', '').replace(/_/g, ' ') + " IS Mandatory");
//                                alert("Please select atleast one option for "+lablnm);
                                    $('#btnsave').removeAttr('disabled');
                                    $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');
//				document.getElementById("divsave").style.display = 'block';
                                    return false;
                                } else {
                                    var res = getFormulaValue(nm[1].replace("IF ", "").replace("THEN ", ""), '');
                                    if (res) {
                                        var lablnm = $('#lbl' + divids[i].id.replace("sel", "")).html();
                                        if (lablnm == "" || lablnm == undefined) {
                                            lablnm = divids[i].id.replace("sel", "");
                                        }
                                        changeWizard(lablnm, lablnm.replace('mul', '').replace(/_/g, ' ') + " IS Mandatory");
                                        $('#btnsave').removeAttr('disabled');
//				    $('#btnpgsave').removeAttr('disabled');
//				    document.getElementById("divsave").style.display = 'block';
                                        return false;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                    }
                    if (val == "")
                        val = " ";
                    paramdata = paramdata + "@!!@" + divids[i].id + ",!" + val;
                }
            } catch (err) {
            }
        }
    }
    var paramattach = "";
//    alert("isAttachment"+isAttachment);
//  if(isAttachment == true){
    var oTable = document.getElementById('tabAttach');
    if (oTable == "" || oTable == null) {

    } else {
        var rowLength = oTable.rows.length;
        var param = "";
        for (i = 1; i < rowLength; i++) {
            var oCells = oTable.rows.item(i).cells;
            var celLength = oCells.length;
            var nm = oTable.rows[i].cells[2].innerHTML;
            var fnm = oTable.rows[i].cells[3].textContent;
            var snm = oTable.rows[i].cells[4].innerHTML;
            paramattach = paramattach + "@!!@" + nm + ",!" + fnm + ",!" + snm;
        }
    }
//        }     
    paramdata = paramdata.replace(/%/g, 'persymbol');
    paramdata = paramdata.replace(/&/g, 'andsymbol');
    paramdata = paramdata.replace(/#/g, 'hashsymbol');
    paramattach = replacefun1(paramattach);
//    alert("old paramdata"+paramdata);
    var request = "";
    var optionform = $('#hdnoptionform').val();
    var extendedmaster = $('#hdnextendedmaster').val();
    var url = localStorage.ipadrs + "/WebFormSave?reqtype=save";
    if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    request.onreadystatechange = function () {

        if (request.readyState == 4) {
            var response = request.responseText;
            var res = response.split("&&");
            hideProgress();
            if (res[0] == "save") {

                $("#imgid").val(res[2]);
                var printsave = $('#hdnprintaftersave').val();
                if (printsave == 1) {
                    $('#hdnnsavealert').val("");
                    var chk = confirm("Saved Successfuly, Do you want to Print");
                    if (chk == true) {
                        print();
                        print1();
                    }
                } else {
                    if (localStorage.reg != "1") {
                        $('#hdnnsavealert').val("");
                        alert("Record Saved Successfully");
                    }
                    if ($('#hdnwizard').val() === "1") {
                        $('.btnprevnextsavediv').hide();
                        $('.btnprevnextprintdiv').show();
                    }
                }
                var res1 = res[1].split("@@@");
                $('#txtprimKeyField').val(res1[0]);
                try {
                    var dt = res1[1].split(",!");

                    for (var r = 0; r < dt.length; r++) {
                        var d = dt[r].split("=");
                        $('#' + d[0].replace(" ", "_")).val(d[1]);
                    }
                } catch (err) {
                }
                document.getElementById("btnsave").style.display = 'none';

                filltrack();
                SavePhoto();
                if (localStorage.reg == "1") {
                    showRegmsg(d[1]);
                    var path = localStorage.mahappurl + "/formviewlogin?mrno=" + d[1] + "&mobile=getregpwd";
                    localStorage.patmrno = d[1];
                    getPwd(path);
//                     location.href = 'PatientLoginSecondScreen.html';
                }


            }
            else if (res[0] == "update") {
                var printsave = $('#hdnprintaftersave').val();
                if (printsave == 1) {
                    $('#hdnnsavealert').val("");
                    var chk = confirm("Saved Successfuly, Do you want to Print");
                    if (chk == true) {
                        print();
                        print1();
                    }
                } else {
                    $('#hdnnsavealert').val("");
                    alert("Record Updated Successfully");
                }
                $("#imgid").val(res[1]);
                $('#txtprimKeyField').val(res[1]);
                $('#btnsave').attr('disabled', 'disabled');
                $('#btnedit').removeAttr('disabled');
                document.getElementById("btnsave").style.display = 'none';
                filltrack();
            }
            else {
                alert(response.replace('com.shivam.admin.WebFormViewException:', 'Error:\n'));
                $('#btnsave').removeAttr('disabled');
            }
        }
    };

    paramdata = paramdata.replace(/%/g, "");
    griddetails = griddetails.replace(/%/g, 'persymbol').replace(/&/g, 'andsymbol');
    var gusernm = "";
    gusernm = $('#hdnsaveusernm').val();
    if (localStorage.appname != "dashboard") {
        gusernm = "SHIVAM";
        localStorage.usernm = "SHIVAM";
    }

    if (askpwd === "1" && localStorage.getItem("donotaskpwd") === null) {
//mobile = "&mobile=yes&guserid=" + $('#hdnsaveuserid').val() + "&gusernm=" + $('#hdnsaveusernm').val() + "&gloc=" + localStorage.locid + "&gdept= &gsubdept= &ShiftId=SH000001&version=APP&clientip=" + localStorage.terminal;
        //mobile = "&mobile=yes&guserid=" + $('#hdnsaveuserid').val() + "&gusernm=" + gusernm + "&gloc=" + localStorage.locid + "&gdept= &gsubdept= &ShiftId=SH000001&version=APP&clientip=" + localStorage.terminal;
        mobile = "&mobile=yes&guserid=" + $('#hdnsaveuserid').val() + "&gusernm=" + gusernm + "&gloc=" + localStorage.locid + "&gdept= &gsubdept= &ShiftId=SH000001&version=APP&clientip=" + localStorage.terminal + "&rights=" + encodeURIComponent(localStorage.rights);
    }

    var data = "formid=" + formid + "&showcompnm=" + showcompnm + "&formnm=" + formnm + "&savetype=" + savetype + "&active=" + active + "&paramdata=" + paramdata + "&primkeyfield=" + primkeyfield + "&socmaster=" + socmaster + "&socid=" + $('#txtsocid').val() + "&optionform=" + optionform + "&extendedmaster=" + extendedmaster + "&paramdata=" + paramdata.replace(/&/g, "") + "&griddetails=" + griddetails + "&paramattach=" + paramattach + mobile;
    if ($('#hdnpgservice').val() === "1") {
        localStorage.banknm = $('#hdnbankname').val();
        $('#popuppayment').hide();
        if (service === undefined) {
            var pgfname = $('#hdnpgfname').val();
            var pglname = $('#hdnpglname').val();
            var pgmobile = $('#hdnpgmobile').val();
            var pgemail = $('#hdnpgemail').val();
            var pgamount = $('#hdnpgamount').val();
            var fname = $("#" + pgfname).val();
            var lname = $("#" + pglname).val();
            var pmobile = $("#" + pgmobile).val();
            var email = $("#" + pgemail).val();
            var amount = $("#" + pgamount).val();
            if (fname === "") {
                $('#btnsave').removeAttr('disabled');
                alert("Name is Mandatory");
                $("#" + pgfname).focus();
                return;
            }
            if (pmobile === "") {
                $('#btnsave').removeAttr('disabled');
                alert("Mobile number is Mandatory");
                $("#" + pgmobile).focus();
                return;
            }
            if (email === "") {
                $('#btnsave').removeAttr('disabled');
                alert("Emial id  is Mandatory");
                $("#" + pgemail).focus();
                return;
            }
            if (amount === "") {
                $('#btnsave').removeAttr('disabled');
                alert("Amount is Mandatory");
                $("#" + pgamount).focus();
                return;
            }
            $('#lblpgname').html(fname + " " + lname);
            $('#lblpgmobileno').html(pmobile);
            $('#lblpgemail').html(email);
            $('#lblpgamount').html(amount + ".00 ");
            $('#popuppayment').show();
            return;
        } else if (service === "1") {
            var pgfname = $('#hdnpgfname').val();
            var pglname = $('#hdnpglname').val();
            var pgmobile = $('#hdnpgmobile').val();
            var pgemail = $('#hdnpgemail').val();
            var pgamount = $('#hdnpgamount').val();
            var fname = $("#" + pgfname).val();
            var lname = $("#" + pglname).val();
            var pmobile = $("#" + pgmobile).val();
            var email = $("#" + pgemail).val();
            var amount = $("#" + pgamount).val();
            data = url + "&" + data + "&pgfname=" + fname + "&pglname=" + lname + "&pgemail=" + email + "&pgmobile=" + pmobile + "&pgamount=" + amount + "&pgreturnurl=" + formid;
            localStorage.data = data;
            location.href = 'PaymentGetway.html';
            // makepayment(data,localStorage.ipadrs);
            return;
        } else if (service === "0") {

        }
    }
    showsaveProgress();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
}
function savevalidation() {

    
    var savtype = $('#txtSaveType').val();
    if (savtype == "edit") {
        var noedit = $('#hdnnoedit').val();
        ;
        if (noedit == "1") {
            alert("No Edit for this Form");
            return false;
        }
    }
    var askpwd = $('#hdnaskpwd').val();

    $('#btnsave').attr('disabled', 'disabled');
    var tablist = document.getElementsByTagName("table");
//    var griddetails = "";
    for (var k = 0; k < tablist.length; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tab_dyna") != -1) {
            var t = tablist[k].title.split("@@@");
            var gridid = t[0];
            var gridtype = t[1];
            var qrycolnum;
            if (gridtype == "QueryRowsQueryCols" || gridtype == "UserRowsQueryCols") {
                qrycolnum = t[2];
            }
//            griddetails = griddetails + "@@##@@@" + tabid + ",!" + gridid + ",!" + gridtype + ",!" + qrycolnum;
            var oTable = document.getElementById(tabid);
            var rowLength = oTable.rows.length;
            if (gridtype == "QueryRowsFixedCols") {
                for (i = 0; i < rowLength; i++) {
//                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    try {
                        if (i == 0) {
//                            for (j = 1; j < celLength; j++)
//                            {
//                                value = oTable.rows[i].cells[j].innerHTML;
//                                griddetails = griddetails + "" + value + ",!";
//                            }
                            var matit = "";
                            for (j = 1; j < celLength; j++)
                            {
                                if (j == 1) {
//                                griddetails = griddetails + "txtall_rows" + tabid.replace("tab_dyna_", "") + ",!";
                                    matit = oTable.rows[i + 1].cells[j].childNodes[0].title;
                                } else {
                                    value = oTable.rows[i + 1].cells[j].childNodes[0].id.replace(matit, "").replace(/\d/g, '');
//                                griddetails = griddetails + "" + value + ",!";
                                }
                            }
                        }
                    } catch (error) {
                    }
                    if (i != 0) {
                        for (j = 1; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            if (type == "INPUT") {
                                if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        value = "to_date('','dd/mm/yyyy')";
                                    }
                                    else {
                                        value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        value = "to_date('','hh:mi:ss AM')";
                                    }
                                    else {
                                        value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                    }
                                }
                                else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                        value = "1";
                                    } else {
                                        value = "0";
                                    }
                                } else {
                                    var controltype = "";
                                    try {
                                        if (controltype == "SearchText") {
                                            if (oTable.rows[i].cells[j].childNodes[0].title == "" && oTable.rows[i].cells[j].childNodes[0].value != "") {
                                                alert("Please select the search Properly for rownum  " + i + ", for " + oTable.rows[i].cells[j].childNodes[0].value);
                                                $('#btnsave').removeAttr('disabled');
//						     $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                                                oTable.rows[i].cells[j].childNodes[0].focus();
                                                return false;
                                            }
                                        }
                                    } catch (err) {
                                    }
                                    if (oTable.rows[i].cells[j].childNodes[0].title == "")
                                        value = oTable.rows[i].cells[j].childNodes[0].value;
                                    else
                                        value = oTable.rows[i].cells[j].childNodes[0].title;
                                }
                            }
                            if (value == "")
                                value = " ";
//                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                }
            }
            else if (gridtype == "QueryRowsQueryCols") {
                for (i = 0; i < rowLength; i++) {
//                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i == 0) {
                        for (j = 1; j < celLength; j++)
                        {
                            value = oTable.rows[i].cells[j].innerHTML;
//                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                    if (i != 0) {
                        for (j = 1; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            if (type == "INPUT") {
                                var val = "";
                                if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        val = "to_date('','dd/mm/yyyy')";
                                    }
                                    else {
                                        val = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        val = "to_date('','hh:mi:ss AM')";
                                    }
                                    else {
                                        val = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                        val = "1";
                                    } else {
                                        val = "0";
                                    }
                                } else {
                                    val = oTable.rows[i].cells[j].childNodes[0].value;
                                }
                                if (val == "")
                                    val = " ";
                                value = oTable.rows[i].cells[j].childNodes[0].title + ",~" + val;
                            }
                            if (value == "")
                                value = " ";
//                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                }
            }
            else if (gridtype == "UserRowsFixedCols") {
                for (i = 0; i < rowLength; i++) {
//                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i == 0) {
                        for (j = 2; j < celLength; j++)
                        {
                            value = oTable.rows[i + 1].cells[j].childNodes[0].id;
                            var ctype = $(oTable.rows[i + 1].cells[j].childNodes[0]).attr("controltype");
                            if (ctype == "Date") {
                                value = value.replace(/[0-9]/g, '');
                            }
                            if (ctype == "Time") {
                                value = value.replace(/[0-9]/g, '');
                            }
//                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                    if (i != 0) {
                        for (j = 2; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            if (type == "INPUT") {
                                $('#curtable').val(tabid);
                                $('#currow').val(i);
                                var name = oTable.rows[i].cells[j].childNodes[0].name;
                                if (name.trim() != "") {
                                    try {
                                        var name1 = name.split(",!");
                                        if (name1[1].trim() == "") {
                                            if (name1[0] == "1") {
                                                if (oTable.rows[i].cells[j].childNodes[0].value == "") {
                                                    alert(replaceString(oTable.rows[i].cells[j].childNodes[0].id) + " is Mandatory in rownum: " + i);
                                                    oTable.rows[i].cells[j].childNodes[0].focus();
                                                    $('#btnsave').removeAttr('disabled');
//							$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                                                    return false;
                                                }
                                            }
                                        } else {
                                            if (name1[0] == "1") {

                                                var res = getFormulaValue(name1[1].replace("IF ", "").replace("THEN", ""), 'grid');
                                                if (res) {
                                                    if (oTable.rows[i].cells[j].childNodes[0].value == "" || oTable.rows[i].cells[j].childNodes[0].value == "0") {
                                                        alert(replaceString(oTable.rows[i].cells[j].childNodes[0].id) + " is Mandatory in rownum: " + i);
                                                        $('#btnsave').removeAttr('disabled');
//							    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                                                        oTable.rows[i].cells[j].childNodes[0].focus();
                                                        return false;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (err) {
                                    }
                                }
                                if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        value = "to_date('','dd/mm/yyyy')";
                                    }
                                    else {
                                        value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                        value = "to_date('','hh:mi:ss AM')";
                                    }
                                    else {
                                        value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                    }
                                } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                    if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                        value = "1";
                                    }
                                    else {
                                        value = "0";
                                    }
                                } else {
                                    var controltype = $(oTable.rows[i].cells[j].childNodes[0]).attr("controltype");
                                    try {
                                        if (controltype == "SearchText") {
                                            if (oTable.rows[i].cells[j].childNodes[0].title == "" && oTable.rows[i].cells[j].childNodes[0].value != "") {
                                                alert("Please select the search Properly for rownum  " + i + ", for " + oTable.rows[i].cells[j].childNodes[0].value);
                                                $('#btnsave').removeAttr('disabled');
                                                $('#btnpgsave').removeAttr('disabled');
                                                document.getElementById("divsave").style.display = 'block';
                                                oTable.rows[i].cells[j].childNodes[0].focus();
                                                return false;
                                            }
                                        }
                                    } catch (err) {
                                    }
                                    if (oTable.rows[i].cells[j].childNodes[0].title == "")
                                        value = oTable.rows[i].cells[j].childNodes[0].value;
                                    else
                                        value = oTable.rows[i].cells[j].childNodes[0].title;
                                }
                            } else if (type == "SELECT") {
                                value = oTable.rows[i].cells[j].childNodes[0].value;
                            }
                            else if (type == "TEXTAREA") {
                                value = oTable.rows[i].cells[j].childNodes[0].value;
                            }
                            if (value == "")
                                value = " ";
//                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                }
            }//UserRowsQueryCols
            else if (gridtype == "UserRowsQueryCols") {
                for (i = 0; i < rowLength; i++) {
//                    griddetails = griddetails + "@@@";
                    var oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i == 0) {
                        for (j = 2; j < celLength; j++)
                        {
                            value = oTable.rows[i].cells[j].innerHTML;
                            value = oTable.rows[i + 1].cells[j].childNodes[0].id;
//                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                    if (i != 0) {
                        for (j = 2; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            if (type == "INPUT") {
                                var val;
                                if (j < (parseInt(qrycolnum) + 2)) {
                                    if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                            value = "to_date('','dd/mm/yyyy')";
                                        }
                                        else {
                                            value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                        }
                                    } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                            value = "to_date('','hh:mi:ss AM')";
                                        }
                                        else {
                                            value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                        }
                                    } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                            value = "1";
                                        } else {
                                            value = "0";
                                        }
                                    } else {
                                        try {
                                            if (controltype == "SearchText") {
                                                if (oTable.rows[i].cells[j].childNodes[0].title == "" && oTable.rows[i].cells[j].childNodes[0].value != "") {
                                                    alert("Please select the search Properly for rownum  " + i + ", for " + oTable.rows[i].cells[j].childNodes[0].value);
                                                    $('#btnsave').removeAttr('disabled');

                                                    oTable.rows[i].cells[j].childNodes[0].focus();
                                                    return false;
                                                }
                                            }
                                        } catch (err) {
                                        }
                                        if (oTable.rows[i].cells[j].childNodes[0].title == "")
                                            value = oTable.rows[i].cells[j].childNodes[0].value;
                                        else
                                            value = oTable.rows[i].cells[j].childNodes[0].title;
                                    }
                                }
                                else {
                                    if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txtdt") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                            value = "to_date('','dd/mm/yyyy')";
                                        }
                                        else {
                                            value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','dd/mm/yyyy')";
                                        }
                                    }
                                    else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("txttm") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].value.trim() == "") {
                                            value = "to_date('','hh:mi:ss AM')";
                                        }
                                        else {
                                            value = "to_date('" + oTable.rows[i].cells[j].childNodes[0].value + "','hh:mi:ss AM')";
                                        }
                                    } else if (oTable.rows[i].cells[j].childNodes[0].id.indexOf("chkbox") == 0) {
                                        if (oTable.rows[i].cells[j].childNodes[0].checked == true) {
                                            value = "1";
                                        } else {
                                            value = "0";
                                        }
                                    } else {
                                        val = oTable.rows[i].cells[j].childNodes[0].value;
                                        if (val == "")
                                            val = " ";
                                        value = oTable.rows[i].cells[j].childNodes[0].title + ",~" + val;
                                    }
                                }
                            }
                            else if (type == "SELECT") {
                                value = oTable.rows[i].cells[j].childNodes[0].value;
                            }
                            if (value == "")
                                value = " ";
//                            griddetails = griddetails + "" + value + ",!";
                        }
                    }
                }
            }
        }
    }
    var active = 1;
    if (document.getElementById("rdbactive").checked == true)
    {
        active = 1;
    }
    else
    {
        active = 0;
    }
    var formid = localStorage.currentformid;
    var formnm = $('#hdnformname').val();
    var socmaster = $('#hdnsocmaster').val();
    var primkeyfield = $('#txtprimKeyField').val();
    var savetype = $('#txtSaveType').val();
//    var filename=$('#fileName').val();

    var paramdata = '';
//     var isAttachment = false;  not requiried
    var tables = ["dynamictable", "tabhidden", "tabAfter"];
    var tablist = document.getElementsByTagName("table");
    for (var k = 0; k < tablist.length; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tab_dyna") != -1) {
            var tid = "tabgrd" + tabid.replace("tab_dyna_", "");
            try {
                tables.push("tabgrd" + tabid.replace("tab_dyna_", ""));
                document.getElementById(tid);
            } catch (err) {
                continue;
            }
        }
    }

    for (var ta = 0; ta < tables.length; ta++) {
        var table = document.getElementById(tables[ta]);
        var textbox = table.getElementsByTagName("input");
        var dropdown = table.getElementsByTagName("select");
        var checkbox = table.getElementsByTagName("checkbox");
        var textarea = table.getElementsByTagName("textarea");
        var divids = table.getElementsByTagName("div");
        for (var i = 0; i < textbox.length; i++) {
            if (textbox[i].type == "text" || textbox[i].type == "password") {
                if (textbox[i].id.indexOf("txtYears") == 0 || textbox[i].id.indexOf("txtMonths") == 0 || textbox[i].id.indexOf("txtDays") == 0) {
                    continue;
                }
                var name = textbox[i].name;
                if (name == "" && textbox[i].id.indexOf("searchidmulsel") != -1) {
//                    paramdata = paramdata + "~lprow" + textbox[i].id + ",!" + textbox[i].title;
                    continue;
                } else if (name == "")
                {
                    continue;
                }
//                   if(textbox[i].id == "fileName"){//file name is not there
//                        isAttachment = true;
//                        continue;
//                    }
//                paramdata = paramdata + "@!!@";
                var name1 = name.split(",!");
                if (name1[1].trim() == "") {
                    if (name1[0] == "1") {
                        if (textbox[i].value == "") {
                            $('#curfocusid').val(textbox[i].id);
//                                alert(textbox[i].id.replace('txt','').replace(/_/g,' ')+" is Mandatory");
                            changeWizard(textbox[i], textbox[i].id.replace('txt', '').replace(/_/g, ' ') + " is Mandatory");
                            $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');//not there in mobile this web save div
//				document.getElementById("divsave").style.display = 'block';
//				document.getElementById("btprint").style.display = 'block';
                            textbox[i].focus();
                            return false;
                        }
                    }
                } else {
                    if (name1[0] == "1") {

                        var res = getFormulaValue(name1[1].replace("IF ", "").replace("THEN", ""), '');
                        if (res) {
                            if (textbox[i].value == "") {
                                $('#curfocusid').val(textbox[i].id);
//                                    alert(textbox[i].id.replace('txt','').replace(/_/g,' ')+" is Mandatory");
                                changeWizard(textbox[i], textbox[i].id.replace('txt', '').replace(/_/g, ' ') + " is Mandatory");
                                $('#btnsave').removeAttr('disabled');
//				    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                                textbox[i].focus();
                                return false;
                            }
                        }
                    }
                }
                if (name1[2] == "1") {
//                    paramdata = paramdata + "~mulsel";
                }
                var val = textbox[i].value;
                if (val == "") {
                    val = " ";
                }
                try {
                    var cls = $(textbox[i]).attr('class');
                    if (cls.indexOf("upper") != -1) {
                        val = val.toUpperCase();
                    }
                } catch (err) {
                }

                if (textbox[i].id.indexOf("_searchid") != -1) {
                    var titin = textbox[i].title;
                    if (titin == "") {
                        titin = " ";
                    }
//                    paramdata = paramdata + "" + textbox[i].id + ",!" + titin;
                }
                else if (textbox[i].id.indexOf("txtdt") == 0) {
//                    if (val.trim() != "")
//                        paramdata = paramdata + "" + textbox[i].id + ",!to_date('" + val + "','dd/mm/yyyy')";
//                    else
//                        paramdata = paramdata + "" + textbox[i].id + ",!to_date('','dd/mm/yyyy')";
                }
                else if (textbox[i].id.indexOf("txttm") == 0) {
                    if (val.trim() != "") {
                        if (val.substr(0, 2) == 0) {
                            val = "12" + val.substr(2, val.length);
                        }
//                        paramdata = paramdata + "" + textbox[i].id + ",!to_date('" + val + "','hh:mi:ss am')";
                    }
//                    else
//                        paramdata = paramdata + "" + textbox[i].id + ",!to_date('','hh:mi:ss am')";
                }
                else if (textbox[i].id.indexOf("txtdob") == 0) {
                    var labl = textbox[i].id.replace("txtdob", "");
                    if (val.trim() == "") {
                        val = "''";
                    } else {
                        val = "to_date('" + val + "','dd/mm/yyyy')";
                    }
//                    paramdata = paramdata + "" + textbox[i].id + ",!" + val;
                    var years = $('#txtYears' + labl).val();
                    if (years.trim() == "")
                        years = 0;
                    var months = $('#txtMonths' + labl).val();
                    if (months.trim() == "")
                        months = 0;
                    var days = $('#txtDays' + labl).val();
                    if (days.trim() == "")
                        days = 0;
                    if (val != "''" && years == 0 && months == 0 && days == 0) {
                        alert("years or months or days is mandatory for age");
                        return;
                    }
//                    paramdata = paramdata + ",~" + years + ",~" + months + ",~" + days;
                }
                else {
                    if (val == "")
                        val = " ";
//                    paramdata = paramdata + "" + textbox[i].id + ",!" + val;
                }
            }
            if (textbox[i].type == "checkbox") {
                if (textbox[i].id.indexOf("selmul") == 0)
                    continue;
                var val = document.getElementById(textbox[i].id).checked;
                var value1 = 0;
                if (val == true) {
                    value1 = 1;
                }
//                paramdata = paramdata + "@!!@" + textbox[i].id + ",!" + value1;
            }
            if (textbox[i].type == "radio") {
                var curid = textbox[i].name;
                if (curid != preid) {
                    var value1 = $('input[name=' + textbox[i].name + ']:checked').val();
//                    paramdata = paramdata + "@!!@" + textbox[i].name + ",!" + value1;
                }
                var preid = textbox[i].name;
            }
        }

        for (var i = 0; i < dropdown.length; i++) {
            if (dropdown[i].id.indexOf("selmul") == 0) {
                var countries = [];
                $.each($("#" + dropdown[i].id + " option:selected"), function () {
                    countries.push($(this).val());
                });
                var val = countries.join("$");
                if (val.trim() == "") {
                    var nm = dropdown[i].name.split(",!");
                    if (nm[0] == 1) {
                        if (nm[1] == "") {
                            alert("Please select atleast one option for " + dropdown[i].id.replace("selmul", ""));
                            $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                            return false;
                        } else {
                            var res = getFormulaValue(nm[1].replace("IF ", "").replace("THEN ", ""), '');
                            if (res) {
                                alert("Please select atleast one option for " + dropdown[i].id.replace("selmul", ""));
                                $('#btnsave').removeAttr('disabled');
//				    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                                return false;
                            }
                        }
                    }
                }
                if (val.trim() == "")
                    val = " ";
//                paramdata = paramdata + "@!!@" + dropdown[i].id + ",!" + val;
            } else {
                try {
//                        if(dropdown[i].name.trim() == '1' && $("#" + dropdown[i].id + " :selected").val()==""){
//                        alert("Please select one option for "+dropdown[i].id.replace("sel",""));
//                                    $('#btnsave').removeAttr('disabled');$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
//                                    return false;
//                    }
                    if ($("#" + dropdown[i].id + " :selected").val() == "") {
                        var nm = dropdown[i].name.split(",!");
                        if (nm[0] == 1) {
                            if (nm[1] == "") {
                                alert("Please select atleast one option for " + dropdown[i].id.replace("selmul", ""));
                                $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                                return false;
                            } else {
                                var res = getFormulaValue(nm[1].replace("IF ", "").replace("THEN", ""), '');
                                //alert(nm[1]+"---"+res);
                                if (res) {
                                    alert("Please select atleast one option for " + dropdown[i].id.replace("selmul", ""));
                                    $('#btnsave').removeAttr('disabled');
//				    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
                                    return false;
                                }
                            }
                        }
                    }
                } catch (err) {
                }
                if (dropdown[i].id != "" && $("#" + dropdown[i].id + " :selected").val() != "") {
//                    paramdata = paramdata + "@!!@" + dropdown[i].id + ",!" + $("#" + dropdown[i].id + " :selected").val();
                }
            }
        }

        for (var i = 0; i < textarea.length; i++) {
            var val = document.getElementById(textarea[i].id).value;
            if (val == "")
                val = " ";
            val = val.replace(/'/g, "`");
            if (textarea[i].id.toString().indexOf("textbox") == 0) {
                var worddata = tinymce.get(textarea[i].id).getContent();
                var idd = textarea[i].id;
                var appcode = $('#' + idd).attr("appletcode");
                var titlecode = document.getElementById(idd).title;
//                paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + worddata.replace(/'/g, "''") + ",!" + appcode + ",!" + titlecode;
                continue;
            }
            var name = textarea[i].name;
            var name1 = name.split(",!");
            if (name1[1].trim() == "") {
                if (name1[0] == "1") {
                    if (textarea[i].value == "") {
                        $('#curfocusid').val(textarea[i].id);
//                            alert(textarea[i].id.replace('txtarea','').replace(/_/g,' ')+" is Mandatory");
                        changeWizard(textarea[i], textarea[i].id.replace('txtarea', '').replace(/_/g, ' ') + " IS Mandatory");
                        textarea[i].focus();
                        $('#btnsave').removeAttr('disabled');
//			    $('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                        return false;
                    }
                }
            } else {
                if (name1[0] == "1") {
                    var res = getFormulaValue(name1[1].replace("IF ", "").replace("THEN ", ""), '');
                    if (res) {
                        if (textarea[i].value == "") {
                            $('#curfocusid').val(textarea[i].id);
//                                alert(textarea[i].id.replace('txtarea','').replace(/_/g,' ')+" is Mandatory");
                            changeWizard(textarea[i], textarea[i].id.replace('txtarea', '').replace(/_/g, ' ') + " IS Mandatory");
                            $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';document.getElementById("btprint").style.display = 'block';
                            textarea[i].focus();
                            return false;
                        }
                    }
                }
            }

        }
        for (var i = 0; i < divids.length; i++) {
            try {
                if (divids[i].id.indexOf("selmul") == 0) {
                    var selected = [];
                    $('div#' + divids[i].id + ' input[type=checkbox]').each(function () {
                        if ($(this).is(":checked")) {
                            selected.push($(this).attr('value'));
                        }
                    });
                    var val = selected.join("$");
                    try {
                        if (val.trim() == "") {
                            var nm = $('#' + divids[i].id).attr("name").split(",!");
                            if (nm[0] == 1) {
                                if (nm[1] == "") {
                                    var lablnm = $('#lbl' + divids[i].id.replace("sel", "")).html();
                                    if (lablnm == "" || lablnm == undefined) {
                                        lablnm = divids[i].id.replace("sel", "");
                                    }
                                    changeWizard(lablnm, lablnm.replace('mul', '').replace(/_/g, ' ') + " IS Mandatory");
//                                alert("Please select atleast one option for "+lablnm);
                                    $('#btnsave').removeAttr('disabled');
                                    $('#btnsave').removeAttr('disabled');
//				$('#btnpgsave').removeAttr('disabled');
//				document.getElementById("divsave").style.display = 'block';
                                    return false;
                                } else {
                                    var res = getFormulaValue(nm[1].replace("IF ", "").replace("THEN ", ""), '');
                                    if (res) {
                                        var lablnm = $('#lbl' + divids[i].id.replace("sel", "")).html();
                                        if (lablnm == "" || lablnm == undefined) {
                                            lablnm = divids[i].id.replace("sel", "");
                                        }
                                        changeWizard(lablnm, lablnm.replace('mul', '').replace(/_/g, ' ') + " IS Mandatory");
                                        $('#btnsave').removeAttr('disabled');
//				    $('#btnpgsave').removeAttr('disabled');
//				    document.getElementById("divsave").style.display = 'block';
                                        return false;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                    }
//if(val == "")
//    val = " ";
//paramdata = paramdata + "@!!@" + divids[i].id + ",!" + val;
                }
            } catch (err) {
            }
        }





    }
    $('#myModalpassword').modal('show');
    $('#btndiagsave').removeAttr("disabled");
}
function newData() {

//       clearlogdata();
//        try{
//            var path='<%=request.getContextPath()%>/OP/Images/FemalePhoto.gif';
//            document.getElementsByTagName("img")[0].src=path;
//        }catch(err){}
    $('#txtSaveType').val("new");
    try {
        var imgcap = $('#hdnimgcap').val();
        if (imgcap == 1) {
            document.getElementById("imagetd").style.display = "block";
            $('#booth').animate({'height': '50', 'width': '50'}, 900);
            $('#imgPatient').animate({'height': '50', 'width': '50'}, 900);
        }
//        var mswordprint = '<%=request.getAttribute("mswordprint")%>';
//        if(mswordprint == 1){document.getElementById("msword").style.display = "inline-block";}

        document.getElementById("lbl_UserNm").innerHTML = localStorage.usernm;
        document.getElementById("mm").value = $('#hdntime10').val();
        document.getElementById("dd").value = $('#hdndate10').val();
//        $('#btndelete').attr('disabled', 'disabled');
        $('#txtFromDt').val($('#hdndate10').val());
        $('#txtToDt').val($('#hdndate10').val());
        document.getElementById("lbl_LocNm").innerHTML = localStorage.locnm;
        $('#btnsave').removeAttr('disabled');
//	$('#btnpgsave').removeAttr('disabled');document.getElementById("divsave").style.display = 'block';
        $('#btnsave').val("Save");
        $('#btnnew').attr('disabled', 'disabled');
        $('#btnedit').attr('disabled', 'disabled');
        $('#btncancel').removeAttr('disabled');
        $('#btncancel1').removeAttr('disabled');
//	$('#btnpgcancel1').removeAttr('disabled');
        $('#btndelete').attr('disabled', 'disabled');
        $('#txtSaveType').val("new");
          var t0 = performance.now();
        gridradiocall();
        var t1 = performance.now();
        //alert("Call to gridradiocall took " + (t1 - t0) + " milliseconds.")
        var t0 = performance.now();
        clearFormtables();
        var t1 = performance.now();
       // alert("Call to clearFormtables took " + (t1 - t0) + " milliseconds.")
        var t0 = performance.now();
        clearGrid();
        var t1 = performance.now();
       // alert("Call to clearGrid took " + (t1 - t0) + " milliseconds.")
        var t0 = performance.now();
        checkRights("new");
         var t1 = performance.now();
      // alert("Call to checkRights took " + (t1 - t0) + " milliseconds.")
        var t0 = performance.now();
        displaysavebuttons();
         var t1 = performance.now();
      //  alert("Call to displaysavebuttons took " + (t1 - t0) + " milliseconds.")
        var t0 = performance.now();
        changedefault();
           var t1 = performance.now();
      //  alert("Call to changedefault took " + (t1 - t0) + " milliseconds.")
        $('[id^="txttm"]').each(function () {
//        i++;
//        if (i != 1) {
//            var rid = this.id.replace(/[0-9]/g, '') + "" + i;
//            this.id = rid + "" + i;
//        }
            //this.className = this.className.replace(" ui-timepicker-input", "");
            try {
                var today = new Date();
                var h = today.getHours();
                var m = today.getMinutes();
                var s = today.getSeconds();
                var tm = "am";
                if (h >= 12) {
                    tm = "pm";
                    if (h != 12) {
                        h = h - 12;
                    }
                }
                if (h < 10) {
                    h = "0" + h;
                }
                if (h == 0) {
                    h = 12;
                }

                var curtm = h + ":" + m + ":00 " + tm;
                this.value = curtm;
                //confirm(h+"--"+this.id);
            } catch (err) {
            }
        });
    } catch (err) {
        hideProgress();
    }
}

function editData() {
    $('#btnsave').removeAttr('disabled');
    $('#btnnew').attr('disabled', 'disabled');
    $('#btnedit').attr('disabled', 'disabled');
    $('#btncancel').removeAttr('disabled');
    $('#btncancel1').removeAttr('disabled');
    $('#btndelete').attr('disabled', 'disabled');
    $('#txtSaveType').val("edit");
    checkRights("edit");
}
function cancelData() {
    
//     var optionform = $('#hdnoptionform').val();
    var dis = $('#hdnoptionform').val();
    if (dis == 1) {
        editData();
        $('#btnedit').removeAttr('disabled');
        searchData();
        return false;
    }
    try {
        var path = localStorage.ipadrs + '/OP/Images/FemalePhoto.gif';
        $('#imagetd').find("img").attr("src", path);
    } catch (err) {
    }
    var imgcap = $('#hdnimgcap').val();
    if (imgcap == 1) {
        document.getElementById("imagetd").style.display = "block";
        $('#booth').animate({'height': '50', 'width': '60'}, 100);
        $('#imgPatient').animate({'height': '50', 'width': '60'}, 100);
    }
//        clearlogdata();
    $('#userwiselog').val("");
//        var mswordprint = '<%=request.getAttribute("mswordprint")%>';
//        if(mswordprint == 1){document.getElementById("msword").style.display = "inline-block";}
//        else{document.getElementById("msword").style.display = "none";}
    $('#imgid').val("");

    $('#txtFromDt').val($('#hdndate10').val());
    $('#txtToDt').val($('#hdndate10').val());
    $('#txtprimKeyField').val("");
    document.getElementById("lbl_UserNm").innerHTML = localStorage.usernm;
    document.getElementById("mm").value = $('#hdntime10').val();
    document.getElementById("dd").value = $('#hdndate10').val();
    document.getElementById("lbl_LocNm").innerHTML = localStorage.locnm;
    $('#btnsave').attr('disabled', 'disabled');
//        $('#btnpgsave').attr('disabled', 'disabled');
    $('#btnnew').removeAttr('disabled');
    $('#btnedit').attr('disabled', 'disabled');
    $('#btncancel').removeAttr('disabled');
    $('#btncancel1').removeAttr('disabled');
//	$('#btnpgcancel').removeAttr('disabled');
    $('#txtSaveType').val("new");
    clearformtables2()
    $("#track").find("tr:gt(0)").remove();
    $('#tabAttach').find("tr:gt(0)").remove();
    $('#tabAttach1').find("tr:gt(0)").remove();
    $('#fileName').val("");
    clearGrid();
    var dis = $('#hdnnewdisable').val();
    if (dis == 1) {
        $('#btnnew').attr('disabled', 'disabled');
    }

    newData();
    var drill = $('#hdnflgdrill').val();
    disfromchanges(drill);
    $('#file').val("");
    $('#upload').html("");
    $('#batchprevious').val("");
    clearInterval(refreshfield);
}
function disfromchanges(drill) {
    if (document.getElementById('disfrom').value == "1") {
        if (drill != 1) {
            var id = document.getElementById('disid').value;
            document.getElementById(id).value = document.getElementById('disvalue').value;
            document.getElementById(id).title = document.getElementById('disvalue').value;
            try {
                var dateid = document.getElementById("disdateid").value;
                document.getElementById(dateid).value = document.getElementById('disdatevalue').value;
            } catch (err) {
            }
            try {
                var surgeryid = document.getElementById("dissurgeryid").value;
                document.getElementById(surgeryid).value = document.getElementById('dissurgeryvalue').value;
                document.getElementById(surgeryid).title = document.getElementById('dissurgeryvalue').value;
                document.getElementById(surgeryid).onchange();
            } catch (err) {
            }
            try {
                var disdocid = document.getElementById('disdoctorid').value;
                document.getElementById(disdocid).value = document.getElementById('disdoctorvalue').value;
            } catch (errr) {
            }
            $('#hdnonchange').val("1");
            document.getElementById(id).onchange();
        }
    }
}
function clearformtables2() {
    var textbox, dropdown, checkbox, textarea;
    try {
        var tables = ["dynamictable", "tabhidden", "tabAfter"];
        var tablist = document.getElementsByTagName("table");
        var griddetails = "";
        for (var k = 0; k < tablist.length; k++) {
            var tabid = tablist[k].id;
            if (tabid.indexOf("tab_dyna") != -1) {
                var tid = "tabgrd" + tabid.replace("tab_dyna_", "");
                try {
                    tables.push("tabgrd" + tabid.replace("tab_dyna_", ""));
                    document.getElementById(tid);
                } catch (err) {
                    continue;
                }
            }
        }
        var rowids = "";
        for (var ta = 0; ta < tables.length; ta++) {
            var table = document.getElementById(tables[ta]);
            var textbox = table.getElementsByTagName("input");
            var dropdown = table.getElementsByTagName("select");
            var paramdata = '';
            for (var i = 0; i < textbox.length; i++) {
                if (textbox[i].name == "" && textbox[i].id.indexOf("chkbox") == -1) {
                    var rowid = textbox[i].id.replace("txt", "tr");
                    if (rowids == "") {
                        rowids = rowid;
                    } else {
                        rowids = rowids + "," + rowid;
                    }
                    continue;
                }
                if (textbox[i].type == "text" || textbox[i].type == "password") {
                    textbox[i].value = "";
                    try {
                        textbox[i].title = "";
                    } catch (err) {
                    }
                }
                if (textbox[i].type == "checkbox") {
                    document.getElementById(textbox[i].id).checked = false;
                    $(document.getElementById(textbox[i].id)).parent().removeClass("multiselect-on");
                }
                if (textbox[i].id.indexOf("txtdt") != -1) {
                    var appdt = $('#' + textbox[i].id).attr("applydate");
                    if (appdt == "0")
                        $('#' + textbox[i].id).val($('#dd').val());
                    else
                        $('#' + textbox[i].id).val("");
                }
                if (textbox[i].id.indexOf("txttm") != -1) {
                    var appdt = $('#' + textbox[i].id).attr("applydate");
                    if (appdt == "0") {
                        var today = new Date();
                        var h = today.getHours();
                        var m = today.getMinutes();
                        var s = today.getSeconds();
                        var tm = "am";
                        if (h >= 12) {
                            tm = "pm";
                            if (h != 12)
                                h = h - 12;
                        }
                        if (h < 10) {
                            h = "0" + h;
                        }
                        var curtm = h + ":" + m + ":00 " + tm;
                        $('#' + textbox[i].id).val(curtm);
                    } else {
                        $('#' + textbox[i].id).val("");
                    }
                }
            }
            if (rowids != "") {
                var rw = rowids.split(",");
                for (var r = 0; r < rw.length; r++) {
                    $('#' + rw[r]).remove();
                }
            }
            var textarea = table.getElementsByTagName("textarea");
            for (var i = 0; i < textarea.length; i++) {
                if (textarea[i].id.indexOf("textbox") == 0) {
                    try {
                        var currentTime = new Date();
                        var time = currentTime.getTime();
                        var tm = $('#hdwfid').val() + "" + textarea[i].id + "" + time;
                        document.getElementById(textarea[i].id).title = tm;
                        createDoc(tm);
                        tinymce.get(textarea[i].id).setContent("");
                    } catch (err) {
                    }
                } else {
                    textarea[i].value = "";
                }
            }
        }
        var textbox = document.getElementsByTagName("input");
        for (i = 0; i < textbox.length; i++) {
            if (textbox[i].type == "checkbox") {
                if (textbox[i].id.indexOf("all") == 0) {
                    document.getElementById(textbox[i].id).checked = false;
                }
                $(document.getElementById(textbox[i].id)).parent().removeClass("multiselect-on");
            }
        }
    } finally {
        textbox = null;
        dropdown = null;
        checkbox = null;
        textarea = null;
    }
}

function clearGrid() {
    var tablist = document.getElementsByTagName("table");
    var oTable,oCells;
    try{
    var griddetails = "";
    var lenfor51 = tablist.length;
    for (var k = 0; k < lenfor51; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tab_dyna") != -1) {
            var t = tablist[k].title.split("@@@");
            var gridid = t[0];
            var gridtype = t[1];
            var qrycolnum;
            if (gridtype == "QueryRowsQueryCols" || gridtype == "UserRowsQueryCols") {
                qrycolnum = t[2];
            }
            griddetails = griddetails + "@@##@@@" + tabid + ",!" + gridid + ",!" + gridtype + ",!" + qrycolnum;
            var oTable = document.getElementById(tabid);
            var rowLength = oTable.rows.length;
            if (gridtype == "QueryRowsFixedCols" || gridtype == "QueryRowsQueryCols") {
                
                for (i = 0; i < rowLength; i++) {
                    griddetails = griddetails + "@@@";
                     oCells = oTable.rows.item(i).cells;
                    var celLength = oCells.length;
                    if (i != 0) {
                        var j = 2;
                        if (gridtype == "QueryRowsQueryCols") {
                            var j = parseInt(qrycolnum) + 1;
                        }
                        for (j; j < celLength; j++)
                        {
                            var type = oTable.rows[i].cells[j].childNodes[0].tagName;
                            var value = "";
                            var idchck = oTable.rows[i].cells[j].childNodes[0].id;
                            if (idchck.indexOf("chkbox") == 0) {
                                oTable.rows[i].cells[j].childNodes[0].checked = false;
                            }
                            if (type == "INPUT") {
                                oTable.rows[i].cells[j].childNodes[0].value = "";
                            }else if(type == "TEXTAREA") {
                                oTable.rows[i].cells[j].childNodes[0].value = "";
                            }else if (type == "SELECT") {
                            value = oTable.rows[1].cells[j].childNodes[0].title;
                            var pselect = oTable.rows[i].cells[j].childNodes[0];
                            pselect.selectedIndex = 0;
//                            for (var chki = 0; chki < pselect.options.length; chki++) {
//                                var val = pselect.options[chki].innerHTML;
//                                if (val == value) {
//                                    pselect.selectedIndex = chki;
//                                    break;
//                                }
//                            }
pselect = null;
                        }
                        }
                    }
                }
            }
            if (gridtype == "UserRowsQueryCols" || gridtype == "UserRowsFixedCols") {
                for (i = rowLength; i >= 2; i--) {
                    $('#' + tabid + " tr:eq('" + i + "')").remove();
                }
                 oCells = oTable.rows.item(1).cells;
                var celLength = oCells.length;
                for (j = 0; j < celLength; j++)
                {
                    var type = oTable.rows[1].cells[j].childNodes[0].tagName;
                    var value = "";
                    try {
                        var idchk = oTable.rows[1].cells[j].childNodes[0].id;
                        if (idchk.indexOf("_searchid") != -1) {
                            oTable.rows[1].cells[j].childNodes[0].title = "";
                            oTable.rows[1].cells[j].childNodes[0].value = "";
                        }
                        else if (idchk.indexOf("chkbox") == 0) {
                            oTable.rows[1].cells[j].childNodes[0].checked = false;
                        } else if (idchk.indexOf("sel") == 0) {
                            value = oTable.rows[1].cells[j].childNodes[0].title;
                            var pselect = oTable.rows[1].cells[j].childNodes[0];
                            var lenfor52 = pselect.options.length;
                            for (var chki = 0; chki < lenfor52; chki++) {
                                var val = pselect.options[chki].innerHTML;
                                if (val == value) {
                                    pselect.selectedIndex = chki;
                                    break;
                                }
                            }
                            pselect = null;
                        }
                        else {
                            oTable.rows[1].cells[j].childNodes[0].value = "";
                            try {
                                oTable.rows[1].cells[j].childNodes[0].onkeyup();
                                if(oTable.rows[1].cells[j].childNodes[0].id.indexOf("txtdtgrd") == 0){
                                var appdt = $('#'+oTable.rows[1].cells[j].childNodes[0].id).attr("applydate");
                    if(appdt == "0")
                    oTable.rows[1].cells[j].childNodes[0].value = $('#dd').val();
            }
                            } catch (err) {

                            }
                        }
                    } catch (err) {

                    }
                }

            }
        }         
    }
    $('[id^="txttmgrd"]').each(function () {
//        i++;
//        if (i != 1) {
//            var rid = this.id.replace(/[0-9]/g, '') + "" + i;
//            this.id = rid + "" + i;
//        }
        //this.className = this.className.replace(" ui-timepicker-input", "");
        try{var rw = this.parentNode.parentNode.rowIndex;
        
        var today = new Date();var h = today.getHours();var m = today.getMinutes();var s = today.getSeconds();
    var tm = "am";
    if(h>=12){tm = "pm";if(h!=12){h = h - 12;}}
    if(h<10){h = "0"+h;}
    if(h == 0){
        h = 12;
    }
    var curtm = h+":"+m+":00 "+tm;
        this.value = curtm;
    }catch(err){}
    });
    }finally{
        tablist = null;
        oTable = null;
        oCells = null;
    }
}

function closeData() {
    window.location.href = localStorage.ipaddres + '/User Profile.jsp';
}
function getFormulaValue(formula, inptype) {

    var result = "";
    if (formula.trim() == "$serverDate") {
        return $('#currentdate').val()
    }
    formula = replaceFunction(formula, "dollorsymbolsavetype", $('#txtSaveType').val().trim().toUpperCase());
    if (formula.toString().indexOf(":") != -1) {
        if (formula.toString().indexOf("grd_") != -1) {
            var formularep = formula.replace(/\+/g, "~").replace(/\-/g, "~").replace(/\</g, "~").replace(/\>/g, "~").replace(/\-/g, "~").replace(/\(/g, "~").replace(/\)/g, "~").replace(/\&/g, "~").replace(/\|/g, "~").replace(/\=/g, "~");
            if (formularep.indexOf("~") != -1) {
                var formulasp = formularep.split("~");
                for (var jk = 0; jk < formulasp.length; jk++) {
                    if (formulasp[jk] == "")
                        continue;
                    if (formulasp[jk].indexOf("grd_") != -1) {
                        var res = getgridvalues(formulasp[jk]);
                    } else {
                        var res = getFormulaValueNew(formulasp[jk], "grid");
                    }
                    if (res == "") {
                        res = 0;
                    }
                    formula = formula.replace(formulasp[jk], res);
                }
                var finres = eval(formula);
                return finres;
            } else {
                return getgridvalues(formula);
            }
        }
    }
    try {
        var chkid = formula.replace("$", "").trim();
        if (chkid.indexOf(".") != -1)
            chkid = chkid.substr(0, chkid.indexOf("."))
        var chktype = $('#' + chkid).attr("controltype");
        if (chktype == "Date") {
            return $('#' + chkid).val();
        }
    } catch (err) {
    }

    try {
        for (var l = 0; l < formula.length; l++) {
            var g = formula.charAt(l);
            if (g.match("^[a-zA-Z]+$") || g == "$" || g == "`") {
                var k = g;
                while (1) {
                    l++;
                    var m = formula.charAt(l);
                    if (m == "_" || m == "." || m == "$") {
                        k = k + m;
                        continue;
                    }
                    if (m.match("^[a-zA-Z]+")) {
                        k = k + m;
                    } else {
                        if (k.indexOf("$") != -1) {
                            if (k != "$") {
                                var chkid = "";
                                var actid = "";
                                var ext = "";
                                if (k.indexOf(".") != -1) {
                                    var ch = k.split(".");
                                    chkid = ch[0];
                                    ext = ch[1];
                                    actid = ch[0];
                                } else {
                                    chkid = k;
                                    actid = k;
                                }
                                if (chkid.indexOf("$") != -1) {
                                    chkid = chkid.replace("$", "");
                                    chkid = chkid.replace("`", "");
                                    //confirm(chkid);
                                    if (inptype == "grid") {
                                        try {
                                            document.getElementById(chkid.replace("grdsum_", "")).tagName
                                        } catch (err) {
                                            chkid = chkid.replace("txtdt", "txtdtgrd");
                                            chkid = chkid.replace("txttm", "txttmgrd");
                                        }
                                    }
                                    if (chkid.trim() == "savetype") {
                                        chkid = chkid.replace("savetype", "txtSaveType");
                                    }
                                    var isradio = 0;
                                    try {
                                        document.getElementById(chkid.replace("grdsum_", "")).tagName
                                    } catch (err) {
                                        if (chkid.indexOf("sel" == 0)) {
                                            var jkl = getRadioValue(chkid, ext);
                                            //result = result + jk; 
                                            val = jkl;
                                            isradio = 1;
                                            // confirm("Here"+jk)
                                            // continue;
                                        }
                                    }
                                    if (isradio == 0) {
                                        if (document.getElementById(chkid.replace("grdsum_", "")).tagName == "INPUT") {
                                            if (inptype == "grid") {
                                                var tableid = $('#curtable').val();
                                                var rownum = $('#currow').val();
                                                var oTable = document.getElementById(tableid);
                                                try {
                                                    var oCells = oTable.rows.item(rownum).cells;
                                                } catch (err) {
                                                    return "";
                                                }
                                                var celLength = oCells.length;
                                                var val = "";
//                                                if(chkid.indexOf("txtdt") == 0){
//                                                    chkid = chkid.replace("txtdt","txtdtgrd");
//                                                }
                                                if (chkid.indexOf("grdsum") != -1) {
                                                    val = getGridTotal(chkid);
                                                } else {
                                                    var isexists = 0;
                                                    for (var km = 2; km < celLength; km++) {
                                                        if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
                                                            isexists = 1;
                                                            try {
                                                                if (ext == "id") {
                                                                    val = oTable.rows[rownum].cells[km].childNodes[0].title;
                                                                } else {
                                                                    val = oTable.rows[rownum].cells[km].childNodes[0].value;
                                                                }
                                                            } catch (err) {

                                                            }
                                                            if (chkid.indexOf("chkbox") != -1) {
                                                                if (oTable.rows[rownum].cells[km].childNodes[0].checked == true) {
                                                                    val = 1;
                                                                } else {
                                                                    val = 0;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (isexists == 0) {
                                                        if (ext == "id")
                                                            val = $('#' + chkid.trim()).prop("title");
                                                        else
                                                            val = $('#' + chkid.trim()).val();
                                                        if (chkid.indexOf("chkbox") != -1) {
                                                            if (document.getElementById(chkid.trim()).checked == true) {
                                                                val = 1;
                                                            } else {
                                                                val = 0;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                if (chkid.indexOf("grdsum") != -1) {
                                                    val = getGridTotal(chkid);
                                                } else {
                                                    if (ext == "id") {
                                                        val = $('#' + chkid).attr("title");
                                                    } else {
                                                        val = $('#' + chkid).val();
                                                    }
                                                    if (chkid.indexOf("chkbox") != -1) {
                                                        if (document.getElementById(chkid).checked == true)
                                                            val = 1;
                                                        else
                                                            val = 0;
                                                    }
                                                }
                                            }
                                        } else if (document.getElementById(chkid).tagName == "SELECT") {

                                            if (inptype == "grid") {
                                                var tableid = $('#curtable').val();
                                                var rownum = $('#currow').val();
                                                var oTable = document.getElementById(tableid);
                                                try {
                                                    var oCells = oTable.rows.item(rownum).cells;
                                                } catch (err) {
                                                    return "";
                                                }
                                                var celLength = oCells.length;
                                                var val = "";
                                                var isexists = 0;
                                                for (var km = 2; km < celLength; km++) {
                                                    if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
                                                        isexists = 1;
                                                        try {
                                                            if (ext == "id") {
                                                                val = oTable.rows[rownum].cells[km].childNodes[0].value;
                                                            } else {
                                                                var e = oTable.rows[rownum].cells[km].childNodes[0];
                                                                val = e.options[e.selectedIndex].text;
                                                            }
                                                        } catch (err) {
                                                            alert("getformulavalue--" + err);
                                                        }
                                                    }
                                                }
                                                if (isexists == 0) {
                                                    if (ext == "id") {
                                                        val = $('#' + chkid).val();
                                                    } else {
                                                        val = $("#" + chkid + " option:selected").text();
                                                    }
                                                }
                                            } else {
                                                if (ext == "id") {
                                                    val = $('#' + chkid).val();
                                                } else {
                                                    //actval = $('#'+fi[0]).attr("title");
                                                    val = $("#" + chkid + " option:selected").text();
                                                }
                                            }
                                        }
                                    }
                                } else
                                {
                                    val = chkid;
                                }
                                if (actid.indexOf("`") != -1) {
                                    val = "`" + val;
                                }
                            }
                        } else {
                            var val = k;
                        }
                        if (val == "")
                            val = 0;
                        var cher = isNaN(val);
                        if (cher == false)
                            val = val * 1;
                        result = result + val;
                        l--;
                        break;
                    }
                }
            }
            else {
                result = result + g;
            }
        }

        while (1) {
            if (result.indexOf("$") != -1) {
                result = result.replace("$", "");
            } else {
                break;
            }
        }
        result = result.replace(/`/g, "'");
        var formularesult = "";
        if (result.trim() != "") {
            try {
                if (result.toString().indexOf(":") != -1) {
                    var val1 = result.split(":");
                    var actval = val1[0];
                    var round = val1[1].replace("ROUND(", "").replace(")", "");
                    var actval = eval(actval);
                    if (!isNaN(actval)) {
                        result = parseFloat(actval).toFixed(round);
                    }
                    if (isNaN(actval)) {
                        if (result.toString().indexOf("ROUND") != -1) {
                            //alert("wrong formula-->"+result);
                            return "0";
                        }
                        if (result.toString().indexOf("POPONLY") != -1) {
                            //alert("wrong formula-->"+result);
                            return "0";
                        }
                    }
                    formularesult = result;
                }
                else {
                    formularesult = eval(result);
                }
            } catch (err) {
                if (result.indexOf("=") != -1) {
                    var result = result.replace("==", "=");
                    var res = result.split("=");
                    if (res[0].trim() == res[1].trim()) {
                        formularesult = true;
                    }
                } else {
                    formularesult = result;
                }
            }
        }
        else
            formularesult = "";
        return formularesult;
    } catch (err) {
        if (formula.replace("$", "").trim() == "serverDate") {
            return $('#currentdate').val();
        }
        alert(err + "--wrong formula-->" + formula);
    }
}
function getRadioValue(chkid, ext) {
    var val = "";
    if (ext == "value") {
        val = $("input[name=" + chkid + "]:checked").attr('title');
    } else {
        val = $("input[name=" + chkid + "]:checked").attr('value');
    }
    return val;
}
function getkeyward(fieldid1, value) {
    $('#previousid').val(fieldid1);
    $('#previousval').val(value);
    var wfid = $('#hdwfid').val();
    document.getElementById("mydiv1").style.display = 'block';
//         $.get("<%=request.getContextPath()%>/WebFormSave1?reqtype=searchquery1&wfid=" + wfid + "&id=" + fieldid1+getsessionvalues(), function(responseText) {
    $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=searchquery1&wfid=" + wfid + "&id=" + fieldid1 + mobile, function (responseText) {
        document.getElementById("mydiv1").style.display = 'none';
        if (responseText != "") {
            var qry = responseText;

            var ischecked = false;
            qry = replaceFunction(qry, "dollorsymbolsavetype", $('#txtSaveType').val().trim().toUpperCase());
            if (responseText.indexOf("ENDIF") != -1) {
                var dtl = responseText.trim().split("ENDIF");
                for (var j = 0; j < dtl.length; j++) {
                    var qrytemp = dtl[j];
                    if (qrytemp.trim() == "")
                        continue;
                    else if (qrytemp.indexOf("ELSE ") != -1) {
                        ischecked = true;
                        qry = qrytemp;
                        break;
                    }
                    var qrytempdtl = qrytemp.split("THEN ");
                    var condition = qrytempdtl[0];
                    condition = condition.replace("IF ", "").replace("ELSEIF", "").replace("ELSE", "");
                    var chk = getFormulaValue(condition);
                    if (chk == true) {
                        ischecked = true;
                        qry = qrytempdtl[1];
                        break;
                    }
                }
            } else {
                ischecked = true;
            }
            qry = replaceWithHeadFields(qry);
            if (ischecked == false) {
                alert("NO condition is satisfield in " + qry);
                return;
            }
            ;
            qry = qry.trim().replace("IF ", "").replace("ELSEIF ", "").replace("ELSE ", "");
            qry = qry.replace(/\+/g, 'plussymbol');
//                            $.get("<%=request.getContextPath()%>/WebFormSave1?reqtype=getkeyward&wfid=" + wfid + "&pkey=" + value+"&qry="+qry+"&framerowid="+fieldid1+getsessionvalues(), function(responseText) {
            $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=getkeyward&wfid=" + wfid + "&pkey=" + value + "&qry=" + qry + "&framerowid=" + fieldid1 + mobile, function (responseText) {

                if (responseText.indexOf("Exception") != -1) {
                    var x = responseText.split("Exception");
                    alert(x[1]);
                    document.getElementById(fieldid1).value = "";
                } else {
                    document.getElementById(fieldid1).value = value;
                    document.getElementById(fieldid1).title = responseText.trim();
//                    getlogdata($('#currentdate').val() + " " + gettime(new Date) + " User " + $('#formusernm').val() + " Wrote the value " + value);
//                    getlogdata("####Form,!Change,!" + responseText.trim() + ",!" + value + ",!Enter,!");
                    $('#changetype').val("1");
                    document.getElementById(fieldid1).onchange();
                }
            });
        }
    });
}

function popAttach() {

    var wfid = localStorage.currentformid;
    var keyid = $('#txtprimKeyField').val();
    $("#tabAttach").find("tr:gt(0)").remove();
//        $.get('<%=request.getContextPath()%>/WebFormSave1?primkey=' + keyid + '&reqtype=popattach&wfid=' + wfid+getsessionvalues(), function(responseJson) {
//$.get(localStorage.ipadrs + "/WebFormSave1?reqtype=populategrid&wfid=" + wfid + "&primid=" + primid + "&socid=" + $('#txtsocid').val() + "&socmaster=" + socmaster + "&optionform=" + optionform + mobile, function (responseText) {	   
    $.get(localStorage.ipadrs + "/WebFormSave1?primkey=" + keyid + "&reqtype=popattach&wfid=" + wfid + mobile, function (responseJson) {
        if (responseJson != null && responseJson != "") {
            for (var i = 0; i < responseJson.length; i++) {
                var table = document.getElementById("tabAttach");
                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
                var cell0 = row.insertCell(0);
                var cell = "<a onclick='delrowgrid(this,\"\")'>delete</a>";
                cell0.innerHTML = cell;
                var cell0 = row.insertCell(1);
                cell0.innerHTML = rowCount;
                var cell0 = row.insertCell(2);
                cell0.innerHTML = responseJson[i]['DESCRIPTION'];
                var cell0 = row.insertCell(3);
                cell0.innerHTML = "<a onclick='openattachment(\"" + responseJson[i]['FILENAMESERVER'] + "\")'>" + responseJson[i]['FILENAME'] + "</a>"
                var cell0 = row.insertCell(4);
                cell0.innerHTML = responseJson[i]['FILENAMESERVER'];
                cell0.setAttribute('style', 'display:none');
            }
        }
    });
}
function searchData() {

//         $('#popup-search').css('visibility','hidden');
//         $('#popup-search').css('opacity','0');

    var changetype = $('#changetype').val();
    hideSearchpopup();
    clearGrid();
    editData();

    var noedit = $('#hdnnoeditup').val();
    ;
    var imgcap = $('#hdnimgcap').val();
    var mswordprint = $('#hdnmswordprint').val();
//        if(mswordprint == 1){document.getElementById("msword").style.display = "inline-block";}
//        else{document.getElementById("msword").style.display = "none";}
    if (imgcap == 1) {
        document.getElementById("imagetd").style.display = "block";
        $('#booth').animate({'height': '50', 'width': '60'}, 900);
        $('img').animate({'height': '50', 'width': '60'}, 900);
    }
    var wfid = localStorage.currentformid;
    var optionform = $('#hdnoptionform').val();
    var fromdt = $('#txtFromDt').val();
    var todt = $('#txtToDt').val();
    if (optionform != 1) {
        if (changetype == 0) {
            var pkey = $('#search_qry').val();
            $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=getkey&fromdt=" + fromdt + "&todt=" + todt + "&wfid=" + wfid + "&pkey=" + pkey + mobile, function (responseText) {

                if (responseText.indexOf("Exception") != -1) {
                    var x = responseText.split("Exception");
                    alert(x[1]);
                } else {
                    $('#changetype').val(1);
                    $('#search_qry').val(responseText);
                    searchData()
                }
            });
            return false;
        }
    }
    $('#changetype').val(0);
    var primid = $('#search_qry').val();
    var tables = ["dynamictable", "tabhidden", "tabAfter"];
    for (var ta = 0; ta < tables.length; ta++) {
        var table = document.getElementById(tables[ta]);
        var textbox = table.getElementsByTagName("input");
        var dropdown = table.getElementsByTagName("select");
        var paramdata = '';
        for (var i = 0; i < textbox.length; i++) {
            if (textbox[i].type == "text") {
                textbox[i].value = "";
            }
        }
    }
    $('#txtprimKeyField').val(primid);
    var wfid = localStorage.currentformid;
    var optionform = $('#hdnoptionform').val();
    editData();
    var path = localStorage.ipadrs + "/WebFormSave1?reqtype=populate&wfid=" + wfid + "&primid=" + primid + "&socid=" + $('#txtsocid').val() + "&optionform=" + optionform + mobile;
    $.get(path, function (responseText) {
        if (responseText.indexOf("Exception") != -1) {
            alert(responseText);
        }

        var p1 = responseText.toString().split("@!!@");
        var doption = $('#hdnoptionform').val();
        if (doption == "1" && responseText.toString().trim() == "") {
            newData();
            return false;
        }
        ;
        if (responseText != null && responseText.trim() != "") {
            var val = responseText.toString();
            var p1 = val.toString().split("@!!@");
            for (var k = 1; k < p1.length; k++) {
                if (p1[k].indexOf("~selmul") != -1) {
                    var rw = p1[k].replace("~selmul", "").split("~lprow");
                    var p2 = rw[0].split(",!");
                    var rwid = p2[0];
                    var rowid = "tr" + replaceString(rwid.trim()) + "_searchid";
                    rwid = rwid.replace("txt", "tr");
                    document.getElementById(p2[0]).title = p2[1];
                    document.getElementById(p2[0]).value = p2[2];
                    for (var r = 1; r < rw.length; r++) {
                        var p2 = rw[r].split(",!");
                        var newrow = $("<tr><td></td><td><input id='" + rwid.trim() + "mulsel" + (r) + "' onkeyup='delmulsel(this)'  type='text' title='" + p2[1] + "' value='" + p2[2] + "'></td></tr>");
                        $('#' + rowid).after(newrow);
                    }
                } else {
                    var p2 = p1[k].split(",!");
                    if (p2[0] == 'active' || p2[0] == 'locnm' || p2[0] == 'usernm' || p2[0] == 'date' || p2[0] == 'time' || p2[0].toString().indexOf("textbox") == 0) {
                        if (p2[0] == 'active') {
                            if (p2[1] == "1") {
                                document.getElementById("rdbactive").checked = true;
                                document.getElementById("rdbinactive").checked = false;
                            }
                            else {
                                document.getElementById("rdbactive").checked = false;
                                document.getElementById("rdbinactive").checked = true;
                            }
                        } else if (p2[0] == "usernm") {
                            if (p2[1].trim() != "") {
                                document.getElementById("lbl_UserNm").innerHTML = p2[1].trim();
                            } else {
                                document.getElementById("lbl_UserNm").innerHTML = localStorage.usernm;
                            }
                        } else if (p2[0] == "locnm") {
                            if (p2[1].trim() != "") {
                                document.getElementById("lbl_LocNm").innerHTML = p2[1].trim();
                            } else {
                                document.getElementById("lbl_LocNm").innerHTML = localStorage.locnm;
                            }
                        }
                        else if (p2[0] == "date") {
                            if (p2[1].trim() != "") {
                                document.getElementById("dd").value = p2[1].trim();
                            } else {
                                document.getElementById("dd").value = $('#hdndate10').val();
                            }
                        }
                        else if (p2[0] == "time") {
                            if (p2[1].trim() != "") {
                                document.getElementById("mm").value = p2[1].trim();
                            } else {
                                document.getElementById("mm").value = $('#hdntime10').val();
                            }
                        }
                        else if (p2[0].indexOf("textbox") == 0) {
                            try {
                                if (p2[1].indexOf($('#hdwfid').val()) == 0) {
                                    document.getElementById(p2[0]).title = p2[1].trim();
                                    $('#curwordoleid').val(p2[0]);
                                    getHTML();
                                } else {
                                    tinymce.get(p2[0]).setContent(p2[1]);
                                }
                            } catch (err) {
                                alert(err)
                            }
                        }
                    }
                    else {
                        try {
                            if (p2[0].indexOf("_searchid") != -1) {
                                document.getElementById(p2[0]).title = p2[1];
                                document.getElementById(p2[0]).value = p2[2];
                                popdisplay(p2[0], 'Text');
                            }
                            else if (p2[0].indexOf("chkbox_") == 0) {
                                if (p2[1] == 1) {
                                    document.getElementById(p2[0]).checked = true;
                                }
                                else {
                                    document.getElementById(p2[0]).checked = false;
                                }
                                popdisplay(p2[0], 'Text');
                            }
                            else if (p2[0].indexOf("selmul") == 0) {
                                var dtl = p2[1].split("$");
                                for (var kl = 0; kl < dtl.length; kl++) {
                                    try {
                                        var selected = [];
                                        $('div#' + p2[0] + ' input[type=checkbox]').each(function () {
                                            if ($(this).attr('value') == dtl[kl]) {
                                                $(this).prop('checked', true);
                                                $(this).parent().addClass("multiselect-on");
                                            }
                                            else {
                                                $(this).parent().removeClass("multiselect-on");
                                                $(this).prop('checked', false);
                                            }
                                        });
                                    } catch (err) {
                                    }
                                }
                            }
                            else {
                                try {
                                    $('#' + p2[0]).val(p2[1].replace(/`/g, "'"));
                                    if (isRadioField(p2[0]) == 1) {
                                        setRadioValue(p2[0], p2[1].replace(/`/g, "'"))
                                    }
                                    if (p2[0].indexOf("sel") == 0) {
                                        popdisplay(p2[0], 'Select');
                                    }
                                    else {
                                        popdisplay(p2[0], 'Text');
                                    }
                                } catch (err) {
                                }
                            }
                        } catch (err) {
                            alert(err + "Error in population " + p2[0]);
                        }
                    }
                }
            }
            $('#btnnew').attr('disabled', 'disabled');
            $('#btnedit').removeAttr('disabled');
            $('#btncancel').removeAttr('disabled');
            $('#btnpgcancel').removeAttr('disabled');
            filltrack();
            popGrid();
            try {
                var str1 = $('#imgid').val();
                if (str1 === "")
                    str1 = document.getElementById("txtMRNO").value;
                var str2 = ".png";
                var n = str1.concat(str2);
                //var root = window.location.protocol + "//" + window.location.host + "/";
                var path = localStorage.server + "/MRPhotos/" + n;
                $('#imagetd').find("img").attr("src", path);
            } catch (err) {
                hideProgress();
            }
        }
        getPopulateField();
    });
}
function hideProgress() {
//                try {
//                    window.plugins.spinnerDialog.hide();
//                } catch (err) {
    $('#mydiv').hide();
    //}
}
function popdisplay(id, type) {
    if (type == "Select") {
        var wfid = localStorage.currentformid;
        $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=changeqry&wfid=" + wfid + "&id=" + id + "&value= " + mobile, function (responseText) {

            if (responseText.indexOf("Exception") != -1) {
                alert(responseText);
            }
            stringmanipulationspop(responseText, "")
        });
    }
}
function getPopulateField() {
    
    $('#addframeid').val("");
    var wfid = localStorage.currentformid;
    $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=popfields&wfid=" + wfid + mobile, function (responseJson) {

        if (responseJson != null && responseJson != undefined) {
            var mem = responseJson;
            var textframeids = $('#addframeid').val();
            for (var j = 0; j < mem.length; j++) {
                var data = responseJson[j]['POPULATEQRY'] + "" + responseJson[j]['CHANGEDATA'] + "" + responseJson[j]['CHANGEDATA2'];
                var framerowid = responseJson[j]['FRAMEROWID'];
                if (data.trim() != "") {
                    data = replaceWithHeadFields(data).replace(/`/g, "'");
                    var whdata = data.split("ENDSH:ROW");
                    for (var w = 0; w < whdata.length; w++) {
                        var finalquery = "";
                        data = whdata[w];
                        if (data.indexOf("SH:QRY") != -1) {
                            var showcompanynm = $("#subcompany").val();
                            var viewfromdt = "", viewtodt = "";
                            if (showcompanynm == 1) {
                                viewfromdt = $('#txtdtFrom_Date').val();
                                viewtodt = $('#txtdtTo_Date').val();
                            } else {
                                viewfromdt = $('#txtFromDt').val();
                                viewtodt = $('#txtToDt').val();
                            }
                            $.post(localStorage.ipadrs + "/WebFormSave1?reqtype=populatefields1&wfid=" + wfid + "&id=" + framerowid + "&value= &idtitle= &idvalue= &showcompanynm=" + showcompanynm + "&viewfromdt=" + viewfromdt + "&viewtodt=" + viewtodt + mobile, {qrydata: data}, function (responseText) {

                                if (responseText.indexOf("Exception") != -1) {
                                    alert("Error in PopulateFields function while edit data-->" + responseText);
                                }
                                responseText = responseText.replace(/colonsymbol/g, ':');
                                if (responseText != null) {
                                    if (responseText.indexOf("~lprow~") == -1) {
                                        var dt = responseText.split("@@@");
                                        for (var i = 1; i < dt.length; i++) {
                                            var d = dt[i].split(",!");
                                            var chkid = "";
                                            if (d[0].indexOf(".id") != -1 || d[0].indexOf(".value") != -1) {
                                                var ch = d[0].split(".");
                                                chkid = ch[0];
                                            } else {
                                                chkid = d[0];
                                            }
                                            var ispopfield = 0;
                                            for (var k = 0; k < mem.length; k++) {
                                                var frmid = responseJson[k]['FRAMEROWID'];
                                                if (frmid.trim() == chkid.trim().replace("$", "")) {
                                                    ispopfield = 1;
                                                    break;
                                                }
                                            }
                                            if (ispopfield == 0) {
                                                continue;
                                            }
                                            while (1) {
                                                if (chkid.indexOf("$") != -1) {
                                                    chkid = chkid.replace("$", "");
                                                } else {
                                                    break;
                                                }
                                            }
                                            if (document.getElementById(chkid).tagName == "INPUT") {
                                                document.getElementById(d[0].replace("$", "")).value = d[1];
                                                try {
                                                    var controltype = $(document.getElementById(d[0].replace("$", ""))).attr("controltype");
                                                    if (controltype == "Time") {
                                                        $(document.getElementById(d[0].replace("$", ""))).attr('value', d[1]);
                                                    }
                                                } catch (err) {
                                                }
                                            } else if (document.getElementById(chkid).tagName == "TEXTAREA") {
                                                document.getElementById(d[0].replace("$", "")).value = d[1];
                                            }
                                            else if (document.getElementById(chkid).tagName == "SELECT") {
                                                if (d[0].indexOf(".id") != -1) {
                                                    $('#' + chkid).val(d[1].trim());
                                                } else {
                                                    $("#" + chkid.replace("$", "").trim().replace("$", "") + " option").each(function () {
                                                        if ($(this).text().trim() == d[1].trim()) {
                                                            $(this).attr('selected', 'selected');
                                                        }
                                                    });
                                                }
                                            }
                                            try {
                                                if (d[2] != "") {
                                                    document.getElementById(d[0].replace("$", "")).title = d[2];
                                                }
                                                if (chkid.indexOf("txtdob") != -1) {
                                                    caldob(chkid.replace("txtdob", ""), document.getElementById(chkid), "");
                                                }
                                                $('#changetype').val(1);
                                                var textframeids = $('#addframeid').val();
                                                textframeids = textframeids + "," + chkid;
                                                document.getElementById("addframeid").value = textframeids;
                                                document.getElementById(chkid).onchange();
                                                document.getElementById(chkid).onkeyup();
                                            } catch (err) {
                                            }
                                        }
                                    }
                                    else {
                                        fillgrid(responseText);
                                    }
                                }
                            });
                        }
                    }
                }
            }
        }
    });
    hideProgress();
}

function popGrid() {
    var primid = $('#search_qry').val();
    primid = $('#txtprimKeyField').val();
    var wfid = localStorage.currentformid;
    var socmaster = $('#hdnsocmaster').val();
    var optionform = $('#hdnoptionform').val();
    $('#mydiv1').show();
//        $.get("<%=request.getContextPath()%>/WebFormSave1?reqtype=populategrid&wfid=" + wfid + "&primid=" + primid + "&socid=" + $('#txtsocid').val() + "&socmaster=" + socmaster + "&optionform=" + optionform+getsessionvalues(), function(responseText) {
    $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=populategrid&wfid=" + wfid + "&primid=" + primid + "&socid=" + $('#txtsocid').val() + "&socmaster=" + socmaster + "&optionform=" + optionform + mobile, function (responseText) {
        $('#mydiv1').hide();
        var gridname, gridtype, tabid;
        var headings = "";
        if (responseText.indexOf("Exception") != -1) {
            alert("Error In population Grid-->" + responseText);
            return false;
        }
        if (responseText != null) {
            var val1 = responseText.toString();
            var tabs = val1.toString().split("~~~##");
            for (var kl = 0; kl < tabs.length; kl++) {
                var rows = tabs[kl].split("@@@");
                for (var i = 0; i < rows.length; i++) {
                    var cols = rows[i].split("###");
                    for (var j = 1; j < cols.length; j++) {
                        var heads = cols[j].split(",!");
                        if (i == 1) {
                            gridname = heads[0];
                            gridtype = heads[1];
                            tabid = "tab_dyna_" + gridname.replace(/ /g, "_");
                            if (tabs[kl].indexOf("~tablerows~") != -1) {
                                var dataall = tabs[kl].split("~tablerows~");
                                $("#" + tabid).find("tr:gt(0)").remove();
                                $('#' + tabid).append(dataall[1]);
                            }
                            var oTable = document.getElementById(tabid);
                            var rowLength = oTable.rows.length;
                            for (var l = 0; l < rowLength; l++) {
                                var oCells = oTable.rows.item(l).cells;
                                var celLength = oCells.length;
                                if (l == 0) {
                                    for (var m = 1; m < celLength; m++)
                                    {
                                        var value = oTable.rows[l].cells[m].innerHTML;
                                        if (headings == "") {
                                            headings = headings + "" + value;
                                        }
                                        else {
                                            headings = headings + ",!" + value;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (gridtype == "QueryRowsFixedCols") {

                                var name = heads[0];
                                var type = heads[1];
                                var tit = "", rownum = "";
                                var oTable = document.getElementById(tabid);
                                var rowLength = oTable.rows.length;
                                for (l = 1; l < rowLength; l++) {
                                    var oCells = oTable.rows.item(l).cells;
                                    var celLength = oCells.length;
                                    tit = oTable.rows[l].cells[1].childNodes[0].title;
                                    if (tit == type) {
                                        rownum = l;
                                        break;
                                    }
                                }
                                while (++j < cols.length) {
                                    heads = cols[j].split(",!");
                                    name = heads[0];
                                    type = heads[1];
                                    var controltype = heads[2];
                                    var val = "";
                                    for (var km = 2; km < celLength; km++) {
                                        if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == name.replace("txtdt", "txtdtgrd").replace("$", "").trim()) {
                                            if (controltype == "SearchText") {
                                                oTable.rows[rownum].cells[km].childNodes[0].title = type;
                                                oTable.rows[rownum].cells[km].childNodes[0].value = heads[3];
                                            } else if (controltype == "Checkbox") {
                                                if (type == 1) {
                                                    oTable.rows[rownum].cells[km].childNodes[0].checked = true;
                                                } else {
                                                    oTable.rows[rownum].cells[km].childNodes[0].checked = false;
                                                }
                                            }
                                            else {
                                                oTable.rows[rownum].cells[km].childNodes[0].value = type;
                                            }
                                        }
                                    }
                                }
                            }
                            else if (gridtype == "QueryRowsQueryCols") {
                                var name = heads[0];
                                var type = heads[1];
                                var tit = "", rownum = "";
                                var oTable = document.getElementById(tabid);
                                var rowLength = oTable.rows.length;
                                for (l = 1; l < rowLength; l++) {
                                    var oCells = oTable.rows.item(l).cells;
                                    var celLength = oCells.length;
                                    tit = oTable.rows[l].cells[1].childNodes[0].title;
                                    if (tit == type) {
                                        rownum = l;
                                        break;
                                    }
                                }
                                while (++j < cols.length) {
                                    var qcid, qcval;
                                    heads = cols[j].split(",!");
                                    name = heads[0];
                                    type = heads[1];
                                    qcval = heads[1];
                                    $("#txt" + tit + "" + name.replace(/ /g, '_') + "" + rownum).val(qcval.trim())
                                }
                            }
                            else if (gridtype == "UserRowsQueryCols") {
                                var head = headings.split(",!");
                                var controltype = heads[2];
                                var lable = heads[0];
                                var valuegrd = heads[1];
                                var chkid = heads[3];
                                var searchval;
                                if (controltype == "SearchText") {
                                    searchval = heads[4];
                                }
                                if (i > 2 && j == 1) {
                                    var b = addrowgridGrd(tabid);
                                }
                                if (chkid == "start") {
                                    if (controltype == "SearchText") {
                                        oTable.rows[i - 1].cells[j + 1].childNodes[0].title = valuegrd;
                                        oTable.rows[i - 1].cells[j + 1].childNodes[0].value = searchval;
                                    } else if (controltype == "Checkbox") {
                                        if (valuegrd == 1) {
                                            oTable.rows[i - 1].cells[j + 1].childNodes[0].checked = true;
                                        } else {
                                            oTable.rows[i - 1].cells[j + 1].childNodes[0].checked = false;
                                        }
                                    }
                                    else {
                                        oTable.rows[i - 1].cells[j + 1].childNodes[0].value = valuegrd;
                                    }
                                }
                                else {
                                    var collength = $('#' + tabid + ' tr:eq(' + (i - 1) + ')').find("input[type=text]").length;
                                    for (var t = 0; t < collength - 1; t++) {
                                        var tit = oTable.rows[i - 1].cells[t + 3].childNodes[0].title;
                                        if (lable == tit) {
                                            oTable.rows[i - 1].cells[t + 3].childNodes[0].value = valuegrd;
                                        }
                                    }
                                }
                            }
                            else if (gridtype == "UserRowsFixedCols") {
                                var controltype = heads[2];
                                var lable = heads[0];
                                var name = heads[0];
                                var valuegrd = heads[1];
                                var searchval;
                                if (controltype == "SearchText") {
                                    searchval = heads[3];
                                }
                                if (i > 2 && j == 1) {
                                    var b = addrowgridGrd(tabid);
                                }
                                var val = "";
                                var oCells = oTable.rows.item(i - 1).cells;
                                var celLength = oCells.length;
                                for (var km = 2; km < celLength; km++) {
                                    if (oTable.rows[i - 1].cells[km].childNodes[0].id == undefined) {
                                        continue;
                                    }
                                    if (oTable.rows[i - 1].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == name.replace("txtdt", "txtdtgrd").replace("txttm", "txttmgrd").replace("$", "").trim()) {
                                        if (controltype == "SearchText") {
                                            oTable.rows[i - 1].cells[km].childNodes[0].title = valuegrd;
                                            oTable.rows[i - 1].cells[km].childNodes[0].value = heads[3];
                                        } else if (controltype == "Checkbox") {
                                            if (valuegrd == 1) {
                                                oTable.rows[i - 1].cells[km].childNodes[0].checked = true;
                                            } else {
                                                oTable.rows[i - 1].cells[km].childNodes[0].checked = false;
                                            }
                                            try {
                                                oTable.rows[i - 1].cells[km].childNodes[0].onkeyup();
                                            } catch (err) {
                                            }
                                        }
                                        else {
                                            oTable.rows[i - 1].cells[km].childNodes[0].value = valuegrd.replace(/%/g, '');
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        getPopulateField();
        popAttach();
        $('.Hide').hide();
    });
}

function isSpecial(event) {
    if (window.event) {
        var charCode = window.event.keyCode;
    }
    else if (event) {
        var charCode = event.which;
    }
    else {
        return true;
    }
    if (charCode == 38 || charCode == 37 || charCode == 43 || charCode == 39 || charCode == 34) {
        alert("Special Characters not allowed");
        return false;
    }
    return true;
}
function isNumeric(event) {
    if (window.event) {
        var charCode = window.event.keyCode;
    }
    else if (event) {
        var charCode = event.which;
    }
    else {
        return true;
    }
    if (charCode == 45 || charCode == 46) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function fillPrints() {
    var wfid = localStorage.currentformid;
    $.get(localStorage.ipadrs + "/WebFormSave1?wfid=" + wfid + "&reqtype=printlist" + mobile, function (responseJson) {
        if (responseJson !== null) {
            var select = document.getElementById("selPrints");
            select.length = 0;
            var mem = responseJson;
            for (var i = 0; i < mem.length; i++) {
                var sourcename = responseJson[i]['TRANSNM'];
                var indexo = responseJson[i]['VALUE'];
                select.options[select.options.length] = new Option(sourcename, indexo);
            }
        }
    });
}
function print() {

    var transid = document.getElementById("selPrints").value;
    var id = $('#txtprimKeyField').val();
    var wfid = localStorage.currentformid;
    var path = localStorage.ipadrs + '/WebFormPrint?wfid=' + wfid + '&id=' + id + "&reqtype=print&transid=" + transid + "&mobile=mobprint";
    showProgress();
    $.get(path, function (responsetext) {
        var print = responsetext;
        if (print == "1") {
//            alert("file saved successfully");
            download();
        } else {
            alert(responsetext);
            hideProgress();
        }
    });
//     $('.btnprevnextprintdiv').hide();
//      $('.btnprevnextnewdiv').show();
}

function print1() {

    var transid = document.getElementById("selPrints").value;
    var id = $('#txtprimKeyField').val();
    var wfid = localStorage.currentformid;
    var path = localStorage.ipadrs + '/WebFormPrint?wfid=' + wfid + '&id=' + id + "&reqtype=print&transid=" + transid + "&mobile=mobprint";
    showProgress();
    $.get(path, function (responsetext) {
        var print = responsetext;
        if (print == "1") {
//            alert("file saved successfully");
            download();
        } else {
            alert(responsetext);
            hideProgress();
        }
    });
    $('.btnprevnextprintdiv').hide();
    $('.btnprevnextnewdiv').show();
}
function filltrack() {

    var trackid = $("#txtprimKeyField").val();
    var wfid = localStorage.currentformid;
    $.get(localStorage.ipadrs + '/WebFormSave1?trackid=' + trackid + '&reqtype=poptrack&wfid=' + wfid + mobile, function (responseJson) {
        if (responseJson != null && responseJson != "") {

            $("#track").find("tr:gt(0)").remove();
            var table3 = $("#track");
            for (var i = 0; i < responseJson.length; i++) {
                var rowNew = $("<tr><td width='4%'><td width='23%'></td><td width='24%'></td><td width='24%'></td><td width='25%'></td></tr>");
                rowNew.children().eq(0).text(i + 1);
                rowNew.children().eq(1).text(responseJson[i]['TRACKDATE']);
                rowNew.children().eq(2).text(responseJson[i]['TRACKTIME']);
                rowNew.children().eq(3).text(responseJson[i]['USERNAME']);
                rowNew.children().eq(4).text(responseJson[i]['TERMINALID']);
                rowNew.appendTo(table3);
            }
        }
        autoTextareaHeight();
    });
}
function checking() {
    
    newData();
    var t0 = performance.now();
           
    var dis = $('#hdnnewdisable').val();
    
    try {
        document.getElementById("mydiv1").style.display = 'none';
    }
    catch (ee) {

    }
    
//        document.getElementById("userwiselog").style.display = "none";
//        try{$('#forminfopara').html("<%=request.getAttribute("formdesc")%>");}catch(err){}
    var imgcap = $('#hdnimgcap').val();
//        var mswordprint = '<%=request.getAttribute("mswordprint")%>';
//        var addfields = '<%=request.getAttribute("addfields")%>';
//        var gridname = '<%=request.getAttribute("gridnamelist")%>';
//        if(gridname !=""){var grd = gridname.split(",!");var select = document.getElementById("gridnmval");for(j=0;j<grd.length;j++){select.options[select.options.length] = new Option(grd[j], grd[j]);}}
//        try{if(addfields == 1){document.getElementById('divaddfieldbtn').style.display = 'block'}}catch(err){}
//        var masterform = '<%=request.getAttribute("masterform")%>';
//        var usernm= "<%=session.getAttribute("gusernm").toString().trim()%>";
//        if(usernm.toUpperCase() == 'SHIVAM'){
//            document.getElementById("divlogsbtn").style.display = "block";
//document.getElementById("txtdblayer").style.display = "inline-block";
//        }else{document.getElementById("divlogsbtn").style.display = "none";
//document.getElementById("txtdblayer").style.display = "none";
//        }
//        try{
//            var rightsexportfw = '<%=request.getAttribute("rightsexportfw")%>';
//            var rightsimportfw = '<%=request.getAttribute("rightsimportfw")%>';
//        if(usernm.toUpperCase() == 'SHIVAM' ||  rightsexportfw=="1"){
//document.getElementById("exporttest").style.display = "inline-block";
//        }else{
//document.getElementById("exporttest").style.display = "none";
//        }
//        if(usernm.toUpperCase() == 'SHIVAM' ||  rightsimportfw=="1"){
//        document.getElementById("divimpobtn").style.display = "block";
//        }else{
//            document.getElementById("divimpobtn").style.display = "none";
//        }
//    }catch(err){alert(err);}
//        if(masterform == 1){document.getElementById("tabactive").style.display = "block";}else{document.getElementById("tabactive").style.display = "none";}
//        if(mswordprint == 1){document.getElementById("msword").style.display = "inline-block";}
//        else{document.getElementById("msword").style.display = "none";}
    if (imgcap == 1) {
        document.getElementById("imagetd").style.display = "block";
        document.getElementById("imgPatient").style.display = "inline-block";
        $('#booth').animate({'height': '50', 'width': '60'}, 100);
        $('img').animate({'height': '50', 'width': '60'}, 100);
    } else {
        try {
            document.getElementById("imagetd").style.display = "none";
        } catch (err) {
        }
    }
    if (dis == 1) {
        $('#btnnew').attr('disabled', 'disabled');
    }
    var dis = $('#hdnoptionform').val();
    if (dis == 1) {
        editData();
        $('#btnedit').removeAttr('disabled');
        searchData();
    }
    fillPrints();
    
//        try{if($('#hdnframeworktable').val()=='1'){document.getElementById("fwdb").innerHTML='AS'}}catch(err){}
    var showcompanynm = $('#subcompany').val();
    var searchinform = $('#serachform').val();
    var activatedelete = $('#hdnactivatedalete').val();
    ;
    
//        confirm($('#disfrom').val());
//    if (showcompanynm != 1) {
//        if (localStorage.companyid != "" && $('#disfrom').val() == "1") {
//
//        }
//        else {
//            alert(showcompanynm);
////                 confirm(localStorage.companyid)
//            changedefault();
//        }
//
//    }
    var noedit = $('#hdnnoedit').val();
//    if(activatedelete == 0){
//        $('#btndelete').attr('disabled', 'disabled');
//    }else{
//        $('#btndelete').removeAttr('disabled');
//    }
//    if('<%=request.getParameter("fromfwform")%>' ==  '1'){
//        document.getElementById("divclose").style.display = "none";
//    }
    if (searchinform == 1) {
        getSearchData()
    } else {
        document.getElementById("divsearchdata").style.display = 'none';
    }
    var transid = $('#hdntransid').val();
    if (transid != 'null') {
        document.getElementById('search_qry').value = transid;
        document.getElementById('search_qry').onchange();
    }
    else if (document.getElementById('disfrom').value == "1") {
        var id = document.getElementById('disid').value;
        try {
            document.getElementById(id).value = document.getElementById('disvalue').value
            //document.getElementById(id).title= document.getElementById('disvalue').value
            var dateid = document.getElementById("disdateid").value;
            document.getElementById(dateid).value = document.getElementById('disdatevalue').value;
        } catch (err) {
        }
        try {
            var surgeryid = document.getElementById("dissurgeryid").value;
            document.getElementById(surgeryid).value = document.getElementById('dissurgeryvalue').value;
            document.getElementById(surgeryid).title = document.getElementById('dissurgeryvalue').value;
            document.getElementById(surgeryid).onchange();
        } catch (err) {
        }
        try {
            var disdocid = document.getElementById('disdoctorid').value;
            document.getElementById(disdocid).value = document.getElementById('disdoctorvalue').value;
        } catch (errr) {
        }
        if (id != "") {
//		alert("id"+id);
            var valinp = document.getElementById('disvalue').value;
//		    alert("valinp"+valinp);
            if (valinp.trim() != "") {

                document.getElementById(id).onchange();
            }
        }
    }
    if (document.getElementById('disid').value.trim() != "" && document.getElementById('disfrom').value != "1") {
        var linktoform = $('#hdnlinktoform').val();
        var fieldid = document.getElementById('disid').value;
        if (linktoform != 'null') {
            if (fieldid.indexOf("_searchid") != -1) {
                getkeyward(fieldid, linktoform);
            } else {
                document.getElementById(fieldid).value = linktoform;
                document.getElementById(fieldid).onchange();
            }
        }
    }
    if (document.getElementById('disid').value.trim() != "" && $('#hdnlinktoform').val() != "1") {
        var linktoform = $('#hdnlinktoform').val();
        var fieldid = document.getElementById('disid').value;
        if (linktoform != 'null') {
            if (fieldid.indexOf("_searchid") != -1) {
                getkeyward(fieldid, linktoform);
            } else {
                document.getElementById(fieldid).value = linktoform;
                document.getElementById(fieldid).onchange();
            }
        }
    }
    try {
        if ($('#disfrom').val() == '1') {
            var cmpny = $('#hdncompany').val();
            if (cmpny != 'null' && cmpny != '') {
                localStorage.subcompanyidvf = cmpny;
//        $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=populatefields1&wfid=" + wfid + "&id=" + id + "&value=" + val + "&idtitle=" + idtitle + "&idvalue=" + idvalue + "&qrydata=" + data.trim() + mobile, function (responseText) {        
                $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=subcomp&subcomp=" + cmpny + "" + mobile, function (responseText) {
                })
            }
            if (localStorage.companyid != "" && $('#disfrom').val() == "1") {
                var hdndrillfromdt = localStorage.drillfromdt;
                $('#txtFromDt').val(hdndrillfromdt);
                var hdndrilltodt = localStorage.drilltodt;
                $('#txtToDt').val(hdndrilltodt);
            }
            else {
                var hdndrillfromdt = $('#hdndrillfromdt').val();
                $('#txtFromDt').val(hdndrillfromdt);
                var hdndrilltodt = $('#hdndrilltodt').val();
                $('#txtToDt').val(hdndrilltodt);
            }

        }
    } catch (err) {
    }

    var isdb = $('#hdndblayerexists').val();
    if (isdb == 0) {
        $('#divTools').hide();
        $('.sidebar').hide();
        $('.sidebar3').hide();
        $('.sidebar4').hide();
        $('.sidebar5').hide();
        $('.sidebar6').hide();
//	$('.printdivid').show();
    }
    document.getElementById("mydiv1").style.display = 'none';
    var showcompanynm = $('#subcompany').val();
    var cmpny = $('#hdncompany').val();
    if (typeof (cmpny) === "undefined") {
        cmpny = 'null';
    }
    
    if (showcompanynm == 1 && cmpny == 'null') {
        getCompanyNames();
        if (localStorage.companyid != "" && $('#disfrom').val() == "1") {
//                 confirm(localStorage.companyid);
        }
        else {
            document.getElementById("displaycompany").style.display = "block";
        }

    }
//         logtext();
    try {
        var imgid = $('#hdniconid').val();
        if (imgid != "") {
            document.getElementById("imgsrc").style.display = 'block';
            var str1 = imgid;
            var root = window.location.protocol + "//" + window.location.host + "/";
            var path = root + "icons/" + str1;
            document.getElementById("imgsrc").src = path;
        }
    } catch (err) {
        alert(err);
    }
    try {
        $("#tabs").tabs("option", "active", 1);
        $("#tabs").tabs("option", "active", 0);
    } catch (err) {
    }
    $('input').on('paste', function () {
        var element = this;
        setTimeout(function () {
            var text = $(element).val();
            $(element).keyup();
        }, 100);
    });
    var t1 = performance.now();
        //alert("Call to checking took " + (t1 - t0) + " milliseconds.")
}
//function checking() {
//    
//    newData();
//    try {
//        var searchinform = $('#serachform').val();
//        var showcompanynm = $('#subcompany').val();
//        try {
//            document.getElementById("mydiv1").style.display = 'none';
//        }
//        catch (ee) {
//
//        }
//        if (showcompanynm == 1) {
//            getCompanyNames();
//            document.getElementById("displaycompany").style.display = "block";
//        }
//        if (searchinform == 1) {
//            getSearchData()
//        } else {
//            try {
//                document.getElementById("divsearchdata").style.display = 'none';
//            } catch (ee) {
//
//            }
//        }
//        logtext();
//    }
//    catch (err) {
//        alert(err);
//    }
//    var dis = $('#hdnnewdisable').val();
//    var imgcap = $('#hdnimgcap').val();
//    var masterform = '';
//    if (masterform == 1) {
//        document.getElementById("tabactive").style.display = "inline-block";
//    } else {
//        try {
//            document.getElementById("tabactive").style.display = "none";
//        } catch (error) {
//        }
//    }
//    if (imgcap == 1) {
//        document.getElementById("imagetd").style.display = "inline-block";
//        document.getElementById("imgPatient").style.display = "inline-block";
//        $('#booth').animate({'height': '50', 'width': '50'}, 900);
//        $('#imgPatient').animate({'height': '50', 'width': '50'}, 900);
//    } else {
//        try {
//            document.getElementById("imagetd").style.display = "none";
//        } catch (error) {
//        }
//    }
//    if (dis == 1) {
//        $('#btnnew').attr('disabled', 'disabled');
//    }
//    var dis = $('#hdnoptionform').val();
//    if (dis == 1) {
//        editData();
//        $('#btnedit').removeAttr('disabled');
//        searchData();
//    }
//    // $('.Date1').val('<%= date10%>');
//    fillPrints();
//    var tables = ["dynamictable", "tabhidden", "tabAfter"];
//    for (var ta = 0; ta < tables.length; ta++) {
//        var table = document.getElementById(tables[ta]);
//        var textbox = table.getElementsByTagName("input");
//        var dropdown = table.getElementsByTagName("select");
//
//        for (var i = 0; i < dropdown.length; i++) {
//            var value = dropdown[i].title;
//            var chkid = dropdown[i].id;
//            try {
//                document.getElementById(chkid).onchange();
//            } catch (err) {
//            }
//        }
//    }
//
//    var transid = $('#hdntransid').val();
//    ;
//    if (transid != 'null') {
//        document.getElementById('search_qry').value = transid;
//        document.getElementById('search_qry').onchange();
//    }
//    else if (document.getElementById('disfrom').value === "1")
//        var id = document.getElementById('disid').value;
//
//
//    try {
//        document.getElementById(id).value = document.getElementById('disvalue').value
//        document.getElementById(id).title = document.getElementById('disvalue').value
//        var dateid = document.getElementById("disdateid").value;
//        document.getElementById(dateid).value = document.getElementById('disdatevalue').value;
//    } catch (err) {
//
//    }
//    try {
//        var surgeryid = document.getElementById("dissurgeryid").value;
//        document.getElementById(surgeryid).value = document.getElementById('dissurgeryvalue').value;
//        document.getElementById(surgeryid).title = document.getElementById('dissurgeryvalue').value;
//        document.getElementById(surgeryid).onchange();
//    } catch (err) {
//
//    }
//    try {
//        var disdocid = document.getElementById('disdoctorid').value;
//        try {
//            document.getElementById(disdocid).value = document.getElementById('disdoctorvalue').value;
//        } catch (ee) {
//
//        }
//        document.getElementById(id).onchange();
//    } catch (errr) {
//
//    }
//    try {
//        var imgid = $('#hdniconid').val();
//        if (imgid != "") {
//            document.getElementById("imgsrc").style.display = 'inline-block';
//            var str1 = imgid;
//            var root = window.location.protocol + "//" + window.location.host + "/";
//            var path = root + "icons/" + str1;
//            document.getElementById("imgsrc").src = path;
//        }
//    } catch (err) {
//        alert(err);
//    }
//
//
//
//
//    if (document.getElementById('disid').value != "" && document.getElementById('disfrom').value != "1") {
//
//        var linktoform = $('#hdnlinktoform').val();
//        var fieldid = document.getElementById('disid').value;
//        if (linktoform != 'null') {
//            if (fieldid.indexOf("_searchid") != -1) {
//                getkeyward(fieldid, linktoform);
//            } else {
//                document.getElementById(fieldid).value = linktoform;
//                document.getElementById(fieldid).onchange();
//            }
//        }
//    }
//    var isdb = $('#hdndblayerexists').val();
//    if (isdb == 0) {
//        $('.sidebar').hide();
//        $('.sidebar3').hide();
//        $('.sidebar4').hide();
//    }
//}


function logtext() {

    $('#tabdata').find('tr:gt(0)').remove();
    $('#tabdata').find('tr:eq(0)').remove();
    var fromdt = $('#logFromDt1').val();
    var todt = $('#logToDt1').val();
    var wfid = localStorage.currentformid;
    var x = document.getElementById("sellogs");
    $.get($('#hdreqpath').val() + "/LogsData?reqtype=populatetext&wfid=" + wfid + "&fromdt=" + fromdt + "&todt=" + todt, function (responseText) {
        if (responseText.indexOf("Exception") != -1) {
            var x = responseText.split("Exception");
            alert(x[1]);
        }

        var showdata = responseText;
        var str = showdata.split(":");
        var len = str.length;
        var i = 0;

        $('#tabdata').append(showdata);

    });
}
function getSearch(id) {
    $('#btnedit').removeAttr('disabled');
    $('#search_qry').val(id);
    $('#txtprimKeyField').val(id);
    $('#changetype').val("1");
    searchData();
}
function getSearchData() {
    var wfid = localStorage.currentformid;
    document.getElementById("divsearchbtn").style.display = 'none';
    var finqry = "";
    var data = "";
    $.get($('#hdreqpath').val() + "/WebFormSave1?reqtype=searchqry&wfid=" + wfid, function (responseText) {

        if (responseText.indexOf("Exception") != -1) {
            alert(responseText);
        }
        if (responseText.indexOf("ENDIF") != -1) {
        } else {
            var disfield = document.getElementById('disvalue').value;
            data = replaceFunction(responseText, "dollorsymbolDISFIELD", disfield);
            data = data.replace(/`/g, "'");
            data = replaceWithHeadFields(data);
        }
        $.get($('#hdreqpath').val() + "/WebFormSave1?reqtype=searchqrydata&wfid=" + wfid + "&qry=" + data, function (responseText) {

            if (responseText.indexOf("Exception") != -1) {
                alert("Error" + responseText);
            } else {
                $("#tabsearchdata").find("tr").remove();
                $("#tabsearchdata").append(responseText);
            }
        });
    });
}
function getCompanyNames() {
    
    $.get($('#hdreqpath').val() + "/WebFormSave1?reqtype=companynames" + mobile, function (responseJson) {

        if (responseJson != null && responseJson != undefined) {
            var companydata = "<table style='background:white;height:150px;opacity:10'><tr><td class='topbg'>Select Company</td></tr><tr><td valign='top'><select id='list' size='3' style='height:100px' autofocus onclick= 'changecompany()' onkeypress='return isNumberforwindow(event)'>";
            var mem = responseJson;
            if (localStorage.companyid != "" && $('#disfrom').val() == "1") {
//                 confirm(localStorage.companyid);
            }
            else {
                document.getElementById("displaycompany").style.display = "block";
            }

            for (var j = 0; j < mem.length; j++) {
                var data = responseJson[j][''];
                companydata = companydata + "<option value=" + responseJson[j]['COMPANYID'] + " selected>" + responseJson[j]['COMPANYNM'] + "</option>"
            }
            document.getElementById('displaycompany').innerHTML = companydata;
        }
    });
}
function changecompany() {
    
    document.getElementById("displaycompany").style.display = "none";
    var companyid = $('#list').val();
    localStorage.companyidvf = companyid;
    $.get($('#hdreqpath').val() + "/WebFormSave1?reqtype=subcompanies&companyid=" + companyid + mobile, function (responseJson) {

        if (responseJson != null && responseJson != undefined && responseJson != '') {
            var companydata = "<table style='background:white;height:150px;opacity:10'><tr><td class='topbg'>Select Sub Company</td></tr><tr><td valign='top'><select id='list' size='3' style='height:100px' autofocus onclick= 'changesubcompany()' onkeypress='return isNumberforwindow(event)'>";
            var mem = responseJson;

            if (mem.length === 1) {
                localStorage.companyfromdtvf = responseJson[0]['SUBCOMPANYID'];

            } else {
                if (localStorage.companyid != "" && $('#disfrom').val() == "1") {
//                 confirm(localStorage.companyid);
                }
                else {
                    document.getElementById("displaycompany").style.display = "block";
                }

                for (var j = 0; j < mem.length; j++) {
                    var data = responseJson[j][''];
                    companydata = companydata + "<option value=" + responseJson[j]['SUBCOMPANYID'] + " selected>" + responseJson[j]['SUBCOMPANYNM'] + "</option>"
                }

            }
        }
    });
}
function changesubcompany() {
    
    document.getElementById("displaycompany").style.display = "none";
    var subcompanyid = $('#list').val();
    localStorage.subcompanyidvf = subcompanyid;
    $.get($('#hdreqpath').val() + "/WebFormSave1?reqtype=subcompanies1&subcompanyid=" + subcompanyid + mobile, function (responseJson) {

        if (responseJson != null && responseJson != undefined && responseJson != '') {
            var companydata = "<table style='background:white;height:150px;opacity:10'><tr><td class='topbg'>Select Sub Company</td></tr><tr><td valign='top'><select id='list' size='3' style='height:100px' autofocus onclick= 'changesubcompany()' onkeypress='return isNumberforwindow(event)'>";
            var mem = responseJson;

            if (mem.length === 1) {

                localStorage.subcompanyidvf = responseJson[0]['SUBCOMPANYID'];
            }
            else {
                for (var j = 0; j < mem.length; j++) {
                    var data = responseJson[j][''];
                    companydata = companydata + "<option value=" + responseJson[j]['SUBCOMPANYID'] + " selected>" + responseJson[j]['SUBCOMPANYNM'] + "</option>"
                }
            }
            document.getElementById('displaycompany').innerHTML = companydata;
        } else {
            changedefault();
        }
    });
}
var refreshfield;
function changedefault() {
    //confirm("in");
    
    var tables = ["dynamictable", "tabhidden", "tabAfter"];
    var textbox, dropdown;
    var lenfor13 = tables.length;
    $(document).find("select").each(function(){
       $(this).change();
    });
//    for (var ta = 0; ta < lenfor13; ta++) {
//        var table = document.getElementById(tables[ta]);
//        var textbox = table.getElementsByTagName("input");
//        var dropdown = table.getElementsByTagName("select");
//        var lenfor55 = dropdown.length;
//        for (var i = 0; i < lenfor55; i++) {
//            var value = dropdown[i].title;
//            var chkid = dropdown[i].id;
//            try {
//                // confirm("here"+chkid);
//                document.getElementById(chkid).onchange();
//            } catch (err) {
//            }
//            var nselect = document.getElementById(chkid.trim());
//            for (var im = 0; im < nselect.length; im++) {
//                if (nselect.options[im].text == 'NULL' && nselect.options[im].value == '') {
//                    nselect.remove(im);
//                }
//            }
//            nselect = null;
//        }
//    }
    textbox = null;
    dropdown = null;
}
function getData(id, field) {

    var data = "";
    try {
        if (field == "id")
            data = document.getElementById(id).title;
        else
            data = document.getElementById(id).value;
    } catch (e) {
    }
    return data;
}
function getDataGrid(id, field) {

    var id1 = id;
    var data = "";
    var tablename = $('#curtable').val();
    var row = $('#currow').val();
    var col = $('#curcol').val();
    var isexists = 0;
    var oTable = document.getElementById(tablename);
    var rowLength = oTable.rows.length;
    var oCells = oTable.rows.item(row).cells;
    var celLength = oCells.length;
    for (var km = 2; km < celLength; km++) {
        if (oTable.rows[row].cells[km].childNodes[0].id == id.replace("$", "").trim()) {
            isexists = 1;
            if (field == "id") {
                data = oTable.rows[row].cells[km].childNodes[0].title;
            } else {
                data = oTable.rows[row].cells[km].childNodes[0].value;
            }
        }
    }
    if (isexists == 0) {
        if (field == "id")
            data = document.getElementById(id1).title;
        else
            data = document.getElementById(id1).value;
    }
    return data;

}
function changefunction1(data, id1) {

    var val;
    var id = id1.id;
    var isqryreplaced = 0;
    var changetype = $('#changetype').val();
    if (id.indexOf("_searchid") != -1 && changetype == 0) {
        var tit = document.getElementById(id).title;
        var val = document.getElementById(id).value;
        document.getElementById(id).title = val;
    }
    $('#changetype').val(0);
    var fromdt = $('#txtFromDt').val();
    var todt = $('#txtToDt').val();
    var inputtype = document.getElementById(id).tagName;
    var check = "";
    if (data.trim() != "" && data.indexOf("SH:QRY") == -1)
        check = stringmanipulations(data, inputtype);
    else
        check = true;
    var data1 = data;

    if (check == true) {
        if (inputtype == "INPUT") {
            var val = document.getElementById(id).value;
            var idtitle = document.getElementById(id).title;
            var idvalue = document.getElementById(id).value;
        } else if (inputtype == "SELECT") {
            var val = document.getElementById(id).value;
            var idtitle = document.getElementById(id).value;
            var idvalue = $("#" + id + " option:selected").text();
        }
        var wfid = localStorage.currentformid;

        while (1) {
            if (data.indexOf("$fd") != -1) {
                data = data.replace("$fd", fromdt);
            } else {
                break;
            }
        }
        while (1) {
            if (data.indexOf("$td") != -1) {
                data = data.replace("$td", todt);
            } else {
                break;
            }
        }
        if (data.indexOf("ENDIF") != -1) {
            var dtl = data.trim().split("ENDIF");
            for (var j = 0; j < dtl.length; j++) {
                var qrytemp = dtl[j];
                qrytemp = qrytemp;
                if (qrytemp.trim().replace("ENDSH:QRY", "").replace("ENDSH:ROW", "") == "")
                    continue;
                if (qrytemp.indexOf("ELSE ") != -1) {
                    var chk = true;
                    var wholedata = qrytemp.replace("ELSE ", "");
                } else {
                    var qrytempdtl = qrytemp.split("THEN ");
                    var condition = qrytempdtl[0];
                    condition = condition.replace("IF ", "").replace("ELSEIF", "").replace("ELSE", "");
                    condition = condition.trim().replace("ENDSH:ROW", "").replace("SH:ROW", "");
                    var chk = getFormulaValue(condition, "");
                    var wholedata = qrytempdtl[1];
                }
                if (chk) {
                    isqryreplaced = 1;
                    data = wholedata;
                    var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
                    //var temptdata = data.replace("SH:QRY","").replace("ENDSH:QRY","");
                    var temp = temptdata.split("^");
                    try {
                        for (var t = 0; t < temp.length; t++) {
                            var temp1 = temp[t];
                            var tem = temp1.split("==");
                            var temp2 = tem[1].split(" ");
                            for (var i = 0; i < temp2.length; i++) {
                                if (temp2[i].indexOf("$loc") != -1 || temp2[i].indexOf("$dept") != -1 || temp2[i].indexOf("$sdept") != -1 || temp2[i].indexOf("$serverDate") != -1 || temp2[i].indexOf("$gFinYearStart") != -1 || temp2[i].indexOf("$gFinYearEnd") != -1 || temp2[i].indexOf("$soc") != -1 || temp2[i].indexOf("$shiftid") != -1 || temp2[i].indexOf("$terminal") != -1 || temp2[i].indexOf('$version') != -1 || temp2[i].indexOf('$userid') != -1 || temp2[i].indexOf('$usernm') != -1)
                                    continue;
                                if (temp2[i].indexOf("$") != -1) {
                                    var chkid = "";
                                    if (temp2[i].indexOf(".id") != -1 || temp2[i].indexOf(".value") != -1) {
                                        var ch = temp2[i].split(".");
                                        chkid = ch[0];
                                    } else {
                                        chkid = temp2[i];
                                    }
                                    while (1) {
                                        if (chkid.indexOf("$") != -1) {
                                            chkid = chkid.replace("$", "");
                                        } else {
                                            break;
                                        }
                                    }
                                    chkid = chkid.replace(/`/g, "");
                                    chkid = chkid.replace(/'/g, "");
                                    var idvalue = "";
                                    var idtitle = "";
                                    try {
                                        if (document.getElementById(chkid).tagName == "INPUT") {
                                            idvalue = $('#' + chkid).val();
                                            idtitle = document.getElementById(chkid).title;
                                        } else if (document.getElementById(chkid).tagName == "SELECT") {
                                            idtitle = $('#' + chkid).val();
                                            idvalue = $("#" + chkid + " option:selected").text();
                                        }
                                        wholedata = wholedata.replace(chkid + ".id", idtitle);
                                        wholedata = wholedata.replace(chkid + ".value", idvalue);
                                    } catch (err) {
                                        continue;
                                    }
                                    data = wholedata;
                                }
                            }
                        }
                    } catch (err) {
                    }
                    break;
                }
            }
        }


        else {
            isqryreplaced = 1;
            if (data.indexOf("SH:QRY") != -1) {
                var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
                var temp = temptdata.split("^");
                try {
                    for (var t = 0; t < temp.length; t++) {
                        var temp1 = temp[t];
                        var tem = temp1.split("==");
                        var temp2 = tem[1].split(" ");
                        for (var i = 0; i < temp2.length; i++) {
                            if (temp2[i].indexOf("$") != -1) {
                                if (temp2[i].indexOf("$loc") != -1 || temp2[i].indexOf("$dept") != -1 || temp2[i].indexOf("$sdept") != -1 || temp2[i].indexOf("$serverDate") != -1 || temp2[i].indexOf("$gFinYearStart") != -1 || temp2[i].indexOf("$gFinYearEnd") != -1 || temp2[i].indexOf("$soc") != -1 || temp2[i].indexOf("$shiftid") != -1 || temp2[i].indexOf("$terminal") != -1 || temp2[i].indexOf('$version') != -1 || temp2[i].indexOf('$userid') != -1 || temp2[i].indexOf('$usernm') != -1)
                                    continue;
                                var chkid = "";
                                if (temp2[i].indexOf(".id") != -1 || temp2[i].indexOf(".value") != -1) {
                                    var ch = temp2[i].split(".");
                                    chkid = ch[0];
                                } else {
                                    chkid = temp2[i];
                                }
                                while (1) {
                                    if (chkid.indexOf("$") != -1) {
                                        chkid = chkid.replace("$", "");
                                    } else {
                                        break;
                                    }
                                }
                                chkid = chkid.replace(/`/g, "");
                                chkid = chkid.replace(/'/g, "");
                                var idvalue = "";
                                var idtitle = "";
                                try {
                                    if (document.getElementById(chkid).tagName == "INPUT") {
                                        idvalue = $('#' + chkid).val();
                                        idtitle = document.getElementById(chkid).title;
                                    } else if (document.getElementById(chkid).tagName == "SELECT") {
                                        idtitle = $('#' + chkid).val();
                                        idvalue = $("#" + chkid + " option:selected").text();
                                    }
                                    data = data.replace(chkid + ".id", idtitle);
                                    data = data.replace(chkid + ".value", idvalue)
                                } catch (err) {

                                }
                            }
                        }
                    }
                } catch (err) {
                }
            }
        }
        data = data.replace(/`/g, "'");
        if (data.indexOf("SH:QRY") == -1) {
            return;
        }
        if (isqryreplaced == 0) {
            return false;
        }
        data = data.replace(/\+/g, 'plussymbol');
        data = replacefun(data);
        var whdata = data.split("ENDSH:ROW");
        for (var w = 0; w < whdata.length; w++) {
            data = whdata[w];
            data = replaceLabelvalues(data);
            if (data.indexOf("SH:QRY") == -1) {
                stringmanipulations(data);
                continue;
            }
            $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=populatefields1&wfid=" + wfid + "&id=" + id + "&value=" + val + "&idtitle=" + idtitle + "&idvalue=" + idvalue + "&qrydata=" + data.trim() + mobile, function (responseText) {

                if (responseText.indexOf("Exception") != -1) {
                    alert(responseText);
                }
                responseText = replacefunnew(responseText);
                if (responseText.indexOf("~lprow~") == -1) {
                    if (data1.indexOf("SH:VALIDATION") != -1 && responseText.trim() == "") {
                        var valdata = data1.substring(data1.indexOf("SH:VALIDATION") + 13, data1.indexOf("ENDSH:VALIDATION"));
                        var shcalrows = valdata.split("^");
                        for (var shcal = 0; shcal < shcalrows.length; shcal++) {
                            if (shcalrows[shcal].indexOf("ENDID") != -1) {
                                alert(shcalrows[shcal]);
                                stringmanipulations(shcalrows[shcal], "");
                            } else {
                                var lastdata = shcalrows[shcal].split("=");
                                if (lastdata[0].trim() == "EMPTYMSG") {
                                    alert(lastdata[1]);
                                } else {
                                    setValue(lastdata[0], lastdata[1].replace(/'/g, "").replace(/`/g, ""), "");
                                }
                            }

                        }
                    }

                    if (responseText != null) {

                        var dt = responseText.split("@@@");
                        for (var i = 1; i < dt.length; i++) {
                            var ispoponly = 0;
                            if (dt[i].indexOf(":POPONLY") != -1) {
                                var ch = dt[i].split(":POPONLY");
                                dt[i] = ch[0];
                                ispoponly = 1;
                            }
                            dt[i] = replacefunnew(dt[i]);
                            var d = dt[i].split(",!");
                            var chkid = "";
                            if (d[0].indexOf(".id") != -1 || d[0].indexOf(".value") != -1) {
                                var ch = d[0].split(".");
                                chkid = ch[0];
                            } else {
                                chkid = d[0];
                            }
                            while (1) {
                                if (chkid.indexOf("$") != -1) {
                                    chkid = chkid.replace("$", "");
                                } else {
                                    break;
                                }
                            }
                            try {
                                if (document.getElementById(chkid).tagName == "INPUT") {
                                    if (d.length == 3 && d[1].trim() == "") {
                                    } else {
                                        document.getElementById(d[0].replace("$", "")).value = d[1];
                                    }
                                } else if (document.getElementById(chkid).tagName == "TEXTAREA") {
                                    document.getElementById(d[0].replace("$", "")).value = d[1];
                                }
                                else if (document.getElementById(chkid).tagName == "SELECT") {
                                    if (d[0].indexOf(".id") != -1) {
                                        $('#' + chkid).val(d[1].trim());
                                    } else {
                                        $("#" + chkid.replace("$", "").trim().replace("$", "") + " option").each(function () {
                                            if ($(this).text().trim() == d[1].trim()) {
                                                $(this).attr('selected', 'selected');
                                                this.selected = true;
                                            }
                                        });
                                    }
                                }
                            } catch (err) {
                            }
                            try {
                                if (d[2] != "") {
                                    document.getElementById(d[0].replace("$", "")).title = d[2];
                                }
                                if (chkid.indexOf("txtdob") != -1) {
                                    caldob(chkid.replace("txtdob", ""), document.getElementById(chkid), "");
                                }
                                $('#changetype').val(1);
                                if (ispoponly == 0) {
                                    if (chkid.indexOf("txttm") == 0) {
                                    } else {
                                        document.getElementById(chkid).onchange();
                                        document.getElementById(chkid).onkeyup();
                                    }
                                }
                            } catch (err) {

                            }
                        }
                    }
                    stringmanipulations(data1, inputtype);
                }//==-1 for ~loop
                else {
                    var res = responseText.split("^^");
                    var grdid = res[0].replace("$", "");
                    var restext = res[1];
                    var tablist = document.getElementsByTagName("table");

                    var griddetails = "";
                    var tableid = "";
                    for (var k = 0; k < tablist.length; k++) {
                        var tabid = tablist[k].id;
                        if (tabid.indexOf("tab_dyna") != -1) {
                            var t = tablist[k].title.split("@@@");
                            var gridid = t[0];
                            if (gridid.trim() == grdid.trim()) {
                                tableid = tabid;
                                break;
                            }
                        }
                    }
                    $("#" + tableid).find("tr:gt(1)").remove();
                    var lprows = restext.split("~lprow~");
                    var curtab = tabid;
                    var gp = 0;
                    var currow = 1;
                    var isrowfilled = 0;
                    for (var lp = 0; lp < lprows.length; lp++) {
                        if (lprows[lp].trim() != "") {
                            gp++;
                        } else {
                            continue;
                        }
                        if (isrowfilled == 1) {
                            var b = addrowgridGrd(curtab);
                        } else
                        {
                            isrowfilled = 1;
                        }
                        var dt = lprows[lp].split("@@@");
                        for (var i = 1; i < dt.length; i++) {
                            var ispoponly = 0;
                            if (dt[i].indexOf(":POPONLY") != -1) {
                                var ch = dt[i].split(":POPONLY");
                                dt[i] = ch[0];
                                ispoponly = 1;
                            }
                            dt[i] = replacefunnew(dt[i]);
                            var d = dt[i].split(",!");
                            var fieldid = d[0].replace(/ /g, '_');
                            if (fieldid.trim().toLowerCase().replace("$", "").indexOf("txtdt") == 0)
                                fieldid = fieldid.toLowerCase().replace("txtdt", "txtdtgrd");

                            var oTable = document.getElementById(tableid);
                            var rownum = parseInt(currow) + (gp - 1);
                            var oCells = oTable.rows.item(rownum).cells;
                            var celLength = oCells.length;
                            var val = "";
                            for (var km = 2; km < celLength; km++) {
                                var tabrowid = oTable.rows[rownum].cells[km].childNodes[0].id;
                                if (fieldid.toString().toLowerCase().replace("$", "").indexOf("txtdt") == 0)
                                    tabrowid = tabrowid.replace(/\d+/g, '');
                                var titid = 0;
                                if (fieldid.indexOf("_id") != -1) {
                                    titid = 1;
                                    fieldid = fieldid.replace("_id", "");
                                }
                                //alert(fieldid + "///"+titid);   
                                //alert(tabrowid.trim().toLowerCase() +"=="+ fieldid.replace("$","").trim().toLowerCase()+"-----"+d[1]);
                                if (tabrowid.trim().toLowerCase() == fieldid.replace("$", "").trim().toLowerCase()) {
                                    if (fieldid.indexOf("searchid") != -1) {
                                        if (d.length == 2)
                                            oTable.rows[rownum].cells[km].childNodes[0].title = d[1];
                                        else
                                            oTable.rows[rownum].cells[km].childNodes[0].title = d[2];
                                    }
                                    if (titid == 1)
                                        oTable.rows[rownum].cells[km].childNodes[0].title = d[1];
                                    else
                                        oTable.rows[rownum].cells[km].childNodes[0].value = d[1];
                                    try {
                                        if (ispoponly == 0)
                                            oTable.rows[rownum].cells[km].childNodes[0].onkeyup();

                                    } catch (err) {
                                        alert(err);
                                    }
                                    try {
                                    } catch (err) {
                                    }
                                }
                            }
                        }
                    }

                }
            });
        }
    }
}
function changefunction(data, id1) {
//    
    if (data.trim() === "") {
        return false;
    }
    try {
        if (id1.id.indexOf("btn_") == 0) {
            var bubbleform = $('#' + id1.id).attr("bubbleform");
            if (bubbleform.trim() != "" && bubbleform.trim() != "0") {
                changefunctiongridbtn(id1.id, id1, '', '', id1, bubbleform, "form");
                return false;
            }
        }
    } catch (err) {
    }
//    alert("change");
//            getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" change function is called for form,id1 is "+id1.id);
    var id = id1.id;
    var isqryreplaced = 0;
    var onchangeflg = $('#hdnonchange').val();
    var changetype = $('#changetype').val();
    var mobilesubcopanyid = "";
    if (localStorage.companyid != "" && $('#disfrom').val() == "1") {
        mobilesubcopanyid = localStorage.companyid;
    }
    if (id.indexOf("_searchid") != -1 && changetype == 0) {
        getkeyward(id, id1.value);
//        $('#' + id).autocomplete("destroy");
        return false;
    }
    if (id.indexOf("_searchid") != -1) {
        if (id1.value.trim() != "") {
            if (id1.title == "") {
                id1.focus();
                id1.value = "";
                alert("Please Select the Search Properly for " + id1.id);
                return;
            } else if (id1.title == "NODATA") {
                id1.title = "";
            }
        }
    }
    $('#changetype').val(0);
    var fromdt = $('#txtFromDt').val();
    var todt = $('#txtToDt').val();
    try {
        if (localStorage.ndrill == "1")
        {
            if (fromdt === "") {
                fromdt = localStorage.mfdt;
            }
            if (todt === "") {
                todt = localStorage.mtdt;
            }
        }
    } catch (err) {
    }
    var inputtype = "";
    try {
        var inputtype = document.getElementById(id).tagName;
    } catch (err) {
    }
    var check = true;
    if (data.trim() != "" && data.indexOf("SH:QRY") == -1)
        check = true;
    else
        check = true;
    var data1 = data;
    if (check == true) {
        if (inputtype == "INPUT") {
            var val = document.getElementById(id).value;
            var idtitle = document.getElementById(id).title;
            var idvalue = document.getElementById(id).value;
        } else if (inputtype == "SELECT") {
            var val = document.getElementById(id).value;
            var idtitle = document.getElementById(id).value;
            var idvalue = $("#" + id + " option:selected").text();
        }
        var wfid = localStorage.currentformid;

        var whdata = data.split("ENDSH:ROW");
        for (var w = 0; w < whdata.length; w++) {
            var finalquery = "";
            data = whdata[w];
            if (data.indexOf("SH:QRY") == -1) {
                stringmanipulations(data);
                continue;
            }
            while (1) {
                if (data.indexOf("$fd") != -1) {
                    data = data.replace("$fd", fromdt);
                } else {
                    break;
                }
            }
            while (1) {
                if (data.indexOf("$td") != -1) {
                    data = data.replace("$td", todt);
                } else {
                    break;
                }
            }
            if (data.indexOf("ENDIF") != -1) {
                var dtl = data.trim().split("ENDIF");
                for (var j = 0; j < dtl.length; j++) {
                    var qrytemp = dtl[j];
                    qrytemp = qrytemp;
                    if (qrytemp.trim().replace("ENDSH:QRY", "").replace("ENDSH:ROW", "") == "")
                        continue;
                    if (qrytemp.indexOf("ELSE ") != -1) {
                        var chk = true;
                        var wholedata = qrytemp.replace("ELSE ", "");
                    } else {
                        var qrytempdtl = qrytemp.split("THEN ");
                        var condition = qrytempdtl[0];
                        condition = condition.replace("IF ", "").replace("ELSEIF", "").replace("ELSE", "");
                        condition = condition.trim().replace("ENDSH:ROW", "").replace("SH:ROW", "");
                        var chk = getFormulaValue(condition, "");
                        var wholedata = qrytempdtl[1];
                    }
                    if (chk) {
                        isqryreplaced = 1;
                        data = wholedata;
                        var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
                        var temp = temptdata.split("^");
                        try {
                            for (var t = 0; t < temp.length; t++) {
                                var temp1 = temp[t];
                                if (temp1.trim() == "")
                                    continue;
                                var tem = temp1.split("==");
                                if (onchangeflg == "1" && tem[0].indexOf("$PRIMKEY") != -1)
                                    finalquery = finalquery;
                                else
                                    finalquery = finalquery + " " + tem[0] + "==" + replaceWithHeadFields(tem[1]) + " ^ ";
                            }
                        } catch (err) {
                        }
                        break;
                    }
                }
            }
            else {
                isqryreplaced = 1;
                if (data.indexOf("LOOP:grd_") != -1) {
                    data = "SH:QRY " + loopgrid(data) + " ENDSH:QRY";
                    data = replaceWithHeadFields(data);
                }
                var temptdata = data.substring(data.indexOf("SH:QRY") + 6, data.indexOf("ENDSH:QRY"));
                var temp = temptdata.split("^");
                try {
                    for (var t = 0; t < temp.length; t++) {
                        var temp1 = temp[t];
                        if (temp1.trim() == "")
                            continue;
                        var tem = temp1.split("==");
                        if (onchangeflg == "1" && tem[0].indexOf("PRIMKEY") != -1)
                            finalquery = finalquery;
                        else
                            finalquery = finalquery + " " + tem[0] + "==" + replaceWithHeadFields(tem[1]) + " ^ ";
                    }
                } catch (err) {
                }
            }
            data = finalquery;
            data = data.replace(/`/g, "'");
            if (data.indexOf("SH:QRY") == -1) {
            }
            if (isqryreplaced == 0) {
                return false;
            }
            data = data.replace(/\+/g, 'plussymbol');
            data = replacefun(data);
            var showcompanynm = $("#subcompany").val();
            var viewfromdt = "", viewtodt = "";
            if (showcompanynm == "1") {
                viewfromdt = $('#txtdtFrom_Date').val();
                viewtodt = $('#txtdtTo_Date').val();
            } else {
                viewfromdt = $('#txtdtFromDate').val();
                viewtodt = $('#txtToDt').val();
                if (viewfromdt == undefined || viewfromdt == "") {
                    viewfromdt = $('#txtFromDt').val();
                }
                if (viewtodt == undefined || viewtodt == "") {
                    viewtodt = $('#txtToDt').val();
                }
            }
            var savetype = $('#txtSaveType').val();
            document.getElementById("mydiv1").style.display = 'block';
//                 var sessiondata= getsessionvalues();
//                $.post(localStorage.ipadrs + "/WebFormSave1?reqtype=populatefields1&wfid=" + wfid + "&id=" + id + "&value=" + val + "&idtitle=" + idtitle + "&idvalue=" + idvalue + "&showcompanynm=" + showcompanynm + "&viewfromdt=" + viewfromdt + "&viewtodt=" + viewtodt + "&savetype=" + savetype + mobile, {qrydata: data}, function (responseText) {
            $.post(localStorage.ipadrs + "/WebFormSave1?reqtype=populatefields1&wfid=" + wfid + "&id=" + id + "&value=" + val + "&idtitle=" + idtitle + "&idvalue=" + idvalue + "&showcompanynm=" + showcompanynm + "&viewfromdt=" + viewfromdt + "&viewtodt=" + viewtodt + "&subcompanyidvf=" + mobilesubcopanyid + "&savetype=" + savetype + mobile, {qrydata: data}, function (responseText) {

                if (responseText.indexOf("Exception") != -1) {
                    alert("Error in Population checking " + responseText);
                }
                if (responseText.indexOf("Error") != -1) {
                    alert(responseText);
                }
                document.getElementById("mydiv1").style.display = 'none';
                responseText = replacefunnew(responseText);
                while (1) {
                    if (responseText.indexOf("&amp;") != -1) {
                        responseText = responseText.replace("&amp;", "&");
                    } else {
                        break;
                    }
                }
                if (responseText.indexOf("~lprow~") == -1) {
                    if (data1.indexOf("SH:VALIDATION") != -1 && responseText.trim() == "") {
                        var valdata = data1.substring(data1.indexOf("SH:VALIDATION") + 13, data1.indexOf("ENDSH:VALIDATION"));
                        var shcalrows = valdata.split("^");
                        for (var shcal = 0; shcal < shcalrows.length; shcal++) {
                            if (shcalrows[shcal].indexOf("ENDIF") != -1) {
                                alert(shcalrows[shcal]);
                                stringmanipulations(shcalrows[shcal], "");
                            } else {
                                var lastdata = shcalrows[shcal].split("=");
                                if (lastdata[0].trim() == "EMPTYMSG") {
                                    alert(lastdata[1]);
                                } else {
                                    setValue(lastdata[0], lastdata[1].replace(/'/g, "").replace(/`/g, ""), "");
                                }
                            }
                        }
                    }
                    if (responseText != null) {

                        var dt = responseText.split("@@@");
                        for (var i = 1; i < dt.length; i++) {
                            var ispoponly = 0;
                            if (dt[i].indexOf(":POPONLY") != -1) {
                                var ch = dt[i].split(":POPONLY");
                                dt[i] = ch[0];
                                ispoponly = 1;
                            }
                            dt[i] = replacefunnew(dt[i]);
                            var d = dt[i].split(",!");
                            var chkid = "";
                            if (d[0].indexOf(".id") != -1 || d[0].indexOf(".value") != -1) {
                                var ch = d[0].split(".");
                                chkid = ch[0];
                            } else {
                                chkid = d[0];
                            }
                            while (1) {
                                if (chkid.indexOf("$") != -1) {
                                    chkid = chkid.replace("$", "");
                                } else {
                                    break;
                                }
                            }
                            if (chkid == "PRIMKEY") {
                                $('#txtprimKeyField').val(d[1]);
                                $('#search_qry').val(d[1]);
                                $('#changetype').val(1);
                                searchData();
                                return;
                            } else if (chkid.trim().indexOf("attach") == 0) {
                                $('#tabAttach1').find("tr:gt(0)").remove();
                                $('#tabAttach1').append(d[1]);
                                continue;
                            } else if (chkid.trim() == "MSG") {
                                alert(d[1])
                            }
                            else if (chkid.trim() == "MSGCLEAR") {
                                alert(d[1]);
                                return false;
                            }
                            else if (chkid.trim().indexOf("textbox") == 0) {
                                try {
                                    tinymce.get(chkid.trim()).setContent(d[1]);
                                } catch (err) {
                                }
                                continue;
                            } else if (chkid.trim().indexOf("IMG") == 0) {
                                imgid = d[1];
                                var str1 = imgid;
                                var str2 = ".png";
                                var n = str1.concat(str2);
                                var root = localStorage.server;
                                var path = root + "/MRPhotos/" + n;
                                $('#imagetd').find("img").attr("src", path);
                                continue;
                            }
                            var isheadfield = 0;
                            try {
                                var isheadfield = isHeadField(chkid)
                            } catch (err) {
                            }
                            try {
                                if (document.getElementById(chkid).tagName == "INPUT") {
                                    if (d.length == 3 && d[1].trim() == "") {
                                    } else {
                                        if (isheadfield != 0) {
                                            document.getElementById(d[0].replace("$", "")).value = d[1]
                                        } else {
                                            setValue(d[0], d[1], inputtype);
                                        }
                                    }
                                } else if (document.getElementById(chkid).tagName == "TEXTAREA") {
                                    document.getElementById(d[0].replace("$", "")).value = d[1];
                                }
                                else if (document.getElementById(chkid).tagName == "SELECT") {
                                    if (d[0].indexOf(".id") != -1) {
                                        $('#' + chkid).val(d[1].trim());
                                    } else {
                                        $("#" + chkid.replace("$", "").trim().replace("$", "") + " option").each(function () {
                                            if ($(this).text().trim() == d[1].trim()) {
                                                $(this).attr('selected', 'selected');
                                                this.selected = true;
                                            }
                                        });
                                    }
                                }
                            } catch (err) {
                                continue;
                            }
                            try {
                                if (d[2] != "") {
                                    if (isheadfield != 0) {
                                        document.getElementById(d[0].replace("$", "")).title = d[2];
                                    } else {
                                        setValue(d[0] + ".id", d[1], inputtype);
                                    }
                                }
                                if (chkid.indexOf("txtdob") != -1) {
                                    caldob(chkid.replace("txtdob", ""), document.getElementById(chkid), "");
                                }
                                $('#changetype').val(1);
                                if (ispoponly == 0) {
                                    if (chkid.indexOf("txttm") == 0) {
                                    } else {
                                        var textframeids = $('#addframeid').val();
                                        var chk = $('#txtSaveType').val();
                                        if (chk != 'new') {
                                            if (textframeids.indexOf(chkid) != -1) {
                                                alert("Looping with  " + chkid + " onchange function\nPlease check once");
                                                return;
                                            }
                                            else {
                                                textframeids = textframeids + "," + chkid;
                                            }
                                        }
                                        if (isheadfield != 0) {
                                            try {
                                                document.getElementById(chkid).onchange();
                                                document.getElementById(chkid).onkeydown();
                                            } catch (ec) {
                                            }
                                        } else {
                                            callgridchange(chkid);
                                            ;
                                        }
                                    }
                                }
                            } catch (err) {
                            }
                        }
                    }
                }//==-1 for ~loop
                else {
                    fillgrid(responseText);
                }
            });
        }
    }
    autoTextareaHeight();
//            getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" change function is completed for form,,id1 is "+id1.id);
}

function stringmanipulations(data, inputtype,charCode) {
    if(charCode == undefined){charCode = 1234}
    data = replaceFunction(data, "dollorsymbolKEYCODE", charCode);
    var wholedatawithshrow = data;
    var shrowdata = wholedatawithshrow.split("ENDSH:ROW");
    for (var shrow = 0; shrow < shrowdata.length; shrow++) {
        if (shrowdata[shrow].indexOf("SH:QRY") != -1)
            continue;
        var data = shrowdata[shrow];
        data = data.replace("ENDSH:ROW", "").replace("SH:ROW", "");
        if(data.indexOf("LOOP:grd_") !=-1){
                loopgrid(data);
                continue;
            }
        if (data.indexOf("ENDIF") != -1) {
            var endifdata = data.split("ENDIF");
            for (var eid = 0; eid < endifdata.length; eid++) {
                var ifdata = endifdata[eid];
                ifdata = ifdata.replace("ENDSH:ROW", "").replace("SH:ROW", "");
                if (ifdata.indexOf("ELSE ") != -1) {
                    formularesult = true;
                    var actualqry = ifdata.replace("ELSE", "");
                } else {
                    var qrytempdtl = ifdata.split("THEN ");
                    var condition = qrytempdtl[0];
                    condition = condition.replace("IF ", "").replace("ELSEIF ", "").replace("ELSE", "");
                    var formula = condition.trim();
                    var formularesult = getFormulaValueNew(formula, inputtype);
                    var actualqry = qrytempdtl[1];
                }
                if (formularesult) {
                    var shcaldata = actualqry;
                    var shcalrows = shcaldata.split("^");
                    for (var shcal = 0; shcal < shcalrows.length; shcal++) {
                        var lastdata = shcalrows[shcal].split("=");
                        
                        lastdata[0] = lastdata[0].trim();
                        if (lastdata[0] == "REPLACEMSG") {
                            var value = "";
                            for (var repl = 1; repl < lastdata.length; repl++) {
                                value = value + lastdata[repl] + "=";
                            }
                            value = value.substring(0, value.length - 1);
                        } else {
                            if (lastdata[1].toString().indexOf("grdsum") != -1) {
                                if(lastdata.length >2){
                                    var ind = shcalrows[shcal].indexOf("=");
                                    lastdata[1] = shcalrows[shcal].substring((ind+1),shcalrows[shcal].length)
                                }
                                var value = getFormulaValue(lastdata[1], inputtype);
                                if(inputtype == "grid"){
                            setValue(lastdata[0], value, inputtype);
                    }else{
                                $('#' + lastdata[0].replace("$", "")).val(value);
                            }
                                continue;
                            }
                            if (lastdata[1].toString().indexOf("grddisc") != -1) {
                                var chkid = lastdata[0].replace("$", "");
                                var ch = document.getElementById(chkid);
                                var tabid = $(ch).closest('table').attr('id');
                                $('#curtable').val(tabid);
                                var value = griddiscount(lastdata[0], lastdata[1]);
                                continue;
                            }
                            if (lastdata[0] != "MSG" && lastdata[0] != "READONLY" && lastdata[0] != "CLEARGRID" && lastdata[0] != "DISPLAY" && lastdata[0] != "KEYUP" && lastdata[0] != "INWORDS" && lastdata[0] != "FOCUS" && lastdata[0] != "STYLE" && lastdata[0] != "OPENFORM") {
                                var value = getFormulaValue(lastdata[1], inputtype);
                            }
                            else
                                var value = lastdata[1];
                            if (lastdata[0].trim() == "$txticount") {
                                alert(lastdata[0] + "---" + value);
                            }
                        }
                        setValue(lastdata[0], value, inputtype);
                    }
                    break;
                }

            }

        }
        else {
            var shcaldata = data;
            if (shcaldata.trim() == "")
                continue;
            var shcalrows = shcaldata.split("^");
            for (var shcal = 0; shcal < shcalrows.length; shcal++) {
                if (shcalrows[shcal].indexOf("=") != -1 && shcalrows[shcal].toString().trim() != "") {

                } else {
                    continue;
                }
                var lastdata = shcalrows[shcal].split("=");
                lastdata[0] = lastdata[0].trim();
                if (lastdata[0] == "REPLACEMSG") {
                      var value = "";
                     for (var repl = 1; repl < lastdata.length; repl++) {
                       value = value + lastdata[repl] + "=";
                       }
                        value = value.substring(0, value.length - 1);
                        } else {
                if (lastdata[1].toString().indexOf("grdsum") != -1) {
                                try{if(lastdata.length >2){
                                    var ind = shcalrows[shcal].indexOf("=");
                                    lastdata[1] = shcalrows[shcal].substring((ind+1),shcalrows[shcal].length)
                                }}catch(err){
                                //confirm(err)
                            }
                    var value = getFormulaValue(lastdata[1], inputtype);
                    if(inputtype == "grid"){
                            setValue(lastdata[0], value, inputtype);
                    }else{
                    $('#' + lastdata[0].replace("$", "")).val(value);
                }
                    //document.getElementById(lastdata[0].replace("$","")).onchange();
                    //document.getElementById(lastdata[0].replace("$","")).onkeyup();
                    continue;
                }
                if (lastdata[1].toString().indexOf("grddisc") != -1) {
                    var id1= lastdata[0];var id2 = lastdata[1];
                    if(inputtype == "grid"){
                            setValue(lastdata[0], value, inputtype);
                    }else{
//                        if(typingTimer2){
//    window.clearTimeout(typingTimer2);
//    typingTimer2 = null;
//    //confirm("In cler");
//}
  //confirm("before--"+lastdata[0]+"--"+lastdata[1]);
 // typingTimer2 = setTimeout(function(){griddiscount(id1, id2);}, 500);
  griddiscount(lastdata[0], lastdata[1])
                }
                    continue;
                }
                if (lastdata[0] != "MSG" && lastdata[0] != "READONLY" && lastdata[0] != "CLEARGRID" && lastdata[0] != "DISPLAY" && lastdata[0] != "KEYUP" && lastdata[0] != "INWORDS" && lastdata[0] != "FOCUS" && lastdata[0] != "STYLE" && lastdata[0]!= "OPENFORM")
                    var value = getFormulaValue(lastdata[1], inputtype);
                else
                    var value = lastdata[1];
                        }
                setValue(lastdata[0], value, inputtype);
            }

        }
    }
    return true;
}function stringmanipulationspop(data, inputtype) {

    var wholedatawithshrow = data;
    var shrowdata = wholedatawithshrow.split("ENDSH:ROW");
    for (var shrow = 0; shrow < shrowdata.length; shrow++) {
        if (shrowdata[shrow].indexOf("SH:QRY") != -1)
            continue;
        var data = shrowdata[shrow];
        data = data.replace("ENDSH:ROW", "").replace("SH:ROW", "");
        if (data.indexOf("ENDIF") != -1) {
            var endifdata = data.split("ENDIF");
            for (var eid = 0; eid < endifdata.length; eid++) {
                var ifdata = endifdata[eid];
                ifdata = ifdata.replace("ENDSH:ROW", "").replace("SH:ROW", "");
                if (ifdata.indexOf("ELSE ") != -1) {
                    formularesult = true;
                    var actualqry = ifdata.replace("ELSE", "");
                } else {
                    var qrytempdtl = ifdata.split("THEN ");
                    var condition = qrytempdtl[0];
                    condition = condition.replace("IF ", "").replace("ELSEIF ", "").replace("ELSE", "");
                    var formula = condition.trim();
                    var formularesult = getFormulaValue(formula, inputtype);
                    var actualqry = qrytempdtl[1];
                }
                if (formularesult) {
                    var shcaldata = actualqry;
                    var shcalrows = shcaldata.split("^");
                    for (var shcal = 0; shcal < shcalrows.length; shcal++) {
                        var lastdata = shcalrows[shcal].split("=");

                        lastdata[0] = lastdata[0].trim();
                        if (lastdata[1].toString().indexOf("grdsum") != -1) {
                            continue;
                        }
                        if (lastdata[0] != "MSG" && lastdata[0] != "READONLY" && lastdata[0] != "DISPLAY" && lastdata[0] != "INWORDS") {
                        }
                        else {
                            var value = lastdata[1];
                            setValue(lastdata[0], value, inputtype);
                        }
                    }
                    break;
                }

            }

        }
        else {
            var shcaldata = data;
            if (shcaldata.trim() == "")
                continue;
            var shcalrows = shcaldata.split("^");
            for (var shcal = 0; shcal < shcalrows.length; shcal++) {
                var lastdata = shcalrows[shcal].split("=");
                lastdata[0] = lastdata[0].trim();
                if (lastdata[1].toString().indexOf("grdsum") != -1) {
                    continue;
                }
                if (lastdata[0] != "MSG" && lastdata[0] != "READONLY" && lastdata[0] != "DISPLAY" && lastdata[0] != "INWORDS") {
                }
                else {
                    var value = lastdata[1];
                    setValue(lastdata[0], value, inputtype);
                }
            }

        }
    }
    return true;
}
function getFormulaValuerownum(formula, inptype, rowno) {

    var result = "";
    if (formula.trim() == "$serverDate") {
        return $('#currentdate').val()
    }
    formula = replaceFunction(formula, "dollorsymbolsavetype", $('#txtSaveType').val().trim().toUpperCase());
    if (formula.toString().indexOf(":") != -1) {
        if (formula.toString().indexOf("grd_") != -1) {
            var formularep = formula.replace(/\+/g, "~").replace(/\-/g, "~").replace(/\</g, "~").replace(/\>/g, "~").replace(/\-/g, "~").replace(/\(/g, "~").replace(/\)/g, "~").replace(/\&/g, "~").replace(/\|/g, "~").replace(/\=/g, "~");
            if (formularep.indexOf("~") != -1) {
                var formulasp = formularep.split("~");
                for (var jk = 0; jk < formulasp.length; jk++) {
                    if (formulasp[jk] == "")
                        continue;
                    if (formulasp[jk].indexOf("grd_") != -1) {
                        var res = getgridvalues(formulasp[jk]);
                    } else {
                        var res = getFormulaValueNew(formulasp[jk], "grid");
                    }
                    if (res == "") {
                        res = 0;
                    }
                    formula = formula.replace(formulasp[jk], res);
                }
                var finres = eval(formula);
                return finres;
            } else {
                return getgridvalues(formula);
            }
        }
    }
    try {
        var chkid = formula.replace("$", "").trim();
        if (chkid.indexOf(".") != -1)
            chkid = chkid.substr(0, chkid.indexOf("."))
        var chktype = $('#' + chkid).attr("controltype");
        if (chktype == "Date") {
            return $('#' + chkid).val();
        }
    } catch (err) {
    }

    try {
        for (var l = 0; l < formula.length; l++) {
            var g = formula.charAt(l);
            if (g.match("^[a-zA-Z]+$") || g == "$" || g == "`") {
                var k = g;
                while (1) {
                    l++;
                    var m = formula.charAt(l);
                    if (m == "_" || m == "." || m == "$") {
                        k = k + m;
                        continue;
                    }
                    if (m.match("^[a-zA-Z]+")) {
                        k = k + m;
                    } else {
                        if (k.indexOf("$") != -1) {
                            if (k != "$") {
                                var chkid = "";
                                var actid = "";
                                var ext = "";
                                if (k.indexOf(".") != -1) {
                                    var ch = k.split(".");
                                    chkid = ch[0];
                                    ext = ch[1];
                                    actid = ch[0];
                                } else {
                                    chkid = k;
                                    actid = k;
                                }
                                if (chkid.indexOf("$") != -1) {
                                    chkid = chkid.replace("$", "");
                                    chkid = chkid.replace("`", "");
                                    //confirm(chkid);
                                    if (inptype == "grid") {
                                        try {
                                            document.getElementById(chkid.replace("grdsum_", "")).tagName
                                        } catch (err) {
                                            chkid = chkid.replace("txtdt", "txtdtgrd");
                                            chkid = chkid.replace("txttm", "txttmgrd");
                                        }
                                    }
                                    if (chkid.trim() == "savetype") {
                                        chkid = chkid.replace("savetype", "txtSaveType");
                                    }
                                    var isradio = 0;
                                    try {
                                        document.getElementById(chkid.replace("grdsum_", "")).tagName
                                    } catch (err) {
                                        if (chkid.indexOf("sel" == 0)) {
                                            var jkl = getRadioValue(chkid, ext);
                                            //result = result + jk; 
                                            val = jkl;
                                            isradio = 1;
                                            // confirm("Here"+jk)
                                            // continue;
                                        }
                                    }
                                    if (isradio == 0) {
                                        if (document.getElementById(chkid.replace("grdsum_", "")).tagName == "INPUT") {
                                            if (inptype == "grid") {
                                                var tableid = $('#curtable').val();
                                                var rownum = $('#currow').val();
                                                rownum = rowno;
                                                var oTable = document.getElementById(tableid);
                                                try {
                                                    var oCells = oTable.rows.item(rownum).cells;
                                                } catch (err) {
                                                    return "";
                                                }
                                                var celLength = oCells.length;
                                                var val = "";
//                                                if(chkid.indexOf("txtdt") == 0){
//                                                    chkid = chkid.replace("txtdt","txtdtgrd");
//                                                }
                                                if (chkid.indexOf("grdsum") != -1) {
                                                    val = getGridTotal(chkid);
                                                } else {
                                                    var isexists = 0;
                                                    for (var km = 2; km < celLength; km++) {
                                                        if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
                                                            isexists = 1;
                                                            try {
                                                                if (ext == "id") {
                                                                    val = oTable.rows[rownum].cells[km].childNodes[0].title;
                                                                } else {
                                                                    val = oTable.rows[rownum].cells[km].childNodes[0].value;
                                                                }
                                                            } catch (err) {

                                                            }
                                                            if (chkid.indexOf("chkbox") != -1) {
                                                                if (oTable.rows[rownum].cells[km].childNodes[0].checked == true) {
                                                                    val = 1;
                                                                } else {
                                                                    val = 0;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (isexists == 0) {
                                                        if (ext == "id")
                                                            val = $('#' + chkid.trim()).prop("title");
                                                        else
                                                            val = $('#' + chkid.trim()).val();
                                                        if (chkid.indexOf("chkbox") != -1) {
                                                            if (document.getElementById(chkid.trim()).checked == true) {
                                                                val = 1;
                                                            } else {
                                                                val = 0;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                if (chkid.indexOf("grdsum") != -1) {
                                                    val = getGridTotal(chkid);
                                                } else {
                                                    if (ext == "id") {
                                                        val = $('#' + chkid).attr("title");
                                                    } else {
                                                        val = $('#' + chkid).val();
                                                    }
                                                    if (chkid.indexOf("chkbox") != -1) {
                                                        if (document.getElementById(chkid).checked == true)
                                                            val = 1;
                                                        else
                                                            val = 0;
                                                    }
                                                }
                                            }
                                        } else if (document.getElementById(chkid).tagName == "SELECT") {

                                            if (inptype == "grid") {
                                                var tableid = $('#curtable').val();
                                                var rownum = $('#currow').val();
                                                rownum = rowno;
                                                var oTable = document.getElementById(tableid);
                                                try {
                                                    var oCells = oTable.rows.item(rownum).cells;
                                                } catch (err) {
                                                    return "";
                                                }
                                                var celLength = oCells.length;
                                                var val = "";
                                                var isexists = 0;
                                                for (var km = 2; km < celLength; km++) {
                                                    if (oTable.rows[rownum].cells[km].childNodes[0].id == chkid) {
                                                        isexists = 1;
                                                        try {
                                                            if (ext == "id") {
                                                                val = oTable.rows[rownum].cells[km].childNodes[0].value;
                                                            } else {
                                                                var e = oTable.rows[rownum].cells[km].childNodes[0];
                                                                val = e.options[e.selectedIndex].text;
                                                            }
                                                        } catch (err) {
                                                            alert("getformulavalue--" + err);
                                                        }
                                                    }
                                                }
                                                if (isexists == 0) {
                                                    if (ext == "id") {
                                                        val = $('#' + chkid).val();
                                                    } else {
                                                        val = $("#" + chkid + " option:selected").text();
                                                    }
                                                }
                                            } else {
                                                if (ext == "id") {
                                                    val = $('#' + chkid).val();
                                                } else {
                                                    //actval = $('#'+fi[0]).attr("title");
                                                    val = $("#" + chkid + " option:selected").text();
                                                }
                                            }
                                        }
                                    }
                                } else
                                {
                                    val = chkid;
                                }
                                if (actid.indexOf("`") != -1) {
                                    val = "`" + val;
                                }
                            }
                        } else {
                            var val = k;
                        }
                        if (val == "")
                            val = 0;
                        var cher = isNaN(val);
                        if (cher == false)
                            val = val * 1;
                        result = result + val;
                        l--;
                        break;
                    }
                }
            }
            else {
                result = result + g;
            }
        }

        while (1) {
            if (result.indexOf("$") != -1) {
                result = result.replace("$", "");
            } else {
                break;
            }
        }
        result = result.replace(/`/g, "'");
        var formularesult = "";
        if (result.trim() != "") {
            try {
                if (result.toString().indexOf(":") != -1) {
                    var val1 = result.split(":");
                    var actval = val1[0];
                    var round = val1[1].replace("ROUND(", "").replace(")", "");
                    var actval = eval(actval);
                    if (!isNaN(actval)) {
                        result = parseFloat(actval).toFixed(round);
                    }
                    if (isNaN(actval)) {
                        if (result.toString().indexOf("ROUND") != -1) {
                            //alert("wrong formula-->"+result);
                            return "0";
                        }
                        if (result.toString().indexOf("POPONLY") != -1) {
                            //alert("wrong formula-->"+result);
                            return "0";
                        }
                    }
                    formularesult = result;
                }
                else {
                    formularesult = eval(result);
                }
            } catch (err) {
                if (result.indexOf("=") != -1) {
                    var result = result.replace("==", "=");
                    var res = result.split("=");
                    if (res[0].trim() == res[1].trim()) {
                        formularesult = true;
                    }
                } else {
                    formularesult = result;
                }
            }
        }
        else
            formularesult = "";
        return formularesult;
    } catch (err) {
        if (formula.replace("$", "").trim() == "serverDate") {
            return $('#currentdate').val();
        }
        alert(err + "--wrong formula-->" + formula);
    }
}
function changefunctiongrid(id, id1, gridtype, rowdata, thisid) {
//    alert("changefunctiongrid");
//            getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" change function is called for grid,id is "+id+" , and rownum is "+gridtype);
    if (thisid != undefined) {
        var isFirefox = typeof InstallTrigger !== 'undefined';
        if (isFirefox && $('#curkeycode').val() == 1) {
            return false;
        }
        if (thisid.id.indexOf("_searchid") != -1) {
            if (thisid.value.toString().replace("\n", "").trim() != "") {
                if (thisid.title == "") {
                    alert("Please select the Search Properly For " + thisid.id + "--->" + thisid.value.trim());
                    thisid.value = "";
                    thisid.focus();
                    return false;
                }
            }
            if (isFirefox && $('#changetype').val() == 0) {
                checknoduplicate(thisid.id, thisid.title, thisid.value, 2);
            }
        }
    }
    var val;
    var isqryreplaced = 0;
    try {
        if (document.getElementById(id).id.indexOf("_searchid") != -1) {
            val = document.getElementById(id).value;
        } else {
            val = document.getElementById(id).value;
        }
    } catch (err) {
    }
    $('#curtable').val(rowdata);
    var wfid = localStorage.currentformid;
    var changedata = "";
//             var sessiondata= getsessionvalues();
    $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=changeqry&wfid=" + wfid + "&id=" + id.replace("txtdtgrd", "txtdt") + "&value=" + val + "&currentrow=" + gridtype + "&value=" + val + mobile, function (responseText) {

        if (responseText.indexOf("^^!!^^") != -1) {
            var chres12 = responseText.split("^^!!^^");
            // $('#currow').val(chres12[1]);
            responseText = chres12[0];
        }
        document.getElementById("mydiv1").style.display = 'none';
        if (responseText.indexOf("Exception") != -1) {
            alert(responseText);
        }
        var whdata = responseText.split("ENDSH:ROW");
        for (var w = 0; w < whdata.length; w++) {
            changedata = whdata[w];
            if (changedata.indexOf("SH:QRY") == -1) {
                $('#currow').val(gridtype);
                stringmanipulations(changedata, "grid");
                continue;
            }
            if (changedata.trim() != "" && changedata.indexOf("SH:QRY") != -1) {
                if (changedata.indexOf("ENDIF") != -1) {
                    var dtl = changedata.trim().split("ENDIF");
                    for (var j = 0; j < dtl.length; j++) {
                        var qrytemp = dtl[j];
                        qrytemp = qrytemp;
                        if (qrytemp.trim().replace("ENDSH:QRY", "").replace("ENDSH:ROW", "") == "")
                            continue;
                        if (qrytemp.indexOf("ELSE ") != -1) {
                            var chk = true;
                            var wholedata = qrytemp.replace("ELSE ", "");
                        } else {
                            var qrytempdtl = qrytemp.split("THEN ");
                            var condition = qrytempdtl[0];
                            condition = condition.replace("IF ", "").replace("ELSEIF", "").replace("ELSE", "");
                            condition = condition.trim().replace("ENDSH:ROW", "").replace("SH:ROW", "");
                            var chk = getFormulaValuerownum(condition, "grid", chres12[1]);
                            var wholedata = qrytempdtl[1];
                        }
                        if (chk) {
                            isqryreplaced = 1;
                            changedata = replaceLabelvaluesgrid(wholedata.trim(), gridtype, rowdata);
                            changedata = replaceLabelvalues(changedata.trim());
                            break;
                        }
                    }
                } else {
                    isqryreplaced = 1;
                    changedata = replaceLabelvaluesgrid(changedata.trim(), gridtype, rowdata);
                    changedata = replaceLabelvalues(changedata.trim());
                }
                changedata = changedata.replace(/\+/g, 'plussymbol');
                changedata = replacefun(changedata);
                if (isqryreplaced == 0) {
                    continue;
                }
                var showcompanynm = $("#subcompany").val();
                var viewfromdt = "", viewtodt = "";
                if (showcompanynm == 1) {
                    viewfromdt = $('#txtdtFrom_Date').val();
                    viewtodt = $('#txtdtTo_Date').val();
                } else {
                    viewfromdt = $('#txtFromDt').val();
                    viewtodt = $('#txtToDt').val();
                }
                var savetype = $('#txtSaveType').val();
                var asy = true;
                var currentrow = 0;
                if (changedata.indexOf("SH:LOOPBATCH") != -1) {
                    currentrow = chres12[1];
                    asy = false
                }
                ;
                var mobilesubcopanyid = "";
                if (localStorage.companyid != "" && $('#disfrom').val() == "1") {
                    mobilesubcopanyid = localStorage.companyid;
                }
                document.getElementById("mydiv1").style.display = 'block';
//                    var urldata = "<%=request.getContextPath()%>/WebFormSave1?reqtype=populatefields1&wfid=" + wfid + "&id=" + id + "&value=" + val+"&idtitle= &idvalue= &showcompanynm="+showcompanynm+"&viewfromdt="+viewfromdt+"&viewtodt="+viewtodt+"&savetype="+savetype+"&currentrow="+currentrow+getsessionvalues();
                var urldata = "" + localStorage.ipadrs + "/WebFormSave1?reqtype=populatefields1&wfid=" + wfid + "&id=" + id + "&value=" + val + "&idtitle= &idvalue= &showcompanynm=" + showcompanynm + "&viewfromdt=" + viewfromdt + "&viewtodt=" + viewtodt + "&savetype=" + savetype + "&subcompanyidvf=" + mobilesubcopanyid + "&currentrow=" + currentrow + mobile;
                $.ajax({
                    url: urldata, type: "post",
                    data: {qrydata: changedata},
                    async: true,
                    success: function (responseText) {
                        ;
                        // confirm(responseText);
                        var isloopres = false;
                        if (responseText.indexOf("^^!!^^") != -1) {
                            var chres = responseText.split("^^!!^^");
                            responseText = chres[0];
                            isloopres = true;
                        }
                        if (responseText.indexOf("Exception") != -1 || responseText.indexOf("Error") == 0) {
                            alert(responseText);
                        }
                        document.getElementById("mydiv1").style.display = 'none';
                        if (responseText != null) {
                            if (responseText.indexOf("~lprow~") == -1 && responseText.indexOf("UserRowsQueryCols") == -1) {
                                var dt = responseText.split("@@@");
                                for (var i = 1; i < dt.length; i++) {
                                    var ispoponly = 0;
                                    if (dt[i].indexOf(":POPONLY") != -1) {
                                        var ch = dt[i].split(":POPONLY");
                                        dt[i] = ch[0];
                                        ispoponly = 1;
                                    }
                                    dt[i] = replacefunnew(dt[i]);
                                    var d = dt[i].split(",!");
                                    var fieldid = d[0].replace(/ /g, '_').replace("txtdtgrd", "txtdt");
                                    ;
                                    if (fieldid.trim().replace("$", "").indexOf("txtdt") == 0) {

                                        fieldid = fieldid.replace(/[0-9]/g, '');
                                        var ctype = $('#' + fieldid.trim().replace("$", "").replace("txtdt", "txtdtgrd")).attr("controltype");
                                        if (ctype == undefined) {
                                            var ctype = $('#' + fieldid.trim().replace("$", "").replace("txtdt", "txtdtgrd") + "2").attr("controltype");
                                            if (fieldid.trim().replace("$", "").indexOf("txtdt") == 0) {
                                                ctype = "Date"
                                            }
                                        }
                                        if (ctype == "Date") {
                                            fieldid = fieldid.replace("txtdt", "txtdtgrd");
                                        }
                                    }
                                    if (fieldid.trim().replace("$", "").indexOf("txttm") == 0) {
                                        fieldid = fieldid.replace(/[0-9]/g, '');
                                        var ctype = $('#' + fieldid.trim().replace("$", "").replace("txttm", "txttmgrd")).attr("controltype");
                                        if (ctype == undefined) {
                                            if (fieldid.trim().replace("$", "").indexOf("txttm") == 0) {
                                                ctype = "Time"
                                            }
                                        }
                                        if (ctype == "Time") {
                                            fieldid = fieldid.replace("txttm", "txttmgrd");
                                        }
                                    }
                                    var oTable = document.getElementById(rowdata);
                                    var oCells = oTable.rows.item(gridtype).cells;
                                    var celLength = oCells.length;
                                    var val = "";
                                    var isexists = 0;
                                    for (var km = 2; km < celLength; km++) {
                                        var tabrowid = oTable.rows[gridtype].cells[km].childNodes[0].id;
                                        if (fieldid.replace("$", "").indexOf("txtdt") == 0 || fieldid.replace("$", "").indexOf("txttm") == 0)
                                            tabrowid = tabrowid.replace(/\d+/g, '').replace(/[0-9]/g, '');
                                        if (tabrowid == fieldid.replace("$", "")) {
                                            isexists = 1;
                                            if (fieldid.indexOf("searchid") != -1) {
                                                oTable.rows[gridtype].cells[km].childNodes[0].title = d[2];
                                            } else if (fieldid.trim().replace("$", "").indexOf("chkbox") == 0) {
                                                if (d[1] == 1) {
                                                    oTable.rows[gridtype].cells[km].childNodes[0].checked = true;
                                                } else {
                                                    oTable.rows[gridtype].cells[km].childNodes[0].checked = false;
                                                }
                                            }
                                            oTable.rows[gridtype].cells[km].childNodes[0].value = d[1];
                                            try {
                                                if (ispoponly == 0 && oTable.rows[gridtype].cells[km].childNodes[0].id.indexOf("_searchid") == -1)
                                                    oTable.rows[gridtype].cells[km].childNodes[0].onkeyup();
                                            } catch (err) {
                                                alert(err + "--in KeyUp code of-" + tabrowid);
                                            }
                                            try {
                                                if (ispoponly == 0) {
                                                    var kid = oTable.rows[gridtype].cells[km].childNodes[0].id;
                                                    if (kid.indexOf("_searchid") == -1 && kid.indexOf("txttmgrd") == -1) {
                                                        oTable.rows[gridtype].cells[km].childNodes[0].onchange();
                                                    } else if (kid.indexOf("txttmgrd") == 0) {
                                                        oTable.rows[gridtype].cells[km].childNodes[0].id.onchange()
                                                    }
                                                    else {
                                                        checknoduplicate(oTable.rows[gridtype].cells[km].childNodes[0].id, oTable.rows[gridtype].cells[km].childNodes[0].title, oTable.rows[gridtype].cells[km].childNodes[0].value);
                                                    }
                                                }
                                            } catch (err) {
                                            }
                                        }
                                    }
                                    if (isexists == 0) {
                                        try {
                                            fieldid = fieldid.replace("txtdtgrd", "txtdt");
                                            document.getElementById(fieldid.replace("$", "")).value = d[1];
                                            if (fieldid.indexOf("searchid") != -1) {
                                                document.getElementById(fieldid.replace("$", "")).title = d[2];
                                            }
                                            document.getElementById(fieldid.replace("$", "")).onchange();
                                        } catch (err) {
                                        }
                                    }
                                }
                                if ($('#replacedata').val() != "") {
                                    if ($('#medreplace').is(":visible") == false && $('#isreplaceopen').val() != "1") {
                                        replacedata();
                                    }
                                } else if ($('#batchdata').val() != "" && $('#isreplaceopen').val() != "1" && isloopres == true) {
                                    batchdata();
                                }
                            }
                            else {
                                if (responseText.indexOf("$grd_") == -1) {
                                    var lprows = responseText.split("~lprow~");
                                    var curtab = $('#curtable').val();
                                    var gp = 0;
                                    try {
                                        var currow = chres[1];
                                    } catch (err) {
                                        var currow = $('#currow').val();
                                    }
                                    var isrowfilled = 0;
                                    var isfilled = 0;
                                    var isgrd = 0;
                                    for (var lp = 0; lp < lprows.length; lp++) {
                                        if (lprows[lp].trim() != "") {
                                            gp++;
                                        } else {
                                            continue;
                                        }
                                        if (isrowfilled == 1) {
                                            var b = addrowgridGrd(curtab);
                                            isfilled = 1;
                                            isgrd = 1;
                                        } else
                                        {
                                            isrowfilled = 1;
                                        }
                                        var dt = lprows[lp].split("@@@");
                                        for (var i = 1; i < dt.length; i++) {
                                            var ispoponly = 0;
                                            if (dt[i].indexOf(":POPONLY") != -1) {
                                                var ch = dt[i].split(":POPONLY");
                                                dt[i] = ch[0];
                                                ispoponly = 1;
                                            }
                                            dt[i] = replacefunnew(dt[i]);
                                            var d = dt[i].split(",!");
                                            var fieldid = d[0].replace(/ /g, '_');
                                            var oTable = document.getElementById(rowdata);
                                            var rownum = parseInt(currow) + (gp - 1);
                                            if (isfilled == 1) {
                                                rownum = oTable.rows.length - 1;
                                            }
                                            var oCells = oTable.rows.item(rownum).cells;
                                            var celLength = oCells.length;
                                            var val = "";
                                            for (var km = 2; km < celLength; km++) {
                                                var tabrowid = oTable.rows[rownum].cells[km].childNodes[0].id;
                                                var ctype = $('#' + oTable.rows[rownum].cells[km].childNodes[0].id).attr("controltype");
                                                if (ctype == "Date")
                                                    tabrowid = tabrowid.replace("txtdtgrd", "txtdt").replace(/\d+/g, '');
                                                if (tabrowid == fieldid.replace("$", "")) {
                                                    if (fieldid.indexOf("searchid") != -1) {
                                                        if (d.length == 2)
                                                            oTable.rows[rownum].cells[km].childNodes[0].title = d[1];
                                                        else
                                                            oTable.rows[rownum].cells[km].childNodes[0].title = d[2];
                                                        oTable.rows[rownum].cells[km].childNodes[0].focus();
                                                    }
                                                    oTable.rows[rownum].cells[km].childNodes[0].value = d[1];
                                                    try {
                                                        if (ispoponly == 0 && oTable.rows[gridtype].cells[km].childNodes[0].id.indexOf("_searchid") == -1) {
                                                            oTable.rows[rownum].cells[km].childNodes[0].onkeyup();
                                                        }
                                                        if (oTable.rows[gridtype].cells[km].childNodes[0].id.indexOf("searchid") != -1)
                                                            checknoduplicate(oTable.rows[gridtype].cells[km].childNodes[0].id, oTable.rows[gridtype].cells[km].childNodes[0].title, oTable.rows[gridtype].cells[km].childNodes[0].value, 1);
                                                    } catch (err) {
                                                        alert(err);
                                                    }
                                                    try {
                                                    } catch (err) {
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if ($('#replacedata').val() != "") {
                                        if ($('#medreplace').is(":visible") == false && $('#isreplaceopen').val() != "1") {
                                            replacedata()
                                        }
                                        ;
                                    } else if ($('#batchdata').val() != "" && $('#isreplaceopen').val() != "1" && isloopres == true) {
                                        batchdata();
                                    }
                                } else {
                                    fillgrid(responseText);
                                }
                            }
                        }
                    }
                });
            } else if (changedata.trim() != "") {
                stringmanipulations(changedata, "grid");
            }
        }
    });
//            var wfid = '<%=request.getAttribute("formid")%>';
//            getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" change function is complted for grid,id is "+id+" , and rownum is "+gridtype);
}

function getAutoComplete(id, id1) {
}
function getAutoCompleteGrid(rowData) {
}
function keyupfunction(id, id1, event) {
//     alert("HI");
//      $('#userwiselog').val($('#userwiselog').val() +"\n"+$('#currentdate').val()+ " "+gettime(new Date)+" Keyup function is called for form, with id "+id+" for event "+event);
    var formula1 = id;
    id = id1.id;
    var myTimeoutn = "";
//            if(id1.readOnly){
//                return false;
//            }
    if (id.toString().indexOf("_searchid") != -1) {
        try {
            $('#changetype').val("0");
            if (window.event) {
                var charCode = window.event.keyCode;
            }
            else if (event) {
                var charCode = event.which;
            }
            if (charCode == 8) {
                id1.title = "";
                var i = 0;
                while (1) {
                    i++;
                    try {

                        var rowid = "tr" + replaceString(id) + "_searchidmulsel" + i;
                        document.getElementById(rowid).id;
                        $('#' + rowid).remove();
                    } catch (err) {
                        break;
                    }
                }
            } else if (charCode == 13) {
                //$('#'+id).unautocomplete();
//                $('#' + id).autocomplete("destroy");
                if (id == $('#previousid').val() && id1.value != $('#previousval').val()) {
                    getkeyward(id, id1.value);
                } else {
                }
                ;
            }
        } catch (err) {

        }
        getAutoComplete(id, id1);
        return false;
    }
    var inputtype = document.getElementById(id).tagName;
    var valchk = document.getElementById(id).value;
    if (valchk.trim() == "") {
        try {
            document.getElementById(id).title = "";
        } catch (err) {

        }
    }
    if (formula1.trim() != "") {
        try {
            if (event != undefined) {
//     getlogdata("####From,!KeyUp,!"+id+",!"+$('#'+id).val()+",!KeyUp,!");
// getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" User enter value is "+$('#'+id).val()+"for Keyup function in form, with id "+id);
            }
            else {
//         getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" Keyup function is called for form, with id "+id);  
            }
        } catch (e) {
        }

        myTimeoutn = setTimeout(function () {
            var inputtype = document.getElementById(id).tagName;
            stringmanipulations(formula1, inputtype, charCode);
        }, 500);
    }
    return false;
    if (formula1 != "") {

        // alert(pfesi);
        var formulaall = formula1.split("$$");
        for (var kl = 0; kl < formulaall.length; kl++) {
            var result = "";
            var formula = formulaall[kl];
            var form = formula.split("=");
            var key = form[0];
            formula = form[1];
            for (var l = 0; l < formula.length; l++) {
                var g = formula.charAt(l);
                //alert(g);
                if (g.match("^[a-zA-Z]+$")) {
                    var k = g;
                    while (1) {
                        l++;
                        var m = formula.charAt(l);
                        if (m == "_") {
                            k = k + m;
                            continue;
                        }
                        if (m.match("^[a-zA-Z]+")) {
                            k = k + m;
                        } else {
                            if (k.indexOf("$")) {
                                var val = $('#' + k.replace("$", "")).val();
                            } else {
                                var val = k;
                            }
                            if (val == "")
                                val = 0;
                            result = result + val;
                            l--;
                            break;
                        }
                    }
                }
                else {
                    result = result + g;
                }
            }
            result = result.replace("$", "");
            var formularesult = parseFloat(eval(result)).toFixed(2);
            $('#' + key.replace("$", "")).val(formularesult);
        }
    }
    clearTimeout(myTimeoutn);
}
function clickfunction(id) {
}
function getTableid(parent) {
    while (parent) { //Loop through until you find the desired parent tag name
        if (parent.tagName && parent.tagName.toLowerCase() == 'table') {
            return parent.id;
        }
        else
        {
            parent = parent.parentNode;
        }

    }
}
function focuschange(code, thisid) {

    var j = thisid.parentNode.parentNode.rowIndex;
    var colid = thisid.id;
    var tabid = $(thisid).parents('table').attr("id");
    ///left: 
    if (code == 37) {
        var oTable = document.getElementById(tabid);
        //var oCells = oTable.rows.item(rownum).cells;
        try {
            var rownum = j;
            var oCells = oTable.rows.item(rownum).cells;
        } catch (err) {
            return "";
        }
        var celLength = oCells.length;
        var val = "";
        var chkid = colid;
        for (var km = 2; km < celLength; km++) {
            if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                try {
                    if (oTable.rows[rownum].cells[km - 1].childNodes[0].readOnly || oTable.rows[rownum].cells[km - 1].childNodes[0].style.display == "none" || oTable.rows[rownum].cells[km - 1].childNodes[0].tagName == "SELECT") {
                        while (1) {
                            km--;
                            if (km < 0) {
                                break;
                            }
                            if (oTable.rows[rownum].cells[km - 1].childNodes[0].readOnly || oTable.rows[rownum].cells[km - 1].childNodes[0].style.display == "none" || oTable.rows[rownum].cells[km - 1].childNodes[0].tagName == "SELECT") {

                            } else {
                                oTable.rows[rownum].cells[km - 1].childNodes[0].focus();
                                break;
                            }
                        }
                    } else {
                        oTable.rows[rownum].cells[km - 1].childNodes[0].focus();
                    }
                    break;
                } catch (err) {

                }
            }
        }
    }
    //right: 
    else if (code == 39) {
        var oTable = document.getElementById(tabid);
        //var oCells = oTable.rows.item(rownum).cells;
        try {
            var rownum = j;
            var oCells = oTable.rows.item(rownum).cells;
        } catch (err) {
            return "";
        }
        var celLength = oCells.length;
        var val = "";
        var chkid = colid;
        for (var km = 2; km < celLength; km++) {
            if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                try {
                    if (oTable.rows[rownum].cells[km + 1].childNodes[0].readOnly || oTable.rows[rownum].cells[km + 1].childNodes[0].style.display == "none" || oTable.rows[rownum].cells[km + 1].childNodes[0].tagName == "SELECT") {
                        while (1) {
                            km++;
                            if (km > celLength - 1) {
                                break;
                            }
                            if (oTable.rows[rownum].cells[km + 1].childNodes[0].readOnly || oTable.rows[rownum].cells[km + 1].childNodes[0].style.display == "none" || oTable.rows[rownum].cells[km + 1].childNodes[0].tagName == "SELECT") {

                            } else {
                                oTable.rows[rownum].cells[km + 1].childNodes[0].focus();
                                break;
                            }
                        }
                    } else {
                        oTable.rows[rownum].cells[km + 1].childNodes[0].focus();
                    }
                    break;
                } catch (err) {

                }
            }
        }
    }
    //up: 
    else if (code == 38) {
        var oTable = document.getElementById(tabid);
        //var oCells = oTable.rows.item(rownum).cells;
        try {
            var rownum = j - 1;
            var oCells = oTable.rows.item(rownum).cells;
        } catch (err) {
            return "";
        }
        var celLength = oCells.length;
        var val = "";
        var chkid = colid;
        for (var km = 2; km < celLength; km++) {
            if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                try {
                    oTable.rows[rownum].cells[km].childNodes[0].focus();
                    break;
                } catch (err) {

                }
            }
        }
    }

    //down: 
    else if (code == 40) {
        var oTable = document.getElementById(tabid);
        //var oCells = oTable.rows.item(rownum).cells;
        try {
            var rownum = j + 1;
            var oCells = oTable.rows.item(rownum).cells;
        } catch (err) {
            return "";
        }
        var celLength = oCells.length;
        var val = "";
        var chkid = colid;
        for (var km = 2; km < celLength; km++) {
            if (oTable.rows[rownum].cells[km].childNodes[0].id.replace(/[0-9]/g, '') == chkid) {
                try {
                    oTable.rows[rownum].cells[km].childNodes[0].focus();
                    break;
                } catch (err) {

                }
            }
        }
    }
}
var typingTimer1;
function keyupfunctiongrid(id, gridtype, rowdata, event) {

    var formula1 = id;
//            if(rowdata.readOnly)
//                return false;
    if (window.event) {
        var charCode = window.event.keyCode;
    }
    else if (event) {
        var charCode = event.which;
    }
    if (rowdata.id == "txtpkgflg") {

    }
    if (charCode == 8) {
        $('#batchprevious').val("");
    }
    if (charCode == 37 || charCode == 38 || charCode == 39 || charCode == 40) {
        // confirm(rowdata.id+"--"+charCode);
        if ((charCode == 40 || charCode == 38) && rowdata.id.indexOf("_searchid") != -1) {
            var len = $('.ui-autocomplete > li').length;
            if (len == 0) {
                focuschange(charCode, rowdata);
            } else {
                return false;
            }
        } else {
            if (charCode == 39 || charCode == 37) {
                if (rowdata.value.trim() == "") {
                    focuschange(charCode, rowdata);
                }
            } else {
                focuschange(charCode, rowdata);
            }
        }
        return false;
    }
    if (rowdata.id.indexOf("_searchid") != -1) {

        try {
            var j = rowdata.parentNode.parentNode.rowIndex;
            var tableid = getTableid(rowdata);
            $('#curtable').val(tableid);
            $('#currow').val(j);
            if (window.event) {
                var charCode = window.event.keyCode;
            }
            else if (event) {
                var charCode = event.which;
            }
            //confirm(charCode+"--"+rowdata.id);
            //$(rowdata).keydown();
            if (charCode == 8) {
                rowdata.title = "";
                // $(rowdata).keydown();
            }
            if ((charCode == 40 || charCode == 38) && rowdata.id.indexOf("_searchid") != -1) {
                // confirm(charCode);
                return false;
            }
//            if(charCode == 13 && rowdata.value == "" && !event.ctrlKey &&  !event.metaKey){
//                document.getElementById("img"+rowdata.id).onclick();
//                var j = rowdata.parentNode.parentNode.rowIndex;
//        var tableid = getTableid(rowdata);
////              $('#'+tableid).fin;
////              $('#'+tableid+' tr#myid').find('input:first').focus();
////              $('#' + tabid + " tr:eq('" + i + "')")
//            }
            if (rowdata.value == " " && charCode == 13)
                rowdata.value = "";
            if (charCode == 13) {
                //confirm("in enter key");
                return false;
            }
        } catch (err) {

        }
        if (rowdata.value.trim() != "") {
            //$(rowdata).keydown();
            // getAutoCompleteGrid(rowdata);
            var autoid = $('#hdnautocompid').val();
            var autoqry = $('#hdnautocomp').val();
            if (autoid == rowdata.id) {
                //confirm(autoid +"--"+rowdata.id);
                if (charCode == 112 || charCode == 113 || charCode == 114 || charCode == 115) {
                } else {
                    //autocompletegrid(rowdata);
                    //$(rowdata).keydown();              
                    var doneTypingInterval = 3000;
                    //clearTimeout(typingTimer1);
                    if (typingTimer1) {
                        window.clearTimeout(typingTimer1);
                        typingTimer1 = null;
                        //confirm("In cler");
                    }
                    typingTimer1 = setTimeout(function () {
                        autocompletegrid(rowdata);
                    }, 500);
                    //$(rowdata).keydown();
//on keydown, clear the countdown 
                    $(rowdata).on('keydown', function () {
                        if (typingTimer1) {
                            clearTimeout(typingTimer1);
                            typingTimer1 = null;
                            // confirm("In cler doown");
                        }
                    });
                    return false;
                }
            }
            if (charCode == 112 || charCode == 113 || charCode == 114 || charCode == 115) {
            } else {
                // if(rowdata.value != ""){
//           getAutoCompleteGrid(rowdata);
//          var typingTimer,typingTimer1;                
//var doneTypingInterval = 1500; 
//  clearTimeout(typingTimer);
//  typingTimer = setTimeout(getAutoCompleteGrid(rowdata), doneTypingInterval);
// // $(rowdata).keydown();
////on keydown, clear the countdown 
//$(rowdata).on('keydown', function () {
//  clearTimeout(typingTimer);
//});
                // $(rowdata).keydown();
            }
        } else {
            clearTimeout(typingTimer1);
        }
        if (charCode == 112 || charCode == 113 || charCode == 114 || charCode == 115) {
        } else {
            return false;
        }
    }

    $('#curcolid').val(rowdata.id);
    $('#curcolval').val(rowdata.value);
    if (formula1 != "") {
        try {
            if (event != undefined) {
//     getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" User "+$('#formusernm').val()+" Enter the value "+$('#'+rowdata.id).val()+" in keyup for grid,id is "+rowdata.id+" for rownum "+rowdata.parentNode.parentNode.rowIndex);
//     getlogdata("####"+getTableid(rowdata)+",!KeyUp,!"+rowdata.id+",!"+$('#'+rowdata.id).val()+",!KeyUp,!"+rowdata.parentNode.parentNode.rowIndex);
            } else {
//       getlogdata($('#currentdate').val()+ " "+gettime(new Date)+" Keyup function is called for grid,id is "+rowdata.id+" for rownum "+rowdata.parentNode.parentNode.rowIndex); 
            }
        } catch (e) {
        }
        // alert(pfesi);
        var j = rowdata.parentNode.parentNode.rowIndex;
        var tableid = getTableid(rowdata);
        $('#curtable').val(tableid);
        $('#currow').val(j);
        if (formula1.indexOf("REPLACEMSG") != -1) {
            $('#reprowid').val(rowdata.id)
        }
        stringmanipulations(formula1, "grid", charCode);
        return;
        //$('#curcol').val();
        var oTable = document.getElementById(tableid);
        var formulaall = formula1.split("$$");
        for (var kl = 0; kl < formulaall.length; kl++) {
            var result = "";
            var formula = formulaall[kl];
            var form = formula.split("=");
            var key = form[0];
            formula = form[1];
            for (var l = 0; l < formula.length; l++) {
                var g = formula.charAt(l);
                //alert(g);
                if (g.match("^[a-zA-Z]+$")) {
                    var k = g;
                    while (1) {
                        l++;
                        var m = formula.charAt(l);
                        if (m == "_") {
                            k = k + m;
                            continue;
                        }
                        if (m.match("^[a-zA-Z]+$")) {
                            k = k + m;
                        } else {
                            var oCells = oTable.rows.item(j).cells;
                            var celLength = oCells.length;
                            var val = "";
                            for (var km = 2; km < celLength; km++) {
                                if (oTable.rows[j].cells[km].childNodes[0].id == k) {
                                    val = oTable.rows[j].cells[km].childNodes[0].value;
                                }
                            }
                            // var val = $('#' + k).val();
                            if (val == "")
                                val = 0;
                            result = result + val;
                            l--;
                            break;
                        }
                    }
                }
                else {
                    result = result + g;
                }
            }
            var formularesult = parseFloat(eval(result)).toFixed(2);
            var celLength = oCells.length;
            var val = "";
            for (k = 2; k < celLength; k++) {
                if (oTable.rows[j].cells[k].childNodes[0].id.trim() == key.trim()) {
                    oTable.rows[j].cells[k].childNodes[0].value = formularesult;
                }
            }
        }
    }
}
//function keyupfunctiongrid(id, gridtype, rowdata, event) {
//
//    var formula1 = id;
//    if (rowdata.id.indexOf("_searchid") != -1) {
//        try {
//            if (window.event) {
//                var charCode = window.event.keyCode;
//            }
//            else if (event) {
//                var charCode = event.which;
//            }
//            if (charCode == 8) {
//                rowdata.title = "";
//            }
//        } catch (err) {
//
//        }
//        getAutoCompleteGrid(rowdata);
//        return false;
//    }
//    $('#curcolid').val(rowdata.id);
//    $('#curcolval').val(rowdata.value);
//    if (formula1 != "") {
//
//        // alert(pfesi);
//        var j = rowdata.parentNode.parentNode.rowIndex;
//        var tableid = getTableid(rowdata);
//        $('#curtable').val(tableid);
//        $('#currow').val(j);
//        stringmanipulations(formula1, "grid");
//        return;
//        //$('#curcol').val();
//        var oTable = document.getElementById(tableid);
//        var formulaall = formula1.split("$$");
//        for (var kl = 0; kl < formulaall.length; kl++) {
//            var result = "";
//            var formula = formulaall[kl];
//            var form = formula.split("=");
//            var key = form[0];
//            formula = form[1];
//            for (var l = 0; l < formula.length; l++) {
//                var g = formula.charAt(l);
//                //alert(g);
//                if (g.match("^[a-zA-Z]+$")) {
//                    var k = g;
//                    while (1) {
//                        l++;
//                        var m = formula.charAt(l);
//                        if (m == "_") {
//                            k = k + m;
//                            continue;
//                        }
//                        if (m.match("^[a-zA-Z]+$")) {
//                            k = k + m;
//                        } else {
//                            var oCells = oTable.rows.item(j).cells;
//                            var celLength = oCells.length;
//                            var val = "";
//                            for (var km = 2; km < celLength; km++) {
//                                if (oTable.rows[j].cells[km].childNodes[0].id == k) {
//                                    val = oTable.rows[j].cells[km].childNodes[0].value;
//                                }
//                            }
//                            // var val = $('#' + k).val();
//                            if (val == "")
//                                val = 0;
//                            result = result + val;
//                            l--;
//                            break;
//                        }
//                    }
//                }
//                else {
//                    result = result + g;
//                }
//            }
//            var formularesult = parseFloat(eval(result)).toFixed(2);
//            var celLength = oCells.length;
//            var val = "";
//            for (k = 2; k < celLength; k++) {
//                if (oTable.rows[j].cells[k].childNodes[0].id.trim() == key.trim()) {
//                    oTable.rows[j].cells[k].childNodes[0].value = formularesult;
//                }
//            }
//        }
//    }
//}
function caldobtab(th) {
    // th.focus();
    if (th.value.length == 10)
        th.onchange();
    // $(th).closest("tr").next().find("input").focus();
}
function dobcheck(th, event) {
    if (window.event) {
        var charCode = window.event.keyCode;
    }
    else if (event) {
        var charCode = event.which;
    }
    if (charCode == 8 || charCode == 13 || charCode == 0)
        return true;
    if ((th.value.length == 2) || (th.value.length == 5)) {
        if (charCode != 191)
            th.value += "/";
        return true;
    }
    if (th.value.length == 10) {
        // alert("Format should be dd/mm/yyyy");
        return false;
    }
}
function dobcheckstructure(th) {
    var val = th.value;
    var slashcount = th.value.match(/\//g).length;
    if (val.length != 10 || slashcount != 2) {
        confirm("Date format Shoud be dd/mm/yyyy eg: 01/01/2016");
        th.value = "";
    }
}
function caldob(id) {
    var val = document.getElementById("txtdob" + id).value;
    $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=dobcal&dob=" + val + mobile, function (responseText) {

        if (responseText.indexOf("Exception") != -1) {
            alert(responseText);
        }
        var dt = responseText.split("@@@");
        document.getElementById("txtDays" + id).value = dt[2];
        document.getElementById("txtMonths" + id).value = dt[1];
        document.getElementById("txtYears" + id).value = dt[0];
    })
}
function caldob(id, th, data) {
    var val = document.getElementById("txtdob" + id).value;
    try {
        var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(val);
        if (matches == null)
            return false;
        var m = matches[2];
        var d = matches[1];
        var y = matches[3];
        if (d > 31 || m > 12 || y.length < 4) {
            alert("Not a valid Date");
            return false;
        }
    } catch (err) {
        alert("Not a valid Date");
        return false;
    }
    $.get(localStorage.ipadrs + "/WebFormSave1?reqtype=dobcal&dob=" + val + mobile, function (responseText) {

        if (responseText.indexOf("Exception") != -1) {
            alert(responseText);
        }
        var dt = responseText.split("@@@");
        document.getElementById("txtDays" + id).value = dt[2];
        document.getElementById("txtMonths" + id).value = dt[1];
        document.getElementById("txtYears" + id).value = dt[0];
        $('#changetype').val(1);
        changefunction(data, th);
    })
}
function cal(id) {

    var years = document.getElementById("txtYears" + id).value;
    var months = document.getElementById("txtMonths" + id).value;
    var days = document.getElementById("txtDays" + id).value;
    if (years == "") {
        years = "0";
        document.getElementById("txtYears" + id).value = "0";
    }
    else if (parseInt(years) > 150) {
        alert("Can't be Greater  150 days");
        years = "0";
        document.getElementById("txtYears" + id).value = "0";
    }
    if (months == "") {
        months = "0";
        document.getElementById("txtMonths" + id).value = "0";
    }
    else if (parseFloat(months) > 12) {
        alert("Can't be Greater than 12 Months");
        months = "0";
        document.getElementById("txtMonths" + id).value = "0";
    }
    if (days == "") {
        days = "0";
        document.getElementById("txtDays" + id).value = "0";
    }
    else if (days > 31) {
        alert("Can't be Greater than 31 days");
        days = "1";
        document.getElementById("txtDays" + id).value = "1";
    }
    if ((years == "0") && (months == "0") && (days == "0")) {
        days = "1";
        document.getElementById("txtDays" + id).value = "1";
        document.getElementById("txtdob" + id).value = '<%= date10%>';
    }
    var serverdate = $('#mblserverdatediff').val();
    var currentDate = new Date(serverdate + "T00:00:00");
    //var currentDate = 
    currentDate.addYears(-years);
    currentDate.addMonths(-months);
    currentDate.addDays((-days) + 1);

    document.getElementById("txtdob" + id).value = currentDate.toString('dd/MM/yyyy');
    //alert("here");
    document.getElementById("txtdob" + id).onchange();
}
function replacefun1(field)
{
    field = field.replace(/andsymbol/g, "&");
    field = field.replace(/persymbol/g, "%");
    field = field.replace(/plussymbol/, "+");
    return field;

}
function replacefun(field)
{
    field = field.replace(/&/g, "andsymbol");
    field = field.replace(/%/g, "persymbol");
    field = field.replace(/\+/g, 'plussymbol');
    return field;

}



function SavePhoto() {
    var imgcap = $('#hdnimgcap').val();
    if (imgcap == 1) {
        //document.getElementById("imagetd").style.display = "block";
    } else {
        return false;
    }
    var imgid = $('#imgid').val();
    myImage = $('#imagetd').find("img").attr("src");
    myImage = document.getElementById('imgsrc').value;
    if (imgid === "") {
        imgid = document.getElementById("txtMRNO").value;
    }
    var type1 = "Save";
    var headp = "";
    headp = headp + "&myImage=" + myImage;
    headp = headp + "&mrnum=" + imgid;
    headp = headp + "&type1=" + type1;
    if (imgid !== "") {
        var url = localStorage.ipadrs + "/SavePhoto2";
        var request = new XMLHttpRequest();
        var data = "table=" + headp;
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(data);
    }
}


function Capture() {
    save();

    jQuery("#flash").css("display", "block");
    jQuery("#flash").fadeOut(100, function () {
        jQuery("#flash").css("opacity", 1);
    });
}


function stop() {
    var path = localStorage.ipaddres + '/OP/Images/FemalePhoto.gif';
    img = "<img class='img1' src='" + path + "'>";
    var img1 = document.createElement("IMG");
    document.getElementsByTagName("img")[0].src = path;
}


//$(function () {
//    // alert($('#booth'));
//    $('#booth').photobooth({
//        width: 120,
//        height: 100,
//        imgPlaceholder: localStorage.ipadrs + '/OP/Images/FemalePhoto.gif'
//    },
//    function (control) {
//        var capturing = false;
//        $('#btn-go').click(function () {
//            if (capturing) {
//
//                control.snapshot();
//            } else {
//                control.start();
//            }
//            capturing = !capturing;
//            $('#booth').animate({'height': '100', 'width': '120'}, 900);
//            $('img').animate({'height': '100', 'width': '120'}, 900);
//        });
//       
//    },
//            function () {
//
//            });
//});
function timechange(th) {
    var id = th.id;
    $('#' + id).val($('#' + id).attr('value'));
}


var focusid, colid;
$(window).bind('click', function (event) {
    $(":input").focus(function () {
        focusid = $(this).parents('table').attr("id");
        colid = $(this).attr("id");
        // alert(focusid);
    });
});
$(window).bind('keydown', function (event) {
    if (event.ctrlKey || event.metaKey) {
        if (event.keyCode == 13) {
            addrowgrid1(focusid, colid);
        }
    }
});
$(window).bind('keydown', function (event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
            case 's':
                event.preventDefault();
                var divcheck = document.getElementById("btnsave").style.display;
                var btncheck = $('#btnsave').prop('disabled');
                if (divcheck.toString() != 'none' && btncheck != true) {
                    saveData();
                    // alert("in save");
                }
                else {
                    //alert("no access");  
                    if (divcheck != 'none') {
                        if ($('#txtSaveType').val().trim() == 'new' && btncheck == true)
                            alert("Save Already In Process");
                    } else if (divcheck == 'none') {
                        alert("No Access to save");
                    }
                }
                break;
            case 'p':
                event.preventDefault();
                print();
                print1();
                break;
            case 'q':
                event.preventDefault();
                cancelData();
                break;
        }
    }
});
function runMyFunction() {

    return true;

}
function loadpage(pageid) {

    pageid = pageid.split("?");
    var webformid = getParameterName(pageid[1], 'webformid');
    var formtype = getParameterName(pageid[1], 'frmtype');
    localStorage.webformid = webformid;
    var formnm = 'dispatientmenu.jsp';
    var div = document.getElementById('divFrame');
    var mrno = localStorage.mrno;
    var mapopdocid = localStorage.opdocid;
    var locid = localStorage.locid;
    var speid = localStorage.speid;
    var theme = '';
    if (formtype != '9') {
//        if (path.indexOf("?") == -1) {
        path = 'disform.html?fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&locid=' + locid + '&docid=' + mapopdocid + '&speid=' + speid;
//        } else {
//            path = 'disform.html?fromdis=1&theme=' + encodeURIComponent(theme) + '&mrno=' + mrno + '&speid=' + speid + '&docid=' + mapopdocid;
//        }
    } else {
        path = 'appoitments.html?webid=' + webformid + '&mrno=' + mrno + '&locid=' + locid + '&theme=' + encodeURIComponent(theme) + '&docid=' + mapopdocid + '&speid=' + speid;
    }
    localStorage.path = path;
    location.href = path;


//    if (dis === -1) {
//        $.get(path1,function(res){
//            if(res!="" && res!=null){
//        if(res==="1"){
//             //localStorage.formid = getParameterName(pageid[1], 'webformid');
//        location.href='form.html';
//    }
//    else{
//        location.href = 'grids.html';
//    }
//    }
//    else{
//        location.href = 'grids.html';
//    }
//    });
//        
//    } else {
//
//        var userid = localStorage.userid;
//        var path = localStorage.ipadrs + "/disfirstscreen?userid=" + userid;
//        $.ajax({
//            url: path,
//            type: "GET",
//            dataType: "json",
//            success: function (responseJson) {
//                if(responseJson.length>0){
//                    localStorage.docid = responseJson[0]['DOCID'];
//                    localStorage.docnm = responseJson[0]['DOCNM'];
//                    localStorage.speid = responseJson[0]['SPEID'];
//                    localStorage.menuform = localStorage.formid;
//                    location.href = 'disfirstscreen.html';
//                }else{
//                    alert('Please assign Doctor to user!');
//                    return;
//                }
//            },
//            error: function (error) {
//                 if(error.statusText==="OK"){
//                    alert(error.responseText);
//                }else{
//                    location.href = '404.html'
//                }
//            }
//        });
//        $.get(path + "/disfirstscreen?userid=" + currentformid + "&frompage=" + formid + "&mobile=yes&locid=" + locid, function (responsetext) {
//            $('#divDis').html(responsetext);
//        });
//    }
}
function getParameterName(name, path) {
    name = name.split("&");
    var data = '';
    for (var i = 0; i < name.length; i++) {
        value = name[i].split("=");
        if (value[0] == path) {
            data = value[1];
        }

    }
    return data;
}
//function getHeadDataSearch() {
//    var paramdata = '';
//    try {
//        var isAttachment = false;
//        var tables = ["dynamictable", "tabhidden", "tabAfter"];
//        var tablist = document.getElementsByTagName("table");
//        for (var k = 0; k < tablist.length; k++) {
//            var tabid = tablist[k].id;
//            if (tabid.indexOf("tab_dyna") != -1) {
//                var tid = "tabgrd" + tabid.replace("tab_dyna_", "");
//                try {
//                    tables.push("tabgrd" + tabid.replace("tab_dyna_", ""));
//                    document.getElementById(tid);
//                } catch (err) {
//                    continue;
//                }
//            }
//        }
//        for (var ta = 0; ta < tables.length; ta++) {
//            var table = document.getElementById(tables[ta]);
//            var textbox = table.getElementsByTagName("input");
//            var dropdown = table.getElementsByTagName("select");
//            var checkbox = table.getElementsByTagName("checkbox");
//            var textarea = table.getElementsByTagName("textarea");
//            for (var i = 0; i < textbox.length; i++) {
//                if (textbox[i].id.indexOf("selmul") == 0) {
//                    continue;
//                }
//                if (textbox[i].type == "text") {
//                    if (textbox[i].id.indexOf("txtYears") == 0 || textbox[i].id.indexOf("txtMonths") == 0 || textbox[i].id.indexOf("txtDays") == 0) {
//                        continue;
//                    }
//                    paramdata = paramdata + "@!!@";
//                    var val = textbox[i].value;
//                    if (val == "") {
//                        val = " ";
//                    }
//                    if (textbox[i].id.indexOf("_searchid") != -1) {
//                        var titin = textbox[i].title;
//                        if (titin == "") {
//                            titin = " ";
//                        }
//                        paramdata = paramdata + "" + textbox[i].id + ",!" + titin;
//                    }
//                    else if (textbox[i].id.indexOf("txtdt") == 0) {
//                        if (val.trim() != "")
//                            paramdata = paramdata + "" + textbox[i].id + ",!" + val + "";
//                        else
//                            paramdata = paramdata + "" + textbox[i].id + ",! ";
//                    }
//                    else if (textbox[i].id.indexOf("txttm") == 0) {
//                        if (val.trim() != "")
//                            paramdata = paramdata + "" + textbox[i].id + ",!" + val + "";
//                        else
//                            paramdata = paramdata + "" + textbox[i].id + ",! ";
//                    }
//                    else if (textbox[i].id.indexOf("txtdob") == 0) {
//                        var labl = textbox[i].id.replace("txtdob", "");
//                        if (val.trim() == "") {
//                            val = "''";
//                        } else {
//                            val = "to_date('" + val + "','dd/mm/yyyy')";
//                        }
//                        paramdata = paramdata + "" + textbox[i].id + ",!" + val;
//                        var years = $('#txtYears' + labl).val();
//                        if (years.trim() == "")
//                            years = 0;
//                        var months = $('#txtMonths' + labl).val();
//                        if (months.trim() == "")
//                            months = 0;
//                        var days = $('#txtDays' + labl).val();
//                        if (days.trim() == "")
//                            days = 0;
//                        paramdata = paramdata + ",~" + years + ",~" + months + ",~" + days;
//                    }
//                    else {
//                        if (val == "")
//                            val = " ";
//                        paramdata = paramdata + "" + textbox[i].id + ",!" + val;
//                    }
//
//                }
//                if (textbox[i].type == "checkbox") {
//                    var val = document.getElementById(textbox[i].id).checked;
//                    var value1 = 0;
//                    if (val == true) {
//                        value1 = 1;
//                    }
//                    paramdata = paramdata + "@!!@" + textbox[i].id + ",!" + value1;
//                }
//            }
//            for (var i = 0; i < dropdown.length; i++) {
//                if (dropdown[i].id.indexOf("selmul") == 0) {
//                    var countries = [];
//                    $.each($("#" + dropdown[i].id + " option:selected"), function () {
//                        countries.push($(this).val());
//                    });
//                    var val = countries.join("$");
//                    if (val.trim() == "") {
//                        var nm = dropdown[i].name.split(",!");
//                    }
//                    if (val.trim() == "")
//                        val = " ";
//                    paramdata = paramdata + "@!!@" + dropdown[i].id + ",!" + val;
//                } else {
//                    if (dropdown[i].id != "" && $("#" + dropdown[i].id + " :selected").val() != "") {
//                        paramdata = paramdata + "@!!@" + dropdown[i].id + ",!" + $("#" + dropdown[i].id + " :selected").val();
//                    }
//                }
//            }
//            for (var i = 0; i < textarea.length; i++) {
//                var val = document.getElementById(textarea[i].id).value;
//                if (val == "")
//                    val = " ";
////                if(textarea[i].id == "textbox"){
////                     var editor =  textboxio.replace('#textbox');
////            
////        var worddata = editor.content.get();
////        paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + worddata;
////                    continue;
////                }
//                paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + val;
//            }
//        }
//    } catch (e) {
//        paramdata = '';
//    }
//    paramdata = paramdata.replace(/%/g, 'persymbol');
//    paramdata = paramdata.replace(/&/g, 'andsymbol');
//    paramdata = paramdata.replace(/#/g, 'hashsymbol');
//    paramdata = paramdata.replace(/\+/g, 'plussymbol');
//    return paramdata;
//}
function getHeadDataSearch() {

    var paramdata = '';
    try {
        var isAttachment = false;
        var tables = ["dynamictable", "tabhidden", "tabAfter"];
        var tablist = document.getElementsByTagName("table");
        for (var k = 0; k < tablist.length; k++) {
            var tabid = tablist[k].id;
            if (tabid.indexOf("tab_dyna") != -1) {
                var tid = "tabgrd" + tabid.replace("tab_dyna_", "");
                try {
                    tables.push("tabgrd" + tabid.replace("tab_dyna_", ""));
                    document.getElementById(tid);
                } catch (err) {
                    continue;
                }
            } else if (tabid.indexOf("tabgrd") == 0) {
                try {
                    tables.push(tabid);
                } catch (err) {
                    continue;
                }
            }
        }
        tablist = null;
        for (var ta = 0; ta < tables.length; ta++) {
            var table = document.getElementById(tables[ta]);
            var textbox = table.getElementsByTagName("input");
            var dropdown = table.getElementsByTagName("select");
            var checkbox = table.getElementsByTagName("checkbox");
            var textarea = table.getElementsByTagName("textarea");
            for (var i = 0; i < textbox.length; i++) {
                if (textbox[i].id.indexOf("selmul") == 0) {
                    continue;
                }
                if (textbox[i].type == "text") {
                    if (textbox[i].id.indexOf("txtYears") == 0 || textbox[i].id.indexOf("txtMonths") == 0 || textbox[i].id.indexOf("txtDays") == 0) {
                        continue;
                    }
                    paramdata = paramdata + "@!!@";
                    var val = textbox[i].value;
                    if (val == "") {
                        val = " ";
                    }
                    if (textbox[i].id.indexOf("_searchid") != -1) {
                        var titin = textbox[i].title;
                        if (titin == "") {
                            titin = " ";
                        }
                        paramdata = paramdata + "" + textbox[i].id + ",!" + titin;
                    }
                    else if (textbox[i].id.indexOf("txtdt") == 0) {
                        if (val.trim() != "")
                            paramdata = paramdata + "" + textbox[i].id + ",!" + val + "";
                        else
                            paramdata = paramdata + "" + textbox[i].id + ",! ";
                    }
                    else if (textbox[i].id.indexOf("txttm") == 0) {
                        if (val.trim() != "")
                            paramdata = paramdata + "" + textbox[i].id + ",!" + val + "";
                        else
                            paramdata = paramdata + "" + textbox[i].id + ",! ";
                    }
                    else if (textbox[i].id.indexOf("txtdob") == 0) {
                        var labl = textbox[i].id.replace("txtdob", "");
                        if (val.trim() == "") {
                            val = "''";
                        } else {
                            val = "to_date('" + val + "','dd/mm/yyyy')";
                        }
                        paramdata = paramdata + "" + textbox[i].id + ",!" + val;
                        var years = $('#txtYears' + labl).val();
                        if (years.trim() == "")
                            years = 0;
                        var months = $('#txtMonths' + labl).val();
                        if (months.trim() == "")
                            months = 0;
                        var days = $('#txtDays' + labl).val();
                        if (days.trim() == "")
                            days = 0;
                        paramdata = paramdata + ",~" + years + ",~" + months + ",~" + days;
                    }
                    else {
                        if (val == "")
                            val = " ";
                        paramdata = paramdata + "" + textbox[i].id + ",!" + val;
                    }

                }
                if (textbox[i].type == "checkbox") {
                    var val = document.getElementById(textbox[i].id).checked;
                    var value1 = 0;
                    if (val == true) {
                        value1 = 1;
                    }
                    paramdata = paramdata + "@!!@" + textbox[i].id + ",!" + value1;
                }
            }
            for (var i = 0; i < dropdown.length; i++) {
                if (dropdown[i].id.indexOf("selmul") == 0) {
                    var countries = [];
                    $.each($("#" + dropdown[i].id + " option:selected"), function () {
                        countries.push($(this).val());
                    });
                    var val = countries.join("$");
                    if (val.trim() == "") {
                        var nm = dropdown[i].name.split(",!");
                    }
                    if (val.trim() == "")
                        val = " ";
                    paramdata = paramdata + "@!!@" + dropdown[i].id + ",!" + val;
                } else {
                    if (dropdown[i].id != "" && $("#" + dropdown[i].id + " :selected").val() != "") {
                        paramdata = paramdata + "@!!@" + dropdown[i].id + ",!" + $("#" + dropdown[i].id + " :selected").val();
                    }
                }
            }
            for (var i = 0; i < textarea.length; i++) {
                var val = document.getElementById(textarea[i].id).value;
                if (val == "")
                    val = " ";
//                if(textarea[i].id == "textbox"){
//                     var editor =  textboxio.replace('#textbox');
//            
//        var worddata = editor.content.get();
//        paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + worddata;
//                    continue;
//                }
                paramdata = paramdata + "@!!@" + textarea[i].id + ",!" + val;
            }
        }
    } catch (e) {
        paramdata = '';
    }
    try {
        var soc = $('#txtsocid').val();
        paramdata = paramdata + "@!!@txtsocid,!" + soc;
    } catch (err) {
    }
    paramdata = paramdata.replace(/%/g, 'persymbol');
    paramdata = paramdata.replace(/&/g, 'andsymbol');
    paramdata = paramdata.replace(/#/g, 'hashsymbol');
    paramdata = paramdata.replace(/\+/g, 'plussymbol');
    return paramdata;
}
function closeSearch() {
    $('.divforsearch').hide();
}
function getMultiSelectKeyids() {

    var param;
    var oTable = document.getElementById('tabMulti');
    var rowLength = oTable.rows.length;
    var param = "";
    for (i = 1; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        var celLength = oCells.length;
        var keyid = oTable.rows[i].cells[1].innerHTML;
        var valueid = oTable.rows[i].cells[2].innerHTML;
        if (document.getElementById("chk" + keyid.trim()).checked == true) {
            if (param.trim() == "") {
                param = "'" + keyid + "'";
            } else {
                param = param + ",'" + keyid + "'";
            }
        }
    }
    return param;
}
function onSelectRow(tr) {

    var data = $('#hdnsertext').val() + "@!!@";
    $('.divforsearch').hide();
    var len = tr.children.length;
    for (var i = 0; i < len; i++) {
        data += tr.children[i].textContent.replace(/&/g, 'andsymbol') + "@!!@";
    }
    var ismultiselect = $('#ismultiselect').val();
    if (ismultiselect == 1) {
        data = data.substring(0, data.length - 4);
        var et = data.split("@!!@");
        var value = et[et.length - 1];
        var key = et[et.length - 2];
        var oTable = document.getElementById('tabMulti');
        var rowLength = oTable.rows.length;
        var param = "";
        for (i = 1; i < rowLength; i++) {
            var oCells = oTable.rows.item(i).cells;
            var celLength = oCells.length;
            var keyid = oTable.rows[i].cells[1].innerHTML;
            var valueid = oTable.rows[i].cells[2].innerHTML;
            if (key == keyid && valueid == value) {
                //alert("Already selected");
                return false;
            }
        }

        var table = document.getElementById("tabMulti");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        var i = 0;
        var cell0 = row.insertCell(i++);
        var cell = "<input type='checkbox' onclick='reload(this)' checked id='chk" + key + "'>";
        cell0.innerHTML = cell;
        var cell0 = row.insertCell(i++);
        var cell = key;
        cell0.innerHTML = cell;
        var cell0 = row.insertCell(i++);
        var cell = value;
        cell0.innerHTML = cell;
        $("#list1").trigger("reloadGrid");
        return false;
    }
    win(data);
}
function win(anchor) {
    $('.error-msg').remove();
    anchor = anchor.substring(0, anchor.length - 4);
    ReloadView(anchor);
}
function showSearchpopup() {
    $('#popup1').show();
}
function hideSearchpopup() {
    $('#popup1').hide();
}
function autoTextareaHeight() {
    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }).on('input focus hover', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}
function changeWizard(cntrl, msg) {
    
    $('#hdnnsavealert').val("");
    var wizard = $('#hdnwizard').val();
    $('.error-msg').remove();
    if (wizard === "1") {
        var id = $(cntrl).closest(".sub-div").attr("id").replace("div", "");
        changedivs(id, $('#page' + id));
        if (msg == undefined || msg == 'undefined') {
            msg = cntrl.id.replace('txtarea', '').replace('txt', '').replace(/_/g, ' ') + " is Mandatory";
        }
        var alertmsg = "<span class='error-msg'><label>" + msg + "</label></span>";
        $(cntrl).after(alertmsg);
    } else {
//        alert(msg);
        var appname = localStorage.appname;
        if (appname === "dashboard") {
            appname = "Shivam Dashboard";
        }

        alert(msg);
//        try {
//            navigator.notification.alert(
//                    msg, // message
//                    'Shivam Dashboard', // title
//                    appname                  // buttonName
//                    );
//        } catch (err) {
//            alert(msg);
//        }

    }


}
function checkPwd() {
    
    var askpwd = $('#hdnaskpwd').val();
    if (askpwd === "0" || localStorage.getItem("donotaskpwd") !== null) {
        $('#btnsave').attr('disabled', 'disabled');
        saveData();
    } else {
        $('#txtPwdCheck').val("");
        $('#txtPwdCheck').focus();
        $('#btnsave').attr('disabled', 'disabled');
//        displaypwd();
//        $('#myModalpassword').modal();
//        $('#myModalpassword').modal('show');
        savevalidation();//for save button validation
    }

}

function closesavedg() {
    $('#btnsave').removeAttr('disabled');
    $('#btndiagsave').removeAttr('disabled');
}
function displaypwd() {
    $("#boxpwd").dialog({
        resizable: false,
        height: 'auto',
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
                $('#btnsave').removeAttr('disabled');
            }, "Save": function () {
                passwordcheck();
            }

        },
        modal: true


    });

}
function passwordcheck() {
    $('#btndiagsave').attr("disabled", "true");
    var pwd = $('#txtPwdCheck').val().trim().toUpperCase();
    var hdnpwd = $('#hdnuserpassword').val().trim();
    var loginusernm = $('#hdnsaveusernm').val();
    var loginuserid = $('#hdnsaveuserid').val();
    var usercnt = $('#hdnusercount').val();
    if (pwd == "") {

        $('#btnsave').removeAttr('disabled');
        $('#btndiagsave').removeAttr("disabled");
        $('#txtPwdCheck').focus();
        var appname = localStorage.appname;
        if (appname === "dashboard") {
            appname = "Shivam Dashboard";
        }
        try {
            navigator.notification.alert(
                    'Please Enter The Password', // message
                    'Shivam Dashboard', // title
                    appname                  // buttonName
                    );
        } catch (ee) {
            alert('Please Enter The Password');
        }
//            alert("Please Enter The Password");
        return;
    } else if (usercnt > 1) {
        $('#btnsave').removeAttr('disabled');
        $('#btndiagsave').removeAttr("disabled");
        $('#txtPwdCheck').val("");
        $('#txtPwdCheck').focus();
        alert('One or more user have same password, please change your password!');
    } else if (pwd != hdnpwd) {
        $('#btndiagsave').removeAttr("disabled");
        $('#txtPwdCheck').val("");
        $('#txtPwdCheck').focus();
        var appname = localStorage.appname;
        if (appname === "dashboard") {
            appname = "Shivam Dashboard";
        }
//                alert("Please enter correct password");
        try {
            navigator.notification.alert(
                    'Please Enter Correct Password', // message
                    'Shivam Dashboard', // title
                    appname                  // buttonName
                    );
        } catch (err) {
            alert(err);
        }
    } else if (pwd == hdnpwd) {
        $('#myModalpassword').modal('hide');
        $('#btndiagsave').removeAttr('disabled');
        saveData();
    }
}
function passwordcheck1() {
    
    $('#hdnnsavealert').val("1");
    $('#btndiagsave').attr("disabled", "true");
    var pwd = $('#txtPwdCheck').val();
    $.get(localStorage.ipadrs + '/passwordCheck?pwd=' + pwd, function (responseText) {
        if (responseText.indexOf("$") === -1) {
            if (responseText === "1") {
//		displaypwd();
//                 $('#myModalpassword').modal('show');  
                $('#btndiagsave').removeAttr("disabled");
                $('#txtPwdCheck').val("");
                $('#myModalpassword').modal('hide');
                alert("Please Enter The Correct Password");
            } else if (responseText === "2") {
//		displaypwd();
                $('#btndiagsave').removeAttr("disabled");
                $('#txtPwdCheck').val("");
//                         $('#myModalpassword').modal('show'); 
                $('#myModalpassword').modal('hide');
                alert('One or more user have same password, please change your password!');
            } else if (responseText.indexOf(",") > 0) {
                responseText = responseText.split(",");
                $('#hdnsaveusernm').val(responseText[0]);
                $('#hdnsaveuserid').val(responseText[1]);
//                $('#boxpwd').dialog("close");
                $('#myModalpassword').modal('hide');
                saveData();
            }
        }
        else {
            $('#hdnsaveusernm').val("");
            $('#hdnsaveuserid').val("");
            $('#btnsave').removeAttr('disabled');
            $('#btndiagsave').removeAttr("disabled");
            alert(responseText);
            return;
        }
    });
}
function checkRights(type) {

    var buttons;
    var rights = localStorage.rights;
    if (localStorage.usernm === "SHIVAM") {
        localStorage.rights = "All";
        rights = "All"
    }

//    alert("before appname"+rights+" APp anme"+localStorage.appname);
    if (localStorage.appname !== "dashboard") {
        rights = "All"
    }
//    alert("after appname"+rights);
    rights = rights.trim();
    if (localStorage.reg === "1") {
        document.getElementById("btnsave").style.display = 'inline-block';
        document.getElementById("btndelete").style.display = 'none';
        document.getElementById("btnprint").style.display = 'none';
        document.getElementById("divsearchbtn").style.display = 'none';

        var saveButton = " <a href='#' class='savewthflpy'><span class='glyphicon glyphicon-floppy-save'></span> Save</a>";
        $('#btnsave').html(saveButton);
        return;

    }

    if ($('#hdnpgservice').val() === "1") {
        document.getElementById("divTools").style.display = "none";
        document.getElementById("pgdiv").style.display = "block";
        return;
    } else {
        document.getElementById("divTools").style.display = "block";
        document.getElementById("pgdiv").style.display = "none";
    }

    if (rights == 'null' || rights == 'All') {
        document.getElementById("btnsave").style.display = 'inline-block';
        if ($('#hdnwizard').val() === "0") {
            if ($('#hdnsaveinapp').val() === "0") {
                var saveButton = " <a href='#' class='savewthflpy'>\n\
            <span class='glyphicon glyphicon-floppy-save'></span> \n\
                Save</a>";
            } else {
                $('#btnsave').removeClass('btn-default');
                $('#btnsave').addClass('btn-success');
                saveButton = " <a href='#' class='savewthflpy'>" + $('#hdnsaveapptext').val() + "</a>";
            }
            $('#btnsave').html(saveButton);
        } else if ($('#hdnwizard').val() === "1") {
//            $('#btnsave').removeClass('btn-default');
//            $('#btnsave').addClass('btn-success');
            if ($('#hdnsaveinapp').val() === "1") {
                saveButton = " <a href='#' class='savewthflpy'>" + $('#hdnsaveapptext').val() + "</a>";
                $('#btnsave').html(saveButton);
            }
        }
        return;
    }

    try
    {
        document.getElementById("btnsave").style.display = 'none';
        document.getElementById("btndelete").style.display = 'none';
        if (type == "new") {
            if (rights == 'New' || rights == 'Add') {
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Edit') {
                document.getElementById("btnsave").style.display = 'none';
            }
            else if (rights == 'Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
            }
            else if (rights == 'Add Edit') {
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Add Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Edit Delete') {
                document.getElementById("btnsave").style.display = 'none';
                document.getElementById("btndelete").style.display = 'inline-block';
            }
            else {
                document.getElementById("btnsave").style.display = 'none';
                document.getElementById("btndelete").style.display = 'none';
            }
        }
        if (type == "edit") {
            if (rights == 'New' || rights == 'Add') {
                document.getElementById("btnsave").style.display = 'none';
            }
            else if (rights == 'Edit') {
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
            }
            else if (rights == 'Add Edit') {
                document.getElementById("btnsave").style.display = 'inline-block';
            }
            else if (rights == 'Add Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
                document.getElementById("btnsave").style.display = 'none';
            }
            else if (rights == 'Edit Delete') {
                document.getElementById("btndelete").style.display = 'inline-block';
                document.getElementById("divdelete").style.display = 'inline-block';
            }
            else {
                document.getElementById("btnsave").style.display = 'none';
                document.getElementById("btndelete").style.display = 'none';
            }
        }
    }
    catch (err) {
        alert(err);
    }
}

function isRadioField(chkid) {
    if ($("input[name=" + chkid + "]").length > 0) {
        // Radio button actually exists...
        return 1;
    } else {
        return 0;
    }
}
function setRadioValue(chkid, val) {
    $("input[name=" + chkid + "][value='" + val.toString().trim() + "']").prop('checked', 'true');
}
function setRadio(chkid, val) {
    $("input[name=" + chkid + "][value='" + val.toString().trim() + "']").prop('checked', 'true');
    $("input[name=" + chkid + "][value='" + val.toString().trim() + "']").click();
}
function openattachment(filename) {
    window.cordova.plugins.FileOpener.openFile(localStorage.server + "/dmsvf/" + filename, onSuccessFileOpen, onErrorFileOpen);
}
var onSuccessFileOpen = function (data) {
//    alert('extension: ' + data.extension + '\n' +
//          'canBeOpen: ' + data.canBeOpen);
};

// onError Callback receives a json object
//
function onErrorFileOpen(error) {
    alert('message: ' + error);
}
function gridradiocall(){
    var textbox,tablist,table;
    try{
         tablist = document.getElementsByTagName("table");
    var griddetails = "";
    var lenfor53 = tablist.length;
    for (var k = 0; k < lenfor53; k++) {
        var tabid = tablist[k].id;
        if (tabid.indexOf("tabgrd") != -1) {
              table = document.getElementById(tabid);
             textbox = table.getElementsByTagName("input");
            var lenfor54 = textbox.length;
            for (var i = 0; i < lenfor54; i++) {
                if(textbox[i].type=="radio"){
                    var def = $("input[name="+textbox[i].name+"]").attr("lblvalue");
                     $("input[name="+textbox[i].name+"][title='" + def.toString().trim() + "']").prop('checked', 'true');
                     $("input[name="+textbox[i].name+"][title='" + def.toString().trim() + "']").click();
                 }
             }
         }
        }
    }catch(err){}
    finally{
        textbox = null;
        tablist = null;
        table = null;
    }
}
 function clearFormtables() {
        var textbox,dropdown,checkbox,textarea;
//        try{
        var tables = ["dynamictable", "tabhidden","tabAfter"];
        var tablist = document.getElementsByTagName("table");
        var lenfor58 = tablist.length;
        for (var k = 0; k < lenfor58; k++) {
            var tabid = tablist[k].id;
            if (tabid.indexOf("tabgrd") == 0) {
                tables.push(tabid);
            }
        }
        var lenfor19 = tables.length;
        for(var ta=0;ta<lenfor19;ta++){
            var table = document.getElementById(tables[ta]);
            var textbox = table.getElementsByTagName("input");
            var dropdown = table.getElementsByTagName("select");
            var paramdata = '';
            var rowids = "";
            var lenfor59 = dropdown.length;
//            for (var i = 0; i < lenfor59; i++) {
//                    var value = dropdown[i].title;
//                    var chkid = dropdown[i].id;
//                    $("#"+chkid.trim().replace("$","")+" option").each(function() {
//                        $(this).text().trim() == value.trim();
//                        if($(this).text().trim() == value.trim()) {
//                            $(this).attr('selected', 'selected'); 
//                            this.selected = true;
//                        }
//                    });
//                }
                var lenfor60 = textbox.length;
            for (var i = 0; i < lenfor60; i++) {
                if(textbox[i].type=="radio"){
                     var def = $(textbox[i]).attr("lblvalue");
                    var title = $(textbox[i]).attr("title");
                    if (def === title) {
                        $("input[name=" + textbox[i].name + "][title='" + def.toString().trim() + "']").prop('checked', 'true');
                        $("input[name=" + textbox[i].name + "][title='" + def.toString().trim() + "']").click();
                    }

                 }
                if (textbox[i].type == "text") {
                    if(textbox[i].name == "" && textbox[i].id.indexOf("chkbox")==-1){
                        var rowid = textbox[i].id.replace("txt","tr");
                        if(rowids == ""){
                            rowids = rowid;
                        }else{
                            rowids = rowids + "," + rowid;
                        }
                    continue;
                    }
                    textbox[i].value = "";
                    try{
                        textbox[i].title = "";
                    }catch(err){}
                }
                if(textbox[i].id.indexOf("txtdt")!= -1){
                    var appdt = $('#'+textbox[i].id).attr("applydate");
                    if(appdt == "0")
                    $('#'+textbox[i].id).val($('#dd').val());
                    else
                        $('#'+textbox[i].id).val("");
                }
                if(textbox[i].id.indexOf("txttm")!= -1){
                     var appdt = $('#'+textbox[i].id).attr("applydate");
                    if(appdt == "0"){
                        var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var tm = "am";
    if(h>=12){
       tm = "pm";
       if(h!=12)
       h = h - 12;
    }
    if(h<10){
        h = "0"+h;
    }
    var curtm = h+":"+m+":00 "+tm;
    $('#'+textbox[i].id).val(curtm);
                    }else{
                         $('#'+textbox[i].id).val("");
                    }
                }
            }            
            if(rowids != ""){
                var rw = rowids.split(",");
                var lenfor20 = rw.length;
                for(var r=0;r<lenfor20;r++){
                    $('#'+rw[r]).remove();
                }
            }
            var textarea = table.getElementsByTagName("textarea");
            var lenfor61 = textarea.length;
            for (var i = 0; i < lenfor61; i++) {
                if(textarea[i].id.indexOf("txtarea") !=-1);
                 if(textarea[i].id.indexOf("textbox") == 0){
try{tinymce.get(textarea[i].id).setContent("");}catch(err){}
                }else{
                textarea[i].value = "";
            }
            }
//            try{
//                for (var i = 0; i < dropdown.length; i++) {
//                    var value = dropdown[i].title;
//                    var chkid = dropdown[i].id;
//                    $("#"+chkid.trim().replace("$","")+" option").each(function() {
//                        if($(this).text().trim() == value.trim()) {
//                            $(this).attr('selected', 'selected'); 
//                            this.selected = true;
//                        }
//                        dropdown[i].onchange();
//                    });
//                }
//            }catch(err){}
        }
//        try{var today = new Date();var h = today.getHours();var m = today.getMinutes();var s = today.getSeconds();
//    var tm = "am";
//    if(h>=12){tm = "pm";if(h!=12){h = h - 12;}}
//    if(h<10){h = "0"+h;}
//    var curtm = h+":"+m+":00 "+tm;$('.Timegrd').prop("value", curtm)}catch (err){};
//    }finally{
//        textbox=null;
//        dropdown= null;
//        checkbox= null;
//        textarea= null;
//    }
    }
    function displaysavebuttons(){
        var pgservice= $('#hdnpgservice').val(); 
       dissavebtn(pgservice);
    }
    function dissavebtn(pgservice){
        try{
         if(pgservice === "1"){
            document.getElementById("stylediv").style.display = "none";
            document.getElementById("pgdiv").style.display = "block";
        }else{
             document.getElementById("stylediv").style.display = "block";
             document.getElementById("pgdiv").style.display = "none";
        }
        }catch(err){
            
        }
    }
    var tmopen="";
function closeform(){

 $("#openformdiv").html("");
     $("#openformdiv").hide();
      $("#openformdiv1").hide();
      $('.footer').css("display","block");
       clearInterval(tmopen);
       }

function openform(wfide){
    
    var extradata = "";var reffield = "";
    if(wfide.indexOf("wf") != 0){
        var bubbledata = $('#bubbledata').val();
//alert(bubbledata);
if(bubbledata.trim() != ""){
    var p1 = bubbledata.toString().split("@!!@");
                for (var k = 1; k < p1.length; k++) {
                   var pk = p1[k].split(",!");
                   if(pk[0].trim() == wfide.trim()){
                       wfide = pk[1].trim();
                       break;
                   }
                }
}
    }
    if(wfide.indexOf(":") != -1){
        var ti = wfide.split(":");
        wfide = ti[0].trim();
       // try{var lf =  document.getElementById(ti[2].replace("$","").trim()).value; extradata="&linktoform="+lf+"&openform=1"}catch(err){}
        try{
            var lf ="";
            var sendingid = "";
            if(ti[1].indexOf(".")!= -1){
                var t = ti[1].split(".");
                sendingid = t[0].replace("$","").trim();
                if(t[1].trim() == "id"){
                    lf =  document.getElementById(t[0].replace("$","").trim()).id;
                }else{
                    lf =  document.getElementById(t[0].replace("$","").trim()).value;
                }
            }else{
                sendingid = ti[1].replace("$","").trim();
            lf =  document.getElementById(ti[1].replace("$","").trim()).value;}
        var isheadfield = isHeadField(sendingid);
//        if(chkid == "txtpkgflg")
//        confirm(isheadfield+"--"+chkid);
        if(isheadfield == 0){
           // confirm("not header field");
            lf = getFormulaValueNew("$"+ti[1].replace("$",""), "grid");
        }
	 localStorage.lf=lf;
        extradata="&linktoform="+lf+"&openform="
    localStorage.lf=extradata;
	}catch(err){alert(err)}
        try{reffield =ti[2].replace("$","").trim().replace(".value","").replace(".id","") ;
	localStorage.reffield=reffield;
	}catch(err){}
    }
         localStorage.opencurrentformid=wfide.trim();
//    var url = $('#hdreqpath').val()+"/formview?webformid="+wfide.trim()+"&formid="+wfide.trim()+"&fromfwform=1&theme="+extradata+""+ mobile;

  var url="form.html";
    localStorage.openflg="1";
//  location.href='form.html';
  
 $('#openformdiv').html("<iframe id='iframeObjectId' class='openmob' src='./"+url+"' style='overflow:hidden;height:100%;width:100%'/>");
  
   try{
	 
     $("#openformdiv").show();
     $("#openformdiv1").show();
 }catch(err){}
  var width = $(window).width();
  var heightn = $(window).height();
                $('.modaln').css({'width': width});
	    $('.modaln').css({'height': heightn+30});
	      $('.modaln1').css({'width': width});
	    $('.modaln1').css({'height': heightn+30});
                tmopen=setInterval(function () {closelogoutn()},500);
//	        $("#openformdiv").find('#btnLogout').css("display","none");
		$('.footer').css("display","none");
	  }
function closelogoutn(){
    
 
    try{
	  $("#iframeObjectId").contents().find("#btnLogout").hide(); 
	  if($("#iframeObjectId").contents().find("#btnLogout").css("display")==="none"){
	      clearInterval(tmopen);
	  } 
}catch(err){
      console.log("hi"+err);
    }

}

 

