import React, { Component } from "react";
import RentalCarContract from "./contracts/RentalCar.json";
import getWeb3 from "./getWeb3.js";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rentalInstance: "",     //react의 경우 state가 비동기이기 떄문에, 
            myAccount: "",          //처음 마운트(렌더링)하기 전에 동작함. 그렇기 때문에 state가 null 과 같이 정의 되지 않은 경우 
            myRentCar: 0,           //error 발생(Uncaught TypeError: Cannot read property ...), 최소한 타입이라도 정해두자.
            web3: ""
        };
     }
    componentWillMount() {
        //web3 할당
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            });
            this.instantiateContract();
            console.log("TEST");
       }).catch(() => {
           console.log("Error finding web3.");
       });
    }
    instantiateContract() {
        const contract = require("@truffle/contract");
        const rentalcar = contract(RentalCarContract);
        rentalcar.setProvider(this.state.web3.currentProvider);
        //Ganache에서 만들어진 10개의 계정 중 제일 첫 번째 계정 할당 
        this.state.web3.eth.getAccounts((error, accounts) => {
            if (!error) {
                rentalcar.deployed().then(instance => {
                    this.setState({
                        rentalInstance: instance,
                        myAccount: accounts[0] //제일 첫 번째 계정 인덱싱
                    });
                    this.updateRentCar();
                });
            }
        });
        //console.log(this.setState);
     }
    rentCar() {
        this.state.rentalInstance.rentCar({
            from: this.state.myAccount,                 //RetalCar.sol의 parameter로 넘겨줄 값들 (From, value, gas)
            value: this.state.web3.utils.toWei("10", "ether"),
            gas: 900000
        });
    }
    returnRentCar() {
        this.state.rentalInstance.returnRentCar({
            from: this.state.myAccount,
            gas: 900000
        });
    }
    updateRentCar() {
        this.state.rentalInstance.getMyRentCar().then(result => {
            this.setState({ myRentCar: result.toNumber() });
        });
    }
    render() {
        const imgStyle = {
            width: "500px",
            height: "auto"
        };
        return (
            <div className="container">
            <img src="http://img.danawa.com/cp_images/service/33/3396220/149723280362210120381.jpg"
style={imgStyle}/>
            <h4>하루 렌트 가격: 10 ETH</h4>
            <button type="button" className="btn btn-primary" onClick={() => this.rentCar()}>
렌트하기</button>
<button type="button" className="btn btn-info" onClick={() => this.returnRentCar()}>반납하기</button>
<p>렌트한 차량수: {this.state.myRentCar}</p>
</div>
        );
    }
}
export default App;