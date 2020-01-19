import React, { useEffect, useState } from "react";
import api from "../../services/api";

import "./styles.css";

export default function Register() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  const [username, setUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    
    await api.post("/user/create", {
      github_username: username,
      techs,
      latitude,
      longitude
    });

    setUsername('')
    setTechs('')
  };

  return (
    <aside>
      <strong>Cadastrar</strong>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input
            name="github_username"
            id="username_github"
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="user_techs"
            required
            value={techs}
            onChange={event => setTechs(event.target.value)}
            placeholder="Separe as tecnologias por virgula."
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              name="latitude"
              id="user_latitude"
              required
              value={latitude}
              onChange={event => setLatitude(event.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              name="longitude"
              id="user_longitude"
              required
              value={longitude}
              onChange={event => setLongitude(event.target.value)}
            />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Salvar
        </button>
      </form>
    </aside>
  );
}
