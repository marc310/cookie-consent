
/* 
************************************************************
:: Project Name: Cookie Consent Script
:: Project Author Name: Marcelo Motta
:: Project Author URI: https://marcelomotta.com
:: Project URI: https://github.com/marc310/cookie-consent
:: Version: 1.2.4
:: Created: 22 Set 2022
************************************************************ 
*/

//-------------------------------------------------------
// Cookie Consent Class
class Cookie {

    //-------------------------------------------------------
    constructor(){

        this.init()

    }    
    // constructor end
    //-------------------------------------------------------
    //-------------------------------------------------------
        
    
    //-------------------------------------------------------
    //-------------------------------------------------------
    // Create Elements
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
            let tag = key.label
            let cookieInfo = key.content != null ? key.content : ()=>{ 
                console.log('Content setup not exist') 
                return false 
            };
            let wanted = cookieInfo.wanted === undefined ? true : cookieInfo.wanted
            let script = key.script
            if(wanted) {
                // todos os wanted devem dar load no script
                // verifica o script true para gerar no header, false para gerar num target, entao é pedido um novo parametro node* , e null para nao carregar nenhum script, retorna falso
                let ConfigPath = key
                let scriptType = (script === undefined || script.toLowerCase() === 'head') ? false : script.toLowerCase()
                switch (scriptType) {
                    case "head" :
                        this.create.HeadScript(this.appJavascript, cookieInfo.src)
                        break;
                    case "custom" :
                        let target = cookieInfo.target === undefined ? tag + '_script' : cookieInfo.target
                        let btn = cookieInfo.content === undefined ? false : cookieInfo.content
                        this.create.TargetScript(this.appJavascript, cookieInfo.src, target, btn)
                        break;
                    case "analytics" :
                        this.create.Analytics(cookieInfo.ga_code)
                        break;
                    case "facebook" :
                        this.create.Facebook(cookieInfo.fb_code)
                        break;
                    case "hotjar" :
                        this.create.Hotjar(cookieInfo.hj_code)
                        break;
                    case "statcounter" :
                        let project = cookieInfo.sc_project
                        let security = cookieInfo.sc_security
                        let invisible = cookieInfo.sc_invisible
                        let text = cookieInfo.sc_text
                        this.create.Statcounter(project, security, invisible, text)
                        break;
                    default :
                        this.create.HeadScript(this.appJavascript, cookieInfo.src)
                        break;
                }
                
                // if (script === 'head') {
                //     this.create.HeadScript(this.appJavascript, Config.Cookies.template[tag].src)
                // } else if (script === false) {
                //     // precisa passar um target
                //     let target = Config.Cookies.template[tag].target === undefined ? tag + '_script' : Config.Cookies.template[tag].target
                //     let btn = Config.Cookies.template[tag].button === undefined ? false : Config.Cookies.template[tag].button
                //     this.create.TargetScript(this.appJavascript, Config.Cookies.template[tag].src, target, btn)
                // } 
                // if (script != 'custom' || script != 'head') {
                //     // null scripts wanted true = application/javascript
                //     let ConfigPath = Config.Cookies.template[tag]
                //     //
                //     // lets decide what kind of script should be generated
                //     // TODO... refatorar esse trecho pra um for rodando em um array contendo o tipo e o codigo pra chamar a função especifica
                //     let scriptType = ConfigPath.script.toLowerCase()
                //     console.log(scriptType)
                    
                //     switch (scriptType) {
                //         case "analytics" :
                //             this.create.Analytics(ConfigPath.ga_code)
                //             break;
                //         case "facebook" :
                //             this.create.Facebook(ConfigPath.fb_code)
                //             break;
                //         case "hotjar" :
                //             this.create.Hotjar(ConfigPath.hj_code)
                //             break;
                //         case "statcounter" :
                //             let project = ConfigPath.sc_project
                //             let security = ConfigPath.sc_security
                //             let invisible = ConfigPath.sc_invisible
                //             let text = ConfigPath.sc_text
                //             this.create.Statcounter(project, security, invisible, text)
                //             break;
                //     }

                //     // debugger

                //     // if(ConfigPath.ga_code){
                //     //     this.create.Analytics(ConfigPath.ga_code)
                //     // } else if (ConfigPath.fb_code) {
                //     //     this.create.Facebook(ConfigPath.fb_code)
                //     // } else if (ConfigPath.hj_code) {
                //     //     this.create.Hotjar(ConfigPath.hj_code)
                //     // }
                //     // else if (ConfigPath.sc_project) {
                //     //     let project = ConfigPath.sc_project
                //     //     let security = ConfigPath.sc_security
                //     //     let invisible = ConfigPath.sc_invisible
                //     //     let text = ConfigPath.sc_text
                //     //     this.create.Statcounter(project, security, invisible, text)
                //     // }
                //     // else {
                //     //     unblockScript(tag, true)
                //     // }
                // }
            } 
            // else if (wanted === false && script === null) {
            //     let extraTag = Config.Cookies.template[tag].scriptTag === true ? true : false
            //     blockScript(tag, extraTag)
            // }
        },
        
        HeadScript: (type, url) => {
            let script = this.create.Element('script', {
                type: type,
                src: url
            })
            document.head.appendChild(script);
        },

        CSS: (url) => {
            let script = this.create.Element('link', {
                rel: 'stylesheet',
                href: url
            })
            document.head.appendChild(script);
        },

        FstScript: (type, url) => {
            let script = this.create.Element('script', {
                type: type,
                src: url
            })
            document.head.prepend(script);
        },
        
        TargetScript: (type, url, target, button = false) => {
            let targetLink = '#' + target
            let btn = button === false ? 'empty' : button
            const div = document.querySelector(targetLink);
            if (div){
                let script = this.create.Element('script', {
                    type: type,
                    src: url,
                    async : true,
                })
                div.innerHTML = btn;
                div.appendChild(script);
            } else {
                return false
            }
        },
            
        Analytics: (ga_code) => {
            let Analytics = document.createElement('script');
            Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${ga_code}`);
            document.head.appendChild(Analytics);
            let AnalyticsData = document.createElement('script');
            AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${ga_code}');`;
            document.head.appendChild(AnalyticsData);
        },

        Hotjar: (hj_code) => {
            let Hotjar = document.createElement('script');
            Hotjar.text = `
                            (function(h,o,t,j,a,r){
                            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                            h._hjSettings={hjid:${hj_code},hjsv:6};
                            a=o.getElementsByTagName('head')[0];
                            r=o.createElement('script');r.async=1;
                            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                            a.appendChild(r);
                            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                            `;
            document.head.appendChild(Hotjar);
        },

        Facebook: (fb_code)=> {
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
                                    fbq('init', '${fb_code}');
                                    fbq('track', 'PageView');
                                    `;
            document.head.appendChild(FacebookPixelData);
            let FacebookPixel = document.createElement('noscript');
            FacebookPixel.setAttribute('height', `1`);
            FacebookPixel.setAttribute('width', `1`);
            FacebookPixel.setAttribute('style', `display:none`);
            FacebookPixel.setAttribute('src', `https://www.facebook.com/tr?id=${fb_code}&ev=PageView&noscript=1`);
            document.head.appendChild(FacebookPixel);
        },
        
        Statcounter: (sc_project, sc_security, sc_invisible = false, sc_text = false)=> {
            
            var var_invisible = sc_invisible === false ? 0 : sc_invisible; 
            var var_text = sc_text === false ? 2 : sc_text; 
            
            let StatcounterVar = document.createElement('script');
                StatcounterVar.text = `
                                var sc_project = ${sc_project}; 
                                var sc_security = "${sc_security}"; 
                                var sc_invisible = ${var_invisible}; 
                                var sc_text = ${var_text}; 
                                `;
                document.head.appendChild(StatcounterVar);   

            let StatcounterScript = document.createElement('script');
                StatcounterScript.setAttribute('src', `https://statcounter.com/counter/counter.js`);
                StatcounterScript.setAttribute('async', true);
                document.head.appendChild(StatcounterScript);

            let noscript = document.createElement('noscript');
                document.body.appendChild(noscript);
                let statcounterDiv = this.create.Element('div', { class: 'statcounter' })
                    noscript.appendChild(statcounterDiv);
                    let statcounterLink = this.create.Element('a', {
                            title: 'Web Analytics',
                            href: 'https://statcounter.com/',
                            target: '_blank'
                        })
                        statcounterDiv.appendChild(statcounterLink);
                        let counterImgSrc = 'https://c.statcounter.com/' + sc_project + '/0/' + sc_security + '/' + var_invisible + '/'
                        let statcounterImg = this.create.Element('img', {
                            class: 'statcounter',
                            src: counterImgSrc,
                            alt: 'Web Analytics',
                            referrerPolicy: 'no-referrer-when-downgrade'
                        })
                        statcounterLink.appendChild(statcounterImg);
        },
        

    }
    // Create Elements end
    //-------------------------------------------------------

    //-------------------------------------------------------
    // Cookie Manager, can manage cookies, session and local storage
    //-------------------------------------------------------
    manage = {
        isEmptyParam: function (a) {
            if (a == undefined || a == "") {
                return true
            } else {
                return false
            }
        },

        //-------------------------------------------------------
        // Cookies Manager
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
        localCookies : function (cookieName) {
            // let cookieName = '_' + (this.settings.name === undefined ? Default.name : this.settings.name).toLowerCase()
            let cookies = JSON.parse(this.getCookie(cookieName))
            return cookies
        },
        arrayCookies : function (cookieName) {
            let cookies = this.getCookie(cookieName) ? Object.entries(JSON.parse(this.getCookie(cookieName)).cookies) : false // not consented yet
            return cookies
        },

        setCookie: function (b, d, a, c) {
            var e = new Date();
            e.setDate(e.getDate() + a);
            window.document.cookie = b + "=" + escape(d) + ";path=/" + ((this.isEmptyParam(a)) ? "" : ";expires=" + e.toUTCString()) + ((this.isEmptyParam(c)) ? ";" : ";")
        },
        deleteCookie: function (a) {
            if (this.getCookie(a)) {
                this.setCookie(a, "", -1, "")
            }
        },
        //-------------------------------------------------------
        // Local Storage Manager
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
        },
        clearLocal: function (a) {
            window.localStorage.clear();
        },
        //-------------------------------------------------------
        // Session Storage Manager
        setSessionStorage:function(a,b) {
            window.sessionStorage.setItem(a, b);
        },
        getSessionStorage: function (a) {
            var c = window.sessionStorage.getItem(a);
            if ( c != null) {
                
                return c;
            } else {
                return "";
            }
        },
        deleteSessionStorage: function (a) {
            window.sessionStorage.removeItem(a);
        },
        clearSession: function (a) {
            window.sessionStorage.clear();
        }

        
    }
    //-------------------------------------------------------


    //-------------------------------------------------------
    // Cookie Consent
    //-------------------------------------------------------
    consent = {
        searchGtag: () => {
            let c = document.cookie.split(';')
            for(let i=0; i<c.length ;i++){
                if(c[i].match('_gat')) {
                    let gtag = c[i].split('=')[0]
                    this.manage.deleteCookie(gtag)
                    return gtag
                }
            }
        },

        checkBannedList: ()=>{
            this.consent.searchGtag()
            for(let i = 0; i < this.Config.bannedList.cookies.length; i++) {
                let target = this.Config.bannedList.cookies[i]
                let cookie = this.manage.getCookie(target)
                if(cookie) {
                    this.manage.deleteCookie(target)
                }
            }
            for(let i = 0; i < this.Config.bannedList.local.length; i++) {
                let target = this.Config.bannedList.local[i]
                let local = this.manage.getLocalStorage(target)
                if(local) {
                    this.manage.deleteLocalStorage(target)
                }
            }
        },
    
        clearCookies: () => {
            this.manage.deleteCookie(this.defaultCookieName)
            this.consent.checkBannedList()
            this.consent.searchGtag()
        },
    
        validate: (defaultname, configCookies) => {
            // let configCookies = Object.entries(Config.Cookies.template)
            

            let arrayCookies = this.manage.arrayCookies(defaultname)
            let localCookies = this.manage.localCookies(defaultname)
            let localStorageSettings = this.manage.getLocalStorage(this.defaultConsentName) // accepted
            if(arrayCookies){
                if(arrayCookies.length != configCookies.length){
                    this.manage.deleteCookie(this.defaultCookieName)
                }
            }
            if(localCookies === null || !localCookies.cookies.analytics || localCookies.cookies.analytics.wanted != true){
                this.consent.searchGtag()
                this.consent.checkBannedList()
            }
            if (localCookies) {
                let version = this.settings.consent.version != localCookies.version ? true : false
                // retorna true se for diferente
                if (version === true) {
                    this.manage.deleteCookie(this.defaultCookieName)
                }
            // TODO.. prevent lost consent
            } 
            if (!localStorageSettings && localCookies){
                this.consent.searchGtag()
                // delete cookie if not local storage consent set
                this.consent.clearCookies()
            } 
            if (!localCookies && localStorageSettings){
                this.consent.searchGtag()
                // this.manage.deleteLocalStorage(this.defaultConsentName) // accepted
            }
            for(let i = 0; i < arrayCookies.length; i++){
                let localCookieName = arrayCookies[i][0]
                if(this.configCookies[i].label !== localCookieName){
                    this.manage.deleteCookie(this.defaultCookieName)
                    this.manage.deleteLocalStorage(this.defaultConsentName) // accepted
                    return false
                }
            }
            
        },
        //-------------------------------------------------------
        // set consent
        set: (key) => {
            // console.log(this.settings.expire)
            if (key == false) {
                this.manage.deleteCookie(this.defaultCookieName)
            } else {
                this.manage.setCookie(this.defaultCookieName, key, this.settings.expire);
            }
        },
        //-------------------------------------------------------

        //-------------------------------------------------------
        // consent checkConfig
        // verifica o local storage e assinala as atribuiçoes de configurações
        checkConfig: (defaultname) => {
            // procura configurações na maquina local
            // ou melhor rodar um foreach nas configurações locais do cookie e verificar
            // quais wanted = true pra cada um setar o checkbox pra true pegando o elemento
            // pelo id ex: document.getElementById('giveaway').checked = true
            // pra diferenciar setar os ids como check_'nome'
            // pegar o consent e gerar o form de opções
            this.setSelectors = function () {
                let arrayCookies = this.manage.arrayCookies(defaultname)
                let localCookies = this.manage.localCookies(defaultname)
                for (let i = 0; i < arrayCookies.length; i++) {
                    let key = arrayCookies[i][0]
                    let wanted = localCookies.cookies[key].wanted === undefined ? core.Default.consent : localCookies.cookies[key].wanted
                    let input = document.getElementById('chk_' + key)
                    let status = document.getElementById(key + '_status')

                    status.innerHTML = wanted === true ? this.Config.lang.en.default_statusActive : this.Config.lang.en.default_statusInactive
                    if(wanted) {
                        status.classList.add('class', 'success')
                        status.classList.remove('class', 'default')
                    }
                    if(input) { 
                        input.checked = wanted
                    }
                    if (wanted === true) {
                        this.create.Script(this.configCookies[i])
                    }
                }
            }

            this.setSelectorsDefault = function () {
                for (let i = 0; i < this.configCookies.length; i++) {
                    let key = this.configCookies[i].label
                    let defaultConsent = this.settings.defaultConsent != 1 ? false : true
                    let wanted = this.configCookies[i].wanted === undefined ? defaultConsent : this.configCookies[i].wanted
                    let input = document.getElementById('chk_' + key)
                    let status = document.getElementById(key + '_status')
                    status.innerHTML = wanted === true ? this.Config.lang.en.default_statusActive : this.Config.lang.en.default_statusInactive
                    if(input) { 
                        input.checked = wanted
                    }
                    if (wanted === true) {
                        // TODO.. by default
                        // error to 
                        
                        status.classList.add('class', 'success')
                        status.classList.remove('class', 'default')
                        this.create.Script(this.configCookies[i])
                    }
                }
            }

            if (!this.manage.getLocalStorage(this.defaultConsentName)){
                // console.log('cookie consent nao existe') entao cria o script por padrao
                // default setup when user not accepted or declined
                if (this.configCookies){
                    // for( let i = 0; i < this.configCookies.length; i++){
                    // }
                    // all inputs checked by default when user not consented yet
                    this.setSelectorsDefault()
                }

            } else {
                // consent existe entao verifica a validação do consent 
                // if Consent Declined are returning string '0'
                if (this.manage.getLocalStorage(this.defaultConsentName) === '0'){ // 'declined'
                    // when user declined for our cookies we need block the null scripts and not load others
                    // cada script false or script null devem ser bloqueados
                    for ( let i=0; i< this.configCookies.length; i++ ) {
                            let wanted = false
                            // let wanted = this.configCookies[key].wanted === undefined ? core.Default.consent : this.configCookies[key].wanted
                            let input = document.getElementById('chk_' + this.configCookies[i].label)
                            if (input){
                                input.checked = wanted == true ? wanted : false
                            }
                        // }
                        // let cookie = this.configCookies[i][0]
                        // let cookieInfo = this.configCookies[i][1]
                        // if (cookieInfo.script != true){
                        //     let tagSetup = cookieInfo.scriptTag === true ? true : false
                        //     debugger
                        //     blockScript(cookie, tagSetup)
                        // }
                    }
                }else {
                    // consent = true , consent já configurado entao deve-se verificar quais as configurações atraves do atributo wanted
                    // this.consent.validate()
                    this.consent.checkBannedList()
                    this.setSelectors()
                //     let arrayCookies = this.manage.arrayCookies()
                //     let localCookies = this.manage.localCookies()
                //     for (let i = 0; i < arrayCookies.length; i++) {
                //         let key = arrayCookies[i][0]
                //         let wanted = localCookies.cookies[key].wanted === undefined ? core.Default.consent : localCookies.cookies[key].wanted
                //         let input = document.getElementById('chk_' + key)
                //         let status = document.getElementById(key + '_status')

                //         status.innerHTML = wanted === true ? Config.lang.en.default_statusActive : Config.lang.en.default_statusInactive
                //         if(wanted) {
                //             status.classList.add('class', 'success')
                //             status.classList.remove('class', 'default')
                //         }
                //         if(input) { 
                //             input.checked = wanted
                //         }
                //         if (wanted === true) {
                //             this.create.Script(this.configCookies[i])
                //         }
                //     }
                // }
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
                }
                
            }
            // return cookie
        },
        // checkConfig end
        //-------------------------------------------------------


    }
    // consent end
    //-------------------------------------------------------

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
        let iconSvg = document.createElementNS(this.w3orgSvg, 'svg');
        iconSvg.setAttribute('viewBox', '0 0 448 512');
        iconSvg.setAttribute('xmlns', this.w3orgSvg);
        let iconPath = document.createElementNS(
            this.w3orgSvg,
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
            const iconSvg = document.createElementNS(this.w3orgSvg, 'svg');
            iconSvg.setAttribute('xmlns', this.w3orgSvg);
            iconSvg.setAttribute('width', '24');
            iconSvg.setAttribute('heigth', '24');
            iconSvg.setAttribute('fill', 'none');
            iconSvg.setAttribute('viewBox', '0 0 24 24');
            iconSvg.setAttribute('stroke', '#273240');
            iconSvg.classList.add('post-icon');
        
            const iconG = document.createElementNS(this.w3orgSvg, 'g');
            iconG.setAttribute('opacity', '0.5')
            iconSvg.appendChild(iconG);
            
            const iconPath = document.createElementNS(
            this.w3orgSvg,
            'path'
            );
            const iconPath2 = document.createElementNS(
            this.w3orgSvg,
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

        badge: (label, status = false) => {
            let classStatus = status != false ? status : 'success' 
            let span_badge = this.create.Element('span', { class: 'baged ' + classStatus })
                span_badge.innerHTML = label
                return span_badge
        },
        CookieSettingsElements: () => {
            
            let div_cookie_wrapper = this.create.Element('div', { class: 'cookie_wrapper', style: 'display:none' })
            document.body.after(div_cookie_wrapper)
                // 
                let div_cookie = this.create.Element('div', { class: 'cookie' })
                div_cookie_wrapper.appendChild(div_cookie)
                    // 
                    // div close
                    let div_close = this.create.Element('div', { class: 'close' })
                        div_cookie.appendChild(div_close)
                        
                        this.render.IconClose(div_close)
                    // 
                    // div front
                    // div_front = this.create.Element('div', { class: 'front' })
                    //     div_cookie.appendChild(div_front)
                    //     front_h1 = document.createElement('h1')
                    //         front_h1.innerHTML = 'Privacy Preference Center'
                    //         div_front.appendChild(front_h1)
                    //     front_p = document.createElement('p')
                    //         front_p.innerHTML = 'When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to our <a href="https://kessgame.com/privacy.html" id="privacy">Privacy Policy</a>.'
                    //         div_front.appendChild(front_p)
                    //     div_front_buttons = this.create.Element('div', { class: 'front__buttons' })
                    //         div_front.appendChild(div_front_buttons)
                    //         // buttons
                    //         button_allow_front_buttons = this.create.Element('button', { 
                    //             class: 'front__buttons', 
                    //             type: 'submit', 
                    //             id: 'allowCookies'
                    //         })
                    //         button_allow_front_buttons.innerHTML = 'Allow All'
                    //         div_front_buttons.appendChild(button_allow_front_buttons)
            
                    //     //     button_decline_front_buttons = this.create.Element('button', { 
                    //     //         class: 'front__buttons', 
                    //     //         type: 'submit', 
                    //     //         id: 'declineCookies'
                    //     //     })
                    //     //     button_decline_front_buttons.innerHTML = 'Decline unnecessary cookies'
                    //     //     div_front_buttons.appendChild(button_decline_front_buttons)
                    //     // // front footer
                    //     // div_front_footer = this.create.Element('div', { class: 'front__footer' })
                    //     // div_front.appendChild(div_front_footer)
                    //         a_more_cookie = this.create.Element('a', { id: 'more_cookie', href: '#' })
                    //         a_more_cookie.innerHTML = 'Manage Consent Preferences'
                    //         div_front_buttons.appendChild(a_more_cookie)
                    //
                    // div back
                    let div_back = this.create.Element('div', { class: 'back' })
                    div_cookie.appendChild(div_back)
                        let div_header_cookies = this.create.Element('div', { class: 'header-cookies' })
                        div_back.appendChild(div_header_cookies)
                            let div_back_icons = this.create.Element('div', { class: 'back_icons' })
                            div_header_cookies.appendChild(div_back_icons)
                                // div_back_icon = this.create.Element('div', { class: 'back_icon' })
                                // div_back_icons.appendChild(div_back_icon)
                                //     this.render.IconBack(div_back_icon)
                                //
                                let div_back_title = this.create.Element('h1', { class: '' })
                                div_back_title.innerHTML = 'Manage Consent Preferences'
                                div_header_cookies.appendChild(div_back_title)
                        //
                        // generating form
                        let cookie_options = this.create.Element('form', { class: 'cookie_options' })
                            div_back.appendChild(cookie_options)
                            // generating UL
                            let cookie_options_tab = this.create.Element('ul', { class: 'tab tab_consent_form' })
                            cookie_options.prepend(cookie_options_tab)
                                // necessary cookies
                                let cookie_li = document.createElement('li')
                                cookie_options_tab.appendChild(cookie_li)
                                    let iconPlus = this.create.Element('i', { class: 'fas fa-plus' })
                                    cookie_li.appendChild(iconPlus)
                                    let h2_li = document.createElement('h2')
                                    h2_li.innerHTML = 'Strictly Necessary Cookies'
                                    cookie_li.appendChild(h2_li)
                                    let span_badge = this.render.badge('Always Active')
                                    cookie_li.appendChild(span_badge)
                                let cookie_li_data = this.create.Element('div', { class: 'data2' })
                                cookie_options_tab.appendChild(cookie_li_data)
                                    let cookie_li_data_p = document.createElement('p')
                                    cookie_li_data_p.innerHTML = 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.'
                                    cookie_li_data.appendChild(cookie_li_data_p)
                            //
                            // cria os elementos baseados no consent config object
                            for (let i = 0; i < this.configCookies.length; i++){
                                let cookie_name = this.configCookies[i].label
                                let description_cookie = this.configCookies[i].description
                                // TODO.. adjust name title
                                let title = this.configCookies[i].title
                                let category = this.configCookies[i].purpose
                                // let title = cookie_name == 'giveaway' ? 'Third-Party Cookies' : cookie_name + ' Cookies'
                                let cookie_li = document.createElement('li')
                                cookie_options_tab.appendChild(cookie_li)
                                    let iconPlus = this.create.Element('i', { class: 'fas fa-plus' })
                                    cookie_li.appendChild(iconPlus)
                                    let divScriptName = this.create.Element('div', { class: '' })
                                        cookie_li.appendChild(divScriptName)
                                            // title
                                            let h2_li = document.createElement('h2')
                                                h2_li.innerHTML = this.render.TitleCase(title)
                                                divScriptName.appendChild(h2_li)
                                            // purposes
                                            let span_li = document.createElement('small')
                                                span_li.innerHTML = this.render.TitleCase('Purposes: ' + category)
                                                divScriptName.appendChild(span_li)
                                    // checkbox
                                    // TODO.. incluir botao badge pra identificar o status
                                    let status = this.render.badge(this.Config.lang.en.default_statusInactive, 'status default')
                                    status.setAttribute('id', cookie_name+'_status')
                                    cookie_li.appendChild(status)

                                    let label_checkbox = this.create.Element('label', { class: 'custom_checkbox' })
                                    cookie_li.appendChild(label_checkbox)
                                    let input_checkbox = this.create.Element('input', { 
                                        type: 'checkbox',
                                        'data-function': cookie_name,
                                        id: 'chk_' + cookie_name,
                                    })
                                    label_checkbox.appendChild(input_checkbox)
                                    let span_toogle = this.create.Element('span', {class: 'toogle'})
                                    label_checkbox.appendChild(span_toogle)
                        
                                let cookie_li_data = this.create.Element('div', { class: 'data2' })
                                cookie_options_tab.appendChild(cookie_li_data)
                                    let cookie_li_data_p = document.createElement('p')
                                        // description
                                        cookie_li_data_p.innerHTML = description_cookie
                                        cookie_li_data.appendChild(cookie_li_data_p)
                            }
                            //
                            let back_footer = this.create.Element('div', { class: 'back_footer'})
                                cookie_options.appendChild(back_footer)
                                let confirm_cookies = this.create.Element('input', { 
                                    id: 'confirmCookies', 
                                    type: 'submit', 
                                    value: this.Config.lang.en.consent_btn_confirm
                                })
                                back_footer.appendChild(confirm_cookies)
                                let iconConfirmChoices = this.create.Element('span', { class: 'material-symbols-outlined'})
                                    iconConfirmChoices.innerHTML = 'cookie'
                                    confirm_cookies.prepend(iconConfirmChoices)
            
                //
                // Generating COokie Floater Button 
                let floater = this.create.Element('div', { class: 'cookie_floater', style: 'display:none' })
                    div_cookie_wrapper.after(floater)
                    // let cookie_img = this.create.Element('img', { alt: 'Cookie Privacy Settings', src: this.settings.iconPreferences })
                    // floater.appendChild(cookie_img)      
                    let span_settings = document.createElement('div') 
                        span_settings.setAttribute('class', 'settings')
                        span_settings.innerHTML = 'Privacy Settings'
                        floater.appendChild(span_settings)      
                        // icon cookie
                        let settingsIconFloater = this.create.Element('span', { class: 'material-symbols-outlined'})
                            settingsIconFloater.innerHTML = 'cookie'
                            span_settings.prepend(settingsIconFloater)
                    
                //
                // Generating Consent Bar
                let consent_bar = this.create.Element('div', { 
                    id: 'cconsent-bar',
                    class: 'collapse',
                    role: 'region',
                    'aria-label': 'Cookie consent',
                    'aria-hidden': false,
                    tabindex: 0
                })
                floater.after(consent_bar)
                    let cc_wrapper = this.create.Element('div', { class: 'ccb__wrapper'})
                        consent_bar.appendChild(cc_wrapper)
                        let cc_left = this.create.Element('div', { class: 'ccb__left'})
                            cc_wrapper.appendChild(cc_left)
                            let cc_text = this.create.Element('div', { class: 'cc-text'})
                                cc_text.innerHTML = this.Config.lang.en.consent_bar_message
                                cc_left.appendChild(cc_text)
                        //
                        let cc_right = this.create.Element('div', { class: 'ccb__right'})
                            cc_wrapper.appendChild(cc_right)
                            let cc_button = this.create.Element('div', { class: 'ccb__button'})
                                cc_right.appendChild(cc_button)
            
                                let buttonEdit = this.create.Element('button', {
                                    class: 'ccb__edit',
                                    type: 'submit',
                                })
                                buttonEdit.innerHTML = 'Privacy Settings'
                                cc_button.appendChild(buttonEdit)
                                
                                let buttonConsent = this.create.Element('button', {
                                    class: 'consent__give',
                                    type: 'submit',
                                })
                                buttonConsent.innerHTML = this.Config.lang.en.consent_btn_accept
                                cc_button.appendChild(buttonConsent)
                                
                                // '<span class="material-symbols-outlined">cookie</span>'
                                let cookieIcon = this.create.Element('span', { class: 'material-symbols-outlined'})
                                    cookieIcon.innerHTML = 'cookie'
                                    buttonConsent.prepend(cookieIcon)
        }
            
    }
    // render end
    //-------------------------------------------------------

    //-------------------------------------------------------
    // Cookies General Functions
    //-------------------------------------------------------
    Data = {

        getAll: () => document.cookie.split(';').reduce((ac, str) => Object.assign(ac, {[str.split('=')[0].trim()]: str.split('=')[1]}), {}),
            
        getFormPref: () => {
            return [...document.querySelectorAll('[data-function]')].filter((el) => el.checked).map((el) => el.getAttribute('data-function'));
        },

        getAllPref: () => {
            return [...document.querySelectorAll('[data-function]')].filter((el) => el).map((el) => el.getAttribute('data-function'));
        },

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
            this.setAllConsent = (value) => {
                // console.log(this.configCookies)
                for (let i=0; i < this.configCookies.length; i++){
                    let n = this.configCookies[i].label
                    // let content = this.configCookies[i][1]
                    this.settings.consent.cookies[n] = {}
                    this.settings.consent.cookies[n].wanted = value
                    // this.Config.consent.cookies[n].script = content.script
                }
            }
            // 
            this.setConsentByForm = (preferences) => {
                // reset all preferences to false
                this.setAllConsent(false)
                // set all preferences selected by user

                for (let i=0; i < preferences.length; i++){
                    let n = preferences[i]
                    this.settings.consent.cookies[n] = {}
                    this.settings.consent.cookies[n].wanted = true
                }
            }
            if (action === 'setCookie') {
                if (preferences.length === 0){
                    // user declined consent
                    // TODO.. need detect and exclude _ga and _gi if exist to complete the remotion of analytics cookies
                    
                    // setAllConsent(false)
                    // this.Config.consent.value = false
                    // manage.setLocalStorage(defaultConsentName, 'declined')
                    // if(manage.getLocalStorage(defaultConsentName)){
                    //     manage.deleteLocalStorage(defaultConsentName)
                    // }
                    // Consent.set(JSON.stringify(this.Config.consent))
                    this.manage.clearLocal()
                    this.manage.clearSession()
                    this.consent.clearCookies()
                    this.manage.setLocalStorage(this.defaultConsentName, 0) // declined

                    setTimeout(() => {
                        window.location.reload()
                    }, "1500") 
                }
                if(form === true) {
                    // this.manage.clearLocal()
                    // this.manage.clearSession()
                    // this.consent.clearCookies()
                    for (let i = 0; i < preferences.length; i++){
                        this.setConsentByForm(preferences)
                        this.manage.setLocalStorage(this.defaultConsentName, 1 ) // accepted
                        this.consent.set(JSON.stringify(this.settings.consent))
                    }
                    setTimeout(() => {
                        window.location.reload()
                    }, "1500") 
                } else if (preferences.length === this.configCookies.length) {
                    // user accepted all consents or selected all cookies
                    this.setAllConsent(true)
                    this.manage.setLocalStorage(this.defaultConsentName, 1 ) // accepted
                    this.consent.set(JSON.stringify(this.settings.consent))
                    setTimeout(() => {
                        window.location.reload()
                    }, "1500") 
                }
            } else if (action === 'deleteCookie') {
                Consent.clearCookies()
                setAllConsent(false)
                // this.settings.consent.value = false
                this.consent.set(JSON.stringify(this.settings.consent))
                this.manage.setLocalStorage(this.defaultConsentName, 0) // declined
                setTimeout(() => {
                    window.location.reload()
                }, "1500") 
            }
        }

    }    

    //-------------------------------------------------------
    // Starting App
    //-------------------------------------------------------
    init = () => { 

        //-------------------------------------------------------
        // Default Cookies Settings
        this.Config = new ConfigSetup()
        this.Default = this.Config.default
        //-------------------------------------------------------
        // const __code='FCB73330E3226E2'; // example
        this.clientData = {
            "code": __code
        }
        let apiUrl = this.Default.url + this.Default.apiCall
        let getData = fetch(apiUrl + this.clientData.code);
        
        this.loadCSSFiles = () => {
            if(this.Default.automaticCreateCSS === true) {
                let css_file = this.Default.useCssCDN === true ? this.Default.cssCDN : this.Default.base_local + this.Default.cssLocal
                this.create.CSS(css_file)
            }
            if (this.Default.cssIncludes.length > 0){
                let stylesheet = this.Default.cssIncludes
                for(let i=0; i<stylesheet.length; i++) {
                    this.create.CSS(stylesheet[i])
                }
            }
        }
        this.loadCSSFiles()

        getData.then(res => res.json()).then(d => {

            // TODO..
            // need validate user account here, check domain and if is a valid user

            console.log(d.preferences.domain != window.location.hostname ? 'true' : 'false')
            console.log(d.preferences.domain)
            console.log(window.location.hostname)

            //-------------------------------------------------------
            // Cookies Script Settings
            this.settings = {
                // General settings
                name : d.preferences.name === undefined ? this.Default.name : d.preferences.name,
                prefix : d.preferences.prefix === undefined ? this.Default.prefix : d.preferences.prefix,
                description: d.preferences.description === undefined ? this.Default.description : d.preferences.description,
                url: d.preferences.website === undefined ? this.Default.url : d.preferences.website,
                privacyPage: d.preferences.privacyPage === undefined ? this.Default.privacy : d.preferences.privacyPage,
                termsPage: d.preferences.termsPage === undefined ? this.Default.terms : d.preferences.termsPage,
                expire: d.preferences.expire === undefined ? this.Default.expire : d.preferences.expire,
                defaultConsent: d.preferences.consent === undefined ? this.Default.consent : d.preferences.consent,
                useJsCDN: d.preferences.useJsCDN === undefined ? this.Default.useJsCDN : d.preferences.useJsCDN,
                useCssCDN: d.preferences.useCssCDN === undefined ? this.Default.useCssCDN : d.preferences.useCssCDN,
                iconPreferences: d.preferences.iconPreferences === undefined ? this.Default.iconPreferences : d.preferences.iconPreferences,
                // base_local: d.preferences.base_local === undefined ? this.Default.base_local : d.preferences.base_local,
                base_local: this.Default.base_local,
                cssIncludes: (d.preferences.cssIncludes === undefined || d.preferences.cssIncludes < 1) ? this.Default.cssIncludes : d.preferences.cssIncludes,
                // Consent settings
                consent : {
                    version: '1.2',
                    value: true,
                    timestamp: new Date().getTime(),
                    cookies : {
                    }
                }
            }
            //-------------------------------------------------------
            //-------------------------------------------------------
            this.w3orgSvg = 'http://www.w3.org/2000/svg'
            this.appJavascript = 'text/javascript'
            this.defaultConsentName = this.settings.prefix + '_consent'
            this.defaultCookieName = '_' + this.settings.name.toLowerCase()
            this.configCookies = d.template
            //-------------------------------------------------------

        }).then( () => {

            for (let i = 0; i < this.configCookies.length; i++) {
                if(this.configCookies[i].content === null){ 
                    console.log('No cookie in use | Error: Cookies consent not configured properly')
                    return false 
                }
            }
    
            this.render.CookieSettingsElements()
            this.consent.validate(this.defaultCookieName, this.configCookies)
            this.consent.checkConfig(this.defaultCookieName)

            //-------------------------------------------------------
            // Objects
            //-------------------------------------------------------
            const close = document.querySelector(".close");
            const cookieWrapper = document.querySelector(".cookie_wrapper");
            // const front = document.querySelector(".front");
            const back = document.querySelector(".back");
            // const more = document.querySelector("#more_cookie");
            // const backicon = document.querySelector(".back_icon");
            const cookieFloater = document.querySelector(".cookie_floater");
            // const allowCookies = document.querySelector('#allowCookies');
            // const declineCookies = document.querySelector('#declineCookies');
            const confirmCookies = document.querySelector('#confirmCookies');
            const cookieSettings = document.querySelector(".ccb__edit")
            const consentGive = document.querySelector(".consent__give")
            const cookieConsentBar = document.querySelector("#cconsent-bar")
    
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
                const input = element.getElementsByTagName("input")[0];
                const badge = element.getElementsByClassName("status")[0];
                const data = element.nextElementSibling;
                const config = new ConfigSetup()
                if (iEl.className == "far fa-minus") {
                    iEl.classList.value = "fas fa-plus";
                } else {
                    iEl.classList.value = "far fa-minus";
                }
                data.classList.toggle("active");
                if(input != undefined) {
                    if(input.checked === true) {
                        badge.classList.add('success')
                        badge.classList.remove('default')
                        badge.innerHTML = config.lang.en.default_statusActive
                    } else {
                        badge.classList.add('default')
                        badge.classList.remove('success')
                        badge.innerHTML = config.lang.en.default_statusInactive
                    }
                }
            });
            }
            
            //-------------------------------------------------------
            // Visual Actions
            //-------------------------------------------------------
            
            this.consentBarHide = () => {
                cookieConsentBar.classList.add('collapse')
            }
            this.consentBarShow = function () {
                cookieConsentBar.classList.remove('collapse')
            }
            
            this.floaterVisible = () => {
                cookieWrapper.style.display = "none";
                cookieFloater.style.display = "flex";
            }
            this.floaterHide = () => {
                cookieWrapper.style.display = "flex";
                cookieFloater.style.display = "none";
            }
            this.privacySettings = () => {
                back.style.display = "flex";
                // front.style.display = "flex";
            }
            this.cookieMorePreferences = () => {
                // front.style.display = "none";
                this.consentBarHide()
                back.style.display = "flex";
            }
    
            //-------------------------------------------------------
            // Event Listeners
            //-------------------------------------------------------
    
            cookieSettings.addEventListener("click", () => {
                cookieWrapper.style.display = "flex";
                // cookieConsentBar.classList.add('collapse')
                this.consentBarHide()
            })
    
            confirmCookies.addEventListener("click", ()=> {
                const pref = this.Data.getFormPref();
                this.Data.bake(pref, 'setCookie', true)
                // cookieWrapper.style.display = "none";
                // cookieFloater.style.display = "flex";
                this.floaterVisible()
            })
    
            consentGive.addEventListener("click", () => {
                this.Data.bake(this.Data.getAllPref(), 'setCookie')
                cookieConsentBar.classList.add('collapse')
                // cookieWrapper.style.display = "none";
                // cookieFloater.style.display = "flex";
                this.consentBarHide()
                this.floaterVisible()
            })
    
            // const name = this.settings.name === undefined ? Default.name : this.settings.name
            const c = this.manage.getCookie(this.defaultCookieName)
            
            close.addEventListener("click", () => {
                if (!c){
                    this.consentBarShow() // *(deprecated)
                    // cookieConsentBar.classList.remove('collapse')
                    cookieWrapper.style.display = "none";
                }else {
                    // cookieWrapper.style.display = "none";
                    // cookieFloater.style.display = "flex";
                    this.floaterVisible()
                }
            })
    
            cookieFloater.addEventListener("click", () => {
                this.privacySettings()
                // back.style.display = "flex";
                // cookieWrapper.style.display = "flex";
                // cookieFloater.style.display = "none";
                this.floaterHide()
            })
            // allowCookies.addEventListener("click", ()=> {
            //     Cookie.bake(getAllPref(), setCookie)
            //     floaterVisible()
    
            // });
    
            // declineCookies.addEventListener("click", ()=> {
            //     Cookie.bake(getAllPref(), deleteCookie)
            //     floaterVisible()
            // });
    
            let localCookies = this.manage.localCookies(this.defaultCookieName)
            if (localCookies) {
                if (localCookies.value === false) {
                    // this.consentBarShow()
                    cookieConsentBar.classList.remove('collapse')
                } else {
                    // this.floaterVisible()
                    cookieWrapper.style.display = "none";
                    cookieFloater.style.display = "flex";
                }
            } else {
                // this.consentBarShow()
                cookieConsentBar.classList.remove('collapse')
            }
    
            this.resize()

        })

    }
    //-------------------------------------------------------

    resize = () => {
        const body = document.getElementsByTagName("body")[0];
        const defaultSizeReduce = 280
        // Initialize resize observer object
        let resizeObserver = new ResizeObserver(() => {
            let tab = document.getElementsByClassName('tab_consent_form')[0]
            let newSize = (window.innerHeight - defaultSizeReduce) + 'px'
            // Set the current height and width
            tab.style.maxHeight = newSize
        });
           
        // Add a listener to body
        resizeObserver.observe(body);
    }

} // end class



