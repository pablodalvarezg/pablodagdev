# PORTFOLIO_BRIEF.md — Portfolio de Pablo Álvarez Graña

> Documento de trabajo para un agente de desarrollo. Contiene contexto, decisiones ya tomadas, alcance de la fase 1, criterios de aceptación y backlog. Ante una ambigüedad no cubierta aquí, preguntar al usuario antes de asumir.

---

## 0. Instrucciones para el agente

- Idioma del sitio: **inglés por defecto con versión en español** (i18n desde el inicio; el usuario tiene inglés C1 y apunta a mercado internacional). `/` redirige a `/en/`.
- Trabajar por fases. **No empezar side projects hasta cerrar la Fase 1.**
- Commits pequeños y descriptivos, con los tags `[ADD]`, `[UPD]`, `[FIX]` y `[PAT]` (ver CLAUDE.md). README actualizado en cada fase.
- No inventar métricas ni datos de clientes: usar placeholders marcados `TODO(pablo):` donde falte información.
- El portfolio mezcla **trabajo profesional** y **side projects propios**. El trabajo profesional se publica solo con lo que el cliente permite decir; si no hay permiso explícito, se anonimiza.
- No usar logos, arte ni assets oficiales de marcas de terceros (Pokémon, fabricantes de autos, BoardGameGeek, etc.). Todo el arte debe ser original.

---

## 1. Sobre el dueño del portfolio

**Pablo Daniel Álvarez Graña** — Full-Stack & Low/No-Code Developer, Buenos Aires, Argentina.

- Email: pablo.alvarez4284@gmail.com
- LinkedIn: https://www.linkedin.com/in/pablodalvarezg
- GitHub: https://github.com/pablodalvarezg
- Formación: Full-Stack Developer (Coderhouse). Inglés C1.

**Stack:** HTML5, CSS3/SASS, Bootstrap, JavaScript, React, Node.js, Express, Python, MongoDB, PostgreSQL, SQL Server, Supabase, PHP/WordPress, Bubble, Retool, WeWeb, Make, n8n, Odoo, Softland.

**Intereses personales** (base de los side projects): pádel, juegos de mesa, Pokémon, estética japonesa, estética cyberpunk, autos deportivos.

### Experiencia

| Período | Empresa / Rol | Puntos a destacar |
|---|---|---|
| 07/2025 – hoy | Assisted Living Magazine — Full-Stack & WordPress Developer | Features desde Figma, performance, SEO técnico, pipelines de datos |
| 10/2024 – 07/2025 | Sidetool — Full-Stack & Low/No-Code Developer | Apps completas desde cero, APIs a medida, integración de IA, gestión de bases SQL/NoSQL |
| 07/2023 – 10/2024 | Activa Soluciones IT — Consultor Odoo | Implementación funcional y técnica de Odoo (Python, XML, JS); soporte Softland con SQL Server y PostgreSQL |
| 01/2022 – hoy | Freelance — Web Developer | React, Node/Express, WordPress, Retool |

**Posicionamiento (usar como hilo conductor del copy):** elige la herramienta justa para cada problema, desde código a medida hasta low-code y ERP, y domina la capa de datos.

---

## 2. Concepto: "Un hub, muchos mundos"

- El **hub** (home, experiencia, about, contacto) tiene una identidad **neutra, limpia y moderna**.
- Cada **proyecto** es un "mundo" con estética propia: al entrar en su case study, cambian paleta, tipografía y microinteracciones. El layout base se mantiene.
- **Feature diferencial:** en el hub, al hacer hover/focus sobre la card de un proyecto, el fondo del hub previsualiza brevemente la estética de ese mundo (transición suave, respetar `prefers-reduced-motion`).

---

## 3. Stack técnico (decidido)

| Pieza | Decisión |
|---|---|
| Framework | **Next.js 16** con App Router y `output: 'export'` (HTML estático, sin servidor) |
| Estilos | Tailwind CSS + tokens por tema vía CSS custom properties |
| Contenido | MDX leído del filesystem, con frontmatter validado por Zod |
| i18n | Segmento `[lang]` con `generateStaticParams`; rutas `/en/` y `/es/` |
| Deploy | Vercel o Cloudflare Pages (preview por PR) |
| Calidad | ESLint, Prettier, Lighthouse CI en GitHub Actions |
| SEO | Sitemap, `robots.txt`, canonical, hreflang, OG images generadas, JSON-LD `Person` y `CreativeWork` |

### Estructura propuesta

