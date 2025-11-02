import { useEffect, useState } from 'react';
import {
  Users,
  Target,
  Package,
  Award,
  Play,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import team1 from '../pictures/team1.jpg';
import team2 from '../pictures/team2.jpg';
import team3 from '../pictures/team3.jpg';
import team4 from '../pictures/team4.jpg';
import ai from '../pictures/ai.gif';

export function HomePage() {
  const [stats, setStats] = useState([]);
  const [team] = useState([
    {
      id: '1',
      name: 'Dindeswara seetaramasai',
      role: 'Frontend Developer',
      expertise: 'React, UI/UX design, and seamless user interactions',
      fun_fact: 'Can turn ideas into pixel-perfect experiences!',
      image_url: team3
    },
    {
      id: '2',
      name: 'Ankita',
      role: 'UI/UX Designer',
      expertise: 'Branding and Animation',
      fun_fact: 'Sketches every idea before coding!',
      image_url: team2
    },
    {
      id: '3',
      name: 'Sohan',
      role: 'Project Manager and AI Engineer',
      expertise: 'Team leadership and AI Engineer',
      fun_fact: 'Always brings good vibes to meetings!',
      image_url: team1
    },
    {
      id: '4',
      name: 'Ram Charan',
      role: 'Backend Developer',
      expertise: 'API integration, database design, and server optimization',
      fun_fact: 'Turns complex backend logic into smooth user experiences!',
      image_url: team4
    },
  ]);

  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({});

  const heroAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();
  const teamAnimation = useScrollAnimation();
  const testimonialsAnimation = useScrollAnimation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [statsRes, testimonialsRes] = await Promise.all([
      supabase.from('company_stats').select('*').order('display_order'),
      supabase.from('testimonials').select('*').eq('is_featured', true).order('created_at', { ascending: false })
    ]);

    if (statsRes.data) setStats(statsRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
  };

  useEffect(() => {
    if (statsAnimation.isVisible && stats.length > 0) {
      stats.forEach(stat => {
        let current = 0;
        const increment = Math.ceil(stat.value / 50);
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({ ...prev, [stat.id]: current }));
        }, 30);
      });
    }
  }, [statsAnimation.isVisible, stats]);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const getIcon = (iconName) => {
    const icons = { Users, Target, Package, Award };
    return icons[iconName] || Users;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* HERO SECTION */}
      <div
        ref={heroAnimation.ref}
        className={`pt-24 pb-16 px-4 transition-all duration-1000 ${
          heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                AI-Powered Sales Forecasting
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Transform your business with cutting-edge artificial intelligence. Predict sales trends, optimize inventory, and maximize profits with 99% accuracy.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg">
                  Get Free Consultation
                </button>
<div class="relative inline-block group">
  <button
    class="px-8 py-4 bg-[#B3AF8F] dark:bg-[#1B263B] text-[#0D1B2A] dark:text-[#E0E1DD] border-2 border-[#415A77] rounded-lg font-semibold transition-all hover:bg-[#415A77] hover:text-[#E0E1DD] hover:scale-105"
  >
    Learn More
  </button>

  <div
    class="absolute top-1/2 left-full ml-4 -translate-y-1/2 w-72 bg-[#E0E1DD] dark:bg-[#1B263B] text-[#0D1B2A] dark:text-[#E0E1DD] text-sm rounded-xl shadow-xl border border-[#B3AF8F] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 p-4 z-20"
  >
    <h3 class="font-semibold text-[#415A77] mb-1">AI Forecasting Insight</h3>
    <p class="text-[#1B263B] dark:text-[#B3AF8F] leading-relaxed">
      Our AI-powered forecasting platform helps businesses predict sales trends, 
      reduce waste, and boost profitability with over <b>99% accuracy</b>.
    </p>
  </div>
</div>

              </div>
            </div>

<div className="relative group hover:scale-105 transition-transform">
  <div className="rounded-2xl overflow-hidden shadow-2xl">
    <img
      src={ai}
      alt="AI Demo Animation"
      className="w-full h-full object-cover rounded-2xl"
    />
  </div>
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center rounded-2xl">
    <p className="text-white text-lg font-semibold mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
      AI in Action
    </p>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div
        ref={statsAnimation.ref}
        className={`py-16 bg-blue-600 dark:bg-blue-700 transition-all duration-1000 ${
          statsAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => {
              const Icon = getIcon(stat.icon);
              return (
                <div key={stat.id} className="text-center text-white">
                  <Icon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <div className="text-4xl font-bold mb-2">
                    {animatedStats[stat.id] || 0}{stat.suffix}
                  </div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div
        ref={teamAnimation.ref}
        className={`py-20 px-4 transition-all duration-1000 ${
          teamAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Industry experts with decades of combined experience in AI and business intelligence
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(member => (
              <div
                key={member.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                      hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-blue-300 text-sm mb-3">{member.role}</p>
                      <p className="text-sm mb-2 font-semibold">Expertise:</p>
                      <p className="text-sm mb-3">{member.expertise}</p>
                      <p className="text-sm italic">Fun fact: {member.fun_fact}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