//-------------------------------------------------------
// Config for Cookies Script Setup
//-------------------------------------------------------

class ConfigSetup {
    constructor () {
        this.options()
    }

    options() {

        this.bannedList = {
            cookies : [
                '_gid',
                '_ga',
                '_fbp',
                'euconsent-v2',
                'pubconsent-v2',
            ],
            local : [
                'sc_medium_source',
                'statcounter.com/localstorage/'
            ],
        },

        this.lang = {
            en: {
            //-------------------------------------------------------
            // General
                default_statusInactive : 'Off',
                default_statusActive : 'Active',
            // Form
                consent_bar_message : 'This website uses cookies to ensure you get the best experience on our website.',
                consent_btn_accept : 'Accept Cookies',
                consent_btn_confirm: 'Save my Settings'
            }
        },

        this.default = {
            name: 'Cookie Consent',
            prefix: '_ccm',
            url: 'https://cookies.marcelomotta.com/',
            urlProject: 'https://github.com/marc310/cookie-consent/',
            apiCall: 'api/cookies/property/code/',
            description: 'Cookie notice bars are not enough!',
            terms: 'terms.html',
            privacy: 'privacy.html',
            iconPreferences: 'https://cdn.jsdelivr.net/gh/marc310/cookie-consent@main/assets/img/cookie_1f36a.png',
            cssCDN: 'https://cdn.jsdelivr.net/gh/marc310/cookie-consent@main/api/assets/css/cookies.css',
            jsCDN: 'https://cdn.jsdelivr.net/gh/marc310/cookie-consent@main/api/assets/js/Cookie.js',
            base_local: './src/plugins/cookies-consent/dist/',
            cssLocal: 'assets/css/cookies.css',
            jsLocal: 'assets/js/cookies.core.js',
            expire: 15,
            consent: false,
            useJsCDN: false,
            useCssCDN: true,
            automaticCreateCSS: true,
            cssIncludes: [
                'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
            ],
        }

    } // end config setup

} // end class config



Cookie = new Cookie()
