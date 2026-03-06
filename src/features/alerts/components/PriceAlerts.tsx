import { useState } from "react";
import { Bell, Plus, Trash2, Mail, Smartphone } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Switch } from "../../../components/ui/switch";
import { useTranslation } from "react-i18next";

interface PriceAlert {
  id: string;
  goldBrand: string;
  condition: "above" | "below";
  targetPrice: number;
  email: boolean;
  push: boolean;
  active: boolean;
}

const mockAlerts: PriceAlert[] = [
  {
    id: "1",
    goldBrand: "SJC",
    condition: "above",
    targetPrice: 78000000,
    email: true,
    push: true,
    active: true,
  },
  {
    id: "2",
    goldBrand: "PNJ",
    condition: "below",
    targetPrice: 75000000,
    email: true,
    push: false,
    active: true,
  },
];

export function PriceAlerts() {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<PriceAlert[]>(mockAlerts);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    goldBrand: "",
    condition: "above" as "above" | "below",
    targetPrice: "",
    email: true,
    push: true,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      goldBrand: formData.goldBrand,
      condition: formData.condition,
      targetPrice: parseFloat(formData.targetPrice),
      email: formData.email,
      push: formData.push,
      active: true,
    };
    setAlerts([...alerts, newAlert]);
    setFormData({
      goldBrand: "",
      condition: "above",
      targetPrice: "",
      email: true,
      push: true,
    });
    setShowForm(false);
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div>
            <h1 className="mb-2 bg-gradient-to-r from-[#F5B041] to-[#FFD700] bg-clip-text text-4xl font-bold text-transparent">
              {t('alerts.title')}
            </h1>
            <p className="text-[#94A3B8]">{t('alerts.subtitle')}</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-[#F5B041] to-[#D4941F] text-[#0B0F19] hover:from-[#FFD700] hover:to-[#F5B041]"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('alerts.create_alert')}
          </Button>
        </div>

        {/* Create Alert Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-[#1E293B] bg-[#121826] p-6">
            <h2 className="mb-6 text-xl font-semibold text-white">{t('alerts.create_alert')}</h2>
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="goldBrand" className="text-white">{t('alerts.gold_brand')} *</Label>
                  <Select onValueChange={(value) => handleInputChange("goldBrand", value)}>
                    <SelectTrigger className="border-[#1E293B] bg-[#0B0F19] text-white">
                      <SelectValue placeholder={t('alerts.select_brand')} />
                    </SelectTrigger>
                    <SelectContent className="border-[#1E293B] bg-[#121826]">
                      <SelectItem value="sjc">SJC</SelectItem>
                      <SelectItem value="pnj">PNJ</SelectItem>
                      <SelectItem value="doji">DOJI</SelectItem>
                      <SelectItem value="btmc">Bảo Tín Minh Châu</SelectItem>
                      <SelectItem value="world">World Gold (XAU/USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition" className="text-white">{t('alerts.condition')} *</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => handleInputChange("condition", value)}
                  >
                    <SelectTrigger className="border-[#1E293B] bg-[#0B0F19] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#1E293B] bg-[#121826]">
                      <SelectItem value="above">{t('alerts.above')}</SelectItem>
                      <SelectItem value="below">{t('alerts.below')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetPrice" className="text-white">{t('alerts.target_price')} (VND) *</Label>
                <Input
                  id="targetPrice"
                  type="number"
                  placeholder={t('alerts.enter_price')}
                  value={formData.targetPrice}
                  onChange={(e) => handleInputChange("targetPrice", e.target.value)}
                  className="border-[#1E293B] bg-[#0B0F19] text-white placeholder:text-[#94A3B8]"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-white">{t('alerts.notification_method')}</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-[#1E293B] bg-[#0B0F19] p-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-[#F5B041]" />
                      <div>
                        <div className="font-medium text-white">{t('alerts.email')}</div>
                        <div className="text-sm text-[#94A3B8]">Receive alerts via email</div>
                      </div>
                    </div>
                    <Switch
                      checked={formData.email}
                      onCheckedChange={(checked) => handleInputChange("email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-[#1E293B] bg-[#0B0F19] p-4">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-[#F5B041]" />
                      <div>
                        <div className="font-medium text-white">Push Notification</div>
                        <div className="text-sm text-[#94A3B8]">Receive alerts on your device</div>
                      </div>
                    </div>
                    <Switch
                      checked={formData.push}
                      onCheckedChange={(checked) => handleInputChange("push", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#F5B041] to-[#D4941F] text-[#0B0F19] hover:from-[#FFD700] hover:to-[#F5B041]"
                >
                  Create Alert
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-[#1E293B] hover:bg-[#1E293B]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Active Alerts */}
        <div className="rounded-xl border border-[#1E293B] bg-[#121826]">
          <div className="border-b border-[#1E293B] p-6">
            <h2 className="text-xl font-semibold text-white">Active Alerts</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">
              {alerts.filter((a) => a.active).length} active alert{alerts.filter((a) => a.active).length !== 1 ? 's' : ''}
            </p>
          </div>

          {alerts.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="mx-auto mb-4 h-12 w-12 text-[#94A3B8]" />
              <h3 className="mb-2 font-semibold text-white">No alerts yet</h3>
              <p className="mb-4 text-sm text-[#94A3B8]">
                Create your first price alert to get notified when gold prices reach your target
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-[#F5B041] to-[#D4941F] text-[#0B0F19]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Alert
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-[#1E293B]">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-6 transition-colors hover:bg-[#1E293B]/30"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${alert.active
                          ? "bg-gradient-to-br from-[#F5B041] to-[#D4941F]"
                          : "bg-[#1E293B]"
                        }`}
                    >
                      <Bell className={`h-6 w-6 ${alert.active ? "text-[#0B0F19]" : "text-[#94A3B8]"}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">{alert.goldBrand.toUpperCase()}</span>
                        <span className="text-[#94A3B8]">•</span>
                        <span className="text-sm text-[#94A3B8]">
                          {alert.condition === "above" ? "Above" : "Below"} ₫
                          {alert.targetPrice.toLocaleString('vi-VN')}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-3 text-xs text-[#94A3B8]">
                        {alert.email && (
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>Email</span>
                          </div>
                        )}
                        {alert.push && (
                          <div className="flex items-center space-x-1">
                            <Smartphone className="h-3 w-3" />
                            <span>Push</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Switch checked={alert.active} onCheckedChange={() => toggleAlert(alert.id)} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                      className="text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-[#EF4444]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-xl border border-[#1E293B] bg-[#121826] p-6">
          <h3 className="mb-2 font-semibold text-[#F5B041]">💡 How Price Alerts Work</h3>
          <ul className="space-y-2 text-sm text-[#94A3B8]">
            <li>• Alerts are checked every 5 minutes using live gold price data</li>
            <li>• You'll receive a notification once when the price crosses your target</li>
            <li>• Enable email or push notifications based on your preference</li>
            <li>• Toggle alerts on/off without deleting them</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
