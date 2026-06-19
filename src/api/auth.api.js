/**
 * Auth API layer
 * Mock şu an aktif. Gerçek backend'e geçmek için bu
 * dosyadaki mock import'larını axios/fetch çağrılarıyla değiştir.
 * Fonksiyon imzaları aynı kalır.
 */
import {
  mockLogin,
  mockRegister,
  mockLogout,
  mockUpdateProfile,
  mockGetCurrentUser,
} from './mock/auth.mock';

// Context'lerin (AuthContext) mock mu gerçek backend mi kullandığımızı bilmesine gerek yok,
// burada sadece isim eşliyoruz; backend hazır olunca tek değişecek yer burası
export const loginUser         = mockLogin;
export const registerUser      = mockRegister;
export const logoutUser        = mockLogout;
export const updateUserProfile = mockUpdateProfile;
export const getCurrentUser    = mockGetCurrentUser;
