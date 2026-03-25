// java/script4.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const statusBox = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    const TELEGRAM_BOT_TOKEN = '8625909587:AAH61bPhuYY3Oh8DAs3fzJ8lDBIk9QAF7g8';
    const TELEGRAM_CHAT_ID = '505640835';

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        statusBox.textContent = '';
        statusBox.className = 'form-status';

        if (!name || !email || !message) {
            statusBox.textContent = 'Заполни все поля.';
            statusBox.classList.add('error');
            return;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailValid) {
            statusBox.textContent = 'Неверный формат почты.';
            statusBox.classList.add('error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        const text =
            `📩 Новая заявка с сайта\n\n` +
            `Имя: ${name}\n` +
            `Email: ${email}\n` +
            `Сообщение:\n${message}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text
                })
            });

            const result = await response.json();

            if (result.ok) {
                statusBox.textContent = 'Сообщение отправлено в Telegram.';
                statusBox.classList.add('success');
                form.reset();
            } else {
                statusBox.textContent = result.description || 'Ошибка Telegram API.';
                statusBox.classList.add('error');
            }
        } catch (error) {
            console.error(error);
            statusBox.textContent = 'Ошибка отправки. Браузер мог заблокировать запрос.';
            statusBox.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        }
    });
});