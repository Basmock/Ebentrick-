import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Building, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Copy,
  Check,
  Printer
} from 'lucide-react';
import { appStore } from '../services/store';
import { formatNaira } from '../utils/currency';

interface PaymentModalProps {
  amount: number;
  currency?: string;
  description: string;
  referenceId: string; // booking or enrollment ID
  referenceCode: string; // e.g. EBT-BK-2026-904
  customerEmail: string;
  customerName: string;
  onClose: () => void;
  onPaymentComplete: (paymentRef: string) => void;
  onViewInvoice: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  amount,
  currency = 'NGN',
  description,
  referenceId,
  referenceCode,
  customerEmail,
  customerName,
  onClose,
  onPaymentComplete,
  onViewInvoice,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'ussd'>('card');
  const [cardNumber, setCardNumber] = useState('4532 8900 1234 5678');
  const [cardExpiry, setCardExpiry] = useState('09/28');
  const [cardCvv, setCardCvv] = useState('881');
  const [cardHolder, setCardHolder] = useState(customerName || 'EBEN TRICKSON');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);

  const virtualAccount = {
    bank: 'Ebentrick Merchant Escrow / First Bank',
    accountNumber: '3098114421',
    accountName: 'Ebentrick Global Services Ltd',
    routingCode: '011-0021'
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(virtualAccount.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate 3D Secure / Payment Gateway roundtrip
    setTimeout(() => {
      const generatedRef = `PAY-REF-${Math.floor(100000 + Math.random() * 900000)}`;
      setPaymentRef(generatedRef);
      setIsProcessing(false);
      setIsSuccess(true);
      onPaymentComplete(generatedRef);

      // Automated Payment Receipt Email
      appStore.createEmailNotification({
        recipientEmail: customerEmail,
        recipientName: customerName,
        type: 'payment_receipt',
        subject: `Payment Receipt: ${formatNaira(amount)} Confirmed (${generatedRef})`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 6px;">
              <h2 style="color: #ffffff; margin: 0;">EBENTRICK GLOBAL SERVICES</h2>
              <p style="color: #60a5fa; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">PAYMENT CONFIRMATION RECEIPT</p>
            </div>
            <div style="padding: 24px 0;">
              <h3 style="color: #10b981;">Payment Verified</h3>
              <p>Dear ${customerName},</p>
              <p>We have successfully received and settled your payment of <strong>${formatNaira(amount)}</strong>.</p>
              <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #10b981; margin: 16px 0;">
                <p style="margin: 4px 0;"><strong>Payment Reference:</strong> ${generatedRef}</p>
                <p style="margin: 4px 0;"><strong>Order / Booking Code:</strong> ${referenceCode}</p>
                <p style="margin: 4px 0;"><strong>Item Description:</strong> ${description}</p>
                <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ${formatNaira(amount)}</p>
                <p style="margin: 4px 0;"><strong>Status:</strong> COMPLETED & SETTLED</p>
              </div>
              <p>Your booking/admission status is now updated in our central operations system.</p>
            </div>
          </div>
        `,
        textContent: `Payment receipt: ${formatNaira(amount)} confirmed. Reference: ${generatedRef}. Code: ${referenceCode}.`,
        metadata: { referenceCode, generatedRef }
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500" />

        {!isSuccess ? (
          <>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Notice: Payments disabled */}
            <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 animate-ping"></span>
              <span><strong>Notice:</strong> Online payment options are disabled for now. All orders are settled via official corporate invoice.</span>
            </div>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-400 font-bold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Payment</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Secure Payment Checkout
              </h3>
              <div className="mt-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Reference: {referenceCode}</div>
                  <div className="text-xs text-slate-300 font-medium line-clamp-1">{description}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 uppercase font-mono">Amount Due</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {formatNaira(amount)}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Debit/Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('ussd')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all ${
                  paymentMethod === 'ussd'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>USSD / Mobile</span>
              </button>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      CVV Code
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white uppercase focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Verifying with Gateway...
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Authorize Payment of {formatNaira(amount)}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Bank Transfer View */}
            {paymentMethod === 'bank_transfer' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                  <div className="text-slate-400 text-[11px] uppercase font-mono">Transfer To Ebentrick Dedicated Account</div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Bank:</span>
                    <span className="text-white font-bold">{virtualAccount.bank}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-mono font-bold text-sm tracking-wider">
                        {virtualAccount.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                        title="Copy Account Number"
                      >
                        {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Beneficiary:</span>
                    <span className="text-white font-medium">{virtualAccount.accountName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Transfer Narration:</span>
                    <span className="text-blue-400 font-mono font-bold">{referenceCode}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Funds transferred are automatically verified within 60 seconds. Click below once you have wired the funds.
                </p>

                <button
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Listening for Bank Confirmation...
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I Have Completed The Transfer</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* USSD View */}
            {paymentMethod === 'ussd' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-center">
                  <span className="text-xs text-slate-400">Dial on your mobile device:</span>
                  <div className="font-mono text-xl font-bold text-amber-400 tracking-wider">
                    *894*000*{amount}*4421#
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    Supported: GTBank, Zenith, FirstBank, Access, UBA
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Verifying USSD Session...
                    </span>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>Confirm USSD Payment</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Payment Success View */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-extrabold text-white">
                Payment Successful!
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Transaction Reference: <strong className="font-mono text-emerald-400">{paymentRef}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Order / Booking:</span>
                <span className="font-mono font-bold text-white">{referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-mono font-bold text-emerald-400">{formatNaira(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmation Sent To:</span>
                <span className="text-blue-300">{customerEmail}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onViewInvoice}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>View & Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
