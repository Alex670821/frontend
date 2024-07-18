import React, { useRef } from "react";

const Home = () => {
  const videoRef = useRef(null);

  const startVideo = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="fs-6 text-secondary mb-2 text-uppercase text-center">
              REA-K
            </h2>
            <p className="display-5 mb-4 mb-md-5 text-center">
              Tu destino para el mejor entretenimiento en streaming.
            </p>
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
      </div>

      <div className="container overflow-hidden">
        <div className="row gy-4 gy-lg-0">
          <div className="col-12 col-lg-4">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      Video en vivo desde la cámara
                    </h5>
                    <p className="card-text">
                      Este es un video en vivo capturado desde tu cámara.
                    </p>
                    <button className="btn btn-primary" onClick={startVideo}>
                      Iniciar cámara
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
