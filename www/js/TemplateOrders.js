
function showformview(id) {
    debugger;
    $('.btntbl').css('display', 'none');
    $('.r8').css('display', 'none');
    $('.m8').css('width', '100%');
    document.getElementById("outertemplate").style.display = "none";
    document.getElementById("formoutertemplate").style.display = "block";
    var mrno = localStorage.mrno;
    var docid = localStorage.docid;
    var speid = localStorage.speid;


    document.getElementById("lblprec").style.display = "none";
    document.getElementById("lblclose").style.display = "inline-block";
    var encounterid = document.getElementById("encounterid").value;
    var episodeid = document.getElementById("episodeid").value;
    var path = '../form.html';
    if (localStorage.orders != "1") {
//                    alert("localStorage.orders");
        localStorage.orderformid = localStorage.formid;
    }

    localStorage.formid = id.getAttribute("webformid");
    localStorage.currentformid = id.getAttribute("webformid");
    localStorage.orders = "1";
    if (id.getAttribute("FORMTEMPTYPE") == "15") {
        $('.btntbl').css('display', 'none');
        $.get(localStorage.ipadrs + '/admin/chartFrameWorkViewMobile.jsp?webformid=' + id.getAttribute("webformid") + '&mrno=' + mrno, function (responcejson) {
            if (responcejson != "") {
                document.getElementById("formoutertemplate").innerHTML = responcejson;
                var flag = document.getElementById("txtmul").value;
                debugger;
                if (flag != "1") {
                    var mrnofield = $('#txtmrnofield').val();
                    var mrno = $('#txtchrtmrno').val();
                    if (mrno.trim() != "") {
                        document.getElementById(mrnofield).value = mrno;
                        document.getElementById(mrnofield).onchange();

                    }
                }
            }
        });
    }
    else {
        $('.btntbl').css('display', 'none');
        openinapp("form.html");
       // document.getElementById("formoutertemplate").innerHTML = " <object data='./form.html'  width='100%' height='99%' > ";
    }
    var path = localStorage.ipadrs + "/formview?webformid=" + id.getAttribute("webformid") + "&frompage=" + id.getAttribute("webformid") + "&mobile=yes&locid=" + localStorage.locid + "&fromdis=1&theme=&mrno=" + mrno + '&encounterid=' + encounterid + '&episodeid=' + episodeid + '&fromdis=1'

}
var oab1 ;
function openinapp(path) {
    var width = $(window).width();
    var height = $(window).height();
    //function(strUrl, originx, originy, width, height, isAutoFadeIn)
    oab1 = new OverAppBrowser(path, 0, 80, width, parseInt(height) - 150);

//Events : loadstop, loadstart, exit, loaderror
    oab1.addEventListener('loadstop', function () {
        //insert inline style
        // oab.insertCSS({code:'#hplogoo {-webkit-transform: rotate(180deg);}'});

        //insert css file
        // oab.insertCSS({file:'http://domain.com/style.css'});

        //execute javascript code
        //oab.executeScript({code:'window.alert("test");'});

        //insert javascript file
        //oab.executeScript({file:'http://domain.com/script.js'});
    });

//Fade the webview
//oab.fade(toAlpha, duration);

//Resize the webview
    oab1.resize(0, 135, width, parseInt(height) - 180);
}
function closeSearch() {
    $('.divforsearchorders').hide();
}
function closeform(id) {
    document.getElementById("outertemplate").style.display = "block";
    document.getElementById("formoutertemplate").style.display = "none";

    document.getElementById("lblprec").style.display = "block";
    document.getElementById("lblclose").style.display = "none";
}
function getdata() {
//                document.getElementById("mydiv1").style.display="block";
    debugger;
//alert("HI");
    var webid = localStorage.orderwebformid;
    var encid = localStorage.encountid;
////                var order="<%=request.getParameter("ordertemp")%>";
////                
//                    document.getElementById("txtenc").value="`"+encid+"`@<%=dao2.serverDate()%>@"+"Orders";



    var encounterid = document.getElementById("encounterid").value;
    var episodeid = document.getElementById("episodeid").value;
//                document.getElementById("mydiv1").style.display="block";
    $.get(localStorage.ipadrs + '/DisTemplateView?type=loaddataall&webid=' + webid + '&encid=' + encid + '&encounterid=' + encounterid + '&episodeid=' + episodeid + '&editflag=1', function (responcejson) {
        if (responcejson != "") {
            document.getElementById("maindiv").innerHTML = responcejson;
//                        document.getElementById("mydiv1").style.display="none";
            var webchain = document.getElementById("webchain").value;
            var innerleft = document.getElementById("innertemplateleft");
//                        var innerright=document.getElementById("innertemplateright");
            var adfm = document.getElementById("custom-menu");
            var web = webchain.split("@");
            document.getElementById("genidcontainer").innerHTML = "";

            var idivfix = document.createElement('div');
            idivfix.className = 'block-2';
            idivfix.id = "fixedtempdiv";
            innerleft.appendChild(idivfix);
            idivfix.appendChild(document.getElementById("formsdiv"));
            $('#invcontainer').append("<div width='100%' showid='' id='fixedtempdiv1' onclick='displaydiv(this,1)' class='tbdivbtn tabactive'>History & Examination</div>");

            for (var i = 0; i < web.length; i++) {
                if (web[i].trim() != "") {
                    var iDiv = document.createElement('div');
                    iDiv.className = 'block-2';
                    iDiv.id = "inner" + web[i];
                    iDiv.style.display = "none";
//alert(i);
//if(i==1){
//    innerleft.appendChild(iDiv);
//}
//else if(i%2==0){
//    innerright.appendChild(iDiv);
//    }
//    else{

                    innerleft.appendChild(iDiv);
//    }

                    $('#genidcontainer').append("<input type='text' id='txtgenid" + web[i] + "'>");
                    $('#genidcontainer').append("<input type='text' id='txtini" + web[i] + "'>");


//$('#custom-menu').append("<button id='select"+web[i]+"'>"+document.getElementById(ffid).value+"</span></button>");
                }
            }
//                        var tab=document.getElementById("encountertab");

            debugger;
            var curdate = document.getElementById("id_serverdate").value;
            var chkdocid = localStorage.docid;
//                            for(var i=0;i<tab.rows.length;i++){
//                                if(curdate.trim()==tab.rows[i].cells[2].textContent.trim() && chkdocid==tab.rows[i].cells[1].getAttribute("title")){
//                                    tab.rows[i].cells[4].childNodes[0].onclick();
//                                    return;
//                                }
//                            }
//                            document.getElementById("mydiv1").style.display="none";

            document.getElementById("maindiv").style.display = "none";
            document.getElementById("positionleft").style.display = "none";
            var maind = document.getElementById("maindiv");
            var maind = maind.childNodes[0];
            for (var i = 0; i < maind.children.length; i++) {
//                                alert(maind.children[i].children[0].id);
                maind.children[i].children[0].onclick();
            }
        }
        else {
            var tab = document.getElementById("encountertab");

            debugger;
            var curdate = document.getElementById("id_serverdate").value;
            var chkdocid = localStorage.docid;
            for (var i = 0; i < tab.rows.length; i++) {
//                                alert(tab.rows[i].cells[2].textContent);
                if (curdate == tab.rows[i].cells[2].textContent && chkdocid == tab.rows[i].cells[1].getAttribute("title")) {
                    tab.rows[i].cells[4].childNodes[0].onclick();
                    return;
                }
            }
            var maind = document.getElementById("maindiv");
            var maind = maind.childNodes[0];
            for (var i = 0; i < maind.children.length; i++) {
//                                alert(maind.children[i].children[0].id);
                maind.children[i].children[0].onclick();
            }
//                            document.getElementById("mydiv1").style.display="none";
        }

        assignval();

    });
    if (document.getElementById("showhide").value == "Hide Print") {
        document.getElementById("showhide").onclick();
    }
    document.getElementById("positionleft").style.display = "block";
//                                            document.getElementById("positionright").style.display="none";
    $("#outertemplate").bind("contextmenu", function (event) {
        // Avoid the real one
        debugger;
        event.preventDefault();
        $("#custom-menu").hide(100);
        // Show contextmenu
        if ($("#showcustom-menu").show() === true) {
            $("#custom-menu").hide(100).
                    // In the right position (the mouse)
                    css({
                        top: event.pageY + "px",
                        left: event.pageX + "px"
                    });
        } else {
            $("#custom-menu").show(100).
                    // In the right position (the mouse)
                    css({
                        top: event.pageY + "px",
                        left: event.pageX + "px"
                    });
        }
    });

    // If the document is clicked somewhere
    $('body').click(function () {
        $('#custom-menu').hide();
    });
}
function displaydiv(id, flg) {
    debugger;
    $('.btntbl').css('display', 'block');
    try {
        $('.divforsearchorders').hide();
    }
    catch (eee) {

    }
    try{    
                
                oab1.close();
            }catch(err){
               // alert(err);
            }
             try{    
                oab.close();                
            }catch(err){
               // alert(err);
            }
    closeform();
    var webchain = $('#webchain').val();
    var web = webchain.split("@");
    if (flg == "1") {
        document.getElementById("fixedtempdiv1").setAttribute("class", 'tbdivbtn tabactive');
        document.getElementById("fixedtempdiv").style.display = "block";
        for (var i = 1; i < web.length; i++) {
            document.getElementById("display" + web[i]).setAttribute("class", 'tbdivbtn');
            document.getElementById("inner" + web[i]).style.display = "none";
        }
    }
    else {
        document.getElementById("fixedtempdiv1").setAttribute("class", 'tbdivbtn');
        document.getElementById("fixedtempdiv").style.display = "none";

        for (var i = 1; i < web.length; i++) {
            var divid = "inner" + web[i];
            if (web[i] == id.getAttribute("showid")) {

                document.getElementById("display" + web[i]).setAttribute("class", 'tbdivbtn tabactive');
                document.getElementById(divid).style.display = "block";

            }
            else {
                try {

                    document.getElementById("display" + web[i]).setAttribute("class", 'tbdivbtn');
                    document.getElementById(divid).style.display = "none";
                }
                catch (ee) {
                }
            }
        }
        var fl = "finalmain" + id.getAttribute("showid");
        var div1 = document.getElementById(fl);
        $('#outertemplate').append(div1);
        div1.style.display = "block";
    }

}
function closeform(id) {
    try {
        document.getElementById("outertemplate").style.display = "block";
        document.getElementById("formoutertemplate").style.display = "none";

        document.getElementById("lblprec").style.display = "block";
        document.getElementById("lblclose").style.display = "none";
    }
    catch (ee) {
    }
}
function getdatadefault() {
    document.getElementById("mydiv").style.display = "block";
    var webid = localStorage.webformid;
    var encid = "";
    var encounterid = document.getElementById("encounterid").value;
    var episodeid = document.getElementById("episodeid").value;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=loaddataall&webid=' + webid + '&encid=' + encid + '&encounterid=' + encounterid + '&episodeid=' + episodeid, function (responcejson) {
        if (responcejson != "") {
            document.getElementById("maindiv").innerHTML = responcejson;
            document.getElementById("mydiv").style.display = "none";

            var tab = document.getElementById("encountertab");

            debugger;
            var curdate = document.getElementById("id_serverdate").value;
            for (var i = 0; i < tab.rows.length; i++) {
                if (curdate.trim() == tab.rows[i].cells[2].textContent.trim()) {
                    tab.rows[i].cells[4].childNodes[0].onclick();
                }
            }
            document.getElementById("mydiv").style.display = "none";

            assignval();
        }
        else {
            var tab = document.getElementById("encountertab");

            debugger;
            var curdate = document.getElementById("id_serverdate").value;
            for (var i = 0; i < tab.rows.length; i++) {
//                                alert(tab.rows[i].cells[2].textContent);
                if (curdate == tab.rows[i].cells[2].textContent) {
                    tab.rows[i].cells[4].onclick();
                }
            }
//                            document.getElementById("mydiv1").style.display="none";
        }

    });
}

function  popencounter(id, editflg) {
    debugger;

//                    document.getElementById("mydiv1").style.display="block";
    var tab = document.getElementById("encountertab");
    document.getElementById("rghtscrl").style.display = "block";
    if (editflg == "1") {
        for (var j = 1; j < tab.rows.length; j++) {
            if (tab.rows[j].cells[3].textContent == tab.rows[id.parentNode.parentNode.rowIndex].cells[3].textContent) {
                tab.rows[id.parentNode.parentNode.rowIndex].style.background = "rgba(177, 81, 81, 0.16)";
            }
            else {
                tab.rows[j].style.background = "white";
            }
        }
//                    document.getElementById("innertemplateleft").innerHTML="";
//                    document.getElementById("innertemplateleft").innerHTML="";
//                    document.getElementById("outertemplate").innerHTML="";
//                    $("#datagrid").dialog("close");
        document.getElementById("datagrid").style.display = "none";
        document.getElementById("mydiv").style.display = "block";
    }
    else {
        for (var j = 1; j < tab.rows.length; j++) {
            if (tab.rows[j].cells[3].textContent == tab.rows[id.parentNode.rowIndex].cells[3].textContent) {
                tab.rows[id.parentNode.rowIndex].style.background = "rgba(177, 81, 81, 0.16)";
            }
            else {
                tab.rows[j].style.background = "white";
            }
        }
//                    $("#datagrid").dialog("close");
        document.getElementById("datagrid").style.display = "none";
    }

    document.getElementById("txteditflg").value = editflg;
    var encid = "";
    if (editflg == "1") {
        var encid = tab.rows[id.parentNode.parentNode.rowIndex].cells[3].textContent;
        document.getElementById("editencid").value = encid;
        document.getElementById("txtenc").value = "`" + encid + "`@" + tab.rows[id.parentNode.parentNode.rowIndex].cells[2].textContent + "@" + "Orders";
    }
    else {
        var encid = tab.rows[id.parentNode.rowIndex].cells[3].textContent;
        document.getElementById("editencid").value = encid;
        document.getElementById("txtenc").value = "`" + encid + "`@" + tab.rows[id.parentNode.rowIndex].cells[2].textContent + "@" + "Orders";
    }

    //              alert(encid);
    var webid = localStorage.webformid;
    var encounterid = document.getElementById("encounterid").value;
    var episodeid = document.getElementById("episodeid").value;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=loaddataall&webid=' + webid + '&encid=' + encid + '&encounterid=' + encounterid + '&episodeid=' + episodeid, function (responcejson) {
        if (responcejson != "") {
            document.getElementById("mydiv").style.display = "none";
            document.getElementById("maindiv").innerHTML = responcejson;
//                            document.getElementById("mydiv1").style.display="none";
            var maind = document.getElementById("maindiv");
            var maind = maind.childNodes[0];
            for (var i = 0; i < maind.children.length; i++) {
//                                alert(maind.children[i].children[0].id);
                maind.children[i].children[0].onclick();
            }
            assignval();
        }
        else {
//                            document.getElementById("mydiv1").style.display="none";
        }
    });
}

function assignval() {
    debugger;
    var e = document.getElementsByTagName("select");
    for (var i = 0; i < e.length; i++) {
        //    alert(e[i].title);
        var name = e[i].title;
        if (name != "") {
            e[i].value = name;
        }
    }


}

function loadtextarea(id) {
    textboxio.replaceAll('#' + id, {
        paste_styles: {
            office: 'clean'
        },
        css: {
            stylesheets: ['example.css']

        }
    });
}

function pop(id, flg, webid) {
    debugger;
    if (flg == '1') {
        var qry = id.title.split("@@");
        var id1 = qry[1];
        var mainqry = qry[0].split("from");

        qry = mainqry[0].split("`").join("'");
        var tab = mainqry[1];
        var txtf = webid.id + "@@" + id.parentNode.parentNode.rowIndex + "@@" + id.parentNode.cellIndex + "@@" + id1;
        var path = localStorage.ipadrs;
        window.open('' + path + '/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf=' + txtf + '&ordby=', '', 'width=640,height=600');

    }
}

function ReloadOP(rt) {
    debugger;

    var et = rt.split("&");
    if (et[0].indexOf("@@") > 0) {
        var dat = et[0].split("@@");
        //                alert(dat[0]);    
        var tab = document.getElementById(dat[0]);
        tab.rows[dat[1]].cells[dat[2]].childNodes[0].value = et[1];
        tab.rows[dat[1]].cells[parseInt(dat[2]) + 1].childNodes[0].value = et[2];

    }
}

function show(id) {
    debugger;
//                    document.getElementById("positionleft").innerHTML=document.getElementById("positionright").innerHTML;
//                    document.getElementById("positionright").style.display="none";
//                    document.getElementById("positionleft").style.display="block";
//if(document.getElementById("txtini"+id.getAttribute("webid")).value!="1"){
//                    var ffid1="forms"+id.getAttribute("webid");
//                    $('#custom-menu').append("<div width='100%' showid='"+id.getAttribute("webid")+"' id='select"+id.getAttribute("webid")+"' onclick='addnewone(this)'>"+document.getElementById(ffid1).value+"</div>");
//                    }
    var ini = "txtini" + id.getAttribute("webid");
    if (document.getElementById(ini).value != "1") {
        try {
            $('#custom-menu').append("<div width='100%' showid='" + id.getAttribute("webid") + "' id='select" + id.getAttribute("webid") + "' onclick='addnewone(this)'>" + id.textContent + "</div>");
            $('#invcontainer').append("<div width='100%' showid='" + id.getAttribute("webid") + "' id='display" + id.getAttribute("webid") + "' onclick='displaydiv(this)' class='tbdivbtn'>" + id.textContent + "</div>");
        }
        catch (eeee) {
        }
    }
    var orderwebid = localStorage.webformid;






    var mrno = localStorage.mrno;
    var docid = localStorage.docid;
    var locid = localStorage.locid;
    var speid = localStorage.speid;
//                    alert(localStorage.encounterid+"@"+localStorage.encountid);
    var theme = "";
    var encounterid = id.title;
    if (id.title == "") {
        if (document.getElementById("editencid").value != "") {
            encounterid = document.getElementById("editencid").value;
        }
        else {
            encounterid = document.getElementById("encounterid").value;
        }
    }

//                    alert(encounterid);
    var editflag = $('#txteditflg').val();
    var formname = id.getAttribute("formname");
    var formid = id.getAttribute("webid");
    if (document.getElementById(ini).value != "1") {
        document.getElementById(ini).value = "1";
        var path = localStorage.ipadrs + 'admin/disTemplateViewMobile.jsp?webformid=' + formid + "&speid=" + speid + "&mrno=" + mrno + "&docid=" + docid + "&theme=&locid=" + locid + '&titleencounterid=' + encounterid + "&orderwebid=" + orderwebid + '&editflag=' + editflag + '&formname=' + formname;
//                    var path=".."+id.id+"&speid="+speid+"&mrno="+mrno+"&docid="+docid+"&theme=&locid="+locid+'&titleencounterid='+encounterid+"&orderwebid="+orderwebid+'&editflag='+editflag+'&formname='+formname;
        document.getElementById("hdnpath").value = path;
        $.get(path, function (responseText) {
            if (responseText != "") {
                document.getElementById("mydiv").style.display = "none";
                document.getElementById("innertemplateleft").style.display = "inline-block";
// document.getElementById("innertemplateright").style.display="inline-block";
                document.getElementById("inner" + id.getAttribute("webid")).innerHTML = responseText;
                document.getElementById("inner" + id.getAttribute("webid")).style.display = "none";
                var ww = document.getElementById("outertemplate");
                for (var ij = 0; ij < ww.children.length; ij++) {
                    if (ww.childNodes[ij].id == "finalmain" + id.getAttribute("webid")) {
                        ww.childNodes[ij].remove();
                        var gid = "txtgenid" + id.getAttribute("webid");
                        document.getElementById(gid).value = "";
                    }

                }
                var div1 = document.getElementById("finalmain" + id.getAttribute("webid"));
                $('#outertemplate').append(div1);
//                    div1.innerHTML="";
//                    div1.remove();
                ww.style.display = "inline-block";
                var ffid = "forms" + id.getAttribute("webid");
                var adfm = document.getElementById("custom-menu");
//                    alert(document.getElementById(ffid).value);
//                    $('#custom-menu').append("<div width='100%' showid='"+id.getAttribute("webid")+"' id='select"+id.getAttribute("webid")+"' onclick='addnewone(this)'>"+document.getElementById(ffid).value+"</div>");
                try {
                    var wth = document.getElementById("txtcnt").value;
                    if (wth != '100') {
                        wth = wth + "%";
//                $('.left').css("width","100%");
//                 $('.leftgrddiv').css("height",'200px');
//                 $('.right').css("width",'100%');
//                 $('.rightgrddiv').css("height",'400px');
                    }
                }
                catch (ee) {
                }

//                    document.getElementById("mydiv1").style.dispaly="none";

                if (id.getAttribute("formtype") != "PLANNINGFORM") {
                    var wid = id.getAttribute("webid");
                    loadHeader(wid);
                    loadGenid(wid);
                    loadleftmain(wid);
                }
                else {
                    loadmrno();
                    getprntdis();
                }
            }
        });
    }
    else {
//                    alert(id.getAttribute("webid"));
//                    This is for edit mode to reduse reload entire data
//                        var path=".."+id.id+"&speid="+speid+"&mrno="+mrno+"&docid="+docid+"&theme="+theme+"&locid="+locid+'&titleencounterid='+encounterid+"&orderwebid="+orderwebid+'&editflag='+editflag+'&formname='+formname+'&webformid='+id.getAttribute("webid");
        var orencounterid = document.getElementById("encounterid").value;
        $.get(localStorage.ipadrs + '/DisTemplateView?type=getpkey&speid=' + speid + '&mrno=' + mrno + '&docid=' + docid + '&theme=&locid=' + locid + '&titleencounterid=' + encounterid + '&orderwebid=' + orderwebid + '&editflag=' + editflag + '&formname=' + formname + '&webformid=' + id.getAttribute("webid") + '&encounterid=' + orencounterid, function (responcejson) {
            if (responcejson != "") {
                if (responcejson.indexOf("exception") < 0) {
                    document.getElementById("mydiv").style.display = "none";
                    if (responcejson.indexOf("@") >= 0) {
                        var key = responcejson.split("@");
                        var pkey = "pkey" + id.getAttribute("webid");
                        var orpkey = "orpkey" + id.getAttribute("webid");

                        document.getElementById(pkey).value = key[0];
                        document.getElementById(orpkey).value = key[1];
                        var ffid12 = "finalmain" + id.getAttribute("webid");
                        var ftabbid = "finaltable" + id.getAttribute("webid");
                        document.getElementById(ffid12).style.display = "none";
                        var word = "txtworddole" + id.getAttribute("webid");

                        var tabid12 = document.getElementById(ftabbid);
//                                        alert(tabid12.rows.length);
                        if (document.getElementById(word).value != "1") {
                            $('#' + ftabbid).find("tr:gt(0)").remove();
//                                           var tabid12=document.getElementById(ftabbid);
//                                           alert(tabid12.rows.length);
                            for (var j = 1; j < tabid12.rows.length; j++) {
                                tabid12.deleteRow(j);
                            }
                        }
                        else {
                            var tbox = "textbox" + id.getAttribute("webid");
                            document.getElementById(tbox).value = "";
                        }
//                                                    alert(tabid12.rows.length);

                    }
                    var gid = "txtgenid" + id.getAttribute("webid");
                    document.getElementById(gid).value = "";
                    loadHeader(id.getAttribute("webid"));
                    loadGenid(id.getAttribute("webid"));
                }
                else {
                    document.getElementById("mydiv").style.display = "none";
                    alert(responcejson);
                    document.getElementById(pkey).value = "";
                    document.getElementById(orpkey).value = "";
                }
            }
            else {
                document.getElementById(pkey).value = "";
                document.getElementById(orpkey).value = "";
            }
        });
    }

}

