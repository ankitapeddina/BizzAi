import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState(["Greeting"]);

  // chatbot data tree
  const chatTree = {
    Greeting: {
      message: "Hi 👋 I'm BizAI Assistant! How can I help you today?",
      options: [
        "Manage Inventory",
        "Analyze Feedback",
        "Get Sales Insights",
        "Product Recommendations (AI)",
        "Support / Help",
      ],
    },
    "Manage Inventory": {
      message: "Select an inventory option:",
      options: [
        "View Stock",
        "Add Product",
        "Low Stock Alerts",
        "Predict Demand (AI)",
        "⬅ Back",
      ],
    },
    "View Stock": {
      message:
        "Here’s what we display in stock details:\n• Product ID\n• Product Name\n• Category\n• Quantity\n• Reorder Level\n• Supplier Name\n• Last Updated",
      options: ["⬅ Back"],
    },
    "Add Product": {
      message:
        "You can add a new product with these details:\n• Product Name\n• Category\n• Price\n• Quantity\n• Supplier\n• SKU/Barcode\n• Description",
      options: ["⬅ Back"],
    },
    "Low Stock Alerts": {
      message:
        "Low stock alert shows:\n• Product Name\n• Current Stock\n• Minimum Required Level\n• Supplier Contact\n• Reorder Suggestion",
      options: ["⬅ Back"],
    },
    "Predict Demand (AI)": {
      message:
        "AI Demand Prediction includes:\n• Product Name\n• Past Sales Data (3 months)\n• Trends\n• Forecasted Demand\n• Stock Recommendation",
      options: ["⬅ Back"],
    },
    "Analyze Feedback": {
      message: "Select feedback-related option:",
      options: [
        "Upload Feedback",
        "Sentiment Analysis (AI + Multilingual)",
        "View Suggestions",
        "⬅ Back",
      ],
    },
    "Upload Feedback": {
      message:
        "You can upload customer feedback with fields:\n• Customer Name\n• Product Name\n• Rating (1–5)\n• Comment\n• CSV/Text Upload",
      options: ["⬅ Back"],
    },
    "Sentiment Analysis (AI + Multilingual)": {
      message:
        "AI Sentiment Analysis includes:\n• Total Reviews\n• Positive/Negative/Neutral %\n• Common Keywords\n• Sample Comments",
      options: ["⬅ Back"],
    },
    "View Suggestions": {
      message:
        "Suggestions summary includes:\n• Most Requested Features\n• Frequent Issues\n• AI Actionable Improvements",
      options: ["⬅ Back"],
    },
    "Get Sales Insights": {
      message: "Choose a sales insight option:",
      options: [
        "View Summary",
        "Discount Suggestion (AI)",
        "Bundling Ideas",
        "⬅ Back",
      ],
    },
    "View Summary": {
      message:
        "Sales Summary includes:\n• Total Sales (Weekly/Monthly)\n• Best-Selling Products\n• Top Categories\n• Revenue Growth\n• Sales by Region",
      options: ["⬅ Back"],
    },
    "Discount Suggestion (AI)": {
      message:
        "AI Discount Suggestions include:\n• Product Name\n• Current Price\n• Suggested Discount %\n• Expected Sales Boost\n• Profit Impact",
      options: ["⬅ Back"],
    },
    "Bundling Ideas": {
      message:
        "AI Bundling Ideas:\n• Suggested Product Combos\n• Category Fit\n• Estimated Increase in Basket Value\n• Bundle Name Suggestions",
      options: ["⬅ Back"],
    },
    "Product Recommendations (AI)": {
      message: "Choose recommendation option:",
      options: [
        "Suggest New Products",
        "Add to Campaign",
        "⬅ Back",
      ],
    },
    "Suggest New Products": {
      message:
        "AI Product Suggestions based on:\n• Customer Purchase Trends\n• Feedback Analysis\n• Market Demand\n• Competitor Insights",
      options: ["⬅ Back"],
    },
    "Add to Campaign": {
      message:
        "Campaign addition includes:\n• Select Product\n• Choose Campaign Type\n• Set Duration & Budget\n• Monitor Conversions",
      options: ["⬅ Back"],
    },
    "Support / Help": {
      message: "How can I assist you?",
      options: ["Talk to Agent", "How it Works", "Switch Language", "⬅ Back"],
    },
    "Talk to Agent": {
      message:
        "Connecting you to a support agent... ⏳ Please wait or type '⬅ Back' to return.",
      options: ["⬅ Back"],
    },
    "How it Works": {
      message:
        "BizAI helps automate your business with:\n• Smart Inventory Management\n• AI Feedback Insights\n• Data-Driven Sales Optimization\n• Seamless Product Recommendations",
      options: ["⬅ Back"],
    },
    "Switch Language": {
      message:
        "You can switch to multiple languages like Hindi 🇮🇳, Spanish 🇪🇸, French 🇫🇷 etc. (Coming soon!)",
      options: ["⬅ Back"],
    },
  };

  const currentNode = chatTree[path[path.length - 1]];

  const handleOptionClick = (option) => {
    if (option === "⬅ Back") {
      setPath((prev) => prev.slice(0, -1));
    } else if (chatTree[option]) {
      setPath((prev) => [...prev, option]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[450px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold text-lg">BizAI Assistant</h3>
            <p className="text-xs opacity-90">Rule-Based Chat Support</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
              {currentNode.message}
            </p>

            <div className="flex flex-col gap-2 mt-2">
              {currentNode.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-700 rounded-lg text-sm transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