```
/
├─ src/
│  ├─ content/
│  │  └─ projects/{es,en}/*.mdx   # un archivo por side project; su página ES su case study
│  ├─ themes/                 # un archivo de tokens por mundo
│  │  │                        # (no hay base.css: los tokens base viven en el
│  │  │                        #  bloque @theme de styles/global.css, porque
│  │  │                        #  Tailwind necesita una sola entrada de CSS)
│  │  ├─ vigil.css
│  │  ├─ atlas.css
│  │  ├─ umbral.css
│  │  ├─ bandeja.css
│  │  ├─ meeple-log.css
│  │  ├─ type-matrix.css
│  │  └─ game-night.css
│  ├─ modules/               # un módulo por dominio (ver CLAUDE.md)
│  ├─ shared/                # primitivas de UI y configuración del sitio
│  └─ app/
│     ├─ layout.tsx          # html, body, tokens
│     └─ [lang]/
│        ├─ layout.tsx       # aplica lang y data-theme
│        ├─ page.tsx         # el hub
│        └─ projects/[slug]/page.tsx
├─ public/
└─ README.md
```

### Frontmatter de un case study / proyecto

```yaml
title: string
slug: string
summary: string            # 1–2 líneas
role: string
period: string
client?: string            # solo en trabajo profesional, y solo con permiso para nombrarlo
stack: string[]
skills: ["fullstack" | "data" | "lowcode" | "erp" | "ai" | "seo" | "design"]
theme: string              # nombre del archivo en /themes
links: { demo?: string, repo?: string }
cover: string
featured: boolean
draft: boolean
```

### Plantilla de contenido de un case study

1. Problema
2. Restricciones
3. Solución (con diagrama)
4. Stack
5. Resultado (con números reales o `TODO(pablo):`)
6. Qué mejoraría

---

## 4. Fase 1 — El hub (ALCANCE ACTUAL)

> **Cambio de alcance, segunda corrección.** La fase arrancó pidiendo tres case studies de trabajo de clientes, se redujo a "el hub más la maquinaria lista para el primero" bajo la premisa de que no había trabajo de clientes que mostrar, y esa premisa era falsa: **Security Token Markets (stm.co) es trabajo profesional, nombrable y con números reales**. Así que la Fase 1 cierra con **el hub terminado más un case study publicado**, que es lo que prueba la maquinaria de verdad.
>
> Lo que sí se mantiene de la corrección anterior: el campo `type` no vuelve. Un case study es un case study. Lo que distingue el trabajo profesional del side project es el campo `client` del frontmatter: si está, la página dice para quién se hizo; si no está, es un proyecto propio.

### Páginas / secciones

1. **Hero** — nombre, propuesta de valor en una línea, CTA a contacto.
2. **Qué hago** — 5 bloques: Full-Stack (MERN) · Data & SQL · Low/No-Code & Automatización · ERP (Odoo) · IA aplicada y SEO técnico.
3. **Experiencia** — línea de tiempo con la tabla de la sección 1.
4. **Trabajo** — una sola grilla. Arriba lo que ya existe y tiene case study, empezando por STM; después los mundos de la sección 5, cada uno en "Próximamente" hasta que el proyecto exista.
5. **Sobre mí** — breve, con intereses personales.
6. **Contacto** — email, LinkedIn y GitHub. **Sin CV descargable:** el portfolio cumple esa función, y un PDF aparte es una copia más que se desactualiza.

No hay dos grillas separadas: un case study es el artículo sobre un proyecto, no una categoría aparte.

### Estado al 2026-09-25

Lo que existe hoy en `main`, para no tener que deducirlo del código:

**Páginas construidas** (4, todas estáticas): `/en/` y `/es/` (el hub), `/en/projects/stm/` y `/es/projects/stm/`. `/` redirige a `/en/` con un meta refresh en `public/index.html`, porque un export estático no admite redirects de servidor.

**El hub** tiene hero, "qué hago" (5 bloques), la línea de tiempo de experiencia con barras proporcionales, la grilla de trabajo, sobre mí y contacto. Falta la grilla de los 7 side projects en "Próximamente".

**Módulos**: `experience`, `hub`, `i18n`, `projects`, `theming`. Los límites los hace cumplir `eslint-plugin-boundaries`, verificado con fixtures.

**Temas**: dos mundos, `base` (hub) y `markets` (STM). Ambos clarean AA en claro y oscuro.

