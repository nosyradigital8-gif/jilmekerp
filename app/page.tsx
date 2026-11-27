'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Calculator,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  FileText,
  Hammer,
  Home,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import { calculateGableRoof, type RoofEstimate, type RoofInputs } from '../lib/roofing'

type ModuleKey = 'dashboard' | 'customers' | 'surveys' | 'projects' | 'inventory' | 'finance' | 'reports'

type Customer = { name: string; type: string; location: string; status: string; value: string }
type Project = { name: string; customer: string; status: string; progress: number; due: string; value: string }

const navGroups = [
  { label: 'Workspace', items: [
    { key: 'dashboard' as ModuleKey, label: 'Dashboard', icon: LayoutDashboard },
    { key: 'customers' as ModuleKey, label: 'Customers & Leads', icon: Users },
    { key: 'surveys' as ModuleKey, label: 'Roof Surveys', icon: ClipboardCheck },
    { key: 'projects' as ModuleKey, label: 'Projects', icon: Hammer },
  ] },
  { label: 'Operations', items: [
    { key: 'inventory' as ModuleKey, label: 'Inventory', icon: Package },
    { key: 'finance' as ModuleKey, label: 'Finance & Invoices', icon: WalletCards },
    { key: 'reports' as ModuleKey, label: 'Reports & Analytics', icon: BarChart3 },
  ] },
]

const customers: Customer[] = [
  { name: 'Apex Learning Centre', type: 'Commercial', location: 'East Legon, Accra', status: 'Qualified', value: 'GH₵ 184,600' },
  { name: 'K. Mensah Residence', type: 'Residential', location: 'Adenta, Accra', status: 'Survey scheduled', value: 'GH₵ 76,400' },
  { name: 'Nungua Retail Park', type: 'Corporate', location: 'Nungua, Accra', status: 'Quotation sent', value: 'GH₵ 342,000' },
  { name: 'Agyeman Properties', type: 'Contractor', location: 'Tema, Greater Accra', status: 'New', value: 'GH₵ 0' },
]

const projects: Project[] = [
  { name: 'Apex Learning Centre roof', customer: 'Apex Learning Centre', status: 'In progress', progress: 68, due: '18 Dec 2026', value: 'GH₵ 184,600' },
  { name: 'K. Mensah Residence', customer: 'K. Mensah Residence', status: 'Survey scheduled', progress: 18, due: '06 Jan 2027', value: 'GH₵ 76,400' },
  { name: 'Nungua Retail Park', customer: 'Nungua Retail Park', status: 'Awaiting approval', progress: 42, due: '28 Dec 2026', value: 'GH₵ 342,000' },
]

const inventory = [
  { item: 'Aluzinc roofing sheet 0.45mm', sku: 'SHT-045-AZ', stock: 128, unit: 'sheets', min: 160, value: 'GH₵ 44,800' },
  { item: 'Self-drilling roofing screws', sku: 'SCR-050-BL', stock: 920, unit: 'pcs', min: 500, value: 'GH₵ 2,760' },
  { item: 'Ridge cap 2.4m', sku: 'RID-240-GR', stock: 36, unit: 'pcs', min: 48, value: 'GH₵ 4,320' },
  { item: 'Purlin timber 2x4', sku: 'TIM-240-24', stock: 74, unit: 'lengths', min: 60, value: 'GH₵ 8,140' },
]

const revenue = [52, 68, 61, 78, 73, 88, 82, 96, 92, 104, 111, 118]
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function money(value: number) {
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', maximumFractionDigits: 0 }).format(value).replace('GHS', 'GH₵')
}

function StatusBadge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'good' | 'warn' | 'info' | 'neutral' }) {
  return <span className={`status-badge ${tone}`}><span />{children}</span>
}

function SectionTitle({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy?: string; action?: React.ReactNode }) {
  return <div className="section-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{copy && <p>{copy}</p>}</div>{action}</div>
}

function KpiCard({ label, value, delta, icon: Icon, tone }: { label: string; value: string; delta: string; icon: typeof Activity; tone: string }) {
  return <article className="kpi-card"><div className={`kpi-icon ${tone}`}><Icon size={18} /></div><div className="kpi-label">{label}</div><strong>{value}</strong><span className={delta.startsWith('-') ? 'delta negative' : 'delta'}>{delta.startsWith('-') ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}{delta}</span></article>
}

