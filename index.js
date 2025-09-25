/* 
   Author: Tianna Hatch 
   Last Updated Date:   02/22/2022
   
   Filename: index.js - Tesla Inspired
*/

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('header');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
	document.body.classList.toggle('nav-open');
})

navLinks.forEach(link => {
	link.addEventListener('click', () => {
		document.body.classList.remove('nav-open');
	})
})

// Header scroll effect
window.addEventListener('scroll', () => {
	if (window.scrollY > 100) {
		header.style.background = 'rgba(248, 249, 250, 0.98)';
		header.style.boxShadow = '0 4px 32px rgba(56, 62, 78, 0.15)';
	} else {
		header.style.background = 'rgba(248, 249, 250, 0.95)';
		header.style.boxShadow = 'none';
	}
});

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

// Intersection Observer for animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
	const animatedElements = document.querySelectorAll('.service, .portfolio__item, .about-me__content');
	
	animatedElements.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		observer.observe(el);
	});
});