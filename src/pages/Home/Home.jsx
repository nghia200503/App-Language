import "./Home.css"; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 20);
  }

  useEffect(() => {
    const statsObserver = new window.IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll(".stat-number");
            counters.forEach((counter) => animateCounter(counter));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector(".statistics");
    if (statsSection) statsObserver.observe(statsSection);

    return () => statsObserver.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(
      ".benefit-card, .feature-item, .stat-card"
    );
    const handleEnter = function () {
      this.style.transform = this.classList.contains("stat-card")
        ? "scale(1.05)"
        : "translateY(-10px)";
    };
    const handleLeave = function () {
      this.style.transform = "translateY(0) scale(1)";
    };
    cards.forEach((card) => {
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const shapes = document.querySelectorAll(".floating-shape");
      shapes.forEach((shape, index) => {
        const speed = 0.5 + index * 0.2;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
          scrolled * 0.1
        }deg)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("load", () => {
      document.body.style.opacity = "1";
    });
  }, []);

  return (
    <div>
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      {/* Header */}
      <header>
        <div className="header-content">
          <h1>Chào mừng đến với LearnX</h1>
          <p>
            Nền tảng học tiếng Anh toàn diện, thông minh và hiệu quả cho mọi
            người
          </p>
        </div>
      </header>

      {/* Intro Section */}
      <section id="intro" className="intro fade-in">
        <h2>Học tiếng Anh thông minh, hiệu quả</h2>
        <p>
          LearnX được xây dựng với sứ mệnh giúp mọi người chinh phục tiếng Anh
          một cách dễ dàng, vui vẻ và hiệu quả nhất. Chúng tôi hiểu rằng mỗi
          người có tốc độ và phong cách học khác nhau – vì vậy LearnX cung cấp
          lộ trình học tập
          <strong> cá nhân hóa</strong>, phù hợp từ người mới bắt đầu đến người
          học nâng cao.
        </p>
        <p>
          Không chỉ là nơi học từ vựng và ngữ pháp, LearnX mang đến một trải
          nghiệm học ngôn ngữ toàn diện với các phương pháp hiện đại nhất, được
          hỗ trợ bởi công nghệ AI tiên tiến.
        </p>
        <em>
          "Với LearnX, tiếng Anh không còn là rào cản – mà là công cụ mở ra
          tương lai mới."
        </em>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits fade-in">
        <h2>Lợi ích nổi bật</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">📚</div>
            <h3>Kho bài học phong phú</h3>
            <p>
              Hơn 250+ bài học được xây dựng theo chuẩn CEFR quốc tế, từ cơ bản
              đến nâng cao
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🧠</div>
            <h3>Công nghệ học thông minh</h3>
            <p>
              Sử dụng flashcard và phương pháp lặp lại ngắt quãng giúp ghi nhớ
              từ vựng hiệu quả
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎤</div>
            <h3>Luyện phát âm chuẩn</h3>
            <p>
              Công nghệ nhận diện giọng nói AI giúp bạn phát âm chuẩn như người
              bản xứ
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>Phản hồi tức thì</h3>
            <p>Nhận kết quả và gợi ý cải thiện ngay lập tức sau mỗi bài tập</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h3>Theo dõi tiến độ</h3>
            <p>
              Dashboard chi tiết giúp bạn theo dõi quá trình học và điều chỉnh
              kế hoạch
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Cá nhân hóa học tập</h3>
            <p>
              AI đề xuất nội dung phù hợp dựa trên năng lực và mục tiêu của bạn
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features fade-in">
        <h2>Tính năng đặc biệt</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">💬</div>
            <div className="feature-content">
              <h3>Luyện hội thoại AI</h3>
              <p>
                Trò chuyện với AI để cải thiện kỹ năng giao tiếp trong các tình
                huống thực tế
              </p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎮</div>
            <div className="feature-content">
              <h3>Học qua game</h3>
              <p>
                Các mini-game thú vị giúp việc học trở nên vui vẻ và không nhàm
                chán
              </p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌍</div>
            <div className="feature-content">
              <h3>Cộng đồng học tập</h3>
              <p>
                Kết nối với hàng ngàn người học khác, tham gia thử thách và chia
                sẻ kinh nghiệm
              </p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <div className="feature-content">
              <h3>Học mọi lúc mọi nơi</h3>
              <p>
                Ứng dụng mobile hoạt động offline, giúp bạn học tập ngay cả khi
                không có internet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta fade-in">
        <h2>Tham gia cùng hàng ngàn người học khác</h2>
        <p>Bắt đầu hành trình chinh phục tiếng Anh của bạn ngay hôm nay!</p>
        <div className="cta-buttons">
          <button className="btn btn-secondary" onClick={handleLogin}>
            🔐 Đăng nhập
          </button>
          <button className="btn btn-accent" onClick={handleRegister}>
            📝 Đăng ký ngay
          </button>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="statistics fade-in">
        <h2>Thống kê ấn tượng</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-number" data-target="3500">
                0
              </div>
              <div className="stat-label">Từ vựng trong kho</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-number" data-target="12000">
                0
              </div>
              <div className="stat-label">Người học đang sử dụng</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-number" data-target="250">
                0
              </div>
              <div className="stat-label">Bài học đã xây dựng</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-number" data-target="20">
                0
              </div>
              <div className="stat-label">Phút học trung bình/ngày</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;