import Web3 from 'web3'

let getWeb3 =  new Promise(function(results, reject) {
  //1
  console.log('##########Start getWeb3#########');
  window.addEventListener('load', async() => {
    //2
    let web3, account;
    if (window.ethreum) {
      web3 = new Web3(window.ethreum);
      console.log('##########Step01 : web3#########'+web3);
    //3
    }else if (typeof window.web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
      console.log('##########Step02 : web3#########'+web3);
    } else{
      //4
      reject(new Error('No web3 instance injected, using local web3'))
    }
    if (web3){
      account = await web3.eth.requestAccounts();
      console.log('##########account#########'+account);
    }
    results(web3);
    console.log('##########END getWeb3#########');
  })
})

export default getWeb3
