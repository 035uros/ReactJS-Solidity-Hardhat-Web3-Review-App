import { useState } from "react";
import './App.css';
import { ethers } from 'ethers';
import ABI from './ABI.json'

const address = '0x44721DA942B22cEc50162217dda1063d65b1xxxxx';



function App() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [users, setUsers] = useState([]);

  
const loadData = async (event) => {
  event.preventDefault();
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, ABI, signer);
      const users = await contract.getUsers();
      setUsers(users);
      console.log(users);
      // Now you have the array of users, you can process and use the data as needed in your React application
    } else {
      alert("MetaMask is not installed or not accessible.");
    }
  } catch (error) {
    console.error(error);
  }
}



const setData = async (event) => {
  event.preventDefault();
  try {
    if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, ABI, signer);
    
    const transaction = await contract.addComplaint(name, lastName, text, time);
    alert("Жалба унета");
    }
    else{
      alert("Metamask nije povezan");
    }
  } catch (error) {
    console.error(error);
  }

  
}

  return (
    <div className="App">
      <header className="App-header">
        
      <script src="https://use.fontawesome.com/a6f0361695.js"></script>

<h2 id="fh2">Жалбе</h2>

<form id="feedback" action="">
  <div class="pinfo">Ваши подаци</div>
  

<div class="form-group">
  <div class="col-md-4 inputGroupContainer">
  <div class="input-group">
  <span class="input-group-addon"><i class="fa fa-envelope">Име</i></span>
    <input value ={name} onChange ={(e) => setName(e.target.value)}
    name="ime" type="text" class="form-control" placeholder="Урош"/>
     </div>
  </div>
</div>

<div class="form-group">
  <div class="col-md-4 inputGroupContainer">
  <div class="input-group">
  <span class="input-group-addon"><i class="fa fa-globe">През.</i></span>
  <input  value ={lastName} onChange ={(e) => setLastName(e.target.value)}
  name="prezime" placeholder="Милошевић" class="form-control"  type="text"/>
    </div>
  </div>
</div>

 <div class="pinfo">Унесите текст жалбе.</div>
  

<div class="form-group">
  <div class="col-md-4 inputGroupContainer">
  <div class="input-group">
  <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
  <textarea value ={text} onChange ={(e) => {setText(e.target.value); setTime(Date().toLocaleString())}} name="review" class="form-control" id="review" rows="3"></textarea>
 
    </div>
  </div>
</div>

 <button onClick ={setData} class="btn btn-primary">Унеси жалбу</button><br></br><br></br>
 <button onClick ={loadData} class="btn btn-primary">Прикажи жалбе</button>

 <div className="box-container">
 {users.length > 0 ? (
    <table className="table">
    <thead>
      <tr>
        <th>Име</th>
        <th>Презиме</th>
        <th>Текст жалбе</th>
        <th>Време</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.lastname}</td>
          <td>{user.text}</td>
          <td>{user.time}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No users to display</p>
)}
        
        </div>
 


</form>
      </header>
    </div>
  );
}

export default App;
