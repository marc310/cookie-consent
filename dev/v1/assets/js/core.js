
/* ************************************************************
:: Project Name: Cookie Consent Script
:: Project Author Name: Marcelo Motta
:: Project Author URI: https://marcelomotta.com
:: Project URI: https://github.com/marc310/cookie-consent
:: Version: 1.0.0
:: Created: 22 Set 2022
************************************************************ */
Default = {
    name: 'Cookie Consent',
    url: 'https://marcelomotta.com',
    description: 'Cookie notice bars are not enough!',
    terms: 'terms.html',
    privacy: 'privacy.html',
    expire: 15
} 

Cookies = {
    preferences: {
        name: 'Kess',
        website: 'https://kessgame.com/'
    },
    template: {
        analytics: {
            src: 'https://www.googletagmanager.com/gtag/js?id=UA-145014090-1',
            description: 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            script: true, // script null means the script not will be loaded, and the code will search on DOM by the cookie name
            // scriptTag: true,
        },
        statcounter: {
            src: 'https://statcounter.com/counter/counter.js',
            description: 'tracking cookies test with statcounter',
            script: true,
        },
        marketing: {
            src: "https://platform-api.sharethis.com/js/sharethis.js#property=63117cee0b5e930012a9c414&product=sop",
            description: 'These cookies allow us or our Marketing Share-This provider to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            script: true, // true means the script will be created in the DOM and loaded on header
        },
        giveaway: {
            src: "https://widget.gleamjs.io/e.js",
            description: 'These cookies allow us or our third-party giveaway providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            script: false, // that means the script will be loaded on target to call this target should use the id on element named with sufix cookie.name + '_script' ex: giveaway_script
        }
    }
}

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

date = {
    Time: () => {
        let data = new Date()
        return data.getTime()
    },
    
    Now: () => {
        let data = new Date()
        return dataFormatada = (data.getFullYear() + "/" + ((data.getMonth() + 1)) + "/" + (data.getDate() ))
    }
}



//-------------------------------------------------------
// Basic Cookies Script Setup
//-------------------------------------------------------
const Config = {
    name : Cookies.preferences.name ? Cookies.preferences.name : Default.name,
    description: Cookies.preferences.description ? Cookies.preferences.description : Default.description,
    url: Cookies.preferences.website ? Cookies.preferences.website : Default.url,
    privacyPage: Cookies.preferences.privacyPage ? Cookies.preferences.privacyPage : Default.privacy,
    termsPage: Cookies.preferences.termsPage ? Cookies.preferences.termsPage : Default.terms,
    expire: Cookies.preferences.expire ? Cookies.preferences.expire : Default.expire,
    version: '1.0.0'
}

//-------------------------------------------------------
// Consent Setup
//-------------------------------------------------------
const consent = {
    value: true,
    timestamp: date.Time(),
    cookies : {
        // analytics: {
        //     description: 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
        //     wanted: null,
        //     script: null 
        //     // script null means the script not will be loaded, and the code will search on DOM by the cookie name
        // },
        // marketing: {
        //     src: "https://example.com/js/example.js",
        //     description: 'These cookies allow us or our Marketing Share-This provider to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
        //     wanted: null,
        //     script: true 
        //     // true means the script will be created in the DOM and loaded on header
        // },
        // performance: {
        //     src: "https://example.com/js/ex.js",
        //     description: 'These cookies allow us or our third-party giveaway providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
        //     wanted: null,
        //     script: false 
        //     // that means the script will be loaded on target to call this target should use the id on element named with sufix cookie.name + '_script' ex: giveaway_script
        // }
    }
}


//-------------------------------------------------------
// Cookies Array Storage
//-------------------------------------------------------
const arrConsentCookies = Object.keys(consent.cookies)
const arrayCookies = CookieManage.getCookie('Kess') ? Object.entries(JSON.parse(CookieManage.getCookie('Kess')).cookies) : 'not consented yet'
const configCookies = Object.entries(Cookies.template)
const localCookies = JSON.parse(CookieManage.getCookie('Kess'))

const w3orgSvg = 'http://www.w3.org/2000/svg'
const javascriptBlocked = 'text/plain'
const appJavascript = 'application/javascript'
const setCookie = 'setCookie'
const deleteCookie = 'deleteCookie'
const comma = ','
const space = ' '


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
  
