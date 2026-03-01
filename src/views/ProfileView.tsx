import React from 'react';
import { User, Mail, Shield, Bell, Key, Camera, CheckCircle2 } from 'lucide-react';

export default function ProfileView() {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="px-8 py-6 pb-2 shrink-0 border-b border-slate-200 bg-white">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">账号设置</h1>
        <p className="text-slate-500 mt-1">管理您的个人信息、安全设置和偏好。</p>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 shrink-0">
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium transition-colors">
                <User size={18} />
                个人信息
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg font-medium transition-colors">
                <Shield size={18} />
                账号安全
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg font-medium transition-colors">
                <Bell size={18} />
                通知设置
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg font-medium transition-colors">
                <Key size={18} />
                API 密钥
              </a>
            </nav>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">基本信息</h2>
                <p className="text-sm text-slate-500 mt-1">更新您的头像和个人资料。</p>
              </div>
              <div className="p-6 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md">
                      <img src="https://picsum.photos/seed/user1/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="absolute inset-0 bg-slate-900/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
                        更改头像
                      </button>
                      <button className="px-4 py-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium">
                        删除
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">支持 JPG, GIF 或 PNG 格式。最大 2MB。</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">全名</label>
                    <input type="text" defaultValue="Jason Doe" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">显示名称</label>
                    <input type="text" defaultValue="Jason" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">邮箱地址</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input type="email" defaultValue="jason.doe@example.com" className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">角色 / 职位</label>
                    <input type="text" defaultValue="资深 UX 研究员" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-green-600 font-medium opacity-0">
                  <CheckCircle2 size={18} />
                  已保存更改
                </span>
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
                  保存更改
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
