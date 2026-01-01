import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Types
import { InvoiceType } from "@/types";

type InvoiceTemplate4Props = InvoiceType & {
    isEditMode?: boolean;
};

const InvoiceTemplate4 = (props: InvoiceTemplate4Props) => {
    const { sender, receiver, details, isEditMode = false } = props;

    // Force Elite8Digital logo if old Invoify logo is present
    const logoSrc = (!details.invoiceLogo || 
        details.invoiceLogo === "" || 
        details.invoiceLogo.includes("invoify-logo")) 
        ? "/assets/img/elite8digital.png" 
        : details.invoiceLogo;

    return (
        <InvoiceLayout data={props}>
            {/* Main Container - Optimized for single page */}
            <div className="bg-white p-6 max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-4">
                    {/* Logo Upload Area */}
                    <div className="w-24 h-24 b rounded flex items-center justify-center bg-blue-50">
                        <img
                            src={logoSrc}
                            alt={`Logo of ${sender.name || "Elite8Digital"}`}
                            className="max-w-full max-h-full object-contain p-2"
                        />
                    </div>

                    {/* TAX INVOICE Title */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">TAX INVOICE</h1>
                    </div>
                </div>

                {/* Company Details Section */}
                <div className="mb-4">
                    <div className="text-xs text-gray-600 space-y-0.5">
                        <p className="font-semibold text-gray-800 text-sm">{sender.name || "Your Company"}</p>
                        <p className="text-gray-500">{sender.address || "Company's Address"}</p>
                        <p className="text-gray-500">{sender.city || "City"}, {sender.zipCode || "State"}, {sender.country || "India"}</p>
                    </div>
                </div>

                {/* Bill To and Invoice Details Section */}
                <div className="flex justify-between mb-4">
                    {/* Bill To */}
                    <div className="w-1/2">
                        <p className="font-semibold text-gray-800 mb-1 text-sm">Bill To:</p>
                        <div className="text-xs text-gray-600 space-y-0.5">
                            <p className="font-medium text-gray-700">{receiver.name || "Your Client's Company"}</p>
                            <p className="text-gray-500">{receiver.address || "Client's Address"}</p>
                            <p className="text-gray-500">{receiver.city || "City"}, {receiver.zipCode || "State"}, {receiver.country || "India"}</p>
                        </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="w-1/2 text-right">
                        <div className="text-xs space-y-1">
                            <div className="flex justify-end items-center gap-3">
                                <span className="text-gray-600">Invoice#</span>
                                <span className="font-semibold text-gray-800">{details.invoiceNumber || "INV-12"}</span>
                            </div>
                            <div className="flex justify-end items-center gap-3">
                                <span className="text-gray-600">Invoice Date</span>
                                <span className="text-gray-700">
                                    {new Date(details.invoiceDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                            </div>
                            <div className="flex justify-end items-center gap-3">
                                <span className="text-gray-600">Due Date</span>
                                <span className="text-gray-700">
                                    {new Date(details.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Place of Supply */}
                <div className="mb-3">
                    <p className="text-xs">
                        <span className="font-semibold text-gray-800">Place Of Supply: </span>
                        <span className="text-gray-500">{sender.zipCode || "State"}</span>
                    </p>
                </div>

                {/* Items Table */}
                <div className="mb-4">
                    <table className="w-full border-collapse">
                        {/* Table Header - Black Background */}
                        <thead>
                            <tr className="bg-black text-white">
                                <th className="text-left py-2 px-2 text-xs font-semibold">Item Description</th>
                                <th className="text-center py-2 px-2 text-xs font-semibold w-14">Qty</th>
                                <th className="text-center py-2 px-2 text-xs font-semibold w-20">Rate</th>
                                <th className="text-center py-2 px-2 text-xs font-semibold w-16">SGST</th>
                                <th className="text-center py-2 px-2 text-xs font-semibold w-16">CGST</th>
                                <th className="text-center py-2 px-2 text-xs font-semibold w-16">Cess</th>
                                <th className="text-right py-2 px-2 text-xs font-semibold w-24">Amount</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {details.items.slice(0, 3).map((item, index) => (
                                <React.Fragment key={index}>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-2 px-2">
                                            <div>
                                                <p className="font-medium text-gray-800 text-xs">{item.name}</p>
                                                {item.description && (
                                                    <p className="text-xs text-gray-500">{item.description.substring(0, 60)}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-2 px-2 text-center text-xs text-gray-700">{item.quantity}</td>
                                        <td className="py-2 px-2 text-center text-xs text-gray-700">{formatNumberWithCommas(Number(item.unitPrice))}</td>
                                        <td className="py-2 px-2 text-center text-xs text-gray-700">0</td>
                                        <td className="py-2 px-2 text-center text-xs text-gray-700">0</td>
                                        <td className="py-2 px-2 text-center text-xs text-gray-700">0</td>
                                        <td className="py-2 px-2 text-right text-xs font-semibold text-gray-800">
                                            {formatNumberWithCommas(Number(item.total))}
                                        </td>
                                    </tr>
                                    {/* Tax breakdown row */}
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <td className="py-1 px-2 text-xs text-gray-500">HSN/SAC</td>
                                        <td className="py-1 px-2 text-center text-xs text-gray-500"></td>
                                        <td className="py-1 px-2 text-center text-xs text-gray-500">0.00</td>
                                        <td className="py-1 px-2 text-center text-xs text-gray-500">0.00</td>
                                        <td className="py-1 px-2 text-center text-xs text-gray-500">0.00</td>
                                        <td className="py-1 px-2 text-center text-xs text-gray-500">0.00</td>
                                        <td className="py-1 px-2 text-right text-xs text-gray-500"></td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals Section */}
                <div className="flex justify-end mb-4">
                    <div className="w-64">
                        <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between py-1.5">
                                <span className="text-gray-600">Sub Total</span>
                                <span className="font-semibold text-gray-800">
                                    {formatNumberWithCommas(Number(details.subTotal))}
                                </span>
                            </div>
                            
                            {details.taxDetails?.amount != undefined && details.taxDetails?.amount > 0 && (
                                <>
                                    <div className="flex justify-between py-1.5">
                                        <span className="text-gray-600">SGST (6%)</span>
                                        <span className="text-gray-800">
                                            {formatNumberWithCommas((Number(details.subTotal) * 0.06))}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-1.5">
                                        <span className="text-gray-600">CGST (6%)</span>
                                        <span className="text-gray-800">
                                            {formatNumberWithCommas((Number(details.subTotal) * 0.06))}
                                        </span>
                                    </div>
                                </>
                            )}

                            <div className="flex justify-between py-2 border-t-2 border-gray-300">
                                <span className="font-bold text-gray-800 text-sm">TOTAL</span>
                                <span className="font-bold text-gray-800 text-base border-2 border-yellow-400 bg-yellow-50 px-3 py-1.5">
                                    {details.currency} {formatNumberWithCommas(Number(details.totalAmount))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes Section */}
                <div className="mb-3">
                    <p className="font-semibold text-gray-800 text-xs mb-0.5">Notes:</p>
                    <p className="text-xs text-gray-600">{details.additionalNotes || "It was great doing business with you."}</p>
                </div>

                {/* Terms & Conditions */}
                <div className="mb-4">
                    <p className="font-semibold text-gray-800 text-xs mb-0.5">Terms & Conditions</p>
                    <p className="text-xs text-gray-600">{details.paymentTerms || "Please make the payment by the due date."}</p>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-300 pt-3 text-center">
                    <p className="text-xs text-gray-500">
                        Crafted with ease using <span className="font-semibold">Elite8Digital</span>
                    </p>
                </div>

                {/* Signature */}
                {details?.signature?.data && isDataUrl(details?.signature?.data) ? (
                    <div className="mt-3">
                        <p className="font-semibold text-gray-800 mb-1 text-xs">Authorized Signature:</p>
                        <img
                            src={details.signature.data}
                            width={100}
                            height={50}
                            alt={`Signature of ${sender.name}`}
                        />
                    </div>
                ) : details.signature?.data ? (
                    <div className="mt-3">
                        <p className="text-gray-800 mb-1 text-xs">Authorized Signature:</p>
                        <p
                            style={{
                                fontSize: 22,
                                fontWeight: 400,
                                fontFamily: `${details.signature.fontFamily}, cursive`,
                                color: "black",
                            }}
                        >
                            {details.signature.data}
                        </p>
                    </div>
                ) : null}
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate4;
