import React from "react";

export default function AgentCard({ name, avatar, description }) {
  return (
    <div>
      <img src={avatar} alt={name} width="100" />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}
