function api() {
    document.getElementById("msg_area").setAttribute('style', 'display:none;');
    document.getElementById("api_area").setAttribute('style', 'display:block;');
    return false;
};

function postData(fdata) {
    fetch("/messages/", {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: fdata
    })
    .then(response => response.json())
    .then(data => { 
        document.getElementById("msg_area").innerHTML = '<center><h2><br>' + data.message + '</h2></center>';
        document.getElementById("msg_area").setAttribute('style', 'display:block;');
        //console.log(fdata)
    });
};

function postMsg() {
    document.getElementById("msg_area").setAttribute('style', 'display:none;');
    document.getElementById("post_form_area").setAttribute('style', 'display:block;');
    return false;
};

function postValue() {
    document.getElementById("post_form_area").setAttribute('style', 'display:none;');
    var data = $("#postform").serialize();	
    postData(data);
    return false;
};

function deleteData(sender) {
    document.getElementById("msg_area").setAttribute('style', 'display:none;');
    document.getElementById("api_area").setAttribute('style', 'display:none;');
    document.getElementById("post_form_area").setAttribute('style', 'display:none;');
    showUserData(sender, true);
    return false;
};

function showUserData(user, op) {
    var html = "<h2 class='show_h2'>Valitse viesti:</h2><br><div class='table-responsive-md'><table class='table table-hover table-bordered'><thead><tr class='bg-info'><th>Tunnus</th><th>Lähettäjä</th><th>Aihe</th><th>Viesti</th>" + 
            "</tr></thead><tbody>";
    fetch('/messages')
    .then(response => response.json())
    .then(data => { 
        for(var i=0; (i < data.length); i++) {
            if( data[i].sender == user) {
                html += '<tr><td >' + 
                    "<a href='javascript:" + (op ? "delMsg(" : "modData(") + data[i].id + ")'>" + data[i].id + '</a>' +
                    '</td><td>' + data[i].sender +
                    '</td><td>' + data[i].topic +
                    '</td><td>' + data[i].message +
                    '</td></tr>'
            }
        }
        html += "</tbody></div></table>";
        return html
    })
    .then(html => document.getElementById("msg_area").innerHTML = html)
    .catch(error => document.getElementById("msg_area").innerHTML = 'Error: ' + error);
    document.getElementById("msg_area").setAttribute('style', 'display:block;');
};

function delMsg(id) {
    var msg = 'ID:' + id;
    console.log(msg)

    fetch('/messages/' + id, {
        method: 'delete',
        body: JSON.stringify(msg) 
    })
    .then(response => response.json())
    .then(data => document.getElementById("msg_area").innerHTML = '<center><h2><br>' + data.message + '</h2></center>');
    document.getElementById("msg_area").setAttribute('style', 'display:block;');
};

//////////////////////////////modify message/////////////////////////

//{"op": "replace", "path": "/name", "value": "kissonen" }


function modData(id, message) {
  let sdata = 'ID:' + id;
  let mes = "here is message"
    //var msg = 'ID:' + id;

   // console.log(id + " id is here")
  // console.log(mes + " message is here")

    fetch('/messages/'  + id, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        //headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:JSON.stringify ({ message: mes }),
        })
    //.then(response => response.json())
    //.then(json => console.log(json))

    .then(data => {
      console.log(data);
      return data.text();
    })
    .then(data => {
      console.log(data)
    })

    .then (response => response.json())
    .then(data => { 
        document.getElementById("msg_area").innerHTML = '<center><h2><br>' + data.message + '</h2></center>';
        document.getElementById("msg_area").setAttribute('style', 'display:block;');
        console.log(fdata + "is here")
        //console.log(newmsg)

    });
};



function modMsg(message) {
  document.getElementById("msg_area").setAttribute('style', 'display:block;');
  document.getElementById("post_form_area").setAttribute('style', 'display:block;');
  //showUserData2(sender, true);
  showUserData2(message, true);
  return false;
};


function modValue() {
    document.getElementById("post_form_area").setAttribute('style', 'display:block;');
    var data = $("#postform").serialize();  
    modData(data);
    console.log(data);
    return false;
};


function showUserData2(user, op) {
    var html = "<h2 class='show_h2'>Valitse viesti:</h2><br><div class='table-responsive-md'><table class='table table-hover table-bordered'><thead><tr class='bg-success'><th>Tunnus</th><th>Lähettäjä</th><th>Aihe</th><th>Viesti</th>" + 
            "</tr></thead><tbody>";
    fetch('/messages')
    .then(response => response.json())

    .then(data => { 
        for(var i=0; (i < data.length); i++) {
            if( data[i].sender == user) {
              //console.log(data)
               html += '<tr><td >' + "<a href='javascript:" + (op ? "modData(" : "modMsg(") + data[i].id + ")'>" + data[i].id + '</a>' +
                    '</td><td>' + data[i].sender +
                    '</td><td>' + data[i].topic +
                    '</td><td>' + "<a href='javascript:" + (op ? "modMsg(" : "modData(") + data[i].message + ")'>" + data[i].message + '</a>' +
                    '</td></tr>'
                    console.log(data[i]);
            }
        }
        html += "</tbody></div></table>";
        return html
    })
    .then(html => document.getElementById("msg_area").innerHTML = html)
    .catch(error => document.getElementById("msg_area").innerHTML = 'Error: ' + error);
    document.getElementById("msg_area").setAttribute('style', 'display:block;');
};



/***************************************CAT'S API*****************************************************************************/
/*window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});*/

//Cat's api

function getCat() { 
  
  // Fetch Api
  function fetchFacts() {

    fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1')
      .then(response => response.text())
      .then(data => {
       let fact = JSON.parse(data).text
       //console.log(fact) 
       var textbox = document.createElement("p");
       textbox.classList.add('list-group-item')
       textbox.classList.add('text-dark')
       textbox.classList.add('p-3')
       var node = document.createTextNode(fact);
       textbox.appendChild(node);

       let facts = document.querySelector(".facts");
       facts.appendChild(textbox);
      })
      .catch(err => console.log(err))
  }

  // Create clear button
       var btn = document.createElement("button");
       btn.innerHTML = 'Clear'
       btn.classList.add("btn")
       btn.classList.add("btn-dark")
       btn.classList.add("clear")
       btn.classList.add("shadow-none")
       let head = document.querySelector(".head");
       head.appendChild(btn);
       //console.log(head)

       const clear_btn = document.querySelector('.clear')
       clear_btn.addEventListener('click', function() {
        let facts = document.querySelector(".facts");
        facts.innerHTML = '';
        clear_btn.parentNode.removeChild(clear_btn)
       })
  
    fetchFacts()
  
};

