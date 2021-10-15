const conf = require('config');



module.exports = {
    getText: (textId) => {
        return module.privates.getTextForCurrentLang(textId);
    }
};

module.privates = {
    getLang: (textId) => {
        return module.privates.getCurrentLanguage(textId);
    },
    getCurrentLanguage: (textId) => {
        if (! (conf.currentLanguage && module.privates.texts[conf.currentLanguage])) {
            conf.currentLanguage = 'EN';
        }
        return conf.currentLanguage;
    },

    getText: (textId) => {
        return getTextForCurrentLang(textId);
    },

    getTextForCurrentLang: (textId) => {
        if (! conf.currentLanguage) {
            conf.currentLanguage = 'EN';
        }

        return module.privates.getTextByLang(conf.currentLanguage, textId);
    },

    getTextByLang: (langSpec, textId) => {
        if (langSpec == "EN") {
            return textId;
        }

        if (! module.privates.texts[langSpec]) {
            return textId;
        }

        let s = module.privates.texts[langSpec][textId];
        if (! s) {
            s = '';
        }
        return s;
    },

    texts: {
        "FR": {
            "Test text in English": "Texte de test en Français",
            "": "",
            "": ""
        }
    }
};

console.log();
console.log("Current language: " + ((conf.currentLanguage && module.privates.texts[conf.currentLanguage]) ? conf.currentLanguage : 'EN'));
