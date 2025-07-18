// News loader for Block Merge City
document.addEventListener("DOMContentLoaded", function () {
  loadNews();
});

async function loadNews() {
  try {
    const response = await fetch("./js/news-data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const newsContainer = document.getElementById("news-container");

    if (!newsContainer) {
      console.warn("News container not found");
      return;
    }

    // Clear existing content
    newsContainer.innerHTML = "";

    // Create news sections
    data.sections.forEach((section) => {
      const sectionElement = createNewsSection(section);
      newsContainer.appendChild(sectionElement);
    });

    console.log("News loaded successfully");
  } catch (error) {
    console.error("Error loading news:", error);
    // Fallback to static content if JSON fails
    loadFallbackNews();
  }
}

function createNewsSection(section) {
  const sectionElement = document.createElement("section");
  sectionElement.className = "news-section";
  sectionElement.id = section.id;

  const titleElement = document.createElement("h2");
  titleElement.className = "news-title";
  titleElement.textContent = section.title;

  const newsListElement = document.createElement("div");
  newsListElement.className = "news-list";

  // Create news items
  section.items.forEach((item) => {
    const newsItemElement = createNewsItem(item);
    newsListElement.appendChild(newsItemElement);
  });

  sectionElement.appendChild(titleElement);
  sectionElement.appendChild(newsListElement);

  return sectionElement;
}

function createNewsItem(item) {
  const newsItemElement = document.createElement("div");
  newsItemElement.className = "news-item";

  const titleElement = document.createElement("div");
  titleElement.className = "news-item-title";
  titleElement.textContent = item.title;

  const shortElement = document.createElement("div");
  shortElement.className = "news-item-short";
  shortElement.textContent = item.short;

  const dateElement = document.createElement("div");
  dateElement.className = "news-item-date";
  dateElement.textContent = item.date || "";

  const buttonElement = document.createElement("button");
  buttonElement.className = "read-more-btn";
  buttonElement.textContent = "Read more";

  const fullElement = document.createElement("div");
  fullElement.className = "news-item-full";
  fullElement.style.display = "none";
  fullElement.innerHTML = item.full;

  // Add image if exists
  if (item.image) {
    const imgElement = document.createElement("img");
    imgElement.src = item.image;
    imgElement.alt = item.imageAlt || item.title;
    imgElement.className = "news-item-img";
    imgElement.style.cssText = `
      display: block;
      margin: 1.2em auto 0 auto;
      max-width: 180px;
      border-radius: 16px;
      box-shadow: 0 2px 12px #0002;
    `;
    fullElement.appendChild(imgElement);
  }

  // Add click handler for button
  buttonElement.addEventListener("click", function () {
    const fullContent = this.nextElementSibling;
    if (fullContent.style.display === "none") {
      fullContent.style.display = "block";
      this.textContent = "Read less";
    } else {
      fullContent.style.display = "none";
      this.textContent = "Read more";
    }
  });

  newsItemElement.appendChild(titleElement);
  newsItemElement.appendChild(shortElement);
  newsItemElement.appendChild(dateElement);
  newsItemElement.appendChild(buttonElement);
  newsItemElement.appendChild(fullElement);

  return newsItemElement;
}

function loadFallbackNews() {
  const newsContainer = document.getElementById("news-container");
  if (!newsContainer) return;

  const fallbackContent = `
    <section class="news-section" id="game-updates-section">
      <h2 class="news-title">Game Updates</h2>
      <div class="news-list">
        <div class="news-item">
          <div class="news-item-title">New Building Types Added!</div>
          <div class="news-item-short">
            Discover 15 brand new building types with unique merge mechanics and stunning designs.
          </div>
          <button class="read-more-btn">Read more</button>
          <div class="news-item-full" style="display: none">
            We're excited to announce the release of 15 brand new building types in Block Merge City! Each new building introduces unique merge mechanics, stunning visual designs, and strategic gameplay elements that will test your city planning skills like never before.
          </div>
        </div>
      </div>
    </section>
  `;

  newsContainer.innerHTML = fallbackContent;

  // Add event listeners to fallback buttons
  const buttons = newsContainer.querySelectorAll(".read-more-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const fullContent = this.nextElementSibling;
      if (fullContent.style.display === "none") {
        fullContent.style.display = "block";
        this.textContent = "Read less";
      } else {
        fullContent.style.display = "none";
        this.textContent = "Read more";
      }
    });
  });

  console.log("Fallback news loaded");
}
