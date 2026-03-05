import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export function AddTransaction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    goldBrand: "",
    goldType: "",
    shopName: "",
    quantity: "",
    buyPrice: "",
    purchaseDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Transaction data:", formData);
    navigate("/portfolio");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/portfolio")}
            className="mb-4 flex items-center space-x-2 text-[#94A3B8] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </button>
          <h1 className="mb-2 bg-gradient-to-r from-[#F5B041] to-[#FFD700] bg-clip-text text-4xl font-bold text-transparent">
            Add Gold Transaction
          </h1>
          <p className="text-[#94A3B8]">Record your gold purchase details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-xl border border-[#1E293B] bg-[#121826] p-8">
          <div className="space-y-6">
            {/* Gold Brand */}
            <div className="space-y-2">
              <Label htmlFor="goldBrand" className="text-white">Gold Brand *</Label>
              <Select onValueChange={(value) => handleInputChange("goldBrand", value)}>
                <SelectTrigger className="border-[#1E293B] bg-[#0B0F19] text-white">
                  <SelectValue placeholder="Select gold brand" />
                </SelectTrigger>
                <SelectContent className="border-[#1E293B] bg-[#121826]">
                  <SelectItem value="sjc">SJC</SelectItem>
                  <SelectItem value="pnj">PNJ</SelectItem>
                  <SelectItem value="doji">DOJI</SelectItem>
                  <SelectItem value="btmc">Bảo Tín Minh Châu</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gold Type */}
            <div className="space-y-2">
              <Label htmlFor="goldType" className="text-white">Gold Type *</Label>
              <Select onValueChange={(value) => handleInputChange("goldType", value)}>
                <SelectTrigger className="border-[#1E293B] bg-[#0B0F19] text-white">
                  <SelectValue placeholder="Select gold type" />
                </SelectTrigger>
                <SelectContent className="border-[#1E293B] bg-[#121826]">
                  <SelectItem value="bar">Gold Bar</SelectItem>
                  <SelectItem value="coin">Gold Coin</SelectItem>
                  <SelectItem value="ring">Gold Ring</SelectItem>
                  <SelectItem value="necklace">Gold Necklace</SelectItem>
                  <SelectItem value="bracelet">Gold Bracelet</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Shop Name */}
            <div className="space-y-2">
              <Label htmlFor="shopName" className="text-white">Shop Name</Label>
              <Input
                id="shopName"
                type="text"
                placeholder="Enter shop name"
                value={formData.shopName}
                onChange={(e) => handleInputChange("shopName", e.target.value)}
                className="border-[#1E293B] bg-[#0B0F19] text-white placeholder:text-[#94A3B8]"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-white">Quantity (taels) *</Label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="border-[#1E293B] bg-[#0B0F19] text-white placeholder:text-[#94A3B8]"
                required
              />
            </div>

            {/* Buy Price */}
            <div className="space-y-2">
              <Label htmlFor="buyPrice" className="text-white">Buy Price (VND per tael) *</Label>
              <Input
                id="buyPrice"
                type="number"
                placeholder="75,000,000"
                value={formData.buyPrice}
                onChange={(e) => handleInputChange("buyPrice", e.target.value)}
                className="border-[#1E293B] bg-[#0B0F19] text-white placeholder:text-[#94A3B8]"
                required
              />
              <p className="text-xs text-[#94A3B8]">
                Total: ₫{(parseFloat(formData.quantity || "0") * parseFloat(formData.buyPrice || "0")).toLocaleString('vi-VN')}
              </p>
            </div>

            {/* Purchase Date */}
            <div className="space-y-2">
              <Label htmlFor="purchaseDate" className="text-white">Purchase Date *</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                className="border-[#1E293B] bg-[#0B0F19] text-white"
                required
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-white">Notes (Optional)</Label>
              <textarea
                id="notes"
                rows={4}
                placeholder="Add any additional notes about this purchase..."
                className="w-full rounded-md border border-[#1E293B] bg-[#0B0F19] px-3 py-2 text-white placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex space-x-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#F5B041] to-[#D4941F] text-[#0B0F19] hover:from-[#FFD700] hover:to-[#F5B041]"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Transaction
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/portfolio")}
              className="border-[#1E293B] hover:bg-[#1E293B]"
            >
              Cancel
            </Button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 rounded-xl border border-[#1E293B] bg-[#121826] p-6">
          <h3 className="mb-2 font-semibold text-[#F5B041]">💡 Tip</h3>
          <p className="text-sm text-[#94A3B8]">
            Keep your purchase receipts safe. Record the exact weight and price to track your investment accurately.
            Gold prices are updated in real-time to help you monitor your portfolio's performance.
          </p>
        </div>
      </div>
    </div>
  );
}
