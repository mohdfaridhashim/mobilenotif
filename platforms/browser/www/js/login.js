function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username == "") {

        alert("Please enter username", null, "Username Missing", "OK");
        return;
    }

    if(password == "") {

        alert("Please enter password", null, "Password Missing", "OK");  
        return;
    }

    saveInClient('nano',utoa(username+":"+password));
    $.ajax({
        type: "GET",
        url: "http://blast.zackseen.com/wp-json/wp/v2/users/me",
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": "Basic " + localStorage.nano
        },
        statusCode: {
              403 : function (response) {

                alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
              }
        },
        success: function (){

        	saveInClient('categoryID',5);
          	window.location.href = 'main.html';
        }
    });
}
