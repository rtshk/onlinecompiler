import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants"; // Make sure this is correct
import "./LanguageSelector.css"; // Optional: for styling

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (lang) => {
    onSelect(lang); // 🔥 this triggers your handleLanguageSelect
    setOpen(false);
  };

  return (
<div className="language-selector mt-1">
  <button
    className="language-selector-button"
    onClick={() => setOpen((prev) => !prev)}
  >
    {language} ⌄
  </button>

  {open && (
    <div className="language-dropdown">
      {languages.map(([lang, version]) => (
        <div
          key={lang}
          className={`language-dropdown-item ${
            lang === language ? "active" : ""
          }`}
          onClick={() => {
            onSelect(lang);
            setOpen(false);
          }}
        >
          {lang} <span style={{ color: "#888", fontSize: "12px" }}>({version})</span>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default LanguageSelector;
