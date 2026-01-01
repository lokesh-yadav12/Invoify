import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate3 = (data: InvoiceType) => {
    const { sender, receiver, details } = data;

    // Force Elite8Digital logo if old Invoify logo is present
    const logoSrc = (!details.invoiceLogo || 
        details.invoiceLogo === "" || 
        details.invoiceLogo.includes("invoify-logo")) 
        ? "/assets/img/elite8digital.png" 
        : details.invoiceLogo;

    return (
        <InvoiceLayout data={data}>
            {/* Main container - Wider and more compact */}
            <div className="bg-slate-100 p-4">
                <div className="max-w-7xl mx-auto bg-white shadow-lg">
                    {/* Header Section - Compact */}
                    <div className="flex justify-between items-start p-5 pb-3">
                        {/* Company Info with Blue Background */}
                        <div className="bg-blue-500 text-white px-5 py-3 rounded">
                            {/* Logo - Always show Elite8Digital logo */}
                            <div className="mb-2">
                                <img
                                    src={details.invoiceLogo || "/assets/img/elite8digital.png"}
                                    width={50}
                                    height={35}
                                    alt={`Logo of ${sender.name || "Elite8Digital"}`}
                                    className="max-h-8 w-auto"
                                    style={{ maxWidth: "50px", maxHeight: "35px", objectFit: "contain" }}
                                />
                            </div>
                            <h1 className="text-base font-bold">{sender.name || "Company Name"}</h1>
                            <p className="text-xs mt-0.5 opacity-90">Excellence in Every Detail</p>
                        </div>

                        {/* Invoice Title */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-700 tracking-wide">INVOICE</h2>
                        </div>
                    </div>

                    {/* Company Address and Invoice Details - Compact */}
                    <div className="flex justify-between px-5 pb-3">
                        {/* Company Address */}
                        <div className="text-xs text-gray-700 leading-tight">
                            {sender.address && <p>{sender.address}</p>}
                            {(sender.city || sender.zipCode) && (
                                <p>
                                    {sender.city && sender.zipCode 
                                        ? `${sender.city}, ${sender.zipCode}` 
                                        : sender.city || sender.zipCode}
                                </p>
                            )}
                            {sender.country && <p>{sender.country}</p>}
                            {sender.phone && <p>{sender.phone}</p>}
                            {sender.email && <p>{sender.email}</p>}
                        </div>

                        {/* Invoice Details */}
                        <div className="text-xs text-gray-700 leading-tight text-right">
                            <div className="flex justify-end gap-2">
                                <span className="font-semibold">DATE:</span>
                                <span>{new Date(details.invoiceDate).toLocaleDateString("en-US", DATE_OPTIONS)}</span>
                            </div>
                            <div className="flex justify-end gap-2">
                                <span className="font-semibold">INVOICE:</span>
                                <span>{details.invoiceNumber || "N/A"}</span>
                            </div>
                            {details.dueDate && (
                                <div className="flex justify-end gap-2">
                                    <span className="font-semibold">DUE DATE:</span>
                                    <span>{new Date(details.dueDate).toLocaleDateString("en-US", DATE_OPTIONS)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bill To Section - Compact */}
                    <div className="px-5 pb-3">
                        <div className="text-xs text-gray-700 leading-tight">
                            <p className="font-semibold mb-1">BILL TO:</p>
                            {receiver.name && <p className="font-semibold">{receiver.name}</p>}
                            {receiver.address && <p>{receiver.address}</p>}
                            {(receiver.city || receiver.zipCode) && (
                                <p>
                                    {receiver.city && receiver.zipCode 
                                        ? `${receiver.city}, ${receiver.zipCode}` 
                                        : receiver.city || receiver.zipCode}
                                </p>
                            )}
                            {receiver.country && <p>{receiver.country}</p>}
                            {receiver.phone && <p>{receiver.phone}</p>}
                            {receiver.email && <p>{receiver.email}</p>}
                        </div>
                    </div>

                    {/* Items Table - Compact and Wide */}
                    <div className="px-5 pb-3">
                        <table className="w-full">
                            {/* Table Header - Light Blue */}
                            <thead>
                                <tr className="bg-blue-200 text-gray-800 border-b-2 border-blue-300">
                                    <th className="text-left py-2 px-2 font-semibold text-xs">DESCRIPTION</th>
                                    <th className="text-center py-2 px-2 font-semibold text-xs w-16">QTY</th>
                                    <th className="text-center py-2 px-2 font-semibold text-xs w-24">RATE</th>
                                    <th className="text-right py-2 px-2 font-semibold text-xs w-28">AMOUNT</th>
                                </tr>
                            </thead>
                            {/* Table Body - All Rows Very Light Blue */}
                            <tbody>
                                {details.items.map((item, index) => (
                                    <tr key={index} className="bg-blue-50 border-b border-gray-200">
                                        <td className="py-1.5 px-2 text-xs text-gray-700">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                {item.description && (
                                                    <p className="text-xs text-gray-500 whitespace-pre-line leading-tight">{item.description}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-1.5 px-2 text-center text-xs text-gray-700">{item.quantity}</td>
                                        <td className="py-1.5 px-2 text-center text-xs text-gray-700">{formatNumberWithCommas(Number(item.unitPrice))} {details.currency}</td>
                                        <td className="py-1.5 px-2 text-right text-xs text-gray-700 font-semibold">{formatNumberWithCommas(Number(item.total))} {details.currency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Totals Section - Compact */}
                        <div className="mt-2 flex justify-end">
                            <div className="w-52">
                                {/* Subtotal */}
                                <div className="flex justify-between py-1 border-b border-gray-300">
                                    <span className="font-semibold text-xs text-gray-700">SUBTOTAL</span>
                                    <span className="font-semibold text-xs text-gray-700">{formatNumberWithCommas(Number(details.subTotal))} {details.currency}</span>
                                </div>

                                {/* Tax Rate - Only show if tax is enabled */}
                                {details.taxDetails?.amount != undefined && details.taxDetails?.amount > 0 && (
                                    <div className="flex justify-between py-1 border-b border-gray-300">
                                        <span className="text-xs text-gray-700">TAX RATE</span>
                                        <span className="text-xs text-gray-700">
                                            {details.taxDetails.amountType === "percentage"
                                                ? `${details.taxDetails.amount}%`
                                                : `${details.taxDetails.amount} ${details.currency}`}
                                        </span>
                                    </div>
                                )}

                                {/* Sales Tax - Only show if tax is enabled */}
                                {details.taxDetails?.amount != undefined && details.taxDetails?.amount > 0 && (
                                    <div className="flex justify-between py-1 border-b border-gray-300">
                                        <span className="text-xs text-gray-700">SALES TAX</span>
                                        <span className="text-xs text-gray-700">
                                            {details.taxDetails.amountType === "amount"
                                                ? `${details.taxDetails.amount} ${details.currency}`
                                                : `${formatNumberWithCommas((Number(details.subTotal) * Number(details.taxDetails.amount)) / 100)} ${details.currency}`}
                                        </span>
                                    </div>
                                )}

                                {/* Discount - Only show if discount is enabled */}
                                {details.discountDetails?.amount != undefined && details.discountDetails?.amount > 0 && (
                                    <div className="flex justify-between py-1 border-b border-gray-300">
                                        <span className="text-xs text-gray-700">DISCOUNT</span>
                                        <span className="text-xs text-gray-700">
                                            {details.discountDetails.amountType === "amount"
                                                ? `-${details.discountDetails.amount} ${details.currency}`
                                                : `-${details.discountDetails.amount}%`}
                                        </span>
                                    </div>
                                )}

                                {/* Shipping - Only show if shipping is enabled */}
                                {details.shippingDetails?.cost != undefined && details.shippingDetails?.cost > 0 && (
                                    <div className="flex justify-between py-1 border-b border-gray-300">
                                        <span className="text-xs text-gray-700">SHIPPING</span>
                                        <span className="text-xs text-gray-700">
                                            {details.shippingDetails.costType === "amount"
                                                ? `${details.shippingDetails.cost} ${details.currency}`
                                                : `${details.shippingDetails.cost}%`}
                                        </span>
                                    </div>
                                )}

                                {/* Other - Blue background bar */}
                                <div className="bg-blue-400 text-white py-1 px-2 flex justify-between">
                                    <span className="font-semibold text-xs">OTHER</span>
                                    <span className="font-semibold text-xs">0.00 {details.currency}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section - Compact */}
                    <div className="px-5 pb-4 pt-3 border-t border-gray-200">
                        <div className="text-center text-xs text-gray-700 leading-tight space-y-1">
                            <p className="font-semibold">
                                {details.paymentTerms || "Make all checks payable to the company"}
                            </p>
                            <p>
                                {details.additionalNotes || "Total due in 15 days. Overdue accounts subject to a service charge of 1% per month."}
                            </p>
                            <p className="font-semibold mt-2">THANK YOU FOR YOUR BUSINESS!</p>
                        </div>

                        {/* Payment Information */}
                        {details.paymentInformation?.bankName && (
                            <div className="mt-3 text-xs text-gray-700 leading-tight">
                                <p className="font-semibold mb-1">Payment Information:</p>
                                <p>Bank: {details.paymentInformation.bankName}</p>
                                <p>Account Name: {details.paymentInformation.accountName}</p>
                                <p>Account Number: {details.paymentInformation.accountNumber}</p>
                            </div>
                        )}

                        {/* Contact Information */}
                        {(sender.email || sender.phone) && (
                            <div className="mt-2 text-xs text-gray-600 leading-tight">
                                <p>For questions, contact:</p>
                                {sender.email && <p>{sender.email}</p>}
                                {sender.phone && <p>{sender.phone}</p>}
                            </div>
                        )}

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
                                        fontSize: 24,
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
                </div>
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate3;
