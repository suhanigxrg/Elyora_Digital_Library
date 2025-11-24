export default function Help() {
  return (
    <div className="help-page">

      {/* Header */}
      <div className="help-section-header">
        <div id="help-icon">❓</div>
        <h1 id="help-heading-top">Help Center</h1>
        <p>Everything you need to know about using ELYORA</p>
      </div>

      {/* Key Features */}
      <h2 id="help-heading">Key Features</h2>

      <div className="help-features">

        <div className="help-feature-card">
          <div className="icon">🔍</div>
          <h3>Smart Search</h3>
          <p>Find books by title, author, or tags with real-time filtering</p>
        </div>

        <div className="help-feature-card">
          <div className="icon">❤️</div>
          <h3>Favorites</h3>
          <p>Save your favorite books for quick access later</p>
        </div>

        <div className="help-feature-card">
          <div className="icon">⬇️</div>
          <h3>Offline Reading</h3>
          <p>Download books for offline reading</p>
        </div>

        <div className="help-feature-card">
          <div className="icon">📖</div>
          <h3>Continue Reading</h3>
          <p>Pick up where you left off automatically</p>
        </div>

        <div className="help-feature-card">
          <div className="icon">🖊️</div>
          <h3>Highlights & Notes</h3>
          <p>Mark important passages and add personal notes</p>
        </div>

        <div className="help-feature-card">
          <div className="icon">⚙️</div>
          <h3>Customizable Reader</h3>
          <p>Adjust font size, themes, and preferences</p>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="help-faq-section">

        <h2>Frequently Asked Questions</h2>
        <input type="text" className="help-faq-search" placeholder="Search FAQ..." />

        {/* FAQ List */}
        <div className="help-faq-item">
          <div className="help-faq-question">How do I search for books? <span>+</span></div>
          <div className="help-faq-answer">
            Use the search bar at the top of the page...
          </div>
        </div>

        <div className="help-faq-item">
          <div className="help-faq-question">How do I add books to favorites? <span>+</span></div>
          <div className="help-faq-answer">
            Click the heart icon...
          </div>
        </div>

        <div className="help-faq-item">
          <div className="help-faq-question">How do I download books? <span>+</span></div>
          <div className="help-faq-answer">
            Click the download button…
          </div>
        </div>

      </div>

      {/* Getting Started */}
      <div className="help-getting-started">

        <h2>Getting Started</h2>

        <div className="help-steps-box">

          <div className="help-step">
            <span className="help-step-number">1</span>
            <div>
              <h3>Browse and Discover</h3>
              <p>Explore books by categories</p>
            </div>
          </div>

          <div className="help-step">
            <span className="help-step-number">2</span>
            <div>
              <h3>Save Favorites</h3>
              <p>Heart icon adds books to favourites</p>
            </div>
          </div>

          <div className="help-step">
            <span className="help-step-number">3</span>
            <div>
              <h3>Start Reading</h3>
              <p>Open a book and enjoy</p>
            </div>
          </div>

          <div className="help-step">
            <span className="help-step-number">4</span>
            <div>
              <h3>Customize Your Experience</h3>
              <p>Adjust settings & themes</p>
            </div>
          </div>

        </div>

        <div className="help-support-box">
          <h2>Still Need Help?</h2>
          <p>We're here to help!</p>
          <button className="help-support-btn">Contact Support</button>
        </div>

      </div>

    </div>
  );
}
