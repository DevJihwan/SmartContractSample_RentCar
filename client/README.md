# getWeb3.js
    00. window.ethereum을 통해 로컬에서 연결한 metaMask 지갑 연결 
    01. let web3는 Promise 객체이기 때문에 resolve()를 해줘야 완성
            -> resolve는 parameter에서 지정한 이름이기 때문에 원하는 것으로 변경 가능

# App.jsx
    00. getWeb.js에서 resolve(web3)에 넣어준 값으로 let _web에 저장
    01. state에 현재 렌트한 자동차 수, 지갑 주소 등을 저장 
    02. componentDidmount()에서 .then()에서 시작