document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab');
    const content = document.getElementById('container');
    const underline = document.querySelector('.underline');
    const tabTitle = document.getElementById('tab-title');

    loadContent(tabs[0].dataset.content);
    updateUnderline(tabs[0]);
    tabTitle.textContent = tabs[0].dataset.title;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadContent(tab.dataset.content);
            updateUnderline(tab);
            tabTitle.textContent = tab.dataset.title;
        });
    });

    function loadContent(file) {
        content.classList.add('fade-out');

        setTimeout(() => {
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    content.innerHTML = data;

                    content.classList.remove('fade-out');
                    content.classList.add('fade-in');

                    setTimeout(() => {
                        content.classList.remove('fade-in');
                    }, 400);
                })
                .catch(error => {
                    content.innerHTML = `<p>Loading content error: ${error}</p>`;
                    content.classList.remove('fade-out');
                });
        }, 400);
    }

    function updateUnderline(tab) {
        const tabRect = tab.getBoundingClientRect();
        underline.style.width = `${tabRect.width}px`;
        underline.style.left = `${tabRect.left + window.scrollX}px`;
    }

    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.tab.active');
        updateUnderline(activeTab);
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}