function loadleftmain(wid) {
    debugger;
    try {
        var ww = document.getElementById("outertemplate");
        var webchain = document.getElementById("webchain").value;
        var web = webchain.split("@");
//                    alert(wid);
        for (var i = 0; i < web.length; i++) {
            for (var ij = 0; ij < ww.children.length; ij++) {
                if (ww.childNodes[ij].id == "finalmain" + web[i]) {
//                            ww.childNodes[ij].remove();
                    var div1 = document.getElementById("finalmain" + web[i]);
                    $('#outertemplate').append(div1);
                }
            }


        }



    }
    catch (ee) {
    }
    try {
        var wi = "leftmain" + wid;
        var div = document.getElementById(wi);
        $(div).find('input:button').each(function () {
//                                     alert(this.getAttribute("clicktype"));
//                                     alert($(this).type);
            if (this.getAttribute("clicktype") == "clicked") {
                this.onclick();
            }

        });
    }
    catch (ee) {
    }
    try {
        if (div.children[0].children[1].children[0].rows.length == 0) {
            div.children[0].style.display = "none";
            div.children[1].style.width = "100%";
        }
    }
    catch (ee) {
//                alert(ee);
    }

}
$(document).ready(function () {
//                    $.ajaxSetup({
//                        error: function(jqXHR, textStatus, errorThrown){
//                            debugger;
//                            if(jqXHR.status==500)
//                            {
    debugger;
//                                $('#mydiv').hide();
//                                document.getElementById("divFrame1").style.display="block";
//                                document.getElementById("showpdf").style.display="none";
//                                getdata();
//                                document.getElementById('divFrame1').innerHTML=jqXHR.responseText;    
//                               
//                            }
//                        }
//                    });
});
function addnewone(id, flg) {
    debugger;
    var fl = "finalmain" + id.getAttribute("showid");
    var div1 = document.getElementById(fl);
    $('#outertemplate').append(div1);
    div1.style.display = "block";
    if (flg != "1") {
        id.parentNode.style.display = "none";
    }
}
function printEncounter() {
     try{    
                
                oab1.close();
            }catch(err){
               // alert(err);
            }
             try{    
                oab.close();                
            }catch(err){
               // alert(err);
            }                                                    
    document.getElementById("mydiv").style.display = "block";
    var encid = $('#txtenc').val();
    var enc = encid.split("@");
    var subpid = $('#cmbprint').val();
    getPdf(enc[0], enc[1], enc[2], '0', subpid);

}
function getPdf(key_id_value, date_id_value, label, all, subpid) {
    debugger;
    var pdffiles = "";
    var root = window.location.protocol + "//" + window.location.host + "/";


    var formid = localStorage.webformid;
    //                var genid=document.getElementById("txtgenid").value;

    var docid = localStorage.docid;
    var mrno = localStorage.mrno;

    key_id_value = key_id_value.replace(/`/g, "'");
    date_id_value = date_id_value.replace(/`/g, "'");
    key_id_value = encodeURIComponent(key_id_value.toUpperCase().trim());
    date_id_value = encodeURIComponent(date_id_value.toUpperCase().trim());
    label = encodeURIComponent(label.replace(/_/g, " "));
//    $('#divFrame').hide();
//    $('#attachview').show();
    $('#tabs').hide();
    var img = '<img src="' + localStorage.ipadrs + '/icons/pdf_loading.gif"  style="margin-top:25%;width:150px;height:150px" />'
    $('#attachview').html(img);
    var div = document.getElementById('divFrame1');
    //     if(key_id_value!="" && date_id_value!=""){
    var path = localStorage.ipadrs + '/DisData?type=pdf&mrno=' + mrno + '&docid=' + docid + '&keyid=' + key_id_value + '&dateid=' + date_id_value + '&formid=' + formid + '&label=' + label + '&all=' + all + '&subprintid=' + subpid + '&mobile=1';
    $.get(path, function (responseText) {
        debugger;
//        alert(responseText);
        load_homeorders(responseText);


    });
}

function load_homeorders(filename) {
    debugger;
//                document.getElementById("divFrame1").style.display="block";
//                document.getElementById("showpdf").style.display="none";
    var pdfpath = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/viewer.jsp?mrno=" + filename;
    var orderpth = localStorage.ipadrs + "//pdfjs-1.1.366-dist/web/apppdfs/" + filename;
    localStorage.relpath = filename;
//    location.href=localStorage.ipadrs+"//pdfjs-1.1.366-dist/web/apppdfs/"+filename;
//    location.orderprint="1";
    download1(orderpth);
//    document.getElementById("divFrame1").innerHTML = '<object class="mob" type="text/html" data="'+pdfpath+'" style="width:100%;" ></object>';
}

function download1(orderpth) {

    document.getElementById("mydiv").style.display = "none";
    debugger;
    try
    {
        var wfid = localStorage.currentformid;
        var id = $('#txtprimKeyField').val();
        var downloadUrl = "";
        var relativeFilePath = "";

        downloadUrl = orderpth;
        relativeFilePath = "Shivam/" + localStorage.relpath;


//        var downloadUrl = localStorage.server + "/documents/" + wfid + id + ".pdf";
//        var relativeFilePath = "Shivam/" + wfid + id + ".pdf";  // using an absolute path also does not work

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            var fileTransfer = new FileTransfer();
//            alert(fileSystem.root.toURL() + '/' + relativeFilePath);
            fileTransfer.download(
                    downloadUrl,
                    // The correct path!
                    fileSystem.root.toURL() + '/' + relativeFilePath,
                    function (entry) {
//                        alert("Success");
                        opednPdf1();
                    },
                    function (error) {
                        alert("Error during download. Code = " + error.code);
                        $('#mydiv').hide();
                    }
            );
        });
    } catch (err) {
        alert(err);
        $('#mydiv').hide();
    }

}

function opednPdf1() {
    var wfid = localStorage.currentformid;
    var id = $('#txtprimKeyField').val();
    var relativeFilePath = "Shivam/" + localStorage.relpath;
    try {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//            alert(fileSystem.root.toURL() + '/' + relativeFilePath);
            $('#mydiv').hide();
            var path = fileSystem.root.toURL() + '/' + relativeFilePath;
            window.plugins.fileOpener.open(path);

        });
    } catch (err) {
        alert(err);
        $('#mydiv').hide();
    }
}
function gethide() {
    debugger;
    try {
        var table = document.getElementById("encountertab");
        var tablen = table.rows.length;
        var rowlen = parseInt(tablen) - 1;
        if (tablen > 0) {
            var cellslen = table.rows[0].cells.length;
            for (var k = 5; k < cellslen; k++) {
                var counter = 1;
                for (var l = 1; l < tablen; l++) {

                    if (table.rows[l].cells[k].textContent.trim() == "")
                        counter++;


                }
                if (counter == tablen) {
                    for (var i = 0; i <= tablen; ++i) {
                        show_hide_column(k);
                    }
                }

            }
        }

    }

    catch (e) {
    }
}


function show_hide_column(col_no) {
    debugger;


    var tbl = document.getElementById('encountertab');
    var rows = tbl.getElementsByTagName('tr');

    for (var row = 0; row < rows.length; row++) {
        var cels = rows[row].getElementsByTagName('td')
        cels[col_no].style.display = 'none';
    }
}



function showDetails(id) {
    debugger;
    var finaldata = "";
    var hdntbl = document.getElementById("hdntbl").value;
    var tbl = hdntbl.split("@");
    var nextgid = id.parentNode.parentNode.parentNode.parentNode.title;
    var clearflg = "0";
    var wid = id.getAttribute("webformid");
    var prec = "btnprec" + wid;
    var word = "txtworddole" + wid;
    if (nextgid.indexOf("finaltable") >= 0) {
        if (id.checked == true) {
            //                    alert("OK");
            idstring = id.parentNode.parentNode.parentNode.parentNode.id.replace("tab_", "") + "--> " + "'" + id.id + "'";
            finaldata = finaldata + "" + idstring + "@";
        }
        else {
            removeThese(id.id, wid, id);
            return;
        }
    }
    else if (nextgid.indexOf("textbox") >= 0) {
        if (id.checked == true) {
            //                    alert("OK");
            idstring = id.parentNode.parentNode.parentNode.parentNode.id + "--> " + "'" + id.id + "'";
            finaldata = finaldata + "" + idstring + "@";
            clearflg = "0";
        }
        else {
            idstring = id.parentNode.parentNode.parentNode.parentNode.id + "--> " + "'" + id.id + "'";
            finaldata = finaldata + "" + idstring + "@";
            clearflg = "1";
        }
    }
    else {
//                    alert(id.parentNode.parentNode.parentNode.parentNode.id);
        for (var k = 1; k < tbl.length; k++) {
            var tabtitle = document.getElementById(tbl[k]).title;
            var ttab = document.getElementById(wid + "" + nextgid);
            var fid = "finaltable" + wid;
            ttab.style.display = "block";
            var bid = "btn" + id.parentNode.parentNode.parentNode.parentNode.title;
            var btn = document.getElementById(bid);
            btn.setAttribute("backid", wid + "" + id.parentNode.parentNode.parentNode.parentNode.id);
            var noneid = wid + "" + id.parentNode.parentNode.parentNode.parentNode.id;
            noneid = noneid.replace("tab_", "");
            document.getElementById(noneid).style.display = "none";
            if (tabtitle.indexOf('finaltable') < 0) {
                var oTable = document.getElementById(id.parentNode.parentNode.parentNode.parentNode.id);
                var checkboxs = oTable.getElementsByTagName('input');
                var idstring = "";
                //                
                //               
                for (var i = 0; i < checkboxs.length; i++) {
                    if ($('#' + word).val() != "1") {
                        if (checkboxs[i].id == id.id) {

                        }
                        else {
                            checkboxs[i].checked = false;
                        }
                    }
                    if (checkboxs[i].checked == true)
                    {

                        var Templetedate = checkboxs[i].id;
                        idstring = "'" + Templetedate + "'" + ',' + idstring;

                    }
                }
                if (idstring.indexOf(",") > 0) {
                    idstring = idstring.substring(0, idstring.length - 1);
                }
                idstring = id.parentNode.parentNode.parentNode.parentNode.id.replace("tab_", "") + "--> " + idstring;
                finaldata = finaldata + "" + idstring + "@";
            }
            else {


            }
        }
    }



    var webid = id.getAttribute("webformid");
    var maindiv = "finalmain" + webid;

    var sv = "save" + webid;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=fillgrid&webid=' + webid + '&idstring=' + idstring + '&finaldata=' + finaldata + '&nextgid=' + nextgid, function (responcejson) {
        if (responcejson != null && responcejson != "") {
            debugger;
            if (nextgid.indexOf("finaltable") >= 0) {
                var bkid1 = "";
                if (nextgid.indexOf(webid) >= 0) {

                }
                else {
                    nextgid = nextgid + "" + webid;
                }
//                            alert(nextgid);
                try {
//                            alert(id.parentNode.parentNode.parentNode.parentNode.getAttribute("title1"));
                }
                catch (ee) {

                }
                var nxttab = document.getElementById(nextgid);
                if (nxttab == null) {
                    nextgid = "finaltable" + id.parentNode.parentNode.parentNode.parentNode.getAttribute("title1");
                    nxttab = document.getElementById(nextgid);
                    bkid1 = id.parentNode.parentNode.parentNode.parentNode.getAttribute("title1");
                }
                var data = "";
                var celllength = nxttab.rows[0].cells.length;
                var cols = "";
                for (var j = 3; j < celllength; j++) {
                    var lbl = nxttab.rows[0].cells[j].textContent;
                    lbl = "id_" + lbl;
                    //                      lbl=lbl.replace(" ","_");
                    lbl = lbl.split(" ").join("_");
                    cols = cols + "@" + lbl + "-->" + nxttab.rows[0].cells[j].title;
                }
//                  alert(cols);
//                            $('#finaltable').find("tr:gt(0)").remove();
                if (responcejson.length > 0) {
                    nxttab.rows[0].cells[1].childNodes[0].style.display = "none";
                    for (var k = 0; k < responcejson.length; k++) {
                        var slno = nxttab.rows.length;
                        var cmblbl = "";
                        if (k == responcejson.length - 1) {
                            data = "<tr><td style='display:none'>" + id.id + "</td><td height='20' style='display:none'><input type='button' value='Add' onclick='addToGrid(this)' class='btn2'></td><td width='1%'>" + slno + "</td>";
                        }
                        else {
                            data = "<tr><td style='display:none'>" + id.id + "</td><td height='20' style='display:none'><input type='button' value='Add' onclick='addToGrid()' class='btn2' style='display:none'></td><td width='1%'>" + slno + "</td>";
                        }

                        data = data + "<td width='1%' align='center'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)'></span></td>";
                        var cl = cols.split("@");
                        for (var l = 1; l < cl.length; l++) {
                            var cl2 = cl[l].split("-->");
                            if (cl2[1].indexOf("combo") >= 0) {
                                var cl1 = cl2[0].toUpperCase();
//                                        var k1=k+slno;
                                data = data + "<td><select id='" + cl2[0] + "_" + slno + "' onchange='onchangefun(this)' style='width:100%'>" + document.getElementById(cl2[0]).innerHTML + "</select></td>";
//data=data+"<td>"+document.getElementById(cl2[0]).outerHTML+"</td>";
                                cmblbl = cmblbl + "-->" + cl2[0] + "_" + slno + "@" + responcejson[k][cl1];
                            }
                            else if (cl2[1].indexOf("text") >= 0) {
                                var cl1 = cl2[0].toUpperCase();
                                data = data + "<td><input type='text' style='width:98%' value='" + responcejson[k][cl1] + "' onchange='onchangefun(this)' placeholder='Type Here'></td>";
                            }
                            else if (cl2[1].indexOf("searchmain") >= 0) {
                                var cl1 = cl2[0].toUpperCase();
                                data = data + "<td><input onkeydown='searchData(this)' type='text' value='" + responcejson[k][cl1] + "' class='inputwthimg' onchange='onchangefun(this)' placeholder='Type Here To Search' style='width:100%'></td>";
                            }
                            else if (cl2[1].indexOf("searchhdn") >= 0) {
                                var cl1 = cl2[0].toUpperCase();
                                data = data + "<td style='display:none'><input type='text' value='" + responcejson[k][cl1] + "' class='inputwthimg' onchange='onchangefun(this)' placeholder='Type Here'></td>";
                            }
                        }
//                                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td>";
//                                    data=data+"<td style='padding:0px;' align='center'><input type='checkbox' checked='true' style='cursor:pointer;width:auto;' class='btn2'></td>";
                        data = data + "</tr>";
                        data = $(data);
                        data.appendTo(nxttab);
                        var cmblbl1 = cmblbl.split("-->");
                        for (var n = 1; n < cmblbl1.length; n++) {
                            var cmb = cmblbl1[n].split("@");
                            document.getElementById(cmb[0]).value = cmb[1];
                        }

                    }
                    if (bkid1 != "") {
                        shafilall(bkid1);
                        applydisable(bkid1);
                    }
                    else {
                        shafilall(webid);
                        applydisable(webid);
                    }

                    try {
                        if (nextgid.indexOf("finaltable") >= 0) {
                            debugger;
                            if (bkid1 != "") {
                                maindiv = "finalmain" + bkid1;
                            }
                            else {
                            }
                            var outer = document.getElementById("outertemplate");
                            var dd = document.getElementById(maindiv);
//                                        alert(dd.style.display);
                            if (dd.style.display == "none") {
                                outer.appendChild(dd);
                                document.getElementById(maindiv).style.display = "block";
                            }
                        }
                    }
                    catch (ee) {
                        alert(ee);
                    }
                }

                debugger;
                if (nxttab.rows.length > 1) {
                    if (document.getElementById(word).value == "1") {
                        document.getElementById(sv).style.display = "inline-block";
                    }
                    else {
                        document.getElementById(sv).style.display = "none";
                    }

                    document.getElementById(prec).style.display = "inline-block";
                }
                else {
                    document.getElementById(sv).style.display = "none";
                    document.getElementById(prec).style.display = "none";
                }
                addToGrid('', '', webid);
            }
            else if (nextgid.indexOf("textbox") >= 0) {
                var defualt = "default" + webid;
                var tbox = "textbox" + webid;
                for (var k = 0; k < responcejson.length; k++) {
                    document.getElementById(defualt).value = responcejson[k]['KEY_VALUE'];

                    if (clearflg == "1") {
//                        defualt=defualt+'<br/>'+responcejson[k]['KEY_VALUE'];
                        document.getElementById(tbox).value = document.getElementById(tbox).value.trim().replace(document.getElementById(defualt).value.trim(), "");
                        if (document.getElementById(tbox).value.trim() != "") {
                        }
                        else {
                            var tx = "finalmain" + webid;
                            document.getElementById(tx).style.display = "none";
                        }
                    }
                    else {
                        document.getElementById(tbox).value = document.getElementById(tbox).value + "<br\>" + document.getElementById(defualt).value;
                    }
                }
//                        var editor =  textboxio.replace('#textbox');
//                        
//                        if(defualt!="")
//                        {
//                            tinymce.activeEditor.setContent(defualt); 
//                            editor.content.set(defualt);
                document.getElementById(tbox).value = document.getElementById(tbox).value.split("<br\>").join("\n").split("<br/>").join("\n");
                document.getElementById(tbox).value = document.getElementById(tbox).value.trim();
//                        }
                var outer = document.getElementById("outertemplate");
                var dd = document.getElementById(maindiv);
//                                        alert(dd.style.display);
                if (dd.style.display == "none") {
                    outer.appendChild(dd);
                    if (document.getElementById(tbox).value != "") {
                        document.getElementById(maindiv).style.display = "block";
                    }
                    else {
                        document.getElementById(maindiv).style.display = "none";
                    }
                }

                document.getElementById(sv).onclick();
            }

            //If Table is not final table.
            else {

                //                                                    var tableid=document.getElementById(nxttab);
                $('#' + nextgid).find("tr:gt(0)").remove();
                var tb = document.getElementById(nextgid);
                for (var k = 0; k < responcejson.length; k++) {

                    data = "<tr><td align='center' style='display:none'><input type='checkbox' id='" + responcejson[k]['KEY_ID'] + "'  onchange='showDetails(this)' webformid='" + webid + "'></td><td onclick='clickthis(this)'>" + responcejson[k]['KEY_VALUE'] + "</td><td style='display:none'>" + responcejson[k]['KEY_ID'] + "</td></tr>"

                    data = $(data);
                    data.appendTo(tb);
                }
                var uid = document.getParameter("id_uid");
                if (uid != "null") {
                    checktable(nextgid);
                }
            }
            if (document.getElementById(word).value == "1") {
                document.getElementById(sv).style.display = "inline-block";
            }
            else {
                document.getElementById(sv).style.display = "none";
            }

        }
        else {
            if (document.getElementById(word).value == "1") {
                var twebid = "textbox" + webid;
                document.getElementById(sv).style.display = "inline-block";
                document.getElementById(prec).style.display = "inline-block";
                document.getElementById(twebid).value = "";
            }
            else {
                if (nextgid.indexOf("finaltable") < 0) {
                    $('#' + nextgid).find("tr:gt(0)").remove();
                }
                var tb = document.getElementById(nextgid).title;
                if (tb.indexOf("finaltable") < 0) {
                    $('#' + tb).find("tr:gt(0)").remove();
                }
                var nxt = document.getElementById(nextgid);
                debugger;
                if (nxt.rows.length > 1) {
                    if (document.getElementById(word).value == "1") {
                        document.getElementById(sv).style.display = "inline-block";
                    }
                    else {
                        document.getElementById(sv).style.display = "none";
                    }
                    document.getElementById(prec).style.display = "inline-block";
                }
                else {

                    document.getElementById(sv).style.display = "none";
                    document.getElementById(prec).style.display = "none";


                }
            }
        }
    });

}

