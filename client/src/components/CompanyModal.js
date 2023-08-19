import React from 'react';

const CompanyModal = ({ companyData, onClose }) => {
  if (!Array.isArray(companyData) || companyData.length === 0) return null;
  const company = companyData[0]

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="bg-black opacity-50 absolute top-0 left-0 w-full h-full" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 font-bold">x</button>
        <h2><strong>{company.companyName}</strong></h2>
        <img src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${company.symbol.toUpperCase()}.png`} alt={companyData.companyName} style={{ width: '200px', height: 'auto' }} />
          <p>
            <strong>Symbol:</strong> {company.symbol}
          </p>
          <p>
            <strong>Country:</strong> {company.country}
          </p>
          <p>
            <strong>CEO:</strong> {company.ceo}
          </p>
          <p>
            <strong>Description:</strong> {company.longDescription}
          </p>
          <p>
            <strong>Sector:</strong> {company.sector}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              {company.website}
            </a>
          </p>
      </div>
      
    </div>
  );
};

export default CompanyModal;