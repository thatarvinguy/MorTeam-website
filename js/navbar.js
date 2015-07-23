// function getPic(user) {
//     $.post("/f/getPic?user=" + user, function(response){
//       if(response == ""){
//         $("#small_prof_pic").attr("src", "/images/user.jpg");
//         $(".profile_pic").attr("src", "/images/user.jpg");
//       } else {
//         $("#small_prof_pic").attr("src", "/f/getPic?user=" + user);
//         $(".profile_pic").attr("src", "/f/getPic?user=" + user);
//       }
//     });
// }
function getTimeNow(){
  var now = new Date();
  var Hours = now.getHours();
  var suffix;
  if(parseInt(Hours) > 12){
    Hours = (parseInt(Hours) - 12).toString();
    suffix = "PM";
  }else if(Hours == "12"){
    suffix = "PM";
  }else{
    suffix = "AM";
  }
  var Minutes = now.getMinutes();
  if(parseInt(Minutes) < 10){
    Minutes = "0" + Minutes;
  }
  return Hours+":"+Minutes+" "+suffix;
}
function request(type, url, data, responsecb){
    var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");;
    xhr.open(type, url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            responsecb(xhr.responseText);
        }
    };
    xhr.send(data);
}
function getPic(user, target) {
    $(target).attr("src", "/f/getPic?user=" + user);
    $.post("/f/getPic?user=" + user, function(response){
      if(response == ""){
        $(target).attr("src", "/images/user.jpg");
      }
    });
}
function showNewMessageNotice(sender, content, convo, chatcode) { // ADD A USERNAME PARAMETER AND REPLACE "farbod909" WITH THAT.
    var newMessageNotice = new jBox('Notice', {
        attributes: {
            x: 'right',
            y: 'bottom'
        },
        theme: 'NoticeBorder',
        volume: 100,
        animation: {
            open: 'slide:bottom',
            close: 'slide:right'
        },
        content: content,
        maxWidth: 300,
        maxHeight: 105,
        title: sender,
        closeOnClick: false,
        onOpen: function(){
          $($(this)[0].content).attr("data-sender", convo);
          $($(this)[0].content).attr("data-chatcode", chatcode);
        }
    });

};
$(document).ready(function() {
    $('#name_link').html(localStorage.firstName);
    //getPic(localStorage.username, $("#small_prof_pic"));
    $("#small_prof_pic").attr("src", "/f/getPic?user=" + localStorage.username);
    $("#small_prof_pic").attr("onError", "this.src=\'./images/user.jpg\'");

    /*isBlur = false;
    $(window).blur(function(){
        isBlur = true;
        //b.trigger("click");
    });
    $(window).focus(function(){
        isBlur = false;
    });*/

    var fade_speed = 200;

    var socket = io.connect();
    socket.emit("updateclient", {
        "user": localStorage.username,
        "chatcode": "",
        "teamcode": localStorage.teamCode
    });




    $('#notif_button').click(function() {
        $('#notif_drop').fadeIn(fade_speed).removeClass("hidden")
        $('.triangle_thing_notif').fadeIn(fade_speed).removeClass("hidden")
        $('#darken').fadeIn(fade_speed).removeClass("hidden")
        $('#notif_button').addClass('active');
        $('#darken').click(function() {
            $(this).fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('#notif_drop').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('.triangle_thing_notif').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('#notif_button').removeClass('active');
        });
    });
    $('#profile_id').click(function() {
        $('#prof_drop').fadeIn(fade_speed).removeClass("hidden");
        $('.triangle_thing_prof').fadeIn(fade_speed).removeClass("hidden");
        $('#darken').fadeIn(fade_speed).removeClass("hidden");
        $('#darken').click(function() {
            $(this).fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('#prof_drop').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('.triangle_thing_prof').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
        });
    });
    $('#profile_name').click(function() {
        $('#prof_drop').fadeIn(fade_speed).removeClass("hidden");
        $('.triangle_thing_prof').fadeIn(fade_speed).removeClass("hidden");
        $('#darken').fadeIn(fade_speed).removeClass("hidden");
        $('#darken').click(function() {
            $(this).fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('#prof_drop').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
            $('.triangle_thing_prof').fadeOut(fade_speed, function() {
                $(this).addClass("hidden")
            });
        });
    });
    $('#logout_button').click(function() {
        localStorage.removeItem('username');
        localStorage.removeItem('userToken');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('subdivison');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
        localStorage.removeItem('teamName');
        localStorage.removeItem('teamCode');
        localStorage.removeItem('teamNumber');
        location = "login.html";
    });
    socket.on("notification", function(data){
        if (data.chatname == ""){
            showNewMessageNotice(data.name, data.message, data.user, data.chatcode);
        }
        else {
            showNewMessageNotice(data.name + " in " + data.chatname, data.message, data.chatname, data.chatcode);
        }
        $('#audio-files').find('audio#click-sound')[0].play();
        $('#audio-files').find('audio#click-sound')[0].currentTime = 0;

    });

    $(document).on("click", ".jBox-Notice", function(){
      // $(this).find(".jBox-content").attr("data-sender") ---> the username or chatname
      // $(this).find(".jBox-content").attr("data-chatcode") ---> the chatcode
    });

});
