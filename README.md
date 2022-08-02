# SmartContractSample_RentCar🚗🚕🚙

# 🖥 ⌨️ 🖨 개발환경 구성
    1. geth 
    2. truffle (프레임워크)
        -> truffle 설치 방법 : npm install -g truffle 
        -> truffle 버전 확인 방법 : truffle --version 
        -> turrlfe 버전 업데이트 방법 : npm uninstall -g truffle (트러플 삭제), npm install -g truffle(트러플 설치))

# 📌 init 
    01. truffle --version    (버전 확인)
    02. mkdir <프로젝트 폴더명>  (프로젝트를 생성할 폴더 생성)
    03. cd <프로젝트 폴더>
    04. truffle unbox react         (프로젝트 생성)

# 📌 SmartContract 개발 순서
    <ol>1. contracts폴더에서 business 작성</ol>
        2. migrations에서 deploy {00. truffle compile,  01. truffle migrate --reset}
        3. client - src - contracts 에서 생성된 Js 파일 확인
        4. getWeb3.js의 생성 : contract와 메타마스크 연결을 지원함. 

# 📌 npm install @truffle/contract
-   [npm] : https://www.npmjs.com/package/@truffle/contract

# 📝 부족했던 점 
    00. web3.js으로 메타마스크 연결 후 지갑 주소와 잔액을 불러오는 부분
    01. React 비동기 setState에 대한 이해

# 📝 배운 점
    00. 스마트컨트랙트 작성 후 배포하는 방법 (배포할 때도 ETH이 필요하다는 점..)

