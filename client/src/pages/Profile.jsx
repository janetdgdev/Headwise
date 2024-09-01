import React from "react";
import { useState } from "react";

export function Profile() {
  const [selectedTab, setSelectedTab] = useState("one");

  return (
    <div className="content">
      <h2>Profile</h2>
      <div className="profile-tabs">
        <div className="wrapper">
          {/* Tabs */}
          <div className="tabs">
            <label
              className={`tab ${selectedTab === "one" ? "active" : ""}`}
              htmlFor="one"
              onClick={() => setSelectedTab("one")}
            >
              CSS
            </label>
            <label
              className={`tab ${selectedTab === "two" ? "active" : ""}`}
              htmlFor="two"
              onClick={() => setSelectedTab("two")}
            >
              Skills
            </label>
            <label
              className={`tab ${selectedTab === "three" ? "active" : ""}`}
              htmlFor="three"
              onClick={() => setSelectedTab("three")}
            >
              Prerequisites
            </label>
          </div>

          {/* Panels */}
          <div className="panels">
            {selectedTab === "one" && (
              <div className="panel">
                <div className="panel-title">Why Learn CSS?</div>
                <p>
                  Without CSS, every web page would be drab plain text and
                  images that flowed straight down the page. With CSS, you can
                  add color and background images and change the layout of your
                  page — your web pages can feel like works of art!
                </p>
              </div>
            )}
            {selectedTab === "two" && (
              <div className="panel">
                <div className="panel-title">Take-Away Skills</div>
                <p>
                  You will learn many aspects of styling web pages! You’ll be
                  able to set up the correct file structure, edit text and
                  colors, and create attractive layouts. With these skills,
                  you’ll be able to customize the appearance of your web pages
                  to suit your every need!
                </p>
              </div>
            )}
            {selectedTab === "three" && (
              <div className="panel">
                <div className="panel-title">Note on Prerequisites</div>
                <p>
                  We recommend that you complete Learn HTML before learning CSS.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
