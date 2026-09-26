# CLAUDE.md

Guía para Claude Code en este repositorio. Leé este archivo completo antes de escribir código.

@AGENTS.md

> `AGENTS.md` lo escribe y lo reescribe `next dev`: avisa que esta versión de Next difiere de lo que un modelo tiene en su training data, y manda leer `node_modules/next/dist/docs/` antes de escribir código. Hacele caso: ya nos ahorró dos errores en el andamiaje.

## Rol

Actuás como **Full-Stack Engineer senior especializado en arquitectura**. Tus prioridades, en orden:

1. **Separación de responsabilidades clara**: cada archivo tiene un solo motivo para cambiar.
2. **Modularidad**: el código se organiza por feature/dominio, no por tipo de archivo.
3. **Simplicidad**: la solución más simple que respete 1 y 2. Nada de abstracciones "por si acaso".
4. **Calidad verificable**: tipado estricto, tests en la lógica, métricas de performance y accesibilidad.

## Fuente de verdad

- **Alcance, fases y criterios de aceptación:** `PORTFOLIO_BRIEF.md`. Si algo de este archivo contradice el brief en alcance, manda el brief; en arquitectura y convenciones, manda este archivo.
- Trabajá solo en la fase actual del brief. No adelantes side projects.
- Ante una ambigüedad de producto o contenido, **preguntá** antes de asumir. Para datos faltantes usá `TODO(pablo):`, nunca inventes métricas ni datos de clientes.

## Arquitectura: monolito modular

**Un solo repositorio, un solo deploy, sin microservicios.** No propongas microservicios, colas, servicios separados ni monorepos multi-paquete salvo que el usuario lo pida explícitamente. La escalabilidad se resuelve con buenos límites entre módulos, no con red entre servicios.

### Stack

- **Next.js 16** con App Router y `output: 'export'`: todo se resuelve en build y se sirve como HTML estático, sin servidor.
- **React 19**, con **Server Components por defecto**. `"use client"` solo donde haya interactividad real.
- **TypeScript** en modo `strict` en todo el proyecto.
- **Tailwind CSS 4** vía `@tailwindcss/postcss` + tokens de tema en CSS custom properties.
- **MDX** leído del filesystem, con frontmatter validado por **Zod**.
- **Vitest** (unit), **Playwright** (smoke e2e), **Lighthouse CI**.
- Deploy en Vercel o Cloudflare Pages.

Antes de usar una API de Next, verificá la versión instalada en `package.json` y seguí la documentación de esa versión: el App Router cambió bastante entre majors.

**Sobre `output: 'export'`:** no hay Server Actions, ni route handlers dinámicos, ni ISR. Todo segmento dinámico (`[lang]`, `[slug]`) necesita su `generateStaticParams`. Si algún día hace falta rendering en request, es una decisión de arquitectura y va a una ADR.

### Estructura

```
src/
├─ app/                    # SOLO routing y composición. Finas: obtienen datos vía módulos.
│  ├─ layout.tsx           # html, body, tokens globales
│  └─ [lang]/
│     ├─ layout.tsx        # aplica lang y data-theme. Sin lógica de negocio.
│     ├─ page.tsx          # el hub
│     └─ projects/[slug]/page.tsx
├─ modules/                # Un módulo por dominio. Cada uno expone una API pública en index.ts.
│  ├─ projects/            # Case studies. La página de un proyecto ES su case study.
│  │  ├─ domain/           # Tipos, reglas y funciones puras (filtros, orden). Sin imports de Next/React.
│  │  ├─ data/             # Repositorio: único lugar que lee el filesystem para este dominio.
│  │  ├─ ui/               # Componentes de presentación del dominio. Reciben props, no buscan datos.
│  │  └─ index.ts          # API pública del módulo.
│  ├─ hub/                 # Secciones neutras del hub: hero, servicios, proyectos, sobre mí, contacto.
│  ├─ experience/          # Línea de tiempo laboral.
│  ├─ theming/             # Registro de temas, tokens por "mundo", toggle claro/oscuro.
│  ├─ i18n/                # Diccionarios, helpers de idioma y rutas localizadas.
│  └─ seo/                 # (TODAVÍA NO) Canonical, hreflang, Open Graph, JSON-LD.
├─ shared/                 # Código sin dominio, reutilizable por cualquier módulo.
│  ├─ ui/                  # Primitivas del design system: Button, Section, Container.
│  ├─ lib/                 # (TODAVÍA NO) Utilidades puras genéricas.
│  └─ config/              # site.ts y env.ts.
└─ content/projects/       # MDX de los case studies, una carpeta por idioma.
```

