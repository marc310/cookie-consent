


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
            description: 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            wanted: null,
            script: null // script null means the script not will be loaded, and the code will search on DOM by the cookie name
        },
        marketing: {
            src: "https://platform-api.sharethis.com/js/sharethis.js#property=63117cee0b5e930012a9c414&product=sop",
            description: 'These cookies allow us or our Marketing Share-This provider to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            wanted: null,
            script: true // true means the script will be created in the DOM and loaded on header
        },
        giveaway: {
            src: "https://widget.gleamjs.io/e.js",
            description: 'These cookies allow us or our third-party giveaway providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            wanted: null,
            script: false // that means the script will be loaded on target to call this target should use the id on element named with sufix cookie.name + '_script' ex: giveaway_script
        }
    }
}

  
//-------------------------------------------------------
// Create Form elements
//-------------------------------------------------------

TitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
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

const renderIconBack = (node) => {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('viewBox', '0 0 448 512');
    iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const iconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
    iconPath.setAttribute(
        'd',
        'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'
      );
    
      iconSvg.appendChild(iconPath);
      return node.appendChild(iconSvg);
}

const renderIconClose = (node) => {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    iconSvg.setAttribute('width', '24');
    iconSvg.setAttribute('heigth', '24');
    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('stroke', '#273240');
    iconSvg.classList.add('post-icon');

    const iconG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    iconG.setAttribute('opacity', '0.5')
    iconSvg.appendChild(iconG);
    
    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const iconPath2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
  
    iconPath.setAttribute(
      'd',
      'M18 6L6 18'
    );
    iconPath2.setAttribute(
      'd',
      'M6 6L18 18'
    );
    iconPath.setAttribute('stroke-linecap', 'round');
    iconPath.setAttribute('stroke-linejoin', 'round');
    iconPath.setAttribute('stroke-width', '1.5');
    iconPath2.setAttribute('stroke-linecap', 'round');
    iconPath2.setAttribute('stroke-linejoin', 'round');
    iconPath2.setAttribute('stroke-width', '1.5');
  
    iconG.appendChild(iconPath);
    iconG.appendChild(iconPath2);
  
    return node.appendChild(iconSvg);
}


