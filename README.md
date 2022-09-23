# cookie-consent
 
set preferences creating an javascript object on script tag before the core script

In this Object take attention at the script specification

> script null : means the script not will be loaded, and the code will search on DOM by the cookie name
    
> script true : means the script will be created in the DOM and loaded on header
    
> script false : that means the script will be loaded on target to call this target should use the id on element named with sufix cookie.name + '_script' ex: giveaway_script



> 
    const Cookies = {
        preferences: {
            name: 'Example',
            website: 'https://example.com/'
        },
        config: {
            analytics: {
                description: 'annotation description for item',
                script: null, // script null means the script not will be loaded, and the code will search on DOM by the cookie name
                scriptTag: true,
                wanted: true
            },
            marketing: {
                src: "https://platform-api.sharethis.com/js/sharethis.js#property=63117cee0b5e930012a9c414&product=sop",
                description: 'annotation description for item',
                script: true, // true means the script will be created in the DOM and loaded on header
                wanted: true
            },
            giveaway: {
                src: "https://widget.gleamjs.io/e.js",
                description: 'annotation description for item',
                script: false, 
                // that means the script will be loaded on target to call this target should use the id on element named with sufix cookie.name + '_script' ex: giveaway_script
                wanted: true
            }
        }
    }

this setting change everything in how the script will be loaded

# Configure your Tags
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
        domain: 'https://kessgame.com/'
        date: '2022/9/22', 
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
    