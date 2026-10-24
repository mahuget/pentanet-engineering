// Real Pentanet Engineering PLC services — confirmed by client

export interface PentanetService {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  color: string;
  lightColor: string;
  iconColor: string;
  features: string[];
  heroImage: string;
}

export const PENTANET_SERVICES: PentanetService[] = [
  {
    slug: "telecom-installation",
    title: "Telecom Installation",
    shortDescription:
      "End-to-end installation of telecommunications equipment, base stations, and network infrastructure across Ethiopia.",
    fullDescription:
      "Pentanet Engineering PLC provides comprehensive telecom installation services covering the full lifecycle from site survey and design through equipment procurement, installation, testing, and commissioning. Our experienced teams install base transceiver stations (BTS), antennas, transmission equipment, and associated network infrastructure to exacting standards. We work across all major telecom technologies and support both greenfield installations and network expansion projects for operators throughout Ethiopia and East Africa.",
    icon: "Radio",
    color: "from-blue-500 to-cyan-500",
    lightColor: "bg-blue-50",
    iconColor: "text-blue-600",
    features: [
      "Base station installation",
      "Antenna systems",
      "Cable management",
      "Network commissioning",
      "Site surveys & planning",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    slug: "tower-erection",
    title: "Tower Erection",
    shortDescription:
      "Professional construction and erection of telecom towers, masts, and transmission structures to the highest safety standards.",
    fullDescription:
      "Our tower erection division specialises in the design, fabrication, and erection of all types of telecommunications and transmission structures. From self-supporting lattice towers and guyed masts to monopoles and rooftop installations, we deliver robust, safely erected structures that meet international structural codes and telecom operator specifications. Every project is underpinned by thorough foundation engineering, rigorous structural analysis, and uncompromising safety management on-site.",
    icon: "TowerControl",
    color: "from-orange-500 to-amber-500",
    lightColor: "bg-orange-50",
    iconColor: "text-orange-600",
    features: [
      "Self-supporting towers",
      "Guyed mast structures",
      "Rooftop installations",
      "Foundation engineering",
      "Structural inspections",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    slug: "telecom-cw-construction",
    title: "Telecom CW Construction",
    shortDescription:
      "Civil works construction for telecom infrastructure — shelters, compound walls, access roads, and site preparation.",
    fullDescription:
      "Civil works are the foundation of every reliable telecom site. Pentanet Engineering PLC delivers all civil works associated with telecom infrastructure development: BTS equipment shelters, compound boundary walls, access roads, cable trenching and ducting, drainage, and full site preparation. Our civil teams work to tight programmes alongside installation teams to ensure seamless site delivery, reducing overall project durations and minimising operational impact for network operators.",
    icon: "HardHat",
    color: "from-yellow-500 to-orange-500",
    lightColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    features: [
      "BTS shelter construction",
      "Compound & perimeter walls",
      "Access road construction",
      "Cable trenching",
      "Site preparation & grading",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    slug: "power-installation",
    title: "Power Installation",
    shortDescription:
      "Complete electrical power systems installation for commercial, industrial, and telecom sites across Ethiopia.",
    fullDescription:
      "Reliable power is critical for every telecom and industrial facility. Pentanet Engineering PLC designs and installs complete electrical power systems — from high-voltage incoming supplies through LV distribution, generator systems, battery backup, and power conditioning. We deliver compliant, safe, and reliable power installations across all project scales, from single telecom sites to large commercial and industrial facilities, following Ethiopian and international electrical standards.",
    icon: "Zap",
    color: "from-yellow-400 to-yellow-600",
    lightColor: "bg-yellow-50",
    iconColor: "text-yellow-500",
    features: [
      "HV/LV power systems",
      "Generator installation",
      "Battery backup systems",
      "Power distribution",
      "Earthing & lightning protection",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
  },
  {
    slug: "solar-installation",
    title: "Solar Installation",
    shortDescription:
      "Design and installation of solar photovoltaic systems for off-grid telecom sites, commercial buildings, and communities.",
    fullDescription:
      "Ethiopia's abundant solar resource makes solar PV a compelling solution for off-grid telecom sites and commercial energy needs. Pentanet Engineering PLC designs, supplies, and installs complete solar photovoltaic systems — from small off-grid systems for rural telecom sites through to large commercial roof and ground-mounted installations. Our scope encompasses system design, structural mounting, PV panel installation, battery storage, inverters, charge controllers, and integration with existing grid or generator power systems.",
    icon: "Sun",
    color: "from-amber-400 to-orange-500",
    lightColor: "bg-amber-50",
    iconColor: "text-amber-500",
    features: [
      "Solar PV system design",
      "Panel installation & mounting",
      "Battery storage systems",
      "Hybrid power systems",
      "O&M services",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  {
    slug: "data-center",
    title: "Data Center",
    shortDescription:
      "Data center construction, fit-out, and infrastructure installation — from server rooms to enterprise-grade facilities.",
    fullDescription:
      "From enterprise server rooms to carrier-grade data center facilities, Pentanet Engineering PLC delivers complete data center design, construction, and infrastructure fit-out. Our integrated capability covers structural and civil works, raised flooring, precision cooling systems, power and UPS infrastructure, structured cabling and containment, fire suppression, security and access control, and comprehensive commissioning. We ensure every facility meets international data center standards for reliability, security, and efficiency.",
    icon: "Server",
    color: "from-purple-500 to-indigo-600",
    lightColor: "bg-purple-50",
    iconColor: "text-purple-600",
    features: [
      "Data center design & build",
      "Structured cabling",
      "Cooling systems",
      "Power & UPS infrastructure",
      "Security & access control",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
];
