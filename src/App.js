import React,{useState,useEffect} from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState("");


useEffect(() => {
  axios
    .get("https://api.exchangerate-api.com/v4/latest/USD") // Free API
    .then((response) => {
      setCurrencies(Object.keys(response.data.rates));
    })
    .catch((err) => {
      setError("Failed to fetch currency data.");
    });
}, []);

// Handle conversion
const handleConvert = async () => {
  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const rate = response.data.rates[toCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
    setError("");
  } catch (err) {
    setError("Conversion failed. Please try again.");
  }
};

return (
  <div className="app p-4">
    <h1 className="text-2xl font-bold">Currency Converter</h1>
    <div className="converter mt-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded"
        placeholder="Amount"
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        className="border p-2 rounded"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        className="border p-2 rounded"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Convert
      </button>
    </div>

    {convertedAmount && (
      <p className="result mt-4">
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </p>
    )}

    {error && <p className="text-red-500 mt-4">{error}</p>}
  </div>
);
}

export default App;