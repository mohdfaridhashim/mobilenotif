var serverUrl = "http://blast.zackseen.com";
var info = 5;
var theevent = 6;
var vol = 7;

function utoa(str) {

    return window.btoa(str);
}

function saveInClient(key,value) {

    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        localStorage.setItem(key, value);
    } 
}

function logOut() {

    localStorage.removeItem("nano");
    window.location.href = 'index.html';
}

function getFeatureIMG(id,pid) {

	var postid = pid;
	var featureid = id;
	$.ajax({
        type: "GET",
        url: serverUrl+"/wp-json/wp/v2/media/"+featureid,
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": "Basic " + localStorage.nano
        },
        statusCode: {
              403 : function (response) {
                alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
              },
              401 : function (response) {
                alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
              }
        },
        success: function (posts_array){
        	console.log(posts_array);
        	var html = "";  
        	for(var count = 0; count < posts_array.length; count++) {

                var img = posts_array[count].title.rendered;
                var alt = posts_array[count].alt_text;
                document.getElementById("img-"+postid).src = img;
                document.getElementById("img-"+postid).alt = alt;

            }
            
        }
    });
}

function gotoCatPage(type) {
  	if(type == 'info') {
  		saveInClient('categoryID',info);
  		window.location.href = 'main.html';
  	}
  	if(type == 'theevent') {
  		saveInClient('categoryID',theevent);
  		window.location.href = 'main.html';
  	}
  	if(type == 'vol') {
  		saveInClient('categoryID',vol);
  		window.location.href = 'main.html';
  	}

  }

  function defaultCatPage(categoryID) {
  	var categoriesID = categoryID;
  	if(categoriesID == info) {
  		$( "#event" ).removeClass( "active" );
  		$( "#vol" ).removeClass( "active" );
  		$( "#info" ).addClass( "active" );
  	}
  	if(categoriesID == theevent) {
  		$( "#info" ).removeClass( "active" );
  		$( "#vol" ).removeClass( "active" );
  		$( "#theevent" ).addClass( "active" );
  	}
  	if(categoriesID == vol) {
  		$( "#info" ).removeClass( "active" );
  		$( "#event" ).removeClass( "active" );
  		$( "#vol" ).addClass( "active" );
  	}
  }

  function gotoPostPage(postageID) {

  	saveInClient('postdetailID',postageID);
  	window.location.href = 'postpage.html';

  }

  function goBack() {
  	window.location.href = 'main.html';
  }

  function getPostDetail(postageID) {

  	var postagePageID = postageID;
  	$.ajax({
        type: "GET",
        url: serverUrl+"/wp-json/wp/v2/posts/"+postagePageID,
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": "Basic " + localStorage.nano
        },
        statusCode: {
              403 : function (response) {
                alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
              },
              401 : function (response) {
                alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
              }
        },
        success: function (posts_array){
        	console.log(posts_array);
        	var html = ""; 
            var title = posts_array.title.rendered;
            var link = posts_array.link;
            var date = posts_array.date;
            var pid = posts_array.id;
            var thecontent = posts_array.content.rendered;
            var featureimg = posts_array.featured_media;
            html = html + "<h1 id=\"thetitle\">";
            html = html + title;
            html = html + "</h1>";
            html = html + "<hr>";
            html = html + "<p><span class=\"glyphicon glyphicon-time\"></span><span id=\"thedate\"> Posted on ";
            html = html + date;
            html = html + "</span></p>";
            html = html + "<hr>";
            if(featureimg != '' || featureimg != Undefined) {
            	getFeatureIMG(featureimg,pid+"-"+featureimg);
            	html = html + "<img id=\"img-"+pid+"-"+featureimg+"\" src=\"img/tower.jpg\" class=\"img-responsive\" alt=\"Cinque Terre\" >";
        	}else {
        		html = html + "<br />";
        	}
            html = html + "<hr>";
            html = html + "<div class=\"lead\" id=\"thecontent\">";
            html = html + thecontent;
            html = html + "</div>";
            document.getElementById("postContent").innerHTML = html;
        }
    });
  }

  function getPostDatabyCategory(categoryID) {

  	var categoriesID = categoryID;
  	$.ajax({
        type: "GET",
        url: serverUrl+"/wp-json/wp/v2/posts?categories="+categoriesID,
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": "Basic " + localStorage.nano
        },
        statusCode: {
              403 : function (response) {
                alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
              },
              401 : function (response) {
                alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
              }
        },
        success: function (posts_array){
        	console.log(posts_array);
        	console.log(posts_array.length);
        	var html = ""; 
        	if(posts_array.length > 0) {
	        	for(var count = 0; count < posts_array.length; count++) {

	                var title = posts_array[count].title.rendered;
	                var link = posts_array[count].link;
	                var date = posts_array[count].date;
	                var pid = posts_array[count].id;
	                var previewcontent = posts_array[count].excerpt.rendered;
	                var featureimg = posts_array[count].featured_media;

	                html = html + "<div class=\"list-group-item-new\">";
	                html = html + "<div class=\"panel\" onclick=\"gotoPostPage('"+pid+"');\">";
	                html = html + "<div class=\"panel-heading-date\">";
	                html = html + "<span class=\"glyphicon glyphicon-time\"></span> Posted on "+date+"</div>";
	                if(featureimg != '' || featureimg != Undefined) {
	                	getFeatureIMG(featureimg,pid+"-"+featureimg);
	                	html = html + "<div class=\"panel-heading-post\"><img id=\"img-"+pid+"-"+featureimg+"\" src=\"img/tower.jpg\" class=\"img-responsive\" alt=\"Cinque Terre\" ></div>";
	                }else{
	                	html = html + "<div class=\"panel-heading-noimg\"></div>";
	                }
	                
	                html = html + "<div class=\"panel-body-post\">";
	                html = html + "<h3 class=\"list-group-item-heading\">";
	                html = html + title;
	                html = html + "<span class=\"glyphicon glyphicon-chevron-right pull-right\"></span></h3>";
	                html = html + "<div class=\"list-group-item-text\">";
	                html = html + previewcontent;
	                html = html + "</div></div></div></div>";
	            }
        	}else {
        		html = html + "<div class=\"list-group-item-new\">";
                html = html + "<div class=\"panel\">";
                html = html + "<div class=\"panel-heading-noimg\"></div>";
                html = html + "<div class=\"panel-body-post\">";
                html = html + "<h3 class=\"list-group-item-heading\">";
                html = html + "Sorry";
                html = html + "</h3>";
                html = html + "<div class=\"list-group-item-text\">";
                html = html + "No record found.";
                html = html + "</div></div></div></div>";
        	}
            document.getElementById("posted").innerHTML = html;
        }
    });
  }