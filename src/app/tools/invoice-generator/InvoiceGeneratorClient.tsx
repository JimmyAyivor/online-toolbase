"use client";
import React, { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Eye,
  DollarSign,
  Calendar,
  User,
  Building2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ItemField = "description" | "quantity" | "rate";

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );

const today = (): string => new Date().toISOString().split("T")[0] ?? "";

// ─── Component ───────────────────────────────────────────────────────────────

export default function InvoiceGeneratorClient() {
  // Invoice meta
  const [invoiceNumber, setInvoiceNumber] = useState<string>("INV-001");
  const [invoiceDate, setInvoiceDate] = useState<string>(today());
  const [dueDate, setDueDate] = useState<string>("");

  // From (sender)
  const [fromCompany, setFromCompany] = useState<string>("");
  const [fromName, setFromName] = useState<string>("");
  const [fromEmail, setFromEmail] = useState<string>("");
  const [fromAddress, setFromAddress] = useState<string>("");
  const [fromPhone, setFromPhone] = useState<string>("");

  // To (client)
  const [toCompany, setToCompany] = useState<string>("");
  const [toName, setToName] = useState<string>("");
  const [toEmail, setToEmail] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  // Totals
  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // ─── Item operations ───────────────────────────────────────────────────

  const addItem = (): void => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), description: "", quantity: 1, rate: 0, amount: 0 },
    ]);
  };

  const removeItem = (id: number): void => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: number,
    field: ItemField,
    value: string | number,
  ): void => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }),
    );
  };

  // ─── Derived totals ────────────────────────────────────────────────────

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * tax) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8 print:hidden'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-700 to-gray-900 rounded-2xl mb-4 shadow-lg'>
            <FileText className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Invoice Generator
          </h2>
          <p className='text-gray-600'>
            Create professional invoices in minutes
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* ── Editor column ── */}
          <div className='lg:col-span-2 space-y-6 print:hidden'>
            {/* Invoice details */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2'>
                <Calendar className='w-5 h-5 text-slate-700' />
                Invoice Details
              </h3>
              <div className='grid md:grid-cols-3 gap-4'>
                {(
                  [
                    {
                      label: "Invoice Number",
                      type: "text",
                      value: invoiceNumber,
                      set: setInvoiceNumber,
                    },
                    {
                      label: "Invoice Date",
                      type: "date",
                      value: invoiceDate,
                      set: setInvoiceDate,
                    },
                    {
                      label: "Due Date",
                      type: "date",
                      value: dueDate,
                      set: setDueDate,
                    },
                  ] as const
                ).map(({ label, type, value, set }) => (
                  <div key={label}>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      {label}
                    </label>
                    <input
                      type={type}
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        set(e.target.value)
                      }
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-slate-500 transition-colors'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* From / To */}
            <div className='grid md:grid-cols-2 gap-6'>
              <ContactCard
                icon={<User className='w-5 h-5 text-slate-700' />}
                title='From (Your Details)'
                fields={[
                  {
                    type: "text",
                    placeholder: "Your Company Name",
                    value: fromCompany,
                    set: setFromCompany,
                  },
                  {
                    type: "text",
                    placeholder: "Your Name",
                    value: fromName,
                    set: setFromName,
                  },
                  {
                    type: "email",
                    placeholder: "your@email.com",
                    value: fromEmail,
                    set: setFromEmail,
                  },
                  {
                    type: "tel",
                    placeholder: "Phone Number",
                    value: fromPhone,
                    set: setFromPhone,
                  },
                ]}
                textareaPlaceholder='Address'
                textareaValue={fromAddress}
                textareaRows={2}
                onTextareaChange={setFromAddress}
              />
              <ContactCard
                icon={<Building2 className='w-5 h-5 text-slate-700' />}
                title='Bill To (Client Details)'
                fields={[
                  {
                    type: "text",
                    placeholder: "Client Company Name",
                    value: toCompany,
                    set: setToCompany,
                  },
                  {
                    type: "text",
                    placeholder: "Client Name",
                    value: toName,
                    set: setToName,
                  },
                  {
                    type: "email",
                    placeholder: "client@email.com",
                    value: toEmail,
                    set: setToEmail,
                  },
                ]}
                textareaPlaceholder='Client Address'
                textareaValue={toAddress}
                textareaRows={3}
                onTextareaChange={setToAddress}
              />
            </div>

            {/* Line items */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className='font-bold text-gray-900 flex items-center gap-2'>
                  <DollarSign className='w-5 h-5 text-slate-700' />
                  Line Items
                </h3>
                <button
                  onClick={addItem}
                  className='flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors'
                >
                  <Plus className='w-4 h-4' />
                  Add Item
                </button>
              </div>

              <div className='space-y-3'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='grid grid-cols-12 gap-3 items-start'
                  >
                    <div className='col-span-5'>
                      <input
                        type='text'
                        placeholder='Description'
                        value={item.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-slate-500 transition-colors'
                      />
                    </div>
                    <div className='col-span-2'>
                      <input
                        type='number'
                        placeholder='Qty'
                        value={item.quantity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateItem(
                            item.id,
                            "quantity",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-slate-500 transition-colors'
                      />
                    </div>
                    <div className='col-span-2'>
                      <input
                        type='number'
                        placeholder='Rate'
                        value={item.rate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateItem(
                            item.id,
                            "rate",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-slate-500 transition-colors'
                      />
                    </div>
                    <div className='col-span-2'>
                      <input
                        type='text'
                        value={formatCurrency(item.amount)}
                        readOnly
                        className='w-full px-3 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700 font-semibold'
                      />
                    </div>
                    <div className='col-span-1 flex justify-center'>
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove item ${item.description || item.id}`}
                          className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className='mt-8 space-y-4 max-w-md ml-auto'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-700 font-medium'>Subtotal:</span>
                  <span className='text-xl font-bold text-gray-900'>
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Tax (%)
                    </label>
                    <input
                      type='number'
                      value={tax}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTax(parseFloat(e.target.value) || 0)
                      }
                      className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-slate-500 transition-colors'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Discount (%)
                    </label>
                    <input
                      type='number'
                      value={discount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDiscount(parseFloat(e.target.value) || 0)
                      }
                      className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-slate-500 transition-colors'
                    />
                  </div>
                </div>

                {tax > 0 && (
                  <div className='flex justify-between items-center text-green-700'>
                    <span className='font-medium'>Tax ({tax}%):</span>
                    <span className='font-bold'>
                      {formatCurrency(taxAmount)}
                    </span>
                  </div>
                )}
                {discount > 0 && (
                  <div className='flex justify-between items-center text-red-700'>
                    <span className='font-medium'>Discount ({discount}%):</span>
                    <span className='font-bold'>
                      -{formatCurrency(discountAmount)}
                    </span>
                  </div>
                )}

                <div className='flex justify-between items-center pt-4 border-t-2 border-gray-300'>
                  <span className='text-xl font-bold text-gray-900'>
                    Total:
                  </span>
                  <span className='text-3xl font-bold text-slate-700'>
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <h3 className='font-bold text-gray-900 mb-4'>
                Notes / Payment Terms
              </h3>
              <textarea
                placeholder='Add payment terms, thank you message, or additional notes...'
                value={notes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNotes(e.target.value)
                }
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-slate-500 resize-none transition-colors'
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className='flex gap-4'>
              <button
                onClick={() => setShowPreview((v) => !v)}
                className='flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-700 hover:bg-gray-800 text-white rounded-xl font-bold transition-colors shadow-lg'
              >
                <Eye className='w-5 h-5' />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              <button
                onClick={() => window.print()}
                className='flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-slate-700 to-gray-900 hover:from-slate-800 hover:to-black text-white rounded-xl font-bold transition-all shadow-lg'
              >
                <Download className='w-5 h-5' />
                Download / Print
              </button>
            </div>
          </div>

          {/* ── Preview column ── */}
          {showPreview && (
            <div className='lg:col-span-1 print:col-span-3'>
              <div
                className='bg-white rounded-2xl shadow-xl p-8 sticky top-8'
                id='invoice-preview'
              >
                <div className='mb-8'>
                  <h2 className='text-3xl font-bold text-slate-900 mb-2'>
                    INVOICE
                  </h2>
                  <div className='text-sm text-gray-600'>
                    <p className='font-semibold'>#{invoiceNumber}</p>
                    <p>Date: {invoiceDate}</p>
                    {dueDate && <p>Due: {dueDate}</p>}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-8 mb-8'>
                  <AddressBlock
                    label='From:'
                    lines={[
                      fromCompany,
                      fromName,
                      fromEmail,
                      fromPhone,
                      fromAddress,
                    ]}
                    boldFirst
                  />
                  <AddressBlock
                    label='Bill To:'
                    lines={[toCompany, toName, toEmail, toAddress]}
                    boldFirst
                  />
                </div>

                <table className='w-full mb-8 text-sm'>
                  <thead className='border-b-2 border-gray-300'>
                    <tr>
                      {["Description", "Qty", "Rate", "Amount"].map((h, i) => (
                        <th
                          key={h}
                          className={`py-2 font-bold text-gray-900 ${i === 0 ? "text-left" : "text-right"}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      .filter((item) => item.description)
                      .map((item) => (
                        <tr key={item.id} className='border-b border-gray-200'>
                          <td className='py-3 text-gray-700'>
                            {item.description}
                          </td>
                          <td className='text-right py-3 text-gray-700'>
                            {item.quantity}
                          </td>
                          <td className='text-right py-3 text-gray-700'>
                            {formatCurrency(item.rate)}
                          </td>
                          <td className='text-right py-3 font-semibold text-gray-900'>
                            {formatCurrency(item.amount)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-700'>Subtotal:</span>
                    <span className='font-semibold text-gray-900'>
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  {tax > 0 && (
                    <div className='flex justify-between text-green-700'>
                      <span>Tax ({tax}%):</span>
                      <span className='font-semibold'>
                        {formatCurrency(taxAmount)}
                      </span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className='flex justify-between text-red-700'>
                      <span>Discount ({discount}%):</span>
                      <span className='font-semibold'>
                        -{formatCurrency(discountAmount)}
                      </span>
                    </div>
                  )}
                  <div className='flex justify-between pt-3 border-t-2 border-gray-300'>
                    <span className='text-lg font-bold text-gray-900'>
                      Total:
                    </span>
                    <span className='text-2xl font-bold text-slate-700'>
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {notes && (
                  <div className='mt-8 pt-8 border-t-2 border-gray-200'>
                    <h4 className='font-bold text-gray-900 mb-2 text-sm'>
                      Notes:
                    </h4>
                    <p className='text-sm text-gray-700 whitespace-pre-line'>
                      {notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-preview,
          #invoice-preview * {
            visibility: visible;
          }
          #invoice-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InputFieldDef {
  type: string;
  placeholder: string;
  value: string;
  set: (v: string) => void;
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  fields: InputFieldDef[];
  textareaPlaceholder: string;
  textareaValue: string;
  textareaRows: number;
  onTextareaChange: (v: string) => void;
}

function ContactCard({
  icon,
  title,
  fields,
  textareaPlaceholder,
  textareaValue,
  textareaRows,
  onTextareaChange,
}: ContactCardProps) {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
      <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2'>
        {icon}
        {title}
      </h3>
      <div className='space-y-4'>
        {fields.map(({ type, placeholder, value, set }) => (
          <input
            key={placeholder}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              set(e.target.value)
            }
            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-slate-500 transition-colors'
          />
        ))}
        <textarea
          placeholder={textareaPlaceholder}
          value={textareaValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onTextareaChange(e.target.value)
          }
          className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-slate-500 resize-none transition-colors'
          rows={textareaRows}
        />
      </div>
    </div>
  );
}

interface AddressBlockProps {
  label: string;
  lines: string[];
  boldFirst: boolean;
}

function AddressBlock({ label, lines, boldFirst }: AddressBlockProps) {
  const nonEmpty = lines.filter(Boolean);
  if (nonEmpty.length === 0) return null;
  return (
    <div>
      <h3 className='font-bold text-gray-900 mb-2'>{label}</h3>
      <div className='text-sm text-gray-700'>
        {nonEmpty.map((line, i) => (
          <p
            key={i}
            className={
              boldFirst && i === 0
                ? "font-semibold whitespace-pre-line"
                : "whitespace-pre-line"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
