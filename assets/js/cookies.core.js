
/* ************************************************************
:: Project Name: Cookie Consent Script
:: Project Author Name: Marcelo Motta
:: Project Author URI: https://marcelomotta.com
:: Project URI: https://github.com/marc310/cookie-consent
:: Version: 1.0.0
:: Created: 22 Set 2022
************************************************************ */

if (!Config) {
    console.log('The Config file are not properly configured, please set up the config file before continue.')
}
//-------------------------------------------------------
// Basic Cookies Script Setup
//-------------------------------------------------------
Config.Default = {
    name: 'Cookie Consent',
    url: 'https://github.com/marc310/cookie-consent',
    description: 'Cookie notice bars are not enough!',
    terms: 'terms.html',
    privacy: 'privacy.html',
    expire: 15,
    consent: false
},

//-------------------------------------------------------
//-------------------------------------------------------

Config.Cookies.preferences = Config.Cookies.preferences === undefined ? {} : Config.Cookies.preferences

Config.settings = {
    name : Config.Cookies.preferences.name === undefined ? Config.Default.name : Config.Cookies.preferences.name,
    description: Config.Cookies.preferences.description === undefined ? Config.Default.description : Config.Cookies.preferences.description,
    url: Config.Cookies.preferences.website === undefined ? Config.Default.url : Config.Cookies.preferences.website,
    privacyPage: Config.Cookies.preferences.privacyPage === undefined ? Config.Default.privacy : Config.Cookies.preferences.privacyPage,
    termsPage: Config.Cookies.preferences.termsPage === undefined ? Config.Default.terms : Config.Cookies.preferences.termsPage,
    expire: Config.Cookies.preferences.expire === undefined ? Config.Default.expire : Config.Cookies.preferences.expire,
    defaultConsent: Config.Cookies.preferences.consent === undefined ? Config.Default.consent : Config.Cookies.preferences.consent,
    version: 1
},

//-------------------------------------------------------
// Consent Setup
//-------------------------------------------------------
Config.consent = {
    value: true,
    timestamp: new Date().getTime(),
    cookies : {
    }
}



const w3orgSvg = 'http://www.w3.org/2000/svg'
const javascriptBlocked = 'text/plain'
const appJavascript = 'application/javascript'
const setCookie = 'setCookie'
const deleteCookie = 'deleteCookie'
const comma = ','
const space = ' '


//-------------------------------------------------------
// Create Elements
//-------------------------------------------------------