function Dashboard({ onNavigate }: { onNavigate: (key: ModuleKey) => void }) {
  return <>
    <SectionTitle eyebrow="Monday, 22 November 2026 · Africa/Accra" title="Good morning, Jilmek team." copy="See what needs attention across surveys, projects, materials and collections." action={<button className="button button-primary" onClick={() => onNavigate('surveys')}><Plus size={16} /> New survey</button>} />
    <div className="demo-banner"><ShieldCheck size={18} /><div><strong>Phase 1 demo workspace</strong><span>Sample records are shown for evaluation. Production persistence, authentication and backend permissions are not enabled yet.</span></div><button aria-label="Dismiss demo notice"><X size={15} /></button></div>
    <div className="kpi-grid"><KpiCard label="Estimated sales pipeline" value="GH₵ 603,000" delta="12.4%" icon={CircleDollarSign} tone="orange" /><KpiCard label="Collected this month" value="GH₵ 286,400" delta="8.2%" icon={WalletCards} tone="blue" /><KpiCard label="Active projects" value="08" delta="2 this week" icon={Hammer} tone="purple" /><KpiCard label="Open quotations" value="14" delta="-3.1%" icon={FileText} tone="green" /></div>
    <div className="dashboard-grid"><section className="panel revenue-panel"><div className="panel-heading"><div><span className="panel-kicker">Cash movement</span><h2>Revenue trend</h2></div><button className="select-button">This year <ChevronDown size={14} /></button></div><div className="chart-meta"><strong>GH₵ 1.28m</strong><span><ArrowUpRight size={14} /> 14.6% vs last period</span></div><div className="bar-chart">{revenue.map((height, index) => <div className="bar-column" key={monthLabels[index]}><div className="bar" style={{ height: `${height}%` }} /><small>{monthLabels[index]}</small></div>)}</div></section><section className="panel attention-panel"><div className="panel-heading"><div><span className="panel-kicker">Needs attention</span><h2>Operations pulse</h2></div><button className="icon-button"><MoreHorizontal size={17} /></button></div><div className="attention-list"><div><span className="attention-icon red"><AlertTriangle size={16} /></span><div><strong>3 low-stock items</strong><small>Ridge caps and roofing sheets need review</small></div><ChevronRight size={16} /></div><div><span className="attention-icon amber"><Clock3 size={16} /></span><div><strong>4 quotations expiring</strong><small>Follow up before the next 7 days</small></div><ChevronRight size={16} /></div><div><span className="attention-icon blue"><ClipboardCheck size={16} /></span><div><strong>2 surveys scheduled</strong><small>Tomorrow · Greater Accra region</small></div><ChevronRight size={16} /></div></div><button className="panel-link">Open operations queue <ArrowUpRight size={15} /></button></section></div>
    <div className="dashboard-grid lower"><section className="panel"><div className="panel-heading"><div><span className="panel-kicker">Delivery board</span><h2>Project progress</h2></div><button className="panel-link" onClick={() => onNavigate('projects')}>View projects <ArrowUpRight size={15} /></button></div><div className="project-list">{projects.map(project => <div className="project-row" key={project.name}><div className="project-mark">{project.name.slice(0, 1)}</div><div className="project-main"><strong>{project.name}</strong><small>{project.customer} · Due {project.due}</small></div><div className="project-progress"><div><span style={{ width: `${project.progress}%` }} /></div><b>{project.progress}%</b></div><StatusBadge tone={project.status === 'In progress' ? 'good' : project.status === 'Awaiting approval' ? 'warn' : 'info'}>{project.status}</StatusBadge></div>)}</div></section><section className="panel activity-panel"><div className="panel-heading"><div><span className="panel-kicker">Live workspace</span><h2>Recent activity</h2></div><button className="icon-button"><MoreHorizontal size={17} /></button></div><div className="activity-list"><div><span className="activity-dot orange" /><div><strong>Payment recorded</strong><small>GH₵ 48,000 · Apex Learning Centre</small></div><time>09:42</time></div><div><span className="activity-dot blue" /><div><strong>Survey added</strong><small>K. Mensah Residence · Adenta</small></div><time>08:18</time></div><div><span className="activity-dot purple" /><div><strong>Quote revised</strong><small>Nungua Retail Park · v2</small></div><time>Yesterday</time></div><div><span className="activity-dot green" /><div><strong>Stock received</strong><small>128 Aluzinc sheets · Main store</small></div><time>Yesterday</time></div></div></section></div>
  </>
}

