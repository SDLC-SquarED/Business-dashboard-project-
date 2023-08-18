import React from 'react';

const CompanyModal = ({ companyData, onClose }) => {
  if (!companyData) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="bg-black opacity-50 absolute top-0 left-0 w-full h-full" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 font-bold">X</button>
        <h2>{companyData[0].companyName}</h2>
        <img src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${companyData[0].symbol.toUpperCase()}.png`} alt={companyData[0].companyName} style={{ width: '200px', height: 'auto' }} />
          <p>
            <strong>Symbol:</strong> {companyData[0].symbol}
          </p>
          <p>
            <strong>Country:</strong> {companyData[0].country}
          </p>
          <p>
            <strong>CEO:</strong> {companyData[0].ceo}
          </p>
          <p>
            <strong>Description:</strong> {companyData[0].longDescription}
          </p>
          <p>
            <strong>Sector:</strong> {companyData[0].sector}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={companyData[0].website} target="_blank" rel="noopener noreferrer">
              {companyData[0].website}
            </a>
          </p>
      </div>
      
    </div>
  );
};

export default CompanyModal;