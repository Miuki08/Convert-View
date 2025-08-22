import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const Switcher: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    if (theme !== newTheme) {
      toggleTheme();
    }
  };

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="switcher-canvas" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title text-default" id="offcanvasRightLabel">Switcher</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <nav className="border-bottom border-block-end-dashed">
          <div className="nav nav-tabs nav-justified" id="switcher-main-tab" role="tablist">
            <button 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} 
              onClick={() => setActiveTab('home')}
            >
              Theme Styles
            </button>
            <button 
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} 
              onClick={() => setActiveTab('profile')}
            >
              Theme Colors
            </button>
          </div>
        </nav>
        
        <div className="tab-content mt-3">
          {activeTab === 'home' && (
            <div className="tab-pane fade show active">
              {/* Theme Styles Content */}
              <div className="mb-4">
                <p className="switcher-style-head font-semibold mb-2">Theme Color Mode:</p>
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
              
              {/* More theme style options would go here */}
              
              <div className="d-grid canvas-footer mt-4">
                <button 
                  className="btn btn-danger btn-block m-1"
                  onClick={() => {
                    localStorage.removeItem('theme');
                    window.location.reload();
                  }}
                >
                  Reset
                </button> 
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="tab-pane fade">
              {/* Theme Colors Content */}
              <div className="theme-colors">
                <p className="switcher-style-head font-semibold mb-2">Menu Colors:</p>
                <div className="d-flex switcher-style pb-2 flex-wrap">
                  <div className="form-check switch-select me-3">
                    <input 
                      className="form-check-input color-input color-white" 
                      type="radio" 
                      name="menu-colors" 
                      id="switcher-menu-light" 
                      defaultChecked 
                    />
                  </div>
                  <div className="form-check switch-select me-3">
                    <input 
                      className="form-check-input color-input color-dark" 
                      type="radio" 
                      name="menu-colors" 
                      id="switcher-menu-dark" 
                    />
                  </div>
                  {/* More color options would go here */}
                </div>
              </div>
              
              {/* More theme color options would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Switcher;