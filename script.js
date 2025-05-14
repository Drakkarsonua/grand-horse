// === Загрузка тренеров ===
async function loadTrainers() {
  try {
    const res = await fetch('./data/trainers.json');
    const data = await res.json();
    const container = document.getElementById('trainers-list');
    if (!container) return;

    container.innerHTML = '';

    // Получаем параметр из URL
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type'); // может быть 'dressage', 'jumping', или null

    const filtered = type ? data.filter(t => t.type === type) : data;

    filtered.forEach(t => {
      const div = document.createElement('div');
      div.className = 'trainer-card';
      div.innerHTML = `
        <img src="${t.photo}" alt="${t.name}">
        <h3>${t.name}</h3>
        <p>${t.bio}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Помилка завантаження тренерів:", err);
  }
}


// === Загрузка новостей ===
async function loadNews() {
  try {
    const res = await fetch('./data/news.json');
    const data = await res.json();
    const container = document.getElementById('news-section');
    if (!container) return;

    container.innerHTML = ''; // Очистка перед перерисовкой

    data.forEach(n => {
      const div = document.createElement('div');
      div.className = 'news-card';
      div.innerHTML = `
        <img src="images/${n.image}" alt="${n.title}">
        <div class="news-content">
          <h3>${n.title}</h3>
          <p><em>${n.date}</em></p>
          <p>${n.description}</p>
          <a href="${n.link}">Читати далі →</a>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Ошибка загрузки новостей:", err);
  }
}

// === Обработка форм ===
window.addEventListener('DOMContentLoaded', () => {
  // Устанавливаем постоянную тёмную тему
  document.documentElement.setAttribute('data-theme', 'dark');

  // Загрузка данных
  loadTrainers();
  loadNews();

  // Форма контакта
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Спасибо за сообщение!');
      contactForm.reset();
    });
  }

  // Форма записи
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Спасибо за вашу заявку!');
      signupForm.reset();
    });
  }
});

document.querySelectorAll('.dropdown').forEach(dropdown => {
  const menu = dropdown.querySelector('.dropdown-menu');
  let hideTimer;

  // Показ с двойным requestAnimationFrame
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(hideTimer);
    menu.classList.remove('hiding');
    menu.style.display = 'flex';

    // ⏱ ждём 2 кадра, чтобы CSS успел увидеть начальные стили
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        menu.classList.add('showing');
      });
    });
  });

  // Скрытие
  dropdown.addEventListener('mouseleave', () => {
    hideTimer = setTimeout(() => {
      menu.classList.remove('showing');
      menu.classList.add('hiding');

      setTimeout(() => {
        menu.classList.remove('hiding');
        menu.style.display = 'none';
      }, 400);
    }, 200);
  });
});


