


//-------------------------------------------------------
// Basic Cookies Script Setup
//-------------------------------------------------------
const conf = {
    name : 'Kess',
    description: 'kess entire description',
    url: 'https://kessgame.com/',
    privacyPage: 'privacy.html',
    termsPage: 'terms.html'
}



//-------------------------------------------------------
// Create Elements
//-------------------------------------------------------
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
    if (document.querySelector("#giveaway_script")){
        let script = createElement('script', {
            type: type,
            src: url,
        })
        giveaway.appendChild(script);
    } else {
        return false
    }
}

createAnalytics = (id, url) => {
    let scriptInner =   "window.dataLayer = window.dataLayer || [];" +
                        "function gtag(){dataLayer.push(arguments);}" +
                        "gtag('js', new Date());" +
                        "gtag('config', 'UA-145014090-1');"

    let head = document.getElementsByTagName("head")[0]
    let scriptTag = document.createElement('script')
    scriptTag.setAttribute('id', 'script_analytics')
    scriptTag.setAttribute('src', url)
    scriptTag.setAttribute('async', true)
    console.log(scriptTag)
    head.prepend(scriptTag)
    // document.getElementById('script_analytics').innerHTML(scriptTag)
}

const timeNow = () => {
    let data = new Date()
    return data.getTime()
}

const dateNow = () => {
    let data = new Date()
    return dataFormatada = (data.getFullYear() + "/" + ((data.getMonth() + 1)) + "/" + (data.getDate() ))
}



