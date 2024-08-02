// 거래 보고서 관련 기능을 가져옵니다.
import {
  reflectDate,
  showReportDataLoading,
  getTransactionReportData,
  reflectTransactionReport,
} from './features/transactionReport';

// DOM이 완전히 로드된 후 실행될 이벤트 리스너를 추가합니다.
document.addEventListener('DOMContentLoaded', async () => {
  // body 태그의 data-page 속성에서 현재 페이지 타입을 가져옵니다.
  const pageType = document.body.dataset.page;

  // 현재 페이지가 'report' 페이지인 경우에만 실행합니다.
  if (pageType === 'report') {
    reflectDate();

    // 데이터 로딩 중임을 UI에 표시합니다.
    showReportDataLoading();

    // 거래 보고서 데이터를 비동기적으로 가져옵니다.
    const data = await getTransactionReportData();

    // 가져온 데이터를 UI에 반영합니다.
    reflectTransactionReport(data);
  }
});
