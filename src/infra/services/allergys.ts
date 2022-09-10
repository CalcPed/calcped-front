import { api } from "../api";

export function getAllergiess() {
  return api.get("/alergiess");
}