**Contenido**: un case study, STM, en los dos idiomas. `TODO(pablo):` le faltan las fechas del `period`, y tres párrafos son inferencias mías sin confirmar (el problema, el rol de Express y el renderizado en el navegador).

**Verificación**: 34 tests unitarios, `check` y `lint` en verde. No hay e2e ni Lighthouse.

**Deploy**: ninguno. No hay dominio.

### Criterios de aceptación de la Fase 1

- [x] ES/EN funcionando. **Sin hreflang**: el switcher deriva la ruta traducida, pero no se emite `<link rel="alternate">`. Depende del módulo `seo`.
- [x] Sistema de temas operativo: cambiar `theme` en el frontmatter cambia la estética sin tocar componentes. Probado con `markets` en STM.
- [x] Modo claro/oscuro en el hub.
- [x] Colección de contenido con schema Zod, layout de case study y rutas bilingües, verificadas **con el case study de STM**, no con una plantilla.
- [ ] JSON-LD `Person` válido y meta tags de Open Graph por página. **Nada de esto existe**: hoy cada página emite solo título y descripción.
- [ ] Responsive real desde 360 px. Sin verificar.
- [x] README con cómo correr, cómo agregar un case study y cómo crear un tema nuevo.
- [ ] ADR 0001 documentando la elección de monolito modular. La carpeta `docs/adr/` no existe.

### Lo que sigue, en orden

1. **ADR 0001** (monolito modular) y **0002** (migración de Astro a Next). Es criterio de aceptación y la 0002 ya está referenciada desde `CLAUDE.md` sin existir.
2. **Módulo `seo`**: canonical, hreflang, sitemap, JSON-LD `Person` y `CreativeWork`. Necesita que se decida el dominio primero, porque todo sale de `SITE_URL`.
3. **Grilla de side projects** en el hub, con los 7 mundos de la sección 5 en "Próximamente".
4. **Responsive a 360 px** y **Playwright + Lighthouse CI**. Lighthouse se mide contra un sitio desplegado, así que va después del deploy.
5. **Completar STM**: fechas y revisión de las tres inferencias.

### Movido fuera de la Fase 1

- **Deploy con dominio.** `TODO(pablo):` sigue sin dominio definido.
- **Preview de tema en hover/focus.** Necesita al menos dos mundos con contenido real para que se note.
- **Lighthouse ≥ 90 y Playwright.** Se miden contra un sitio desplegado.
- **Case studies de los side projects.** Cada uno llega con su proyecto construido. El de STM no espera a nadie: el trabajo ya existe.

---

## 5. Backlog — Side projects (fases siguientes)

Cada side project es un **repo independiente** con demo en vivo, y tiene su case study en el portfolio usando su tema. El slug del proyecto es el mismo en el repo, en la colección de contenido y en la card del hub.

Esta sección es solo de side projects. El trabajo profesional no tiene backlog: se documenta cuando existe y cuando hay permiso para contarlo.

> **Lineup revisado.** Este backlog pasó de nueve proyectos a siete, con tres criterios: que cada uno tenga al menos un problema difícil que no sea de interfaz, que se pueda presentar sin explicar por qué existe, y que su fuente de datos sea documentada y estable. Al final de la sección está lo que se cayó y por qué.

### 🛰️ Vigil — monitor de uptime y SEO técnico

- Sondas HTTP con timeout, reintentos y percentiles de latencia (p50, p95, p99); Core Web Vitals por URL; estado de indexación desde Search Console; diff de `robots.txt` y meta robots entre corridas; alertas con silenciamiento y escalamiento; página de estado pública.
- **Stack:** Node o Python, jobs programados, series temporales con rollups, APIs de Google.
- **Lo difícil:** un scheduler que no derive con el tiempo; **deduplicación de alertas** (un sitio caído treinta minutos manda una alerta, no seis); retención por resolución; concurrencia con backpressure.
- **Estética:** oscuro sobrio, mono para los números, color semántico —verde, ámbar, rojo— reservado al estado. **Sin glitch ni efectos:** un monitor que parece un videojuego no lo mira nadie en serio.

### 🧭 Atlas — catálogo de tokens enfocado en performance

