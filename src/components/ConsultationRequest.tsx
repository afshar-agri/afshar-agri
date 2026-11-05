import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageSquare, CheckCircle, Clock, MapPin, X } from 'lucide-react';

interface ConsultationRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SavedInquiry {
  id: string;
  name: string;
  phone: string;
  location: string;
  cultivar: string;
  notes: string;
  date: string;
}

export const ConsultationRequest: React.FC<ConsultationRequestProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('قزوین - بوئین‌زهرا');
  const [cultivar, setCultivar] = useState('پسته خوشه قرمز قزوین');
  const [areaHa, setAreaHa] = useState('۵');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [inquiries, setInquiries] = useState<SavedInquiry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('afshar_agri_consultations');
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newInquiry: SavedInquiry = {
      id: Date.now().toString(),
      name,
      phone,
      location,
      cultivar,
      notes,
      date: new Intl.DateTimeFormat('fa-IR', {
        month: 'short',
        day: 'numeric',
      }).format(new Date()),
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem('afshar_agri_consultations', JSON.stringify(updated));
    } catch (err) {
      // ignore
    }

    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `سلام مهندس علی افشار عزیز\nمن ${name} هستم، باغدار پسته در منطقه ${location} (رقم: ${cultivar}، مساحت: ${areaHa} هکتار).\nدرخواست مشاوره تخصصی و برنامه کودی/سموم داشتم.\nتوضیحات: ${notes || 'بررسی وضعیت باغ و نسخه فنی'}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#d8d4c9] overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#163323] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">درخواست مشاوره تخصصی و ویزیت باغ</h3>
            <p className="text-xs text-[#a7f3d0] mt-0.5">ارتباط مستقیم با مهندس علی افشار (دانشجوی دکتری کشاورزی)</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#163323]">
                درخواست شما با موفقیت در سامانه افشار اگری ثبت شد
              </h4>
              <p className="text-xs sm:text-sm text-[#4d5e53] max-w-md mx-auto leading-relaxed">
                مهندس علی افشار به زودی با شماره <strong>{phone}</strong> تماس خواهد گرفت. 
                برای دریافت سریع‌تر پاسخ می‌توانید مستقیماً پیام را در واتساپ یا تلگرام ارسال فرمایید:
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/989123814200?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>ارسال مستقیم پیام در واتساپ</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-medium text-[#3b4b40] bg-[#f0eee9] hover:bg-[#e4e1d8] rounded-lg transition-colors"
                >
                  بستن پنجره
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#324337] mb-1.5">
                    نام و نام خانوادگی باغدار: *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: حاج رضا رضایی"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#324337] mb-1.5">
                    شماره همراه (جهت تماس): *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#324337] mb-1.5">
                    منطقه و موقعیت باغ:
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="مثال: قزوین - شال"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#324337] mb-1.5">
                    رقم غالب درختان:
                  </label>
                  <select
                    value={cultivar}
                    onChange={(e) => setCultivar(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                  >
                    <option value="پسته خوشه قرمز قزوین">پسته خوشه قرمز قزوین</option>
                    <option value="اکبری">اکبری</option>
                    <option value="کله قوچی">کله‌قوچی</option>
                    <option value="اوحدی (فندقی)">اوحدی (فندقی)</option>
                    <option value="احمد آقایی">احمد آقایی</option>
                    <option value="مخلوط و چند رقمی">چند رقمی و پیوندی</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#324337] mb-1.5">
                    مساحت باغ (هکتار):
                  </label>
                  <input
                    type="text"
                    value={areaHa}
                    onChange={(e) => setAreaHa(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#324337] mb-1.5">
                  شرح مشکل یا درخواست (آزمون خاک، توصیه کودی، طغیان پسیل یا زردی برگ‌ها):
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="توضیح دهید در حال حاضر باغ شما در چه وضعیتی است و آیا برگه آزمایش خاک یا آب دارید یا خیر..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 text-sm font-bold text-white bg-[#163323] hover:bg-[#1f4530] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#86efac]" />
                  <span>ثبت و ارسال به مهندس علی افشار</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 text-xs font-semibold text-[#4e5f53] bg-[#f0eee9] hover:bg-[#e4e1d8] rounded-xl transition-colors cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          )}

          {/* Consultation History list if any */}
          {inquiries.length > 0 && !submitted && (
            <div className="pt-4 border-t border-[#e8e5dc]">
              <div className="text-xs font-bold text-[#163323] mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>درخواست‌های اخیر شما در این مرورگر:</span>
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {inquiries.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-2 bg-[#faf9f6] rounded-lg text-[11px] text-[#4d5e53] flex justify-between">
                    <span>{item.name} - {item.location} ({item.cultivar})</span>
                    <span className="text-[#849589]">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
