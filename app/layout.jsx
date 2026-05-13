import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Studiova",
  description: "Studiova website",
};

const loaderStyles = `
  html { scroll-behavior: smooth; }
  #home, #about, #projects, #services, #contact { scroll-margin-top: 90px; }
  .contact-form-wrap iframe {
    display: block;
    width: 100%;
    border: 0;
    background: #fff;
    border-radius: 16px;
  }
  .contact-thank-you {
    position: fixed;
    inset: 0;
    background: rgba(31, 42, 46, 0.6);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9998;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.35s ease, visibility 0.35s ease;
    padding: 20px;
  }
  .contact-thank-you.show {
    opacity: 1;
    visibility: visible;
  }
  .contact-thank-you-card {
    background: #fff;
    border-radius: 20px;
    padding: 48px 36px;
    max-width: 440px;
    width: 100%;
    text-align: center;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
    transform: translateY(20px) scale(0.98);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .contact-thank-you.show .contact-thank-you-card {
    transform: translateY(0) scale(1);
  }
  .contact-thank-you-icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: var(--bs-primary, #C1FF72);
    color: #1F2A2E;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 36px;
    line-height: 1;
  }
  .contact-thank-you h3 {
    margin: 0 0 12px;
    color: #1F2A2E;
    font-weight: 700;
  }
  .contact-thank-you p {
    margin: 0 0 24px;
    color: #4a5358;
    font-size: 1rem;
    line-height: 1.5;
  }
  .contact-thank-you button {
    background: #1F2A2E;
    color: #fff;
    border: 0;
    border-radius: 999px;
    padding: 12px 28px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .contact-thank-you button:hover {
    background: #2c3a3f;
  }
  .page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #1F2A2E;
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease, visibility 0.5s ease;
  }
  .page-loader img {
    width: 96px;
    height: 96px;
    display: block;
    animation: spin 1s linear infinite;
  }
  .page-loader.loaded {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  body.loader-active {
    overflow: hidden;
  }
`;

const loaderScript = `
  (function () {
    var body = document.body;
    if (body) body.classList.add('loader-active');
    var start = Date.now();
    var minDelay = 800;
    var hidden = false;
    function hide() {
      if (hidden) return;
      hidden = true;
      var wait = Math.max(0, minDelay - (Date.now() - start));
      setTimeout(function () {
        var l = document.getElementById('page-loader');
        if (l) l.classList.add('loaded');
        if (document.body) document.body.classList.remove('loader-active');
      }, wait);
    }
    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide);
    }
    setTimeout(hide, 6000);
  })();
`;

const contactFormScript = `
  (function () {
    function init() {
      var iframe = document.getElementById('contact-form-iframe');
      var modal = document.getElementById('contact-thank-you');
      if (!iframe || !modal) return;
      var loads = 0;
      iframe.addEventListener('load', function () {
        loads++;
        if (loads > 1) {
          modal.classList.add('show');
        }
      });
      modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target.matches('[data-thank-you-close]')) {
          modal.classList.remove('show');
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') modal.classList.remove('show');
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
`;

const dropdownScript = `
  (function () {
    function closeAll() {
      document.querySelectorAll('.dropdown-menu.show').forEach(function (m) {
        m.classList.remove('show');
        m.removeAttribute('data-bs-popper');
      });
      document.querySelectorAll('[data-bs-toggle="dropdown"][aria-expanded="true"]').forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
      });
    }
    function init() {
      document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function (toggle) {
        if (toggle.dataset.ddInit) return;
        toggle.dataset.ddInit = '1';
        toggle.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var menu = toggle.parentElement && toggle.parentElement.querySelector('.dropdown-menu');
          if (!menu) return;
          var wasOpen = menu.classList.contains('show');
          closeAll();
          if (!wasOpen) {
            menu.classList.add('show');
            menu.setAttribute('data-bs-popper', 'static');
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
      });
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown-menu') && !e.target.closest('[data-bs-toggle="dropdown"]')) {
          closeAll();
        }
      });
      document.addEventListener('click', function (e) {
        if (e.target.closest('.dropdown-menu .btn-close') || e.target.closest('.dropdown-menu a')) {
          closeAll();
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAll();
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="image/png" href="/assets/images/logos/favicon.svg" />
        <link rel="stylesheet" href="/assets/libs/owl.carousel/dist/assets/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/libs/aos-master/dist/aos.css" />
        <link rel="stylesheet" href="/assets/css/styles.css" />
        <style dangerouslySetInnerHTML={{ __html: loaderStyles }} />
      </head>
      <body suppressHydrationWarning className="loader-active">
        <div id="page-loader" className="page-loader">
          <img src="/assets/images/svgs/primary-leaf.svg" alt="Loading" width="96" height="96" />
        </div>
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
        <script dangerouslySetInnerHTML={{ __html: dropdownScript }} />
        <script dangerouslySetInnerHTML={{ __html: contactFormScript }} />
        {children}
        <div id="contact-thank-you" className="contact-thank-you" role="dialog" aria-modal="true" aria-hidden="true">
          <div className="contact-thank-you-card">
            <div className="contact-thank-you-icon" aria-hidden="true">&#10003;</div>
            <h3>Thank you for getting in contact</h3>
            <p>We&rsquo;ve received your message and will get back in touch shortly.</p>
            <button type="button" data-thank-you-close>Close</button>
          </div>
        </div>
        <Script src="/assets/libs/jquery/dist/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/assets/libs/owl.carousel/dist/owl.carousel.min.js" strategy="beforeInteractive" />
        <Script src="/assets/libs/aos-master/dist/aos.js" strategy="beforeInteractive" />
        <Script src="/assets/js/custom.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
