import { api } from "../api";

export function calculate( obj: {} ) {
    return api.post('/calculate', obj);
}