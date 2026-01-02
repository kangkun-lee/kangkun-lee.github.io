/* ============================================
   위키 스타일 자동 링크 생성
   마크다운에서 [[개념명]] 형식을 자동으로 링크로 변환
   ============================================ */

(function() {
  'use strict';

  // 개념 사전 (data/concepts.yaml에서 로드하거나 직접 정의)
  const conceptMap = {
    '선형 회귀': 'Linear Regression',
    'Linear Regression': 'Linear Regression',
    '로지스틱 회귀': 'Logistic Regression',
    '릿지 회귀': 'Ridge Regression',
    '라쏘 회귀': 'Lasso Regression',
    '회귀': 'Linear Regression',
    'regression': 'Linear Regression'
  };

  // 모든 포스트 정보 수집
  let postsMap = {};
  
  function initWikiLinks() {
    // 페이지 로드 후 실행
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', processWikiLinks);
    } else {
      processWikiLinks();
    }
  }

  let isProcessing = false; // 무한 루프 방지 플래그

  function processWikiLinks() {
    if (isProcessing) return; // 이미 처리 중이면 스킵
    isProcessing = true;

    const contentArea = document.querySelector('.post-content, .nested-copy-line-height, article > div');
    if (!contentArea) {
      isProcessing = false;
      return;
    }

    // 이미 처리된 표시가 있으면 스킵
    if (contentArea.dataset.wikiProcessed === 'true') {
      isProcessing = false;
      return;
    }

    // [[개념명]] 패턴 찾기
    const wikiLinkPattern = /\[\[([^\]]+)\]\]/g;
    const originalHTML = contentArea.innerHTML;
    const newHTML = originalHTML.replace(wikiLinkPattern, function(match, concept) {
      const trimmedConcept = concept.trim();
      
      // 이미 링크인 경우 스킵
      if (match.includes('<a ') || match.includes('</a>')) {
        return match;
      }

      // 개념 사전에서 찾기
      const targetPost = findPostForConcept(trimmedConcept);
      
      if (targetPost) {
        return `<a href="${targetPost.url}" class="wiki-link" title="${trimmedConcept}에 대한 포스트">${trimmedConcept}</a>`;
      } else {
        // 링크를 찾지 못한 경우 (선택적: 스타일링만)
        return `<span class="wiki-link-missing" title="'${trimmedConcept}'에 대한 포스트를 찾을 수 없습니다">${trimmedConcept}</span>`;
      }
    });

    // 내용이 변경된 경우에만 업데이트
    if (newHTML !== originalHTML) {
      contentArea.innerHTML = newHTML;
      contentArea.dataset.wikiProcessed = 'true';
    }

    isProcessing = false;
  }

  function findPostForConcept(concept) {
    // 1. 개념 사전에서 직접 매핑 확인
    if (conceptMap[concept]) {
      const mappedTitle = conceptMap[concept];
      return findPostByTitle(mappedTitle);
    }

    // 2. 포스트 제목에서 직접 검색
    return findPostByTitle(concept);
  }

  function findPostByTitle(title) {
    // 현재 페이지의 모든 링크를 확인하여 포스트 찾기
    const links = document.querySelectorAll('a[href*="/posts/"], a[href*="/202"]');
    
    for (let link of links) {
      const linkText = link.textContent.trim();
      const href = link.getAttribute('href');
      
      // 제목이 정확히 일치하거나 포함되는 경우
      if (linkText.toLowerCase() === title.toLowerCase() || 
          linkText.toLowerCase().includes(title.toLowerCase()) ||
          title.toLowerCase().includes(linkText.toLowerCase())) {
        return {
          url: href,
          title: linkText
        };
      }
    }

    // 페이지 메타데이터에서 찾기 (Hugo가 제공하는 경우)
    // 이 부분은 Hugo의 데이터를 활용하도록 확장 가능
    
    return null;
  }

  // 초기화
  initWikiLinks();

  // 동적 콘텐츠를 위한 MutationObserver (디바운싱 적용)
  let mutationTimeout;
  const observer = new MutationObserver(function(mutations) {
    let shouldProcess = false;
    mutations.forEach(function(mutation) {
      // 우리가 추가한 링크가 아닌 새로운 콘텐츠만 처리
      if (mutation.addedNodes.length > 0) {
        for (let node of mutation.addedNodes) {
          if (node.nodeType === 1 && !node.classList.contains('wiki-link') && !node.classList.contains('wiki-link-missing')) {
            shouldProcess = true;
            break;
          }
        }
      }
    });
    
    if (shouldProcess) {
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(function() {
        const contentArea = document.querySelector('.post-content, .nested-copy-line-height, article > div');
        if (contentArea && contentArea.dataset.wikiProcessed !== 'true') {
          processWikiLinks();
        }
      }, 300); // 300ms 디바운싱
    }
  });

  // 초기 처리 후 콘텐츠 영역 관찰
  setTimeout(function() {
    const contentArea = document.querySelector('.post-content, .nested-copy-line-height, article > div');
    if (contentArea) {
      observer.observe(contentArea, {
        childList: true,
        subtree: true,
        characterData: false // 텍스트 변경은 무시 (무한 루프 방지)
      });
    }
  }, 500);

})();