- Listado con búsqueda, filtros y orden; página por token con precio, capitalización, suministro y rangos; **dónde comprarlo**, con enlaces a los venues oficiales; comparador lado a lado. No gestiona carteras ni calcula resultados: su trabajo es que encuentres un token y salgas hacia el lugar correcto.
- **Stack:** render estático con revalidación programada, caché en capas, CoinGecko.
- **Lo difícil:** **que el HTML llegue con los datos adentro**, no un esqueleto que pide todo por fetch; jerarquía de caché borde/app/upstream con `stale-while-revalidate`; ingesta por lotes priorizando los tokens más vistos; **presupuesto de performance en CI** con umbrales de LCP, CLS y bytes de JS que rompen el build.
- **Wow:** la métrica reportada no es "se siente rápido", es el peso del HTML de una página de token y el LCP en red lenta, medidos antes y después.
- **Extra:** el enlace de salida pasa por un endpoint propio de redirección, para contar clics sin meter un tracker de terceros en una página con presupuesto de performance.
- **Estética:** clara y densa, tabular. `font-variant-numeric: tabular-nums` en toda columna de números.
- **Precedente:** STM (sección 4) es este mismo problema resuelto contra un plazo de cuatro semanas. Atlas es la versión con presupuesto de performance, y el case study de STM nombra esa diferencia en vez de esconderla.

### 💰 Umbral — gastos, límites y pronóstico

- Carga de gastos con categoría y porcentajes sobre el total; **límites por categoría en monto fijo o en porcentaje del ingreso**; aviso al cargar, antes de guardar, cuando el gasto excede el límite; pronóstico de ingresos y ahorro por prorrateo de los últimos seis meses; detección automática de gastos recurrentes; comparación mes contra mes.
- **Stack:** TypeScript, PostgreSQL, decimales de precisión arbitraria.
- **Lo difícil:** el **motor de reglas** (fijo o porcentual, mensual o móvil, varios aplicando al mismo gasto, y explicar cuál se rompió) es lógica pura y se testea sin base ni interfaz; el **prorrateo honesto** —media, mediana o media recortada, y poder defender la elección—; **detectar periodicidad** en un flujo de transacciones con montos e intervalos que varían.
- **Detalle local:** en Argentina un presupuesto en monto fijo queda viejo en dos meses. Los límites porcentuales no son una feature más: son la única forma de que sobreviva a la inflación.
- **Estética:** sobria y numérica, cercana a Atlas pero con su propia paleta.

### 🎾 Bandeja — americanos y rankings de pádel

- Torneos americano/mexicano, rotación automática de parejas, carga de resultados desde el celular, ranking tipo ELO con período provisional.
- **Stack:** MERN, auth, Socket.io, PWA.
- **Lo difícil:** el **emparejamiento** —con N jugadores y M canchas, que todos jueguen con todos, descansen parejo y no se repitan enfrentamientos es un problema combinatorio sin solución perfecta para muchos N, y hay que elegir qué restricción relajar—; resolución de conflictos entre dos dispositivos cargando el mismo partido; **cola offline** con claves de idempotencia.
- **Wow:** marcador en vivo sincronizado entre dispositivos.
- **Estética:** deportiva y limpia; verde cancha; tipografía condensada; números grandes estilo marcador.

### 🎲 Meeple Log — ludoteca y análisis de partidas

- Importación de la colección desde BoardGameGeek, registro de partidas, estadísticas por jugador/juego/cantidad de jugadores, recomendador "qué jugamos hoy".
- **Stack:** PostgreSQL con modelado relacional y consultas analíticas, API XML de BoardGameGeek.
- **Lo difícil:** la API de BGG **encola y devuelve 202**, así que la ingesta necesita reintentos con espera y ser reanudable; el esquema de una partida con N jugadores, equipos y expansiones no entra en una tabla plana; **el recomendador es una consulta SQL con restricciones, no machine learning**, y decirlo así vale más que fingir un modelo.
- **Wow:** "Wrapped" anual de partidas.
- **Estética:** cálida y táctil; tonos cartón/crema; iconografía propia.

### ⚡ Type Matrix — sala de juegos sobre datos de criaturas

- **No es una Pokédex.** Modos: armado de equipo de 6 con debilidades compartidas y cobertura ofensiva; ahorcado con nombres de especie; adivinanza por silueta que se despixela con cada fallo; calculadora de combate con STAB, efectividad, estadísticas y naturaleza. Puzzle diario compartido, rachas y tabla de posiciones.
- **Stack:** PokéAPI con caché, backend con validación server-side, tests de la lógica de combate.
- **Lo difícil:** **el cliente no puede saber la respuesta** —toda validación en el servidor, la solución nunca viaja al navegador, que es lo que casi todos estos juegos hacen mal—; puzzle diario **determinista por semilla de fecha**, reconstruible para cualquier día; la fórmula de daño, que tiene más modificadores de los que parece; rachas y posiciones con husos horarios.
- **Restricción, a resolver a propósito:** el modo de silueta necesita arte oficial, que el brief prohíbe. Tres salidas, de menos a más riesgo: siluetas generadas con formas propias; adivinar por **estadísticas y tipos** en vez de por imagen, que además es más difícil e interesante; o asumir fan project con aviso visible de no oficial y sin monetizar. `TODO(pablo):` elegir una antes de empezar.
- **Estética:** handheld retro reinterpretada, sobria; grilla de píxeles sutil; paleta de 4 tonos; tipografía mono.

