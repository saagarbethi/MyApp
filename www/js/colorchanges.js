/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var style_cookie_name = "style" ;
var style_cookie_duration = 30 ;

function switch_style1 ( css_title ,type, serverpath)
{
     $('.Hmain-nav').css("background","");
      $(".containerd .quickinfobtn").css("background","");
      $(".quickinfobtn").css("background","");
    debugger;
    try{
          $(".heading").css("background","");
            $(".grdrown").css("background","");
            $(".topheadingInTemplate").css("background","");
            $(".tabstd").removeClass("tabstddflt");
            remvebkclass();
      }catch(errs){}
    // You may use this script on your site free of charge provided
    // you do not remove this notice or the URL below. Script from
    // http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
    if(css_title.indexOf("#")>-1){
        chnagecssnew(css_title)
    }else{
        try{
            document.getElementById('customtheme').innerHTML = "";
        }catch(err){
            
        }
      

        var i, link_tag ;
        for (i = 0, link_tag = document.getElementsByTagName("link") ;i < link_tag.length ; i++ ) {
            if ((link_tag[i].rel.indexOf( "stylesheet" ) !== -1) &&
                link_tag[i].title) {
                link_tag[i].disabled = true ;
                if (link_tag[i].title === css_title) {
                    link_tag[i].disabled = false ;
                }
            }
            set_cookie( style_cookie_name, css_title,style_cookie_duration );
        }
    }
    debugger;
    if(type!="1"){
        try{
            saveTheme(css_title,serverpath);
        }catch(err){
           // alert(err+"--"+css_title+"--"+serverpath);
        }
        
    }
  try {
                var i, link_tag ;
                var isExists = 0;
                              link_tag = document.getElementsByTagName("link") ;
    var css_title = localStorage.themecolor;
            if(css_title != undefined && css_title != ""){
                  for (i = 0, link_tag = document.getElementsByTagName("link"); i < link_tag.length ; i++ ) {
             if ((link_tag[i].rel.indexOf( "stylesheet" ) !== -1) &&
                 link_tag[i].title) {
                 if (link_tag[i].title === css_title) {
                     isExists = 1;
                 }
             }
         }
                if (css_title === "orange") {
                    StatusBar.backgroundColorByHexString("#c72915");
                    }
                    else if (css_title === "green"){
                         StatusBar.backgroundColorByHexString("#496b03");
                    }
                    else if (css_title === "blue"){
                         StatusBar.backgroundColorByHexString("#033261");
                    }
                    else if (css_title === "teal"){
                         StatusBar.backgroundColorByHexString("#00635f");
                    }
                    else if (css_title === "yellow"){
                         StatusBar.backgroundColorByHexString("#5e6100");
                    }
                    else if (css_title === "gray"){
                         StatusBar.backgroundColorByHexString("#383838");
                    }
                    else if (css_title === "peach"){
                         StatusBar.backgroundColorByHexString("#a04d00");
                    }
                    else if (css_title === "pink"){
                         StatusBar.backgroundColorByHexString("#ca1967");
                    }
                    else if (css_title === "purple"){
                         StatusBar.backgroundColorByHexString("#37196f");
                    }
                    else if (css_title === "red"){
                         StatusBar.backgroundColorByHexString("#4b0150");
                    }
                    else if (css_title === "skyblue"){
                         StatusBar.backgroundColorByHexString("#005b65");
                    }
                    else if (css_title === "yellownew"){
                         StatusBar.backgroundColorByHexString("#946e00");
                    }
                    }
                     if(isExists == 0){
         var color = localStorage.themecolor;
         color = color.replace("%23","#");
         //confirm(color);
         chnagecssnew(color);
         //confirm(cssdata);
     }
            } catch (err) {
//            alert(err);
            }
}
function saveTheme(css) {
                debugger;
                $('#hdnTheme').val(css);
                css = encodeURIComponent(css);
                localStorage.themecolor = css;
                $.get(localStorage.ipadrs +'/ThemeSave?theme=' + css+"&frommobile=1&userid="+localStorage.userid, function (responsetext) {
                    //confirm(responsetext+"--"+localStorage.userid);
                });
            }
