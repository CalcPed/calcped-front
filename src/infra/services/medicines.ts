
import { api } from "../api";

export function getMedicines() {
    return api.get('/medicines');
}