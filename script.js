document.addEventListener('DOMContentLoaded', () => {
    const langEnBtn = document.getElementById('lang-en-btn');
    const langZhBtn = document.getElementById('lang-zh-btn');

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        const isEnglish = lang === 'en';
        document.querySelectorAll('.lang-en').forEach(el => el.style.display = isEnglish ? 'block' : 'none');
        document.querySelectorAll('.lang-zh').forEach(el => el.style.display = isEnglish ? 'none' : 'block');
        
        langEnBtn.classList.toggle('active', isEnglish);
        langZhBtn.classList.toggle('active', !isEnglish);

        filterAndSearch();
    }

    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langZhBtn.addEventListener('click', () => setLanguage('zh-TW'));

    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const moreInfoSection = document.getElementById(targetId);
            const isVisible = moreInfoSection.style.display === "block";
            moreInfoSection.style.display = isVisible ? "none" : "block";
        });
    });

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    let timeout = null;
    const filterAndSearch = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const isEnglish = document.documentElement.lang === 'en';
            const searchInput = isEnglish ? document.getElementById('searchInput').value.toLowerCase() : document.getElementById('searchInputZh').value.toLowerCase();
            const departmentFilter = isEnglish ? document.getElementById('departmentFilter').value : document.getElementById('departmentFilterZh').value;
            const durationFilter = isEnglish ? document.getElementById('durationFilter').value : document.getElementById('durationFilterZh').value;
            const gradeFilter = isEnglish ? document.getElementById('gradeFilter').value : document.getElementById('gradeFilterZh').value;
            
            const jobCards = document.querySelectorAll('.job-card');
            let visibleJobs = 0;

            jobCards.forEach(card => {
                const department = card.getAttribute('data-department');
                const duration = card.getAttribute('data-duration');
                const grade = card.getAttribute('data-grade');
                const cardText = card.textContent.toLowerCase();

                const matchesSearch = cardText.includes(searchInput);
                const matchesDepartment = departmentFilter === 'all' || department === departmentFilter;
                const matchesDuration = durationFilter === 'all' || duration === durationFilter;
                const matchesGrade = gradeFilter === 'all' || grade === gradeFilter;

                if (matchesSearch && matchesDepartment && matchesDuration && matchesGrade) {
                    card.style.display = 'block';
                    visibleJobs++;
                } else {
                    card.style.display = 'none';
                }
            });

            const resultCountEn = document.getElementById('result-count-en');
            const resultCountZh = document.getElementById('result-count-zh');

            if (isEnglish) {
                resultCountEn.textContent = `${visibleJobs} job(s) found.`;
                resultCountZh.textContent = '';
            } else {
                resultCountZh.textContent = `找到 ${visibleJobs} 個職位。`;
                resultCountEn.textContent = '';
            }
        }, 300);
    };
    
    const searchInputs = document.querySelectorAll('#searchInput, #searchInputZh');
    searchInputs.forEach(input => input.addEventListener('input', filterAndSearch));

    const filterSelects = document.querySelectorAll('#departmentFilter, #durationFilter, #gradeFilter, #departmentFilterZh, #durationFilterZh, #gradeFilterZh');
    filterSelects.forEach(select => select.addEventListener('change', filterAndSearch));

});
