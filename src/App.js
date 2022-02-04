/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Billiards from "./billiards.png";
import web3 from "./web3";
import "./App.css";
import "./index.css";
import lottery from "./lottery";

function App() {
  const [loading, setLoading] = useState(false);
  const [balanceloading, setBalanceLoading] = useState(false);
  const [manager, setManager] = useState("");
  const [contractAddress, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState();
  const [status, setStatus] = useState();
  const { ethereum } = window;

  const getBalance = async () => {
    setBalanceLoading(true);
    const address = lottery._address;
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    setBalance(balance);
    return setBalanceLoading(false);
  };

  const load = async () => {
    console.log(lottery);
    const contractAddress = lottery._address;
    const address = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log('ADDRESS', address);
    const addresses = await lottery.methods
      .getAllPlayers()
      .call().then(console.log());
    console.log(addresses);
    console.log(manager);
    //  .then((res) => console.log("RES", res));
    console.log("Your Address", address);
    setManager("0x3E46688fA598d7bEE517DC3A5155B8C0CABDafC5");
    setAddress(contractAddress);
    return getBalance();
  };

  const enterLottery = async (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });
    setLoading(true);
    await lottery.methods
      .enterCompetition()
      .send({ from: accounts[0], value: web3.utils.toWei(value, "ether") })
      .then(() => setStatus(200))
      .catch(() => {
        setStatus(400);
        setLoading(false);
        return setTimeout(() => setStatus(), 3000);
      });
    setLoading(false);
    setTimeout(() => setStatus(), 3000);
    return getBalance();
  };

  const pickWinner = async (e) => {
    e.preventDefault();
    if (web3.utils.fromWei(balance, "ether") === "0") {
      return;
    }
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });
    setLoading(true);
    await lottery.methods
      .pickWinner()
      .send({ from: accounts[0] })
      .then(() => setStatus(204))
      .catch(() => {
        setStatus(400);
        setLoading(false);
        return setTimeout(() => setStatus(), 3000);
      });
    setLoading(false);
    setTimeout(() => setStatus(), 3000);
    return getBalance();
  };

  useEffect(() => {
    return load();
  }, []);

  return (
    <div className="container">
      <p className="fs-1 my-4 text-center">
        <img src={Billiards} alt="img" style={{ width: 50 }} className="mx-2" />
        Lottery App
      </p>
      <div className="card text-center shadow">
        <div className="card-header fs-5">Contract: {contractAddress}</div>
        <div className="card-body">
          <p className="card-text my-0">
            <strong>Manager:</strong> 0x3e46688fa598d7bee517dc3a5155b8c0cabdafc5
          </p>
          <p className="card-text border-bottom pb-2">
            <strong>Balance:</strong>{" "}
            {balanceloading
              ? "Loading..."
              : web3.utils.fromWei(balance, "ether") + ` (Eth)`}
          </p>
          <h5
            className={
              loading
                ? "card-title pb-2"
                : status === 400
                ? "card-title pb-2 text-danger"
                : status <= 204
                ? "card-title pb-2 text-success"
                : "card-title pb-2"
            }
          >
            {loading
              ? "Performing Transaction: Please Wait"
              : status === 400
              ? "Transaction Failed!"
              : status === 200
              ? "Transaction Success!"
              : status === 204
              ? "Winner Has Been Picked!"
              : "Details"}
          </h5>
          <div className="d-flex justify-content-center">
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <form className="row g-3 text-center">
                <div className="col-auto">
                  <label className="visually-hidden">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputPassword2"
                    placeholder="Enter Amount of Ether"
                    onChange={(event) => setValue(event.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-primary mb-3 px-4"
                    onClick={(e) => enterLottery(e)}
                  >
                    Enter
                  </button>
                </div>
              </form>
            )}
          </div>
          {loading ? null : (
            <button
              type="button"
              className="btn btn-success px-4 mb-4"
              onClick={(e) => pickWinner(e)}
            >
              Pick Winner
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;