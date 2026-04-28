import React, { useState } from 'react';
import { 
  Sparkles, Check, ChevronLeft, Search, MessageSquare, ArrowRight,
  Clock, MessageCircle, MapPin, FileText, Send
} from 'lucide-react';
import { schemesData } from './data/SchemesData';

// ==========================================
// VIEW 1: AUTH (Login / Signup)
// ==========================================
const AuthView = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ age: '', income: '', category: '', caste: '', state: '', password: '', email: '', firstName: '', lastName: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const savedUsers = JSON.parse(localStorage.getItem('yojnasetuUsers') || '{}');
      const user = savedUsers[formData.email];
      if (user && user.password === formData.password) {
        onComplete(user);
      } else {
        alert("Invalid email or password. Please try again or create an account.");
      }
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      const savedUsers = JSON.parse(localStorage.getItem('yojnasetuUsers') || '{}');
      savedUsers[formData.email] = formData;
      localStorage.setItem('yojnasetuUsers', JSON.stringify(savedUsers));
      onComplete(formData);
    }
  };

  return (
    <div className="auth-view">
      <div className="auth-card">
        <div className="auth-sidebar">
          <div className="auth-logo">
            <Sparkles size={28} /> YojnaSetu
          </div>
          <div className="auth-steps">
            {!isLogin ? (
              <>
                <div className={`auth-step ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                  <div className="step-circle">{step > 1 ? <Check size={16}/> : '1'}</div>
                  Personal Details
                </div>
                <div className={`auth-step ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)}>
                  <div className="step-circle">{step > 2 ? <Check size={16}/> : '2'}</div>
                  Eligibility Criteria
                </div>
                <div className={`auth-step ${step >= 3 ? 'active' : ''}`} onClick={() => setStep(3)}>
                  <div className="step-circle">3</div>
                  Summary
                </div>
              </>
            ) : (
              <div className="auth-step active">
                <div className="step-circle"><Check size={16}/></div>
                Login Account
              </div>
            )}
          </div>
        </div>
        
        <div className="auth-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>{isLogin ? 'Welcome Back' : 'Create account'}</h2>
            <button type="button" onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#238b77', fontWeight: 600, cursor: 'pointer' }}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {isLogin && (
               <div className="auth-form-grid">
                 <div className="auth-form-group full">
                   <label htmlFor="login-email">Email Address</label>
                   <input id="login-email" name="email" type="email" autoComplete="username" className="auth-input" placeholder="your@email.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                 </div>
                 <div className="auth-form-group full">
                   <label htmlFor="login-password">Password</label>
                   <input id="login-password" name="password" type="password" autoComplete="current-password" className="auth-input" placeholder="••••••••" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                 </div>
               </div>
            )}

            {!isLogin && step === 1 && (
              <div className="auth-form-grid">
                <div className="auth-form-group">
                  <label>First Name</label>
                  <input type="text" className="auth-input" placeholder="First Name" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="auth-form-group">
                  <label>Last Name</label>
                  <input type="text" className="auth-input" placeholder="Last Name" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div className="auth-form-group full">
                  <label htmlFor="reg-email">Email Address</label>
                  <input id="reg-email" name="email" type="email" autoComplete="username" className="auth-input" placeholder="your@email.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="auth-form-group full">
                  <label htmlFor="reg-password">Create Password</label>
                  <input id="reg-password" name="password" type="password" autoComplete="new-password" className="auth-input" placeholder="••••••••" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                <div className="auth-form-group full">
                  <label>Your State</label>
                  <select className="auth-input" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                    <option value="">Select State</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
              </div>
            )}

            {!isLogin && step === 2 && (
              <div className="auth-form-grid">
                <div className="auth-form-group">
                  <label>Your Age</label>
                  <input type="number" className="auth-input" placeholder="e.g. 22" required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                </div>
                <div className="auth-form-group">
                  <label>Profession / Role</label>
                  <select className="auth-input" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="farmer">Farmer</option>
                    <option value="health">Health</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div className="auth-form-group">
                  <label>Caste Category</label>
                  <select className="auth-input" required value={formData.caste} onChange={e => setFormData({...formData, caste: e.target.value})}>
                    <option value="">Select Caste</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
                <div className="auth-form-group full">
                  <label>Annual Income (₹)</label>
                  <input type="number" className="auth-input" placeholder="e.g. 250000" required value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} />
                </div>
              </div>
            )}

            {!isLogin && step === 3 && (
              <div>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Please review your details before creating your account.</p>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <p><strong>Age:</strong> {formData.age}</p>
                  <p><strong>Income:</strong> ₹{formData.income}</p>
                  <p><strong>Role:</strong> {formData.category} | <strong>Caste:</strong> {formData.caste}</p>
                  <p><strong>State:</strong> {formData.state}</p>
                </div>
              </div>
            )}

            <button type="submit" className="btn auth-btn">
              {isLogin ? 'Log In' : (step === 3 ? 'Create Account' : 'Next')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VIEW 2: HOME (Light Red Theme)
// ==========================================
const HomeView = ({ userProfile, onViewDetails, onOpenChat, onLogout, onLogin, onSearch }) => {
  const [formData, setFormData] = useState({ 
    category: userProfile?.category || '', 
    caste: userProfile?.caste || '',
    age: userProfile?.age || '', 
    income: userProfile?.income || '', 
    state: userProfile?.state || '' 
  });
  
  React.useEffect(() => {
    if (userProfile) {
      setFormData({
        category: userProfile.category || '', 
        caste: userProfile.caste || '',
        age: userProfile.age || '', 
        income: userProfile.income || '', 
        state: userProfile.state || '' 
      });
    }
  }, [userProfile]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const age = parseInt(formData.age) || 0;
  const income = parseInt(formData.income) || 0;
  
  let filteredSchemes = schemesData.filter(s => {
    if (!userProfile) return true;
    const matchAge = age >= s.eligibility.minAge && age <= s.eligibility.maxAge;
    const matchIncome = income <= s.eligibility.maxIncome;
    const matchCategory = userProfile.category ? s.category === userProfile.category : true;
    
    // Caste Filtering Logic
    const userCaste = formData.caste || '';
    let matchCaste = true;
    if (userCaste) {
      const text = (s.title + " " + s.description).toLowerCase();
      const isSCSTScheme = text.includes(' sc ') || text.includes(' st ') || text.includes('scheduled caste') || text.includes('tribal') || text.includes('dalit');
      const isMinorityScheme = text.includes('minority') || text.includes('obc') || text.includes('backward class');
      
      if (userCaste === 'General') {
        if (isSCSTScheme || isMinorityScheme) matchCaste = false;
      } else if (userCaste === 'OBC') {
        if (isSCSTScheme) matchCaste = false;
      }
    }

    const userState = formData.state || '';
    let matchState = true;
    if (userState) {
      const schemeText = JSON.stringify(s).toLowerCase();
      const allStates = ['andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh', 'goa', 'gujarat', 'haryana', 'himachal pradesh', 'jharkhand', 'karnataka', 'kerala', 'madhya pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu', 'telangana', 'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal', 'puducherry', 'delhi', 'chandigarh'];
      const mentionsAnyState = allStates.some(st => schemeText.includes(st));
      matchState = !mentionsAnyState || schemeText.includes(userState.toLowerCase());
    }
    
    return matchAge && matchIncome && matchCategory && matchCaste && matchState;
  });

  const displaySchemes = filteredSchemes.slice(0, 6);

  return (
    <div className="home-view">
      <header className="home-header">
        <div className="container header-content">
          <div className="logo">
            <Sparkles size={32} color="#dc2626" />
            <div>
              YojnaSetu
              <span className="logo-sub">Your Guide to Government Schemes</span>
            </div>
          </div>
          
          <nav className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#schemes">Schemes</a>
            <a href="#how-it-works">How It Works</a>
          </nav>
          
          <div className="header-actions">
            {!userProfile ? (
              <button className="btn btn-primary" onClick={onLogin}>Log In / Sign Up</button>
            ) : (
              <button className="btn btn-outline" onClick={onLogout} style={{ color: '#dc2626', borderColor: '#fca5a5' }}>Logout</button>
            )}
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-centered">
          <div className="hero-text">
            <h1>Find Government Schemes <span className="text-gradient">You Are Eligible For</span></h1>
            <p>Personalized scheme recommendations based on your profile in just a few seconds.</p>
            
            <div className="checkmarks">
              <div className="check-item"><Check className="check-icon" size={20}/> 100% Free</div>
              <div className="check-item"><Check className="check-icon" size={20}/> Official Information</div>
              <div className="check-item"><Check className="check-icon" size={20}/> Secure & Reliable</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container floating-form-wrapper">
        <div className="floating-form">
          <div className="form-header">
            <Sparkles size={20} color="#dc2626" /> Check Schemes For You
          </div>
          
          <form className="inline-form" onSubmit={handleSearchSubmit}>
            <div className="input-box">
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{width: '120px'}}>
                <option value="" disabled>Profession</option>
                <option value="student">Student</option>
                <option value="farmer">Farmer</option>
                <option value="health">Health</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="input-box">
              <select required value={formData.caste} onChange={e => setFormData({...formData, caste: e.target.value})} style={{width: '100px'}}>
                <option value="" disabled>Caste</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
            <div className="input-box">
              <select required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} style={{width: '110px'}}>
                <option value="" disabled>State</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Haryana">Haryana</option>
                <option value="Punjab">Punjab</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div className="input-box">
              <input type="number" required placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={{width: '70px'}} />
            </div>
            <div className="input-box">
              <input type="number" required placeholder="Income" value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} style={{width: '100px'}} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Find My Schemes →
            </button>
          </form>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose YojnaSetu?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon icon-green"><Sparkles size={32} /></div>
              <h4>Personalized for You</h4>
              <p>Get schemes that exactly match your profile and eligibility.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-blue"><MessageSquare size={32} /></div>
              <h4>AI-Powered Assistant</h4>
              <p>Understand schemes easily with our smart AI assistant.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-purple"><FileText size={32} /></div>
              <h4>Complete Guidance</h4>
              <p>Get details on benefits, eligibility, documents & how to apply.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-pink"><MapPin size={32} /></div>
              <h4>Nearest Offices</h4>
              <p>Find nearest government offices and support centers.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="schemes" className="section" style={{ background: 'var(--glass-bg)' }}>
        <div className="container">
          <div className="schemes-header">
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Top Recommendations</h2>
          </div>
          
          <div className="schemes-grid">
            {displaySchemes.map(scheme => {
              const tagClass = scheme.category === 'student' ? 'tag-student' : scheme.category === 'farmer' ? 'tag-farmer' : 'tag-women';
              const iconClass = scheme.category === 'student' ? 'icon-green' : scheme.category === 'farmer' ? 'icon-blue' : 'icon-purple';

              return (
                <div key={scheme.id} className="scheme-card">
                  <div className="card-top">
                    <div className={`card-icon ${iconClass}`}><scheme.icon size={24} /></div>
                    <div className={`tag ${tagClass}`}>{scheme.target}</div>
                  </div>
                  <h3 className="card-title">{scheme.title}</h3>
                  <p className="card-desc">{scheme.description}</p>
                  
                  {userProfile && (
                    <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#dc2626', marginBottom: '1.5rem', borderLeft: '3px solid #dc2626' }}>
                      ⭐ <strong>Recommended:</strong> Profile Match
                    </div>
                  )}

                  <div className="card-bottom">
                    <div>
                      <div className="benefit-label">Benefit</div>
                      <div className="benefit-amount">{scheme.benefit}</div>
                    </div>
                    <button className="btn btn-primary" onClick={() => onViewDetails(scheme)}>
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="timeline">
            <div className="timeline-step">
              <div className="step-icon-wrapper"><div className="step-number">1</div><div className="step-icon"><FileText size={28} /></div></div>
              <h4>Tell Us About You</h4>
              <p>Fill a quick form with basic information.</p>
            </div>
            <div className="timeline-step">
              <div className="step-icon-wrapper"><div className="step-number">2</div><div className="step-icon"><Search size={28} /></div></div>
              <h4>Get Matched Schemes</h4>
              <p>We find the best schemes you are eligible for.</p>
            </div>
            <div className="timeline-step">
              <div className="step-icon-wrapper"><div className="step-number">3</div><div className="step-icon"><Check size={28} /></div></div>
              <h4>Explore & Understand</h4>
              <p>Read details, benefits and documents required.</p>
            </div>
            <div className="timeline-step">
              <div className="step-icon-wrapper"><div className="step-number">4</div><div className="step-icon"><Send size={28} /></div></div>
              <h4>Apply with Confidence</h4>
              <p>Follow the application steps and apply easily.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: '3rem' }}>
        <div className="ai-banner">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <MessageSquare size={80} color="#dc2626" />
            <div className="ai-banner-text">
              <h3>Have Questions? <span className="text-gradient">Ask Our AI Assistant</span></h3>
              <p>Get instant answers about schemes, eligibility, documents and more.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-large" onClick={onOpenChat}>
            <MessageSquare size={20} /> Chat with AI Assistant →
          </button>
        </div>
      </section>
      
      <footer className="footer">
        <div className="container">
          <div className="copyright">© 2026 YojnaSetu. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// VIEW 3: SCHEME DETAILS (Article Card + AI Modes)
// ==========================================
const SchemeDetailsView = ({ scheme, userState, onBack, onOpenChat }) => {
  const [aiExplanation, setAiExplanation] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [translatedData, setTranslatedData] = useState(null);

  const translateText = async (text) => {
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`);
      const data = await res.json();
      return data[0].map(x => x[0]).join('');
    } catch (e) {
      return text;
    }
  };

  const translateArray = async (arr) => {
    return Promise.all(arr.map(text => translateText(text)));
  };

  const handleExplain = async (mode) => {
    setIsAiLoading(true);
    setAiExplanation(null);
    
    if (mode === 'simple') {
      setLanguage('en');
      setTimeout(() => {
        setAiExplanation(scheme.simpleExplanation || "This scheme provides financial assistance. Please refer to the benefits section for exact details.");
        setIsAiLoading(false);
      }, 1000);
    } else if (mode === 'kid') {
      setLanguage('en');
      setTimeout(() => {
        setAiExplanation(`Imagine this is a gift from the government! They give you support so you don't have to worry about your daily challenges. All you need to do is apply!`);
        setIsAiLoading(false);
      }, 1000);
    } else if (mode === 'hindi') {
      setLanguage('hi');
      // Translate explanation
      const exp = await translateText(scheme.simpleExplanation || "This scheme provides financial assistance.");
      setAiExplanation(exp);
      
      // Translate lists if not already done
      if (!translatedData) {
        const hindiElig = await translateArray(scheme.details.eligibility);
        const hindiBen = await translateArray(scheme.details.benefits);
        const hindiTitle = await translateText(scheme.title);
        setTranslatedData({
          title: hindiTitle,
          eligibility: hindiElig,
          benefits: hindiBen
        });
      }
      setIsAiLoading(false);
    }
  };

  const currentEligibility = language === 'hi' && translatedData ? translatedData.eligibility : scheme.details.eligibility;
  const currentBenefits = language === 'hi' && translatedData ? translatedData.benefits : scheme.details.benefits;
  const title = language === 'hi' && translatedData ? translatedData.title : scheme.title;
  
  return (
    <div className="details-view">
      <div className="details-card">
        <a className="details-back" onClick={onBack}>
          <ChevronLeft size={24} /> Back
        </a>
        
        <div className="details-hero">
          <div className="details-date-badge">
            <span>GOVT</span>
            <span>FUND</span>
          </div>
          <div className="details-category-tag">
            {scheme.target}
          </div>
        </div>

        <div className="details-content">
          <h1 className="details-title">{title}</h1>
          <div className="details-subtitle">{language === 'hi' ? 'वह योजना जो आपको सशक्त बनाती है।' : 'The scheme that empowers you.'}</div>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <button className="btn" style={{ background: 'white', color: '#ef4444', border: '1px solid #ef4444' }} onClick={() => handleExplain('simple')} disabled={isAiLoading}>
              {isAiLoading ? 'Asking AI...' : <><Sparkles size={18} /> Explain Simply</>}
            </button>
            <button className="btn" style={{ background: '#f59e0b', color: 'white' }} onClick={() => handleExplain('kid')} disabled={isAiLoading}>
              Explain like I'm 10
            </button>
            <button className="btn" style={{ background: '#3b82f6', color: 'white' }} onClick={() => handleExplain('hindi')} disabled={isAiLoading}>
              Explain in Hindi
            </button>
          </div>

          {aiExplanation && (
            <div className="ai-box">
              <h4 style={{ color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} /> {language === 'hi' ? 'AI सरल व्याख्या' : 'AI Simple Explanation'}
              </h4>
              <p style={{ color: '#1e293b', fontSize: '1.1rem', margin: 0 }}>"{aiExplanation}"</p>
            </div>
          )}

          <div className="details-text">
            <p style={{ marginBottom: '1rem', color: '#1e293b' }}><strong>{language === 'hi' ? 'पात्रता:' : 'Eligibility:'}</strong></p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              {currentEligibility.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <p style={{ marginBottom: '1rem', color: '#1e293b' }}><strong>{language === 'hi' ? 'लाभ:' : 'Benefits:'}</strong></p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              {currentBenefits.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div className="details-meta">
            <div className="details-meta-item"><Clock size={16}/> Apply Online</div>
            <div className="details-meta-item"><MapPin size={16}/> Nearest Office</div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 1rem 0', fontWeight: '600', color: '#1e293b', fontSize: '1.05rem' }}>Need help for applying?</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #10b981', flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem' }} onClick={() => window.open(`https://www.google.com/search?q=Apply+online+for+${encodeURIComponent(scheme.title)}+official+website`, '_blank')}>
                <Clock size={18} /> Online
              </button>
              <button className="btn" style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #3b82f6', flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem' }} onClick={() => window.open(`https://www.google.com/maps/search/nearest+government+office+for+${encodeURIComponent(scheme.title)}${userState ? '+in+' + encodeURIComponent(userState) : ''}`, '_blank')}>
                <MapPin size={18} /> Offline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VIEW 4: CHATBOT (Base44 Gradient)
// ==========================================
const ChatbotView = ({ onBack, initialQuery, userState }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = React.useRef(null);
  const initialSent = React.useRef(false);

  React.useEffect(() => {
    if (initialQuery && !initialSent.current) {
      initialSent.current = true;
      setChatStarted(true);
      setMessages([{ text: initialQuery, isBot: false }]);
      setIsTyping(true);

      setTimeout(() => {
        setMessages(prev => {
          let botReply = "I can help you find government schemes! Please tell me your category (like Student, Farmer, Business) or your age and income.";
          
          const lower = initialQuery.toLowerCase();
          
          let currentScheme = "government scheme";
          const botMessages = prev.filter(m => m.isBot).reverse();
          for (const msg of botMessages) {
            const match = msg.text.match(/'([^']+)'/);
            if (match) {
              currentScheme = match[1];
              break;
            }
          }
          const onlineLink = `https://www.google.com/search?q=Apply+online+for+${encodeURIComponent(currentScheme).replace(/%20/g, '+')}+official+website`;

          if (lower.includes('apply') && lower.includes('online') || lower === 'online') {
            botReply = `You can easily apply online. The official portal requires your Aadhaar, PAN, and basic documents. Here is the direct link to the official website: ${onlineLink}`;
          } else if (lower.includes('offline') || (lower.includes('apply') && lower.includes('offline'))) {
            const stateQuery = userState ? ` in ${userState}` : '';
            botReply = `To apply offline, you will need to visit the nearest government service center (CSC) or the respective department office. You can find nearby offices here: https://www.google.com/maps/search/nearest+government+office${encodeURIComponent(stateQuery)}`;
          }
          
          return [...prev, { text: botReply, isBot: true }];
        });
        setIsTyping(false);
      }, 1500);
    }
  }, [initialQuery, userState]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userText = (typeof text === 'string' ? text : input);
    if (!userText.trim()) return;

    if (!chatStarted) setChatStarted(true);

    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setInput('');
    setIsTyping(true);

    // Simulated AI Response
    setTimeout(() => {
      setMessages(prev => {
        let botReply = "I can help you find government schemes! Please tell me your category (like Student, Farmer, Business) or your age and income.";
        const lower = userText.toLowerCase();
        const lastBotMessage = prev.length > 0 ? prev.filter(m => m.isBot).pop()?.text : '';

        let currentScheme = "government scheme";
        const botMessages = prev.filter(m => m.isBot).reverse();
        for (const msg of botMessages) {
          const match = msg.text.match(/'([^']+)'/);
          if (match) {
            currentScheme = match[1];
            break;
          }
        }
        const onlineLink = `https://www.google.com/search?q=Apply+online+for+${encodeURIComponent(currentScheme).replace(/%20/g, '+')}+official+website`;

        if (lower.includes('apply') && lower.includes('online') || lower === 'online') {
          botReply = `You can easily apply online. The official portal requires your Aadhaar, PAN, and basic documents. Here is the direct link to the official website: ${onlineLink}`;
        } else if (lower.includes('offline') || (lower.includes('apply') && lower.includes('offline'))) {
          const stateQuery = userState ? ` in ${userState}` : '';
          botReply = `To apply offline, you will need to visit the nearest government service center (CSC) or the respective department office. You can find nearby offices here: https://www.google.com/maps/search/nearest+government+office${encodeURIComponent(stateQuery)}`;
        } else if (lower.includes('farmer') || lower.includes('agriculture')) {
          botReply = "I found several schemes for farmers! The top recommendation is the 'PM-Kisan Samman Nidhi', which provides ₹6,000/year directly to your bank account. Should I show you how to apply?";
        } else if (lower.includes('student') || lower.includes('scholarship')) {
          botReply = "For students, we have schemes like the 'Central Sector Scholarship'. It offers ₹10,000/year for graduation level if your family income is below ₹8 Lakhs. Would you like details on documents needed?";
        } else if (lower.includes('business') || lower.includes('loan')) {
          botReply = "Looking to start a business? The 'PM MUDRA Yojana' offers loans up to ₹10 Lakh without collateral! Let me know if you want to see the eligibility criteria.";
        } else if (lower.includes('health') || lower.includes('medical')) {
          botReply = "For health coverage, the 'Ayushman Bharat' scheme provides up to ₹5 Lakhs free health insurance per family per year at empaneled hospitals. Do you have an Ayushman card?";
        } else if (lower.includes('yes') || lower.includes('show') || lower.includes('details')) {
          if (lastBotMessage && lastBotMessage.includes("Aapko online ya offline kese apply krna hai?")) {
            botReply = "Please reply with 'online' or 'offline'.";
          } else {
            botReply = "Great! You typically need your Aadhaar Card, Income Certificate, and Bank Details. Aapko online ya offline kese apply krna hai?";
          }
        }
        return [...prev, { text: botReply, isBot: true }];
      });
      setIsTyping(false);
    }, 1500);
  };

  const renderMessageText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 'bold' }}>{part}</a>;
      }
      return part;
    });
  };

  return (
    <div className="chat-view">
      <header className="chat-header">
        <div className="chat-logo" style={{ cursor: 'pointer' }} onClick={onBack}>
          <Sparkles /> YojnaSetu
        </div>
        <button className="btn" style={{ background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} onClick={onBack}>
          Exit Chat
        </button>
      </header>

      {!chatStarted ? (
        <div className="chat-container">
          <h1 className="chat-heading">
            Let's find your scheme.<br/>
            <span className="chat-heading-highlight">Right now.</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#475569', margin: '0 auto 2rem auto', maxWidth: '600px' }}>
            YojnaSetu lets you find fully-funded government schemes in minutes with just your words.<br/>
            No complex jargon necessary.
          </p>

          <div className="chat-input-wrapper" style={{ margin: '0 auto', width: '100%' }}>
            <form style={{ position: 'relative' }} onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <input 
                type="text" 
                className="chat-input" 
                placeholder="What are you looking for?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="chat-submit">
                <ArrowRight size={20} />
              </button>
            </form>
            
            <div className="chat-suggestions-title" style={{ marginTop: '2rem' }}>Not sure where to start? Try one of these:</div>
            <div className="chat-suggestions" style={{ justifyContent: 'center' }}>
              <div className="chat-pill" onClick={() => handleSend("Schemes for Farmers")}>Schemes for Farmers</div>
              <div className="chat-pill" onClick={() => handleSend("Education Scholarships")}>Education Scholarships</div>
              <div className="chat-pill" onClick={() => handleSend("Small Business Loans")}>Small Business Loans</div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto', width: '100%', padding: '0 1rem' }}>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ alignSelf: 'flex-start', background: 'white', padding: '1rem 1.5rem', borderRadius: '20px', borderBottomLeftRadius: '4px', maxWidth: '80%', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              Hi! I am YojnaSetu. I can help you find government schemes in simple words. What are you looking for today?
            </div>

            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end', 
                background: msg.isBot ? 'white' : '#dc2626', 
                color: msg.isBot ? '#0f172a' : 'white',
                padding: '1rem 1.5rem', 
                borderRadius: '20px', 
                borderBottomLeftRadius: msg.isBot ? '4px' : '20px',
                borderBottomRightRadius: !msg.isBot ? '4px' : '20px',
                maxWidth: '80%', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                lineHeight: '1.5',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }}>
                {renderMessageText(msg.text)}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'white', padding: '1rem 1.5rem', borderRadius: '20px', borderBottomLeftRadius: '4px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '1.5rem 0' }}>
            <form className="chat-input-wrapper" style={{ margin: 0, padding: '1rem' }} onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  className="chat-input" 
                  style={{ margin: 0, fontSize: '1.1rem' }}
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="chat-submit" style={{ position: 'static', marginLeft: '1rem', flexShrink: 0 }}>
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>
          
        </div>
      )}
    </div>
  );
};

