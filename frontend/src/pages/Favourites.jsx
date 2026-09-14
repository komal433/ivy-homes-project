import { useFavourites } from "../context/FavouritesContext";
import ListingCard from "../components/ListingCard";

export default function Favourites() {
  const { favourites, loading, error, refresh } = useFavourites();

  if (loading && favourites.length === 0) {
    return <div className="loading-state">Loading saved listings…</div>;
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <div className="eyebrow">YOUR SHORTLIST</div>
          <h2>Saved listings</h2>
          <p className="page-subtitle">The homes worth coming back to.</p>
        </div>
        <span className="result-count">{favourites.length} saved</span>
        <button className="secondary" onClick={refresh}>Refresh</button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {favourites.length === 0 ? (
        <div className="empty-state">
          Nothing saved yet — tap ☆ Save on any listing to add it here. Saved listings persist per
          account, even after a reload or logging back in.
        </div>
      ) : (
        <div className="grid">
          {favourites.map((l) => (
            <ListingCard key={l.listing_id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
