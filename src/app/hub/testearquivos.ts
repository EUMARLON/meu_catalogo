
//funcionado logout main.ts

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'hub',
    component: HubComponent,
    children: [
      { path: 'user-panel', component: UserPanelComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'reports', component: ReportsComponent }
      
    ]
  }
];