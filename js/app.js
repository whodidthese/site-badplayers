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

    const carousel = document.querySelector("[data-carousel]");

    if (carousel) {
        const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
        const dots = Array.from(carousel.querySelectorAll("[data-slide-to]"));
        const previousButton = carousel.querySelector("[data-carousel-prev]");
        const nextButton = carousel.querySelector("[data-carousel-next]");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let currentSlide = 0;
        let rotationTimer = null;
        let carouselIsVisible = false;
        let pointerStartX = null;

        function renderSlide(nextIndex, userInitiated) {
            currentSlide = (nextIndex + slides.length) % slides.length;

            slides.forEach(function (slide, index) {
                const isActive = index === currentSlide;
                slide.classList.toggle("is-active", isActive);
                slide.classList.toggle("is-before", index < currentSlide);
                slide.classList.toggle("is-after", index > currentSlide);
                slide.setAttribute("aria-hidden", String(!isActive));
            });

            dots.forEach(function (dot, index) {
                const isActive = index === currentSlide;
                dot.classList.toggle("is-active", isActive);
                dot.setAttribute("aria-selected", String(isActive));
                dot.tabIndex = isActive ? 0 : -1;
            });

            if (userInitiated) scheduleRotation(8500);
        }

        function stopRotation() {
            window.clearTimeout(rotationTimer);
            rotationTimer = null;
        }

        function scheduleRotation(delay) {
            stopRotation();
            if (reducedMotion.matches || !carouselIsVisible || document.hidden || carousel.matches(":hover") || carousel.contains(document.activeElement)) return;
            rotationTimer = window.setTimeout(function () {
                renderSlide(currentSlide + 1, false);
                scheduleRotation(6200);
            }, delay || 6200);
        }

        if (previousButton) previousButton.addEventListener("click", function () { renderSlide(currentSlide - 1, true); });
        if (nextButton) nextButton.addEventListener("click", function () { renderSlide(currentSlide + 1, true); });

        dots.forEach(function (dot) {
            dot.addEventListener("click", function () { renderSlide(Number(dot.dataset.slideTo), true); });
        });

        carousel.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                renderSlide(currentSlide - 1, true);
            }
            if (event.key === "ArrowRight") {
                event.preventDefault();
                renderSlide(currentSlide + 1, true);
            }
        });

        carousel.addEventListener("pointerdown", function (event) {
            if (event.pointerType !== "mouse") pointerStartX = event.clientX;
        });

        carousel.addEventListener("pointerup", function (event) {
            if (pointerStartX === null) return;
            const distance = event.clientX - pointerStartX;
            pointerStartX = null;
            if (Math.abs(distance) < 48) return;
            renderSlide(currentSlide + (distance < 0 ? 1 : -1), true);
        });

        carousel.addEventListener("mouseenter", stopRotation);
        carousel.addEventListener("mouseleave", function () { scheduleRotation(3000); });
        carousel.addEventListener("focusin", stopRotation);
        carousel.addEventListener("focusout", function () { scheduleRotation(3000); });
        document.addEventListener("visibilitychange", function () { scheduleRotation(3000); });
        reducedMotion.addEventListener("change", function () { scheduleRotation(3000); });

        const carouselObserver = new IntersectionObserver(function (entries) {
            carouselIsVisible = entries[0].isIntersecting;
            scheduleRotation(2400);
        }, { threshold: 0.35 });

        carouselObserver.observe(carousel);
        renderSlide(0, false);
    }

    const year = document.getElementById("current-year");
    if (year) year.textContent = String(new Date().getFullYear());
})();
