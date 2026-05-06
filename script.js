/* --- TRADUÇÕES --- */
const translations = {
    pt: {
        nav_home: "Início",
        nav_about: "Sobre",
        nav_skills: "Tecnologias",
        nav_projects: "Projetos",
        nav_contact: "Contato",
        hero_hello: "Olá, eu sou",
        hero_role: "Desenvolvedor Full-Stack apaixonado por criar.",
        hero_btn: "Ver O Meu Trabalho",
        about_title: "Sobre Mim",
        about_text: "Sou Arthur Leandro, tenho 18 anos e sou um desenvolvedor Web focado em inovação. Destaquei-me no curso de Desenvolvimento de Sistemas do SENAI, sendo escolhido por mérito para um estágio onde amplio minha experiência prática. Atualmente, aprimoro minhas habilidades em PHP e Laravel, e estou matriculado em Análise e Desenvolvimento de Sistemas (ADS), pronto para iniciar minha graduação e construir soluções cada vez mais eficientes.",
        skills_title: "Tecnologias",
        projects_title: "Meus Projetos",

        proj_portfolio_title: "Sistema de Gerenciamento de Alocação",
        proj_portfolio_desc: "Um sistema em colaboração com o SENAI para ajudar no gerenciamento de turmas.",

        proj_landing_title: "Contador de Alunos",
        proj_landing_desc: "Este sistema foi projetado para otimizar o tempo dos funcionários e reduzir o desperdício de alimentos.",

        proj_sistema_title: "Sistema Full-Stack",
        proj_sistema_desc: "Aplicação completa com API REST separada e dashboard administrativo.",

        // NOVO: TRADUÇÕES DO CLONE R7 (ATUALIZADO)
        proj_r7_title: "Clone Portal R7",
        proj_r7_desc: "Recriação visual da interface de um portal de notícias usando HTML e CSS.",

        proj_kamban_title: "DevFlow",
        proj_kamban_desc: "Um kamban feito para estudar React e Typescript.",

        btn_details: "Ver Detalhes &rarr;",
        contact_title: "Vamos Conversar?",
        contact_text: "Estou disponível para novas oportunidades e colaborações.",
        contact_btn: "Enviar E-mail",
        footer_text: "Desenvolvido por Arthur Leandro © 2025",
        modal_code: "Ver Código",
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_hello: "Hello, I am",
        hero_role: "Full-Stack Developer passionate about creating.",
        hero_btn: "View My Work",
        about_title: "About Me",
        about_text: "I am Arthur Leandro, I am 18 years old and a Web Developer focused on innovation. I stood out in the Systems Development course at SENAI, being selected by merit for an internship where I am expanding my practical experience. Currently, I am honing my skills in PHP and Laravel, and I am enrolled in the Systems Analysis and Development (ADS) degree, ready to start my graduation and build increasingly efficient solutions.",
        skills_title: "Technologies",
        projects_title: "My Projects",

        proj_portfolio_title: "Allocation Management System",
        proj_portfolio_desc: "A system developed in collaboration with SENAI to assist in class management.",

        proj_landing_title: "Student Counter System",
        proj_landing_desc: "This system was designed to optimize employee time and reduce food waste.",

        proj_sistema_title: "Full-Stack System",
        proj_sistema_desc: "Complete application with separate REST API and administrative dashboard.",

        // NOVO: TRADUÇÕES DO CLONE R7 (ATUALIZADO)
        proj_r7_title: "R7 Portal Clone",
        proj_r7_desc: "Visual recreation of a news portal interface using HTML and CSS.",

        proj_kamban_title: "DevFlow",
        proj_kamban_desc: "A kamban made to study React and Typescript.",

        btn_details: "View Details &rarr;",
        contact_title: "Let's Talk?",
        contact_text: "I am available for new opportunities and collaborations.",
        contact_btn: "Send E-mail",
        footer_text: "Developed by Arthur Leandro © 2025",
        modal_code: "View Code",
    }
};

