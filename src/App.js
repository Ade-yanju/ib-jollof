// src/App.js
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import logo from "./assets/ibadanJollofLogo.png";
import steamAnimation from "./steam.json";

// Partner logos
import partner1 from "./assets/Cyconet.png";
import partner2 from "./assets/pepsi.png";
import partner3 from "./assets/Glovo.png";
import partner4 from "./assets/dreamers.png";

// Hero & food images
import gallery1 from "./assets/BeefJollofPack.png";
import gallery2 from "./assets/chickenJollofpack.png";
import gallery3 from "./assets/chicken.png";
import gallery4 from "./assets/NativeJollofPack.png";
import gallery5 from "./assets/GizzardCube.png";
import gallery6 from "./assets/dodo.png";
import gallery7 from "./assets/coleslaw.png";
import gallery8 from "./assets/seaFood.png";
import gallery9 from "./assets/friedFish.png";
import gallery10 from "./assets/chickenLapsOrWings.png";
import gallery11 from "./assets/jambalayapack.png";
import gallery12 from "./assets/pepperedsnail.png";
import gallery13 from "./assets/Turkey.png";

// Main menu items
import main1 from "./assets/JambalayaJollof.png";
import main17 from "./assets/ChickenJollof.png";
import main18 from "./assets/SeaFoodJollof.png";
import main19 from "./assets/NativeJollof.png";
import main20 from "./assets/BeefJollof.png";
import main2 from "./assets/Chicken.png";
import main3 from "./assets/Fish.png";
import main4 from "./assets/snail.png";
import main5 from "./assets/turkey.png";
import main6 from "./assets/Gizzard.png";
import main21 from "./assets/ChickenWingss.png";
import main22 from "./assets/Beef.png";
import main7 from "./assets/Dodo.png";
import main8 from "./assets/Coleslaw.png";
import main9 from "./assets/Moi-Moi.png";
import main10 from "./assets/Coke.png";
import main11 from "./assets/tigernut.png";
import main12 from "./assets/Fanta.png";
import main13 from "./assets/Water.png";
import main14 from "./assets/Chapman.png";
import main15 from "./assets/Youghurt.png";
import main16 from "./assets/Malt.png";

// Customer testimonials
import cust1 from "./assets/cust1.png";
import cust2 from "./assets/cust2.png";
import cust3 from "./assets/cust3.png";
import cust4 from "./assets/cust4.png";
import cust5 from "./assets/cust5.png";
import cust6 from "./assets/cust6.png";
import cust7 from "./assets/cust7.png";

const RED = "#B91C1C",
  CHARCOAL = "#111",
  WHITE = "#FFF",
  LIGHT_GREEN = "#E6F4EA";

// Add full testimonials data
const testimonials = [
  {
    img: cust1,
    name: "Funke",
    location: "New Garage, Ibadan",
    text: "Absolutely loved the jollof! Flavor-packed and fresh.",
  },
  {
    img: cust2,
    name: "Adewale",
    location: "Challenge, Ibadan",
    text: "Quick delivery and the best taste I've ever had.",
  },
  {
    img: cust3,
    name: "Chidera",
    location: "Jericho, Ibadan",
    text: "Portions were generous, and the sides were delicious.",
  },
  {
    img: cust4,
    name: "Grace",
    location: "Apata, Ibadan",
    text: "My go‑to for Friday night meals. Highly recommend!",
  },
  {
    img: cust5,
    name: "Emeka",
    location: "Ring-Road, Ibadan",
    text: "Friendly service, prompt delivery, excellent food.",
  },
  {
    img: cust6,
    name: "Samuel",
    location: "Akala Express, Ibadan",
    text: "Authentic taste just like home cooking.",
  },
  {
    img: cust7,
    name: "Olawale",
    location: "Elebu, Ibadan",
    text: "Best jollof in town. I'll be ordering again!",
  },
];

function Button({ onClick, disabled, children, style = {} }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        padding: "0.75rem 1.5rem",
        background: disabled ? "#ccc" : RED,
        color: disabled ? "#666" : WHITE,
        border: "none",
        borderRadius: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "1rem",
        transition: "background 0.2s",
        ...style,
      }}
      onMouseEnter={(e) =>
        !disabled && (e.currentTarget.style.background = "#F97316")
      }
      onMouseLeave={(e) =>
        !disabled && (e.currentTarget.style.background = RED)
      }
    >
      {children}
    </button>
  );
}