create = {
    Element: (elementName, attribute) => {
        const element = document.createElement(elementName)
        const attrAsArray = Object.entries(attribute)
    
        attrAsArray.forEach(([attr, value]) => {
            element.setAttribute(attr, value)
        })
    
        return element
    },
    Script: (key) => {
        // debugger
        let tag = key[0]
        let cookieInfo = key[1]
        let wanted = cookieInfo.wanted === undefined ? true : cookieInfo.wanted
        let script = cookieInfo.script
        if(wanted) {
            // todos os wanted devem dar load no script
            // verifica o script true para gerar no header, false para gerar num target, entao é pedido um novo parametro node* , e null para nao carregar nenhum script, retorna falso
            if (script === true) {
                 create.HeadScript(appJavascript, Config.Cookies.template[tag].src)
            } else if (script === false) {
                // precisa passar um target
                 create.TargetScript(appJavascript, Config.Cookies.template[tag].src, tag)
            } 
            if (script === null) {
                // null scripts wanted true = application/javascript
                let ConfigPath = Config.Cookies.template[tag]
                if(ConfigPath.AnalyticsCode){
                    // console.log('cria analytics')
                    create.Analytics(ConfigPath.AnalyticsCode)
                } else if (ConfigPath.FacebookCode) {
                    // console.log('cria facebook script')
                    create.Facebook(ConfigPath.FacebookCode)
                }
                else {
                    unblockScript(tag, true)
                }
            }
        } else if (wanted === false && script === null) {
            let extraTag = Config.Cookies.template[tag].scriptTag === true ? true : false
            blockScript(tag, extraTag)
        }
    },
    
    HeadScript: (type, url) => {
        let script = create.Element('script', {
            type: type,
            src: url
        })
        document.head.appendChild(script);
    },

    FstScript: (type, url) => {
        let script = create.Element('script', {
            type: type,
            src: url
        })
        document.head.prepend(script);
    },
    
    TargetScript: (type, url, target) => {
        let targetLink = '#' + target + '_script'
        const div = document.querySelector(targetLink);
        if (div){
            let script = create.Element('script', {
                type: type,
                src: url,
            })
            div.appendChild(script);
        } else {
            return false
        }
    },
        
    Analytics: (AnalyticsCode) => {
        let Analytics = document.createElement('script');
      Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${AnalyticsCode}`);
      document.head.appendChild(Analytics);
      let AnalyticsData = document.createElement('script');
      AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${AnalyticsCode}');`;
      document.head.appendChild(AnalyticsData);
    },

    Facebook: (FacebookCode)=> {
        let FacebookPixelData = document.createElement('script');
      FacebookPixelData.text = `
                                    !function(f,b,e,v,n,t,s)
                                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                    n.queue=[];t=b.createElement(e);t.async=!0;
                                    t.src=v;s=b.getElementsByTagName(e)[0];
                                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                                    'https://connect.facebook.net/en_US/fbevents.js');
                                    fbq('init', '${FacebookCode}');
                                    fbq('track', 'PageView');
                                `;
      document.head.appendChild(FacebookPixelData);
      let FacebookPixel = document.createElement('noscript');
      FacebookPixel.setAttribute('height', `1`);
      FacebookPixel.setAttribute('width', `1`);
      FacebookPixel.setAttribute('style', `display:none`);
      FacebookPixel.setAttribute('src', `https://www.facebook.com/tr?id=${FacebookCode}&ev=PageView&noscript=1`);
      document.head.appendChild(FacebookPixel);
    },
    

}


//
//-------------------------------------------------------
// Get Core Config
//-------------------------------------------------------
// 
// include dependency https://unpkg.com/yett
// A small webpage library to control the execution of (third party - analytics for example) scripts
// create.HeadScript(appJavascript, 'https://unpkg.com/yett')
// create.FstScript(appJavascript, './assets/js/cookies.config.js')



//-------------------------------------------------------
// Cookie Functional Actions
//-------------------------------------------------------
isEmptyParam = (a) => {
    if (a == undefined || a == "") {
        return true
    } else {
        return false
    }
}


//-------------------------------------------------------
// Local Storage Functional Actions
//-------------------------------------------------------
manage = {
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
        if (manage.getCookie(a)) {
            manage.setCookie(a, "", -1, "")
        }
    },
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





//-------------------------------------------------------
// Cookies Array Storage
//-------------------------------------------------------
const arrConsentCookies = Object.keys(Config.consent.cookies)
const arrayCookies = manage.getCookie(Config.Cookies.preferences.name) ? Object.entries(JSON.parse(manage.getCookie(Config.settings.name)).cookies) : 'not consented yet'
const configCookies = Object.entries(Config.Cookies.template)
const localCookies = JSON.parse(manage.getCookie(Config.settings.name))
const defaultConsentName = Config.settings.name + '_consent'



bannedList = [
    '_gid',
    '_ga',
    'euconsent-v2',
    'pubconsent-v2'
]

Consent = {
    checkBannedList: ()=>{
        for(let i = 0; i < bannedList.length; i++) {
            let target = bannedList[i]
            let cookie = manage.getCookie(target)
            if(cookie) {
                manage.deleteCookie(target)
            }
        }
    },

    clearCookies: () => {
      manage.deleteCookie(Config.settings.name)
      Consent.checkBannedList()
    },

    validate: () => {
        if(arrayCookies.length != configCookies.length){
            manage.deleteCookie(Config.Cookies.preferences.name)
        }
    },

    set: (key) => {
        if (key == false) {
            manage.deleteCookie(Config.Cookies.preferences.name)
        } else {
            manage.setCookie(Config.Cookies.preferences.name, key, Config.Cookies.preferences.expire);
        }
    },

}


