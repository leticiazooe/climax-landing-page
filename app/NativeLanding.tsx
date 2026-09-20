const whatsapp =
  "https://wa.me/5516997078047?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20CLIMAX%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

const products = [
  {
    brand: "Samsung",
    name: "WindFree Connect 12.000 BTUs",
    detail: "Inverter · Sem vento · Connect",
    image: "https://americanas.vtexassets.com/arquivos/ids/31517699/Split-Parede-Samsung-Windfree-Connect-Inverter-12-000-BTU-h-So-Frio-R-410a-220-1f.jpg?v=638836363916600000",
  },
  {
    brand: "LG",
    name: "Dual Inverter +AI Voice 12.000 BTUs",
    detail: "Inverter · +AI Voice · 220V",
    image: "https://a-static.mlcdn.com.br/800x800/ar-condicionado-split-inverter-lg-hi-wall-dual-voice-ai-12000-btus-frio-s3nq12ja31k-eb2gamz-220v/dufrio/100285836/0110816d65d4911eda503b3d3f978e65.jpeg",
  },
  {
    brand: "Philco",
    name: "Inverter 9.000 BTUs Frio 220V",
    detail: "Inverter · Frio · 220V",
    image: "https://friopecas.vtexassets.com/arquivos/ids/253108/Kit-1000x1000-PAC9FT-selo.jpg?v=639160259853230000",
  },
];

const services = [
  ["thermometer", "Instalação", "Instalação de ar-condicionado com atenção ao ambiente, acabamento e funcionamento."],
  ["screwdriver-wrench", "Manutenção", "Avaliação e manutenção para recuperar o conforto térmico e prevenir paradas inesperadas."],
  ["building-1", "Climatização comercial", "Soluções para lojas, igrejas e empresas que precisam de ambientes bem climatizados."],
];

const segments = [
  ["store-1", "Lojas", "Conforto para clientes e equipe durante todo o atendimento."],
  ["home-2", "Igrejas", "Ambientes agradáveis para encontros, celebrações e eventos."],
  ["office-building-1", "Empresas", "Bem-estar térmico para apoiar a rotina de trabalho."],
];

const steps = [
  ["chat-bubble-typing-oval", "Chame no WhatsApp", "Conte o que precisa e informe sua cidade."],
  ["image-location", "Envie os detalhes", "Fotos ajudam a entender o local e o equipamento."],
  ["check-square", "Receba a orientação", "Alinhamos o atendimento e os próximos passos."],
];

const faq = [
  ["Quais cidades vocês atendem?", "Atendemos Jaboticabal, Matão e cidades da região. Envie sua localização pelo WhatsApp para confirmar."],
  ["Como solicito um orçamento?", "Conte o tipo de serviço, a cidade e, se possível, envie fotos do local ou equipamento pelo WhatsApp."],
  ["Vocês atendem espaços comerciais?", "Sim. Atendemos lojas, igrejas, empresas e outros ambientes comerciais."],
];

function Icon({ name }: { name: string }) {
  return <span className={`sl-icon icon-${name}`} aria-hidden="true" />;
}

function WhatsAppButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a className={`button button-primary ${className}`} href={whatsapp} target="_blank" rel="noopener noreferrer">
      <span>{children}</span><Icon name="chat-bubble-square-phone" />
    </a>
  );
}

