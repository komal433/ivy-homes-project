import { Link } from "react-router-dom";
import { formatINR, formatArea, titleCase } from "../lib/format";
import { useFavourites } from "../context/FavouritesContext";

export default function ListingCard({ listing }) {
  const { isFavourited, toggle } = useFavourites();
  const saved = isFavourited(listing.listing_id);

  return (
    <div className="listing-card">
      <div className="listing-card-topline">
        <div className="badges">
          {listing.is_verified && <span className="badge verified">Verified</span>}
          <span className="badge">{titleCase(listing.property_type)}</span>
        </div>
        <span className="listing-source">{listing.website}</span>
      </div>
      <div className="listing-visual" aria-hidden="true">
        <span>{(listing.apartment_name || "I").slice(0, 1).toUpperCase()}</span>
      </div>
      <div className="price">{formatINR(listing.price)}</div>
      <div className="title">{listing.apartment_name || "Unnamed property"}</div>
      <div className="meta">
        {titleCase(listing.locality)}
      </div>
      <div className="listing-stats">
        <span>{listing.bedroom} BHK</span>
        <span>{formatArea(listing.carpet_area)}</span>
        <span>{titleCase(listing.furnishing)}</span>
      </div>
      <div className="listing-actions">
        <Link to={`/listings/${listing.listing_id}`}>View details →</Link>
        <button
          className="secondary"
          style={{ padding: "4px 10px", fontSize: 12 }}
          onClick={() => toggle(listing)}
        >
          {saved ? "★ Saved" : "☆ Save"}
        </button>
      </div>
    </div>
  );
}
