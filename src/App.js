import {contractETH, contractMATIC} from './contract';
import './App.css';
import React, {Component} from "react";
import namehash from "./namehash";

class App extends Component {
    state = {domain: '', data: []};

    onSubmit = async (event) => {
        event.preventDefault();

        const interestedKeys = [
            "ipfs.html.value",
            "crypto.BTC.address",
            "crypto.ETH.address",
            "crypto.ADA.address",
            "crypto.MATIC.version.MATIC.address"
        ];
        const tokenId = namehash(this.state.domain);

        let data = await contractETH.getData(interestedKeys, tokenId);
        if (data['owner'] === "0x0000000000000000000000000000000000000000") {
            data = await contractMATIC.getData(interestedKeys, tokenId);
        }

        this.setState({data: data});
    };

    showResults() {
        if (this.state.data.length > 0) {
            if (this.state.data['owner'] === "0x0000000000000000000000000000000000000000") {
                return <p>Not Available!</p>;
            } else {
                return (
                    <div>
                        <p><a target="_blank" href={"https://dweb.link/ipfs/" + this.state.data[2][0]}>Visit Website</a></p>
                        <p>Domain Owner: {this.state.data['owner']}</p>
                        <p>Domain Resolver: {this.state.data['resolver']}</p>
                        <p>BTC Address: {this.state.data[2][1]}</p>
                        <p>ETH Address: {this.state.data[2][2]}</p>
                        <p>ADA Address: {this.state.data[2][3]}</p>
                        <p>MATIC Address: {this.state.data[2][4]}</p>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.onSubmit}>
                    <input onChange={event => this.setState({domain: event.target.value})}/>
                    <button type="submit">Resolve</button>
                </form>
                {this.showResults()}
            </div>
        );
    }
}

export default App;
