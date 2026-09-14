import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2,
  Building
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { formatNaira } from '../utils/currency';

interface InvoiceModalProps {
  invoiceData: {
    invoiceNumber: string; // e.g. INV-EBT-2026-904
    referenceCode: string;
    issueDate: string;
    dueDate: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    serviceName: string;
    items: Array<{
      description: string;
      qty: number;
      unitPrice: number;
      total: number;
    }>;
    subtotal: number;
    vat: number;
    totalAmount: number;
    isPaid: boolean;
    paymentRef?: string;
  } | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoiceData,
  onClose,
}) => {
  if (!invoiceData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-10 print:p-0 print:shadow-none print:max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Print / Action Toolbar (Hidden in Print) */}
        <div className="print:hidden flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase">
            <span>Official Billing Document</span>
            <span>•</span>
            <span className={invoiceData.isPaid ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
              {invoiceData.isPaid ? 'PAID & SETTLED' : 'PAYMENT PENDING'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet Body */}
        <div id="printable-invoice-content" className="space-y-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <BrandLogo variant="light" size="md" showTagline={true} />
              <div className="mt-3 text-xs text-slate-600 space-y-0.5">
                <p className="font-semibold text-slate-800">Ebentrick Global Services Limited</p>
                <p>Engineering Directorate & Innovation Center</p>
                <p>Plot 14B, Commercial Strip, Victoria Island / Lekki, Lagos</p>
                <p>Tel: +234 803 245 8901 • support@ebentrick.com</p>
                <p className="text-[10px] text-slate-500 font-mono">RC: 1894402 • Tax ID: EBT-NGR-99201</p>
              </div>
            </div>

            <div className="sm:text-right">
              <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                {invoiceData.isPaid ? 'RECEIPT' : 'INVOICE'}
              </h2>
              <p className="text-xs font-mono text-slate-500 mt-1">
                Invoice #: <strong className="text-slate-900">{invoiceData.invoiceNumber}</strong>
              </p>
              <p className="text-xs font-mono text-slate-500">
                Ref Code: <strong className="text-blue-600">{invoiceData.referenceCode}</strong>
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Issue Date: <span className="font-medium text-slate-800">{invoiceData.issueDate}</span>
              </p>
              <p className="text-xs text-slate-600">
                Payment Due: <span className="font-medium text-slate-800">{invoiceData.dueDate}</span>
              </p>

              {/* Status Stamp */}
              <div className="mt-3 inline-block">
                {invoiceData.isPaid ? (
                  <span className="inline-block px-4 py-1.5 border-2 border-emerald-600 text-emerald-700 text-xs font-mono font-extrabold tracking-widest uppercase rotate-[-3deg] rounded">
                    PAID IN FULL
                  </span>
                ) : (
                  <span className="inline-block px-4 py-1.5 border-2 border-amber-500 text-amber-700 text-xs font-mono font-extrabold tracking-widest uppercase rotate-[-3deg] rounded">
                    PAYMENT DUE
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bill To Info */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-mono uppercase text-slate-400 font-bold block mb-1">
                Billed To (Client):
              </span>
              <p className="text-sm font-bold text-slate-900">{invoiceData.customerName}</p>
              <p className="text-slate-600">{invoiceData.customerAddress}</p>
              <p className="text-slate-600">{invoiceData.customerEmail}</p>
              <p className="text-slate-600 font-mono">{invoiceData.customerPhone}</p>
            </div>

            <div>
              <span className="font-mono uppercase text-slate-400 font-bold block mb-1">
                Engineering Discipline:
              </span>
              <p className="text-sm font-bold text-blue-700">{invoiceData.serviceName}</p>
              <p className="text-slate-600 mt-1">
                Installation & Commissioning: Certified Field Crew
              </p>
              {invoiceData.paymentRef && (
                <p className="text-emerald-700 font-mono mt-1 font-semibold">
                  Transaction Ref: {invoiceData.paymentRef}
                </p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider font-mono border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Item Scope & Deliverable</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {invoiceData.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-medium text-slate-900">{it.description}</td>
                    <td className="py-3 px-4 text-center font-mono">{it.qty}</td>
                    <td className="py-3 px-4 text-right font-mono">{formatNaira(it.unitPrice)}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold">{formatNaira(it.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotals */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pt-2">
            <div className="max-w-xs text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Warranty & Quality Assurance</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All electrical and smart automation hardware provided includes an official 24-month manufacturer and workmanship guarantee.
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-mono text-slate-400 block">
                  Verify Authentic Digital Seal:
                </span>
                <span className="inline-block px-2 py-1 bg-slate-100 rounded text-[10px] font-mono text-blue-800 font-bold mt-1">
                  EBT-SEC-HASH-883109A
                </span>
              </div>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-medium">{formatNaira(invoiceData.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VAT (7.5% Standard):</span>
                <span className="font-mono font-medium">{formatNaira(invoiceData.vat)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="font-mono text-blue-700 font-extrabold text-base">
                  {formatNaira(invoiceData.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">Engr. Ebenezer Trickson, FNSE</p>
              <p className="text-[11px]">Chief Technical Officer & Managing Director</p>
            </div>
            <div className="text-center sm:text-right font-mono text-[11px]">
              <p className="text-blue-600 font-bold">Ebentrick Global Services Ltd</p>
              <p className="text-slate-400">"Light makes the difference"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
