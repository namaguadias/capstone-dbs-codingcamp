import React from "react";

const socialIcons = {
  facebook: (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.597 1.324-1.334V1.333C24 .597 23.403 0 22.675 0z" />
    </svg>
  ),
  twitter: (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.949.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.928 2.204-4.928 4.928 0 .39.045.765.127 1.124-4.094-.205-7.725-2.165-10.158-5.144-.424.729-.666 1.577-.666 2.476 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.928-.086.627 1.956 2.444 3.379 4.6 3.419-1.68 1.318-3.809 2.105-6.102 2.105-.396 0-.787-.023-1.17-.067 2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633.962-.695 1.8-1.562 2.46-2.549z" />
    </svg>
  ),
  linkedin: (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433c-1.144 0-2.07-.927-2.07-2.07 0-1.144.926-2.07 2.07-2.07 1.144 0 2.07.926 2.07 2.07 0 1.143-.926 2.07-2.07 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  instagram: (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z" />
    </svg>
  ),
  youtube: (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M19.615 3.184c-1.403-.12-7.015-.12-7.015-.12s-5.612 0-7.015.12a3.01 3.01 0 00-2.12 2.12C3.36 5.59 3.36 8.99 3.36 8.99s0 3.4.12 4.686a3.01 3.01 0 002.12 2.12c1.403.12 7.015.12 7.015.12s5.612 0 7.015-.12a3.01 3.01 0 002.12-2.12c.12-1.286.12-4.686.12-4.686s0-3.4-.12-4.686a3.01 3.01 0 00-2.12-2.12zM10 13.5v-3l3 1.5-3 1.5z" />
    </svg>
  ),
};

export default function FooterPresenter() {
  return (
    <footer className="bg-blue-600 text-white py-10 px-6 mt-10 rounded-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
        {/* Column 1 */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold text-lg mb-2">SkinSights</h3>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Tentang Kami
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Karier
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Hubungi Kami
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Tim Editorial
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Langganan
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            SkinProtect Corporate
          </a>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold text-lg mb-2">Lainnya</h3>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Syarat & Ketentuan
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Privasi
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Iklan
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Gabung di Tim Dokter
          </a>
          <a
            href="#"
            className="hover:underline font-medium"
            style={{ color: "white" }}
          >
            Daftarkan Rumah Sakit Anda
          </a>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-semibold text-lg mb-2">Media Sosial</h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="#"
              aria-label="Facebook"
              className="bg-white text-blue-600 rounded-full p-2 hover:bg-gray-200"
            >
              {socialIcons.facebook}
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="bg-white text-blue-600 rounded-full p-2 hover:bg-gray-200"
            >
              {socialIcons.twitter}
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="bg-white text-blue-600 rounded-full p-2 hover:bg-gray-200"
            >
              {socialIcons.linkedin}
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="bg-white text-blue-600 rounded-full p-2 hover:bg-gray-200"
            >
              {socialIcons.instagram}
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="bg-white text-blue-600 rounded-full p-2 hover:bg-gray-200"
            >
              {socialIcons.youtube}
            </a>
          </div>
          <p className="font-semibold text-sm">Bagian dari SkinSights</p>
          <p className="text-sm">skinsights.com</p>
        </div>
      </div>
      <hr className="border-gray-300 my-6" />
      <p className="text-sm">Hak Cipta © 2025 SkinSights</p>
    </footer>
  );
}
