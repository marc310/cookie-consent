

const configFile = './assets/js/config.json'

const conf = {
    name : 'Kess',
    description: 'kess entire description',
    url: 'https://kessgame.com/',
    privacyPage: 'privacy.html',
    termsPage: 'terms.html'
}


//-------------------------------------------------------
// Objects
//-------------------------------------------------------

const comma = ',',
      space = ' '

const close = document.querySelector(".close");
const cookie = document.querySelector(".cookie");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const more = document.querySelector("#more_cookie");
const backicon = document.querySelector(".back_icon");

//-------------------------------------------------------
// Visual Actions
//-------------------------------------------------------

close.addEventListener("click", function () {
  cookie.style.display = "none";
});

more.addEventListener("click", () => {
  front.style.display = "none";
  back.style.display = "flex";
});

backicon.addEventListener("click", () => {
  back.style.display = "none";
  front.style.display = "flex";
});

const tab = document.querySelector(".tab");
const liEl = tab.getElementsByTagName("li");

for (let i = 0; i < liEl.length; i++) {
  const element = liEl[i];
  element.addEventListener("click", function () {
    const iEl = element.getElementsByTagName("i")[0];
    const data = element.nextElementSibling;
    if (iEl.className == "far fa-minus") {
      iEl.classList.value = "fas fa-plus";
    } else {
      iEl.classList.value = "far fa-minus";
    }
    data.classList.toggle("active");
  });
}



//-------------------------------------------------------
// Functional Actions
//-------------------------------------------------------

const inputs = [...document.querySelectorAll('[data-function]')].filter((el) => el.checked).map((el) => el.getAttribute('data-function'));
const allowCookies = document.querySelector('#allowCookies');
const declineCookies = document.querySelector('#declineCookies');
const confirmCookies = document.querySelector('#confirmCookies');


function  isEmptyParam(a) {
    if (a == undefined || a == "") {
        return true
    } else {
        return false
    }
}

CookieManage = {
	getCookie: function (c) {
        var b = document.cookie;
        var e = c + "=";
        var d = b.indexOf("; " + e);
        if (d == -1) {
            d = b.indexOf(e);
            if (d != 0) {
                return null
            }
        } else {
            d += 2
        }
        var a = document.cookie.indexOf(";", d);
        if (a == -1) {
            a = b.length
        }
        return unescape(b.substring(d + e.length, a))
    },
    setCookie: function (b, d, a, c) {
        var e = new Date();
        e.setDate(e.getDate() + a);
        window.document.cookie = b + "=" + escape(d) + ";path=/" + ((isEmptyParam(a)) ? "" : ";expires=" + e.toUTCString()) + ((isEmptyParam(c)) ? ";" : ";")
    },
    deleteCookie: function (a) {
        if (CookieManage.getCookie(a)) {
            CookieManage.setCookie(a, "", -1, "")
        }
    }
}


getCookieConfig = (value) => {
    let func = value
    return fetch(configFile).then(res => res.json()).then(data => {
        let configName = func
        let configCookie = data[configName][0].value
        // console.log(configCookie)
        return configCookie
    })
}

allowAllCookies = () => {
    console.log('allow all cookies')
}

// checkCookie = () => {
//     var cookieEnabled = navigator.cookieEnabled;
//     if (!cookieEnabled){ 
//         document.cookie = "testcookie";
//         cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
//     }
//     return cookieEnabled || showCookieFail();
// }

// showCookieFail = () => {
//     console.log('check cookie failed')
// }

getFormPref = () => {
    return [...document.querySelectorAll('[data-function]')].filter((el) => el.checked).map((el) => el.getAttribute('data-function'));
}
getAllPref = () => {
    return [...document.querySelectorAll('[data-function]')].filter((el) => el).map((el) => el.getAttribute('data-function'));
}

prepareCookies = (preferences, action = 'setCookie') => {
    // prepare cookies recebe as preferencias
    // e salva os cookies de acordo com as preferencias setadas
    if (preferences.length > 1) {
        // console.log('teste ' + preferences.length)
        for (let i = 0; i < preferences.length; i++){
            //  console.log(preferences[i])
            // activatePreference= window[preferences[i]]()
            try {
                (async () => {
                    let script= await getCookieConfig(preferences[i])
                    let configName = conf.name + space + preferences[i]
                    const d = new Date();
                    d.setTime(d.getTime() + (24*60*60*1000));
                    let expires = d.toUTCString()

                        if (action === 'setCookie') {
                            var output= CookieManage.setCookie(configName, script, expires);
                        }
                        else if (action === 'deleteCookie') {
                            var output= CookieManage.deleteCookie(configName);
                        }

                })()
                } catch(err) {
                    console.log(err)
                }
            }
    }
}



//-------------------------------------------------------
// Event Listeners
//-------------------------------------------------------

const setCookie = 'setCookie'
const deleteCookie = 'deleteCookie'


confirmCookies.addEventListener("click", ()=> {
    // pega as preferencias do formulario escolhidas pelo usuario
    const pref = getFormPref();
    prepareCookies(pref, setCookie)
    // cookiePreferences = pref.toString().split(/\s*;\s*/)
});

declineCookies.addEventListener("click", ()=> {
    let allPrefs = getAllPref()
    // console.log(allPrefs)
    // TODO... script to delete all prefs returned on get all pref function
    prepareCookies(allPrefs, deleteCookie)
    // var output= CookieManage.deleteCookie("testCookie");
});



// const confirmCookies = document.querySelector('#confirmCookies');

// function cookies(functions) {
//     // debugger
//     const container = document.querySelector('.cookies-container');
//     const save = document.querySelector('.cookies-save');
//     if (!container || !save) return null;
  
//     const localPref = JSON.parse(window.localStorage.getItem('cookies-pref'));
//     if (localPref) activateFunctions(localPref);
  
//     function getFormPref() {
//       return [...document.querySelectorAll('[data-function]')]
//         .filter((el) => el.checked)
//         .map((el) => el.getAttribute('data-function'));
//     }
  
//     function activateFunctions(pref) {
//       pref.forEach((f) => functions[f]());
//       container.style.display = 'none';
//       window.localStorage.setItem('cookies-pref', JSON.stringify(pref));
//     }
  
//     function handleSave() {
//       const pref = getFormPref();
//       activateFunctions(pref);
//     }
  
//     // confirmCookies.addEventListener('click', handleSave);
//   }
  
//   function marketing() {
//     console.log('Função de marketing');
//   }
  
//   function analytics() {
//     console.log('Função de analytics');
//   }
  
//   confirmCookies.addEventListener("click", ()=> {
//     debugger
//     // console.log(this.element)
//     // const pref = getFormPref();
//     // activateFunctions(pref)
//     // // debugger
//     // const cookieConfig = prepareCookies();
//     // // console.log(pref)
//     // console.log(cookieConfig)
    
//       cookies({
//         marketing,
//         analytics,
//       });
// });