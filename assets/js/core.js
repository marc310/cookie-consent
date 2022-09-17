

const configFile = './assets/js/config.json'

const conf = {
    name : 'Kess',
    description: 'kess entire description',
    url: 'https://kessgame.com/',
    privacyPage: 'privacy.html',
    termsPage: 'terms.html'
}

const createElement = (elementName, attribute) => {
    const element = document.createElement(elementName)
    const attrAsArray = Object.entries(attribute)

    attrAsArray.forEach(([attr, value]) => {
        element.setAttribute(attr, value)
    })

    return element
}

createHeadScript = (type, url) => {
    let script = createElement('script', {
        type: type,
        src: url
    })
    document.head.appendChild(script);
}

const giveaway = document.querySelector("#giveaway_script");
createGiveawayScript = (type, url) => {
    let script = createElement('script', {
        type: type,
        src: url
    })
    giveaway.appendChild(script);
}

const timeNow = () => {
    let data = new Date()
    return data.getTime()
}


//-------------------------------------------------------
// Objects
//-------------------------------------------------------


const close = document.querySelector(".close");
const cookieModal = document.querySelector(".cookie");
const cookieWrapper = document.querySelector(".cookie_wrapper");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const more = document.querySelector("#more_cookie");
const backicon = document.querySelector(".back_icon");
const cookieFloater = document.querySelector(".cookie_floater");
const allowCookies = document.querySelector('#allowCookies');
const declineCookies = document.querySelector('#declineCookies');
const confirmCookies = document.querySelector('#confirmCookies');
const cookieSettings = document.querySelector(".ccb__edit")
const consentGive = document.querySelector(".consent__give")
const cookieConsentBar = document.querySelector("#cconsent-bar")

const setCookie = 'setCookie'
const deleteCookie = 'deleteCookie'
const comma = ',',
      space = ' '

//-------------------------------------------------------
// Visual Actions
//-------------------------------------------------------

close.addEventListener("click", function () {
    if (!CookieManage.getCookie(conf.name)){
        consentBarShow()
        cookieWrapper.style.display = "none";
    }else {
        floaterVisible()
    }
});

cookieFloater.addEventListener("click", function () {
    cookiePreferences()
    floaterHide()
});

more.addEventListener("click", () => {
    cookieMorePreferences()
});

backicon.addEventListener("click", () => {
  cookiePreferences()
});

consentBarHide = () => {
    cookieConsentBar.classList.add('collapse')
}
consentBarShow = () => {
    cookieConsentBar.classList.remove('collapse')
}

floaterVisible = () => {
    cookieWrapper.style.display = "none";
    cookieFloater.style.display = "flex";
}
floaterHide = () => {
    cookieWrapper.style.display = "flex";
    cookieFloater.style.display = "none";
}
cookiePreferences = () => {
    back.style.display = "none";
    front.style.display = "flex";
}
cookieMorePreferences = () => {
    front.style.display = "none";
    back.style.display = "flex";
}




//-------------------------------------------------------
// Cookie Functional Actions
//-------------------------------------------------------

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


//-------------------------------------------------------
// Local Storage Functional Actions
//-------------------------------------------------------

LocalStrManage = {
	setLocalStorage:function(a,b) {
        window.localStorage.setItem(a, b);
    },
    getLocalStorage: function (a) {
        var c = window.localStorage.getItem(a);
        if ( c != null) {
            
            return c;
        } else {
            return "";
        }
    },
    deleteLocalStorage: function (a) {
        window.localStorage.removeItem(a);
    }
}


// include dependency https://unpkg.com/yett
// A small webpage library to control the execution of (third party - analytics for example) scripts
// 

createHeadScript('application/javascript', 'https://unpkg.com/yett')

//-------------------------------------------------------
// Whitelisting Consent Actions
//-------------------------------------------------------
const consent = {
    name: conf.name,
    sufix: '_Consent',
    value: true,
    date: timeNow(),
    domain: conf.url,
    cookies : {
        analytics: {
            src: "",
            wanted: null,
        },
        marketing: {
            src: "https://platform-api.sharethis.com/js/sharethis.js#property=63117cee0b5e930012a9c414&product=sop",
            wanted: null,
        },
        giveaway: {
            src: "https://widget.gleamjs.io/e.js",
            wanted: null,
        }
    }
}


//-------------------------------------------------------
// Start Coding here { All basic settings above this line }
//-------------------------------------------------------



getAllCookies = () => document.cookie.split(';').reduce((ac, str) => Object.assign(ac, {[str.split('=')[0].trim()]: str.split('=')[1]}), {});

// get cookie script values from JSON config file
// this function return the src value
getCookieScript = (value) => {
    let func = value
    return fetch(configFile).then(res => res.json()).then(data => {
        let configName = func
        let configCookie = data[configName][0].src
        console.log(configCookie)
        return configCookie
    })
}

listCookies = () => {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}

