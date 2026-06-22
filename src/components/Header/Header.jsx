import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useBoard } from "../../context/BoardContext";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Header.module.css";

export default function Header() {
  const { user } = useAuth();
  const { activeBoard } = useBoard();
  const { theme, setTheme } = useTheme();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* TODO: Mobile sidebar toggle */}
        <button
          type="button"
          className={styles.hamburger}
          aria-label="Open menu"
        >
          ☰
        </button>
        <h2 className={styles.boardTitle}>{activeBoard?.title ?? "TaskPro"}</h2>
      </div>
      <div className={styles.right}>
        <div className={styles.themeSelector}>
          <span>Theme</span>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className={styles.themeSelect}
          >
            <option value="light">Light</option>
            <option value="violet">Violet</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button
          type="button"
          className={styles.userInfo}
          onClick={() => setIsProfileOpen(true)}
        >
          <span className={styles.userName}>{user?.name ?? "User"}</span>

          {user?.avatarUrl ? (
            <img
              className={styles.avatar}
              src={user.avatarUrl}
              alt={user.name}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
          )}
        </button>
      </div>
      {isProfileOpen && <div>{/* TODO: EditProfileModal */}</div>}
    </header>
  );
}