function Customers() {
  const [query, setQuery] = useState('')
  const filtered = customers.filter(customer => `${customer.name} ${customer.location} ${customer.status}`.toLowerCase().includes(query.toLowerCase()))
  return <><SectionTitle eyebrow="Relationship management" title="Customers & leads" copy="One customer record for every enquiry, survey, quotation and project." action={<button className="button button-primary"><Plus size={16} /> Add customer</button>} /><div className="module-toolbar"><div className="search-field"><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search customers, locations or statuses" /></div><button className="filter-button">All customer types <ChevronDown size={14} /></button><button className="filter-button">Status <ChevronDown size={14} /></button></div><div className="table-panel"><div className="table-caption"><div><strong>{filtered.length} customer records</strong><span>Demo workspace records</span></div><button className="icon-button"><MoreHorizontal size={17} /></button></div><div className="data-table"><div className="table-head"><span>Customer</span><span>Type</span><span>Location</span><span>Lead status</span><span>Pipeline value</span><span /></div>{filtered.map(customer => <div className="table-row" key={customer.name}><div className="customer-cell"><span className="avatar">{customer.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span><strong>{customer.name}</strong></div><span>{customer.type}</span><span>{customer.location}</span><StatusBadge tone={customer.status === 'Qualified' ? 'good' : customer.status === 'New' ? 'neutral' : 'info'}>{customer.status}</StatusBadge><strong>{customer.value}</strong><button className="icon-button"><MoreHorizontal size={16} /></button></div>)}</div></div></>
}