const projectsData = {
    'sga': {
        title: { pt: "Sistema de Gerenciamento de Alocação", en: "Allocation Management System" },
        description: {
            pt: "Este projeto é uma API RESTful back-end que automatiza e otimiza a gestão de recursos em ambientes educacionais, demonstrando competência em arquitetura de software e tratamento de dados complexos. O foco principal é garantir a integridade dos dados e padronizar a comunicação com o cliente (Front-end).\n\nFuncionalidades principais:\n- Fácil gerenciamento de turmas\n- Gestão de Colaboradores, Ambientes,  Cursos e Turmas\n- Relátorios Dinâmicos\n- Diferentes niveis de acesso",
            en: "This project is a back-end RESTful API that automates and optimizes resource management in educational environments, demonstrating competence in software architecture and complex data handling. The main focus is ensuring data integrity and standardizing communication with the client (Front-end).\n\nKey Features:\n- Easy class management\n- Management of Collaborators, Environments, Courses, and Classes\n- Dynamic Reports\n- Different access levels"
        },
        images: [
            "assets/sga_login.png",
            "assets/relatorio_sga.png",
            "assets/consultor_sga.png"
        ],
        techs: ["HTML", "CSS", "JavaScript", "Laravel", "Mysql"],
        repoLink: {
            front: "https://github.com/ArthurLpereira/gerenciador_senai.git",
            back: "https://github.com/ArthurLpereira/sga_senai_api.git"
        }
    },
    'landing': {
        title: { pt: "Contador de Alunos", en: "Student Counter System" },
        description: {
            pt: "Desenvolvido em parceria com o SENAI, este sistema nasceu da necessidade de substituir a contagem manual de alunos no refeitório. O objetivo foi otimizar o tempo dos funcionários e reduzir significativamente o desperdício alimentar através de dados precisos.\n\nFuncionalidades principais:\n- Contagem automatizada de alunos\n- Relatórios dinâmicos e personalizados\n- Controle de estoque integrado\n- Diferentes níveis de acesso (Login)",
            en: "Developed in partnership with SENAI, this system was created to replace manual student counting in the cafeteria. The goal was to optimize staff time and significantly reduce food waste through accurate data tracking.\n\nKey Features:\n- Automated student counting\n- Dynamic and custom reports\n- Integrated inventory control\n- Role-based access levels"
        },
        images: [
            "assets/contador_login.png",
            "assets/contador_calendario.png",
            "assets/contador_contagem.png",
        ],
        techs: ["HTML", "CSS", "JavaScript", "PHP"],
        repoLink: "https://github.com/ArthurLpereira/Contador_phpV2.git"
    },
    // --- PROJETO R7 (ATUALIZADO PARA INICIANTE) ---
    'r7clone': {
        title: { pt: "Clone do Portal R7", en: "R7 News Portal Clone" },
        description: {
            pt: "Projeto desenvolvido como desafio técnico numa seletiva. O objetivo foi recriar o visual do portal de notícias R7 utilizando apenas HTML e CSS básico, focando na organização dos elementos na tela.\n\nFuncionalidades principais:\n- Estrutura HTML organizada\n- Estilização com CSS\n- Posicionamento de imagens e textos\n- Recriação fiel do layout original",
            en: "Project developed as a technical challenge for a selection process. The goal was to recreate the visual of the R7 news portal using only basic HTML and CSS, focusing on organizing elements on the screen.\n\nKey Features:\n- Organized HTML structure\n- CSS Styling\n- Image and text positioning\n- Faithful recreation of the original layout"
        },
        images: [
            "assets/r7_telaum.png",
            "assets/r7_teladois.png",
            "assets/r7_telatres.png",
        ],
        techs: ["HTML", "CSS"], // Removido JS e Responsividade
        repoLink: "https://github.com/ArthurLpereira/Recriando_r7.git" // Atualiza com o teu link depois
    },

    'kamban': {
        title: { pt: "DevFlow", en: "DevFlow" },
        description: {
            pt: "O DevFlow é uma aplicação completa de gerenciamento de tarefas baseada na metodologia Kanban. O projeto foi desenvolvido com o objetivo principal de dominar o ecossistema TypeScript, garantindo tipagem estática e segurança de dados desde o banco de dados até a interface do usuário. \n\nFuncionalidades principais:\n- Gestão de Tarefas\n-Categorias Personalizadas\n- Níveis de Urgência\n",
            en: "DevFlow is a full-stack task management application based on the Kanban methodology. The project was developed with the primary goal of mastering the TypeScript ecosystem, ensuring static typing and data security from the database to the user interface.\n\nKey features:\n- Task Management\n-Custom Categories\n- Urgency Levels\n"
        },
        images: [
            "assets/InicialKamban.png",
            "assets/ModalKamban.png",
        ],
        techs: ["React", "Typescript"],
        repoLink: "https://github.com/ArthurLpereira/DevFlow" // Atualiza com o teu link depois
    }

};

