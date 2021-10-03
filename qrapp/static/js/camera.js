
var video = document.querySelector("#video");

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true,
        facingMode: {
      exact: 'environment'}
    })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
  }

// var sendButton = document.search.send;
// sendButton.addEventListener("click", capture);
async function capture(myUrl) {
    var canvas = document.getElementById('canvas');
    var video = document.getElementById('video');
    // var image = new Image();
    const csrftoken = getCookie('csrftoken');
    // var myShop = {shop};
    // var myShop = '008';
    const thisUrl = new URL(window.location.href)
    var myShop = thisUrl.search.substring(thisUrl.search.length - 3, thisUrl.search.length);
    console.log(myShop);
    // console.log(thisUrl.search);

    canvas.width = 360;
    canvas.height = 400;
    canvas.getContext('2d').drawImage(video, 0, 0, 360, 400);

    var dataURL = canvas.toDataURL('image/jpeg');
    var base64 = dataURL.replace(/^data:image\/jpeg;base64,/, "");
    // var data = {'photo':base64, 'shop':myShop};
    //console.log(data);
    // document.getElementById("printresult").innerHTML = dataURL;
        $.ajax({
        headers: {'X-CSRFToken': csrftoken},
        method: 'POST',
        url: myUrl,
        data: {photo:base64, shop:myShop},
        success: function (res) {
            if (res.result == false)
                {window.location.href = '/error'}
            else
                {localStorage.setItem('cont',res.js_string)
                 window.location.href = '/result'}
             }
        });

        // $.post(myUrl, {'X-CSRFToken': csrftoken}, {photo: base64, shop : myShop},
        // function (res) {
        //     if (res.result == false)
        //         {window.location.href = '/error'}
        //     else
        //         {localStorage.setItem('cont',res.js_string)
        //          window.location.href = '/result'}
        //      });
}

function getCookie(name) {
 var cookieValue = null;
 if (document.cookie && document.cookie !== '') {
     var cookies = document.cookie.split(';');
     for (var i = 0; i < cookies.length; i++) {
         var cookie = cookies[i].trim();
         // Does this cookie string begin with the name we want?
         if (cookie.substring(0, name.length + 1) === (name + '=')) {
             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
             break;
         }
     }
 }
 return cookieValue;
}

function returnedData(res) {
            if (res.result == false)
                {window.location.href = '/error'}
            else
                {localStorage.setItem('cont', res.js_string)
                 window.location.href = '/result'
                }
}