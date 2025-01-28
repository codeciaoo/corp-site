export default function SecondaryCTA() {
  return (
    <section className="w-full bg-gray-50 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl text-left lg:text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          クラウドとAIで事業成長を加速します
        </h2>
        <p className="mb-8 max-w-2xl text-base text-gray-600 lg:mx-auto lg:text-lg">
          クラウド移行からAIソリューション開発まで、豊富な実績で貴社のDXを加速。
          <br />
          初回無料相談で具体的な改善提案をご提示します。
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex min-w-[200px] items-center justify-center rounded-md bg-[#00A497] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#008E82] focus:outline-none focus:ring-2 focus:ring-[#00A497] focus:ring-offset-2"
          >
            無料相談を予約する
          </a>
          {/* <a
            href="#case-studies"
            className="inline-flex min-w-[200px] items-center justify-center rounded-md border border-[#00A497] px-6 py-3 text-base font-medium text-[#00A497] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00A497] focus:ring-offset-2"
          >
            事例を見る
          </a> */}
        </div>
      </div>
    </section>
  );
}