function SurveyEstimator() {
  const [inputs, setInputs] = useState<RoofInputs>({ buildingLength: 12, buildingWidth: 8, pitchDegrees: 30, overhang: 0.45, wastagePercent: 10, effectiveCoverWidth: 0.85, sheetLength: 3 })
  const [estimate, setEstimate] = useState<RoofEstimate | null>(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const update = (field: keyof RoofInputs, value: string) => setInputs(current => ({ ...current, [field]: Number(value) }))
  const submit = (event: FormEvent) => { event.preventDefault(); setError(''); setSaved(false); try { setEstimate(calculateGableRoof(inputs)) } catch (issue) { setEstimate(null); setError(issue instanceof Error ? issue.message : 'Please review the measurements.') } }
  return <><SectionTitle eyebrow="Survey & estimation" title="Roof survey workspace" copy="Capture measurements, review the geometry and pass a transparent estimate to the next workflow step." action={<button className="button button-secondary" onClick={() => setSaved(true)}><Check size={16} /> Save survey draft</button>} />{saved && <div className="success-toast"><Check size={16} /> Survey draft saved in this browser session. Persistence will be connected in the database phase.</div>}<div className="survey-layout"><form className="panel survey-form" onSubmit={submit}><div className="panel-heading"><div><span className="panel-kicker">New survey · SRV-0048</span><h2>Gable roof measurements</h2></div><StatusBadge tone="warn">Needs review</StatusBadge></div><div className="form-section"><span className="form-label">Site information</span><div className="form-grid"><label>Customer<select defaultValue="K. Mensah Residence"><option>K. Mensah Residence</option><option>Apex Learning Centre</option><option>Nungua Retail Park</option></select></label><label>Site address<input defaultValue="Adenta, Greater Accra" /></label><label>Building type<select defaultValue="Residential"><option>Residential</option><option>Commercial</option><option>Industrial</option></select></label><label>Roof type<select defaultValue="Gable"><option>Gable</option><option>Hip</option><option>Shed</option><option>Flat</option></select></label></div></div><div className="form-section"><span className="form-label">Validated measurements · metres unless stated</span><div className="form-grid three"><label>Building length<input type="number" min="0.1" step="0.01" value={inputs.buildingLength} onChange={event => update('buildingLength', event.target.value)} /></label><label>Building width<input type="number" min="0.1" step="0.01" value={inputs.buildingWidth} onChange={event => update('buildingWidth', event.target.value)} /></label><label>Roof pitch (°)<input type="number" min="1" max="88" step="1" value={inputs.pitchDegrees} onChange={event => update('pitchDegrees', event.target.value)} /></label><label>Overhang<input type="number" min="0" step="0.01" value={inputs.overhang} onChange={event => update('overhang', event.target.value)} /></label><label>Wastage allowance (%)<input type="number" min="0" max="50" step="1" value={inputs.wastagePercent} onChange={event => update('wastagePercent', event.target.value)} /></label><label>Effective cover width<input type="number" min="0.01" step="0.01" value={inputs.effectiveCoverWidth} onChange={event => update('effectiveCoverWidth', event.target.value)} /></label><label>Sheet length<input type="number" min="0.1" step="0.01" value={inputs.sheetLength} onChange={event => update('sheetLength', event.target.value)} /></label></div></div>{error && <div className="error-message"><AlertTriangle size={16} /> {error}</div>}<div className="form-actions"><button className="button button-primary" type="submit"><Calculator size={16} /> Calculate roof area</button><span>Calculations are estimates pending estimator review.</span></div></form><div className="estimate-column"><section className="panel estimate-result"><div className="panel-heading"><div><span className="panel-kicker">Calculation output</span><h2>Estimate review</h2></div><Calculator size={20} className="panel-heading-icon" /></div>{estimate ? <><div className="estimate-total"><span>Sloped surface with waste</span><strong>{estimate.slopedAreaWithWaste.toFixed(1)} m²</strong><small>Gable geometry · {inputs.wastagePercent}% allowance included</small></div><div className="estimate-stats"><div><span>Footprint area</span><strong>{estimate.footprintArea.toFixed(1)} m²</strong></div><div><span>Rafter length</span><strong>{estimate.rafterLength.toFixed(2)} m</strong></div><div><span>Waste area</span><strong>{estimate.wasteArea.toFixed(1)} m²</strong></div><div><span>Sheet quantity</span><strong>{estimate.sheetQuantity} sheets</strong></div></div><div className="assumption-box"><AlertTriangle size={16} /><div><strong>Review before quotation</strong><p>This demo uses the selected cover width, sheet length and gable geometry. Confirm the manufacturer profile and Jilmek installation rules before creating a customer quotation.</p></div></div></> : <div className="empty-result"><Calculator size={24} /><strong>Enter measurements to calculate</strong><span>The estimate will show sloped area, waste and sheet quantity without filling in missing values.</span></div>}</section><section className="panel workflow-card"><span className="panel-kicker">Connected workflow</span><h2>Next steps</h2><div><span className="workflow-number">01</span><p>Review survey measurements</p><StatusBadge tone="warn">Current</StatusBadge></div><div><span className="workflow-number">02</span><p>Prepare estimate version</p><StatusBadge>Locked</StatusBadge></div><div><span className="workflow-number">03</span><p>Generate quotation</p><StatusBadge>Locked</StatusBadge></div></section></div></div></>
}

function Projects() { return <><SectionTitle eyebrow="Delivery management" title="Projects" copy="Track approved work from mobilisation through handover." action={<button className="button button-primary"><Plus size={16} /> New project</button>} /><div className="project-summary"><div><span>Active projects</span><strong>08</strong><small><ArrowUpRight size={13} /> 2 this month</small></div><div><span>On schedule</span><strong>06</strong><small>75% of active projects</small></div><div><span>Awaiting approval</span><strong>03</strong><small>GH₵ 418,400 pipeline</small></div><div><span>Completion this month</span><strong>04</strong><small>Across 3 teams</small></div></div><div className="table-panel"><div className="table-caption"><div><strong>Project delivery board</strong><span>Sample operational records</span></div><div className="caption-actions"><button className="filter-button">All statuses <ChevronDown size={14} /></button><button className="icon-button"><MoreHorizontal size={17} /></button></div></div><div className="data-table"><div className="table-head"><span>Project</span><span>Customer</span><span>Status</span><span>Progress</span><span>Due date</span><span>Value</span></div>{projects.map(project => <div className="table-row" key={project.name}><div className="customer-cell"><span className="project-mark small">{project.name.slice(0, 1)}</span><strong>{project.name}</strong></div><span>{project.customer}</span><StatusBadge tone={project.status === 'In progress' ? 'good' : project.status === 'Awaiting approval' ? 'warn' : 'info'}>{project.status}</StatusBadge><div className="table-progress"><div><span style={{ width: `${project.progress}%` }} /></div><b>{project.progress}%</b></div><span>{project.due}</span><strong>{project.value}</strong></div>)}</div></div></> }

function Inventory() { return <><SectionTitle eyebrow="Materials control" title="Inventory" copy="Know what is available, reserved and approaching minimum stock." action={<button className="button button-primary"><Plus size={16} /> Receive stock</button>} /><div className="inventory-cards"><div><span>Total inventory value</span><strong>GH₵ 60,020</strong><small><ArrowUpRight size={13} /> 4.8% vs last month</small></div><div><span>Items tracked</span><strong>142</strong><small>Across 4 locations</small></div><div className="warning"><span>Low-stock alerts</span><strong>03</strong><small><AlertTriangle size={13} /> Requires review</small></div></div><div className="table-panel"><div className="table-caption"><div><strong>Stock register</strong><span>Every movement should be attributed and recorded.</span></div><div className="caption-actions"><div className="search-field compact"><Search size={15} /><input placeholder="Search stock" /></div><button className="filter-button">Category <ChevronDown size={14} /></button></div></div><div className="data-table"><div className="table-head"><span>Material</span><span>SKU</span><span>On hand</span><span>Minimum</span><span>Stock health</span><span>Value</span></div>{inventory.map(item => { const low = item.stock < item.min; return <div className="table-row" key={item.sku}><div className="customer-cell"><span className="inventory-icon"><Package size={15} /></span><strong>{item.item}</strong></div><span className="mono">{item.sku}</span><span><strong>{item.stock}</strong> {item.unit}</span><span>{item.min}</span><StatusBadge tone={low ? 'warn' : 'good'}>{low ? 'Reorder soon' : 'Healthy'}</StatusBadge><strong>{item.value}</strong></div>})}</div></div></> }

function Finance() { return <><SectionTitle eyebrow="Financial control" title="Finance & invoices" copy="Separate estimates, approved contract values, invoiced amounts and collected revenue." action={<button className="button button-primary"><Plus size={16} /> Record payment</button>} /><div className="finance-layout"><div className="finance-main"><div className="finance-cards"><div><span>Collected revenue</span><strong>GH₵ 286,400</strong><small>November 2026</small></div><div><span>Outstanding balances</span><strong>GH₵ 174,800</strong><small>12 invoices</small></div><div><span>Recorded expenses</span><strong>GH₵ 98,600</strong><small>November 2026</small></div></div><div className="table-panel"><div className="table-caption"><div><strong>Recent transactions</strong><span>Demo ledger · actual integration pending</span></div><button className="filter-button">All types <ChevronDown size={14} /></button></div><div className="transaction-list"><div><span className="transaction-icon green"><ArrowDownRight size={15} /></span><div><strong>Payment received · Apex Learning Centre</strong><small>INV-2026-014 · Mobile money · 21 Nov 2026</small></div><b className="positive">+ GH₵ 48,000</b></div><div><span className="transaction-icon red"><ArrowUpRight size={15} /></span><div><strong>Material purchase · Accra Steel Depot</strong><small>PO-2026-032 · Bank transfer · 20 Nov 2026</small></div><b>- GH₵ 22,800</b></div><div><span className="transaction-icon green"><ArrowDownRight size={15} /></span><div><strong>Payment received · D. Owusu Residence</strong><small>INV-2026-011 · Cash · 18 Nov 2026</small></div><b className="positive">+ GH₵ 32,000</b></div></div></div></div><div className="panel receivables"><div className="panel-heading"><div><span className="panel-kicker">Receivables</span><h2>Collections</h2></div><ReceiptText size={19} /></div><div className="collection-ring"><div><strong>62%</strong><span>collected</span></div></div><p>GH₵ 174,800 remains across open customer balances.</p><button className="panel-link">Open invoice register <ArrowUpRight size={15} /></button></div></div></> }

function Reports() { return <><SectionTitle eyebrow="Business intelligence" title="Reports & analytics" copy="Turn operational records into a clearer view of performance and risk." action={<button className="button button-secondary"><FileText size={16} /> Export report</button>} /><div className="report-grid"><section className="panel report-large"><div className="panel-heading"><div><span className="panel-kicker">Sales performance</span><h2>Pipeline by stage</h2></div><button className="select-button">Last 90 days <ChevronDown size={14} /></button></div><div className="funnel"><div><span>New enquiries</span><strong>42</strong><i style={{ width: '100%' }} /></div><div><span>Qualified</span><strong>28</strong><i style={{ width: '76%' }} /></div><div><span>Quotation sent</span><strong>19</strong><i style={{ width: '53%' }} /></div><div><span>Approved</span><strong>11</strong><i style={{ width: '36%' }} /></div></div></section><section className="panel report-small"><span className="panel-kicker">Project mix</span><h2>By roof type</h2><div className="donut-row"><div className="donut"><div>48<span>%</span></div></div><div className="legend"><span><i className="orange-dot" /> Gable <b>48%</b></span><span><i className="blue-dot" /> Hip <b>31%</b></span><span><i className="purple-dot" /> Other <b>21%</b></span></div></div></section><section className="panel report-large"><div className="panel-heading"><div><span className="panel-kicker">Operational health</span><h2>Key indicators</h2></div></div><div className="indicator-grid"><div><span>Quote conversion</span><strong>26%</strong><small><ArrowUpRight size={13} /> 4.2% vs previous period</small></div><div><span>Average project margin</span><strong>18.4%</strong><small><ArrowUpRight size={13} /> 1.8% vs previous period</small></div><div><span>On-time delivery</span><strong>82%</strong><small><ArrowDownRight size={13} /> 2.1% needs review</small></div></div></section><section className="panel report-small"><span className="panel-kicker">Data readiness</span><h2>Production path</h2><div className="readiness"><div><Check size={15} /> Interface foundation <b>Ready</b></div><div><Check size={15} /> Estimator checks <b>Ready</b></div><div><Clock3 size={15} /> Database persistence <b>Next</b></div><Clock3 size={15} /> Server permissions <b>Next</b></div></section></div></> }

export default function HomePage() {
  const [active, setActive] = useState<ModuleKey>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authReady, setAuthReady] = useState(false)
  useEffect(() => {
    if (window.localStorage.getItem('jilmeker-demo-auth') !== 'active') {
      window.location.replace('/login')
      return
    }
    setAuthReady(true)
  }, [])
  if (!authReady) return <div className="auth-loading"><div className="loading-mark">JC</div><span>Opening Jilmeker ERP…</span></div>
  const activeTitle = navGroups.flatMap(group => group.items).find(item => item.key === active)?.label ?? 'Dashboard'
  const module = useMemo(() => {
    if (active === 'customers') return <Customers />
    if (active === 'surveys') return <SurveyEstimator />
    if (active === 'projects') return <Projects />
    if (active === 'inventory') return <Inventory />
    if (active === 'finance') return <Finance />
    if (active === 'reports') return <Reports />
    return <Dashboard onNavigate={setActive} />
  }, [active])
  const navigate = (key: ModuleKey) => { setActive(key); setMobileOpen(false) }
  return <div className="app-shell"><aside className={mobileOpen ? 'sidebar mobile-open' : 'sidebar'}><div className="brand"><img src="/jilmek-logo.png" alt="Jilmek Roofing & Construction Ltd." /><span className="brand-caption">ERP CONTROL ROOM</span></div><div className="workspace-switcher"><div className="workspace-avatar">JC</div><div><strong>Jilmek Construction</strong><span>Demo workspace</span></div><ChevronDown size={15} /></div><nav className="sidebar-nav" aria-label="ERP navigation">{navGroups.map(group => <div className="nav-group" key={group.label}><span className="nav-label">{group.label}</span>{group.items.map(item => { const Icon = item.icon; return <button className={active === item.key ? 'nav-item active' : 'nav-item'} key={item.key} onClick={() => navigate(item.key)}><Icon size={17} /><span>{item.label}</span>{item.key === 'inventory' && <em>3</em>}</button>})}</div>)}</nav><div className="sidebar-bottom"><button className="nav-item"><Settings size={17} /><span>Settings</span></button><div className="user-card"><div className="user-avatar">KA</div><div><strong>Kwame Asare</strong><span>Administrator</span></div><MoreHorizontal size={16} /></div></div></aside><div className="main-shell"><header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation"><Menu size={20} /></button><div className="breadcrumbs"><span>Jilmek ERP</span><ChevronRight size={14} /><strong>{activeTitle}</strong></div></div><div className="topbar-actions"><div className="global-search"><Search size={16} /><input placeholder="Search anything" /><kbd>⌘ K</kbd></div><button className="topbar-icon"><Bell size={18} /><i /></button><div className="topbar-profile"><span className="user-avatar small">KA</span><ChevronDown size={14} /></div></div></header><main className="content">{module}</main><footer className="app-footer"><span>Jilmeker ERP · Phase 1 working demo</span><span>Ghana Cedi · Africa/Accra</span></footer></div></div>
}
