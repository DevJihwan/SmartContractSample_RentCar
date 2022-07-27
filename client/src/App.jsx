import React, { Component } from "react";
import RentalCarContract from "./contracts/RentalCar.json";
import getWeb3 from "./getWeb3.js";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rentalInstance: null,
            myAccount: null,
            myRentCar: 0,
            web3: null
        };
     }
     UNSAFE_componentWillMount() {
        console.log("#########START componetWillMount########");
        getWeb3.then(results => {
            console.log("#########Step01.componentWillMount : results########"+results);
            this.setState({
                web3: results
            });
            this.instantiateContract();
       }).catch(() => {
           console.log("Error finding web3.");
       });
    }
    instantiateContract = async() => {
        console.log("#########START instantiateContract########");
        const contract = require("@truffle/contract");
        const rentalcar = contract(RentalCarContract);
        console.log("#########Step01.instantiateContract : rentalcar########"+rentalcar);

        const _web3 = await this.state.web3;
        console.log("#########Step02.instantiateContract : _web3########"+_web3);

        rentalcar.setProvider(_web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            if (!error) {
                rentalcar.deployed().then(instance => {
                    this.setState({
                        rentalInstance: instance,
                        myAccount: accounts[0]
                    });
                    this.updateRentCar();
                });
            }
        });
     }
    rentCar() {
        this.state.rentalInstance.rentCar({
            from: this.state.myAccount,
            value: this.state.web3.utils.toWei(10, "ether"),
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
            <img         src="http://img.danawa.com/cp_images/service/33/3396220/149723280362210120381.jpg"
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