//-------------------------------------------------------
// Create Form elements
//-------------------------------------------------------



// const blockScript = (target, extraTag = false) => {
//     let elemento = document.getElementById(target)
//     if(elemento) {
//         elemento.setAttribute('type', javascriptBlocked)
//         if (extraTag === true) {
//             let extraScript = target + '_script'
//             document.getElementById(extraScript).setAttribute('type', javascriptBlocked)
//         }
//     }
// }

// const unblockScript = (target, extraTag = false) => {
//     let elemento = document.getElementById(target)
//     if(elemento) {
//         elemento.setAttribute('type', appJavascript)
//         if (extraTag === true) {
//             let extraScript = target + '_script'
//             document.getElementById(extraScript).setAttribute('type', appJavascript)
//         }
//     }
// }


//
//-------------------------------------------------------
// Render Elements
//-------------------------------------------------------
render = {
        
    TitleCase: (str) => {
        return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
        );
    },
  
    IconBack : (node) => {
    let iconSvg = document.createElementNS(w3orgSvg, 'svg');
    iconSvg.setAttribute('viewBox', '0 0 448 512');
    iconSvg.setAttribute('xmlns', w3orgSvg);
    let iconPath = document.createElementNS(
        w3orgSvg,
        'path'
      );
    iconPath.setAttribute(
        'd',
        'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'
      );
      iconSvg.appendChild(iconPath);
      return node.appendChild(iconSvg);
    },
    IconClose: (node) => {
        const iconSvg = document.createElementNS(w3orgSvg, 'svg');
        iconSvg.setAttribute('xmlns', w3orgSvg);
        iconSvg.setAttribute('width', '24');
        iconSvg.setAttribute('heigth', '24');
        iconSvg.setAttribute('fill', 'none');
        iconSvg.setAttribute('viewBox', '0 0 24 24');
        iconSvg.setAttribute('stroke', '#273240');
        iconSvg.classList.add('post-icon');
    
        const iconG = document.createElementNS(w3orgSvg, 'g');
        iconG.setAttribute('opacity', '0.5')
        iconSvg.appendChild(iconG);
        
        const iconPath = document.createElementNS(
          w3orgSvg,
          'path'
        );
        const iconPath2 = document.createElementNS(
          w3orgSvg,
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
    },
    CookieSettingsElements: () => {
    
        let div_cookie_wrapper = create.Element('div', { class: 'cookie_wrapper' })
        document.body.after(div_cookie_wrapper)
            // 
            let div_cookie = create.Element('div', { class: 'cookie' })
            div_cookie_wrapper.appendChild(div_cookie)
                // 
                // div close
                let div_close = create.Element('div', { class: 'close' })
                    div_cookie.appendChild(div_close)
                    
                    render.IconClose(div_close)
                // 
                // div front
                // div_front = create.Element('div', { class: 'front' })
                //     div_cookie.appendChild(div_front)
                //     front_h1 = document.createElement('h1')
                //         front_h1.innerHTML = 'Privacy Preference Center'
                //         div_front.appendChild(front_h1)
                //     front_p = document.createElement('p')
                //         front_p.innerHTML = 'When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to our <a href="https://kessgame.com/privacy.html" id="privacy">Privacy Policy</a>.'
                //         div_front.appendChild(front_p)
                //     div_front_buttons = create.Element('div', { class: 'front__buttons' })
                //         div_front.appendChild(div_front_buttons)
                //         // buttons
                //         button_allow_front_buttons = create.Element('button', { 
                //             class: 'front__buttons', 
                //             type: 'submit', 
                //             id: 'allowCookies'
                //         })
                //         button_allow_front_buttons.innerHTML = 'Allow All'
                //         div_front_buttons.appendChild(button_allow_front_buttons)
        
                //     //     button_decline_front_buttons = create.Element('button', { 
                //     //         class: 'front__buttons', 
                //     //         type: 'submit', 
                //     //         id: 'declineCookies'
                //     //     })
                //     //     button_decline_front_buttons.innerHTML = 'Decline unnecessary cookies'
                //     //     div_front_buttons.appendChild(button_decline_front_buttons)
                //     // // front footer
                //     // div_front_footer = create.Element('div', { class: 'front__footer' })
                //     // div_front.appendChild(div_front_footer)
                //         a_more_cookie = create.Element('a', { id: 'more_cookie', href: '#' })
                //         a_more_cookie.innerHTML = 'Manage Consent Preferences'
                //         div_front_buttons.appendChild(a_more_cookie)
                //
                // div back
                div_back = create.Element('div', { class: 'back' })
                div_cookie.appendChild(div_back)
                    div_header_cookies = create.Element('div', { class: 'header-cookies' })
                    div_back.appendChild(div_header_cookies)
                        div_back_icons = create.Element('div', { class: 'back_icons' })
                        div_header_cookies.appendChild(div_back_icons)
                            // div_back_icon = create.Element('div', { class: 'back_icon' })
                            // div_back_icons.appendChild(div_back_icon)
                            //     render.IconBack(div_back_icon)
                        //
                        div_back_title = create.Element('h1', { class: '' })
                        div_back_title.innerHTML = 'Manage Consent Preferences'
                        div_header_cookies.appendChild(div_back_title)
                    //
                    // generating form
                    let cookie_options = create.Element('form', { class: 'cookie_options' })
                        div_back.appendChild(cookie_options)
                        // generating UL
                        let cookie_options_tab = create.Element('ul', { class: 'tab' })
                        cookie_options.prepend(cookie_options_tab)
                            // necessary cookies
                            let cookie_li = document.createElement('li')
                            cookie_options_tab.appendChild(cookie_li)
                                let iconPlus = create.Element('i', { class: 'fas fa-plus' })
                                cookie_li.appendChild(iconPlus)
                                let h2_li = document.createElement('h2')
                                h2_li.innerHTML = 'Strictly Necessary Cookies'
                                cookie_li.appendChild(h2_li)
                                let span_badge = create.Element('span', { class: 'baged success' })
                                span_badge.innerHTML = 'Always Active'
                                cookie_li.appendChild(span_badge)
                            let cookie_li_data = create.Element('div', { class: 'data2' })
                            cookie_options_tab.appendChild(cookie_li_data)
                                let cookie_li_data_p = document.createElement('p')
                                cookie_li_data_p.innerHTML = 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.'
                                cookie_li_data.appendChild(cookie_li_data_p)
                        //
                        // cria os elementos baseados no consent config object
                        for (let i = 0; i < configCookies.length; i++){
                            let cookie_name = configCookies[i][0]
                            let description_cookie = configCookies[i][1].description
                            let title = cookie_name == 'giveaway' ? 'Third-Party Cookies' : cookie_name + ' Cookies'
                            let cookie_li = document.createElement('li')
                            cookie_options_tab.appendChild(cookie_li)
                                let iconPlus = create.Element('i', { class: 'fas fa-plus' })
                                cookie_li.appendChild(iconPlus)
                                let h2_li = document.createElement('h2')
                                // title
                                h2_li.innerHTML = render.TitleCase(title)
                                cookie_li.appendChild(h2_li)
                                let label_checkbox = create.Element('label', { class: 'custom_checkbox' })
                                cookie_li.appendChild(label_checkbox)
                                let input_checkbox = create.Element('input', { 
                                    type: 'checkbox',
                                    'data-function': cookie_name,
                                    id: 'chk_' + cookie_name
                                })
                                label_checkbox.appendChild(input_checkbox)
                                let span_toogle = create.Element('span', {class: 'toogle'})
                                label_checkbox.appendChild(span_toogle)
                    
                            let cookie_li_data = create.Element('div', { class: 'data2' })
                            cookie_options_tab.appendChild(cookie_li_data)
                                let cookie_li_data_p = document.createElement('p')
                                    // description
                                    cookie_li_data_p.innerHTML = description_cookie
                                    cookie_li_data.appendChild(cookie_li_data_p)
                        }
                        //
                        let back_footer = create.Element('div', { class: 'back_footer'})
                            cookie_options.appendChild(back_footer)
                            let confirm_cookies = create.Element('input', { 
                                id: 'confirmCookies', 
                                type: 'submit', 
                                value: 'Confirm my choices'
                            })
                            back_footer.appendChild(confirm_cookies)
        
            //
            // Generating COokie Floater Button 
            let floater = create.Element('div', { class: 'cookie_floater' })
                div_cookie_wrapper.after(floater)
                let cookie_img = create.Element('img', { alt: 'Cookie Privacy Settings', src: 'assets/img/cookie_1f36a.png' })
                    floater.appendChild(cookie_img)      
                    let span_settings = document.createElement('span') 
                        span_settings.innerHTML = 'Privacy Settings'
                        floater.appendChild(span_settings)      
                  
            //
            // Generating Consent Bar
            let consent_bar = create.Element('div', { 
                id: 'cconsent-bar',
                class: 'collapse',
                role: 'region',
                'aria-label': 'Cookie consent',
                'aria-hidden': false,
                tabindex: 0
            })
            floater.after(consent_bar)
                let cc_wrapper = create.Element('div', { class: 'ccb__wrapper'})
                    consent_bar.appendChild(cc_wrapper)
                    let cc_left = create.Element('div', { class: 'ccb__left'})
                        cc_wrapper.appendChild(cc_left)
                        let cc_text = create.Element('div', { class: 'cc-text'})
                            cc_text.innerHTML = 'This website uses cookies to ensure you get the best experience on our website.'
                            cc_left.appendChild(cc_text)
                    //
                    let cc_right = create.Element('div', { class: 'ccb__right'})
                        cc_wrapper.appendChild(cc_right)
                        let cc_button = create.Element('div', { class: 'ccb__button'})
                            cc_right.appendChild(cc_button)
        
                            let buttonEdit = create.Element('button', {
                                class: 'ccb__edit',
                                type: 'submit',
                            })
                            buttonEdit.innerHTML = 'Privacy Settings'
                            cc_button.appendChild(buttonEdit)
                            
                            let buttonConsent = create.Element('button', {
                                class: 'consent__give',
                                type: 'submit',
                            })
                            buttonConsent.innerHTML = 'Accept all cookies'
                            cc_button.appendChild(buttonConsent)
    }
        
}


