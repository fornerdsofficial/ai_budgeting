// AI 분석 페이지 자바스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 버튼 요소
    const startAnalysisBtn = document.getElementById('start-analysis-btn');
    const pauseAnalysisBtn = document.getElementById('pause-analysis-btn');
    const viewResultBtn = document.getElementById('view-result-btn');
    
    // 분석 상태 및 진행 요소
    const analysisStatusText = document.getElementById('analysis-status-text');
    const analysisProgress = document.getElementById('analysis-progress');
    const progressPercentage = document.getElementById('progress-percentage');
    const estimatedTime = document.getElementById('estimated-time');
    const processedData = document.getElementById('processed-data');
    const modelingIterations = document.getElementById('modeling-iterations');
    const optimizedItems = document.getElementById('optimized-items');
    
    // 단계 요소
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');
    const step5 = document.getElementById('step-5');
    
    // 로그 요소
    const analysisLog = document.getElementById('analysis-log');
    
    // 모달 요소
    const resultModal = document.getElementById('result-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // 분석 상태 변수
    let analysisRunning = false;
    let analysisCompleted = false;
    let currentStep = 0;
    let progress = 0;
    let processedDataCount = 0;
    let modelingIterationCount = 0;
    let optimizedItemCount = 0;
    
    // 분석 시작 버튼 이벤트 리스너
    startAnalysisBtn.addEventListener('click', function() {
        if (!analysisRunning && !analysisCompleted) {
            startAnalysis();
        } else if (analysisRunning) {
            // 이미 실행 중이라면 무시
        } else if (analysisCompleted) {
            // 이미 완료되었다면 결과 모달 표시
            showResultModal();
        }
    });
    
    // 분석 일시정지 버튼 이벤트 리스너
    pauseAnalysisBtn.addEventListener('click', function() {
        if (analysisRunning) {
            pauseAnalysis();
        }
    });
    
    // 결과 보기 버튼 이벤트 리스너
    viewResultBtn.addEventListener('click', function() {
        showResultModal();
    });
    
    // 모달 닫기 이벤트 리스너
    modalClose.addEventListener('click', function() {
        resultModal.classList.remove('active');
    });
    
    // 분석 시작 함수
    function startAnalysis() {
        analysisRunning = true;
        startAnalysisBtn.innerHTML = '<i class="fas fa-sync fa-spin"></i> 분석 진행 중...';
        pauseAnalysisBtn.disabled = false;
        
        // 분석 상태 업데이트
        analysisStatusText.textContent = '분석 진행 중...';
        
        // 로그에 시작 메시지 추가
        addLog('system', '인공지능 예산 편성 분석 시작');
        addLog('info', '데이터 전처리 단계 시작');
        
        // 첫 번째 단계 활성화
        activateStep(1);
        
        // 분석 진행 시뮬레이션 시작
        runAnalysisSimulation();
    }
    
    // 분석 일시정지 함수
    function pauseAnalysis() {
        analysisRunning = false;
        pauseAnalysisBtn.disabled = true;
        startAnalysisBtn.innerHTML = '<i class="fas fa-play"></i> 분석 재개';
        
        // 상태 업데이트
        analysisStatusText.textContent = '분석 일시정지됨';
        
        // 로그에 일시정지 메시지 추가
        addLog('warning', '사용자에 의해 분석이 일시정지되었습니다.');
    }
    
    // 분석 완료 함수
    function completeAnalysis() {
        analysisRunning = false;
        analysisCompleted = true;
        
        // 버튼 상태 업데이트
        startAnalysisBtn.innerHTML = '<i class="fas fa-check-circle"></i> 분석 완료';
        startAnalysisBtn.disabled = true;
        pauseAnalysisBtn.disabled = true;
        viewResultBtn.disabled = false;
        
        // 상태 업데이트
        analysisStatusText.textContent = '분석이 완료되었습니다.';
        progressPercentage.textContent = '100%';
        
        // 로그에 완료 메시지 추가
        addLog('system', '인공지능 예산 편성 분석이 성공적으로 완료되었습니다.');
        addLog('info', '결과 보기 버튼을 클릭하여 분석 결과를 확인하세요.');
        
        // 모달 표시
        setTimeout(showResultModal, 1000);
    }
    
    // 분석 진행 시뮬레이션 함수
    function runAnalysisSimulation() {
        // 각 단계별 소요 시간(ms) 설정
        const stepDurations = [
            10000, // 데이터 전처리: 10초
            15000, // 예산 실적 분석: 15초
            12000, // 성과 연계 분석: 12초
            18000, // 우선순위 모델링: 18초
            15000  // 예산안 최적화: 15초
        ];
        
        // 총 분석 시간
        const totalAnalysisTime = stepDurations.reduce((a, b) => a + b, 0);
        // 업데이트 간격(ms)
        const updateInterval = 500;
        
        // 진행 업데이트 함수
        let elapsedTime = 0;
        let stepStartTime = 0;
        
        const simulationInterval = setInterval(() => {
            if (!analysisRunning) {
                return; // 일시정지 상태면 업데이트 중지
            }
            
            elapsedTime += updateInterval;
            
            // 현재 단계와 진행도 계산
            let currentStepDuration = 0;
            let stepProgress = 0;
            let currentStepIndex = 0;
            
            for (let i = 0; i < stepDurations.length; i++) {
                if (stepStartTime + stepDurations[i] > elapsedTime) {
                    currentStepDuration = stepDurations[i];
                    stepProgress = (elapsedTime - stepStartTime) / currentStepDuration;
                    currentStepIndex = i;
                    break;
                } else {
                    stepStartTime += stepDurations[i];
                    currentStepIndex = i + 1;
                }
            }
            
            // 모든 단계가 완료되었는지 확인
            if (currentStepIndex >= stepDurations.length) {
                clearInterval(simulationInterval);
                completeAnalysis();
                return;
            }
            
            // 현재 단계 활성화
            activateStep(currentStepIndex + 1);
            
            // 전체 진행률 계산
            progress = (elapsedTime / totalAnalysisTime) * 100;
            if (progress > 100) progress = 100;
            
            // 진행 상태 업데이트
            updateProgress(progress);
            
            // 남은 시간 계산 및 표시
            const remainingTime = totalAnalysisTime - elapsedTime;
            updateRemainingTime(remainingTime);
            
            // 지표 업데이트
            updateMetrics(progress);
            
            // 간헐적으로 로그 추가
            if (Math.random() < 0.3) {
                addRandomLog(currentStepIndex + 1);
            }
        }, updateInterval);
    }
    
    // 진행 상태 업데이트 함수
    function updateProgress(percentage) {
        analysisProgress.style.width = `${percentage}%`;
        progressPercentage.textContent = `${Math.floor(percentage)}%`;
    }
    
    // 남은 시간 업데이트 함수
    function updateRemainingTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        estimatedTime.textContent = `예상 소요시간: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // 지표 업데이트 함수
    function updateMetrics(percentage) {
        // 진행도에 따라 지표값 증가
        processedDataCount = Math.floor(1250 * (percentage / 100));
        modelingIterationCount = Math.floor(50 * (percentage / 100));
        optimizedItemCount = Math.floor(98 * (percentage / 100));
        
        processedData.textContent = processedDataCount.toLocaleString();
        modelingIterations.textContent = modelingIterationCount;
        optimizedItems.textContent = optimizedItemCount;
    }
    
    // 단계 활성화 함수
    function activateStep(stepNumber) {
        if (currentStep === stepNumber) {
            return; // 이미 현재 단계이면 무시
        }
        
        // 이전 단계는 완료 상태로 변경
        for (let i = 1; i < stepNumber; i++) {
            const prevStep = document.getElementById(`step-${i}`);
            const prevStepStatus = prevStep.querySelector('.step-status');
            
            prevStep.classList.remove('active');
            prevStep.classList.add('completed');
            
            prevStepStatus.className = 'step-status completed';
            prevStepStatus.innerHTML = '<i class="fas fa-check-circle"></i> 완료';
        }
        
        // 현재 단계 활성화
        const currentStepElement = document.getElementById(`step-${stepNumber}`);
        const currentStepStatus = currentStepElement.querySelector('.step-status');
        
        currentStepElement.classList.remove('completed');
        currentStepElement.classList.add('active');
        
        currentStepStatus.className = 'step-status in-progress';
        currentStepStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 진행 중';
        
        // 다음 단계는 대기 상태 유지
        for (let i = stepNumber + 1; i <= 5; i++) {
            const nextStep = document.getElementById(`step-${i}`);
            const nextStepStatus = nextStep.querySelector('.step-status');
            
            nextStep.classList.remove('active', 'completed');
            
            nextStepStatus.className = 'step-status pending';
            nextStepStatus.innerHTML = '<i class="fas fa-clock"></i> 대기 중';
        }
        
        // 단계가 변경되면 로그 추가
        if (currentStep !== stepNumber) {
            const stepNames = [
                '데이터 전처리',
                '예산 실적 분석',
                '성과 연계 분석',
                '우선순위 모델링',
                '예산안 최적화'
            ];
            
            if (stepNumber > 1) {
                addLog('info', `${stepNames[stepNumber - 2]} 단계 완료`);
            }
            
            addLog('system', `${stepNames[stepNumber - 1]} 단계 시작`);
        }
        
        currentStep = stepNumber;
    }
    
    // 로그 추가 함수
    function addLog(type, message) {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.innerHTML = `
            <span class="log-time">${timeString}</span>
            <span class="log-message">${message}</span>
        `;
        
        analysisLog.appendChild(logEntry);
        analysisLog.scrollTop = analysisLog.scrollHeight;
    }
    
    // 랜덤 로그 추가 함수 (단계별)
    function addRandomLog(stepNumber) {
        const logMessages = [
            [ // 데이터 전처리 단계 로그
                '입력 데이터 검증 중...',
                '결측치 처리: 사업별 예산 집행 데이터',
                '이상치 감지 및 필터링 중...',
                '데이터 정규화 진행 중...',
                '전처리 알고리즘 최적화 중...'
            ],
            [ // 예산 실적 분석 단계 로그
                '3년간 예산 집행 추세 분석 중...',
                '부서별 예산 집행률 분석 중...',
                '예산 항목별 실적 패턴 추출 중...',
                '계절적 변동 요인 분석 중...',
                '집행률 저조 항목 특성 분석 중...'
            ],
            [ // 성과 연계 분석 단계 로그
                '성과지표 데이터 연계 중...',
                '예산 대비 성과 효율성 평가 중...',
                '고효율 예산 항목 특성 추출 중...',
                '성과 대비 투입 최적화 모델링 중...',
                '성과지표 가중치 계산 중...'
            ],
            [ // 우선순위 모델링 단계 로그
                '정책 우선순위 데이터 반영 중...',
                '중점 추진 사업 가중치 적용 중...',
                '다기준 의사결정 모델 구축 중...',
                '우선순위별 예산 최적 배분 계산 중...',
                '사업 간 우선순위 조정 로직 적용 중...'
            ],
            [ // 예산안 최적화 단계 로그
                '최적 예산 배분 알고리즘 실행 중...',
                '예산 항목 간 균형 조정 중...',
                '법정 의무 경비 검토 및 반영 중...',
                '예산안 타당성 검증 중...',
                '최종 예산안 조정 및 최적화 중...'
            ]
        ];
        
        const logTypes = ['info', 'system'];
        const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
        const randomMessage = logMessages[stepNumber - 1][Math.floor(Math.random() * logMessages[stepNumber - 1].length)];
        
        addLog(randomType, randomMessage);
    }
    
    // 결과 모달 표시 함수
    function showResultModal() {
        resultModal.classList.add('active');
    }
});