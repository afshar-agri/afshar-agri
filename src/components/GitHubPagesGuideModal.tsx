import React, { useState } from 'react';
import { GitBranch, Copy, Check, ExternalLink, Terminal, ShieldCheck, X } from 'lucide-react';

interface GitHubPagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesGuideModal: React.FC<GitHubPagesGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const gitCommands = `git init
git add .
git commit -m "Release Afshar Agri web app"
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
              <h3 className="text-base font-bold">راهنمای انتشار پروژه روی GitHub Pages</h3>
              <p className="text-xs text-[#a7f3d0] mt-0.5">آماده‌سازی مخزن «afshar-agri» برای مهندس علی افشار</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-xs text-[#2b3c31]">
          
          {/* Status banner */}
          <div className="p-4 bg-[#eef7f1] rounded-xl border border-[#c4e6d0] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#2b5d43] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-sm text-[#163323] block">
                تنظیمات معماری برای GitHub Pages انجام شد
              </strong>
              <p className="text-xs text-[#3b4b40] leading-relaxed">
                در فایل <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#c4e6d0]">vite.config.ts</code> ویژگی <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#c4e6d0]">base: './'</code> تنظیم شده است. 
                این یعنی خروجی شما کامپوننت‌ها و استایل‌ها را با مسیرهای نسبی بارگذاری می‌کند و در آدرس <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#c4e6d0]">https://aafshar268.github.io/afshar-agri/</code> بدون هیچ خطای 404 یا قطعی استایل اجرا خواهد شد.
              </p>
            </div>
          </div>

          {/* Step 1: Create repo */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#14261c] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#163323] text-white flex items-center justify-center text-[11px]">۱</span>
              <span>ایجاد ریپازیتوری در گیت‌هاب:</span>
            </h4>
            <p className="text-[#4e5f53] leading-relaxed">
              وارد گیت‌هاب شوید و یک مخزن عمومی یا خصوصی جدید با نام <strong>afshar-agri</strong> بسازید.
            </p>
          </div>

          {/* Step 2: Push code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#14261c] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#163323] text-white flex items-center justify-center text-[11px]">۲</span>
                <span>دستورات کامیت و پوش به گیت‌هاب:</span>
              </h4>
              <button
                onClick={() => copyToClipboard(gitCommands, 'git')}
                className="px-2.5 py-1 text-[11px] font-semibold text-[#163323] bg-[#f0eee9] hover:bg-[#e4e1d8] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedCode === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === 'git' ? 'کپی شد' : 'کپی دستورات'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#1e2922] text-[#86efac] rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto text-left dir-ltr">
              {gitCommands}
            </pre>
          </div>

          {/* Step 3: Automated GitHub Pages Deployment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#14261c] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#163323] text-white flex items-center justify-center text-[11px]">۳</span>
                <span>استقرار خودکار با GitHub Actions (پیشنهادی):</span>
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
              کافیست در ریپازیتوری خود، فایلی به آدرس <code className="font-mono bg-[#f0eee9] px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> بسازید و محتوای زیر را در آن قرار دهید:
            </p>
            <pre className="p-3 bg-[#1e2922] text-[#e2e8f0] rounded-xl font-mono text-[10px] leading-relaxed max-h-48 overflow-y-auto text-left dir-ltr">
              {githubActionsWorkflow}
            </pre>
            <p className="text-[11px] text-[#637468]">
              سپس در گیت‌هاب به مسیر <strong>Settings &gt; Pages &gt; Build and deployment &gt; Source</strong> رفته و آن را روی <strong>GitHub Actions</strong> قرار دهید. هر تغییری دهید خودکار منتشر خواهد شد!
            </p>
          </div>

          <div className="pt-2 flex justify-end">
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
