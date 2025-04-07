// 예산안 결과 페이지 자바스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 요소 선택
    const viewTableBtn = document.getElementById('view-table');
    const viewCardsBtn = document.getElementById('view-cards');
    const tableView = document.getElementById('budget-table-view');
    const cardsView = document.getElementById('budget-cards-view');
    const budgetSearchInput = document.getElementById('budget-search');
    const departmentFilter = document.getElementById('department-filter');
    const categoryFilter = document.getElementById('category-filter');
    const budgetDetailModal = document.getElementById('budget-detail-modal');
    const modalClose = document.querySelector('.modal-close');
    const budgetDetailContent = document.getElementById('budget-detail-content');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const exportExcelBtn = document.getElementById('export-excel-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const saveBudgetBtn = document.getElementById('save-budget-btn');
    
    // 예산 항목 데이터 (실제로는 API에서 가져옴)
    const budgetItems = [
        {
            id: 'P004',
            department: '복지과',
            departmentCode: '003',
            name: '취약계층 지원사업',
            category: '복지',
            previousBudget: 400000000,
            newBudget: 440000000,
            changeRate: 10.0,
            priority: '상',
            description: '저소득층, 장애인, 노인 등 취약계층을 위한 복지 서비스 제공 사업',
            performance: {
                lastYear: {
                    target: '수혜자 수 2,000명',
                    achieved: '2,100명',
                    rate: 105
                },
                efficiency: '매우 높음',
                impact: '지역사회 삶의 질 향상에 큰 기여'
            },
            aiReasoning: '성과 대비 효율성이 높고, 정책 우선순위가 높은 사업으로 예산 확대 필요'
        },
        {
            id: 'P001',
            department: '기획예산과',
            departmentCode: '001',
            name: '지역경제활성화사업',
            category: '경제',
            previousBudget: 500000000,
            newBudget: 525000000,
            changeRate: 5.0,
            priority: '상',
            description: '지역 일자리 창출 및 경제 활성화를 위한 중소기업 지원 사업',
            performance: {
                lastYear: {
                    target: '일자리 창출 500개',
                    achieved: '480개',
                    rate: 96
                },
                efficiency: '높음',
                impact: '지역 경제 활성화에 기여'
            },
            aiReasoning: '코로나19 이후 지역경제 회복을 위해 필요한 사업으로 적정 수준 증액 필요'
        },
        {
            id: 'P005',
            department: '환경과',
            departmentCode: '004',
            name: '그린뉴딜 사업',
            category: '환경',
            previousBudget: 600000000,
            newBudget: 660000000,
            changeRate: 10.0,
            priority: '상',
            description: '기후변화 대응 및 녹색산업 육성을 위한 환경 프로젝트',
            performance: {
                lastYear: {
                    target: '탄소감축 1,000톤',
                    achieved: '950톤',
                    rate: 95
                },
                efficiency: '높음',
                impact: '환경 개선 및 지속가능한 발전에 기여'
            },
            aiReasoning: '국가 그린뉴딜 정책과 연계하여 중앙정부 매칭이 예상되므로 선제적 투자 필요'
        },
        {
            id: 'P003',
            department: '행정과',
            departmentCode: '002',
            name: '스마트시티 조성사업',
            category: '행정',
            previousBudget: 800000000,
            newBudget: 760000000,
            changeRate: -5.0,
            priority: '중',
            description: '디지털 기술을 활용한 도시 문제 해결 및 시민 삶의 질 향상 프로젝트',
            performance: {
                lastYear: {
                    target: '스마트서비스 만족도 90점',
                    achieved: '88점',
                    rate: 97.8
                },
                efficiency: '중간',
                impact: '행정 효율성 개선에 기여'
            },
            aiReasoning: '초기 인프라 구축이 완료되어 운영 단계로 전환됨에 따라 예산 일부 감액 가능'
        },
        {
            id: 'P002',
            department: '문화관광과',
            departmentCode: '005',
            name: '문화관광사업',
            category: '문화',
            previousBudget: 300000000,
            newBudget: 285000000,
            changeRate: -5.0,
            priority: '중',
            description: '지역 문화유산 보존 및 관광 자원화를 통한 지역 활성화 사업',
            performance: {
                lastYear: {
                    target: '관광객 증가율 20%',
                    achieved: '18%',
                    rate: 90
                },
                efficiency: '중간',
                impact: '지역 이미지 개선 및 관광수입 증대에 기여'
            },
            aiReasoning: '코로나19 이후 관광객 감소로 인해 일시적 예산 조정 필요'
        }
    ];
    
    // 뷰 전환 이벤트 리스너
    viewTableBtn.addEventListener('click', function() {
        tableView.style.display = 'block';
        cardsView.style.display = 'none';
        viewTableBtn.classList.add('active');
        viewCardsBtn.classList.remove('active');
    });
    
    viewCardsBtn.addEventListener('click', function() {
        tableView.style.display = 'none';
        cardsView.style.display = 'grid';
        viewTableBtn.classList.remove('active');
        viewCardsBtn.classList.add('active');
        
        // 처음 카드 뷰로 전환할 때 카드 생성
        if (cardsView.children.length <= 1) {
            createBudgetCards();
        }
    });
    
    // 검색 및 필터 이벤트 리스너
    budgetSearchInput.addEventListener('input', filterBudgetItems);
    departmentFilter.addEventListener('change', filterBudgetItems);
    categoryFilter.addEventListener('change', filterBudgetItems);
    
    // 예산 항목 편집 버튼 이벤트 리스너
    document.querySelectorAll('.btn-icon, .budget-card-footer .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openBudgetDetailModal(projectId);
        });
    });
    
    // 모달 닫기 이벤트 리스너
    modalClose.addEventListener('click', function() {
        budgetDetailModal.classList.remove('active');
    });
    
    // 취소 버튼 이벤트 리스너
    cancelEditBtn.addEventListener('click', function() {
        budgetDetailModal.classList.remove('active');
    });
    
    // 저장 버튼 이벤트 리스너
    saveEditBtn.addEventListener('click', function() {
        // 폼 데이터 처리 및 저장 로직
        const projectId = saveEditBtn.getAttribute('data-project');
        const newBudgetInput = document.getElementById('new-budget-input');
        const justificationInput = document.getElementById('justification-input');
        
        if (newBudgetInput && justificationInput) {
            const newBudget = parseInt(newBudgetInput.value);
            const justification = justificationInput.value;
            
            // 데이터 검증
            if (!newBudget || newBudget <= 0) {
                alert('유효한 예산액을 입력해주세요.');
                return;
            }
            
            // 예산 항목 데이터 업데이트
            updateBudgetItem(projectId, newBudget, justification);
            
            // 모달 닫기
            budgetDetailModal.classList.remove('active');
            
            // UI 업데이트
            updateBudgetUI();
        }
    });
    
    // 내보내기 버튼 이벤트 리스너
    exportExcelBtn.addEventListener('click', function() {
        alert('Excel 파일로 내보내기가 시작되었습니다.');
        // 실제로는 Excel 내보내기 로직 구현
    });
    
    exportPdfBtn.addEventListener('click', function() {
        alert('PDF 파일로 내보내기가 시작되었습니다.');
        // 실제로는 PDF 내보내기 로직 구현
    });
    
    // 예산안 저장 버튼 이벤트 리스너
    saveBudgetBtn.addEventListener('click', function() {
        alert('예산안이 성공적으로 저장되었습니다.');
        // 실제로는 서버에 저장하는 로직 구현
    });
    
    // 카드 뷰 생성 함수
    function createBudgetCards() {
        // 기존 카드 삭제 (첫 번째 예시 카드 제외)
        while (cardsView.children.length > 1) {
            cardsView.removeChild(cardsView.lastChild);
        }
        
        // 예산 항목 데이터로 카드 생성
        budgetItems.forEach(item => {
            if (item.id === 'P004') return; // 첫 번째 예시 카드는 이미 있으므로 건너뜀
            
            const card = document.createElement('div');
            card.className = 'budget-card';
            card.setAttribute('data-department', item.departmentCode);
            card.setAttribute('data-category', item.category);
            
            const changeClass = item.changeRate >= 0 ? 'increase' : 'decrease';
            const changeSign = item.changeRate >= 0 ? '+' : '';
            const changeAmount = Math.abs(item.newBudget - item.previousBudget).toLocaleString();
            
            card.innerHTML = `
                <div class="budget-card-header">
                    <span class="badge badge-${item.priority === '상' ? 'success' : 'warning'}">우선순위: ${item.priority}</span>
                    <h3>${item.name}</h3>
                    <p>${item.department} | ${item.id}</p>
                </div>
                <div class="budget-card-body">
                    <div class="budget-comparison">
                        <div class="previous-budget">
                            <span class="label">이전 예산</span>
                            <span class="value">${item.previousBudget.toLocaleString()}원</span>
                        </div>
                        <div class="arrow">→</div>
                        <div class="new-budget">
                            <span class="label">AI 편성액</span>
                            <span class="value">${item.newBudget.toLocaleString()}원</span>
                        </div>
                    </div>
                    <div class="budget-change ${changeClass}">
                        ${changeSign}${item.changeRate.toFixed(1)}% (${changeAmount}원 ${item.changeRate >= 0 ? '증가' : '감소'})
                    </div>
                </div>
                <div class="budget-card-footer">
                    <button class="btn btn-secondary" data-project="${item.id}">
                        <i class="fas fa-edit"></i> 예산 수정
                    </button>
                    <button class="btn btn-primary" data-project="${item.id}">
                        <i class="fas fa-info-circle"></i> 상세 정보
                    </button>
                </div>
            `;
            
            // 버튼에 이벤트 리스너 추가
            card.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const projectId = this.getAttribute('data-project');
                    openBudgetDetailModal(projectId);
                });
            });
            
            cardsView.appendChild(card);
        });
    }
    
    // 예산 항목 검색 및 필터링 함수
    function filterBudgetItems() {
        const searchText = budgetSearchInput.value.toLowerCase();
        const department = departmentFilter.value;
        const category = categoryFilter.value;
        
        // 테이블 뷰 필터링
        const tableRows = tableView.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            const rowDepartment = row.cells[0].textContent;
            const rowName = row.cells[2].textContent.toLowerCase();
            const rowCategory = getCategoryFromProjectId(row.cells[1].textContent);
            
            const matchSearch = rowName.includes(searchText) || row.cells[1].textContent.toLowerCase().includes(searchText);
            const matchDepartment = department === '' || getDepartmentCode(rowDepartment) === department;
            const matchCategory = category === '' || rowCategory === category;
            
            row.style.display = matchSearch && matchDepartment && matchCategory ? '' : 'none';
        });
        
        // 카드 뷰 필터링
        const cards = cardsView.querySelectorAll('.budget-card');
        cards.forEach(card => {
            const cardDepartment = card.getAttribute('data-department');
            const cardCategory = card.getAttribute('data-category');
            const cardName = card.querySelector('h3').textContent.toLowerCase();
            
            const matchSearch = cardName.includes(searchText);
            const matchDepartment = department === '' || cardDepartment === department;
            const matchCategory = category === '' || cardCategory === category;
            
            card.style.display = matchSearch && matchDepartment && matchCategory ? '' : 'none';
        });
    }
    
    // 부서 코드 가져오기 함수
    function getDepartmentCode(departmentName) {
        const departmentMap = {
            '기획예산과': '001',
            '행정과': '002',
            '복지과': '003',
            '환경과': '004',
            '문화관광과': '005'
        };
        
        return departmentMap[departmentName] || '';
    }
    
    // 프로젝트 ID로 카테고리 가져오기 함수
    function getCategoryFromProjectId(projectId) {
        const item = budgetItems.find(item => item.id === projectId);
        return item ? item.category : '';
    }
    
    // 예산 항목 상세 모달 열기 함수
    function openBudgetDetailModal(projectId) {
        const item = budgetItems.find(item => item.id === projectId);
        
        if (!item) return;
        
        const changeClass = item.changeRate >= 0 ? 'increase' : 'decrease';
        const changeSign = item.changeRate >= 0 ? '+' : '';
        const changeAmount = Math.abs(item.newBudget - item.previousBudget).toLocaleString();
        
        // 모달 내용 채우기
        budgetDetailContent.innerHTML = `
            <div class="budget-detail-header">
                <h4>${item.name}</h4>
                <p>${item.department} | ${item.id} | 분야: ${item.category}</p>
            </div>
            
            <div class="budget-detail-section">
                <h5><i class="fas fa-file-invoice-dollar"></i> 예산 정보</h5>
                <div class="budget-comparison-detail">
                    <div class="previous">
                        <div class="label">이전 예산</div>
                        <div class="value">${item.previousBudget.toLocaleString()}원</div>
                    </div>
                    <div class="current">
                        <div class="label">AI 편성액</div>
                        <div class="value">${item.newBudget.toLocaleString()}원</div>
                        <div class="change ${changeClass}">${changeSign}${item.changeRate.toFixed(1)}%</div>
                    </div>
                </div>
                
                <div class="budget-detail-form">
                    <div class="form-group">
                        <label for="new-budget-input">수정 예산액 (원)</label>
                        <input type="number" id="new-budget-input" value="${item.newBudget}" min="0" step="1000000">
                    </div>
                    <div class="form-group">
                        <label for="justification-input">예산 조정 사유</label>
                        <textarea id="justification-input" placeholder="예산 조정 사유를 입력하세요."></textarea>
                    </div>
                </div>
            </div>
            
            <div class="budget-detail-section">
                <h5><i class="fas fa-info-circle"></i> 사업 정보</h5>
                <p>${item.description}</p>
                <p><strong>우선순위:</strong> ${item.priority}</p>
            </div>
            
            <div class="budget-detail-section">
                <h5><i class="fas fa-chart-line"></i> 성과 지표</h5>
                <p><strong>지난해 목표:</strong> ${item.performance.lastYear.target}</p>
                <p><strong>달성 실적:</strong> ${item.performance.lastYear.achieved} (달성률: ${item.performance.lastYear.rate}%)</p>
                <p><strong>효율성 평가:</strong> ${item.performance.efficiency}</p>
                <p><strong>사업 영향도:</strong> ${item.performance.impact}</p>
            </div>
            
            <div class="budget-detail-notes">
                <h5>AI 분석 의견</h5>
                <p>${item.aiReasoning}</p>
            </div>
        `;
        
        // 모달 열기
        budgetDetailModal.classList.add('active');
        saveEditBtn.setAttribute('data-project', projectId);
    }
    
    // 예산 항목 업데이트 함수
    function updateBudgetItem(projectId, newBudget, justification) {
        const item = budgetItems.find(item => item.id === projectId);
        
        if (!item) return;
        
        // 증감률 계산
        const changeRate = ((newBudget - item.previousBudget) / item.previousBudget) * 100;
        
        // 데이터 업데이트
        item.newBudget = newBudget;
        item.changeRate = changeRate;
        item.userJustification = justification;
        
        // 알림
        alert(`예산이 성공적으로 수정되었습니다.\n사업명: ${item.name}\n수정된 예산: ${newBudget.toLocaleString()}원 (${changeRate >= 0 ? '+' : ''}${changeRate.toFixed(1)}%)`);
    }
    
    // UI 업데이트 함수
    function updateBudgetUI() {
        // 테이블 뷰 업데이트
        const tableRows = tableView.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            const projectId = row.querySelector('.btn-icon').getAttribute('data-project');
            const item = budgetItems.find(item => item.id === projectId);
            
            if (item) {
                row.cells[4].textContent = item.newBudget.toLocaleString();
                
                const changeCell = row.cells[5];
                changeCell.textContent = `${item.changeRate >= 0 ? '+' : ''}${item.changeRate.toFixed(1)}%`;
                changeCell.className = item.changeRate >= 0 ? 'increase' : 'decrease';
            }
        });
        
        // 카드 뷰 업데이트 (카드 다시 생성)
        if (cardsView.children.length > 0) {
            createBudgetCards();
        }
        
        // 요약 정보 업데이트 (실제로는 서버에서 다시 계산되어야 함)
        // 이 예제에서는 간단히 처리
        calculateBudgetSummary();
    }
    
    // 예산 요약 계산 함수
    function calculateBudgetSummary() {
        // 실제로는 서버에서 계산되어야 하는 로직
        // 이 예제에서는 간단히 처리
    }
});