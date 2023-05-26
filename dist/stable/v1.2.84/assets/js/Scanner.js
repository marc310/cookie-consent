



// (function(){
    
//     const proxy = 'https://alloworigin.onrender.com'
//     let url = 'https://formulaplusrj.com.br'
//     $.getJSON(proxy + '/get?url=' + encodeURIComponent(url), function (data) {
//         // $('#pageContent').html(data.contents);
//         // var cookies = document.cookie.split(';')
//         // $('#result').append(cookies);
//         // $('#result').append('<br>');
//         // $('#result').append('scan done');
//         // return data
//         console.log('scanning...')
//     }).then((res)=>{
//         console.log('preparing data response: ')
//         // console.log(res)
//         const doc = new DOMParser().parseFromString(res.contents, 'text/html');
//         let doc_scripts = doc.scripts
//         console.log(doc)
//         for (let i = 0; i < doc_scripts.length; i++) {
//             let has_src = doc_scripts[i].attributes.src != undefined ? true : false
//             if (has_src){
//                 let element = doc_scripts[i].attributes.src.value;
//                 console.log(element)
//             }
//             let innerContent = doc_scripts[i].innerHTML
//             if (innerContent != ''){
//                 console.log(innerContent)
//             }

//             // debugger
//         }
//         // doc.title; 
//         // doc.body;
//         // debugger
//     })

//     // let href = 'marcelomotta.com'

//     // with fetch
//     // fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://' + href)}`)
//     // .then(response => {
//     //     if (response.ok) return response.json()
//     //     throw new Error('Network response was not ok.')
//     // })
//     // .then(data => {
//     //     console.log(data.contents)
//     // });

//     // with JQuery
    

//     // fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(href)}`)
//     // .then(response => {
//     //   if (response.ok) return response.json()
//     //   throw new Error('Network response was not ok.')
//     // })
//     // .then(data => {
//     //     $('#siteloader').html(data);
//     //     debugger
//     //     console.log(data.contents)
//     // });

// })();


function scanPage() {
    $('#result').html('');
    deleteCookies()

    // let domain = 'formulaplusrj.com.br'
    let domain = document.querySelector('#domain')

    console.log('scanning ' + domain.value)
    $('#result').append('preparing scan...');
    $('#result').append('<br>');
    $('#result').append('scanning ' + domain.value);
    $('#result').append('<br>');
    
    scan(domain.value)
    // setTimeout(listCookies(), 1000);
    // setTimeout(deleteCookies(), 1000);
    
    $('#result').append('work done');
    $('#result').append('<br>');
}

function scan() {
    const proxy = 'https://alloworigin.onrender.com'
    let domain = document.querySelector('#domain')
    $('#result').html('');

    // console.log('starting...')
    $('#result').append('scanning ' + domain.value);
    $('#result').append('<br>');
    domain_url = 'https://' + domain.value
    $('#result').append('starting...');
    $('#result').append('<br>');

    
    $.getJSON(proxy + '/get?url=' + encodeURIComponent(domain_url), function (data) {
        $('#pageContent').html(data.contents);
        var cookies = document.cookie.split(';')
        $('#result').append(cookies);
        $('#result').append('<br>');
        $('#result').append('scan done');
    })
    .then(data => {
        scanScripts(data)

        // debugger
        // var cookies = document.cookie.split(';')
        // // console.log(c)
        // // console.log('<br>')
        // $('#result').append(cookies);
        // $('#result').append('<br>');
        // $('#result').append('scan done');
        // // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        // // deleteCookies()
        // console.log('deleting cookie informations')
        // var cookies = document.cookie.split(';')
        // var ret = '';
        // for(var i = 1; i <= cookies.length; i++) {
        //     ret += i + ' - ' + cookies[i - 1] + "<br>";
        // }
        // return ret;
        // getCookies()
        
    });
    
    // $.getJSON(url, function (data) {
    //     console.log(data)
    //     $('#result').html(data.contents);
    // })
    // .then(data => {
    //     getCookies()
    // });
}

function listCookies() {
    var cookies = document.cookie.split(';')
        // console.log(c)
        // console.log('<br>')
        $('#result').append(cookies);
        $('#result').append('<br>');
        $('#result').append('scan done');
        // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        // deleteCookies()
        // console.log('deleting cookie informations')
}

function getCookies() {
    var cookies = document.cookie.split(';');
    var ret = '';
    for(var i = 1; i <= cookies.length; i++) {
        ret += i + ' - ' + cookies[i - 1] + "<br>";
    }
    return ret;
    }

function deleteCookies () {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    // var cookies = document.cookie.split(';')
    // for (var i = 0; i < cookies.length; i++) {
    //     var cookie = cookies[i];
    //     var eqPos = cookie.indexOf("=");
    //     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //     document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // }
}

function scanScripts(data){
        console.log('preparing data response: ')
        const doc = new DOMParser().parseFromString(data.contents, 'text/html');
        let doc_scripts = doc.scripts
        console.log(doc)
        for (let i = 0; i < doc_scripts.length; i++) {
            let has_src = doc_scripts[i].attributes.src != undefined ? true : false
            if (has_src){
                let element = doc_scripts[i].attributes.src.value;
                console.log(element)
            }
            let innerContent = doc_scripts[i].innerHTML
            if (innerContent != ''){
                console.log(innerContent)
            }
        }
}
// $(function(){
//     let href = 'http://www.corsproxy.com/' + 'marcelomotta.com'
//     $.ajax({
//         url:href,
//         type:'GET',
//         success: function(data){
//             $('#siteloader').html($(data).find('#siteloader').html());
//             // $('#siteloader').html(data);
//         }
//     });
// });
// add on ajax
// headers: { 'Access-Control-Allow-Origin': '*' },
// send data to
// $('#siteloader').html(data);

// c = document.cookie
 
// arr = c.split(';')
// json = JSON.stringify(arr)
// j = JSON.parse(json)
 
// for (let index = 0; index < j.length; index++) {
//     console.log(j[index])
// }
 
// function check_cookie_name(name) 
//     {
//       var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//       if (match) {
//         console.log(match[2]);
//       }
//       else{
//            console.log('--something went wrong---');
//       }
//    }
 
// check_cookie_name('_ga')