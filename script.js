<script>
        function setLanguage(lang) {
            document.documentElement.lang = lang;
            localStorage.setItem('lang', lang);

            if (lang === 'zh-TW') {
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.lang-zh').forEach(el => el.style.display = 'block');
                document.getElementById('lang-zh-btn').classList.add('active');
                document.getElementById('lang-en-btn').classList.remove('active');
            } else {
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
                document.querySelectorAll('.lang-zh').forEach(el => el.style.display = 'none');
                document.getElementById('lang-en-btn').classList.add('active');
                document.getElementById('lang-zh-btn').classList.remove('active');
            }
        }

        window.onload = function() {
            const savedLang = localStorage.getItem('lang') || 'en';
            setLanguage(savedLang);

            document.getElementById('lang-en-btn').addEventListener('click', () => setLanguage('en'));
            document.getElementById('lang-zh-btn').addEventListener('click', () => setLanguage('zh-TW'));

            filterAndSearch();
        };

        function toggleInfo(id) {
            const element = document.getElementById(id);
            if (element.style.display === "none" || element.style.display === "") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }

        const scrollToTopBtn = document.getElementById("scrollToTopBtn");

        window.onscroll = function() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        function filterAndSearch() {
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
        }
    </script>
