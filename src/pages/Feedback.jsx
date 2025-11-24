export default function Feedback() {
  return (
    <div className="feedback-page container_1">

      <div className="icon">💬</div>
      <h1>Share Your Feedback</h1>
      <p>
        Help us improve ELYORA by sharing your thoughts, suggestions, or reporting issues.
        <br /><br />
      </p>

      <div className="feedback-card">
        <form>

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input type="text" id="name" placeholder="Your full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" placeholder="your@email.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              placeholder="Tell us about your experience..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn_1">✈ Send Feedback</button>

        </form>
      </div>

      <div className="other-ways">
        <div className="way-card">
          <h3>Email Support</h3>
          <p>support@elyora.com</p>
        </div>

        <div className="way-card">
          <h3>Response Time</h3>
          <p>Usually within 24 hours</p>
        </div>
      </div>

    </div>
  );
}
