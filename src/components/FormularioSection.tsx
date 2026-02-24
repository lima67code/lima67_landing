import { useState, useRef } from 'react';
import { Buildings, Briefcase, Champagne, CalendarBlank, MapPin, ArrowLeft, CookingPot, Wine, Package, ForkKnife, Users } from '@phosphor-icons/react';

// En desarrollo usamos proxy (mismo origen) para evitar CORS con n8n
const N8N_WEBHOOK_URL = import.meta.env.DEV
    ? '/api/n8n-webhook'
    : (import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined);

type FormData = {
    protocolo: string;
    formatoExperiencia: string;
    dimension: string;
    fecha: string;
    zona: string;
    nombre: string;
    telefonoPrefix: string;
    telefono: string;
    email: string;
};

// Prefijos internacionales (Celular / WhatsApp)
const PHONE_PREFIXES: { value: string; label: string }[] = [
    { value: '+34', label: 'España +34' },
    { value: '+351', label: 'Portugal +351' },
    { value: '+33', label: 'Francia +33' },
    { value: '+49', label: 'Alemania +49' },
    { value: '+44', label: 'Reino Unido +44' },
    { value: '+39', label: 'Italia +39' },
    { value: '+51', label: 'Perú +51' },
    { value: '+52', label: 'México +52' },
    { value: '+54', label: 'Argentina +54' },
    { value: '+57', label: 'Colombia +57' },
    { value: '+1', label: 'USA/Canadá +1' },
    { value: '+41', label: 'Suiza +41' },
    { value: '+31', label: 'Países Bajos +31' },
    { value: '+32', label: 'Bélgica +32' },
];

const PHONE_DIGITS_MIN = 6;
const PHONE_DIGITS_MAX = 15;

