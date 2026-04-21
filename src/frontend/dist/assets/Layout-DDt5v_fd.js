import { j as jsxRuntimeExports, u as useAuth, r as reactExports, n as mockNotifications, o as useRouterState, L as Link } from "./index-DUhyqyFb.js";
import { c as createLucideIcon, S as Slot, a as cn, e as cva } from "./createLucideIcon-j6fs3MjL.js";
import { C as ChevronLeft } from "./chevron-left-CGIb9UqK.js";
import { B as Bus } from "./bus-DPlZB0_1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function useNotifications() {
  const { utilisateur } = useAuth();
  const [notifications, setNotifications] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!utilisateur) {
      setNotifications([]);
      return;
    }
    const notifs = mockNotifications.filter((n) => n.utilisateurId === utilisateur.id).sort((a, b) => b.timestamp - a.timestamp);
    setNotifications(notifs);
  }, [utilisateur]);
  const nonLues = notifications.filter((n) => !n.lue).length;
  const marquerLue = reactExports.useCallback((id) => {
    setNotifications(
      (prev) => prev.map((n) => n.id === id ? { ...n, lue: true } : n)
    );
  }, []);
  const marquerToutesLues = reactExports.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, lue: true })));
  }, []);
  const ajouterNotification = reactExports.useCallback(
    (typeNotif, message) => {
      if (!utilisateur) return;
      const nouvelle = {
        id: Date.now(),
        utilisateurId: utilisateur.id,
        typeNotif,
        message,
        timestamp: Date.now(),
        lue: false
      };
      setNotifications((prev) => [nouvelle, ...prev]);
    },
    [utilisateur]
  );
  const supprimerNotification = reactExports.useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);
  return {
    notifications,
    nonLues,
    marquerLue,
    marquerToutesLues,
    ajouterNotification,
    supprimerNotification
  };
}
const onglets = [
  {
    href: "/tableau-de-bord",
    label: "Accueil",
    icon: LayoutDashboard,
    ocid: "nav.dashboard_tab"
  },
  { href: "/bus", label: "Autobus", icon: Bus, ocid: "nav.bus_tab" },
  {
    href: "/historique",
    label: "Historique",
    icon: History,
    ocid: "nav.history_tab"
  },
  { href: "/profil", label: "Compte", icon: User, ocid: "nav.profil_tab" }
];
function Layout({ children, titre, retour, actions }) {
  const { utilisateur, estConnecte } = useAuth();
  const { nonLues } = useNotifications();
  const routerState = useRouterState();
  const cheminActuel = routerState.location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-primary text-primary-foreground shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 max-w-lg mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        retour ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: retour,
            className: "p-1.5 rounded-full hover:bg-primary-foreground/10 transition-smooth -ml-1",
            "data-ocid": "nav.back_button",
            "aria-label": "Retour",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg tracking-tight truncate", children: titre ?? "BusPass" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
        actions,
        estConnecte && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/profil",
            className: "relative p-2 rounded-full hover:bg-primary-foreground/10 transition-smooth",
            "data-ocid": "nav.notifications_button",
            "aria-label": "Notifications",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
              nonLues > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground border-0",
                  "data-ocid": "nav.notifications_badge",
                  children: nonLues > 9 ? "9+" : nonLues
                }
              )
            ]
          }
        ),
        estConnecte && utilisateur && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium leading-none opacity-90 truncate max-w-[120px]", children: utilisateur.nomComplet.split(" ")[0] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center font-semibold text-sm shrink-0", children: utilisateur.nomComplet.charAt(0).toUpperCase() })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pb-24 max-w-lg mx-auto w-full", children }),
    estConnecte && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-[0_-2px_12px_rgba(0,0,0,0.06)]",
        "aria-label": "Navigation principale",
        "data-ocid": "nav.bottom_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-stretch max-w-lg mx-auto w-full", children: onglets.map(({ href, label, icon: Icon, ocid }) => {
          const actif = cheminActuel === href || href !== "/tableau-de-bord" && cheminActuel.startsWith(href);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: href,
              className: cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 py-3 px-1 min-h-[60px] transition-smooth",
                actif ? "text-primary" : "text-muted-foreground hover:text-foreground"
              ),
              "data-ocid": ocid,
              "aria-current": actif ? "page" : void 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "relative p-1.5 rounded-xl transition-smooth",
                      actif && "bg-primary/10"
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5", strokeWidth: actif ? 2.5 : 2 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-[10px] font-medium leading-none",
                      actif ? "font-semibold" : ""
                    ),
                    children: label
                  }
                )
              ]
            },
            href
          );
        }) })
      }
    )
  ] });
}
export {
  Badge as B,
  History as H,
  Layout as L,
  User as U,
  Bell as a,
  useNotifications as u
};
