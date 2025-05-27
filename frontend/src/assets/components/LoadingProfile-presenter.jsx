import React from "react";

export default function LoadingProfilePresenter() {
  return (
    <div className="loading-profile max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow-md text-left">
      <div className="skeleton avatar"></div>
      <div className="skeleton title"></div>
      <div className="skeleton text"></div>
      <div className="skeleton text"></div>
      <div className="skeleton text short"></div>
      <div className="skeleton text"></div>
    </div>
  );
}
