// BI 대시보드 페이지 자바스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 필터 요소
    const fiscalYearFilter = document.getElementById('fiscal-year');
    const departmentFilter = document.getElementById('department-filter');
    const viewTypeFilter = document.getElementById('view-type');
    const applyFiltersBtn = document.getElementById('apply-filters');
    
    // 버튼 요소
    const exportDashboardBtn = document.getElementById('export-dashboard-btn');
    const printDashboardBtn = document.getElementById('print-dashboard-btn');
    
    // 차트 캔버스 요소
    const budgetAllocationChart = document.getElementById('budget-allocation-chart');
    const departmentBudgetChart = document.getElementById('department-budget-chart');
    const budgetChangeChart = document.getElementById('budget-change-chart');
    const performanceChart = document.getElementById('performance-chart');
    const priorityChart = document.getElementById('priority-chart');
    
    // 차트 객체 저장 변수
    let chartInstances = {};
    
    // 필터 적용 버튼 이벤트 리스너
    applyFiltersBtn.addEventListener('click', function() {
        updateAllCharts();
    });
    
    // 내보내기 버튼 이벤트 리스너
    exportDashboardBtn.addEventListener('click', function() {
        alert('대시보드를 이미지로 내보내는 중...');
        // 실제 구현에서는 차트를 이미지로 변환하여 다운로드하는 로직 필요
    });
    
    // 인쇄 버튼 이벤트 리스너
    printDashboardBtn.addEventListener('click', function() {
        alert('대시보드 인쇄 준비 중...');
        // 실제 구현에서는 window.print() 등으로 인쇄 기능 구현
    });
    
    // 초기 차트 그리기
    initializeCharts();
    
    // 모든 차트 초기화 및 생성 함수
    function initializeCharts() {
        createBudgetAllocationChart();
        createDepartmentBudgetChart();
        createBudgetChangeChart();
        createPerformanceChart();
        createPriorityChart();
    }
    
    // 모든 차트 업데이트 함수
    function updateAllCharts() {
        // 선택된 필터 값 가져오기
        const fiscalYear = fiscalYearFilter.value;
        const department = departmentFilter.value;
        const viewType = viewTypeFilter.value;
        
        // 필터 값에 따라 데이터 변경
        // 실제 구현에서는 API 호출 등으로 데이터 가져오기
        
        // 차트 업데이트
        updateBudgetAllocationChart(fiscalYear, department);
        updateDepartmentBudgetChart(fiscalYear, department);
        updateBudgetChangeChart(fiscalYear, department);
        updatePerformanceChart(fiscalYear, department);
        updatePriorityChart(fiscalYear, department);
    }
    
    // 분야별 예산 배분 원형 차트 생성 함수
    function createBudgetAllocationChart() {
        // 차트 데이터 (샘플 데이터)
        const data = {
            labels: ['복지분야', '경제분야', '행정분야', '환경분야', '문화관광분야'],
            datasets: [{
                data: [32, 25, 18, 15, 10],
                backgroundColor: [
                    'rgba(75, 139, 111, 0.8)',  // 메인 색상
                    'rgba(122, 179, 154, 0.8)', // 라이트 색상
                    'rgba(52, 102, 82, 0.8)',   // 다크 색상
                    'rgba(144, 193, 169, 0.8)', // 추가 색상 1
                    'rgba(94, 140, 97, 0.8)'    // 추가 색상 2
                ],
                borderWidth: 1
            }]
        };
        
        // 차트 옵션
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        boxWidth: 12
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${percentage}% (${value}억원)`;
                        }
                    }
                }
            }
        };
        
        // 차트 생성
        chartInstances.budgetAllocation = new Chart(budgetAllocationChart, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }
    
    // 부서별 예산 배분 막대 차트 생성 함수
    function createDepartmentBudgetChart() {
        // 차트 데이터 (샘플 데이터)
        const data = {
            labels: ['복지과', '기획예산과', '환경과', '행정과', '문화관광과'],
            datasets: [{
                label: '2025년 예산 (억원)',
                data: [104, 82, 65, 58, 33],
                backgroundColor: 'rgba(75, 139, 111, 0.8)',
                borderColor: 'rgba(75, 139, 111, 1)',
                borderWidth: 1
            }]
        };
        
        // 차트 옵션
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '예산액 (억원)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        };
        
        // 차트 생성
        chartInstances.departmentBudget = new Chart(departmentBudgetChart, {
            type: 'bar',
            data: data,
            options: options
        });
    }
    
    // 전년 대비 예산 변화 라인 차트 생성 함수
    function createBudgetChangeChart() {
        // 차트 데이터 (샘플 데이터)
        const data = {
            labels: ['복지분야', '경제분야', '행정분야', '환경분야', '문화관광분야'],
            datasets: [{
                label: '2024년 예산 (억원)',
                data: [95, 80, 60, 58, 35],
                borderColor: 'rgba(192, 192, 192, 1)',
                backgroundColor: 'rgba(192, 192, 192, 0.2)',
                borderWidth: 2,
                fill: false
            }, {
                label: '2025년 예산 (억원)',
                data: [104, 82, 58, 65, 33],
                borderColor: 'rgba(75, 139, 111, 1)',
                backgroundColor: 'rgba(75, 139, 111, 0.2)',
                borderWidth: 2,
                fill: false
            }]
        };
        
        // 차트 옵션
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '예산액 (억원)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        };
        
        // 차트 생성
        chartInstances.budgetChange = new Chart(budgetChangeChart, {
            type: 'line',
            data: data,
            options: options
        });
    }
    
    // 성과 대비 예산 효율성 산점도 차트 생성 함수
    function createPerformanceChart() {
        // 차트 데이터 (샘플 데이터)
        const data = {
            datasets: [{
                label: '주요 사업',
                data: [
                    { x: 105, y: 10, r: 15, project: '취약계층 지원사업' },
                    { x: 96, y: 5, r: 15, project: '지역경제활성화사업' },
                    { x: 95, y: 10, r: 15, project: '그린뉴딜 사업' },
                    { x: 97.8, y: -5, r: 15, project: '스마트시티 조성사업' },
                    { x: 90, y: -5, r: 12, project: '문화관광사업' }
                ],
                backgroundColor: [
                    'rgba(75, 139, 111, 0.8)',
                    'rgba(122, 179, 154, 0.8)',
                    'rgba(94, 140, 97, 0.8)',
                    'rgba(52, 102, 82, 0.8)',
                    'rgba(144, 193, 169, 0.8)'
                ],
                borderColor: [
                    'rgba(75, 139, 111, 1)',
                    'rgba(122, 179, 154, 1)',
                    'rgba(94, 140, 97, 1)',
                    'rgba(52, 102, 82, 1)',
                    'rgba(144, 193, 169, 1)'
                ],
                borderWidth: 1
            }]
        };
        
        // 차트 옵션
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '성과 달성률 (%)'
                    },
                    min: 85,
                    max: 110
                },
                y: {
                    title: {
                        display: true,
                        text: '예산 증감률 (%)'
                    },
                    min: -10,
                    max: 15
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return [
                                `사업명: ${point.project}`,
                                `성과 달성률: ${point.x}%`,
                                `예산 증감률: ${point.y}%`
                            ];
                        }
                    }
                }
            }
        };
        
        // 차트 생성
        chartInstances.performance = new Chart(performanceChart, {
            type: 'bubble',
            data: data,
            options: options
        });
    }
    
    // 우선순위별 예산 배분 가로 막대 차트 생성 함수
    function createPriorityChart() {
        // 차트 데이터 (샘플 데이터)
        const data = {
            labels: ['우선순위 상', '우선순위 중', '우선순위 하'],
            datasets: [{
                axis: 'y',
                label: '예산 비중 (%)',
                data: [60, 30, 10],
                backgroundColor: [
                    'rgba(75, 139, 111, 0.8)',
                    'rgba(122, 179, 154, 0.8)',
                    'rgba(144, 193, 169, 0.8)'
                ],
                borderColor: [
                    'rgba(75, 139, 111, 1)',
                    'rgba(122, 179, 154, 1)',
                    'rgba(144, 193, 169, 1)'
                ],
                borderWidth: 1
            }]
        };
        
        // 차트 옵션
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '예산 비중 (%)'
                    },
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        };
        
        // 차트 생성
        chartInstances.priority = new Chart(priorityChart, {
            type: 'bar',
            data: data,
            options: options
        });
    }
    
    // 예산 배분 차트 업데이트 함수
    function updateBudgetAllocationChart(fiscalYear, department) {
        // 실제 구현에서는 API에서 새 데이터를 가져와 차트 업데이트
        // 여기서는 간단한 예시로 구현
        
        let data;
        
        if (fiscalYear === '2024') {
            data = [30, 26, 19, 14, 11]; // 2024년 데이터
        } else if (fiscalYear === '2023') {
            data = [28, 27, 20, 13, 12]; // 2023년 데이터
        } else {
            data = [32, 25, 18, 15, 10]; // 기본(2025년) 데이터
        }
        
        // 차트 데이터 업데이트
        chartInstances.budgetAllocation.data.datasets[0].data = data;
        chartInstances.budgetAllocation.update();
    }
    
    // 부서별 예산 차트 업데이트 함수
    function updateDepartmentBudgetChart(fiscalYear, department) {
        // 실제 구현에서는 필터에 따라 차트 데이터 업데이트
        // 간단한 예시로 구현
        
        let data;
        
        if (fiscalYear === '2024') {
            data = [95, 80, 58, 60, 35]; // 2024년 데이터
        } else if (fiscalYear === '2023') {
            data = [90, 78, 54, 57, 33]; // 2023년 데이터
        } else {
            data = [104, 82, 65, 58, 33]; // 기본(2025년) 데이터
        }
        
        // 차트 데이터 업데이트
        chartInstances.departmentBudget.data.datasets[0].data = data;
        chartInstances.departmentBudget.update();
    }
    
    // 예산 변화 차트 업데이트 함수
    function updateBudgetChangeChart(fiscalYear, department) {
        // 실제 구현에서는 필터에 따라 차트 데이터 업데이트
        // 간단한 예시로 구현
        
        let prevYearData, currentYearData, labels;
        
        if (fiscalYear === '2024') {
            labels = ['복지분야', '경제분야', '행정분야', '환경분야', '문화관광분야'];
            prevYearData = [90, 78, 57, 54, 33]; // 2023년 데이터
            currentYearData = [95, 80, 60, 58, 35]; // 2024년 데이터
        } else if (fiscalYear === '2023') {
            labels = ['복지분야', '경제분야', '행정분야', '환경분야', '문화관광분야'];
            prevYearData = [85, 75, 55, 50, 30]; // 2022년 데이터
            currentYearData = [90, 78, 57, 54, 33]; // 2023년 데이터
        } else {
            labels = ['복지분야', '경제분야', '행정분야', '환경분야', '문화관광분야'];
            prevYearData = [95, 80, 60, 58, 35]; // 2024년 데이터
            currentYearData = [104, 82, 58, 65, 33]; // 2025년 데이터
        }
        
        // 차트 데이터 업데이트
        chartInstances.budgetChange.data.labels = labels;
        chartInstances.budgetChange.data.datasets[0].data = prevYearData;
        chartInstances.budgetChange.data.datasets[1].data = currentYearData;
        chartInstances.budgetChange.update();
    }
    
    // 성과 차트 업데이트 함수
    function updatePerformanceChart(fiscalYear, department) {
        // 실제 구현에서는 필터에 따라 차트 데이터 업데이트
        // 간단한 예시로 구현
        
        // 차트 업데이트 로직
        chartInstances.performance.update();
    }
    
    // 우선순위 차트 업데이트 함수
    function updatePriorityChart(fiscalYear, department) {
        // 실제 구현에서는 필터에 따라 차트 데이터 업데이트
        // 간단한 예시로 구현
        
        let data;
        
        if (fiscalYear === '2024') {
            data = [55, 35, 10]; // 2024년 데이터
        } else if (fiscalYear === '2023') {
            data = [50, 40, 10]; // 2023년 데이터
        } else {
            data = [60, 30, 10]; // 기본(2025년) 데이터
        }
        
        // 차트 데이터 업데이트
        chartInstances.priority.data.datasets[0].data = data;
        chartInstances.priority.update();
    }
});