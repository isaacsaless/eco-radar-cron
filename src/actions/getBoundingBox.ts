import { Ponto } from '../types/types';

export function getBoundingBox(center: Ponto, radiusKm: number) {
  const earthRadius = 6371;

  const lat = center.latitude;
  const lon = center.longitude;

  const latDelta = (radiusKm / earthRadius) * (180 / Math.PI);
  const lonDelta =
    (radiusKm / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);

  return {
    minLat: lat - latDelta,
    maxLat: lat + latDelta,
    minLon: lon - lonDelta,
    maxLon: lon + lonDelta,
  };
}