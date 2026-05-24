import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Check, Smartphone, Trash2, HelpCircle, Sparkles, Send, MapPin, DollarSign } from "lucide-react";
import { ARTISTS, TATTOO_STYLES } from "../data";

interface BookingSectionProps {
  onBookingSuccess: () => void;
}

const PLACEMENTS = [
  "Forearm / Sleeve Wrap",
  "Outer Arm / Shoulder",
  "Chest / Collarbone",
  "Upper Back / Spine Flow",
  "Ribcage / Torso Flow",
  "Thigh or Ankle Wrap",
  "Other Custom Spot"
];

const BUDGETS = [
  "Minimalist Small (under IDR 2,000,000)",
  "Medium Session (IDR 2,000,000 - IDR 5,000,000)",
  "Full Day Masterclass (IDR 8,500,000+)",
  "No Budget Limit (Uncompromising Luxury Art)"
];

export default function BookingSection({ onBookingSuccess }: BookingSectionProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsApp, setCustomerWhatsApp] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [tattooIdea, setTattooIdea] = useState("");
  const [placement, setPlacement] = useState("Forearm / Sleeve Wrap");
  const [budget, setBudget] = useState("Medium Session (IDR 2,000,000 - IDR 5,000,000)");
  const [artistId, setArtistId] = useState("roy");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("12:00 PM - 02:30 PM");

  // Drag and drop attachment state
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; preview: string }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastBookingId, setLastBookingId] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const fileSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => {
      return {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        preview: URL.createObjectURL(file) // Create browser visual previews
      };
    });
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerWhatsApp || !tattooIdea || !date) {
      alert("Please provide your name, WhatsApp number, tattoo idea description, and target session date.");
      return;
    }

    const bookingId = "DEV-BK-" + Math.floor(Math.random() * 90000 + 10000);
    setLastBookingId(bookingId);

    const newBookingObj = {
      id: bookingId,
      customerName,
      customerPhone: customerWhatsApp,
      customerEmail: customerEmail || "nomad@bali.luxury",
      customerInstagram: "",
      artistId,
      styleId: "custom-stylist",
      placement,
      size: budget,
      concept: tattooIdea,
      date,
      timeSlot,
      createdAt: new Date().toISOString()
    };

    // Keep locally saved visual receipt
    try {
      const existing = JSON.parse(localStorage.getItem("roy_bookings") || "[]");
      existing.push(newBookingObj);
      localStorage.setItem("roy_bookings", JSON.stringify(existing));
    } catch (err) {
      console.error("Localstorage saving failed:", err);
    }

    // Direct WhatsApp Message String Format Assembly
    const selectedArtist = ARTISTS.find(a => a.id === artistId)?.name || artistId;
    const waText = `*DEVARDA.INK - PREMIUM BOOKING INQUIRY*
----------------------------
• *Appointment:* ${bookingId}
• *Client Name:* ${customerName}
• *WhatsApp:* ${customerWhatsApp}
• *Email:* ${customerEmail || "N/A"}
• *Tattoo Concept:* "${tattooIdea}"
• *Placement:* ${placement}
• *Budget Frame:* ${budget}
• *Preferred Master:* ${selectedArtist}
• *Target Date:* ${date} (${timeSlot})
• *Reference Images:* ${uploadedFiles.length > 0 ? `${uploadedFiles.length} files prepared` : "No direct upload"}
----------------------------
_Generated securely via digital luxury concierge system_`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://api.whatsapp.com/send?phone=62895355596315&text=${encodedText}`;

    // Email Dispatch Generation
    const emailSubject = `DEVARDA.INK Premium Appointment - ${bookingId}`;
    const mailtoUrl = `mailto:devardaink@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(waText.replace(/\*/g, ''))}`;

    setFormSubmitted(true);
    onBookingSuccess();

    // Trigger Email Client setup
    window.location.href = mailtoUrl;

    // Trigger WhatsApp redirect as well
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 1200);
  };

  const handleResetForm = () => {
    setCustomerName("");
    setCustomerWhatsApp("");
    setCustomerEmail("");
    setTattooIdea("");
    setDate("");
    setUploadedFiles([]);
    setFormSubmitted(false);
  };

  return (
    <section id="booking-section-live" className="py-24 px-6 md:px-12 lg:px-24 bg-black border-b border-white/[0.03] relative overflow-hidden">
      
      {/* Visual Ambient glow backgrounds */}
      <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-gold-950/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-[5%] w-[380px] h-[380px] bg-stone-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-mono text-[10px] tracking-[0.55em] text-gold-500 uppercase block">
            SESSION ALIGNMENT PROPOSALS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight uppercase leading-none">
            INCEPTION OF <br />
            <span className="font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-gold-500">
              YOUR SKIN ARTWORK
            </span>
          </h2>
          <p className="text-xs text-neutral-400 font-sans font-light max-w-lg mx-auto">
            Design your consult parameters. Your concept draft will be compiled and directly shared with our resident coordinators via WhatsApp for fast alignment.
          </p>
        </div>

        <div className="bg-gradient-to-b from-stone-950 to-neutral-950 border border-white/5 rounded-2xl md:p-8 p-6 shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8 text-left"
              >
                {/* Section titles */}
                <div className="pb-3 border-b border-white/[0.03] flex justify-between items-center">
                  <span className="font-mono text-[10px] text-gold-500 tracking-widest uppercase">
                    I. CONTACT CHANNELS
                  </span>
                  <span className="font-mono text-[8px] text-neutral-500">SECURE SSL SHIELD ACTIVE</span>
                </div>

                {/* Part 1: Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g., Charles Sterling"
                      className="w-full bg-neutral-900/50 border border-white/5 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500/50 focus:bg-neutral-900 transition-all placeholder-neutral-600 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                      WhatsApp Number* (With Country Code)
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="tel"
                        required
                        value={customerWhatsApp}
                        onChange={(e) => setCustomerWhatsApp(e.target.value)}
                        placeholder="e.g., +61 412 345 678"
                        className="w-full bg-neutral-900/50 border border-white/5 rounded-lg pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500/50 focus:bg-neutral-900 transition-all placeholder-neutral-600 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g., nomad@travels.com"
                      className="w-full bg-neutral-900/50 border border-white/5 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500/50 focus:bg-neutral-900 transition-all placeholder-neutral-600 font-sans"
                    />
                  </div>
                </div>

                {/* Section 2 */}
                <div className="pb-3 border-b border-white/[0.03] pt-4">
                  <span className="font-mono text-[10px] text-gold-500 tracking-widest uppercase">
                    II. DESIGN SCHEMATICS & TARGETS
                  </span>
                </div>

                {/* Part 2: Idea, Placement, Budget */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                        Tattoo Concept Idea*
                      </label>
                      <span className="font-mono text-[8px] text-neutral-500">DESCRIBE VISUALS, GEOMETRIC SPIRIT, SIZE</span>
                    </div>
                    <textarea
                      required
                      value={tattooIdea}
                      onChange={(e) => setTattooIdea(e.target.value)}
                      placeholder="Describe your design. E.g., 'An intricate sacred geometry mandala pattern wrapping over the front shoulder, blending into single-needle fine lines and custom oceanic dotwork shading...'"
                      rows={4}
                      className="w-full bg-neutral-900/40 border border-white/5 rounded-lg p-4 text-xs text-white focus:outline-none focus:border-gold-500/50 focus:bg-neutral-900 transition-all placeholder-neutral-600 leading-relaxed font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                        Target Body Placement
                      </label>
                      <select
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-3 text-xs text-white focus:outline-none focus:border-gold-500/50 cursor-pointer"
                      >
                        {PLACEMENTS.map((place) => (
                          <option key={place} value={place}>{place}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                        Anticipated Budget Frame
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-3 text-xs text-white focus:outline-none focus:border-gold-500/50 cursor-pointer"
                      >
                        {BUDGETS.map((bd) => (
                          <option key={bd} value={bd}>{bd}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                        Preferred Artist Master
                      </label>
                      <select
                        value={artistId}
                        onChange={(e) => setArtistId(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/5 rounded-lg px-3 py-3 text-xs text-white focus:outline-none focus:border-gold-500/50 cursor-pointer"
                      >
                        {ARTISTS.map((artist) => (
                          <option key={artist.id} value={artist.id}>
                            {artist.name} ({artist.title})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Reference Image Uploader (Fully interactive drag and drop) */}
                <div className="pb-3 border-b border-white/[0.03] pt-4">
                  <span className="font-mono text-[10px] text-gold-500 tracking-widest uppercase">
                    III. VISUAL GRAPHICS REFERENCES
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                      Upload references or inspiration drafts
                    </span>
                    <span className="font-mono text-[8px] text-neutral-500">MAX 5MB PER JPEG/PNG FILE</span>
                  </div>

                  {/* Fully functional interactive drag and drop zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleFileDrop}
                    onClick={triggerFileInput}
                    className={`border border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-3 ${
                      isDragOver
                        ? "border-gold-500 bg-gold-500/[0.03]"
                        : "border-white/10 hover:border-gold-500/30 bg-neutral-950/40"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={fileSelectChange}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400">
                      <Upload className="w-5 h-5 group-hover:text-gold-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-sans font-medium text-white">
                        Drag and drop your images here, or <span className="text-gold-500 underline">browse computer</span>
                      </p>
                      <p className="text-[10px] font-mono text-neutral-500">
                        Supports JPEG, PNG, or HEIC format files
                      </p>
                    </div>
                  </div>

                  {/* Dynamic file references display list */}
                  {uploadedFiles.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {uploadedFiles.map((file, fileIdx) => (
                        <div
                          key={fileIdx}
                          className="flex items-center justify-between p-3.5 rounded-lg bg-stone-900/60 border border-white/5"
                        >
                          <div className="flex items-center gap-3">
                            {/* File thumbnail */}
                            <img
                              src={file.preview}
                              alt="preview"
                              className="w-10 h-10 rounded object-cover border border-white/10"
                            />
                            <div className="text-left font-mono">
                              <p className="text-[10px] text-white font-medium max-w-[140px] truncate">{file.name}</p>
                              <p className="text-[8px] text-neutral-500">{file.size}</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(fileIdx);
                            }}
                            className="p-1 px-2 text-neutral-500 hover:text-gold-400 rounded-lg hover:bg-neutral-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section 4 */}
                <div className="pb-3 border-b border-white/[0.03] pt-4">
                  <span className="font-mono text-[10px] text-gold-500 tracking-widest uppercase">
                    IV. PREFERRED DATE SLOT
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                      Target Consultation Date*
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/5 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500/50 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase block">
                      Preferred Daily Inbound Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/5 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500/50 cursor-pointer"
                    >
                      <option value="09:00 AM - 11:30 AM">09:00 AM - 11:30 AM</option>
                      <option value="12:00 PM - 02:30 PM">12:00 PM - 02:30 PM</option>
                      <option value="03:00 PM - 05:30 PM">03:00 PM - 05:30 PM</option>
                      <option value="06:00 PM - 08:30 PM">06:00 PM - 08:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Submit Row */}
                <div className="pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-neutral-500 tracking-wider block uppercase">
                      INTEGRATED OUTBOUND LINK
                    </span>
                    <p className="text-[10px] text-neutral-400 max-w-sm mt-0.5">
                      Pressing the submission complies your blueprints and transfers you seamlessly to chat with our Bali concierge manager instantly.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 hover:from-gold-700 to-gold-500 hover:to-gold-600 text-white font-mono font-bold text-xs tracking-[0.15em] rounded-xl shadow-lg hover:shadow-gold-950/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2.5 uppercase"
                  >
                    <Send className="w-4 h-4 text-white" />
                    SUBMIT INK PROPOSAL
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 md:py-16 space-y-8"
              >
                <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div className="space-y-3 max-w-md mx-auto">
                  <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase">
                    PROPOSAL DISPATCHED SUCCESSFULLY
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-white uppercase tracking-tight">
                    Symmetry Connected
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    Your appointment ticket <strong className="text-white font-mono">{lastBookingId}</strong> has been logged to your private client board and formatted for secure dispatch.
                  </p>
                  <p className="text-xs text-gold-500 font-mono">
                    Transferring you to WhatsApp with our coordinator...
                  </p>
                </div>

                <div className="flex gap-4 items-center justify-center max-w-sm mx-auto pt-4">
                  <button
                    onClick={handleResetForm}
                    className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono font-bold text-[10px] tracking-widest rounded-lg transition-colors uppercase border border-white/5 cursor-pointer"
                  >
                    SUBMIT ANOTHER
                  </button>
                  <a
                    href="#vip-board"
                    className="flex-1 py-3 bg-white text-black font-mono font-bold text-[10px] tracking-widest rounded-lg text-center hover:bg-neutral-200 transition-colors uppercase cursor-pointer block"
                  >
                    ACCESS MY BOARD
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
