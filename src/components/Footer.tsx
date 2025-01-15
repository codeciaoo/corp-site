import React from "react";

const Footer: React.FC = () => {
  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isHomePage = window.location.pathname === "/";
    if (isHomePage) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const quickLinks = ["サービス", "強み", "実績", "会社情報"];

  return (
    <footer className="bg-gray-900 py-8 text-gray-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="mb-2 text-3xl font-bold text-white">CodeCiao</h3>
            <p className="text-sm">戦略と技術で、ビジネスの未来を創造する</p>
          </div>
          <div>
            <h4 className="text-md mb-1 font-semibold text-white">
              クイックリンク
            </h4>
            <ul className="flex flex-wrap justify-center space-x-4 md:justify-end">
              {quickLinks.map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:text-teal-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-md mb-2 text-left font-semibold text-white">
              お問い合わせ
            </h4>
            <a
              href="/contact"
              onClick={handleContactClick}
              className="inline-block rounded-md bg-teal-600 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-700"
            >
              お問い合わせフォームへ
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CodeCiao. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
