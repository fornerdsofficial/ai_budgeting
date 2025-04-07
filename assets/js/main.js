// 메인 자바스크립트 파일 - 모든 페이지에서 공통으로 사용하는 기능

document.addEventListener('DOMContentLoaded', function() {
    // 메뉴 활성화 처리
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentPath.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // 모달 닫기 처리
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalOverlay = this.closest('.modal-overlay');
            modalOverlay.classList.remove('active');
        });
    });
    
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // 로고 이미지 생성
    createLogo();
    
    // 포맷팅 함수
    window.formatCurrency = function(amount) {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };
    
    window.formatNumber = function(number) {
        return new Intl.NumberFormat('ko-KR').format(number);
    };
    
    window.formatPercent = function(percent) {
        return new Intl.NumberFormat('ko-KR', {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(percent / 100);
    };
});

// 로고 SVG 생성 함수
function createLogo() {
    const logoContainer = document.querySelector('.logo img');
    
    if (!logoContainer) return;
    
    // SVG 로고 생성 (인라인 SVG)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');
    svg.setAttribute('viewBox', '0 0 40 40');
    
    // 로고 디자인
    svg.innerHTML = `
        <circle cx="20" cy="20" r="18" fill="#4B8B6F" />
        <path d="M10 20L17 27L30 14" stroke="white" stroke-width="3" fill="none" />
        <path d="M10 14H30" stroke="white" stroke-width="2" fill="none" />
        <path d="M14 10H26" stroke="white" stroke-width="2" fill="none" />
        <path d="M10 14V26" stroke="white" stroke-width="2" fill="none" />
        <path d="M30 14V26" stroke="white" stroke-width="2" fill="none" />
        <path d="M10 26H30" stroke="white" stroke-width="2" fill="none" />
    `;
    
    // 기존 이미지 대체
    logoContainer.replaceWith(svg);
}