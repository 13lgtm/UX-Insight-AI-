/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import ProjectsView from './views/ProjectsView';
import ImportView from './views/ImportView';
import InsightView from './views/InsightView';
import HomeView from './views/HomeView';
import PricingView from './views/PricingView';
import ReportView from './views/ReportView';
import TemplatesView from './views/TemplatesView';
import TrainingView from './views/TrainingView';
import AssetsView from './views/AssetsView';
import ProfileView from './views/ProfileView';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  if (currentView === 'home') {
    return <HomeView onNavigate={setCurrentView} />;
  }
  
  if (currentView === 'pricing') {
    return <PricingView onNavigate={setCurrentView} />;
  }

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'projects' && <ProjectsView onNavigate={setCurrentView} />}
      {currentView === 'import' && <ImportView onNavigate={setCurrentView} />}
      {currentView === 'insight' && <InsightView onNavigate={setCurrentView} />}
      {currentView === 'report' && <ReportView onNavigate={setCurrentView} />}
      {currentView === 'templates' && <TemplatesView onNavigate={setCurrentView} />}
      {currentView === 'training' && <TrainingView />}
      {currentView === 'assets' && <AssetsView />}
      {currentView === 'profile' && <ProfileView />}
      {/* Fallback for un-implemented views */}
      {!['projects', 'import', 'insight', 'home', 'pricing', 'report', 'templates', 'training', 'assets', 'profile'].includes(currentView) && (
        <div className="flex items-center justify-center h-full text-slate-500">
          <p>此页面 ({currentView}) 正在开发中...</p>
        </div>
      )}
    </Layout>
  );
}
