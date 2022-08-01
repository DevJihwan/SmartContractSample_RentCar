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
        //getWeb3.js에서 결과를 리턴 받는다. 
        getWeb3.then(results => {
            console.log("#########Step01.componetDidMount : results########"+results);
            //받은 결과를 let web3에 저장
            let _web3 = results;
            this.instantiateContract(_web3);
       }).catch(() => {
           console.log("Error finding web3.");
       });

    }
    
    //초기값 설정
    instantiateContract = async(__web3) => {
        console.log("#########START instantiateContract########");

        //web3와 연결된 지갑 계좌 셋팅 
        this.setState({
            web3: __web3,
            myAccount: __web3.currentProvider.selectedAddress
        });

        //스마트컨트랙트 내용 호출
        const contract = require("@truffle/contract");
        const rentalcar = contract(RentalCarContract);

        console.log("#########Step01.instantiateContract : rentalcar########"+rentalcar);
        rentalcar.setProvider(__web3.currentProvider);    
        
        //truffle.deployed()에 대한 설명
        // => Create an instance of MyContract that represents the default address managed by MyContract

        await rentalcar.deployed()
            .then(instance => {
                this.setState({
                    rentalInstance: instance
                });
                this.updateRentCar(instance);
            });

        console.log("#########END instantiateContract########");
    }

    rentCar = async() => {
        console.log("#########START rentCar########");

        console.log("#########STEP00. this.state.rentalInstance########"+this.state.rentalInstance);

        await this.state.rentalInstance.rentCar(
            
            {   from: this.state.myAccount,
                value: this.state.web3.utils.toWei("2", "ether"),
                gas: 900000     }
        );

        await this.updateRentCar();
        
        console.log("#########END rentCar########");
    }


    returnRentCar = async() => {
        console.log("#########START returnRentCar########");

        console.log("#########STEP00. this.state.rentalInstance########"+this.state.rentalInstance);

        this.state.rentalInstance.returnRentCar({
            from: this.state.myAccount,
            gas: 900000
        });

        console.log("#########END returnRentCar########");
    }
    
    //내가 현재 빌린 자동차 수 업데이트 
    updateRentCar = async(_param) => {
        console.log("#########START updateRentCar########");
        console.log("#########STEP00. _param : ########" + _param);

        this.setState({
            rentalInstance: _param
        });

        console.log("#########STEP02. this.state.rentalInstance : ########" + this.state.rentalInstance);

        //this.rentalInstance 값이 셋팅 되었는지 확인하고 진행한다. 
        if(this.state.rentalInstance != null){

            let getMyRentCar = await this.state.rentalInstance.getMyRentCar();
            this.setState({ myRentCar: getMyRentCar.toNumber() });
            console.log("#########UpdateRentCar Success########");
    
        }else{
            _param.getMyRentCar().then(result =>{
                this.setState({ myRentCar: result.toNumber() });
            })
            console.log("#########UpdateRentCar ERROR########");
        }
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