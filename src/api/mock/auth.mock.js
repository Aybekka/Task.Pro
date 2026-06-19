import { storage, KEYS } from './storage';
import { DEMO_USER } from './seed';

// localStorage'da hiç kullanıcı yoksa (ilk açılış) demo kullanıcıyı tohumluyorum,
// böylece backend olmadan da "demo@taskpro.com" ile giriş denenebiliyor
function getUsers() {
  const users = storage.get(KEYS.USERS);
  if (!users) {
    storage.set(KEYS.USERS, [DEMO_USER]);
    return [DEMO_USER];
  }
  return users;
}

// Gerçek bir API çağrısı gibi hissettirmesi için küçük bir delay ekledim,
// yoksa loading state'leri test ederken her şey anında bitiyordu
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export async function mockLogin({ email, password }) {
  await delay(200);
  const users = getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) throw new Error('Invalid email or password.');
  // Şifreyi localStorage'a/state'e taşımamak için response'tan çıkarıyorum
  const { password: _pw, ...safeUser } = user;
  storage.set(KEYS.USER, safeUser);
  return safeUser;
}

export async function mockRegister({ name, email, password }) {
  await delay(200);
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  const newUser = { id: `user-${Date.now()}`, name, email, password, avatarUrl: null };
  storage.set(KEYS.USERS, [...users, newUser]);
  const { password: _pw, ...safeUser } = newUser;
  storage.set(KEYS.USER, safeUser);
  return safeUser;
}

export async function mockLogout() {
  await delay(50);
  storage.remove(KEYS.USER);
}

export async function mockUpdateProfile(data) {
  await delay(200);
  const current = storage.get(KEYS.USER);
  if (!current) throw new Error('Not authenticated.');
  const users = getUsers();
  const idx = users.findIndex(u => u.id === current.id);
  if (idx === -1) throw new Error('User not found.');
  const updated = { ...users[idx], ...data };
  users[idx] = updated;
  storage.set(KEYS.USERS, users);
  const { password: _pw, ...safeUser } = updated;
  storage.set(KEYS.USER, safeUser);
  return safeUser;
}

export async function mockGetCurrentUser() {
  await delay(50);
  // Sayfa yenilendiğinde AuthContext bunu çağırıp oturumun hâlâ geçerli olup olmadığına bakıyor
  return storage.get(KEYS.USER);
}