function Modal({ open, onClose, leftPanel, rightPanel }) {
  if (!open) return null;
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContentTwoCol}>
        <div style={styles.modalLeft}>{leftPanel}</div>
        <div style={styles.modalRight}>
          <button onClick={onClose} style={styles.closeButton}>
            &times;
          </button>
          {rightPanel}
        </div>
      </div>
    </div>
  );
}

function useFadeIn(threshold = 0.3) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const foodItems = [
  // Jollof
  { name: "Jambalaya Rice", price: 3500, image: main1, type: "jollof" },
  { name: "Chicken Jollof", price: 2000, image: main17, type: "jollof" },
  { name: "Beef Jollof", price: 2000, image: main20, type: "jollof" },
  { name: "Sea Food Jollof", price: 3500, image: main18, type: "jollof" },
  { name: "Native Jollof", price: 2000, image: main19, type: "jollof" },
  // Proteins
  { name: "Gizzard", price: 1500, image: main6, type: "protein" },
  { name: "Fried Fish", price: 1200, image: main3, type: "protein" },
  { name: "Chicken", price: 1200, image: main2, type: "protein" },
  { name: "Peppered Snail", price: 1700, image: main4, type: "protein" },
  { name: "Turkey", price: 2500, image: main5, type: "protein" },
  { name: "Beef", price: 600, image: main22, type: "protein" },
  { name: "Chicken Wing", price: 2000, image: main21, type: "protein" },
  // Sides
  { name: "Moi-Moi", price: 1200, image: main9, type: "side" },
  { name: "Dodo", price: 1000, image: main7, type: "side" },
  { name: "Coleslaw", price: 1000, image: main8, type: "side" },
  // Drinks
  { name: "Fanta", price: 500, image: main12, type: "drink" },
  { name: "Water", price: 200, image: main13, type: "drink" },
  { name: "Tiger-Nut", price: 1500, image: main11, type: "drink" },
  { name: "Coke", price: 500, image: main10, type: "drink" },
  { name: "Malt", price: 700, image: main16, type: "drink" },
  { name: "ChapMan", price: 1000, image: main14, type: "drink" },
  { name: "Yoghurt", price: 800, image: main15, type: "drink" },
];