//-------------------------------------------------------
// Generating DOM Elements
//-------------------------------------------------------
createCookieSettingsElements = () => {
    
let div_cookie_wrapper = createElement('div', { class: 'cookie_wrapper' })
document.body.after(div_cookie_wrapper)
    // 
    let div_cookie = createElement('div', { class: 'cookie' })
    div_cookie_wrapper.appendChild(div_cookie)
        // 
        // div close
        let div_close = createElement('div', { class: 'close' })
            div_cookie.appendChild(div_close)
            
            renderIconClose(div_close)
        // 
        // div front
        div_front = createElement('div', { class: 'front' })
            div_cookie.appendChild(div_front)
            front_h1 = document.createElement('h1')
                front_h1.innerHTML = 'Privacy Preference Center'
                div_front.appendChild(front_h1)
            front_p = document.createElement('p')
                front_p.innerHTML = 'When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to our <a href="https://kessgame.com/privacy.html" id="privacy">Privacy Policy</a>.'
                div_front.appendChild(front_p)
            div_front_buttons = createElement('div', { class: 'front__buttons' })
                div_front.appendChild(div_front_buttons)
                // buttons
                button_allow_front_buttons = createElement('button', { 
                    class: 'front__buttons', 
                    type: 'submit', 
                    id: 'allowCookies'
                })
                button_allow_front_buttons.innerHTML = 'Allow All'
                div_front_buttons.appendChild(button_allow_front_buttons)

                button_decline_front_buttons = createElement('button', { 
                    class: 'front__buttons', 
                    type: 'submit', 
                    id: 'declineCookies'
                })
                button_decline_front_buttons.innerHTML = 'Decline unnecessary cookies'
                div_front_buttons.appendChild(button_decline_front_buttons)
            // front footer
            div_front_footer = createElement('div', { class: 'front__footer' })
            div_front.appendChild(div_front_footer)
                a_more_cookie = createElement('a', { id: 'more_cookie', href: '#' })
                a_more_cookie.innerHTML = 'Manage Consent Preferences'
                div_front_footer.appendChild(a_more_cookie)
        //
        // div back
        div_back = createElement('div', { class: 'back' })
        div_cookie.appendChild(div_back)
            div_header_cookies = createElement('div', { class: 'header-cookies' })
            div_back.appendChild(div_header_cookies)
                div_back_icons = createElement('div', { class: 'back_icons' })
                div_header_cookies.appendChild(div_back_icons)
                    div_back_icon = createElement('div', { class: 'back_icon' })
                    div_back_icons.appendChild(div_back_icon)
                        renderIconBack(div_back_icon)
                //
                div_back_title = createElement('h1', { class: '' })
                div_back_title.innerHTML = 'Manage Consent Preferences'
                div_header_cookies.appendChild(div_back_title)
            //
            // generating form
            let cookie_options = createElement('form', { class: 'cookie_options' })
                div_back.appendChild(cookie_options)
                // generating UL
                let cookie_options_tab = createElement('ul', { class: 'tab' })
                cookie_options.prepend(cookie_options_tab)
                    // necessary cookies
                    let cookie_li = document.createElement('li')
                    cookie_options_tab.appendChild(cookie_li)
                        let iconPlus = createElement('i', { class: 'fas fa-plus' })
                        cookie_li.appendChild(iconPlus)
                        let h2_li = document.createElement('h2')
                        h2_li.innerHTML = 'Strictly Necessary Cookies'
                        cookie_li.appendChild(h2_li)
                        let span_badge = createElement('span', { class: 'baged success' })
                        span_badge.innerHTML = 'Always Active'
                        cookie_li.appendChild(span_badge)
                    let cookie_li_data = createElement('div', { class: 'data2' })
                    cookie_options_tab.appendChild(cookie_li_data)
                        let cookie_li_data_p = document.createElement('p')
                        cookie_li_data_p.innerHTML = 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.'
                        cookie_li_data.appendChild(cookie_li_data_p)
                //
                // cria os elementos baseados no consent config object
                for (let i = 0; i < Object.keys(consent.cookies).length; i++){
                    let cookie_name = Object.keys(consent.cookies)[i]
                    let description_cookie = consent.cookies[cookie_name].description
                    let title = cookie_name == 'giveaway' ? 'Third-Party Cookies' : cookie_name + ' Cookies'
                    let cookie_li = document.createElement('li')
                    cookie_options_tab.appendChild(cookie_li)
                        let iconPlus = createElement('i', { class: 'fas fa-plus' })
                        cookie_li.appendChild(iconPlus)
                        let h2_li = document.createElement('h2')
                        // title
                        h2_li.innerHTML = TitleCase(title)
                        cookie_li.appendChild(h2_li)
                        let label_checkbox = createElement('label', { class: 'custom_checkbox' })
                        cookie_li.appendChild(label_checkbox)
                        let input_checkbox = createElement('input', { 
                            type: 'checkbox',
                            'data-function': cookie_name,
                            id: 'chk_' + cookie_name
                        })
                        label_checkbox.appendChild(input_checkbox)
                        let span_toogle = createElement('span', {class: 'toogle'})
                        label_checkbox.appendChild(span_toogle)
            
                    let cookie_li_data = createElement('div', { class: 'data2' })
                    cookie_options_tab.appendChild(cookie_li_data)
                        let cookie_li_data_p = document.createElement('p')
                            // description
                            cookie_li_data_p.innerHTML = description_cookie
                            cookie_li_data.appendChild(cookie_li_data_p)
                }
                //
                let back_footer = createElement('div', { class: 'back_footer'})
                    cookie_options.appendChild(back_footer)
                    let confirm_cookies = createElement('input', { 
                        id: 'confirmCookies', 
                        type: 'submit', 
                        value: 'Confirm my choices'
                    })
                    back_footer.appendChild(confirm_cookies)

    //
    // Generating COokie Floater Button 
    let floater = createElement('div', { class: 'cookie_floater' })
        div_cookie_wrapper.after(floater)
        let cookie_img = createElement('img', { alt: 'Cookie Privacy Settings', src: 'assets/img/cookie_1f36a.png' })
            floater.appendChild(cookie_img)      
            let span_settings = document.createElement('span') 
                span_settings.innerHTML = 'Privacy Settings'
                floater.appendChild(span_settings)      
          
    //
    // Generating Consent Bar
    let consent_bar = createElement('div', { 
        id: 'cconsent-bar',
        class: 'collapse',
        role: 'region',
        'aria-label': 'Cookie consent',
        'aria-hidden': false,
        tabindex: 0
    })
    floater.after(consent_bar)
        let cc_wrapper = createElement('div', { class: 'ccb__wrapper'})
            consent_bar.appendChild(cc_wrapper)
            let cc_left = createElement('div', { class: 'ccb__left'})
                cc_wrapper.appendChild(cc_left)
                let cc_text = createElement('div', { class: 'cc-text'})
                    cc_text.innerHTML = 'This website uses cookies to ensure you get the best experience on our website.'
                    cc_left.appendChild(cc_text)
            //
            let cc_right = createElement('div', { class: 'ccb__right'})
                cc_wrapper.appendChild(cc_right)
                let cc_button = createElement('div', { class: 'ccb__button'})
                    cc_right.appendChild(cc_button)

                    let buttonEdit = createElement('button', {
                        class: 'ccb__edit',
                        type: 'submit',
                    })
                    buttonEdit.innerHTML = 'Privacy Settings'
                    cc_button.appendChild(buttonEdit)
                    
                    let buttonConsent = createElement('button', {
                        class: 'consent__give',
                        type: 'submit',
                    })
                    buttonConsent.innerHTML = 'Accept all cookies'
                    cc_button.appendChild(buttonConsent)
}


createCookieSettingsElements()




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

// getAllCookies = () => document.cookie.split(';').reduce((ac, str) => Object.assign(ac, {[str.split('=')[0].trim()]: str.split('=')[1]}), {});

// listCookies = () => {
//     var theCookies = document.cookie.split(';');
//     var aString = '';
//     for (var i = 1 ; i <= theCookies.length; i++) {
//         aString += i + ' ' + theCookies[i-1] + "\n";
//     }
//     return aString;
// }

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
        // all inputs checked by default when user not consented yet
        for (let i = 0; i < Object.keys(consent.cookies).length; i++) {
            let input = document.getElementById('chk_' + Object.keys(consent.cookies)[i])
            input.checked = true
        }

    } else {
        // consent existe entao verifica a validação do consent 
        floaterVisible()
        let localCookies = JSON.parse(CookieManage.getCookie('Kess'))
        for (const [key, value] of Object.entries(localCookies.cookies)) {
            // aqui eu percorro um for pelas configurações setadas da ultima vez
            // console.log(`${key}: ${value}`);
            let wanted = localCookies.cookies[key].wanted
            let input = document.getElementById('chk_' + key)
            input.checked = wanted == true ? wanted : false
        }
        if (localCookies.value == false){
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
                    } else if (c != 'analytics' ) {
                        // este script nao pode criar um head pro analytics nem pro tag manager
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
            // console.log("Refreshing page in 1 second.");
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
            // console.log("Refreshing page in 1 second.");
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
            // console.log("Refreshing page in 1 second.");
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

