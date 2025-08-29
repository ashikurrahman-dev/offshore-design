const categories = document.querySelectorAll('.serviceCategory');
const services = document.querySelectorAll('.sub-services');

categories.forEach(cat => {
    cat.addEventListener('mouseenter', () => {
        services.forEach(s => s.classList.add('hidden'));
        document.getElementById(cat.dataset.target).classList.remove('hidden');
    });
});

// Add default active serviceCategory on dropdown open
document.querySelector('.group').addEventListener('mouseenter', () => {
    const activeserviceCategory = document.querySelector('.serviceCategory[data-target="photo"]');
    services.forEach(s => s.classList.add('hidden'));
    document.getElementById(activeserviceCategory.dataset.target).classList.remove('hidden');
});