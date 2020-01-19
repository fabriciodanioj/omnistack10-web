import React, { useEffect, useState } from "react";
import api from "../../services/api";

import "./styles.css";

export default function Main() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    const devs = async () => {
      const response = await api.get("user/list");
      setDevs(response.data);
      console.log(response.data);
    };
    devs();
  }, [devs]);

  return (
    <main>
      <ul>
        {devs.map(dev => (
          <li key={dev._id}>
            <div className="header">
              <img src={dev.avatar_url} alt="" />
              <div>
                <h1>{dev.name}</h1>
                <h2>{dev.techs.join(", ")}</h2>
              </div>
            </div>
            <div className="body">
              <h3>{dev.bio}</h3>
            </div>
            <a href={`https://github.com/${dev.github_username}`}>
              Acessar Perfil do GitHub
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
