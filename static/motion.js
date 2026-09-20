(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  const revealTargets = [
    ...document.querySelectorAll(".motion-reveal"),
    ...document.querySelectorAll("[data-motion-item]"),
  ];

  document.querySelectorAll("[data-stagger-group]").forEach((group) => {
    [...group.querySelectorAll("[data-motion-item]")].forEach((item, index) => {
      item.style.setProperty("--motion-delay", `${Math.min(index * 70, 210)}ms`);
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
      { rootMargin: "-32% 0px -56% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    navSections.forEach((section) => navObserver.observe(section));
  }

  document.addEventListener(
    "visibilitychange",
    () => document.body.classList.toggle("page-hidden", document.hidden),
    { passive: true }
  );
})();