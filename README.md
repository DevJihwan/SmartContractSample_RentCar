📝
# smartContract

# 개발환경 구성
    1. geth 
    2. truffle (프레임워크)




# init 
    01. truffle --version    (버전 확인)
    02. mkdir <프로젝트 폴더명>  (프로젝트를 생성할 폴더 생성)
    03. cd <프로젝트 폴더>
    04. truffle unbox react         (프로젝트 생성)

# SmartContract 개발 순서
    <ol>1. contracts폴더에서 business 작성</ol>
        2. migrations에서 deploy {truffle migrate}
        3. client - src - contracts 에서 생성된 Js 파일 확인
        4. getWeb3.js의 생성 : contract와 메타마스크 연결을 지원함. 

# npm install @truffle/contract
-   [npm] : https://www.npmjs.com/package/@truffle/contract

# To-do
    01. updateRentalCar 정비 -> 렌트한 차량 수 업데이트 반영
    02. 현재 내 계좌 잔액 표시 