// ==========================================
// VIEW 2.5: SEARCH RESULTS
// ==========================================
const SearchResultsView = ({ searchParams, onViewDetails, onOpenChat, onLogout, onBack }) => {
  const age = parseInt(searchParams.age) || 0;
  const income = parseInt(searchParams.income) || 0;
  
  let filteredSchemes = schemesData.filter(s => {
    const matchAge = age >= s.eligibility.minAge && age <= s.eligibility.maxAge;
    const matchIncome = income <= s.eligibility.maxIncome;
    const matchCategory = searchParams.category ? s.category === searchParams.category : true;
    
    // Caste Filtering Logic
    const userCaste = searchParams.caste || '';
    let matchCaste = true;
    if (userCaste) {
      const text = (s.title + " " + s.description).toLowerCase();
      const isSCSTScheme = text.includes(' sc ') || text.includes(' st ') || text.includes('scheduled caste') || text.includes('tribal') || text.includes('dalit');
      const isMinorityScheme = text.includes('minority') || text.includes('obc') || text.includes('backward class');
      
      if (userCaste === 'General') {
        if (isSCSTScheme || isMinorityScheme) matchCaste = false;
      } else if (userCaste === 'OBC') {
        if (isSCSTScheme) matchCaste = false;
      }
    }

    const userState = searchParams.state || '';
    let matchState = true;
    if (userState) {
      const schemeText = JSON.stringify(s).toLowerCase();
      const allStates = ['andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh', 'goa', 'gujarat', 'haryana', 'himachal pradesh', 'jharkhand', 'karnataka', 'kerala', 'madhya pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu', 'telangana', 'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal', 'puducherry', 'delhi', 'chandigarh'];
      const mentionsAnyState = allStates.some(st => schemeText.includes(st));
      matchState = !mentionsAnyState || schemeText.includes(userState.toLowerCase());
    }
    
    return matchAge && matchIncome && matchCategory && matchCaste && matchState;
  });

  return (
    <div className="home-view">
      <header className="home-header">
        <div className="container header-content">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={onBack}>
            <Sparkles size={32} color="#dc2626" />
            <div>
              YojnaSetu
              <span className="logo-sub">Your Guide to Government Schemes</span>
            </div>
          </div>
          
          <nav className="nav-links">
            <a onClick={onBack} style={{ cursor: 'pointer' }}>Home</a>
            <a href="#schemes" className="active">Results</a>
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-outline" onClick={onLogout} style={{ color: '#dc2626', borderColor: '#fca5a5' }}>Logout</button>
          </div>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--glass-bg)', minHeight: '80vh', paddingTop: '8rem' }}>
        <div className="container">
          <div className="schemes-header">
            <div>
              <a onClick={onBack} style={{ color: '#64748b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', textDecoration: 'none', fontWeight: 600 }}>
                <ChevronLeft size={16}/> Back to Search
              </a>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Top Recommendations For You</h2>
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Found {filteredSchemes.length} schemes for Category: {searchParams.category}, Age: {searchParams.age}, Income: ₹{searchParams.income}</p>
            </div>
          </div>
          
          <div className="schemes-grid">
            {filteredSchemes.length > 0 ? filteredSchemes.map(scheme => {
              const tagClass = scheme.category === 'student' ? 'tag-student' : scheme.category === 'farmer' ? 'tag-farmer' : 'tag-women';
              const iconClass = scheme.category === 'student' ? 'icon-green' : scheme.category === 'farmer' ? 'icon-blue' : 'icon-purple';

              return (
                <div key={scheme.id} className="scheme-card">
                  <div className="card-top">
                    <div className={`card-icon ${iconClass}`}><scheme.icon size={24} /></div>
                    <div className={`tag ${tagClass}`}>{scheme.target}</div>
                  </div>
                  <h3 className="card-title">{scheme.title}</h3>
                  <p className="card-desc">{scheme.description}</p>
                  
                  <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#dc2626', marginBottom: '1.5rem', borderLeft: '3px solid #dc2626' }}>
                    ⭐ <strong>High Match:</strong> Based on your input
                  </div>

                  <div className="card-bottom">
                    <div>
                      <div className="benefit-label">Benefit</div>
                      <div className="benefit-amount">{scheme.benefit}</div>
                    </div>
                    <button className="btn btn-primary" onClick={() => onViewDetails(scheme)}>
                      View Details →
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div style={{ textAlign: 'center', padding: '3rem', width: '100%', gridColumn: '1 / -1', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <Search size={48} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
                <h3>No schemes found</h3>
                <p style={{ color: '#64748b' }}>Try adjusting your search criteria to find more schemes.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="copyright">© 2026 YojnaSetu. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// MAIN APP ROUTER
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState('home'); // default to home
  const [userProfile, setUserProfile] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [initialChatQuery, setInitialChatQuery] = useState('');

  React.useEffect(() => {
    // Check local storage for existing session
    const activeSession = localStorage.getItem('yojnasetuSession');
    if (activeSession) {
      setUserProfile(JSON.parse(activeSession));
    }
  }, []);

  const handleAuthComplete = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('yojnasetuSession', JSON.stringify(profile));
    setCurrentView('home');
  };

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setCurrentView('details');
  };

  const handleLogout = () => {
    localStorage.removeItem('yojnasetuSession');
    setUserProfile(null);
    setCurrentView('home');
  };

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      {currentView === 'auth' && <AuthView onComplete={handleAuthComplete} />}
      {currentView === 'home' && <HomeView userProfile={userProfile} onViewDetails={handleViewDetails} onOpenChat={() => setCurrentView('chat')} onLogout={handleLogout} onLogin={() => setCurrentView('auth')} onSearch={(params) => { setSearchParams(params); setCurrentView('search'); }} />}
      {currentView === 'search' && <SearchResultsView searchParams={searchParams} onViewDetails={handleViewDetails} onOpenChat={() => setCurrentView('chat')} onLogout={handleLogout} onBack={() => setCurrentView('home')} />}
      {currentView === 'details' && <SchemeDetailsView scheme={selectedScheme} userState={searchParams?.state || userProfile?.state || ''} onBack={() => setCurrentView(searchParams ? 'search' : 'home')} onOpenChat={(query) => { setInitialChatQuery(query); setCurrentView('chat'); }} />}
      {currentView === 'chat' && <ChatbotView onBack={() => { setCurrentView('home'); setInitialChatQuery(''); }} initialQuery={initialChatQuery} userState={searchParams?.state || userProfile?.state || ''} />}

      {currentView !== 'chat' && currentView !== 'auth' && (
        <button 
          className="floating-chat-btn" 
          onClick={() => { setInitialChatQuery(''); setCurrentView('chat'); }}
          title="Ask AI Assistant"
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
}
