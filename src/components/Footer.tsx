const Footer = () => {
  const quickLinks = [
    { name: "サービス", path: "/services" },
    { name: "強み", path: "/strengths" },
    { name: "実績", path: "/achievements" },
    { name: "会社情報", path: "/company" },
    { name: "お問い合わせ", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 py-8 text-gray-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col space-y-8 md:flex-row md:justify-between md:space-y-0">
          <div className="text-center md:text-left">
            <a href="/" className="inline-block">
              <h3 className="mb-2 text-3xl font-bold text-white transition-colors hover:text-teal-400">
                CodeCiao
              </h3>
            </a>
            <p className="text-sm">戦略と技術で、ビジネスの未来を創造する</p>
          </div>
          <div className="text-left md:text-left">
            <h4 className="mb-3 text-lg font-semibold text-white">
              クイックリンク
            </h4>
            <ul className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
              {quickLinks.map(item => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-base transition-colors hover:text-teal-400"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
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