const formatPhoneForPayload = (prefix: string, digits: string) => {
    const d = digits.replace(/\D/g, '');
    return d.length >= PHONE_DIGITS_MIN ? `${prefix}${d}` : '';
};
const formatPhoneDisplay = (digits: string) => {
    const d = digits.replace(/\D/g, '').slice(0, PHONE_DIGITS_MAX);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
    return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`.trim();
};

const protocoloOptions = [
    {
        id: 'institucional',
        icon: Buildings,
        label: 'Institucional / Diplomático',
        sub: 'Recepciones diplomáticas donde la imagen de su institución es la prioridad',
    },
    {
        id: 'corporativo',
        icon: Briefcase,
        label: 'Corporativo / Empresa',
        sub: 'Juntas de alta dirección que exigen discreción y tiempos exactos',
    },
    {
        id: 'privado',
        icon: Champagne,
        label: 'Evento Privado',
        sub: 'Residencias y galas con servicio exclusivo y platos de firma con herencia peruana',
    },
];

const formatoExperienciaOptions = [
    {
        id: 'show-cooking',
        icon: CookingPot,
        label: 'Show cooking',
        sub: 'Ceviches y estaciones de autor preparadas en vivo. (Ideal para dar dinamismo a la velada).',
    },
    {
        id: 'cocteleria-premium',
        icon: Wine,
        label: 'Coctelería Premium',
        sub: 'Barra de Pisco Sour y combinados de autor. (Perfecto para recepciones y brindis corporativos).',
    },
    {
        id: 'servicio-catering',
        icon: Package,
        label: 'Servicio de Catering',
        sub: 'Logística integral para eventos de cualquier escala. (Gestión completa de principio a fin).',
    },
    {
        id: 'alta-cocina-autor',
        icon: ForkKnife,
        label: 'Alta Cocina de Autor',
        sub: 'Menú degustación, buffet o estaciones de gala. (La experiencia gastronómica de máxima exclusividad).',
    },
    {
        id: 'servicio-camareros',
        icon: Users,
        label: 'Servicio de Camareros',
        sub: 'Personal de sala profesional para servicio a mesa, barra o estaciones. (Atención elegante y discreta).',
    },
];

const dimensionOptions = [
    { id: 'xs', label: '< 20 invitados' },
    { id: 'sm', label: '20 – 50' },
    { id: 'md', label: '50 – 150' },
    { id: 'lg', label: '> 150' },
];

const stepLabels = ['Contexto', 'Formato', 'Dimensión', 'Disponibilidad', 'Contacto'];

export default function FormularioSection() {
    const [step, setStep] = useState(1);
    const [sending, setSending] = useState(false);
    const [webhookError, setWebhookError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<FormData>({
        protocolo: '',
        formatoExperiencia: '',
        dimension: '',
        fecha: '',
        zona: '',
        nombre: '',
        telefonoPrefix: '+34',
        telefono: '',
        email: '',
    });

    const phoneDigits = form.telefono.replace(/\D/g, '').slice(0, PHONE_DIGITS_MAX);
    const phoneValid =
        phoneDigits.length >= PHONE_DIGITS_MIN &&
        phoneDigits.length <= PHONE_DIGITS_MAX &&
        form.telefonoPrefix.length > 0;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    const handleProtocolo = (id: string) => {
        setForm((f) => ({ ...f, protocolo: id }));
        setTimeout(() => setStep(2), 280);
    };

    const handleFormatoExperiencia = (id: string) => {
        setForm((f) => ({ ...f, formatoExperiencia: id }));
        setTimeout(() => setStep(3), 280);
    };

    const handleDimension = (id: string) => {
        setForm((f) => ({ ...f, dimension: id }));
        setTimeout(() => setStep(4), 280);
    };

    const handleStep4Next = () => {
        if (form.fecha && form.zona) setStep(5);
    };

    const buildWebhookPayload = () => {
        const protocoloLabel = protocoloOptions.find((p) => p.id === form.protocolo)?.label ?? '';
        const formatoExperienciaLabel = formatoExperienciaOptions.find((f) => f.id === form.formatoExperiencia)?.label ?? '';
        const dimensionLabel = dimensionOptions.find((d) => d.id === form.dimension)?.label ?? '';
        const fullPhone = formatPhoneForPayload(form.telefonoPrefix, form.telefono);
        const { telefonoPrefix: _, ...rest } = form;
        return {
            ...rest,
            telefono: fullPhone,
            protocoloLabel,
            formatoExperienciaLabel,
            dimensionLabel,
            timestamp: new Date().toISOString(),
        };
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, PHONE_DIGITS_MAX);
        setForm((f) => ({ ...f, telefono: digits }));
    };

    const handleSubmit = async () => {
        if (!form.nombre || !phoneValid || !emailValid) return;
        if (!N8N_WEBHOOK_URL) {
            setWebhookError('Webhook no configurado. Añade VITE_N8N_WEBHOOK_URL en .env');
            return;
        }
        setWebhookError(null);
        setSent(false);
        setSending(true);

        try {
            const res = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildWebhookPayload()),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setSent(true);
        } catch (e) {
            const msg = e instanceof Error ? e.message : 'Error de conexión';
            setWebhookError(`No se pudo enviar la solicitud (${msg}). Comprueba la URL del webhook en .env y que el workflow de n8n esté activo.`);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="px-4 md:px-8 py-12 md:py-16 bg-cream">
            <section
                id="formulario"
                className="w-full flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.09)] border border-bone"
                aria-labelledby="form-heading"
                style={{ minHeight: '700px' }}
            >
                {/* Left — photo panel */}
                <div className="hidden md:block md:w-[45%] relative overflow-hidden">
                    <img
                        src="/images/privado.webp"
                        alt="Evento Lima67"
                        width={800}
                        height={600}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-charcoal/55" />
                    {/* Overlay content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-14">
                        <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-cream max-w-[420px] mb-8">
                            Cada evento merece una propuesta a su medida.
                        </h2>
                        {/* Trust signals */}
                        <ul className="flex flex-col gap-3">
                            {[
                                'Respuesta en menos de 24 h',
                                'Propuesta 100% personalizada',
                                'Sin compromiso, sin letra pequeña',
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm font-regular text-cream/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right — form */}
                <div className="flex-1 flex flex-col bg-cream px-8 md:px-16 py-12 md:py-14">
                    <div className="max-w-[500px] w-full mx-auto flex flex-col h-full">

                        {/* Back button — above the stepper */}
                        <div className="mb-4 h-6">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep((s) => s - 1)}
                                    className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-stone hover:text-charcoal transition-colors duration-200"
                                    aria-label="Volver al paso anterior"
                                >
                                    <ArrowLeft size={13} weight="bold" />
                                    Atrás
                                </button>
                            )}
                        </div>

                        {/* Progress stepper */}
                        <div className="relative flex items-start mb-12">
                            {/* Connecting line — from center of first dot to center of last dot */}
                            {/* Each of 4 items = 25% width, so center of first = 12.5%, center of last = 87.5% */}
                            <div className="absolute top-[5px] left-[12.5%] right-[12.5%] h-[1px]">
                                <div className="absolute inset-0 bg-bone" />
                                <div
                                    className="absolute top-0 left-0 h-full bg-teal transition-all duration-500"
                                    style={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%` }}
                                />
                            </div>
                            {stepLabels.map((label, i) => {
                                const n = i + 1;
                                const isActive = n === step;
                                const isDone = n < step;
                                return (
                                    <div key={label} className="flex-1 relative flex flex-col items-center gap-2 z-10">
                                        <div
                                            className={`w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 ${isDone
                                                ? 'bg-teal border-teal'
                                                : isActive
                                                    ? 'bg-white border-charcoal scale-110'
                                                    : 'bg-white border-bone'
                                                }`}
                                        />
                                        <span
                                            className={`hidden md:inline text-[9px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${isActive ? 'text-charcoal' : isDone ? 'text-teal' : 'text-stone'
                                                }`}
                                        >
                                            {label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Step content — grows independently, progress stays pinned */}
                        <div className="flex-1 pt-4">
                            {/* Step 1 — Protocolo */}
                            {step === 1 && (
                                <div className="animate-form-in">
                                    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-5">
                                        Paso 1 de 5
                                    </p>
                                    <h3
                                        id="form-heading"
                                        className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] text-charcoal mb-10"
                                    >
                                        Empecemos por el contexto. ¿Qué tipo de evento requiere ?
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {protocoloOptions.map((opt) => {
                                            const Icon = opt.icon;
                                            return (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleProtocolo(opt.id)}
                                                    className={`group text-left flex items-center gap-5 px-6 py-5 rounded-xl border transition-all duration-300 ${form.protocolo === opt.id
                                                        ? 'border-teal bg-teal/5'
                                                        : 'border-bone hover:border-teal/40 hover:bg-teal/3'
                                                        }`}
                                                >
                                                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-teal/8 flex items-center justify-center group-hover:bg-teal/15 transition-colors duration-300">
                                                        <Icon size={22} weight="light" className="text-teal" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold tracking-[-0.01em] text-charcoal mb-0.5">
                                                            {opt.label}
                                                        </p>
                                                        <p className="text-xs font-light text-stone leading-relaxed">
                                                            {opt.sub}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Step 2 — Formato de experiencia */}
                            {step === 2 && (
                                <div className="animate-form-in">
                                    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-5">
                                        Paso 2 de 5
                                    </p>
                                    <h3 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] text-charcoal mb-3">
                                        ¿Qué formato de experiencia tiene en mente?
                                    </h3>
                                    <p className="text-sm font-light text-graphite mb-6">
                                        Seleccione la propuesta que mejor se adapte a su convocatoria.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {formatoExperienciaOptions.map((opt) => {
                                            const Icon = opt.icon;
                                            return (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleFormatoExperiencia(opt.id)}
                                                    className={`group text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${form.formatoExperiencia === opt.id
                                                        ? 'border-teal bg-teal/5'
                                                        : 'border-bone hover:border-teal/40 hover:bg-teal/3'
                                                        }`}
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/8 flex items-center justify-center group-hover:bg-teal/15 transition-colors duration-300">
                                                        <Icon size={16} weight="light" className="text-teal" />
                                                    </div>
                                                    <p className="text-sm font-medium tracking-[-0.01em] text-charcoal leading-tight">
                                                        {opt.label}
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Step 3 — Dimensión */}
                            {step === 3 && (
                                <div className="animate-form-in">
                                    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-5">
                                        Paso 3 de 5
                                    </p>
                                    <h3 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] text-charcoal mb-10">
                                        Entendido. ¿Cuál es la dimensión aproximada del evento?
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {dimensionOptions.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleDimension(opt.id)}
                                                className={`py-5 px-4 rounded-xl border text-sm font-medium tracking-[-0.01em] transition-all duration-300 ${form.dimension === opt.id
                                                    ? 'border-teal bg-teal text-cream'
                                                    : 'border-bone text-graphite hover:border-teal/50 hover:text-charcoal'
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 4 — Fecha y zona */}
                            {step === 4 && (
                                <div className="animate-form-in">
                                    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-5">
                                        Paso 4 de 5
                                    </p>
                                    <h3 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] text-charcoal mb-10">
                                        Perfecto. Para comprobar la disponibilidad de nuestra agenda y logística:
                                    </h3>
                                    <div className="flex flex-col gap-4 mb-8">
                                        <label className="flex flex-col gap-2 min-w-0">
                                            <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-stone truncate">
                                                Fecha del evento
                                            </span>
                                            <div className="relative overflow-hidden">
                                                <CalendarBlank
                                                    size={16}
                                                    weight="light"
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone cursor-pointer z-10"
                                                    onClick={() => dateInputRef.current?.showPicker()}
                                                />
                                                <input
                                                    ref={dateInputRef}
                                                    type="date"
                                                    min={new Date().toISOString().slice(0, 10)}
                                                    value={form.fecha}
                                                    onChange={(e) => setForm((f) => ({ ...f, fecha: e.target.value }))}
                                                    className="w-full min-w-0 pl-11 pr-4 py-4 rounded-xl border border-bone bg-white text-sm text-charcoal focus:outline-none focus:border-teal transition-colors duration-200 [color-scheme:light]"
                                                />
                                            </div>
                                        </label>
                                        <label className="flex flex-col gap-2 min-w-0">
                                            <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-stone truncate">
                                                Zona o Ciudad
                                            </span>
                                            <div className="relative">
                                                <MapPin
                                                    size={16}
                                                    weight="light"
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="ej. Madrid, Marbella, Barcelona"
                                                    value={form.zona}
                                                    onChange={(e) => setForm((f) => ({ ...f, zona: e.target.value }))}
                                                    className="w-full pl-11 pr-4 py-4 rounded-xl border border-bone bg-white text-sm text-charcoal placeholder-stone/60 focus:outline-none focus:border-teal transition-colors duration-200"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleStep4Next}
                                        disabled={!form.fecha || !form.zona}
                                        className="w-full py-4 rounded-xl bg-charcoal text-cream text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-teal disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}

                            {/* Step 5 — Contacto */}
                            {step === 5 && (
                                <div className="animate-form-in">
                                    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-5">
                                        Paso 5 de 5
                                    </p>
                                    <h3 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] text-charcoal mb-3">
                                        Gracias. ¿A quién debemos dirigir la propuesta inicial?
                                    </h3>
                                    <div className="flex flex-col gap-4 mb-8">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone">
                                                Nombre & Apellidos
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Su nombre"
                                                value={form.nombre}
                                                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                                                className="w-full px-4 py-4 rounded-xl border border-bone bg-white text-sm text-charcoal placeholder-stone/60 focus:outline-none focus:border-teal transition-colors duration-200"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone">
                                                Celular (WhatsApp)
                                            </span>
                                            <div className="flex rounded-xl border border-bone bg-white overflow-hidden focus-within:border-teal focus-within:ring-1 focus-within:ring-teal transition-colors">
                                                <select
                                                    value={form.telefonoPrefix}
                                                    onChange={(e) => setForm((f) => ({ ...f, telefonoPrefix: e.target.value }))}
                                                    className="shrink-0 pl-3 pr-8 py-4 text-sm text-charcoal bg-bone/50 border-r border-bone focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                                                    aria-label="Prefijo del país"
                                                >
                                                    {PHONE_PREFIXES.map((p) => (
                                                        <option key={p.value} value={p.value}>
                                                            {p.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="tel"
                                                    inputMode="numeric"
                                                    autoComplete="tel-national"
                                                    placeholder="612 345 678"
                                                    value={formatPhoneDisplay(form.telefono)}
                                                    onChange={handlePhoneChange}
                                                    className="w-full px-4 py-4 text-sm text-charcoal placeholder-stone/60 focus:outline-none bg-transparent"
                                                />
                                            </div>
                                            {form.telefono && !phoneValid && (
                                                <p className="text-[11px] text-amber-700">
                                                    Introduce entre {PHONE_DIGITS_MIN} y {PHONE_DIGITS_MAX} dígitos (sin prefijo).
                                                </p>
                                            )}
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone">
                                                Email
                                            </span>
                                            <input
                                                type="email"
                                                autoComplete="email"
                                                placeholder="correo@ejemplo.com"
                                                value={form.email}
                                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value.trim() }))}
                                                className="w-full px-4 py-4 rounded-xl border border-bone bg-white text-sm text-charcoal placeholder-stone/60 focus:outline-none focus:border-teal transition-colors duration-200"
                                            />
                                            {form.email && !emailValid && (
                                                <p className="text-[11px] text-amber-700">Introduce un email válido.</p>
                                            )}
                                        </label>
                                    </div>
                                    {sent ? (
                                        <div className="rounded-xl border border-teal/30 bg-teal/5 p-6 text-center">
                                            <p className="text-sm font-medium text-teal mb-2">Solicitud enviada correctamente</p>
                                            <p className="text-sm font-light text-charcoal mb-6">
                                                Te llamaremos hoy mismo o en un máximo de 24 horas al número que nos has indicado.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSent(false);
                                                    setStep(1);
                                                    setWebhookError(null);
                                                    setForm({
                                                        protocolo: '',
                                                        formatoExperiencia: '',
                                                        dimension: '',
                                                        fecha: '',
                                                        zona: '',
                                                        nombre: '',
                                                        telefonoPrefix: '+34',
                                                        telefono: '',
                                                        email: '',
                                                    });
                                                }}
                                                className="text-[11px] font-semibold tracking-[0.15em] uppercase text-teal border border-teal/40 rounded-full px-6 py-2.5 hover:bg-teal hover:text-cream transition-all duration-300"
                                            >
                                                Enviar otra solicitud
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                disabled={!form.nombre || !phoneValid || !emailValid || sending}
                                                className="w-full flex items-center justify-center gap-3 py-5 rounded-xl bg-teal text-cream text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-500 hover:bg-teal-dark hover:shadow-[0_8px_40px_rgba(182,141,60,0.35)] disabled:pointer-events-none disabled:opacity-30"
                                                aria-disabled={!form.nombre || !phoneValid || !emailValid || sending}
                                            >
                                                {sending ? 'Enviando…' : 'Enviar solicitud'}
                                            </button>
                                            {webhookError && (
                                                <p className="text-[11px] text-amber-700 text-center mt-2" role="alert">
                                                    {webhookError}
                                                </p>
                                            )}
                                            <p className="text-[11px] font-light text-stone/60 text-center mt-4">
                                                Al hacer clic en enviar, está de acuerdo con nuestra{' '}
                                                <a href="/politica-privacidad" className="text-teal underline hover:text-teal-dark transition-colors" target="_blank" rel="noopener noreferrer">
                                                    política de privacidad
                                                </a>
                                                .
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>{/* end step content */}
                    </div>{/* end inner container */}
                </div>{/* end right panel */}
            </section>
        </div>
    );
}