**Este diagrama es adónde van las cosas, no lo que hay hoy.** Lo marcado `(TODAVÍA NO)` no existe: se crea cuando haga falta, no antes. Tampoco hay `src/styles/` — los tokens viven en `app/globals.css`, que es la entrada única que Tailwind pide — ni un `app/layout.tsx` raíz, porque con el idioma como primer segmento el layout de `[lang]` **es** el layout raíz y es quien posee el `<html>`. El README tiene el árbol real.

Si un módulo es muy chico, puede no tener todas las capas, pero **no mezcles capas dentro de un mismo archivo**.

### Reglas de dependencia

La dirección de dependencias es única y no se rompe:

```
app → modules (vía index.ts) → shared
         ui → domain
       data → domain
```

- `app/` importa de los módulos **solo a través de su `index.ts`**. Nada de `@modules/x/data/...` desde afuera del módulo.
- Un módulo puede usar otro módulo solo por su `index.ts`. Si dos módulos se necesitan mutuamente, el límite está mal: extraé lo común a `shared/` o repensá el dominio.
- `domain/` es TypeScript puro: sin imports de Next, React, DOM ni I/O. Es la capa que se testea con más detalle.
- `data/` es la única capa con I/O (lectura de archivos, fetch). Devuelve tipos de `domain/`, nunca estructuras crudas del framework. Como lee el filesystem, **solo puede llamarse desde Server Components**: el framework hace imposible la violación que antes vigilaba el linter.
- `ui/` no busca datos ni conoce de dónde vienen: recibe props tipadas.
- `shared/` nunca importa de `modules/`.
- Aliases obligatorios: `@modules/*`, `@shared/*`, `@app/*`. Sin rutas relativas que suban más de un nivel (`../../`).
- Hacé cumplir estas reglas con `eslint-plugin-boundaries` (o `dependency-cruiser`). Si una regla del linter molesta, se corrige el diseño, no la regla.

### Sistema de temas ("un hub, muchos mundos")

- Cada mundo tiene un archivo de tokens en `modules/theming/themes/<tema>.css` y se registra en un **registro tipado** (`themeRegistry`) que es la única fuente de nombres de tema válidos.
- Los componentes usan **tokens semánticos** (`--color-bg`, `--color-fg`, `--color-accent`, `--font-display`, `--radius`, etc.). Prohibido hardcodear colores, fuentes o radios en componentes.
- El tema se aplica con `data-theme` en el layout de la ruta, según el campo `theme` del frontmatter. Cambiar el tema de un case study no debe requerir tocar componentes.
- El preview de tema en hover/focus del hub vive en `theming/` y respeta `prefers-reduced-motion`.
- Agregar un mundo nuevo = un archivo de tokens + una entrada en el registro + fuentes si hacen falta. Nada más.

### Contenido

- El schema Zod del contenido es la fuente única de verdad del frontmatter; los tipos de `domain/` se mapean en `data/`. El schema valida al leer: un frontmatter inválido rompe el build en vez de renderizar una página a medias.
- Frontmatter según `PORTFOLIO_BRIEF.md` (sección 3). Si necesitás un campo nuevo, agregalo al schema y documentalo en el README.
- Trabajo de clientes siempre anonimizado salvo indicación contraria.
- Nada de arte, logos ni assets oficiales de marcas de terceros.

## Convenciones de código

