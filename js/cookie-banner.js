// Логіка банера cookies для Block Merge City
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  if (!banner) {
    console.warn("Cookie banner element not found");
    return;
  }

  // Перевіряємо чи користувач вже прийняв куки
  const hasConsent = localStorage.getItem("cookieConsent");

  console.log("Cookie banner check:", { hasConsent, banner: !!banner });

  if (!hasConsent) {
    // Спочатку встановлюємо базові стилі
    banner.style.display = "flex";
    banner.style.opacity = "0";
    banner.style.transform = "translateY(100%)";
    banner.style.transition = "none";

    // Примусово показуємо банер
    banner.style.visibility = "visible";
    banner.style.position = "fixed";
    banner.style.bottom = "0";
    banner.style.left = "0";
    banner.style.right = "0";
    banner.style.zIndex = "1000";

    // Плавна анімація появи
    setTimeout(() => {
      banner.style.transition = "all 0.5s ease-out";
      banner.style.opacity = "1";
      banner.style.transform = "translateY(0)";
    }, 100);

    console.log("Cookie banner should be visible now");
  } else {
    console.log("User has already accepted cookies");
  }

  // Обробник кнопки "Accept All"
  const acceptBtn = banner.querySelector(".cookie-banner__accept");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      console.log("Accept button clicked");

      // Зберігаємо згоду
      localStorage.setItem("cookieConsent", "accepted");
      localStorage.setItem("cookieConsentDate", new Date().toISOString());

      // Плавно приховуємо банер
      banner.style.transition = "all 0.3s ease-in";
      banner.style.opacity = "0";
      banner.style.transform = "translateY(100%)";

      setTimeout(() => {
        banner.style.display = "none";
        banner.style.visibility = "hidden";
      }, 300);

      console.log("Cookies accepted for Block Merge City");
    });
  }

  // Обробник посилання на політику куків
  const policyLink = banner.querySelector(".cookie-banner__link");
  if (policyLink) {
    policyLink.addEventListener("click", function (e) {
      // Відкриваємо політику в новій вкладці
      e.preventDefault();
      window.open(this.href, "_blank", "width=800,height=600");
    });
  }

  // Додаткові функції для роботи з куками
  window.cookieConsent = {
    // Перевірити чи є згода
    hasConsent: function () {
      return localStorage.getItem("cookieConsent") === "accepted";
    },

    // Отримати дату згоди
    getConsentDate: function () {
      return localStorage.getItem("cookieConsentDate");
    },

    // Скинути згоду (для тестування)
    resetConsent: function () {
      localStorage.removeItem("cookieConsent");
      localStorage.removeItem("cookieConsentDate");
      location.reload();
    },

    // Примусово показати банер (для тестування)
    forceShow: function () {
      banner.style.display = "flex";
      banner.style.opacity = "1";
      banner.style.transform = "translateY(0)";
      banner.style.visibility = "visible";
    },
  };
});
