import React, { useState } from 'react';
import { GitBranch, Copy, Check, ExternalLink, Terminal, ShieldCheck, AlertTriangle, HelpCircle, X, Sparkles } from 'lucide-react';

interface GitHubPagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesGuideModal: React.FC<GitHubPagesGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fix-error' | 'commands' | 'actions'>('fix-error');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const gitPushBothBranches = `git remote add origin https://github.com/aafshar268/afshar-agri.git
git push -u origin main
git push -u origin gh-pages`;

  const gitQuickPush = `git init
git config user.name "Ali Afshar"
git config user.email "aafshar268@gmail.com"
git add .
git commit -m "feat: complete Afshar Agri web application"
git branch -M main
git remote add origin https://github.com/aafshar268/afshar-agri.git
git push -u origin main`;

  const githubActionsWorkflow = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build with Vite
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-[#d8d4c9] overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#163323] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-5 h-5 text-[#86efac]" />
            <div>
              <h3 className="text-base font-bold">حل مشکل استقرار روی GitHub Pages</h3>
              <p className="text-xs text-[#a7f3d0] mt-0.5">رفع ارور «There isn't a GitHub Pages site here» - مهندس علی افشار</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#e5e2db] bg-[#faf9f6] px-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('fix-error')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'fix-error'
                ? 'border-[#942733] text-[#942733] font-bold'
                : 'border-transparent text-[#5a6d60] hover:text-[#163323]'
            }`}
          >
            علت و حل سریع ارور (مهم)
          </button>
          <button
            onClick={() => setActiveTab('commands')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'commands'
                ? 'border-[#163323] text-[#163323] font-bold'
                : 'border-transparent text-[#5a6d60] hover:text-[#163323]'
            }`}
          >
            دستورات ترمینال Git
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'actions'
                ? 'border-[#163323] text-[#163323] font-bold'
                : 'border-transparent text-[#5a6d60] hover:text-[#163323]'
            }`}
          >
            استقرار خودکار با GitHub Actions
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-xs text-[#2b3c31]">
          
          {activeTab === 'fix-error' && (
            <div className="space-y-5">
              
              {/* Alert explaining the exact error */}
              <div className="p-4 bg-[#fff1f2] rounded-xl border border-[#fecdd3] flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#942733] shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <strong className="text-sm text-[#942733] block">
                    چرا ارور «There isn't a GitHub Pages site here» رخ می‌دهد؟
                  </strong>
                  <p className="text-xs text-[#4c1d24] leading-relaxed">
                    این پیام یعنی سرورهای گیت‌هاب می‌گویند هنوز سایتی روی این آدرس منتشر نشده است. 
                    دلیل اصلی این است که <strong>کدها هنوز در حساب گیت‌هاب شما پوش (Push) نشده‌اند یا هنوز بخش Pages در تنطیمات ریپازیتوری شما فعال نشده است</strong>. 
                    چون محیط AI Studio نمی‌تواند بدون اجازه به اکانت شخصی شما وارد شود، شما باید یک‌بار مراحل زیر را در گیت‌هاب خود انجام دهید:
                  </p>
                </div>
              </div>

              {/* 3 Steps to fix */}
              <div className="space-y-3">
                
                <div className="p-4 bg-[#faf9f6] rounded-xl border border-[#e5e2db] space-y-1.5">
                  <div className="font-bold text-[#14261c] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#163323] text-white flex items-center justify-center text-[11px]">۱</span>
                    <span>۱. ساخت ریپازیتوری به صورت عمومی (Public):</span>
                  </div>
                  <p className="text-[#4b5c50] leading-relaxed">
                    در گیت‌هاب وارد شوید و ریپازیتوری <strong className="text-[#163323]">afshar-agri</strong> را بسازید. 
                    <span className="text-[#942733] font-bold"> توجه خیلی مهم:</span> حتماً حالت ریپازیتوری را روی <strong>Public</strong> بگذارید، زیرا گیت‌هاب روی اکانت‌های رایگان به ریپازیتوری‌های Private اجازه ساخت GitHub Pages نمی‌دهد!
                  </p>
                </div>

                <div className="p-4 bg-[#faf9f6] rounded-xl border border-[#e5e2db] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#14261c] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#163323] text-white flex items-center justify-center text-[11px]">۲</span>
                      <span>۲. ارسال شاخه‌ها به گیت‌هاب (Push):</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(gitPushBothBranches, 'both')}
                      className="px-2.5 py-1 text-[11px] font-semibold text-[#163323] bg-[#f0eee9] hover:bg-[#e4e1d8] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === 'both' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'both' ? 'کپی شد' : 'کپی دستور'}</span>
                    </button>
                  </div>
                  <p className="text-[#4b5c50] leading-relaxed">
                    ما شاخه آماده <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#e5e2db]">gh-pages</code> را به همراه شاخه اصلی <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#e5e2db]">main</code> در این پروژه آماده و کامیت کردیم. کافیست این دستور را در ترمینال بزنید:
                  </p>
                  <pre className="p-3 bg-[#1e2922] text-[#86efac] rounded-lg font-mono text-[11px] leading-relaxed text-left dir-ltr">
                    {gitPushBothBranches}
                  </pre>
                </div>

                <div className="p-4 bg-[#faf9f6] rounded-xl border border-[#e5e2db] space-y-2">
                  <div className="font-bold text-[#14261c] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#163323] text-white flex items-center justify-center text-[11px]">۳</span>
                    <span>۳. فعال‌سازی فوری در بخش Settings ریپازیتوری:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-[#4b5c50] leading-relaxed">
                    <li>وارد ریپازیتوری خود در آدرس <code className="font-mono text-[#163323]">github.com/aafshar268/afshar-agri</code> شوید.</li>
                    <li>تب <strong>Settings</strong> بالای صفحه را کلیک کنید.</li>
                    <li>از منوی سمت چپ، روی گزینه <strong>Pages</strong> کلیک کنید.</li>
                    <li>در بخش <strong>Branch</strong>، شاخه را روی <strong className="text-[#163323]">gh-pages</strong> و پوشه را روی <strong className="text-[#163323]">/ (root)</strong> بگذارید و دکمه <strong>Save</strong> را بزنید.</li>
                    <li>پس از ۱ الی ۲ دقیقه صفحه را ریفرش کنید؛ سایت با لینک <code className="font-mono text-[#2b5d43] font-bold">https://aafshar268.github.io/afshar-agri/</code> به صورت زنده بالا می‌آید!</li>
                  </ol>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'commands' && (
            <div className="space-y-4">
              <p className="text-[#4a5c50] leading-relaxed">
                اگر پروژه را روی کامپیوتر شخصی خود دارید یا می‌خواهید از صفر تمام فایل‌ها را ارسال کنید، از این دستورات استفاده کنید:
              </p>
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(gitQuickPush, 'quick')}
                  className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-semibold text-[#163323] bg-white hover:bg-[#f0eee9] rounded-md transition-colors flex items-center gap-1 cursor-pointer z-10 shadow-xs"
                >
                  {copiedCode === 'quick' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'quick' ? 'کپی شد' : 'کپی'}</span>
                </button>
                <pre className="p-4 bg-[#1e2922] text-[#86efac] rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto text-left dir-ltr">
                  {gitQuickPush}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-4">
              <p className="text-[#4a5c50] leading-relaxed">
                فایل ورک‌فلو <code className="font-mono bg-[#f0eee9] px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> از قبل در پروژه قرار داده شده است. با فعال کردن GitHub Actions در منوی Settings &gt; Pages، گیت‌هاب با هر تغییر شما در شاخه main به صورت کاملاً اتوماتیک پروژه را بیلد و دیپلوی می‌کند:
              </p>
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(githubActionsWorkflow, 'actions-tab')}
                  className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-semibold text-[#163323] bg-white hover:bg-[#f0eee9] rounded-md transition-colors flex items-center gap-1 cursor-pointer z-10 shadow-xs"
                >
                  {copiedCode === 'actions-tab' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'actions-tab' ? 'کپی شد' : 'کپی ورک‌فلو'}</span>
                </button>
                <pre className="p-4 bg-[#1e2922] text-[#e2e8f0] rounded-xl font-mono text-[10px] leading-relaxed max-h-56 overflow-y-auto text-left dir-ltr">
                  {githubActionsWorkflow}
                </pre>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-[#6d7f73]">
              تنظیمات base: './' در vite.config.ts از قبل اعمال شده است.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#163323] hover:bg-[#1f4530] rounded-xl transition-colors cursor-pointer"
            >
              متوجه شدم، بستن
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