const blockScript = (target, extraTag = false) => {
    let elemento = document.getElementById(target)
    if(elemento) {
        elemento.setAttribute('type', javascriptBlocked)
        if (extraTag === true) {
            let extraScript = target + '_script'
            document.getElementById(extraScript).setAttribute('type', javascriptBlocked)
        }
    }
}

const unblockScript = (target, extraTag = false) => {
    let elemento = document.getElementById(target)
    if(elemento) {
        elemento.setAttribute('type', appJavascript)
        if (extraTag === true) {
            let extraScript = target + '_script'
            document.getElementById(extraScript).setAttribute('type', appJavascript)
        }
    }
}


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
                 create.HeadScript(appJavascript, Cookies.template[tag].src)
            } else if (script === false) {
                // precisa passar um target
                 create.TargetScript(appJavascript, Cookies.template[tag].src, tag)
            } 
            if (script === null) {
                // null scripts wanted true = application/javascript
                unblockScript(tag, true)
            }
        } else if (wanted === false && script === null) {
            let extraTag = Cookies.template[tag].scriptTag === true ? true : false
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

        
    tagManager: (id) => {
        func = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer', " + id + ");"
        let script = create.Element('script', {
            type: appJavascript,
            // src: url
        })
        script.innerHTML = func
        document.head.appendChild(script);
    }
    

}
//
//-------------------------------------------------------
// Starting App
//-------------------------------------------------------
// 
// include dependency https://unpkg.com/yett
// A small webpage library to control the execution of (third party - analytics for example) scripts
create.HeadScript(appJavascript, 'https://unpkg.com/yett')

