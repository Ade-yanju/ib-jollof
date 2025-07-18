// src/App.js
import React, { useState, useEffect, useRef } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "./assets/ibadanJollofLogo.png";

// Hero images
import gallery1 from "./assets/BeefJollofPack.png";
import gallery2 from "./assets/chicken.png";
import gallery3 from "./assets/chickenJollofpack.png";
import gallery4 from "./assets/chickenLapsOrWings.png";
import gallery5 from "./assets/coleslaw.png";
import gallery6 from "./assets/dodo.png";
import gallery7 from "./assets/friedFish.png";
import gallery8 from "./assets/GizzardCube.png";
import gallery9 from "./assets/jambalayapack.png";
import gallery10 from "./assets/NativeJollofPack.png";
import gallery11 from "./assets/pepperedsnail.png";
import gallery12 from "./assets/seaFood.png";
import gallery13 from "./assets/Turkey.png";

// Customer pics
import cust1 from "./assets/cust1.png";
import cust2 from "./assets/cust2.png";
import cust3 from "./assets/cust3.png";
import cust4 from "./assets/cust4.png";
import cust5 from "./assets/cust5.png";
import cust6 from "./assets/cust6.png";
import cust7 from "./assets/cust7.png";

// Theme
const RED = "#B91C1C";
const CHARCOAL = "#111111";
const WHITE = "#FFFFFF";
const LIGHT_GREEN = "#E6F4EA";

// Reusable Button
function Button({ onClick, children, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.75rem 1.5rem",
        background: RED,
        color: WHITE,
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background 0.2s",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F97316")}
      onMouseLeave={(e) => (e.currentTarget.style.background = RED)}
    >
      {children}
    </button>
  );
}

// Two-column Modal
function Modal({ open, onClose, leftPanel, rightPanel }) {
  if (!open) return null;
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div
          style={{ background: LIGHT_GREEN, padding: 32, overflowY: "auto" }}
        >
          {leftPanel}
        </div>
        <div style={{ padding: 32, position: "relative" }}>
          <button onClick={onClose} style={styles.closeButton}>
            &times;
          </button>
          {rightPanel}
        </div>
      </div>
    </div>
  );
}

// Fade-in hook
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