### 🤖 Game Night Agent — asistente con IA

- Bot de Telegram que organiza una noche de juegos: consulta disponibilidad del grupo, propone fecha por mayor solapamiento, sugiere juego desde Meeple Log y crea el evento.
- **Stack:** LLM con function calling, webhooks, integración con las APIs de los otros proyectos.
- **Lo difícil:** **acciones idempotentes** (un modelo que reintenta no puede crear el evento dos veces, así que cada herramienta lleva clave de operación); estado de conversación repartido entre varias personas que responden desordenado; el modelo propone y **la app valida contra el calendario real** antes de escribir nada.
- **Estética:** landing tipo chat limpio con diagrama del flujo.

### Fuera del lineup

- **Módulo Odoo para clubes.** Lo sacó Pablo. Costo de la decisión, anotado a propósito: era lo más diferencial —casi nadie en su rango muestra ERP— y lo único que respaldaba la parte "ERP (Odoo)" de *Qué hago* con un proyecto propio. A favor: es el único que necesita una instancia de Odoo corriendo para demostrarse, o sea el de mayor fricción. Para recuperar el ángulo sin el costo, alcanza un case study sobre lo hecho en Activa.
- **Apex — comparador de autos deportivos.** El problema son los datos: las specs se sacan scrapeando sitios que no quieren serlo y los números no coinciden entre fuentes, así que el proyecto entero descansa sobre un ingest frágil y legalmente gris. Atlas cuenta una historia de datos parecida con una fuente gratuita, documentada y estable.
- **Ma — kana/kanji con repetición espaciada.** Opcional, solo si da ganas construirlo. El algoritmo SRS corre entero en el cliente y no demuestra nada que los otros no demuestren mejor. Si se hace, reenfocarlo en **sincronización offline con resolución de conflictos**, que sí es difícil, y bajar la estética a mucho espacio en blanco y una serif de texto: sin textura de papel ni acento bermellón.
- **Versión low-code de un proyecto.** No es un proyecto aparte: es un capítulo del case study de Meeple Log, comparando tiempo de desarrollo, costos y límites contra la versión a medida. Sin el módulo de Odoo, ese capítulo pasa a ser lo único que respalda con trabajo propio la parte low-code y ERP de *Qué hago*.

### Mapa de skills

| Proyecto | Full-Stack | Data / SQL | Low-Code / ERP / IA | SEO / Perf | Diseño |
|---|:-:|:-:|:-:|:-:|:-:|
| Vigil | ●● | ●●● | | ●●● | ●● |
| Atlas | ●● | ●●● | | ●●● | ●● |
| Umbral | ●●● | ●●● | | ● | ●● |
| Bandeja | ●●● | ●● | ●● | ● | ●● |
| Meeple Log | ●● | ●●● | | ● | ●● |
| Type Matrix | ●●● | ●● | | ● | ●● |
| Game Night Agent | ●● | ● | ●●● | | ●● |

## 6. Roadmap

| Fase | Semanas | Entregable |
|---|---|---|
| 1 | 1–2 | Hub completo + maquinaria de case studies (sin contenido publicado) |
| 2 | 3–5 | Vigil |
| 3 | 6–8 | Atlas |
| 4 | 9–11 | Umbral |
| 5 | 12–14 | Bandeja + panel Retool |
| 6+ | 1 por mes | Meeple Log, Type Matrix, Game Night Agent |

### Definition of Done por side project

- [ ] Demo en vivo y repo público con README (capturas, stack, instrucciones).
- [ ] Case study publicado en el portfolio con su tema.
- [ ] Lighthouse ≥ 90 y responsive desde 360 px.
- [ ] Tests sobre la lógica central.
- [ ] Card del proyecto actualizada en el hub (de "Próximamente" a publicado).

---

## 7. Pendientes del usuario

- `TODO(pablo):` dominio para el portfolio.
- `TODO(pablo):` métricas reales de cada side project cuando esté construido.
