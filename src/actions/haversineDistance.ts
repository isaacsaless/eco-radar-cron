import { Ponto } from '../types/types';

export function haversineDistance(p1: Ponto, p2: Ponto): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const R = 6371;
  const dLat = toRad(p2.latitude - p1.latitude);
  const dLon = toRad(p2.longitude - p1.longitude);

  const lat1 = toRad(p1.latitude);
  const lat2 = toRad(p2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}