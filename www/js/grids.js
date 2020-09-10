/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var mobilenew = "&mobile=yes&terminalid=" + localStorage.terminal + "&shiftid=SH000001&subdeptid=" + localStorage.sdeptid + "&deptid=" + localStorage.deptid + "&loc=" + localStorage.locid + "&usernm=" + localStorage.usernm + "&userid=" + localStorage.userid + "&guserid=" + localStorage.userid + "&gusernm=" + localStorage.usernm + "&gloc=" + localStorage.locid + "&gdept=" + localStorage.deptid + "&gsubdept=" + localStorage.sdeptid + "&ShiftId=SH000001&version=" + localStorage.appname + "&clientip=" + localStorage.terminal + "&rights=" + encodeURIComponent(localStorage.rights);
$(document).ready(function(){
    try{
        debugger;
        var path = localStorage.ipadrs;
        var formid = localStorage.formid;
        var currentformid = localStorage.currentformid;
        var locid = localStorage.locid;
        var deptid = localStorage.deptid;
        var sdeptid = localStorage.subdeptid;
        console.log("deptid = "+deptid);
        console.log("sdeptid = "+sdeptid);
        $.get(path+"/formview?webformid="+currentformid+"&frompage="+formid+"&mobile=yes&locid="+locid+"&deptid="+deptid+"&subdeptid="+sdeptid+mobilenew,function(responsetext){
            $('#divgraphs').html(responsetext);
            $("#txtFrom").datepicker({
                dateFormat: 'dd/mm/yy'
            });
            $("#txtTo").datepicker({
                dateFormat: 'dd/mm/yy'
            });
            loadData();
             if(localStorage.appname === 'myemr') {
                            $("#settbutton").css("display","none");                     
                                                } 
        });
    }catch(err){
        $('#mydiv').hide();
        alert(err);
    }
});
function loadData(){
   try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    try{
        $('#mydiv').show();
        $.get(localStorage.ipadrs+"/login?type=loc&usernm="+localStorage.usernm, function(responseJson) {
            if (responseJson.length>0) {  
                var select = document.getElementById("ddlLoc");
                select.length = 0;
                var mem = responseJson;
                for (var i = 0; i < mem.length; i++) {
                    var sourcename = responseJson[i]['LOCNM'].replace("&#160;"," ");
                    var indexo = responseJson[i]['LOCID'];
                    select.options[select.options.length] = new Option(sourcename, indexo);
                }
                if(localStorage.locid!==undefined ){
                     document.getElementById("ddlLoc").value = localStorage.locid;
                } 
                getDataGrids();
            }else{
                $('#mydiv').hide();
            }
            
        });
    }catch(err){
        $('#mydiv').hide();
        alert(err);
    }
}
function getDataGrids(){
    try{ var htldo = window.innerHeight;
          var asgnmrgn=htldo/2;
          $('#mydiv img').css("margin-top",parseInt(asgnmrgn)+-50+"px");
      }catch(err){}
    try{
         $('#mydiv').show();
         debugger;
        var wfid =  localStorage.currentformid;
         var userid =  localStorage.userid;
        var locid =  document.getElementById("ddlLoc").value;
          var deptid = localStorage.deptid;
        var sdeptid = localStorage.subdeptid;
        var fromdt =  $('#txtFrom').val();
        var todt =  $('#txtTo').val();
       //   localStorage.patapp = 1;
                    var webLoginUser = "";
                    if(localStorage.patapp=="1"){
                        webLoginUser = "&webLoginUser="+localStorage.patmrno;
                    }
        $.get(localStorage.ipadrs+"/WebFormSaveGrid?reqtype=gridsdatanew&mobile=1&userid="+userid+"&wfid="+wfid+"&locid="+locid+"&fromdt="+fromdt+"&todt="+todt+"&deptid="+deptid+"&subdeptid="+sdeptid+webLoginUser, function(responseText) {
//            if(responseText.indexOf("Exception") !== -1)
//                alert(responseText);
            $('#mydiv').hide();
            if (responseText !== null) {
                //responseText ="@@@tabgrdNew_Patients_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>LOCNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Hyderguda-unit4</td><td align='right' widht='30%'>31</td><td align='right' widht='30%'>16250</td></tr><tr width='100%'><td width='40%' align='left'>Jubilee Hills</td><td align='right' widht='30%'>17</td><td align='right' widht='30%'>13600</td></tr><tr width='100%'><td width='40%' align='left'>Hyderguda</td><td align='right' widht='30%'>13</td><td align='right' widht='30%'>5800</td></tr><tr width='100%'><td width='40%' align='left'>Bogulkunta</td><td align='right' widht='30%'>12</td><td align='right' widht='30%'>4950</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>73</td><td align='right' width='30%'style='background:#FBF9C1'>40600</td></tr></tbody>@@@tabgrdReviews_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>LOCNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Hyderguda</td><td align='right' widht='30%'>102</td><td align='right' widht='30%'>34400</td></tr><tr width='100%'><td width='40%' align='left'>Bogulkunta</td><td align='right' widht='30%'>75</td><td align='right' widht='30%'>26000</td></tr><tr width='100%'><td width='40%' align='left'>Hyderguda-unit4</td><td align='right' widht='30%'>69</td><td align='right' widht='30%'>28500</td></tr><tr width='100%'><td width='40%' align='left'>Jubilee Hills</td><td align='right' widht='30%'>53</td><td align='right' widht='30%'>27950</td></tr><tr width='100%'><td width='40%' align='left'>Fast Track Op Bogulkunta</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>650</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>300</td><td align='right' width='30%'style='background:#FBF9C1'>117500</td></tr></tbody>@@@tabgrdDoctor_Wise_New_Patients_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>DOCTORNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Manjula P.</td><td align='right' widht='30%'>18</td><td align='right' widht='30%'>11700</td></tr><tr width='100%'><td width='40%' align='left'>Rajitha Reddy</td><td align='right' widht='30%'>10</td><td align='right' widht='30%'>8000</td></tr><tr width='100%'><td width='40%' align='left'>Surekha</td><td align='right' widht='30%'>7</td><td align='right' widht='30%'>3850</td></tr><tr width='100%'><td width='40%' align='left'>Shashikala. D</td><td align='right' widht='30%'>7</td><td align='right' widht='30%'>5600</td></tr><tr width='100%'><td width='40%' align='left'>Shakira</td><td align='right' widht='30%'>6</td><td align='right' widht='30%'>3300</td></tr><tr width='100%'><td width='40%' align='left'>Pooja Jha Nair</td><td align='right' widht='30%'>5</td><td align='right' widht='30%'>2250</td></tr><tr width='100%'><td width='40%' align='left'>Fh Neonatal-hg</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1250</td></tr><tr width='100%'><td width='40%' align='left'>Geetha.</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>300</td></tr><tr width='100%'><td width='40%' align='left'>Suseela</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>950</td></tr><tr width='100%'><td width='40%' align='left'>Fh Neonatal</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>0</td></tr><tr width='100%'><td width='40%' align='left'>Jyoshna. T</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>300</td></tr><tr width='100%'><td width='40%' align='left'>Rajeev</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>1100</td></tr><tr width='100%'><td width='40%' align='left'>Srinivas Murki</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>Lavanya Gadi</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>Madhavi. V</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>900</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>72</td><td align='right' width='30%'style='background:#FBF9C1'>40600</td></tr></tbody>@@@tabgrdDoctor_Wise_Reviews_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>DOCTORNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Surekha</td><td align='right' widht='30%'>35</td><td align='right' widht='30%'>12000</td></tr><tr width='100%'><td width='40%' align='left'>Suseela</td><td align='right' widht='30%'>35</td><td align='right' widht='30%'>14500</td></tr><tr width='100%'><td width='40%' align='left'>Manjula P.</td><td align='right' widht='30%'>32</td><td align='right' widht='30%'>13000</td></tr><tr width='100%'><td width='40%' align='left'>Shakira</td><td align='right' widht='30%'>32</td><td align='right' widht='30%'>9600</td></tr><tr width='100%'><td width='40%' align='left'>Shashikala. D</td><td align='right' widht='30%'>30</td><td align='right' widht='30%'>13650</td></tr><tr width='100%'><td width='40%' align='left'>Rajitha Reddy</td><td align='right' widht='30%'>22</td><td align='right' widht='30%'>13650</td></tr><tr width='100%'><td width='40%' align='left'>Rajeev</td><td align='right' widht='30%'>19</td><td align='right' widht='30%'>6800</td></tr><tr width='100%'><td width='40%' align='left'>Tejo Pratap</td><td align='right' widht='30%'>18</td><td align='right' widht='30%'>6400</td></tr><tr width='100%'><td width='40%' align='left'>Santosh R</td><td align='right' widht='30%'>14</td><td align='right' widht='30%'>5200</td></tr><tr width='100%'><td width='40%' align='left'>Fh Neonatal-hg</td><td align='right' widht='30%'>8</td><td align='right' widht='30%'>2800</td></tr><tr width='100%'><td width='40%' align='left'>Lavanya Gadi</td><td align='right' widht='30%'>8</td><td align='right' widht='30%'>3200</td></tr><tr width='100%'><td width='40%' align='left'>Srinivas Murki</td><td align='right' widht='30%'>5</td><td align='right' widht='30%'>1600</td></tr><tr width='100%'><td width='40%' align='left'>Nutrifit</td><td align='right' widht='30%'>5</td><td align='right' widht='30%'>2000</td></tr><tr width='100%'><td width='40%' align='left'>Con. Fee (Anaesthetist-pac)</td><td align='right' widht='30%'>5</td><td align='right' widht='30%'>2000</td></tr><tr width='100%'><td width='40%' align='left'>Hei Second Visit</td><td align='right' widht='30%'>4</td><td align='right' widht='30%'>600</td></tr><tr width='100%'><td width='40%' align='left'>Kasturi Sarvotham</td><td align='right' widht='30%'>4</td><td align='right' widht='30%'>1600</td></tr><tr width='100%'><td width='40%' align='left'>Hari Kishan</td><td align='right' widht='30%'>4</td><td align='right' widht='30%'>1600</td></tr><tr width='100%'><td width='40%' align='left'>Hei First Visit</td><td align='right' widht='30%'>4</td><td align='right' widht='30%'>1000</td></tr><tr width='100%'><td width='40%' align='left'>Lakshmi Narasimha Rao K</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1200</td></tr><tr width='100%'><td width='40%' align='left'>Sreedevi</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1200</td></tr><tr width='100%'><td width='40%' align='left'>Hemasree</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1450</td></tr><tr width='100%'><td width='40%' align='left'>Pooja Jha Nair</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>1000</td></tr><tr width='100%'><td width='40%' align='left'>Pramod Reddy. G</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>400</td></tr><tr width='100%'><td width='40%' align='left'>Fh Neonatal-bg</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>400</td></tr><tr width='100%'><td width='40%' align='left'>Tarakeswari S</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>0</td></tr><tr width='100%'><td width='40%' align='left'>Mohd Abdul Sami</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>650</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>300</td><td align='right' width='30%'style='background:#FBF9C1'>117500</td></tr></tbody>@@@tabgrdDepartment_Wise_New_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>SUBCOMPANYNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Gynaecology</td><td align='right' widht='30%'>25</td><td align='right' widht='30%'>17300</td></tr><tr width='100%'><td width='40%' align='left'>Obstetrics</td><td align='right' widht='30%'>24</td><td align='right' widht='30%'>15700</td></tr><tr width='100%'><td width='40%' align='left'>Fetal Medicine</td><td align='right' widht='30%'>6</td><td align='right' widht='30%'>1250</td></tr><tr width='100%'><td width='40%' align='left'>Paediatric</td><td align='right' widht='30%'>6</td><td align='right' widht='30%'>2900</td></tr><tr width='100%'><td width='40%' align='left'>Paediatric Psychology</td><td align='right' widht='30%'>5</td><td align='right' widht='30%'>2250</td></tr><tr width='100%'><td width='40%' align='left'>Neonatal</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>0</td></tr><tr width='100%'><td width='40%' align='left'>Ent</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>300</td></tr><tr width='100%'><td width='40%' align='left'>Genetic Counseling</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>900</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>71</td><td align='right' width='30%'style='background:#FBF9C1'>40600</td></tr></tbody>@@@tabgrdDepartment_Wise_Reviews_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>SUBCOMPANYNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Obstetrics</td><td align='right' widht='30%'>105</td><td align='right' widht='30%'>41250</td></tr><tr width='100%'><td width='40%' align='left'>Gynaecology</td><td align='right' widht='30%'>62</td><td align='right' widht='30%'>26650</td></tr><tr width='100%'><td width='40%' align='left'>Paediatric</td><td align='right' widht='30%'>57</td><td align='right' widht='30%'>20500</td></tr><tr width='100%'><td width='40%' align='left'>Fetal Medicine</td><td align='right' widht='30%'>35</td><td align='right' widht='30%'>14500</td></tr><tr width='100%'><td width='40%' align='left'>Endocrinology</td><td align='right' widht='30%'>14</td><td align='right' widht='30%'>5200</td></tr><tr width='100%'><td width='40%' align='left'>Ophthalmology</td><td align='right' widht='30%'>8</td><td align='right' widht='30%'>1600</td></tr><tr width='100%'><td width='40%' align='left'>Anaesthetist</td><td align='right' widht='30%'>5</td><td align='right' widht='30%'>2000</td></tr><tr width='100%'><td width='40%' align='left'>Nutritionist</td><td align='right' widht='30%'>5</td><td align='right' widht='30%'>2000</td></tr><tr width='100%'><td width='40%' align='left'>Physician</td><td align='right' widht='30%'>4</td><td align='right' widht='30%'>1600</td></tr><tr width='100%'><td width='40%' align='left'>Paediatric Orthopaedic</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1200</td></tr><tr width='100%'><td width='40%' align='left'>Paediatric Psychology</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>1000</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>300</td><td align='right' width='30%'style='background:#FBF9C1'>117500</td></tr></tbody>@@@tabgrdOccupation_Wise_New_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>OCCUPATIONNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Housewife</td><td align='right' widht='30%'>49</td><td align='right' widht='30%'>29150</td></tr><tr width='100%'><td width='40%' align='left'>Others</td><td align='right' widht='30%'>7</td><td align='right' widht='30%'>2450</td></tr><tr width='100%'><td width='40%' align='left'>Govt. Employee</td><td align='right' widht='30%'>4</td><td align='right' widht='30%'>2300</td></tr><tr width='100%'><td width='40%' align='left'>Student</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1750</td></tr><tr width='100%'><td width='40%' align='left'>Software Engineer</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1750</td></tr><tr width='100%'><td width='40%' align='left'>Teacher</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>650</td></tr><tr width='100%'><td width='40%' align='left'>Engineer</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>650</td></tr><tr width='100%'><td width='40%' align='left'>Private Employee</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>Lawyer</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>800</td></tr><tr width='100%'><td width='40%' align='left'>Business</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>Doctor</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>0</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>72</td><td align='right' width='30%'style='background:#FBF9C1'>40600</td></tr></tbody>@@@tabgrdReligion_Wise_New_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>RELIGIONNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Hinduism</td><td align='right' widht='30%'>54</td><td align='right' widht='30%'>30550</td></tr><tr width='100%'><td width='40%' align='left'>Islam</td><td align='right' widht='30%'>13</td><td align='right' widht='30%'>7000</td></tr><tr width='100%'><td width='40%' align='left'>Christianity</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>650</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>68</td><td align='right' width='30%'style='background:#FBF9C1'>38200</td></tr></tbody>@@@tabgrdLast_10_Days_New_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>REGDATE</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>24-Mar-2015</td><td align='right' widht='30%'>79</td><td align='right' widht='30%'>28400</td></tr><tr width='100%'><td width='40%' align='left'>25-Mar-2015</td><td align='right' widht='30%'>81</td><td align='right' widht='30%'>32900</td></tr><tr width='100%'><td width='40%' align='left'>26-Mar-2015</td><td align='right' widht='30%'>68</td><td align='right' widht='30%'>26550</td></tr><tr width='100%'><td width='40%' align='left'>27-Mar-2015</td><td align='right' widht='30%'>70</td><td align='right' widht='30%'>33300</td></tr><tr width='100%'><td width='40%' align='left'>28-Mar-2015</td><td align='right' widht='30%'>86</td><td align='right' widht='30%'>45850</td></tr><tr width='100%'><td width='40%' align='left'>29-Mar-2015</td><td align='right' widht='30%'>24</td><td align='right' widht='30%'>1650</td></tr><tr width='100%'><td width='40%' align='left'>30-Mar-2015</td><td align='right' widht='30%'>77</td><td align='right' widht='30%'>39000</td></tr><tr width='100%'><td width='40%' align='left'>31-Mar-2015</td><td align='right' widht='30%'>76</td><td align='right' widht='30%'>34600</td></tr><tr width='100%'><td width='40%' align='left'>01-Apr-2015</td><td align='right' widht='30%'>76</td><td align='right' widht='30%'>36350</td></tr><tr width='100%'><td width='40%' align='left'>02-Apr-2015</td><td align='right' widht='30%'>68</td><td align='right' widht='30%'>25750</td></tr><tr width='100%'><td width='40%' align='left'>03-Apr-2015</td><td align='right' widht='30%'>73</td><td align='right' widht='30%'>40600</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>778</td><td align='right' width='30%'style='background:#FBF9C1'>344950</td></tr></tbody>@@@tabgrdCity_wise_New_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>CITY</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Rr District                                                                                         </td><td align='right' widht='30%'>63</td><td align='right' widht='30%'>35450</td></tr><tr width='100%'><td width='40%' align='left'>Adilabad                                                                                            </td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1650</td></tr><tr width='100%'><td width='40%' align='left'>Hyderabad                                                                                           </td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1250</td></tr><tr width='100%'><td width='40%' align='left'>Karimnagar                                                                                          </td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>1450</td></tr><tr width='100%'><td width='40%' align='left'>Mahaboobnagar                                                                                       </td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>650</td></tr><tr width='100%'><td width='40%' align='left'>Bidar                                                                                               </td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>150</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>73</td><td align='right' width='30%'style='background:#FBF9C1'>40600</td></tr></tbody>@@@tabgrdHusbands_Occupation_New_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>OCCUPATIONNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>Private Employee</td><td align='right' widht='30%'>20</td><td align='right' widht='30%'>11850</td></tr><tr width='100%'><td width='40%' align='left'>Business</td><td align='right' widht='30%'>12</td><td align='right' widht='30%'>6850</td></tr><tr width='100%'><td width='40%' align='left'>Engineer</td><td align='right' widht='30%'>10</td><td align='right' widht='30%'>6950</td></tr><tr width='100%'><td width='40%' align='left'>Software Engineer</td><td align='right' widht='30%'>8</td><td align='right' widht='30%'>3300</td></tr><tr width='100%'><td width='40%' align='left'>Others</td><td align='right' widht='30%'>7</td><td align='right' widht='30%'>3650</td></tr><tr width='100%'><td width='40%' align='left'>Govt. Employee</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1850</td></tr><tr width='100%'><td width='40%' align='left'>Driver</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>1600</td></tr><tr width='100%'><td width='40%' align='left'>Pilot</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>800</td></tr><tr width='100%'><td width='40%' align='left'>Manager</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>Working Abroad</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>650</td></tr><tr width='100%'><td width='40%' align='left'>Army</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>650</td></tr><tr width='100%'><td width='40%' align='left'>Doctor</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>800</td></tr><tr width='100%'><td width='40%' align='left'>Accountant</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>Software(it)</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>69</td><td align='right' width='30%'style='background:#FBF9C1'>40600</td></tr></tbody>@@@tabgrdUsers_Wise_New_All_Branches###1###piegraph2d###<thead width='100%' style='background: linear-gradient(#49708f,#293f50);color: #fff;'><th width='40%' align='left'>USERNM</td><th widht='30%' align='left'>NOS</td><th widht='30%' align='left'>AMOUNT</td></thead><tbody><tr width='100%'><td width='40%' align='left'>2868Gitanjali</td><td align='right' widht='30%'>10</td><td align='right' widht='30%'>8000</td></tr><tr width='100%'><td width='40%' align='left'>90019Khad</td><td align='right' widht='30%'>9</td><td align='right' widht='30%'>5850</td></tr><tr width='100%'><td width='40%' align='left'>2040Sofia</td><td align='right' widht='30%'>8</td><td align='right' widht='30%'>3600</td></tr><tr width='100%'><td width='40%' align='left'>1259Madhavi</td><td align='right' widht='30%'>7</td><td align='right' widht='30%'>5600</td></tr><tr width='100%'><td width='40%' align='left'>1141Sravani</td><td align='right' widht='30%'>6</td><td align='right' widht='30%'>2400</td></tr><tr width='100%'><td width='40%' align='left'>854Bhuvana</td><td align='right' widht='30%'>6</td><td align='right' widht='30%'>3900</td></tr><tr width='100%'><td width='40%' align='left'>2532Chri</td><td align='right' widht='30%'>5</td><td align='right' widht='30%'>2750</td></tr><tr width='100%'><td width='40%' align='left'>2252Sadana</td><td align='right' widht='30%'>4</td><td align='right' widht='30%'>450</td></tr><tr width='100%'><td width='40%' align='left'>692San</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1950</td></tr><tr width='100%'><td width='40%' align='left'>2729Namrata</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1700</td></tr><tr width='100%'><td width='40%' align='left'>2698Mamatha</td><td align='right' widht='30%'>3</td><td align='right' widht='30%'>1650</td></tr><tr width='100%'><td width='40%' align='left'>2068Mary</td><td align='right' widht='30%'>2</td><td align='right' widht='30%'>0</td></tr><tr width='100%'><td width='40%' align='left'>2858Lovisa</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>0</td></tr><tr width='100%'><td width='40%' align='left'>612Padmavathy</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>2559Ahmed</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>2917Ranjini</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>2789Sha</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>0</td></tr><tr width='100%'><td width='40%' align='left'>2852Maria</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr width='100%'><td width='40%' align='left'>1585Sastry</td><td align='right' widht='30%'>1</td><td align='right' widht='30%'>550</td></tr><tr align='left' width='100%'><td widht = '40%' style='background:#FBF9C1'>Total</td><td align='right' width='30%'style='background:#FBF9C1'>73</td><td align='right' width='30%'style='background:#FBF9C1'>40600</td></tr></tbody>";
                var tabs = responseText.split("@@@");
                for(i=1;i<tabs.length;i++){
                    var data = tabs[i].split("###");
                    var tabid = data[0];
                    var defgraph = data[1];
                    var charttype = data[2];
                    if(charttype== "" || charttype == "bargraph2d"){
                        charttype = "bg2d";
                    }else if(charttype == "linegraph2d"){
                        charttype = "lg2d";
                    }else if(charttype == "areagraph2d"){
                        charttype = "ag2d";
                    }else if(charttype == "stepgraph2d"){
                        charttype = "sg2d";
                    }else if(charttype == "piegraph2d"){
                        charttype = "pg2d";
                    }else if(charttype == "xyscatter2d"){
                        charttype = "xy2d";
                    }else if(charttype == "bargraph3d"){
                        charttype = "bg3d";
                    }else if(charttype == "piegraph3d"){
                        charttype = "pg3d";
                    }
                    var tabdata = data[3];
            
                    //alert(tabdtl[0]);
                    $('#'+tabid).find("tr").remove();
                    $('#'+tabid).append(tabdata);
                    displaychart("",tabid.replace("tabgrd",""));
                    if(defgraph == "1"){
                        $('#ddlChart'+tabid.replace("tabgrd","")).val(charttype);
                        document.getElementById("lblswap"+tabid.replace("tabgrd","")).textContent = "Graph";
                        displaychart("",tabid.replace("tabgrd",""));
                        chkgrid(tabid.replace("tabgrd",""));
                      
                    }
                    
                }
                $('#mydiv').hide();
            }else{
                $('#mydiv').hide();
            }
        });
    }catch(err){
        $('#mydiv').hide();
        alert(err);
    }
}
function displaychart(id,id1) {
    try{
        var trtype = document.getElementById("ddlChart"+id1).value;
        var array1 = new Array();
        var array2 = new Array();
        var array3 = new Array();
        var array4 = new Array();
        var table1 = document.getElementById('tabgrd'+id1);
        var totalvalue = 0;
        var count = table1.rows.length;
        for (var x = 1; x < count; x++) {
            var oCells = table1.rows.item(x).cells;
            var celLength = oCells.length;
            var total = 0;
            var total = table1.rows[x].cells[1].innerHTML;
            if(total == "Total"){
                if (id == undefined || id == "") {
                    totalvalue = parseInt(totalvalue) + parseInt(table1.rows[x].cells[celLength - 1].innerHTML);
                } else {
                    totalvalue = parseInt(totalvalue) + parseInt(table1.rows[x].cells[id].innerHTML);
                }
                continue;
            }
            array1.push(total);
            var values;
            if (id == undefined || id == "") {
                values = table1.rows[x].cells[celLength - 1].innerHTML;
            } else {
                values = table1.rows[x].cells[id].innerHTML;
            }
            var a = parseInt(values);
            if (a == "NaN") {
                return false;
            }
            array2.push(a);
            array3.push([total, Math.round(a)]);
            array4.push({
                income: a, 
                year: total
            });

        }
        var array5 = new Array();
         var oCells = table1.rows.item(0).cells;
                    var celLength = oCells.length;
                    var total = 0;
                    for(var colno=2;colno<celLength;colno++){
                    var arraynew = new Array();
                    var values;
                    var allnum = 1;
                    for (var x = 1; x < count-1; x++) {
                    try{
                        values = table1.rows[x].cells[colno].innerHTML;
                    var a = parseInt(values);
                    if (a == "NaN") {
                        allnum=0;
                        continue;
                    }
                    arraynew.push(a);
                }catch(err){
                }
                    }
                if(allnum =1){
                    array5.push({name:table1.rows[0].cells[colno].innerHTML,data:arraynew})
                }
                    }
        $("#container"+id1).css({
            "margin-left": 0 + "px"
        });
        if (trtype == "bg2d") {
            $('#container'+id1).highcharts({
                title: {
                    text : totalvalue,
                    style: {
                        display: 'none'
                    }
                },
                exporting: {
                    enabled: false
                },
                chart: {
                    type: 'column'
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: -35,
                        align: 'right',
                        style: {
                            fontSize: '6pt',
                            fontFamily: 'Verdana, sans-serif',
                            font: 'Bold'
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: array5
//                ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.series.name + ': ' + this.y}
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
            });
        }
        else if (trtype == "lg2d") {
            $('#container'+id1).highcharts({
                title: {
                    text : totalvalue,
                    style: {
                        display: 'none'
                    }
                },
                exporting: {
                    enabled: false
                },
                chart: {
                    type: 'spline',
                    marginRight: 130,
                    marginBottom: 35
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: -15,
                        align: 'right',
                        style: {
                            fontSize: '6px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text : totalvalue,
                        style: {
                            display: 'none'
                        }
                    },
                    exporting: {
                        enabled: false
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
//                plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true,
//                        crop: true,
//                overflow: 'none'
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    borderWidth: 0
                },
                
                series: array5
            });
        }
        else if (trtype == "ag2d") {

            $('#container'+id1).highcharts({
                title: {
                    text : totalvalue,
                    style: {
                        display: 'none'
                    }
                },
                exporting: {
                    enabled: false
                },
                chart: {
                    type: 'areaspline'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: '#FFFFFF'
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: -25,
                        align: 'right',
                        style: {
                            fontSize: '6px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },
                    plotBands: [{// visualize the weekend
                        from: 4.5,
                        to: 6.5,
                        color: 'rgba(68, 170, 213, .2)'
                    }]

                },
                yAxis: {
                    title: {
                        text : totalvalue,
                        style: {
                            display: 'none'
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' units'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
               series: array5
//               ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }
            });
        }
        else if (trtype == "sg2d") {
            $('#container'+id1).highcharts({
                title: {
                    text : totalvalue,
                    style: {
                        display: 'none'
                    }
                },
                exporting: {
                    enabled: false
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: -20,
                        align: 'right',
                        style: {
                            fontSize: '6px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }

                },
                series: array5
//                ,
//                        plotOptions: {
//                series: {
//                    dataLabels: {
//                        enabled: true,
//                        style: {fontWeight: 'bolder'},
//                        formatter: function() {return this.x+'<br>'+this.series.name + ': ' + this.y},
//                        inside: true
//                    },
//                    pointPadding: 0.1,
//                    groupPadding: 0
//                }
//            }

            });

        }
        else if (trtype == "pg2d") {
            $('#container'+id1).highcharts({
                legend: {
                    itemStyle: {
                        font: '6pt Trebuchet MS, Verdana, sans-serif',
                        color: 'blue'
                    },
                    itemHoverStyle: {
                        color: 'red'
                    },
                    itemHiddenStyle: {
                        color: '#444'
                    }

                },
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text : totalvalue,
                    style: {
                        maxPadding:0,
                        minPadding:0
                    }
                },
                exporting: {
                    enabled: false
                },
                //                        tooltip: {
                //                          //  pointFormat: '{series.name}: <b>{series.addPoint[a]}</b>',
                //                            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                //                            percentageDecimals: 10
                //                           
                //                        },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                  series: [{
                                type: 'pie',
                                name: 'DeptWise',
                                data: array3
                            }]
            });
        }
        else if (trtype == "xy2d")
        {
            $('#container'+id1).highcharts({
                chart: {
                },
                yAxis: {
                    min: 0
                },
                title: {
                    text : totalvalue,
                    style: {
                        display: 'none'
                    }
                },
                xAxis: {
                    categories: array1,
                    labels: {
                        rotation: -20,
                        align: 'right',
                        style: {
                            fontSize: '6px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }

                },
                series: [{
                    enableMouseTracking: false
                }, {
                    type: 'scatter',
                    name: 'Observations',
                    data: array2,
                    marker: {
                        radius: 4
                    }
                }]
            });
        }
        else if (trtype == "bg3d")
        {
            var chart;

            chart = new AmCharts.AmSerialChart();
            chart.autoMarginOffset = 0;
            chart.marginRight = 0;
            chart.dataProvider = array4;

            chart.categoryField = "year";
            // this single line makes the chart a bar chart,
            // try to set it to false - your bars will turn to columns               
            chart.rotate = false;
            // the following two lines makes chart 3D
            chart.depth3D = 20;
            chart.angle = 30;

            // AXES
            // Category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.gridPosition = "start";
            categoryAxis.axisColor = "#DADADA";
            categoryAxis.fillAlpha = 1;
            categoryAxis.gridAlpha = 0;
            categoryAxis.fillColor = "#FAFAFA";

            // value
            var valueAxis = new AmCharts.ValueAxis();
            //  valueAxis.axisColor = "#DADADA";
            //valueAxis.title = "Income in millions, USD";
            //valueAxis.gridAlpha = 0.1;
            //chart.addValueAxis(valueAxis);

            // GRAPH
            var graph = new AmCharts.AmGraph();
            graph.title = "Income";
            graph.valueField = "income";
            graph.type = "column";
            graph.balloonText = "Income in [[category]]:[[value]]";
            graph.lineAlpha = 0;
            graph.fillColors = "#bf1c25";
            graph.fillAlphas = 1;

            chart.addGraph(graph);

            // WRITE
            chart.write("container"+id1);

        }
        else if (trtype == "pg3d")
        {
            $("#container"+id1).css({
                "margin-left": 0 + "px"
            });
            var chart;

            // PIE CHART
            chart = new AmCharts.AmPieChart();
            chart.dataProvider = array4;
            chart.titleField = "year";
            chart.valueField = "income";
            chart.outlineColor = "#FFFFFF";
            chart.outlineAlpha = 0.8;
            chart.outlineThickness = 2;
            // this makes the chart 3D
            chart.depth3D = 15;
            chart.angle = 30;

            // WRITE
            chart.write("container"+id1);
        }
    
    }catch(err){
        alert(err);
    }

}
function chkgrid(id){
    try{
        id = id.trim().replace(/ /g,'_');
        var lblnm = document.getElementById("lblswap"+id).textContent;
        if(lblnm === 'Graph'){
            document.getElementById("ddlChart"+id).style.display = "block";
            document.getElementById("lblswap"+id).textContent = "Data";
            document.getElementById("divgraph"+id).style.display = "block";
            document.getElementById("div"+id).style.display = "none";
             var chartType = $("#ddlChart"+id).val();
                    if(chartType == "bg3d" || chartType == "pg3d" ){
                        $("#ddlChart"+id).val("bg2d");
                        $("#ddlChart"+id).change();
                        $("#ddlChart"+id).val(chartType);
                        $("#ddlChart"+id).change();
                    }
        }else if(lblnm === 'Data'){
            document.getElementById("ddlChart"+id).style.display = "none";
            document.getElementById("lblswap"+id).textContent = "Graph";
            document.getElementById("divgraph"+id).style.display = "none";
            document.getElementById("div"+id).style.display = "block";
                    }
    }catch(err){
        alert(err);
                }
            }
function close1(){
    debugger;
    if(localStorage.patapp==="1"){
        localStorage.removeItem("patapp");
        location.href = "PatientLoginThirdScreen.html";
    }else if(localStorage.formid.indexOf("wf")>=0){
        localStorage.back1=1;
         var frompage=localStorage.formid;
       var wfid =frompage;
        var neosoftmenu="?neosoftmenu=1&frompage="+frompage+"&wfid="+wfid;
        location.href = "dashboardmenubuttons.html"+neosoftmenu;
    }
    else{
        localStorage.disback=1;
        location.href = "dashboardmenubuttons.html";
    }
}
function openGraph(label){
     if(label.trim() === ""){
                alert("No Dashboard3Graph for this");
                return;
            }
    var fromdt= localStorage.fromdt;
    var todt= localStorage.todt;
    var locid=localStorage.locid;
    var wfid = localStorage.currentformid;
    var frompage = localStorage.formid;
    localStorage.label = label;
    location.href="graphs.html?fromdt="+fromdt+"&todt="+todt+"&gloc="+locid+"&type=0&wfid="+wfid+"&reqtype=graphgrids&label="+label+"&frompage="+frompage;
}
function settings(){
    location.href = 'settings.html';
}
