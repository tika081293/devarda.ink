import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, CheckCircle, Smartphone, Mail, Eye, Trash2 } from "lucide-react";
import { TATTOO_STYLES, ARTISTS } from "../data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preFilledData?: {
    styleId: string;
    placement: string;
    size: string;
    concept: string;
    artistId: string;
  } | null;
  onBookingSuccess: () => void;
}

const TIME_SLOTS = [
  "09:00 AM - 11:30 AM",
  "12:00 PM - 02:30 PM",
  "03:00 PM - 05:30 PM",
  "06:00 PM - 08:30 PM"
];

const PLACEMENTS = [
  "Forearm / Sleeve Wrap",
  "Outer Arm / Shoulder",
  "Chest / Collarbone",
  "Upper Back / Spine Flow",
  "Ribcage / Torso Flow",
  "Thigh or Ankle Wrap"
];

const SIZES = [
  "Small (Under 5cm)",
  "Medium Statement (5-15cm)",
  "Large Concept / Semi-Sleeve"
];

export default function BookingModal({
  isOpen,
  onClose,
  preFilledData,
  onBookingSuccess,
}: BookingModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerInstagram, setCustomerInstagram] = useState("");
  const [artistId, setArtistId] = useState("roy");
  const [styleId, setStyleId] = useState("fine-line");
  const [placement, setPlacement] = useState("Forearm / Sleeve Wrap");
  const [size, setSize] = useState("Medium Statement (5-15cm)");
  const [concept, setConcept] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("12:00 PM - 02:30 PM");

  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Synchronize prefill inputs
  useEffect(() => {
    if (preFilledData) {
      if (preFilledData.artistId) setArtistId(preFilledData.artistId);
      if (preFilledData.styleId) setStyleId(preFilledData.styleId);
      if (preFilledData.concept) setConcept(preFilledData.concept);
      if (preFilledData.placement) {
        // match list if possible
        const matchedPlace = PLACEMENTS.find(p => p.toLowerCase().includes(preFilledData.placement.toLowerCase()));
        if (matchedPlace) setPlacement(matchedPlace);
      }
      if (preFilledData.size) {
        const matchedSize = SIZES.find(s => s.toLowerCase().includes(preFilledData.size.toLowerCase()));
        if (matchedSize) setSize(matchedSize);
      }
    }
  }, [preFilledData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerEmail || !date) {
      alert("Please fill out your Name, Email, and Preferred consultation date.");
      return;
    }

    const newBooking = {
      id: "DEV-BK-" + Math.floor(Math.random() * 90000 + 10000),
      customerName,
      customerEmail,
      customerPhone,
      customerInstagram,
      artistId,
      styleId,
      placement,
      size,
      concept,
      date,
      timeSlot,
      createdAt: new Date().toISOString(),
    };

    // Save to local storage
    const existing = JSON.parse(localStorage.getItem("roy_bookings") || "[]");
    existing.push(newBooking);
    localStorage.setItem("roy_bookings", JSON.stringify(existing));

    // Email Dispatch Generation
    const selectedArtistName = ARTISTS.find(a => a.id === artistId)?.name || artistId;
    const selectedStyleName = TATTOO_STYLES.find(s => s.id === styleId)?.name || styleId;
    
    const emailSubject = `DEVARDA.INK Premium Appointment - ${newBooking.id}`;
    const emailBody = `DEVARDA.INK - PREMIUM BOOKING INQUIRY
----------------------------
• Appointment Code: ${newBooking.id}
• Client Name: ${customerName}
• Email: ${customerEmail}
• WhatsApp/Phone: ${customerPhone || "N/A"}
• Instagram: ${customerInstagram || "N/A"}
• Preferred Artist: ${selectedArtistName}
• Style: ${selectedStyleName}
• Placement: ${placement}
• Size: ${size}
• Concept: "${concept || "No description provided"}"
• Target Date: ${date} (${timeSlot})
----------------------------
Generated securely via digital luxury concierge system`;

    const mailtoUrl = `mailto:devardaink@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Trigger Email Client
    window.location.href = mailtoUrl;

    setConfirmedBooking(newBooking);
  };

  const handleDone = () => {
    // Reset fields
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setCustomerInstagram("");
    setConcept("");
    setDate("");
    setConfirmedBooking(null);
    onBookingSuccess();
    onClose();
  };

  const selectedArtist = ARTISTS.find(a => a.id === artistId);
  const selectedStyle = TATTOO_STYLES.find(s => s.id === styleId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="relative bg-stone-950 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmedBooking ? (
              // BOOKING FORM
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-amber-500 uppercase">
                    CONSULTATION REQUEST
                  </span>
                  <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white uppercase tracking-tight">
                    Secure Your Session
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans font-light mt-1">
                    Request an alignment. Our studio coordinator will review your concept prior to arrival.
                  </p>
                </div>

                {/* Form fields Grid */}
                <div className="space-y-4">
                  {/* Basic Contacts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Full Name*</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Alex Carter"
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Email Address*</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="alex@carterguide.com"
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">WhatsApp Number (Optional)</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+62 821..."
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Instagram Handle (Optional)</label>
                      <input
                        type="text"
                        value={customerInstagram}
                        onChange={(e) => setCustomerInstagram(e.target.value)}
                        placeholder="@alex.travels"
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Artwork dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Preferred Artist</label>
                      <select
                        value={artistId}
                        onChange={(e) => setArtistId(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        {ARTISTS.map(a => (
                          <option key={a.id} value={a.id}>{a.name} ({a.title})</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Tattoo Style Vibe</label>
                      <select
                        value={styleId}
                        onChange={(e) => setStyleId(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        {TATTOO_STYLES.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Placement & Dimension specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Target Body Placement</label>
                      <select
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        {PLACEMENTS.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Anticipated Canvas Size</label>
                      <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        {SIZES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Core description brief */}
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Concept Description / Personal Vision</label>
                    <textarea
                      value={concept}
                      onChange={(e) => setConcept(e.target.value)}
                      placeholder="Describe symbols, geometric layers, reference points, or the general feeling you want."
                      rows={3}
                      className="w-full bg-neutral-900 border border-white/5 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors placeholder-neutral-500"
                    />
                  </div>

                  {/* Scheduling parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Consulation Date*</label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Preferred Daily Slot</label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        {TIME_SLOTS.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit row */}
                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-sans font-light">
                    *Denotes required criteria. Slots are certified active upon coordinator contact.
                  </span>
                  
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-mono font-bold text-xs tracking-widest rounded-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 uppercase"
                  >
                    SUBMIT INK PROPOSAL
                  </button>
                </div>
              </form>
            ) : (
              // BOOKING CONFIRMATION SLIP
              <div className="text-center py-6 space-y-6">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 animate-bounce">
                  <CheckCircle className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-amber-500 uppercase">PROPOSAL GENERATED</span>
                  <h3 className="text-2xl font-sans font-extrabold text-white uppercase tracking-tight">Your Slot is Provisioned</h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    We have compiled your design sheet and synchronized it with <strong>{selectedArtist?.name}</strong>. A boutique manager will connect with you via email or WhatsApp shortly.
                  </p>
                </div>

                {/* Ticket Receipt detail panel */}
                <div className="border border-white/5 bg-neutral-900/60 rounded-xl p-5 text-left text-xs space-y-3 font-mono">
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span className="text-neutral-500">APPOINTMENT IDENTIFIER</span>
                    <strong className="text-white text-right">{confirmedBooking.id}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span className="text-neutral-500">RESERVATION GUEST</span>
                    <strong className="text-white text-right">{confirmedBooking.customerName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span className="text-neutral-500">COMMUNICATION OUTLET</span>
                    <strong className="text-white text-right font-sans">{confirmedBooking.customerEmail}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span className="text-neutral-500">ASSIGNED ARTIST</span>
                    <strong className="text-white text-right">{selectedArtist?.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span className="text-neutral-500">STENCIL STYLE</span>
                    <strong className="text-white text-right">{selectedStyle?.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span className="text-neutral-500">SCHEDULING TIMESLOT</span>
                    <strong className="text-amber-400 text-right">{confirmedBooking.date} / {confirmedBooking.timeSlot}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleDone}
                    className="px-8 py-3 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs tracking-widest rounded-lg cursor-pointer transition-colors uppercase"
                  >
                    ACCESS MY BOARD
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