getFormPref = () => {
    return [...document.querySelectorAll('[data-function]')].filter((el) => el.checked).map((el) => el.getAttribute('data-function'));
}
getAllPref = () => {
    return [...document.querySelectorAll('[data-function]')].filter((el) => el).map((el) => el.getAttribute('data-function'));
}


// verifica o local storage e assinala as atribuiçoes de configurações
checkCookieConfig = () => {
    // debugger
    // procura configurações na maquina local
    if (!CookieManage.getCookie(conf.name)){
        // console.log('cookie consent nao existe') entao cria o script por padrao
        consentBarShow()
            createGiveawayScript('application/javascript', consent.cookies.giveaway.src)
            createHeadScript('application/javascript', consent.cookies.marketing.src)
    } else {
        // consent existe entao verifica a validação do consent 
        let consentActive = JSON.parse(CookieManage.getCookie('Kess'))
        floaterVisible()
        if (consentActive.value == false){
            createGiveawayScript('application/blocked', consent.cookies.giveaway.src)
        }else {
            createGiveawayScript('application/javascript', consent.cookies.giveaway.src)
        }
    }
    // return cookie
}

setCookieConsent = (key) => {
    if (key == false) {
        let cookieConsent= CookieManage.deleteCookie(conf.name)
    } else {
        let cookieConsent= CookieManage.setCookie(conf.name, key, 15);
    }
}

// se nao houver configurações entao é o primeiro acesso
// cria um cookie local e salva as configurações default
// se o usuario assinala grava as novas configs
// configurações existentes e criadas entao inicia a configuração do whitelist
// cria objeto whitelist e atribui os scripts
// inicia o whitelist


//-------------------------------------------------------
// Starting App
//-------------------------------------------------------
checkCookieConfig()

//-------------------------------------------------------
// Basic Log
//-------------------------------------------------------
// verifyLog = () => {
//     let dataLog = LocalStrManage.getLocalStorage('Current_Log')
//     console.log(dataLog)
//     let date = new Date()

//     console.log(date)
//     if (dataLog < timeNow()){
//         console.log('ae : ' + dataLog + ' e time = ' + timeNow())
//     }

// }
// verifyLog()
// LocalStrManage.setLocalStorage('Current_Log', timeNow())



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
// Cookie Preparation
//-------------------------------------------------------


prepareCookies = (preferences, action = 'setCookie') => {
    // prepareCookies tem por padrao a ação de inserir 'setCookie'
    // console.log(preferences)
    // debugger
    if (preferences.length < 1) {
        let allPrefs = getAllPref()
        for (let i = 0; i < allPrefs.length; i++){
            try {
                let configName = conf.name + space + allPrefs[i]
                var output= CookieManage.deleteCookie(configName);
            } catch(err) {
                console.log(err)
            }
        }
    }
    //
    for (let i = 0; i < preferences.length; i++){
        try {
            (async () => {
                // let script= await getCookieScript(preferences[i])
                let configName = conf.name + space + preferences[i]
                
                let expires = 15

                    if (action === 'setCookie') {
                        // var output= CookieManage.setCookie(configName, script, expires);
                        let formPref = consent.cookies[preferences[i]]
                        console.log(formPref.wanted)
                        formPref.wanted = true
                        setCookieConsent(JSON.stringify(consent))
                        // setCookieConsent(false)
                        // cria elementos relacionados a escolha do usuario
                        // esses elementos sao scripts direcionados ao head ou ao elemento alvo
                        // JSON.parse(CookieManage.getCookie('Kess'))
                        // const givescript = document.createElement('div')
                        // givescript.innerHTML = script;
                        // document.getElementById("giveaway-script").appendChild(givescript);
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


//-------------------------------------------------------
// Event Listeners
//-------------------------------------------------------
const allPrefs = getAllPref()
allowAll = () => {
    // prepareCookies(allPrefs, setCookie)
    // debugger
    // setCookieConsent(true)
    if (!CookieManage.getCookie(conf.name)){
        setCookieConsent(JSON.stringify(consent))
        console.log('vc esta aceitando pela primeira vez')
    }else {
        window.yett.unblock()
        createGiveawayScript('application/javascript', consent.cookies.giveaway.src)
        createHeadScript('application/javascript', consent.cookies.marketing.src)
    }

}

cookieSettings.addEventListener("click", () => {
    cookieWrapper.style.display = "flex";
    consentBarHide()
})

confirmCookies.addEventListener("click", ()=> {
    // pega as preferencias do formulario escolhidas pelo usuario
    const pref = getFormPref();
    prepareCookies(pref, setCookie)
    // cookiePreferences = pref.toString().split(/\s*;\s*/)
    floaterVisible()

});

consentGive.addEventListener("click", () => {
    allowAll()
    consentBarHide()
    floaterVisible()
})

allowCookies.addEventListener("click", ()=> {
    allowAll()
    floaterVisible()
});


declineCookies.addEventListener("click", ()=> {
    prepareCookies(allPrefs, deleteCookie)
    floaterVisible()
    giveaway.setAttribute('type', 'javascript/blocked')
    consent.value = false
    setCookieConsent(JSON.stringify(consent))

    window.location.reload()
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