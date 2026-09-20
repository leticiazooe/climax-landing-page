"use client";

import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native-web";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./MotionReveal";
import { heroVideo } from "./heroVideo";

const whatsapp =
  "https://wa.me/5516997078047?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20CLIMAX%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

const services = [
  { icon: "thermometer", title: "Instalação", text: "Instalação de ar-condicionado com atenção ao ambiente, acabamento e funcionamento." },
  { icon: "screwdriver-wrench", title: "Manutenção", text: "Avaliação e manutenção para recuperar o conforto térmico e prevenir paradas inesperadas." },
  { icon: "building-1", title: "Climatização comercial", text: "Soluções para lojas, igrejas e empresas que precisam de ambientes bem climatizados." },
];

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

const faq = [
  ["Quais cidades vocês atendem?", "Atendemos Jaboticabal, Matão e cidades da região. Envie sua localização pelo WhatsApp para confirmar."],
  ["Como solicito um orçamento?", "Conte o tipo de serviço, a cidade e, se possível, envie fotos do local ou equipamento pelo WhatsApp."],
  ["Vocês atendem espaços comerciais?", "Sim. Atendemos lojas, igrejas, empresas e outros ambientes comerciais."],
];

const marqueeItems = ["Ar-condicionado", "Manutenção", "Instalação", "Climatização comercial"];

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return <span className={`sl-icon icon-${name}`} style={{ width: size, height: size }} aria-hidden="true" />;
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function productWhatsapp(name: string) {
  return `https://wa.me/5516997078047?text=${encodeURIComponent(`Olá, vim pelo site da CLIMAX e gostaria de consultar disponibilidade e orçamento do ${name}.`)}`;
}

