/**
 * Utility functions for calculating angle, x, and y offsets of UI elements
 */

// Convert deg to radian as in-built Math trig functions use radians
function convertToRad(deg) {
  return deg * (Math.PI / 180);
}

// Get the rotation angle in degrees based on an index i to know how much to rotate each graduation mark on the thermostat face
export function getAngle(i) {
  // Angle of all marks is 300 deg in total split between 61 marks
  const DEG = 300 / 60;
  // Starting mark index 0 is at -150 deg
  const BASE = -150;

  return i * DEG + BASE;
}

// Get X offset of mark given index i
export function getX(i, radius) {
  return Math.sin(convertToRad(getAngle(i))) * radius;
}

// Get X offset of mark given index i
export function getY(i, radius) {
  return radius - (Math.cos(convertToRad(getAngle(i))) * radius);
}