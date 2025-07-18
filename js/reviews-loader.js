// Reviews loader for Block Merge City
document.addEventListener("DOMContentLoaded", function () {
  loadReviews();
});

async function loadReviews() {
  try {
    const response = await fetch("./js/reviews.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const reviewsContainer = document.getElementById("reviews-container");

    if (!reviewsContainer) {
      console.warn("Reviews container not found");
      return;
    }

    // Clear existing content
    reviewsContainer.innerHTML = "";

    // Create review elements
    data.reviews.forEach((review, index) => {
      const reviewElement = createReviewElement(review, index);
      reviewsContainer.appendChild(reviewElement);
    });

    console.log("Reviews loaded successfully");
  } catch (error) {
    console.error("Error loading reviews:", error);
    // Fallback to static content if JSON fails
    loadFallbackReviews();
  }
}

function createReviewElement(review, index) {
  const reviewDiv = document.createElement("div");
  reviewDiv.className = "review";
  reviewDiv.style.animationDelay = `${index * 0.1}s`;

  reviewDiv.innerHTML = `
    ${review.stars}<br />
    "${review.text}"<span class="review-user">${review.user}</span>
  `;

  return reviewDiv;
}

function loadFallbackReviews() {
  const reviewsContainer = document.getElementById("reviews-container");
  if (!reviewsContainer) return;

  const fallbackReviews = [
    {
      stars: "⭐️⭐️⭐️⭐️⭐️",
      text: "Amazing city building mechanics! Watching my small houses merge into skyscrapers is incredibly satisfying!",
      user: "CityBuilder_Pro",
    },
    {
      stars: "⭐️⭐️⭐️⭐️⭐️",
      text: "The merge system is pure genius! Every successful combination feels like a major achievement!",
      user: "MergeMaster",
    },
    {
      stars: "⭐️⭐️⭐️⭐️⭐️",
      text: "Perfect puzzle game! The isometric view makes city planning so intuitive and fun!",
      user: "PuzzleQueen",
    },
    {
      stars: "⭐️⭐️⭐️⭐️⭐️",
      text: "Strategic depth with simple controls. Great for all ages and skill levels!",
      user: "StrategyGamer",
    },
    {
      stars: "⭐️⭐️⭐️⭐️⭐️",
      text: "The building evolution system is brilliant! Love watching my city transform from village to metropolis!",
      user: "MetropolisDreamer",
    },
    {
      stars: "⭐️⭐️⭐️⭐️⭐️",
      text: "Perfect balance of challenge and relaxation. My go-to game for stress relief!",
      user: "ZenBuilder",
    },
  ];

  fallbackReviews.forEach((review, index) => {
    const reviewElement = createReviewElement(review, index);
    reviewsContainer.appendChild(reviewElement);
  });

  console.log("Fallback reviews loaded");
}