//-------------------------------------------------------
// Generating DOM Elements
//-------------------------------------------------------



Cookie = {
    
    

    
    init: () => { 
        render.CookieSettingsElements() 
        //-------------------------------------------------------
        // Objects
        //-------------------------------------------------------
        const close = document.querySelector(".close");
        const cookieWrapper = document.querySelector(".cookie_wrapper");
        const front = document.querySelector(".front");
        const back = document.querySelector(".back");
        const more = document.querySelector("#more_cookie");
        const backicon = document.querySelector(".back_icon");
        const cookieFloater = document.querySelector(".cookie_floater");
        const allowCookies = document.querySelector('#allowCookies');
        // const declineCookies = document.querySelector('#declineCookies');
        const confirmCookies = document.querySelector('#confirmCookies');
        const cookieSettings = document.querySelector(".ccb__edit")
        const consentGive = document.querySelector(".consent__give")
        const cookieConsentBar = document.querySelector("#cconsent-bar")
                
        close.addEventListener("click", function () {
            if (!manage.getCookie(Config.name)){
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

        // more.addEventListener("click", () => {
        //     cookieMorePreferences()
        // });

        // backicon.addEventListener("click", () => {
        // cookiePreferences()
        // });


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
        // Visual Actions
        //-------------------------------------------------------
        
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
            back.style.display = "flex";
            // front.style.display = "flex";
        }
        cookieMorePreferences = () => {
            // front.style.display = "none";
            consentBarHide()
            back.style.display = "flex";
        }

        Consent.validate()
        Cookie.checkConfig()

        //-------------------------------------------------------
        // Event Listeners
        //-------------------------------------------------------
        const allPrefs = getAllPref()

        cookieSettings.addEventListener("click", () => {
            cookieWrapper.style.display = "flex";
            consentBarHide()
        })

        confirmCookies.addEventListener("click", ()=> {
            const pref = getFormPref();
            Cookie.bake(pref, setCookie, true)
            floaterVisible()
        });

        consentGive.addEventListener("click", () => {
            Cookie.bake(allPrefs, setCookie)
            consentBarHide()
            floaterVisible()
        })

        // allowCookies.addEventListener("click", ()=> {
        //     Cookie.bake(allPrefs, setCookie)
        //     floaterVisible()

        // });

        // declineCookies.addEventListener("click", ()=> {
        //     Cookie.bake(allPrefs, deleteCookie)
        //     floaterVisible()
        // });


        if (localCookies) {
            if (localCookies.value === false) {
                consentBarShow()
            } else {
                floaterVisible()
            }
        } else {
            consentBarShow()
        }
    },
    

    // verifica o local storage e assinala as atribuiçoes de configurações
    checkConfig: () => {
        // procura configurações na maquina local
        // ou melhor rodar um foreach nas configurações locais do cookie e verificar
        // quais wanted = true pra cada um setar o checkbox pra true pegando o elemento
        // pelo id ex: document.getElementById('giveaway').checked = true
        // pra diferenciar setar os ids como check_'nome'
        // pegar o consent e gerar o form de opções
        // debugger
        if (!manage.getLocalStorage(defaultConsentName)){
            // console.log('cookie consent nao existe') entao cria o script por padrao
            // default setup when user not accepted or declined
            // consentBarShow()
            // TODO.. this is default... should we show all?
            if (configCookies){
                // for( let i = 0; i < configCookies.length; i++){
                // }
                // all inputs checked by default when user not consented yet
                
                for (let i = 0; i < configCookies.length; i++) {
                    let key = configCookies[i][0]
                    let wanted = Config.Cookies.template[key].wanted === undefined ? Config.settings.defaultConsent : Config.Cookies.template[key].wanted
                    let input = document.getElementById('chk_' + key)
                    if(input) { 
                        input.checked = wanted
                    }
                    if (wanted === true) {
                        create.Script(configCookies[i])
                    }
                }
            }

        } else {
            // consent existe entao verifica a validação do consent 
            if (manage.getLocalStorage(defaultConsentName) === 'declined'){
                // when user declined for our cookies we need block the null scripts and not load others
                // cada script false or script null devem ser bloqueados
                // floaterHide()
                // cookieWrapper.style.display = "none";
                // consentBarShow()
                // TODO .. aqui deve-se procurar as google tags e remover
                // talvez utilizar uma blacklist pra procurar e remover todos da lista
                for ( i=0; i< configCookies.length; i++ ) {
                    // Consent.clearCookies()
                    for (const [key, value] of configCookies) {
                        // aqui eu percorro um for pelas configurações setadas da ultima vez
                        // console.log(`${key}: ${value}`);
                        // user declined then false by default
                        let wanted = false
                        // let wanted = Config.Cookies.template[key].wanted === undefined ? Config.Default.consent : Config.Cookies.template[key].wanted
                        let input = document.getElementById('chk_' + key)
                        if (input){
                            input.checked = wanted == true ? wanted : false
                        }
                    }
                    // let cookie = configCookies[i][0]
                    // let cookieInfo = configCookies[i][1]
                    // if (cookieInfo.script != true){
                    //     let tagSetup = cookieInfo.scriptTag === true ? true : false
                    //     debugger
                    //     blockScript(cookie, tagSetup)
                    // }
                }
            }else {
                // consent = true , consent já configurado entao deve-se verificar quais as configurações atraves do atributo wanted
                Consent.checkBannedList()
                for (let i = 0; i < arrayCookies.length; i++) {
                    let key = arrayCookies[i][0]
                    let wanted = localCookies.cookies[key].wanted === undefined ? Config.Default.consent : localCookies.cookies[key].wanted
                    let input = document.getElementById('chk_' + key)
                    if(input) { 
                        input.checked = wanted
                    }
                    if (wanted === true) {
                        create.Script(configCookies[i])
                    }
                }
            }
            // floaterVisible()
            // seta os inputs baseado nas configurações do cookie salvas
            // for (const [key, value] of arrayCookies) {
            //     // aqui eu percorro um for pelas configurações setadas da ultima vez
            //     // console.log(`${key}: ${value}`);
            //     let wanted = localCookies.cookies[key].wanted
            //     let input = document.getElementById('chk_' + key)
            //     // debugger
            //     if (input){
            //         input.checked = wanted == true ? wanted : false
            //     }
            // }
            
        }
        // return cookie
    },

    getAll: () => document.cookie.split(';').reduce((ac, str) => Object.assign(ac, {[str.split('=')[0].trim()]: str.split('=')[1]}), {}),
    
    list: () => {
        var theCookies = document.cookie.split(';');
        var aString = '';
        for (var i = 1 ; i <= theCookies.length; i++) {
            aString += i + ' ' + theCookies[i-1] + "\n";
        }
        return aString;
    },
        
    bake: (preferences, action = 'setCookie', form = false) => {
        // prepareCookies tem por padrao a ação de inserir 'setCookie' ex: manage.getCookie('_ga') and delete him
        setAllConsent = (value) => {
            for (i=0; i < configCookies.length; i++){
                let n = configCookies[i][0]
                let content = configCookies[i][1]
                Config.consent.cookies[n] = {}
                Config.consent.cookies[n].wanted = value
                Config.consent.cookies[n].script = content.script
            }
        }
        // 
        setConsentByForm = (preferences) => {
            // reset all preferences to false
            setAllConsent(false)
            // set all preferences selected by user
            for (i=0; i < preferences.length; i++){
                let n = preferences[i]
                Config.consent.cookies[n].wanted = true
            }
        }
        if (action === 'setCookie') {
            if (preferences.length === 0){
                // user declined consent
                // TODO.. need detect and exclude _ga and _gi if exist to complete the remotion of analytics cookies
                
                setAllConsent(false)
                // Config.consent.value = false
                manage.setLocalStorage(defaultConsentName, 'declined')
                // if(manage.getLocalStorage(defaultConsentName)){
                //     manage.deleteLocalStorage(defaultConsentName)
                // }
                // Consent.set(JSON.stringify(Config.consent))
                Consent.clearCookies()
                setTimeout(() => {
                    window.location.reload()
                }, "1000") 
                return false
            }
            if(form === true) {
                for (let i = 0; i < preferences.length; i++){
                    setConsentByForm(preferences)
                    manage.setLocalStorage(defaultConsentName, 'accepted')
                    Consent.set(JSON.stringify(Config.consent))
                }
                setTimeout(() => {
                    window.location.reload()
                }, "1000") 
            } else if (preferences.length === configCookies.length) {
                setAllConsent(true)
                manage.setLocalStorage(defaultConsentName, 'accepted')
                Consent.set(JSON.stringify(Config.consent))
                setTimeout(() => {
                    window.location.reload()
                }, "1000") 
            }
        } else if (action === 'deleteCookie') {
            Consent.clearCookies()
            setAllConsent(false)
            Config.consent.value = false
            Consent.set(JSON.stringify(Config.consent))
            manage.setLocalStorage(defaultConsentName, 'declined')
            setTimeout(() => {
                window.location.reload()
            }, "1000") 
        }
    }

}    



//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
// Starting
Cookie.checkConfig()

//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------


getFormPref = () => {
    return [...document.querySelectorAll('[data-function]')].filter((el) => el.checked).map((el) => el.getAttribute('data-function'));
}
getAllPref = () => {
    return [...document.querySelectorAll('[data-function]')].filter((el) => el).map((el) => el.getAttribute('data-function'));
}

//-------------------------------------------------------
// Cookie Preparation
//-------------------------------------------------------
