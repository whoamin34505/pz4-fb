// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

// Показываем кнопку после скролла
window.addEventListener('scroll', () => {
 if (window.scrollY > 300) {
 scrollTopButton.classList.add('visible');
 } else {
 scrollTopButton.classList.remove('visible');
 }
});

// Прокрутка к началу страницы
scrollTopButton.addEventListener('click', () => {
 window.scrollTo({
 top: 0,
 behavior: 'smooth'
 });
});

// Гамбургер-меню
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const headerEl = document.querySelector('.header');

if (menuToggle && mainNav) {
	const navOverlay = document.createElement('div');
	navOverlay.className = 'nav-overlay';
	document.body.appendChild(navOverlay);

	function toggleMenu() {
		const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.classList.toggle('active');
		menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
		mainNav.classList.toggle('active');
		navOverlay.classList.toggle('active');
		document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
	}

	menuToggle.addEventListener('click', toggleMenu);
	navOverlay.addEventListener('click', toggleMenu);

	const navLinks = document.querySelectorAll('.nav-menu__link');

	function scrollWithOffset(target) {
		const headerHeight = headerEl ? headerEl.offsetHeight : 0;
		const rect = target.getBoundingClientRect();
		const offsetTop = rect.top + window.pageYOffset - headerHeight - 8; // небольшой запас
		window.scrollTo({ top: offsetTop, behavior: 'smooth' });
	}

	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href') || '';
			if (href.startsWith('#') && href.length > 1) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					scrollWithOffset(target);
				}
				if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
					toggleMenu();
				}
			}
		});
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && mainNav.classList.contains('active')) {
			toggleMenu();
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
			toggleMenu();
		}
	});
}
