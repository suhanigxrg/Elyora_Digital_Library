export default function Downloads() {
  return (
    <div className="downloads-page content">

      <h2><i className="fas fa-download"></i> Downloaded Books</h2>
      <p id="total-books">0 downloaded books (available offline)</p>

      <div className="card">
        <i className="fas fa-download"></i>
        <h3>No downloads yet</h3>
        <p id="download-para">
          Download books for offline reading by clicking the download button on any book.
        </p>
        <button>Browse Books</button>
      </div>

    </div>
  );
}
