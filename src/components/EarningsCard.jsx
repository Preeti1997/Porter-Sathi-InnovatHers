// src/components/EarningsCard.jsx
import React from "react";

export default function EarningsCard({ data }) {
  if (!data) return null;
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-xl font-bold mb-2">Aaj ki Kamai</h2>
      <p><b>Total:</b> ₹{data.total}</p>
      <p><b>Kharcha:</b> ₹{data.expenses}</p>
      <p><b>Penalty:</b> ₹{data.penalties}</p>
      <p className="text-green-600 font-bold text-lg">Net: ₹{data.net}</p>
    </div>
  );
}
