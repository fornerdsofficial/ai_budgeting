// 데이터 수집 페이지 자바스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 파일 업로드 관련 요소
    const budgetHistoryUpload = document.getElementById('budget-history-upload');
    const budgetHistoryFilename = document.getElementById('budget-history-filename');
    const performanceUpload = document.getElementById('performance-upload');
    const performanceFilename = document.getElementById('performance-filename');
    const priorityUpload = document.getElementById('priority-upload');
    const priorityFilename = document.getElementById('priority-filename');
    
    // 미리보기 관련 요소
    const previewSource = document.getElementById('preview-source');
    const previewTable = document.getElementById('preview-table');
    
    // 버튼 요소
    const validateDataBtn = document.getElementById('validate-data-btn');
    const proceedAnalysisBtn = document.getElementById('proceed-analysis-btn');
    const connectBtn = document.getElementById('connect-btn');
    
    // 모달 요소
    const uploadModal = document.getElementById('upload-modal');
    const modalClose = document.querySelector('.modal-close');
    const progressBar = document.querySelector('.progress-bar');
    const uploadStatus = document.getElementById('upload-status');
    
    // 데이터 상태 추적
    const dataStatus = {
        budgetHistory: false,
        performance: false,
        priority: false,
        connection: false
    };
    
    // 파일 업로드 이벤트 리스너
    budgetHistoryUpload.addEventListener('change', function() {
        handleFileUpload(this, budgetHistoryFilename, 'budgetHistory');
    });
    
    performanceUpload.addEventListener('change', function() {
        handleFileUpload(this, performanceFilename, 'performance');
    });
    
    priorityUpload.addEventListener('change', function() {
        handleFileUpload(this, priorityFilename, 'priority');
    });
    
    // 연결 버튼 이벤트 리스너
    connectBtn.addEventListener('click', function() {
        const connectionType = document.getElementById('connection-type').value;
        const connectionUrl = document.getElementById('connection-url').value;
        
        if (!connectionType || !connectionUrl) {
            alert('연결 유형과 URL을 모두 입력해주세요.');
            return;
        }
        
        // 연결 시도 시뮬레이션
        const statusIcon = connectBtn.closest('.card').querySelector('.status-icon');
        const statusText = connectBtn.closest('.card').querySelector('.status-text');
        
        statusIcon.className = 'status-icon processing';
        statusIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        statusText.textContent = '연결 중...';
        
        setTimeout(() => {
            statusIcon.className = 'status-icon success';
            statusIcon.innerHTML = '<i class="fas fa-check"></i>';
            statusText.textContent = '연결됨';
            
            dataStatus.connection = true;
            updateButtonStatus();
            
            // 데이터 미리보기 옵션 추가
            addPreviewOption(connectionType);
        }, 2000);
    });
    
    // 미리보기 소스 변경 이벤트 리스너
    previewSource.addEventListener('change', function() {
        if (this.value) {
            loadPreviewData(this.value);
        }
    });
    
    // 검증 버튼 이벤트 리스너
    validateDataBtn.addEventListener('click', function() {
        // 데이터 검증 시뮬레이션
        validateData();
    });
    
    // 분석 진행 버튼 이벤트 리스너
    proceedAnalysisBtn.addEventListener('click', function() {
        // 분석 페이지로 이동
        window.location.href = 'analysis.html';
    });
    
    // 모달 닫기 이벤트 리스너
    modalClose.addEventListener('click', function() {
        uploadModal.classList.remove('active');
    });
    
    // 파일 업로드 처리 함수
    function handleFileUpload(input, filenameElement, dataType) {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            filenameElement.textContent = file.name;
            
            // 업로드 모달 표시
            uploadModal.classList.add('active');
            progressBar.style.width = '0%';
            uploadStatus.textContent = '파일 처리 중...';
            
            // 업로드 프로그레스 시뮬레이션
            simulateUploadProgress(input, dataType);
        }
    }
    
    // 업로드 진행 시뮬레이션 함수
    function simulateUploadProgress(input, dataType) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                uploadStatus.textContent = '데이터 처리 완료!';
                
                setTimeout(() => {
                    uploadModal.classList.remove('active');
                    updateFileStatus(input, dataType);
                    
                    // 미리보기 옵션 추가
                    if (dataType === 'budgetHistory') {
                        addPreviewOption('예산 집행 이력');
                    } else if (dataType === 'performance') {
                        addPreviewOption('사업 성과 지표');
                    } else if (dataType === 'priority') {
                        addPreviewOption('우선순위 사업');
                    }
                }, 1000);
            }
        }, 100);
    }
    
    // 파일 상태 업데이트 함수
    function updateFileStatus(input, dataType) {
        const card = input.closest('.card');
        const statusIcon = card.querySelector('.status-icon');
        const statusText = card.querySelector('.status-text');
        
        statusIcon.className = 'status-icon success';
        statusIcon.innerHTML = '<i class="fas fa-check"></i>';
        statusText.textContent = '업로드 완료';
        
        dataStatus[dataType] = true;
        updateButtonStatus();
    }
    
    // 미리보기 옵션 추가 함수
    function addPreviewOption(sourceText) {
        // 중복 방지
        const existingOption = Array.from(previewSource.options).find(option => option.text === sourceText);
        if (!existingOption) {
            const option = document.createElement('option');
            
            if (sourceText === '예산 집행 이력') {
                option.value = 'budget-history';
            } else if (sourceText === '사업 성과 지표') {
                option.value = 'performance';
            } else if (sourceText === '우선순위 사업') {
                option.value = 'priority';
            } else {
                option.value = 'connection-' + sourceText.toLowerCase().replace(/\s+/g, '-');
            }
            
            option.text = sourceText;
            previewSource.appendChild(option);
        }
    }
    
    // 미리보기 데이터 로드 함수
    function loadPreviewData(sourceValue) {
        // 데이터 로드 시뮬레이션
        let headers, data;
        
        if (sourceValue === 'budget-history') {
            headers = ['부서코드', '부서명', '사업코드', '사업명', '예산액(천원)', '집행액(천원)', '집행률(%)', '회계연도'];
            data = [
                ['001', '기획예산과', 'P001', '지역경제활성화사업', '500,000', '450,000', '90.0', '2024'],
                ['001', '기획예산과', 'P002', '문화관광사업', '300,000', '280,000', '93.3', '2024'],
                ['002', '행정과', 'P003', '스마트시티 조성사업', '800,000', '750,000', '93.8', '2024'],
                ['003', '복지과', 'P004', '취약계층 지원사업', '400,000', '390,000', '97.5', '2024'],
                ['004', '환경과', 'P005', '그린뉴딜 사업', '600,000', '580,000', '96.7', '2024']
            ];
        } else if (sourceValue === 'performance') {
            headers = ['사업코드', '사업명', '성과지표', '목표값', '달성값', '달성률(%)', '평가등급', '회계연도'];
            data = [
                ['P001', '지역경제활성화사업', '일자리창출 수', '500', '480', '96.0', 'A', '2024'],
                ['P002', '문화관광사업', '관광객 증가율(%)', '20', '18', '90.0', 'B', '2024'],
                ['P003', '스마트시티 조성사업', '스마트서비스 만족도', '90', '88', '97.8', 'A', '2024'],
                ['P004', '취약계층 지원사업', '수혜자 수', '2000', '2100', '105.0', 'S', '2024'],
                ['P005', '그린뉴딜 사업', '탄소감축량(톤)', '1000', '950', '95.0', 'A', '2024']
            ];
        } else if (sourceValue === 'priority') {
            headers = ['우선순위', '정책분야', '사업코드', '사업명', '중요도', '긴급도', '비고'];
            data = [
                ['1', '복지', 'P004', '취약계층 지원사업', '상', '상', '국가정책 연계'],
                ['2', '경제', 'P001', '지역경제활성화사업', '상', '중', ''],
                ['3', '환경', 'P005', '그린뉴딜 사업', '중', '상', '중앙정부 매칭'],
                ['4', '스마트', 'P003', '스마트시티 조성사업', '중', '중', ''],
                ['5', '문화', 'P002', '문화관광사업', '중', '하', '']
            ];
        } else {
            headers = ['데이터 소스', '연결 상태', '마지막 업데이트', '레코드 수'];
            data = [
                ['e-호조', '연결됨', '2025-04-05 10:30:22', '1,250'],
                ['지방재정통합정보시스템', '연결됨', '2025-04-05 10:28:15', '850'],
                ['자체 DB', '연결됨', '2025-04-05 09:45:30', '320']
            ];
        }
        
        createPreviewTable(headers, data);
    }
    
    // 미리보기 테이블 생성 함수
    function createPreviewTable(headers, data) {
        let tableHTML = '<thead><tr>';
        
        // 헤더 추가
        headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        
        tableHTML += '</tr></thead><tbody>';
        
        // 데이터 행 추가
        data.forEach(row => {
            tableHTML += '<tr>';
            row.forEach(cell => {
                tableHTML += `<td>${cell}</td>`;
            });
            tableHTML += '</tr>';
        });
        
        tableHTML += '</tbody>';
        previewTable.innerHTML = tableHTML;
    }
    
    // 버튼 상태 업데이트 함수
    function updateButtonStatus() {
        const hasAnyData = dataStatus.budgetHistory || dataStatus.performance || dataStatus.priority || dataStatus.connection;
        const hasAllData = dataStatus.budgetHistory && dataStatus.performance && dataStatus.priority;
        
        validateDataBtn.disabled = !hasAnyData;
        proceedAnalysisBtn.disabled = !hasAllData;
    }
    
    // 데이터 검증 함수
    function validateData() {
        const cards = document.querySelectorAll('.data-source-card');
        let allValid = true;
        
        cards.forEach(card => {
            const statusIcon = card.querySelector('.status-icon');
            if (statusIcon.classList.contains('success')) {
                // 이미 검증된 상태로 유지
            } else if (statusIcon.classList.contains('pending')) {
                // 아직 업로드되지 않은 데이터는 검증 불가능
                allValid = false;
            }
        });
        
        if (allValid) {
            alert('모든 데이터가 유효합니다. AI 분석을 진행할 수 있습니다.');
            proceedAnalysisBtn.disabled = false;
        } else {
            alert('일부 데이터가 누락되었습니다. 모든 필수 데이터를 업로드해주세요.');
        }
    }
});