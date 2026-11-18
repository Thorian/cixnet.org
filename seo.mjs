export const origin='https://cixnet.org';
export const metadata={
'/field-notes/global-reticulum-connection/':['Testing a connection to the global Reticulum network — ciXnet','Plans for a gradual trial connection to the global Reticulum network, including image generation, mail and library services, with monitoring of its impact.'],
'/field-notes/opening-up-to-the-community/':['Opening up to the community — ciXnet','ciXnet is publishing its tools, client software and libraries on GitHub, with a gradual rollout through March 2027 and an invitation for feedback.'],
'/':['ciXnet — Reticulum networks, software & engineering','Reticulum-based communications infrastructure, Wi-Fi HaLow backbone links, LoRa access nodes, software projects and configuration guides from ciXnet.'],
'/network/':['The ciXnet network','How ciXnet uses Reticulum, Wi-Fi HaLow and LoRa, and how everyday use shaped our client software, publishing tools and backbone links.'],
'/network/reticulum/':['What is Reticulum?','An introduction to Reticulum networking: radio and IP connections, destination addresses, encryption, applications and how ciXnet uses them.'],
'/projects/':['ciXnet software & network projects','Explore NomadPL, retdns, the ciXnet client, GroupChat and network services, with project documentation, configuration guides and GitHub links.'],
'/projects/nomadpl/':['NomadPL — HTML publishing over Reticulum','Publish HTML pages and applications over Reticulum with NomadPL. Read the project background, setup commands, documentation and release information.'],
'/projects/retdns/':['retdns — Reticulum name service','Readable names for Reticulum destinations. Learn about retdns registration, forward and reverse lookups, caching and server configuration.'],
'/projects/client/':['ciXnet client — browsing & messaging','The ciXnet client combines a built-in browser, a bridge for regular browsers and LXMF messaging. Read about its features and development status.'],
'/projects/groupchat/':['ciXnet GroupChat — LXMF group channels','Group channels over LXMF with membership, administration and NomadNet or NomadPL management. Channel behaviour and common commands explained.'],
'/projects/connect/':['ciXnet Connect — gateways & propagation','Gateway connectivity and LXMF message propagation in ciXnet. Learn how Connect fits into the network and the status of public connection settings.'],
'/projects/mail/':['ciXnet Mail — service plans','Plans for ciXnet Mail, including internet email addresses and access through the network. Read the current status of the proposed service.'],
'/projects/library/':['ciXnet library tools','Our work on software for curating and hosting collections within a network, with links to related ciXnet publishing projects.'],
'/hardware/':['ciXnet hardware & node assemblies','LoRa access nodes, vehicle installations and Raspberry Pi assemblies with HaLow, USB LoRa and battery power. Hardware notes from ciXnet.'],
'/field-notes/':['ciXnet build reports','Read about permanent vehicle nodes, the move from LoRa to HaLow backbone links and practical decisions behind the ciXnet network.'],
'/field-notes/vehicle-nodes/':['Permanent LoRa nodes in vehicles','Why ciXnet started leaving Bluetooth-connected LoRa nodes powered in vehicles, and how simpler access changed everyday network use.'],
'/field-notes/halow-backbone/':['Moving the ciXnet backbone to Wi-Fi HaLow','How simultaneous use exposed LoRa airtime limits between nodes, why ciXnet moved its backbone to HaLow and where LoRa still fits.'],
'/assistance/':['Network assessments, deployment & engineering — ciXnet','Site assessments, terrain and coverage surveys, deployment planning, software engineering and commissioning. Enquire about project scope and availability.'],
'/about/':['About ciXnet','The background to ciXnet, our Reticulum-based network and the hardware and software decisions that developed through everyday use.'],
'/configurations/':['ciXnet setup & configuration guides','Set up NomadPL publishing and retdns name resolution. Find client and GroupChat information, source documentation and GitHub support links.'],
'/404.html':['Page not found — ciXnet','The requested page could not be found. Browse ciXnet projects, network information and configuration guides.']
};
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function seoHead(path){
 if(!metadata[path])throw Error('Missing metadata for '+path);
 const [title,description]=metadata[path], url=origin+path;
 const globalTrial=path==='/field-notes/global-reticulum-connection/';
 const community=path==='/field-notes/opening-up-to-the-community/';
 const shareImage=globalTrial?'global-reticulum-cover-v1.webp':community?'opening-community-cover-v1.webp':'social-coast.jpg';
 const shareAlt=globalTrial?'A local network linked to a wider mesh through a trial connection':community?'Code editor and Python project files':'Coastal Nova Scotia with an antenna overlooking the ocean';
 return `<title>${esc(title)}</title><meta name="description" content="${esc(description)}">${path==='/404.html'?'<meta name="robots" content="noindex,follow">':`<link rel="canonical" href="${url}">`}<meta property="og:type" content="website"><meta property="og:site_name" content="ciXnet"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/${shareImage}"><meta property="og:image:width" content="${(community||globalTrial)?1672:1200}"><meta property="og:image:height" content="${(community||globalTrial)?941:630}"><meta property="og:image:alt" content="${shareAlt}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${origin}/assets/${shareImage}">`;
}