function hidetemp(id) {
    debugger;
    var rownum = id.parentNode.parentNode.rowIndex;
    var wid = id.parentNode.parentNode.parentNode.parentNode.getAttribute("savewebformid");
    var fid = "finaltable" + wid;
    var svid = "save" + wid;
    var table = document.getElementById(fid);
    var rowlen = table.rows.length;
    if (rowlen > 1) {
        if (rowlen == (rownum + 1)) {
            table.rows[rowlen - 2].cells[1].innerHTML = "<input type='button' value='Add' onclick='addToGrid(this)' class='btn2'>";
            table.rows[rowlen - 2].cells[1].style.display = "none";
        }
        table.deleteRow(rownum);
        try {
            for (var i = rownum; i < rowlen; i++) {
                table.rows[i].cells[2].textContent = i;

            }
        }
        catch (ee) {
        }

    }
    var divid = "finalmain" + wid;
    if (table.rows.length > 2) {

    }
    else if (table.rows.length == 2) {
        if (table.rows[1].cells[4].childNodes[0].value.trim() == "") {
            document.getElementById(divid).style.display = "none";
        }
    }
    else {
        document.getElementById(divid).style.display = "none";
    }
    document.getElementById(svid).onclick();
}
function shafilall(wid) {
    debugger;
    var stab = "finaltable" + wid;
    var tab = document.getElementById(stab);
    var ccount = tab.rows[0].cells.length;
    for (var i = 0; i < ccount; i++) {
        if (tab.rows[0].cells[i].id == "duplicate") {
            var rlength = tab.rows.length;
            for (var j = 1; j < rlength; j++) {
                for (var k = j + 1; k < tab.rows.length; k++) {
                    if (tab.rows[j].cells[i].children.length > 0) {
                        if (tab.rows[j].cells[i].children[0].type == 'text') {
                            if (tab.rows[j].cells[i].childNodes[0].value == tab.rows[k].cells[i].childNodes[0].value) {
                                tab.deleteRow(k);
                            }
                        }
                    }
//                            else{
//                                if(tab.rows[j].cells[i].textContent==tab.rows[k].cells[i].textContent){
//                                    tab.deleteRow(k);
//                                }
//                            }
                }
                try {
                    tab.rows[j].cells[1].childNodes[0].style.display = "none";
                }
                catch (e) {

                }
            }
            tab.rows[tab.rows.length - 1].cells[1].childNodes[0].style.display = "block";
        }
        else {
            tab.rows[tab.rows.length - 1].cells[1].childNodes[0].style.display = "block";
        }
    }
    var sv = "save" + wid;
    document.getElementById(sv).onclick();
}

function removeThese(rid, wid, id) {
    debugger;
    var fid = "finaltable" + wid;
    var svid = "save" + wid;
    var tab = document.getElementById(fid);
    if (tab == null) {
        fid = "finaltable" + id.parentNode.parentNode.parentNode.parentNode.getAttribute("title1");
//                    alert(fid);
        tab = document.getElementById(fid);
        svid = "save" + id.parentNode.parentNode.parentNode.parentNode.getAttribute("title1");
    }
    if (tab.rows.length > 1) {
        for (var i = 0; i < tab.rows.length; i++) {
            if (tab.rows[i].cells[0].textContent == rid) {
                tab.rows[i].remove();
                i = 0;
            }
        }
    }
    if (tab.rows.length == "1") {
        tab.rows[0].cells[1].childNodes[0].style.display = "block";
    }
    else {
        tab.rows[tab.rows.length - 1].cells[1].childNodes[0].style.display = "block";
    }

    var divid = "finalmain" + wid;
    if (tab.rows.length > 2) {

    }
    else if (tab.rows.length == 2) {
        if (tab.rows[1].cells[4].childNodes[0].value.trim() == "") {
            document.getElementById(divid).style.display = "none";
        }
    }
    else {
        document.getElementById(divid).style.display = "none";
    }

    document.getElementById(svid).onclick();
}


function deleterow(tr) {
    $(tr).remove();
}

function popsearch(id) {
    debugger;
    var data = id.name;
    var data1 = data.split("@@");
    var qry = data1[2];
    qry = qry.replace("@", "'");
    var tab = data1[3];
    tab = tab.split("@").join("'");
    var txtf = data1[0] + "@@" + data1[1];
    var path = localStorage.ipaddres;
    qry = qry.replace("`", "'");
    window.open('' + path + '/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf=' + txtf + '&ordby=', '', 'width=640,height=600');

}

function ReloadOP(rt) {
    debugger;
    var et = rt.split("&");
    var webid = "";
    if (et[0].indexOf("@@") > 0) {
        var dat = et[0].split("@@");
        webid = dat[4];
        if (dat[0] == "pop") {
            var ftab = "finaltable" + dat[4];
            var tab = document.getElementById(ftab);
            tab.rows[dat[1]].cells[dat[2]].childNodes[0].value = et[1];
            tab.rows[dat[1]].cells[parseInt(dat[2]) + 1].childNodes[0].value = et[2];
            tab.rows[dat[1]].cells[3].childNodes[0].style.display = "block";
            checkforsearch(parseInt(dat[2]) + 1, et[2], tab, dat[1], dat[4]);
//                    addToGrid('','',dat[4]);
            tab.rows[dat[1]].cells[parseInt(dat[2]) + 1].childNodes[0].onchange();
        }
        else {
            document.getElementById(dat[0]).value = et[1];
            document.getElementById(dat[1]).value = et[2];
            //                    chkvalidation(dat[0],dat[1]);
            //                    fillcondition(dat[1],'5',dat[0]);
        }


    }
    try {
        shafilall(webid);
    }
    catch (ee) {
    }
}

function checkforsearch(cellno, val, tab, rownum, webid) {
    debugger;
    try {
        if (tab.rows[0].cells[cellno + 1].title.indexOf("searchmain") >= 0) {
            var qry = tab.rows[rownum].cells[cellno + 1].children[1].title.split("@@");
            var qry1 = qry[0];
            var cellen = tab.rows[0].cells.length;
            for (var i = 4; i < cellen; i++) {
                if (tab.rows[rownum].cells[i].children.length > 0) {
                    var id1 = tab.rows[0].cells[i].textContent;
                    id1 = "$id_" + id1.split(" ").join("_") + "";
                    try {
                        var id2 = "'" + tab.rows[rownum].cells[i].childNodes[0].value + "";
                        qry1 = qry1.replace(id1, id2);
                    } catch (err) {
                    }
                    ;
                }
            }

            $.get(localStorage.ipadrs + '/DisTemplateView?type=chkqry&qry=' + encodeURIComponent(qry1), function (responcejson) {
                if (responcejson != "") {
                    debugger;
                    if (responcejson == "no data") {
                        addToGrid('', '', webid);
                    }
                    else if (responcejson.indexOf("@") > 0) {
                        var data = responcejson.split("@");
                        tab.rows[0].cells[cellno + 1].children[0].value = data[1];
                        tab.rows[0].cells[cellno + 2].children[0].value = data[0];
                        addToGrid('', '', webid);
                    }
                    else {
                        if (tab.rows[rownum].cells[cellno + 1].children[0].value.trim() == "") {
                            tab.rows[rownum].cells[cellno + 1].children[1].onclick();
                        }
                        addToGrid('', '', webid);
                    }
                }
                else {

                }
            });

        }
        else if (tab.rows[0].cells[cellno - 2].title.indexOf("searchhdn") >= 0) {
            var qry = tab.rows[rownum].cells[cellno - 3].children[1].title.split("@@");
            var qry1 = qry[0];
            var cellen = tab.rows[0].cells.length;
            for (var i = 4; i < cellen; i++) {
                if (tab.rows[rownum].cells[i].children.length > 0) {
                    var id1 = tab.rows[0].cells[i].textContent;
                    id1 = "$id_" + id1.split(" ").join("_") + "";
                    try {
                        var id2 = "'" + tab.rows[rownum].cells[i].childNodes[0].value + "";
                        qry1 = qry1.replace(id1, id2);
                    } catch (err) {
                    }
                    ;
                }
            }

            $.get(localStorage.ipadrs + '/DisTemplateView?type=chkqry&qry=' + encodeURIComponent(qry1), function (responcejson) {
                if (responcejson != "") {
                    debugger;
                    if (responcejson == "no data") {
                        addToGrid('', '', webid);
                    }
                    else if (responcejson.indexOf("@") > 0) {
                        var data = responcejson.split("@");
                        tab.rows[0].cells[cellno - 2].children[0].value = data[1];
                        tab.rows[0].cells[cellno - 3].children[0].value = data[0];
                        addToGrid('', '', webid);
                    }
                    else {
                        if (tab.rows[rownum].cells[cellno - 3].children[0].value.trim() == "") {
                            tab.rows[rownum].cells[cellno - 3].children[1].onclick();
                        }
                        addToGrid('', '', webid);
                    }
                }
                else {

                }
            });
        }
        else {
            addToGrid('', '', webid);
        }
    }
    catch (ee) {
        addToGrid('', '', webid);
    }
}

function cleartextbox(id) {
    debugger;
    var webid = id.getAttribute("savewebformid");
    var tid = "textbox" + webid;
    var svid = "save" + webid;
    var fdiv = "finalmain" + webid;
    document.getElementById(tid).value = "";
    document.getElementById(svid).onclick();
    document.getElementById(fdiv).style.display = "none";

}

function outoffocus(id) {
//            alert("function is called");
    var webid = id.parentNode.parentNode.parentNode.parentNode.getAttribute("savewebformid");
    var sv = "save" + webid;
    addToGrid('', '', webid);
    document.getElementById(sv).onclick();

}

function addToGrid(bid, fff, swebid) {
    debugger;
//                alert(swebid);
    var wid = "txtworddole" + swebid;
    if (document.getElementById(wid).value != "1") {
        try {
            bid.style.display = "none";
        } catch (e) {

        }
        var sftable = "finaltable" + swebid;
        var nxttab = document.getElementById(sftable);
//                alert(nxttab.rows[nxttab.rows.length-1].cells[4].children[0].type);
        try {
            if (nxttab.rows.length > 1) {
                var rrflg = "0";
                for (var kl = 4; kl < nxttab.rows[nxttab.rows.length - 1].cells.length; kl++) {
                    if (nxttab.rows[nxttab.rows.length - 1].cells[kl].children[0].value.trim() == "" && nxttab.rows[nxttab.rows.length - 1].cells[kl].children[0].type == "text") {


                    }
                    else {
                        if (nxttab.rows[nxttab.rows.length - 1].cells[kl].children[0].value.trim() != "" && nxttab.rows[nxttab.rows.length - 1].cells[kl].children[0].type == "text") {
                            rrflg = "1";
                            break;
                        }
                    }
                }
                if (rrflg == "0") {
                    return;
                }
                else {
                    try {
                        if (nxttab.rows[0].cells[4].getAttribute("chkonfocus") != "1") {
//                           nxttab.rows[nxttab.rows.length-1].cells[4].children[0].focus();
                        }
                    }
                    catch (e) {
//                            nxttab.rows[nxttab.rows.length-1].cells[4].children[0].focus();
                    }
                    for (var i = 1; i < nxttab.rows.length - 2; i++) {
//                          var cellle=nxttab.row[i].cells.length;
                        var rflg = "0";
                        for (var jk = 4; jk < nxttab.rows[i].cells.length; jk++) {
                            if (nxttab.rows[i].cells[jk].children[0].value.trim() == "" && nxttab.rows[i].cells[jk].children[0].type == "text") {
//                      nxttab.rows[i].remove();

                            }
                            else {
                                if (nxttab.rows[i].cells[jk].children[0].value.trim() != "" && nxttab.rows[i].cells[jk].children[0].type == "text") {
                                    rflg = "1";
                                    break;
                                }

                            }
                        }
                        if (rflg == "0") {
                            nxttab.rows[i].remove();
                        }
                    }
                }
            }
            for (var i = 1; i <= nxttab.rows.length - 2; i++) {
//                  var cellle=nxttab.row[i].cells.length;
                for (var jk = 4; jk < nxttab.rows[i].cells.length; jk++) {
                    var rflg = "0";
                    if (nxttab.rows[i].cells[jk].children[0].value.trim() == "" && nxttab.rows[i].cells[jk].children[0].type == "text") {
//                      nxttab.rows[i].remove();

                    }
                    else {
                        if (nxttab.rows[i].cells[jk].children[0].value.trim() != "" && nxttab.rows[i].cells[jk].children[0].type == "text") {
                            rflg = "1";
                            break;
                        }
                    }
                }
                if (rflg == "0") {
                    nxttab.rows[i].remove();
                }
            }
        }
        catch (ee) {
//                  alert(ee);
        }
        var celllength = nxttab.rows[0].cells.length;
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
        var data = "<tr><td style='display:none'></td><td height='20' width='5%' style='display:none'><input type='button' onclick='addToGrid(this)' value='Add' class='btn2' ></td><td width='1%'>" + nxttab.rows.length + "</td>";
        data = data + "<td width='1%' align='center'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)' style='display:none'></span></td>";
        for (var j = 4; j < celllength; j++) {
            var lbl = nxttab.rows[0].cells[j].textContent;
            var lb = lbl;
            lbl = "id_" + lbl;
            //                      lbl=lbl.replace(" ","_");
            lbl = lbl.split(" ").join("_");
            var val = document.getElementById(lbl).value;
            if (nxttab.rows[0].cells[j].title.indexOf("combo") >= 0) {
                var terminal = document.getElementById(lbl);
                var selectedText = terminal.options[terminal.selectedIndex].text;
//                        alert(document.getElementById(lbl).innerHTML);
                data = data + "<td><select class='slctforgrid' onchange='onchangefun(this)' style='width:100%'><option value='1'>-</option>" + document.getElementById(lbl).innerHTML + "</select></td>";
//                        document.getElementById(lbl+"_"+j).value=val;
            }
            else if (nxttab.rows[0].cells[j].title.indexOf("searchmain") >= 0) {
                if (nxttab.rows[0].cells[j].getAttribute("chkonfocus") != "1") {
                    data = data + "<td><input onkeydown='searchData(this)' type='text' id='" + lbl + "" + j + "" + nxttab.rows.length + "' value='" + val + "' title='" + document.getElementById(lbl).title + "' class='inputwithsrchimg' placeholder='Type Here To Search' style='width:87%'><img class='srchimg' src='" + localStorage.ipadrs + "/images/search9.png' style='float:right;' title='" + document.getElementById(lbl).title.split("'").join("`") + "@@ ' onclick='pop(this,1)'>";
                }
                else {
                    data = data + "<td><input onkeydown='searchData(this)' onfocusout='outoffocus(this)' type='text' id='" + lbl + "" + j + "" + nxttab.rows.length + "' value='" + val + "' title='" + document.getElementById(lbl).title + "' class='inputwithsrchimg' placeholder='Type Here To Search' style='width:87%'><img class='srchimg' src='" + localStorage.ipadrs + "/images/search9.png' style='float:right;' title='" + document.getElementById(lbl).title.split("'").join("`") + "@@ ' onclick='pop(this,1)'>";
                }
            }
            else if (nxttab.rows[0].cells[j].title.indexOf("searchhdn") >= 0) {
                data = data + "<td style='display:none'><input type='text' id='" + lbl + "" + j + "" + nxttab.rows.length + "' value='" + val + "' title='" + document.getElementById(lbl).title + "' onchange='onchangefun(this)' placeholder='Type Here'></td>";
            }
            else {
                data = data + "<td><input type='text' value='" + val + "' onchange='onchangefun(this)' class='inputonchnge' style='width:98%' placeholder='Type Here'></td>";
            }
        }
//                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td></tr>";
//                    data=data+"<td style='padding:0px;' align='center'><input type='checkbox' checked='true'  style='cursor:pointer;width:auto;' class='btn2'></td></tr>";
        data = $(data);
        data.appendTo(nxttab);
        try {
            if (nxttab.rows[0].cells[4].getAttribute("chkonfocus") != "1") {
//                nxttab.rows[nxttab.rows.length-1].cells[4].children[0].focus();
            }
        }
        catch (e) {
//                nxttab.rows[nxttab.rows.length-1].cells[4].children[0].focus();
        }
        try {
            var divObject = document.getElementById('fnltbldiv1');
            divObject.scrollTop = divObject.scrollHeight;
        }
        catch (ee) {
        }

        try {
            for (var j = 4; j < celllength; j++) {
                var lbl = nxttab.rows[0].cells[j].textContent;
//                    lbl="id_"+lbl;
//                    lbl=lbl.split(" ").join("_");
                if (nxttab.rows[0].cells[j].title.indexOf("search") < 0) {
                    if (nxttab.rows[nxttab.rows.length - 1].cells[j].children.length > 0) {
//                        alert(nxttab.rows[nxttab.rows.length-1].cells[j].childNodes[0].value);
                        if (fff != "1") {
//                        nxttab.rows[nxttab.rows.length-1].cells[j].childNodes[0].onchange(); 
                        }
                    }
                }
//                    else{
//                    document.getElementById(lbl).value="";
//                    }

            }
        }
        catch (err) {
//                alert(err);
        }
        showbuttons(swebid);
        applydisable(swebid);
        for (var j = 1; j < celllength; j++) {
            var lbl = nxttab.rows[0].cells[j].textContent;
            lbl = "id_" + lbl;
            lbl = lbl.split(" ").join("_");
            if (nxttab.rows[0].cells[j].title.indexOf("combo") >= 0) {
                document.getElementById(lbl).selectedIndex = 0;
            }
            else {
                try {
                    document.getElementById(lbl).value = "";
                }
                catch (e) {
                }
            }

        }
        try {
            var ft = document.getElementById(sftable);
            if (nxttab.rows[0].cells[4].getAttribute("chkonfocus") != "1") {
//           ft.rows[ft.rows.length-1].cells[4].children[0].focus(); 
            }
        }
        catch (e) {

        }
        try {
            var tab = document.getElementById(sftable);
            for (var m = 1; m < tab.rows.length; m++) {
                tab.rows[m].cells[2].textContent = m;
            }
        }
        catch (ee) {
        }

    }
}
function showbuttons(id) {
    debugger;
    var sftable = "finaltable" + id;
    var word = "txtworddole" + id;
    var prec = "btnprec" + id;
    var tab = document.getElementById(sftable);
    if (tab.rows.length > 1) {
        try {
            if (document.getElementById(word).value == "1") {
                document.getElementById("save").style.display = "inline-block";
            }
            else {
                document.getElementById("save").style.display = "none";
            }
            document.getElementById(prec).style.display = "inline-block";
        }
        catch (e) {
        }
    }
}



