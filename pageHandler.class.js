class PageHandler {
  mainElement;
  dropdownMenu;
  menu;
  menuBtn;
  faviconElement;
  faviconElementPhone;

  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.init();
    });
  }

  includeHTML() {
    var z, i, file, xhttp;
    var requests = [];
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      let elmnt = z[i]; // move the scope of `elmnt` here
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        var request = new Promise((resolve, reject) => {
          // use arrow function to maintain the context of `this`
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
              if (this.status == 200) {
                elmnt.innerHTML = this.responseText;
              }
              if (this.status == 404) {
                elmnt.innerHTML = "Page not found.";
              }
              elmnt.removeAttribute("w3-include-html");
              resolve();
            }
          };
          xhttp.open("GET", file, true);
          xhttp.send();
        });
        requests.push(request);
      }
    }
    return Promise.all(requests);
  }

  getElements() {
    this.dropdownMenu = document.querySelector(".dropdown");
    this.showDropdown = document.querySelector(".dropdown-menu");
    this.mainElement = document.querySelector("main");
  }

  async init() {
    await this.includeHTML();
    this.getElements();
    this.faviconLightOrDarkmode();
    this.blurBackgroundHover();
    this.placeFooterAtBottom();
  }

  blurBackgroundHover() {
    this.dropdownMenu.addEventListener("mouseover", () => {
      this.addBlurredBackground();
      document.querySelectorAll(".animated_header_nav").forEach((e) => {
        e.style.filter = "blur(3px)";
      });
    });

    this.dropdownMenu.addEventListener("mouseout", () => {
      this.removeBlurredBackground();
      document.querySelectorAll(".animated_header_nav").forEach((e) => {
        e.style.filter = "blur(0px)";
      });
    });
  }

  addBlurredBackground() {
    this.mainElement.style.filter = "blur(3px)";
    // this.mainElement.style.transition = "filter 125ms ease-in-out";
  }

  removeBlurredBackground() {
    this.mainElement.style.filter = "blur(0px)";
    this.mainElement.style.backgroundColor = "";
    // this.mainElement.style.transition = "filter 125ms ease-in-out";
  }

  placeFooterAtBottom() {
    let footer = document.querySelector("#footer_scroll");
    let body = document.body;
    let bodyHeight = Math.max(body.scrollHeight, body.offsetHeight);
    if (bodyHeight < window.innerHeight) {
      footer.style.position = "fixed";
      footer.style.bottom = "0";
      footer.style.width = "100%";
    } else {
      footer.style.position = "static";
    }
  }

  faviconLightOrDarkmode() {
    this.faviconElement = document.querySelector(".favicon");
    this.faviconElementPhone = document.querySelector(".favicon-phone");
    if (this.isDarkMode()) {
      this.faviconElement.href = "./favicon/dark/favicon.ico";
      this.faviconElementPhone.href = "./favicon/dark/apple-touch-icon.png";
    } else {
      this.faviconElement.href = "./favicon/light/favicon.ico";
      this.faviconElementPhone.href = "./favicon/light/apple-touch-icon.png";
    }
  }

  isDarkMode() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
}

let handler = new PageHandler();
