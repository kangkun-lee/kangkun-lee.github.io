/* ============================================
   커스텀 JavaScript - 인터랙션 및 애니메이션
   ============================================ */

(function() {
  'use strict';

  // DOM 로드 완료 후 실행
  document.addEventListener('DOMContentLoaded', function() {
    initDarkMode(); // 다크모드 초기화를 먼저 실행
    initScrollAnimations();
    initNavbarEffects();
    initParallaxEffects();
    initSmoothScroll();
    initFloatingNav();
  });

  /* ============================================
     다크모드 기능
     ============================================ */
  function initDarkMode() {
    // 다크모드 토글 버튼 찾기
    const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
    
    if (darkModeToggles.length === 0) return;
    
    // 현재 테마 가져오기 (localStorage 또는 시스템 설정)
    function getTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      // 시스템 설정 확인
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }
    
    // 테마 설정
    function setTheme(theme) {
      const html = document.documentElement;
      if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    }
    
    // 초기 테마 적용
    const currentTheme = getTheme();
    setTheme(currentTheme);
    
    // 토글 버튼 클릭 이벤트
    darkModeToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
      });
    });
    
    // 시스템 테마 변경 감지 (사용자가 수동으로 설정하지 않은 경우만)
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // 초기 로드 시 localStorage에 저장된 값이 없으면 시스템 설정 따르기
      if (!localStorage.getItem('theme')) {
        mediaQuery.addEventListener('change', function(e) {
          if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
          }
        });
      }
    }
  }

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

    const floatingNavContainer = floatingNav.querySelector('.floating-nav-container');
    const floatingNavLinks = floatingNav.querySelector('.floating-nav-links');
    const floatingNavLogo = floatingNav.querySelector('.floating-nav-logo-wrap');
    const floatingNavButtons = floatingNav.querySelector('.floating-nav-buttons');
    const hamburgerButton = floatingNav.querySelector('.floating-nav-hamburger');
    // 모바일 메뉴는 floating-nav 밖에 있으므로 document에서 찾기
    const mobileMenu = document.querySelector('.floating-nav-mobile-menu');
    const mobileMenuOverlay = mobileMenu ? mobileMenu.querySelector('.mobile-menu-overlay') : null;
    const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu-link') : null;
    
    if (!floatingNavContainer || !floatingNavLinks) return;

    // 모바일 디바이스 감지 (화면 너비 기준으로 단순화)
    function isMobileDevice() {
      const width = window.innerWidth || document.documentElement.clientWidth;
      // 768px 이하를 모바일로 간주
      return width <= 768;
    }
    
    // 모바일/데스크톱 환경에 따라 스타일 적용
    function applyResponsiveStyles(forceCloseMenu) {
      const isMobile = isMobileDevice();
      const menuIsOpen = mobileMenu && mobileMenu.classList.contains('active');
      
      if (isMobile) {
        // 모바일: 햄버거 버튼 표시, 데스크톱 링크 숨김
        if (hamburgerButton) {
          hamburgerButton.style.setProperty('display', 'flex', 'important');
          hamburgerButton.style.setProperty('visibility', 'visible', 'important');
          hamburgerButton.style.setProperty('opacity', '1', 'important');
        }
        if (floatingNavLinks) {
          floatingNavLinks.style.setProperty('display', 'none', 'important');
        }
        // 모바일 환경에서는 메뉴를 닫지 않음 (사용자가 열어둔 경우 유지)
      } else {
        // 데스크톱: 햄버거 버튼 숨김, 인라인 스타일 제거하여 CSS가 적용되도록
        if (hamburgerButton) {
          hamburgerButton.style.display = '';
          hamburgerButton.style.visibility = '';
          hamburgerButton.style.opacity = '';
        }
        if (floatingNavLinks) {
          floatingNavLinks.style.display = '';
          floatingNavLinks.style.visibility = '';
          floatingNavLinks.style.opacity = '';
          floatingNavLinks.style.position = '';
          floatingNavLinks.style.width = '';
          floatingNavLinks.style.overflow = '';
        }
        // 데스크톱으로 전환될 때만 모바일 메뉴 닫기 (forceCloseMenu가 true이거나 메뉴가 열려있을 때)
        if (mobileMenu && (forceCloseMenu || menuIsOpen)) {
          closeMobileMenu();
        }
      }
    }

    // 햄버거 메뉴 토글
    function toggleMobileMenu() {
      if (!hamburgerButton || !mobileMenu) return;
      
      // 햄버거 버튼이 보이면 (모바일 환경) 메뉴 토글
      const hamburgerVisible = window.getComputedStyle(hamburgerButton).display !== 'none' && 
                               hamburgerButton.offsetWidth > 0;
      
      if (!hamburgerVisible) {
        return;
      }
      
      const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }

    function openMobileMenu() {
      if (!hamburgerButton || !mobileMenu) {
        return;
      }
      
      // 햄버거 버튼이 보이는 경우에만 메뉴 열기
      const hamburgerVisible = window.getComputedStyle(hamburgerButton).display !== 'none' && 
                               hamburgerButton.offsetWidth > 0;
      
      if (!hamburgerVisible) {
        return;
      }
      
      hamburgerButton.setAttribute('aria-expanded', 'true');
      hamburgerButton.setAttribute('aria-label', '메뉴 닫기');
      
      // CSS transition이 작동하도록 display를 먼저 설정
      mobileMenu.style.display = 'block';
      
      // 다음 프레임에서 active 클래스 추가하여 애니메이션 트리거
      requestAnimationFrame(function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // 스크롤 방지
      });
    }

    function closeMobileMenu() {
      if (!hamburgerButton || !mobileMenu) return;
      
      // 이미 닫혀있으면 중복 실행 방지
      if (!mobileMenu.classList.contains('active')) {
        return;
      }
      
      hamburgerButton.setAttribute('aria-expanded', 'false');
      hamburgerButton.setAttribute('aria-label', '메뉴 열기');
      
      // active 클래스 제거하여 애니메이션 트리거
      mobileMenu.classList.remove('active');
      document.body.style.overflow = ''; // 스크롤 복원
      
      // 애니메이션 완료 후 display 숨김 (CSS transition 시간에 맞춤)
      setTimeout(function() {
        // 다시 확인 (사용자가 다시 열었을 수 있음)
        if (!mobileMenu.classList.contains('active')) {
          mobileMenu.style.display = 'none';
        }
      }, 350); // CSS transition 시간(350ms)보다 약간 길게
    }

    // 햄버거 버튼 클릭 이벤트 (중복 실행 방지)
    if (hamburgerButton) {
      let isToggling = false; // 토글 중복 실행 방지 플래그
      
      function handleToggle(e) {
        if (isToggling) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        
        isToggling = true;
        e.preventDefault();
        e.stopPropagation();
        
        toggleMobileMenu();
        
        // 짧은 시간 후 플래그 해제 (중복 클릭 방지)
        setTimeout(function() {
          isToggling = false;
        }, 300);
      }
      
      // 클릭 이벤트
      hamburgerButton.addEventListener('click', handleToggle, { passive: false });
      
      // 터치 이벤트도 지원 (모바일) - click과 중복 방지
      hamburgerButton.addEventListener('touchend', function(e) {
        // click 이벤트가 발생하지 않도록 preventDefault
        e.preventDefault();
        e.stopPropagation();
        handleToggle(e);
      }, { passive: false });
      
      // 포인터 이벤트는 제거 (click과 touchend로 충분)
    }

    // 닫기 버튼 찾기
    const mobileMenuClose = mobileMenu ? mobileMenu.querySelector('.mobile-menu-close') : null;

    // 닫기 버튼 클릭 시 메뉴 닫기
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    // 오버레이 클릭 시 메뉴 닫기
    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    if (mobileMenuLinks) {
      mobileMenuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          // 링크 클릭은 정상적으로 처리되도록 약간의 지연 후 닫기
          setTimeout(function() {
            closeMobileMenu();
          }, 100);
        });
      });
    }

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
      }
    });
    
    // 메뉴 외부 클릭 시 닫기 방지 (오버레이를 통해서만 닫히도록)
    // 이렇게 하면 실수로 메뉴가 닫히는 것을 방지할 수 있습니다

    // 화면 크기별 최소 너비 기준
    function getMinWidthThreshold() {
      const isMobile = isMobileDevice();
      const windowWidth = window.innerWidth;
      
      // 모바일: 더 작은 기준 적용
      if (isMobile || windowWidth <= 480) {
        return 320; // 매우 작은 모바일
      } else if (windowWidth <= 768) {
        return 480; // 태블릿
      } else {
        return 600; // 데스크톱
      }
    }

    // 동적으로 네비게이션 링크 표시/숨김 처리 (데스크톱만)
    function checkNavSpace() {
      // 모바일에서는 햄버거 메뉴 사용, 동적 처리 안 함
      if (isMobileDevice()) {
        return;
      }

      if (!floatingNavContainer || !floatingNavLinks || !floatingNavLogo || !floatingNavButtons) return;

      // 모든 요소의 실제 너비 계산
      const containerWidth = floatingNavContainer.offsetWidth;
      const logoWidth = floatingNavLogo.offsetWidth;
      const buttonsWidth = floatingNavButtons.offsetWidth;
      
      // 링크의 실제 너비 측정
      let linksWidth = 0;
      const wasHidden = floatingNavLinks.style.visibility === 'hidden' || 
                        floatingNavLinks.style.opacity === '0';
      
      if (wasHidden) {
        // 임시로 표시해서 너비 측정 (레이아웃에 영향을 주지 않도록)
        const originalStyles = {
          visibility: floatingNavLinks.style.visibility,
          opacity: floatingNavLinks.style.opacity,
          position: floatingNavLinks.style.position,
          width: floatingNavLinks.style.width,
          overflow: floatingNavLinks.style.overflow
        };
        
        floatingNavLinks.style.visibility = 'visible';
        floatingNavLinks.style.opacity = '1';
        floatingNavLinks.style.position = 'absolute';
        floatingNavLinks.style.left = '-9999px';
        floatingNavLinks.style.width = 'auto';
        floatingNavLinks.style.overflow = 'visible';
        
        // 강제 리플로우
        void floatingNavLinks.offsetWidth;
        
        linksWidth = floatingNavLinks.scrollWidth;
        
        // 원래 스타일 복원
        Object.keys(originalStyles).forEach(function(key) {
          floatingNavLinks.style[key] = originalStyles[key] || '';
        });
        floatingNavLinks.style.left = '';
      } else {
        linksWidth = floatingNavLinks.scrollWidth || floatingNavLinks.offsetWidth;
      }
      
      // 데스크톱 여유 공간 계산
      const paddingGap = 80;
      const availableSpace = containerWidth - logoWidth - buttonsWidth - paddingGap;
      const minWidthThreshold = getMinWidthThreshold();
      
      // 링크가 공간에 맞지 않거나 최소 너비 미만이면 숨김
      const shouldHide = linksWidth > availableSpace || containerWidth < minWidthThreshold;
      
      if (shouldHide) {
        floatingNavLinks.style.opacity = '0';
        floatingNavLinks.style.visibility = 'hidden';
        floatingNavLinks.style.position = 'absolute';
        floatingNavLinks.style.width = '0';
        floatingNavLinks.style.overflow = 'hidden';
        floatingNavContainer.style.justifyContent = 'space-between';
      } else {
        floatingNavLinks.style.opacity = '1';
        floatingNavLinks.style.visibility = 'visible';
        floatingNavLinks.style.position = '';
        floatingNavLinks.style.width = '';
        floatingNavLinks.style.overflow = '';
        floatingNavContainer.style.justifyContent = '';
      }
    }

    // 반응형 스타일 적용 (초기 로드 시에는 메뉴 닫지 않음)
    applyResponsiveStyles(false);
    
    // 초기 체크 (여러 번 체크하여 폰트 로딩 등 고려)
    checkNavSpace();
    
    // DOM이 완전히 렌더링된 후 다시 체크 (메뉴 닫지 않음)
    setTimeout(function() {
      applyResponsiveStyles(false);
      checkNavSpace();
    }, 100);
    setTimeout(function() {
      applyResponsiveStyles(false);
      checkNavSpace();
    }, 500);
    
    // 폰트 로딩 완료 후 체크 (메뉴 닫지 않음)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() {
        applyResponsiveStyles(false);
        checkNavSpace();
      });
    }

    // 리사이즈 시 체크 (디바운싱)
    let resizeTimer;
    let previousIsMobile = isMobileDevice();
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        const currentIsMobile = isMobileDevice();
        const wasDesktop = !previousIsMobile;
        const isNowDesktop = !currentIsMobile;
        
        // 데스크톱으로 전환된 경우에만 메뉴 닫기
        const shouldCloseMenu = wasDesktop === false && isNowDesktop === true;
        
        // 반응형 스타일 적용 (데스크톱으로 전환된 경우에만 메뉴 닫기)
        applyResponsiveStyles(shouldCloseMenu);
        
        // 이전 상태 업데이트
        previousIsMobile = currentIsMobile;
        
        checkNavSpace();
      }, 150);
    }, { passive: true });

    // 모바일 orientation change 처리
    window.addEventListener('orientationchange', function() {
      // orientation change 후 레이아웃 재계산을 위해 약간의 지연
      setTimeout(function() {
        // 모바일 환경에서는 메뉴를 유지 (orientation change는 모바일에서만 발생)
        applyResponsiveStyles(false);
        checkNavSpace();
      }, 300);
    }, { passive: true });

    // 스크롤 효과
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