function showForm(path) {
    debugger;
    var inf = document.getElementById("finfo");
    var path = localStorage.ipaddres + "" + path.id;
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

function displaypopup(id) {

    debugger;
    document.getElementById(id).style.display = "block";
//        $("#"+id.id).dialog({
//            resizable: false,
//            height: '250',
//            width: '80%',
//            modal: true,
//            top:'0px',
//            buttons: {
//                "Cancel": function() {
//                    $(this).dialog("close");
//                }
//            }
//        });
    //document.getElementById("txtmrnum").focus();

}
function showpop(id) {
    debugger;
    var webid = id.getAttribute("savewebformid");
    var pop = "popdiv" + webid;
    try {
        displaypopup(pop);
    }
    catch (ee) {
        alert(ee);
    }
    var tbtn = "testbtn" + webid;
    document.getElementById(tbtn).id = id.id;

}

function closetemp(id) {
    try {
        document.getElementById("popdiv" + id.getAttribute("savewebformid")).style.display = "none";
    }
    catch (ee) {

    }
}
function savetemp1(id) {
    debugger;
    var webid = id.getAttribute("savewebformid");
    var word = "txtworddole" + webid;
    if (document.getElementById(word).value == "1") {
        try {
            var tem = "templatediv" + webid;
            var div = document.getElementById(tem);
            if (id.id.indexOf("btnprec") >= 0) {
                var tem = "templatediv" + webid;
                var div = document.getElementById(tem);
                var len = div.rows.length;
                for (var i = 0; i < len - 1; i++) {
                    if ((div.rows[i].cells[i + 1].children[0].type == 'text') && (div.rows[i].cells[i + 1].children[0].value == "")) {
                        alert(div.rows[i].cells[i].innerHTML + " should not be empty");
                        return false;

                    } else {
                        if ((div.rows[i].cells[i + 1].children[0].type == 'text') && (div.rows[i].cells[i + 1].children[0].value != "")) {
                            var name = div.rows[i].cells[i + 1].children[0].value;
                            var ta = document.getElementById(div.rows[i].cells[i + 1].children[0].getAttribute("tabid"));
                            for (var i = 1; i < ta.rows.length; i++) {
                                if (name == ta.rows[i].cells[1].textContent) {
                                    alert(name + " is Already Given Please Select Other one..");
                                    return false
                                }
                            }
                        }
                        return true;
                    }

                }
            }

        }
        catch (e) {

        }
        return true;
    } else {

        if (id.id.indexOf("btnprec") >= 0) {
            var tem = "templatediv" + webid;
            var div = document.getElementById(tem);
            var len = div.rows.length;
            for (var i = 0; i < len - 1; i++) {
                if ((div.rows[i].cells[i + 1].children[0].type == 'text') && (div.rows[i].cells[i + 1].children[0].value == "")) {
                    alert(div.rows[i].cells[i].innerHTML + " should not be empty");
                    return false;

                } else {
                    if ((div.rows[i].cells[i + 1].children[0].type == 'text') && (div.rows[i].cells[i + 1].children[0].value != "")) {
                        var name = div.rows[i].cells[i + 1].children[0].value;
                        var ta = document.getElementById(div.rows[i].cells[i + 1].children[0].getAttribute("tabid"));
                        for (var i = 1; i < ta.rows.length; i++) {
                            if (name == ta.rows[i].cells[1].textContent) {
                                alert(name + " is Already Given Please Select Other one..");
                                return false
                            }
                        }
                    }
                    return true;
                }

            }
        } else {
            var fid = "finaltable" + id.getAttribute("savewebformid");
            var finaldiv = document.getElementById(fid);
            var finallen = finaldiv.rows.length;
            for (var j = 1; j < finallen; j++) {
                var Cells = finaldiv.rows[j].cells.length;
                for (var k = 4; k < Cells; k++) {
                    if ((finaldiv.rows[j].cells[k].getAttribute("chkmandatory") == "1") && (finaldiv.rows[j].cells[3].childNodes[0].checked == true) && (finaldiv.rows[j].cells[k].children[0].value == "")) {
                        alert(finaldiv.rows[0].cells[k].innerHTML.replace("hdn", "") + " should not be Empty");
                        finaldiv.rows[j].cells[k].children[0].focus();
                        return false;

                    }

                }
            }
            return true;
        }
    }
}
function savetemp(id) {
    debugger;
//                alert(id);
//                return;
    var finaldata = "";
//                id.setAttribute("disabled","true");
    var flg = savetemp1(id);
    var webid = id.getAttribute("savewebformid");
    var gwid = "txtgenid" + webid;
    var fid = "finaltable" + webid;
    var swid = "save" + webid;
    var word = "txtworddole" + webid;
//                alert(id.disabeld);
    if (id.disabeld) {
        return;
    }
    if (flg == true) {
        var typevalue = "new";
        var updateid = "";
        if (id.value == "Update") {
            typevalue = "edit";
        }
        else if (id.value != "Update Exist Temp") {
            typevalue = "new";
            id.disabeld = true;
//                        document.getElementById(swid).value="Update";
        }
//                    if(id.value=="Confirm"){
//                        id.value="Update";
//                        id.disabeld=true;
//                    }
//                var webid=document.getElementById("tempwebformid").value;
        $.get(localStorage.ipadrs + '/DisTemplateView?type=getdata&webid=' + webid + '&idflg=' + id.id, function (responceJson) {
            if (responceJson != null) {

                var data = responceJson;
                var data1 = data.split("-->");
                for (var i = 0; i < data1.length; i++) {
                    var data2 = data1[i].split("@");
                    if (data2[0] == "text" || data2[0] == "combo" || data2[0] == "time" || data2[0] == "hidden") {
                        if (id.id.indexOf("btnprec") >= 0 && data2[1].toUpperCase().indexOf("SPEID") < 0 && data2[1].toUpperCase().indexOf("DOCID") < 0 && data2[1].toUpperCase().indexOf("MRNO") < 0) {
                            data2[1] = data2[1] + "" + webid;
                            finaldata = finaldata + "-->" + document.getElementById(data2[1]).value.replace("@", "at_rate") + "@" + data2[2] + "@" + data2[3] + "@" + data2[0];
                        }
                        else {

                            finaldata = finaldata + "-->" + document.getElementById(data2[1]).value.replace("@", "at_rate").trim() + "@" + data2[2] + "@" + data2[3] + "@" + data2[0];
                        }
                    }
                    else if (data2[0] == "date") {
                        finaldata = finaldata + "-->to_date('" + document.getElementById(data2[1]).value + "','dd/mm/yyyy')" + "@" + data2[2] + "@" + data2[3] + "@" + data2[0];
                    }
                    else if (data2[0] == "search text") {
                        var data3 = data2[1].split("<--");
                        finaldata = finaldata + "-->" + document.getElementById(data3[1]).value.replace("@", "at_rate") + "@" + data2[2] + "@" + data2[3] + "@" + data2[0];
                    }
                    else if (data2[0] == "radio") {
                        if (document.getElementById(data2[1]).checked == true) {
                            finaldata = finaldata + "-->" + document.getElementById(data2[1]).value + "@" + data2[2] + "@" + data2[3] + "@" + data2[0];
                        }
                    }
                }
            }




            finaldata = encodeURIComponent(finaldata);
            var tab = document.getElementById(fid);
            if (document.getElementById(word).value != "1") {
                for (var ik = 1; ik < tab.rows.length; ik++) {
                    var rflg = "0";
                    var celll = tab.rows[ik].cells.length;
                    for (var ij = 4; ij < tab.rows[ik].cells.length - 1; ij++) {
                        if (tab.rows[ik].cells[ij].children[0].value.trim() == "" && tab.rows[ik].cells[ij].children[0].type == "text") {


                        }
                        else {
                            if (tab.rows[ik].cells[ij].children[0].value.trim() != "" && tab.rows[ik].cells[ij].children[0].type == "text") {
                                rflg = "1";
                                break;
                            }
                        }
                    }
                    if (rflg == "0") {
                        tab.rows[ik].remove();
                    }
                }
//              alert(tab.rows.length);
                if (tab.rows.length == 1) {
                    addToGrid('', '1', id.getAttribute("savewebformid"));
//                      return;

                }
                if (tab.rows.length == 2) {
                    var rflg = "0";
                    var cellle = tab.rows[1].cells.length - 1;
                    for (var i = 4; i < cellle; i++) {
                        if (tab.rows[1].cells[i].children[0].value.trim() == "" && tab.rows[1].cells[i].children[0].type == "text") {
//                      addToGrid('','1');
//                    tab.rows[1].remove();
//                      return;
                        }
                        else {
                            if (tab.rows[1].cells[i].children[0].value.trim() != "" && tab.rows[1].cells[i].children[0].type == "text") {
                                rflg = "1";
                                break;
                            }
                        }
                    }
                    if (rflg == "0") {
                        tab.rows[1].remove();
                    }

                }

                for (var m = 1; m < tab.rows.length; m++) {
                    tab.rows[m].cells[2].textContent = m;
                }
            }


            var table = $('#' + fid).tableToJSON();
            var grddtls = (JSON.stringify(table));
//                    alert(grddtls);

            grddtls = grddtls.replace(/\+/g, '_pp');
            grddtls = encodeURIComponent(grddtls);
            addToGrid("", "1", webid);
            debugger;
//                    var typevalue="new";
//                    var updateid="";

//                    if(id.value=="Update"){
//                        typevalue="edit";
//                    }
            if (id.value == "Update Exist Temp") {
                debugger;
                typevalue = "edit";
                var ltabid = $('#txtleftfirsttab' + webid).val();
//                        alert(ltabid);
                var ltab = document.getElementById(ltabid);
                if (ltab.rows.length > 1) {
                    for (var k = 1; ltab.rows.length - 1; k++) {
                        if (ltab.rows[k].cells[0].childNodes[0].type == "checkbox") {
                            if (ltab.rows[k].cells[0].childNodes[0].checked == true) {
                                updateid = ltab.rows[k].cells[0].childNodes[0].id;
                                break;
                            }
                        }
                    }
                }
            }
//                    else{
//                        typevalue="new";
//                        document.getElementById(swid).value="Update";
//                    }
//                    alert(updateid);
            var genune = document.getElementById(gwid).value;
//                    alert(genune);
            if (id.value != "Update Exist Temp") {
//                    if(typevalue=="edit" && genune==""){
//                    var ff=getallow(typevalue,genune.trim(),gwid);
//                    if(ff){
////                        alert(document.getElementById(gwid).value);
//                        document.getElementById(swid).onclick();
//                        return;
//                    }
//                    else{
//                        
//                    }
//                }
            }



            //                    var unicid=document.getElementById("txtunicid").value;
            //                    var clmid=document.getElementById("id_clmid").value;
            var unicid = "";
            var defalt = "";
            if (document.getElementById(word).value == "1") {

//                     var editor =  textboxio.replace('#textbox');
//                    defalt = editor.content.get();
                defalt = $('#textbox' + webid).val();
                defalt = defalt.split("'").join("`");
                defalt = encodeURIComponent(defalt);
            }
            var tempremarks = $('#tempremarks').val();
            tempremarks = encodeURIComponent(tempremarks);
            var mobile = "0";
            var temptype = "1";
            try {
                var rdbspl = "rdbspl" + webid;
                var rdbhosp = "rdbhosp" + webid;
                var rdbmyself = "rdbmyself" + webid;
                if (document.getElementById(rdbspl).checked == true) {
                    var temptype = "1";
                }
                else if (document.getElementById(rdbhosp).checked == true) {
                    var temptype = "2";
                }
                else if (document.getElementById(rdbmyself).checked == true) {
                    var temptype = "3";
                }
            } catch (e) {

            }
            document.getElementById("hdnid").value = id.id;

            var path = localStorage.ipadrs + '/DisTemplateView';
            var encounterid = document.getElementById("encounterid").value;
            if (document.getElementById("txteditflg").value == "1") {
                encounterid = document.getElementById("editencid").value;
            }
            var episodeid = document.getElementById("episodeid").value;
            $.ajax({
                url: path,
                type: "POST",
                data: 'type=save&webid=' + webid + '&finaldata=' + finaldata + '&typevalue=' + typevalue + '&genune=' + genune + '&grddtls=' + grddtls + '&unicid=' + unicid + '&idflg=' + id.id + '&worddata=' + defalt + '&mobile=1&remarks=' + tempremarks + '&temptype=' + temptype + '&updateid=' + updateid + '&encounterid=' + encounterid + '&episodeid=' + episodeid,
                dataType: "text/html",
                success: function (responceJson) {
                    debugger;
//            alert(responceJson);
                    debugger;
                    if (responceJson.indexOf("@") >= 0) {
                        var genidd = responceJson.split("@");
                        tempAlert("Record Inserted Successfully", 3000);
                        document.getElementById("txtgenid").value = "";
                        var docid = localStorage.docid;
                        var mrno = localStorage.mrno;
                        var theme = "";
                        theme = encodeURIComponent(theme);
                        var speid = localStorage.speid;
                        var oid = document.getElementById("id_orid").value;
//                  var webid=document.getElementById("tempwebformid").value;
                        var id = document.getElementById("hdnid").value;
//                  alert(id);
                        if (id.id == "btnprec") {
//                                    var path="<%=request.getContextPath()%>/formview?webformid="+webid+"&mrno="+mrno+"&docid="+docid+'&theme='+theme+'&speid='+speid+'&uid='+genidd[1]+'&orderwebid='+oid;
//                                    location.href=path;
                            document.getElementById("innertemplate").style.display = "none";
                            document.getElementById("positionleft").style.display = "none";
//                                            document.getElementById("positionright").style.display="block";
//                                             getdatadefault();

                        }
                        else {


                            getdata();
                        }

                    }
                    else if (responceJson == "2") {
//                                tempAlert("Record Updated Successfully","2000");
                        document.getElementById("txtgenid").value = "";

                        getdatadefault();

                        //                                savegrid();
                    }
                    else {
                        alert(responceJson);
                    }
                },
                error: function (error) {
                    debugger;
                    if (error.statusText == "OK") {
                        var responceJson = error.responseText;
                        if (responceJson.indexOf("@") >= 0) {
                            var genidd = responceJson.split("@");
//                                tempAlert("Record Inserted Successfully",3000);
                            document.getElementById(gwid).value = "";
                            var docid = localStorage.docid;
                            var mrno = localStorage.mrno;
                            var theme = '';
                            theme = encodeURIComponent(theme);
                            var speid = localStorage.speid;
                            var oid = document.getElementById("id_orid").value;
//                  var webid=document.getElementById("tempwebformid").value;
                            var id1 = document.getElementById("hdnid").value;
//                  alert(id);
                            if (id1.indexOf("btnprec") >= 0) {
//                                    var path="<%=request.getContextPath()%>/formview?webformid="+webid+"&mrno="+mrno+"&docid="+docid+'&theme='+theme+'&speid='+speid+'&uid='+genidd[1]+'&orderwebid='+oid;
//                                    location.href=path;
                                alert("Template Created Successfully");
                                var pid = "popdiv" + webid;
                                $('#' + pid).dialog("close");
                                var path = document.getElementById("hdnpath").value;


                            }
                            else {
                                if (id.value == "Update Exist Temp") {
//                                    var path="<%=request.getContextPath()%>/formview?webformid="+webid+"&mrno="+mrno+"&docid="+docid+'&theme='+theme+'&speid='+speid+'&uid='+genidd[1]+'&orderwebid='+oid;
//                                    location.href=path;  
//document.getElementById(swid).value="Confirm";
                                }
                                else {

//                var path="<%=request.getContextPath()%>/admin/TemplateOrders.jsp?webformid="+oid+"&mrno="+mrno+"&docid="+docid+'&theme='+theme;
////                alert(path);
//                location.href=path;
//                    document.getElementById("innertemplate").style.display="none";
//                                              document.getElementById("innertemplate").style.display="none";
//                                            document.getElementById("positionleft").style.display="none";
//                                            document.getElementById("positionright").style.display="block";

                                    if (document.getElementById(word).value == "1") {
                                        tempAlert("Record Inserted Successfully", 2000);
                                        document.getElementById(gwid).value = genidd[1];
                                        document.getElementById(swid).value = "Update";
                                    } else {
                                        document.getElementById(gwid).value = genidd[1];

                                        if (document.getElementById(swid).value == "Confirm") {
                                            document.getElementById(swid).disabeld = false;
//                                                     alert(document.getElementById(swid).disabeld);
                                            document.getElementById(swid).value = "Update";
//                                                     alert(gwid+","+document.getElementById(gwid).value+","+"save called");
                                            document.getElementById(swid).onclick();

                                        }
                                        document.getElementById(swid).value = "Update";
                                        addToGrid("", "1", webid);
                                        for (var m = 1; m < tab.rows.length; m++) {
                                            tab.rows[m].cells[2].textContent = m;
                                        }
//                                            addToGrid("","1",webid);
                                    }
//                                             getdatadefault();

                                }
                            }

                        }
                        else if (responceJson == "2") {
//                                tempAlert("Record Updated Successfully","2000");
                            document.getElementById(gwid).value = "";
//                                 document.getElementById("innertemplate").style.display="none";
//                                            document.getElementById("positionleft").style.display="none";
//                                            document.getElementById("positionright").style.display="block";
//                                             getdatadefault();
                            //                                savegrid();
                        }
                        else {
                            alert(responceJson);
                        }
                    }
                }
            });

        });
    }
}
function showsaveall(id) {
    debugger;

    debugger;

    $("#savealldiv").dialog({
        resizable: false,
        height: '400',
        width: '80%',
        modal: true,
        top: '0px',
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });
    if (document.getElementById("btnsaveall").value != "Update Temp") {
        document.getElementById("savealledit").value == "0";
    }
    else {
        if (document.getElementById("savealledit").value == "1") {

//                 document.getElementById("savealltemp").value=id.getAttribute("tempname");
        }
//                    document.getElementById("btn_allsv").onclick();
    }
    //document.getElementById("txtmrnum").focus();

}
function saveall(id) {
    debugger;
    var webchain = document.getElementById("webchain").value;
    var web = webchain.split("@");
    var dtls = "";
    var table = "";

    var tempname = document.getElementById("savealltemp").value;
    if (document.getElementById("btn_allsv").value != "") {
        if (tempname.trim() == "") {
            alert("Template Name is Mandatory..");
            document.getElementById("savealltemp").focus();
            return;
        }
    }
    var temptype = "1";
    if (document.getElementById("svallfms").checked == true) {
        temptype = "1";
    }
    else if (document.getElementById("svallfs").checked == true) {
        temptype = "2";
    }
    else if (document.getElementById("svallfh").checked == true) {
        temptype = "3";
    }
    var docid = localStorage.docid;
    var speid = localStorage.speid;


    for (var i = 0; i < web.length; i++) {
        if (web[i] != "") {
            var fid = "finaltable" + web[i];
            var word = "txtworddole" + web[i];
//                alert(word);
            if (document.getElementById(word).value != "1") {
                var tab = document.getElementById(fid);
                if (tab.rows.length > 1 && tab.rows[1].cells[4].childNodes[0].value != "") {
                    table = $('#' + fid).tableToJSON();
                    var grddtls = (JSON.stringify(table));
                    grddtls = grddtls.replace(/\+/g, '_pp');
                    grddtls = encodeURIComponent(grddtls);
                    dtls = dtls + "-->" + fid + "<--" + grddtls + "<--0<--" + web[i];
                }
            }
            else {
                var grddtls = $('#textbox' + web[i]).val();
                if (grddtls.trim() != "") {
                    grddtls = grddtls.split("'").join("`");
                    grddtls = encodeURIComponent(grddtls);

                    dtls = dtls + "-->" + fid + "<--" + grddtls + "<--1<--" + web[i];
                }
            }
        }
    }
    var editid = "";
    if (document.getElementById("savealledit").value == "1") {
        editid = document.getElementById("savealleditid").value;
    }
    debugger;
//            document.getElementById("mydiv1").style.display="block";
    var path = localStorage.ipadrs + '/DisTemplateView';
    $.ajax({
        url: path,
        type: 'POST',
        data: 'type=saveall&savealldata=' + dtls + '&tempnm=' + tempname + '&temptype=' + temptype + '&docid=' + docid + '&speid=' + speid + '&editid=' + editid,
        dataType: 'text/html',
        success: function (responcejson) {

        },
        error: function (error) {
            debugger;
            if (error.statusText == "OK") {
                var responceJson = error.responseText;
                if (responceJson.indexOf("ERROR") >= 0) {
                    document.getElementById("mydiv").style.display = "none";
                }
                else {
                    document.getElementById("mydiv").style.display = "none";
                    alert(tempname + " Template is Created");
                    $('#savealldiv').dialog("close");
                    showall();
                }
            }
        }


    });

}
function showall() {
    var docid = localStorage.docid;
    var speid = localStorage.speid;

    $.get(localStorage.ipadrs + '/DisTemplateView?type=showallsave&docid=' + docid + '&speid=' + speid, function (responcejson) {
        if (responcejson != "ERROR") {
            document.getElementById("showalldiv").innerHTML = responcejson;
            if (responcejson != "") {
                document.getElementById("dummydiv").style.display = "none";
                document.getElementById("alltemplates").appendChild(document.getElementById("showalldiv"));
            }
//                         $("#showalldiv").dialog({
//                        resizable: false,
//                        height: '400',
//                        width: '80%',
//                        modal: true,
//                        top:'0px',
//                        buttons: {
//                            "Cancel": function() {
//                                $(this).dialog("close");
//                        }
//                    }
//                }
        }
        else {
            alert(responcejson);
        }
    });
}

function deleteall(id) {
    debugger;
    var delid = id.getAttribute("deleteid");
    var tempnm = id.getAttribute("tempnm");
//                var tempnm=id.parentNode.parentNode.cells[0].textContent;
    if (confirm("Please Confirm that Do you Whant To delete " + tempnm + " Template") == true) {
//                document.getElementById("mydiv1").style.display="block";
        var webchain = document.getElementById("webchain").value;
        $.get(localStorage.ipadrs + '/DisTemplateView?type=delalltemp&delid=' + delid + '&webchain=' + webchain, function (responcejson) {
            if (responcejson != "" && responcejson != null) {
                if (responcejson == "1") {
                    alert(tempnm + " Template Deleted Successfully...");
                }
                else {
                    alert("Template is Not deleted Due to " + responcejson);
                }
                document.getElementById("mydiv").style.display = "none";
                $('#savealldiv').dialog("close");
                showall();
            }
        });
    }
}
function populatesubfun(allid, webid) {
    $.get(localStorage.ipadrs + '/DisTemplateView?type=fillalldata&webid=' + webid + '&idstring=&finaldata=&nextgid=finaltable&genid=' + allid + '&svall=', function (responcejson) {
        debugger;

        if (responcejson != null && responcejson.length > 0) {
            debugger;
//                        alert(document.getElementById(word).value);
            var word = "txtworddole" + webid;
            var sftab = "finaltable" + webid;
            var tbox = "textbox" + webid;
            var sv = "save" + webid;
            if (document.getElementById(word).value == "0") {
                var nxttab = "";

                nxttab = document.getElementById(sftab);
                var data = "";
                var celllength = nxttab.rows[0].cells.length;
                var cols = "";
                var p = 4;
                var q = 0;

                for (var j = p; j < celllength - parseInt(q); j++) {
                    var lbl = nxttab.rows[0].cells[j].textContent;
                    lbl = "id_" + lbl;
                    //                      lbl=lbl.replace(" ","_");
                    lbl = lbl.split(" ").join("_");
                    cols = cols + "@" + lbl + "-->" + nxttab.rows[0].cells[j].title;
                }

                $('#' + sftab).find("tr:gt(0)").remove();



                for (var k = 0; k < responcejson.length; k++) {
                    var cmblbl = "";

                    if (k == responcejson.length - 1) {
                        data = "<tr><td style='display:none'></td><td height='20' style='display:none'><input type='button' value='Add' class='btn2' onclick='addToGrid(this)'></td><td width='1%'>" + (k + 1) + "</td><td align='center' width='1%'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)'></span></td>";
                    }
                    else {
                        data = "<tr><td style='display:none'></td><td height='20' style='display:none'><input type='button' value='Add' class='btn2' onclick='addToGrid(this)' style='display:none'></td><td width='1%'>" + (k + 1) + "</td><td align='center' width='1%'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)'></span></td>";
                        nxttab.rows[0].cells[1].childNodes[0].style.display = "none";
                    }




                    var cl = cols.split("@");
                    for (var l = 1; l < cl.length; l++) {
                        var cl2 = cl[l].split("-->");
                        if (cl2[1].indexOf("combo") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td><select id='" + cl2[0] + "_" + k + "' onchange='onchangefun(this)' style='width:100%'>" + document.getElementById(cl2[0]).innerHTML + "</select></td>";
                            cmblbl = cmblbl + "-->" + cl2[0] + "_" + k + "@" + responcejson[k][cl1];
                        }
                        else if (cl2[1].indexOf("text") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td><input type='text' style='width:98%' value='" + responcejson[k][cl1] + "' onchange='onchangefun(this)' placeholder='Type Here'></td>";
                        }
                        else if (cl2[1].indexOf("searchmain") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            if (cl2[1].indexOf(":") >= 0) {
                                var ser = cl2[1].split(":");
                            }
                            data = data + "<td><input onkeydown='searchData(this)' type='text' value='" + responcejson[k][cl1] + "' class='inputwthimg' placeholder='Type Here To Search' style='width:87%'><img src='" + localStorage.ipadrs + "/images/search9.png' style='float:right;' class='btn1 srchimg' title='" + ser[1].split("'").join("`") + "@@ ' onclick='pop(this,1)'></td>";
                        }
                        else if (cl2[1].indexOf("searchhdn") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td style='display:none'><input type='text' value='" + responcejson[k][cl1] + "' class='inputwthimg' onchange='onchangefun(this)' placeholder='Type Here'></td>";

                        }
                        else {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td><label>" + responcejson[k][cl1] + "<label></td>";
                        }

                    }


                    data = data + "</tr>";
                    data = $(data);
                    data.appendTo(nxttab);
                    var cmblbl1 = cmblbl.split("-->");
                    for (var n = 1; n < cmblbl1.length; n++) {
                        var cmb = cmblbl1[n].split("@");
                        document.getElementById(cmb[0]).value = cmb[1];
                    }


                }
                document.getElementById(sv).onclick();
            }

            //For Worddole is checking..
            else {

                var defualt = "";
                for (var k = 0; k < responcejson.length; k++) {

                    defualt = defualt + '<br/>' + responcejson[k]['KEY_VALUE'];
                }
//                                
                if (defualt != "")
                {
                    document.getElementById(tbox).value = defualt.split("<br\>").join("\n").split("<br/>").join("\n").split("`").join("'");
                }

                if (document.getElementById(tbox).value != "") {
                }
                else {
                    var mm = "finalmain" + webid;
                    document.getElementById(mm).style.display = "none";
                }
                document.getElementById(sv).onclick();
            }
            var flmain = "finalmain" + webid;
            document.getElementById(flmain).style.display = "block";
            document.getElementById("mydiv").style.display = "none";
            $('#showalldiv').dialog("close");
        }
        else {
            document.getElementById("mydiv").style.display = "none";
        }
    });
}

function showedit(id) {
    document.getElementById('div' + id.getAttribute("allid")).style.display = "block";
}
function dontshowedit(id) {
    document.getElementById('div' + id.getAttribute("allid")).style.display = "none";
}
function populateall(id, flg) {
    debugger;
//            if(id.which == 3)
//      {
//            alert("Right mouse button clicked on element with id myId");
//      }
//      return;
    if (id.getAttribute("showtag") != "1") {
        document.getElementById("mydiv").style.display = "block";
        var allid = "";
        var webchain = document.getElementById("webchain").value;
        var docid = document.getElementById("txtdocid").value;
        var mrno = document.getElementById("txtmrno").value;
        var mskflg = "1";

        if (flg == "1") {
            allid = id.id;
            document.getElementById("btnsaveall").value = "Update Temp";
            document.getElementById("savealledit").value = "1";
            document.getElementById("savealleditid").value = id.id;
            document.getElementById("savealltemp").value = id.getAttribute("tempname");
//                    alert(id.getAttribute("tempname"));
        }
        else {
            id.setAttribute("class", "col-sm-12 divrfirst grdtr alltempActive")
            id.setAttribute("showtag", "1");
            allid = id.getAttribute("allid");
            document.getElementById("btnsaveall").value = "Save Whole Template";
            document.getElementById("savealledit").value = "0";
            document.getElementById("savealleditid").value = "";
        }
        var web = webchain.split("@");
        for (var ij = 0; ij < web.length; ij++) {
            if (web[ij] != "") {
                var webid = web[ij];
                populatesubfun(allid, webid);

            }
        }
    }
    else {
//                    id.addClass("alltempActive");
        id.setAttribute("class", "col-sm-12 divrfirst grdtr btn2");
        var webchain = document.getElementById("webchain").value;
        var web = webchain.split("@");
        for (var ij = 0; ij < web.length; ij++) {
            if (web[ij] != "") {
                var webid = web[ij];
                cleartable(webid);

            }
        }
    }
}

function cleartable(webid) {
    var word = "txtworddole" + webid;
    var sv = "save" + webid;
    var ftab = "finaltable" + webid;
    var tbox = "textbox" + webid;
    var fmain = "finalmain" + webid;
    if (document.getElementById(word).value != "1") {
        $('#' + ftab).find("tr:gt(0)").remove();
        document.getElementById(sv).onclick();
        document.getElementById(fmain).style.display = "none";

    }
    else {
        document.getElementById(tbox).value = "";
        document.getElementById(sv).onclick();
        document.getElementById(fmain).style.display = "none";
    }
}

function namecheck(id) {
    debugger;
    var name = id.value;
    if (id.getAttribute("tabid") != "") {
        var tab = document.getElementById(id.getAttribute("tabid"));
        for (var i = 1; i < tab.rows.length; i++) {
            if (tab.rows[i].cells[1].textContent.toUpperCase() == name.toUpperCase()) {
                alert(name + " is Already Exist Please Give Other Template name..");
                return;
            }
        }
    }
}

function getallow(tvalue, gid, gwid) {
    debugger;
    if (tvalue == "edit" && gid.trim() == "") {
        gid = document.getElementById(gwid).value;
//                alert(gid);
        var val = checktrue(gwid);
//                alert(val);
        if (val != "") {
            return true;
        }
    }
    else {
        return true;

    }

}
function checktrue(gwid) {
    var val = "";
    while (document.getElementById(gwid).value == "") {
        var start = new Date().getTime();
        var end = start;
        while (end < start + 5000) {
            end = new Date().getTime();
        }
        val = document.getElementById(gwid).value;
        alert(gwid + "," + val);
    }
    return val;
}


function tempAlert(msg, duration)
{
    debugger;
    var el = document.createElement("div");
    el.setAttribute("style", "position:absolute;top:40%;left:50%;background-color:#C1DDF5; padding:30px;border:2px solid #A0C6E6; border-radius:5px;");
    el.innerHTML = msg;
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
}

function loadHeader(id) {
    debugger

//                var webid=document.getElementById("tempwebformid").value;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=fill&webid=' + id, function (responcejson) {
        if (responcejson != null && responcejson != "") {
            debugger;
            if (responcejson.indexOf("-->") >= 0) {
                var finalstr = responcejson.split("-->");
                for (var i = 0; i < finalstr.length; i++) {
                    var fin = finalstr[i].split("@");
                    if (fin != "") {
                        var txtuser = document.getElementById("txtuser").value;
                        fin[2] = fin[2].toLowerCase().split("$mrno").join("txtmrno").split("$docid").join("txtdocid").split("$speid").join("txtspeid").split("$user").join("txtuser").split("$locid").join("txtlocid");
                        document.getElementById(fin[1]).value = document.getElementById(fin[2]).value;
                    }



                }
            }
        }
    });
    addToGrid('', '', id);
}