export default function NativeLanding() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand-link" href="#inicio" aria-label="CLIMAX Refrigeração — início">
            <img src="/climax-logo.svg" alt="CLIMAX Refrigeração" width="156" height="52" decoding="async" />
          </a>
          <nav className="main-nav" aria-label="Navegação principal">
            <a href="#aparelhos">Aparelhos</a>
            <a href="#servicos">Serviços</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <WhatsAppButton className="header-cta">Orçamento</WhatsAppButton>
        </div>
      </header>

      <section id="inicio" className="hero">
        <video
          className="hero-video"
          src="/climax-hero.mp4"
          poster="/og.svg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span />Jaboticabal, Matão e região</div>
            <h1>Seu ambiente no clima certo.</h1>
            <p className="hero-lead">Instalação e manutenção de ar-condicionado para lojas, igrejas e empresas, com atendimento direto e orçamento rápido.</p>
            <div className="hero-actions">
              <WhatsAppButton>Solicitar orçamento</WhatsAppButton>
              <a className="text-link light" href="#servicos">Conhecer serviços <Icon name="navigation-arrow-north" /></a>
            </div>
            <div className="hero-meta">
              <div><strong>Atendimento local</strong><span>Jaboticabal e região</span></div>
              <div><strong>Contato direto</strong><span>(16) 99707-8047</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar" aria-label="Especialidades CLIMAX">
        <div className="marquee-track">
          {["Ar-condicionado","Manutenção","Instalação","Climatização comercial","Ar-condicionado","Manutenção","Instalação","Climatização comercial"].map((item,index)=>(
            <span className="marquee-item" key={`${item}-${index}`}>{item}<i /></span>
          ))}
        </div>
      </div>

      <section id="aparelhos" className="section products-section defer-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker">APARELHOS EM DESTAQUE</span>
              <h2>Tecnologia para climatizar melhor.</h2>
            </div>
            <p>Consulte disponibilidade, condições e instalação diretamente com a CLIMAX.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => {
              const productUrl = `https://wa.me/5516997078047?text=${encodeURIComponent(`Olá, vim pelo site da CLIMAX e gostaria de consultar disponibilidade e orçamento do ${product.brand} ${product.name}.`)}`;
              return (
                <article className="product-card" key={product.name}>
                  <div className="product-media">
                    <img src={product.image} alt={`Ar-condicionado ${product.brand} ${product.name}`} width="520" height="360" loading="lazy" decoding="async" fetchPriority="low" />
                  </div>
                  <div className="product-content">
                    <span className="product-brand">{product.brand}</span>
                    <h3>{product.name}</h3>
                    <p>{product.detail}</p>
                    <a className="product-action" href={productUrl} target="_blank" rel="noopener noreferrer">
                      <span>Consultar disponibilidade</span><Icon name="chat-bubble-square-phone" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="servicos" className="section defer-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker">NOSSOS SERVIÇOS</span>
              <h2>Soluções para manter tudo em clima.</h2>
            </div>
            <p>Serviço direto, informação clara e atenção ao funcionamento do seu equipamento.</p>
          </div>
          <div className="card-grid">
            {services.map(([icon,title,text],index)=>(
              <article className="service-card" key={title}>
                <div className="card-icon"><Icon name={icon} /></div>
                <span className="card-number">0{index+1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Pedir orçamento <Icon name="navigation-arrow-north" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section defer-section">
        <div className="dark-inner">
          <div className="dark-intro">
            <span className="kicker kicker-light">ONDE ATENDEMOS</span>
            <h2>Conforto para quem recebe, celebra e trabalha.</h2>
            <p>Climatização pensada para a rotina de cada espaço em Jaboticabal, Matão e região.</p>
            <WhatsAppButton>Conversar com a CLIMAX</WhatsAppButton>
          </div>
          <div className="segment-list">
            {segments.map(([icon,title,text])=>(
              <article className="segment-row" key={title}>
                <div className="segment-icon"><Icon name={icon} /></div>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section process-section defer-section">
        <div className="container">
          <div className="process-heading">
            <span className="kicker">COMO FUNCIONA</span>
            <h2>Simples do contato ao serviço.</h2>
          </div>
          <div className="process-grid">
            {steps.map(([icon,title,text],index)=>(
              <article className="process-card" key={title}>
                <Icon name={icon} /><span className="process-number">0{index+1}</span>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="duvidas" className="section faq-section defer-section">
        <div className="faq-inner">
          <div className="faq-intro">
            <span className="kicker">DÚVIDAS FREQUENTES</span>
            <h2>Informação clara antes de começar.</h2>
            <p>Fale diretamente com a nossa equipe se precisar de outra informação.</p>
          </div>
          <div className="faq-list">
            {faq.map(([question,answer],index)=>(
              <details className="faq-item" key={question}>
                <summary><span className="faq-index">0{index+1}</span><strong>{question}</strong><span className="faq-plus">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section defer-section">
        <div className="cta-inner">
          <div>
            <span className="kicker kicker-light">VAMOS CONVERSAR?</span>
            <h2>Seu orçamento começa com uma mensagem.</h2>
          </div>
          <WhatsAppButton>Solicitar orçamento</WhatsAppButton>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <img src="/climax-logo.svg" alt="CLIMAX Refrigeração" width="150" height="50" loading="lazy" decoding="async" />
          <nav aria-label="Links do rodapé">
            <a href="#aparelhos">Aparelhos</a><a href="#servicos">Serviços</a><a href="#duvidas">Dúvidas</a>
          </nav>
          <div className="footer-contact">
            <a href="tel:+5516997078047">(16) 99707-8047</a>
            <a href="https://www.instagram.com/grupoclimaxrefrigeracao/" target="_blank" rel="noopener noreferrer">@grupoclimaxrefrigeracao</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
