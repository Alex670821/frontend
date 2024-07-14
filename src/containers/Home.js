import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import '../styles/Home.css'; // Create this file for additional styling

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [directos, setDirectos] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/directos/search/')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);
        setDirectos(data);
      })
      .catch(error => console.error('Error fetching directos:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDirectos = directos.filter((directo) =>
    directo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    directo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');  // Redirigir al home después del logout
  };

  return (
    <div className="home-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/messages">Crear Directos</Link>
          </li>
          <li>
            <Link to="/dashboard">Puntos</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="content">
        <div className="container mt-5">
          <h1>Directos Disponibles</h1>
          <div className="row mb-4">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por título o descripción"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="row gy-4 gy-lg-0">
            {filteredDirectos.map((directo, index) => (
              <div className="col-12 col-lg-4" key={index}>
                <div className="card border-0">
                  <figure className="card-img-top m-0 overflow-hidden bsb-overlay-hover">
                    <a href="#!">
                      <img className="img-fluid bsb-scale bsb-hover-scale-up" loading="lazy" src="./assets/img/team-img-1.jpg" alt="" />
                    </a>
                    <figcaption>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye text-white bsb-hover-fadeInLeft" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                      <h4 className="h6 text-white bsb-hover-fadeInRight mt-2">Read More</h4>
                    </figcaption>
                  </figure>
                  <div className="card-body border bg-white p-4">
                    <h2 className="card-title h4 fw-bold mb-3">{directo.title}</h2>
                    <p className="card-text text-secondary">{directo.description}</p>
                  </div>
                  <div className="card-footer border border-top-0 bg-white p-4">
                    <ul className="nav mb-0 bsb-nav-sep">
                      <li className="nav-item text-secondary">
                        <a className="nav-link link-secondary p-0 pe-3 d-inline-flex align-items-center" href="#!">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-lightbulb text-primary" viewBox="0 0 16 16">
                            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
                          </svg>
                          <span className="ms-2 fs-6">{directo.category}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