function loadGenid(id) {

//                var docid=document.getElementById("txtdocid").value;
//                var mrno=document.getElementById("txtmrno").value;
//                $.get('<%=request.getContextPath()%>/DisTemplateView?type=loadgenid&webid='+webid+'&mrno='+mrno+'&docid='+docid,function(responcejson){
//                    if(responcejson!=null){
//                        debugger;
//                        document.getElementById("txtgenid").value=responcejson;
    loadFinaltable('', '', id);
    loadTemp(id);
    addToGrid('', '', id);
    displayfinaltable(id);
//                    }
//                });
}
function loadTemp() {
    debugger;
    var uid = document.getElementById("id_uid").value;
//                alert(uid);
    if (uid != "null") {
        var id = document.getElementById(uid);
        id.checked = true;
        id.onchange();
//                    addToGrid();
//                    var tabid=id.parentNode.parentNode.parentNode.parentNode.id;
//                    alert(tabid);
//                    debugger;
//                     while(tabid!="finaltable"){
//                         var tab=document.getElementById(tabid);
//for(var i=0;i<tab.rows.length;i++){
//                        if(tab.rows[i].cells[0].childNodes.length>0){
//                            if(tab.rows[i].cells[0].childNodes[0].type=="checkbox"){
//                               tab.rows[i].cells[0].childNodes[0].checked=true;
//                               tab.rows[i].cells[0].childNodes[0].onchange(); 
//                            }
//                        }
//                    }
//                    tabid=tab.title;
//                    }
    }

}

function checktable(tabid) {
    debugger;
    var tab = document.getElementById(tabid);
    for (var i = 0; i < tab.rows.length; i++) {
        if (tab.rows[i].cells[0].childNodes.length > 0) {
            if (tab.rows[i].cells[0].childNodes[0].type == "checkbox") {
                tab.rows[i].cells[0].childNodes[0].checked = true;
                tab.rows[i].cells[0].childNodes[0].onchange();
            }
        }
    }
}

function edit(id) {
    debugger;
    var webid = id.parentNode.parentNode.parentNode.parentNode.getAttribute("savewebformid");
    var genid = "txtgenid" + webid;
    var word = "txtworddole" + webid;
    var sv = "save" + webid;
    var pre = "btnprec" + webid;
    document.getElementById(genid).value = id.id;
    if (id.type == "checkbox") {
        if (document.getElementById(word).value == "1") {
            document.getElementById(sv).style.display = "inline-block";
        }
        else {
            document.getElementById(sv).style.display = "none";
        }
        document.getElementById(sv).value = "Confirm";
        try {
            document.getElementById(pre).style.display = "none";
        }
        catch (e) {

        }
    }
    else if (id.type == "button") {
        if (document.getElementById(word).value == "1") {
            document.getElementById(sv).style.display = "none";
        }
        else {
            document.getElementById(sv).style.display = "none";
        }
        document.getElementById(sv).value = "Update";
        try {
            document.getElementById(pre).style.display = "none";
        }
        catch (e) {

        }
    }
    else {
        if (document.getElementById(word).value == "1") {
            document.getElementById(sv).style.display = "inline-block";
        }
        else {
            document.getElementById(sv).style.display = "none";
        }
        document.getElementById(sv).value = "Confirm";
        try {
            document.getElementById(sv).style.display = "inline-block";
        } catch (e) {

        }
    }
    $('#prev' + webid).dialog("close");
    loadFinaltable(id.id, '2', webid);

}

