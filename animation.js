// Initial state (slightly scaled down & hidden)
gsap.set(".card", { opacity: 0, y: 50, scale: 1.2 });

// Animate in with stagger
gsap.to(".card", {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: .8,
    ease: "back.out(1.7)",
    stagger: 0.15
});

// Hover animations
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
});



// carosal image
const carousel = document.getElementById("carousel");
const cards = carousel.children;
const totalWidth = Array.from(cards).reduce((acc, card) => acc + card.offsetWidth + 24, 0); // 24 = gap

let direction = 1; // 1 = left, -1 = right

const tween = gsap.to(carousel, {
    x: () => direction * -(totalWidth - window.innerWidth),
    duration: 30,
    ease: "none",
    repeat: -1,
    yoyo: true
});

// Pause on hover
carousel.addEventListener("mouseenter", () => tween.pause());
carousel.addEventListener("mouseleave", () => tween.resume());