//-------------------------------------------------------
// Consent Setup
//-------------------------------------------------------
const consent = {
    name: conf.name,
    value: true,
    date: dateNow(),
    timestamp: timeNow(),
    domain: conf.url,
    cookies : {
        analytics: {
            wanted: null
        },
        tag_manager: {
            wanted: null
        },
        marketing: {
            src: "https://platform-api.sharethis.com/js/sharethis.js#property=63117cee0b5e930012a9c414&product=sop",
            wanted: null
        },
        giveaway: {
            src: "https://widget.gleamjs.io/e.js",
            wanted: null
        }
    }
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

const tag_manager = document.getElementById('tag_manager')
const facebook = document.getElementById('facebook')
const analytics = document.getElementById('analytics')
const analytics_script = document.getElementById('analytics_script')

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
// Start Coding here { All basic settings above this line }
//-------------------------------------------------------



getAllCookies = () => document.cookie.split(';').reduce((ac, str) => Object.assign(ac, {[str.split('=')[0].trim()]: str.split('=')[1]}), {});

// get cookie script values from JSON config file
// this function return the src value
// getCookieScript = (value) => {
//     let func = value
//     return fetch(configFile).then(res => res.json()).then(data => {
//         let configName = func
//         let configCookie = data[configName][0].src
//         console.log(configCookie)
//         return configCookie
//     })
// }

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
    // procura configurações na maquina local
    // ou melhor rodar um foreach nas configurações locais do cookie e verificar
    // quais wanted = true pra cada um setar o checkbox pra true pegando o elemento
    // pelo id ex: document.getElementById('giveaway').checked = true
    // pra diferenciar setar os ids como check_'nome'
    // pegar o consent e gerar o form de opções
    if (!CookieManage.getCookie(conf.name)){
        // console.log('cookie consent nao existe') entao cria o script por padrao
        // default setup when user not accepted or declined
        consentBarShow()
        createGiveawayScript('application/javascript', consent.cookies.giveaway.src)
        createHeadScript('application/javascript', consent.cookies.marketing.src)
    } else {
        // consent existe entao verifica a validação do consent 
        let consentActive = JSON.parse(CookieManage.getCookie('Kess'))
        floaterVisible()
        let localCookies = JSON.parse(CookieManage.getCookie('Kess'))
        for (const [key, value] of Object.entries(localCookies.cookies)) {
            // aqui eu percorro um for pelas configurações setadas da ultima vez
            // console.log(`${key}: ${value}`);
            let wanted = localCookies.cookies[key].wanted
            let input = document.getElementById('chk_' + key)
            input.checked = wanted == true ? wanted : false
        }
        if (consentActive.value == false){
            // when user declined for our cookies
            createGiveawayScript('application/blocked', consent.cookies.giveaway.src)
            if (analytics) {
                analytics.setAttribute('type', 'javascript/blocked')
                analytics_script.setAttribute('type', 'javascript/blocked')
            }
            if (facebook) {
                facebook.setAttribute('type', 'javascript/blocked')
            }
            if (tag_manager) {
                tag_manager.setAttribute('type', 'javascript/blocked')
            }
        }else {
            // consent = true entao deve-se verificar quais as configurações atraves do atributo wanted
            for (const [cookie, value] of Object.entries(localCookies.cookies)) {
                // aqui eu percorro um for pelas configurações setadas da ultima vez
                // console.log(`${cookie}: ${value}`);
                let c = cookie
                let cookieAttr = localCookies.cookies[c]
                // console.log(cookieAttr)
                if (cookieAttr.wanted === true){
                    if(c === 'giveaway'){
                        createGiveawayScript('application/javascript', cookieAttr.src)
                    } else {
                        createHeadScript('application/javascript', cookieAttr.src)
                    }
                } else if (cookieAttr.wanted === false || cookieAttr.wanted === null) {
                    // se o wanted estiver setado pra false ou null
                    if (c === 'analytics') {
                        document.getElementById('analytics').setAttribute('type', 'javascript/blocked')
                    }
                    if (c === 'facebook') {
                        document.getElementById('facebook').setAttribute('type', 'javascript/blocked')
                    }
                    if (c === 'tag_manager') {
                        document.getElementById('tag_manager').setAttribute('type', 'javascript/blocked')
                    }
                }

                // let wanted = localCookies.cookies[key].wanted
                // let input = document.getElementById('chk_' + key)
                // input.checked = wanted == true ? wanted : false
            }
            // createGiveawayScript('application/javascript', consent.cookies.giveaway.src)
            // createHeadScript('application/javascript', consent.cookies.marketing.src)

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



//-------------------------------------------------------
// Cookie Preparation
//-------------------------------------------------------


prepareCookies = (preferences, action = 'setCookie', form = false) => {
    // prepareCookies tem por padrao a ação de inserir 'setCookie'
    // console.log(preferences)
    let allPrefs = getAllPref()
    // if (preferences.length === 0) {
    //     for (let i = 0; i < allPrefs.length; i++){
    //         try {
    //             let cookiePref = allPrefs[i]
    //             consent.cookies[cookiePref].wanted = false
    //             setCookieConsent(JSON.stringify(consent))
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     }
    // }
    // 
    if (preferences === 'all') {
        // debugger
        for (let i = 0; i < allPrefs.length; i++){
            try {
                let cookiePref = allPrefs[i]
                consent.cookies[cookiePref].wanted = true
                consent.value = true
                setCookieConsent(JSON.stringify(consent))
            } catch(err) {
                console.log(err)
            }
        }
        setTimeout(() => {
            console.log("Refreshing page in 1 second.");
            window.location.reload()
          }, "1000")
        //   
    }
    if (preferences.length < 1) {
        // debugger
        for (let i = 0; i < allPrefs.length; i++){
            try {
                // let configName = conf.name + space + allPrefs[i]
                // var output= CookieManage.deleteCookie(configName);
                let cookiePref = allPrefs[i]
                consent.cookies[cookiePref].wanted = false
                consent.value = false
                setCookieConsent(JSON.stringify(consent))
            } catch(err) {
                console.log(err)
            }
        }
        setTimeout(() => {
            console.log("Refreshing page in 1 second.");
            window.location.reload()
          }, "1000")
        //   
    } else if(form === true) {
        for (let i = 0; i < preferences.length; i++){
            let formPref = consent.cookies[preferences[i]]
            formPref.wanted = true
            setCookieConsent(JSON.stringify(consent))
        }
        setTimeout(() => {
            console.log("Refreshing page in 1 second.");
            window.location.reload()
          }, "1000")
    } else {
        //
        for (let i = 0; i < preferences.length; i++){
            try {
                // let script= await getCookieScript(preferences[i])
                let configName = conf.name + space + preferences[i]
                let expires = 15
                
                    if (action === 'setCookie') {
                        // var output= CookieManage.setCookie(configName, script, expires);
                        let formPref = consent.cookies[preferences[i]]
                        // TODO..
                        // console.log([i])
                        // console.log(formPref.src)
                        // debugger
                        // console.log(formPref.wanted)
                        formPref.wanted = true
                        // console.log(formPref.wanted)
                        // debugger
                        setCookieConsent(JSON.stringify(consent))

                        // JSON.parse(CookieManage.getCookie('Kess'))
                        // setCookieConsent(false)
                        // cria elementos relacionados a escolha do usuario
                        // const givescript = document.createElement('div')
                        // givescript.innerHTML = script;
                        // document.getElementById("giveaway-script").appendChild(givescript);
                    }
                    else if (action === 'deleteCookie') {
                        consent.cookies[preferences[i]].wanted = false
                        consent.value = false
                        setCookieConsent(JSON.stringify(consent))
                        // var output= CookieManage.deleteCookie(configName);
                    }
                    
            } catch(err) {
                console.log(err)
            }
        }
    }
    window.location.reload()

}


//-------------------------------------------------------
// Event Listeners
//-------------------------------------------------------
const allPrefs = getAllPref()

// acceptCookies = () => {
//     if (!CookieManage.getCookie(conf.name)){
//         setCookieConsent(JSON.stringify(consent))
//         console.log('vc esta aceitando pela primeira vez') 
//     }else {
//         window.yett.unblock()
//         createGiveawayScript('application/javascript', consent.cookies.giveaway.src)
//         createHeadScript('application/javascript', consent.cookies.marketing.src)
//     }
// }

// allowAll = () => {
//     // prepareCookies(allPrefs, setCookie)
//     // debugger
//     // setCookieConsent(true)
//     // TODO.. precisa setar todos os wanted pra true
//     if (!CookieManage.getCookie(conf.name)){
//         setCookieConsent(JSON.stringify(consent))
//         console.log('vc esta aceitando pela primeira vez') 
//     }else {
//         window.yett.unblock()
//         createGiveawayScript('application/javascript', consent.cookies.giveaway.src)
//         createHeadScript('application/javascript', consent.cookies.marketing.src)
//     }

// }

cookieSettings.addEventListener("click", () => {
    cookieWrapper.style.display = "flex";
    consentBarHide()
})

confirmCookies.addEventListener("click", ()=> {
    // pega as preferencias do formulario escolhidas pelo usuario
    const pref = getFormPref();
    prepareCookies(pref, setCookie, true)
    // cookiePreferences = pref.toString().split(/\s*;\s*/)
    floaterVisible()
    window.location.reload()
});

consentGive.addEventListener("click", () => {
    // allowAll()
    prepareCookies('all', setCookie)
    consentBarHide()
    floaterVisible()
    // window.location.reload()

})

allowCookies.addEventListener("click", ()=> {
    // allowAll()
    prepareCookies('all', setCookie)
    floaterVisible()
    // window.location.reload()

});


declineCookies.addEventListener("click", ()=> {
    prepareCookies(allPrefs, deleteCookie)
    floaterVisible()
    // giveaway.querySelector('script').setAttribute('type', 'javascript/blocked')
    // window.location.reload()
});

