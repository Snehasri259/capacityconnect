import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Search, X } from 'lucide-react';

export function Button({ children, variant='primary', loading=false, className='', ...props }:
  { children: ReactNode; variant?: 'primary'|'secondary'|'ghost'|'danger'|'dark'; loading?: boolean; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: 'bg-brand text-white shadow-[0_8px_22px_rgba(79,70,229,.18)] hover:bg-indigo-700',
    secondary: 'border border-line bg-white text-ink hover:border-slate-300 hover:bg-slate-50',
    ghost: 'text-muted hover:bg-slate-100 hover:text-ink',
    danger: 'bg-red-700 text-white hover:bg-red-800',
    dark: 'bg-deep text-white hover:bg-indigo-900',
  }[variant];
  return <button {...props} disabled={loading || props.disabled} className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}>
    {loading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
    {children}
  </button>;
}

export function Card({children, className='', onClick, interactive=false}:
  {children:ReactNode; className?:string; onClick?:()=>void; interactive?:boolean}) {
  return <section onClick={onClick} className={`surface ${interactive ? 'cursor-pointer transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-soft' : ''} ${className}`}>{children}</section>;
}

const badgeStyles = {
  neutral:'bg-slate-100 text-muted', brand:'bg-indigo-50 text-brand', blue:'bg-blue-50 text-network', green:'bg-teal-50 text-growth', orange:'bg-amber-50 text-amber-800', red:'bg-red-50 text-red-700'
};
export function Badge({children,tone='neutral'}:{children:ReactNode;tone?:keyof typeof badgeStyles}) { return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${badgeStyles[tone]}`}>{children}</span>; }

export function Progress({value,color='brand',label}:
  {value:number;color?:'brand'|'green'|'blue'|'orange';label?:string}) {
  const c={brand:'bg-brand',green:'bg-growth',blue:'bg-network',orange:'bg-amber-600'}[color];
  const safe=Math.max(0,Math.min(100,value));
  return <div>{label && <div className="mb-2 flex justify-between text-xs font-semibold text-muted"><span>{label}</span><span className="font-mono">{Math.round(safe)}%</span></div>}<div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${c} transition-[width] duration-700 ease-out`} style={{width:`${safe}%`}} /></div></div>;
}

export function KPI({label,value,detail,icon:Icon,tone='brand'}:{label:string;value:string|number;detail?:string;icon?:any;tone?:'brand'|'blue'|'green'|'neutral'}) {
  const iconStyle={brand:'bg-indigo-50 text-brand',blue:'bg-blue-50 text-network',green:'bg-teal-50 text-growth',neutral:'bg-slate-100 text-muted'}[tone];
  return <Card className="p-5"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="text-sm font-medium text-muted">{label}</p><p className="mt-2 font-display text-[28px] font-bold leading-none tracking-tight">{value}</p>{detail&&<p className="mt-2 text-xs text-quiet">{detail}</p>}</div>{Icon&&<div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${iconStyle}`}><Icon size={18}/></div>}</div></Card>;
}


export function SearchField({value,onChange,onClear,placeholder='Search',ariaLabel='Search'}:{value:string;onChange:(value:string)=>void;onClear?:()=>void;placeholder?:string;ariaLabel?:string}) {
  return <div className="group relative flex h-12 w-full items-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-3.5 shadow-[0_10px_30px_rgba(15,23,42,.045)] transition duration-200 hover:border-slate-300 focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50">
    <Search size={18} className="shrink-0 text-quiet transition group-focus-within:text-brand" aria-hidden="true"/>
    <input aria-label={ariaLabel} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-quiet" />
    {value && <button type="button" aria-label="Clear search" onClick={()=>onClear?onClear():onChange('')} className="focus-ring grid h-7 w-7 shrink-0 place-items-center rounded-lg text-quiet hover:bg-slate-100 hover:text-ink"><X size={15}/></button>}
  </div>
}

export function SectionHeading({eyebrow,title,body,action}:{eyebrow?:string;title:string;body?:string;action?:ReactNode}) {
  return <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">{eyebrow||'Capacity Connect'}</p><h1 className="page-title mt-2 text-balance">{title}</h1>{body&&<p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{body}</p>}</div>{action}</div>;
}

export function Field({label,error,helper, ...props}:{label:string;error?:string;helper?:string}&InputHTMLAttributes<HTMLInputElement>) {
  return <label className="block"><span className="text-sm font-semibold text-ink">{label}</span>{helper&&<span className="ml-2 text-xs text-quiet">{helper}</span>}<input {...props} aria-invalid={!!error} className={`field ${error?'border-red-400 focus:border-red-500 focus:ring-red-50':''}`} />{error&&<span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700"><AlertCircle size={13}/>{error}</span>}</label>;
}
export function TextareaField({label,error,helper,...props}:{label:string;error?:string;helper?:string}&TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <label className="block"><span className="text-sm font-semibold text-ink">{label}</span>{helper&&<span className="ml-2 text-xs text-quiet">{helper}</span>}<textarea {...props} aria-invalid={!!error} className={`field min-h-28 resize-y ${error?'border-red-400':''}`} />{error&&<span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700"><AlertCircle size={13}/>{error}</span>}</label>;
}

export function EmptyState({title,body,action}:{title:string;body:string;action?:ReactNode}) { return <div className="py-14 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-brand"><CheckCircle2 size={20}/></div><h3 className="mt-4 font-display text-lg font-bold">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{body}</p>{action&&<div className="mt-5">{action}</div>}</div>; }
export function ErrorState({onRetry}:{onRetry?:()=>void}) { return <div className="grid min-h-[calc(100vh-170px)] place-items-center py-10 text-center"><div className="w-full"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-700"><AlertCircle size={20}/></div><h3 className="mt-4 font-display text-lg font-bold">Something went wrong</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">We couldn't load this information. Please try again.</p>{onRetry&&<div className="mt-5"><Button variant="secondary" onClick={onRetry}>Try Again</Button></div>}</div></div>; }
export function Skeleton({className='h-5'}:{className?:string}) { return <div className={`animate-pulse rounded-xl bg-slate-200 ${className}`} aria-hidden="true"/>; }
export function Toast({children,tone='success'}:{children:ReactNode;tone?:'success'|'error'}) { return <div role="status" className={`fixed bottom-5 right-5 z-[100] flex max-w-sm items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-lift ${tone==='success'?'border-teal-200 bg-white text-growth':'border-red-200 bg-white text-red-700'}`}>{tone==='success'?<CheckCircle2 size={17}/>:<AlertCircle size={17}/>} {children}</div>; }
