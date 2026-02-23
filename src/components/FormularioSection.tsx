import { useState } from 'react';
import { WhatsappLogo, Buildings, Briefcase, Champagne, CalendarBlank, MapPin, ArrowLeft } from '@phosphor-icons/react';

// En desarrollo usamos proxy (mismo origen) para evitar CORS con n8n
const N8N_WEBHOOK_URL = import.meta.env.DEV
    ? '/api/n8n-webhook'
    : (import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined);

type FormData = {
    protocolo: string;
    dimension: string;
    fecha: string;
    zona: string;
    nombre: string;
    telefono: string;
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

const dimensionOptions = [
    { id: 'xs', label: '< 20 invitados' },
    { id: 'sm', label: '20 – 50' },
    { id: 'md', label: '50 – 150' },
    { id: 'lg', label: '> 150' },
];

const stepLabels = ['Contexto', 'Dimensión', 'Disponibilidad', 'Contacto'];

export default function FormularioSection() {
    const [step, setStep] = useState(1);
    const [sending, setSending] = useState(false);
    const [webhookError, setWebhookError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState<FormData>({
        protocolo: '',
        dimension: '',
        fecha: '',
        zona: '',
        nombre: '',
        telefono: '',
    });

    const handleProtocolo = (id: string) => {
        setForm((f) => ({ ...f, protocolo: id }));
        setTimeout(() => setStep(2), 280);
    };

    const handleDimension = (id: string) => {
        setForm((f) => ({ ...f, dimension: id }));
        setTimeout(() => setStep(3), 280);
    };

    const handleStep3Next = () => {
        if (form.fecha && form.zona) setStep(4);
    };

    const buildWhatsAppMessage = () => {
        const protocolo = protocoloOptions.find((p) => p.id === form.protocolo)?.label ?? '';
        const dimension = dimensionOptions.find((d) => d.id === form.dimension)?.label ?? '';
        const msg = `Hola Fernando, me gustaría solicitar una propuesta para un evento.

📋 Tipo de evento: ${protocolo}
👥 Dimensión: ${dimension}
📅 Fecha aproximada: ${form.fecha}
📍 Zona / Ciudad: ${form.zona}
👤 Nombre: ${form.nombre}`;
        return `https://wa.me/34613510777?text=${encodeURIComponent(msg)}`;
    };

    const buildWebhookPayload = () => {
        const protocoloLabel = protocoloOptions.find((p) => p.id === form.protocolo)?.label ?? '';
        const dimensionLabel = dimensionOptions.find((d) => d.id === form.dimension)?.label ?? '';
        return {
            ...form,
            protocoloLabel,
            dimensionLabel,
            timestamp: new Date().toISOString(),
        };
    };

    const handleSubmit = async () => {
        if (!form.nombre || !form.telefono) return;
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
                        <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-cream max-w-[420px]">
                            Cada evento merece una propuesta a su medida.
                        </h2>
                    </div>
                </div>

                {/* Right — form */}
                <div className="flex-1 flex flex-col bg-cream px-8 md:px-16 py-12 md:py-14">
                    <div className="max-w-[480px] w-full mx-auto flex flex-col h-full">

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
                                        Paso 1 de 4
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

                            {/* Step 2 — Dimensión */}
                            {step === 2 && (
                                <div className="animate-form-in">
                                    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-5">
                                        Paso 2 de 4
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

                            {/* Step 3 — Fecha y zona */}
                            {step === 3 && (
                                <div className="animate-form-in">
                                    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-5">
                                        Paso 3 de 4
                                    </p>
                                    <h3 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] text-charcoal mb-10">
                                        Perfecto. Para comprobar la disponibilidad de nuestra agenda y logística:
                                    </h3>
                                    <div className="flex flex-col gap-4 mb-8">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone">
                                                Fecha aproximada
                                            </span>
                                            <div className="relative">
                                                <CalendarBlank
                                                    size={16}
                                                    weight="light"
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="ej. Marzo 2025, segunda quincena"
                                                    value={form.fecha}
                                                    onChange={(e) => setForm((f) => ({ ...f, fecha: e.target.value }))}
                                                    className="w-full pl-11 pr-4 py-4 rounded-xl border border-bone bg-white text-sm text-charcoal placeholder-stone/60 focus:outline-none focus:border-teal transition-colors duration-200"
                                                />
                                            </div>
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone">
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
                                        onClick={handleStep3Next}
                                        disabled={!form.fecha || !form.zona}
                                        className="w-full py-4 rounded-xl bg-charcoal text-cream text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-teal disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}

                            {/* Step 4 — Contacto */}
                            {step === 4 && (
                                <div className="animate-form-in">
                                    <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-5">
                                        Paso 4 de 4
                                    </p>
                                    <h3 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] text-charcoal mb-3">
                                        Gracias. Fernando analizará estos datos personalmente.
                                    </h3>
                                    <p className="text-sm font-light text-graphite mb-10">
                                        ¿A quién debemos dirigir la propuesta inicial?
                                    </p>
                                    <div className="flex flex-col gap-4 mb-8">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone">
                                                Nombre
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
                                                Teléfono (WhatsApp)
                                            </span>
                                            <input
                                                type="tel"
                                                placeholder="+34 600 000 000"
                                                value={form.telefono}
                                                onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                                                className="w-full px-4 py-4 rounded-xl border border-bone bg-white text-sm text-charcoal placeholder-stone/60 focus:outline-none focus:border-teal transition-colors duration-200"
                                            />
                                        </label>
                                    </div>
                                    {sent ? (
                                        <div className="rounded-xl border border-teal/30 bg-teal/5 p-6 text-center">
                                            <p className="text-sm font-medium text-teal mb-2">Solicitud enviada correctamente</p>
                                            <p className="text-[11px] text-stone/80 mb-4">Nos pondremos en contacto contigo a la mayor brevedad.</p>
                                            <a
                                                href={buildWhatsAppMessage()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-teal text-cream text-[12px] font-medium hover:bg-teal-dark transition-colors"
                                            >
                                                <WhatsappLogo size={18} weight="fill" />
                                                Abrir WhatsApp por si quieres escribir
                                            </a>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                disabled={!form.nombre || !form.telefono || sending}
                                                className="w-full flex items-center justify-center gap-3 py-5 rounded-xl bg-teal text-cream text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-500 hover:bg-teal-dark hover:shadow-[0_8px_40px_rgba(0,97,112,0.35)] disabled:pointer-events-none disabled:opacity-30"
                                                aria-disabled={!form.nombre || !form.telefono || sending}
                                            >
                                                {sending ? 'Enviando…' : 'Enviar solicitud'}
                                            </button>
                                            {webhookError && (
                                                <p className="text-[11px] text-amber-700 text-center mt-2" role="alert">
                                                    {webhookError}
                                                </p>
                                            )}
                                            <p className="text-[11px] font-light text-stone/60 text-center mt-4">
                                                Los datos se envían a tu sistema (n8n). No se abre WhatsApp al enviar.
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
