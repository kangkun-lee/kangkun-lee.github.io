/* ============================================
   커스텀 JavaScript - 인터랙션 및 애니메이션
   ============================================ */

(function() {
  'use strict';

  // DOM 로드 완료 후 실행
  document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initNavbarEffects();
    initParallaxEffects();
    initSmoothScroll();
    initFloatingNav();
  });

  /* ============================================
     스크롤 애니메이션 - 개선된 버전
     ============================================ */
  function initScrollAnimations() {
    // 이미 CSS 애니메이션이 있는 요소는 제외
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // CSS 클래스 추가로 애니메이션 트리거
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 포스트 카드만 애니메이션 적용 (이미 fade-in 클래스가 없는 경우)
    const postCards = document.querySelectorAll('.post-card:not(.fade-in), .mb3.pa4:not(.fade-in)');
    postCards.forEach((card) => {
      observer.observe(card);
    });
  }

  /* ============================================
     플로팅 네비게이션 효과
     ============================================ */
  function initFloatingNav() {
    const floatingNav = document.querySelector('.floating-nav');
    if (!floatingNav) return;

    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const currentScroll = window.pageYOffset;

          // 스크롤 시 배경 추가 (선택적 - 필요시 주석 해제)
          // if (currentScroll > 100) {
          //   floatingNav.classList.add('scrolled');
          // } else {
          //   floatingNav.classList.remove('scrolled');
          // }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================
     네비게이션 바 효과 - 개선된 버전
     ============================================ */
  function initNavbarEffects() {
    const navbar = document.querySelector('nav[role="navigation"]:not(.floating-nav)');
    if (!navbar) return;

    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const currentScroll = window.pageYOffset;

          // 스크롤 시 그림자 추가 (더 부드럽게)
          if (currentScroll > 20) {
            navbar.style.boxShadow = '0 2px 12px rgba(10, 14, 39, 0.1)';
            navbar.style.transition = 'box-shadow 0.3s ease-out';
          } else {
            navbar.style.boxShadow = 'none';
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================
     패럴랙스 효과 - 완화된 버전
     ============================================ */
  function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-section');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          
          parallaxElements.forEach(element => {
            // 매우 미묘한 패럴랙스 효과
            const rate = scrolled * 0.15;
            element.style.transform = `translateY(${rate}px)`;
            element.style.transition = 'transform 0.1s ease-out';
          });

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================
     부드러운 스크롤
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /* ============================================
     마우스 커서 효과 (선택적)
     ============================================ */
  function initCursorEffect() {
    // 커스텀 커서는 필요시 활성화
    // const cursor = document.createElement('div');
    // cursor.className = 'custom-cursor';
    // document.body.appendChild(cursor);
    // 
    // document.addEventListener('mousemove', (e) => {
    //   cursor.style.left = e.clientX + 'px';
    //   cursor.style.top = e.clientY + 'px';
    // });
  }

  /* ============================================
     페이지 로드 완료 처리
     ============================================ */
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  /* ============================================
     성능 최적화: 리사이즈 디바운싱
     ============================================ */
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // 리사이즈 후 필요한 작업만 수행
      // 애니메이션은 자동으로 재조정됨
    }, 250);
  }, { passive: true });

})();