/* --- LÓGICA DE IDIOMA --- */
let currentLang = localStorage.getItem('siteLang') || 'pt';

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (key === 'btn_details') {
                element.innerHTML = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
    const langBtn = document.getElementById('lang-toggle');
    const flagImg = currentLang === 'pt' ? 'assets/eua.png' : 'assets/brasil.png';
    langBtn.innerHTML = `<img src="${flagImg}" alt="Mudar idioma" class="flag-icon">`;
}

function toggleLanguage() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('siteLang', currentLang);
    updateContent();
}

document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    typeEffect();
});

/* --- LÓGICA DO MODAL E CARROSSEL --- */
let currentSlide = 0;
let currentImages = [];
let carouselInterval;

function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    document.getElementById('modalTitle').textContent = project.title[currentLang];
    document.getElementById('modalDescription').textContent = project.description[currentLang];

    const techContainer = document.getElementById('modalTechs');
    techContainer.innerHTML = project.techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    const linkContainer = document.getElementById('modalLinks');
    linkContainer.innerHTML = '';

    const btnCodeText = translations[currentLang].modal_code;

    if (typeof project.repoLink === 'object' && project.repoLink !== null) {
        linkContainer.innerHTML += `
            <a href="${project.repoLink.front}" target="_blank" class="modal-btn btn-code">
                <i class="fab fa-github"></i> Front-end
            </a>
            <a href="${project.repoLink.back}" target="_blank" class="modal-btn btn-code">
                <i class="fas fa-database"></i> Back-end
            </a>
        `;
    } else {
        linkContainer.innerHTML = `
            <a href="${project.repoLink}" target="_blank" class="modal-btn btn-code">
                <i class="fab fa-github"></i> ${btnCodeText}
            </a>
        `;
    }

    currentImages = project.images;
    currentSlide = 0;
    updateCarousel();

    const arrows = document.querySelectorAll('.carousel-arrow');

    if (currentImages.length > 1) {
        arrows.forEach(arrow => arrow.style.display = 'block');
        startAutoSlide();
    } else {
        arrows.forEach(arrow => arrow.style.display = 'none');
        stopAutoSlide();
    }

    document.getElementById('projectModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    if (event && event.target !== document.getElementById('projectModal')) return;
    document.getElementById('projectModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    stopAutoSlide();
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

function startAutoSlide() {
    stopAutoSlide();
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 3000);
}

function stopAutoSlide() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function manualChangeSlide(direction) {
    changeSlide(direction);
    if (currentImages.length > 1) {
        startAutoSlide();
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= currentImages.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = currentImages.length - 1;
    updateCarousel();
}

function updateCarousel() {
    const container = document.getElementById('carouselImages');
    container.innerHTML = currentImages.map((img, index) => `
        <img src="${img}" class="carousel-img ${index === currentSlide ? 'active' : ''}">
    `).join('');
}

function toggleMenu() { document.getElementById('navbar').classList.toggle('active'); }

const textElement = document.getElementById('typing-text');
const textToType = "Arthur Leandro";
let charIndex = 0;
function typeEffect() {
    if (charIndex < textToType.length) {
        textElement.textContent += textToType.charAt(charIndex); charIndex++; setTimeout(typeEffect, 150);
    }
}

const grid = document.getElementById('skillsGrid');
const cards = document.querySelectorAll('.skill-card');
grid.addEventListener('mousemove', (e) => {
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav ul li a');
window.onscroll = () => {
    var current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 100)) current = section.getAttribute('id');
    });
    navLi.forEach((a) => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) a.classList.add('active');
    });
};