function loadFinaltable(genid, mskflg, swebid) {
    debugger;
//                alert(genid);
    var sftab = "finaltable" + swebid;
    var prec = "btnprec" + swebid;
    var webid = document.getElementById("tempwebformid").value;
    //                var genid=document.getElementById("txtgenid").value;

    var docid = document.getElementById("txtdocid").value;
    var mrno = document.getElementById("txtmrno").value;
    var gwid = "txtgenid" + swebid;
    var word = "txtworddole" + swebid;
    var tbox = "textbox" + swebid;
    var pre = "previous" + swebid;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=loadfinaltable&webid=' + swebid + '&genid=' + genid + '&docid=' + docid + '&mrno=' + mrno + '&maskflg=' + mskflg, function (responcejson) {
        debugger;
        var msg = responcejson.message;
        if (msg != "" && msg != undefined)
        {
            var nxttab = "";

            if (document.getElementById(gwid).value != "") {
                nxttab = document.getElementById(sftab);
                alert("Pop Update query is empty");
            }

            return;
        }
        if (responcejson != null && responcejson != "") {
            debugger;
//                        alert(document.getElementById(word).value);
            if (document.getElementById(word).value == "0") {
                var nxttab = "";
                if (document.getElementById(gwid).value != "") {
                    nxttab = document.getElementById(sftab);

                }
                else if (mskflg == "1" || mskflg == "2") {
                    nxttab = document.getElementById(sftab);
                }
                else {
                    nxttab = document.getElementById(pre);
                }
                var data = "";
                var celllength = nxttab.rows[0].cells.length;
                var cols = "";
                var p = 0;
                var q = 0;
                if (document.getElementById(gwid).value != "") {
                    p = 4;
                    q = 0;
                }
                else if (nxttab.id.indexOf("previous") >= 0) {
                    p = 2;
                    q = 1;

                }
                else {
                    p = 4;
                    q = 0;

                }
                for (var j = p; j < celllength - parseInt(q); j++) {
                    var lbl = nxttab.rows[0].cells[j].textContent;
                    lbl = "id_" + lbl;
                    //                      lbl=lbl.replace(" ","_");
                    lbl = lbl.split(" ").join("_");
                    cols = cols + "@" + lbl + "-->" + nxttab.rows[0].cells[j].title;
                }
                if (document.getElementById(gwid).value != "") {
                    $('#' + sftab).find("tr:gt(0)").remove();
                }
                else if (mskflg == "1") {
                    $('#' + sftab).find("tr:gt(0)").remove();
                }
                else {
                    $('#' + pre).find("tr:gt(0)").remove();
                }

                for (var k = 0; k < responcejson.length; k++) {
                    var cmblbl = "";
                    if (document.getElementById(gwid).value != "") {
                        if (k == responcejson.length - 1) {
                            data = "<tr><td style='display:none'></td><td height='20' style='display:none'><input type='button' value='Add' class='btn2' onclick='addToGrid(this)'></td><td width='1%'>" + (k + 1) + "</td><td align='center' width='1%'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)'></span></td>";
                        }
                        else {
                            data = "<tr><td style='display:none'></td><td height='20' style='display:none'><input type='button' value='Add' class='btn2' onclick='addToGrid(this)' style='display:none'></td><td width='1%'>" + (k + 1) + "</td><td align='center' width='1%'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)'></span></td>";
                            nxttab.rows[0].cells[1].childNodes[0].style.display = "none";
                        }

                    }
                    else if (mskflg == "1") {
                        if (k == responcejson.length - 1) {
                            data = "<tr><td style='display:none'></td><td height='20' style='display:none'><input type='button' value='Add' class='btn2' onclick='addToGrid(this)'></td><td width='1%'>" + (k + 1) + "</td><td align='center' width='1%'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)'></span></td>";
                        }
                        else {
                            data = "<tr><td style='display:none'></td><td height='20' style='display:none'><input type='button' value='Add' class='btn2' onclick='addToGrid(this)' style='display:none'></td><td width='1%'>" + (k + 1) + "</td><td align='center' width='1%'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)'></span></td>";
                            nxttab.rows[0].cells[1].childNodes[0].style.display = "none";
                        }
                    }
                    else {
                        data = "<tr><td height='20' align='center'><input type='checkbox'  onclick='edit(this)' id='" + responcejson[k]['EDIT'] + "'></td><td>" + (k + 1) + "</td>";
                    }
                    var cl = cols.split("@");
                    for (var l = 1; l < cl.length; l++) {
                        var cl2 = cl[l].split("-->");
                        if (cl2[1].indexOf("combo") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td><select id='" + cl2[0] + "_" + k + "' onchange='onchangefun(this)' style='width:100%'>" + document.getElementById(cl2[0]).innerHTML + "</select></td>";
                            cmblbl = cmblbl + "-->" + cl2[0] + "_" + k + "@" + responcejson[k][cl1];
                        }
                        else if (cl2[1].indexOf("text") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td><input type='text' style='width:98%' value='" + responcejson[k][cl1] + "' onchange='onchangefun(this)' placeholder='Type Here'></td>";
                        }
                        else if (cl2[1].indexOf("searchmain") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            if (cl2[1].indexOf(":") >= 0) {
                                var ser = cl2[1].split(":");
                            }
                            data = data + "<td><input onkeydown='searchData(this)' type='text' value='" + responcejson[k][cl1] + "' class='inputwthimg' placeholder='Type Here To Search' style='width:87%'><img src='" + localStorage.ipadrs + "/images/search9.png' style='float:right;' class='btn1 srchimg' title='" + ser[1].split("'").join("`") + "@@ ' onclick='pop(this,1)'></td>";
                        }
                        else if (cl2[1].indexOf("searchhdn") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td style='display:none'><input type='text' value='" + responcejson[k][cl1] + "' class='inputwthimg' onchange='onchangefun(this)' placeholder='Type Here'></td>";

                        }
                        else {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td><label>" + responcejson[k][cl1] + "<label></td>";
                        }

                    }
                    //                                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td>";
                    if (document.getElementById(gwid).value != "") {

                    }
                    else if (mskflg == "1") {

                    }
                    else {
                        data = data + "<td style='padding:0px;' align='center'><button type='button' onclick='edit(this)' id='" + responcejson[k]['EDIT'] + "'  style='cursor:pointer;border:none;width:auto;padding: 4px 8px;' class='btn btn-primary'><span class='glyphicon glyphicon-edit'></span></button></td>";
                    }
                    data = data + "</tr>";
                    data = $(data);
                    data.appendTo(nxttab);
                    var cmblbl1 = cmblbl.split("-->");
                    for (var n = 1; n < cmblbl1.length; n++) {
                        var cmb = cmblbl1[n].split("@");
                        document.getElementById(cmb[0]).value = cmb[1];
                    }

                }
                var fitb = document.getElementById(sftab);
                var sv = "save" + swebid;
                if (fitb.rows.length > 1) {
                    if (document.getElementById(word).value == "1") {
                        document.getElementById(sv).style.display = "inline-block";
                    }
                    else {
                        document.getElementById(sv).style.display = "none";
                    }
                }
                else {
                    document.getElementById(sv).style.display = "none";
                    try {
                        document.getElementById(prec).style.display = "none";
                    } catch (e) {
                    }
                }
//                            alert(nxttab.id);
                if (nxttab.id.indexOf("previous") >= 0) {
//                            alert("hi");
                    loadmask(swebid);
                }
                applydisable(swebid);
//                            hideemttables(swebid);
            }

            //For Worddole is checking..
            else {
                if (mskflg == "1") {
                    var defualt = "";
                    for (var k = 0; k < responcejson.length; k++) {

                        defualt = defualt + '<br/>' + responcejson[k]['KEY_VALUE'];
                    }
//                                var editor =  textboxio.replace('#textbox');
//                                
                    if (defualt != "")
                    {
//                                    tinymce.activeEditor.setContent(defualt); 
//                                    editor.content.set(defualt);
                        document.getElementById(tbox).value = defualt.split("<br\>").join("\n").split("<br/>").join("\n").split("`").join("'");
//                                    document.getElementById(tbox).value;
                        if (document.getElementById(tbox).value.trim() == "") {
                            var mm = "finalmain" + webid;
                            document.getElementById(mm).style.display = "none";
                        }
                    }

                }
                else if (document.getElementById(gwid).value == "") {
                    try {
                        nxttab = document.getElementById(pre);

                        var data = "";
                        var celllength = nxttab.rows[0].cells.length;
                        var cols = "";
                        var p = 2;
                        var q = 1;


                        for (var j = p; j < celllength - parseInt(q); j++) {
                            var lbl = nxttab.rows[0].cells[j].textContent;
                            lbl = "id_" + lbl;
                            //                      lbl=lbl.replace(" ","_");
                            lbl = lbl.split(" ").join("_");
                            cols = cols + "@" + lbl + "-->" + nxttab.rows[0].cells[j].title;
                        }

                    } catch (e) {
                    }
                    $('#' + pre).find("tr:gt(0)").remove();


                    for (var k = 0; k < responcejson.length; k++) {
                        var cmblbl = "";


                        data = "<tr><td height='20' align='center'><input type='checkbox'  onclick='edit(this)' id='" + responcejson[k]['EDIT'] + "'></td><td>" + (k + 1) + "</td>";

                        var cl = cols.split("@");
                        for (var l = 1; l < cl.length; l++) {
                            var cl2 = cl[l].split("-->");
                            if (cl2[1].indexOf("combo") >= 0) {
                                var cl1 = cl2[0].toUpperCase();
                                data = data + "<td><select id='" + cl2[0] + "_" + k + "' style='width:100%'>" + document.getElementById(cl2[0]).innerHTML + "</select></td>";
                                cmblbl = cmblbl + "-->" + cl2[0] + "_" + k + "@" + responcejson[k][cl1];
                            }
                            else if (cl2[1].indexOf("text") >= 0) {
                                var cl1 = cl2[0].toUpperCase();
                                data = data + "<td><input type='text' style='width:98%' value='" + responcejson[k][cl1] + "' onchange='onchangefun(this)' placeholder='Type Here'></td>";
                            }
                            else if (cl2[1].indexOf("searchmain") >= 0) {
                                var cl1 = cl2[0].toUpperCase();
                                if (cl2[1].indexOf(":") >= 0) {
                                    var ser = cl2[1].split(":");
                                }
                                data = data + "<td><input onkeydown='searchData(this)' type='text' value='" + responcejson[k][cl1] + "' placeholder='Type Here To Search' style='width:87%'><img src='" + localStorage.ipadrs + "/images/search9.png' style='float:right;' class='btn1 srchimg' title='" + ser[1].split("'").join("`") + "@@ ' onclick='pop(this,1)'></td>";
                            }
                            else if (cl2[1].indexOf("searchhdn") >= 0) {
                                var cl1 = cl2[0].toUpperCase();
                                data = data + "<td style='display:none'><input type='text' value='" + responcejson[k][cl1] + "' onchange='onchangefun(this)' placeholder='Type Here'></td>";

                            }
                            else {
                                var cl1 = cl2[0].toUpperCase();
                                data = data + "<td><label>" + responcejson[k][cl1] + "</label></td>";
                            }

                        }
                        //                                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td>";

                        data = data + "<td style='padding:0px;' align='center'><button type='button' onclick='edit(this)' id='" + responcejson[k]['EDIT'] + "' style='cursor:pointer;width:auto;border:none;padding: 4px 8px;' class='btn btn-primary'><span class='glyphicon glyphicon-edit'></span></button></td>";

                        data = data + "</tr>";
                        data = $(data);
                        data.appendTo(nxttab);
                        var cmblbl1 = cmblbl.split("-->");
                        for (var n = 1; n < cmblbl1.length; n++) {
                            var cmb = cmblbl1[n].split("@");
                            document.getElementById(cmb[0]).value = cmb[1];
                        }
                    }

                    loadmask(swebid);

                }




                else {
                    var defualt = "";
                    for (var k = 0; k < responcejson.length; k++) {

                        defualt = defualt + '<br/>' + responcejson[k]['KEY_VALUE'];
                    }
//                                var editor =  textboxio.replace('#textbox');
//                                
                    if (defualt != "")
                    {
//                                    tinymce.activeEditor.setContent(defualt); 
//                                    editor.content.set(defualt);
                        document.getElementById(tbox).value = defualt.split("<br\>").join("\n").split("<br/>").join("\n");
                    }
                    if (document.getElementById(tbox).value.trim() != "") {
                    }
                    else {
                        var mm = "finalmain" + webid;
                        document.getElementById(mm).style.display = "none";
                    }
                }


//                            hideemttables(swebid);
            }
//                        hideemttables(swebid);
            if (mskflg == "2") {
                document.getElementById(sv).onclick();
            }
            displayfinaltable(swebid);
            addToGrid('', '', swebid);
        }


    });
//                alert(genid);
    loadremarks(genid);
    if (mskflg == "1") {
//               alert("hi");
        setsave(swebid, genid);
    }

}
function showthisprev(id) {
    var prev = "prev" + id.getAttribute("webid");
    displayprevmsg(prev);
    $('#prev' + id.getAttribute("webid") + '').css("width", "100%");
    $(".ui-dialog-title").css("width", "100%");
    $(".ui-dialog-title").css("margin-top", "-1px");
    $(".ui-dialog-title").css("margin-left", "-1px");
    $(".ui-dialog-title").css("height", "22px");
}