export default function App() {
  // Modal visibility
  const [orderOpen, setOrderOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);

  // “Home” handler
  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOrderOpen(false);
    setContactOpen(false);
    setCareerOpen(false);
  };

  // Hero carousel
  const gallery = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery12,
    gallery13,
  ];
  const [gIndex, setGIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setGIndex((i) => (i + 1) % gallery.length),
      3000
    );
    return () => clearInterval(id);
  }, [gallery.length]);

  // Testimonials
  const testimonials = [
    {
      img: cust1,
      text: "Absolutely the best jollof! Hot & flavorful.",
      name: "Aisha O.",
    },
    {
      img: cust2,
      text: "Reminds me of home. Exceptional service.",
      name: "Chidi A.",
    },
    {
      img: cust3,
      text: "Fast delivery & perfect rice texture.",
      name: "Funke L.",
    },
    {
      img: cust4,
      text: "I ordered twice in one week so good!",
      name: "Olawale C.",
    },
    {
      img: cust5,
      text: "My friends loved it. Highly recommended.",
      name: "Demilade A.",
    },
    {
      img: cust6,
      text: "Consistently excellent every time!",
      name: "Emeka N.",
    },
    { img: cust7, text: "Best food business service.", name: "Fabunmi Favour" },
  ];
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  // Pricing + labels
  const jPrices = { 1: 0, 2: 3500, 3: 3500, 4: 2000, 5: 2000, 6: 2000 };
  const jLabels = {
    1: "None",
    2: "Jambalaya Jollof",
    3: "Sea Food Jollof",
    4: "Native Jollof",
    5: "Beef Jollof",
    6: "Chicken Jollof",
  };
  const pPrices = {
    1: 0,
    2: 1200,
    3: 2500,
    4: 1700,
    5: 1500,
    6: 2000,
    7: 1200,
    8: 600,
  };
  const pLabels = {
    1: "None",
    2: "Fried Fish",
    3: "Turkey",
    4: "Peppered Snail",
    5: "Gizzard",
    6: "Chicken Wings",
    7: "Chicken",
    8: "Beef",
  };
  const sPrices = { none: 0, coleslaw: 1000, dodo: 1000, moimoi: 1200 };
  const dPrices = {
    none: 0,
    water: 200,
    coke: 500,
    fanta: 500,
    malt: 700,
    chapman: 800,
    tigernut: 1500,
    yoghurt: 1000,
  };

  // Form state
  const [jId, setJId] = useState(1),
    [jQty, setJQty] = useState(1);
  const [pId, setPId] = useState(1),
    [pQty, setPQty] = useState(1);
  const [side, setSide] = useState("none"),
    [sideQty, setSideQty] = useState(0);
  const [drink, setDrink] = useState("none"),
    [drinkQty, setDrinkQty] = useState(0);

  // Cart
  const [cart, setCart] = useState([]);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartVat = Math.round(cartSubtotal * 0.0);
  const cartTotal = cartSubtotal + cartVat;

  // Add to cart
  const addToCart = () => {
    if (jQty > 0)
      setCart((c) => [
        ...c,
        { label: jLabels[jId], price: jPrices[jId], qty: jQty },
      ]);
    if (pQty > 0)
      setCart((c) => [
        ...c,
        { label: pLabels[pId], price: pPrices[pId], qty: pQty },
      ]);
    if (side !== "none" && sideQty > 0)
      setCart((c) => [
        ...c,
        {
          label: side.charAt(0).toUpperCase() + side.slice(1),
          price: sPrices[side],
          qty: sideQty,
        },
      ]);
    if (drink !== "none" && drinkQty > 0)
      setCart((c) => [
        ...c,
        {
          label: drink.charAt(0).toUpperCase() + drink.slice(1),
          price: dPrices[drink],
          qty: drinkQty,
        },
      ]);
    setJId(1);
    setJQty(1);
    setPId(1);
    setPQty(1);
    setSide("none");
    setSideQty(0);
    setDrink("none");
    setDrinkQty(0);
  };
  const removeFromCart = (idx) => setCart((c) => c.filter((_, i) => i !== idx));

  // Confirm via WhatsApp
  const submitOrder = (e) => {
    e.preventDefault();
    if (!cart.length) return;
    let msg = "Order:\n";
    cart.forEach((i) => (msg += `• ${i.label} x${i.qty}\n`));
    msg += `Subtotal: ₦${cartSubtotal}\nVAT: ₦${cartVat}\nTotal: ₦${cartTotal}`;
    const enc = encodeURIComponent(msg),
      link = /Android|iPhone/.test(navigator.userAgent)
        ? `whatsapp://send?phone=2347074360740&text=${enc}`
        : `https://wa.me/2347074360740?text=${enc}`;
    window.location.href = link;
  };

  // Contact form
  const submitContact = (e) => {
    e.preventDefault();
    const { subject, message } = e.target;
    window.location.href = `mailto:ibjollof@outlook.com?subject=${encodeURIComponent(
      subject.value
    )}&body=${encodeURIComponent(message.value)}`;
  };

  // Careers form
  const [jobRole, setJobRole] = useState("Chef"),
    [appName, setAppName] = useState(""),
    [appEmail, setAppEmail] = useState(""),
    [appExp, setAppExp] = useState("");
  const [careerSent, setCareerSent] = useState(false);
  const submitCareer = (e) => {
    e.preventDefault();
    setCareerSent(true);
  };

  // Fade-in refs
  const [whyRef, whyVis] = useFadeIn();
  const [aboutRef, aboutVis] = useFadeIn();
  const [testRef, testVis] = useFadeIn();
  const [footRef, footVis] = useFadeIn();

  // Hover helper
  function attachHover(style) {
    return {
      style,
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      },
    };
  }

  // WhatsApp community link (mobile app vs. web)
  // Replace your old communityLink logic with this:
  const communityLink = "https://chat.whatsapp.com/FU6YGHaEiMpGrj79STqY6k";

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#fafafa",
        color: CHARCOAL,
      }}
    >
      {/* NAV */}
      <nav style={{ ...styles.nav, background: CHARCOAL }}>
        <img src={logo} alt="" style={{ height: 36 }} />
        <div>
          <a onClick={goHome} style={styles.link}>
            Home
          </a>
          <a
            onClick={() => {
              setOrderOpen(true);
              setContactOpen(false);
              setCareerOpen(false);
            }}
            style={styles.link}
          >
            Order
          </a>
          <a
            onClick={() => {
              setOrderOpen(false);
              setContactOpen(true);
              setCareerOpen(false);
            }}
            style={styles.link}
          >
            Contact
          </a>
          <a
            onClick={() => {
              setOrderOpen(false);
              setContactOpen(false);
              setCareerOpen(true);
            }}
            style={styles.link}
          >
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
          <div style={{ marginTop: 24 }}>
            <Button
              onClick={() => setOrderOpen(true)}
              style={{ marginRight: 16 }}
            >
              Order Food
            </Button>
            <Button onClick={() => setContactOpen(true)}>Contact Us</Button>
          </div>
        </div>
        <div style={styles.heroImgWrap}>
          <img src={gallery[gIndex]} alt="" style={styles.heroImg} />
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
        <div style={styles.grid3}>
          {[
            [
              "🌿",
              "Friendly environment",
              "A welcoming, inclusive atmosphere.",
            ],
            ["🛒", "Simple ordering", "Order with one click."],
            ["🚚", "Swift delivery", "Right to your door."],
            ["😋", "Best taste", "Nutritious & flavorful meals."],
            ["🎉", "Sponsor events", "Supporting community initiatives."],
            ["📞", "24/7 support", "Dedicated customer help anytime."],
          ].map(([icon, title, desc], i) => (
            <div
              key={i}
              {...attachHover({
                padding: 24,
                border: "1px solid #eee",
                borderRadius: 8,
                textAlign: "center",
                transition: "0.2s",
                cursor: "pointer",
              })}
            >
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
            sides & drinks, delivered hot and fresh.
          </p>
          <Button onClick={() => setOrderOpen(true)} style={{ marginTop: 24 }}>
            Order Food
          </Button>
        </div>
        <div style={styles.aboutImgWrap}>
          <img src={gallery[gIndex]} alt="" style={styles.heroImg} />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        ref={testRef}
        style={{ ...styles.section, opacity: testVis ? 1 : 0 }}
      >
        <h2 style={styles.sectionTitle}>
          What <span style={{ color: RED }}>Our Customers Say</span>
        </h2>
        <div style={styles.grid3}>
          {testimonials.slice(tIndex, tIndex + 3).map((c, i) => (
            <div
              key={i}
              {...attachHover({
                padding: 24,
                border: "1px solid #eee",
                borderRadius: 8,
                transition: "0.2s",
                cursor: "pointer",
              })}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img
                  src={c.img}
                  alt=""
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <strong>{c.name}</strong>
                  <br />
                  <small style={{ color: RED }}>Ibadan, Nigeria</small>
                </div>
              </div>
              <p style={{ margin: "16px 0", lineHeight: 1.6 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        ref={footRef}
        style={{
          ...styles.footer,
          background: CHARCOAL,
          opacity: footVis ? 1 : 0,
        }}
      >
        <img src={logo} alt="" style={{ height: 40, marginBottom: 16 }} />
        <div style={{ marginBottom: 16 }}>
          ibjollof@outlook.com | +234 707 436 0740
        </div>
        <div style={{ display: "inline-flex", gap: 16, marginBottom: 16 }}>
          <a
            href="https://instagram.com/ibjollof"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} style={styles.iconHover} />
          </a>
          {/* <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size={20} style={styles.iconHover} />
          </a> */}
          <a
            href="https://twitter.com/IbadanJollof"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={20} style={styles.iconHover} />
          </a>
        </div>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          © 2025 IbJollof. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp community button */}
      <a
        href={communityLink}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsappBtn}
      >
        <FaWhatsapp size={32} />
      </a>

      {/* ORDER MODAL */}
      <Modal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        leftPanel={
          <>
            <h2 style={{ marginTop: 0, color: RED }}>Your Cart</h2>
            {cart.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <ul
                style={{ paddingLeft: 20, maxHeight: 300, overflowY: "auto" }}
              >
                {cart.map((it, i) => (
                  <li
                    key={i}
                    style={{
                      margin: "8px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <strong>{it.label}</strong> x{it.qty} ₦{it.price * it.qty}
                    </span>
                    <button
                      onClick={() => removeFromCart(i)}
                      style={{
                        background: "none",
                        border: "none",
                        color: RED,
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <div>Subtotal: ₦{cartSubtotal}</div>
              <div>VAT (7.5%): ₦{cartVat}</div>
              <div style={{ fontWeight: "bold", fontSize: 18 }}>
                Total: ₦{cartTotal}
              </div>
            </div>
            <Button
              onClick={submitOrder}
              style={{ marginTop: 16, width: "100%" }}
            >
              Confirm on WhatsApp
            </Button>
          </>
        }
        rightPanel={
          <>
            <h2 style={{ marginTop: 0, color: RED }}>
              Customize & Add to Cart
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Jollof */}
              <label style={styles.label}>Jollof Package</label>
              <div style={styles.row}>
                <select
                  value={jId}
                  onChange={(e) => setJId(+e.target.value)}
                  style={styles.select}
                >
                  {Object.entries(jLabels).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label} ₦{jPrices[id]}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={jQty}
                  onChange={(e) => setJQty(+e.target.value)}
                  style={styles.qty}
                />
              </div>

              {/* Protein */}
              <label style={styles.label}>Protein</label>
              <div style={styles.row}>
                <select
                  value={pId}
                  onChange={(e) => setPId(+e.target.value)}
                  style={styles.select}
                >
                  {Object.entries(pLabels).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label} ₦{pPrices[id]}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={pQty}
                  onChange={(e) => setPQty(+e.target.value)}
                  style={styles.qty}
                />
              </div>

              {/* Side */}
              <label style={styles.label}>Side</label>
              <div style={styles.counterRow}>
                <select
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                  style={styles.select}
                >
                  {Object.entries(sPrices).map(([k, v]) => (
                    <option key={k} value={k}>
                      {k === "none"
                        ? "None"
                        : `${k.charAt(0).toUpperCase() + k.slice(1)}  ₦${v}`}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setSideQty((q) => Math.max(0, q - 1))}
                  style={styles.counterBtn}
                >
                  –
                </button>
                <span style={styles.counterDisplay}>{sideQty}</span>
                <button
                  type="button"
                  onClick={() => setSideQty((q) => q + 1)}
                  style={styles.counterBtn}
                >
                  +
                </button>
              </div>

              {/* Drink */}
              <label style={styles.label}>Drink</label>
              <div style={styles.counterRow}>
                <select
                  value={drink}
                  onChange={(e) => setDrink(e.target.value)}
                  style={styles.select}
                >
                  {Object.entries(dPrices).map(([k, v]) => (
                    <option key={k} value={k}>
                      {k === "none"
                        ? "None"
                        : `${k.charAt(0).toUpperCase() + k.slice(1)}  ₦${v}`}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setDrinkQty((q) => Math.max(0, q - 1))}
                  style={styles.counterBtn}
                >
                  –
                </button>
                <span style={styles.counterDisplay}>{drinkQty}</span>
                <button
                  type="button"
                  onClick={() => setDrinkQty((q) => q + 1)}
                  style={styles.counterBtn}
                >
                  +
                </button>
              </div>

              <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                <Button onClick={addToCart} style={{ flex: 1 }}>
                  Add to Cart
                </Button>
              </div>
            </form>
          </>
        }
      />

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
              <label style={styles.label}>Subject</label>
              <input
                name="subject"
                type="text"
                required
                style={styles.fullInput}
              />
              <label style={{ ...styles.label, marginTop: 12 }}>Message</label>
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
            <div style={{ textAlign: "center", paddingTop: 48 }}>
              <h3 style={{ color: RED }}>✅ Sent!</h3>
              <p>Thanks! We’ll be in touch soon.</p>
              <Button onClick={() => setCareerOpen(false)}>Close</Button>
            </div>
          ) : (
            <>
              <h2 style={{ marginTop: 0, color: RED }}>Apply Now</h2>
              <form onSubmit={submitCareer}>
                <label style={styles.label}>Position</label>
                <select
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  style={styles.fullInput}
                >
                  <option>Chef</option>
                  <option>Customer Support</option>
                </select>
                <label style={{ ...styles.label, marginTop: 12 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  required
                  style={styles.fullInput}
                />
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={appEmail}
                  onChange={(e) => setAppEmail(e.target.value)}
                  required
                  style={styles.fullInput}
                />
                <label style={styles.label}>Years of Experience</label>
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
            </>
          )
        }
      />
    </div>
  );
}

// Shared styles
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
  heroText: { flex: "1 1 400px", maxWidth: 600 },
  heroImgWrap: {
    flex: "1 1 400px",
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
  grid3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 },
  about: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "4rem 2rem",
    gap: "2rem",
    transition: "opacity 0.8s",
  },
  aboutText: { flex: "1 1 400px", maxWidth: 600 },
  aboutImgWrap: { flex: "1 1 400px", maxWidth: 600 },
  footer: {
    color: WHITE,
    textAlign: "center",
    transition: "opacity 0.8s",
    padding: "3rem 2rem",
  },
  iconHover: { transition: "color 0.2s" },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: WHITE,
    borderRadius: 12,
    width: "90%",
    maxWidth: 700,
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: 400,
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
  row: { display: "flex", gap: 12, alignItems: "center", margin: "8px 0" },
  select: {
    flex: 2,
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    width: "100%",
  },
  qty: { width: 72, padding: 8, borderRadius: 4, border: "1px solid #ccc" },
  label: { fontWeight: "bold", display: "block", marginTop: 16 },
  counterRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 4,
    border: "1px solid #ccc",
    background: WHITE,
    cursor: "pointer",
    fontSize: "1.25rem",
    lineHeight: 1,
  },
  counterDisplay: { minWidth: 24, textAlign: "center" },
  fullInput: {
    width: "100%",
    padding: 8,
    margin: "8px 0",
    borderRadius: 4,
    border: "1px solid #ccc",
  },
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
