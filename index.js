/* 
   Author: Tianna Hatch 
   Last Updated Date:   02/22/2022
   
   Filename: index.js - Tesla Inspired
*/


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Enhanced Intersection Observer for Mekuwelt-style animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
			
		}
	});
}, observerOptions);

// Debug preloader functionality
console.log('JavaScript loaded');

function hidePreloader() {
	console.log('hidePreloader called');
	const preloader = document.getElementById('preloader');
	console.log('Preloader element:', preloader);
	if (preloader) {
		preloader.style.opacity = '0';
		preloader.style.transition = 'opacity 0.5s ease-out';
		setTimeout(() => {
			preloader.style.display = 'none';
			console.log('Preloader hidden');
		}, 500);
	}
}

function countUp() {
	console.log('countUp called');
	const percentage = document.querySelector('.preloader-percentage');
	console.log('Percentage element:', percentage);
	if (percentage) {
		let currentCount = parseInt(percentage.textContent) || 0;
		currentCount += 5;
		if (currentCount >= 100) {
			percentage.textContent = '100%';
			setTimeout(hidePreloader, 1000);
		} else {
			percentage.textContent = currentCount + '%';
			setTimeout(countUp, 200);
		}
	}
}

// Start immediately when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded');
	setTimeout(() => {
		console.log('Starting countUp');
		countUp();
	}, 2000);
});

// Force hide after 8 seconds
setTimeout(() => {
	console.log('Force hiding preloader');
	hidePreloader();
}, 8000);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
	const animatedElements = document.querySelectorAll('.service, .portfolio__item, .about-me__content');
	
	animatedElements.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(50px)';
		el.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
		observer.observe(el);
	});
	
});
