const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

const TELEGRAM_BOT_TOKEN = "8625909587:AAH61bPhuYY3Oh8DAs3fzJ8lDBIk9QAF7g8";
const TELEGRAM_CHAT_ID = 505640835;

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) return;

    // состояние: отправка
    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";
    submitBtn.classList.add("btn--loading");

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text:
              "📩 Новая заявка:\n\n" +
              "👤 Имя: " + name + "\n" +
              "📧 Email: " + email + "\n" +
              "💬 Сообщение: " + message
          })
        }
      );

      const result = await response.json();
      console.log("Telegram response:", result);

      if (result.ok) {
        // состояние: отправлено
        submitBtn.textContent = "Отправлено";
        submitBtn.classList.remove("btn--loading");
        submitBtn.classList.add("btn--success");

        form.reset();
      } else {
        throw new Error(result.description);
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);

      // вернуть кнопку обратно
      submitBtn.disabled = false;
      submitBtn.textContent = "Отправить";
      submitBtn.classList.remove("btn--loading");
    }
  });
}