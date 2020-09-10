 function onDeviceReadyn() {
    try {
        debugger;
        //ref = cordova.InAppBrowser.open("https://www.npmjs.com/package/phonegap-plugin-push-pgb", '_blank', 'location=no,toolbar=yes,closebuttoncaption=Close');
        try {
            var i, link_tag ;
            var  isExists = 0;
                              link_tag = document.getElementsByTagName("link") ;
    var css_title = localStorage.themecolor;
            StatusBar.backgroundColorByHexString("#31708F");
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
        var push = PushNotification.init({
            android: {
//                senderID: "756359640025"
senderID: "940836237549"
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });
        push.on('registration', function(data) {
            //exitapp();
            //                        alert(data.registrationId);
            //                        saveRegid(data.registrationId);
        });
        push.on('notification', function(data) {
           try {
	       
                var ipadress = data.additionalData.ipaddress;
                localStorage.ipadrs = ipadress + "/";
//		alert("localStorage.ipadrs "+localStorage.ipadrs+"localStorage.userid "+localStorage.userid  );
                localStorage.userid = data.additionalData.userid;
                localStorage.locid = data.additionalData.rlocid;
                localStorage.deptid = data.additionalData.rdeptid;
                localStorage.sdeptid = data.additionalData.rsdeptid;
                localStorage.setItem("notificationdata", JSON.stringify(data.additionalData));
                var additionalData = localStorage.getItem("notificationdata");
                var notificationsdata = JSON.parse(additionalData);
                if(notificationsdata.foreground===true){
                    notifymsg(notificationsdata.notifymsg);
                }else{
                    location.href = 'Notificationdashboardmenubtns.html';
                }
            } catch (err) {
//                alert(err);
            }
            
        });
    } catch (err) {
//        alert(err);
    }
}

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReadyn, false);
});
function notifymsg(msg) {
    try {
        playBeepNotification();
        navigator.notification.alert(
                msg, // message
                onConfirmNotification, // callback to invoke with index of button pressed
                'New Notification', // title
                ["Ok"]         // buttonLabels
                );
    } catch (err) {
//        alert(err);
    }

}
function onConfirmNotification(buttonIndex) {
    return;
}
function playBeepNotification() {
    navigator.notification.beep(1);
}
 