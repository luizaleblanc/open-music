const html = document.documentElement;
const toggleThemeButton = document.getElementById("toggleThemeButton");

toggleThemeButton.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  html.classList.toggle("dark-mode");

  const themeModeIcon = document.getElementById("themeModeIcon");

  if (html.classList.contains("dark-mode")) {
    localStorage.setItem("@openMusic:darkMode", "true");
    themeModeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    localStorage.setItem("@openMusic:darkMode", "false");
    themeModeIcon.classList.replace("fa-moon", "fa-sun");
  }
}

function loadTheme() {
  const isDarkMode = localStorage.getItem("@openMusic:darkMode") === "true";

  const themeModeIcon = document.createElement("i");
  themeModeIcon.id = "themeModeIcon";
  themeModeIcon.classList.add("fa-solid");

  if (isDarkMode) {
    html.classList.add("dark-mode");
    themeModeIcon.classList.add("fa-moon");
  } else {
    html.classList.remove("dark-mode");
    themeModeIcon.classList.add("fa-sun");
  }

  toggleThemeButton.appendChild(themeModeIcon);
}

loadTheme();