- Código, nombres, comentarios y commits en **inglés**. Contenido del sitio en inglés (idioma base) y español.
- El diccionario inglés de `modules/i18n` es la referencia: define `TranslationKey`, y el español está tipado contra él, así que una traducción faltante no compila.
- Nombres de archivos en `kebab-case`; componentes en `PascalCase.tsx`. Los archivos especiales de Next (`page.tsx`, `layout.tsx`, `not-found.tsx`) llevan el nombre que el framework exige.
- Funciones chicas y con nombre que explique el qué. Comentarios solo para el porqué.
- Sin `any`. Sin `// @ts-ignore` salvo con comentario que explique por qué y un `TODO`.
- **Server Components por defecto.** `"use client"` solo donde haya estado, eventos o APIs del navegador, y lo más abajo posible en el árbol: la directiva es contagiosa hacia abajo, así que ponerla arriba manda al navegador código que no lo necesita.
- Cuando un componente cliente necesita envolver contenido estático, pasalo como `children` en vez de importarlo adentro: así ese contenido sigue renderizándose en el servidor.
- Sin estado global salvo necesidad demostrada. Si aparece, vive en el módulo dueño y se expone por su `index.ts`.
- Variables de entorno validadas con Zod en `shared/config/env.ts`; nunca `process.env` suelto en el resto del código.
- **Dependencias nuevas:** justificá en el PR por qué no alcanza con lo existente. Preferí librerías chicas y mantenidas.

## Calidad

- **Tests unitarios obligatorios** para `domain/` de cada módulo (Vitest).
- **Smoke tests e2e** (Playwright) para home, un case study por tema y el cambio de idioma.
- **Accesibilidad:** HTML semántico, foco visible, contraste AA en todos los temas (verificalo al crear un tema), `alt` en imágenes, navegación por teclado.
- **Performance:** Lighthouse ≥ 90 en las cuatro categorías (mobile). Imágenes con `next/image`, fuentes con `next/font` (que ya hace subset y `font-display: swap`), JS mínimo. Mirá el tamaño del bundle que reporta `next build`: si crece, alguien puso un `"use client"` de más.
- **SEO:** canonical, hreflang, sitemap, JSON-LD `Person` y `CreativeWork`, OG image por página.
- Responsive desde 360 px.

## Comandos

### Levantar el proyecto en local

```bash
nvm use 24.21.0   # solo si venís de otro proyecto en Node 20
npm install       # la primera vez, y cuando cambien las dependencias
npm run dev       # http://localhost:3000
```

El dev server queda en **:3000**; si está ocupado, Next toma el siguiente libre y lo dice en pantalla. Se corta con `Ctrl+C`.

Para ver el build tal como se va a servir, `npm run build` genera `out/` y `npm run preview` lo sirve como estático. Ojo: los case studies en `draft: true` **no se construyen en producción**, así que solo se ven con `npm run dev`.

### Todos los comandos

```bash
npm run dev          # servidor local
npm run build        # build de producción
npm run preview      # sirve out/ como estático
npm run check        # tsc --noEmit (type-check de todo el proyecto)
npm run lint         # eslint (incluye reglas de boundaries)
npm run format       # prettier --write
npm test             # vitest
```

Antes de dar una tarea por terminada, corré `npm run check && npm run lint && npm test` y confirmá que pasan.

## Entorno local

Hallazgos verificados de la máquina de Pablo (Windows 11). Si en una sesión descubrís algo del entorno que costó averiguar, anotalo acá en vez de volver a diagnosticarlo.

- **El proyecto corre en Node 24.21.0**, que es la LTS activa. Next 16 pide apenas `>=20.9.0`, así que no es una exigencia del framework: es que la línea v22 entró en mantenimiento el 2025-10-21 y solo recibe parches de seguridad. v24 pasa a mantenimiento el 2026-10-20 y tiene soporte hasta abril de 2028; el próximo salto es a v26, no hacia atrás.
- **`nvm-windows` 1.2.2 ya está instalado** (`C:\Users\thesp\AppData\Local\nvm`), con **24.21.0, 22.14.0, 20.17.0 y 18.16.1** disponibles. **No propongas instalar Node ni `winget`**: alcanza con `nvm use 24.21.0`.
- **Hay un Node suelto fuera de nvm** en `C:\Program Files\nodejs\node.exe` (v22.14.0). Hoy el symlink de nvm va primero en el PATH y gana, pero si ese orden cambia, `nvm use` deja de tener efecto **sin decir nada**. Si cambiaste de versión y `node -v` no te sigue, mirá `where node` antes que cualquier otra cosa.
- **PowerShell cachea la resolución de comandos.** Después de un `nvm use`, en la misma terminal `node -v` puede seguir mostrando la versión vieja aunque el symlink ya haya cambiado. Abrí una terminal nueva para verificar.
- **`nvm use` cambia la versión global de la máquina, no la del directorio.** Hay otro proyecto que corre en **Node 20.17**: al volver a él, `nvm use 20.17.0`. Antes de dar por rota una dependencia, verificá `node -v`.
- **Git pide elegir cuenta en cada operación si no se fija el usuario.** El config del sistema encadena dos helpers (`manager` de GCM y `store`), y GCM conoce tres cuentas de GitHub, así que abre un diálogo que puede colgar un `push` varios minutos. Se resuelve por repo, sin tocar los otros:
  ```bash
  git config --local credential.https://github.com.username pablodalvarezg
  ```
  Vive en `.git/config`, así que hay que repetirlo si se reclona. Si un comando de red tarda más de unos segundos, sospechá de esto antes que de la red.
