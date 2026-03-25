document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach((slider) => {
    const videos = slider.dataset.videos
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!videos.length) return;

    const sliderVideo = slider.querySelector("[data-slider-video]");
    const prevBtn = slider.querySelector("[data-slider-prev]");
    const nextBtn = slider.querySelector("[data-slider-next]");
    const dotsContainer = slider.querySelector("[data-slider-dots]");

    let currentIndex = 0;

    if (!sliderVideo || !dotsContainer) return;

    function playCurrentVideo() {
      const playPromise = sliderVideo.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          sliderVideo.muted = true;
          sliderVideo.play();
        });
      }
    }

    function renderDots() {
      dotsContainer.innerHTML = "";

      videos.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider__dot";
        dot.setAttribute("aria-label", `Ролик ${index + 1}`);
        dot.dataset.index = index;

        if (index === currentIndex) {
          dot.classList.add("is-active");
        }

        dot.addEventListener("click", () => {
          updateSlider(index);
        });

        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      const dots = slider.querySelectorAll(".slider__dot");

      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex);
      });
    }

    function updateSlider(index) {
      currentIndex = index;

      sliderVideo.pause();
      sliderVideo.src = videos[currentIndex];
      sliderVideo.currentTime = 0;

      updateDots();
      playCurrentVideo();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
        updateSlider(newIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
        updateSlider(newIndex);
      });
    }

    renderDots();
    sliderVideo.src = videos[0];
    playCurrentVideo();
  });
});