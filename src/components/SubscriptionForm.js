import React, { useState } from "react";
import axios from "axios";

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    credit_card_number: "",
    expiration_date: "",
    security_code: "",
    cedula: "",
    numero_celular: "",
    titular: "",
    email: "",
    referencia: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access");

      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8000/api/subscription/create/",
        formData,
        config
      );

      setModalTitle("Éxito");
      setModalMessage("¡Felicidades! Te has suscrito exitosamente.");
      setShowModal(true);
      resetForm();
    } catch (error) {
      console.error("Error:", error.message);
      setModalTitle("Error");
      setModalMessage(
        "Hubo un error al suscribirte. Inténtalo de nuevo más tarde."
      );
      setShowModal(true);
    }
  };

  const resetForm = () => {
    setFormData({
      credit_card_number: "",
      expiration_date: "",
      security_code: "",
      cedula: "",
      numero_celular: "",
      titular: "",
      email: "",
      referencia: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <h3 className="card-header text-center">Subscription Form</h3>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Form inputs go here */}
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    id="titular"
                    name="titular"
                    value={formData.titular}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Titular"
                  />
                  <label className="form-label" htmlFor="titular">
                    Titular
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email"
                  />
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="credit_card_number"
                name="credit_card_number"
                value={formData.credit_card_number}
                onChange={handleChange}
                className="form-control"
                placeholder="Número de Tarjeta de Crédito"
              />
              <label className="form-label" htmlFor="credit_card_number">
                Número de Tarjeta de Crédito
              </label>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    id="expiration_date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="MM/AA"
                  />
                  <label className="form-label" htmlFor="expiration_date">
                    Fecha de Expiración
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    id="security_code"
                    name="security_code"
                    value={formData.security_code}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Código de Seguridad"
                  />
                  <label className="form-label" htmlFor="security_code">
                    Código de Seguridad
                  </label>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Cédula"
                  />
                  <label className="form-label" htmlFor="cedula">
                    Cédula
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    id="numero_celular"
                    name="numero_celular"
                    value={formData.numero_celular}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Número de Celular"
                  />
                  <label className="form-label" htmlFor="numero_celular">
                    Número de Celular
                  </label>
                </div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="referencia"
                name="referencia"
                value={formData.referencia}
                onChange={handleChange}
                className="form-control"
                placeholder="Referencia"
              />
              <label className="form-label" htmlFor="referencia">
                Referencia
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Crear Suscripción
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionForm;
