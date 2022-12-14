

//-------------------------------------------------------
// Cookies Config Section
//
export const Cookies = {
    //-------------------------------------------------------
    // Starting Cookies Template Configuration
    template: {
    //-------------------------------------------------------
    // start templates below

        analytics: {
            title: 'Google Analytics',
            category: 'Analytics',
            ga_code: 'UA-145014090-1',
            description: 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            // new meaning: to load an specific script model **check scriptTypeList
            // old null
            script: 'analytics', // script null means the script not will be loaded, and the code will search on DOM by the cookie name
            // wanted: true
            // scriptTag: true,
        },

        //-------------------------------------------------------

        statcounter: {
            title: 'Stat Counter',
            category: 'Performance',
            sc_project: '12799177',
            sc_security: 'cef97f6c',
            sc_invisible: 0,
            sc_text: 3,
            description: 'tracking cookies test with statcounter',
            // new meaning: to load an specific script model **check scriptTypeList
            // old null
            script: 'statcounter',
        },

        //-------------------------------------------------------

        share_this: {
            title: 'Share-This Cookies',
            category: 'Marketing',
            src: 'https://platform-api.sharethis.com/js/sharethis.js#property=63117cee0b5e930012a9c414&product=sop',
            description: 'These cookies allow us or our Marketing Share-This provider to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            // new meaning: to load script on header should call 'head'
            // old true
            // if this script config not exist will be set by default to create script on header
            // script: 'head', // true means the script will be created in the DOM and loaded on header
        },
        
        //-------------------------------------------------------

        giveaway: {
            title: 'Giveaway Third-party-cookies',
            category: 'Marketing',
            target: 'giveaway_section',
            src: 'https://widget.gleamjs.io/e.js',
            button: '<a class="e-widget no-button" href="https://gleam.io/smhaJ/suprise-giveaway" rel="nofollow">Suprise Giveaway</a>',
            description: 'These cookies allow us or our third-party giveaway providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            // new meaning: to load script on target should call 'custom'
            // old false
            script: 'custom', // that means the script will be loaded on target to call this target should use the id on element named with sufix cookie.name + '_script' ex: giveaway_script
        }

    // templates end
    //-------------------------------------------------------
    },
    
    //-------------------------------------------------------
    // Preferences Setup
    preferences: {

        name: 'Kess',

        website: 'https://kessgame.com/',

        expire: 15,

        description: 'Cookie notice bars are not enough!',

        terms: 'terms.html',

        privacy: 'privacy.html',

        useJsCDN: false,

        useCssCDN: false,

        consent: true,

        // cssIncludes: [

        // ],

    },
    // Preferences end
    //-------------------------------------------------------

}
//  Cookies end
//-------------------------------------------------------



//-------------------------------------------------------
// Banned list 
// will give a list to script search and delete after user decline the consents
export const bannedList = {
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
}
// Banned list end
//-------------------------------------------------------
    

//-------------------------------------------------------
// Language Package
export const lang = {
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
}
// Lang end
//-------------------------------------------------------


