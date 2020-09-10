/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.on('pageInit', function (page) {
    debugger;
  if(page.route.url === "/subdepts/"){
      loadsubdepts();
  }
  if(page.route.url === "/locations/"){
      loadlocations();
  }
  if(page.route.url ==="/dashboardmenu/"){
      loadmenu();
  }
  if(page.route.url==="/dashboardmenubuttons/"){
      loaddashboardmenu();
  }
  if(page.route.url==="/selectdoctors/"){
      $('.doctitle').append("-"+localStorage.formname);
     loadgrid(0);
  }
  if(page.route.url==="/disfirstscreen/"){
      fillcubicles();
      loadDisGrids();
      $('#txtdate').val(localStorage.fromdt);
  }
  if(page.route.url==="/dissecondscreen/"){
      $('.pname').html(localStorage.patname);
      $('.PDetail').children().eq(0).html(localStorage.age+"/"+localStorage.sex);
      $('.PDetail').children().eq(1).html('MR No : '+localStorage.mrno);
      createSessions();
  }
  if(page.route.url ==="/webreportsf7/"){
      
     reportLocation();
     // dataspecialization();
     // doctorSpecialization();
  }
  if(page.route.url==="/myNotifications/"){
       notificationDashboardData();
  }
  if(page.route.url==="/reportPDF/"){
       showReports();     
  }
  if(page.route.url==="/Dis2OrderF7/"){
        debugger;
         setTimeout(function () {
          loadOrderData1();
    }, 500);     
  }
  if(page.route.url==="/EntrenceF7/"){
            
  }
  if(page.route.url==="/DrillDashboardF7/"){
      loadBubbleData(); 
  }
});
