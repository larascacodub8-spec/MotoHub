// --- Блок 1: Кнопка подарка (Вынесено отдельно для 100% надежности) ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        const giftModal = document.getElementById('giftModal');
        const openBtn = document.getElementById('openGiftModal');
        const closeBtn = document.getElementById('closeGiftModal');

        if (openBtn && giftModal) {
            openBtn.addEventListener('click', () => {
                giftModal.classList.add('active');
            });
        }

        if (closeBtn && giftModal) {
            closeBtn.addEventListener('click', () => {
                giftModal.classList.remove('active');
            });
        }

        if (giftModal) {
            giftModal.addEventListener('click', (e) => {
                if (e.target === giftModal) {
                    giftModal.classList.remove('active');
                }
            });
        }
    } catch (error) {
        console.error("Ошибка в работе модального окна:", error);
    }
});

// --- Блок 2: Анимация карточек при скролле ---
document.addEventListener("DOMContentLoaded", function () {
    try {
        const elementsToAnimate = document.querySelectorAll('.feature-card, .course-card, .step');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.15 
        });

        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    } catch (error) {
        console.error("Ошибка в анимации скролла:", error);
    }
});

// --- Блок 3: 3D-эффект карточек (поворот мышкой) ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        const cards = document.querySelectorAll('.feature-card, .course-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const rotateX = (-y / (rect.height / 2)) * 12;
                const rotateY = (x / (rect.width / 2)) * 12;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    } catch (error) {
        console.error("Ошибка в 3D карточках:", error);
    }
});

// --- Блок 4: FAQ (Часто задаваемые вопросы) ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');

                // Закрываем все остальные открытые вопросы
                document.querySelectorAll('.faq-item').forEach(el => {
                    el.classList.remove('active');
                });

                // Если элемент не был активен — открываем его
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    } catch (error) {
        console.error("Ошибка в FAQ:", error);
    }
});

document.getElementById('telegramForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные из полей
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const schoolName = document.getElementById('schoolName').value; // Получаем название автошколы
    const course = document.getElementById('course').value;

    // Вставьте сюда данные вашего бота
    const TOKEN = '8620494468:AAH9fWBfJZ0EGxgLPpzVaH661La0xzywBT4';
    const CHAT_ID = '949076386';
    
    // Текст сообщения с учетом нового поля
    const message = `🚨 Новая заявка в автошколу!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🏫 Автошкола: ${schoolName}\n🏍 Курс: ${course}`;

    // Отправка через Telegram API
    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Заявка успешно отправлена! Скоро мы с вами свяжемся.');
            document.getElementById('telegramForm').reset(); // Очищаем форму
        } else {
            alert('Произошла ошибка при отправке. Попробуйте еще раз.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером.');
    });
});