function displayprevmsg(id) {
    $(function () {
        debugger;

        $("#" + id).dialog({
            resizable: false,
            height: '400',
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
function displayfinaltable(swebid) {
    var svtable = "finaltable" + swebid;
    var tab = document.getElementById(svtable);
    var divid = "finalmain" + swebid;
    if (tab != null) {

        if (tab.rows.length > 2) {
            document.getElementById(divid).style.display = "block";
        }
        else if (tab.rows.length == 2) {
            if (tab.rows[1].cells[4].childNodes[0].value == "") {
                document.getElementById(divid).style.display = "none";
            }
            else {
                document.getElementById(divid).style.display = "block";
            }
        }
        else {
            document.getElementById(divid).style.display = "none";
        }
    }
    else {
        var tbx = "textbox" + swebid;
        if (document.getElementById(tbx).value.trim() != "") {
            document.getElementById(divid).style.display = "block";
        }
        else {
            document.getElementById(divid).style.display = "none";
        }
    }
}
;
//            function hideemttables(id){
//            try{
//                if(id!=""){
//                    var fif="finaltable"+id;
//                    var ftab=document.getElementById(fif);
//                    if(ftab.rows.length==1){
//                        document.getElementById()
//                    }
//                    else if(ftab.rows.length==2){
//                    }
//                    else{
//                    }
//                }
//            }
//            catch(ee){
//            }
//            }
function applydisable(id) {
    debugger;
    var sftable = "finaltable" + id;
    var tab = document.getElementById(sftable);
    var cellsize = tab.rows[0].cells.length;
    for (var i = 1; i < tab.rows.length; i++) {
        for (var j = 4; j < cellsize; j++) {
            if (tab.rows[0].cells[j].getAttribute("vis") == "1") {
                tab.rows[i].cells[j].style.display = "none";
            }
            else if (tab.rows[0].cells[j].getAttribute("dis") == "1") {
                tab.rows[i].cells[j].childNodes[0].disabled = true;
            }

            else if (tab.rows[0].cells[j].getAttribute("chkmandatory") == "1") {
                tab.rows[i].cells[j].setAttribute("chkmandatory", tab.rows[0].cells[j].getAttribute("chkmandatory"));
            }
            tab.rows[i].cells[j].setAttribute("width", tab.rows[0].cells[j].getAttribute("dissize") + "%");
//                        tab.rows[i].cells[j].childNodes[0].style.width="99%";
        }
    }
}
function setsave(webid, genid) {
    debugger;
    var op = "orpkey" + webid;
    var pkey = "pkey" + webid;
    var sv = "save" + webid;
    var gwid = "txtgenid" + webid;
    var word = "txtworddole" + webid;
    var prec = "btnprec" + webid;
    var orpkey = document.getElementById(op).value;
//            alert(document.getElementById(op).value);
    if (orpkey != "") {
        document.getElementById(gwid).value = orpkey;
        if (document.getElementById(word).value == "1") {
            document.getElementById(sv).style.display = "inline-block";
        }
        else {
            document.getElementById(sv).style.display = "none";
        }
        document.getElementById(sv).value = "Update";
        document.getElementById(prec).style.display = "inline-block";


    }
    else {
        if (document.getElementById("txteditflg").value.trim() == "") {
            if (document.getElementById(pkey).value != "") {
                document.getElementById(gwid).value = genid;
                document.getElementById(sv).value = "Update";
            }
            else {
                document.getElementById(sv).value = "Confirm";
                document.getElementById(prec).style.display = "inline-block";
            }
        }
        else if (document.getElementById("txteditflg").value.trim() != "") {
            if (document.getElementById(pkey).value != "" && document.getElementById("txteditflg").value == "1") {
                document.getElementById(gwid).value = genid;
                document.getElementById(sv).value = "Update";
            }
            else {
                document.getElementById(sv).value = "Confirm";
                document.getElementById(prec).style.display = "inline-block";
            }
        }




    }
//            alert(document.getElementById(gwid).value);
}
function loadremarks(genid) {
    var webid = document.getElementById("tempwebformid").value;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=fillremarks&webid=' + webid + '&genid=' + genid, function (responcejson) {
        if (responcejson != null) {
            if (responcejson !== "null") {
                $('#tempremarks').val(responcejson);
            }
        }
    });

}

function addToFinal(id) {
    debugger;
    var ftb = document.getElementById("finaltable" + document.getElementById("focuswebformid").value);
    var ptb = document.getElementById("previous");
    var rno = id.parentNode.parentNode.rowIndex;
    var data = '<tr><td style="display:none"><input type="button" value="Add" class="btn2" onclick=addToGrid(this)></td><td><input type="text" value=' + ftb.rows.length + '></td><td align="center"><input type="checkbox" checked="true"></td>';
    for (var i = 2; i < ptb.rows[rno].cells.length - 2; i++) {
//                alert(ptb.rows[rno].cells[i].style.display);
        if (ptb.rows[rno].cells[i].style.display == "none") {
            data = data + '<td style="display:none">' + ptb.rows[rno].cells[i].innerHTML + '</td>';
        }
        else {
            data = data + '<td>' + ptb.rows[rno].cells[i].innerHTML + '</td>';
        }
    }
    data = data + '</tr>';

    var data1 = $(data);
    data1.appendTo(ftb);


}

function pop(id, flg) {
    debugger;
    try {
        document.getElementById("focuswebformid").value = id.parentNode.parentNode.parentNode.getAttribute("savewebformid")
    }
    catch (ee) {
    }
    if (flg == '1') {
        var qry = id.title.split("@@");
        var id1 = qry[1];
//                    qry[0];
        var wid = id.parentNode.parentNode.parentNode.parentNode.getAttribute("savewebformid");
        var ftab = "finaltable" + wid;
        var table = document.getElementById(ftab);
        var rownum = id.parentNode.parentNode.rowIndex;
        var cellen = table.rows[0].cells.length;
        for (var i = 4; i < cellen; i++) {
            if (table.rows[rownum].cells[i].children.length > 0) {
                var id1 = table.rows[0].cells[i].textContent;
                id1 = "$id_" + id1.split(" ").join("_") + "";
                try {
                    var id2 = "'" + table.rows[rownum].cells[i].childNodes[0].value + "";
                    qry[0] = qry[0].replace(id1, id2);
                } catch (err) {
                }
                ;
            }
        }
        qry[0] = qry[0].split("$").join("'");
        document.getElementById("txtSearchorders").title = qry[0];
        localStorage.rowindex = id.parentNode.parentNode.rowIndex;
        localStorage.cellindex = id.parentNode.cellIndex;
        localStorage.ordertab = "finaltable" + wid;
        $.get(localStorage.ipadrs + '/DisTemplateView?type=getclmnms&qry=' + encodeURIComponent(qry[0]), function (responcejson) {
            if (responcejson != "") {
                debugger;
                if (responcejson.indexOf("@@") >= 0) {
                    var clnms = responcejson.split("@@");
                    var options = "";
                    var tabrow = "<tr>";
                    for (var mm = 0; mm < clnms.length; mm++) {
                        if (clnms[mm].trim() != "") {
                            options = options + "<option value='" + clnms[mm] + "'>" + clnms[mm] + "</option>";
                            tabrow = tabrow + "<td>" + clnms[mm] + "</td>";
                        }
                    }
                    tabrow = tabrow + "</tr>";
                    $('#tblColumns tbody').empty();
                    $('.divforsearchorders').show();
                    $('#tblColumns').html(tabrow);
                    $('#ddlSearchorders').html(options);

                    var mainqry = qry[0].split("from");

                    qry = mainqry[0].split("`").join("'");
                    qry = qry;

                    var tab = mainqry[1];
                    tab = encodeURIComponent(tab);
                    var txtf = "pop@@" + id.parentNode.parentNode.rowIndex + "@@" + id.parentNode.cellIndex + "@@" + id1 + "@@" + wid;
                    var path = localStorage.ipaddres;
//                    window.open(''+path+'/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf='+txtf+'&ordby=', '', 'width=640,height=600');
//tab = tab;alert(id.parentNode.parentNode.parentNode.parentNode.rows[0].cells[id.parentNode.cellIndex].textContent);
                    try {
                        document.getElementById("lblpopheading").innerHTML = id.parentNode.parentNode.parentNode.parentNode.rows[0].cells[id.parentNode.cellIndex].textContent;
                    }
                    catch (ee) {

                    }
                    var path = localStorage.ipadrs + "/searchRecordsMobileOrders?search=&ordby=&serfield=";
                    path = path + "&tab=" + tab + "&qry=" + qry + "&sidx=&sord=asc&page=0";
                    $.get(path, function (respneText) {
                        debugger;
                        var rowCount = document.getElementById('tblColumns').rows.length;

                        if (rowCount > 1) {
                            document.getElementById('tblColumns').deleteRow(rowCount - 1);
                        }
                        respneText = $(respneText);
                        var keyup = "";
                        if (keyup == 'search') {
                            $('#tblColumns tr:gt(0)').empty();
                        }
                        $(respneText).appendTo($('#tblColumns'));


                        $('#divProcess').hide();
                    });
                }
            }
        });





    }
}
function searchorders(id) {
    debugger;

    var mainqry = id.title.split("from");
    var qry = mainqry[0];
    var tab = mainqry[1];
    var clm = document.getElementById("ddlSearchorders").value;

    var path = localStorage.ipadrs + "/searchRecordsMobileOrders?search=" + id.value + "&ordby=&serfield=" + clm;
    path = path + "&tab=" + tab + "&qry=" + qry + "&sidx=&sord=asc&page=0";
    $.get(path, function (respneText) {
        debugger;
        var rowCount = document.getElementById('tblColumns').rows.length;

        if (rowCount > 1) {
            document.getElementById('tblColumns').deleteRow(rowCount - 1);
        }
        respneText = $(respneText);
        var keyup = "";

        $('#tblColumns tr:gt(0)').empty();

        $(respneText).appendTo($('#tblColumns'));


        $('#divProcess').hide();
    });
}
function onSelectRoworders(id) {
    debugger;
    var ordertab = document.getElementById(localStorage.ordertab);
    ordertab.rows[localStorage.rowindex].cells[localStorage.cellindex].childNodes[0].value = id.getAttribute("key_value");
    ordertab.rows[localStorage.rowindex].cells[parseInt(localStorage.cellindex) + 1].childNodes[0].value = id.getAttribute("key_id");
    ordertab.rows[localStorage.rowindex].cells[parseInt(localStorage.cellindex) + 1].childNodes[0].onchange();
    $('.divforsearchorders').hide();
}

function onchangefun(id) {
    debugger;
    var cindex = id.parentNode.cellIndex;
    var rownum = id.parentNode.parentNode.rowIndex;
    var swebid = id.parentNode.parentNode.parentNode.parentNode.getAttribute("savewebformid");
    var sfid = "finaltable" + swebid;
    var svid = "save" + swebid;
    var tab = document.getElementById(sfid);
    var cond = tab.rows[0].cells[cindex].getAttribute("controltype");
    if (cond.indexOf("SH:ROW") >= 0) {
        if (cond.indexOf("IF") < 0) {
            var con = cond.split("^");
            for (var i = 0; i < con.length; i++) {
                if (con[i].trim() != "") {
                    replacefun(rownum, con[i], swebid);
                }
            }
        }
        else {
            replacefun(rownum, cond, swebid);
        }
    }
    else if (cond.indexOf("SH:QRY") >= 0) {
        var con = cond.split("^");
        for (var i = 0; i < con.length; i++) {
            if (con[i].trim() != "") {
                exefun(rownum, con[i], swebid);
            }
        }
    }
    else {
        addToGrid('', '', swebid);
        document.getElementById(svid).onclick();
    }

}
function exefun(rno, con, id) {
    debugger;
    var sftab = "finaltable" + id;
    var svid = "save" + id;
    var tab = document.getElementById(sftab);
    var cellno = tab.rows[0].cells.length;
    var webid = document.getElementById("tempwebformid").value;
//                 if(con.indexOf("SH:QRY")>=0){
    con = con.replace("SH:QRY", "");
    con = con.trim();
    var con1 = con.split("==");
    var qry = con1[1].replace("^", "");
    for (var i = 4; i < cellno; i++) {
        qry = qry.replace("id_" + tab.rows[0].cells[i].textContent.replace(' ', '_'), tab.rows[rno].cells[i].childNodes[0].value);
    }
    qry = qry.replace("txtmrno", document.getElementById("txtmrno").value);
    qry = qry.replace("txtdocid", document.getElementById("txtdocid").value);
    qry = qry.replace("txtspeid", document.getElementById("txtspeid").value);

    $.get(localStorage.ipadrs + '/DisTemplateView?type=execond&webid=' + webid + '&qry=' + qry, function (responcejson) {
        if (responcejson != "ERROR") {
            debugger;
            for (var i = 4; i < cellno; i++) {

//                     alert(con1[0]+"@"+"id_"+tab.rows[0].cells[i].textContent.trim().split(" ").join("_"));
                if (con1[0].trim() == "id_" + tab.rows[0].cells[i].textContent.trim().split(" ").join("_")) {

                    tab.rows[rno].cells[i].childNodes[0].value = responcejson;
                    document.getElementById(svid).onclick();
                    tab.rows[rno].cells[i].childNodes[0].onchange();
                }
            }
        }
    });
//                 }
}
function replacefun(rno, con, id) {
    debugger;
//                if(con.indexOf("SH:ROW")>=0){
    var sftab = "finaltable" + id;
    var svid = "save" + id;
    con = con.split("$").join("");
    con = con.replace("SH:ROW", "");
    con = con.split(" ").join("");
    var tab = document.getElementById(sftab);
    var cellno = tab.rows[0].cells.length;
    if (con.indexOf("IF") != -1) {

        con = con.replace(/`/g, "'");
        var testRE = con.substring(0, con.indexOf("ENDIF"));
//                    alert(testRE[1]);
        if (testRE.indexOf("ELSE") != -1) {
            var conditions = testRE.split("ELSE");
            for (var i = 0; i < conditions.length; i++) {
                var cond = conditions[i].substring(conditions[i].indexOf("IF") + 2, conditions[i].indexOf("THEN"));
                var ifexe = conditions[i].replace(cond, "").replace("THEN", "");
                for (var j = 4; j < cellno; j++) {
                    cond = cond.replace("id_" + tab.rows[0].cells[j].textContent.split(" ").join("_"), tab.rows[rno].cells[j].childNodes[0].value);
                }
                if (eval(cond.replace("$", ""))) {
                    var loopexec1 = ifexe.split("^");
                    for (var h = 0; h < loopexec1.length; h++) {
                        var ifexe1 = loopexec1[h].split("=");
                        for (var j = 4; j < cellno; j++) {
//                              cond=cond.replace("id_"+tab.rows[0].cells[j].textContent.split(" ").join("_"),tab.rows[rno].cells[j].childNodes[0].value);
                            ifexe1[1] = ifexe1[1].replace("id_" + tab.rows[0].cells[j].textContent.split(" ").join("_"), tab.rows[rno].cells[j].childNodes[0].value);
                        }
                        for (var k = 4; k < cellno; k++) {
                            if (ifexe1[0].replace("IF", "").trim() == "id_" + tab.rows[0].cells[k].textContent.split(" ").join("_")) {
                                try {
                                    tab.rows[rno].cells[k].childNodes[0].value = eval(ifexe1[1].replace("$", "").replace(/ENDIF/g, ""));
                                    document.getElementById(svid).onclick();
                                }
                                catch (err) {

                                }
                            }
                        }

                    }
                    return;
                }


            }


        }
        else {

        }

    }
    else {
        var con1 = con.split("=");

        for (var i = 4; i < cellno; i++) {
            con1[1] = con1[1].replace("id_" + tab.rows[0].cells[i].textContent.split(" ").join("_"), tab.rows[rno].cells[i].childNodes[0].value);
        }
        for (var i = 4; i < cellno; i++) {
            if (con1[0].trim() == "id_" + tab.rows[0].cells[i].textContent.split(" ").join("_")) {
                try {
                    tab.rows[rno].cells[i].childNodes[0].value = eval(con1[1]);
                    document.getElementById(svid).onclick();
                }
                catch (err) {

                }
            }
        }
    }

//                }
}
function loadmask(id) {
    debugger;
//                alert("HI");
    var pk = "pkey" + id;
    var prec = "btnprec" + id;
    var pkey = document.getElementById(pk).value;
    var sv = "save" + id;
    var word = "txtworddole" + id;
    if (document.getElementById(word).value == "1") {
        document.getElementById(sv).style.display = "inline-block";
    }
    else {
        document.getElementById(sv).style.display = "none";
    }

    try {
        document.getElementById(prec).style.display = "inline-block";
    }
    catch (e) {
    }
    loadFinaltable(pkey, '1', id);

}

function showsubgrid(did, wth, bkid, bkid1) {
    debugger;
    if (bkid != undefined) {
        document.getElementById(bkid).style.display = "none";
    }
    var webid = did.id;
    var docid = localStorage.docid;
    var mrno = localStorage.mrno;
    var speid = localStorage.docid;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=fillinnertable&webid=' + webid + '&docid=' + docid + '&speid=' + speid + '&mrno=' + mrno, function (responcejason) {
        if (responcejason != "") {
            if (responcejason.indexOf("-->") >= 0) {
                var data = responcejason.split("-->");
                document.getElementById(data[0]).innerHTML = data[1];
                data[0] = data[0].replace("tab_", "").replace(webid, "");
                document.getElementById(webid + "" + data[0]).style.display = "block";
                var wi = "leftmain" + bkid1;
                var div = document.getElementById(wi);
                if (div.children[0].children[1].children[0].rows.length == 0) {
                    document.getElementById(webid + "" + data[0]).style.width = "100%";
                }
                else {
                    document.getElementById(webid + "" + data[0]).style.width = "100%";
                }

            }

        }
    });
//                var div=document.getElementById("leftdiv");
//                var divs = div.getElementsByTagName('div');
//
//for (var i = 0; i < divs.length; i += 1) {
//    var flg="0";
//    
//    if(divs[i].id!=""){
//  if(divs[i].id.indexOf(did.id)>0){
//      if(flg=="0"){
//      divs[i].style.display="block";
//      flg="1";
//  }
//      
////      if(wth!='100'){
////                 wth=wth+"%";
////                  $('.leftmain').css("width","75%");
////                  $('.leftgrddiv').addClass('ajblftdiv');
////                $('.left').css("width",wth);
////                
//////                 $('.leftgrddiv').css("height",'200px');
//// $('.rightgrddiv').addClass('ajbrgtdiv');
////                 $('.right').css("width",'25%');
//////                 $('.rightgrddiv').css("height",'400px');
////             }
////             else{
////                 wth="100%";
////                   $('.leftmain').css("width","25%");
////                      $('.leftgrddiv').removeClass('ajblftdiv');
////                $('.left').css("width",wth);
//////                 $('.leftgrddiv').css("height",'400px');
////                 $('.right').css("width",'75%');
////                  $('.rightgrddiv').removeClass('ajbrgtdiv');
//////                 $('.rightgrddiv').css("height",'400px');
////             }
//      
//  }
//  else if(divs[i].id=="fnltbldiv1"){
//      divs[i].style.display="block";
//  }
//  else{
//      divs[i].style.display="none";
//  }
//}
//}
}

function showpre(btn) {




    if (btn.value === "Show Previous") {
        btn.value = 'Hide Previous';
        $('#prev').css("display", "block");
    }
    else {
        btn.value = 'Show Previous';
        $('#prev').css("display", "none");
    }
//                document.getElementById("prev").style.display="block";
}

function back() {
    debugger;

    getdatadefault();
    document.getElementById("positionright").style.display = "block";
    document.getElementById("positionleft").style.display = "none";
    document.getElementById("innertemplate").style.display = "none";

}

//            function searchData(id){
////                debugger;
//                if (typeof XMLHttpRequest != "undefined") {
//                    xmlHttp = new XMLHttpRequest();
//                }
//                else if (window.ActiveXObject) {
//                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
//                }
//                if (xmlHttp == null) {
//                    alert("Browser does not support XMLHTTP Request")
//                    return
//                }
//                var fmnm=document.getElementById("txtformsearch").value;
//                var url = '../SearchFormSrvlt';
//                url += '?formnm='+fmnm+'&table=findform';
//                xmlHttp.onreadystatechange = Formdtls;
//                xmlHttp.open("GET", url, true);
//                xmlHttp.send(null);
//            }

//            function Formdtls(){
//                if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
////                    debugger;
//                    var result1 = xmlHttp.responseText;
//                    var opd = new Array();
//
//                    opd = result1.split("$");
//                    var result = [];
//                    for (i = 0; i < opd.length; ++i)
//                    {
//                        var ss = new Array();
//                        ss = opd[i].split("|")
//                        var cleanedBy = ss[0];
//                        var cleanedByid = ss[1];
////                        var name = ss[2];
//                        result[i] = {'value': cleanedBy, 'code': cleanedByid};
//                    }
//                    $("#txtformsearch").autocomplete({source: result, select: function(event, ui) {
//                            document.getElementById("txtformsearch").value = ui.item.value;
//                            document.getElementById("txtformurl").value = ui.item.code;
//                            var url=document.getElementById("txtformurl").value;
//                            url=url.split("&").join("_and");
//                           
//                            
////                            document.getElementById("name").value = ui.item.code1;
//                            //                            depreciation();
//                        }});
//
//                }
//            }
function searchData(id) {
    debugger;
    var ftab = id.parentNode.parentNode.parentNode.parentNode.getAttribute("savewebformid");
//               alert(ftab);
    try {
        document.getElementById("focuswebformid").value = id.parentNode.parentNode.parentNode.getAttribute("savewebformid");
    }
    catch (ee) {
    }
    var ftb = "finaltable" + ftab;
    var tab = document.getElementById(ftb);
    var qry = id.title;
    var subqry = "";
    var substr = qry.toUpperCase().split("SELECT").pop().split("KEY_VALUE").shift();
//                alert(substr);
//                var finalqry="";
    if (qry.trim() != "") {

        if (qry.toUpperCase().indexOf('ORDER BY') >= 0) {
            var qry1 = qry.toUpperCase().split("ORDER BY");
            qry = qry1[0];
        }
        if (qry.toUpperCase().indexOf('GROUP BY') >= 0) {
            var qry1 = qry.toUpperCase().split("GROUP BY");
            qry = qry1[0];
            subqry = qry1[1];
        }
        if (qry.toUpperCase().indexOf("WHERE") > 0) {
            qry = qry + " and upper(" + substr + ") like 'result'";
        }
        else {
            qry = qry + " where " + substr + " like 'result'";
        }
        if (subqry != "") {
            qry = qry + " GROUP BY" + subqry;
        }
        var val = id.value;
        var path = localStorage.ipadrs + '/DisTemplateView';


        $.ajax({
            url: path,
            type: 'POST',
            data: 'type=searchdata&qry=' + qry + '&val=' + val,
            dataType: 'text/html',
            success: function (responcejson) {

            },
            error: function (error) {
                debugger;
                if (error.statusText == "OK") {
                    var result1 = error.responseText;
                    var opd = new Array();

                    opd = result1.split("$");
                    var result = [];
                    for (i = 0; i < opd.length; ++i)
                    {
                        var ss = new Array();
                        ss = opd[i].split("|")
                        var cleanedBy = ss[0];
                        var cleanedByid = ss[1];
//                        var name = ss[2];
                        result[i] = {'value': cleanedBy, 'code': cleanedByid};
                    }
                    $('#' + id.id).autocomplete({source: result, select: function (event, ui) {
                            debugger;
                            id.value = ui.item.value;
                            var celln = id.parentNode.cellIndex + 1;
//                            alert(celln);
//                            alert(ftb);
                            tab.rows[id.parentNode.parentNode.rowIndex].cells[celln].childNodes[0].value = ui.item.code;
//                            document.getElementById("save").onclick();
                            tab.rows[id.parentNode.parentNode.rowIndex].cells[3].childNodes[0].style.display = "block";
                            try {
                                checkforsearch(celln, ui.item.code, tab, id.parentNode.parentNode.rowIndex, ftab);
                            }
                            catch (ee) {
                            }
                            tab.rows[id.parentNode.parentNode.rowIndex].cells[celln].childNodes[0].onchange();
                            shafilall(ftab);

                            addToGrid('', '', ftab);
                        }});
                }
            }


        });
    }

}




function filterdata(evt) {
    debugger;

    searchTable1(evt.value, evt.title);

}

function searchTable1(inputVal, tabid) {
    debugger;
    var table = $('#' + tabid);

    var i = 0;
    document.body.style.cursor = 'wait';
    var col = "1";
//                    table.find('tr').each(function(index, row) {

    for (var k = 1; k < table[0].rows.length; k++) {
        var row = table[0].rows[k];
        debugger;
        var allCells = $(row).find('td');

        if (allCells.length > 0) {
            i++;
            var found = false;
            //  allCells.each(function(index, td) {
            debugger;
            var regExp = new RegExp(inputVal, 'i');
            var len = inputVal.length;
            var name = "";

            name = $(allCells[col]).text().trim().substr(0, len);

            if (regExp.test(name)) {
                found = true;

            }

            if (found == true) {
                $(row).show();
                document.body.style.cursor = '';
            }
            else
                $(row).hide();
            document.body.style.cursor = '';
        }
        if (i > 800) {
            return false;
        }
    }

//                    });
}
function checkall(id) {
    debugger;
    var tab = document.getElementById("finaltable" + document.getElementById("focuswebformid").value);
    if (id.checked == true) {
        for (var i = 1; i < tab.rows.length; i++) {
            tab.rows[i].cells[id.parentNode.cellIndex].childNodes[0].checked = true;
        }
    }
    else {
        for (var i = 0; i < tab.rows.length; i++) {
            tab.rows[i].cells[id.parentNode.cellIndex].childNodes[0].checked = false;
        }
    }
}

function updateextemp(id) {
    debugger;
    var webid = id.getAttribute("savewebformid");
    var svid = "save" + webid;
    document.getElementById(svid).value = "Update Exist Temp";
    var ftabbid = "finaltable" + webid;
    var word = "txtworddole" + webid;

    var tabid = document.getElementById(id.parentNode.parentNode.parentNode.parentNode.id);
    if (document.getElementById(word).value != "1") {
//                    tabid.rows[id.parentNode.parentNode.rowIndex].cells[0].childNodes[0].checked=true;
        $(ftabbid).find("tr:gt(0)").remove();
        var tabid1 = document.getElementById(ftabbid);
        for (var j = 1; j < tabid1.rows.length; j++) {
            tabid1.deleteRow(j);
        }
        for (var i = 1; i < tabid.rows.length; i++) {
            if (id.title == tabid.rows[i].cells[0].childNodes[0].id) {
                document.getElementById(id.title).checked = true;
                document.getElementById(id.title).onchange();
            }
            else {
                if (tabid.title.indexOf("finaltable") >= 0) {
                    document.getElementById(tabid.rows[i].cells[0].childNodes[0].id).checked = false;
                    document.getElementById(tabid.rows[i].cells[0].childNodes[0].id).onchange();
                }

            }
        }
    }
    else {
        id.parentNode.parentNode.cells[0].childNodes[0].checked = true;
        id.parentNode.parentNode.cells[0].childNodes[0].onchange();
    }
}

function deletetemp(id) {
    debugger;
    var webid = id.getAttribute("savewebformid");
    var word = "txtworddole" + webid;
    var delid = id.title;
    var temp = id.parentNode.parentNode.rowIndex;
    var tabid = document.getElementById(id.parentNode.parentNode.parentNode.parentNode.id);
    var tempnm = tabid.rows[temp].cells[1].textContent;
    var worddole = document.getElementById(word).value;
    if (confirm("Please Confirm that Do you Whant To delete " + tempnm + " Template") == true) {
        $.get(localStorage.ipadrs + '/DisTemplateView?type=deletetemp&webid=' + webid + '&delid=' + delid + '&worddole=' + worddole, function (responcejson) {
            if (responcejson == "ok") {
                debugger;
                alert(tempnm + "Template Deleted Successfully");
                document.getElementById("txtgenid").value = "";
                var docid = localStorage.docid;
                var mrno = localStorage.mrno;
                var theme = '';
                theme = encodeURIComponent(theme);
                var speid = localStorage.webid;
                var oid = document.getElementById("id_orid").value;
                var webid = document.getElementById("tempwebformid").value;
                var path = document.getElementById("hdnpath").value;
                $.get(path, function (responseText) {
                    if (responseText != "") {
//                            document.getElementById("mydiv1").style.dispaly="block";
                        document.getElementById("innertemplate").innerHTML = responseText;
                        try {
                            var wth = document.getElementById("txtcnt").value;
                            if (wth != '100') {
                                wth = wth + "%";
//                $('.left').css("width","100%");
//                 $('.right').css("width",'100%');
                            }
                        }
                        catch (ee) {
                        }

//                    document.getElementById("mydiv1").style.dispaly="none";
                        document.getElementById("innertemplate").style.display = "block";
                        if (id.getAttribute("formtype") != "PLANNINGFORM") {
                            var wid = id.getAttribute("savewebformid");
                            loadHeader(wid);
                            loadGenid(wid);
                        }
                        else {
                            loadmrno();
                            getprntdis();
                        }
                    }
                });

//                                    var path="<%=request.getContextPath()%>/formview?webformid="+webid+"&mrno="+mrno+"&docid="+docid+'&theme='+theme+'&speid='+speid+'&orderwebid='+oid;
//                                    location.href=path;
            }
            else {
                alert(responcejson);
            }
        });
    } else {
        return;
    }



}



//       adding js for Planning frame work

function loadplan() {
//            var mrno="";
    var scrdata = $('#txtheaddata').val();
    var data = scrdata.split("@");
    var result = "";
    for (var i = 1; i < data.length; i++) {
        result = result + "-->" + data[i] + "@ " + $('#' + data[i]).val();
    }
//                alert(result);
    var webformid = document.getElementById("planwebformid").value;
    $.get(localStorage.ipaddres + '/planningViewVF?type=loadgrid&webformid=' + webformid + '&result=' + result, function (responcejson) {
        if (responcejson.indexOf("Error") > 0) {
            debugger;
            alert(responcejson);
        }
        else {
            debugger;
            document.getElementById("planningdiv").innerHTML = responcejson;
//                  alert(document.getElementById("planningdiv").childNodes[0].id);
            loadclass(document.getElementById("planningdiv").childNodes[0].id);
            loaddisplay(document.getElementById("planningdiv").childNodes[0].id);
        }

    });
}

function loaddisplay(tabnm) {
    debugger;
    var tab = document.getElementById(tabnm);
    var cellln = tab.rows[0].cells.length;
    for (var i = 0; i < cellln; i++) {
        if (tab.rows[0].cells[i].getAttribute("dis") == "1") {
            for (var j = 1; j < tab.rows.length; j++) {
                tab.rows[j].cells[i].childNodes[0].setAttribute("disabled", "true");
            }
        }
        else if (tab.rows[0].cells[i].getAttribute("vis") == "1") {
            for (var j = 0; j < tab.rows.length; j++) {
                tab.rows[j].cells[i].style.display = "none";
            }
        }
    }

    for (var k = 0; k < cellln; k++) {
        if (tab.rows[0].cells[k].getAttribute("condition") == "GIVENDATE") {
            var flg = "1";
            for (var l = 1; l < tab.rows.length; l++) {
                if (tab.rows[l].cells[k].childNodes[0].value.trim() != "") {

                    flg = "0";
                    break;
                }
            }
            if (flg == "1") {
                sortthis();
            }
        }
    }
}

function loadclass(tabnm) {
    var tab = document.getElementById(tabnm);
    debugger;
    if (tab.rows.length > 0) {
        var cellln = tab.rows[0].cells.length;
        for (var i = 0; i < cellln; i++) {
            if (tab.rows[0].cells[i].getAttribute("class") == "datecls") {
                for (var j = 1; j < tab.rows.length; j++) {
                    tab.rows[j].cells[i].childNodes[0].setAttribute("class", "datecls");
                }
            }
        }
    }
    loadvacdates(tabnm);
    loadinitial(tabnm);
}

function loadinitial(tabnm) {
    var tab = document.getElementById(tabnm);
    debugger;
    var dateid = $('#txtdateid').val();
    if (tab.rows.length > 0) {
        var dep = "";
        var indp = "";
        var dif = "";
        var scdt = "";
        for (var k = 0; k < tab.rows[0].cells.length; k++) {
            if (tab.rows[0].cells[k].getAttribute("condition") == "INDEPENDENTID") {
                indp = k;
            }
            else if (tab.rows[0].cells[k].getAttribute("condition") == "DEPENDENTID") {
                dep = k;
            }
            else if (tab.rows[0].cells[k].getAttribute("condition") == "DIFFERENCE") {
                dif = k;
            }
            else if (tab.rows[0].cells[k].getAttribute("condition") == "SCHEDULEDATE") {
                scdt = k;
            }
        }
//                alert(dep);
        for (var i = 0; i < tab.rows.length; i++) {
            if (tab.rows[i].cells[dep].childNodes[0].value == "BIRTHDATE") {
                if (tab.rows[i].cells[scdt].childNodes[0].value.trim() == "") {
                    tab.rows[i].cells[scdt].childNodes[0].value = addDate($('#' + dateid).val(), tab.rows[i].cells[dif].childNodes[0].value)
                    tab.rows[i].cells[scdt].childNodes[0].onchange();
                }
            }
        }
    }
}

function loadvacdates(tabnm) {
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();

    $('#' + tabnm).find('input[class=datecls]').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1870:2020',
        maxDate: new Date(currentYear, currentMonth, currentDate),
        dateFormat: "dd/mm/yy"
    });

}

function change(id) {
    debugger;
    var rownum = id.parentNode.parentNode.rowIndex;
    var tab = document.getElementById("vactab");

    var dep = "";
    var indp = "";
    var dif = "";
    var scdt = "";
    for (var k = 0; k < tab.rows[0].cells.length; k++) {
        if (tab.rows[0].cells[k].getAttribute("condition") == "INDEPENDENTID") {
            indp = k;
        }
        else if (tab.rows[0].cells[k].getAttribute("condition") == "DEPENDENTID") {
            dep = k;
        }
        else if (tab.rows[0].cells[k].getAttribute("condition") == "DIFFERENCE") {
            dif = k;
        }
        else if (tab.rows[0].cells[k].getAttribute("condition") == "SCHEDULEDATE") {
            scdt = k;
        }
    }

    if (tab.rows[0].cells[id.parentNode.cellIndex].getAttribute("condition") == "SCHEDULEDATE") {


        var vacid = tab.rows[rownum].cells[indp].childNodes[0].value;
        for (var i = 1; i < tab.rows.length; i++) {
            if (tab.rows[i].cells[dep].childNodes[0].value == vacid) {
                var date = id.value;
                var days = tab.rows[i].cells[dif].childNodes[0].value;
                tab.rows[i].cells[id.parentNode.cellIndex].childNodes[0].value = addDate(date, days);
                tab.rows[i].cells[id.parentNode.cellIndex].childNodes[0].onchange();
            }
        }
    }

    else if (tab.rows[0].cells[id.parentNode.cellIndex].getAttribute("condition") == "GIVENDATE") {
        tab.rows[rownum].cells[scdt].childNodes[0].value = id.value;
        tab.rows[rownum].cells[scdt].childNodes[0].onchange();

    }
}







function savetemppln() {
    var finaldata = "";

    var mrnoid = $('#txtmrno').val();
    var mrno = $('#' + mrnoid).val();
    var webid = document.getElementById("planwebformid").value.trim();

    var table = $('#vactab').tableToJSON();
    var grddtls = (JSON.stringify(table));
//                    alert(grddtls);

    grddtls = grddtls.replace(/\+/g, '_pp');
    grddtls = encodeURIComponent(grddtls);
    var path = "/planningViewVF";
    document.getElementById("blockdiv").style.display = "block";
    debugger;
    $.ajax({
        url: path,
        type: "POST",
        data: 'type=save&webformid=' + webid + '&finaldata=' + finaldata + '&grddtls=' + grddtls + '&mrno=' + mrno,
        dataType: "text/html",
        success: function (responceJson) {
            debugger;
            document.getElementById("blockdiv").style.display = "none";
            alert(responceJson.responseText);
        },
        error: function (error) {
            debugger;
            document.getElementById("blockdiv").style.display = "none";
            alert(error.responseText);
        }
    });

}
//                    }
//                });
//                }


function popsearchpln(id) {
    debugger;
    var data = id.name;
    var data1 = data.split("@@");
    var qry = data1[2];
    qry = qry.replace("@", "'");
    var tab = data1[3];
    tab = tab.split("@").join("'");
    var txtf = data1[0] + "@@" + data1[1];
    var path = "<%=request.getContextPath()%>";
    qry = qry.replace("`", "'");
    window.open('' + path + '/OP/SearchPopupVF.jsp?qry=' + qry + '&tab=' + tab + '&txtf=' + txtf + '&ordby=', '', 'width=640,height=600');

}

//            function ReloadOP(rt) {
//                debugger;
//                var et=rt.split("&");
//                if(et[0].indexOf("@@")>0){
//                    var dat=et[0].split("@@");
//                    document.getElementById(dat[0]).value=et[1];
//                    document.getElementById(dat[1]).value=et[2];
////                    chkvalidation(dat[0],dat[1]);
//                    fillconditionpln(dat[1],'5',dat[0]);
//                }
//               
//                
//            }

function onchangefunpln(id, flg) {
    debugger;
    var condition = id.title;
    var fid = document.getElementById("planwebformid").value.trim();

    if (id.title.indexOf("SH:QRY") >= 0) {
        fillconditionpln(id.id, flg, condition);
    }
    if (id.title == 'LOADGRID') {
        loadplan();
    }
}



function loadmrno() {
    var mrnoid = $('#txtmrno').val();
    var mrno = localStorage.mrno;
    if (mrno != "null") {
        $('#' + mrnoid).val(mrno);
        document.getElementById(mrnoid).onchange();
    }
}



function displaymsg() {
    $(function () {
        debugger;

        $("#splgrd").dialog({
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

function transferrow(id) {
//            alert(id.parentNode.parentNode.parentNode.id);
    debugger;
    if (id.parentNode.parentNode.parentNode.id == "splgrd") {
        var appdtab = document.getElementById("vactab");
        var tab = document.getElementById(id.parentNode.parentNode.id);
        var indp = "";
        var dep = "";
        var dif = "";
        var scdt = "";
        for (var k = 0; k < tab.rows[0].cells.length; k++) {
            if (tab.rows[0].cells[k].getAttribute("condition") == "INDEPENDENTID") {
                indp = k;
            }
            else if (tab.rows[0].cells[k].getAttribute("condition") == "DEPENDENTID") {
                dep = k;
            }
            else if (tab.rows[0].cells[k].getAttribute("condition") == "DIFFERENCE") {
                dif = k;
            }
            else if (tab.rows[0].cells[k].getAttribute("condition") == "SCHEDULEDATE") {
                scdt = k;
            }
        }

        var maintab = document.getElementById("vactab");
        for (var j = 1; j < maintab.rows.length; j++) {
            if (id.cells[indp].childNodes[0].value == maintab.rows[j].cells[indp].childNodes[0].value) {
                alert(id.cells[indp - 1].childNodes[0].value + " is Already Exist in List");
                $("#splgrd").dialog("close");
                for (var m = 0; m < tab.rows[j].cells.length; m++) {
                    maintab.rows[j].cells[m].childNodes[0].style.backgroundColor = 'aquamarine';

                }

                return;
            }
        }
//                alert(id.outerHTML);
        var row = $(id.outerHTML);
        row.appendTo(appdtab);
        $("#splgrd").dialog("close");
//                alert(id.cells[dep].childNodes[0].value);
        debugger;
        var flg = "0";
        var maintab = document.getElementById("vactab");
        for (var k = 1; k < maintab.rows.length; k++) {
            if (id.cells[dep].childNodes[0].value.trim() == maintab.rows[k].cells[indp].childNodes[0].value.trim()) {
                maintab.rows[k].cells[scdt].childNodes[0].onchange();
                flg = "1";
            }
        }
        if (flg == "0") {
            var dtid = $('#txtdateid').val();
            tab.rows[tab.rows.length - 1].cells[scdt].childNodes[0].value = $('#' + dtid).val();
        }
    }
}


function getprntdis() {
    if (document.getElementById("chkprint").value.trim() == '1') {
        $('#tdwebpr').show();
    }
    else {
        $('#tdwebpr').hide();
    }
}
function getPrint() {
    debugger;
    var transid = "";
    var ptype;
    if (document.getElementById("chkprint").value.trim() == '1') {
        ptype = '0';
        transid = document.getElementById("cmbmecweb").value;
    }
    else {
        ptype = '1';
    }
    var webid = localStorage.webforid;
    var scrdata = $('#txtheaddata').val();
    var data = scrdata.split("@");
    var result = "";
    for (var i = 1; i < data.length; i++) {
        result = result + "-->" + data[i] + "@ " + $('#' + data[i]).val();
    }
    window.open('/planningViewVF?type=print&webid=' + webid + '&result=' + result + '&transid=' + transid + '&ptype=' + ptype);
}

function clickthis(id) {
    debugger;
    if (id.parentNode.parentNode.parentNode.title != "finaltable" + document.getElementById("focuswebformid").value) {
        var tab = id.parentNode.parentNode;
        for (var i = 0; i < tab.rows.length; i++) {
            tab.rows[i].cells[1].style.backgroundColor = "";
        }

        if (id.parentNode.cells[0].childNodes[0].checked === true) {
            id.parentNode.cells[0].childNodes[0].checked = false;
            id.parentNode.cells[0].childNodes[0].onchange();

//                id.style.backgroundColor="";
            $(id).removeClass('grdtr2');
        }
        else {
            id.parentNode.cells[0].childNodes[0].checked = true;
            id.parentNode.cells[0].childNodes[0].onchange();
            $(id).addClass('grdtr2');
        }

    }
    else {
        if (id.parentNode.cells[0].childNodes[0].checked === true) {
            id.parentNode.cells[0].childNodes[0].checked = false;
            id.parentNode.cells[0].childNodes[0].onchange();
            $(id).removeClass('grdtr2');
        }
        else {
            id.parentNode.cells[0].childNodes[0].checked = true;
            id.parentNode.cells[0].childNodes[0].onchange();
            $(id).addClass('grdtr2');
        }
    }


}

function showdetaisl1(id) {
    debugger;
    try{    
                oab1.close();
            }catch(err){
               // alert(err);
            }
             try{    
                oab.close();                
            }catch(err){
               // alert(err);
            }
    var webid = id.getAttribute("webformid");
    var id1 = id.id;
    if (id.checked == true) {
    }
    else {
        removeThese(id.id, webid);
        return;
    }
    var maindiv = "finalmain" + webid;
    var svid = "save" + webid;
//            try{
//                document.getElementById(maindiv).style.display="block";
//            }
//            catch(ee){
//            }
    var word = "txtworddole" + webid;
    var prec = "btnprec" + webid;
    $.get(localStorage.ipadrs + '/DisTemplateView?type=fillgrid&webid=' + webid + '&favarate=yes&id=' + id1, function (responcejson) {
        if (responcejson != null && responcejson != "") {
            debugger;

            var ftab = "finaltable" + webid;
            var nxttab = document.getElementById(ftab);

            var data = "";
            var celllength = nxttab.rows[0].cells.length;
            var cols = "";
            for (var j = 3; j < celllength; j++) {
                var lbl = nxttab.rows[0].cells[j].textContent;
                lbl = "id_" + lbl;
                //                      lbl=lbl.replace(" ","_");
                lbl = lbl.split(" ").join("_");
                cols = cols + "@" + lbl + "-->" + nxttab.rows[0].cells[j].title;
            }
//                  alert(cols);
//                            $('#finaltable').find("tr:gt(0)").remove();
            if (responcejson.length > 0) {
                nxttab.rows[0].cells[1].childNodes[0].style.display = "none";
                for (var k = 0; k < responcejson.length; k++) {
                    var slno = nxttab.rows.length;
                    var cmblbl = "";
                    if (k == responcejson.length - 1) {
                        data = "<tr><td style='display:none'>" + id.id + "</td><td height='20' style='display:none'><input type='button' value='Add' onclick='addToGrid(this)' class='btn2'></td><td width='1%'>" + slno + "</td>";
                    }
                    else {
                        data = "<tr><td style='display:none'>" + id.id + "</td><td height='20' style='display:none'><input type='button' value='Add' onclick='addToGrid()' class='btn2' style='display:none'></td><td width='1%'>" + slno + "</td>";
                    }

                    data = data + "<td width='1%' align='center'><span class='glyphicon glyphicon-remove redcross' onclick='hidetemp(this)'></span></td>";
                    var cl = cols.split("@");
                    for (var l = 1; l < cl.length; l++) {
                        var cl2 = cl[l].split("-->");
                        if (cl2[1].indexOf("combo") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
//                                        var k1=k+slno;
                            data = data + "<td><select id='" + cl2[0] + "_" + slno + "' onchange='onchangefun(this)' style='width:100%'>" + document.getElementById(cl2[0]).innerHTML + "</select></td>";
//data=data+"<td>"+document.getElementById(cl2[0]).outerHTML+"</td>";
                            cmblbl = cmblbl + "-->" + cl2[0] + "_" + slno + "@" + responcejson[k][cl1];
                        }
                        else if (cl2[1].indexOf("text") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td><input type='text' style='width:98%' value='" + responcejson[k][cl1] + "' onchange='onchangefun(this)' placeholder='Type Here'></td>";
                        }
                        else if (cl2[1].indexOf("searchmain") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td><input onkeydown='searchData(this)' type='text' value='" + responcejson[k][cl1] + "' class='inputwthimg' onchange='onchangefun(this)' placeholder='Type Here To Search' style='width:87%'></td>";
                        }
                        else if (cl2[1].indexOf("searchhdn") >= 0) {
                            var cl1 = cl2[0].toUpperCase();
                            data = data + "<td style='display:none'><input type='text' value='" + responcejson[k][cl1] + "' class='inputwthimg' onchange='onchangefun(this)' placeholder='Type Here'></td>";
                        }
                    }
//                                data=data+"<td style='padding:0px;' align='center'><input type='button' value='Delete' onclick=deleterow(this.parentNode) style='cursor:pointer;width:auto;' class='rbtn'></td>";
//                                    data=data+"<td style='padding:0px;' align='center'><input type='checkbox' checked='true' style='cursor:pointer;width:auto;' class='btn2'></td>";
                    data = data + "</tr>";
                    data = $(data);
                    data.appendTo(nxttab);
                    var cmblbl1 = cmblbl.split("-->");
                    for (var n = 1; n < cmblbl1.length; n++) {
                        var cmb = cmblbl1[n].split("@");
                        document.getElementById(cmb[0]).value = cmb[1];
                    }

                }
                shafilall(webid);
                applydisable(webid);
                try {

                    debugger;

                    var outer = document.getElementById("outertemplate");
                    var dd = document.getElementById(maindiv);
                    if (dd.style.display == "none") {
                        outer.appendChild(dd);
                        document.getElementById(maindiv).style.display = "block";
                    }

                }
                catch (ee) {
                    alert(ee);
                }
            }

            debugger;
            if (nxttab.rows.length > 1) {
                if (document.getElementById(word).value == "1") {
                    document.getElementById(svid).style.display = "none";
                }
                else {
                    document.getElementById(svid).style.display = "none";
                }

                document.getElementById(prec).style.display = "block";
            }
            else {
                document.getElementById(svid).style.display = "none";
                document.getElementById(prec).style.display = "block";
            }
            addToGrid('', '', webid);

        }

    });

}
function saveworddole(id) {
    var webid = id.getAttribute("savewebformid");
    var saveid = "save" + webid;
    document.getElementById(saveid).onclick();
}
function backtogrid(id, flg) {
    debugger;
    if (flg == "1") {
        document.getElementById(id.getAttribute("backwebformid")).style.display = "block";
    }
    var prid = id.getAttribute("preid");
    var backid = id.getAttribute("backid");
    document.getElementById(prid).style.display = "none";

    document.getElementById(backid.replace("tab_", "")).style.display = "block";

}
function hidethis(id) {
    if (id == "maintable") {
        document.getElementById("maintable").style.display = "none";
        document.getElementById("subtable").style.display = "block";
//                document.getElementById("subtable").classList.add(' sbtbl');
        document.getElementById('subtable').className += ' sbtbl';
    }
    else {
        document.getElementById("maintable").style.display = "block";
        document.getElementById("subtable").style.display = "none";
//                document.getElementById("maintable").classList.add(' mntbl');
        document.getElementById('maintable').className += ' mntbl';
    }
}

function clickthis1(id) {
    if (id.parentNode.cells[0].childNodes[0].checked === true) {
        id.parentNode.cells[0].childNodes[0].checked = false;
        id.parentNode.cells[0].childNodes[0].onchange();
        $(id).removeClass('grdtr2');
    }
    else {
        id.parentNode.cells[0].childNodes[0].checked = true;
        id.parentNode.cells[0].childNodes[0].onchange();
        $(id).addClass('grdtr2');
    }
}

function showdatagrid(id) {
    debugger;
    try{    
                oab1.close();
            }catch(err){
               // alert(err);
            }
             try{    
                oab.close();                
            }catch(err){
               // alert(err);
            }
    var webformid = localStorage.webformid;
    var mrno = localStorage.mrno;
    var docid = localStorage.docid;
    var episodeid = "";
    document.getElementById('mydiv').style.display = 'block';

    $.get(localStorage.ipadrs + '/DisTemplateView?type=showprevious&webformid=' + webformid + '&mrno=' + mrno + '&docid=' + docid + '&episodeid=' + episodeid, function (responcejson) {
        if (responcejson != "") {
            document.getElementById('mydiv').style.display = 'none';
            document.getElementById("encounter").innerHTML = responcejson;
            document.getElementById("positionleft").style.display = "block";
            document.getElementById("datagrid").style.display = "block";
            document.getElementById("rghtscrl").style.display = "none";
            displaymsg6();

            $(".ui-dialog-title").css("width", "100%");
            $(".ui-dialog-title").css("margin-top", "-1px");
            $(".ui-dialog-title").css("margin-left", "-1px");
            $(".ui-dialog-title").css("height", "22px");
        }
    });

    document.getElementById("rghtscrl").style.width = "100%";
//            }
}

function displaymsg6() {
    $(function () {
        debugger;

//                    $("#datagrid").dialog({
//                        resizable: false,
//                        height: '350',
//                        width: '80%',
//                        top:'100px',
//                        modal: true,
//                        top:'0px',
//                        buttons: {
//                            "Cancel": function() {
//                                $(this).dialog("close");
//                            }
//                        }
//                    });
        //document.getElementById("txtmrnum").focus();
    });
    $(".ui-dialog-title").css("width", "100%");
    $(".ui-dialog-title").css("margin-top", "-1px");
    $(".ui-dialog-title").css("margin-left", "-1px");
    $(".ui-dialog-title").css("height", "22px");
}


//            $(document).ready(function() {
//    $('#dateCol').click(function() {
//        sortTable();
//    });

var asc = true;

function sortthis(idd) {
//        alert("hi");
    debugger;
    var cnt = "";

    var tbl = document.getElementById("vactab").tBodies[0];
    for (var k = 0; k < tbl.rows[0].cells.length; k++) {
        if (tbl.rows[0].cells[k].getAttribute("condition") == "SCHEDULEDATE") {
            cnt = k;
        }
    }
    var store = [];
    for (var i = 1, len = tbl.rows.length; i < len; i++) {
        var row = tbl.rows[i];
        var rowdatedata = row.cells[cnt].childNodes[0].value;
        var rowdatesplit = rowdatedata.split('/');

        var rowdatetimestamp = new Date(parseInt(rowdatesplit[2], 10), parseInt(rowdatesplit[1], 10) - 1, parseInt(rowdatesplit[0], 10), 0, 0, 0).getTime() / 1000;
        if (!isNaN(rowdatetimestamp))
            store.push([rowdatetimestamp, row]);
    }

    if (asc) {
        store.sort(function (x, y) {
            return x[0] - y[0];
        });
//            document.getElementById('dateCol').textContent = 'Date ↑';
//            asc = false;
    }
    else {
        store.sort(function (x, y) {
            return y[0] - x[0];
        });
//            document.getElementById('dateCol').textContent = 'Date ↓';
        asc = true;
    }

    for (var i = 0, len = store.length; i < len; i++) {
//            var idno = i + 1;
//            store[i][1].cells[0].childNodes[0].value = idno.toString();
        tbl.appendChild(store[i][1]);
    }
    store = null;
}
//});
function adnw() {
//    $('.dropdownCont').css('display','block');
    $('.dropdownCont').toggle();
    document.getElementById("editor-options").innerHTML = document.getElementById("custom-menu").innerHTML;
    document.getElementById("editor-options").style.display = "block";
}
        