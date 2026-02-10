/* 
   Author: Tianna T. 
   Last Updated Date: 2025
   
   Filename: index.js
*/

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: prefersReducedMotion ? 'auto' : 'smooth',
				block: 'start'
			});
		}
	});
});

// Intersection Observer for subtle reveal animations
if (!prefersReducedMotion) {
	const observerOptions = {
		threshold: 0.15,
		rootMargin: '0px 0px -80px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				// Stagger animation delays for visual interest
				setTimeout(() => {
					entry.target.classList.add('visible');
				}, index * 100);
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe elements that should fade in on scroll
	document.addEventListener('DOMContentLoaded', () => {
		const animatedElements = document.querySelectorAll('.principle__item, .testimonial__card');
		
		animatedElements.forEach(el => {
			observer.observe(el);
		});
	});
}

// Add visible class immediately if reduced motion is preferred
if (prefersReducedMotion) {
	document.addEventListener('DOMContentLoaded', () => {
		const animatedElements = document.querySelectorAll('.principle__item, .testimonial__card');
		animatedElements.forEach(el => {
			el.classList.add('visible');
		});
	});
}

// Hero experience counters
const animateHeroExperienceCounters = () => {
	const counters = document.querySelectorAll('.hero__exp-years');
	if (!counters.length) return;

	counters.forEach(counter => {
		const target = parseInt(counter.dataset.years, 10);
		if (Number.isNaN(target) || target <= 0) return;

		let current = 0;
		const duration = 1200;
		const stepTime = Math.max(Math.floor(duration / target), 40);

		const updateCounter = () => {
			current += 1;
			counter.textContent = current;
			if (current < target) {
				setTimeout(updateCounter, stepTime);
			}
		};

		// slight delay so it feels intentional, not jittery
		setTimeout(updateCounter, 300);
	});
};

const setHeroExperienceCountersInstant = () => {
	const counters = document.querySelectorAll('.hero__exp-years');
	if (!counters.length) return;

	counters.forEach(counter => {
		const target = parseInt(counter.dataset.years, 10);
		if (!Number.isNaN(target)) {
			counter.textContent = target;
		}
	});
};

document.addEventListener('DOMContentLoaded', () => {
	if (prefersReducedMotion) {
		setHeroExperienceCountersInstant();
	} else {
		animateHeroExperienceCounters();
	}
});