function ActionButton({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${label} pelo WhatsApp`}
      onPress={() => openExternal(whatsapp)}
      style={({ pressed, hovered }) => [
        styles.action,
        light ? styles.actionLight : styles.actionBlue,
        hovered && styles.actionHover,
        pressed && styles.actionPressed,
      ]}
    >
      <Text style={[styles.actionText, light ? styles.actionTextBlue : styles.actionTextWhite]}>{label}</Text>
      <Icon name="chat-bubble-square-phone" size={17} />
    </Pressable>
  );
}

export default function NativeLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const { width } = useWindowDimensions();
  const isMobile = width < 760;

  return (
    <View style={styles.page}>
      <View accessibilityRole="banner" style={styles.header}>
        <View style={styles.headerInner}>
          <Pressable accessibilityRole="link" accessibilityLabel="CLIMAX Refrigeração — início" onPress={() => scrollTo("inicio")}>
            <Image source={{ uri: "/climax-logo.svg" }} accessibilityLabel="CLIMAX Refrigeração" style={styles.logo} resizeMode="contain" />
          </Pressable>
          <View style={styles.headerActions}>
            {!isMobile && <Pressable accessibilityRole="link" onPress={() => scrollTo("aparelhos")} style={styles.navLink}>
              <Text style={styles.navText}>Aparelhos</Text>
            </Pressable>}
            {!isMobile && <Pressable accessibilityRole="link" onPress={() => scrollTo("servicos")} style={styles.navLink}>
              <Text style={styles.navText}>Serviços</Text>
            </Pressable>}
            {!isMobile && <Pressable accessibilityRole="link" onPress={() => scrollTo("duvidas")} style={styles.navLink}>
              <Text style={styles.navText}>Dúvidas</Text>
            </Pressable>}
            <ActionButton label="Orçamento" light />
          </View>
        </View>
      </View>

      <View nativeID="inicio" style={styles.hero}>
        <video
          src={heroVideo}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          tabIndex={-1}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: isMobile ? "68% center" : "center center",
            zIndex: 0,
          }}
        />
        <View style={styles.heroVideoOverlay} />
        <View style={[styles.heroVideoShade, isMobile && styles.heroVideoShadeMobile]} />
        <View style={styles.heroInner}>
          <View style={[styles.heroCopy, isMobile && styles.mobileFull]}>
            <Reveal immediate delay={0.04}>
              <View style={styles.eyebrowRow}><View style={styles.eyebrowLine} /><Text style={styles.eyebrow}>Jaboticabal, Matão e região</Text></View>
            </Reveal>
            <Reveal immediate delay={0.11} distance={24}>
              <Text accessibilityRole="header" style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>Seu ambiente no clima certo.</Text>
            </Reveal>
            <Reveal immediate delay={0.18}>
              <Text style={styles.heroLead}>Instalação e manutenção de ar-condicionado para lojas, igrejas e empresas, com atendimento direto e orçamento rápido.</Text>
            </Reveal>
            <Reveal immediate delay={0.25}>
              <View style={styles.heroButtons}>
                <ActionButton label="Solicitar orçamento" light />
                <Pressable accessibilityRole="link" onPress={() => scrollTo("servicos")} style={styles.secondaryLink}>
                  <Text style={styles.secondaryText}>Conhecer serviços</Text>
                  <Icon name="navigation-arrow-north" size={14} />
                </Pressable>
              </View>
            </Reveal>
            <Reveal immediate delay={0.32}>
              <View style={styles.heroMeta}>
                <View><Text style={styles.metaTitle}>Atendimento local</Text><Text style={styles.metaText}>Jaboticabal e região</Text></View>
                <View><Text style={styles.metaTitle}>Contato direto</Text><Text style={styles.metaText}>(16) 99707-8047</Text></View>
              </View>
            </Reveal>
          </View>
        </View>
      </View>

      <View style={styles.trustBar}>
        <View style={styles.marqueeViewport}>
          <motion.div
            className="native-marquee-track"
            animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div className="native-marquee-item" key={`${item}-${index}`} aria-hidden={index >= marqueeItems.length}>
                <span>{item}</span><i />
              </div>
            ))}
          </motion.div>
        </View>
      </View>

      <View nativeID="aparelhos" style={styles.productsSection}>
        <View style={styles.container}>
          <Reveal>
            <View style={[styles.sectionHeading, isMobile && styles.mobileAlignStart]}>
              <View style={[styles.headingCopy, isMobile && styles.mobileFull]}>
                <Text style={styles.kicker}>APARELHOS EM DESTAQUE</Text>
                <Text accessibilityRole="header" style={styles.sectionTitle}>Tecnologia para climatizar melhor.</Text>
              </View>
              <Text style={[styles.sectionLead, isMobile && styles.mobileFull]}>Consulte disponibilidade, condições e instalação diretamente com a CLIMAX.</Text>
            </View>
          </Reveal>

          <View style={[styles.productGrid, isMobile && styles.mobileColumn]}>
            {products.map((product, index) => (
              <Reveal className="product-card-reveal" key={product.name} delay={index * 0.06}>
                <View style={[styles.productCard, isMobile && styles.mobileFull]}>
                  <View style={styles.productImageWrap}>
                    <Image source={{ uri: product.image }} accessibilityLabel={`Ar-condicionado ${product.brand} ${product.name}`} style={styles.productImage} resizeMode="contain" />
                  </View>
                  <View style={styles.productContent}>
                    <Text style={styles.productBrand}>{product.brand}</Text>
                    <Text accessibilityRole="header" style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productDetail}>{product.detail}</Text>
                    <Pressable
                      accessibilityRole="link"
                      accessibilityLabel={`Consultar ${product.brand} ${product.name} pelo WhatsApp`}
                      onPress={() => openExternal(productWhatsapp(`${product.brand} ${product.name}`))}
                      style={({ pressed, hovered }) => [styles.productAction, hovered && styles.productActionHover, pressed && styles.actionPressed]}
                    >
                      <Text style={styles.productActionText}>Consultar disponibilidade</Text>
                      <Icon name="chat-bubble-square-phone" size={17} />
                    </Pressable>
                  </View>
                </View>
              </Reveal>
            ))}
          </View>
        </View>
      </View>

      <View nativeID="servicos" style={styles.section}>
        <View style={styles.container}>
          <Reveal>
            <View style={[styles.sectionHeading, isMobile && styles.mobileAlignStart]}>
              <View style={[styles.headingCopy, isMobile && styles.mobileFull]}><Text style={styles.kicker}>NOSSOS SERVIÇOS</Text><Text accessibilityRole="header" style={styles.sectionTitle}>Soluções para manter tudo em clima.</Text></View>
              <Text style={[styles.sectionLead, isMobile && styles.mobileFull]}>Serviço direto, informação clara e atenção ao funcionamento do seu equipamento.</Text>
            </View>
          </Reveal>
          <View style={[styles.cardGrid, isMobile && styles.mobileColumn]} className="service-grid">
            {services.map((service, index) => (
              <Reveal className="service-card-reveal" key={service.title} delay={index * 0.06}>
                <View style={styles.serviceCard}>
                  <View style={styles.cardIcon}><Icon name={service.icon} size={26} /></View>
                  <Text style={styles.cardNumber}>0{index + 1}</Text>
                  <Text accessibilityRole="header" style={styles.cardTitle}>{service.title}</Text>
                  <Text style={styles.cardBody}>{service.text}</Text>
                  <Pressable accessibilityRole="link" onPress={() => openExternal(whatsapp)} style={styles.cardLink}>
                    <Text style={styles.cardLinkText}>Pedir orçamento</Text><Icon name="navigation-arrow-north" size={13} />
                  </Pressable>
                </View>
              </Reveal>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.darkSection}>
        <View style={styles.darkInner}>
          <Reveal direction="left">
            <View style={[styles.darkIntro, isMobile && styles.mobileFull]}>
              <Text style={styles.kickerLight}>ONDE ATENDEMOS</Text>
              <Text accessibilityRole="header" style={styles.darkTitle}>Conforto para quem recebe, celebra e trabalha.</Text>
              <Text style={styles.darkLead}>Climatização pensada para a rotina de cada espaço em Jaboticabal, Matão e região.</Text>
              <ActionButton label="Conversar com a CLIMAX" light />
            </View>
          </Reveal>
          <View style={[styles.segmentList, isMobile && styles.mobileFull]}>
            {[
              ["store-1", "Lojas", "Conforto para clientes e equipe durante todo o atendimento."],
              ["home-2", "Igrejas", "Ambientes agradáveis para encontros, celebrações e eventos."],
              ["office-building-1", "Empresas", "Bem-estar térmico para apoiar a rotina de trabalho."],
            ].map(([icon, title, text], index) => (
              <Reveal key={title} delay={index * 0.06} direction="right">
                <View style={styles.segmentRow}>
                  <View style={styles.segmentIcon}><Icon name={icon} size={22} /></View>
                  <View style={styles.segmentCopy}><Text style={styles.segmentTitle}>{title}</Text><Text style={styles.segmentText}>{text}</Text></View>
                </View>
              </Reveal>
            ))}
          </View>
        </View>
      </View>

      <View nativeID="como-funciona" style={styles.processSection}>
        <View style={styles.container}>
          <Reveal className="process-heading-reveal"><View style={styles.processHeading}><Text style={styles.kicker}>COMO FUNCIONA</Text><Text accessibilityRole="header" style={styles.processSectionTitle}>Simples do contato ao serviço.</Text></View></Reveal>
          <View style={[styles.processGrid, isMobile && styles.mobileColumn]}>
            {[
              ["chat-bubble-typing-oval", "Chame no WhatsApp", "Conte o que precisa e informe sua cidade."],
              ["image-location", "Envie os detalhes", "Fotos ajudam a entender o local e o equipamento."],
              ["check-square", "Receba a orientação", "Alinhamos o atendimento e os próximos passos."],
            ].map(([icon, title, text], index) => (
              <Reveal key={title} delay={index * 0.07}>
                <View style={styles.processCard}><Icon name={icon} size={32} /><Text style={styles.processNumber}>0{index + 1}</Text><Text style={styles.processTitle}>{title}</Text><Text style={styles.processText}>{text}</Text></View>
              </Reveal>
            ))}
          </View>
        </View>
      </View>

      <View nativeID="duvidas" style={styles.section}>
        <View style={[styles.faqInner, isMobile && styles.mobileColumn]}>
          <Reveal className="faq-intro-reveal" direction="left"><View style={styles.faqIntro}><Text style={styles.kicker}>DÚVIDAS FREQUENTES</Text><Text accessibilityRole="header" style={styles.sectionTitle}>Informação clara antes de começar.</Text><Text style={styles.faqLead}>Fale diretamente com a nossa equipe se precisar de outra informação.</Text></View></Reveal>
          <View style={[styles.faqList, isMobile && styles.mobileFull]}>
            {faq.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return (
                <View key={question} style={styles.faqItem}>
                  <Pressable accessibilityRole="button" accessibilityState={{ expanded: isOpen }} onPress={() => setOpenFaq(isOpen ? null : index)} style={styles.faqButton}>
                    <Text style={styles.faqIndex}>0{index + 1}</Text><Text style={styles.faqQuestion}>{question}</Text><Text style={styles.faqToggle}>{isOpen ? "−" : "+"}</Text>
                  </Pressable>
                  {isOpen && <motion.div initial={reducedMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.25 }}><Text style={styles.faqAnswer}>{answer}</Text></motion.div>}
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <View style={[styles.ctaInner, isMobile && styles.mobileColumn]}>
          <Reveal className="cta-copy-reveal"><View style={styles.ctaCopy}><Text style={styles.kickerLight}>VAMOS CONVERSAR?</Text><Text style={styles.ctaTitle}>Seu orçamento começa com uma mensagem.</Text></View></Reveal>
          <ActionButton label="Chamar no WhatsApp" light />
        </View>
      </View>

      <View accessibilityRole="contentinfo" style={styles.footer}>
        <View style={[styles.footerInner, isMobile && styles.mobileColumn]}>
          <View style={[styles.footerColumn, styles.footerBrand, isMobile && styles.mobileFull]}>
            <Image source={{ uri: "/climax-logo.svg" }} accessibilityLabel="CLIMAX Refrigeração" style={styles.footerLogo} resizeMode="contain" />
            <Text style={styles.footerText}>Instalação, manutenção e climatização para empresas, lojas, igrejas e outros ambientes comerciais.</Text>
          </View>

          <View style={[styles.footerColumn, isMobile && styles.mobileFull]}>
            <Text style={styles.footerHeading}>SERVIÇOS</Text>
            <Text style={styles.footerItem}>Instalação</Text>
            <Text style={styles.footerItem}>Manutenção</Text>
            <Text style={styles.footerItem}>Climatização comercial</Text>
          </View>

          <View style={[styles.footerColumn, isMobile && styles.mobileFull]}>
            <Text style={styles.footerHeading}>NAVEGAÇÃO</Text>
            {[["Início", "inicio"], ["Aparelhos", "aparelhos"], ["Serviços", "servicos"], ["Como funciona", "como-funciona"], ["Dúvidas", "duvidas"]].map(([label, id]) => (
              <Pressable key={id} accessibilityRole="link" onPress={() => scrollTo(id)} style={styles.footerNavLink}><Text style={styles.footerItem}>{label}</Text></Pressable>
            ))}
          </View>

          <View style={[styles.footerColumn, styles.footerContact, isMobile && styles.mobileFull]}>
            <Text style={styles.footerHeading}>CONTATO</Text>
            <View style={styles.footerContactRow}><Icon name="image-location" size={18} /><Text style={styles.footerItem}>Jaboticabal, Matão e região</Text></View>
            <Pressable accessibilityRole="link" onPress={() => openExternal(whatsapp)} style={styles.footerContactRow}><Icon name="phone" size={18} /><Text style={styles.footerItem}>(16) 99707-8047</Text></Pressable>
            <Pressable accessibilityRole="link" accessibilityLabel="Instagram da CLIMAX Refrigeração" onPress={() => openExternal("https://www.instagram.com/grupoclimaxrefrigeracao/")} style={styles.footerContactRow}><Icon name="camera-1" size={18} /><Text style={styles.footerItem}>@grupoclimaxrefrigeracao</Text></Pressable>
          </View>
        </View>
        <View style={styles.footerBottom}><Text style={styles.footerLegal}>© {new Date().getFullYear()} CLIMAX Refrigeração. Todos os direitos reservados.</Text><Text style={styles.footerLegal}>Jaboticabal · Matão · Região</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { width: "100%", minHeight: "100%", backgroundColor: "#f7f9f8", color: "#102633", fontFamily: "Arial, sans-serif" },
  mobileFull: { flexBasis: "auto", minWidth: 0, width: "100%", maxWidth: "100%" }, mobileColumn: { flexDirection: "column" }, mobileAlignStart: { alignItems: "flex-start" }, heroTitleMobile: { fontSize: 48, lineHeight: 47, letterSpacing: -3 },
  header: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,.15)" },
  headerInner: { width: "100%", maxWidth: 1180, minHeight: 84, marginHorizontal: "auto", paddingHorizontal: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 20 },
  logo: { width: 122, height: 58, backgroundColor: "#fff", borderRadius: 8 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  navLink: { paddingHorizontal: 10, paddingVertical: 10 }, navText: { color: "rgba(255,255,255,.78)", fontSize: 14, fontWeight: "600" },
  action: { minHeight: 48, paddingHorizontal: 20, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 11 },
  actionBlue: { backgroundColor: "#0768ad", color: "#fff" }, actionLight: { backgroundColor: "#fff", color: "#075f9d" },
  actionHover: { transform: [{ translateY: -2 }] }, actionPressed: { opacity: 0.78, transform: [{ translateY: 0 }] },
  actionText: { fontSize: 14, fontWeight: "750" }, actionTextWhite: { color: "#fff" }, actionTextBlue: { color: "#075f9d" },
  hero: { position: "relative", overflow: "hidden", backgroundColor: "#062f50" },
  heroVideoOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba(2,24,40,.46)", zIndex: 1 },
  heroVideoShade: { position: "absolute", top: 0, bottom: 0, left: 0, width: "64%", backgroundColor: "rgba(3,38,62,.32)", zIndex: 2 },
  heroVideoShadeMobile: { width: "100%", backgroundColor: "rgba(3,29,47,.54)" },
  heroInner: { width: "100%", maxWidth: 1180, minHeight: 760, marginHorizontal: "auto", paddingTop: 150, paddingBottom: 80, paddingHorizontal: 24, flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 48, position: "relative", zIndex: 3 },
  heroCopy: { flexGrow: 1, flexBasis: 500, maxWidth: 660, zIndex: 3 },
  eyebrowRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 24 }, eyebrowLine: { width: 32, height: 2, backgroundColor: "#7dddf3" },
  eyebrow: { color: "#b8eaf5", fontSize: 11, fontWeight: "700", letterSpacing: 1.6 },
  heroTitle: { color: "#fff", fontSize: 68, lineHeight: 65, letterSpacing: -4.2, fontWeight: "800", maxWidth: 650 },
  heroLead: { color: "rgba(255,255,255,.72)", fontSize: 18, lineHeight: 30, maxWidth: 610, marginTop: 28 },
  heroButtons: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 22, marginTop: 34 },
  secondaryLink: { minHeight: 48, flexDirection: "row", alignItems: "center", gap: 9, color: "#fff" }, secondaryText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  heroMeta: { flexDirection: "row", flexWrap: "wrap", gap: 42, marginTop: 46, paddingTop: 22, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,.14)" },
  metaTitle: { color: "#fff", fontSize: 13, fontWeight: "700", marginBottom: 4 }, metaText: { color: "rgba(255,255,255,.5)", fontSize: 12 },
  visualWrap: { flexGrow: 1, flexBasis: 350, minHeight: 460, alignItems: "center", justifyContent: "center", position: "relative" },
  climatePanel: { width: 214, minHeight: 154, padding: 18, backgroundColor: "rgba(4,49,84,.96)", borderWidth: 1, borderColor: "rgba(170,237,255,.8)", borderRadius: 14, alignItems: "center", justifyContent: "center", zIndex: 3, boxShadow: "0 22px 60px rgba(0,18,36,.38)" },
  temperatureWrap: { alignItems: "center", marginTop: 10 }, temperature: { color: "#7dddf3", fontSize: 42, lineHeight: 46, fontWeight: "800", letterSpacing: -2.5 }, temperatureLabel: { color: "rgba(224,249,255,.58)", fontSize: 8, fontWeight: "700", letterSpacing: 1.1 },
  levels: { height: 28, flexDirection: "row", alignItems: "flex-end", gap: 6, marginTop: 13, paddingTop: 8, borderTopWidth: 1, borderTopColor: "rgba(150,227,248,.2)" }, level: { width: 13, borderRadius: 2, backgroundColor: "#7dddf3" },
  trustBar: { backgroundColor: "#7dddf3", overflow: "hidden" }, marqueeViewport: { width: "100%", overflow: "hidden" },
  trustItem: { flexGrow: 1, flexBasis: 220, minHeight: 72, flexDirection: "row", alignItems: "center", gap: 14, borderRightWidth: 1, borderRightColor: "rgba(5,70,111,.18)" }, trustNumber: { color: "#075f9d", fontSize: 11, fontWeight: "800" }, trustText: { color: "#073c60", fontSize: 13, fontWeight: "750" },
  productsSection: { paddingVertical: 110, backgroundColor: "#f4f8f9" },
  productGrid: { flexDirection: "row", flexWrap: "wrap", gap: 18 },
  productCard: { flexGrow: 1, flexBasis: 320, minWidth: 290, maxWidth: 370, overflow: "hidden", borderWidth: 1, borderColor: "#dbe6e9", borderRadius: 14, backgroundColor: "#fff", boxShadow: "0 18px 55px rgba(6,47,80,.07)" },
  productImageWrap: { width: "100%", minHeight: 250, padding: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#edf2f3" },
  productImage: { width: "100%", height: 220 },
  productContent: { padding: 26 },
  productBrand: { color: "#0768ad", fontSize: 10, fontWeight: "800", letterSpacing: 1.6, textTransform: "uppercase", marginBottom: 10 },
  productName: { color: "#102633", fontSize: 22, lineHeight: 27, fontWeight: "800", letterSpacing: -0.7 },
  productDetail: { color: "#60717b", fontSize: 13, lineHeight: 21, marginTop: 10 },
  productAction: { minHeight: 48, marginTop: 24, paddingHorizontal: 17, borderRadius: 7, borderWidth: 1, borderColor: "#bdd8e7", color: "#0768ad", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, backgroundColor: "#f5fbfd" },
  productActionHover: { transform: [{ translateY: -2 }], borderColor: "#0768ad", backgroundColor: "#eef8fb" },
  productActionText: { color: "#075f9d", fontSize: 13, fontWeight: "750" },
  section: { paddingVertical: 110, backgroundColor: "#fff" }, container: { width: "100%", maxWidth: 1180, marginHorizontal: "auto", paddingHorizontal: 24 },
  sectionHeading: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32, marginBottom: 48 }, headingCopy: { flexGrow: 1, flexBasis: 500 },
  kicker: { color: "#0768ad", fontSize: 10, fontWeight: "800", letterSpacing: 1.6, marginBottom: 18 }, kickerLight: { color: "#7dddf3", fontSize: 10, fontWeight: "800", letterSpacing: 1.6, marginBottom: 18 },
  sectionTitle: { color: "#102633", fontSize: 46, lineHeight: 49, letterSpacing: -2.3, fontWeight: "800", maxWidth: 680 }, sectionLead: { color: "#60717b", fontSize: 15, lineHeight: 25, maxWidth: 390, flexGrow: 1, flexBasis: 280 },
  cardGrid: { flexDirection: "row", flexWrap: "wrap", gap: 18 }, serviceCard: { flexGrow: 1, minWidth: 290, maxWidth: 370, minHeight: 310, padding: 28, borderWidth: 1, borderColor: "#dde6e9", borderRadius: 12, backgroundColor: "#fbfcfc" },
  cardIcon: { width: 54, height: 54, borderRadius: 27, backgroundColor: "#eaf6fa", color: "#0768ad", alignItems: "center", justifyContent: "center", marginBottom: 24 }, cardNumber: { color: "#0768ad", fontSize: 46, lineHeight: 48, fontWeight: "800", letterSpacing: -3, marginBottom: 20 },
  cardTitle: { color: "#102633", fontSize: 22, fontWeight: "800", letterSpacing: -0.7, marginTop: 12, marginBottom: 12 }, cardBody: { color: "#60717b", fontSize: 14, lineHeight: 23, minHeight: 70 }, cardLink: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 25, color: "#0768ad" }, cardLinkText: { color: "#0768ad", fontSize: 13, fontWeight: "750" },
  darkSection: { paddingVertical: 110, backgroundColor: "#082b43" }, darkInner: { width: "100%", maxWidth: 1180, marginHorizontal: "auto", paddingHorizontal: 24, flexDirection: "row", flexWrap: "wrap", gap: 72 }, darkIntro: { flexGrow: 1, flexBasis: 410, maxWidth: 520 },
  darkTitle: { color: "#fff", fontSize: 46, lineHeight: 49, letterSpacing: -2.3, fontWeight: "800" }, darkLead: { color: "rgba(255,255,255,.6)", fontSize: 15, lineHeight: 25, marginTop: 24, marginBottom: 30 },
  segmentList: { flexGrow: 1, flexBasis: 420, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,.14)" }, segmentRow: { minHeight: 122, flexDirection: "row", alignItems: "center", gap: 20, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,.14)" }, segmentIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(125,221,243,.1)", color: "#7dddf3", alignItems: "center", justifyContent: "center" }, segmentCopy: { flex: 1 }, segmentTitle: { color: "#fff", fontSize: 19, fontWeight: "750", marginBottom: 7 }, segmentText: { color: "rgba(255,255,255,.54)", fontSize: 13, lineHeight: 21 },
  processSection: { paddingVertical: 120, backgroundColor: "#eef7f8" }, processHeading: { width: "100%", alignItems: "center" }, processSectionTitle: { color: "#102633", fontSize: 52, lineHeight: 56, letterSpacing: -2.6, fontWeight: "800", textAlign: "center", maxWidth: 760 }, processGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 28, marginTop: 56 }, processCard: { flexGrow: 1, minWidth: 280, maxWidth: 370, minHeight: 270, paddingTop: 32, paddingHorizontal: 20, borderTopWidth: 3, borderTopColor: "#0768ad", color: "#0768ad", alignItems: "center" }, processNumber: { color: "#0768ad", fontSize: 34, lineHeight: 38, letterSpacing: -1.8, fontWeight: "800", marginTop: 24 }, processTitle: { color: "#102633", fontSize: 22, fontWeight: "800", marginTop: 10, textAlign: "center" }, processText: { color: "#60717b", fontSize: 15, lineHeight: 24, marginTop: 10, maxWidth: 300, textAlign: "center" },
  faqInner: { width: "100%", maxWidth: 1180, marginHorizontal: "auto", paddingHorizontal: 24, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 72 }, faqIntro: { width: "100%", maxWidth: 500, alignItems: "flex-start" }, faqLead: { color: "#60717b", fontSize: 15, lineHeight: 25, maxWidth: 390, marginTop: 24 }, faqList: { flexGrow: 1, flexBasis: 440, borderTopWidth: 1, borderTopColor: "#dce5e8" }, faqItem: { borderBottomWidth: 1, borderBottomColor: "#dce5e8" }, faqButton: { minHeight: 96, flexDirection: "row", alignItems: "center", gap: 18 }, faqIndex: { width: 54, color: "#0768ad", fontSize: 26, lineHeight: 30, letterSpacing: -1.6, fontWeight: "800" }, faqQuestion: { flex: 1, color: "#102633", fontSize: 16, fontWeight: "750" }, faqToggle: { color: "#0768ad", fontSize: 22, fontWeight: "400" }, faqAnswer: { color: "#60717b", fontSize: 14, lineHeight: 23, paddingLeft: 72, paddingRight: 22, paddingBottom: 26 },
  ctaSection: { paddingVertical: 82, backgroundColor: "#0768ad" }, ctaInner: { width: "100%", maxWidth: 1180, marginHorizontal: "auto", paddingHorizontal: 24, flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 34 }, ctaCopy: { width: "100%", alignItems: "flex-start" }, ctaTitle: { color: "#fff", fontSize: 42, lineHeight: 45, fontWeight: "800", letterSpacing: -2, maxWidth: 650 },
  footer: { backgroundColor: "#071d2c" }, footerInner: { width: "100%", maxWidth: 1180, marginHorizontal: "auto", paddingTop: 64, paddingHorizontal: 24, paddingBottom: 58, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 42 }, footerColumn: { flexGrow: 1, flexBasis: 175, maxWidth: 235 }, footerBrand: { flexBasis: 280, maxWidth: 330 }, footerContact: { flexBasis: 245, maxWidth: 290 }, footerLogo: { width: 138, height: 76, borderRadius: 8, backgroundColor: "#fff" }, footerText: { color: "rgba(255,255,255,.54)", fontSize: 13, lineHeight: 22, marginTop: 20 }, footerHeading: { color: "#fff", fontSize: 12, fontWeight: "800", letterSpacing: 1.4, marginBottom: 22 }, footerItem: { color: "rgba(255,255,255,.64)", fontSize: 13, lineHeight: 21 }, footerNavLink: { minHeight: 32, justifyContent: "center" }, footerContactRow: { minHeight: 38, flexDirection: "row", alignItems: "center", gap: 11, color: "#7dddf3" }, footerBottom: { width: "100%", paddingHorizontal: 24, paddingVertical: 24, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,.1)", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 }, footerLegal: { color: "rgba(255,255,255,.4)", fontSize: 11, textAlign: "center" },
});