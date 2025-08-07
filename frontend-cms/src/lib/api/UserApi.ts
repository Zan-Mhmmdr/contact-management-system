// Fungsi untuk mendaftarkan pengguna baru
export const userRegister = async (user: {
  username: string;
  name: string;
  password: string;
}) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
    method: "POST", // Mengirim data menggunakan metode POST
    headers: {
      "content-type": "application/json", // Tipe konten yang dikirim dalam bentuk JSON
      Accept: "application/json", // Minta respons dalam format JSON
    },
    body: JSON.stringify(user), // Konversi data user menjadi JSON
  });
};

// Fungsi untuk login pengguna
export const userLogin = async (user: {
  username: string;
  password: string;
}) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });
};

// Fungsi untuk mengambil detail pengguna yang sedang login
export const userDetail = async (token: any) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token, // Kirim token untuk otentikasi
    },
  });
};

// Fungsi untuk mengupdate username pengguna yang sedang login
export const userUpdateProfile = async (token: any, username: string) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH", // Gunakan PATCH untuk mengubah sebagian data
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ username }),
  });
};

// Fungsi untuk mengupdate password pengguna yang sedang login
export const userUpdatePassword = async (token: any, password: string) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ password }),
  });
};

// Fungsi untuk logout pengguna
export const userLogout = async (token: any) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/logout`, {
    method: "DELETE", // Gunakan DELETE untuk keluar/menghapus sesi
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      // Tidak ada Authorization di sini, seharusnya mungkin ada tergantung dari API Anda
    },
  });
};
