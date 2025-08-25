/**
 * Pamphlet Cards Component for EmamAi Application
 * 
 * This component displays Islamic pamphlets with Material Design styling,
 * including cards with images, descriptions, and tags.
 */

import React from 'react';
import { PamphletCard } from '../../types';

interface PamphletCardsProps {
  pamphlets?: PamphletCard[];
}

/**
 * Pamphlet Cards Component - Displays Islamic pamphlets with Material Design styling
 */
export const PamphletCards: React.FC<PamphletCardsProps> = ({ pamphlets }) => {
  // Default pamphlets data following Islamic themes
  const defaultPamphlets: PamphletCard[] = [
    {
      id: 1,
      title: "دُعا صرف اللّٰه ہی سے",
      description: "قرآن و صحیح احادیث کی روشنی میں دُعا خالصتاً ایک عبادت ہے، جو صرف اللّٰه ہی سے کی جانی چاہیے۔ اللّٰه کے علاوہ کسی بھی ہستی کو غیب میں مدد کے لیے پکارنا شرکِ اکبر ہے، جو ایک ناقابلِ معافی جرم ہے۔",
      category: "Fundamentals",
      readTime: "10 min read",
      paperNumber: "Research Paper 3",
      backgroundImage: "/card1.jpeg",
      downloadUrl: "/pamphlets/five-pillars.pdf",
      tags: ["Research Paper 3"]
    },
    {
      id: 2,
      title: "واقعۂ کربلا کا حقیقی پس منظر",
      description: "صحابہ و اہل بیت دونوں کی محبت پر زور دیتے ہوئے یہ تحقیق رافضیت و ناصبیت جیسے فتنوں کا رد کرتی ہے۔ خلافتِ راشدہ اور ملوکیت کا فرق واضح کر کے سیدنا عَلِيؓ کے موقف کو حق پر مبنی قرار دیتی ہے، اور یزیدیت کو مسترد کرتے ہوئے شہادتِ حُسَيْنؓ کی ذمہ داری یزید اور اس کے گورنروں پر عائد کرتی ہے۔",
      category: "Worship",
      readTime: "15 min read",
      paperNumber: "Research Paper (5A, 5B)",
      backgroundImage: "/card2.jpeg",
      downloadUrl: "/pamphlets/prayer-guide.pdf",
      tags: ["Research Paper (5A, 5B)"]
    },
    {
      id: 3,
      title: "صبح و شام کے اذکار",
      description: "مستند احادیث کی روشنی میں یہ دستاویزات صبح و شام اور فرض نمازوں کے بعد پڑھے جانے والے مسنون اذکار کا مجموعہ ہیں، جو آفات سے حفاظت اور قلبی سکون کا ذریعہ بنتے ہیں۔",
      category: "Worship",
      readTime: "12 min read",
      paperNumber: "Research Paper 9 (A, B, C)",
      backgroundImage: "/card3.jpeg",
      downloadUrl: "/pamphlets/ramadan-guide.pdf",
      tags: ["Research Paper 9 (A, B, C)"]
    },
    {
      id: 4,
      title: "صحیح اسلامی عقائد بمقابلہ غلط اسلامی عقائد",
      description: "قرآن و صحیح احادیث کو واحد حجت مانتے ہوئے یہ تحقیق خالص توحید (صرف اللّٰه سے دُعا) کی دعوت دیتی ہے، اور علماء کی اندھی پیروی و قبر پرستی جیسے شرکیہ عقائد کو رد کرتی ہے۔",
      category: "Ethics",
      readTime: "20 min read",
      paperNumber: "Research Paper (1, 2A, 4, 6, 7)",
      backgroundImage: "/card4.jpeg",
      downloadUrl: "/pamphlets/islamic-ethics.pdf",
      tags: ["Research Paper (1, 2A, 4, 6, 7)"]
    },
    {
      id: 5,
      title: "مُکَمَّل نمازِ مُحَمَّدِي ﷺ",
      description: "یہ دستاویز صحیح احادیث کی روشنی میں رفع الیدین سمیت، تکبیرِ تحریمہ سے لے کر سلام تک مکمل نمازِ مُحَمَّدِي ﷺ کا طریقہ تفصیل سے بیان کرتی ہے۔",
      category: "Quran",
      readTime: "25 min read",
      paperNumber: "Research Paper 8",
      backgroundImage: "/card5.jpeg",
      downloadUrl: "/pamphlets/tajweed-guide.pdf",
      tags: ["Research Paper 8"]
    },
    {
      id: 6,
      title: "مسئلہ تقدیر سے متعلق 200 قرآنی آیات",
      description: "یہ قرآنی آیات واضح کرتی ہیں کہ انسان کی زندگی ایک آزمائش ہے، جہاں اسے ہدایت اور عمل کا اختیار دے کر اس کے رزق اور اخروی انجام کو اس کے اپنے اعمال کا نتیجہ بنا دیا گیا ہے۔",
      category: "History",
      readTime: "30 min read",
      paperNumber: "Research Paper 20",
      backgroundImage: "/card6.jpeg",
      downloadUrl: "/pamphlets/islamic-history.pdf",
      tags: ["Research Paper 20"]
    }
  ];

  const pamphletData = pamphlets || defaultPamphlets;

  return (
    <div className="pamphlets-container">
      <div className="pamphlets-header">
        <h2 className="pamphlets-title">Islamic Pamphlets</h2>
        <p className="pamphlets-subtitle">
          Comprehensive guides and resources for Islamic learning
        </p>
      </div>

      <div className="pamphlets-grid">
        {pamphletData.map((pamphlet) => (
          <div key={pamphlet.id} className="pamphlet-card">
            {pamphlet.backgroundImage && (
              <div 
                className="pamphlet-card-image"
                style={{ backgroundImage: `url(${pamphlet.backgroundImage})` }}
              />
            )}

            <div className="pamphlet-card-content">
              <h3 className="pamphlet-title">{pamphlet.title}</h3>
              <p className="pamphlet-description">{pamphlet.description}</p>
            </div>

            {/* Tags Section */}
            <div className="pamphlet-card-tags">
              {pamphlet.tags.map((tag, index) => (
                <span key={index} className="pamphlet-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
