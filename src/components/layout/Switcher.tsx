import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

interface SwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

const Switcher: React.FC<SwitcherProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      const offcanvasElement = document.getElementById('switcher-canvas');
      if (offcanvasElement) {
        offcanvasElement.classList.add('show');
        offcanvasElement.style.visibility = 'visible';
      }
    } else {
      const offcanvasElement = document.getElementById('switcher-canvas');
      if (offcanvasElement) {
        offcanvasElement.classList.remove('show');
        offcanvasElement.style.visibility = 'hidden';
      }
    }
  }, [isOpen]);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    if (theme !== newTheme) {
      toggleTheme();
    }
  };

  const resetSettings = () => {
    localStorage.removeItem('theme');
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="switcher-canvas" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title text-default" id="offcanvasRightLabel">Switcher</h5>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <nav className="border-bottom border-block-end-dashed">
          <div className="nav nav-tabs nav-justified" id="switcher-main-tab" role="tablist">
            <button 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} 
              onClick={() => setActiveTab('home')}
              type="button"
            >
              Theme Styles
            </button>
            <button 
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} 
              onClick={() => setActiveTab('profile')}
              type="button"
            >
              Theme Colors
            </button>
          </div>
        </nav>
        
        <div className="tab-content mt-3" id="nav-tabContent">
          {activeTab === 'home' && (
            <div className="tab-pane fade show active border-0" role="tabpanel">
              {/* Theme Color Mode */}
              <div className="mb-4">
                <p className="switcher-style-head">Theme Color Mode:</p>
                <div className="row switcher-style gx-0">
                  <div className="col-4">
                    <div className="form-check switch-select">
                      <label className="form-check-label" htmlFor="switcher-light-theme">
                        Light
                      </label>
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="theme-style" 
                        id="switcher-light-theme" 
                        checked={theme === 'light'}
                        onChange={() => handleThemeChange('light')}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-check switch-select">
                      <label className="form-check-label" htmlFor="switcher-dark-theme">
                        Dark
                      </label>
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="theme-style" 
                        id="switcher-dark-theme" 
                        checked={theme === 'dark'}
                        onChange={() => handleThemeChange('dark')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Directions */}
              <div className="mb-4">
                <p className="switcher-style-head">Directions:</p>
                <div className="row switcher-style gx-0">
                  <div className="col-4">
                    <div className="form-check switch-select">
                      <label className="form-check-label" htmlFor="switcher-ltr">
                        LTR
                      </label>
                      <input className="form-check-input" type="radio" name="direction" id="switcher-ltr" defaultChecked />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-check switch-select">
                      <label className="form-check-label" htmlFor="switcher-rtl">
                        RTL
                      </label>
                      <input className="form-check-input" type="radio" name="direction" id="switcher-rtl" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Styles */}
              <div className="mb-4">
                <p className="switcher-style-head">Navigation Styles:</p>
                <div className="row switcher-style gx-0">
                  <div className="col-4">
                    <div className="form-check switch-select">
                      <label className="form-check-label" htmlFor="switcher-vertical">
                        Vertical
                      </label>
                      <input className="form-check-input" type="radio" name="navigation-style" id="switcher-vertical" defaultChecked />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-check switch-select">
                      <label className="form-check-label" htmlFor="switcher-horizontal">
                        Horizontal
                      </label>
                      <input className="form-check-input" type="radio" name="navigation-style" id="switcher-horizontal" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* More theme style options would go here */}
              
              <div className="d-grid canvas-footer mt-4">
                <button 
                  className="btn btn-danger btn-block m-1"
                  onClick={resetSettings}
                >
                  Reset
                </button> 
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="tab-pane fade border-0" role="tabpanel">
              {/* Menu Colors */}
              <div className="theme-colors mb-4">
                <p className="switcher-style-head">Menu Colors:</p>
                <div className="d-flex switcher-style pb-2">
                  <div className="form-check switch-select me-3">
                    <input className="form-check-input color-input color-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Light Menu" type="radio" name="menu-colors" id="switcher-menu-light" defaultChecked />
                  </div>
                  <div className="form-check switch-select me-3">
                    <input className="form-check-input color-input color-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Dark Menu" type="radio" name="menu-colors" id="switcher-menu-dark" />
                  </div>
                  <div className="form-check switch-select me-3">
                    <input className="form-check-input color-input color-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Color Menu" type="radio" name="menu-colors" id="switcher-menu-primary" />
                  </div>
                  <div className="form-check switch-select me-3">
                    <input className="form-check-input color-input color-gradient" data-bs-toggle="tooltip" data-bs-placement="top" title="Gradient Menu" type="radio" name="menu-colors" id="switcher-menu-gradient" />
                  </div>
                  <div className="form-check switch-select me-3">
                    <input className="form-check-input color-input color-transparent" data-bs-toggle="tooltip" data-bs-placement="top" title="Transparent Menu" type="radio" name="menu-colors" id="switcher-menu-transparent" />
                  </div>
                </div>
                <div className="px-4 pb-3 text-muted fs-11">Note: If you want to change color Menu dynamically change from below Theme Primary color picker</div>
              </div>
              
              {/* More theme color options would go here */}
              
              <div className="d-grid canvas-footer mt-4">
                <button 
                  className="btn btn-danger btn-block m-1"
                  onClick={resetSettings}
                >
                  Reset
                </button> 
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Switcher;