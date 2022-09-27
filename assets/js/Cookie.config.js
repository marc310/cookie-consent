

//-------------------------------------------------------
// Cookies Config Section
//
export const Cookies = {
    //-------------------------------------------------------
    // Cookies Template Configuration
    template: {
        analytics: {
            title: 'Google Analytics',
            category: 'Analytics',
            ga_code: 'UA-145014090-1',
            description: 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            script: null, // script null means the script not will be loaded, and the code will search on DOM by the cookie name
            // wanted: true
            // scriptTag: true,
        },
        statcounter: {
            title: 'Stat Counter',
            category: 'Performance',
            sc_project: '12799177',
            sc_security: 'cef97f6c',
            sc_invisible: 0,
            sc_text: 3,
            description: 'tracking cookies test with statcounter',
            script: null,
        },
        marketing: {
            title: 'Share This',
            category: 'Marketing',
            src: "https://platform-api.sharethis.com/js/sharethis.js#property=63117cee0b5e930012a9c414&product=sop",
            description: 'These cookies allow us or our Marketing Share-This provider to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            script: true, // true means the script will be created in the DOM and loaded on header
        },
        giveaway: {
            title: 'Giveaway',
            category: 'Marketing',
            src: "https://widget.gleamjs.io/e.js",
            description: 'These cookies allow us or our third-party giveaway providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
            script: false, // that means the script will be loaded on target to call this target should use the id on element named with sufix cookie.name + '_script' ex: giveaway_script
        }
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
// Lang Package
export const lang = {
    en: {
    //-------------------------------------------------------
    // General
        default_statusInactive : 'Off',
        default_statusActive : 'Active',
    }
}
// Lang end
//-------------------------------------------------------


