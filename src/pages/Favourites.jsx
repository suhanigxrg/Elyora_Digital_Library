
export default function Favourites() {
  return (
    <div className="favourites-page">

      <div className="page-header">
        <h1><span className="icon">❤️</span> My favourites</h1>
        <p className="sub-text">0 favourite books saved</p>
      </div>

      <div className="container">
        <div className="card_1">
          <div className="icon">🫶🏻</div>
          <h2>No favourites yet</h2>
          <p>Save your favourite books to easily access them anytime.</p>
          <a href="#" className="btn">Browse Books</a>
        </div>
      </div>

    </div>
  );
}