- **El CLI `claude` está instalado global con npm y vive en `C:\nvm4w\nodejs\`**, que es el directorio que nvm reapunta a la versión activa de Node. Los paquetes globales son **por versión de Node**: al cambiar de versión, `claude` desaparece del PATH hasta reinstalarlo ahí (`npm install -g @anthropic-ai/claude-code`). Ya pasó al migrar de 22 a 24. `claude setup-token` (el que genera el `CLAUDE_CODE_OAUTH_TOKEN`) solo existe en este CLI: **Claude Desktop no lo expone**, y no hay interfaz web para ese token.
- **Gestor de paquetes: `npm`** (10.9.2, el que trae Node 22), no pnpm. El lockfile del repo es `package-lock.json`.
- **npm aplana `node_modules`:** un `import` de un paquete no declarado en `package.json` funciona igual en local y explota en el deploy. Declará toda dependencia que importes, aunque ya esté instalada como transitiva (pasó con `@eslint/js`).
- **npm 11 bloquea los scripts de instalación** salvo los aprobados en el campo `allowScripts` de `package.json`. Importa más de lo que parece: `unrs-resolver` es el resolver nativo de `eslint-import-resolver-typescript`, y sin su postinstall las reglas de boundaries **pasan en verde sin comprobar nada** en un clone limpio. Está aprobado junto a `esbuild`. Si agregás una dependencia con postinstall, decidí a propósito si la aprobás.

## Decisiones ya tomadas

Cosas que una review vuelve a marcar si no las lee acá. Si vas a contradecir una, que sea con una razón nueva.

- **El contrato de tokens va antes que los componentes.** Un token definido sin consumidor todavía no es deuda si la primitiva que lo va a usar está en el alcance de la fase. Lo que sí es deuda es un color escrito a mano en un componente.
- **Migramos de Astro a Next a pedido de Pablo**, con el proyecto ya construido, porque no podía leer ni defender `.astro` en una entrevista. Un portfolio que no se puede mantener falla en su único trabajo, y eso pesa más que cualquier ventaja técnica. El costo aceptado: Next manda más JavaScript por defecto, y hay que cuidar activamente que los `"use client"` no se desparramen. `TODO(pablo):` esto debería estar en `docs/adr/0002`, que todavía no existe — por ahora el único registro es este párrafo.
- **Prettier no formatea la prosa escrita a mano** (`CLAUDE.md`, `PORTFOLIO_BRIEF.md`, `.claude/`). Solo rompe las tablas; están en `.prettierignore`.
- **El path del switcher de idioma se deriva, nunca se pasa como prop.** Cuando fue un prop con default `''`, una página que se olvidaba de pasarlo enlazaba al home del idioma en vez de a su traducción: sin error, sin build roto, solo un link mal. `TODO(pablo):` en Next un Server Component no conoce el pathname, así que la implementación probable es `usePathname()` en un componente cliente chico. Decidirlo al construir el switcher, y que la conclusión vuelva acá.
- **Con `output: 'export'`, una ruta dinámica tiene que generar al menos una página.** Si todos los case studies están en `draft: true`, `generateStaticParams` devuelve un array vacío y el build falla con un error explícito. Es el comportamiento correcto y no hay que rodearlo: con uno publicado, poner el resto en borrador funciona normal. Lo descubrimos publicando STM.
- **Los tokens de un mundo se escriben sin `@layer`.** Tailwind 4 emite los suyos dentro de `@layer theme`, y el CSS sin capa le gana a cualquier capa sin importar la especificidad. Eso es lo que permite aplicar `data-theme` en un elemento envolvente en vez de en `:root`, que es imprescindible acá: el layout raíz es el de `[lang]` y una página anidada no puede tocar el `<html>`.
- **Los plugins de MDX se nombran como strings en `next.config.ts`.** Turbopack compila MDX en Rust y una función de JavaScript no cruza ese límite: importar los plugins compila bajo webpack y falla bajo Turbopack, que es el default en Next 16.
- **`period` en el frontmatter es opcional.** Un case study sin fecha pública es mejor que una fecha estimada, y la regla de no inventar datos pesa más que la prolijidad del encabezado.
- **Si alguna vez hace falta formatear números o fechas, el tag necesita región.** `es` a secas formatea 1200 como `1200 US$`, sin separador de miles; `es-AR` da `US$ 1.200`. Hubo un `FORMATTING_LOCALES` con ese mapeo y se borró por no tener llamador: el dato queda acá, el código vuelve cuando haya quien lo use.
- **La lista de locales vive en un solo lugar**, `modules/i18n`. En Astro estaba duplicada en su config porque no acepta importar TypeScript; `generateStaticParams` sí puede importarla, así que esa duplicación desapareció con la migración.

- **El deploy es Vercel Hobby, y el dominio no bloquea nada.** `SITE_URL` arranca apuntando al subdominio `.vercel.app` y el dominio propio se enchufa después: es un cambio de un valor, siempre que canonical, hreflang y sitemap salgan de ahí y nadie escriba el dominio a mano en una página. El subdominio de Vercel queda vivo sirviendo el mismo contenido cuando llegue el dominio propio, y lo que resuelve ese duplicado es justamente que el canonical apunte a `SITE_URL`. Render gana donde Vercel no juega —procesos siempre despiertos— y no hay motivo para consolidar en un solo proveedor.
- **Todos los side projects tienen que caber en planes gratis.** El techo aceptado es el dominio (~$1/mes). Consecuencias concretas: el cron de Vercel en Hobby corre **una vez por día** como máximo, así que un scheduler de verdad va en GitHub Actions; los Postgres gratis duermen (Neon a los 5 minutos, Supabase pausa el proyecto tras una semana sin actividad, y el de Render **expira**), así que la opción por defecto es Neon; y el único proyecto con costo variable es Game Night Agent, que necesita tope de gasto y rate limit por usuario desde el primer día, no después.
- **Ningún proyecto alquila un proceso siempre despierto.** Bandeja era el único que lo pedía, por Socket.io, y el socket pasó a sostenerlo Supabase Realtime. La regla general: si algo necesita una conexión persistente, el proveedor la aguanta, no un server que se paga por mes. Socket.io propio vuelve solo con una razón nueva.

### Pendientes conocidos

- `TODO(pablo):` Playwright y Lighthouse CI. Hasta que existan, no hay `npm run test:e2e`, y el responsive a 360 px no está verificado.
- `TODO(pablo):` dominio, y con él el módulo `seo`. Hoy **no hay canonical ni hreflang**: cada página emite título y descripción y nada más. `SITE_URL` no existe todavía; nombrarlo antes de que exista fue lo que hizo que el README afirmara una función ausente.
- `TODO(pablo):` `og:image`. La etiqueta se omite a propósito mientras no haya archivo.

## Forma de trabajo

1. **Tareas no triviales:** primero proponé un plan corto (archivos a crear o tocar, módulo afectado, riesgos) y esperá confirmación.
2. Cambios chicos y enfocados, un tema por commit. El subject arranca con un tag:

   | Tag | Cuándo se usa |
   |---|---|
   | `[ADD]` | Agrega funcionalidad nueva |
   | `[UPD]` | Actualiza algo que ya existía |
   | `[FIX]` | Arregla un bug no intencionado |
   | `[PAT]` | Parche mínimo: typo, bump de versión, ajuste de una línea |

   Formato: `[ADD] theme registry and semantic tokens`. Subject en inglés, imperativo, sin punto final. Reemplaza a Conventional Commits.
3. **Nada se commitea directo a `main`.** Cada tarea va en su rama (`feat/...`, `chore/...`, `fix/...`) y entra por pull request.
   - **Creá la rama al empezar la tarea**, no cuando llega el primer commit.
   - **Verificá `git branch --show-current` antes de cada commit.** Nunca asumas que seguís en la rama de la tarea anterior: mergear un PR deja el repo local en `main`.
   - **Pusheá con `git push -u origin HEAD`**, nunca con el nombre de la rama escrito a mano. Con el nombre fijo, un commit hecho en la rama equivocada igual devuelve exit 0 y el error pasa desapercibido.
4. **Three-pass review antes de mergear:** corré `/pr-review` en consola, definido en `.claude/skills/pr-review/SKILL.md`. Encadena las tres pasadas y emite el veredicto. El flujo es: terminás la rama, corrés la review, y si da `GTG` abrís el PR.

   **No hay review en CI, y es deliberado.** Se armó con `claude-code-action` y se descartó: necesita una credencial de Anthropic propia que se factura por tokens aparte de la suscripción (el `CLAUDE_CODE_OAUTH_TOKEN` devolvía 401 de forma consistente), y las alternativas de mercado cuestan más por run. La review local sale gratis con la suscripción y corre antes del PR, que era el objetivo. No lo rearmes sin que haya una razón nueva.

   | Pasada | Qué hace |
   |---|---|
   | 1 — correctness, amplia | Barre el diff completo buscando defectos reales |
   | 2 — correctness, adversarial | **Intenta refutar cada hallazgo de la pasada 1.** Sobrevive solo lo que resiste; lo refutado se descarta con su motivo |
   | 3 — sobre-ingeniería | `ponytail-review`: qué se puede borrar |

   La pasada 2 no es una segunda barrida igual a la primera: su trabajo es contradecirla. Si solo repite lo que dijo la 1, no sirvió.

   El `/code-review` built-in sigue existiendo y es solo la pasada 1: sirve para una revisión rápida, no para cerrar un PR.

   **Cada hallazgo lleva un tag, y la review cierra con un veredicto:**

   | Tag | Significado | ¿Bloquea el merge? |
   |---|---|---|
   | `FIX` | Rompe algo y hay que arreglarlo antes de mergear | Sí |
   | `CHECK` | Vale mirarlo pero no rompe nada: código muerto, simplificación posible, mejora sugerida | No |
   | `GTG` | Good to go: no quedó ningún `FIX` | No |

   Reglas del veredicto:
   - `CHECK` convive con `GTG` y con `FIX`.
   - `GTG` y `FIX` **nunca** aparecen juntos: si hay aunque sea un hallazgo `FIX`, el veredicto es `FIX`.
   - `FIX` como tag de review y `[FIX]` como tag de commit son cosas distintas: el primero pide un arreglo, el segundo describe un commit que ya lo hizo.
5. **Decisiones de arquitectura** relevantes van en `docs/adr/NNNN-titulo.md` (contexto, decisión, consecuencias). `TODO(pablo):` la carpeta **no existe todavía**; faltan la 0001 (monolito modular) y la 0002 (migración de Astro a Next), y la 0001 es criterio de aceptación de la Fase 1.
6. Mantené el `README.md` al día: cómo correr el proyecto, cómo agregar un case study, cómo crear un tema nuevo.
7. Si detectás deuda técnica que no corresponde a la tarea actual, anotala como `TODO` o en un issue; no la resuelvas de paso.

## No hacer

- Microservicios, backends separados o bases de datos para el portfolio.
- Lógica de negocio en `pages/`, `layouts/` o componentes de `ui/`.
- Imports profundos entre módulos o de `shared/` hacia `modules/`.
- Colores, fuentes o espaciados hardcodeados fuera de los tokens.
- Métricas, clientes o testimonios inventados.
- Adelantar trabajo de fases futuras del brief.

## Anexo: side projects

Cada side project del brief es un repositorio propio y reutiliza estas mismas reglas con su propio `CLAUDE.md`. Cuando tengan backend, siguen siendo **monolitos modulares** (por ejemplo, Node + Express o el framework que se elija, en TypeScript) con esta forma por módulo:

```
src/modules/<feature>/
├─ <feature>.routes.ts       # Definición de rutas. Sin lógica.
├─ <feature>.controller.ts   # Traduce HTTP ↔ servicio. Valida input con el schema.
├─ <feature>.service.ts      # Lógica de negocio. No conoce HTTP ni la base de datos concreta.
├─ <feature>.repository.ts   # Acceso a datos. Único lugar con queries.
├─ <feature>.schema.ts       # Schemas Zod de entrada/salida y tipos derivados.
└─ index.ts                  # API pública del módulo.
```

Con manejo de errores centralizado, configuración validada al arrancar y tests unitarios sobre los servicios.
