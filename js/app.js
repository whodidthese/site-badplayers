(function () {
    "use strict";

    const supportedLanguages = ["en", "zh", "ja", "ko"];
    const languageLabels = { en: "EN", zh: "繁", ja: "日", ko: "한" };
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const picker = document.querySelector(".language-picker");
    const pickerButton = document.querySelector(".language-button");
    const menu = document.querySelector(".language-menu");
    const currentLabel = document.querySelector(".language-current");

    function getTranslation(dictionary, path) {
        return path.split(".").reduce(function (value, key) {
            return value && value[key] !== undefined ? value[key] : undefined;
        }, dictionary);
    }

    function normalizeLanguage(value) {
        const language = String(value || "").toLowerCase();
        if (language.startsWith("zh")) return "zh";
        if (language.startsWith("ja")) return "ja";
        if (language.startsWith("ko")) return "ko";
        return "en";
    }

    function setMetaContent(element, content) {
        if (element && content) element.setAttribute("content", content);
    }

    function applyLanguage(language, persist) {
        const nextLanguage = supportedLanguages.includes(language) ? language : "en";
        const dictionary = AppConfig.locales[nextLanguage] || AppConfig.locales.en;

        const isPrivacyPage = document.body.dataset.page === "privacy";
        const pageTitle = isPrivacyPage ? dictionary.policy.title + " — Badplayers" : dictionary.meta.title;
        const pageDescription = isPrivacyPage ? dictionary.policy.intro : dictionary.meta.description;

        document.documentElement.lang = nextLanguage === "zh" ? "zh-Hant" : nextLanguage;
        document.title = pageTitle;
        setMetaContent(metaDescription, pageDescription);
        setMetaContent(ogTitle, pageTitle);
        setMetaContent(ogDescription, pageDescription);
        setMetaContent(twitterTitle, pageTitle);
        setMetaContent(twitterDescription, pageDescription);

        document.querySelectorAll("[data-i18n]").forEach(function (element) {
            const translation = getTranslation(dictionary, element.dataset.i18n);
            if (typeof translation === "string") element.textContent = translation;
        });

        document.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
            const translation = getTranslation(dictionary, element.dataset.i18nAlt);
            if (typeof translation === "string") element.setAttribute("alt", translation);
        });

        document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
            const translation = getTranslation(dictionary, element.dataset.i18nAria);
            if (typeof translation === "string") element.setAttribute("aria-label", translation);
        });

        if (currentLabel) currentLabel.textContent = languageLabels[nextLanguage];
        document.querySelectorAll("[data-lang]").forEach(function (button) {
            button.setAttribute("aria-checked", String(button.dataset.lang === nextLanguage));
        });

        if (persist) {
            try {
                localStorage.setItem("badplayers-language", nextLanguage);
            } catch (error) {
                // Language persistence is optional when browser storage is unavailable.
            }
        }
    }

    function closeMenu() {
        if (!menu || !pickerButton) return;
        menu.hidden = true;
        pickerButton.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
        if (!menu || !pickerButton) return;
        menu.hidden = false;
        pickerButton.setAttribute("aria-expanded", "true");
        const selected = menu.querySelector('[aria-checked="true"]');
        if (selected) selected.focus();
    }

    let storedLanguage = null;
    try {
        storedLanguage = localStorage.getItem("badplayers-language");
    } catch (error) {
        storedLanguage = null;
    }

    applyLanguage(storedLanguage || normalizeLanguage(navigator.language), false);

    if (pickerButton && menu) {
        pickerButton.addEventListener("click", function () {
            if (menu.hidden) openMenu(); else closeMenu();
        });

        menu.addEventListener("click", function (event) {
            const option = event.target.closest("[data-lang]");
            if (!option) return;
            applyLanguage(option.dataset.lang, true);
            closeMenu();
            pickerButton.focus();
        });

        document.addEventListener("click", function (event) {
            if (picker && !picker.contains(event.target)) closeMenu();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
                pickerButton.focus();
            }
        });
    }

    const year = document.getElementById("current-year");
    if (year) year.textContent = String(new Date().getFullYear());
})();
