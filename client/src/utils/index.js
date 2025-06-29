import { jwtDecode } from "jwt-decode";

/**
 * Decodes a JWT token and returns { id, role } if present.
 * @param {string} token - JWT access token
 * @returns {{ id: string, role: string } | null}
 */
export function getUserFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      role: decoded.role,
    };
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// Add at the top of your dashboard file
import { BookOpen, Calendar, Award, Star, Activity } from "lucide-react";

const sessionIcons = [BookOpen, Calendar, Award, Star, Activity];
export const getRandomIcon = () => sessionIcons[Math.floor(Math.random() * sessionIcons.length)];