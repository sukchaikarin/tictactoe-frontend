import { SWITCHLANG } from '@/constants/constants';
import React from 'react';

interface LanguageSelectorProps {
  language: 'en' | 'th';
  toggleLanguage: (lang: 'en' | 'th') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, toggleLanguage }) => {
  return (
    <div id="setLang" className="join scale-75 absolute top-1 left-1 shadow-md  rounded-xl">
      <input
        id="radioENG"
        className="join-item btn"
        type="radio"
        name="options"
        aria-label={SWITCHLANG.BUTTON_LABEL.en}
        checked={language === 'en'}
        onChange={() => toggleLanguage('en')}
      />
      <input
        id="radioTH"
        className="join-item btn"
        type="radio"
        name="options"
        aria-label={SWITCHLANG.BUTTON_LABEL.th}
        checked={language === 'th'}
        onChange={() => toggleLanguage('th')}
      />
    </div>
  );
};

export default LanguageSelector;
