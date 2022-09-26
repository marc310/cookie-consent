# cookie-consent
 

# Let's Get Started

Optional ways, using local file or include script using CDN to get the latest and updated version
CDN: https://cdn.jsdelivr.net/gh/marc310/cookie-consent@main/assets/js/cookies.core.js
include also the css file https://cdn.jsdelivr.net/gh/marc310/cookie-consent@main/assets/css/cookies.css

set preferences creating an javascript object on script tag before the core script

In this Object take attention at the script specification

> script null : means the script not will be loaded, and the code will search on DOM by the cookie name
    
> script true : means the script will be created in the DOM and loaded on header
    
> script false : that means the script will be loaded on target to call this target should use the id on element named with sufix cookie.name + '_script' ex: giveaway_script

> the script null && AnalyticsCode || FacebookCode mean the script should construct the analytics or facebook script code and you just need give the user_id like on example...

> 
    const Config = {
        
        Cookies : {
            template: {
                analytics: {
                    title: 'Google Analytics',
                    category: 'Analytics',
                    AnalyticsCode: 'UA-145014090-1', // 
                    description: 'These cookies allow us or our third-party analytics providers to collect information and statistics on use of our services by you and other visitors. This information helps us to improve our services and products for the benefit of you and others.',
                    script: null, // script null means the script not will be loaded, and the code will search on DOM by the cookie name
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
                expire: 15

            },
        },

    }

this setting change everything in how the script will be loaded

# Configure your Tags (deprecated)
if using any script should have any extra tag like analytics configure giving a name tag for him like this example
> scriptTag : value true for using extra tag should be configured on 'Cookies.config'

> <!-- Global site tag (gtag.js) - Google Analytics -->
    <script id="analytics" async src="https://www.googletagmanager.com/gtag/js?id=UA-145014090-1"></script>
    <script id="analytics_script">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-145014090-1');
    </script>

# For Target Scripts
if you using any script should be inserted on body page you will need configure him giving a id for any div to give a target for the script know where should insert the script code
> 
    <div id="giveaway_script"></div>

# Cookie Saved JSON on Local Machine 
: this is an example of the JSON Cookie infos saved on local machine used by script to configure the page exibition

> 
    {
        name: 'Kess', 
        timestamp: 1663883349107, 
        value: true, 
        cookies: {
            analytics: {
                script: null
                wanted: true
                }
            giveaway: {
                script: false
                wanted: true
                }
            marketing: {
                script: true
                wanted: true
                }
        }
    }
    