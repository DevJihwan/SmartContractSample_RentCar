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
            web3: null,
            myEthBalance: null
        };
     }
     componentDidMount() {
        console.log("#########START componetDidMount########");


        getWeb3.then(results => {
            console.log("#########Step01.componetDidMount : results########"+results);

            let _web3 = results;
            // this.setState({
            //     web3: results.currentProvider
            // });
            this.instantiateContract(_web3);
       }).catch(() => {
           console.log("Error finding web3.");
       });

    }
    
    instantiateContract = async(__web3) => {
        console.log("#########START instantiateContract########");

        this.setState({
            web3: __web3,
            myAccount: __web3.currentProvider.selectedAddress
        });

        const contract = require("@truffle/contract");
        const rentalcar = contract(RentalCarContract);
        console.log("#########Step01.instantiateContract : rentalcar########"+rentalcar);

        rentalcar.setProvider(__web3.currentProvider);    
        
        //truffle.deployed(): Create an instance of MyContract that represents the default address managed by MyContract

        await rentalcar.deployed()
            .then(instance => {
                this.setState({
                    rentalInstance: instance
                    //myEthBalance: this.state.web3.eth.getBalance(this.state.myAccount)
                });
            });
            this.updateRentCar();

        console.log("#########END instantiateContract########");
    }

    rentCar() {
        this.state.rentalInstance.rentCar({
            from: this.state.myAccount,
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
        console.log("#########START updateRentCar########");
        console.log("#########STEP01. this.state.rentalInstance : ########" + this.state.rentalInstance);

        let getMyRentCar = this.state.rentalInstance.getMyRentCar();

        this.setState({ myRentCar: getMyRentCar.toNumber() });

        console.log("#########END updateRentCar########");
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