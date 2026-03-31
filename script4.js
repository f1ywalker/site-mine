const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

const TELEGRAM_BOT_TOKEN = "8625909587:AAH61bPhuYY3Oh8DAs3fzJ8lDBIk9QAF7g8";
const TELEGRAM_CHAT_ID = "505640835";

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      statusEl.textContent = "Пожалуйста, заполните все поля.";
      return;
    }

    submitBtn.disabled = true;
    statusEl.textContent = "Отправка...";

    const text =
      `Новая заявка с сайта:%0A%0A` +
      `Имя: ${encodeURIComponent(name)}%0A` +
      `Email: ${encodeURIComponent(email)}%0A` +
      `Комментарий: ${encodeURIComponent(message)}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${text}`;

    try {
      const response = await fetch(url, {
        method: "GET"
      });

      const result = await response.json();

      if (result.ok) {
        statusEl.textContent = "Сообщение успешно отправлено.";
        form.reset();
      } else {
        statusEl.textContent = "Ошибка отправки.";
        console.error(result);
      }
    } catch (error) {
      statusEl.textContent = "Не удалось отправить сообщение.";
      console.error(error);
    } finally {
      submitBtn.disabled = false;
    }
  });
}