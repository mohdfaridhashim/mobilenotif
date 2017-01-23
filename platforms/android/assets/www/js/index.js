/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();
function fetch_and_display_posts()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://social.zackseen.com/wp-admin/admin-ajax.php?action=posts");
    xhr.onload = function(){
        var posts_array = JSON.parse(xhr.responseText);

        var html = "";

        for(var count = 0; count < posts_array.length; count++)
        {
            var title = posts_array[count][0];
            var link = posts_array[count][1];
            var date = posts_array[count][2];
            var image = posts_array[count][3];

            html = html + "<li>" + "<a href='javascript:open_browser(\"" + link + "\")'>" + "<img height='128' width='128' src='" + image + "'>" + "<h2>" + title + "</h2>" + "<p>" + date + "</p></a></li>";
        }

        document.getElementById("posts").innerHTML = html;
        $("#posts").listview("refresh");
    }
    xhr.send();
}

function login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var clientID = 'fj4BNRph9y8CcILi1uoh2Ou9oou5Kn';
    var secret = 'G0GKBuC1LMzToLCa4DFsVHhpQFOlLz';
    var dataString = "username="+username+"&password="+password+"&client_id="+clientID+"client_secret="+secret+"grant_type=password";
    if(username == "")
    {
        navigator.notification.alert("Please enter username", null, "Username Missing", "OK");
        return;
    }

    if(password == "")
    {
        navigator.notification.alert("Please enter password", null, "Password Missing", "OK");  
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://social.zackseen.com/oauth2/token");
    //xhr.setRequestHeader("Authorization", 'Basic ' + btoa('myuser:mypswd'));
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == "FALSE")
        {
            navigator.notification.alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
        }
        else if(xhr.responseText == "TRUE")
        {
            fetch_and_display_posts();
            $("#page_two_link").click();
        }
    }   
    xhr.send(dataString);
}

function open_browser(link)
{
    window.open(link, '_blank', 'location=yes');
}