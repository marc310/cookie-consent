
/* 
************************************************************
:: Project Name: Cookie Consent Script
:: Project Author Name: Marcelo Motta
:: Project Author URI: https://marcelomotta.com
:: Project URI: https://github.com/marc310/cookie-consent
:: Version: 1.2.82
:: Created: 19 Mai 2023
************************************************************ 
*/

//-------------------------------------------------------
// Cookie Consent Class
class Cookie {

    //-------------------------------------------------------
    constructor(){

        

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

            String.prototype.hexDecode = function(){
                var j;
                var hexes = this.match(/.{1,4}/g) || [];
                var back = "";
                for(j = 0; j<hexes.length; j++) {
                    back += String.fromCharCode(parseInt(hexes[j], 16));
                }

                return back;
            }

            let tag = key.label
            let cookieInfo = key.content != null ? key.content : ()=>{ 
                console.log('error: 404, Content setup not exist, contact website support') 
                return false 
            };
            let wanted = cookieInfo.wanted === undefined ? true : cookieInfo.wanted
            let script = key.script
            if(wanted) {
                // todos os wanted devem dar load no script
                // verifica o script true para gerar no header, false para gerar num target, entao é pedido um novo parametro node* , e null para nao carregar nenhum script, retorna falso
                // let ConfigPath = key
                let scriptType = (script === undefined || script.toLowerCase() === 'head') ? false : script.toLowerCase()
                switch (scriptType) {
                    case "head" :
                        this.create.HeadScript(this.appJavascript, cookieInfo.src.hexDecode())
                        break;
                    case "customscript" :
                        this.create.CustomScript(cookieInfo.src.hexDecode())
                        break;
                    case "target" :
                        let target = cookieInfo.target === undefined ? tag + '_script' : cookieInfo.target
                        let btn = cookieInfo.content === undefined ? false : cookieInfo.content
                        this.create.TargetScript(this.appJavascript, cookieInfo.src.hexDecode(), target.hexDecode(), btn.hexDecode())
                        break;
                    case "analytics" :
                        this.create.Analytics(cookieInfo.ga_code.hexDecode())
                        break;
                    case "facebook" :
                        this.create.Facebook(cookieInfo.fb_code.hexDecode())
                        break;
                    case "hotjar" :
                        this.create.Hotjar(cookieInfo.hj_code.hexDecode())
                        break;
                    case "statcounter" :
                        let project = cookieInfo.sc_project.hexDecode()
                        let security = cookieInfo.sc_security.hexDecode()
                        let invisible = cookieInfo.sc_invisible.hexDecode()
                        let text = cookieInfo.sc_text.hexDecode()
                        this.create.Statcounter(project, security, invisible, text)
                        break;
                    default :
                        this.create.HeadScript(this.appJavascript, cookieInfo.src.hexDecode())
                        break;
                }
                
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

        CustomScript: (content) => {
            // if(content.trim().substr(0, 4) != "<script") {
            //     let pre = '<script async>'
            //     let pos = '</script>'
            //     let jsContent = pre + content + pos
            //     document.head.innerHTML += jsContent;
            // }
            document.head.innerHTML += content;
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

        // TagManager: (gtm) => {
        //     let tag = document.createElement('script')
        //     tag.text = `<!-- Google Tag Manager -->
        //                     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        //                     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        //                     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        //                     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        //                     })(window,document,'script','dataLayer','GTM-5FQVBW3');
        //                     <!-- End Google Tag Manager -->`;
        //     document.head.appendChild(tag)
        //     let noscript = document.createElement('noscript')
        //     noscript.text = `<!-- Google Tag Manager (noscript) -->
        //                     <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5FQVBW3"
        //                     height="0" width="0" style="display:none;visibility:hidden"></iframe>
        //                     <!-- End Google Tag Manager (noscript) -->`;
        //     document.body.appendChild(noscript);
            
        // },

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
                    this.manage.deleteLocalStorage(this.defaultConsentName)
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
                    this.manage.deleteLocalStorage(this.defaultConsentName)
                }
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

        resetSelectors: (defaultname) => {
            /* */
            let arrayCookies = this.manage.arrayCookies(defaultname)
            let localCookies = this.manage.localCookies(defaultname)
            for (let i = 0; i < arrayCookies.length; i++) {
                let key = arrayCookies[i][0]
                let wanted = localCookies.cookies[key].wanted === undefined ? core.Default.consent : localCookies.cookies[key].wanted
                let input = document.getElementById('chk_' + key)
                let status = document.getElementById(key + '_status')
                let necessary = status.classList.contains('always_active')

                if (!necessary) {
                    status.innerHTML = wanted === true ? this.Config.lang.en.default_statusActive : this.Config.lang.en.default_statusInactive
                    if(wanted) {
                        status.classList.add('class', 'success')
                        status.classList.remove('class', 'default')
                    }else {
                        status.classList.remove('class', 'success')
                        status.classList.add('class', 'default')
                    }
                    if(input) { 
                        input.checked = wanted
                    }
                }
            }
        },

        //-------------------------------------------------------
        // consent checkConfig
        // verifica o local storage e assinala as atribuiçoes de configurações
        checkConfig: (defaultname) => {
            // procura configurações na maquina local
            this.setSelectors = function () {
                let arrayCookies = this.manage.arrayCookies(defaultname)
                let localCookies = this.manage.localCookies(defaultname)
                for (let i = 0; i < arrayCookies.length; i++) {
                    let key = arrayCookies[i][0]
                    let wanted = localCookies.cookies[key].wanted === undefined ? core.Default.consent : localCookies.cookies[key].wanted
                    let input = document.getElementById('chk_' + key)
                    let status = document.getElementById(key + '_status')
                    let necessary = status.classList.contains('always_active')
                    
                    if (!necessary) {
                        status.innerHTML = wanted === true ? this.Config.lang.en.default_statusActive : this.Config.lang.en.default_statusInactive
                    }
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
                    let necessary = status.classList.contains('always_active')
                    
                    if (!necessary) {
                        status.innerHTML = wanted === true ? this.Config.lang.en.default_statusActive : this.Config.lang.en.default_statusInactive
                    }
                    if(input) { 
                        input.checked = wanted
                    }
                    if (wanted === true) {
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
                        let input = document.getElementById('chk_' + this.configCookies[i].label)
                        let needed = this.configCookies[i].needed == true ? true : false
                        if (needed){
                            this.create.Script(this.configCookies[i])
                        }else {
                            if (input){
                                input.checked = wanted == true ? wanted : false
                            }
                        }

                        
                    }
                }else {
                    // consent = true , consent já configurado entao deve-se verificar quais as configurações atraves do atributo wanted
                    // this.consent.validate()
                    this.consent.checkBannedList()
                    this.setSelectors()
               
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

        // RENDER UI BANNER CONSENT NOTICE
        CookieSettingsElements: (layout = false) => {
            // layout selector
            switch (layout) {
                case 'simple':
                        this.render.simpleBannerLayout();
                    break;

                case 'notice':
                        this.render.categorizedBannerLayout('notice');
                    break;

                case 'categorized':
                        this.render.categorizedBannerLayout();
                    break;

                case 'default':
                        this.render.defaultBannerLayout();
                    break;
                default:
                        this.render.defaultBannerLayout();
                    break;
            }
        },

        // render layout structure for banner notice modes
        // Default, Categorized and Simple Layout
        categorizedBannerLayout : (param = false) => {
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
                    if (param == 'notice') {
                        // FRONT CONSENT NOTICE
                            let div_front = this.render.layoutElements.front();
                            div_cookie.appendChild(div_front)
                    }
                    // BACK CONSENT NOTICE
                    // param to back categorized : true = have button back, false = have no button back
                        let div_back = this.render.layoutElements.back_categorized(param == 'notice' ? true : false);
                        div_cookie.appendChild(div_back)
                        //set data
                        this.Data.setInfoAvailableApps()
                //
                // Generating COokie Floater Button 
                let floater = this.render.layoutElements.floater()
                    div_cookie_wrapper.after(floater)
                //
                // Generating Consent Bar
                let consent_bar = this.render.layoutElements.consent_bar();
                    floater.after(consent_bar)
        },
        simpleBannerLayout : () => {
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
                    // FRONT CONSENT NOTICE
                    // let div_front = this.render.layoutElements.front();
                    // div_cookie.appendChild(div_front)
                    //
                    // BACK CONSENT NOTICE
                    let div_back = this.render.layoutElements.back('no_button');
                    div_cookie.appendChild(div_back)
                //
                // Generating COokie Floater Button 
                let floater = this.render.layoutElements.floater()
                    div_cookie_wrapper.after(floater)
                //
                // Generating Consent Bar
                let consent_bar = this.render.layoutElements.consent_bar();
                floater.after(consent_bar)
        },
        // Default Layout
        defaultBannerLayout : () => {
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
                    // FRONT CONSENT NOTICE
                    let div_front = this.render.layoutElements.front();
                    div_cookie.appendChild(div_front)
                    //
                    // BACK CONSENT NOTICE
                    let div_back = this.render.layoutElements.back();
                    div_cookie.appendChild(div_back)
                //
                // Generating COokie Floater Button 
                let floater = this.render.layoutElements.floater()
                    div_cookie_wrapper.after(floater)
                //
                // Generating Consent Bar
                let consent_bar = this.render.layoutElements.consent_bar();
                floater.after(consent_bar)
                    
        },

        layoutElements : {
            front : ()=> {
                // div front
                let div_front = this.create.Element('div', { class: 'front' })
                // div_cookie.appendChild(div_front)
                let front_h1 = document.createElement('h1')
                    front_h1.innerHTML = 'Privacy Preference Center'
                    div_front.appendChild(front_h1)
                let front_p = document.createElement('p')
                    front_p.innerHTML = 'When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to our <a href="https://kessgame.com/privacy.html" id="privacy">Privacy Policy</a>.'
                    div_front.appendChild(front_p)
                let div_front_buttons = this.create.Element('div', { class: 'front__buttons' })
                    div_front.appendChild(div_front_buttons)
                    // buttons
                    let button_allow_front_buttons = this.create.Element('button', { 
                        class: 'front__buttons', 
                        type: 'submit', 
                        id: 'allowCookies'
                    })
                    button_allow_front_buttons.innerHTML = 'Allow All'
                    div_front_buttons.appendChild(button_allow_front_buttons)
    
                    let button_decline_front_buttons = this.create.Element('button', { 
                        class: 'front__buttons', 
                        type: 'submit', 
                        id: 'declineCookies'
                    })
                    button_decline_front_buttons.innerHTML = 'Decline unnecessary cookies'
                    div_front_buttons.appendChild(button_decline_front_buttons)
                // front footer
                let div_front_footer = this.create.Element('div', { class: 'front__footer' })
                div_front.appendChild(div_front_footer)
                    let a_more_cookie = this.create.Element('a', { id: 'more_cookie', href: '#' })
                    a_more_cookie.innerHTML = this.Config.lang.en.consent_cookie_manager_title
                    div_front_footer.appendChild(a_more_cookie)
                return div_front;
            //
            }, // end front
            back_categorized : (back_btn)=> {
                // div back
                let div_back = this.create.Element('div', { class: 'back' })
                // div_cookie.appendChild(div_back)
                    let div_header_cookies = this.create.Element('div', { class: 'header-cookies' })
                    div_back.appendChild(div_header_cookies)
                    //
                        if(back_btn) {
                            let div_back_icons = this.create.Element('div', { class: 'back_icons' })
                            div_header_cookies.appendChild(div_back_icons)
                                let div_back_icon = this.create.Element('div', { class: 'back_icon' })
                                div_back_icons.appendChild(div_back_icon)
                                    this.render.IconBack(div_back_icon)
                        }
                            
                            let div_back_title = this.create.Element('h1', { class: '' })
                            div_back_title.innerHTML = this.Config.lang.en.consent_cookie_manager_title
                            div_header_cookies.appendChild(div_back_title)
                    //
                    // generating categorized form
                    let cookie_options = this.create.Element('form', { class: 'cookie_options' })
                        div_back.appendChild(cookie_options)
                        // generating UL
                        let cookie_options_tab = this.create.Element('ul', { class: 'tab tab_consent_form' })
                        cookie_options.prepend(cookie_options_tab)
                        
                        // strictly necessary cookies default bar
                        // let cookie_li = document.createElement('li')
                        // cookie_options_tab.appendChild(cookie_li)
                        //     let iconPlus = this.create.Element('i', { class: 'fas fa-plus' })
                        //     cookie_li.appendChild(iconPlus)
                        //     let h2_li = document.createElement('h2')
                        //     h2_li.innerHTML = 'Strictly Necessary Cookies'
                        //     cookie_li.appendChild(h2_li)
                        //     let span_badge = this.render.badge('Always Active')
                        //     cookie_li.appendChild(span_badge)
                        // let cookie_li_data = this.create.Element('div', { class: 'data2' })
                        // cookie_options_tab.appendChild(cookie_li_data)
                        //     let cookie_li_data_p = document.createElement('p')
                        //     cookie_li_data_p.innerHTML = 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.'
                        //     cookie_li_data.appendChild(cookie_li_data_p)
                    
                        // Starting Loop Contents Selectors
                        for (let i = 0; i < this.configCookies.length; i++){
                            let purpose = this.configCookies[i].purpose;
                            let cookie_name = this.configCookies[i].label
                            let description = this.configCookies[i].description
                            let title = this.configCookies[i].title
                            let category = this.configCookies[i].purpose
                            let always_active = this.configCookies[i].needed == true ? true : false
                            // let always_active = purpose == 'necessary' ? true : false
                            // console.log(purpose_description)
                            let list_exists = ()=> {
                                let purpose_list = cookie_options_tab.querySelector('li.' + purpose + '_list')
                                // console.log(purpose_list)
                                if (purpose_list != null) {
                                    // console.log('elemento existe')
                                    return 200
                                } else {
                                    // console.log('elemento nao existe')
                                    return 400;
                                }
                            }
                            let get_list = (purpose)=> {
                                let cookie_li = cookie_options_tab.querySelector('li.' + purpose + '_list').nextSibling
                                    return cookie_li;
                            }
                            let create_list = (purpose)=> {
                                // cria elemento li
                                let purpose_name = this.Config.lang.en[purpose].name
                                // let list_desc = this.Config.lang.en[purpose].ie

                                let cookie_li = this.render.layoutElements.li_content(purpose, purpose_name, '')
                                    return cookie_li;
                            }
                            let create_collapsible = (purpose)=> {
                                let cookie_li_data = this.create.Element('div', { class: 'data_category data_' + purpose })
                                    return cookie_li_data
                            }
                            if (list_exists() == 400) { // returning 400 mean this element not exist
                                let cookie_li = create_list(purpose)
                                cookie_options_tab.appendChild(cookie_li) 

                                let cookie_li_data = create_collapsible(purpose)
                                cookie_options_tab.appendChild(cookie_li_data)
                                // todo.. include first list with description
                                let purpose_description = this.Config.lang.en[purpose].description
                                    let list_description = this.create.Element('li', { class: purpose + '_description __ccm-description' })
                                    cookie_li_data.appendChild(list_description)
                                        let span = document.createElement('small')
                                        span.innerHTML = purpose_description
                                        list_description.appendChild(span)

                                let checkbox = this.render.layoutElements.checkbox(title, cookie_name, always_active)
                                cookie_li_data.appendChild(checkbox)
                               
                            } else {
                                // console.log('elemento existe, deve achar o elemento e adicionar a lista do seletor')
                                let cookie_li_data = get_list(purpose)

                                let checkbox = this.render.layoutElements.checkbox(title, cookie_name, always_active)
                                cookie_li_data.appendChild(checkbox)
                            }
                                
                        } // end list loop 
                        
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
                return div_back;
            }, // end back_categorized
            back : (param)=> {
                // div back
                let div_back = this.create.Element('div', { class: 'back' })
                // div_cookie.appendChild(div_back)
                    let div_header_cookies = this.create.Element('div', { class: 'header-cookies' })
                    div_back.appendChild(div_header_cookies)
                        let div_back_icons = this.create.Element('div', { class: 'back_icons' })
                        div_header_cookies.appendChild(div_back_icons)
                            if (param != 'no_button'){
                                // render back button
                                let div_back_icon = this.create.Element('div', { class: 'back_icon' })
                                    div_back_icons.appendChild(div_back_icon)
                                        this.render.IconBack(div_back_icon)
                            }
                            
                            let div_back_title = this.create.Element('h1', { class: '' })
                            div_back_title.innerHTML = this.Config.lang.en.consent_cookie_manager_title
                            div_header_cookies.appendChild(div_back_title)
                    //
                    // generating form
                    let cookie_options = this.create.Element('form', { class: 'cookie_options' })
                        div_back.appendChild(cookie_options)
                        // generating UL
                        let cookie_options_tab = this.create.Element('ul', { class: 'tab tab_consent_form' })
                        cookie_options.prepend(cookie_options_tab)
                            // necessary cookies
                            let cookie_li = this.create.Element('li', { class: '__ccm-list' })
                            cookie_options_tab.appendChild(cookie_li)
                                let iconPlus = this.create.Element('i', { class: 'material-symbols-outlined' })
                                iconPlus.innerHTML = 'add'
                                cookie_li.appendChild(iconPlus)
                                let h2_li = document.createElement('h2')
                                h2_li.innerHTML = 'Strictly Necessary Cookies'
                                cookie_li.appendChild(h2_li)
                                let span_badge = this.render.badge('Always Active', 'default')
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
                            let title = this.configCookies[i].title
                            let category = this.configCookies[i].purpose
                            let necessary = this.configCookies[i].needed
                            // let title = cookie_name == 'giveaway' ? 'Third-Party Cookies' : cookie_name + ' Cookies'
                            let cookie_li = this.create.Element('li', { class: '__ccm-list' })
                            cookie_options_tab.appendChild(cookie_li)
                                let iconPlus = this.create.Element('i', { class: 'material-symbols-outlined' })
                                iconPlus.innerHTML = 'add'
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
                                if(necessary != true) {
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
                                }else {
                                    let status = this.render.badge(this.Config.lang.en.default_statusNecessaryActive, 'status success always_active')
                                    status.setAttribute('id', cookie_name+'_status')
                                    cookie_li.appendChild(status)
                                }
                    
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
                return div_back;
            }, // end back
            floater : ()=> {
                let floater = this.create.Element('div', { class: 'cookie_floater', style: 'display:none' })
                    // div_cookie_wrapper.after(floater)
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
                return floater;
            }, // end floater
            consent_bar : ()=> {
                // Generating Consent Bar
                let consent_bar = this.create.Element('div', { 
                    id: 'cconsent-bar',
                    class: 'collapse',
                    role: 'region',
                    'aria-label': 'Cookie consent',
                    'aria-hidden': false,
                    tabindex: 0
                })
                // floater.after(consent_bar)
                    let cc_wrapper = this.create.Element('div', { class: 'ccb__wrapper'})
                        consent_bar.appendChild(cc_wrapper)
                        // include text
                        let cc_text = this.create.Element('div', { class: 'ccb__text'})
                        let description_text_consent = this.create.Element('p', { class: ''})
                        description_text_consent.innerHTML = this.settings.description
                        // include cookie consent policy
                        if (this.settings.usePrivacyPolicy == 1) {
                            let description_text_consent_policy = this.create.Element('p', { class: 'ccb__policy'})
                            description_text_consent_policy.innerHTML = this.Config.lang.en.default_text_consent_policy + ' <a href="' + this.settings.privacyPage + '" target="_blank">' + this.Config.lang.en.default_consent_policy_link + '</a>'
                            cc_text.appendChild(description_text_consent_policy)
                        }

                        cc_text.prepend(description_text_consent)
                        cc_wrapper.appendChild(cc_text)
                        // include title Notice
                            let cc_title = this.create.Element('div', { class: 'ccb__title'})
                                cc_text.prepend(cc_title)
                                let notice_title = document.createElement('h3')
                                    notice_title.innerHTML = this.Config.lang.en.consent_notice_title
                                    cc_title.prepend(notice_title)

                                    let closeButton = this.settings.closeButton
                                    if (closeButton == true) {
                                        let iconClose = this.create.Element('i', { id: 'ccb__close' , class: 'material-symbols-outlined' })
                                            iconClose.innerHTML = 'close'
                                            cc_title.appendChild(iconClose)
                                    }

                        let cc_left = this.create.Element('div', { class: 'ccb__left'})
                            cc_wrapper.appendChild(cc_left)

                            let cookieSettingsButton = this.settings.cookieSettingsButton
                            if (cookieSettingsButton == true) {
                                let buttonEdit = this.create.Element('button', {
                                    class: 'ccb__edit',
                                    type: 'submit',
                                })
                                buttonEdit.innerHTML = 'Privacy Settings'
                                cc_left.appendChild(buttonEdit)
                            }
                        //
                        let cc_right = this.create.Element('div', { class: 'ccb__right'})
                            cc_wrapper.appendChild(cc_right)
                            let cc_button = this.create.Element('div', { class: 'ccb__button'})
                                cc_right.appendChild(cc_button)
            
                                let rejectButton = this.settings.rejectButton
                                if (rejectButton == true) {
                                    let buttonReject = this.create.Element('button', {
                                        class: 'reject__consent',
                                        type: 'button',
                                        id: 'declineCookies'
                                    })
                                    buttonReject.innerHTML = this.Config.lang.en.consent_btn_reject
                                    cc_button.appendChild(buttonReject)
                                }
                                // let cookieIcon_reject = this.create.Element('span', { class: 'material-symbols-outlined'})
                                //     cookieIcon_reject.innerHTML = 'block'
                                //     buttonReject.prepend(cookieIcon_reject)

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
                return consent_bar;
            }, // end consent_bar
            li_content : (purpose, title, description)=> {
                let cookie_li = this.create.Element('li', { class: purpose + '_list __ccm-list' })
                    // cookie_options_tab.appendChild(cookie_li)
                    let iconPlus = this.create.Element('i', { class: 'material-symbols-outlined' })
                        iconPlus.innerHTML = 'add'
                        cookie_li.appendChild(iconPlus)
                        let divScriptName = this.create.Element('div', { class: 'title' })
                            cookie_li.appendChild(divScriptName)
                                // title
                                let h2_li = document.createElement('h2')
                                    h2_li.innerHTML = this.render.TitleCase(title)
                                    // h2_li.innerHTML = this.render.TitleCase(title)
                                    divScriptName.appendChild(h2_li)
                                    if (purpose == 'necessary') {
                                        let span_badge = this.render.badge('Always Active', 'success always_active')
                                            cookie_li.appendChild(span_badge)
                                        // TODO...
                                        // let span_li = document.createElement('small')
                                        // let description = this.Config.lang.en.necessary
                                        // span_li.innerHTML = description
                                        // divScriptName.appendChild(span_li)
                                    } 
                                        // purposes
                                        let span_li = document.createElement('small')
                                            span_li.innerHTML = description
                                            // span_li.innerHTML = this.render.TitleCase('Purposes: ' + category)
                                            divScriptName.appendChild(span_li)
                return cookie_li;
            }, // end of li_content
            checkbox : (title, cookie_name, necessary = false)=> {
                // let cookie_li_data = this.create.Element('div', { class: 'data_category data_' + purpose })
                // cookie_options_tab.appendChild(cookie_li_data)
                    let cookie_li_data_li = this.create.Element('li', { class: '__ccm-vendor'})
                        // description
                        cookie_li_data_li.innerHTML = this.render.TitleCase(title)
                        // cookie_li_data.appendChild(cookie_li_data_li)
                        // checkbox
                        if (!necessary) {
                            let status = this.render.badge(this.Config.lang.en.default_statusInactive, 'status default')
                            status.setAttribute('id', cookie_name+'_status')
                            cookie_li_data_li.appendChild(status)
                                let label_checkbox = this.create.Element('label', { class: 'custom_checkbox' })
                            cookie_li_data_li.appendChild(label_checkbox)
                            let input_checkbox = this.create.Element('input', { 
                                type: 'checkbox',
                                'data-function': cookie_name,
                                id: 'chk_' + cookie_name,
                            })
                            label_checkbox.appendChild(input_checkbox)
                            let span_toogle = this.create.Element('span', {class: 'toogle'})
                            label_checkbox.appendChild(span_toogle)
                        } else {
                            // necessary lists created without selector
                            let status = this.render.badge(this.Config.lang.en.default_statusNecessaryActive, 'status success always_active')
                            status.setAttribute('id', cookie_name+'_status')
                            cookie_li_data_li.appendChild(status)
                            let label_checkbox = this.create.Element('label', { class: 'custom_checkbox' })
                            cookie_li_data_li.appendChild(label_checkbox)
                            let input_checkbox = this.create.Element('input', { 
                                type: 'checkbox',
                                'data-function': cookie_name,
                                id: 'chk_' + cookie_name,
                                checked: 'checked',
                                disabled: true
                            })
                            label_checkbox.appendChild(input_checkbox)
                        }
                return cookie_li_data_li
            }, // end checkbox list
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
            let value = [...document.querySelectorAll('[data-function]')].filter((el) => el).map((el) => el.getAttribute('data-function'))
            return value;
        },

        list: () => {
            var theCookies = document.cookie.split(';');
            var aString = '';
            for (var i = 1 ; i <= theCookies.length; i++) {
                aString += i + ' ' + theCookies[i-1] + "\n";
            }
            return aString;
        },
        setInfoAvailableApps: ()=> {
            // let manager = document.getElementsByClassName('tab_consent_form')
            let lists = document.querySelectorAll('.data_category')
            for(let i=0 ; lists.length > i ; i++){
                let count_apps = lists[i].childNodes.length - 1
                let available_apps = count_apps + ' App' + (count_apps > 1 ? 's' : '')
                let thisList = lists[i].previousSibling
                let title = thisList.querySelector('.title')
                let small = title.querySelector('small')
                small.innerHTML = available_apps
                // console.log(manager[0].children[i])
            }
        },
        bake: (preferences, action = 'setCookie', form = false) => {
            // prepareCookies tem por padrao a ação de inserir 'setCookie' ex: manage.getCookie('_ga') and delete him
            this.setAllConsent = (value) => {
                // console.log(this.configCookies)
                for (let i=0; i < this.configCookies.length; i++){
                    let n = this.configCookies[i].label
                    // let content = this.configCookies[i][1]
                    // console.log(this.configCookies[i].needed)
                    let needed = this.configCookies[i].needed
                    let verified_value = value
                    this.settings.consent.cookies[n] = {}
                    if (needed == true) {
                        // console.log('this needed')
                        verified_value = true
                        this.settings.consent.cookies[n].needed = verified_value
                    }
                    this.settings.consent.cookies[n].wanted = verified_value
                    // this.Config.consent.cookies[n].script = content.script
                }
            }
            // 
            this.setConsentByForm = (preferences) => {
                // reset all preferences to false before
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
                    // user has declined consent
                    this.manage.clearLocal()
                    this.manage.clearSession()
                    this.consent.clearCookies()
                    this.manage.setLocalStorage(this.defaultConsentName, 0) // declined

                    setTimeout(() => {
                        window.location.reload()
                    }, "1500") 
                }
                if(form === true) {
                    // user has selected the privacy settings on form
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
                this.consent.clearCookies()
                this.setAllConsent(false)
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
    // Starting App...
    //-------------------------------------------------------
    init = () => { 

        //-------------------------------------------------------
        // Default Cookies Settings
        this.Config = new ConfigSetup()
        this.Default = this.Config.default
        //-------------------------------------------------------
        let apiUrl = this.Default.url + this.Default.apiCall
        let getData = fetch(apiUrl + __code);
        this.loadCSSFiles = () => {
            if(this.Default.automaticCreateCSS === true) {
                let css_file = this.Default.useCssCDN === true ? this.Default.cdnUrl + this.Default.cssCDN : this.Default.base_local + this.Default.cssLocal
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

            this.cookieService = (d.status == undefined) ? true : false
            
            if (this.cookieService == true) {
                // console.log(this.cookieService != undefined ? true : false)
                this.validDomain = d.preferences.domain != window.location.hostname ? false : true
                //-------------------------------------------------------
                // Cookies Script Settings
                this.settings = {
                    // General settings
                    name : d.preferences.name === undefined ? this.Default.name : d.preferences.name,
                    prefix : d.preferences.prefix === undefined ? this.Default.prefix : d.preferences.prefix,
                    description: d.preferences.description === undefined ? this.Default.description : d.preferences.description,
                    url: d.preferences.website === undefined ? this.Default.url : d.preferences.website,
                    usePrivacyPolicy: d.preferences.cookie_privacy_policy === undefined ? this.Default.privacyConsentLink : d.preferences.cookie_privacy_policy,
                    privacyPage: d.preferences.privacyPage === undefined ? this.Default.privacy : d.preferences.privacyPage,
                    termsPage: d.preferences.termsPage === undefined ? this.Default.terms : d.preferences.termsPage,
                    expire: d.preferences.expire === undefined ? this.Default.expire : d.preferences.expire,
                    defaultConsent: d.preferences.consent === undefined ? this.Default.consent : d.preferences.consent,
                    useJsCDN: d.preferences.useJsCDN === undefined ? this.Default.useJsCDN : d.preferences.useJsCDN,
                    useCssCDN: d.preferences.useCssCDN === undefined ? this.Default.useCssCDN : d.preferences.useCssCDN,
                    iconPreferences: d.preferences.iconPreferences === undefined ? this.Default.iconPreferences : d.preferences.iconPreferences,
                    layout: d.preferences.layout === undefined ? this.Default.layout : d.preferences.layout,
                    bannerPosition: d.preferences.position === undefined ? this.Default.bannerPosition : d.preferences.position,
                    rejectButton: d.preferences.reject_button === undefined ? this.Default.rejectButton : d.preferences.reject_button,
                    closeButton: d.preferences.close_button === undefined ? this.Default.closeButton : d.preferences.close_button,
                    cookieSettingsButton: d.preferences.cookie_settings_button === undefined ? this.Default.cookieSettingsButton : d.preferences.cookie_settings_button,
                    colors: d.preferences.colors === undefined ? this.Default.colorPreferences : d.preferences.colors,
                    // base_local: d.preferences.base_local === undefined ? this.Default.base_local : d.preferences.base_local,
                    base_local: this.Default.base_local,
                    cssIncludes: (d.preferences.cssIncludes === undefined || d.preferences.cssIncludes < 1) ? this.Default.cssIncludes : d.preferences.cssIncludes,
                    // Consent settings
                    consent : {
                        version: '1.3',
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
                this.defaultCookieName = this.settings.prefix + '_' + this.settings.name.toLowerCase()
                this.configCookies = d.template
                this.validDomain = d.preferences.domain != window.location.hostname ? false : true
                this.domain = d.preferences.domain

                //-------------------------------------------------------
            }

        }).then( () => {
            
            // need validate user account here, check domain and if is a valid user
            if (this.cookieService == true){
                // verify first if cookie service is active
                // after that verify the domain
                if (this.validDomain){
                    
                    console.log('success: valid domain : ' + this.domain + ', loading resources...')
                
                    for (let i = 0; i < this.configCookies.length; i++) {
                        if(this.configCookies[i].content === null){ 
                            console.log('No cookie in use | Error: Cookies consent not configured properly')
                            return false 
                        }
                    }
            
                    // render the html elements
                    const __renderLayout = this.settings.layout

                    const color = JSON.parse(this.settings.colors)
                    // console.log(this.settings.colors)
                    // console.log(color.primary)
                    if (color != null && color != ''){
                        let root = document.querySelector(':root')
                        root.style.setProperty('--primary', color.primary)
                        root.style.setProperty('--primaryLight', color.primaryLight)
                        root.style.setProperty('--background', color.background)
                        root.style.setProperty('--text', color.text)
                    }
                    
                    this.render.CookieSettingsElements(__renderLayout)
                    // set consent bar position based on configs
                    let consentBarNotice = document.getElementById('cconsent-bar')
                    consentBarNotice.classList.add(this.settings.bannerPosition);
                    // let setupPosition = this.settings.bannerPosition
                    // consentBarPosition.style[setupPosition] = 0
                    // console.log(setupPosition)
                    // setting banner consent notice position
                    this.consent.validate(this.defaultCookieName, this.configCookies)
                    this.consent.checkConfig(this.defaultCookieName)

                    //-------------------------------------------------------
                    // Objects Definition
                    //-------------------------------------------------------
                    //-------------------------------------------------------
                    const close = document.querySelector(".close");
                    const cookieWrapper = document.querySelector(".cookie_wrapper");
                    const back = document.querySelector(".back");
                    const cookieFloater = document.querySelector(".cookie_floater");
                    const confirmCookies = document.querySelector('#confirmCookies');
                    const consentGive = document.querySelector(".consent__give")
                    const cookieConsentBar = document.querySelector("#cconsent-bar")
                    //-------------------------------------------------------
                    //-------------------------------------------------------
                    // Coomon Visual Actions
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
                    
                    let cookieSettingsButtonConfig = this.settings.cookieSettingsButton
                    if (cookieSettingsButtonConfig == true) {
                        const cookieSettings = document.querySelector(".ccb__edit")
                        cookieSettings.addEventListener("click", () => {
                            cookieWrapper.style.display = "flex";
                            this.consentBarHide()
                        })
                    }

                    let closeConsentBarButton = this.settings.closeButton
                    if (closeConsentBarButton == true) {
                        const closeConsentBar = document.querySelector("#ccb__close")
                        closeConsentBar.addEventListener("click", () => {
                            cookieConsentBar.classList.add('collapse')
                            this.consentBarHide()
                            this.floaterVisible()
                        })
                    }


                    let rejectButton = this.settings.rejectButton
                    if (rejectButton == true) {
                        const rejectCookies = document.querySelector('.reject__consent');
                        rejectCookies.addEventListener("click", ()=> {
                            this.Data.bake(this.Data.getAllPref(), 'deleteCookie')
                            this.floaterVisible()
                        });
                    }


                    //-------------------------------------------------------
                    // Render layout option particularities start
                    if (__renderLayout != 'simple' && __renderLayout != 'categorized') {
                        const front = document.querySelector(".front");
                        const more = document.querySelector("#more_cookie");
                        const backicon = document.querySelector(".back_icon");
                        const allowCookies = document.querySelector('#allowCookies');
                        const declineCookies = document.querySelector('#declineCookies');
                    
                    //-------------------------------------------------------
                    
                        


                        this.cookieMorePreferences = () => {
                            front.style.display = "none";
                            back.style.display = "flex";
                            // this.consentBarHide()
                            // front.style.display = "flex";
                        }
                        this.cookiePreferences = () => {
                            front.style.display = "flex";
                            back.style.display = "none";
                            // this.consentBarHide()
                            // front.style.display = "flex";
                        }

                        this.privacySettings = () => {
                            back.style.display = "none";
                            front.style.display = "flex";
                        }
                        
                        //-------------------------------------------------------
                
                        // UI Banner Mode
                        back.style.display = "none"; //full notice banner with all options
                        // front.style.display = "none"; //simple banner without front manager notice
                        allowCookies.addEventListener("click", ()=> {
                            this.Data.bake(this.Data.getAllPref(), 'setCookie')
                            this.floaterVisible()
                        });
                
                        declineCookies.addEventListener("click", ()=> {
                            this.Data.bake(this.Data.getAllPref(), 'deleteCookie')
                            this.floaterVisible()
                        });
    
                        more.addEventListener("click", () => {
                            this.cookieMorePreferences()
                        });
                        
                        backicon.addEventListener("click", () => {
                            this.cookiePreferences()
                        });
                        
                    } else { 
                        // layout mode == 'simple'
                        // simple layout should use the front manager page on open privacy settings.
                        this.privacySettings = () => {
                            back.style.display = "flex";
                        }
                    }


                    // Layout mode particularities end
                    //-------------------------------------------------------
                    // control banner collapsible and checkboxes
                    const tab = document.querySelector(".tab");
                    // const liEl = tab.querySelectorAll("li.__ccm-vendor");
                    const liEl = tab.getElementsByClassName("__ccm-list");
                    // const liEl = tab.getElementsByTagName("li");
                    // setup toggle collapsible and status badge
                    for (let i = 0; i < liEl.length; i++) {
                        const element = liEl[i];
                        element.addEventListener("click", function () {
                            const iEl = element.getElementsByTagName("i")[0];
                            const input = element.getElementsByTagName("input")[0];
                            const badge = element.getElementsByClassName("status")[0];
                            const data = element.nextElementSibling;
                            const config = new ConfigSetup()
                            if (iEl.innerHTML == "remove") {
                                iEl.innerHTML = "add";
                            } else {
                                iEl.innerHTML = "remove";
                            }
                            // if (iEl.className == "far fa-minus") {
                            //     iEl.classList.value = "fas fa-plus";
                            // } else {
                            //     iEl.classList.value = "far fa-minus";
                            // }
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
                    // Common Event Listeners
                    //-------------------------------------------------------
            
                    
            
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
                        console.log('c')
                        this.consentBarHide()
                        this.floaterVisible()
                    })

                
                    cookieFloater.addEventListener("click", () => {
                        this.privacySettings()
                        // back.style.display = "flex";
                        // cookieWrapper.style.display = "flex";
                        // cookieFloater.style.display = "none";
                        this.floaterHide()
                    })
                    
                    // const name = this.settings.name === undefined ? Default.name : this.settings.name
                    
                    const c = this.manage.getCookie(this.defaultCookieName)
                    let localCookies = this.manage.localCookies(this.defaultCookieName)
                    let localStorageSettings = this.manage.getLocalStorage(this.defaultConsentName) // check local storage
                    
                    
                    close.addEventListener("click", () => {
                        if (!c && !localStorageSettings){
                            this.consentBarShow() // *(deprecated)
                            // cookieConsentBar.classList.remove('collapse')
                            cookieWrapper.style.display = "none";
                        }else {
                            // cookieWrapper.style.display = "none";
                            // cookieFloater.style.display = "flex";
                            this.floaterVisible()
                        }
                        this.consent.resetSelectors(this.defaultCookieName)
                    })
                    
                    //-------------------------------------------------------
                    // Check local user config to set the first consent notice behaviour based on user preferences
                    //-------------------------------------------------------
                    if (localCookies) { // have cookies preferences
                        if (localCookies.value === false) {
                            // this.consentBarShow()
                            cookieConsentBar.classList.remove('collapse')
                        } else {
                            // this.floaterVisible()
                            cookieWrapper.style.display = "none";
                            cookieFloater.style.display = "flex";
                        }
                    } else if(!c && !localStorageSettings){ // dont have cookies preferences yet
                        this.consentBarShow()
                    } else if(localStorageSettings == 0){ // have preferences and declined all cookies possible
                        this.floaterVisible()

                    }
                    // } else {
                    //     // this.consentBarShow()
                    //     if (localStorageSettings == 0){
                    //         this.floaterVisible()
                    //     }else {
                    //         cookieConsentBar.classList.remove('collapse')
                    //     }
                    // }
            
                    this.resize()

                    //-------------------------------------------------------

                }
                else {
                    console.log('error: Not valid domain, please check cookies config or contact website support')
                    return false
                }
                //
                //-------------------------------------------------------
                //
            }

        }).catch(function(error) {  
            console.log('Request failed', error)  
        });

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
                '_gtm',
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
                default_statusNecessaryActive : 'Always Active',
                consent_notice_title : 'Notice',
                default_text_consent_policy : 'Please check our',
                default_consent_policy_link : 'Cookie Policy',
            // Form
                consent_bar_message : 'This website uses cookies to ensure you get the best experience on our website.',
                consent_btn_accept : 'Accept Cookies',
                consent_btn_reject : 'Reject',
                consent_btn_confirm: 'Save Settings',
                consent_cookie_manager_title: 'Manage Consent Privacy Settings',
            // Consent Lang Variables
            // Script Purpose Descriptions and tagnames
                necessary : {
                    name: 'Strictly necessary',
                    description : 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
                    ie : 'ie. Account login related cookies',
                },
                functionality : {
                    name: 'Functionality',
                    description: 'These cookies allow the site to provide enhanced functionality and personalisation. They may be set by us or by external suppliers whose services we have added to our pages. If you do not allow these cookies some or all of these features may not work properly.',
                    ie : 'ie. remembering users choices',
                },
                tracking : {
                    name: 'Tracking and Performance',
                    description: 'These cookies allow us to count visits and traffic sources so that we can measure and improve the performance of our website. They help us to know which pages are the most and least popular and to see how visitors move around the website. All information collected by these cookies is aggregated and therefore anonymous. If you do not allow these cookies, we will not know when you have visited our site.',
                    ie : 'ie. Google Analytics',
                },
                targeting : {
                    name: 'Targeting and Advertising',
                    description : 'These cookies may be set through our website by our advertising partners. They may be used by these companies to build a profile about your interests and show you relevant ads on other websites. They do not directly store personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will get less targeted advertising.',
                    ie : 'ie. Google AdSense',
                },
                
            }
        },

        this.default = {
            name: 'Cookie Consent Master',
            prefix: '_ccm',
            bannerPosition: 'bottom',
            url: 'https://vorgi.com/', // main url to get api call in this case, same base_url of system config
            // @developing-mode
            // url: 'http://localhost/develop/clientes/dev/cookies_consent_master/', 
            // url for @developing-mode
            urlProject: 'https://github.com/marc310/cookie-consent/',
            apiCall: 'api/cookies/property/code/',
            description: 'Cookie notice bars are not enough!',
            layout: 'default',
            rejectButton: 1,
            closeButton: 0,
            cookieSettingsButton: 1,
            colorPreferences: { primary: '#00aabb', text: '#ffffff', background: '#000000'},
            privacyConsentLink: 0,
            terms: 'terms.html',
            privacy: 'privacy.html',
            iconPreferences: 'https://cdn.jsdelivr.net/gh/marc310/cookie-consent@main/assets/img/cookie_1f36a.png',
            // cdnUrl: 'https://cdn.jsdelivr.net/gh/marc310/cookie-consent@main/api/v1.2.6/',
            cdnUrl: 'http://localhost/develop/clientes/dev/cookies_consent_master/src/plugins/cookies-consent/dev/v1.2.8/', // developing
            cssCDN: 'assets/css/cookies.css',
            jsCDN: 'assets/js/Cookie.js',
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
Cookie.init()