//
//-------------------------------------------------------
// Render Elements
//-------------------------------------------------------
render = {
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
                div_front = create.Element('div', { class: 'front' })
                    div_cookie.appendChild(div_front)
                    front_h1 = document.createElement('h1')
                        front_h1.innerHTML = 'Privacy Preference Center'
                        div_front.appendChild(front_h1)
                    front_p = document.createElement('p')
                        front_p.innerHTML = 'When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to our <a href="https://kessgame.com/privacy.html" id="privacy">Privacy Policy</a>.'
                        div_front.appendChild(front_p)
                    div_front_buttons = create.Element('div', { class: 'front__buttons' })
                        div_front.appendChild(div_front_buttons)
                        // buttons
                        button_allow_front_buttons = create.Element('button', { 
                            class: 'front__buttons', 
                            type: 'submit', 
                            id: 'allowCookies'
                        })
                        button_allow_front_buttons.innerHTML = 'Allow All'
                        div_front_buttons.appendChild(button_allow_front_buttons)
        
                        button_decline_front_buttons = create.Element('button', { 
                            class: 'front__buttons', 
                            type: 'submit', 
                            id: 'declineCookies'
                        })
                        button_decline_front_buttons.innerHTML = 'Decline unnecessary cookies'
                        div_front_buttons.appendChild(button_decline_front_buttons)
                    // front footer
                    div_front_footer = create.Element('div', { class: 'front__footer' })
                    div_front.appendChild(div_front_footer)
                        a_more_cookie = create.Element('a', { id: 'more_cookie', href: '#' })
                        a_more_cookie.innerHTML = 'Manage Consent Preferences'
                        div_front_footer.appendChild(a_more_cookie)
                //
                // div back
                div_back = create.Element('div', { class: 'back' })
                div_cookie.appendChild(div_back)
                    div_header_cookies = create.Element('div', { class: 'header-cookies' })
                    div_back.appendChild(div_header_cookies)
                        div_back_icons = create.Element('div', { class: 'back_icons' })
                        div_header_cookies.appendChild(div_back_icons)
                            div_back_icon = create.Element('div', { class: 'back_icon' })
                            div_back_icons.appendChild(div_back_icon)
                                render.IconBack(div_back_icon)
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
                                h2_li.innerHTML = TitleCase(title)
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
    
    validate: () => {
        if(arrayCookies.length != configCookies.length){
            CookieManage.deleteCookie(Cookies.preferences.name)
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
        if (!CookieManage.getCookie(Config.name)){
            // console.log('cookie consent nao existe') entao cria o script por padrao
            // default setup when user not accepted or declined
            // consentBarShow()
            if (configCookies){
                for( let i = 0; i < configCookies.length; i++){
                    create.Script(configCookies[i])
                }
            }
            // all inputs checked by default when user not consented yet
            for (let i = 0; i < configCookies.length; i++) {
                let input = document.getElementById('chk_' + configCookies[i][0])
                if(input) { input.checked = true }
            }

        } else {
            // consent existe entao verifica a validação do consent 
            // floaterVisible()
            // seta os inputs baseado nas configurações do cookie salvas
            for (const [key, value] of arrayCookies) {
                // aqui eu percorro um for pelas configurações setadas da ultima vez
                // console.log(`${key}: ${value}`);
                let wanted = localCookies.cookies[key].wanted
                let input = document.getElementById('chk_' + key)
                // debugger
                if (input){
                    input.checked = wanted == true ? wanted : false
                }
            }
            if (localCookies.value == false){
                // when user declined for our cookies we need block the null scripts and not load others
                // cada script false or script null devem ser bloqueados
                // floaterHide()
                // cookieWrapper.style.display = "none";
                // consentBarShow()
                // TODO .. aqui deve-se procurar as google tags e remover
                // talvez utilizar uma blacklist pra procurar e remover todos da lista
                for ( i=0; i< configCookies.length; i++ ) {
                    let cookie = configCookies[i][0]
                    let cookieInfo = configCookies[i][1]
                    if (cookieInfo.script != true){
                        let tagSetup = cookieInfo.scriptTag === true ? true : false
                        blockScript(cookie, tagSetup)
                    }
                }
            }else {
                // consent = true , consent já configurado entao deve-se verificar quais as configurações atraves do atributo wanted
                for ( i=0 ; i < arrayCookies.length ; i++){
                    create.Script(arrayCookies[i])
                }
            }
        }
        // return cookie
    },

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
        const declineCookies = document.querySelector('#declineCookies');
        const confirmCookies = document.querySelector('#confirmCookies');
        const cookieSettings = document.querySelector(".ccb__edit")
        const consentGive = document.querySelector(".consent__give")
        const cookieConsentBar = document.querySelector("#cconsent-bar")
                
        close.addEventListener("click", function () {
            if (!CookieManage.getCookie(Config.name)){
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
            back.style.display = "none";
            front.style.display = "flex";
        }
        cookieMorePreferences = () => {
            front.style.display = "none";
            back.style.display = "flex";
        }

        Cookie.validate()
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

        allowCookies.addEventListener("click", ()=> {
            Cookie.bake(allPrefs, setCookie)
            floaterVisible()

        });

        declineCookies.addEventListener("click", ()=> {
            Cookie.bake(allPrefs, deleteCookie)
            floaterVisible()
        });


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
    
    setConsent: (key) => {
        if (key == false) {
            CookieManage.deleteCookie(Config.name)
        } else {
            CookieManage.setCookie(Config.name, key, Config.expire);
        }
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
        // prepareCookies tem por padrao a ação de inserir 'setCookie' ex: CookieManage.getCookie('_ga') and delete him
        setAllConsent = (value) => {
            for (i=0; i < configCookies.length; i++){
                let n = configCookies[i][0]
                let content = configCookies[i][1]
                consent.cookies[n] = {}
                consent.cookies[n].wanted = value
                consent.cookies[n].script = content.script
            }
        }
        // 
        setConsentByForm = (preferences) => {
            // reset all preferences to false
            setAllConsent(false)
            // set all preferences selected by user
            for (i=0; i < preferences.length; i++){
                let n = preferences[i]
                consent.cookies[n].wanted = true
            }
        }
        if (action === 'setCookie') {
            if (preferences.length === 0){
                // TODO.. need detect and exclude _ga and _gi if exist to complete the remotion of analytics cookies
                setAllConsent(false)
                consent.value = false
                Cookie.setConsent(JSON.stringify(consent))
                setTimeout(() => {
                    window.location.reload()
                }, "1000") 
                return false
            }
            if(form === true) {
                for (let i = 0; i < preferences.length; i++){
                    setConsentByForm(preferences)
                    Cookie.setConsent(JSON.stringify(consent))
                }
                setTimeout(() => {
                    window.location.reload()
                }, "1000") 
            } else if (preferences.length === configCookies.length) {
                setAllConsent(true)
                Cookie.setConsent(JSON.stringify(consent))
                setTimeout(() => {
                    window.location.reload()
                }, "1000") 
            }
        } else if (action === 'deleteCookie') {
            setAllConsent(false)
            consent.value = false
            Cookie.setConsent(JSON.stringify(consent))
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
