(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  const revealTargets = [
    ...document.querySelectorAll(".motion-reveal"),
    ...document.querySelectorAll("[data-motion-item]"),
  ];

  document.querySelectorAll("[data-stagger-group]").forEach((group) => {
    [...group.querySelectorAll("[data-motion-item]")].forEach((item, index) => {
      item.style.setProperty("--motion-delay", `${Math.min(index * 72, 216)}ms`);
    });
  });

  if (reduced) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  } else {
    root.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  const navLinks = [...document.querySelectorAll("[data-nav-section]")];
  const navSections = navLinks
    .map((link) => document.getElementById(link.dataset.navSection || ""))
    .filter(Boolean);

  if (navSections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          const current = link.dataset.navSection === visible.target.id;
          link.classList.toggle("is-current", current);
          if (current) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-30% 0px -58% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    navSections.forEach((section) => navObserver.observe(section));
  }

  const hero = document.getElementById("inicio");
  const heroVideo = document.getElementById("hero-video");
  const stickyCta = document.querySelector(".mobile-sticky-cta");
  const finalCta = document.querySelector(".cta-section");

  let heroVisible = true;
  let finalCtaVisible = false;

  const syncStickyCta = () => {
    if (!stickyCta) return;
    stickyCta.classList.toggle("is-visible", !heroVisible && !finalCtaVisible);
  };

  if (hero && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        syncStickyCta();

        if (!heroVideo || reduced) return;
        if (entry.isIntersecting && !document.hidden) {
          const playPromise = heroVideo.play();
          if (playPromise?.catch) playPromise.catch(() => {});
        } else {
          heroVideo.pause();
        }
      },
      { threshold: 0.08 }
    );
    heroObserver.observe(hero);
  }

  if (finalCta && "IntersectionObserver" in window) {
    const finalObserver = new IntersectionObserver(
      ([entry]) => {
        finalCtaVisible = entry.isIntersecting;
        syncStickyCta();
      },
      { threshold: 0.15 }
    );
    finalObserver.observe(finalCta);
  }

  document.addEventListener(
    "visibilitychange",
    () => {
      document.body.classList.toggle("page-hidden", document.hidden);
      if (!heroVideo || reduced) return;
      if (document.hidden) heroVideo.pause();
      else if (heroVisible) {
        const playPromise = heroVideo.play();
        if (playPromise?.catch) playPromise.catch(() => {});
      }
    },
    { passive: true }
  );
})();