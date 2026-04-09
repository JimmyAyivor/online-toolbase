"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  QrCode,
  Download,
  Link2,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  MapPin,
  Calendar,
  User,
  Trash2,
} from "lucide-react";

export default function QrCodeGeneratorClient() {
  const [qrType, setQrType] = useState("url");
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const canvasRef = useRef(null);

  const qrTypes = [
    {
      id: "url",
      name: "Website URL",
      icon: Link2,
      placeholder: "https://example.com",
    },
    {
      id: "text",
      name: "Plain Text",
      icon: MessageSquare,
      placeholder: "Enter your text",
    },
    {
      id: "email",
      name: "Email",
      icon: Mail,
      placeholder: "email@example.com",
    },
    { id: "phone", name: "Phone", icon: Phone, placeholder: "+1234567890" },
    {
      id: "sms",
      name: "SMS",
      icon: MessageSquare,
      placeholder: "+1234567890:Your message",
    },
    { id: "wifi", name: "WiFi", icon: Wifi, placeholder: "SSID:password:WPA" },
    {
      id: "location",
      name: "Location",
      icon: MapPin,
      placeholder: "latitude,longitude",
    },
    {
      id: "vcard",
      name: "Contact Card",
      icon: User,
      placeholder: "Name:Phone:Email",
    },
  ];

  const generateQRCode = () => {
    if (!qrData.trim()) {
      setQrCodeUrl("");
      return;
    }

    let formattedData = qrData;

    switch (qrType) {
      case "email":
        formattedData = `mailto:${qrData}`;
        break;
      case "phone":
        formattedData = `tel:${qrData}`;
        break;
      case "sms":
        const [smsNumber, smsText] = qrData.split(":");
        formattedData = `sms:${smsNumber}${smsText ? `?body=${encodeURIComponent(smsText)}` : ""}`;
        break;
      case "wifi":
        const [ssid, password, encryption] = qrData.split(":");
        formattedData = `WIFI:T:${encryption || "WPA"};S:${ssid};P:${password};;`;
        break;
      case "location":
        const [lat, lng] = qrData.split(",");
        formattedData = `geo:${lat},${lng}`;
        break;
      case "vcard":
        const [name, phone, email] = qrData.split(":");
        formattedData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
        break;
    }

    const encodedData = encodeURIComponent(formattedData);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedData}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}`;
    setQrCodeUrl(url);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQRCode();
    }, 500);
    return () => clearTimeout(timer);
  }, [qrData, qrType, qrSize, fgColor, bgColor]);

  const handleDownload = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleClear = () => {
    setQrData("");
    setQrCodeUrl("");
  };

  const getCurrentType = () => qrTypes.find((t) => t.id === qrType);
  const TypeIcon = getCurrentType()?.icon || Link2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4 shadow-lg">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            QR Code Generator
          </h2>
          <p className="text-gray-500">
            Create custom QR codes for any purpose
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TypeIcon className="w-5 h-5 text-cyan-600" />
              QR Code Type
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {qrTypes.map((type) => {
                const Icon = type.icon;
                const isActive = qrType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setQrType(type.id);
                      setQrData("");
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Content
              </label>
              <textarea
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
                placeholder={getCurrentType()?.placeholder}
                className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 resize-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2">
                {qrType === "sms" && "Format: PhoneNumber:Message"}
                {qrType === "wifi" && "Format: NetworkName:Password:WPA"}
                {qrType === "location" && "Format: Latitude,Longitude"}
                {qrType === "vcard" && "Format: Name:Phone:Email"}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Size: {qrSize}x{qrSize} pixels
              </label>
              <input
                type="range"
                min="150"
                max="500"
                step="50"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-cyan-200 to-blue-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Foreground Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleClear}
              disabled={!qrData}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                qrData
                  ? "bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Trash2 className="w-5 h-5" />
              Clear
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="font-bold text-gray-900 mb-4">Preview & Download</h3>

            <div className="flex items-center justify-center mb-6">
              {qrCodeUrl ? (
                <div className="relative">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="border-4 border-gray-200 rounded-2xl shadow-lg"
                    style={{ width: qrSize, height: qrSize }}
                  />
                </div>
              ) : (
                <div
                  className="flex items-center justify-center bg-gray-100 rounded-2xl border-4 border-dashed border-gray-300"
                  style={{ width: qrSize, height: qrSize }}
                >
                  <div className="text-center p-8">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      Enter content to generate QR code
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!qrCodeUrl}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                qrCodeUrl
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Download className="w-5 h-5" />
              Download QR Code
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">💡 QR Code Use Cases</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-gray-900">Business Cards:</strong> Share
                contact info instantly
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-gray-900">Marketing:</strong> Link to
                promotions and websites
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-gray-900">Events:</strong> Share tickets
                and venue details
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-gray-900">WiFi Sharing:</strong> Easy
                network access for guests
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-gray-900">Product Labels:</strong> Link
                to manuals and support
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-gray-900">Payments:</strong> Quick
                mobile payment links
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
