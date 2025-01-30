export default function SecondaryCTA() {
  return (
    <section className="w-full bg-gray-50 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 [word-break:keep-all] sm:text-3xl lg:text-4xl">
          <span className="inline-block">クラウドと</span>
          <span className="inline-block">AIで</span>
          <span className="inline-block">事業成長を</span>
          <span className="inline-block">加速します</span>
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 [word-break:keep-all] lg:text-lg">
          <span className="inline-block">クラウド移行から</span>
          <span className="inline-block">AIソリューション開発まで、</span>
          <span className="inline-block">豊富な実績で</span>
          <span className="inline-block">貴社のDXを加速。</span>
          <br />
          <span className="inline-block">初回無料相談で</span>
          <span className="inline-block">具体的な改善提案を</span>
          <span className="inline-block">ご提示します。</span>
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex min-w-[200px] items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm [word-break:keep-all] hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
          >
            <span className="inline-block">無料相談を</span>
            <span className="inline-block">予約する</span>
          </a>
        </div>
      </div>
    </section>
  );
}
