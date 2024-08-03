// 가계부 관련 기능을 가져옵니다.
import { accountBookInit } from './features/accountBook';
// 거래 보고서 관련 기능을 가져옵니다.
import { reportInit } from './features/transactionReport';

// DOM이 완전히 로드된 후 실행될 이벤트 리스너를 추가합니다.
document.addEventListener('DOMContentLoaded', () => {
  // body 태그의 data-page 속성에서 현재 페이지 타입을 가져옵니다.
  const pageType = document.body.dataset.page;

  // 현재 페이지가 'account-book' 페이지인 경우에만 실행합니다.
  if (pageType === 'account-book') {
    accountBookInit();
  }

  // 현재 페이지가 'report' 페이지인 경우에만 실행합니다.
  if (pageType === 'report') {
    reportInit();
  }
});
