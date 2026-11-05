import React, { useState } from 'react';
import { GitBranch, Copy, Check, ExternalLink, Terminal, ShieldCheck, X, AlertTriangle, HelpCircle } from 'lucide-react';

interface GitHubPagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesGuideModal: React.FC<GitHubPagesGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'fix-404' | 'method-gh-pages' | 'method-actions'>('fix-404');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const gitPushCommands = `git init
git add .
git commit -m "Release Afshar Agri web app"
git branch -M main
git remote add origin https://github.com/aafshar268/afshar-agri.git
git push -u origin main`;

  const deployGhPagesCommand = `npm run deploy`;

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
              <h3 className="text-base font-bold">راهنمای استقرار و رفع ارور GitHub Pages</h3>
              <p className="text-xs text-[#a7f3d0] mt-0.5">حل مشکل «There isn't a GitHub Pages site here» برای مهندس علی افشار</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e5e2db] bg-[#faf9f6] px-6 pt-3 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('fix-404')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fix-404'
                ? 'border-[#942733] text-[#942733]'
                : 'border-transparent text-[#5c6e62] hover:text-[#163323]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>علت ارور ۴۰۴ و راه حل سریع</span>
          </button>

          <button
            onClick={() => setActiveTab('method-gh-pages')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'method-gh-pages'
                ? 'border-[#163323] text-[#163323]'
                : 'border-transparent text-[#5c6e62] hover:text-[#163323]'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>روش ۱: استقرار با یک دستور (npm run deploy)</span>
          </button>

          <button
            onClick={() => setActiveTab('method-actions')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'method-actions'
                ? 'border-[#163323] text-[#163323]'
                : 'border-transparent text-[#5c6e62] hover:text-[#163323]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>روش ۲: استقرار با GitHub Actions</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5 text-xs text-[#2b3c31]">
          
          {/* Tab 1: Fix 404 */}
          {activeTab === 'fix-404' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#fdf5f5] rounded-xl border border-[#f5d7d9] text-xs space-y-2">
                <div className="font-bold text-[#942733] flex items-center gap-1.5 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>چرا ارور «There isn't a GitHub Pages site here» نمایش داده شد؟</span>
                </div>
                <p className="text-[#592329] leading-relaxed">
                  گیت‌هاب زمانی این پیام را نمایش می‌دهد که هنوز ریپازیتوری شما بیلد نشده باشد یا تنظیمات Pages در اکانت شما فعال نشده باشد. سه دلیل اصلی این موضوع:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-[#592329] font-medium pr-1">
                  <li>
                    <strong>ریپازیتوری به صورت Private (خصوصی) است:</strong> در اکانت‌های رایگان گیت‌هاب، سرویس GitHub Pages فقط روی ریپازیتوری‌های <strong>Public (عمومی)</strong> فعال می‌شود. اگر مخزن را Private ساختید، در Settings آن را به Public تغییر دهید.
                  </li>
                  <li>
                    <strong>کدها هنوز به گیت‌هاب Push نشده‌اند:</strong> باید فایل‌های پروژه با دستور <code className="bg-white px-1 py-0.5 rounded font-mono">git push</code> روی ریپازیتوری شما قرار بگیرند.
                  </li>
                  <li>
                    <strong>بخش GitHub Pages فعال نشده است:</strong> در گیت‌هاب باید وارد <strong>Settings &gt; Pages</strong> شوید و منبع انتشار (Source) را مشخص کنید.
                  </li>
                </ol>
              </div>

              {/* Ready config proof */}
              <div className="p-4 bg-[#eef7f1] rounded-xl border border-[#c4e6d0] flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-sm text-[#163323] block">
                    کدهای شما ۱۰۰٪ برای GitHub Pages آماده و کامپایل شده‌اند
                  </strong>
                  <p className="text-xs text-[#3b4b40] leading-relaxed">
                    فایل‌های بیلد شده درون پوشه <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#c4e6d0]">dist/</code> با مسیردهی نسبی (<code className="font-mono bg-white px-1 py-0.5 rounded border border-[#c4e6d0]">base: './'</code>) قرار دارند. تمام استایل‌ها، فونت وزیرمتن و ابزارها تست شده و بدون کوچکترین نقصی کار می‌کنند.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('method-gh-pages')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#163323] hover:bg-[#1f4530] rounded-xl transition-colors cursor-pointer"
                >
                  مشاهده سریع‌ترین روش استقرار (کلیک کنید) &larr;
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Method gh-pages */}
          {activeTab === 'method-gh-pages' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#14261c] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#163323] text-white flex items-center justify-center text-[11px]">۱</span>
                  <span>ساخت ریپازیتوری Public در گیت‌هاب:</span>
                </h4>
                <p className="text-[#4e5f53] leading-relaxed">
                  وارد سایت GitHub شوید، دکمه <strong>New Repository</strong> را بزنید، نام آن را <strong>afshar-agri</strong> بگذارید و حتماً گزینه <strong>Public</strong> را انتخاب کنید.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#14261c] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#163323] text-white flex items-center justify-center text-[11px]">۲</span>
                    <span>کامیت و ارسال کدها به گیت‌هاب:</span>
                  </h4>
                  <button
                    onClick={() => copyToClipboard(gitPushCommands, 'gitpush')}
                    className="px-2.5 py-1 text-[11px] font-semibold text-[#163323] bg-[#f0eee9] hover:bg-[#e4e1d8] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === 'gitpush' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'gitpush' ? 'کپی شد' : 'کپی دستورات'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#1e2922] text-[#86efac] rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto text-left dir-ltr">
                  {gitPushCommands}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#14261c] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#942733] text-white flex items-center justify-center text-[11px]">۳</span>
                    <span>دستور استقرار خودکار پکیج gh-pages (اضافه شده به پروژه):</span>
                  </h4>
                  <button
                    onClick={() => copyToClipboard(deployGhPagesCommand, 'deploycmd')}
                    className="px-2.5 py-1 text-[11px] font-semibold text-[#163323] bg-[#f0eee9] hover:bg-[#e4e1d8] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === 'deploycmd' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'deploycmd' ? 'کپی شد' : 'کپی دستور'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#1e2922] text-[#fde047] rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-left dir-ltr">
                  {deployGhPagesCommand}
                </pre>
                <p className="text-[11px] text-[#55665a] leading-relaxed">
                  این دستور پوشه dist را کامپایل کرده و خودکار به شاخه <code className="font-mono bg-[#f0eee9] px-1 py-0.5 rounded">gh-pages</code> ارسال می‌کند. سپس در صفحه گیت‌هاب به مسیر <strong>Settings &gt; Pages</strong> بروید و Branch را روی <strong>gh-pages</strong> بگذارید. ظرف ۱ دقیقه سایت شما بالا خواهد آمد!
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: GitHub Actions */}
          {activeTab === 'method-actions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#14261c] flex items-center gap-2">
                  <span>فایل خودکار اکشن (.github/workflows/deploy.yml):</span>
                </h4>
                <button
                  onClick={() => copyToClipboard(githubActionsWorkflow, 'actions')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#163323] bg-[#f0eee9] hover:bg-[#e4e1d8] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode === 'actions' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'actions' ? 'کپی شد' : 'کپی فایل Workflow'}</span>
                </button>
              </div>
              <p className="text-[#4e5f53] leading-relaxed">
                این فایل در پروژه شما از قبل ذخیره شده است. برای فعال‌سازی آن در سایت گیت‌هاب:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[#4e5f53]">
                <li>به بخش <strong>Settings</strong> مخزن <code className="font-mono bg-[#f0eee9] px-1 py-0.5 rounded">afshar-agri</code> بروید.</li>
                <li>از منوی کناری گزینه <strong>Pages</strong> را انتخاب کنید.</li>
                <li>در بخش <strong>Build and deployment</strong> گزینه <strong>Source</strong> را روی <strong>GitHub Actions</strong> بگذارید.</li>
              </ol>
              <pre className="p-3 bg-[#1e2922] text-[#e2e8f0] rounded-xl font-mono text-[10px] leading-relaxed max-h-44 overflow-y-auto text-left dir-ltr">
                {githubActionsWorkflow}
              </pre>
            </div>
          )}

          <div className="pt-2 flex justify-between items-center border-t border-[#e8e5dc]">
            <span className="text-[11px] text-[#637468]">
              آدرس نهایی سایت شما: <span className="font-mono font-bold text-[#163323]">https://aafshar268.github.io/afshar-agri/</span>
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-[#163323] hover:bg-[#1f4530] rounded-xl transition-colors cursor-pointer"
            >
              متوجه شدم، بستن
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
