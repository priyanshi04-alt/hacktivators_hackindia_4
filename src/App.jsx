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
  const [formData, setFormData] = useState({ age: '', income: '', occupation: '', category: '', state: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Simulate quick login
      const savedProfile = JSON.parse(localStorage.getItem('saarthiProfile'));
      if (savedProfile) {
        onComplete(savedProfile);
      } else {
        alert("No saved profile found. Please create an account.");
        setIsLogin(false);
      }
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem('saarthiProfile', JSON.stringify(formData));
      onComplete(formData);
    }
  };

  return (
    <div className="auth-view">
      <div className="auth-card">
        <div className="auth-sidebar">
          <div className="auth-logo">
            <Sparkles size={28} /> Saarthi
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
                   <label>Email Address</label>
                   <input type="email" className="auth-input" placeholder="your@email.com" required />
                 </div>
                 <div className="auth-form-group full">
                   <label>Password</label>
                   <input type="password" className="auth-input" placeholder="••••••••" required />
                 </div>
               </div>
            )}

            {!isLogin && step === 1 && (
              <div className="auth-form-grid">
                <div className="auth-form-group">
                  <label>First Name</label>
                  <input type="text" className="auth-input" placeholder="First Name" required />
                </div>
                <div className="auth-form-group">
                  <label>Last Name</label>
                  <input type="text" className="auth-input" placeholder="Last Name" required />
                </div>
                <div className="auth-form-group full">
                  <label>Email Address</label>
                  <input type="email" className="auth-input" placeholder="your@email.com" required />
                </div>
                <div className="auth-form-group full">
                  <label>Create Password</label>
                  <input type="password" className="auth-input" placeholder="••••••••" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                <div className="auth-form-group full">
                  <label>Your State</label>
                  <select className="auth-input" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                    <option value="">Select State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
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
                  <label>Occupation</label>
                  <select className="auth-input" required value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})}>
                    <option value="">Select Occupation</option>
                    <option value="student">Student</option>
                    <option value="farmer">Farmer</option>
                    <option value="women">Women</option>
                  </select>
                </div>
                <div className="auth-form-group full">
                  <label>Category</label>
                  <select className="auth-input" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OBC">OBC</option>
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
                  <p><strong>Occupation:</strong> {formData.occupation}</p>
                  <p><strong>Category:</strong> {formData.category}</p>
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
const HomeView = ({ userProfile, onViewDetails, onOpenChat, onLogout, onSearch }) => {
  const [formData, setFormData] = useState({ 
    occupation: userProfile?.occupation || '', 
    category: userProfile?.category || '', 
    age: userProfile?.age || '', 
    income: userProfile?.income || '', 
    state: userProfile?.state || '' 
  });
  
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
    const matchOccupation = userProfile.occupation ? s.occupation === userProfile.occupation : true;
    const matchCategory = userProfile.category ? s.category.includes(userProfile.category) : true;
    return matchAge && matchIncome && matchOccupation && matchCategory;
  });

  const displaySchemes = filteredSchemes.slice(0, 6);

  return (
    <div className="home-view">
      <header className="home-header">
        <div className="container header-content">
          <div className="logo">
            <Sparkles size={32} color="#dc2626" />
            <div>
              SaarthiAI
              <span className="logo-sub">Your Guide to Government Schemes</span>
            </div>
          </div>
          
          <nav className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#schemes">Schemes</a>
            <a href="#how-it-works">How It Works</a>
            <a onClick={onLogout} style={{ cursor: 'pointer', color: '#dc2626' }}>Logout</a>
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-outline">English</button>
            <button className="btn btn-primary" onClick={onOpenChat}>
              <MessageSquare size={18}/> Ask AI Assistant
            </button>
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
          
          <form className="inline-form" style={{ flexWrap: 'wrap', gap: '0.5rem' }} onSubmit={handleSearchSubmit}>
            <div className="input-box" style={{ flex: '1 1 auto' }}>
              <select required value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})}>
                <option value="" disabled>Select Occupation</option>
                <option value="student">Student</option>
                <option value="farmer">Farmer</option>
                <option value="health">Health</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div className="input-box" style={{ flex: '1 1 auto', maxWidth: '140px' }}>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="" disabled>Category</option>
                <option value="General">General</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
              </select>
            </div>
            <div className="input-box" style={{ flex: '1 1 auto', maxWidth: '100px' }}>
              <input type="number" required placeholder="Your Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
            </div>
            <div className="input-box" style={{ flex: '1 1 auto', maxWidth: '140px' }}>
              <input type="number" required placeholder="Annual Income" value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} />
            </div>
            <div className="input-box" style={{ flex: '1 1 auto' }}>
              <select required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                <option value="" disabled>Your State</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Find My Schemes →
            </button>
          </form>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose SaarthiAI?</h2>
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
            <a href="#" className="view-all">View All Schemes →</a>
          </div>
          
          <div className="schemes-grid">
            {displaySchemes.map(scheme => {
              const tagClass = scheme.occupation === 'student' ? 'tag-student' : scheme.occupation === 'farmer' ? 'tag-farmer' : 'tag-women';
              const iconClass = scheme.occupation === 'student' ? 'icon-green' : scheme.occupation === 'farmer' ? 'icon-blue' : 'icon-purple';

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
          <div className="copyright">© 2026 SaarthiAI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// VIEW 3: SCHEME DETAILS (Article Card + AI Modes)
// ==========================================
const SchemeDetailsView = ({ scheme, onBack }) => {
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
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VIEW 4: CHATBOT (Base44 Gradient)
// ==========================================
// ==========================================
// VIEW 4: CHATBOT (Base44 Gradient)
// ==========================================
const ChatbotView = ({ onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    if (!chatStarted) setChatStarted(true);

    const newMessages = [...messages, { text: userText, isBot: false }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulated AI Response
    setTimeout(() => {
      let botReply = "I can help you find government schemes! Please tell me your category (like Student, Farmer, Business) or your age and income.";
      
      const lower = userText.toLowerCase();
      if (lower.includes('farmer') || lower.includes('agriculture')) {
        botReply = "I found several schemes for farmers! The top recommendation is the 'PM-Kisan Samman Nidhi', which provides ₹6,000/year directly to your bank account. Should I show you how to apply?";
      } else if (lower.includes('student') || lower.includes('scholarship')) {
        botReply = "For students, we have schemes like the 'Central Sector Scholarship'. It offers ₹10,000/year for graduation level if your family income is below ₹8 Lakhs. Would you like details on documents needed?";
      } else if (lower.includes('business') || lower.includes('loan')) {
        botReply = "Looking to start a business? The 'PM MUDRA Yojana' offers loans up to ₹10 Lakh without collateral! Let me know if you want to see the eligibility criteria.";
      } else if (lower.includes('health') || lower.includes('medical')) {
        botReply = "For health coverage, the 'Ayushman Bharat' scheme provides up to ₹5 Lakhs free health insurance per family per year at empaneled hospitals. Do you have an Ayushman card?";
      } else if (lower.includes('yes') || lower.includes('show') || lower.includes('details')) {
        botReply = "Great! You typically need your Aadhaar Card, Income Certificate, and Bank Details. You can apply directly on the official portal. Would you like the direct application link?";
      }

      setMessages([...newMessages, { text: botReply, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="chat-view">
      <header className="chat-header">
        <div className="chat-logo" style={{ cursor: 'pointer' }} onClick={onBack}>
          <Sparkles /> SaarthiAI
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
            SaarthiAI lets you find fully-funded government schemes in minutes with just your words.<br/>
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
              Hi! I am SaarthiAI. I can help you find government schemes in simple words. What are you looking for today?
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
                lineHeight: '1.5'
              }}>
                {msg.text}
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
    const matchOccupation = searchParams.occupation ? s.occupation === searchParams.occupation : true;
    const matchCategory = searchParams.category ? s.category.includes(searchParams.category) : true;
    return matchAge && matchIncome && matchOccupation && matchCategory;
  });

  return (
    <div className="home-view">
      <header className="home-header">
        <div className="container header-content">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={onBack}>
            <Sparkles size={32} color="#dc2626" />
            <div>
              SaarthiAI
              <span className="logo-sub">Your Guide to Government Schemes</span>
            </div>
          </div>
          
          <nav className="nav-links">
            <a onClick={onBack} style={{ cursor: 'pointer' }}>Home</a>
            <a href="#schemes" className="active">Results</a>
            <a onClick={onLogout} style={{ cursor: 'pointer', color: '#dc2626' }}>Logout</a>
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-primary" onClick={onOpenChat}>
              <MessageSquare size={18}/> Ask AI Assistant
            </button>
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
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Found {filteredSchemes.length} schemes for Occupation: {searchParams.occupation}, Category: {searchParams.category}, Age: {searchParams.age}, Income: ₹{searchParams.income}</p>
            </div>
          </div>
          
          <div className="schemes-grid">
            {filteredSchemes.length > 0 ? filteredSchemes.map(scheme => {
              const tagClass = scheme.occupation === 'student' ? 'tag-student' : scheme.occupation === 'farmer' ? 'tag-farmer' : 'tag-women';
              const iconClass = scheme.occupation === 'student' ? 'icon-green' : scheme.occupation === 'farmer' ? 'icon-blue' : 'icon-purple';

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
          <div className="copyright">© 2026 SaarthiAI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// MAIN APP ROUTER
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState('auth'); // 'auth', 'home', 'details', 'chat', 'search'
  const [userProfile, setUserProfile] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchParams, setSearchParams] = useState(null);

  React.useEffect(() => {
    // Check local storage for existing session
    const savedProfile = localStorage.getItem('saarthiProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setCurrentView('home');
    }
  }, []);

  const handleAuthComplete = (profile) => {
    setUserProfile(profile);
    setCurrentView('home');
  };

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setCurrentView('details');
  };

  const handleLogout = () => {
    localStorage.removeItem('saarthiProfile');
    setUserProfile(null);
    setCurrentView('auth');
  };

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      {currentView === 'auth' && <AuthView onComplete={handleAuthComplete} />}
      {currentView === 'home' && <HomeView userProfile={userProfile} onViewDetails={handleViewDetails} onOpenChat={() => setCurrentView('chat')} onLogout={handleLogout} onSearch={(params) => { setSearchParams(params); setCurrentView('search'); }} />}
      {currentView === 'search' && <SearchResultsView searchParams={searchParams} onViewDetails={handleViewDetails} onOpenChat={() => setCurrentView('chat')} onLogout={handleLogout} onBack={() => setCurrentView('home')} />}
      {currentView === 'details' && <SchemeDetailsView scheme={selectedScheme} onBack={() => setCurrentView(searchParams ? 'search' : 'home')} />}
      {currentView === 'chat' && <ChatbotView onBack={() => setCurrentView('home')} />}
    </div>
  );
}