export default function App() {
  // Nav/modals
  const [orderOpen, setOrderOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [launchModal, setLaunchModal] = useState(false);
  const [hoursModal, setHoursModal] = useState(false);

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hoursTargetDate, setHoursTargetDate] = useState(null);

  // Cart & persistence
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const [orderHistory, setOrderHistory] = useState(
    () => JSON.parse(localStorage.getItem("orderHistory")) || []
  );
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  useEffect(
    () => localStorage.setItem("orderHistory", JSON.stringify(orderHistory)),
    [orderHistory]
  );

  // Customer info & order flow
  const [showReview, setShowReview] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // Careers form
  const [jobRole, setJobRole] = useState("Chef");
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appExp, setAppExp] = useState("");
  const [careerSent, setCareerSent] = useState(false);

  // Fade‑in
  const [whyRef, whyVis] = useFadeIn();
  const [aboutRef, aboutVis] = useFadeIn();
  const [testRef, testVis] = useFadeIn();
  const [footRef, footVis] = useFadeIn();

  // Hero carousel
  const heroGallery = [
    gallery1,
    gallery4,
    gallery2,
    gallery11,
    gallery6,
    gallery9,
    gallery3,
    gallery5,
    gallery7,
    gallery8,
    gallery10,
    gallery12,
    gallery13,
  ];
  const [gIndex, setGIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setGIndex((i) => (i + 1) % heroGallery.length),
      3000
    );
    return () => clearInterval(id);
  }, [heroGallery.length]);

  // Testimonials carousel (use full objects)
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(id);
  }, []);
  const visibleTestimonials = [0, 1, 2].map(
    (offset) => testimonials[(tIndex + offset) % testimonials.length]
  );

  // Partners carousel
  const partnerLogos = [partner1, partner2, partner3, partner4];
  const [pIndex, setPIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setPIndex((i) => (i + 1) % partnerLogos.length),
      4000
    );
    return () => clearInterval(id);
  }, []);
  const visiblePartners = [0, 1, 2].map(
    (offset) => partnerLogos[(pIndex + offset) % partnerLogos.length]
  );

  // Business‑hours & launch logic
  const launchDate = new Date(2025, 7, 1, 1, 0, 0);
  useEffect(() => {
    const now = new Date();
    if (now < launchDate) {
      setLaunchModal(true);
      startCountdown(launchDate);
    }
  }, []);
  useEffect(() => {
    if (!launchModal) return;
    const timer = setInterval(() => startCountdown(launchDate), 1000);
    return () => clearInterval(timer);
  }, [launchModal]);
  useEffect(() => {
    if (!hoursModal || !hoursTargetDate) return;
    startCountdown(hoursTargetDate);
    const timer = setInterval(() => startCountdown(hoursTargetDate), 1000);
    return () => clearInterval(timer);
  }, [hoursModal, hoursTargetDate]);

  function startCountdown(target) {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setLaunchModal(false);
      setHoursModal(false);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setCountdown({ days, hours, minutes, seconds });
  }

  // Cart operations
  const addToCart = (item) =>
    setCart((c) => {
      const found = c.find((i) => i.name === item.name);
      if (found)
        return c.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      return [...c, { ...item, qty: 1 }];
    });
  const removeFromCart = (item) =>
    setCart((c) =>
      c
        .map((i) => (i.name === item.name ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Review & confirm
  const reviewOrder = () => setShowReview(true);
  const cancelReview = () => setShowReview(false);
  const submitOrder = () => {
    setShowReceipt(true);
    setOrderHistory((h) => [
      {
        items: cart,
        total,
        date: new Date(),
        phone: customerPhone,
        address: customerAddress,
      },
      ...h,
    ]);
    setTimeout(() => {
      const lines = cart
        .map((i) => `- ${i.name} x${i.qty} = ₦${i.price * i.qty}`)
        .join("\n");
      const msg = `🧾 Order:\n${lines}\nTotal: ₦${total}\nPhone: ${customerPhone}\nAddress: ${customerAddress}`;
      window.location.href = `https://wa.me/2347074360740?text=${encodeURIComponent(
        msg
      )}`;
    }, 500);
  };

  // Contact & careers
  const submitContact = (e) => {
    e.preventDefault();
    const { subject, message } = e.target;
    window.location.href =
      `mailto:ibjollof@outlook.com?subject=${encodeURIComponent(
        subject.value
      )}` + `&body=${encodeURIComponent(message.value)}`;
  };
  const submitCareer = (e) => {
    e.preventDefault();
    setCareerSent(true);
  };

  // Helpers & nav handlers
  const now = new Date();
  const openHour = 7,
    closeHour = 19;
  const isBeforeLaunch = now < launchDate;
  const isBusinessOpen =
    !isBeforeLaunch && now.getHours() >= openHour && now.getHours() < closeHour;
  const handleOrderClick = () => {
    if (isBeforeLaunch) return setLaunchModal(true);
    if (!isBusinessOpen) {
      let nextOpen;
      if (now.getHours() < openHour) {
        nextOpen = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          openHour
        );
      } else {
        nextOpen = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          openHour
        );
      }
      setHoursTargetDate(nextOpen);
      return setHoursModal(true);
    }
    setOrderOpen(true);
  };
  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOrderOpen(false);
    setContactOpen(false);
    setCareerOpen(false);
    setShowReview(false);
    setShowReceipt(false);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#fafafa",
        color: CHARCOAL,
      }}
    >
      {/* LAUNCH MODAL */}
      <Modal
        open={launchModal}
        onClose={() => setLaunchModal(false)}
        leftPanel={
          <div style={{ textAlign: "center", padding: 24 }}>
            <h2 style={{ color: RED }}>Launching Soon!</h2>
            <p>
              We open on <strong>August 1, 2025</strong> at{" "}
              <strong>7 AM</strong> Nigerian Time.
            </p>
            <h3>
              {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
              {countdown.seconds}s
            </h3>
          </div>
        }
        rightPanel={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img src={logo} alt="Logo" style={{ width: 120 }} />
          </div>
        }
      />

      {/* HOURS MODAL */}
      <Modal
        open={hoursModal}
        onClose={() => setHoursModal(false)}
        leftPanel={
          <div style={{ textAlign: "center", padding: 24 }}>
            <h2 style={{ color: RED }}>We’re Closed</h2>
            <p>Open 7 AM–7 PM Lagos Time</p>
            <p>Next opening in:</p>
            <h3>
              {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
              {countdown.seconds}s
            </h3>
            {hoursTargetDate && (
              <p>
                {hoursTargetDate.toLocaleDateString()}{" "}
                {hoursTargetDate.toLocaleTimeString()}
              </p>
            )}
          </div>
        }
        rightPanel={<></>}
      />

      {/* NAV */}
      <nav style={{ ...styles.nav, background: CHARCOAL }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={logo} alt="Logo" style={{ height: 36 }} />
          <motion.span
            style={{ color: WHITE, fontSize: "1.25rem", fontWeight: "bold" }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Ibadan Jollof
          </motion.span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <a onClick={goHome} style={styles.link}>
            Home
          </a>
          <a onClick={handleOrderClick} style={styles.link}>
            Order
          </a>
          <a onClick={() => setContactOpen(true)} style={styles.link}>
            Contact
          </a>
          <a onClick={() => setCareerOpen(true)} style={styles.link}>
            Careers
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={{ fontSize: "2.75rem", color: RED, marginBottom: 16 }}>
            Explore Delicious African Cuisine
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
            Order a taste of Ibadan.
          </p>
          <Button
            onClick={handleOrderClick}
            disabled={!isBusinessOpen}
            style={{ marginTop: 24 }}
          >
            Order Food
          </Button>
        </div>
        <div style={styles.heroImgWrap}>
          <img src={heroGallery[gIndex]} alt="Hero" style={styles.heroImg} />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        ref={whyRef}
        style={{ ...styles.section, opacity: whyVis ? 1 : 0 }}
      >
        <h2 style={styles.sectionTitle}>
          Why <span style={{ color: RED }}>Choose Us</span>
        </h2>
        <div style={styles.whyGrid}>
          {[
            ["🌿", "Friendly environment", "A welcoming atmosphere."],
            ["🛒", "Simple ordering", "One-click checkout."],
            ["🚚", "Swift delivery", "To your door."],
            ["😋", "Best taste", "Flavorful meals."],
            ["🎉", "Sponsor events", "Community initiatives."],
            ["📞", "24/7 support", "Help anytime."],
          ].map(([icon, title, desc], i) => (
            <div key={i} style={styles.cardHover}>
              <div style={{ fontSize: "2rem" }}>{icon}</div>
              <h3 style={{ margin: "12px 0", color: CHARCOAL }}>{title}</h3>
              <p style={{ color: "#555" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        ref={aboutRef}
        style={{ ...styles.about, opacity: aboutVis ? 1 : 0 }}
      >
        <div style={styles.aboutText}>
          <h2 style={{ fontSize: "2rem", color: RED }}>About Us</h2>
          <p style={{ lineHeight: 1.6, marginTop: 16 }}>
            We craft home-style Ibadan jollof rice custom quantities, proteins,
            sides & drinks.
          </p>
          <Button onClick={handleOrderClick} style={{ marginTop: 24 }}>
            Order Food
          </Button>
        </div>
        <div style={styles.aboutImgWrap}>
          <img src={heroGallery[gIndex]} alt="About" style={styles.heroImg} />
        </div>
      </section>

      {/* PARTNERS CAROUSEL */}
      <section style={styles.partnersSection}>
        <h2 style={styles.sectionTitle}>
          Our <span style={{ color: RED }}>Partners</span>
        </h2>
        <div style={styles.partnersGrid}>
          {visiblePartners.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Partner ${i + 1}`}
              style={styles.partnerLogo}
            />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section
        ref={testRef}
        style={{ ...styles.section, opacity: testVis ? 1 : 0 }}
      >
        <h2 style={styles.sectionTitle}>
          What <span style={{ color: RED }}>Our Customers Say</span>
        </h2>
        <div style={styles.testimonialsGrid}>
          {visibleTestimonials.map((t, i) => (
            <div
              key={i}
              style={{ padding: 24, border: "1px solid #eee", borderRadius: 8 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img
                  src={t.img}
                  alt={t.name}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <strong>{t.name}</strong>
                  <br />
                  <small style={{ color: RED }}>{t.location}</small>
                </div>
              </div>
              <p style={{ margin: "16px 0", lineHeight: 1.6 }}>“{t.text}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER MODAL (LIST VIEW) */}
      <Modal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        leftPanel={
          <>
            {["jollof", "protein", "side", "drink"].map((type) => (
              <div key={type}>
                <h3
                  style={{ color: RED, marginTop: type === "jollof" ? 0 : 24 }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </h3>
                <div style={styles.foodList}>
                  {foodItems
                    .filter((i) => i.type === type)
                    .map((item) => (
                      <div
                        key={item.name}
                        style={{
                          ...styles.foodItem,
                          border: cart.find((c) => c.name === item.name)
                            ? `3px solid ${RED}`
                            : "1px solid #ccc",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={styles.image}
                        />
                        <div>
                          {item.name} ₦{item.price}
                        </div>
                        <div style={styles.qtyControls}>
                          <button onClick={() => addToCart(item)}>+</button>
                          <span>
                            {cart.find((c) => c.name === item.name)?.qty || 0}
                          </span>
                          <button
                            onClick={() => removeFromCart(item)}
                            disabled={!cart.find((c) => c.name === item.name)}
                          >
                            −
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </>
        }
        rightPanel={
          <>
            <h2 style={{ marginTop: 0, color: RED }}>Your Cart</h2>
            {cart.length === 0 ? (
              <p>No items yet.</p>
            ) : (
              <ul style={{ paddingLeft: 20 }}>
                {cart.map((i, idx) => (
                  <li key={idx} style={{ margin: "8px 0" }}>
                    {i.name} x{i.qty} = ₦{i.price * i.qty}{" "}
                    <button onClick={() => removeFromCart(i)}>🗑️</button>
                  </li>
                ))}
              </ul>
            )}
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: "bold" }}>
                Total: ₦{total}
              </div>
              <Button onClick={reviewOrder} disabled={cart.length === 0}>
                Review & Confirm
              </Button>
            </div>
          </>
        }
      />

      {/* REVIEW MODAL */}
      <Modal
        open={showReview}
        onClose={cancelReview}
        leftPanel={
          <>
            <h3 style={{ marginTop: 0 }}>Review Your Order</h3>
            <ul style={{ paddingLeft: 20 }}>
              {cart.map((i, idx) => (
                <li key={idx}>
                  {i.name} x{i.qty} = ₦{i.price * i.qty}
                </li>
              ))}
            </ul>
            <div style={{ fontWeight: "bold", marginTop: 16 }}>
              Total: ₦{total}
            </div>
          </>
        }
        rightPanel={
          <>
            <h3 style={{ marginTop: 0 }}>Your Details</h3>
            <label>Phone Number</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              style={styles.fullInput}
            />
            <label>Delivery Address</label>
            <textarea
              rows={3}
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              style={styles.fullInput}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Button onClick={submitOrder}>Send to WhatsApp</Button>
              <Button
                onClick={cancelReview}
                style={{ background: "#ccc", color: CHARCOAL }}
              >
                Cancel
              </Button>
            </div>
          </>
        }
      />

      {/* RECEIPT BANNER */}
      <AnimatePresence>
        {showReceipt && (
          <motion.div
            style={styles.receipt}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Order Confirmed ✅
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT MODAL */}
      <Modal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        leftPanel={
          <>
            <h2 style={{ marginTop: 0, color: RED }}>Contact Us</h2>
            <p style={{ lineHeight: 1.6, color: CHARCOAL }}>
              Questions or feedback? Let us know.
            </p>
          </>
        }
        rightPanel={
          <>
            <h2 style={{ marginTop: 0, color: RED }}>Send Us a Message</h2>
            <form onSubmit={submitContact}>
              <label>Subject</label>
              <input
                name="subject"
                type="text"
                required
                style={styles.fullInput}
              />
              <label style={{ marginTop: 12 }}>Message</label>
              <textarea
                name="message"
                rows={5}
                required
                style={styles.fullInput}
              />
              <Button type="submit" style={{ marginTop: 16, width: "100%" }}>
                Send Email
              </Button>
            </form>
          </>
        }
      />

      {/* CAREERS MODAL */}
      <Modal
        open={careerOpen}
        onClose={() => setCareerOpen(false)}
        leftPanel={
          <>
            <h2 style={{ marginTop: 0, color: RED }}>Join Our Team</h2>
            <p style={{ lineHeight: 1.6, color: CHARCOAL }}>
              We’re hiring! Fill in your application.
            </p>
          </>
        }
        rightPanel={
          careerSent ? (
            <div style={{ textAlign: "center", padding: 24 }}>
              <h3 style={{ color: RED }}>✅ Sent!</h3>
              <p>Thanks! We’ll be in touch.</p>
              <Button onClick={() => setCareerOpen(false)}>Close</Button>
            </div>
          ) : (
            <form onSubmit={submitCareer}>
              <label>Position</label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                style={styles.fullInput}
              >
                <option>Chef</option>
                <option>Customer Support</option>
              </select>
              <label style={{ marginTop: 12 }}>Full Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
                style={styles.fullInput}
              />
              <label>Email Address</label>
              <input
                type="email"
                value={appEmail}
                onChange={(e) => setAppEmail(e.target.value)}
                required
                style={styles.fullInput}
              />
              <label>Years of Experience</label>
              <input
                type="text"
                value={appExp}
                onChange={(e) => setAppExp(e.target.value)}
                required
                style={styles.fullInput}
              />
              <Button type="submit" style={{ marginTop: 16, width: "100%" }}>
                Submit Application
              </Button>
            </form>
          )
        }
      />

      {/* FOOTER */}
      <footer
        ref={footRef}
        style={{ ...styles.footer, opacity: footVis ? 1 : 0 }}
      >
        <img src={logo} alt="Logo" style={{ height: 40, marginBottom: 16 }} />
        <div>ibjollof@outlook.com | +234 707 436 0740</div>
        <div style={{ marginTop: 16 }}>
          <a
            href="https://instagram.com/ibjollof"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} style={styles.iconHover} />
          </a>
          <a
            href="https://twitter.com/IbadanJollof"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={20} style={styles.iconHover} />
          </a>
        </div>
      </footer>

      {/* WhatsApp button */}
      <a
        href="https://chat.whatsapp.com/FU6YGHaEiMpGrj79STqY6k"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsappBtn}
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
}

const styles = {
  nav: {
    color: WHITE,
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 2rem",
  },
  link: {
    color: WHITE,
    margin: "0 1rem",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  hero: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "4rem 2rem",
    gap: "2rem",
  },
  heroText: { flex: "1 1 300px", maxWidth: 600 },
  heroImgWrap: {
    flex: "1 1 300px",
    maxWidth: 600,
    display: "flex",
    justifyContent: "center",
  },
  heroImg: {
    width: "100%",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  section: {
    padding: "4rem 2rem",
    background: WHITE,
    transition: "opacity 0.8s",
  },
  sectionTitle: { textAlign: "center", fontSize: "2rem", marginBottom: 16 },
  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 24,
    margin: "0 auto",
    maxWidth: 900,
  },
  cardHover: {
    padding: 24,
    border: "1px solid #eee",
    borderRadius: 8,
    textAlign: "center",
    transition: "transform 0.2s,box-shadow 0.2s",
    cursor: "pointer",
  },
  about: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "4rem 2rem",
    gap: "2rem",
    transition: "opacity 0.8s",
  },
  aboutText: { flex: "1 1 300px", maxWidth: 600 },
  aboutImgWrap: { flex: "1 1 300px", maxWidth: 600 },
  partnersSection: { padding: "4rem 2rem", background: WHITE },
  partnersGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    flexWrap: "wrap",
    marginTop: 16,
  },
  partnerLogo: { width: 120, height: "auto" },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    justifyItems: "center",
    gap: 24,
    margin: "0 auto",
    maxWidth: 900,
  },
  foodList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
  },
  foodItem: {
    padding: 10,
    width: 140,
    textAlign: "center",
    borderRadius: 6,
    background: "#fff",
  },
  image: { width: "100%", height: 80, objectFit: "cover", borderRadius: 5 },
  qtyControls: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
    marginTop: 6,
  },
  fullInput: {
    width: "100%",
    padding: 8,
    margin: "4px 0",
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  receipt: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "#defade",
    textAlign: "center",
    padding: 20,
    fontSize: 18,
    fontWeight: "bold",
    borderTop: "2px solid green",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContentTwoCol: {
    display: "flex",
    width: "90%",
    maxWidth: 800,
    maxHeight: "90vh",
    background: WHITE,
    borderRadius: 12,
    overflow: "hidden",
  },
  modalLeft: {
    flex: "1 1 40%",
    background: LIGHT_GREEN,
    padding: 32,
    overflowY: "auto",
  },
  modalRight: {
    flex: "1 1 60%",
    padding: 32,
    position: "relative",
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "none",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    color: "#888",
  },
  footer: {
    background: CHARCOAL,
    color: WHITE,
    textAlign: "center",
    padding: "3rem 2rem",
    transition: "opacity 0.8s",
  },
  iconHover: { margin: "0 8px", transition: "color 0.2s" },
  whatsappBtn: {
    position: "fixed",
    bottom: 24,
    right: 24,
    background: "#25D366",
    color: WHITE,
    borderRadius: "50%",
    width: 56,
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
};
