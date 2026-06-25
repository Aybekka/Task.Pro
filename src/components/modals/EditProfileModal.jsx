import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/AuthContext";
import { editProfileSchema } from "../../utils/validationSchemas";
import Modal from "./Modal";
import styles from "./EditProfileModal.module.css";

// Avatar en fazla 32-76px gösteriliyor, telefon fotoğraflarının orijinal
// çözünürlüğüne hiç gerek yok — base64'e çevirmeden önce küçültüp JPEG'e
// sıkıştırıyoruz ki backend'in boyut limitini aşmasın.
const AVATAR_MAX_DIMENSION = 256;

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, AVATAR_MAX_DIMENSION / Math.max(img.width, img.height));
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => reject(new Error("Invalid image file."));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

export default function EditProfileModal({ onClose }) {
  const { user, updateProfile } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resized = await resizeImageFile(file);
      setAvatarUrl(resized);
    } catch {
      setSubmitError("Could not process that image. Please try a different one.");
    }
  };

  const onSubmit = async ({ name, email, password }) => {
    setSubmitError(null);
    try {
      await updateProfile({
        name,
        email,
        avatarUrl,
        ...(password ? { password } : {}),
      });
      onClose();
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal title="Edit profile" onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
              </div>
            )}

            <label className={styles.uploadBtn} aria-label="Upload avatar image">
              +
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="password"
            placeholder="New password"
            autoComplete="new-password"
            {...register("password")}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm new password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword.message}</span>
          )}
        </div>

        {submitError && <span className={styles.error}>{submitError}</span>}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Send"}
        </button>
      </form>
    </Modal>
  );
}
