import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";

export default function LogoutButton() {
  return (
    <Link to="/">
      <button type="click" onClick={TokenService.clearAuthToken}>
        Logout
      </button>
    </Link>
  );
}
