/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function onDeviceReady() {
//    alert("device ready Sagar");
//    document.addEventListener("backbutton", exitapp, false);
//    //<!--setInterval(function(){alert("Hello")},3000);
//    //setInterval(function(){console.log("Hello")},3000);-->
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
//    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function download() {

    debugger;
    try
    {
        var wfid = localStorage.currentformid;
        var id = $('#txtprimKeyField').val();
        var downloadUrl = localStorage.server + "/documents/" + wfid + id + ".pdf";
        var relativeFilePath = "Shivam/" + wfid + id + ".pdf";  // using an absolute path also does not work

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            var fileTransfer = new FileTransfer();
//            alert(fileSystem.root.toURL() + '/' + relativeFilePath);
            fileTransfer.download(
                    downloadUrl,
                    // The correct path!
                    fileSystem.root.toURL() + '/' + relativeFilePath,
                    function (entry) {
//                        alert("Success");
                        opednPdf();
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
function opednPdf() {
    var wfid = localStorage.currentformid;
    var id = $('#txtprimKeyField').val();
    var relativeFilePath = "Shivam/" + wfid + id + ".pdf";
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
function capturePhoto() {
    debugger;
//                getDeviceInfo();
//                showAlert1();
    // Take picture using device camera and retrieve image as base64-encoded string
    try {
	pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50, cameraDirection: 0,
            destinationType: destinationType.DATA_URL,correctOrientation: true });
    } catch (err) {
        alert(err);
    }
}

function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('imgPatient');

    // Unhide image elements
    //
    smallImage.style.display = 'inline-block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
    
    document.getElementById('imgsrc').value = "data:image/jpeg;base64," + imageData;
    //getDeviceInfo();
}

function onFail(message) {
    alert('Failed because: ' + message);
}
