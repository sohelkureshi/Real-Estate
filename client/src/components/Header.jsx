import '../style/header.css';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="custom-header">
      <div className="header-container">
        <Link to='/'>
          <h1 className="brand-title">
            <span className="brand-green">Estate</span>
            <span className="brand-dark">Ease</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="header-search">
          <input
            type='text'
            placeholder='Search...'
            className='search-input'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">
            <FaSearch className='search-icon' />
          </button>
        </form>
        <ul className="header-nav">
          <Link to='/'>
            <li className='nav-link'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='nav-link'>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='profile-avatar'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='nav-link'>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
