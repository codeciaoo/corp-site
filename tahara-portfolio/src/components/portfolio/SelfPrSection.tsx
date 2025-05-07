import React from "react";

interface SelfPrSectionProps {
  content: string;
}

const SelfPrSection: React.FC<SelfPrSectionProps> = ({ content }) => {
  // 改行を区切りとして配列に変換
  const prLines = content.split("\\n").join("\n").split("\n").filter(line => line.trim() !== "");

  return (
    <div className="mb-12">
      <h3 className="mb-6 text-2xl font-semibold text-gray-800">自己PR</h3>
      
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <ul className="list-inside space-y-3 text-gray-700">
          {prLines.map((line, index) => {
            // 先頭の「•」や「-」を削除して整形
            const cleanLine = line.replace(/^[•\-]\s*/, "");
            
            return (
              <li key={index} className="relative pl-5">
                <span className="absolute left-0 top-[0.375rem] h-1.5 w-1.5 rounded-full bg-blue-500" />
                {cleanLine}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SelfPrSection;