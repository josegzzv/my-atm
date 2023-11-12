import logo from './logo.svg';
import './App.css';
import React from 'react'



const ATMDeposit = ({ onChange, isDeposit, isValid, numValue, onQuickPick }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  console.log(`Is Valid llegó como: ${isValid}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <br></br>
      &nbsp;&nbsp;
      <button id="btn5" onClick={onQuickPick} value="5">5</button> &nbsp;&nbsp;
      <button id="btn5" onClick={onQuickPick} value="10">10</button>&nbsp;&nbsp;
      <button id="btn5" onClick={onQuickPick} value="20">20</button>&nbsp;&nbsp;
      <button id="btn5" onClick={onQuickPick} value="50">50</button>&nbsp;&nbsp;
      <button id="btn5" onClick={onQuickPick} value="100">100</button>&nbsp;&nbsp;
      <br></br>
      <input id="number-input" type="number" width="200" onChange={onChange} value={numValue}></input>
      <br></br>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} ></input>
    </label>
  );
};

const App = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [optionSelected, setOptionSelected] = React.useState(false);
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [numValue, setNumValue] = React.useState(0);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      console.log(`El numero capturado es: ${Number(event.target.value)}`)
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
      console.log(`Retirando mas de lo que se tiene: ${validTransaction}`)
    } else {
      setValidTransaction(true);
      console.log(`Transacción Valida: ${validTransaction}`)
    }
    setDeposit(Number(event.target.value));
    setNumValue(Number(event.target.value));
  };
  
  const handleQuickPick = (event) => {
    console.log(`Boton ID: ${Number(event.target.value)}`);
    setNumValue(Number(event.target.value));
    handleChange(event);
    event.preventDefault();
  }

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    setNumValue(0);  //this is better than access document.getElementbyId
    //document.getElementById("number-input").value=0; //works but not best practice...
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if(event.target.value==="Deposit"){
      setIsDeposit(true);
      setValidTransaction(true);
      setOptionSelected(true);
    } else if (event.target.value==="Cash Back"){
      setIsDeposit(false);
      setOptionSelected(true);
    } else {
      setIsDeposit(false);
      setOptionSelected(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <>
          <img className="App-logo" height="30px" width="40px" alt="logo" src="data:image/png;base64,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"></img>
          <h2 id="total">{status}</h2>
          <label>Select an action below to continue</label>
          <br></br>
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
              <option id="no-selection" value="">Select an Option...</option>
              <option id="deposit-selection" value="Deposit">Deposit</option>
              <option id="cashback-selection" value="Cash Back">Cash Back</option>
          </select>
          {optionSelected && (
              <ATMDeposit
                  onChange={handleChange}
                  isDeposit={isDeposit}
                  isValid={validTransaction}
                  numValue={numValue}
                  onQuickPick={handleQuickPick}
              ></ATMDeposit>
          )}
      </>

    </form>
  );
};

export default App;