function set_style_from_cookie()
{
    var css_title = get_cookie( style_cookie_name );
    if (css_title.length) {
        switch_style( css_title );
    }
}
function set_cookie ( cookie_name, cookie_value,
    lifespan_in_days, valid_domain )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ?
    ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name +
    "=" + encodeURIComponent( cookie_value ) +
    "; max-age=" + 60 * 60 *
    24 * lifespan_in_days +
    "; path=/" + domain_string ;
}
function get_cookie ( cookie_name )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match (
            '(^|;)[\s]*' +
            cookie_name +
            '=([^;]*)' );
        return decodeURIComponent ( cookie_value[2] ) ;
    }
    return '' ;
}

function gradientnew(topColor, elm) {
    debugger;
    try{
    var hex = topColor;
    function hexToRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
	
    var ratio = 1.24;
    var top = hexToRgb(topColor);
    var r = Math.floor(top.r / ratio);
    var g = Math.floor(top.g / ratio);
    var b = Math.floor(top.b / ratio);
    var bottom = rgbToHex(r, g, b);
    var bg = "linear-gradient(to bottom,  " + hex + " 0%, " + bottom + " 100%)";
    return bottom;
    }catch(err){
        //alert(err+"--"+topColor);
    }
}
function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
function chnagecssnew(csscolor){
    var color = csscolor;
    color1= "#d3d3d3"
    var gcolor=gradientnew(csscolor);
     var glightcolor=adjust(csscolor,99);
    
    var css ="";
    try{
        var theee = $("#customtheme");
        theee[0].innerHTML = '';
    }catch(err){
        
    }
   
     css = css + "       .main-header, .skin-blue .main-header .logo{"
    css = css + "	    background:"+color+" !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .setfooter{"
    css = css + "	    background:"+color+" !important;"
    css = css + "          }"
    css = css + "		"
     css = css + "       .info-box-icon{"
    css = css + "	    background:"+color+" !important;"
    css = css + "          }"
    css = css + "		"
     css = css + "      .btntbrall .allrecall, .slidebtntoup .heading, div.tbl-striped div.heading, .bootstrap-dialog.type-info .modal-header, .bootstrap-dialog.type-success .modal-header, #ui-datepicker-div .ui-widget-header, .gtmmainhdlbl1, .hedrowtop, .divdatachild table tr.dis2label, table#divpacsid tr.dis2label, .child-div .heading{"
    css = css + "	    background:"+color+" !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .gg table tr td a.addel{"
    css = css + "	    background:"+gcolor+" !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .iosstatusbar{"
    css = css + "	    background:"+gcolor+" !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .menufooter #btnshow,.footr_001 #btnshow{"
    css = css + "	    background:"+gcolor+" !important;"
    css = css + "	    border:0px !important;"
    css = css + "          }"
    css = css + "		"
     css = css + "       .ui-state-default, .ui-widget-content a.ui-state-default, #tabcomp tr.topbg, .gg .tblsrcwk tr td.addelcont, h5.gtmh5, #myModalss .modal-header, .divboxcont table td.grdtblhd, .boxbdr .label1, .contdiv .dildata .listtablegriddiv .listtablegriddiv1,.contdiv .dildata .listtablegriddiv  .listtablegriddiv1 .hdngrowlbl,.contdiv .dildata .listtablegriddiv .hdngrow,.contdiv .dildata .listtablegriddiv .hdngrow .hdngrowlbl{"
    css = css + "	    background:"+glightcolor+" !important;"
    css = css + "	    color:#000 !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .btn.btn-info.btnatch, .btn.btn-primary.clstrack, .bootstrap-dialog-footer-buttons .btn, .btn.btn-danger.printfootbtn, .dsplyfrmnav .sharebtn, .dsplyfrmnav .btnprint, .btnrow_01 table tr td .ajb, .srchicondiv, .btnul .btnli .clsepnl, .headrrtree.cd-main-content, .footr_001, .cd-panel-header .menuhead, .cd-panel-container .menufooter, .btnblock .btns, .mddtp-picker .mddtp-picker__header, .mddtp-picker__body .mddtp-picker__viewHolder .mddtp-picker__grid .mddtp-picker__tr span.mddtp-picker__cell:hover, .mddtp-picker__body .mddtp-picker__viewHolder .mddtp-picker__grid span.mddtp-picker__cell--selected, .maindiv.notpageno .morercrdbtn, .divforsearch.divsrchnewcls header, .tablestriped>tbody>tr.srchtblhdr, .loadrcord .morercrdbtn, .popup.popupsrh h2, .retdash a, .inlogininfo button.btn-block, .header.calhead, .row_001 button.btn-block.calbtnsub, .table-condensed thead tr:nth-child(1), .table-condensed tfoot tr, .datetimepicker table tr td.active.active, .savdiv .btnftr, .dmmanav, .searchbtnicon, .navbarstyle, .btndt, .topnavbar, .grdtr{"
    css = css + "	    background:"+color+" !important;"
    css = css + "	    border:0px !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .spanatch, .spnuolodicon, .divbrdr .sbhdng, .ui-listview>.ui-li-divider, .mddtp-button, .tblfrmdttodt tr td .glpcal, .inlogininfo .form-group label.active, .icheck>label, .editbtn, .removebtn, .deltxt, .edittxt, .lblcal span.spncalicn, .bodysecond .active1, .sreachdivn .glyleft{"
    css = css + "	    color:"+color+" !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       @media screen and (min-width: 1200px){"
    css = css + "       .btnicon1, .btnsting{"
    css = css + "	    color:"+gcolor+" !important;"
    css = css + "          }"
    css = css + "          }"
    css = css + "		"
    css = css + "       .rowfirst .frstdiv, .notification, .camera{"
    css = css + "	    background:"+color+" !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .labdivhed, .dataclmn:nth-child(1){"
    css = css + "	    background:"+glightcolor+" !important;"
    css = css + "	    color:#000 !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .labdivhed span{"
     css = css + "	    color:#000 !important;"
    css = css + "          }"
    css = css + "		"
    css = css + "       .bublehdngrowlbl, .serchaftrdiv .btnbksrch{"
    css = css + "	    color:"+color+" !important;"
    css = css + "          }"
     css = css + "		"
    css = css + "       div.notfictonmndiv .bubble{"
    css = css + "	    border:2px solid "+color+" !important;"
    css = css + "          }"
     css = css + "		"
    css = css + "       .seconddiv .btnprint, .tdsave .btn-success, .btnAttchfil{"
    css = css + "	    background:"+color+" !important;"
    css = css + "	    border:0px !important;"
    css = css + "          }"
     css = css + "		"
    css = css + "       .ui-datepicker th{"
    css = css + "	    background:#ddd !important;"
    css = css + "	    color:#000 !important;"
    css = css + "          }"
     css = css + "		"
    css = css + "       .ui-datepicker td a.ui-state-default{"
    css = css + "	    background:"+glightcolor+" !important;"
     css = css + "	    color:#000 !important;"
    css = css + "          }"
     css = css + "		"
    css = css + "       .ui-datepicker td a.ui-state-default.ui-state-highlight.ui-state-active{"
    css = css + "	    background:#fff !important;"
    css = css + "          }"
     css = css + "		"
    css = css + "       .managefooter .btnclose{"
    css = css + "	    background:transparent !important;"
    css = css + "          }";
     try{

    StatusBar.backgroundColorByHexString(gcolor);
     }  catch(err){}
    debugger;
    try{
        document.getElementById('customtheme').innerHTML = css
    }catch(err){
        $( "<style id='customtheme'>"+css+"</style>" ).appendTo( "head" );
    }
    console.log("color");
    $('.Hmain-nav').css("background",color);
    $(".containerd .quickinfobtn").css("background",color);
    $(".quickinfobtn").css("background",color);
//return false;
    
}

