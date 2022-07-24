import Web3 from 'web3'

let getWeb3 =  new Promise(function(resolve, reject) {
  //1
  window.addEventListener('load', async() => {
    let web3, account;
    //2
    if (window.ethreum) {
      web3 = new Web3(window.ethreum);
      resolve(web3);
      console.log('##########Step01 : web3#########'+web3);
    //3
    }else if (typeof window.web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
      resolve(web3);
      console.log('##########Step02 : web3#########'+web3);
    } else{
      //4
      reject(new Error('No web3 instance injected, using local web3'))
    }
    if (web3){
      account = await web3.eth.requestAccounts();
      console.log('##########account#########'+account);
    }
  })
})

getWeb3.then((web3, account) => console.log(web3, account));

export default getWeb3
