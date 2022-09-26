

const Config = {

    Cookies : {
        
        template: {
            analytics: {
                title: 'Google Analytics',
                category: 'Analytics',
                AnalyticsCode: 'UA-145014090-1',
                description: 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
                script: null, // script null means the script not will be loaded, and the code will search on DOM by the cookie name
                // wanted: true
                // scriptTag: true,
            },
            statcounter: {
                title: 'Stat Counter',
                category: 'Performance',
                src: 'https://statcounter.com/counter/counter.js',
                description: 'tracking cookies test with statcounter',
                script: true,
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

        preferences: {
            name: 'Kess',
            website: 'https://kessgame.com/',
            expire: 15,
            description: 'Cookie notice bars are not enough!',
            terms: 'terms.html',
            privacy: 'privacy.html',
        },
    },

}