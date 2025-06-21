import '../style/home.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="home-root">
      {/* Decorative Banner */}
      <div className="home-banner">
        <h1>
          Discover <span>EstateEase</span>
        </h1>
        <p>
          Your dream property is just a click away. Browse the latest offers, rentals, and sales!
        </p>
      </div>

      {/* Swiper */}
      <section className="home-swiper-section">
        <Swiper navigation className="home-swiper" loop={true}>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `linear-gradient( rgba(88, 230, 170, 0.18), rgba(34, 77, 32, 0.18) ), url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className="home-swiper-slide"
                >
                  <div className="swiper-slide-caption">
                    <h3>{listing.name}</h3>
                    <Link to={`/listing/${listing._id}`} className="swiper-slide-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* Listings */}
      <section className="home-listings">
        {offerListings && offerListings.length > 0 && (
          <div className="listing-block">
            <div className="listing-header">
              <h2>Recent Offers</h2>
              <Link className="listing-link" to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className="listing-cards">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="listing-block">
            <div className="listing-header">
              <h2>Recent Places for Rent</h2>
              <Link className="listing-link" to={'/search?type=rent'}>
                Show more places for rent
              </Link>
            </div>
            <div className="listing-cards">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="listing-block">
            <div className="listing-header">
              <h2>Recent Places for Sale</h2>
              <Link className="listing-link" to={'/search?type=sale'}>
                Show more places for sale
              </Link>
            </div>
            <div className="listing-cards">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
