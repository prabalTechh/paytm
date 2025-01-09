import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleTransfer = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await axios.post(
        "http://localhost:4000/api/v1/account/transfer",
        {
          to: id,
          amount: Number(amount)
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      
      setShowSuccess(true);
      setAmount("");
      
      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center relative w-full max-w-md px-4">
        {/* Back Arrow */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="absolute top-8 left-8 p-2 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="ml-2">Back</span>
        </button>

        <div className="border h-min text-card-foreground w-full bg-white shadow-lg rounded-lg">
          {/* Success Toast */}
          {showSuccess && (
            <div className="mb-4 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-green-800 text-sm flex items-center gap-2">
                <span className="text-lg">✓</span>
                Payment successfully completed! 🎉
              </p>
            </div>
          )}
          
          {/* Error Toast */}
          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-800 text-sm flex items-center gap-2">
                <span className="text-lg">⚠</span>
                {error}
              </p>
            </div>
          )}

          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name?.[0]?.toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label 
                  htmlFor="amount"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Amount (in Rs)
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter amount"
                  disabled={loading}
                />
              </div>
              
              <button
                onClick={handleTransfer}
                disabled={loading}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Initiate Transfer"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;